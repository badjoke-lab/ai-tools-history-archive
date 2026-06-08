import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const recordsPath = path.join(root, 'data', 'records.ts');
const source = fs.readFileSync(recordsPath, 'utf8');
const errors = [];

function collect(regex) {
  return Array.from(source.matchAll(regex), (match) => match[1]);
}

function report(message) {
  errors.push(message);
}

function checkDuplicates(values, label) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  for (const duplicate of duplicates) {
    report(`Duplicate ${label}: ${duplicate}`);
  }
}

const recordIds = collect(/^\s{4}id:\s*'(atha_(?!event_|evidence_)[^']+)'/gm);
const eventIds = collect(/^\s{8}id:\s*'(atha_event_[^']+)'/gm);
const evidenceIds = collect(/^\s{8}id:\s*'(atha_evidence_[^']+)'/gm);
const slugs = collect(/^\s{4}slug:\s*'([^']+)'/gm);
const recordIdRefs = collect(/record_id:\s*'(atha_(?!event_|evidence_)[^']+)'/g);
const eventIdRefs = collect(/event_id:\s*'(atha_event_[^']+)'/g);
const urls = collect(/url:\s*'([^']+)'/g);
const lastReviewedDates = collect(/last_reviewed_at:\s*'([^']+)'/g);
const eventEvidenceBlocks = collect(/evidence_ids:\s*\[([^\]]*)\]/g);

if (recordIds.length === 0) report('No record IDs found.');
if (eventIds.length === 0) report('No event IDs found.');
if (evidenceIds.length === 0) report('No evidence IDs found.');
if (slugs.length === 0) report('No slugs found.');

checkDuplicates([...recordIds, ...eventIds, ...evidenceIds], 'ID');
checkDuplicates(slugs, 'slug');

const recordIdSet = new Set(recordIds);
const eventIdSet = new Set(eventIds);
const evidenceIdSet = new Set(evidenceIds);

for (const slug of slugs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    report(`Invalid slug format: ${slug}`);
  }
}

for (const recordIdRef of recordIdRefs) {
  if (!recordIdSet.has(recordIdRef)) {
    report(`Unknown record_id reference: ${recordIdRef}`);
  }
}

for (const eventIdRef of eventIdRefs) {
  if (!eventIdSet.has(eventIdRef)) {
    report(`Unknown event_id reference: ${eventIdRef}`);
  }
}

for (const block of eventEvidenceBlocks) {
  const references = Array.from(block.matchAll(/'(atha_evidence_[^']+)'/g), (match) => match[1]);

  if (references.length === 0) {
    report('Lifecycle event has an empty evidence_ids array.');
  }

  for (const evidenceId of references) {
    if (!evidenceIdSet.has(evidenceId)) {
      report(`Unknown evidence reference in evidence_ids: ${evidenceId}`);
    }
  }
}

for (const url of urls) {
  if (!/^https:\/\//.test(url)) {
    report(`URL must use https:// : ${url}`);
  }
}

for (const date of lastReviewedDates) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    report(`last_reviewed_at must use YYYY-MM-DD: ${date}`);
  }
}

if (recordIds.length !== slugs.length) {
  report(`Record ID count (${recordIds.length}) does not match slug count (${slugs.length}).`);
}

if (errors.length > 0) {
  console.error('Data validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Data validation passed: ${recordIds.length} records, ${eventIds.length} events, ${evidenceIds.length} evidence links.`);
