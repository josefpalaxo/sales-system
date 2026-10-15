---
schema_version: 1
id: master:partner-management-circularo-saas-partner-sales-catalog
kind: master-document
domain: partnerships
title: "Circularo SaaS Partner Sales Catalog"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/Circularo SaaS Partner Sales Catalog.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/Circularo SaaS Partner Sales Catalog.md"
  source_sha256: 2bfe22fe81edddec35bf801d9f0e1a2191c95efdfea3ac081571dbc7672c006e
  legacy_status: draft
  legacy_classification: external
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo SaaS Partner Sales Catalog
    status: draft
    classification: external
    audience:
      - partners
      - sales
    scope: Partner-facing catalog for Circularo SaaS Start, Pro, Business, and Enterprise
    source_files:
      - ../../catalog/odoo-product-catalog-variants.csv
      - ../../catalog/20250310 Circularo Features & Plans Matrix.csv
      - ../sales-guidelines/Circularo Sales DOs and DO NOTs.md
      - Selling Circularo SaaS as a Partner.md
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo SaaS Partner Sales Catalog

Status: partner-facing draft for commercial review  
Pricing source: Odoo product catalog variant export  
Scope: Circularo SaaS Start, Pro, Business, and Enterprise  
Excluded: Ultimate, self-hosted, sovereign, OEM, and private-cloud deployments

This catalog helps approved Circularo partners position, configure, and quote Circularo SaaS subscriptions using the approved product catalog and sales rules.

All prices are customer list prices in USD unless stated otherwise. Taxes, withholding, local fees, partner discounts, partner buy prices, and deal-specific approvals are outside this catalog.

## Circularo in one sentence

Circularo is a Digital Trust Platform that helps organizations securely create, collaborate, approve, sign, execute, verify, archive, and preserve trusted digital transactions throughout their lifecycle.

Circularo includes electronic signatures, but partners must not position it as only an electronic-signature tool.

## How partners should sell Circularo

Start with the customer's business outcome, not a feature list.

1. Understand the customer's business problem.
2. Recommend the right SaaS plan.
3. Select exactly one subscription model.
4. Select the appropriate Odoo SKU or SKU variant.
5. Add only compatible Add-Ons.
6. Confirm dependencies, usage charges, regional restrictions, and approvals.
7. Quote using approved customer list prices and current Circularo rules.

Typical solution conversations include customer onboarding, internal approvals, contract execution, trusted document archiving, HR workflows, procurement approvals, and API-enabled trusted execution.

## Partner quoting scope

| Product | Partner may quote independently | Notes |
| --- | :---: | --- |
| Start | Yes | Entry SaaS offer for low-volume signing. |
| Pro | Yes | User-Based only. |
| Business | Yes | User-Based, Transaction-Based, and DMS-Only routes. |
| Enterprise | Yes | User-Based, Transaction-Based, and DMS-Only routes. |
| Ultimate | No | Always Circularo-led; outside this SaaS catalog. |

Partners must engage Circularo before issuing a proposal for Ultimate, self-hosted, sovereign, private-cloud, OEM, government shared-service, custom-development, or non-standard commercial opportunities.

## Choose the right plan

| Plan | Best fit | Available subscription models | Partner note |
| --- | --- | --- | --- |
| Start | Entry-level and low-volume signing | User-Based | Fixed SaaS entry offer with 60 annual manual transactions per Regular User. |
| Pro | Small teams and regular users needing stronger document preparation and productivity | User-Based | 120 or Unlimited manual-transaction Regular User variants. |
| Business | Teams needing governance, eSealing, bulk work, DMS eligibility, or broader Add-Ons | User-Based, Transaction-Based, DMS-Only | Broad SaaS commercial flexibility; API available only with User-Based. |
| Enterprise | Organizations needing the fullest SaaS capability set and advanced Add-On posture | User-Based, Transaction-Based, DMS-Only | Highest SaaS plan; many capabilities are included or eligible. |

## Subscription model rules

| Subscription model | Use when | Available plans | Important rule |
| --- | --- | --- | --- |
| User-Based | Named Internal Users regularly prepare, review, approve, sign, administer, or benefit from Circularo | Start, Pro, Business, Enterprise | Required when API automation is needed. Includes manual transaction allowance according to the selected user SKU. |
| Transaction-Based | Annual manual transaction volume is the main pricing driver and the customer wants a transaction-volume model | Business, Enterprise | Do not use for API commercial configurations. API is sold only with User-Based subscriptions. |
| DMS-Only | The customer needs standalone document management, archive, search, retention, and lifecycle management without eSigning workflows | Business, Enterprise | Quote-led; confirm scope and price with Circularo. |

