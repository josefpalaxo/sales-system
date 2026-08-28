---
schema_version: 1
id: commercial-rule:add-on-plan-eligibility
kind: commercial-rule
domain: shared
title: Add-On and Plan Eligibility
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Combination of Add-Ons & Plans"
relations:
  based_on:
    - source:commercial-model-2026
  related_to:
    - commercial-rule:api-access
spec:
  availability:
    Start: none
    Pro: limited
    Business: broad
    Enterprise: full
    Ultimate: full-self-hosted
---

# Add-On and Plan Eligibility

Start has no Add-On availability. Pro has limited Add-On availability. Business has broad availability. Enterprise and Ultimate have full availability, with Ultimate applying to self-hosted deployment.

API Trust Service Add-Ons—including API eSigning and API eSealing Transactions—may be sold only with a user-based Subscription and only on an eligible Plan. Transaction-based Subscriptions are not used for new API commercial configurations.
