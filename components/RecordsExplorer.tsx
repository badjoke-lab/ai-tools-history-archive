'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Record } from '@/data/schema';
import { RecordCard } from './RecordCard';

type RecordsExplorerProps = {
  records: Record[];
};

type Filters = {
  query: string;
  status: string;
  category: string;
  entityType: string;
};

const emptyFilters: Filters = {
  query: '',
  status: 'all',
  category: 'all',
  entityType: 'all'
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function recordMatchesQuery(record: Record, query: string) {
  if (!query.trim()) return true;

  const normalizedQuery = query.trim().toLowerCase();
  const searchableText = [
    record.name,
    ...record.aliases,
    record.operator,
    record.status,
    record.entity_type,
    record.current_state,
    record.summary,
    ...record.category,
    ...record.events.flatMap((event) => [event.title, event.description, event.type]),
    ...record.evidence.flatMap((evidence) => [
      evidence.title,
      evidence.publisher ?? '',
      evidence.source_type,
      evidence.reliability,
      ...evidence.supports
    ])
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function readInitialFilters(): Filters {
  if (typeof window === 'undefined') return emptyFilters;

  const params = new URLSearchParams(window.location.search);

  return {
    query: params.get('q') ?? '',
    status: params.get('status') ?? 'all',
    category: params.get('category') ?? 'all',
    entityType: params.get('entity_type') ?? 'all'
  };
}

function writeFiltersToUrl(filters: Filters) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.status !== 'all') params.set('status', filters.status);
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.entityType !== 'all') params.set('entity_type', filters.entityType);

  const queryString = params.toString();
  const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
  window.history.replaceState(null, '', nextUrl);
}

export function RecordsExplorer({ records }: RecordsExplorerProps) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setFilters(readInitialFilters());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) writeFiltersToUrl(filters);
  }, [filters, isReady]);

  const options = useMemo(() => {
    return {
      statuses: uniqueSorted(records.map((record) => record.status)),
      categories: uniqueSorted(records.flatMap((record) => record.category)),
      entityTypes: uniqueSorted(records.map((record) => record.entity_type))
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const queryMatch = recordMatchesQuery(record, filters.query);
      const statusMatch = filters.status === 'all' || record.status === filters.status;
      const categoryMatch = filters.category === 'all' || record.category.includes(filters.category as never);
      const entityTypeMatch = filters.entityType === 'all' || record.entity_type === filters.entityType;

      return queryMatch && statusMatch && categoryMatch && entityTypeMatch;
    });
  }, [records, filters]);

  function updateFilter<Key extends keyof Filters>(key: Key, value: Filters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setFilters(emptyFilters);
  }

  return (
    <section className="records-explorer" aria-label="Records search and filters">
      <div className="filter-panel">
        <label className="filter-field filter-field-wide">
          <span>Search</span>
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter('query', event.target.value)}
            placeholder="Search name, operator, event, evidence, category..."
          />
        </label>

        <label className="filter-field">
          <span>Status</span>
          <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
            <option value="all">All statuses</option>
            {options.statuses.map((status) => (
              <option value={status} key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Category</span>
          <select value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>
            <option value="all">All categories</option>
            {options.categories.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Entity type</span>
          <select value={filters.entityType} onChange={(event) => updateFilter('entityType', event.target.value)}>
            <option value="all">All entity types</option>
            {options.entityTypes.map((entityType) => (
              <option value={entityType} key={entityType}>{entityType}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-summary">
        <span>{filteredRecords.length} of {records.length} records shown</span>
        <button type="button" onClick={resetFilters}>Reset filters</button>
      </div>

      {filteredRecords.length > 0 ? (
        <div className="record-list">
          {filteredRecords.map((record) => (
            <RecordCard record={record} key={record.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching records</h2>
          <p>Try a broader search term or reset one of the filters.</p>
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
      )}
    </section>
  );
}
