# Schemas

Canonical records are Markdown with YAML frontmatter. [`common.schema.json`](common.schema.json) documents the shared envelope using JSON Schema Draft 2020-12.

The dependency-free validator currently enforces the essential envelope, lifecycle values, unique IDs, owner registration, date syntax, reference resolution, single working directory, and generated catalogue freshness. Entity-specific JSON Schemas should be added as each entity type becomes operational.

