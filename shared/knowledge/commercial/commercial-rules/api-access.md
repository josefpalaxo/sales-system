---
schema_version: 1
id: commercial-rule:api-access
kind: commercial-rule
domain: shared
title: REST API Access and Consumption
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / API usage"
relations:
  based_on:
    - source:commercial-model-2026
  constrained_by:
    - commercial-rule:automated-transactions
    - commercial-rule:add-on-plan-eligibility
spec:
  api_is_separate_product: false
  eligible_subscription_model: user-based
  legacy_transaction_based_cutoff: 2026-08-01
---

# REST API Access and Consumption

The REST API is not a Product, Plan, or Subscription Model. The REST API Access Add-On unlocks integration and automation but includes no programmatic trust-service consumption.

New API customers require a user-based Subscription, licensing all internal users who access or benefit from the platform, plus the applicable API transaction and trust-service consumption Add-Ons. User-based manual allowances do not cover API-initiated trust services.

Transaction-based customers onboarded before 1 August 2026 retain the entitlement governed by their existing agreement. New packaging applies prospectively on a new term or renewal and does not alter an existing Subscription unless agreed.
