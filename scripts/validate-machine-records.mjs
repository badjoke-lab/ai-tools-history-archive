import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { loadCanonicalRecords } from './load-canonical-records.mjs';

const site = (process.env.PUBLIC_SITE_URL ?? 'https://ai-tools-history-archive.pages.dev').replace(/\/$/, '');
const records = loadCanonicalRecords();
const bySlug = new Map(records.map((record) => [record.slug, record]));
const events = records.flatMap((record) => record.events);
const evidence = records.flatMap((record) => record.evidence);
const errors = [];
const fail = (message) => errors.push(message);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const root = 'public/data/records';

function countBy(values) {
  return values.reduce((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function recordedYear(value) {
  if (!value) return null;
  const match = String(value).match(/^(\d{4})/);
  return match?.[1] ?? null;
}

function projection(record) {
  return {
    launchYear: recordedYear(record.launched_at),
    endYear: recordedYear(record.ended_at),
    replacementGuidanceRecorded: record.evidence.some((item) => item.supports?.includes('replacement_guidance')),
    dataExportDeadlineRecorded: record.events.some((event) => event.type === 'data_export_deadline'),
    highReliabilityEvidence: record.evidence.some((item) => item.reliability === 'high'),
    archivedEvidenceAvailable: record.evidence.some((item) => Boolean(item.archived_url))
  };
}

function lifespanBucket(launchYear, endYear) {
  if (!launchYear || !endYear) return null;
  const span = Number(endYear) - Number(launchYear);
  if (!Number.isFinite(span) || span < 0) return null;
  if (span === 0) return 'same calendar year';
  if (span === 1) return '1 calendar year';
  if (span <= 3) return '2–3 calendar years';
  if (span <= 5) return '4–5 calendar years';
  return '6+ calendar years';
}

const projections = records.map((record) => ({ record, projection: projection(record) }));
const lifespanBuckets = projections
  .map(({ projection }) => lifespanBucket(projection.launchYear, projection.endYear))
  .filter(Boolean);

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

for (const path of ['public/version.json', 'public/data/manifest.json', 'public/data/stats.json']) {
  if (!existsSync(path)) fail(`${path} missing`);
}

if (existsSync('public/data/stats.json')) {
  const stats = JSON.parse(readFileSync('public/data/stats.json', 'utf8'));
  const expectedDistributions = {
    by_status: countBy(records.map((record) => record.status)),
    by_entity_type: countBy(records.map((record) => record.entity_type)),
    by_category: countBy(records.flatMap((record) => record.category)),
    by_event_type: countBy(events.map((event) => event.type)),
    by_confidence: countBy(records.map((record) => record.confidence)),
    by_operator: countBy(records.map((record) => record.operator)),
    by_launch_year: countBy(projections.map(({ projection }) => projection.launchYear).filter(Boolean)),
    by_end_year: countBy(projections.map(({ projection }) => projection.endYear).filter(Boolean)),
    lifespan_calendar_year_span: countBy(lifespanBuckets),
    by_evidence_source_type: countBy(evidence.map((item) => item.source_type)),
    by_evidence_reliability: countBy(evidence.map((item) => item.reliability)),
    by_review_year: countBy(records.map((record) => String(record.last_reviewed_at).slice(0, 4)))
  };
  const expectedCoverage = {
    replacement_guidance_recorded: projections.filter(({ projection }) => projection.replacementGuidanceRecorded).length,
    data_export_deadline_recorded: projections.filter(({ projection }) => projection.dataExportDeadlineRecorded).length,
    high_reliability_evidence: projections.filter(({ projection }) => projection.highReliabilityEvidence).length,
    archived_evidence_available: projections.filter(({ projection }) => projection.archivedEvidenceAvailable).length,
    launch_year_recorded: projections.filter(({ projection }) => Boolean(projection.launchYear)).length,
    end_year_recorded: projections.filter(({ projection }) => Boolean(projection.endYear)).length,
    lifespan_comparable: lifespanBuckets.length,
    last_reviewed_recorded: records.filter((record) => Boolean(record.last_reviewed_at)).length
  };
  if (stats.canonical_only !== true) fail('stats canonical_only must be true');
  if (stats.stats_type !== 'ai_lifecycle_registry_stats') fail('stats_type mismatch');
  if (!same(stats.totals, { records: records.length, events: events.length, evidence: evidence.length })) fail('stats totals mismatch');
  if (!same(stats.distributions, expectedDistributions)) fail('stats distributions mismatch');
  if (!same(stats.coverage, expectedCoverage)) fail('stats coverage mismatch');
  if (!String(stats.interpretation?.replacement_guidance_recorded ?? '').includes('does not identify')) fail('stats replacement interpretation missing safety boundary');
  if (!String(stats.interpretation?.data_export_deadline_recorded ?? '').includes('does not mean')) fail('stats export interpretation missing safety boundary');
}

if (existsSync('public/data/manifest.json')) {
  const manifest = JSON.parse(readFileSync('public/data/manifest.json', 'utf8'));
  if (manifest.record_level?.record_count !== records.length) fail('manifest record count mismatch');
  if (manifest.record_level?.route_template !== '/data/records/{slug}.json') fail('manifest route template mismatch');
  if (manifest.public_files?.stats !== `${site}/data/stats.json`) fail('manifest stats URL mismatch');
  if (manifest.stats?.route !== '/data/stats.json') fail('manifest stats route mismatch');
  if (manifest.lifecycle_projection?.related_records?.includes('not successor') !== true) fail('manifest must preserve generic related-record semantics');
}

if (existsSync('public/version.json')) {
  const version = JSON.parse(readFileSync('public/version.json', 'utf8'));
  if (version.stats !== `${site}/data/stats.json`) fail('version stats URL mismatch');
}

for (const path of ['public/llms.txt', 'public/ai.txt']) {
  if (!existsSync(path)) fail(`${path} missing`);
  else {
    const text = readFileSync(path, 'utf8');
    if (!text.includes('/data/records/{slug}.json')) fail(`${path}: record template not advertised`);
    if (!text.includes('/data/stats.json')) fail(`${path}: stats not advertised`);
  }
}

if (errors.length) {
  console.error(`Machine-record validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Machine-record validation passed: ${records.length} records and canonical stats`);
