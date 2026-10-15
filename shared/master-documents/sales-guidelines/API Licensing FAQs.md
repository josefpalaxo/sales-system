---
schema_version: 1
id: master:sales-guidelines-api-licensing-faqs
kind: master-document
domain: shared
title: "API Licensing FAQ"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "sales-guidelines/API Licensing FAQs.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/sales-guidelines/API Licensing FAQs.md"
  source_sha256: a571a29fc66dc320600896b144500b036c38dd1344061ea6a1d1b1f50785afc7
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: API Licensing FAQ
    status: draft
    classification: internal
    audience: sales
    scope: Frequently asked questions about Circularo API licensing and commercial model
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# API Licensing FAQ

This document answers the most common commercial questions raised by customers, partners, and the sales team regarding Circularo API licensing.

---

# General

## What is the Circularo API?

The Circularo REST API enables customers to integrate their own applications with the Circularo Digital Trust Platform.

It allows applications to automate business processes, manage documents, invoke trust services, and retrieve information programmatically.

---

## Is the API a separate product?

No.

The API is an integration capability of the Circularo platform.

Customers always purchase:

- User-Based or Transaction-Based Subscription
- REST API Access Add-On
- Optional API Trust Service Add-Ons

---

## Is the API included in the subscription?

No.

REST API Access always requires the REST API Access Add-On.

---

## Can customers buy only the API?

No.

Every API deployment requires a User-Based Subscription.

The API complements the platform—it never replaces it.

---

# Internal Users

## Who is an Internal User?

An Internal User belongs to the customer's organization and has a Circularo account.

Examples include employees who:

- prepare documents
- review documents
- approve documents
- sign documents
- manage workflows
- administer the platform
- access reports
- configure integrations

Every Internal User must be licensed.

---

## Does every Internal User require a licence?

Yes.

API automation never replaces Internal User licensing.

If an employee accesses or benefits from the platform, that employee must have a User licence.

---

## Why can't customers license only one administrator?

Because Internal User licensing is based on platform usage—not on who calls the API.

If 500 employees prepare, review, approve, sign, or otherwise use Circularo, all 500 employees require licences.

---

## What if all documents are generated automatically?

Automatic document generation does not eliminate Internal User licensing.

If Internal Users access or benefit from the platform, they still require licences.

---

# External Participants

## Who is an External Participant?

Anyone outside the customer's organization.

Examples include:

- customers
- suppliers
- citizens
- partners
- contractors

---

## Do External Participants require licences?

No.

External Participants are always free and unlimited.

---

## Can External Participants sign documents?

Yes.

Unlimited external recipients and signatories are included.

Only Internal Users require licences.

---

# REST API Access

## What does REST API Access include?

REST API Access enables integration with the Circularo platform.

Typical capabilities include:

- user management
- workflow management
- templates
- document upload
- document download
- search
- metadata
- reporting
- administration
- webhooks

---

## Does REST API Access include electronic signing?

No.

Electronic signing performed through the API requires the API eSigning Transactions Add-On.

---

## Does REST API Access include electronic sealing?

No.

Electronic sealing performed through the API requires the API eSealing Transactions Add-On.

---

## Does REST API Access include KYC?

No.

Identity Verification (KYC) is licensed separately.

---

# Trust Service Transactions

## What is a Trust Service Transaction?

A Trust Service Transaction is any operation that consumes a billable trust service provided by the Circularo platform.

Examples include:

- electronic signatures
- electronic seals
- identity verification
- qualified timestamps
- SMS OTP
- national eID verification
- future trust services

---

## What is NOT a Trust Service Transaction?

Platform operations such as:

- document upload
- search
- reporting
- administration
- workflow configuration
- template management
- webhooks
- metadata updates

These are integration operations and are covered by the REST API Access Add-On.

---

# API eSigning

## When is the API eSigning Transactions Add-On required?

Whenever an application programmatically initiates electronic signing.

Typical examples:

- customer portals
- ERP systems
- CRM systems
- banking applications
- insurance applications

---

## If employees sign through the Circularo web application, is API eSigning required?

No.

Human-operated signing within Circularo is licensed through User licences.

---

## If an ERP automatically sends documents for signature through the API, is API eSigning required?

Yes.

Programmatic signing requires the API eSigning Transactions Add-On.

---

# API eSealing

## When is API eSealing required?

Whenever an application automatically applies electronic seals.

Typical examples:

- invoices
- certificates
- reports
- payroll documents
- system-generated documents

---

# Identity Verification

## Is Identity Verification included?

No.

Identity Verification is licensed separately.

Examples include:

- KYC
- National eID
- UAE PASS
- Nafath
- BankID
- future identity services

---

# Transaction Volumes

## What determines API transaction consumption?

Consumption depends on the Trust Service being used.

Examples:

- one electronic signature
- one electronic seal
- one KYC verification
- one qualified timestamp
- one SMS OTP

Each consumes the corresponding Trust Service Transaction.

---

## Does document upload consume transactions?

No.

---

## Does document download consume transactions?

No.

---

## Does searching consume transactions?

No.

---

## Does workflow creation consume transactions?

No.

---

# Typical Commercial Configurations

## Internal ERP Integration

Customer:

- 200 employees
- ERP integration
- employees review and sign documents

Configuration:

- 200 User licences
- REST API Access

No API eSigning required.

---

## Automated Customer Contracts

Customer portal automatically generates agreements and sends them for signature.

Configuration:

- User-Based Subscription
- REST API Access
- API eSigning Transactions

---

## Automated Invoice Sealing

ERP automatically seals invoices.

Configuration:

- User-Based Subscription
- REST API Access
- API eSealing Transactions

---

## Digital Customer Onboarding

Application performs:

- KYC
- SMS OTP
- electronic signing

Configuration:

- User-Based Subscription
- REST API Access
- API eSigning Transactions
- Identity Verification
- SMS OTP

---

# Common Misunderstandings

## "API replaces user licences."

False.

Every Internal User must still be licensed.

---

## "Only one API administrator needs a licence."

False.

All Internal Users require licences.

---

## "REST API includes electronic signing."

False.

Electronic signing requires the API eSigning Transactions Add-On.

---

## "REST API includes electronic sealing."

False.

Electronic sealing requires the API eSealing Transactions Add-On.

---

## "External recipients require licences."

False.

External recipients are always free and unlimited.

---

## "The API is a separate product."

False.

The API is an integration capability of the Circularo Digital Trust Platform.

---

# Sales Summary

Remember these five rules:

1. Every Internal User must be licensed.
2. External Participants are always free and unlimited.
3. REST API Access enables platform integration.
4. API Trust Service Add-Ons license programmatic trust services.
5. API automation extends the platform—it never replaces Internal User licensing.
