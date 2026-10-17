# Circularo API readiness for AI agents

**Internal assessment · 2026-10-17 · Public discovery and documentation checks plus schema inspection**

The new public API is a strong foundation for a curated MCP service. Its public documentation is not yet a dependable starting point for an unfamiliar agent. The highest-priority work is to give agents a consistent route to the correct API family, version, authentication instructions and task guides, then prove representative workflows against the pinned contract.

This assessment covers public discovery, the captured public schema, current browser output, and read-only HTTP retrieval. Authenticated agent workflows have not been evaluated. Findings about publication do not establish that the underlying API implementation is broken.

## Readiness by area

| Area | Assessment | Evidence and implication |
| --- | --- | --- |
| Public discovery | Needs launch work | The developer site's agent index leads to legacy material; the reference's integration-guide URL returns 404 |
| Machine-readable documentation | Useful infrastructure already present | `robots.txt`, `llms.txt`, `llms-full.txt`, and Markdown content are served; their routing and API-family context need reconciliation |
| New public API comprehensibility | Strong documented foundation | The captured public schema has 66 unique operation IDs, all 66 operations have summaries/descriptions, all 135 parameter entries have descriptions, and all 704 direct schema properties have descriptions |
| Contract selection and consistency | Needs investigation | Browser and direct asset retrieval exposed different API families at the same Swagger initialization URL; both identify version 26.1.0 |
| Safe repeated execution | Promising documented support, evaluation pending | The captured public schema advertises idempotency on nine operations and conditional writes on four; support is endpoint-specific |
| Five-journey coverage | Incomplete for the intended release | Subscription balances and the forthcoming Term capabilities remain explicit public-contract dependencies |
| MCP usability | Designed, not demonstrated | Candidate task tools exist in the scope proposal; client compatibility, trusted review and recovery still need implementation and tests |

## What is already good

The captured new public contract is substantially easier to consume than a broad internal platform schema. It uses task-oriented resources, typed filters, clear account introspection through `GET /me`, documented permissions, a uniform error envelope, pagination, and asynchronous export handles. Its descriptions explain important relationships, including finding transactions through documents and templates supplying routing rather than every send-dialog preference.

The public schema uses OpenAPI 3.0.3, declares `/api/v1/public` and a bearer API-key security scheme, and has 53 paths. This is suitable input to a typed adapter and curated MCP tools. OpenAPI completeness alone does not decide which business action is appropriate or supply trusted authorization.

