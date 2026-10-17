# Circularo MCP server initial scope and recommendations

**Draft for internal discussion · 2026-10-17 · Published API baseline 26.1.0 · Term release API contract pending**

Build a focused interface that lets an AI assistant find Circularo documents, explain transaction progress, prepare and send a reviewed transaction, retrieve its completed result and evidence, answer authorized questions about administration and usage, and manage contract terms, deadlines and renewals throughout a contract's life. Begin with a short product brief and concrete user tasks; use those tasks to define the tool contracts and implementation plan.

The user confirmed internal sales and operations as the first pilot audience and requested administration, reports, and usage as a fourth journey on 2026-10-17. Customer and partner releases are later expansion options. All tool names, phases, controls, and targets below are proposals. API observations are documentation evidence, not results of authenticated sandbox testing.

The user also requested Contract Terms & Renewals as a focused launch capability and states it will ship with the new API. Add it as journey five. The inspected 26.1.0 contract remains the baseline for existing mappings; the feature catalog targets 26.2.0, and its public API support and version mapping are release dependencies, not established availability. See the [dedicated Term journey scope](contract-terms-renewals.md).

## Recommended approach

Use a lightweight master plan now to establish purpose, audience, boundaries, and decision gates. Develop the detailed implementation plan after choosing the priority use cases and validating their API contracts.

1. **Agree the product brief.** Identify the first users, their current tasks, the first AI clients, the deployment model, and what counts as a successful pilot.
2. **Write and rank user scenarios.** For each, specify the input, expected answer or action, required permissions, possible side effects, and failure behavior. Choose representative scenarios across the five journeys, including organization reporting, an administrative lookup, and an end-to-end contract term update.
3. **Benchmark Docusign against those scenarios.** Borrow useful interaction patterns and identify capability gaps. Keep the comparison bounded to the decisions it can improve.
4. **Map the selected scenarios to the public API.** Confirm request fields, permissions, transaction states, retry support, file handling, and documentation discrepancies before committing scope.
5. **Define MCP contracts and architecture.** Specify tool schemas, results, approval behavior, identity, and operational state. Generate the API adapter from the agreed schema where useful; curate the MCP surface around user tasks.
6. **Build and evaluate one complete workflow.** Demonstrate finding a template, reviewing an exact request, sending once, tracking the outcome, and retrieving the result. Expand only after that flow passes the pilot gates.

This sequence produces a reviewable scope early while allowing API validation and user feedback to shape the engineering plan.

## Initial user scenarios

The ranking reflects a proposed internal pilot, not measured customer demand. Validate frequency, value, risk, and effort with actual users before fixing the backlog.

| Priority | User request | Required behavior | Boundary |
| --- | --- | --- | --- |
| P0 | Find the Acme agreement | Search permitted documents; return candidate IDs, titles, status, and application links | Ask the user to select when several records match; do not infer a legal counterparty from a title alone |
| P0 | Who still needs to sign this agreement | Retrieve the transaction and explain active and queued recipients, purposes, and terminal status | Queued recipients are distinct from people whose turn has begun |
| P0 | Prepare our standard NDA for these recipients | Resolve an allowlisted signing template, cast its roles, and show the exact proposed send request | Preparation is an MCP service operation; it does not start a Circularo transaction |
| P0 | Send the NDA I just reviewed | Execute the unchanged, authorized plan and return document and transaction IDs | Missing recipients, changed settings, expired approval, or changed template require review |
| P0 | Get the completed agreement and its evidence | Check completion, retrieve the signed file and requested audit or fulfillment PDF, and deliver authenticated artifacts | Distinguish a running audit trail from a completion certificate; surface download side effects |
| P0 | Summarize agreement volume and completion time for the sales team | Retrieve an authorized report, group by validated owner or creator IDs, and compute clearly defined metrics | State the cohort, timezone, date field, successful-outcome filter, and whether every page was retrieved |
| P0 | Show our available usage and consumption figures | Discover dashboards, run a relevant configured dashboard, and explain its returned series | Discover names at runtime; remaining balances and billing limits are an open API gap |
| P0 | Which accounts are suspended, and who has administrator access | List authorized users by status or role and return the minimum relevant fields | API permission and explicit organizational data-access policy both apply |
| P1 | Who changed this user's access last week | Search permitted audit records by subject, time, and relevant activity types | State whether history is personal or organization-wide; report only the detail actually recorded |
| P1 | Show agreements awaiting action for more than seven days | Use transaction filters in document search and show the filter dates and completeness of results | Explain pending versus queued; never label a partial page as the entire portfolio |
| P1 | Remind this pending signer | Preview the recipient and channel, recheck eligibility, send once, and record the result | External notification; email first, SMS deferred |
| P1 | Cancel this transaction because the terms changed | Show the target and reason, obtain authorization, then cancel | A cancelled document cannot simply start another transaction; a new process requires cloning |
| Launch target pending Term API | Which contracts expire or require renewal attention next quarter | Query structured Term fields and supported expiration ranges; return recorded renewal rules and responsibility | Require the forthcoming public Term query contract; distinguish expiration from a separate notice deadline |
| Launch target pending Term API | Configure renewal reminders or record a manual extension | Review and save native Term configuration, dates and reminders, with recorded history | Show dependent configuration and any recipient access grants; tracked date changes do not establish legal renewal |
| Launch target pending Term AI API | Suggest contract dates and apply only what I select | Return source-located native AI suggestions, preview overwrites/cascades, then apply authorized values | No automatic application or ambiguous-source suggestions; use native feature permissions and version checks |
| Later | Summarize obligations and compare clauses | Retrieve permitted content and return grounded excerpts with document and page references | Text extraction, OCR, and analysis need their own design; MCP does not supply agreement intelligence by itself |

