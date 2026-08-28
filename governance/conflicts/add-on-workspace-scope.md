---
schema_version: 1
id: conflict:add-on-workspace-scope
kind: conflict
domain: shared
title: Add-On Workspace Scope
status: open
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-09-15
sources:
  - ref: source:add-on-model-2026
    locator: "Add-On Model Overview / Scope"
  - ref: source:add-on-model-2026
    locator: "Scope (WHERE it applies)"
relations:
  based_on:
    - source:add-on-model-2026
spec:
  severity: material
  decision_owner: role:cso
---

# Add-On Workspace Scope

## Conflict

The add-on overview includes Workspace as an available scope. The detailed enforcement section lists Organization, User, Event, and Deployment Type but does not define Workspace.

## Affected record

- `commercial-rule:add-on-scopes`

## Required decision

Confirm whether Workspace is a supported Add-On enforcement scope. If it is supported, define which Add-On types may use it and how it relates to the default Organization scope.

Until resolved, do not promise or configure Workspace-scoped Add-Ons from this source alone.