The developer site already has machine-readable entry points. [robots.txt](https://developers.circularo.com/robots.txt) returned 200, allows crawling and names a sitemap. [llms.txt](https://developers.circularo.com/llms.txt) and [llms-full.txt](https://developers.circularo.com/llms-full.txt) returned 200 as Markdown, and the index links individual `.md` pages. These are useful conveniences; the content they point to matters more than the mere presence of the files.

## Concrete discovery and consistency findings

### The agent index leads to the legacy documentation

The retrieved `llms-full.txt` begins with `version: "Legacy"`. The `llms.txt` index points to older authentication, session-token and sharing scenarios. The public [FAQ](https://developers.circularo.com/latest/faqs) teaches passing `token` as a query parameter and describes session-token lifetimes. This is a different integration model from the new public API's bearer-key-only approach.

Legacy documentation remains necessary for existing integrations. Make its API-family identity explicit in the index, search-facing page titles, and examples, and give the new API a prominent current entry. An agent should not have to reconcile the generations from endpoint examples. Update search metadata and canonical links where appropriate without removing valid historical material.

### The reference links to a missing guide

The [public reference](https://sandbox.circularo.com/public/docs/) links its integration scenarios to `https://developers.circularo.com/latest/guides`. A direct HTTP request returned 404, although search results still contained a previously crawled guide at that URL. Publish or redirect that exact link to the current public task guides and check it in release CI.

### Contract retrieval can expose a different API family

The earlier public Swagger asset capture and the current browser show the new public interface. During this audit, fetching the same initialization URL directly returned a different embedded schema:

| Retrieval | API version | Paths and operations | Base and authentication | Asset SHA-256 |
| --- | --- | --- | --- | --- |
| Earlier public capture; later request with Referer and no-cache headers matched it | 26.1.0 | 53 paths, 66 operations | `/api/v1/public`, bearer API key | `3c4629685d5bcb9c3022199aa4c2e686f1ab11c1fc45e49e7fd8a205c8f28078` |
| Direct refresh during this audit | 26.1.0 | 321 paths, 389 operations | `/api/v1`, query-string token; description identifies internal platform API | `36bbdd92e0fab6bef39bdf0475f64e7e46097e260c3387d5c9322f94606e39ce` |

URL: `https://sandbox.circularo.com/public/docs/swagger-ui-init.js`. The browser continued to display the new public API. A later HTTP request with both `Referer: https://sandbox.circularo.com/public/docs/` and `Cache-Control: no-cache` returned the smaller public contract. The observations establish variation, not its cause; cache, deployment, header handling or another serving issue needs investigation.

Separately, the developer FAQ's advertised [OpenAPI download](https://developers.circularo.com/developers/latest/OpenApi3.json) resolved to `https://circularo.com/api/full/26.1.0/OpenApi3.json`, with 321 paths and no `servers` entry. A full/internal contract is useful in its own scope, but it cannot serve as the unqualified new public API download. A shared `26.1.0` label does not distinguish the API families.

Publish a clearly linked, standalone, versioned public OpenAPI file. Identify API family, release, supported base paths and authentication explicitly; provide a digest or equivalent release identity. Verify that browser rendering, plain HTTP retrieval, agent discovery and generated clients consume that same artifact.

## What would make it straightforward for agents

| Priority | Change | Acceptance criterion |
| --- | --- | --- |
| P0 | Reconcile public contract delivery and publish a canonical public schema URL | All tested retrieval contexts return the same pinned public contract; full/internal and Legacy contracts have distinct identities |
| P0 | Route the developer landing page, agent index and guides to the new API | An agent given only the developer domain finds the correct schema, bearer authentication and quickstart without private Confluence access |
| P0 | Reconcile guides and schema | Template prefilling/field-ID support has a documented disposition; examples validate against the intended schema and deployed sandbox |
| P0 | Specify the coordinated Term release contract | Expiry-range queries, Term changes, source-located AI suggestions, permission gates and history have supported public mappings |
| P0 | Publish task and side-effect guidance | Every launch journey has a minimal request sequence, preconditions, permissions, side effects, terminal states and recovery examples |
| P1 | Make constraints and operation policy easier for tools to consume | Express cross-field request alternatives in schemas where possible; give curated tools accurate safety metadata and enforce permissions and trusted review in the server |
| P1 | Document bounded recovery | Clarify idempotency retention and scope, retryable error classes, version conflicts, cursor expiry, incomplete downloads and one-attempt webhook delivery |
| P1 | Keep agent-friendly material synchronized | Generate schema links, concise Markdown tasks, current/Legacy routing and MCP tool contracts from reviewed versioned sources; release CI checks links and examples |

For example, the captured `createTransaction` schema explains alternatives such as `documentId` versus `document` and the need for `apply` or `send` in property descriptions, but has no top-level `required` or composition constraint enforcing those alternatives. Improve machine validation while retaining the explanations. Descriptions are valuable, but executable constraints reduce invalid requests before they reach the API.

Expose the five agreed journeys through the MCP tool catalog, with compact structured results and clear error/recovery instructions. Keep raw endpoint and internal configuration discovery out of the ordinary user's tool list. Native feature discovery should explain which capabilities are enabled for the account, including Term and AI eligibility, without exposing credentials or private configuration.

## Evaluation before claiming agent readiness

Run a discovery test where the agent receives only the public developer domain. It must find the intended API, use its correct authentication model, and identify the right task guide and schema without being handed the sandbox or internal Confluence URLs.

Then evaluate representative synthetic scenarios across all five journeys. Include ambiguous documents, missing role assignments, restricted users, organization-report access, expiry queries, uncertain AI source locations, review before mutation, timeout after a processed send, stale changes and duplicate execution. Score correct completion, clarification, unauthorized-action prevention, wrong-API selection, and recovery separately. Publish a readiness claim only for the versions and clients actually evaluated.

No completed Is Agentic report was available for the developer root: its read-only report endpoint returned `report_not_found` during this audit. No numeric readiness score is claimed. A generic site score would supplement these tests rather than establish API workflow correctness.

Evidence and retrieval limits are recorded in the [source record](../../sources/api/circularo-mcp-planning.source.md). Publication findings are tracked as A10 and A11 in the [initial scope](initial-scope.md).
