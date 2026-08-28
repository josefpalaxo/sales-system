---
schema_version: 1
id: commercial-rule:sandbox-environments
kind: commercial-rule
domain: shared
title: Developer and Non-Production Sandbox Environments
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Developer & Non-Production Access"
relations:
  based_on:
    - source:commercial-model-2026
  related_to:
    - commercial-rule:api-access
spec:
  production_credits_consumed: false
  included_plans:
    - Business
    - Enterprise
---

# Developer and Non-Production Sandbox Environments

Dedicated sandboxes are logically isolated non-production environments for API development, integration testing, and automation validation. Their use does not consume production credits.

Sandbox data may be reset, updated, or deleted without notice and must not hold production or business-critical data. Dedicated sandboxes are available with Business and Enterprise Plans or separately through the REST API Access Add-On.
