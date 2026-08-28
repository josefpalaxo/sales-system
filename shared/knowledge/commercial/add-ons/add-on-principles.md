---
schema_version: 1
id: commercial-rule:add-on-principles
kind: commercial-rule
domain: shared
title: Add-On Commercial Principles
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:add-on-model-2026
    locator: "Key Principles to follow"
relations:
  based_on:
    - source:add-on-model-2026
  constrained_by:
    - add-on-model:commercial-rails
    - commercial-rule:api-access
spec:
  automated_execution_is_chargeable_event: true
  api_access_includes_usage: false
---

# Add-On Commercial Principles

- Add-Ons change capability or assurance level but do not redefine legal semantics.
- Consumption-Based Add-Ons always consume Credits across UI, API, and automation channels.
- API access unlocks a channel and includes no free usage.
- National ID and qualified services are region-locked.
- Verification services apply retry and attempt controls.
- Bundles package existing Add-Ons and create no new entitlements.
- Automated execution always maps to a Chargeable Event.
