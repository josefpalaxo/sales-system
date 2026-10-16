---
schema_version: 1
id: master:partner-management-circularo-partner-pricing-strategy-architecture
kind: master-document
domain: partnerships
title: "Circularo Partner Pricing Strategy Architecture"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/Circularo Partner Pricing Strategy Architecture.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/Circularo Partner Pricing Strategy Architecture.md"
  source_sha256: cbcd3d71feae6f7c3e66214caeb1cbc9a1d5a99d745d33e88e462dbfd818e00a
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo Partner Pricing Strategy Architecture
    type: strategy
    status: draft
    classification: internal
    audience: Executive Management, Sales, Finance, Product
    last_updated: 2026-07-06
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

## Circularo Partner Pricing Strategy Architecture

### Executive Summary

After evaluating multiple channel pricing models, Circularo has adopted a **Hybrid+ Partner Pricing Architecture**.

This architecture combines the strengths of public list pricing with confidential partner buy pricing while introducing additional internal commercial controls to improve pricing governance, profitability, scalability, and channel consistency.

The objective is simple:

> **Provide partners with predictable commercial economics while maintaining complete control over Circularo's pricing, profitability, and long-term market positioning.**

This document defines the commercial architecture that should underpin the Partner Program, Odoo Product Catalog, Quotation Calculator, ERP, CRM, and future pricing automation.

---

## Business Objectives

The pricing strategy is designed to achieve the following objectives:

- Rapid partner recruitment
- Predictable partner economics
- Fast partner quoting
- Consistent market positioning
- Sustainable recurring revenue
- Controlled customer discounting
- Scalable channel operations
- Protection of Circularo profitability
- Direct and partner channel parity
- Automated pricing inside Odoo

---

## Commercial Principles

The model follows several key principles.

### Public pricing should be transparent.

Customers should understand the normal market price of Circularo products.


### Partner economics should be predictable.

Partners should know their commercial position before engaging customers.

### Commercial support should be earned.

Higher economics should result from:

- partner capability
- deal registration
- strategic value
- performance

—not automatically from partner status.

### Every commercial decision should be measurable.

Every quotation should be traceable to:

- MSRP
- customer discount
- customer selling price
- partner buy price
- partner margin
- Circularo price realization


## Evolution of the Pricing Model

### Approach A — Published List Price Only

#### Description

Partners receive only the published customer price.

Commercial support is provided through manual discounts, rebates or commissions.

#### Advantages

- Extremely simple
- Easy to explain
- Strong market price consistency
- Good for referral partners

#### Disadvantages

- Poor reseller experience
- Slow quotation process
- Every deal requires manual pricing
- No predictable partner economics
- Difficult to scale

#### Overall Assessment

Suitable for referral or agency models.

Not suitable for a scalable reseller channel.

---

### Approach B — Partner Buy Price Only

#### Description

Partners receive confidential wholesale pricing and independently determine customer pricing.

#### Advantages

- Fast quoting
- Strong reseller motivation
- Predictable partner economics
- Easy distributor model
- Highly scalable

#### Disadvantages

- Weak market price anchor
- Greater pricing inconsistency
- Higher risk of channel conflict
- Difficult direct-sales parity
- Reduced visibility into market pricing

#### Overall Assessment

Excellent operationally but lacks sufficient commercial governance.

---

### Approach C — Hybrid

#### Description

Circularo maintains:

- Published List Price
- Standard Partner Buy Price
- Registered Deal Buy Price

#### Advantages

- Strong market positioning
- Predictable partner economics
- Deal registration
- Controlled discounting
- Good scalability

#### Disadvantages

- More administration
- More pricing governance
- Requires mature processes

#### Overall Assessment

A strong commercial foundation.

---

## Circularo Hybrid+ Pricing Architecture

During commercial design, the Hybrid model was further developed into a more comprehensive pricing architecture.

Rather than managing only customer list price and partner buy price, Circularo manages five independent pricing layers.

