---
schema_version: 1
id: commercial-rule:automated-transactions
kind: commercial-rule
domain: shared
title: Automated Transaction Entitlement
status: reviewed
classification: internal
owner: role:cso
last_reviewed: 2026-08-27
review_by: 2026-09-15
sources:
  - ref: source:commercial-model-2026
    locator: "Transaction-Based Subscriptions; API usage; Manual vs Automated Transactions"
relations:
  - type: based_on
    target: source:commercial-model-2026
  - type: constrained_by
    target: conflict:automated-transactions-inclusion
spec:
  evidence_state: contradicted
  decision_required: Define whether transaction-based volume includes automated/API transactions and when dedicated add-ons are mandatory.
---

# Automated Transaction Entitlement

No single entitlement rule is canonical yet. Relevant sections of the commercial model disagree. Preserve the conflict and escalate commercial questions to the accountable owner.

