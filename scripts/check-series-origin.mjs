import { readFileSync } from 'node:fs';

const origin = (process.env.SERIES_ORIGIN ?? '').replace(/\/$/, '');
const attempts = Number(process.env.SERIES_VERIFY_ATTEMPTS ?? '20');
const intervalMs = Number(process.env.SERIES_VERIFY_INTERVAL_MS ?? '15000');
if (!origin.startsWith('https://')) throw new Error('SERIES_ORIGIN must be an https origin');

const localDescriptor = JSON.parse(readFileSync('public/data/series/registry.json', 'utf8'));
const localIndex = JSON.parse(readFileSync('public/data/series/index.json', 'utf8'));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function comparable(value) {
  const copy = structuredClone(value);
  if (copy.generated_at !== undefined) delete copy.generated_at;
  if (copy.verification?.generated_at !== undefined) delete copy.verification.generated_at;
  return stableValue(copy);
}

function equalIgnoringGeneratedAt(actual, expected, label) {
  if (JSON.stringify(comparable(actual)) !== JSON.stringify(comparable(expected))) {
    throw new Error(`${label}: remote/local mismatch`);
  }
}

async function fetchJson(path) {
  const separator = path.includes('?') ? '&' : '?';
  const response = await fetch(`${origin}${path}${separator}series_verify=${Date.now()}`, {
    headers: { 'cache-control': 'no-cache' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function verifyOnce() {
  const descriptor = await fetchJson('/data/series/registry.json');
  equalIgnoringGeneratedAt(descriptor, localDescriptor, 'registry descriptor');
  if (descriptor.registry?.native_project_id !== 'atha') throw new Error('native project ID mismatch');
  if (descriptor.capabilities?.relationships !== 'none') throw new Error('adapter invented relationship capability');

  const index = await fetchJson('/data/series/index.json');
  equalIgnoringGeneratedAt(index, localIndex, 'Series index');
  if (index.record_count !== 10) throw new Error(`record count: expected 10, got ${index.record_count}`);

  const keys = new Set();
  for (const row of index.records) {
    if (keys.has(row.global_record_key)) throw new Error(`duplicate global key: ${row.global_record_key}`);
    keys.add(row.global_record_key);
    const localEnvelope = JSON.parse(readFileSync(`public/data/series/records/${row.slug}.json`, 'utf8'));
    const remoteEnvelope = await fetchJson(`/data/series/records/${row.slug}.json`);
    equalIgnoringGeneratedAt(remoteEnvelope, localEnvelope, `${row.slug} envelope`);
    if ((remoteEnvelope.relationships ?? []).length !== 0) throw new Error(`${row.slug}: adapter invented typed relationships`);
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
