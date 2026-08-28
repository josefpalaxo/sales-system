---
schema_version: 1
id: commercial-model:sales-layers
kind: commercial-model
domain: shared
title: Circularo Sales Layers
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part A / Sales layers"
relations:
  based_on:
    - source:commercial-model-2026
spec:
  ordered_layers:
    - solution
    - product
    - edition
    - plan
    - subscription
    - subscription-item
---

# Circularo Sales Layers

Circularo's commercial structure uses six ordered layers:

1. A **Solution** explains the customer problem and value. It carries no SKU, price, or limit.
2. A **Product** is the stable, market-facing offering customers recognize and buy.
3. An **Edition** defines which capabilities can exist. It carries no pricing or usage limits.
4. A **Plan** commercializes an Edition through subscription-model eligibility, pricing, limits, entitlements, bundles, and promotions.
5. A **Subscription** is the time-bound contractual container binding the customer, Plan, term, subscription model, add-ons, and applicable service components.
6. A **Subscription Item** is the atomic recurring or consumption-based unit billed and enforced.

Solutions frame value; Products are sold; Editions define possibility; Plans package and price; Subscriptions bind; Subscription Items bill and meter.
