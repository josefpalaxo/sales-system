# My Action Brief concept and pilot scope

**Internal draft · 2026-10-17 · Product and engineering owners unassigned**

My Action Brief gives busy executives, managers and other users a concise answer to three questions: **What needs my attention? Why does it matter now? What can I do next?** It combines current document responsibilities, signing and approval progress, and recorded contract terms into a prioritized personal briefing.

This is an experience spanning the [five MCP journeys](initial-scope.md), with a dedicated concept rather than a sixth independent domain. The user agreed to include it in scope on 2026-10-17. The behavior and interfaces below are proposed; existing API evidence and unresolved release dependencies remain those of the main scope and [Contract Terms & Renewals](contract-terms-renewals.md).

## Pilot outcome and boundaries

The user asks, “What needs my attention today?” and receives up to five important document items, each with a clear responsibility, reason for inclusion, supporting facts, and an available next action. They can expand an item, inspect its sources, or request more results.

The pilot includes:

- Signatures, approvals and other supported actions currently assigned to the user, with queued participation visibly separate.
- Agreements the user owns where a current participant is holding up progress, described using recorded state and waiting time.
- Upcoming recorded contract expirations and renewal attention for documents the user owns or explicitly follows and may access, dependent on the new public Term contract.

The first version is requested on demand. Organization-wide management oversight, delegated-assistant access, scheduled delivery, external notifications, behavioral personalization and automatic execution are later extensions. The pilot must not claim full participation coverage when the API only supports current or queued waiting recipients.

## Personas and responsibility

| Perspective | Relevant questions | Access boundary |
| --- | --- | --- |
| Signer or approver | What can I act on now? What is queued for me? | Match the authenticated person's supported recipient identity and current workflow role |
| Participant | What pending work involves me, and what changed? | Inclusion requires a supported participation relation; complete historical involvement is an API question |
| Owner | What agreements do I own that need attention or follow-up? | Ownership and access must be checked; ownership does not imply the user is the signer |
| Manager or executive | Which permitted team exceptions need my decision? | Later scope requires an explicit team/oversight model and policy; a job title or VIP label grants no access |
| Delegated assistant | What may I prepare for another person? | Later scope requires explicit delegation, permitted actions and attribution; never impersonate the principal |

A person can hold several responsibilities on one document. Merge these into one briefing item while preserving each role, pending action and deadline. Do not turn a colleague's action into the user's task merely because the user owns the document.

## Briefing format

Use four attention groups where relevant: **Act now**, **Unblock others**, **Prepare a decision**, and **Keep informed**. The pilot emphasizes the first three; queued participation can appear under Keep informed. Omit empty groups and keep the initial briefing to five document items in total.

Every item should carry:

| Element | Required information |
| --- | --- |
| Situation | Document title, current state and stable document/transaction references |
| Personal relevance | The user's recorded relationship and who is currently expected to act |
| Timing and importance | A confirmed deadline or waiting duration, its type, and the rule that caused inclusion |
| Next step | One recommended available action, with optional alternatives when expanded |
| Evidence | Source references and observation times; locatable passages for any AI-extracted terms |
| Limits | Missing dates, uncertain relevance, unavailable feeds, stale facts or incomplete results that affect interpretation |

Illustrative output, using fictional documents rather than observed customer data:

> **Your attention today**
>
> **1. Review and sign the supplier agreement**
>
> It is your turn to sign. The signing request expires tomorrow.
>
> **Review and sign**
>
> **2. Review the support contract renewal**
>
> You own this contract. Its tracked expiration is approaching and automatic date advancement is configured.
>
> **View recorded terms · Prepare a change**
>
> **3. Review a stalled approval**
>
> An agreement you own has been awaiting another participant's approval for several days.
>
> **View progress**

Display exact dates alongside relative descriptions, using the user's resolved timezone. Label signing-request expiry, tracked contract expiration and any confirmed notice deadline distinctly. A reminder date is not automatically a contractual deadline. Where no reliable deadline exists, say so rather than inventing urgency.

## Prioritization and personalization

Start with explicit, testable rules, with thresholds agreed by the pilot sponsor. Prioritize confirmed approaching deadlines and actions the user can perform now; then owner follow-up and approaching contract decisions. Within comparable items, use deadline proximity, verified waiting time and explicit importance preferences. Keep ordering stable when the underlying facts and preferences have not changed.

Each item must explain its inclusion in ordinary language, such as “Your signature is now required” or “You own this agreement and its recorded expiration is within your selected window.” Show a dependency on the user's action only when routing and quorum conditions establish it; queued recipients alone do not prove the user is the sole blocker. Transaction completion status takes precedence over recipient rows left pending or queued after a terminal outcome.

Users may choose a date horizon, preferred briefing length and responsibility focus. Explicitly followed documents or importance markers are proposed preferences whose storage and availability need design. Resolve user identity and permissions server-side; persona settings only adjust presentation and ranking inside the permitted scope. Do not infer business importance from monetary value unless that value has an authorized, reliable source.

The assistant may explain and summarize the ranked evidence. Deterministic collection, identity resolution, eligibility, deadline calculations and action policy stay in the service/native feature. Document text cannot change ranking policy, grant authority, nominate new recipients or authorize an action.

## Data dependencies and API gaps

