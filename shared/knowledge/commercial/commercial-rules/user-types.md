---
schema_version: 1
id: commercial-rule:user-types
kind: commercial-rule
domain: shared
title: Commercial User Types
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part B / User types; User Type vs Roles"
relations:
  based_on:
    - source:commercial-model-2026
  applies_to:
    - subscription-model:user-based
spec:
  regular_user_required_per_organization: 1
  lite_user_price_ratio_to_regular: 0.5
  external_user_price: free
---

# Commercial User Types

- **Regular User:** full Product access; every organization requires at least one.
- **Lite User:** optional limited access as Sign-Only, Read-Only, or Prepare-Only; priced at 50% of a Regular User licence and includes no transaction allowance.
- **External User or Recipient:** external to the customer's organization; free and unlimited.

User Types define commercial access. Roles define permissions and never replace the required user entitlement.
