---
schema_version: 1
id: master:sales-guidelines-selling-circularo-api-plans
kind: master-document
domain: shared
title: "Selling API Plans"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "sales-guidelines/Selling Circularo API Plans.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/sales-guidelines/Selling Circularo API Plans.md"
  source_sha256: 4c6f07165e288f8c5010ac1d50037ec9ddbc5c5570c08e265e6c8845d46167ec
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Selling API Plans
    status: draft
    classification: internal
    audience: internal
    scope: Circularo API selling motion and commercial guidance
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Selling API Plans

## Purpose

This guide explains how to position and sell Circularo API capabilities consistently and correctly.

There are no standalone API Plans.

The Circularo REST API is an integration capability available for Business, Enterprise, and Ultimate Plans. It enables customers to integrate applications, automate business processes, and programmatically access the Circularo Digital Trust Platform and its digital trust services through a unified REST API.

Every API deployment consists of:

- User-Based Subscription
- REST API Access Add-On
- Optional API eSealing / eSigning Add-Ons
- Optional Other Consumption Add-Ons

---

# Key Sales Message

> **Circularo provides a unified REST API that enables organizations to integrate trusted execution directly into their business applications or automate such services while maintaining the same commercial licensing model for Internal Users. API automation complements the platform—it never replaces user licensing.**

---

# Core Licensing Principle

**API automation does not replace Internal User licensing.**

Every Internal User who accesses or benefits from the Circularo platform must be licensed through a User-Based Subscription, regardless of whether  are initiated through the Circularo application or programmatically through the REST API.

The REST API is an integration mechanism—not an alternative licensing model.

---

# API Commercial Model

Every API deployment consists of three independent commercial components.

## 1. User-Based Subscription

Every API customer must have a User-Based Subscription covering all Internal Users.

The Subscription licenses people—not integrations.

---

## 2. REST API Access Add-On

REST API Access enables customers to integrate and automate the Circularo platform.

Typical capabilities include:

- User management
- Workflow management
- Template management
- Document upload and download
- Metadata
- Search
- Reporting
- Administration
- Webhooks
- Event notifications

REST API Access enables platform integration only.

It does **not** include programmatic trust services.

---

## 3. API Trust Service Add-Ons

Applications performing trust services programmatically require the corresponding API Consumption Add-Ons.

Examples include:

- API eSigning Transactions
- API eSealing Transactions
- Identity Verification (KYC)
- Qualified Timestamps
- SMS OTP
- SMS Notifications
- National eID Services
- Future Trust Services

Each service is licensed independently.

---

# Internal Users

Internal Users belong to the customer's organization and require a User licence.

Examples include employees who:

- Prepare documents
- Review documents
- Approve documents
- Sign documents
- Manage templates
- Configure workflows
- Access reports
- Administer the platform
- Manage integrations

Every organization must have at least one Regular User acting as the platform administrator.

---

# External Participants

External Participants are outside the customer's organization.

Examples:

- Customers
- Suppliers
- Partners
- Citizens
- Contractors

External Participants may receive, review, approve and sign documents.

They are always **free and unlimited**.

They never require user licences.

---

# API Qualification Checklist

Before preparing a proposal, always understand:

## Business

- What business process is being integrated?
- Internal automation or embedded customer solution?
- What application will call the API?

## Trust Services

- Electronic Signing?
- Electronic Sealing?
- Identity Verification?
- Qualified Timestamps?
- SMS OTP?
- National eID?
- Other Trust Services?

## Commercial

- Number of Internal Users?
- Expected API transaction volume?
- Expected number of External Participants?

## Technical

- Identity providers required?
- Compliance requirements?
- Data residency?
- SaaS or Ultimate (Self-Hosted)?

---

# Typical API Configurations

## Internal Business Automation

Customer:

- 150 employees
- ERP integration
- Automatic document generation

Recommended configuration:

- User-Based Subscription (150 users)
- REST API Access Add-On

No API Trust Service Add-Ons are required if licensed Internal Users continue to perform approvals and signing.

---

## Automated Electronic Signing

Customer application automatically sends documents for electronic signature.

Recommended configuration:

- User-Based Subscription
- REST API Access Add-On
- API eSigning Transactions Add-On

---

## Automated Electronic Sealing

Customer application automatically applies electronic seals to invoices, certificates or reports.

Recommended configuration:

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

Recommended configuration:

- User-Based Subscription
- REST API Access Add-On
- API eSigning Transactions Add-On
- Identity Verification Add-On
- SMS OTP Add-On
- Qualified Timestamp Add-On

---

# Sales Rules

Always explain:

- API is an integration capability—not a separate product.
- Every Internal User must be licensed.
- API automation never replaces Internal User licensing.
- External Participants are always free and unlimited.
- REST API Access enables platform integration.
- API Trust Service Add-Ons enable programmatic trust services.

Never say:

- "API replaces user licences."
- "Only one API administrator needs a licence."
- "Internal users don't need licences because everything is automated."
- "REST API Access includes electronic signing or sealing."
- "API is a separate licensing model."

---

# Core Sales Message

> **People are licensed through User-Based Subscriptions. Applications integrate through the REST API. Trust services are licensed through API Trust Service Add-Ons. API automation extends the Circularo platform—it never replaces Internal User licensing.**
