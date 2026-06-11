# Data validation

The public dataset is checked in CI before build.

The validator currently checks:

- record, event, and evidence ID presence
- duplicate IDs across records, events, and evidence
- duplicate slugs
- slug format
- `record_id` references
- `event_id` references
- `event.evidence_ids` references
- `related_records` slug references
- empty category arrays
- enum values for entity type, status, category, event type, source type, reliability, confidence, and URL status
- HTTPS-only URLs for public source fields
- `YYYY-MM-DD` format for event dates, evidence access dates, and review dates
- basic count consistency across records, events, and evidence
- multiple record files using `data/records.ts` and `data/records-XX.ts`

The validator is intentionally strict. New records should be added only after the entry has enough public evidence to pass these checks.
