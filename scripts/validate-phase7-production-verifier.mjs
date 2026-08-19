import { readFileSync } from 'node:fs';

const script = readFileSync('scripts/check-phase7-production.mjs', 'utf8');
const workflow = readFileSync('.github/workflows/phase7-production.yml', 'utf8');
const nextConfig = readFileSync('next.config.mjs', 'utf8');
const errors = [];
const requireText = (source, text, label) => {
  if (!source.includes(text)) errors.push(`${label}: missing ${text}`);
};

for (const marker of [
  '1850af25d16e842915506b38d568baa45b3eb202',
  '/version.json',
  '/data/manifest.json',
  '/data/stats.json',
  '/data/records/openai-assistants-api.json',
  '/records/',
  '/compare/',
  '/stats/',
  '/sitemap.xml',
  "assistants.record?.status === 'deprecated'",
  "assistants.record?.ended_at === '2026-08-26'",
  'isAncestor(floor, observed)',
  "isAncestor(observed, 'HEAD')"
]) requireText(script, marker, 'production verifier');

for (const marker of [
  'ATHA_PRODUCTION_ORIGIN: https://ai-tools-history-archive.pages.dev',
  'PHASE7_IMPLEMENTATION_FLOOR: 1850af25d16e842915506b38d568baa45b3eb202',
  'fetch-depth: 0',
  "context: 'atha-phase7-production'",
  'statuses: write',
  'actions/upload-artifact@v4',
  'cancel-in-progress: true'
]) requireText(workflow, marker, 'production workflow');

requireText(nextConfig, "await import('./scripts/generate-machine-records.mjs')", 'Next build hook');
requireText(nextConfig, "output: 'export'", 'Next build hook');

if (errors.length) {
  console.error(`Phase 7 production-verifier contract failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Phase 7 production-verifier contract passed');
