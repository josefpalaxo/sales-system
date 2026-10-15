---
schema_version: 1
id: master:partner-management-selling-circularo-saas-as-a-partner
kind: master-document
domain: partnerships
title: "Selling Circularo SaaS as a Partner"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/Selling Circularo SaaS as a Partner.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/Selling Circularo SaaS as a Partner.md"
  source_sha256: cd5cfb132fd2f2e4123cf616d73444105aabb9ef8d55cd265f228d562a19605d
  legacy_status: draft
  legacy_classification: external
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Selling Circularo SaaS as a Partner
    status: draft
    classification: external
    audience: partners
    scope: Approved Circularo  Resellers and  Distributors
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Selling Circularo SaaS as a Partner

## Purpose

This guide explains how approved Circularo partners should position, configure, and quote Circularo SaaS subscriptions.

It defines the products partners may sell independently, the commercial rules they must follow, and when opportunities must be jointly managed with Circularo.

This guide applies only to **Circularo SaaS** subscriptions.


## 1. Sell Business Outcomes

Customers buy business outcomes—not software features.

Always begin by understanding the customer's business challenge before discussing plans or Add-Ons.

Typical customer solutions include:

- Electronic Signatures
- Customer Onboarding
- Internal Approvals
- Contract Management
- HR Workflows
- Procurement Approvals
- Trusted Document Archive

Only after understanding the customer's requirements should you recommend the appropriate Circularo plan.


## 2. Products Partners May Sell

Partners may independently quote and sell the following SaaS products.

| Product | Partner May Quote |
|----------|-------------------|
| Start | ✅ |
| Pro | ✅ |
| Business | ✅ |
| Enterprise | ✅ |
| Ultimate | ❌ |

Although the Start plan is available to partners, it is primarily intended for individuals, consultants, freelancers, and very small teams purchasing directly through the Circularo website. Partners should normally focus on Pro, Business, and Enterprise opportunities.

Ultimate is not available for independent partner quotation.


## 3. Subscription Models

Partners may quote the following subscription models.

| Plan | User-Based | Transaction-Based |
|------|:----------:|:-----------------:|
| Start | ✅ | ❌ |
| Pro | ✅ | ❌ |
| Business | ✅ | ✅ |
| Enterprise | ✅ | ✅ |
| Ultimate | ❌ | ❌ |

Always recommend the subscription model that best reflects how the customer will use the platform.


## 4. Choosing the Right Subscription Model

### Recommend User-Based when

- Employees work in Circularo regularly.
- Internal users prepare and review documents.
- Collaboration is primarily manual.
- API usage is limited.

### Recommend Transaction-Based when

- High transaction volumes are expected.
- Most participants are external users.
- Business processes are highly automated.
- API integrations drive document execution.

Never recommend a subscription model simply because it appears less expensive.


## 5. Partner Quoting Limits

Partners may independently prepare quotations within the following commercial limits.

| Plan | Subscription Model | Maximum Independent Quoting Authority |
|------|---------------------|---------------------------------------|
| Start | User-Based | Up to **15 licensed users** |
| Pro | User-Based | Up to **25 licensed users** |
| Business | User-Based | Up to **100 licensed users** |
| Business | Transaction-Based | Up to **20,000 annual document transactions** |
| Enterprise | User-Based | Up to **250 licensed users** |
| Enterprise | Transaction-Based | Up to **50,000 annual document transactions** |
| Ultimate | — | Not available for partner quotation |

These limits define the maximum opportunity a partner may quote independently.

If a customer's requirements exceed these limits, the opportunity must be jointly qualified and quoted with Circularo.

Partners must never recommend a lower plan simply to avoid moving to the next commercial tier.

## 6. Add-Ons

Partners may include approved SaaS Add-Ons supported by the selected plan.

Only capabilities designated as **Add-Ons** in the Circularo Features & Plans Matrix may be quoted separately.

Examples include:

- REST API Access
- API eSigning Transactions
- API eSealing Transactions
- SAML Single Sign-On
- SCIM User Provisioning
- Custom Branding
- Custom Domain
- Custom Email Identity
- SMS OTP
- SMS Reminders
- Identity Verification
- KYC Services
- Qualified Trust Services
- DMS & Archiving
- Additional Archive Storage
- AI Features
- Premium Support

Always verify that the selected Add-On is supported by the customer's chosen plan.

---

## 7. Important Commercial Rules

Partners must follow the Circularo commercial model.

In particular:

- Every subscription uses a single subscription model.
- User-Based and Transaction-Based subscriptions cannot be combined within the same subscription.
- Add-Ons extend an existing subscription and are not standalone products.
- REST API access always requires the REST API Add-On.
- API-based signing and sealing always require the corresponding API transaction Add-On.
- Advanced Trust services (KYC,SMS OTP, Qualified TimeStamps etc.) are never included unless explicitly purchased.
- Transactional document archiving is always included.
- Standalone document management requires the DMS & Archiving Add-On.
- Additional archive storage requires the DMS & Archiving Add-On.

## 8. Opportunities Requiring Circularo Engagement

Partners must engage Circularo before preparing a commercial proposal for:

- Ultimate deployments
- Self-hosted or private cloud deployments
- Government opportunities
- Sovereign cloud projects
- White-label or OEM opportunities
- Opportunities exceeding the Partner Quoting Limits
- Custom pricing or commercial terms
- Product roadmap commitments
- Custom development
- Regulatory or legal exceptions

When in doubt, contact your Circularo Channel Manager before issuing a quotation.

## 9. Things Partners Must Never Promise

Never tell customers:

- ❌ API is included.
- ❌ Unlimited means unlimited.
- ❌ Ultimate can be purchased as a SaaS plan.
- ❌ We can customise licensing rules.
- ❌ We can combine User-Based and Transaction-Based licensing.
- ❌ Trust services are included.
- ❌ Qualified electronic signatures or seals are included.
- ❌ Storage is unlimited.
- ❌ We will build custom functionality.
- ❌ We guarantee future roadmap features.

## 10. Partner Sales Decision Process

1. Understand the customer's business problem.
2. Recommend the appropriate SaaS plan.
3. Select the appropriate subscription model.
4. Verify the opportunity is within the Partner Quoting Limits.
5. Select the required Add-Ons.
6. Prepare the quotation.
7. Engage Circularo whenever approval or joint engagement is required.


## 11. Typical Examples

### Example 1 — Small Business

**Customer**

- 20 users
- Internal approvals
- Electronic signatures

**Recommendation**

- Pro
- User-Based

✅ Partner may quote independently.

### Example 2 — Growing Organisation

**Customer**

- 75 users
- HR
- Procurement
- SAML SSO
- REST API integration

**Recommendation**

- Business
- User-Based
- REST API Add-On
- API eSigning Transactions Add-On
- SAML Single Sign-On Add-On

✅ Partner may quote independently.


### Example 3 — High-Volume Customer Onboarding

**Customer**

- 35,000 annual document transactions
- Automated onboarding
- REST API integration
- SMS OTP

**Recommendation**

- Enterprise
- Transaction-Based
- REST API Add-On
- API eSigning Transactions Add-On
- SMS OTP Add-On

✅ Partner may quote independently.


### Example 4 — Enterprise Programme

**Customer**

- 500 users

**Recommendation**

- Enterprise

❌ Exceeds Partner Quoting Limits.

Partner must engage Circularo before preparing the quotation.

---

### Example 5 — Government Shared Service

**Customer**

- Government agency
- Sovereign cloud
- White-label platform

**Recommendation**

- Ultimate

❌ Ultimate opportunities are always jointly managed with Circularo.
