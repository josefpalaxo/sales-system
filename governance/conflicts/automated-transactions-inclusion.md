---
schema_version: 1
id: conflict:automated-transactions-inclusion
kind: conflict
domain: shared
title: Automated Transactions Inclusion
status: open
classification: internal
owner: role:cso
last_reviewed: 2026-08-27
review_by: 2026-09-15
sources:
  - ref: source:commercial-model-2026
    locator: "Transaction-Based Subscriptions / Transaction Types"
  - ref: source:commercial-model-2026
    locator: "API usage / Transaction-Based Subscription"
  - ref: source:commercial-model-2026
    locator: "Manual vs Automated Transactions / Automated Transactions"
relations:
  - type: based_on
    target: source:commercial-model-2026
spec:
  severity: blocking
  decision_owner: role:cso
---

# Automated Transactions Inclusion

## Conflict

The transaction-based subscription sections state that transaction-based subscriptions include manual and automated/API transactions, with included volume or optional dedicated API transaction add-ons. A later section states that automated transactions are not included in either transaction model and always require consumption add-ons.

## Affected records

- `subscription-model:transaction-based`
- `commercial-rule:automated-transactions`

## Required decision

Define the entitlement rule for automated/API signing and sealing under transaction-based subscriptions, including when REST API access and dedicated transaction add-ons are required.

Until resolved, do not make an unqualified external commitment about automated transaction inclusion.