Plan five complete user journeys: **find and track**, **prepare and send from a template**, **collect the completed result and evidence**, **administer and understand organization activity and usage**, and **manage contract terms deadlines and renewals**. Start the fourth journey with read-only insights and lookups; add reviewed administrative actions in a later iteration. Design the fifth journey's public API contract alongside the feature so it can join the intended coordinated launch.

## Journey five contract terms deadlines and renewals

Treat ongoing contract management as a core product journey with its own [detailed scope](contract-terms-renewals.md). Include structured expiry/renewal queries, recorded-term inspection, reviewed manual date changes and renewal configuration, native reminders, non-fixed termination tracking, and native AI suggestions with locatable source passages. Preserve the feature's derived term types, dependent settings, access effects, permissions and audit history.

The launch target is a complete **find upcoming work → inspect terms → review change → save → verify** journey, plus a source-review flow for AI suggestions when its public capability is ready. Circularo owns reminder delivery and automatic advancement of tracked dates. The MCP layer must not duplicate that scheduler, infer binding renewal, or treat recording termination as sending a notice.

Six new candidate tools are described in the dedicated scope, with required API capabilities rather than invented endpoint mappings. The existing public 26.1.0 schemas inspected here expose no dedicated Term fields or expiry-range filters; the new contract must close that gap. Cross-reference this journey from portfolio reporting, while keeping document-level access and organization reporting permissions distinct.

## Journey four administration reporting and usage

This journey serves operations managers, designated administrators, and sales leaders who need to understand adoption, processing performance, access, and capacity. Its access can differ from an individual salesperson's document access. The tool layer must enforce that distinction even when the upstream API permits an organization-wide read.

| Area | Example questions | Initial coverage |
| --- | --- | --- |
| Administration | Which accounts are suspended or awaiting activation? Who has the admin role? Which users belong to this group? | Read users, roles, statuses, and group memberships; discover groups where authorized |
| Access troubleshooting | Why can I not send externally or use this feature? Which users hold a required right? | Explain the caller's `GET /me` rights/settings and supported user-right filters; do not claim a complete permissions audit for another user |
| Reports | How many documents created last month completed successfully? What is their median signing time? Which owners have the largest outstanding workload? | Filter report rows, retrieve the required pages, and calculate defined metrics over the stated cohort |
| Usage and adoption | Which teams or users create documents and initiate transactions? What consumption figures are available? | Discover and run configured dashboards; supplement with permitted report aggregates where appropriate |
| Audit and investigation | Who changed a member or group? What happened during this failed request? | Search audit records by subject, activity, date, actor, or request ID within the caller's allowed scope |
| Capacity and subscription | How many transaction credits, SMS credits, KYC checks, or seats remain? When do allowances reset? | Capture as required questions; resolve authoritative balance and limit access with the API owner before promising answers |

