---
schema_version: 1
id: subscription-model:transaction-based
kind: subscription-model
domain: shared
title: Transaction-Based Subscription Model
status: reviewed
classification: internal
owner: role:cso
last_reviewed: 2026-08-27
review_by: 2026-09-15
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Transaction-Based Subscriptions"
relations:
  - type: based_on
    target: source:commercial-model-2026
  - type: constrained_by
    target: conflict:automated-transactions-inclusion
spec:
  evidence_state: contradicted
  approval_boundary: Do not make an external API or automation entitlement claim until the conflict is resolved.
---

# Transaction-Based Subscription Model

The approved source describes a subscription based on annual transaction volume and available on Business, Enterprise, and Ultimate plans.

The source is internally inconsistent about whether automated/API transactions are included in the licensed volume. This record is therefore `reviewed`, not `approved`, and must not be used to make an unqualified customer commitment about automated transaction entitlement.

