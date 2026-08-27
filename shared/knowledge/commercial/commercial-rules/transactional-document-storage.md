---
schema_version: 1
id: commercial-rule:transactional-document-storage
kind: commercial-rule
domain: shared
title: Transactional Document Storage and Retention
status: reviewed
classification: internal
owner: role:cso
last_reviewed: 2026-08-27
review_by: 2026-09-15
sources:
  - ref: source:commercial-model-2026
    locator: "Subscription Inclusions; Storage & Retention"
relations:
  - type: based_on
    target: source:commercial-model-2026
  - type: constrained_by
    target: conflict:transactional-document-storage-limits
spec:
  evidence_state: contradicted
  decision_required: Define whether transactional documents consume a plan storage limit while remaining retained for evidence.
---

# Transactional Document Storage and Retention

The commercial model consistently requires retention of transactional documents but is inconsistent about whether those documents are subject to storage limits. Do not promise unlimited transactional storage until the conflict is resolved.

