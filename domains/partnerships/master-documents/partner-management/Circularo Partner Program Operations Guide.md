---
schema_version: 1
id: master:partner-management-circularo-partner-program-operations-guide
kind: master-document
domain: partnerships
title: "Circularo Partner Program Operations Guide"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/Circularo Partner Program Operations Guide.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/Circularo Partner Program Operations Guide.md"
  source_sha256: e9436aab391882e42eb14b56a0e0060d6a186736de8a10cbf31700ac8ebf2a76
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo Partner Program Operations Guide
    status: draft
    classification: internal
    audience: internal
    owner: CSO
    scope: SaaS Resellers and Master Distributors
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Partner Program Operations Guide

## 1. Purpose

This guide defines how Circularo administers partner tiers, pricing, deal registration, exceptions, renewals, payment controls, and disputes.

The Circularo Partner Program Policy is the internal source of truth. Signed agreements and applicable law prevail.

## 2. Roles

| Role | Responsibility |
| --- | --- |
| CSO | Policy owner and exceptional commercial approver |
| Channel team | Partner onboarding, tier reviews, registrations, pipeline, partner communication |
| Sales | Opportunity support, direct/channel coordination, quote discipline |
| Finance | Price books, credit, payment terms, price realization, rebates |
| Legal | Partner agreements, regional competition review, exceptions |
| Customer Success/Support | Adoption, support-role evidence, renewal contribution |
| Product/Commercial Operations | SKU, eligibility, list-price, and calculator governance |

Named owners and delegation thresholds are `TBD`.

## 3. Partner onboarding

Required before activation:

- Signed Partner Agreement
- Partner type recorded: Reseller or Master Distributor
- Tier assigned
- Territory/market recorded
- Payment terms and credit limit approved
- Contacts and escalation paths recorded
- Required training completed or scheduled
- Price-book version assigned
- Reporting obligations accepted
- Compliance checks completed

Activation checklist and SLA are `TBD`.

## 4. Tier administration

### Initial assignment

Assign Authorized unless the CSO approves another tier based on documented capability, revenue commitment, or strategic value.

### Review inputs

- Booked and recurring revenue
- Pipeline
- Certification
- Forecast accuracy
- Registered-deal conversion
- Adoption and customer satisfaction
- Renewal performance
- Payment performance
- Reporting completeness
- Policy compliance

### Review outcomes

- Retain tier
- Promote
- Demote
- Place on improvement plan
- Suspend benefits
- Terminate participation

Revenue thresholds, scoring, and review cadence are `TBD`.

## 5. Margin-control logic

For each quote calculate:

1. Customer list price
2. Customer sell price
3. Customer discount
4. Partner buy price
5. Realized partner gross margin
6. Applicable tier ceiling
7. Applicable plan ceiling
8. Effective ceiling: lower of tier and plan
9. Circularo price realization
10. Approval status

Blocking rules:

- Start realized recurring margin above 10%
- Pro realized recurring margin above 15%
- Business/Enterprise recurring margin above the partner-tier ceiling
- Any recurring margin above 35%
- First-year margin above 40%
- First-year margin above normal ceiling without CSO approval

## 6. Standard pricing workflow

1. Confirm partner and tier.
2. Confirm price-book version.
3. Confirm product eligibility.
4. Apply standard partner buy price.
5. Capture proposed customer price.
6. Calculate realized margin and Circularo realization.
7. Check discount band.
8. Confirm whether registration or approval is required.
9. Generate partner and customer quote views.
10. Record final approved economics.

Partner buy prices and margins must never appear in the customer-facing quotation.

## 7. Special-pricing workflow

Required request fields:

- Partner and tier
- Registration ID
- End customer
- Products, quantities, and term
- List price
- Proposed customer sell price
- Customer discount
- Standard partner buy price
- Requested special buy price
- Realized partner margin
- Circularo price realization
- Competitive/strategic justification
- Decision deadline
- Payment terms and credit status

Approval:

- Channel team validates completeness.
- Finance validates calculations and vendor economics.
- Legal reviews regional or contractual issues when required.
- CSO approves or rejects the exception.

Approved special pricing must include:

- Scope
- Price
- Reason
- Approval owner
- Effective date
- Expiry date
- Renewal treatment
- Conditions