| Layer | Purpose | Visible To |
| :---- | :---- | :---- |
| 1\. MSRP with Price Basis | Market anchor | Public |
| 2\. Target Customer Sell Price | Expected market realization | Internal |
| 3\. Standard Partner Buy Price | Standard partner economics | Partner |
| 4\. Commercial Floor Price | Protect Circularo economics | Internal |
| 5\. Registered Deal Buy Price | Special pricing | Internal |

---

## Layer 1 — MSRP with Price Basis

**Purpose**

Market positioning.

MSRP (Manufacturer's Suggested Retail Price) is the published reference price before customer discount.

Every MSRP has an explicit Price Basis:

| Price Basis | Meaning |
|---|---|
| Annual | Annual subscription or entitlement |
| Per Event | Each chargeable consumption event |
| Per Pack | A stated pack of events or credits |
| One-Time | A finite service or explicitly one-time item |

Subscription entitlements are Annual. Consumption products are Per Event or Per Pack. Monthly equivalents may be calculated only for Annual prices.

Visible to:

- Customers
- Partners
- Internal teams

---

## Layer 2 — Target Customer Sell Price

**Purpose**

Commercial planning.

This represents the expected average market selling price after applying the standard customer discount (normally 10%).

Formula

Target Customer Sell Price

=

MSRP × (1 − Target Customer Discount)

This becomes the commercial benchmark for pricing analysis.

Visible internally only.

---

## Layer 3 — Standard Partner Buy Price

**Purpose**

Standard partner economics.

This is the normal confidential buy price available to an approved partner.

Formula

Standard Partner Buy Price

=

Target Customer Sell Price × (1 − Target Partner Margin)

Visible only to:

- Partner
- Sales
- Finance

---

## Layer 4 — Minimum Approved Buy Price (Commercial Floor)

**Purpose**

Protect Circularo economics.

This defines the lowest partner buy price that may normally be approved.

It is **not** a product cost.

It is a commercial control ensuring that exceptional pricing does not erode Circularo profitability.

Commercial Floor Price is manually maintained by the authorized commercial owner. The standard pricing engine must not derive it automatically or populate an unknown floor with an invented placeholder.

Visible internally only.

---

## Layer 5 — Registered Deal Buy Price

**Purpose**

Strategic commercial support.

Where justified, Circularo may approve a temporary deal-specific buy price.

Registered Deal Buy Prices:

- require deal registration
- are time limited
- apply only to the approved scope
- do not automatically apply to renewals

They are determined case by case outside the standard partner price-book calculations.

---

## Internal Commercial Controls

In addition to the five pricing layers, the pricing engine manages several commercial controls.

### Target Customer Discount

Expected standard customer discount.

Default:

10%

---

### Maximum Customer Discount

Defines the highest customer discount normally permitted within the standard partner program.

---

### Customer Sell Price Approval Threshold

Calculated from:

MSRP

minus

Maximum Customer Discount.

This protects:

- market positioning
- channel consistency
- pricing discipline

It is an internal approval and escalation benchmark, not a prescribed, fixed, or contractually enforced resale price.

---

### Target Realized Partner Margin

Defines expected partner profitability.

Calculated using:

(Customer Sell Price − Partner Buy Price)

÷

Customer Sell Price

---

### Circularo Price Realization

Measures how much of MSRP Circularo retains.

Formula

Partner Buy Price

÷

MSRP

This becomes a key KPI for Finance.

For portfolio reporting, Circularo Price Realization must be value-weighted:

Total Partner Buy Price Value

÷

Total MSRP Value

Row-level realization percentages must not be averaged.

---

### Standard Partner Tier Ceilings

The standard pricing engine uses:

| Partner Tier | Standard Realized Margin Ceiling |
|---|---:|
| Authorized | 15% |
| Advanced | 20% |
| Strategic | 30% |

Plan-specific ceilings override broader tier ceilings:

- Start: 10%
- Pro: 15%
- Business: tier ceiling
- Enterprise: tier ceiling
- Ultimate: joint Circularo engagement only; no independent partner quotation

The separate Strategic Opportunity Exception may permit up to 40% realized first-year partner margin only for a new, registered Business or Enterprise customer opportunity with strategic value and explicit CSO approval. It sits outside standard price-book calculations.

---

## Commercial Pricing Engine

Rather than maintaining a simple price list, Circularo will operate a **Commercial Pricing Engine**.

The engine generates:

- Published MSRP
- Price Basis
- Target Customer Sell Price
- Standard Partner Buy Price
- Commercial Floor Price
- Registered Deal Buy Price
- Customer Sell Price Approval Threshold
- Partner Margin
- Customer Discount
- Circularo Price Realization

The Commercial Pricing Engine becomes the single source of truth for:

- Odoo
- CRM
- Quotation Calculator
- ERP
- Finance
- Partner Price Books

---

## Internal Price Book Structure

The Commercial Pricing Engine is supported by a version-controlled Price Book.

Core fields include:

- Price Book Version
- SKU
- Product
- Plan
- Unit
- Price Basis
- Pack Quantity
- MSRP
- Target Customer Discount
- Target Customer Sell Price
- Standard Partner Buy Price
- Commercial Floor Price
- Customer Sell Price Approval Threshold
- Maximum Customer Discount
- Target Partner Margin
- Standard Circularo Price Realization
- Floor Circularo Price Realization
- Approval Authority
- Status

The master Price Book contains one row per SKU. Tier-specific calculations are generated separately in the Partner Buy Price Matrix.

Unknown Commercial Floor Prices remain blank and trigger review. They are not replaced with illustrative values.

Registered Deal Buy Prices remain case-by-case and outside standard workbook calculations.

The canonical implementation is maintained under [`pricing-book/`](<pricing-book>), including the workbook, generator, technical documentation, and end-user manual.

---

## Benefits of the Hybrid+ Architecture

### For Customers

- Consistent market pricing
- Transparent commercial positioning

---

### For Partners

- Predictable economics
- Faster quotations
- Better deal support
- Clear commercial rules

---

### For Sales

- Reduced manual approvals
- Faster quoting
- Better competitive response

---

### For Finance

- Commercial governance
- Margin protection
- Price realization reporting
- Version-controlled pricing

---

### For Product

- One pricing structure across every SKU
- Consistent commercial framework
- Easier product launches

---

### For Odoo

The pricing engine can automatically generate:

- Partner Buy Prices
- Internal price books
- Partner-specific price books
- Customer quotations
- Discount approvals
- Commercial reports

from a single maintained MSRP Catalog with an explicit Price Basis.

---

## Comparative Summary

| Criterion | Approach A<br>List Price Only | Approach B<br>Partner Buy Price Only | Approach C<br>Hybrid | Circularo Hybrid+ |
|----------|-------------------------------|--------------------------------------|----------------------|-------------------|
| Market Price Anchor | Very High | Low | High | Very High |
| Predictable Partner Economics | Very Low | Very High | Very High | Very High |
| Fast Partner Quoting | Low | Very High | High | Very High |
| Deal Registration Support | Low | High | Very High | Very High |
| Profitability Control | Moderate | Moderate | High | Very High |
| Commercial Governance | Low | Moderate | High | Very High |
| ERP / Odoo Automation | Low | High | High | Very High |
| Channel Scalability | Low | Very High | High | Very High |
| Executive Reporting | Low | Moderate | High | Very High |
| Long-Term Flexibility | Low | High | High | Very High |
| Internal Pricing Intelligence | Very Low | Moderate | High | Very High |
| Financial KPI Visibility | Very Low | Low | Moderate | Very High |
| Price Book Maintainability | High | Moderate | High | Very High |
| Support for Future Automation | Low | High | High | Very High |

---

## Recommendation

Circularo should adopt the **Hybrid+ Partner Pricing Architecture** as the foundation of its global partner program.

This model combines the strengths of public list pricing and confidential partner buy pricing while introducing internal governance mechanisms that protect profitability, simplify operations, and support long-term growth.

Rather than treating pricing as a static price list, Circularo should manage pricing through a centralized **Commercial Pricing Engine** backed by a version-controlled **Annual Price Book**.

This architecture provides a scalable commercial foundation for partners, distributors, enterprise customers, and future automation while preserving complete control over Circularo's pricing strategy and channel economics.
