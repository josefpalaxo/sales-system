---
schema_version: 1
id: add-on-model:commercial-rails
kind: add-on-model
domain: shared
title: Add-On Commercial Rails
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:add-on-model-2026
    locator: "Commercial Rails; Allowed combinations"
relations:
  based_on:
    - source:add-on-model-2026
  applies_to:
    - add-on-model:types
spec:
  mappings:
    feature-based:
      required: entitlement-fee
      optional: activation-fee
      prohibited:
        - credit-consumption
        - one-time-fee
    consumption-based:
      required: credit-consumption
      optional: activation-fee
      prohibited:
        - entitlement-fee
        - per-user-pricing
    user-based:
      required: per-user-entitlement-fee
      prohibited:
        - credit-consumption
        - usage-pricing
    service-based:
      required: one-time-fee
      prohibited:
        - entitlement-fee
        - credit-consumption
---

# Add-On Commercial Rails

Commercial rails determine how an Add-On is charged:

- Feature-Based Add-Ons use a recurring entitlement fee and may also have an activation fee.
- Consumption-Based Add-Ons consume credits and may also have an activation fee.
- User-Based Add-Ons use a recurring entitlement fee priced per covered user.
- Service-Based Add-Ons use a one-time service fee only.

An Add-On may not use a rail prohibited for its type.
