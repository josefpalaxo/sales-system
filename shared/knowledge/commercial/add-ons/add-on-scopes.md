---
schema_version: 1
id: commercial-rule:add-on-scopes
kind: commercial-rule
domain: shared
title: Add-On Enforcement Scopes
status: reviewed
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-09-15
sources:
  - ref: source:add-on-model-2026
    locator: "Add-On Model Overview / Scope; Scope (WHERE it applies)"
relations:
  based_on:
    - source:add-on-model-2026
  constrained_by:
    - conflict:add-on-workspace-scope
spec:
  evidence_state: contradicted
  confirmed_scopes:
    - organization
    - user
    - event
    - deployment-type
  unresolved_scope: workspace
---

# Add-On Enforcement Scopes

The detailed rules define Organization as the default scope, User for User-Based Add-Ons, Event for Consumption-Based Add-Ons, and Deployment Type for edge cases such as on-premises or sovereign deployments.

The overview also names Workspace, but the detailed enforcement list does not define it. Workspace scope is therefore not canonical until `conflict:add-on-workspace-scope` is resolved.
