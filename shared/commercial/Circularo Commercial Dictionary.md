---
schema_version: 1
id: master:circularo-commercial-dictionary
kind: master-document
domain: shared
title: "Circularo Commercial Dictionary"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "Circularo Commercial Dictionary.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/Circularo Commercial Dictionary.md"
  source_sha256: 7f0bc64d33ec02b4acb80c527b1fd0e4bc029122645a3810752fb42bfb85de03
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo Commercial Dictionary
    status: draft
    classification: internal
    audience: internal
    scope: Key commercial, licensing, API, and trust service terminology
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Commercial Dictionary

This dictionary defines key terms used across Circularo sales, pricing, licensing, API, and commercial documentation.

The purpose is to ensure Sales, Product, Finance, Customer Success, Legal, and Engineering use the same language when describing Circularo capabilities, subscriptions, add-ons, and billable consumption.

---

## Trust Service Transaction

A **Trust Service Transaction** is a programmatic or user-initiated operation that invokes a trusted digital service to establish, verify, protect, or preserve the authenticity, integrity, identity, authority, or legal evidential value of a digital transaction or document.

### Simple Sales Definition

A **Trust Service Transaction** is any operation that consumes a billable trust service through the Circularo platform or API.

### Examples of Trust Service Transactions

Trust Service Transactions include:

- Electronic signatures
- Electronic seals
- Identity verification (KYC)
- National eID verification
- Qualified timestamps
- SMS OTP authentication
- Liveness verification
- Digital certificate validation
- Future trust services provided by the platform

### What Is Not a Trust Service Transaction

The following are platform operations, not Trust Service Transactions:

- Uploading documents
- Downloading documents
- Searching
- Metadata updates
- User management
- Workflow configuration
- Template management
- Reporting
- Administration
- Webhooks
- Audit queries

### Examples

| Operation | Trust Service Transaction? |
|---|---|
| Upload document | ❌ No |
| Share document| ❌ No |
| Search archive | ❌ No |
| Invite new user | ❌ No |
| Digital signature | ✅ Yes |
| Digital seal | ✅ Yes |
| KYC verification | ✅ Yes |
| National eID verification | ✅ Yes |
| Qualified timestamp | ✅ Yes |
| SMS OTP | ✅ Yes |
| Liveness check | ✅ Yes |

### Why This Term Matters

The term **Trust Service Transaction** should be used instead of the shorter term **Trust Transaction**.

“Trust Transaction” may be confused with the customer’s business transaction, such as signing a contract or completing an onboarding process.

“Trust Service Transaction” is clearer because it refers specifically to the consumption of a trust service, which is what Circularo bills and meters.

### Naming Examples

- Trust Service Transaction – eSigning
- Trust Service Transaction – eSeal
- Trust Service Transaction – KYC
- Trust Service Transaction – Timestamp
- Trust Service Transaction – AI Authorization (future)

## Internal User

An **Internal User** is an individual designated by the customer as a member of its organization who accesses or benefits from the Circularo Digital Trust Platform.

Every Internal User requires a valid User licence under a User-Based Subscription, regardless of whether activities are performed directly through the Circularo applications or programmatically through integrated systems using the REST API.

Internal Users are typically identified by an email address associated with one of the customer's registered or verified organization domains, although other email domains may be used where appropriate.

### Typical Activities

Depending on their assigned roles and permissions, an Internal User may:

- Access the Circularo web and mobile applications
- Create, upload, organize, search, and retrieve documents
- Collaborate and co-author documents
- Review, approve, send, and sign documents
- Apply electronic seals (where permitted)
- Manage templates and workflows
- Manage metadata and document classification
- Access audit trails, evidence records, and certificates of completion
- Download signed documents and evidence
- Manage document archives and retention
- Configure integrations and API credentials
- Monitor transactions and workflows
- Access dashboards and reports
- Administer users, security, and organizational settings

### Commercial Principle

Internal User licensing is determined by **access to and benefit from the platform**, not by how business processes are initiated.

Using ERP, CRM, custom applications, or the REST API does **not** remove the requirement to license Internal Users.

### Examples

**Internal Users include:**

- Employees
- Contractors working within the organization
- Shared service operators
- Government officers
- Customer service representatives
- HR staff
- Finance staff
- Legal teams
- System administrators

### Not Internal Users

The following are **not** Internal Users:

- Customers
- Suppliers
- Citizens
- External signatories
- External reviewers
- External approvers
- External recipients

These are collectively referred to as **External Participants** and are always free and unlimited.

## External Participant

An **External Participant** is an individual who is **not licensed as an Internal User** and whose email address is not associated with the customer's registered or verified organization domains.

External Participants may receive, review, approve, sign, or otherwise participate in workflows without requiring a User licence.

External Participants are always **free and unlimited**.
