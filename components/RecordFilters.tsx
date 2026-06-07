'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Record } from '@/data/schema';
import { RecordCard } from './RecordCard';
import styles from './RecordFilters.module.css';

type RecordFiltersProps = {
  records: Record[];
};

const allValue = 'all';

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function buildSearchText(record: Record) {
  return [
    record.name,
    ...record.aliases,
    record.operator,
    record.status,
    record.entity_type,
    record.current_state,
    record.summary,
    ...record.category,
    ...record.events.map((event) => `${event.title} ${event.description} ${event.type}`),
    ...record.evidence.map((evidence) =>
      `${evidence.title} ${evidence.publisher ?? ''} ${evidence.source_type} ${evidence.reliability} ${evidence.supports.join(' ')}`
    )
  ]
    .join(' ')
    .toLowerCase();
}

export function RecordFilters({ records }: RecordFiltersProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(allValue);
  const [category, setCategory] = useState(allValue);
  const [entityType, setEntityType] = useState(allValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
    setStatus(params.get('status') ?? allValue);
    setCategory(params.get('category') ?? allValue);
    setEntityType(params.get('entity_type') ?? allValue);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (status !== allValue) params.set('status', status);
    if (category !== allValue) params.set('category', category);
    if (entityType !== allValue) params.set('entity_type', entityType);

    const queryString = params.toString();
    const nextUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, '', nextUrl);
  }, [query, status, category, entityType, ready]);

  const statusOptions = useMemo(
    () => uniqueSorted(records.map((record) => record.status)),
    [records]
  );
  const categoryOptions = useMemo(
    () => uniqueSorted(records.flatMap((record) => record.category)),
    [records]
  );
  const entityTypeOptions = useMemo(
    () => uniqueSorted(records.map((record) => record.entity_type)),
    [records]
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return records.filter((record) => {
      const matchesQuery =
        normalizedQuery.length === 0 || buildSearchText(record).includes(normalizedQuery);
      const matchesStatus = status === allValue || record.status === status;
      const matchesCategory = category === allValue || record.category.includes(category as never);
      const matchesEntityType = entityType === allValue || record.entity_type === entityType;

      return matchesQuery && matchesStatus && matchesCategory && matchesEntityType;
    });
  }, [records, query, status, category, entityType]);

  function clearFilters() {
    setQuery('');
    setStatus(allValue);
    setCategory(allValue);
    setEntityType(allValue);
  }

  return (
    <section className={styles.shell} aria-label="Record search and filters">
      <div className={styles.panel}>
        <label className={`${styles.field} ${styles.searchField}`}>
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, operator, event, evidence..."
          />
        </label>

        <label className={styles.field}>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value={allValue}>All statuses</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value={allValue}>All categories</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Entity type</span>
          <select value={entityType} onChange={(event) => setEntityType(event.target.value)}>
            <option value={allValue}>All entity types</option>
            {entityTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <button className={styles.clearButton} type="button" onClick={clearFilters}>
          Clear
        </button>
      </div>

      <div className={styles.summary}>
        Showing {filteredRecords.length} of {records.length} records
      </div>

      {filteredRecords.length > 0 ? (
        <div className="record-list">
          {filteredRecords.map((record) => (
            <RecordCard record={record} key={record.id} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No records match these filters.</h2>
          <p>Try clearing the search text or selecting broader filters.</p>
          <button className={styles.clearButton} type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
