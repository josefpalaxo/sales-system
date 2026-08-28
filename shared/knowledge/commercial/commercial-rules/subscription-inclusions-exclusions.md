---
schema_version: 1
id: commercial-rule:subscription-inclusions-exclusions
kind: commercial-rule
domain: shared
title: Default Subscription Inclusions and Exclusions
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Subscription Inclusions & Exclusions"
relations:
  based_on:
    - source:commercial-model-2026
  constrained_by:
    - commercial-rule:transactional-document-storage
    - commercial-rule:automated-transactions
---

# Default Subscription Inclusions and Exclusions

Every Subscription includes one Plan, exactly one subscription model, Essential Support, and transactional-document storage and retention under `commercial-rule:transactional-document-storage`.

The following are excluded by default and require their applicable Add-Ons: API automation; SMS OTP and reminders; KYC, AML, and National ID; qualified timestamps, signatures, and seals; bulk or batch processing; white-label and corporate branding capabilities; and standalone DMS and expanded storage.
