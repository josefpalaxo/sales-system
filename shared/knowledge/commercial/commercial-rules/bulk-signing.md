---
schema_version: 1
id: commercial-rule:bulk-signing
kind: commercial-rule
domain: shared
title: Bulk Signing Entitlement
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Bulk Signing Rule"
relations:
  based_on:
    - source:commercial-model-2026
  applies_to:
    - subscription-model:user-based
    - subscription-model:transaction-based
spec:
  unlimited: false
  user_based_annual_cap_per_regular_user: 120
---

# Bulk Signing Entitlement

Bulk signing is never unlimited. Under the user-based model, additional bulk capacity is available only through the consumption-based Bulk Signing Transactions Add-On, is capped at 120 transactions per Regular User per year, and counts against the shared organization transaction pool.

Under the transaction-based model, bulk signing consumes the licensed annual transaction volume.
