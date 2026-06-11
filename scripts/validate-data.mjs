import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'data');
const enumPath = path.join(dataDir, 'enums.ts');
const schemaPath = path.join(dataDir, 'schema.ts');
const errors = [];

const recordFiles = fs
  .readdirSync(dataDir)
  .filter((file) => /^records(?:-\d+)?\.ts$/.test(file))
  .sort();

const sources = recordFiles.map((file) => ({
  file,
  source: fs.readFileSync(path.join(dataDir, file), 'utf8')
}));

const source = sources.map((entry) => `\n// ${entry.file}\n${entry.source}`).join('\n');
const enumSource = fs.readFileSync(enumPath, 'utf8');
const schemaSource = fs.readFileSync(schemaPath, 'utf8');

function report(message) {
  errors.push(message);
}

function collect(regex, input = source) {
  return Array.from(input.matchAll(regex), (match) => match[1]);
}

function extractConstArray(name) {
  const match = enumSource.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));

  if (!match) {
    report(`Enum array not found: ${name}`);
    return new Set();
  }

  return new Set(Array.from(match[1].matchAll(/'([^']+)'/g), (item) => item[1]));
}

function extractUrlStatuses() {
  const match = schemaSource.match(/export type UrlStatus =([\s\S]*?);/);

  if (!match) {
    report('UrlStatus type not found.');
    return new Set();
  }

  return new Set(Array.from(match[1].matchAll(/'([^']+)'/g), (item) => item[1]));
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

function checkAllowed(values, allowed, label) {
  for (const value of values) {
    if (!allowed.has(value)) {
      report(`Unknown ${label}: ${value}`);
    }
  }
}

function checkDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    report(`${label} must use YYYY-MM-DD: ${value}`);
  }
}

function checkHttpsUrl(url, label) {
  if (!/^https:\/\//.test(url)) {
    report(`${label} must use https:// : ${url}`);
  }
}

if (recordFiles.length === 0) {
  report('No record data files found. Expected data/records.ts or data/records-XX.ts.');
}

const allowedEntityTypes = extractConstArray('entityTypes');
const allowedCategories = extractConstArray('categories');
const allowedStatuses = extractConstArray('statuses');
const allowedEventTypes = extractConstArray('eventTypes');
const allowedSourceTypes = extractConstArray('sourceTypes');
const allowedReliabilityLevels = extractConstArray('reliabilityLevels');
const allowedConfidenceLevels = extractConstArray('confidenceLevels');
const allowedUrlStatuses = extractUrlStatuses();

const recordIds = collect(/^\s{4}id:\s*'(atha_(?!event_|evidence_)[^']+)'/gm);
const eventIds = collect(/^\s{8}id:\s*'(atha_event_[^']+)'/gm);
const evidenceIds = collect(/^\s{8}id:\s*'(atha_evidence_[^']+)'/gm);
const slugs = collect(/^\s{4}slug:\s*'([^']+)'/gm);
const entityTypes = collect(/^\s{4}entity_type:\s*'([^']+)'/gm);
const statuses = collect(/^\s{4}status:\s*'([^']+)'/gm);
const urlStatuses = collect(/current_url_status:\s*'([^']+)'/g);
const recordConfidenceValues = collect(/^\s{4}confidence:\s*'([^']+)'/gm);
const eventTypes = collect(/^\s{8}type:\s*'([^']+)'/gm);
const eventConfidenceValues = collect(/^\s{8}confidence:\s*'([^']+)'/gm);
const sourceTypes = collect(/source_type:\s*'([^']+)'/g);
const reliabilityLevels = collect(/reliability:\s*'([^']+)'/g);
const recordIdRefs = collect(/record_id:\s*'(atha_(?!event_|evidence_)[^']+)'/g);
const eventIdRefs = collect(/event_id:\s*'(atha_event_[^']+)'/g);
const urls = collect(/(?:url|archived_url|last_known_url):\s*'([^']+)'/g);
const slugsInRelatedRecords = collect(/related_records:\s*\[([^\]]*)\]/g)
  .flatMap((block) => Array.from(block.matchAll(/'([^']+)'/g), (match) => match[1]));
const categoryBlocks = collect(/category:\s*\[([^\]]*)\]/g);
const categories = categoryBlocks.flatMap((block) => Array.from(block.matchAll(/'([^']+)'/g), (match) => match[1]));
const eventEvidenceBlocks = collect(/evidence_ids:\s*\[([^\]]*)\]/g);
const lastReviewedDates = collect(/last_reviewed_at:\s*'([^']+)'/g);
const eventDates = collect(/^\s{8}date:\s*'([^']+)'/gm);
const evidenceAccessedDates = collect(/accessed_at:\s*'([^']+)'/g);

