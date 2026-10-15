---
title: Unified Trust API pitch
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
primary_audience: Enterprise buyers and solution architects
---

# Unified Trust API pitch

Lead with a document transaction the buyer recognizes, explain the coordination problem, and introduce Circularo as the common integration layer for its required trust steps. The spoken pitches and eight-slide storyline below are proposed copy for internal review, with claim support in [Evidence and review](evidence-and-review.md).

## Thirty second pitch

Your application needs a document transaction completed: the right people verified, the required approvals obtained, the document signed and the evidence returned. Circularo Unified Trust API brings those steps together through a common integration layer, with configured identity checks, workflows, signatures, seals and timestamps. Your application initiates the process and follows its progress through events. One API for trusted digital execution.

## Ninety second pitch

When a document transaction needs more than a signature, the work sits between the services. Someone has to connect participant verification, internal approvals, signing, document trust services and the evidence returned to the business application.

Circularo Unified Trust API brings those capabilities into a common integration layer. Your CRM, ERP or portal can initiate a configured document process, specify who needs to review, approve or sign, and follow progress through events.

The process can use the required identity checks and electronic or digital signatures, with seals and timestamps where needed. At the end, your application can retrieve the completed document and its audit trail.

Take a contract initiated in your CRM. It needs an internal approval, verification of the external counterparty, signatures in the right order and a record of what happened. Circularo can coordinate those document steps while your CRM remains connected to progress and the result.

That's the proposition: one API for trusted digital execution. Let's choose one of your document transactions and demonstrate its required actions, the execution and the evidence returned to your application.

## Eight slide storyline

This is an editable deck script, not a produced slide deck. The headings describe each slide; the quoted headline is proposed on-slide copy. Keep technical source notes in presenter preparation rather than on the customer slides.

### Slide 1 The document transaction problem

**Headline:** “The signature is one step. The transaction is the job.”

**On-slide copy:** Verify the participant. Obtain the required approvals. Execute the document. Return the evidence.

**Visual:** One recognizable document transaction with its required steps. Begin with a contract, application or business document that fits the buyer.

**Talk track:** “You need this transaction to reach completion. Signing matters, but it is connected to who can participate, what must happen first and what your business needs afterward.”

### Slide 2 The coordination burden

**Headline:** “Who connects the trust steps?”

**On-slide copy:** Each handoff needs process logic, status handling and evidence retrieval.

**Visual:** An illustrative application connected separately to verification, approval logic, signing, timestamp or seal services, and the record system. Label it “Example architecture” and adapt it to discovery.

**Talk track:** “Where these capabilities sit in separate systems, your team owns the work between them. Let's identify where your process is already connected and where it still requires manual or custom coordination.”

### Slide 3 Introduce Unified Trust API

**Headline:** “One API for trusted digital execution.”

**On-slide copy:** Circularo Unified Trust API connects your application to a configured document process and its trust capabilities.

**Visual:** Business application → Circularo Unified Trust API → configured document process. The originating application also receives events and retrieves the result.

**Talk track:** “Your application integrates with Circularo to initiate and follow the process. Circularo coordinates document workflows, recipient actions and the configured trust capabilities.”

### Slide 4 Explain orchestration

**Headline:** “Orchestrate the steps your transaction needs.”

**On-slide copy:** Participant verification · Review and approval · Signatures · Seals and timestamps · Document evidence · Events

**Visual:** A transaction at the center, connected to six capability groups. Avoid a mandatory linear chain: the use case determines the required steps and order.

**Talk track:** “This is how we configure your process. Who must act? In what order? Which identity requirements apply? What execution and evidence are needed? The API supports more than requesting a signature.”

**Proof:** Recipient purposes, sequential and parallel routing, quorum, KYC controls, signing, sealing, audit PDF and webhooks.

### Slide 5 Make the story concrete

**Headline:** “From a CRM request to an executed contract.”

**On-slide copy:** Initiate → Approve → Verify and sign → Retrieve document and evidence

**Visual:** A simple contract example with an internal approval, external counterparty action, required signatures and a return to the CRM. Show event updates alongside the process.

**Talk track:** “The CRM starts the transaction. An internal participant approves it. The counterparty completes the configured verification and signing step. Required signatures follow the chosen order. Your application receives progress and retrieves the document and audit trail.”

**Presenter condition:** Use a validated configuration. This is an illustrative integration, not a claim of a supplied native CRM connector. Add a seal or timestamp only if required by the example.

### Slide 6 Show the evidence handoff

**Headline:** “Trust doesn't end with the signature.”

**On-slide copy:** Follow progress. Retrieve the executed document. Generate the document audit trail.

**Visual:** Three real outputs from a validated demonstration: an application status update, the resulting document and its audit PDF.

**Talk track:** “The process also has to return something operations can use and review. Circularo exposes document events and an audit document so the originating application can stay connected to execution and its history.”

**Optional release proof:** Show the Certificate of Fulfillment once its request and target deployment are confirmed. Use synthetic demo data.

### Slide 7 Explain application automation

**Headline:** “Connect trusted execution to your application.”

**On-slide copy:** Initiate through the API. Coordinate required actions. React to document events. Retrieve the result.

**Visual:** Application request → Circularo process → event callback → application record, with a separate document and audit retrieval arrow.

**Talk track:** “This model fits a business application or an automation platform. It can also be explored for an AI-enabled application, with explicit authorization and approval boundaries. The core proposition remains the document process.”

**Presenter condition:** Keep AI to one sentence unless the buyer has a specific use case. Do not imply a dedicated agent product or automatic institutional authority.

### Slide 8 Close on a pilot

**Headline:** “Make your next document process programmable.”

**On-slide copy:** One transaction. Its required trust steps. The result returned to your application.

**Visual:** A short pilot scope card: source application, document, participants, trust requirements and success criteria.

**Talk track:** “Let's take one process you already run. We'll agree its required actions and trust services, show the successful path and an exception, and return the document and evidence to your application. Then we can assess the operational value against your current process.”

## Audience variations

| Audience | Replace the opening example with | Emphasize |
| --- | --- | --- |
| Enterprise buyer | A contract, HR document or procurement process from an internal application | Required approvals, completion visibility and handoff to the business record |
| Software vendor or integration partner | A customer's document process initiated inside the vendor's product | A common API boundary, participant experience, events and evidence retrieval |
| Public sector | An application or service document initiated from a portal | Configured participant verification, approval steps, required digital execution and evidence; confirm local requirements |

## Demonstration sequence

1. Start in the originating application's context and explain the business request.
2. Initiate the document using a reviewed workflow and show the required participant actions.
3. Complete an internal review or approval, then the configured external verification and signature.
4. Show how a rejection or failed verification affects the process in a separate test transaction.
5. Show an event updating the originating application's status.
6. Retrieve the resulting document and audit trail. Add sealing, timestamp or Certificate of Fulfillment only when validated and relevant.

The proof of orchestration is the connected transaction, including its exception and evidence handoff. A tour of endpoint categories will not make that value clear on its own.
