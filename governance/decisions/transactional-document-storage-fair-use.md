---
schema_version: 1
id: decision:transactional-document-storage-fair-use
kind: decision
domain: shared
title: Transactional Document Storage Under Fair Use
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Subscription Inclusions; Storage & Retention"
relations:
  applies_to:
    - commercial-rule:transactional-document-storage
    - conflict:transactional-document-storage-limits
spec:
  effective_date: 2026-08-28
  decision: Transactional documents have unlimited storage and retention subject to the fair use policy.
---

# Transactional Document Storage Under Fair Use

## Decision

Transactional documents have unlimited storage and retention for audit-trail and evidence-preservation purposes, subject to the fair use policy.

## Consequences

- Transactional documents do not consume a plan-specific storage allocation.
- The fair use policy remains the governing protection against misuse.
- Standalone documents remain subject to their separate storage limits and add-on requirements.

## Impact disposition

The transactional-document storage rule is approved with this boundary. The blocking conflict is resolved. Standalone storage and DMS add-on rules are unchanged.
