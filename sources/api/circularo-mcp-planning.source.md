---
schema_version: 1
id: source:circularo-mcp-planning
kind: source
domain: shared
title: Circularo MCP planning references
status: draft
classification: internal
owner: unassigned
last_reviewed: null
review_by: null
sources: []
relations: {}
---

# Circularo MCP planning references

References inspected on 2026-10-17 for [the MCP planning project](../../work/mcp-server/README.md). These sources support documented API behavior and comparison patterns within their stated scopes. The scope and architecture recommendations remain internal proposals. No authenticated API requests, sends, uploads, signatures, or webhook registrations were performed.

## Circularo public contract

- [Public API reference](https://sandbox.circularo.com/public/docs/).
- [Published Swagger initialization asset](https://sandbox.circularo.com/public/docs/swagger-ui-init.js), which embeds the `swaggerDoc` object. Parsed as JSON data without executing the JavaScript. Observed `info.version: 26.1.0`, `openapi: 3.0.3`, server `/api/v1/public`, 53 paths and 66 HTTP operations.
- SHA-256 of the fetched initialization asset: `3c4629685d5bcb9c3022199aa4c2e686f1ab11c1fc45e49e7fd8a205c8f28078`. This identifies the inspected asset, not a guaranteed immutable release. The temporary downloaded copy is not a maintained repository snapshot.

The public reference and schemas directly support the endpoint mappings in the proposal. They do not establish customer entitlement, deployment readiness, or operational test results. Pin a reviewed schema before implementation because the sandbox URL is mutable.

### Agent discovery and retrieval audit

Additional read-only checks on 2026-10-17 support the [agent-readiness assessment](../../work/mcp-server/agent-readiness.md):

- `https://developers.circularo.com/robots.txt` returned 200, `Allow: /`, and a sitemap URL. `https://developers.circularo.com/llms.txt` and `/llms-full.txt` returned 200 with `text/markdown` content. The index lists `.md` pages; full content begins with `version: "Legacy"`.
- [Public FAQ](https://developers.circularo.com/latest/faqs) remained reachable and described query-string `token` authentication and session-token lifetimes. These statements concern a different API model from the captured new public schema. Search also surfaced older token/sharing guides alongside a previously indexed new guide.
- The public reference's `externalDocs.url`, `https://developers.circularo.com/latest/guides`, returned 404 in a direct HTTP check. A search snippet for that page did not establish that it remained live.
- The FAQ's [OpenAPI link](https://developers.circularo.com/developers/latest/OpenApi3.json) resolved to `https://circularo.com/api/full/26.1.0/OpenApi3.json`: OpenAPI 3.0.3, version 26.1.0, 321 paths and no `servers` value.
- A fresh direct GET of `https://sandbox.circularo.com/public/docs/swagger-ui-init.js` returned an internal-platform schema with `/api/v1`, query-token security, 321 paths and 389 operations. Asset SHA-256: `36bbdd92e0fab6bef39bdf0475f64e7e46097e260c3387d5c9322f94606e39ce`. The effective URL remained the public asset URL.
- A fresh browser tab at the public reference displayed the new API and `/api/v1/public`. A later asset GET with both `Referer: https://sandbox.circularo.com/public/docs/` and `Cache-Control: no-cache` matched the earlier public asset SHA-256 `3c4629685d5bcb9c3022199aa4c2e686f1ab11c1fc45e49e7fd8a205c8f28078`. This establishes differing retrieval observations, not their cause or a change to the deployed API implementation. A10 remains unresolved.
- Static inspection of that identified public snapshot found 66 unique operation IDs, 66/66 summaries and descriptions, 135/135 parameter-entry descriptions, and 704/704 direct schema-property descriptions. Nine operations advertise `Idempotency-Key` and four advertise `If-Match`. These are documentation-coverage counts, not operational tests or proof that every constraint is encoded.
- An existing-report lookup at `https://is-agentic.com/api/v1/report?url=https%3A%2F%2Fdevelopers.circularo.com%2F` returned 404 with `code: report_not_found`. No report score is claimed and no new public scan was started.

Direct HTTP and browser observations complement search/web extraction; some machine-readable URLs were fetchable over HTTP even when the web extraction tool could not read them. A11 records the current/Legacy discovery and guide-link publication work. No authenticated API execution was added by this audit.

## Circularo developer documentation

Confluence pages were read through the connected Atlassian tools. Version numbers identify the inspected editions; URLs may later change content.

| Reference | Inspected page version | Scope |
| --- | --- | --- |
| [26.1.0 API Changelog](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1059323906/26.1.0+-+API+Changelog) | 3 | Release changes; contains paths and fields beyond the inspected public API surface |
| [Introduction](https://circularo.atlassian.net/wiki/spaces/DQ/pages/56852736/Introduction) | 25 | API purpose, API-key identity and permissions |
| [Guides](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1078788137/Guides) | 93 | Task-based documentation structure |
| [FAQ](https://circularo.atlassian.net/wiki/spaces/DQ/pages/65044581/FAQs) | 13 | Test-environment effects, keys, signing, pagination and rate limits |
| [Getting Started](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080262717/Getting+Started) | 92 | End-to-end integration sequence and public base URL |
| [Signing and Approvals](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080524853/Signing+Approvals) | 92 | Transaction model, routing and states |
| [Documents and Files](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080459497/Documents+Files) | 92 | File/document distinction and content lifecycle |
| [Robust Integrations](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080230024/Robust+Integrations) | 91 | Error handling, idempotency, pagination and concurrency |
| [Retry requests safely](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080230054/Retry+requests+safely) | 91 | Per-operation key reuse; finite replay retention and payload mismatch |
| [Page through collections](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080557743/Page+through+collections) | 91 | Cursor-only requests, pagination envelopes and traversal end conditions |
| [Guard concurrent writes](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080328412/Guard+concurrent+writes) | 91 | ETag and per-endpoint If-Match semantics |
| [React to events with webhooks](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080262889/React+to+events+with+webhooks) | 91 | Organization scope, admin setup, HMAC, single delivery attempt |
| [Send a document from a template](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080459457/Send+a+document+from+a+template) | 91 | Template roles, routing, explicit send settings; discrepancy below |
| [Collect the evidence of a signed document](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080328382/Collect+the+evidence+of+a+signed+document) | 91 | Timeline, audit PDF, completion certificate and premature-request conflict |
| [Administration](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080459567/Administration) | 91 | Organization members, roles, groups, administrative permissions and audit scope |
| [Reporting](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080557773/Reporting) | 91 | Organization-wide reports and dashboards, access and calculation scope |
| [Report on organization transactions](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080230094/Report+on+your+organization+s+transactions) | 91 | Report rows, document-creation filters, timing, counts and recipient state |
| [Read dashboard data](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080557793/Read+a+dashboard+s+data) | 91 | Configured dashboard discovery, example consumption series, chart labels and variable availability |
| [Search audit logs](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080230074/Search+the+audit+logs) | 91 | Audit filters, request correlation, restricted visibility and IP redaction |

**Open discrepancy A1:** The template guide describes `send.fieldValues` and `send.recipients[].fieldIds`; neither appears in the corresponding public input schema inspected above. Support and contract completeness remain unknown pending API-owner disposition. The planning project excludes these features from committed MVP scope. This is a working finding, not a resolution or approved product claim.

**Open coverage question A7:** The inspected public paths contain no dedicated usage-balance, subscription, or billing endpoint. `currentUser.subscriptionId` identifies a subscription without returning its allowances or balances. Dashboard examples include consumption identifiers but do not establish remaining transaction/SMS/KYC credits, licensed-seat limits, reset dates, or billing semantics. These questions require API-owner disposition; activity counts must not be presented as subscription balances.

## Contract terms and renewals planned feature

The user supplied the feature description and requested a coordinated feature/API release and focused MCP scope on 2026-10-17. Read these external local records without modifying the feature repository:

- FEAT-0002 feature overview, `/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/FEAT-0002-document-types-renewals.md`, `updated: 2026-10-12`: planned Term feature, add-on and permission context, and branch-qualified implementation evidence.
- Functional description, `/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/support.md`, generated from a 2026-10-09 story snapshot: Term behavior, reminders, renewal, non-fixed terms, AI and migration. Some sections retain contradictory old status text or earlier behavior wording; do not use those as current delivery evidence.
- Concept decisions, `/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/concept.md`: required Notifications while renewal is enabled, dated 2026-10-12; also marks earlier document-state locking discussion as superseded. Confirm final public validation rather than resolving all source differences in this planning project.
- CIR-7223 acceptance criteria, `/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/stories/CIR-7223.md`, synced 2026-10-09: source-located suggestions, selective application, overwrite review, dependent settings and empty/error behavior.
- Release record, `/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/releases/26.2.0.md`: `date: 2026-12-15`, `released: false`; target planning evidence, not proof of release.

These references support planned product requirements, not an approved public API contract or commercial commitment. Packaging statements remain attributed to the feature catalog; final commercial entitlement and permission mapping need their accountable owners. The public schema inspected for this project has no dedicated Term/renewal/extraction paths or Term fields in document, creation, search or report schemas. A8 records the open release/version and public-contract dependency; A9 distinguishes modeled expiration from additional notice/decision deadlines. The dedicated [Term journey proposal](../../work/mcp-server/contract-terms-renewals.md) preserves those limits.

## Docusign comparison

- [MCP overview supplied by the user](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus), browser-rendered; page displayed last updated 2026-09-30.
- [Sample use cases](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con0fca1485-bf4d-461b-b109-a406e376e655.html&_LANG=enus), browser-rendered; page displayed last updated 2026-10-02.
- [API versus MCP guidance](https://www.docusign.com/blog/developers/query-agreement-data-agreement-manager-api-mcp-server), read through web access.

These primary vendor sources support interaction-pattern comparisons. Examples and marketing statements do not prove Circularo parity or universal client support. Scheduling and downstream actions require the relevant host or agent capabilities.

## MCP protocol references

- [Current specification](https://modelcontextprotocol.io/specification/2026-07-28), the destination of `/specification/latest` on inspection.
- [Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).
- [Security best practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).
- [Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools).

Protocol requirements apply to their stated revision. Select implementation and compatibility targets against the pilot clients before engineering commitments.
