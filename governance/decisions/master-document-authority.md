---
schema_version: 1
id: decision:master-document-authority
kind: decision
domain: shared
title: Full Master Documents Govern Derived Structured Records
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
sources:
  - ref: source:sales-repo-canonical
    locator: Josef instruction on 2026-10-14 to restore canonical masters and retain the canonical folder in sales-system
relations:
  applies_to:
    - source:commercial-model-2026
    - source:add-on-model-2026
    - master:commercial-model
    - master:add-on-model
spec:
  effective_date: 2026-10-14
  authorization: explicit user direction in this session
  scope: document authority and migration; no commercial terms, prices, or draft partner policies newly approved
---

# Full Master Documents Govern Derived Structured Records

## Decision

Keep the full Commercial Model and Add-On Model as active canonical master documents in sales-system. Smaller structured records remain useful derived representations for agents and do not replace the approved business masters. Historical snapshots hold superseded evidence.

Use `shared/commercial/` for cross-domain masters and sales guidance, and `shared/playbooks/partners/` for partner-specific material. Preserve stable IDs of existing records. Add explicit master relationships and revision references to their derived representations.

## Migration disposition

The active Commercial Model retains the existing approved sales-system revision, including its already recorded API, storage, variant, and sandbox treatment. The differing sales-repo version is retained as historical comparison. This relocation does not independently approve any of those commercial terms or resolve a new discrepancy by recency.

The Add-On Model retains its existing approval and the unresolved Workspace-scope restriction. Imported sales, partner, pricing, and workbook materials retain their draft limitations and source provenance. Relocation and metadata review do not approve them or authorize external sharing.

## Dependency impact

Existing source IDs continue to resolve and now identify the active masters. Derived shared knowledge, messaging, and the draft commercial-model deck gain a master relationship and revision reference. Their content is preserved; review dates are not refreshed merely by this authority change. Future semantic master edits require a derived-record impact review before revision references are advanced.
