---
schema_version: 1
id: master:sales-guidelines-api-licensing-principles
kind: master-document
domain: shared
title: "API Licensing Principles"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "sales-guidelines/API Licensing Principles.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/sales-guidelines/API Licensing Principles.md"
  source_sha256: 66b3eff42ea2b7d955c198864c2c322865d7e38e21b00b28c0cae490556687ba
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: API Licensing Principles
    status: draft
    classification: internal
    audience: internal
    scope: Circularo API licensing and consumption rules
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# API Licensing Principles

## Purpose

These principles define how the Circularo REST API is licensed and how API-based trust services are consumed.

The REST API is an integration capability. It is **not** a separate Product, Plan, or Subscription Model.

API capabilities are available only with **User-Based Subscriptions**.

The Circularo REST API is an integration capability available for Business, Enterprise, and Ultimate Plans. It enables customers to integrate applications, automate business processes, and programmatically access the Circularo Digital Trust Platform and its digital trust services through a unified REST API

---

# Core Licensing Principle

**API automation does not replace Internal User licensing.**

Every Internal User who accesses or benefits from the Circularo platform must be licensed, regardless of whether trust transactions are initiated through the Circularo web application or programmatically through the REST API.

The REST API is an integration mechanism—not an alternative licensing model.

---

# Internal Users

Internal Users are licensed users belonging to the customer's organization who access or benefit from the Circularo Digital Trust Platform. Each Internal User requires a valid User licence.

Depending on their assigned roles and permissions, they may:

- Access the Circularo web and mobile applications

- Create, upload, and organize documents

- Search and retrieve documents

- Collaborate and co-author documents

- Review, approve, and sign documents

- Apply electronic seals (where permitted)

- Manage templates

- Configure workflows

- Manage metadata and document classification

- Access audit trails and evidence records

- Download signed documents and certificates of completion

- Download audit evidence and verification records

- Manage document archives and retention

- Configure integrations

- Generate and manage API credentials

- Monitor transactions and workflows

- Access dashboards and reports

- Administer users, security, and organizational settings

Every organization must have at least one Regular User acting as the platform administrator.
---

# External Participants

External Participants are recipients outside the customer's organization.

Examples include:

- Customers
- Suppliers
- Partners
- Citizens
- Contractors

External Participants may:

- Receive documents
- Review documents
- Approve documents
- Sign documents
- Complete identity verification

External Participants are always **free and unlimited**.

They never require user licences.

---

# API Licensing Model

Every API deployment consists of three independent commercial components.

## 1. User-Based Subscription

Every API customer must have a User-Based Subscription covering all Internal Users who access or benefit from the platform.

The Subscription licenses people—not integrations.

---

## 2. REST API Access Add-On

The REST API Access Add-On enables customers to integrate and automate the Circularo platform.

Typical capabilities include:

- User management
- Workflow management
- Template management
- Document upload
- Document download
- Metadata
- Search
- Administration
- Reporting
- Event notifications
- Webhooks

The REST API Access Add-On enables **platform integration only**.

It does **not** include the programmatic consumption of trust services.

---

## 3. API Trust Service Add-Ons

Applications performing trust services programmatically must purchase the corresponding API Consumption Add-Ons.

Examples include:

- API eSigning Transactions
- API eSealing Transactions
- Identity Verification (KYC)
- Qualified Timestamps
- SMS OTP
- SMS Notifications
- National eID services
- Future Trust Services

Each trust service is licensed independently.

---

# Commercial Rule

Think of the commercial model as two independent layers.

## Integration Layer

Provides programmatic access to the Circularo platform.

Examples:

- Upload documents
- Create workflows
- Manage users
- Query status
- Receive webhook events
- Retrieve audit information

Requires:

- REST API Access Add-On

---

## Trust Services Layer

Provides programmatic access to billable trust services.

Examples:

- Electronic signatures
- Electronic seals
- Identity verification
- Qualified timestamps
- SMS OTP
- Other trust services

Requires:

- The corresponding API Trust Service Add-On(s)

---

# Typical Configurations

## Internal Business Automation

Customer:

- 100 Internal Users
- ERP integration
- Automatic document generation

Requires:

- User-Based Subscription (100 users)
- REST API Access Add-On

No API Trust Service Add-Ons are required if trust transactions continue to be initiated manually by licensed Internal Users.

---

## Automated Electronic Signing

Customer application automatically generates agreements and submits them for electronic signature.

Requires:

- User-Based Subscription
- REST API Access Add-On
- API eSigning Transactions Add-On

---

## Automated Electronic Sealing

Customer automatically applies organizational electronic seals to invoices, certificates, or reports.

Requires:

- User-Based Subscription
- REST API Access Add-On
- API eSealing Transactions Add-On

---

## Digital Customer Onboarding

Customer application performs:

- Identity verification
- Electronic signing
- SMS OTP
- Qualified timestamping

Requires:

- User-Based Subscription
- REST API Access Add-On
- API eSigning Transactions Add-On
- Identity Verification Add-On
- SMS OTP Add-On
- Qualified Timestamp Add-On
- Any other required Trust Service Add-Ons

---

# Sales Rules

Always explain:

- API is an integration capability—not a separate product.
- API automation never replaces Internal User licensing.
- Every Internal User must be licensed through a User-Based Subscription.
- External Participants are always free and unlimited.
- REST API Access enables platform integration.
- API Trust Service Add-Ons enable programmatic consumption of trust services.

Never say:

- "API replaces user licences."
- "Only the API administrator needs a licence."
- "Internal users don't require licences because everything is automated."
- "REST API Access includes electronic signing or sealing."
- "API is a separate licensing model."

---

# Core Sales Message

> **Every Internal User is licensed through a User-Based Subscription. The REST API enables integration with the Circularo platform, while API Trust Service Add-Ons license the programmatic consumption of trust services. API automation complements the User-Based licensing model—it never replaces it.**
