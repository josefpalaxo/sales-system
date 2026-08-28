---
schema_version: 1
id: decision:transaction-based-automation-entitlement
kind: decision
domain: shared
title: Transaction-Based Automation Entitlement
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Transaction-Based Subscriptions; API usage; Manual vs Automated Transactions"
relations:
  applies_to:
    - subscription-model:transaction-based
    - commercial-rule:automated-transactions
    - conflict:automated-transactions-inclusion
spec:
  effective_date: 2026-08-28
  decision: Transaction-based subscriptions do not include automated or API-initiated transactions.
---

# Transaction-Based Automation Entitlement

## Decision

Transaction-based subscriptions include licensed manual-transaction volume only. Automated and API-initiated transactions are not included and require the applicable separately licensed access and consumption add-ons, subject to plan eligibility.

## Consequences

- Transaction-based volume must not be presented as including API or automated execution.
- API access and automated transaction consumption remain separately entitled.
- Plan eligibility continues to determine whether the necessary add-ons may be sold.

## Impact disposition

The transaction-based subscription and automated-transaction rule records are approved with this entitlement. The blocking conflict is resolved. Other subscription, plan, and add-on rules are unchanged.
