---
title: Unified Trust API evidence and review
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
---

# Unified Trust API evidence and review

This is the internal claim register for the sales drafts. Documentation establishes what is described in the supplied API and release notes; it does not establish availability in every customer deployment, measured business results, or approved public messaging. No live API execution was performed.

## Sources and authority

| Source | Scope and handling |
| --- | --- |
| [API specification](unified-trust-api.json) | OpenAPI 3.0.3, titled Circularo API for Integrators, version 26.1.0. Its introduction explicitly describes a focused subset. Direct evidence for the documented operations and fields, with omissions noted below. |
| [26.1.0 API Changelog](https://circularo.atlassian.net/wiki/spaces/sd/pages/1000898990/26.1.0+-+API+Changelog) | Read through the authenticated Atlassian connector on 6 October 2026. Page version 8, updated 28 July 2026. Direct evidence for the described release changes. The [local copy](26.1.0%20-%20API%20Changelog.md) contains the relevant passages. |
| Josef's supplied positioning notes | Attachment titled “The central differentiation should be orchestration, not API breadth.” Direction for the narrative, not product or messaging approval. Its phrase “Approved messaging” does not establish repository approval. |
| Approved commercial records | Current records listed below constrain packaging. Their precise rules remain in those records. |

## Claims selected for the sales story

“Verified documentation” below means the statement is directly visible in the source, not that the implementation has been tested or externally approved.

| Buyer message | Evidence locator | State and boundary |
| --- | --- | --- |
| Coordinate document workflows and recipient actions | `GET /definitions/workflows`; `POST /documents`; `POST /share`; schemas `requestSharesPostShare` and `requestSharesShareData` | Verified documentation. Actions include view, edit, sign, execute, approve, review and accept. Routing includes sequence, parallel groups, mandatory actions and quorum. This supports the orchestration positioning; it does not prove a general policy engine or legal authority verification. |
| Apply identity requirements for external participants | `requestSharesShareData`: `kycFactors`, `kycProviders`, `allowedOAuths`, `oauthFactors`; `entitySharesOauthFactor` | Verified documentation. The KYC factors include ID verification, liveness detection and selfie with ID. These are controls for external recipients. A provider field does not prove a universal provider catalogue or availability. |
| Check identity data against the intended participant | Changelog sections 2 and 3, KYC identity matching and stricter result verification | Verified release documentation. Accepted document types and expected identity data are checked beyond provider approval. Request fields are absent from the supplied subset; confirm implementation and provider configuration before demoing. |
| Coordinate electronic and digital signing | Specification `info.description`; document signing and share signing operations | Verified documentation at capability level. The supplied start-signing schemas enumerate `internalUsb` and `internalNfc`; generic descriptions refer more broadly to providers. Do not extrapolate to arbitrary providers, qualified status or universal assurance levels. |
| Apply a certificate seal and a trusted timestamp | `PUT /documents/seal/{version}`; schema `requestDocumentsPutSeal` | Verified documentation. `certificate` and `timestamp` are distinct options; timestamp description identifies a TSA. State and rights requirements apply. Qualified status is not established by this field. |
| Retrieve evidence of the document process | `GET /documents/{id}/audit`; `POST /logs/search`; `POST /search/reports` | Verified documentation for audit PDF, activity logs and reporting. No claim that this captures every external system event, provides immutable archival storage, or guarantees a legal outcome. Log visibility is role dependent. |
| Generate a Certificate of Fulfillment | Changelog section 2; audit endpoint summary | Verified release documentation. Changelog defines the `cof` query option; the supplied operation omits it from its parameters. Confirm the target deployment before demoing this option. The certificate is not presented as regulatory certification. |
| Return progress to the originating application | `GET /webhooks`, `POST /webhooks`; `requestWebhooksPostWebhook` | Verified documentation. Event notifications and optional HMAC verification are described. Retry, ordering, delivery guarantees and event catalogue need separate confirmation. |
| Reduce duplicated integration and workflow work | Inference from common API coverage across the preceding capabilities | Inferred buyer value, to be validated against the customer's current architecture. No quantified time, cost or integration reduction is established. |
| Provide an interface an AI application can call | API authentication, workflow and webhook capabilities | Inferred use case. No agent-specific authorization, delegation, guardrails, MCP interface or autonomous execution product is established. Keep AI secondary. |

## Specification gaps that affect demonstrations

The sources share the 26.1.0 version label but differ in detail. Treat these as documentation gaps to reconcile, rather than selecting one as the whole truth.

| Gap | Practical consequence |
| --- | --- |
| Changelog adds `kycDocumentTypes` and `kycExpectedData`; supplied share schema omits both | Obtain the complete current request schema for an identity-matching demo. |
| Changelog defines `cof`; supplied audit operation lists only the path ID | Confirm the Certificate of Fulfillment request with Product or the full API reference. |
| Changelog moves template settings into `shareSettings`; supplied template schema does not expose that object | Use a reviewed template configuration. Old-shaped requests can succeed while silently discarding settings, according to the changelog. |
| Changelog adds `preparationDraft`, document `shareSettings` and `forcePdfA`; supplied create/upload schemas omit relevant additions | Do not build sample payloads solely from this subset for these features. |
| Workflow tag describes configuration broadly; supplied definition operations retrieve definitions | Say “use configured workflows.” Do not claim this subset lets a caller create arbitrary workflow definitions. |

An existing integration also needs a release migration review of error identifiers, status handling and template settings. Keep this engineering task outside the main sales pitch, but include it in technical handoff.

## Governed dependencies

For the proposal draft, Josef's subsequent commercial correction is the explicit task basis. It disagrees with parts of the API access and plan-eligibility records listed below. See [Commercial correction review](commercial-review.md) for the discrepancy and owner reconciliation; do not treat the corrected draft as an approved revision of those records.

These stable IDs refer to records in the parent sales repository, which is not included when this working folder is zipped. Read the current record at quotation time; do not copy its precise rules into the drafts.

- `commercial-rule:api-access` — REST API Access and Consumption, approved revision 1, review due 26 November 2026.
- `commercial-rule:add-on-plan-eligibility` — Add-On and Plan Eligibility, approved revision 1, review due 26 November 2026.
- `commercial-rule:automated-transactions` — Automated Transaction Entitlement, approved revision 1, review due 26 November 2026.
- `commercial-rule:sandbox-environments` — Developer and Non-Production Sandbox Environments, approved revision 1, review due 26 November 2026.

`conflict:automated-transactions-inclusion` and `conflict:transactional-document-storage-limits` are resolved. `conflict:add-on-workspace-scope` remains open and material, with an overdue review; the drafts make no workspace-scoped entitlement promise. The existing `deck:unified-sovereign-trust-platform` is draft and has no registered source lineage, so it is not used as capability proof. `company:circularo` is reviewed, not approved, and supplies no general corporate proof.

## Decisions for accountable owners

| Decision | Review responsibility |
| --- | --- |
| Approve the Unified Trust API name, category and orchestration message | Product Marketing and Product; CSO for commercial consistency |
| Confirm release availability, provider coverage, workflow configuration and the schema gaps | Product and Engineering |
| Confirm the configured signature, seal, timestamp and identity assurance for the chosen use case | Product and the responsible trust or legal specialist |
| Validate the intended demo including failure paths and retrieved evidence | Solutions team |
| Approve any commercial offer using current governed records | CSO or delegated commercial owner |
| Approve the exact copy for the intended external audience | Accountable messaging owner |

The present pack is complete as an internal draft. These decisions are required to turn it into approved external material; they are not presumed completed.
