# AI Tools History Archive — Ledger Series Phase 7 Stage 1 Gap Audit

Date: 2026-08-19  
Repository: `badjoke-lab/ai-tools-history-archive`  
Audited base: `d888d0982f29efe8f220e3c0076e97c542cc3c09`

## Purpose

Start the Ledger Series Phase 7 strengthening pass from current reviewed `main`, not from the stale pre-AI-era pull-request stack.

The governing order is the existing AI-era schedule:

1. audit lifecycle/migration/replacement gaps;
2. expand the data model only if required;
3. deterministic per-tool JSON;
4. structured search/filter strengthening;
5. historical Compare;
6. lifecycle/quality Stats;
7. reviewed lifecycle follow-up and production verification;
8. closeout.

## Recovery / branch cleanup

At audit start, three old pull requests were still open:

- #14 — category pages/basic Stats; based on an old non-main branch;
- #27 — seed expansion; based on old main before the current AI-era specification;
- #29 — UI polish; based on old main before the current AI-era specification.

All three were conflict-stale relative to current main. They were closed without merge. Their branches/history remain preserved as reference material. In particular, #27 contains official-source research for later reviewed lifecycle candidates and must not be silently discarded or blindly promoted.

Open PR count after cleanup: 0.

## Existing capabilities — reuse, do not rebuild

### Record model and detail pages

Current canonical records already contain:

- stable record ID and slug
- name / aliases
- entity type
- categories
- operator / country
- lifecycle status and current-state text
- launch/end date strings where known
- last-known URL and URL state
- confidence
- dated lifecycle events
- evidence with source type, publisher, archive URL, reliability and supported claims
- related-record slugs
- last-review date
- known unknowns

`/records/{slug}/` already renders identity, current state, key facts, dated lifecycle events, evidence, related records, known unknowns, metadata and JSON-LD.

Decision: **reuse**.

### Event and lifecycle index surfaces

Current main already exposes public event-oriented routes including:

- `/events/`
- `/shutdowns/`
- `/acquisitions/`
- `/rebrands/`
- `/api-model-deprecations/`

Decision: **reuse**. Phase 7 does not create duplicate lifecycle indexes.

### Category / glossary / methodology / public safety surfaces

Current main already includes category pages, glossary, methodology, about and submission/correction surfaces.

Decision: **reuse**.

### Basic structured search

`/records/` already supports deterministic query state and filters for:

- free-text search
- status
- category
- entity type

Search text already includes record identity/current state, lifecycle events and evidence metadata.

Decision: **extend** rather than replace.

### Basic Stats

`/stats/` currently reports totals and basic distributions for:

- status
- entity type
- category
- event type
- confidence

Decision: **extend** rather than create a second dashboard.

## Verified Phase 7 gaps

### Gap 1 — lifecycle outcome / migration / replacement representation

Status: **partial / Stage 2 decision required**.

The AI-era specification requires tracking:

`launch -> major change -> deprecation/shutdown -> shutdown -> export/migration/replacement/successor`

Current data can carry related records, lifecycle events, evidence support tags, current-state narrative and known unknowns. However there are no explicit typed record-level fields for:

- replacement/successor target
- migration/export availability/outcome
- shutdown/change reason

Some existing records already mention replacement guidance only inside event description/evidence `supports` or free text. Stage 2 must decide whether deterministic filter/Compare/Stats needs typed additive fields or whether a safe deterministic projection from existing canonical events/evidence is sufficient.

Do not add fields preemptively.

### Gap 2 — deterministic per-tool machine-readable JSON

Status: **missing**.

Current main has static human record pages but no reviewed per-tool JSON route/envelope and no record-level machine-readable manifest contract was found.

Required outcome:

- deterministic reviewed JSON for each public record;
- canonical record + ordered events + evidence + related-record references;
- stable human and machine URLs;
- last verification and known unknowns preserved;
- candidate/internal material excluded;
- validation covering complete file/route set and references.

### Gap 3 — structured lifecycle discovery

Status: **partial**.

Current filters stop at status/category/entity type. Phase 7 requires evidence-supported expansion for:

- provider/operator
- launch/end or change year
- change/shutdown reason if typed safely
- migration/replacement availability
- evidence/source quality where deterministic

Existing `/records/` and query-state behavior must remain the single search surface.

### Gap 4 — historical Compare

Status: **missing**.

No current Compare surface was found.

Required bounded outcome:

- compare 2–4 canonical records;
- lifecycle/current state only;
- operator/entity type/category/status/date boundaries;
- shutdown/change/deprecation history;
- replacement/migration/export outcome where recorded;
- evidence/provenance depth indicators;
- no popularity ranking, recommendation or synthetic quality/safety score.

### Gap 5 — lifecycle/quality Stats

Status: **partial**.

The existing Stats page lacks the AI-era required dimensions:

- lifespan where both date boundaries are supported;
- change/shutdown reason;
- provider distribution;
- migration/replacement availability;
- evidence/archive/reliability coverage;
- last-review/data-quality coverage.

Missing dates or lifecycle outcomes must remain excluded/unknown rather than inferred.

### Gap 6 — reviewed lifecycle follow-up corpus

Status: **required after deterministic surfaces stabilize**.

The current small seed corpus contains useful representative shapes, while stale PR #27 preserves additional official-source candidates. Those records must be re-reviewed under current schema/validation and promoted only through separate reviewed canonical PRs.

Future shutdown dates must not be treated as already completed events.

## Phase 7 execution decision

Proceed in this bounded order:

1. Stage 1 — this audit + authority
2. Stage 2 — representative schema/projection decision
3. Stage 3 — per-tool JSON
4. Stage 4 — extend current deterministic filters
5. Stage 5 — bounded historical Compare
6. Stage 6 — extend current Stats
7. Stage 7 — reviewed lifecycle follow-up batch and exact production verification
8. Stage 8 — closeout / roadmap synchronization

## Non-goals

Do not add:

- subjective tool/model rankings
- AI-generated canonical history
- chatbot-first archive UI
- automated unreviewed publication
- invented migration/replacement links
- speculative shutdown completion
- a second Search, event index or Stats system

## Stage 1 completion gate

Stage 1 completes only after this authority/audit PR passes repository checks and merges. Runtime implementation begins from the merged authority state.
