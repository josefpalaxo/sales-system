---
schema_version: 1
id: edition-model:plan-edition-deployment
kind: edition-model
domain: shared
title: Plan, Edition, and Deployment Mapping
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Editions vs Plans; Deployment Modes"
relations:
  based_on:
    - source:commercial-model-2026
spec:
  mappings:
    - plan: Start
      edition: Start
      deployment: SaaS
    - plan: Pro
      edition: Pro
      deployment: SaaS
    - plan: Business
      edition: Business
      deployment: SaaS
    - plan: Enterprise
      edition: Enterprise
      deployment: SaaS
    - plan: Ultimate
      edition: Enterprise
      deployment: Self-Hosted
---

# Plan, Edition, and Deployment Mapping

Circularo has four base Editions—Start, Pro, Business, and Enterprise—and five Plans. Start, Pro, Business, and Enterprise Plans are SaaS. Ultimate uses the Enterprise Edition in a self-hosted deployment.

Enterprise and Ultimate therefore share the same functional Edition; deployment distinguishes them commercially.

Self-hosted deployments are available only through Ultimate and use either a single-tenant server subscription or a multi-tenant server subscription. Single-tenant deployments provide a dedicated organization instance. Multi-tenant deployments host multiple organizations with logical tenant isolation.
