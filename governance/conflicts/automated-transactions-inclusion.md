---
schema_version: 1
id: conflict:automated-transactions-inclusion
kind: conflict
domain: shared
title: Automated Transactions Inclusion
status: resolved
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Transaction-Based Subscriptions / Transaction Types"
  - ref: source:commercial-model-2026
    locator: "API usage / Transaction-Based Subscription"
  - ref: source:commercial-model-2026
    locator: "Manual vs Automated Transactions / Automated Transactions"
relations:
  based_on:
    - source:commercial-model-2026
  related_to:
    - decision:transaction-based-automation-entitlement
spec:
  severity: blocking
  decision_owner: role:cso
  resolution: Transaction-based subscriptions do not include automated or API-initiated transactions; applicable add-ons are separately required, subject to plan eligibility.
---

# Automated Transactions Inclusion

## Conflict

The transaction-based subscription sections state that transaction-based subscriptions include manual and automated/API transactions, with included volume or optional dedicated API transaction add-ons. A later section states that automated transactions are not included in either transaction model and always require consumption add-ons.

## Affected records

- `subscription-model:transaction-based`
- `commercial-rule:automated-transactions`

## Resolution

Resolved on 2026-08-28 by `decision:transaction-based-automation-entitlement`.

Transaction-based subscriptions include licensed manual-transaction volume only. Automated and API-initiated transactions require applicable separately licensed add-ons, subject to plan eligibility.
