---
schema_version: 1
id: message:add-on-type-explanations
kind: message
domain: shared
title: Sales Explanations for Add-On Types
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2027-02-24
sources:
  - ref: source:add-on-model-2026
    locator: "Sales-ready explanations"
relations:
  based_on:
    - source:add-on-model-2026
  constrained_by:
    - add-on-model:types
    - add-on-model:commercial-rails
---

# Sales Explanations for Add-On Types

- **Feature Add-On:** You pay to unlock a capability. Once enabled, usage is not counted.
- **Consumption Add-On:** You pay when you use it. Every chargeable action consumes credits.
- **User Add-On:** You pay per covered user, regardless of usage.
- **Service Add-On:** You purchase finite professional work once; it creates no ongoing entitlement or usage allowance.

Use the governed type and rail records for contractual or configuration detail.
