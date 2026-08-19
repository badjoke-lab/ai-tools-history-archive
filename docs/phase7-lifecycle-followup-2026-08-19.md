# Ledger Series Phase 7 — Lifecycle Follow-up Review

Date: 2026-08-19
Status: reviewed follow-up batch
Scope: representative lifecycle records after deterministic search / Compare / Stats stabilization

## Review boundary

This batch rechecks existing canonical records against current first-party lifecycle documentation. It does not bulk-import stale pre-AI-era candidate branches and does not infer replacement targets from generic `related_records`.

## 1. OpenAI Assistants API — canonical update required

Canonical record: `atha_000005` / `openai-assistants-api`

Previous canonical state used the earlier March 2025 target of a first-half-2026 sunset after Responses API feature parity.

Current first-party documentation now states that:

- the Assistants API is deprecated;
- Responses API has reached the migration point for new integrations;
- the Assistants API is scheduled to shut down on 2026-08-26;
- existing integrations should migrate to Responses API.

Reviewed sources:

- https://platform.openai.com/docs/assistants/deep-dive
- https://help.openai.com/en/articles/8550641-assistants-api

Accepted canonical changes:

- preserve `status = deprecated` because 2026-08-26 is still in the future at review time;
- record `ended_at = 2026-08-26` as the announced shutdown boundary;
- add a dated shutdown-notice event for the formal 2025-08-26 deprecation/shutdown announcement;
- add two first-party evidence items;
- update current-state / summary / last-reviewed fields;
- retain a known-unknown requiring recheck after 2026-08-26 before treating shutdown as completed.

## 2. Google Gemini 2.0 Flash models — no canonical change

Canonical record: `atha_000008` / `google-gemini-2-0-flash-models`

Google's current Gemini API deprecation table and release notes continue to show the Gemini 2.0 Flash family as shut down on 2026-06-01 with recommended replacements.

Reviewed sources:

- https://ai.google.dev/gemini-api/docs/deprecations
- https://ai.google.dev/gemini-api/docs/changelog

Decision: existing `model_discontinued` status and 2026-06-01 end boundary remain supported. No canonical change required.

## 3. Anthropic Claude 1 / Instant and Claude 2 / Sonnet 3 — no canonical change

Canonical records:

- `atha_000006` / `anthropic-claude-1-and-instant-models`
- `atha_000007` / `anthropic-claude-2-and-sonnet-3-models`

Anthropic's current model deprecation history continues to identify:

- Claude 1 / Instant retirement on 2024-11-06;
- Claude 2 / 2.1 / Sonnet 3 retirement on 2025-07-21;
- recommended replacement guidance for those retired families.

Reviewed source:

- https://platform.claude.com/docs/en/about-claude/model-deprecations

Decision: current canonical retirement states and dates remain supported. No canonical change required.

## Result

- reviewed records: 4
- canonical records changed: 1
- new canonical events: 1
- new canonical evidence items: 2
- schema/taxonomy changes: 0
- inferred replacement targets: 0
- rankings/recommendations: 0

## Next checkpoint

Recheck the Assistants API on or after 2026-08-26. Do not mark the shutdown as completed before first-party evidence confirms the announced boundary has actually taken effect.
