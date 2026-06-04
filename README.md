# AI Tools History Archive

AI Tools History Archive is a source-linked public archive for tracking AI tools, services, products, APIs, models, features, and hardware over time.

It focuses on lifecycle events such as shutdowns, acquisitions, rebrands, deprecations, retirements, feature removals, pricing changes, and major product transitions.

## Project Direction

This is a neutral archive and registry. It is not an AI tool ranking site, recommendation directory, or graveyard joke site.

The project is built around three concepts:

```text
record   = the AI-related entity being tracked
event    = a dated lifecycle change
evidence = public source material supporting the record or event
```

## Initial Technical Approach

The initial site is designed to be static-friendly:

- Next.js static export
- Public source-linked data
- White-background archive UI
- No database required for v0
- No user accounts required for v0
- Public corrections handled through a later report path

## Documentation

See [`docs/`](./docs/) for the public product specification, data model, evidence policy, UI guidelines, roadmap, and current status.

## Current Status

PR-001 establishes the public-safe project foundation, documentation, and initial white-background app shell.
