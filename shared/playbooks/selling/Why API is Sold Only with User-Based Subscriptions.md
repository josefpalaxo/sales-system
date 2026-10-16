---
schema_version: 1
id: master:sales-guidelines-why-api-is-sold-only-with-user-based-subscriptions
kind: master-document
domain: shared
title: "Why API is Sold Only with User-Based Subscriptions"
status: reviewed
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "sales-guidelines/Why API is Sold Only with User-Based Subscriptions.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/sales-guidelines/Why API is Sold Only with User-Based Subscriptions.md"
  source_sha256: 07bff5d98ddd545805be5e8e5e69290db15f01b5e6cfa585d17d3cf7201a8770
  legacy_status: approved
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Why API is Sold Only with User-Based Subscriptions
    status: approved
    classification: internal
    audience: sales
    scope: Commercial rationale for API licensing
---

> Import review: the source marks this document approved, but supplies no approval review dates. It is retained as reviewed pending confirmation of current approval and review dates. The active Commercial Model remains the governing master.

# Why API is Sold Only with User-Based Subscriptions

## Purpose

This document explains why Circularo only sells REST API capabilities together with **User-Based Subscriptions**.

This is an intentional commercial decision that protects the integrity of our licensing model and prevents commercial loopholes.

## Core Principle

> **API automation does not replace Internal User licensing.**

Every Internal User who accesses or benefits from the Circularo platform must be licensed through a **User-Based Subscription**, regardless of whether trust transactions are initiated through the Circularo application or programmatically through the REST API.

The REST API is an integration mechanism—not an alternative licensing model.

## The Commercial Loophole

The API eSigning Transactions Add-On and API eSealing Transactions Add-On are intentionally priced **lower per transaction** than a standard Transaction-Based Subscription.

This is because they license only the **programmatic consumption of trust services** and do **not** include licensing for Internal Users.

By contrast, a Transaction-Based Subscription is designed primarily for **manual, user-initiated transactions** and includes licensing for a large number of Internal Users (or unlimited Internal Users, unless explicitly capped by a specific licensing variant).

If API were allowed together with Transaction-Based Subscriptions, customers could significantly reduce their licensing costs while still enabling all Internal Users to benefit from the platform.

### Example

A customer purchases:

- Enterprise Transaction-Based Subscription
- 100 annual manual signing transactions
- REST API Access Add-On
- API eSigning Transactions Add-On

The customer has **1,000 Internal Users**.

Instead of those users manually creating and sending documents through the Circularo application, the customer's ERP automatically generates and submits every signing request through the REST API.

The customer would effectively receive:

- Licensing for up to 1,000 Internal Users
- Full API integration
- High-volume automated signing
- Lower-cost API eSigning Transaction pricing

while purchasing only a small manual transaction allowance.

This would undermine the commercial intent of the Transaction-Based Subscription Model by shifting the majority of execution from manual transactions to lower-cost API Trust Service Transactions.

For this reason, API capabilities are sold exclusively with **User-Based Subscriptions**, ensuring that:

- Internal Users are always licensed appropriately.
- API Trust Service Add-Ons are used solely to license automated trust service consumption.
- The commercial separation between user licensing and API consumption remains clear, consistent, and commercially sustainable.


## Our Commercial Policy

To eliminate this loophole:

- API capabilities are sold only with **User-Based Subscriptions**.
- Every Internal User must be licensed through a User-Based Subscription.
- REST API Access enables platform integration.
- API Trust Service Add-Ons license automated trust service consumption.

This keeps Internal User licensing independent from API consumption.


## Benefits

This approach:

- Protects the value of User-Based licensing.
- Prevents customers from bypassing Internal User licensing through automation.
- Creates a simple and consistent commercial model.
- Makes quoting, billing, and licensing audits straightforward.
- Clearly separates people, integrations, and trust service consumption.


## Sales Rule

Always explain:

- Internal Users are licensed through **User-Based Subscriptions**.
- REST API Access enables integration.
- API Trust Service Add-Ons license automated trust services.
- External recipients and signatories are always free and unlimited.

**People are licensed separately from integrations, and integrations are licensed separately from trust service consumption.**
