---
schema_version: 1
id: commercial-rule:add-on-policy-flags
kind: commercial-rule
domain: shared
title: Add-On Policy Flags
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:add-on-model-2026
    locator: "Policy Flags"
relations:
  based_on:
    - source:add-on-model-2026
spec:
  flags:
    regulatory: legal or compliance dependency
    regional: geographic availability constraint
    requires-approval: pricing or risk gate
    bundlable: standalone or plan-bundled eligibility
    credit-only: prepaid or wallet-based charging requirement
---

# Add-On Policy Flags

Policy flags are commercial guardrails, not features:

- **Regulatory:** legal or compliance dependency.
- **Regional:** geographic availability restriction.
- **Requires Approval:** pricing or risk gate requiring a pause.
- **Bundlable:** governs standalone versus plan-bundled sale.
- **Credit-Only:** requires prepaid or wallet-based charging.
