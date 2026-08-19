# Ledger Series Phase 7 Closeout

Status: complete  
Date: 2026-08-19  
Repository: `badjoke-lab/ai-tools-history-archive`

## Scope

Ledger Series Phase 7 was a finite AI-era resilience pass over the existing AI Tools History Archive. It did not reset the public roadmap or replace the existing record/event/evidence model. The work first audited current `main`, reused existing record detail, event/category indexes, search and basic Stats, and implemented only verified gaps.

## Completed stages

### Stage 1 — Current-main gap audit

- closed stale pre-AI-era PRs without merging obsolete branches;
- confirmed existing record detail, lifecycle events, categories, basic search and basic Stats;
- identified verified gaps in per-record JSON, lifecycle/provenance filters, Compare, richer Stats and reviewed follow-up.

### Stage 2 — Schema decision gate

No canonical schema expansion was required for the deterministic public-surface lane.

Existing canonical records can safely project:

- provider/operator, type, category and status;
- launch/end boundaries where recorded;
- lifecycle event types;
- replacement-guidance availability from evidence `supports`;
- export-deadline signals from canonical events;
- evidence reliability/archive coverage and review dates.

Safety boundaries remain fixed:

- `related_records` is generic and is not a successor/replacement claim;
- replacement targets are not inferred from prose;
- export deadlines do not prove export/migration completion;
- future shutdown dates are not completed shutdown evidence.

### Stage 3 — Per-record machine-readable JSON

Added deterministic canonical-only generation and validation for:

- `/version.json`
- `/data/manifest.json`
- `/data/records/index.json`
- `/data/records/{slug}.json`
- `/llms.txt`
- `/ai.txt`

### Stage 4 — Structured lifecycle discovery

Extended the existing `/records/` surface with deterministic URL-backed filters for:

- provider/operator;
- launch year;
- end/change year;
- lifecycle event type;
- replacement-guidance recorded;
- data-export-deadline recorded;
- high-reliability evidence;
- archived evidence.

### Stage 5 — Historical Compare

Added `/compare/` with:

- 2–4 canonical records;
- shareable repeated `record=<slug>` query state;
- optional differences-only mode;
- lifecycle/provenance comparisons only;
- no ranking, recommendation or score.

Compare was also added to primary navigation and sitemap discovery.

### Stage 6 — Lifecycle and provenance Stats

Extended `/stats/` and added `/data/stats.json` for deterministic canonical analysis including:

- provider/operator distribution;
- launch and end/change year distributions;
- recorded calendar-year lifespan spans;
- lifecycle event distribution;
- replacement-guidance and export-deadline coverage;
- evidence source/reliability coverage;
- archived/high-reliability evidence coverage;
- review-year coverage.

The machine validator independently recomputes Stats rather than trusting generated output.

### Stage 7 — Reviewed lifecycle follow-up and production verification

Reviewed current first-party lifecycle documentation for four existing records.

Canonical update required:

- OpenAI Assistants API remained `deprecated` because the announced 2026-08-26 shutdown was still future-dated at review time;
- the announced shutdown boundary was recorded;
- one shutdown-notice event and two current first-party evidence items were added;
- a post-2026-08-26 recheck remains required before treating shutdown as completed.

No canonical change was required for the reviewed Google Gemini 2.0 Flash and Anthropic retired-model records.

## Production verification

Accepted reviewed production evidence:

- production origin: `https://ai-tools-history-archive.pages.dev`
- implementation floor: `1850af25d16e842915506b38d568baa45b3eb202`
- accepted production SHA: `5ce5d0efbfbf9d643b68b81fc1106577c54d5a27`
- workflow run: `32206782477`
- job: `95931464975`
- artifact: `9349470926`
- commit status: `atha-phase7-production=success`
- production counts: `10 records / 11 events / 12 evidence`

Verified production surfaces:

- `/version.json`
- `/data/manifest.json`
- `/data/stats.json`
- `/data/records/openai-assistants-api.json`
- `/records/`
- `/compare/`
- `/stats/`
- `/sitemap.xml`

The verifier only accepted production after the deployed commit was present in reviewed repository history, at or after the Phase 7 implementation floor, and an ancestor of reviewed `main`.

## Resolved production failure

The first production verification run (`32206148137`) failed closed because `/version.json` returned HTTP 404 on every attempt.

Root cause: the machine-readable layer was generated at build time and could be skipped when Cloudflare Pages invoked `next build` directly instead of the package `build` script.

Resolution: PR #41 moved the deterministic machine-generation hook into `next.config.mjs`, before static export. Both direct Next builds and package-script builds now emit the same canonical machine files.

The next production run reached the reviewed commit and passed all surface checks.

## Phase result

- finite Stage 1–8 horizontal pass: complete;
- canonical records changed during reviewed follow-up: 1;
- new canonical events: 1;
- new canonical evidence: 2;
- schema changes: 0;
- taxonomy changes: 0;
- rankings/recommendations introduced: 0;
- unreviewed candidate auto-publication introduced: 0;
- AI-generated canonical history introduced: 0.

## Remaining vertical work

Phase 7 closeout does not stop ordinary archive maintenance.

- Recheck the OpenAI Assistants API on or after 2026-08-26 before treating its announced shutdown as completed.
- Continue reviewed record/evidence growth and normal lifecycle corrections under repository policy.
- Natural-language-to-filter translation remains a separate future evaluation item and is not required for this finite Phase 7 closeout.

## Horizontal continuation

Automatic horizontal continuation is disabled. The next Ledger Series repository must be audited from its current `main` and active PR/issue state before a new authority is created.
