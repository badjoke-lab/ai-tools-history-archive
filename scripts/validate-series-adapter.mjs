import { existsSync, readFileSync } from 'node:fs';

function readJson(path) {
  if (!existsSync(path)) throw new Error(`${path}: missing`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

const version = readJson('public/version.json');
const nativeIndex = readJson('public/data/records/index.json');
const descriptor = readJson('public/data/series/registry.json');
const index = readJson('public/data/series/index.json');
const errors = [];
const fail = (message) => errors.push(message);

if (descriptor.series_schema_version !== '1.0.0') fail('descriptor series schema version mismatch');
if (descriptor.object_type !== 'registry_descriptor') fail('descriptor object type mismatch');
if (descriptor.registry?.id !== 'ai-tools-history-archive') fail('descriptor registry ID mismatch');
if (descriptor.registry?.native_project_id !== 'atha') fail('descriptor native project ID mismatch');
if (descriptor.registry?.type !== 'ai_tool_lifecycle_history') fail('descriptor registry type mismatch');
if (descriptor.canonical_only !== true) fail('descriptor must be canonical-only');
if (descriptor.record_counts?.primary_records !== version.record_counts.records) fail('descriptor record count mismatch');
if (descriptor.record_counts?.events !== version.record_counts.events) fail('descriptor event count mismatch');
if (descriptor.record_counts?.evidence !== version.record_counts.evidence) fail('descriptor evidence count mismatch');
if (descriptor.verification?.build_commit !== version.build_commit) fail('descriptor build commit mismatch');
if (descriptor.verification?.generated_at !== version.generated_at) fail('descriptor generated_at mismatch');
if (descriptor.capabilities?.relationships !== 'none') fail('generic related_records must not become typed Series relationships');
if (index.record_count !== nativeIndex.record_count) fail('Series/native record count mismatch');
if (index.build_commit !== version.build_commit) fail('Series index build commit mismatch');

const keys = new Set();
for (const row of index.records ?? []) {
  const native = nativeIndex.records.find((item) => item.id === row.native_record_id && item.slug === row.slug);
  if (!native) {
    fail(`${row.slug}: missing native index identity`);
    continue;
  }
  const expectedKey = `ai-tools-history-archive:ai_lifecycle_record:${row.native_record_id}`;
  if (row.global_record_key !== expectedKey) fail(`${row.slug}: global key mismatch`);
  if (keys.has(row.global_record_key)) fail(`${row.slug}: duplicate global key`);
  keys.add(row.global_record_key);

  const nativeDossier = readJson(`public/data/records/${row.slug}.json`);
  const envelope = readJson(`public/data/series/records/${row.slug}.json`);
  if (envelope.object_type !== 'record_envelope') fail(`${row.slug}: envelope object type mismatch`);
  if (envelope.registry_id !== 'ai-tools-history-archive') fail(`${row.slug}: registry ID mismatch`);
  if (envelope.record_key?.native_record_id !== nativeDossier.record?.id) fail(`${row.slug}: native record ID mismatch`);
  if (envelope.record_key?.native_record_type !== 'ai_lifecycle_record') fail(`${row.slug}: native record type mismatch`);
  if (envelope.current_state?.status !== nativeDossier.record?.status) fail(`${row.slug}: status mismatch`);
  if (JSON.stringify(envelope.events?.records ?? []) !== JSON.stringify(nativeDossier.record?.events ?? [])) fail(`${row.slug}: event payload mismatch`);
  if (JSON.stringify(envelope.evidence?.records ?? []) !== JSON.stringify(nativeDossier.record?.evidence ?? [])) fail(`${row.slug}: evidence payload mismatch`);
  if ((envelope.relationships ?? []).length !== 0) fail(`${row.slug}: adapter invented typed relationships`);
  if (envelope.verification?.build_commit !== version.build_commit) fail(`${row.slug}: build commit mismatch`);
}

if ((index.records ?? []).some((row) => row.slug === 'meta-graph-api-older-versions')) {
  fail('API Deprecation Meta placeholder must never appear here; wrong registry leakage');
}

if (errors.length) {
  console.error(`AI Tools Series adapter validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`AI Tools Series adapter validation passed: ${index.record_count} record envelopes`);
