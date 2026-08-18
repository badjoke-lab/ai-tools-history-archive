"use client";

import { useEffect, useMemo, useState } from 'react';
import type { Record } from '@/data/schema';
import { getLifecycleProjection } from '@/lib/lifecycle';
import { RecordCard } from './RecordCard';

type RecordFiltersProps = {
  records: Record[];
};

const allValue = 'all';
const lifecycleSignalOptions = [
  ['replacement_guidance', 'Replacement guidance recorded'],
  ['data_export_deadline', 'Data export deadline recorded']
] as const;
const evidenceSignalOptions = [
  ['high_reliability', 'High-reliability evidence'],
  ['archive_available', 'Archived evidence available']
] as const;

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function yearsDescending(values: Array<string | null>) {
  return uniqueSorted(values.filter((value): value is string => Boolean(value))).sort((a, b) => Number(b) - Number(a));
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
    ...record.evidence.map((evidence) => `${evidence.title} ${evidence.publisher ?? ''} ${evidence.source_type} ${evidence.supports.join(' ')}`),
    ...record.related_records,
    ...(record.known_unknowns ?? [])
  ]
    .join(' ')
    .toLowerCase();
}

export function RecordFilters({ records }: RecordFiltersProps) {
  const projections = useMemo(
    () => new Map(records.map((record) => [record.id, getLifecycleProjection(record)])),
    [records]
  );
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(allValue);
  const [category, setCategory] = useState(allValue);
  const [entityType, setEntityType] = useState(allValue);
  const [operator, setOperator] = useState(allValue);
  const [launchYear, setLaunchYear] = useState(allValue);
  const [endYear, setEndYear] = useState(allValue);
  const [eventType, setEventType] = useState(allValue);
  const [lifecycleSignal, setLifecycleSignal] = useState(allValue);
  const [evidenceSignal, setEvidenceSignal] = useState(allValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
    setStatus(params.get('status') ?? allValue);
    setCategory(params.get('category') ?? allValue);
    setEntityType(params.get('entity_type') ?? allValue);
    setOperator(params.get('operator') ?? allValue);
    setLaunchYear(params.get('launch_year') ?? allValue);
    setEndYear(params.get('end_year') ?? allValue);
    setEventType(params.get('event_type') ?? allValue);
    setLifecycleSignal(params.get('lifecycle_signal') ?? allValue);
    setEvidenceSignal(params.get('evidence') ?? allValue);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (status !== allValue) params.set('status', status);
    if (category !== allValue) params.set('category', category);
    if (entityType !== allValue) params.set('entity_type', entityType);
    if (operator !== allValue) params.set('operator', operator);
    if (launchYear !== allValue) params.set('launch_year', launchYear);
    if (endYear !== allValue) params.set('end_year', endYear);
    if (eventType !== allValue) params.set('event_type', eventType);
    if (lifecycleSignal !== allValue) params.set('lifecycle_signal', lifecycleSignal);
    if (evidenceSignal !== allValue) params.set('evidence', evidenceSignal);
    const nextUrl = params.toString() ? `/records/?${params.toString()}` : '/records/';
    window.history.replaceState(null, '', nextUrl);
  }, [query, status, category, entityType, operator, launchYear, endYear, eventType, lifecycleSignal, evidenceSignal]);

  const statusOptions = useMemo(() => uniqueSorted(records.map((record) => record.status)), [records]);
  const categoryOptions = useMemo(() => uniqueSorted(records.flatMap((record) => record.category)), [records]);
  const entityTypeOptions = useMemo(() => uniqueSorted(records.map((record) => record.entity_type)), [records]);
  const operatorOptions = useMemo(() => uniqueSorted(records.map((record) => record.operator)), [records]);
  const launchYearOptions = useMemo(() => yearsDescending(records.map((record) => projections.get(record.id)?.launchYear ?? null)), [records, projections]);
  const endYearOptions = useMemo(() => yearsDescending(records.map((record) => projections.get(record.id)?.endYear ?? null)), [records, projections]);
  const eventTypeOptions = useMemo(() => uniqueSorted(records.flatMap((record) => projections.get(record.id)?.eventTypes ?? [])), [records, projections]);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      const projection = projections.get(record.id)!;
      const matchesLifecycleSignal = lifecycleSignal === allValue
        || (lifecycleSignal === 'replacement_guidance' && projection.replacementGuidanceRecorded)
        || (lifecycleSignal === 'data_export_deadline' && projection.dataExportDeadlineRecorded);
      const matchesEvidenceSignal = evidenceSignal === allValue
        || (evidenceSignal === 'high_reliability' && projection.highReliabilityEvidence)
        || (evidenceSignal === 'archive_available' && projection.archivedEvidenceAvailable);
      return (
        (normalizedQuery.length === 0 || buildSearchText(record).includes(normalizedQuery))
        && (status === allValue || record.status === status)
        && (category === allValue || record.category.includes(category as never))
        && (entityType === allValue || record.entity_type === entityType)
        && (operator === allValue || record.operator === operator)
        && (launchYear === allValue || projection.launchYear === launchYear)
        && (endYear === allValue || projection.endYear === endYear)
        && (eventType === allValue || projection.eventTypes.includes(eventType))
        && matchesLifecycleSignal
        && matchesEvidenceSignal
      );
    });
  }, [records, projections, query, status, category, entityType, operator, launchYear, endYear, eventType, lifecycleSignal, evidenceSignal]);

  const clearFilters = () => {
    setQuery('');
    setStatus(allValue);
    setCategory(allValue);
    setEntityType(allValue);
    setOperator(allValue);
    setLaunchYear(allValue);
    setEndYear(allValue);
    setEventType(allValue);
    setLifecycleSignal(allValue);
    setEvidenceSignal(allValue);
  };

  const selectFields = [
    ['Status', status, setStatus, statusOptions, 'All statuses'],
    ['Category', category, setCategory, categoryOptions, 'All categories'],
    ['Entity type', entityType, setEntityType, entityTypeOptions, 'All entity types'],
    ['Provider / operator', operator, setOperator, operatorOptions, 'All providers'],
    ['Launch year', launchYear, setLaunchYear, launchYearOptions, 'All launch years'],
    ['End / change year', endYear, setEndYear, endYearOptions, 'All end years'],
    ['Lifecycle event', eventType, setEventType, eventTypeOptions, 'All event types']
  ] as const;

  return (
    <section className="filter-shell" aria-label="Record search and filters">
      <div className="filter-panel">
        <label className="filter-field search-field">
          <span>Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, operator, event, evidence..." />
        </label>

        {selectFields.map(([label, value, setter, options, allLabel]) => (
          <label className="filter-field" key={label}>
            <span>{label}</span>
            <select value={value} onChange={(event) => setter(event.target.value)}>
              <option value={allValue}>{allLabel}</option>
              {options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
        ))}

        <label className="filter-field">
          <span>Lifecycle signal</span>
          <select value={lifecycleSignal} onChange={(event) => setLifecycleSignal(event.target.value)}>
            <option value={allValue}>All lifecycle signals</option>
            {lifecycleSignalOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>

        <label className="filter-field">
          <span>Evidence signal</span>
          <select value={evidenceSignal} onChange={(event) => setEvidenceSignal(event.target.value)}>
            <option value={allValue}>All evidence states</option>
            {evidenceSignalOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>

        <button className="clear-button" type="button" onClick={clearFilters}>Clear</button>
      </div>

      <div className="filter-result-summary">Showing {filteredRecords.length} of {records.length} records</div>

      {filteredRecords.length > 0 ? (
        <div className="record-list">
          {filteredRecords.map((record) => <RecordCard record={record} key={record.id} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No records match these filters.</h2>
          <p>Try clearing the search text or selecting broader filters.</p>
          <button className="clear-button" type="button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </section>
  );
}
