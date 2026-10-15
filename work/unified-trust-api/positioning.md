---
title: Unified Trust API positioning
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
---

# Unified Trust API positioning

Circularo Unified Trust API should be positioned as the integration layer for orchestrating trusted document transactions. Lead with the process a customer needs to execute: the participants, required actions, identity checks, signatures, trust services and evidence. API breadth supplies the proof behind that story.

This is proposed positioning for internal review. Documented capability support and release conditions are recorded in [Evidence and review](evidence-and-review.md).

## Positioning statement

For enterprises and software providers that need to execute document transactions within their applications, Circularo Unified Trust API provides a common integration layer to coordinate document workflows, participant verification, approvals, electronic and digital signatures, seals, timestamps and document evidence. Applications initiate a configured process and receive progress through events, while Circularo coordinates the document transaction.

Availability of identity and trust services depends on the configured services and applicable entitlements.

## Core language

| Role | Recommended copy |
| --- | --- |
| Product name | Circularo Unified Trust API |
| Descriptive category | API for trust orchestration in document transactions |
| Primary promise | One API for trusted digital execution. |
| Buyer explanation | Bring the steps of a trusted document transaction together through a common API. |
| Integration message | Integrate once. Orchestrate the trust capabilities your process needs. |
| Campaign line | Integrate the outcome, not the infrastructure. |
| Supporting message | Trust doesn't end with the signature. |
| Strategic line | Make trust programmable. |

“Unified Trust API” describes the integration proposition. Commercial packaging follows `commercial-rule:api-access`; this narrative does not create a new standalone SKU or subscription model.

“Integrate once” means one Circularo integration boundary across supported capabilities. Implementation still includes authentication, configured workflows, provider setup where required, event handling and connection to the customer's record system. “Integrate the outcome” means invoking a configured document process; it does not mean an application can express any desired result and have Circularo infer the process automatically.

## The buyer problem

Some document processes cross several systems before they can finish. An application starts the transaction, an identity service verifies a participant, approval logic controls the next step, a signing service executes the document, and another system stores the result. The application team must connect these steps, manage their states and recover the evidence later.

That is the opportunity to test in discovery. The strongest fit is a customer whose difficulty lies in coordinating the process, especially when identity requirements, internal approvals, external participants and evidence must stay connected.

## Three message pillars

### Coordinate the process

Control who needs to review, approve, accept or sign, and in what order. The API supports recipient actions, sequential and parallel routing, and quorum requirements. The buyer value is less workflow logic spread across applications and a clearer view of what remains to be completed.

### Apply the required trust

Connect participant verification with signing and, where required, document sealing and timestamps. The buyer chooses the requirements with Circularo for the use case. Provider availability, assurance and configuration must be confirmed; a list of API fields is not a guarantee of every provider or trust level.

### Carry evidence back to the business

Follow document progress through events, retrieve the completed document and generate its audit trail. Evidence becomes part of the process the application initiates. The buyer value is a clearer handoff to operations, the record system and later review.

## Differentiation by buying alternative

These are discovery frames, not vendor battlecards or claims of unique market capability.

| Customer's alternative | Where Circularo's story matters | Question to establish relevance |
| --- | --- | --- |
| A signing API focused on the signing step | The requirement also includes review, approval, verification, sealing or evidence retrieval | What needs to happen before and after signing, and where is that logic today? |
| Separate trust-service integrations | Coordination and document context need to span the services | Who owns the transaction state and the evidence across those integrations? |
| Workflow built inside each business application | Similar trust processes are being implemented repeatedly | How many applications maintain their own recipient routing and exception logic? |
| A general automation platform | The customer needs specific document execution and trust capabilities within an automated process | Which identity, signature and document evidence requirements must the automation satisfy? |

A signing vendor or automation platform may already cover parts of this scope. Differentiate on the customer's demonstrated orchestration gap, configured trust requirements and observed execution, rather than claiming competitors “only sign.”

## Audience emphasis

| Audience | Lead with | Proof to show |
| --- | --- | --- |
| Business sponsor | A document process that can reach completion with visible progress and evidence | One representative transaction from initiation to returned document and audit trail |
| Enterprise architect | A common boundary for document trust processes across applications | Workflow selection, participant controls, events and retrieval |
| Product leader at a software vendor | Add trusted document execution to the customer's application experience | Application initiation, participant journey and event-driven status update |
| Public sector service owner | Verification and required approvals connected to document execution | Configured identity requirements, approval order, digital execution and evidence |

For public sector audiences, confirm the required jurisdiction, providers and assurance. Sovereignty, residency and qualified legal status are not implied by this API story.

## AI extension

Use AI as a secondary integration scenario: an AI-enabled application could initiate a configured document process through the API. The API supplies documented workflow and access controls; agent-specific authority, delegated credentials and human approval policy require separate design and validation.

Do not lead with “agentic execution” or assert that Circularo can establish an agent's institutional authority. The `execute` recipient purpose does not prove those capabilities.

## Language boundaries

Prefer “document audit trail,” “configured trust services,” “required participant actions” and “common integration layer.” Avoid “complete evidence” without defining its scope, “all trust providers,” “guaranteed compliance,” “automatic legal authority verification” and quantified delivery or savings claims without approved proof.

The strongest close is concrete: **choose one document transaction, show how its required steps connect, and return the document with its evidence to the application.**