### Data sources and access

- `GET /reports` returns one row per document across the organization and requires `use_all_documents_export`. Rows include transaction status, start/final-state times, duration, owner, creator, recipients, and activity counts. The name of the permission does not mean the tool has to export a file.
- `GET /dashboards` discovers the dashboards available to the account; `GET /dashboards/{name}` returns their computed series. The guide shows examples such as `trans_consumption` and `docs_consumption`, but dashboard availability depends on instance configuration. These endpoints require `use_document_management` and organization membership; they do not require the report permission. Apply a separate MCP policy for access to organization-wide figures.
- `GET /users` and `GET /users/{id}` require `view_users`. User filters support status, role, group, and required rights. Group discovery through `GET /groups` requires `view_groups` and the `organization_admin` permission profile. Do not request admin credentials merely to answer ordinary user questions.
- `GET /audit-logs` requires `view_logs`; an organization administrator sees organization-wide records, while other callers have a restricted view. Preserve upstream redaction and minimize personal and verification data in results.
- The inspected public contract has no subscription, billing, or dedicated usage-balance endpoint. `GET /me` returns a `subscriptionId`, but that is not a balance or entitlement ledger. The changelog's subscription additions do not establish public endpoint availability. Keep remaining credits, allowances, resets, and licensed-seat headroom as open question A7.

Sources: [Administration](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080459567/Administration), [Reporting](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080557773/Reporting), [Transaction reports](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080230094/Report+on+your+organization+s+transactions), [Dashboard data](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080557793/Read+a+dashboard+s+data), [Audit logs](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080230074/Search+the+audit+logs), and the public schemas.

### Metric definitions and limits

Distinguish operational activity, product adoption, and metered subscription consumption. Counts of documents, transaction actions, or users are not automatically billable units or licensed-seat consumption. Do not subtract them from an assumed allowance.

Reports filter by document creation time. “Documents created last month that are now completed” is a different question from “transactions completed last month.” The latter requires filtering `completedAt` in the service after retrieving a sufficiently complete cohort, or another validated data source; the public report has no completion-date query filter. A partial or narrowed scan cannot establish an organization-wide total.

For each derived metric, return the source, organization scope, observation time, date range and timezone, cohort, numerator/denominator or aggregation, and completeness. Compute successful signing time from `status: completed` rows with valid `durationMs`; explain self-signed zero-duration results. The `completedAt` field also represents other final states, so its presence alone does not prove success. Do not treat report `actionCount` as the number of transactions.

Dashboards have predefined calculations and no arbitrary period or team filter in the public run endpoint. Preserve their labels and values; dashboard labels are not API status enums. Confirm units, period, and reset semantics before interpreting a consumption series as a capacity measure. Comparisons over time require validated time buckets or retained authorized snapshots.

### Administrative actions after the read-only pilot

Keep member provisioning, suspension/reactivation, role changes, and group membership changes in this journey's later backlog. Give each an explicit target, proposed change, access impact, and trusted authorization step. Member deletion additionally needs document-ownership disposition. Expose narrow operation-specific tools only after validating endpoint behavior and recovery. API-key lifecycle and subscription/billing changes need separate scope decisions.

## What to learn from Docusign

Docusign's [overview](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con1438e5dd-ae84-435f-8b2e-028117782a6d.html&_LANG=enus) describes curated tools and permissions. Its [sample use cases](https://support.docusign.com/s/document-item?language=en_US&bundleId=ug3906200f-95c6-4a6b-90b1-f928c85961c6&topicId=con0fca1485-bf4d-461b-b109-a406e376e655.html&_LANG=enus) span retrieval, analysis, creation, tracking, completion, downstream actions, and workflows. It distinguishes direct chat, platform scheduling, and custom agents.

| Pattern | Circularo implication |
| --- | --- |
| Find an agreement and inspect its progress | Start with document search and transaction status |
| Review an assembled request before sending | Add service-level preparation and authorization around transaction creation |
| Retrieve completed output | Include final files and evidence in the first complete journey |
| Analyze contract terms | Treat as a separate content and analysis capability with its own evidence requirements |
| Schedule work and update other systems | Let an authorized host or orchestration service own scheduling and downstream connectors |

