---
schema_version: 1
id: commercial-rule:subscription-plan-eligibility
kind: commercial-rule
domain: shared
title: Subscription Variant and Plan Eligibility
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Combination of Subscription Models & Plans"
relations:
  based_on:
    - source:commercial-model-2026
  applies_to:
    - subscription-model:user-based
    - subscription-model:transaction-based
spec:
  eligibility:
    Start:
      - Regular User 60
    Pro:
      - Regular User 120
      - Regular User Unlimited
    Business:
      - Regular User 120
      - Regular User Unlimited
      - Lite User
      - eSign Transactions Unlimited Users
      - eSign Transactions 50 Users
      - eSign Transactions 25 Users
    Enterprise:
      - Regular User 120
      - Regular User Unlimited
      - Lite User
      - eSign Transactions Unlimited Users
      - eSign Transactions 50 Users
      - eSign Transactions 25 Users
    Ultimate:
      - Regular User Unlimited
      - Lite User
      - eSign Transactions Unlimited Users
---

# Subscription Variant and Plan Eligibility

Plans determine which subscription variants are allowed; variants determine how users or transaction volume are capped.

- Start permits Regular User 60 only.
- Pro permits Regular User 120 or Unlimited, with no Lite or transaction-based variant.
- Business and Enterprise permit the full user-based and transaction-based variant set.
- Ultimate permits Regular User Unlimited, Lite Users, or transaction-based eSign Transactions with Unlimited Users.

User-based and transaction-based models cannot be combined within one Subscription.
