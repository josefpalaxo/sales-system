---
schema_version: 1
id: master:sales-guidelines-circularo-sales-dos-and-do-nots
kind: master-document
domain: shared
title: "Circularo Sales DOs and DO NOTs"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "sales-guidelines/Circularo Sales DOs and DO NOTs.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/sales-guidelines/Circularo Sales DOs and DO NOTs.md"
  source_sha256: ff35972ae6327a94e9c263661eef009b32ce6dc82a0163ed50dca27335bf25ed
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo Sales DOs and DO NOTs
    status: draft
    classification: internal
    audience: sales
    scope: Practical sales conduct checklist distilled from the Circularo sales-guidelines library
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Sales DOs and DO NOTs

This guide summarizes the practical sales rules that salespeople and AI agents must follow when positioning, qualifying, quoting, and explaining Circularo.

It is a checklist companion to the detailed sales-guidelines documents. If a rule here appears incomplete, use the detailed source documents listed at the end of this guide.

## 1. Positioning Circularo

### DO

- Position Circularo as a **Digital Trust Platform**.
- Start by explaining the business outcome Circularo enables: trusted execution, identity, authority, evidence, compliance, governance, and sovereignty.
- Present Circularo as an end-to-end platform for creating, collaborating, approving, signing, executing, integrating, verifying, archiving, and preserving trusted digital transactions.
- For commercial organizations, lead with **Trusted Execution**.
- For governments, regulated industries, and customer-controlled infrastructure opportunities, lead with **Sovereign Trust Services**.
- Explain that electronic signatures are one capability inside a broader trusted execution platform.

### DO NOT

- Do not position Circularo as “just an e-signature tool.”
- Do not position Circularo as only workflow software.
- Do not position Circularo as only a document management system.
- Do not reduce sovereign opportunities to “SaaS installed on-premise.”
- Do not start a sales conversation with editions, plans, modules, or add-ons before understanding the customer’s business problem.

## 2. Discovery and solution selling

### DO

- Start every opportunity with the customer’s business problem.
- Qualify the intended use case before quoting.
- Map the opportunity to a solution story such as customer onboarding, internal approvals, contract execution, government shared signing, trusted archiving, or sovereign trust infrastructure.
- Identify who will use the platform internally and who will participate externally.
- Identify whether the customer needs SaaS, Ultimate self-hosted, or a sovereign shared-service model.
- Identify required trust services early: eSigning, eSealing, identity verification, qualified timestamps, SMS OTP, national eID, and similar services.

### DO NOT

- Do not sell features in isolation.
- Do not quote before understanding the commercial model, user population, transaction behavior, and required add-ons.
- Do not assume a customer needs sovereign deployment only because they ask for on-premise software.
- Do not promise that a feature, trust service, deployment model, or support level is available before checking the relevant plan and commercial model.

## 3. Products, plans, and editions

### DO

- Sell approved **Products** such as Circularo Business, Circularo Enterprise, and Circularo Ultimate.
- Use plans to determine pricing, packaging, and feature availability.
- Map every proposal to an approved plan.
- Upgrade the customer when the required capability is outside the selected plan.
- Treat editions as internal technical concepts unless an approved customer-facing document says otherwise.

### DO NOT

- Do not sell “editions” as if they are customer-facing products.
- Do not invent pricing, bundles, or plan exceptions.
- Do not promise features outside the customer’s selected plan.
- Do not say “we’ll just include that feature” when the plan does not support it.
- Do not treat add-ons as substitutes for the correct base plan.

## 4. Subscription model selection

### DO

- Choose the subscription model based on customer behavior.
- Use **User-Based Subscriptions** when employees regularly work in Circularo, internal users are the primary users, or API automation may be required.
- Use **Transaction-Based Subscriptions** when manual transaction volume is the primary pricing driver and the commercial model explicitly supports that use case.
- Use **DMS-Only** only when the requirement is standalone document management under the approved DMS model.
- Keep each customer subscription commercially clean and easy to audit.
- Escalate if an exception appears necessary.

### DO NOT

- Do not mix User-Based, Transaction-Based, and DMS-Only licensing in the same subscription.
- Do not create hybrid licensing unless it has been explicitly approved through the proper commercial process.
- Do not sell User-Based merely because it appears cheaper.
- Do not use Transaction-Based subscriptions for API commercial configurations.
- Do not defer licensing decisions with “we’ll figure out licensing later.”

## 5. Internal users and external participants

### DO

