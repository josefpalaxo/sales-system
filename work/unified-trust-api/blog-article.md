---
title: How Unified Trust API connects digital trust to business applications
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
intended_publisher: Circularo blog
publication_status: Pending team review
suggested_slug: unified-trust-api-digital-trust-orchestration
suggested_excerpt: Connect document workflows, verification, approvals, signatures and evidence to your applications through Circularo Unified Trust API.
capability_evidence: evidence-and-review.md
commercial_basis: Josef's latest commercial correction recorded in commercial-review.md
---

# How Unified Trust API connects digital trust to business applications

A business application can start a document transaction, but completing it may require several connected actions. The document needs to be prepared. Participants may need to be verified. Required reviews and approvals need to happen in the agreed order. Once the process finishes, the business needs the resulting document and a record of what happened.

Circularo Unified Trust API brings these capabilities together through a common REST API. It connects applications to the Circularo Digital Trust Platform, allowing teams to coordinate document workflows, identity verification, approvals, electronic and digital signatures, seals, timestamps and document evidence.

The proposition is simple: **one API for trusted digital execution.**

## The work between the trust steps

Consider a document process that spans a CRM, an approval workflow, a participant verification service and a signing service. Each capability serves a purpose. The integration must also connect their states, determine what happens next and return the result to the originating application.

When that coordination is spread across systems, the application team has more handoffs to manage. It must determine who is waiting to act, what requirements apply and how the document history will be retrieved.

Unified Trust API provides a common integration layer for those document processes. Your application initiates a configured workflow, Circularo coordinates its required actions, and the integration receives events and retrieves the result.

## Orchestrating a document transaction

Different transactions need different steps. A simple signing process may require only a document and its signers. Another process may require internal review, approval, participant verification, digital signing and a document seal or timestamp.

Through the API, applications can specify recipient actions such as review, approve, accept or sign. Actions can be routed sequentially or in parallel, with mandatory actions and quorum requirements where needed.

That allows a process to reflect how the business actually works. An internal approval can precede external signing. Several participants can act in parallel. The required steps and order are determined by the configured workflow.

## Connecting verification and execution

Some document transactions require additional assurance about the person participating. Circularo exposes identity controls for external recipients, including configured KYC checks such as ID verification and liveness detection.

The document process can then connect the required participant checks to electronic or digital signing. A certificate seal, trusted timestamp or both can be applied where the document requires them.

The available services depend on the providers, configuration and entitlements selected for the deployment. The integration should be designed around the transaction's specific identity and assurance requirements.

## A contract workflow example

Imagine a contract initiated from a CRM. It requires internal approval, verification of an external counterparty and signatures in a specified order.

The application creates the document and initiates its configured workflow. An internal reviewer completes the required approval. The external counterparty completes the configured verification and signing steps, followed by any further required signatures.

Document events allow the integration to update the CRM as the process progresses. Once complete, it retrieves the executed document and generates its audit trail for the business record.

This is an illustrative integration pattern. The actual workflow, participant journey, trust services and return to the CRM are configured for the customer's requirements.

## Keeping evidence connected to the process

The executed document is part of the result. Operations may also need to review the process history: which actions took place, who participated and when events occurred.

Circularo exposes document events through webhooks and provides an API operation to generate the document's audit trail. The originating application can stay connected to progress and retrieve the document evidence afterward.

This makes evidence retrieval part of the integration design. Teams can decide in advance how the completed document and audit trail should return to their business record and who should have access to them.

## Building around one business process

The best starting point is a document transaction with clear requirements. Identify the application that starts it, the document type, the participants, required actions and the trust services it needs. Then agree what the application should receive during the process and when it finishes.

The Circularo developer portal provides REST API documentation, getting-started guides and integration examples. A proof of concept can demonstrate the successful transaction, a representative exception and the return of the document and evidence to the application.

Evaluate the integration against the business process: the handoffs it connects, the visibility it provides and the result it delivers.

## How API access is packaged

The Circularo REST API is an integration capability available for Business, Enterprise and Ultimate Plans. There are no standalone API Plans.

An API deployment can use a user-based or transaction-based subscription. Both models cover manual transactions only. The REST API Access Add-On is included in the Enterprise Plan and purchased separately with the Business Plan.

Automated/API transaction scenarios require the applicable API eSealing and/or API eSigning Transactions Add-Ons. Optional additional consumption Add-Ons cover extra trust services such as KYC Verification, Qualified Seals and Qualified Timestamps. The proposal defines the deployment's services and consumption allowances.

## Connect your next document transaction

Unified Trust API gives applications a common interface for initiating document processes, coordinating the required trust steps and retrieving their results.

Start with one transaction your business runs today. Map the participants, actions, trust requirements and evidence, then design the integration around that process.

[Discuss your integration with Circularo](https://www.circularo.com/contact/) or [explore the developer portal](https://developers.circularo.com/).
