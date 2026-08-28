---
schema_version: 1
id: subscription-model:structure
kind: subscription-model
domain: shared
title: Subscription Structure
status: approved
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-08-28
review_by: 2026-11-26
sources:
  - ref: source:commercial-model-2026
    locator: "Part A / Subscription; Part B / Subscription Models"
relations:
  based_on:
    - source:commercial-model-2026
  related_to:
    - commercial-model:sales-layers
spec:
  exactly_one_subscription_model: true
  subscription_models:
    - user-based
    - transaction-based
    - dms-only
  optional_components:
    - add-ons
    - server-subscription
    - support-upgrade
---

# Subscription Structure

A Subscription is the contractual container for exactly one mutually exclusive subscription model: user-based, transaction-based, or DMS-only. A customer may change models through a commercial change but does not combine them within one Subscription.

The Subscription also binds its Plan, term, limits, optional Add-Ons, applicable server subscription for self-hosted deployment, and support coverage. Its Subscription Items are the individual billed and enforced components.
