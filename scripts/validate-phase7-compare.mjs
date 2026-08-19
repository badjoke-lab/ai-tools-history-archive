import { readFileSync } from 'node:fs';

const component = readFileSync('components/CompareRecords.tsx', 'utf8');
const page = readFileSync('app/compare/page.tsx', 'utf8');
const layout = readFileSync('app/layout.tsx', 'utf8');
const sitemap = readFileSync('app/sitemap.ts', 'utf8');
const fail = (message) => { throw new Error(message); };

for (const marker of [
  "params.getAll('record')",
  "params.get('differences') === 'only'",
  "params.append('record', slug)",
  "params.set('differences', 'only')",
  'Show differences only',
  'Replacement guidance',
  'Data export deadline',
  'Related records',
  'High-reliability evidence',
  'Archived evidence',
  'Known unknowns',
  'Generic related records are not interpreted as replacement or successor targets'
]) {
  if (!component.includes(marker)) fail(`Compare contract missing marker: ${marker}`);
}

for (const marker of ['Compare AI lifecycle records', '2–4 canonical records', "canonical: '/compare/'"]) {
  if (!page.includes(marker)) fail(`Compare page missing marker: ${marker}`);
}
if (!layout.includes("['Compare', '/compare/']")) fail('Primary navigation does not expose Compare');
if (!sitemap.includes("'compare'")) fail('Sitemap does not expose Compare');

if (component.includes('score') || component.includes('ranking') || component.includes('recommendation')) {
  fail('Compare component must not introduce scoring/ranking/recommendation logic');
}
console.log('AI Tools Phase 7 Compare contract passed');
