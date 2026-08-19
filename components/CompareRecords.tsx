"use client";

import { useEffect, useMemo, useState } from 'react';
import type { Record } from '@/data/schema';
import { getLifecycleProjection } from '@/lib/lifecycle';

type CompareRecordsProps = { records: Record[] };

function displayValue(value?: string | null) {
  if (!value) return 'Not recorded';
  return value.replaceAll('_', ' ');
}

function displayList(values?: string[]) {
  return values && values.length ? values.map(displayValue).join(', ') : 'Not recorded';
}

export function CompareRecords({ records }: CompareRecordsProps) {
  const recordMap = useMemo(() => new Map(records.map((record) => [record.slug, record])), [records]);
  const defaults = useMemo(() => records.slice(0, 2).map((record) => record.slug), [records]);
  const [selected, setSelected] = useState<string[]>(defaults);
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.getAll('record').flatMap((value) => value.split(',')).filter((slug) => recordMap.has(slug));
    const unique = Array.from(new Set(requested)).slice(0, 4);
    if (unique.length >= 2) setSelected(unique);
    setDifferencesOnly(params.get('differences') === 'only');
  }, [recordMap]);

  useEffect(() => {
    const params = new URLSearchParams();
    selected.forEach((slug) => params.append('record', slug));
    if (differencesOnly) params.set('differences', 'only');
    window.history.replaceState(null, '', `/compare/?${params.toString()}`);
  }, [selected, differencesOnly]);

  const selectedRecords = selected.map((slug) => recordMap.get(slug)).filter((record): record is Record => Boolean(record));
  const updateSlot = (index: number, slug: string) => {
    setSelected((current) => {
      const next = [...current];
      if (!slug) next.splice(index, 1);
      else next[index] = slug;
      return Array.from(new Set(next.filter(Boolean))).slice(0, 4);
    });
  };

  const rows: Array<[string, (record: Record) => string]> = [
    ['Status', (record) => displayValue(record.status)],
    ['Provider / operator', (record) => record.operator],
    ['Entity type', (record) => displayValue(record.entity_type)],
    ['Categories', (record) => displayList(record.category)],
    ['Launch', (record) => record.launched_at ?? 'Not recorded'],
    ['Ended / changed', (record) => record.ended_at ?? 'Not recorded'],
    ['Current URL state', (record) => displayValue(record.current_url_status)],
    ['Lifecycle event types', (record) => displayList(getLifecycleProjection(record).eventTypes)],
    ['Replacement guidance', (record) => getLifecycleProjection(record).replacementGuidanceRecorded ? 'Recorded in evidence' : 'Not recorded'],
    ['Data export deadline', (record) => getLifecycleProjection(record).dataExportDeadlineRecorded ? 'Recorded event' : 'Not recorded'],
    ['Current state', (record) => record.current_state],
    ['Related records', (record) => displayList(record.related_records)],
    ['Last reviewed', (record) => record.last_reviewed_at],
    ['Confidence', (record) => displayValue(record.confidence)],
    ['Evidence count', (record) => String(record.evidence.length)],
    ['High-reliability evidence', (record) => getLifecycleProjection(record).highReliabilityEvidence ? 'Present' : 'Not recorded'],
    ['Archived evidence', (record) => getLifecycleProjection(record).archivedEvidenceAvailable ? 'Present' : 'Not recorded'],
    ['Known unknowns', (record) => displayList(record.known_unknowns)]
  ];

  const visibleRows = rows.filter(([, getter]) => {
    if (!differencesOnly) return true;
    return new Set(selectedRecords.map(getter)).size > 1;
  });

  return (
    <>
      <section className="card compare-control-card">
        <div className="compare-select-grid">
          {[0, 1, 2, 3].map((index) => (
            <label className="filter-field" key={index}>
              <span>Record {index + 1}{index >= 2 ? ' (optional)' : ''}</span>
              <select value={selected[index] ?? ''} onChange={(event) => updateSlot(index, event.target.value)}>
                <option value="">{index < 2 ? 'Choose a record' : 'None'}</option>
                {records.map((record) => <option key={record.slug} value={record.slug}>{record.name}</option>)}
              </select>
            </label>
          ))}
        </div>
        <div className="compare-actions">
          <label className="compare-checkbox"><input type="checkbox" checked={differencesOnly} onChange={(event) => setDifferencesOnly(event.target.checked)} /> Show differences only</label>
          <button className="button secondary" type="button" onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setCopyStatus('Link copied.');
            } catch {
              setCopyStatus('Copy unavailable; use the address-bar URL.');
            }
          }}>Copy share link</button>
          <span className="muted" aria-live="polite">{copyStatus}</span>
        </div>
        <p className="muted compare-note">Replacement guidance and export deadlines mean only that canonical evidence/events record those signals. Generic related records are not interpreted as replacement or successor targets.</p>
      </section>

      {selectedRecords.length < 2 ? (
        <div className="empty-state"><h2>Choose at least two different records.</h2><p>Compare supports 2–4 canonical lifecycle records.</p></div>
      ) : (
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead><tr><th>Recorded field</th>{selectedRecords.map((record) => <th key={record.slug}><a className="text-link" href={`/records/${record.slug}/`}>{record.name}</a></th>)}</tr></thead>
            <tbody>{visibleRows.map(([label, getter]) => <tr key={label}><th>{label}</th>{selectedRecords.map((record) => <td key={record.slug}>{getter(record)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </>
  );
}
