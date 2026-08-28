# Schemas

Canonical records are Markdown with YAML frontmatter. [`common.schema.json`](common.schema.json) documents the shared envelope using JSON Schema Draft 2020-12.

The dependency-free validator currently enforces the essential envelope, lifecycle values, unique IDs, owner registration, date syntax, reference resolution, one-way typed relationship fields, single working directory, and generated catalogue freshness. For slide-deck records it also enforces same-basename Markdown/PPTX pairs and checks that singular `topic` metadata mirrors the topic folder. Entity-specific JSON Schemas should be added as each entity type becomes operational.
