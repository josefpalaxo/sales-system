# Shared slide decks

Organize cross-domain decks as `slides/<topic>/<stable-name>.pptx`. The governed Markdown record beside it must have the same basename: `<stable-name>.md`.

Every slide-deck record declares `domain` and one `topic`. It mirrors the folder below `assets/slides/`; for example, `topic: commercial-model` maps to `assets/slides/commercial-model/`. Use `tags` for flexible labels and `relations` for governed links to other records.

Update a stable file for ordinary revisions; rely on Git history instead of filename suffixes. Separate files are reserved for durable variants with meaningfully different audiences, purposes, languages, legal scopes, or domains.

## Current topics

- [Commercial model](commercial-model/circularo-trusted-execution-commercial-model.md) — draft internal deck pending owner review.
- [Unified trust platform](unified-trust-platform/circularo-unified-sovereign-trust-platform.md) — draft internal deck pending source and owner review.