Do not mix User-Based, Transaction-Based, and DMS-Only licensing within the same subscription unless Circularo formally approves a custom commercial structure.

## User and participant rules

- Every customer organization must have at least one Regular User acting as the platform administrator.
- A Regular User is a named Internal User with full platform functionality according to the selected plan.
- Lite Users are named Internal Users with limited roles: Prepare Only, Sign Only, or Read Only.
- Lite Users are available only for Business and Enterprise User-Based subscriptions.
- Lite Users require at least 20 Regular Users in the same subscription.
- The number of Lite Users must not exceed the number of Regular Users.
- External Participants are free and unlimited.
- External recipients, signatories, suppliers, citizens, partners, and contractors do not require internal user licences.
- “Unlimited” means unlimited manual, human-initiated transactions subject to fair use. It never includes unlimited API, automation, system-generated, or batch execution.

## API and automation rules

REST API Access unlocks the API channel. It does not include automated signing, automated sealing, identity verification, KYC, SMS OTP, national eID, qualified timestamps, qualified signatures, or other trust-service consumption.

Approved API construction:

`Business or Enterprise User-Based Subscription + REST API Access + API eSigning and/or API eSealing Transactions + optional trust-service Add-Ons`

Partners must follow these rules:

- API is not a standalone product.
- API is not a subscription model.
- API must not be sold with Transaction-Based subscriptions.
- API automation does not replace Internal User licensing.
- API eSigning Transactions are required whenever an application programmatically initiates signing.
- API eSealing Transactions are required whenever an application automatically applies seals.
- Platform API operations such as upload, download, search, metadata, reporting, administration, webhooks, and workflow configuration are integration operations, not signing or sealing transactions.

## SaaS list prices by subscription model

### User-Based subscriptions

Prices are annual customer list prices per named Internal User.

| Plan | SKU | User type | Annual manual transaction allowance | Customer list price |
| --- | --- | --- | ---: | ---: |
| Start | CX-REGU-SIGN-60 | Regular User | 60 | USD 120.00 |
| Pro | CP-REGU-SIGN-120 | Regular User | 120 | USD 205.20 |
| Pro | CP-REGU-SIGN-UN | Regular User | Unlimited manual | USD 456.00 |
| Business | CB-REGU-SIGN-120 | Regular User | 120 | USD 264.60 |
| Business | CB-REGU-SIGN-UN | Regular User | Unlimited manual | USD 588.00 |
| Business | CB-LITE-USR | Lite User | None | USD 300.00 |
| Enterprise | CE-REGU-SIGN-120 | Regular User | 120 | USD 367.20 |
| Enterprise | CE-REGU-SIGN-UN | Regular User | Unlimited manual | USD 816.00 |
| Enterprise | CE-LITE-USR | Lite User | None | USD 408.00 |

### Starter packs

Starter packs are SaaS entry bundles in Odoo. Confirm final packaging and quantity assumptions before quoting.

| Plan | SKU | Product | Customer list price |
| --- | --- | --- | ---: |
| Pro | CSP-ProX | PRO / Starter Pack | USD 204.00 |
| Business | CSP-BusinessX | BUSINESS / Starter Pack | USD 264.00 |

### Transaction-Based subscriptions

Prices are customer list prices per annual transaction under the selected user-cap variant.

| Plan | SKU | Variant | Customer list price |
| --- | --- | --- | ---: |
| Business | CB-ESIGN-UI-10 | eSign Transaction, up to 10 Users | USD 1.64 |
| Business | CB-ESIGN-UI-25 | eSign Transaction, up to 25 Users | USD 1.94 |
| Business | CB-ESIGN-UI-50 | eSign Transaction, up to 50 Users | USD 2.39 |
| Business | CB-ESIGN-UI-UN | eSign Transaction, Unlimited Users | USD 2.99 |
| Enterprise | CE-ESIGN-UI-10 | eSign Transaction, up to 10 Users | USD 1.95 |
| Enterprise | CE-ESIGN-UI-25 | eSign Transaction, up to 25 Users | USD 2.31 |
| Enterprise | CE-ESIGN-UI-50 | eSign Transaction, up to 50 Users | USD 2.84 |
| Enterprise | CE-ESIGN-UI-UN | eSign Transaction, Unlimited Users | USD 3.55 |

