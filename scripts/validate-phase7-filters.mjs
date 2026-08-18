import { readFileSync } from 'node:fs';

const filters = readFileSync('components/RecordFilters.tsx', 'utf8');
const lifecycle = readFileSync('lib/lifecycle.ts', 'utf8');
const fail = (message) => { throw new Error(message); };

for (const marker of [
  "params.get('operator')",
  "params.get('launch_year')",
  "params.get('end_year')",
  "params.get('event_type')",
  "params.get('lifecycle_signal')",
  "params.get('evidence')",
  "params.set('operator'",
  "params.set('launch_year'",
  "params.set('end_year'",
  "params.set('event_type'",
  "params.set('lifecycle_signal'",
  "params.set('evidence'",
  'replacement_guidance',
  'data_export_deadline',
  'high_reliability',
  'archive_available',
  'Provider / operator',
  'Lifecycle event',
  'Lifecycle signal',
  'Evidence signal'
]) {
  if (!filters.includes(marker)) fail(`Record filter contract missing marker: ${marker}`);
}

for (const marker of [
  'replacementGuidanceRecorded',
  "item.supports.includes('replacement_guidance')",
  'dataExportDeadlineRecorded',
  "event.type === 'data_export_deadline'",
  'highReliabilityEvidence',
  "item.reliability === 'high'",
  'archivedEvidenceAvailable',
  'Boolean(item.archived_url)',
  'recordedYear'
]) {
  if (!lifecycle.includes(marker)) fail(`Lifecycle projection contract missing marker: ${marker}`);
}

if (filters.includes('successor') || lifecycle.includes('successor')) {
  fail('Phase 7 filter projection must not reinterpret generic related_records as successor semantics');
}

console.log('AI Tools Phase 7 structured filter contract passed');
