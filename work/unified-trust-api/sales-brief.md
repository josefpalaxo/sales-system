---
title: Unified Trust API sales brief
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
primary_audience: Enterprise buyers and solution architects
---

# Unified Trust API sales brief

**One API for trusted digital execution.**

Circularo Unified Trust API gives applications a common integration layer for coordinating document workflows, participant verification, approvals, electronic and digital signatures, seals, timestamps and document evidence. The opportunity is to sell a connected document process that the customer can initiate from its own application and follow through to completion.

Internal sales draft. Capabilities are grounded in the supplied 26.1.0 documentation; customer availability and external copy require owner review. See [Evidence and review](evidence-and-review.md).

## The sales opportunity

When a transaction needs more than a signature, application teams may have to assemble the surrounding process themselves: prepare the document, verify the participant, route internal approvals, request signatures, apply trust services, track exceptions and retrieve evidence.

Circularo brings these documented capabilities behind a common API. The customer application starts and follows the configured process; Circularo coordinates the document workflow and participant actions. The completed document and audit trail can then be retrieved, and webhooks can update the originating system.

**Discovery hypothesis:** customers with fragmented document processes may reduce duplicated integration and workflow effort. Establish the current architecture and measure the benefit in a pilot; do not promise a fixed reduction in time or cost.

## Where to focus

Prioritize enterprise applications, software vendors and integration partners whose document processes combine internal and external participants, different action types, verification requirements and operational evidence.

| Signal | Why it matters |
| --- | --- |
| Approvals and signing are spread across systems | Coordination is part of the buying problem. |
| Several applications need similar document processes | A common integration boundary may prevent repeated implementation. |
| The process needs different identity or execution requirements | The choice and configuration of trust capabilities matter alongside signing. |
| Teams reconcile status manually or search for evidence afterward | Events and evidence retrieval can improve the operational handoff. |
| A portal or product needs embedded document execution | The application can initiate the process through an API. |

A simple signature requirement with an effective existing integration is a narrower opportunity. Qualify the additional process requirement before expanding the pitch.

## What to sell and what to show

| Buyer outcome | Documented capability to demonstrate |
| --- | --- |
| Coordinate the required actions | Document workflows; review, approve, accept and sign purposes; sequence, parallel groups and quorum |
| Connect verification to participation | External-recipient identity controls and KYC factors; 26.1.0 adds document-type and expected-data matching |
| Execute the document with the chosen trust requirements | Electronic and digital signing; certificate sealing and TSA timestamp options, subject to configuration |
| Follow progress from the business application | Webhook notifications for document events and workflow progress |
| Retrieve the result and its document history | Document retrieval/export and an audit trail PDF; 26.1.0 documents a Certificate of Fulfillment option |

Do not turn the capability table into a promise that every transaction uses every step. Select the actions and services needed for the buyer's process.

## Illustrative use cases

### Contract execution from a CRM

A CRM initiates a document process, an internal reviewer approves it, the external counterparty completes the configured verification and signing steps, and an authorized internal participant signs where required. Events update the CRM, which retrieves the executed document and audit trail.

Lead with the handoff between internal approval, external signing and CRM status. Confirm signer order, identity requirements, signing configuration and how the CRM stores the result.

### Application processing from a service portal

A portal initiates a document transaction, the applicant completes the required verification, an internal team reviews or approves it, and the process applies digital signing, a seal or timestamp where required. The portal retrieves the resulting document and evidence.

Lead with a connected service process. Validate the permitted identity providers and required assurance for the service; do not imply jurisdictional acceptance from the API alone.

### Document execution from an ERP event

An ERP event starts a configured document workflow. Required participants act in order, the document is executed with the chosen trust services, and a webhook allows the ERP to update the business record. The integration retrieves the document and audit trail.

Lead with visible execution and a reliable operational handoff. Event handling, exception recovery and any unattended sealing must be designed and validated for the deployment.

These are proposed solution patterns, not customer references or proven out-of-the-box connectors.

## Discovery questions

1. Which document transaction are you trying to complete, and which application starts it?
2. Who must review, approve, accept or sign, and which actions can happen in parallel?
3. How do you establish the participant's identity, and what assurance does this use case require?
4. Which parts of the process already work, and where do handoffs or exceptions create manual effort?
5. Which system needs progress events, the completed document and the audit trail?
6. What would make a pilot successful: fewer manual handoffs, faster completion, less duplicated code or better evidence retrieval?

## Objections and responses

| Buyer objection | Suggested response |
| --- | --- |
| We already have an eSignature API | That may cover signing well. Let's map the steps around it: verification, approvals, document trust services and returning evidence. Circularo is relevant where coordinating those steps remains a problem. |
| Our team can connect the individual services | Yes. The question is how much document workflow, state handling and evidence assembly you want to own. We can compare that architecture with a process coordinated through Circularo. |
| Does one API mean no integration work? | There is still an integration to build. The value is a common Circularo interface across the supported document process, with configuration and events to connect it to your application. |
| Will you support our identity and signing providers? | We need to confirm your required providers, deployment and assurance. The API exposes relevant controls, but the documented fields are not a universal provider guarantee. |
| Does this guarantee compliance? | We can demonstrate the configured verification, execution and evidence. The legal and regulatory requirements must be assessed for your transaction and jurisdiction. |
| Can our AI agent use it? | An AI-enabled application could call the API to initiate a configured process. Agent authorization, delegated access and human approval boundaries need to be designed explicitly. |

## Pilot and next step

**Sales close:** “Let's take one document transaction you run today and show how its required steps connect through Circularo, including the completed document and evidence returned to your application.”

Agree one source application, one document type, the required participants and actions, identity and signing requirements, and the receiving record system. Demonstrate the successful path plus a representative rejection or verification failure. Check that the integration handles events, retrieves the final result and respects the intended access rights.

Measure the customer's current handoffs and completion effort before the pilot. Evaluate the result against agreed business criteria rather than a generic API feature count.

## Commercial and technical handoff

Use current governed records for the offer: `commercial-rule:api-access`, `commercial-rule:add-on-plan-eligibility`, `commercial-rule:automated-transactions` and `commercial-rule:sandbox-environments`. Links and review dates are in [Evidence and review](evidence-and-review.md). Confirm requirements and entitlements before quoting; this brief contains no prices, allowances or new packaging rules.

For the solution review, confirm the target release, configured providers, workflow, assurance requirements and evidence retrieval. Resolve the documented schema gaps before demonstrating identity matching or Certificate of Fulfillment. Existing integrations need the 26.1.0 migration review, especially template settings and error handling.