Transaction-Based subscriptions are not the API model. If the customer needs API automation, use a User-Based subscription plus REST API Access and the required API Trust Service Add-Ons.

### DMS-Only subscriptions

DMS-Only is available for Business and Enterprise SaaS opportunities where the customer needs standalone document management without eSigning workflows.

Current DMS-Only pricing is quote-led. Partners must request Circularo confirmation before quoting DMS-Only, including:

- SKU and final commercial name;
- included users;
- included storage;
- minimum commitment;
- compatible Add-Ons;
- support requirements.

## DMS and storage rules

Circularo supports two DMS sales routes.

| Route | Use when | Commercial construction |
| --- | --- | --- |
| DMS & Archiving Add-On | The customer has an eSigning subscription and also needs standalone document management | Business/Enterprise eSigning subscription + Document Management & Archiving Add-On + optional Extra Archiving Storage |
| DMS-Only subscription | The customer needs document management without eSigning workflows | Business/Enterprise DMS-Only subscription + optional compatible Add-Ons and storage |

Important rules:

- Transactional documents and evidence are archived as part of the transaction flow.
- Standalone document management requires DMS entitlement.
- Extra storage extends storage capacity only.
- Extra storage does not replace the DMS & Archiving Add-On or DMS-Only subscription.
- Storage is not unlimited.

## Add-On availability and customer list prices

Legend:

- **Included** — included with the selected plan. Do not add a separate charge unless Circularo confirms a separate commercial treatment.
- **Optional** — available at extra cost.
- **—** — not available for that plan.
- **Confirm** — quote only with Circularo confirmation because plan eligibility, packaging, or partner quoting treatment requires validation.

The list below includes all non-Ultimate Odoo products in the Add-On category. Ultimate-only Add-Ons are excluded from this SaaS catalog.