## 8. Deal-registration workflow

### Submission

Timestamp the submission and validate completeness.

### Conflict check

Check:

- Existing accepted registrations
- Direct opportunities
- Customer ownership requirements
- Duplicate legal entities
- Related procurement processes
- Existing customers and renewals

### Decision

Possible statuses:

- Submitted
- Clarification required
- Accepted
- Rejected
- Conflict review
- Suspended
- Expired
- Cancelled
- Won
- Lost

The first complete accepted registration receives priority.

### Protection period

- Maximum six months
- Review cadence `TBD`
- Partner must provide progress evidence
- Extensions outside six months require new registration or CSO approval under a future rule

### Best-price check

Before approving another partner price on the same customer/opportunity:

1. Compare scope and terms.
2. Identify the active registered partner.
3. Compare Circularo-funded buy prices and discounts.
4. Ensure the later partner does not receive better funding for materially comparable scope.
5. Escalate material differences to the CSO.

## 9. Direct/channel conflict

When direct sales and a partner overlap:

- Pause inconsistent pricing.
- Confirm registration status.
- Compare scope, date, customer request, and partner activity.
- Preserve accepted protection where applicable.
- Do not compensate internal sales for bypassing an active registered partner.
- If direct contracting is necessary, define the partner's economic or delivery role in writing.

Dispute SLA and escalation panel are `TBD`.

## 10. Renewal operations

### Renewal owner

Record one accountable owner:

- Partner-led
- Joint
- Circularo-led

### Evidence for partner renewal economics

- Adoption/customer-success activity
- Support coordination
- Renewal forecast
- Customer engagement
- Expansion identification
- Timely commercial action
- Current account data
- Good standing and payment

### Outcomes

- Full applicable renewal economics
- Reduced economics
- 0% partner renewal margin
- Reassignment to another route

Decision rules and timelines are `TBD`.

## 11. Master Distributor operations

Record:

- Master Distributor
- Downstream Reseller
- End customer
- Total channel envelope
- Distributor share
- Reseller share
- Credit holder
- Support owner
- Adoption owner
- Renewal owner

Validate that combined economics do not exceed the applicable plan, tier, or approved first-year ceiling.

## 12. Credit and payment controls

- Finance sets credit limits and payment terms.
- Partner owes Circularo regardless of end-customer collection.
- Credit exposure is checked before order acceptance.
- Over-limit orders require prepayment or approval.
- Overdue accounts may be placed on hold.
- Holds may suspend new orders, special pricing, rebates, registrations, and renewals.

Standard terms and exception authority are `TBD`.

## 13. Product and price-book governance

Maintain:

- SKU
- Product name
- Plan/model eligibility
- List price
- Standard buy price by tier
- Effective date
- Expiry date
- Placeholder/TBD status
- Margin category
- Regional availability
- Dependencies

Rules:

- Never overwrite historical price records.
- Version every price book.
- Record the version on every quote and order.
- Remove placeholder prices before production use.
- Reconcile matrix and price-list aliases.

## 14. Reporting

Minimum operational dashboard:

- Active partners by type and tier
- Pipeline and registration value
- Registration conversion
- Average customer discount
- Average realized partner margin
- Circularo price realization
- Special-price frequency
- Revenue by partner/tier
- Renewal rate and net revenue retention
- Payment aging
- Master Distributor sell-through completeness
- Policy exceptions

Systems and reporting cadence are `TBD`.

## 15. Audit trail

Retain:

- Submitted registration
- Registration decision
- Price request
- Calculations
- Approval
- Customer quote
- Partner order
- Price-book version
- Renewal decision
- Payment status
- Exception correspondence

Retention period is `TBD`.

## 16. Communications

Use:

- Partner Program Guide for program overview
- Pricing and Deal Registration Guide for commercial execution
- Partner FAQ for common questions
- Partner Agreement and Order Form for binding terms

Do not provide internal contribution floors, other partners' prices, or confidential exception logic externally.

## 17. Launch checklist

Before launch:

- Legal review completed for priority countries
- Finance approves list and buy prices
- CSO approves tiers and ceilings
- Partner Agreement updated
- Registration form and workflow available
- Price book versioned
- Calculator updated
- Reporting fields available
- Partner-facing documents approved
- Internal training completed
- Credit process active
