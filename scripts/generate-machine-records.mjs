import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { loadCanonicalRecords } from './load-canonical-records.mjs';

const site = (process.env.PUBLIC_SITE_URL ?? 'https://ai-tools-history-archive.pages.dev').replace(/\/$/, '');
const generatedAt = new Date().toISOString();
const buildCommit = process.env.CF_PAGES_COMMIT_SHA ?? process.env.GITHUB_SHA ?? null;
const records = loadCanonicalRecords();
const sorted = [...records].sort((a, b) => a.slug.localeCompare(b.slug));
const eventCount = records.reduce((sum, record) => sum + record.events.length, 0);
const evidenceCount = records.reduce((sum, record) => sum + record.evidence.length, 0);

const machineRoot = 'public/data/records';
rmSync(machineRoot, { recursive: true, force: true });
mkdirSync(machineRoot, { recursive: true });

for (const record of sorted) {
  const dossier = {
    schema_version: '1.0.0',
    generated_at: generatedAt,
    canonical_only: true,
    record_type: 'ai_lifecycle_record',
    record,
    lifecycle_signals: {
      replacement_guidance_recorded: record.evidence.some((item) => item.supports?.includes('replacement_guidance')),
      data_export_deadline_recorded: record.events.some((event) => event.type === 'data_export_deadline'),
      lifecycle_event_types: [...new Set(record.events.map((event) => event.type))].sort(),
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
    record_index: `${site}/data/records/index.json`,
    record_template: `${site}/data/records/{slug}.json`
  },
  record_level: {
    enabled: true,
    record_count: records.length,
    route_template: '/data/records/{slug}.json',
    human_route_template: '/records/{slug}/'
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
  record_index: `${site}/data/records/index.json`,
  record_template: `${site}/data/records/{slug}.json`
};
writeFileSync('public/version.json', `${JSON.stringify(version, null, 2)}\n`);

writeFileSync('public/llms.txt', `# AI Tools History Archive\n\nEvidence-backed lifecycle registry for AI tools, services, products, APIs, models, features, and hardware.\n\nCanonical only: true\nRecords: ${records.length}\nEvents: ${eventCount}\nEvidence: ${evidenceCount}\nGenerated: ${generatedAt}\n\nMachine-readable files:\n- ${site}/version.json\n- ${site}/data/manifest.json\n- ${site}/data/records/index.json\n- ${site}/data/records/{slug}.json\n\nReplacement/migration signals are only recorded when supported by canonical events/evidence. Generic related_records are not replacement/successor claims.\n`);
writeFileSync('public/ai.txt', `AI Tools History Archive canonical lifecycle registry\nCanonical only: true\nRecords: ${records.length}\nEvents: ${eventCount}\nEvidence: ${evidenceCount}\nManifest: ${site}/data/manifest.json\nRecord index: ${site}/data/records/index.json\nPer-record JSON: ${site}/data/records/{slug}.json\nNo AI-generated canonical history. No subjective rankings.\n`);

console.log(`Generated ${records.length} AI lifecycle record dossiers, ${eventCount} events, ${evidenceCount} evidence items`);
