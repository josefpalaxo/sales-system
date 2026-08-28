---
schema_version: 1
id: subscription-model:transaction-based
kind: subscription-model
domain: shared
title: Transaction-Based Subscription Model
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Transaction-Based Subscriptions"
relations:
  based_on:
    - source:commercial-model-2026
  supported_by:
    - decision:transaction-based-automation-entitlement
spec:
  evidence_state: verified
  includes_automated_transactions: false
  entitlement_rule: Automated and API-initiated transactions require separately licensed add-ons, subject to plan eligibility.
---

# Transaction-Based Subscription Model

The transaction-based subscription is based on licensed annual manual-transaction volume and is available on Business, Enterprise, and Ultimate plans.

Automated and API-initiated transactions are not included in the licensed transaction volume. They require the applicable separately licensed access and consumption add-ons, subject to plan eligibility.
