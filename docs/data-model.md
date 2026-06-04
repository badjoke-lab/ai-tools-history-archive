# Data Model

AI Tools History Archive uses an evidence-first lifecycle registry model.

The core structure is:

```text
record = the entity being tracked
event = a dated lifecycle change
evidence = public source material supporting a record or event
```

## Record

A record represents an AI-related entity.

Entity types:

```text
company
service
product
feature
model
api
hardware
```

Recommended record fields:

```json
{
  "id": "atha_000001",
  "slug": "example-ai",
  "name": "Example AI",
  "aliases": [],
  "entity_type": "service",
  "category": ["chat_assistant"],
  "operator": "Example Company",
  "country": "United States",
  "status": "active_changed",
  "current_state": "Still available, but changed from the original product positioning.",
  "launched_at": "2023-01",
  "ended_at": null,
  "last_known_url": "https://example.com",
  "current_url_status": "live_verified",
  "summary": "Short public summary.",
  "confidence": "medium",
  "events": ["event_000001"],
  "evidence": ["evidence_000001"],
  "related_records": [],
  "last_reviewed_at": "2026-06-04"
}
```

## Status

Initial status values:

```text
active
active_changed
shutdown
shutdown_announced
acquired
merged
rebranded
deprecated
retired
feature_removed
api_discontinued
model_discontinued
unknown
unverified
```

Status should describe the current or final known state, not every intermediate event.

## Category

Initial categories:

```text
chat_assistant
writing_productivity
image_generation
image_editing
video_generation
voice_tts
music_audio
coding_developer
ai_search
agent_automation
design_presentation
marketing_sales
education
research
healthcare
legal
finance
game_3d
hardware_device
api_model_infra
other
```

## Event

An event represents a dated lifecycle change.

Recommended event fields:

```json
{
  "id": "event_000001",
  "record_id": "atha_000001",
  "date": "2024-02-08",
  "type": "rebrand",
  "title": "Example AI rebranded",
  "description": "The operator announced a rebrand.",
  "evidence_ids": ["evidence_000001"],
  "confidence": "high"
}
```

Initial event types:

```text
launch
beta_launch
pricing_change
free_plan_removed
usage_limit_changed
feature_removed
api_deprecated
api_shutdown
model_deprecated
model_retired
rebrand
acquisition
merger
pivot
shutdown_notice
shutdown
domain_offline
domain_redirected
terms_changed
policy_changed
commercial_terms_changed
data_export_deadline
open_source_release
unknown_change
```

## Evidence

Evidence represents public source material.

Recommended evidence fields:

```json
{
  "id": "evidence_000001",
  "record_id": "atha_000001",
  "event_id": "event_000001",
  "title": "Official announcement",
  "url": "https://example.com/announcement",
  "archived_url": "",
  "source_type": "official_announcement",
  "accessed_at": "2026-06-04",
  "supports": ["rebrand", "current_state"],
  "reliability": "high"
}
```

Source types:

```text
official_announcement
official_docs
official_blog
official_support
press_release
regulatory_filing
archived_page
credible_media
company_social
developer_changelog
github_release
forum_post
user_report
unknown
```

Reliability values:

```text
high
medium
low
unknown
```

Confidence values:

```text
high
medium
low
needs_review
```
