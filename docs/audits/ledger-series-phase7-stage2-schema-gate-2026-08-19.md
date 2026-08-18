# AI Tools History Archive — Ledger Series Phase 7 Stage 2 Schema Decision Gate

Date: 2026-08-19  
Stacked on: Phase 7 authority / Stage 1 audit

## Decision

**No canonical schema expansion is required for the deterministic Phase 7 public-surface lane.**

The current schema can safely expose the lifecycle dimensions required for record JSON, structured discovery, Compare and Stats by projecting only already-recorded canonical fields, event taxonomy and evidence support tags.

## Existing deterministic lifecycle signals

### Identity / provider / type / status

Direct record fields already provide:

- `operator`
- `entity_type`
- `category`
- `status`
- `current_state`
- `launched_at`
- `ended_at`
- `last_reviewed_at`
- `current_url_status`
- `confidence`
- `known_unknowns`

### Shutdown / deprecation / change reason

The existing event taxonomy distinguishes source-backed lifecycle shapes including:

- `feature_removed`
- `api_deprecated`
- `api_shutdown`
- `model_deprecated`
- `model_retired`
- `rebrand`
- `acquisition`
- `merger`
- `pivot`
- `shutdown_notice`
- `shutdown`
- `domain_offline`
- `domain_redirected`
- pricing/terms/policy/availability changes

Phase 7 filters/Stats may aggregate these recorded event types. They must not convert them into a new inferred cause taxonomy unless a later reviewed specification explicitly does so.

### Replacement guidance availability

Existing evidence has a structured `supports` array. Representative current records for legacy OpenAI, Anthropic and Google models already record `replacement_guidance` there.

Therefore Phase 7 can safely expose a deterministic boolean/category such as:

`replacement guidance recorded`

when at least one canonical evidence item contains `supports: replacement_guidance`.

This indicates that reviewed source material contains replacement guidance. It does **not** identify, rank or infer the replacement target.

### Export / migration availability

The existing event taxonomy already contains `data_export_deadline`. Related migration/export facts may also appear in reviewed event/evidence support tags.

Phase 7 may expose only the exact recorded signals. Absence means `not recorded`, not `no migration/export available`.

### Related records

`related_records` is intentionally generic. It must remain generic.

Phase 7 must **not** reinterpret an arbitrary related record as a replacement, successor, predecessor or migration target.

## Representative records reviewed

### Bard

- `status: rebranded`
- rebrand event records Bard becoming Gemini
- current-state narrative supports the lifecycle change

The public lifecycle surface can show the rebrand without a new schema field.

### OpenAI AI Text Classifier

- `status: shutdown`
- exact shutdown event
- evidence supports shutdown/current-state/reason note

This provides a terminal shutdown baseline.

### Copilot GPT Builder

- `status: feature_removed`
- retirement event
- evidence supports data-deletion context

This covers feature removal and post-removal user-data consequence without inventing migration.

### OpenAI GPT-3 base models

- `status: model_discontinued`
- model-retired event
- official evidence includes `replacement_guidance`

This is sufficient to expose “replacement guidance recorded” without naming a target not stored canonically.

### Anthropic Claude 1 / Instant and Claude 2 / Sonnet 3

- terminal model-retirement events
- official evidence includes replacement guidance
- one record has a generic related-record relationship to another historical model group

The generic relationship must not be relabeled as replacement.

### Google Gemini 2.0 Flash / text-embedding-004 / Imagen 3

- source-backed retirement dates
- official evidence explicitly tagged with replacement guidance
- some generic related-record links exist

Again, replacement-guidance presence is safe; target inference is not.

### OpenAI Assistants API

- `status: deprecated`
- sunset path recorded
- exact final retirement remained a known unknown in the reviewed record

A planned/future sunset must remain distinct from completed shutdown.

## Consequence for Phase 7 deterministic surfaces

Stage 3–6 may proceed without canonical data migration.

Safe derived dimensions include:

- provider/operator
- entity type / category / status
- launch/end year where parseable from recorded dates
- event-type history
- shutdown/deprecation/change signal from canonical events
- replacement-guidance recorded: yes/no-recorded-signal
- export-deadline recorded: yes/no-recorded-signal
- high-reliability evidence present
- archive evidence present
- last-review year / review recency bands if deterministic
- evidence depth

## Explicitly not authorized

Do not derive or publish:

- exact replacement target from source prose alone
- successor/predecessor semantics from `related_records`
- migration completion from an export deadline
- shutdown completion from a future announced date
- subjective product quality or safety
- generated lifecycle causes

## Future schema boundary

If a later reviewed lifecycle batch needs exact structured replacement/successor/migration targets for public use, stop that fact-specific path and open a separate schema authority with primary-source-backed representative cases.

Do not expand the schema merely to make empty fields available.

## Stage 2 completion condition

Stage 2 completes when this decision is reviewed and merged after the Stage 1 authority. Next stage: **deterministic per-tool JSON**.
