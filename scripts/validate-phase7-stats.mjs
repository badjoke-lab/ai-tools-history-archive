import { readFileSync } from 'node:fs';

const page = readFileSync('app/stats/page.tsx', 'utf8');
const stats = readFileSync('lib/stats.ts', 'utf8');
const generator = readFileSync('scripts/generate-machine-records.mjs', 'utf8');
const errors = [];
const requireText = (source, text, label) => {
  if (!source.includes(text)) errors.push(`${label}: missing ${text}`);
};

for (const marker of [
  'Lifecycle and provenance coverage',
  'By provider / operator',
  'Recorded lifespan span',
  'Evidence source type',
  'Evidence reliability',
  'What these numbers do not claim'
]) requireText(page, marker, 'stats page');

for (const marker of [
  'replacementGuidanceRecorded',
  'dataExportDeadlineRecorded',
  'highReliabilityEvidence',
  'archivedEvidenceAvailable',
  'lifespanComparable'
]) requireText(stats, marker, 'stats projection');

requireText(page, 'Absence is not proof', 'stats safety copy');
requireText(page, 'does not identify or endorse a replacement target', 'stats safety copy');
requireText(page, 'do not claim', 'stats safety copy');
requireText(generator, "public/data/stats.json", 'machine stats generation');
requireText(generator, 'canonical_only: true', 'machine stats generation');
requireText(generator, 'does not identify or endorse a replacement target', 'machine stats safety');
requireText(generator, 'does not mean export or migration completed', 'machine stats safety');

if (errors.length) {
  console.error(`Phase 7 Stats validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Phase 7 Stats contract validation passed');
