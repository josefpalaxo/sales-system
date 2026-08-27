---
schema_version: 1
id: conflict:transactional-document-storage-limits
kind: conflict
domain: shared
title: Transactional Document Storage Limits
status: open
classification: internal
owner: role:cso
last_reviewed: 2026-08-27
review_by: 2026-09-15
sources:
  - ref: source:commercial-model-2026
    locator: "Subscription Inclusions / Standard Storage"
  - ref: source:commercial-model-2026
    locator: "Storage & Retention / Transactional Document Storage"
relations:
  - type: based_on
    target: source:commercial-model-2026
spec:
  severity: blocking
  decision_owner: role:cso
---

# Transactional Document Storage Limits

## Conflict

The subscription-inclusions section says standard storage is not unlimited and is governed by plan-specific limits. The storage section says transactional documents are always retained and never subject to storage limits.

## Affected record

- `commercial-rule:transactional-document-storage`

## Required decision

Clarify whether transactional documents consume a plan storage allocation, whether retention is unlimited while working storage is limited, and how this should be expressed commercially.

Until resolved, do not promise unlimited transactional storage.

