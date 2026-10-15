---
title: "Investor outreach relocation and Git handling"
id: investor-workspace:outreach-relocation-verification
status: draft
classification: confidential
canonical: false
evidence_state: observed
revision: 1
created: 2026-10-03
updated: 2026-10-03
owner: Josef Neumann
---

## Change history

- 2026-10-03 — Moved every artifact from investors/work to investors/outreach; replaced the exclusion policy under Josef's explicit instruction to put all outreach work under Git.

# Investor outreach relocation and Git handling

All five outreach batches, the central contact register, eight saved LinkedIn conversations, source/evidence files, scripts and derived outputs now live under `investors/outreach/`. The old `investors/work/` directory was removed after migration.

## Preservation checks

- All 90 original files matched SHA-256 hashes immediately after the move; no destination file was overwritten.
- The contact-register workbook and three PNG previews remain byte-for-byte unchanged.
- All eight saved conversation Markdown files remain byte-for-byte unchanged.
- Structured research and source files were preserved; active links and storage descriptions were updated separately in Markdown.
- No old absolute investors/work path occurs inside the workbook's XML. The register build script resolves its sibling batches relative to its own directory and needs no regeneration.
- Local links were checked after relocation. Percent-encoded brief links were changed to angle-bracket Markdown targets so the repository validator resolves the existing filename containing spaces.

## Git handling

Josef explicitly requested that all outreach artifacts be under Git. The former deny-by-default ignore file was replaced; research, personal contact records, the workbook, saved conversations, build scripts, evidence and previews are eligible for tracking. Credentials, dependencies and OS metadata remain excluded; the one moved `.DS_Store` is OS metadata rather than an outreach deliverable.

The user-authorised scope is recorded in [investor agent instructions](../AGENTS.md) and [governance](../GOVERNANCE.md), with matching parent policy notes. Versioning does not change draft/confidential/evidence status and does not authorise external sharing, messages or publication.

All eligible outreach files are staged for Git tracking. No commit or push was requested or performed by this relocation task. Unrelated changes already present in the repository were not staged.

## Validation

The relocation-specific file, workbook, conversation and link checks pass. A credential-pattern scan found no private-key, GitHub-token, AWS-access-key or Slack-token patterns in the outreach text artifacts.

Repository validation no longer reports the old investors/work nested-directory finding. The broader validator still reports existing root `tmp/`, `work/m-capital/work/` and broken vendored skia-canvas/debug README links. Those issues are outside this relocation and remain unresolved. Earlier per-batch validation/ignore reports are retained as historical results rather than rewritten as new checks.