| Add-On | SKU | Customer list price | Start | Pro | Business | Enterprise | Partner note |
| --- | --- | ---: | :---: | :---: | :---: | :---: | --- |
| Advanced Reporting | CX-ADD-REPORTS | USD 1,500.00 / annual entitlement | — | — | Optional | Included |  |
| AI Document Assistant | CX-ADD-AIDOC | USD 1,250.00 / annual entitlement | — | — | Optional | Included | Customer must provide and manage compatible AI credentials/API key. |
| BankID CZ ID Verification (100) | CX-ADD-BANKIDCZ-VER1 | USD 8.00 / per 100 requests | — | Optional | Optional | Optional | Czech Republic / BankID availability applies. |
| Boost eSign Transaction Limit to 80 MB | CX-ADD-LIMIT80 | USD 1,500.00 / annual entitlement | — | — | Optional | Optional |  |
| Branded Experience Bundle | CX-ADD-BRANDING-PACK | USD 960.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Circularo for SharePoint | CX-ADD-SHAREPOINT | Included / no list price / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Collabora Integration – cDocs | CX-CDOC | USD 30.00 / annual entitlement | — | — | Optional | Optional |  |
| Custom Application Name | CX-ADD-CIBRAND | USD 1,250.00 / annual entitlement | — | — | — | Optional |  |
| Custom Branding and Styling | CX-ADD-SKIN | USD 550.00 / annual entitlement | — | — | Optional | Optional |  |
| Custom Domain | CX-ADD-DOMAIN | USD 950.00 / annual entitlement | — | — | Optional | Included | Domain validation applies. |
| Custom Email Identity | CX-ADD-EMAILID | USD 1,250.00 / annual entitlement | — | — | Optional | Included | DNS and sender-domain configuration may be required. |
| Custom Email Notifications | CX-ADD-EMAILTXT | USD 1,500.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Custom Employee Level Electronic Signing Certificate (500 signatures per year) | CX-ADD-CERUSR | USD 250.00 / annual entitlement | — | — | Optional | Optional | Certificate provider and regional rules apply. |
| Custom Homepage | CX-CUST-HOME | USD 1,150.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Custom Role based UI | CX-CUST-ROLEUI | USD 1,150.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Custom Upload Form | CX-CUST-TYPE | USD 250.00 / annual entitlement | — | — | — | Optional |  |
| Custom Web Forms | CX-CUST-WEBFORM | USD 850.00 / annual entitlement | — | — | — | Optional |  |
| Customer Onboarding & Consulting | CX-ADD-ONBOARDING | USD 920.00 / one-time service | Optional | Optional | Optional | Optional | Scope before quoting. |
| DESC eSeal Certificate (3-year) | CX-ADD-DESC | USD 4,500.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation; provider/regional rules apply. |
| Document Management & Archiving | CX-ADD-DMS | USD 1,500.00 / annual entitlement | — | — | Optional | Optional | Required for standalone document management. |
| eIDAS Qualified Timestamp (Datasure) | CX-ADD-TSA-2 | USD 25.00 / per 100 timestamps | — | Optional | Optional | Optional | Regional/provider rules apply. |
| eIDAS Qualified Timestamp (I.CA) | CX-ADD-TSA-1 | USD 29.00 / per 100 timestamps | — | Optional | Optional | Optional | Regional/provider rules apply. |
| eSeal API Transaction | CX-ADD-ESEAL-API | USD 1.50 / per event | — | — | Optional | Optional | Requires REST API Access; User-Based only. |
| eSign API Transaction | CX-ADD-ESIGN-API | USD 2.85 / per event | — | — | Optional | Optional | Requires REST API Access; User-Based only. |
| Extra Archiving Storage (100) | CX-ADD-STG | USD 65.00 / annual entitlement | — | — | Optional | Optional | Requires DMS entitlement. |
| Google Workspace Integration | CX-ADD-GSUITE | Included / no list price / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Hardware Security Module (HSM) | CX-ADD-HSM-UTIMACO | USD 18,663.03 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation; generally Circularo-led. |
| Identomat ID Verification | CX-ADD-KYC-IDVERIFY1 | USD 1.45 / per event | — | — | Optional | Optional | Provider consumption rules apply. |
| Identomat Liveness Verification | CX-ADD-KYC-LIVENESS1 | USD 0.45 / per event | — | — | Optional | Optional | Provider consumption rules apply. |
| Microsoft Office 365 Add-in | CX-ADD-MS365 | Included / no list price / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| NAFATH Identity Verification | CX-ADD-NAFATH-VER | USD 1,350.00 / annual entitlement | — | Optional | Optional | Optional | KSA only; customer must obtain and maintain NAFATH Client ID and Client Secret and pay NAFATH directly. |
| Organizational Signing & Sealing Certificate (AATL – DESC) | CX-ADD-CERORG2 | USD 550.00 / annual entitlement | — | — | Optional | Optional | Provider and certificate rules apply. |
| Organizational Signing & Sealing Certificate (AATL – I.CA) | CX-ADD-CERORG1 | USD 550.00 / annual entitlement | — | — | Optional | Optional | Provider and certificate rules apply. |
| PDF Form Fields Recognition | CX-ADD-FREC | USD 475.00 / annual entitlement | — | — | Optional | Included |  |
| Professional Services (1 MD) | CX-ADD-PS-MD | USD 850.00 / per person-day | Confirm | Confirm | Confirm | Confirm | Scope before quoting. |
| Quick Document Processing | CX-ADD-QUICK | USD 2,500.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| REST API Access / Business | CX-RESTAPI-BUS | USD 1,500.00 / annual entitlement | — | — | Optional | — | User-Based only; API trust-service transactions separate. |
| REST API Access / Enterprise | CX-RESTAPI-ENT | USD 2,500.00 / annual entitlement | — | — | — | Included | User-Based only; API trust-service transactions separate. |
| REST API Integration Assistance (1 MD) | CX-ADD-API-MD | USD 850.00 / per person-day | Confirm | Confirm | Confirm | Confirm | Requires appropriate API entitlement for production use. |
| SAML 2.0 SSO | CX-ADD-SAML | USD 1,350.00 / annual entitlement | — | — | Optional | Included |  |
| Select Signature Provider | CX-ADD-SGPROVIDER | USD 450.00 / annual entitlement | — | — | Optional | Included |  |
| Sharepoint Connector | CX-ADD-MSAC | USD 1,150.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| SMS Credits (100) | CX-ADD-SMSCREDIT | USD 25.00 / per 100 SMS credits | Confirm | Confirm | Confirm | Confirm | Required for SMS OTP, SMS reminders, and other SMS consumption where applicable. |
| SMS OTP Verification | CX-ADD-SMSOTP | USD 380.00 / annual entitlement | — | — | Optional | Optional | Requires SMS Credits for message consumption. |
| SMS Reminders | CX-ADD-SMSREM | USD 250.00 / annual entitlement | — | — | Optional | Optional | Requires SMS Credits for message consumption. |
| Trusted and Certified Timestamps (DESC) | CX-ADD-TSA-3 | USD 88.00 / per 100 timestamps | — | Optional | Optional | Optional | Regional/provider rules apply. |
| UAE Pass Identity Verification | CX-ADD-UAEPASS1 | USD 850.00 / annual entitlement | Included | Included | Included | Included | UAE SaaS verification is free to use where enabled; activation/approval may be required. |
| UAE Pass Signing | CX-ADD-UAEPASS2 | USD 1,850.00 / annual entitlement | — | Optional | Optional | Optional | UAE; configuration and Digital Dubai Authority approval may be required. |
| UAT Environment in MS Azure Cloud | CX-ADD-UAT | USD 2,500.00 / annual entitlement | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |
| Verification Request (100) | CX-ADD-VERIFY | USD 100.00 / per 100 requests | Confirm | Confirm | Confirm | Confirm | Quote with Circularo confirmation. |

