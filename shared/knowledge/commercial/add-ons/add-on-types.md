---
schema_version: 1
id: add-on-model:types
kind: add-on-model
domain: shared
title: Add-On Types
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:add-on-model-2026
    locator: "Add-On Types"
relations:
  based_on:
    - source:add-on-model-2026
  constrained_by:
    - add-on-model:commercial-rails
spec:
  exactly_one_type_per_add_on: true
  types:
    feature-based: Capability or configuration unlock; not usage-limited and not per-user.
    consumption-based: Usage-driven capability metered through Chargeable Events.
    user-based: Per-user licensed capability that scales with users rather than usage.
    service-based: Finite one-time professional service with no ongoing entitlement.
---

# Add-On Types

Every Add-On belongs to exactly one type:

- **Feature-Based:** unlocks a capability or configuration; not metered by usage and not licensed per user.
- **Consumption-Based:** licenses a usage-driven capability metered through Chargeable Events.
- **User-Based:** licenses a capability per covered user, independently of usage.
- **Service-Based:** purchases finite professional work once and creates no ongoing entitlement.
