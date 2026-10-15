---
schema_version: 1
id: partner-workspace:agent-instructions
kind: workspace-instructions
domain: partnerships
title: Partner workspace agent instructions
status: draft
classification: internal
owner: null
updated: 2026-10-02
---

# Partner workspace agent instructions

1. Read the root instructions and governance, this folder's [GOVERNANCE.md](GOVERNANCE.md), the [partnerships domain](../domains/partnerships/README.md), and the relevant partner profile before editing.
2. Require YAML frontmatter on every Markdown file. The partner README owns type, geography, relationship stage and next action; other partner files carry `partner_id` and a relative `profile` reference. Resolve these before using partner metadata.
3. Separate reported business types and operating geography from proposed cooperation models and target markets. Never infer an agreement, active relationship, territorial rights or meeting completion from a draft brief.
4. Keep unknown owners, dates and approval details null. Do not upgrade draft status or evidence without attributable authority. Preserve unresolved claims and conflicts visibly.
5. Reference approved shared facts and precise commercial rules by stable ID. A partner narrative cannot create product commitments, margin entitlements, procurement eligibility or hosting assurances.
6. Store only permitted summaries and authored materials here. Keep raw correspondence, personal contact data, CRM exports, credentials and customer dumps out of Git. Use business-system references or ignored material under root `work/`.
7. Keep one stable path for each deliverable. All files use the parent Git history; do not create nested repositories or revision copies such as `final-v2`.
8. External sharing requires human approval for the exact deliverable and audience. Drafting a communication plan does not authorize sending it.
9. Use `apply_patch` for edits. Run `rtk make catalog` after record changes and `rtk make validate`; check partner YAML and profile links separately because partner working records are outside the canonical catalog.