## Support

Essential Support is included where applicable.

Support upgrades are available separately and must be scoped or confirmed with Circularo. Partners must not include Standard, Plus, Premium, HSM support, or software maintenance for free.

## Common quote recipes

### Manual knowledge-worker signing

`Plan + User-Based Regular Users + optional Lite Users for Business/Enterprise + compatible Add-Ons`

### Transaction-volume signing

`Business or Enterprise + Transaction-Based annual transaction variant + compatible non-API Add-Ons`

Use this when annual manual transaction volume is the pricing driver. Do not use Transaction-Based subscriptions for API commercial configurations.

### API automation

`Business or Enterprise User-Based Subscription + REST API Access + API eSigning/eSealing Transactions + optional trust-service Add-Ons`

Use this when another application programmatically initiates trusted execution.

### eSigning plus standalone archive

`Business or Enterprise eSigning subscription + Document Management & Archiving Add-On + optional Extra Archiving Storage`

Use this when an eSigning customer also needs to manage standalone business documents.

### Document management without eSigning

`Business or Enterprise DMS-Only subscription + optional compatible Add-Ons and storage`

Use this when the customer needs standalone document management without eSigning workflows. Request Circularo quote confirmation before issuing a proposal.

## What partners must not sell or promise

Partners must not tell customers:

- API is included in the base subscription.
- API can be sold with Transaction-Based subscriptions.
- REST API Access includes automated eSigning, automated eSealing, KYC, SMS OTP, national eID, qualified timestamps, qualified signatures, or qualified seals.
- API automation replaces Internal User licensing.
- Unlimited manual transactions mean unlimited automation.
- User-Based and Transaction-Based subscriptions can be combined within one subscription.
- Add-Ons can be sold standalone unless they are approved services or Circularo confirms a DMS-Only route.
- Trust services are included unless this catalog explicitly shows Included.
- Extra storage replaces DMS entitlement.
- Storage is unlimited.
- Ultimate, self-hosted, private cloud, sovereign, or OEM deployment is available from this SaaS catalog.
- Circularo will build custom functionality or guarantee roadmap features without formal Circularo approval.

## Opportunities requiring Circularo engagement

Partners must engage Circularo before preparing or issuing a commercial proposal for:

- Ultimate, self-hosted, private-cloud, sovereign, government shared-service, or OEM opportunities;
- DMS-Only opportunities;
- Add-Ons marked Confirm;
- support upgrades or support commitments beyond included Essential Support;
- custom pricing, discounts outside authority, custom terms, or non-standard contract structures;
- roadmap commitments, custom development, regulatory exceptions, or legal exceptions;
- opportunities exceeding partner quoting authority.

When in doubt, contact the Circularo Channel Manager before issuing a quotation.

## Source notes

This catalog is aligned with:

- `catalog/odoo-product-catalog-variants.csv` for current Odoo SKUs, customer list prices, product categories, and sales descriptions;
- `catalog/20250310 Circularo Features & Plans Matrix.csv` for plan eligibility and included/optional/unavailable treatment;
- `canonical/sales-guidelines/Circularo Sales DOs and DO NOTs.md` for sales conduct and commercial guardrails;
- `canonical/partner-management/Selling Circularo SaaS as a Partner.md` for partner sales structure, except where that older guide conflicts with the current sales rules.