if (recordIds.length === 0) report('No record IDs found.');
if (eventIds.length === 0) report('No event IDs found.');
if (evidenceIds.length === 0) report('No evidence IDs found.');
if (slugs.length === 0) report('No slugs found.');

checkDuplicates([...recordIds, ...eventIds, ...evidenceIds], 'ID');
checkDuplicates(slugs, 'slug');

const recordIdSet = new Set(recordIds);
const eventIdSet = new Set(eventIds);
const evidenceIdSet = new Set(evidenceIds);
const slugSet = new Set(slugs);

for (const slug of slugs) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    report(`Invalid slug format: ${slug}`);
  }
}

for (const relatedSlug of slugsInRelatedRecords) {
  if (!slugSet.has(relatedSlug)) {
    report(`Unknown related_records slug: ${relatedSlug}`);
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

for (const categoryBlock of categoryBlocks) {
  const values = Array.from(categoryBlock.matchAll(/'([^']+)'/g), (match) => match[1]);

  if (values.length === 0) {
    report('Record has an empty category array.');
  }
}

for (const url of urls) checkHttpsUrl(url, 'URL');
for (const date of lastReviewedDates) checkDate(date, 'last_reviewed_at');
for (const date of eventDates) checkDate(date, 'event date');
for (const date of evidenceAccessedDates) checkDate(date, 'accessed_at');

checkAllowed(entityTypes, allowedEntityTypes, 'entity_type');
checkAllowed(statuses, allowedStatuses, 'status');
checkAllowed(urlStatuses, allowedUrlStatuses, 'current_url_status');
checkAllowed(recordConfidenceValues, allowedConfidenceLevels, 'record confidence');
checkAllowed(eventConfidenceValues, allowedConfidenceLevels, 'event confidence');
checkAllowed(eventTypes, allowedEventTypes, 'event type');
checkAllowed(categories, allowedCategories, 'category');
checkAllowed(sourceTypes, allowedSourceTypes, 'source_type');
checkAllowed(reliabilityLevels, allowedReliabilityLevels, 'reliability level');

if (recordIds.length !== slugs.length) {
  report(`Record ID count (${recordIds.length}) does not match slug count (${slugs.length}).`);
}

if (recordIds.length !== statuses.length) {
  report(`Record ID count (${recordIds.length}) does not match status count (${statuses.length}).`);
}

if (eventIds.length !== eventTypes.length) {
  report(`Event ID count (${eventIds.length}) does not match event type count (${eventTypes.length}).`);
}

if (eventIds.length !== eventDates.length) {
  report(`Event ID count (${eventIds.length}) does not match event date count (${eventDates.length}).`);
}

if (evidenceIds.length !== sourceTypes.length) {
  report(`Evidence ID count (${evidenceIds.length}) does not match source_type count (${sourceTypes.length}).`);
}

if (evidenceIds.length !== reliabilityLevels.length) {
  report(`Evidence ID count (${evidenceIds.length}) does not match reliability count (${reliabilityLevels.length}).`);
}

if (errors.length > 0) {
  console.error('Data validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Data validation passed: ${recordIds.length} records, ${eventIds.length} events, ${evidenceIds.length} evidence links across ${recordFiles.length} file(s).`
);