- License every **Internal User** who belongs to the customer organization and accesses or benefits from the Circularo platform.
- Count employees who prepare, review, approve, sign, manage workflows, administer the platform, configure integrations, access reports, or otherwise benefit from the platform.
- Explain that every organization must have at least one Regular User acting as the platform administrator.
- Use **Regular Users** for employees who need full platform functionality.
- Use **Lite Users** only for named Internal Users with limited roles: Prepare Only, Sign Only, or Read Only.
- Explain that Lite Users are still licensed Internal Users with registered Circularo accounts, not External Participants.
- Confirm that the customer has at least 20 Regular Users before quoting Lite Users.
- Ensure the number of Lite Users does not exceed the number of licensed Regular Users in the same subscription.
- Explain that **External Participants** are free and unlimited.
- Explain that external recipients, signatories, suppliers, citizens, partners, and contractors do not require user licences.

### DO NOT

- Do not say API automation replaces Internal User licensing.
- Do not say only one API administrator needs a licence when many internal employees benefit from the platform.
- Do not ignore internal users just because documents are generated automatically.
- Do not position Lite Users as unlicensed, free, shared, or concurrent users.
- Do not quote Lite Users for customers with fewer than **20 Regular Users**.
- Do not quote more Lite Users than Regular Users.
- Do not use Lite Users to avoid licensing employees who need full Regular User functionality.
- Do not treat Prepare Only, Sign Only, or Read Only as permissions that remove the need for a named Internal User licence.
- Do not charge external recipients as internal users.
- Do not confuse external participant freedom with unlimited internal user licensing.

## 6. API selling and licensing

### DO

- Explain that the REST API is an integration capability of the Circularo platform.
- Sell API only with a **User-Based Subscription**.
- Include the **REST API Access Add-On** whenever the customer requires API integration.
- Separate API commercial components clearly:
  - User-Based Subscription for internal people.
  - REST API Access Add-On for platform integration.
  - API Trust Service Add-Ons for automated trust-service consumption.
- Position REST API Access as covering platform integration activities such as document upload, workflow creation, metadata, search, reporting, administration, event notifications, and webhooks.
- Qualify API opportunities by asking what application will call the API, which trust services are automated, expected transaction volumes, internal user count, external participant count, identity requirements, compliance requirements, data residency, and deployment model.

### DO NOT

- Do not sell API as a standalone product, plan, or subscription model.
- Do not sell API with Transaction-Based subscriptions.
- Do not say REST API Access is included in the base subscription.
- Do not say REST API Access includes electronic signing, electronic sealing, KYC, SMS OTP, qualified timestamps, or national eID.
- Do not say “API replaces user licences.”
- Do not say “only one API user is enough.”

## 7. API trust-service consumption

### DO

- Add API eSigning Transactions whenever an application programmatically initiates electronic signing.
- Add API eSealing Transactions whenever an application automatically applies electronic seals.
- Add the relevant trust-service add-ons for identity verification, KYC, SMS OTP, national eID, qualified timestamps, qualified signatures, qualified seals, and similar services.
- Treat each API trust service as independently licensed.
- Explain that platform operations such as upload, download, search, reporting, administration, workflow configuration, template management, webhooks, and metadata updates are integration operations, not trust-service transactions.
- Explain that annual volume pricing applies to API eSigning and API eSealing according to the approved pricing recommendations.

### DO NOT

- Do not treat API eSigning or API eSealing as included in REST API Access.
- Do not treat KYC, SMS OTP, national eID, or qualified timestamps as included unless the approved commercial offer explicitly includes them.
- Do not imply that document upload, document download, search, or workflow creation consumes signing/sealing transactions.
- Do not apply API eSigning/eSealing volume pricing to unrelated trust services unless an approved commercial model says so.

## 8. “Unlimited” plans and transaction wording

### DO

- Explain exactly what “unlimited” covers in the selected plan.
- Clarify that unlimited manual transaction allowances apply only to the approved manual use case and licensing model.
- Separate manual user-operated activity from automated API activity.
- Use precise wording for transaction allowances, annual commitments, and add-on consumption.

### DO NOT

- Do not say “unlimited means unlimited.”
- Do not imply unlimited plans include automated API signing, automated API sealing, batch processing, or system-generated trust-service workflows.
- Do not use unlimited manual transaction language to avoid API transaction add-ons.

## 9. Add-ons and trust services

### DO

- Sell add-ons only as extensions of an existing subscription.
- Start with **Plan → Subscription → Add-Ons**.
- Identify required add-ons during discovery and include them clearly in the proposal.
- Treat trust services as separate commercial items unless explicitly included in an approved offer.
- Confirm whether the opportunity requires SMS OTP, KYC, UAE Pass, Nafath, national eID, qualified signatures, qualified seals, qualified timestamps, SMS reminders, API eSigning, API eSealing, DMS & Archiving, or support upgrades.

### DO NOT

