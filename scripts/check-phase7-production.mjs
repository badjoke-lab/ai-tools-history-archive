import { execFileSync } from 'node:child_process';

const origin = (process.env.ATHA_PRODUCTION_ORIGIN ?? 'https://ai-tools-history-archive.pages.dev').replace(/\/$/, '');
const floor = process.env.PHASE7_IMPLEMENTATION_FLOOR ?? '1850af25d16e842915506b38d568baa45b3eb202';
const attempts = Number(process.env.PHASE7_VERIFY_ATTEMPTS ?? 20);
const intervalMs = Number(process.env.PHASE7_VERIFY_INTERVAL_MS ?? 15000);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(path) {
  const url = `${origin}${path}${path.includes('?') ? '&' : '?'}phase7_verify=${Date.now()}`;
  const response = await fetch(url, {
    redirect: 'follow',
    cache: 'no-store',
    headers: { 'cache-control': 'no-cache', 'user-agent': 'atha-phase7-production-verifier/1.0' }
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.text();
}

async function fetchJson(path) {
  const text = await fetchText(path);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${path}: invalid JSON: ${error.message}`);
  }
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function isAncestor(ancestor, descendant) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', ancestor, descendant], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForReviewedProduction() {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const version = await fetchJson('/version.json');
      const observed = version.build_commit;
      console.log(`Attempt ${attempt}/${attempts}: production build_commit=${observed ?? 'null'}`);

      if (!observed || !/^[0-9a-f]{40}$/i.test(observed)) {
        if (attempt === attempts) throw new Error('Production version.json does not expose a valid build_commit');
        await sleep(intervalMs);
        continue;
      }

      try {
        git('cat-file', '-e', `${observed}^{commit}`);
      } catch {
        if (attempt === attempts) throw new Error(`Production commit ${observed} is not present in reviewed repository history`);
        await sleep(intervalMs);
        continue;
      }

      if (!isAncestor(floor, observed)) {
        console.log(`Production commit ${observed} is older than Phase 7 implementation floor ${floor}`);
        if (attempt === attempts) throw new Error('Production did not reach the reviewed Phase 7 implementation floor');
        await sleep(intervalMs);
        continue;
      }

      if (!isAncestor(observed, 'HEAD')) {
        throw new Error(`Production commit ${observed} is not an ancestor of current reviewed main`);
      }

      return { version, observed };
    } catch (error) {
      console.log(`Attempt ${attempt}/${attempts} failed: ${error.message}`);
      if (attempt === attempts) throw error;
      await sleep(intervalMs);
    }
  }
  throw new Error('Production verification exhausted attempts');
}

const { version, observed } = await waitForReviewedProduction();
const [manifest, stats, assistants, recordsHtml, compareHtml, statsHtml, sitemap] = await Promise.all([
  fetchJson('/data/manifest.json'),
  fetchJson('/data/stats.json'),
  fetchJson('/data/records/openai-assistants-api.json'),
  fetchText('/records/'),
  fetchText('/compare/?record=openai-assistants-api&record=google-gemini-2-0-flash-models&differences=only'),
  fetchText('/stats/'),
  fetchText('/sitemap.xml')
]);

assert(version.canonical_only === true, 'version.json must be canonical_only');
assert(manifest.canonical_only === true, 'manifest must be canonical_only');
assert(stats.canonical_only === true, 'stats must be canonical_only');
assert(assistants.canonical_only === true, 'record dossier must be canonical_only');

assert(version.record_counts?.records === 10, `expected 10 records, got ${version.record_counts?.records}`);
assert(version.record_counts?.events === 11, `expected 11 events, got ${version.record_counts?.events}`);
assert(version.record_counts?.evidence === 12, `expected 12 evidence items, got ${version.record_counts?.evidence}`);
assert(JSON.stringify(version.record_counts) === JSON.stringify(manifest.record_counts), 'version/manifest record counts differ');
assert(stats.totals?.records === 10 && stats.totals?.events === 11 && stats.totals?.evidence === 12, 'stats totals do not match reviewed Phase 7 counts');

assert(manifest.public_files?.stats === `${origin}/data/stats.json`, 'manifest does not advertise production stats URL');
assert(manifest.record_level?.route_template === '/data/records/{slug}.json', 'manifest record-level route missing');
assert(manifest.stats?.route === '/data/stats.json', 'manifest stats route missing');
assert(manifest.data_safety?.unreviewed_candidates_included === false, 'manifest must exclude unreviewed candidates');
assert(manifest.data_safety?.ai_generated_facts_included === false, 'manifest must exclude AI-generated canonical facts');

assert(assistants.record?.slug === 'openai-assistants-api', 'Assistants dossier slug mismatch');
assert(assistants.record?.status === 'deprecated', 'Assistants API must remain deprecated before 2026-08-26 verification');
assert(assistants.record?.ended_at === '2026-08-26', 'Assistants API announced shutdown boundary missing');
assert(assistants.record?.last_reviewed_at === '2026-08-19', 'Assistants API review date missing');
assert(assistants.lifecycle_signals?.replacement_guidance_recorded === true, 'Assistants replacement-guidance signal missing');
assert(assistants.record?.events?.some((event) => event.id === 'atha_event_000011' && event.type === 'shutdown_notice'), 'Assistants shutdown-notice event missing');
assert(assistants.record?.evidence?.some((item) => item.id === 'atha_evidence_000011'), 'Assistants first-party evidence 000011 missing');
assert(assistants.record?.evidence?.some((item) => item.id === 'atha_evidence_000012'), 'Assistants first-party evidence 000012 missing');

for (const marker of ['AI lifecycle records', 'Provider / operator', 'Replacement guidance', 'Archived evidence']) {
  assert(recordsHtml.includes(marker), `records page missing marker: ${marker}`);
}
for (const marker of ['Compare AI lifecycle records', 'Show differences only', 'Generic related records are not interpreted as replacement or successor targets']) {
  assert(compareHtml.includes(marker), `compare page missing marker: ${marker}`);
}
for (const marker of ['AI lifecycle archive statistics', 'Lifecycle and provenance coverage', 'By provider / operator', 'What these numbers do not claim']) {
  assert(statsHtml.includes(marker), `stats page missing marker: ${marker}`);
}
for (const path of ['/compare/', '/stats/', '/records/openai-assistants-api/']) {
  assert(sitemap.includes(`${origin}${path}`), `sitemap missing ${path}`);
}

console.log(`Phase 7 production PASS`);
console.log(`production_sha=${observed}`);
console.log(`implementation_floor=${floor}`);
console.log(`counts=${version.record_counts.records} records / ${version.record_counts.events} events / ${version.record_counts.evidence} evidence`);
