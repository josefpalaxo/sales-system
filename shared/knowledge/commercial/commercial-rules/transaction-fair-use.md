---
schema_version: 1
id: commercial-rule:transaction-fair-use
kind: commercial-rule
domain: shared
title: Unlimited Transaction Fair Use
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Fair use"
relations:
  based_on:
    - source:commercial-model-2026
  applies_to:
    - commercial-rule:user-transaction-allowances
spec:
  applies_to: unlimited user-based manual transactions
---

# Unlimited Transaction Fair Use

Circularo may monitor usage patterns, detect automation or mass-processing misuse of user-based licensing, and require migration to transaction-based licensing and/or applicable consumption-based Add-Ons.

Fair use does not expand manual entitlements to cover bulk, automated, API-driven, or integration-driven execution.
