import { readFileSync } from 'node:fs';

const origin = (process.env.SERIES_ORIGIN ?? '').replace(/\/$/, '');
const expectedCommit = process.env.SERIES_EXPECTED_COMMIT ?? '';
const attempts = Number(process.env.SERIES_VERIFY_ATTEMPTS ?? '20');
const intervalMs = Number(process.env.SERIES_VERIFY_INTERVAL_MS ?? '15000');
if (!origin.startsWith('https://')) throw new Error('SERIES_ORIGIN must be an https origin');

const localIndex = JSON.parse(readFileSync('public/data/series/index.json', 'utf8'));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
}
function same(a, b) { return JSON.stringify(stable(a)) === JSON.stringify(stable(b)); }

async function fetchJson(path) {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${origin}${path}${separator}series_verify=${Date.now()}`, { headers: { 'cache-control': 'no-cache' }, redirect: 'follow' });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function verifyOnce() {
  const descriptor = await fetchJson('/data/series/registry.json');
  if (descriptor.series_schema_version !== '1.0.0') throw new Error('descriptor schema mismatch');
  if (descriptor.object_type !== 'registry_descriptor') throw new Error('descriptor object type mismatch');
  if (descriptor.registry?.id !== 'ai-tools-history-archive') throw new Error('descriptor registry ID mismatch');
  if (descriptor.registry?.native_project_id !== 'atha') throw new Error('descriptor native project ID mismatch');
  if (descriptor.registry?.type !== 'ai_tool_lifecycle_history') throw new Error('descriptor registry type mismatch');
  if (descriptor.canonical_only !== true) throw new Error('descriptor canonical boundary mismatch');
  if (descriptor.record_counts?.primary_records !== 10 || descriptor.record_counts?.events !== 11 || descriptor.record_counts?.evidence !== 12) throw new Error('descriptor counts mismatch');
  if (descriptor.capabilities?.relationships !== 'none') throw new Error('adapter invented relationship capability');
  if (expectedCommit && descriptor.verification?.build_commit !== expectedCommit) throw new Error(`descriptor build commit mismatch: ${descriptor.verification?.build_commit}`);

  const index = await fetchJson('/data/series/index.json');
  if (index.registry_id !== 'ai-tools-history-archive' || index.canonical_only !== true) throw new Error('Series index identity/boundary mismatch');
  if (index.record_count !== 10) throw new Error(`record count: expected 10, got ${index.record_count}`);
  if (expectedCommit && index.build_commit !== expectedCommit) throw new Error(`index build commit mismatch: ${index.build_commit}`);

  const keys = new Set();
  for (const row of index.records) {
    const localRow = localIndex.records.find((item) => item.native_record_id === row.native_record_id && item.slug === row.slug);
    if (!localRow) throw new Error(`${row.slug}: remote row not present in local accepted index`);
    const expectedKey = `ai-tools-history-archive:ai_lifecycle_record:${row.native_record_id}`;
    if (row.global_record_key !== expectedKey) throw new Error(`${row.slug}: global key mismatch`);
    if (keys.has(row.global_record_key)) throw new Error(`duplicate global key: ${row.global_record_key}`);
    keys.add(row.global_record_key);

    const localEnvelope = JSON.parse(readFileSync(`public/data/series/records/${row.slug}.json`, 'utf8'));
    const remoteEnvelope = await fetchJson(`/data/series/records/${row.slug}.json`);
    if (remoteEnvelope.series_schema_version !== '1.0.0' || remoteEnvelope.object_type !== 'record_envelope') throw new Error(`${row.slug}: envelope contract mismatch`);
    if (remoteEnvelope.registry_id !== 'ai-tools-history-archive') throw new Error(`${row.slug}: envelope registry mismatch`);
    if (remoteEnvelope.global_record_key !== expectedKey) throw new Error(`${row.slug}: envelope global key mismatch`);
    if (remoteEnvelope.current_state?.status !== localEnvelope.current_state?.status) throw new Error(`${row.slug}: status mismatch`);
    if (!same(remoteEnvelope.events?.records ?? [], localEnvelope.events?.records ?? [])) throw new Error(`${row.slug}: event payload mismatch`);
    if (!same(remoteEnvelope.evidence?.records ?? [], localEnvelope.evidence?.records ?? [])) throw new Error(`${row.slug}: evidence payload mismatch`);
    if ((remoteEnvelope.relationships ?? []).length !== 0) throw new Error(`${row.slug}: adapter invented typed relationships`);
    if (expectedCommit && remoteEnvelope.verification?.build_commit !== expectedCommit) throw new Error(`${row.slug}: envelope build commit mismatch`);
  }
  return descriptor;
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    const descriptor = await verifyOnce();
    console.log('AI Tools Series adapter origin verification PASS');
    console.log(`origin=${origin}`);
    console.log(`registry_id=${descriptor.registry.id}`);
    console.log(`record_count=${localIndex.record_count}`);
    console.log(`build_commit=${descriptor.verification.build_commit}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.error(`Attempt ${attempt}/${attempts} failed: ${error.message}`);
    if (attempt < attempts) await sleep(intervalMs);
  }
}
throw lastError;
