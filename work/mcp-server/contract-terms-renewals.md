# Contract terms deadlines and renewals MCP scope

**Internal draft · 2026-10-17 · Journey five · Planned feature FEAT-0002**

Make Contract Terms & Renewals a first-class MCP journey for the internal sales and operations pilot and the intended coordinated feature/API release. An assistant should help people identify upcoming contract work, inspect the recorded terms, propose changes, and apply only the reviewed configuration. This extends the MCP product through the ongoing life of a signed contract.

The user states that the feature and new API will ship together. The inspected public contract is 26.1.0 and contains no dedicated Term fields, expiry-range filters, or renewal/extraction paths. The feature catalog targets 26.2.0, with 15 December 2026 recorded as a target and `released: false`; its delivery evidence is a 9 October snapshot and the feature entry was updated 12 October. Treat the journey as a launch requirement dependent on the forthcoming public contract. Confirm its version and release mapping with the owners; neither the existing schema nor the snapshot proves live availability.

## User workflows and launch priorities

| Priority | User request | Expected behavior |
| --- | --- | --- |
| Launch core | Which contracts expire in the next 30, 60, or 90 days? | Query structured expiration ranges and term types, scoped to permitted documents; show owner, expiration, renewal mode, and reminder coverage where available |
| Launch core | What needs attention this week for my team? | Return contracts approaching expiration, configured upcoming reminders, and records missing useful term configuration; make missing values and partial results visible |
| Launch core | Explain this contract's recorded renewal rules | Read expiration, derived term type, renewal mode/interval, notice period, termination start, and current reminder configuration; distinguish saved data from suggestions |
| Launch core | Extend this contract's tracked expiration date to the agreed date | Preview the current and proposed values and reminder effects, then apply an authorized manual date change |
| Launch core | Configure annual automatic renewal and notify the owner beforehand | Validate the renewal configuration and required reminders together; review the resulting dates and effects before saving |
| Launch core | Remind the owner and these selected users before expiration | Configure native Circularo reminders, showing timing, timezone, recipient resolution, and any new view access |
| Launch with AI capability | Suggest the expiration and renewal terms from this contract | Invoke the native extraction capability and return reviewable suggestions with exact, locatable source passages; do not apply them automatically |
| Launch with AI capability | Apply only the date and renewal interval I selected | Preview selected values, existing-value overwrites, and cascading configuration; save only what was authorized |
| Launch with non-fixed terms | Record the start of termination for this open-ended contract | Preview the start date, notice interval, and backend-calculated expiration; record it as a tracking update |
| Launch core | What changed in this contract's terms and renewals? | Return recorded old/new values and renewal events with actor and time where available |

“What needs attention” must have explicit selection rules. Initially use expiration windows and configured reminder data. A notice deadline for avoiding automatic renewal is a distinct requirement: expose it only if the supported model records the relevant term or provides a validated derivation from confirmed data. A notice period used to calculate an open-ended contract's end date does not automatically define that deadline.

Use the native *Expiring Soon* view for parity with the product's this-week behavior where the public API supports it. A broader 30/60/90-day query is an MCP use case requiring a supported date-range filter; it must not inherit the this-week view's name or imply that the UI already offers the same preset.

## Proposed MCP contracts

These are candidate MCP tools and required capabilities, not claims about existing endpoint names. Six additional tools would bring the candidate surface to twenty-two across five journeys; expose only the caller's authorized subset.

| Candidate tool | Required public API capability | Contract boundary |
| --- | --- | --- |
| `search_contract_terms` | Search permitted documents by expiration range, term type, owner and supported renewal criteria | Return structured terms, scope, query dates/timezone, completeness, and application links; do not substitute whole-portfolio download and extraction |
| `get_contract_terms` | Read a document's authoritative Term configuration, derived fields and reminder state | Return saved values and document/configuration version; preserve nulls and distinguish tracked expiration from signing-request expiry |
| `detect_contract_terms` | Run native AI term extraction and retrieve suggestions with source locations | Read/analyze only; return suggestion IDs, values, document/content version, source quote and locators; indicate processing state and possible metered AI use |
| `prepare_contract_term_change` | Validate and preview a proposed change and its backend-derived consequences | Produce an expiring review plan for settings, manual date changes, reminder changes, selected AI suggestions or termination-start recording; create no persistent Term mutation |
| `apply_contract_term_change` | Save the exact reviewed change with concurrency protection and documented recovery semantics | Accept a trusted authorization reference and plan ID; apply once or return an explicitly unresolved outcome; return saved configuration and history reference |
| `get_contract_term_history` | Read recorded Term changes, automatic date advances and reminder-related events | Prefer documented document history where sufficient; keep raw organization audit access separately governed |

Reuse existing identity, document search, user lookup and artifact delivery infrastructure. Avoid a generic tool that can rewrite every document property. Separate preparation from execution even if the public update operation performs validation during save; do not assume a native preview endpoint exists.

## Native feature behavior the MCP layer must preserve

The supplied feature specification describes expiration, reminders, renewal rules and non-fixed terms as one related model. Let Circularo validate and compute it; the MCP service should not maintain a competing renewal engine.

