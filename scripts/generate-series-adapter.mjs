import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';

const SERIES_SCHEMA_VERSION = '1.0.0';
const ADAPTER_VERSION = '1.0.0';
const REGISTRY_ID = 'ai-tools-history-archive';
const site = (process.env.PUBLIC_SITE_URL ?? 'https://ai-tools-history-archive.pages.dev').replace(/\/$/, '');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
  }
  return value;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(stableValue(value), null, 2)}\n`);
}

const version = readJson('public/version.json');
const manifest = readJson('public/data/manifest.json');
const nativeIndex = readJson('public/data/records/index.json');

if (version.canonical_only !== true || manifest.canonical_only !== true || nativeIndex.canonical_only !== true) {
  throw new Error('AI Tools native public layer must remain canonical-only');
}
if (version.project_id !== 'atha' || manifest.project_id !== 'atha') {
  throw new Error('Unexpected AI Tools native project ID');
}
if (nativeIndex.record_count !== version.record_counts.records) {
  throw new Error('Native record count mismatch');
}

const outputRoot = 'public/data/series';
const recordRoot = `${outputRoot}/records`;
rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(recordRoot, { recursive: true });

const seriesRows = [];
for (const row of [...nativeIndex.records].sort((a, b) => a.slug.localeCompare(b.slug))) {
  const nativePath = `public/data/records/${row.slug}.json`;
  const dossier = readJson(nativePath);
  if (dossier.canonical_only !== true || dossier.record_type !== 'ai_lifecycle_record') {
    throw new Error(`${row.slug}: unexpected native dossier boundary`);
  }
  const record = dossier.record;
  if (!record || record.id !== row.id || record.slug !== row.slug) {
    throw new Error(`${row.slug}: native identity mismatch`);
  }

  const nativeRecordType = dossier.record_type;
  const globalKey = `${REGISTRY_ID}:${nativeRecordType}:${record.id}`;
  const seriesMachinePath = `/data/series/records/${record.slug}.json`;
  const nativeMachineUrl = `${site}/data/records/${record.slug}.json`;
  const humanUrl = dossier.urls?.human ?? `${site}/records/${record.slug}/`;

  const envelope = {
    series_schema_version: SERIES_SCHEMA_VERSION,
    object_type: 'record_envelope',
    registry_id: REGISTRY_ID,
    global_record_key: globalKey,
    record_key: {
      native_record_type: nativeRecordType,
      native_record_id: record.id,
      slug: record.slug,
    },
    urls: {
      human: humanUrl,
      machine: `${site}${seriesMachinePath}`,
      native_machine: nativeMachineUrl,
    },
    identity: {
      name: record.name,
      aliases: Array.isArray(record.aliases) ? record.aliases : [],
    },
    current_state: {
      status: record.status ?? null,
      native: {
        status: record.status ?? null,
        entity_type: record.entity_type ?? null,
        operator: record.operator ?? null,
        confidence: record.confidence ?? null,
        last_reviewed_at: record.last_reviewed_at ?? null,
      },
    },
    events: {
      mode: 'inline',
      records: Array.isArray(record.events) ? record.events : [],
    },
    evidence: {
      mode: 'inline',
      records: Array.isArray(record.evidence) ? record.evidence : [],
    },
    relationships: [],
    verification: {
      build_commit: version.build_commit ?? null,
      generated_at: version.generated_at ?? dossier.generated_at ?? null,
      last_reviewed_at: record.last_reviewed_at ?? null,
    },
    provenance: {
      canonical_only: true,
      adapter: {
        id: 'series-adapter-ai-tools-history-archive',
        version: ADAPTER_VERSION,
      },
      native_manifest: `${site}/data/manifest.json`,
      native_record: nativeMachineUrl,
      relationship_boundary: 'generic native related_records are not projected as successor/replacement relationships',
    },
  };

  writeJson(`${recordRoot}/${record.slug}.json`, envelope);
  seriesRows.push({
    global_record_key: globalKey,
    native_record_type: nativeRecordType,
    native_record_id: record.id,
    slug: record.slug,
    name: record.name,
    status: record.status ?? null,
    human_url: humanUrl,
    machine_url: `${site}${seriesMachinePath}`,
    native_machine_url: nativeMachineUrl,
  });
}

const descriptor = {
  series_schema_version: SERIES_SCHEMA_VERSION,
  object_type: 'registry_descriptor',
  registry: {
    id: REGISTRY_ID,
    native_project_id: version.project_id,
    name: 'AI Tools History Archive',
    type: manifest.registry_type,
    origin: site,
    repository: 'https://github.com/badjoke-lab/ai-tools-history-archive',
  },
  canonical_only: true,
  native_contract: {
    schema_version: version.schema_version,
    version_url: `${site}/version.json`,
    manifest_url: `${site}/data/manifest.json`,
  },
  record_counts: {
    primary_records: version.record_counts.records,
    events: version.record_counts.events,
    evidence: version.record_counts.evidence,
    native: version.record_counts,
  },
  record_types: [
    {
      series_record_type: 'ai_lifecycle',
      native_record_type: 'ai_lifecycle_record',
      machine_template: '/data/series/records/{slug}.json',
    },
  ],
  routes: {
    descriptor: '/data/series/registry.json',
    index: '/data/series/index.json',
    record_templates: ['/data/series/records/{slug}.json'],
    search: '/records/',
    compare: '/compare/',
    stats: '/stats/',
  },
  capabilities: {
    record_json: true,
    events: 'inline',
    evidence: 'inline',
    relationships: 'none',
    search: true,
    compare: true,
    stats: true,
  },
  verification: {
    build_commit: version.build_commit ?? null,
    generated_at: version.generated_at ?? null,
  },
  data_safety: {
    canonical_only: true,
    includes_unreviewed_candidates: false,
    includes_internal_monitoring: false,
    includes_private_notes: false,
    ai_generated_canonical_facts: false,
  },
};

const seriesIndex = {
  series_schema_version: SERIES_SCHEMA_VERSION,
  object_type: 'record_index',
  registry_id: REGISTRY_ID,
  canonical_only: true,
  build_commit: version.build_commit ?? null,
  generated_at: version.generated_at ?? null,
  record_count: seriesRows.length,
  records: seriesRows,
};

writeJson(`${outputRoot}/registry.json`, descriptor);
writeJson(`${outputRoot}/index.json`, seriesIndex);
console.log(`Generated AI Tools Series adapter: ${seriesRows.length} record envelopes`);
