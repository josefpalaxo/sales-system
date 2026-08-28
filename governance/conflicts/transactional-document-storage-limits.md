---
schema_version: 1
id: conflict:transactional-document-storage-limits
kind: conflict
domain: shared
title: Transactional Document Storage Limits
status: resolved
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Subscription Inclusions / Standard Storage"
  - ref: source:commercial-model-2026
    locator: "Storage & Retention / Transactional Document Storage"
relations:
  based_on:
    - source:commercial-model-2026
  related_to:
    - decision:transactional-document-storage-fair-use
spec:
  severity: blocking
  decision_owner: role:cso
  resolution: Transactional documents have unlimited storage and retention subject to the fair use policy; standalone-document storage remains separately governed.
---

# Transactional Document Storage Limits

## Conflict

The subscription-inclusions section says standard storage is not unlimited and is governed by plan-specific limits. The storage section says transactional documents are always retained and never subject to storage limits.

## Affected record

- `commercial-rule:transactional-document-storage`

## Resolution

Resolved on 2026-08-28 by `decision:transactional-document-storage-fair-use`.

Transactional documents have unlimited storage and retention subject to the fair use policy. Standalone documents remain governed by their separate storage limits and add-ons.