The comparison suggests a useful interaction model, not Circularo feature parity. A potential Circularo emphasis is explicit recipient routing and a convenient result-and-evidence handoff; validate its value with pilot users. Docusign also [distinguishes conversational MCP interactions from predictable bulk API integrations](https://www.docusign.com/blog/developers/query-agreement-data-agreement-manager-api-mcp-server); retain ordinary API integrations for routine bulk transfers.

## API findings that shape the scope

The [live public reference](https://sandbox.circularo.com/public/docs/) identifies OpenAPI 3.0.3, API version 26.1.0, and base path `/api/v1/public`. The inspected contract contains 66 operations across 53 paths. Use that contract to map public tools; the [release changelog](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1059323906/26.1.0+-+API+Changelog) also discusses paths and fields outside this published public surface.

| Finding | Design consequence |
| --- | --- |
| API keys act with the issuing account's permissions; application session tokens are refused | Establish an explicit user-to-account credential binding; a hosted MCP login alone does not establish Circularo authority |
| Transactions have no separate search endpoint | Find them through documents and use the returned transaction IDs |
| A document has one transaction, including after cancellation | Do not implement a generic restart action on the same document |
| Creating a transaction starts sending or applies the caller's signature | Keep preparation separate; there is no assumed transaction dry-run endpoint |
| Signing templates supply document defaults, fields, and routing | Explicitly configure verification, recipient permissions, reminders, expiry, and messages; web-app send-dialog prefills do not carry over |
| The template guide includes `send.fieldValues` and recipient `fieldIds`; the inspected public schemas omit both | Open discrepancy A1 below; do not commit these features to the MVP until the API owner reconciles the contract |
| Document search has typed filters including `transactionStatus`, `waitingForRecipient`, `pendingPurpose`, and `waitingSince` | Expose validated task filters; avoid an arbitrary search DSL |
| Metadata date fields match exactly; the inspected public contract has no dedicated Term query fields | Journey five requires the forthcoming structured Term and expiration-range contract; generic metadata search is not a substitute |
| The FAQ gives a 60-second cursor lifetime; cursor requests carry the cursor alone | Do not hold upstream cursors across long conversations; use bounded retrieval and service continuation handles with expiry |
| Create endpoints support idempotency selectively; `POST /transactions` explicitly accepts `Idempotency-Key` | Persist one operation key per authorized send and reuse it on retries |
| Webhooks cover organization-wide document events, require admin setup, and are attempted once | Add HMAC verification, prompt durable receipt, access-filtered processing, and periodic reconciliation if event-driven monitoring is enabled |

Sources: [Introduction](https://circularo.atlassian.net/wiki/spaces/DQ/pages/56852736/Introduction), [FAQ](https://circularo.atlassian.net/wiki/spaces/DQ/pages/65044581/FAQs), [Signing and Approvals](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080524853/Signing+Approvals), [Templates guide](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080459457/Send+a+document+from+a+template), [Pagination guide](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080557743/Page+through+collections), [Webhook guide](https://circularo.atlassian.net/wiki/spaces/DQ/pages/1080262889/React+to+events+with+webhooks), and the public schemas.

### Release changes to handle explicitly

The changelog makes the following items relevant to contract validation and pilot tests:

- **Errors:** preserve `type`, HTTP status, and `requestId`; handle unknown types. Classify retryability using operation safety and the new catalog rather than message strings or status alone. State conflicts and invalid references need correction, not blind retries.
- **Downloads:** main-file retrieval and exports can mark a document or share as viewed and cause notifications. Keep metadata lookup separate from content retrieval, describe the effect, and verify the public download behavior in the sandbox. A GET method is insufficient evidence of a side-effect-free tool.
- **Template settings:** the release moves settings into `shareSettings` on the endpoints it discusses, and the old shape can silently lose settings. The public template surface inspected here is read-only and the public send request has its own recipient settings; do not copy the changelog's request shape into it.
- **PDF conversion:** the release protects existing signatures unless conversion is forced. The public upload schema inspected here exposes `convertToPdfA`, not the changelog's `forcePdfA` field. Preserve signed content and do not expose an unsupported conversion switch.
- **Permissions:** custom fields have an entitlement requirement; external sharing behavior changed. Validate the actual account rights and `settings.canShareWithExternalUsers` from `GET /me` and apply any stricter pilot policy.
- **Privacy:** organization audit logs have role-dependent visibility and redaction. Expose a bounded audit lookup only to authorized users in journey four; never elevate credentials to obtain missing fields.

## Candidate MCP tool surface

These are proposed service contracts, not existing Circularo endpoints. Return concise structured results with stable IDs, observed timestamps, application links, and explicit result completeness. Include only fields needed for the request.

| Candidate tool | Public API mapping | Pilot behavior |
| --- | --- | --- |
| `get_connection_context` | `GET /me` | Minimal account identity and effective capability summary; omit configured signatures and unnecessary personal data |
| `search_documents` | `POST /documents/search` | Typed filters, bounded results, document and transaction references |
| `get_document` | `GET /documents/{id}` | Metadata and references; no automatic file download |
| `get_transaction` | `GET /transactions/{id}`; recipients endpoints when needed | Current transaction and recipient progress; handle all terminal states |
| `list_templates` | `GET /templates` | Available allowlisted signing templates |
| `get_template` | `GET /templates/{id}` | Roles, routing, fields, and source document reference |
| `prepare_transaction` | Read template, document, and account as needed | Persist and return a validated plan, expiry, and exact review summary; no transaction creation |
| `send_prepared_transaction` | `POST /transactions` with `Idempotency-Key` | Execute the unchanged authorized plan; persist identifiers and outcome |
| `get_document_history` | `GET /documents/{id}/history` | Machine-readable lifecycle events with bounded output |
| `retrieve_completed_result` | Transaction/document reads; `GET /files/{id}/content`; `GET /documents/{id}/audit-trail`; `GET /documents/{id}/certificate-of-fulfillment` | Retrieve only requested artifacts after state and access checks; report individual failures |

The first three journeys use the ten tools above and assume existing templates and documents. Journey four adds six read-only candidate tools, made available according to the caller's rights and the pilot's data-access policy:

| Candidate tool | Public API mapping | Pilot behavior |
| --- | --- | --- |
| `get_transaction_report` | `GET /reports` | Typed report filters, bounded traversal, defined aggregates and explicit completeness |
| `list_dashboards` | `GET /dashboards` | Discover available identifiers; avoid hard-coded dashboard availability |
| `run_dashboard` | `GET /dashboards/{name}` | Return the permitted computed series with observed time and known metric semantics |
| `list_users` | `GET /users` | Filter by status, role, group, rights, or supported search; minimize returned profile fields |
| `list_groups` | `GET /groups` | Authorized group discovery for the organization administrator |
| `search_audit_logs` | `GET /audit-logs` | Bounded investigation with time and subject filters, visible scope, and preserved redaction |

These sixteen tools cover the first four journeys. The [six Term journey tools](contract-terms-renewals.md) bring the candidate surface to twenty-two, with their public mappings pending the new contract. Individual users need only their authorized subset. Usage questions initially compose dashboard and report tools. A dedicated balance-summary tool depends on A7 and must not be implemented with guessed entitlements.

Add `remind_recipient` and `cancel_transaction` after the P0 journeys are reliable. They map to `POST /transactions/{id}/recipients/{recipientId}/remind` and `POST /transactions/{id}/cancel`. The recipient reminder endpoint documents a once-per-day limit; SMS also needs permission and credit.

Defer arbitrary uploads until a pilot client proves its file transfer path. A remote server cannot read a path on the user's computer. Support client attachment handles or an authenticated upload flow into `POST /files`, with file limits, content checks, retention, and tenant binding. Keep raw binaries and base64 PDFs out of ordinary model context. Existing content and template sends allow the first pilot to proceed without solving every client's upload UX.

MCP resources can later expose small, authorized document summaries and workflow guidance; prompts can provide optional guided interactions. Tools must remain usable without optional UI, prompts, resource subscriptions, or client-specific extensions. Resource reads must enforce the same access policy and disclose any side effects.

## Proposed architecture

Use a thin MCP service with a generated or typed Circularo API adapter and an explicit workflow layer. Keep language-model reasoning in the calling assistant; the initial server does not need an embedded model, vector database, or its own general agent framework.

The request path is: **MCP transport → authenticated identity and tenant binding → policy and input validation → workflow service → Circularo public API adapter**. A secret store supplies upstream credentials. An operation store holds prepared plans, authorization records, idempotency keys, outcomes, and temporary artifact references. Polling or a separately operated webhook receiver updates known transactions.

| Decision | Initial recommendation |
| --- | --- |
| Language | Prefer the team's maintained backend language; TypeScript is a candidate, subject to SDK and team review |
| Transport | Streamable HTTP for a hosted product; optionally stdio for isolated local development |
| Protocol compatibility | Pin an SDK and tested protocol revision for the selected clients; the current specification resolves to 2026-07-28, so test compatibility instead of assuming older initialization/session behavior |
| API compatibility | Keep 26.1.0 as the inspected baseline; pin the coordinated-release contract once published, including Term capabilities, and review adapter/tool impact before upgrades |
| Identity | Per-user Circularo credential bindings for interactive access; a dedicated account only for an explicitly scoped service workflow |
| Hosting | Select region, isolation model, and operator based on target tenants and data handling requirements |
| Runtime state | Explicit durable operation handles; do not rely on a chat connection or protocol session to preserve approval or deduplication |
| Monitoring | Start with on-demand status and bounded polling; add authenticated webhooks and reconciliation when the use cases justify them |

For a protected remote service, implement MCP OAuth authorization and discovery; keep its access token separate from the Circularo API key. Validate the MCP token's audience and bind its authenticated subject to an authorized stored upstream credential. Never forward the MCP token as a Circularo credential or accept an arbitrary account supplied by the model. See [MCP authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).

### Authorization and safe execution

For the pilot, require review of sends, reminders, cancellations and persistent Term changes. Read access remains governed by connection consent and per-tool policy. The review must show the environment/account, document or template, resolved recipients and roles, routing, message, verification, expiry, and notification effects as relevant. Term reviews additionally show current/proposed values, calculated dates, selected AI sources, dependent configuration and access grants.

Bind authorization to the authenticated actor, tenant, payload digest, source state, and expiry. A model-supplied `confirmed: true` is not authorization evidence. The execution endpoint must validate a trusted user decision or an explicitly configured standing policy. Recheck access and relevant source state; changed material invalidates the plan. The operation key makes a repeated request return the same outcome instead of sending again.

Enforce policy at execution even when a tool was hidden during discovery. Never use an organization-admin key as a general substitute for the caller's permissions. Scope caches, artifacts, and operation handles to their owner and tenant; recheck access when reading them. Keep API keys, signing links, verification secrets, and document content out of ordinary logs.

Treat document text, metadata, and webhook payloads as untrusted data. They cannot authorize sending, change recipients, or override server policy. Use configured Circularo destinations; exclude arbitrary HTTP calls, URL imports, and model-selected callback URLs from the initial surface. See [MCP security guidance](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).

Use accurate tool annotations, but enforce controls in code: [MCP tool metadata](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) does not create an authorization boundary.

### Reliability and output handling

- Persist the exact send payload and idempotency key before the outbound request. On timeout, reconcile or retry under the documented endpoint guarantee; after an unknown retention window, return an unresolved outcome instead of issuing a fresh send.
- Honor `Retry-After`, cap retries, and use backoff for safe transient failures. Do not automatically retry non-idempotent notifications or restart a transaction after a conflict.
- Use `If-Match` only on endpoints documenting it. A `412` requires state review; do not automatically replace the version and repeat an approved mutation.
- Keep upstream cursors internal to a bounded traversal. Return a service continuation handle or a clear restart instruction; state whether results are partial. Do not claim a consistent snapshot after restarting an expired traversal.
- Check transaction status rather than inferring completion from individual recipient rows. `completed`, `rejected`, `cancelled`, and `expired` are distinct terminal outcomes.
- Return files through a client-tested authenticated artifact route with tenant checks and short retention. Surface content type, filename, provenance, and failure state. Do not manufacture a public URL or expose the upstream key.
- If webhooks are added, require HMAC validation over the raw body, durable enqueue before acknowledgment, duplicate-safe processing, and scheduled reconciliation. Organization-wide events must not broaden any user's read access.

## First release boundaries

Include document discovery, transaction status, signing-template discovery, reviewed template sends, history, completed output retrieval, and authorized read-only administration, reports, dashboards, and audit investigation. Include Contract Terms & Renewals as a coordinated-launch target with the public capability and acceptance gates in its dedicated scope. Restrict sends to a pilot template allowlist and approved recipient verification profiles. Include operational usage insights where the configured data supports them; remaining subscription capacity depends on A7.

Defer self-signing, sealing, free-form field placement, KYC personal-data entry, recipient reassignment or delegation, direct signing links, template authoring, account/key changes, general permission administration, destructive deletion, broad exports, and unattended bulk sends. Explicitly reviewed native reminder-related view grants belong to the Term journey. Administrative mutations remain a later iteration of journey four. Advanced verification can remain part of a later approved profile without exposing identity documents or national identifiers to the assistant.

External scheduling, email/Slack delivery, CRM writes, and other systems are orchestration capabilities with their own permissions. Configuring native Circularo expiration reminders belongs to the Term journey; their execution stays in Circularo. Scope downstream connector work separately.

## Delivery phases and acceptance gates

| Phase | Deliverable | Gate to proceed |
| --- | --- | --- |
| 1 Product scope | Audience, primary clients, five user journeys, exclusions, proposed owners, and success measures | Product and technical owners agree representative scenarios and organization-level data access |
| 2 API feasibility | Baseline and coordinated-release schemas, public Term requirements, endpoint/permission matrix, resolved documentation questions, synthetic sandbox fixtures | API and feature owners confirm release/version alignment and required capabilities; file and identity paths are feasible |
| 3 Find and track | Authenticated connection context, search, metadata, and transaction status | Representative queries resolve correctly; denied and cross-tenant requests fail safely |
| 4 Reviewed sending | Preparation, trusted authorization, idempotent send, operation recovery | Changed plans are rejected and repeated sends do not duplicate transactions |
| 5 Results and evidence | History and completed artifacts with client compatibility evidence | Users can retrieve the correct completed outputs and distinguish incomplete evidence |
| 6 Administration reports and usage | Authorized user/group and audit lookups, reports, available dashboards, metric definitions, and A7 disposition | Correct access scope, complete or explicitly partial aggregates, and no unsupported balance claims |
| 7 Contract terms and renewals | Structured queries, reviewed settings/reminders, native AI evidence flow, non-fixed terms and history | Published public capabilities satisfy the dedicated Term journey gates; missing capabilities receive explicit release disposition |
| 8 Pilot acceptance | Telemetry, runbook, and cross-client evaluation | Pilot users complete representative scenarios across all five journeys and operational failure cases pass |
| 9 Product release | Customer onboarding, supported hosting/client matrix, credential lifecycle, support and change policy | Product, engineering, and security owners approve production readiness |

Estimate staffing and dates after phases 1 and 2 expose identity, file-transfer, hosting, and API-gap work. Those dependencies can outweigh the endpoint adapter itself.

Proposed pilot targets, to agree before implementation:

- At least 90% successful completion on an agreed set of representative user prompts, with tool selection, clarification, and final outcomes scored separately.
- Zero unauthorized sends, duplicate transactions, or cross-tenant disclosures in the release test suite; any such failure blocks release.
- Every mutation has actor, authorization reference, operation ID, payload digest, upstream request ID when supplied, and final or explicitly unresolved outcome.
- Users can distinguish queued, pending, and terminal outcomes and can retrieve artifacts in each supported pilot client.
- Organization-wide insights are denied when the MCP policy disallows them, even when the account has upstream access. Every metric identifies its cohort, period, source, and completeness; unavailable balances are reported as unavailable.
- The Term journey returns correct structured deadline queries, preserves native scheduling and calculations, and applies only reviewed changes. Every offered AI value has a valid current-document source location; reminder access grants are explicit.
- Establish a baseline for task time and API latency, then agree a measured improvement target. Do not claim savings before measurement.

Test ambiguous document names; missing or mistyped recipients; restricted accounts; missing template roles; external-sharing denial; stale approvals; timeout after a processed send; duplicate execution; 429/503; 409/412; unknown error types; expired cursors; rejection/cancellation/expiry; incomplete artifact downloads; and injected instructions inside documents. Journey four also needs tests for report versus dashboard permissions, denied organization-wide access, personal versus organization audit visibility, redaction, empty dashboard lists, missing usage semantics, partial pagination, creation versus completion dates, timezone boundaries, and unsupported quota questions. Run the dedicated [Term journey release checks](contract-terms-renewals.md#delivery-and-evaluation) for journey five. Add webhook-loss and replay cases only when that component is included. Use synthetic documents and designated test recipients: the API has no no-effect test mode.

## Decisions needed before implementation

| Decision | Proposed starting point | Who should resolve it |
| --- | --- | --- |
| Business outcome for the confirmed internal audience | Faster agreement preparation and follow-up, with reliable visibility into organization activity, access, and usage | Product owner and pilot sponsor |
| Representative scenarios across five journeys | Find and track; prepare and send; collect results; administer/report usage; manage contract terms, deadlines and renewals | Pilot users and product owner |
| Coordinated feature/API launch | Confirm version mapping, target public Term contract, entitlement semantics, migration and native AI support | Product, feature and API owners |
| Organization insight access and metric definitions | Name permitted reporting/admin roles, approved cohorts, and authoritative activity/consumption definitions | Operations sponsor, API owner, and security |
| Primary clients | Select one reference client and one additional client for compatibility testing | Product and engineering |
| Delivery model | Hosted service if the intended release serves customers; local isolation can support early development | Engineering and security |
| Circularo identity binding | Per-user keys for interactive use; define secure onboarding, rotation, revocation, and account-switching behavior | API and security owners |
| Pilot data and templates | Synthetic data, allowlisted locked signing templates, named test recipients | Pilot sponsor and API owner |
| Mutation authorization | Review each exact action in the pilot; design the trusted review mechanism for the selected clients | Product, engineering, and security |
| Data handling | Agree hosting region, content access, artifact retention, and audit retention | Security and product |
| Production ownership | Assign product, API contract, service operations, and support responsibilities | Sponsor and engineering |

### Open API questions

| ID | Question or discrepancy | Impact and required disposition |
| --- | --- | --- |
| A1 | The template guide documents `send.fieldValues` and recipient `fieldIds`; the live 26.1.0 public schema omits both | Unresolved documentation discrepancy. API owner must reconcile support and schema; exclude prefilling and assignment by field ID from committed scope until then. No source is silently treated as correct |
| A2 | Which release notes apply to each public operation, including read-state notifications and conversion behavior | API owner to confirm mapping; verify public downloads against synthetic records before assigning side-effect annotations |
| A3 | What are the idempotency retention period, key scope, in-flight behavior, and guarantees for each candidate mutation | Required to define recovery after ambiguous sends; reminder endpoints do not advertise the transaction-create idempotency header |
| A4 | Can the service detect template changes reliably before execution, and what concurrency protection applies to transaction creation | Required for a meaningful review-to-send guarantee; do not assume document `If-Match` applies to `POST /transactions` |
| A5 | What are supported upload sizes, processing timeouts, and signed-artifact delivery options for selected clients | Determines when arbitrary uploads and artifact retrieval can graduate from pilot to product |
| A6 | What credential-provisioning and user-delegation model is supported for a hosted customer service | Required before customer rollout; web-app OAuth login is not evidence of API-key delegation |
| A7 | Which supported public interface supplies subscription allowances, remaining transaction/SMS/KYC balances, reset dates, and licensed-seat headroom; what do consumption dashboards measure | The inspected public contract has no balance/subscription endpoint. API owner must define units, periods, metering, permissions, and any endpoint enhancement. Activity insights can proceed; remaining-capacity answers cannot be inferred from counts |
| A8 | Which API contract/version will ship with Contract Terms & Renewals, whose feature catalog targets 26.2.0 while the inspected public API is 26.1.0 | User requests coordinated launch. Confirm the release relationship and supported public Term reads, queries, updates, AI source locators, permissions, concurrency, history and migration; see dedicated journey requirements |
| A9 | Which contract decision/notice deadlines are represented beyond expiration and non-fixed termination calculations | Do not derive a non-renewal cutoff from an unrelated notice period; confirm the model and supported calculations before promising deadline-specific answers |

The maintained [source record](../../sources/api/circularo-mcp-planning.source.md) records versions, access dates, and evidence limits. Resolve A1 with the API owner and preserve the outcome before extending template tools.
