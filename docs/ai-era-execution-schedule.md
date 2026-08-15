# AI Tools History Archive — AI-era Execution Schedule

Status: roadmap addendum

## Order
1. Continue the current roadmap; this addendum does not reset completed or active phases.
2. Audit representative tools for missing change, shutdown, export/migration/replacement and last-verification history.
3. Extend data model only where lifecycle outcomes cannot be represented safely.
4. Ship deterministic per-tool JSON and validation.
5. Strengthen structured search/filtering.
6. Add historical lifecycle Compare.
7. Add Stats for lifespan, change/shutdown reasons, providers, migration/replacement and data quality.
8. Run reviewed lifecycle follow-up batches.
9. Evaluate natural-language-to-filter translation only after deterministic query surfaces are stable.

## Gate
Spec -> implementation PR -> tests/validation green -> merge -> production verification where applicable -> roadmap/status sync.

## Mandatory continuation rule
Future work must read the current `docs/roadmap.md`, relevant product/data/source policies, `ai-era-registry-spec.md`, and this schedule before selecting the next task.