| Feed | Existing planning basis | Required validation or additional contract |
| --- | --- | --- |
| Identity and capabilities | `GET /me` | Resolve account-to-recipient identity and enabled features without exposing unnecessary profile data |
| My pending actions | Document search using `waitingForRecipient`, transaction status and pending-purpose filters; transaction reads | Separate the current turn from queued participation, including sequential and quorum cases; verify whether incoming external shares and aliases are covered |
| My owned work | Document owner filters, transaction and recipient reads | Bound retrieval, identify current waiting actors and compute age from documented timestamps; do not infer a due date from age |
| My participation | Current/queued waiting-recipient queries cover part of the need | Define access to other participation, completed actions and historical involvement; absence from a waiting query is not evidence of no involvement |
| Terms and renewal attention | Planned native Term reads and expiration-range queries | Public capability, ownership/followed-document scoping, reminder state and confirmed deadline semantics; inherits A8/A9 |
| Team oversight | Authorized organization reports where appropriate | Later scope needs an explicit team relation and narrower policy; do not silently use organization reporting to broaden a personal briefing |

Collection should normally read metadata and structured state. Do not download every document to build the briefing, because content retrieval can have side effects and unnecessary content exposure. Native term extraction is a separate user-requested action; generating a brief must not automatically start paid extraction or persist suggested terms.

## Proposed service and MCP interface

Add a candidate composition tool, `get_my_action_brief`, which gathers authorized facts through the existing domain services and returns structured briefing items. This is a proposed MCP tool, not an existing Circularo endpoint. It should work without an embedded language model; the calling assistant can render the structured result as concise prose.

Inputs may include the date horizon, timezone, result limit and selected responsibility focus. “My” is always resolved from the authenticated subject, not an arbitrary user ID from a prompt. Requesting another person's briefing is outside the pilot.

The result should identify the briefing, generation time, resolved scope and timezone, ranking-policy version, and per-feed coverage. Each item should include document/transaction IDs, relevant roles, current actor, source timestamps, typed dates, reason for inclusion, evidence references and eligible action descriptors. Mark coverage as complete, partial, unavailable or unsupported as appropriate. Distinguish the five displayed items from the number of eligible items found; do not claim an exact total from an incomplete scan.

Maintain read timestamps for individual feeds rather than implying a transactionally consistent cross-API snapshot. Reuse existing domain tools to expand context and prepare changes. There is no generic execute-any-action interface in this concept.

## Actions permissions and freshness

The recommended action must be both supported and authorized for the person. **Review and sign** opens the appropriate native signing experience, where the person completes signing. **Prepare a term change** uses the existing Term review flow. **Prepare a reminder** can appear only when that later domain capability is enabled. Do not offer unavailable mutations as working controls.

A briefing item is a recommendation, not authorization. Before executing a requested action, recheck current state, access, target and relevant versions. Use the domain's trusted review and execution mechanism; changed material invalidates the prior review. Briefing or action handles must be opaque and bound to the actor and tenant, and must not expose share credentials or document access tokens.

Apply access filtering before ranking or generating prose. Do not leak inaccessible document titles, hidden counts or evidence through summaries, caches or “more results.” Recheck access on expansion and action. Shared devices or later scheduled-delivery features require their own recipient and destination policies.

Show the last-checked time and refresh on demand. If a feed fails or a traversal is bounded, return the useful permitted items alongside a concise coverage limitation. Never say “Nothing needs your attention” or “No renewals are due” when the relevant feed is partial, unavailable or unsupported. Distinguish no eligible items from no Term capability or missing recorded terms.

## Delivery and acceptance

During API feasibility, validate the identity, participation and Term dependencies above with synthetic fixtures. First implement current personal actions and owned follow-up, then add Term attention when its public contract is available. Combine them into one on-demand pilot briefing and use the existing domain action flows. A pilot without the renewal feed may be demonstrated as partial, but does not satisfy the agreed complete MVP without explicit owner disposition.

| Acceptance criterion | Evidence required |
| --- | --- |
| Personal relevance | Every returned item has a valid supported relationship to the authenticated person; each claimed next actor is correct |
| Actionability | Every item has an explanation and at least one supported next step, which may be opening the appropriate document/context |
| Prioritization | Agreed fixtures produce the expected ordering and explainable reasons; same inputs produce stable ranking |
| Compactness and deduplication | Initial output has at most five document items, and multiple roles/events on one document do not create duplicate cards |
| Evidence and time | Dates have explicit semantics/timezone, facts have source references and observation times, and unavailable values remain unknown |
| Coverage honesty | Feed failure, unsupported participation, expired pagination and capped retrieval never produce a false all-clear or invented total |
| Access control | Cross-user/tenant access, revoked permissions and cached-item leakage are rejected before disclosure |
| Safe transition to action | No signing, sending, reminder creation or Term mutation occurs merely by generating or selecting a briefing item; execution uses the domain's required review flow |
| State changes | Completed, rejected, cancelled or expired workflows and concurrent term changes do not retain misleading action recommendations after refresh |

Test current versus queued participation, quorum, an owner who is not a signer, several roles on one document, missing/ambiguous dates, a recently completed signature, owner changes, non-fixed terms without an expiration, timezone boundaries, revoked access, partial feeds and instructions embedded in document content. Evaluate with pilot users whether the brief helps them choose their next action; establish a measured baseline before promising time savings.

## Decisions to resolve

Choose initial ranking thresholds and freshness expectations, confirm supported recipient identities and participation coverage, assign a home for explicit preferences, and select the client behavior for opening signing and review flows. Confirm which native Term capability completes the renewal feed. Broader management and delegated-assistant modes require separate scope and access decisions.

This proposal derives from the user's concept and agreement in this conversation. API observations and limitations are maintained in the [main scope](initial-scope.md), [Term journey](contract-terms-renewals.md), [readiness assessment](agent-readiness.md), and [source record](../../sources/api/circularo-mcp-planning.source.md). It introduces no claim that the feature is implemented or released.