- **Term type is derived.** Change the supported inputs, then read the resulting type; do not expose an arbitrary setter for a derived label. Legacy/null term data means unknown or not configured, not a conclusion that the contract has no end date.
- **Manual and automatic renewal have different effects.** Manual renewal updates the tracked expiration after a user has decided what to record. Automatic renewal advances that tracked date according to the saved interval. Neither action proves that parties amended or renewed the underlying legal agreement.
- **Expiration controls dependent configuration.** Preview the removal of reminders or renewal settings when clearing an expiration date. Preserve native required-reminder rules and disclose reminders automatically created when renewal is enabled.
- **Reminder recipients affect access.** The specification says a selected user without document rights receives view access on save. The review must identify that grant and authorize it; an ordinary reminder edit cannot conceal access expansion. Preserve owner-following and inactive-recipient fallback behavior and make retargeting visible when the API exposes it.
- **Native scheduling owns delivery.** Configure reminders in Circularo and show the resolved schedule and timezone. Do not create a second MCP scheduler that sends duplicate expiration reminders or independently advances dates. Distinguish configured reminders, successfully delivered notifications, delivery preferences, and errors.
- **Intervals use native calendar rules.** Preview backend-computed dates and validate calendar boundaries. Do not replace month/year intervals with fixed-day arithmetic in the assistant.
- **Non-fixed terms need a distinct flow.** Before termination starts, expiration can legitimately be null. Once a start is recorded, the backend derives expiration from the notice period. Recording that start does not send a binding termination notice. Sending a notice is separate future scope requiring an explicit communication workflow.
- **Signed documents still need ongoing term management.** Apply the feature's current editing rights and native validation; do not carry a signing workflow's content lock over to every Term field.

The 12 October feature/concept update describes Notifications as required while Contract renewal is on. Some generated support passages retain older status or behavior wording. Confirm final validation rules, defaults, limits, and error behavior against the release contract; do not copy unresolved documentation differences into server logic.

## AI suggestions and review

Use the feature's native extraction service and permission checks rather than adding a second extraction model to the MCP server. Planned Term/AI permissions and tenant configuration must be confirmed in the public capability contract. A host model's ability to read a PDF must not bypass those gates.

Each offered value must have an unambiguously locatable passage in the current document. Return the quote, page and locator information, and an application link or reference the selected client can use to inspect it. A quote alone is insufficient when its location is uncertain. Multi-page passages may remain valid when all source locations are known. Omit unsupported or ambiguously located suggestions; a confidence score cannot replace source traceability.

Keep suggestion generation separate from persistence. Show current values alongside proposed replacements and enumerate dependent reminders, rule changes, dates, and access grants in the review plan. Apply only the selected suggestions and explicitly authorized cascades; unrelated fields remain unchanged. Recheck document content and configuration versions before applying. A replaced file or changed configuration invalidates the earlier review.

For no extractable text, no findings, extraction failure, or no selection, make no Term mutation. Support bounded asynchronous processing where required and deduplicate repeated requests according to native support. Do not describe a retry as free or start another billable extraction merely because a chat response timed out.

## Public API requirements before launch

| Requirement | Acceptance evidence |
| --- | --- |
| Release and version mapping | Owners confirm the feature/public API release relationship, publish the target OpenAPI contract, and identify capability discovery for tenants without the add-on |
| Structured reads and portfolio queries | Term fields and reminder state are readable; expiration-range and term filters, null/legacy behavior, timezone semantics, permissions and pagination are documented |
| Reviewed updates | Supported setters cover term settings, reminders, manual expiration changes and non-fixed termination starts; derived values and cascades are returned; update concurrency and retry/recovery are documented |
| AI extraction | Public operation supports source-located suggestions, content/version binding, entitlement checks, processing/error states, and metering semantics |
| History and operational visibility | Term changes, automatic date advances and available reminder outcomes have documented history/event representations; do not assume existing webhooks cover them |
| Migration | Public responses, filters and saved-query compatibility describe the planned move from `GF_EXPIRATION` to `expiresOn`; the MCP adapter must not preserve the old field as a competing source |
| Notice and decision deadlines | Owners distinguish modeled dates from desired additional deadlines and confirm which are stored, derived, or unsupported |

The branch extraction path mentioned in the feature catalog is implementation evidence, not an automatically supported public endpoint. Do not connect MCP to private or Legacy API routes to bypass a missing public capability.

## Delivery and evaluation

Bring public-contract design for this journey into the API feasibility phase immediately. Implement a complete **find upcoming expiration → inspect terms → review a reminder or term change → save → verify persisted state and history** flow before pilot acceptance. Add **detect → inspect sources → select → review cascades → apply** as a complete AI flow when its public contract is ready. Test non-fixed termination tracking as its own path.

Release checks cover date-window and timezone boundaries; month-end/leap-year arithmetic; unknown legacy terms; missing permissions/add-on/AI setup; manual versus automatic renewal; past dates and native limits; reminder recipient access grants and owner changes; reminders falling into the past; stale plans; lost responses and duplicate updates; ambiguous source locations; multi-page sources; empty/error extraction; selected versus unselected values; and automatic date advancement racing with a manual edit.

Confirm the feature's required behavior without re-implementing its calculations or delivery engine. A planned capability that lacks a supported public operation remains an explicit launch dependency with an owner disposition, not an implied delivered tool.

## Evidence

- [Feature overview](/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/FEAT-0002-document-types-renewals.md): feature scope, planned enablement, 12 October update and branch-qualified implementation evidence.
- [Functional description](/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/support.md): functional behavior and planned migration; contains some stale generated passages requiring reconciliation.
- [Concept decisions](/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/concept.md): 12 October required-notifications decision and explicitly superseded lock discussion.
- [AI acceptance criteria](/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/FEAT-0002-document-types-renewals/stories/CIR-7223.md): source traceability, selective application, overwrites, cascades and empty/error behavior; synced 9 October.
- [Release record](/Users/josefneumann/Projects/ai-workspace/circularo-feature-db/feature-db-proposal/releases/26.2.0.md): target 15 December 2026, unreleased in the inspected record.

The [maintained source record](../../sources/api/circularo-mcp-planning.source.md) preserves the distinction between product specification, user-requested release alignment, published API support and proposed MCP design.
