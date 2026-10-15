---
title: Circularo Unified Trust API proposal copy
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
intended_audience: Customers reviewing a Circularo API deployment proposal
publication_status: Prepared for owner review
commercial_record_references:
  - commercial-rule:api-access
  - commercial-rule:add-on-plan-eligibility
  - commercial-rule:automated-transactions
commercial_basis: Josef's latest explicit commercial correction supplied on 2026-10-06
commercial_review_note: commercial-review.md
capability_evidence: evidence-and-review.md
---

# Circularo Unified Trust API

**One API for trusted digital execution.**

Circularo Unified Trust API connects your applications and business processes to the Circularo Digital Trust Platform. Through a unified REST API, you can bring document workflows, identity verification, approvals, electronic and digital signatures, seals, timestamps and document evidence into a connected process.

Your CRM, ERP, portal or business application can initiate a document transaction, coordinate the required participant actions and follow progress through events. The completed document and its audit trail can then be retrieved for your business record.

From a straightforward signing workflow to a transaction involving verification, approvals and additional trust services, Circularo helps you orchestrate the steps your process requires through a common integration layer.

## Benefits for your organization

- **A common integration layer:** Connect supported digital trust capabilities through one REST API, with a consistent interface for initiating processes and retrieving results.
- **Connected process automation:** Initiate document workflows from your applications and link reviews, approvals and execution to your business processes.
- **Control over participant actions:** Specify who needs to review, approve, accept or sign, with actions routed in sequence or in parallel according to the configured workflow.
- **Trust tailored to the transaction:** Apply the identity checks, signing, sealing and timestamp services required for your use case, using the available providers and configuration.
- **Visibility and evidence:** Follow workflow progress through webhooks and retrieve the resulting document and audit trail to support operational review and record keeping.

## Your API deployment

The Circularo REST API is an integration capability available for **Business, Enterprise and Ultimate Plans**. It enables application integration, business process automation and programmatic access to the Circularo Digital Trust Platform and its digital trust services. **There are no standalone API Plans.**

Every API deployment consists of the following components:

| Component | Role in your deployment |
| --- | --- |
| **User-Based or Transaction-Based Subscription** | The foundation of your deployment. Both subscription models cover manual transactions only. |
| **REST API Access Add-On** | Enables integration through the REST API. Included in the Enterprise Plan and purchased separately with the Business Plan. |
| **API eSealing / API eSigning Transactions** | Mandatory for automated/API transaction scenarios, according to the sealing and signing operations used. |
| **Optional Other Consumption Add-Ons** | Selected for additional trust services such as KYC Verification, Qualified Seals and Qualified Timestamps. |

API access enables the integration channel. Automated/API transactions require the applicable API eSealing and/or API eSigning Transactions Add-Ons; they are not covered by the manual transaction allowance of either subscription model. Additional consumption Add-Ons are selected where your process requires extra trust services.

Your proposal specifies the selected Plan and subscription model, API access, required API transaction Add-Ons, any additional trust services and the applicable consumption allowances. This brings your application integration and digital trust requirements together in a deployment scoped to your business processes.
