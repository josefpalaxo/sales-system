---
schema_version: 1
id: commercial-rule:manual-transactions
kind: commercial-rule
domain: shared
title: Manual Transaction Entitlement
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Manual vs Automated Transactions"
relations:
  based_on:
    - source:commercial-model-2026
  related_to:
    - commercial-rule:automated-transactions
spec:
  included_channels:
    - Circularo Web Application
    - Circularo Mobile Applications
    - Official productivity add-ins
---

# Manual Transaction Entitlement

A Manual Transaction is initiated by an authenticated, licensed internal user through the Circularo web application, mobile applications, or official productivity add-ins.

Manual transactions are included within the applicable user-based or transaction-based allowance. They include email identity verification, standard non-qualified timestamps, the audit trail, certificate of fulfilment, and transactional-document retention. Advanced identity, assurance, notification, qualified, bulk, and automated services require applicable Add-Ons.
