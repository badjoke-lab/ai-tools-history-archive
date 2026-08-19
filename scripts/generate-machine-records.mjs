import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { loadCanonicalRecords } from './load-canonical-records.mjs';

const site = (process.env.PUBLIC_SITE_URL ?? 'https://ai-tools-history-archive.pages.dev').replace(/\/$/, '');
const generatedAt = new Date().toISOString();
const buildCommit = process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null;
const records = loadCanonicalRecords();
const sorted = [...records].sort((a, b) => a.slug.localeCompare(b.slug));
const events = records.flatMap((record) => record.events);
const evidence = records.flatMap((record) => record.evidence);
const eventCount = events.length;
const evidenceCount = evidence.length;

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

function lifecycleProjection(record) {
  return {
    launch_year: recordedYear(record.launched_at),
    end_year: recordedYear(record.ended_at),
    event_types: [...new Set(record.events.map((event) => event.type))].sort(),
    replacement_guidance_recorded: record.evidence.some((item) => item.supports?.includes('replacement_guidance')),
    data_export_deadline_recorded: record.events.some((event) => event.type === 'data_export_deadline'),
    high_reliability_evidence: record.evidence.some((item) => item.reliability === 'high'),
    archived_evidence_available: record.evidence.some((item) => Boolean(item.archived_url))
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

const projections = records.map((record) => ({ record, projection: lifecycleProjection(record) }));
const lifespanBuckets = projections
  .map(({ projection }) => lifespanBucket(projection.launch_year, projection.end_year))
  .filter(Boolean);

const machineRoot = 'public/data/records';
rmSync(machineRoot, { recursive: true, force: true });
mkdirSync(machineRoot, { recursive: true });

for (const record of sorted) {
  const projection = lifecycleProjection(record);
  const dossier = {
    schema_version: '1.0.0',
    generated_at: generatedAt,
    canonical_only: true,
    record_type: 'ai_lifecycle_record',
    record,
    lifecycle_signals: {
      replacement_guidance_recorded: projection.replacement_guidance_recorded,
      data_export_deadline_recorded: projection.data_export_deadline_recorded,
      lifecycle_event_types: projection.event_types,
      related_records: [...record.related_records]
    },
    urls: {
      human: `${site}/records/${record.slug}/`,
      machine: `${site}/data/records/${record.slug}.json`
    }
  };
  writeFileSync(`${machineRoot}/${record.slug}.json`, `${JSON.stringify(dossier, null, 2)}\n`);
}

const index = {
  schema_version: '1.0.0',
  generated_at: generatedAt,
  canonical_only: true,
  record_count: sorted.length,
  records: sorted.map((record) => ({
    id: record.id,
    slug: record.slug,
    name: record.name,
    status: record.status,
    entity_type: record.entity_type,
    operator: record.operator,
    last_reviewed_at: record.last_reviewed_at,
    human_url: `${site}/records/${record.slug}/`,
    machine_url: `${site}/data/records/${record.slug}.json`
  }))
};
writeFileSync(`${machineRoot}/index.json`, `${JSON.stringify(index, null, 2)}\n`);

mkdirSync('public/data', { recursive: true });
const stats = {
  schema_version: '1.0.0',
  generated_at: generatedAt,
  canonical_only: true,
  stats_type: 'ai_lifecycle_registry_stats',
  totals: {
    records: records.length,
    events: eventCount,
    evidence: evidenceCount
  },
  distributions: {
    by_status: countBy(records.map((record) => record.status)),
    by_entity_type: countBy(records.map((record) => record.entity_type)),
    by_category: countBy(records.flatMap((record) => record.category)),
    by_event_type: countBy(events.map((event) => event.type)),
    by_confidence: countBy(records.map((record) => record.confidence)),
    by_operator: countBy(records.map((record) => record.operator)),
    by_launch_year: countBy(projections.map(({ projection }) => projection.launch_year).filter(Boolean)),
    by_end_year: countBy(projections.map(({ projection }) => projection.end_year).filter(Boolean)),
    lifespan_calendar_year_span: countBy(lifespanBuckets),
    by_evidence_source_type: countBy(evidence.map((item) => item.source_type)),
    by_evidence_reliability: countBy(evidence.map((item) => item.reliability)),
    by_review_year: countBy(records.map((record) => String(record.last_reviewed_at).slice(0, 4)))
  },
  coverage: {
    replacement_guidance_recorded: projections.filter(({ projection }) => projection.replacement_guidance_recorded).length,
    data_export_deadline_recorded: projections.filter(({ projection }) => projection.data_export_deadline_recorded).length,
    high_reliability_evidence: projections.filter(({ projection }) => projection.high_reliability_evidence).length,
    archived_evidence_available: projections.filter(({ projection }) => projection.archived_evidence_available).length,
    launch_year_recorded: projections.filter(({ projection }) => Boolean(projection.launch_year)).length,
    end_year_recorded: projections.filter(({ projection }) => Boolean(projection.end_year)).length,
    lifespan_comparable: lifespanBuckets.length,
    last_reviewed_recorded: records.filter((record) => Boolean(record.last_reviewed_at)).length
  },
  interpretation: {
    lifespan_calendar_year_span: 'computed only when both canonical launch and end/change years are recorded; not an exact duration when canonical dates are year-only',
    replacement_guidance_recorded: 'provenance signal only; does not identify or endorse a replacement target',
    data_export_deadline_recorded: 'canonical event signal only; does not mean export or migration completed',
    absent_signal: 'not recorded does not prove that the underlying event, replacement, archive, or lifecycle boundary did not exist'
  }
};
writeFileSync('public/data/stats.json', `${JSON.stringify(stats, null, 2)}\n`);

const manifest = {
  schema_version: '1.0.0',
  generated_at: generatedAt,
  canonical_only: true,
  project_id: 'atha',
  registry_type: 'ai_tool_lifecycle_history',
  record_counts: {
    records: records.length,
    events: eventCount,
    evidence: evidenceCount
  },
  source_of_truth: 'data/records.ts',
  public_files: {
    version: `${site}/version.json`,
    stats: `${site}/data/stats.json`,
    record_index: `${site}/data/records/index.json`,
    record_template: `${site}/data/records/{slug}.json`
  },
  record_level: {
    enabled: true,
    record_count: records.length,
    route_template: '/data/records/{slug}.json',
    human_route_template: '/records/{slug}/'
  },
  stats: {
    enabled: true,
    route: '/data/stats.json',
    canonical_only: true
  },
  lifecycle_projection: {
    replacement_guidance_recorded: 'true only when canonical evidence supports includes replacement_guidance; does not identify a replacement target',
    data_export_deadline_recorded: 'true only when a canonical data_export_deadline event exists; does not mean migration/export completed',
    related_records: 'generic canonical related records; not successor/replacement semantics'
  },
  data_safety: {
    canonical_only: true,
    unreviewed_candidates_included: false,
    ai_generated_facts_included: false
  }
};
writeFileSync('public/data/manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);

const version = {
  schema_version: '1.0.0',
  generated_at: generatedAt,
  canonical_only: true,
  project_id: 'atha',
  build_commit: buildCommit,
  record_counts: manifest.record_counts,
  manifest: `${site}/data/manifest.json`,
  stats: `${site}/data/stats.json`,
  record_index: `${site}/data/records/index.json`,
  record_template: `${site}/data/records/{slug}.json`
};
writeFileSync('public/version.json', `${JSON.stringify(version, null, 2)}\n`);

writeFileSync('public/llms.txt', `# AI Tools History Archive\n\nEvidence-backed lifecycle registry for AI tools, services, products, APIs, models, features, and hardware.\n\nCanonical only: true\nRecords: ${records.length}\nEvents: ${eventCount}\nEvidence: ${evidenceCount}\nGenerated: ${generatedAt}\n\nMachine-readable files:\n- ${site}/version.json\n- ${site}/data/manifest.json\n- ${site}/data/stats.json\n- ${site}/data/records/index.json\n- ${site}/data/records/{slug}.json\n\nReplacement/migration signals are only recorded when supported by canonical events/evidence. Generic related_records are not replacement/successor claims.\n`);
writeFileSync('public/ai.txt', `AI Tools History Archive canonical lifecycle registry\nCanonical only: true\nRecords: ${records.length}\nEvents: ${eventCount}\nEvidence: ${evidenceCount}\nManifest: ${site}/data/manifest.json\nStats: ${site}/data/stats.json\nRecord index: ${site}/data/records/index.json\nPer-record JSON: ${site}/data/records/{slug}.json\nNo AI-generated canonical history. No subjective rankings.\n`);

console.log(`Generated ${records.length} AI lifecycle record dossiers, ${eventCount} events, ${evidenceCount} evidence items and canonical stats`);
