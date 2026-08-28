---
schema_version: 1
id: commercial-rule:automated-transactions
kind: commercial-rule
domain: shared
title: Automated Transaction Entitlement
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
  based_on:
    - source:commercial-model-2026
  supported_by:
    - decision:transaction-based-automation-entitlement
spec:
  evidence_state: verified
  included_by_default: false
  rule: Automated and API-initiated transactions require separately licensed add-ons under both user-based and transaction-based subscriptions, subject to plan eligibility.
---

# Automated Transaction Entitlement

Automated and API-initiated transactions are not included by default in either user-based or transaction-based subscriptions. API access enables the integration channel; the applicable transaction or trust-service consumption add-on licenses the automated volume. All add-ons remain subject to plan eligibility.
