---
schema_version: 1
id: commercial-rule:user-transaction-allowances
kind: commercial-rule
domain: shared
title: User-Based Transaction Allowances
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / Transaction Limits for User-based Subscriptions"
relations:
  based_on:
    - source:commercial-model-2026
  applies_to:
    - subscription-model:user-based
  constrained_by:
    - commercial-rule:transaction-fair-use
    - commercial-rule:automated-transactions
spec:
  pool_scope: organization
  variants:
    - name: Regular User 60
      annual_manual_transactions: 60
    - name: Regular User 120
      annual_manual_transactions: 120
    - name: Regular User Unlimited
      annual_manual_transactions: unlimited
    - name: Lite User
      annual_manual_transactions: 0
---

# User-Based Transaction Allowances

Regular User entitlements are offered with annual manual-transaction allowances of 60, 120, or Unlimited. Lite Users include no transaction allowance. Allowances are pooled across the organization.

“Unlimited” applies only to manual, human-initiated transactions and remains subject to fair use and the separately governed bulk and automation rules.
