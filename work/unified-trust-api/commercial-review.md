---
title: Unified Trust API commercial correction review
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
source: Josef's explicit commercial correction in this chat on 2026-10-06
evidence_state: reported
review_owner: role:cso
---

# Unified Trust API commercial correction review

[Proposal copy](proposal-copy.md) follows Josef's latest explicit correction for this task. It supersedes the earlier packaging wording in the proposal draft. The approved shared records have not been rewritten or reapproved.

## Records requiring reconciliation

- `commercial-rule:api-access` currently limits new API configurations to user-based subscriptions. Josef's correction permits user-based or transaction-based subscriptions. Its legacy cutoff treatment also requires owner disposition in light of this correction.
- `commercial-rule:add-on-plan-eligibility` currently restricts API trust-service Add-Ons to user-based subscriptions. That restriction disagrees with the corrected proposal basis.
- Enterprise API access inclusion and Business API access purchase treatment need to be reflected in the authoritative commercial records.
- `commercial-rule:automated-transactions` and `subscription-model:transaction-based` already distinguish manual allowances from automated/API consumption. The correction additionally makes the applicable API eSealing/eSigning Transactions mandatory for automated/API transaction scenarios.

The commercial owner should reconcile these records and their dependent decisions before the corrected wording is promoted into governed reusable material. The current discrepancy remains visible here and in the proposal's metadata; no new approval or silent resolution is implied.

Ultimate remains an eligible Plan under Josef's preceding instruction. The latest correction specifies API access inclusion for Enterprise and separate purchase for Business only. The draft makes no inclusion or price claim for Ultimate; that treatment should be explicit in the customer's offer.
