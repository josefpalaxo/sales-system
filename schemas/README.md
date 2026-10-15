# Schemas

Canonical records are Markdown with YAML frontmatter. [`common.schema.json`](common.schema.json) documents the shared envelope using JSON Schema Draft 2020-12.

The dependency-free validator currently enforces the essential envelope, lifecycle values, unique IDs, owner registration, date syntax, reference resolution, one-way typed relationship fields, single working directory, and generated catalogue freshness. For slide-deck records it also enforces same-basename Markdown/PPTX pairs and checks that singular `topic` metadata mirrors the topic folder. Entity-specific JSON Schemas should be added as each entity type becomes operational.

For master documents and derived representations it also checks the master kind/role, an explicit `derives_from` relation matching `master_id`, a positive reconciled `master_revision`, and current revision agreement. An approved representation requires an approved governing master. The generated catalogue includes these fields for consumers. Run `rtk proxy python3 -B scripts/test_master_dependencies.py` for the focused behavior checks.
