---
schema_version: 1
id: master:sales-guidelines-api-pricing-recommendations
kind: master-document
domain: shared
title: "API Pricing Recommendations"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "sales-guidelines/API Pricing Recommendations.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/sales-guidelines/API Pricing Recommendations.md"
  source_sha256: a5c8275ed01d143d298933918b13849e607b38557ba0f32334ca472c95e81bb4
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: API Pricing Recommendations
    status: draft
    classification: internal
    audience: internal
    scope: Circularo API pricing and commercial structure
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# API Pricing Recommendations

## Objectives

The API commercial model should be simple, predictable, scalable, and commercially consistent.

API pricing should clearly separate three independent commercial components:

1. User licensing
2. Platform integration
3. Programmatic trust service consumption

This separation protects the User-Based Subscription model while allowing customers to automate business processes without creating licensing ambiguity.

---

## Commercial Structure

Every API deployment consists of the following commercial components.

```text
User-Based Subscription
        +
REST API Access Add-On
        +
API Trust Service Add-Ons
        +
Optional Consumption Add-Ons
```

---

## 1. User-Based Subscription

Every API customer must purchase a **User-Based Subscription**.

The User-Based Subscription licenses all Internal Users who access or benefit from the Circularo platform.

API automation never replaces Internal User licensing.

Transaction-Based Subscriptions are not used for API commercial configurations.

---

## 2. REST API Access Add-On

REST API Access enables customers to integrate and automate the Circularo Digital Trust Platform.

Typical capabilities include:

- User management
- Workflow management
- Templates
- Document upload
- Document download
- Metadata
- Search
- Reporting
- Administration
- Webhooks

REST API Access enables platform integration only.

It does **not** include programmatic trust service consumption.

### Recommendations

REST API Access should be licensed annually according to the selected Edition.

The REST API provides access to the capabilities available within the licensed Edition. Higher Editions expose additional platform capabilities, support larger deployments, and provide higher operational guarantees.

| Edition | Annual Price (USD) | Typical Positioning |
|----------|-------------------:|---------------------|
| Business | 500 | Departmental and business application integrations |
| Enterprise | 1,500 | Enterprise-wide integrations with advanced platform capabilities |
| Ultimate | 2,500 | Sovereign, self-hosted, and mission-critical integrations |

Edition differences may include:

- Available platform capabilities
- Available API endpoints
- Feature availability
- Rate limits
- Performance
- Service Level Agreement (SLA)
- Deployment model
- Technical support

The REST API Access Add-On licenses the integration capability only. It does not include programmatic trust service consumption, which is licensed separately through the corresponding API Trust Service Add-Ons.


---

## 3. API Trust Service Add-Ons

API Trust Service Add-Ons license the programmatic consumption of billable trust services.

Examples include:

- API eSigning Transactions
- API eSealing Transactions
- Identity Verification (KYC)
- Qualified Timestamps
- SMS OTP
- SMS Notifications
- National eID
- Future Trust Services

Each service is licensed independently.

---

## 4. Volume Pricing

Volume pricing applies **only** to the following API Trust Service Add-Ons:

- API eSigning Transactions
- API eSealing Transactions

Other Trust Service Add-Ons (such as Identity Verification, Qualified Timestamps, SMS OTP, National eID, etc.) are priced independently according to their respective commercial models.

### Standard Pricing

| API Trust Service | Standard Price (USD / Transaction) |
|-------------------|-----------------------------------:|
| API eSigning Transaction | 1.20 |
| API eSealing Transaction | 0.60 |

API eSealing Transactions are priced at **50%** of the corresponding API eSigning Transaction price.


### Annual Volume Pricing

| Annual Committed API Transactions | Discount | API eSigning | API eSealing | Reference Annual Value (eSigning / eSealing) |
|----------------------------------:|---------:|-------------:|-------------:|---------------------------------------------:|
| 1 – 10,000 | 0% | USD 1.20 | USD 0.60 | USD 12,000 / USD 6,000 |
| 10,001 – 25,000 | 10% | USD 1.08 | USD 0.54 | USD 27,000 / USD 13,500 |
| 25,001 – 50,000 | 20% | USD 0.96 | USD 0.48 | USD 48,000 / USD 24,000 |
| 50,001 – 100,000 | 30% | USD 0.84 | USD 0.42 | USD 84,000 / USD 42,000 |
| 100,001 – 250,000 | 40% | USD 0.72 | USD 0.36 | USD 180,000 / USD 90,000 |
| 250,001 – 500,000 | 55% | USD 0.54 | USD 0.27 | USD 270,000 / USD 135,000 |
| 500,001 – 1,000,000 | 65% | USD 0.42 | USD 0.21 | USD 420,000 / USD 210,000 |
| Above 1,000,000 | 70% | USD 0.36 | USD 0.18 | Custom |


**One API eSigning Transaction **= **One Signature Request**, regardless of the number of signatories, recipients, approvers, reviewers, CC recipients, or workflow complexity.

### Commercial Principles

- Volume pricing is based on the customer's **annual committed transaction volume**.
- Higher transaction commitments receive lower per-transaction pricing.
- The maximum standard volume discount is **70%** for annual commitments above **250,000 transactions**.
- Volume pricing applies independently to API eSigning Transactions and API eSealing Transactions.
- Custom commercial terms may be approved for strategic opportunities or exceptionally large transaction volumes.

---

## Why API Uses User-Based Subscriptions

API Trust Service Add-Ons are intentionally priced **lower per transaction** than standard Transaction-Based Subscriptions.

This is because they license only the **programmatic consumption of trust services** and do **not** include licensing for Internal Users.

Allowing Transaction-Based Subscriptions together with API Trust Service Add-Ons would create a commercial loophole where customers could obtain licensing for large numbers of Internal Users while shifting most execution to lower-cost API transactions.

To preserve the integrity of the licensing model:

- API is sold only with User-Based Subscriptions.
- Every Internal User must be licensed.
- API Trust Service Add-Ons license automation only.

---

## Optional Consumption Add-Ons

Additional trust services are licensed independently and may be combined as required.

Examples include:

- Identity Verification (KYC)
- Qualified Timestamping
- SMS OTP
- SMS Notifications
- National eID Verification
- Future AI Trust Services

Customers purchase only the services they actually consume.

---

## Sales Rules

### Always explain

- Every API customer requires a User-Based Subscription.
- Every Internal User must be licensed.
- REST API Access enables platform integration.
- API Trust Service Add-Ons license automated trust service consumption.
- External Participants are always free and unlimited.

### Never say

- API is a separate licence.
- API replaces User licensing.
- Transaction-Based Subscriptions support API deployments.
- REST API Access includes electronic signing or sealing.
- REST API Access includes trust service consumption.

---

## Commercial Principle

Think of the API commercial model as two independent layers.

### Integration Layer

Provides secure programmatic access to the Circularo platform.

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

### Trust Services Layer

Provides programmatic access to billable trust services.

Examples:

- Electronic signatures
- Electronic seals
- Identity verification
- Qualified timestamps
- SMS OTP
- Future trust services

Requires:

- Corresponding API Trust Service Add-On(s)

---

## Core Commercial Principle

**People are licensed through User-Based Subscriptions.**

**Applications integrate through the REST API Access Add-On.**

**Automated trust services are licensed through API Trust Service Add-Ons.**

None of these licensing components replaces another.
