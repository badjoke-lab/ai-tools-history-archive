import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { loadCanonicalRecords } from './load-canonical-records.mjs';

const site = (process.env.PUBLIC_SITE_URL ?? 'https://ai-tools-history-archive.pages.dev').replace(/\/$/, '');
const records = loadCanonicalRecords();
const bySlug = new Map(records.map((record) => [record.slug, record]));
const errors = [];
const fail = (message) => errors.push(message);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const root = 'public/data/records';

if (!existsSync(root)) fail(`${root} missing`);
else {
  const actual = readdirSync(root).filter((name) => name.endsWith('.json') && name !== 'index.json').sort();
  const expected = [...bySlug.keys()].map((slug) => `${slug}.json`).sort();
  if (!same(actual, expected)) fail(`record file set mismatch: expected ${expected.length}, actual ${actual.length}`);

  for (const [slug, record] of bySlug) {
    const path = `${root}/${slug}.json`;
    if (!existsSync(path)) { fail(`missing ${path}`); continue; }
    const dossier = JSON.parse(readFileSync(path, 'utf8'));
    if (dossier.canonical_only !== true) fail(`${slug}: canonical_only must be true`);
    if (dossier.record_type !== 'ai_lifecycle_record') fail(`${slug}: record_type mismatch`);
    if (!same(dossier.record, record)) fail(`${slug}: canonical record payload mismatch`);

    const replacementGuidance = record.evidence.some((item) => item.supports?.includes('replacement_guidance'));
    const exportDeadline = record.events.some((event) => event.type === 'data_export_deadline');
    const eventTypes = [...new Set(record.events.map((event) => event.type))].sort();
    if (dossier.lifecycle_signals?.replacement_guidance_recorded !== replacementGuidance) fail(`${slug}: replacement guidance projection mismatch`);
    if (dossier.lifecycle_signals?.data_export_deadline_recorded !== exportDeadline) fail(`${slug}: export-deadline projection mismatch`);
    if (!same(dossier.lifecycle_signals?.lifecycle_event_types, eventTypes)) fail(`${slug}: event type projection mismatch`);
    if (!same(dossier.lifecycle_signals?.related_records, record.related_records)) fail(`${slug}: related_records projection mismatch`);

    if (dossier.urls?.human !== `${site}/records/${slug}/`) fail(`${slug}: human URL mismatch`);
    if (dossier.urls?.machine !== `${site}/data/records/${slug}.json`) fail(`${slug}: machine URL mismatch`);

    for (const related of record.related_records) {
      if (!bySlug.has(related)) fail(`${slug}: related record does not exist: ${related}`);
    }
  }
}

if (existsSync(`${root}/index.json`)) {
  const index = JSON.parse(readFileSync(`${root}/index.json`, 'utf8'));
  if (index.record_count !== records.length) fail('index record_count mismatch');
  if (index.records?.length !== records.length) fail('index records length mismatch');
} else fail('record index missing');

for (const path of ['public/version.json', 'public/data/manifest.json']) {
  if (!existsSync(path)) fail(`${path} missing`);
}
if (existsSync('public/data/manifest.json')) {
  const manifest = JSON.parse(readFileSync('public/data/manifest.json', 'utf8'));
  if (manifest.record_level?.record_count !== records.length) fail('manifest record count mismatch');
  if (manifest.record_level?.route_template !== '/data/records/{slug}.json') fail('manifest route template mismatch');
  if (manifest.lifecycle_projection?.related_records?.includes('not successor') !== true) fail('manifest must preserve generic related-record semantics');
}
for (const path of ['public/llms.txt', 'public/ai.txt']) {
  if (!existsSync(path)) fail(`${path} missing`);
  else if (!readFileSync(path, 'utf8').includes('/data/records/{slug}.json')) fail(`${path}: record template not advertised`);
}

if (errors.length) {
  console.error(`Machine-record validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Machine-record validation passed: ${records.length} records`);