- Do not sell add-ons as standalone products.
- Do not start with add-ons before identifying the base plan and subscription model.
- Do not assume trust services are included.
- Do not bundle add-ons informally to make a deal look simpler.
- Do not use one add-on to cover a different trust service.

## 10. Storage, DMS, and archiving

### DO

- Explain the difference between transactional document retention and standalone document management.
- Explain that transactional documents are archived, retained, and included as part of the transaction flow.
- Use the **DMS & Archiving Add-On** when the customer needs standalone document management or broader document archive use cases.
- Clarify storage scope, retention scope, and DMS scope before quoting.

### DO NOT

- Do not say storage is unlimited.
- Do not treat additional storage as a replacement for DMS & Archiving.
- Do not imply that standalone document management is included in every subscription.
- Do not confuse automatic transaction archiving with a full enterprise DMS.

## 11. Support and services

### DO

- Treat support as a commercial item.
- Explain that Essential Support is included where applicable.
- Quote Standard, Plus, or Premium Support when the customer requires higher support commitments.
- Treat implementation, configuration, identity integration, and sovereign deployment work as scoped services where required.

### DO NOT

- Do not include Premium Support “for free.”
- Do not promise advanced support levels without quoting or approval.
- Do not hide implementation effort inside subscription pricing unless it is explicitly approved.

## 12. Sovereign trust solutions

### DO

- Position sovereign opportunities as **Sovereign Trust Platforms**, **National Digital Trust Infrastructure**, **Enterprise Trust Platforms**, or **Government Shared Services Platforms**.
- Use sovereign positioning when the customer requires digital sovereignty, data residency, regulatory compliance, customer-controlled infrastructure, security governance, national identity integration, or shared digital services.
- Explain that customers are investing in the ability to own, operate, and govern digital trust services under their own control.
- Distinguish dedicated sovereign platforms from sovereign shared services platforms.
- Explain that sovereign platforms can expand over time into vault, collaboration, AI, KYC, and additional trust services.
- Remember that self-hosted deployment is available only with Ultimate.

### DO NOT

- Do not position sovereign solutions as “just self-hosting.”
- Do not position sovereign solutions as a digital signature server.
- Do not position sovereign solutions as another hosting option.
- Do not sell self-hosted Business or self-hosted Enterprise.
- Do not lead sovereign sales with infrastructure mechanics before explaining governance, sovereignty, compliance, identity, and operational control.

## 13. Commercial discipline

### DO

- Negotiate within approved commercial levers: discount, contract term, volume, and approved commercial incentives.
- Escalate requests that change licensing rules, subscription models, product definitions, add-on rules, or commercial structure.
- Keep proposals auditable, explainable, and aligned to the approved commercial model.
- Use approved price lists, guides, and product catalogues.
- Capture assumptions clearly when pricing depends on future confirmation.

### DO NOT

- Do not negotiate the commercial model itself.
- Do not change product definitions to win a deal.
- Do not invent custom bundles.
- Do not promise exceptions verbally.
- Do not let a customer’s preferred procurement structure override Circularo licensing rules without formal approval.

## 14. Fast sales checklist

Before sending a proposal, confirm:

1. What business problem are we solving?
2. Which sales motion applies: Trusted Execution SaaS or Sovereign Trust Services?
3. Which product and plan fit the requirement?
4. Which subscription model applies?
5. How many Internal Users require licences?
6. Are External Participants correctly treated as free and unlimited?
7. Is API required?
8. If API is required, is the customer on a User-Based Subscription?
9. Is REST API Access included as an add-on?
10. Are automated trust services covered by the correct API Trust Service Add-Ons?
11. Are non-API trust services such as KYC, SMS OTP, national eID, qualified timestamps, qualified signatures, and qualified seals covered correctly?
12. Is DMS & Archiving required, or only transactional document retention?
13. Is the support level correct?
14. Is self-hosting only being proposed under Ultimate?
15. Are all exceptions escalated before proposal submission?

## 15. Source documents

Use these detailed guides when a rule needs interpretation:

- [Circularo Positioning Framework](<Circularo Positioning Framework.md>)
- [Selling Circularo SaaS](<Selling Circularo  SaaS.md>)
- [Selling API Plans](<Selling Circularo API Plans.md>)
- [API Licensing Principles](<API Licensing Principles.md>)
- [API Licensing FAQ](<API Licensing FAQs.md>)
- [API Pricing Recommendations](<API Pricing Recommendations.md>)
- [Why API is Sold Only with User-Based Subscriptions](<Why API is Sold Only with User-Based Subscriptions.md>)
- [Selling Sovereign Trust Solutions](<Selling Sovereign Trust Solutions.md>)
