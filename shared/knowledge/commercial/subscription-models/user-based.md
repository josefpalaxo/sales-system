---
schema_version: 1
id: subscription-model:user-based
kind: subscription-model
domain: shared
title: User-Based Subscription Model
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / User-based Subscriptions"
relations:
  based_on:
    - source:commercial-model-2026
  constrained_by:
    - commercial-rule:user-transaction-allowances
    - commercial-rule:automated-transactions
    - commercial-rule:subscription-plan-eligibility
spec:
  named_internal_users: true
  external_recipients_free: true
  external_recipients_unlimited: true
  transaction_pool_scope: organization
---

# User-Based Subscription Model

The user-based model licenses named internal users and includes a pooled annual allowance for manual, human-initiated transactions. The allowance is shared at the organization level.

At least one Regular User is required. External recipients are free and unlimited. Automation, API use, regulated trust services, and other excluded capabilities require their applicable Add-Ons.
