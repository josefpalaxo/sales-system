# Circularo MCP server planning

Internal working project for scoping a Circularo MCP server, using public API 26.1.0 as the inspected baseline and defining requirements for the planned Contract Terms & Renewals release.

**Status:** initial proposal, 2026-10-17. Product and engineering ownership are unassigned. This project does not establish approved product capability or authorize external publication.

[API readiness for AI agents](agent-readiness.md) assesses discovery, understanding and reliable execution. The new public schema has strong descriptive coverage; current/Legacy routing, the missing guide link and differing Swagger asset responses need release-owner attention before claiming effortless agent discovery.

Start with [Initial scope and recommendations](initial-scope.md). It covers five journeys: find and track; prepare and send; collect results and evidence; administer and understand organization activity and usage; and manage contract terms, deadlines and renewals. It includes candidate tools and public API mappings, architecture, release gates, and decisions needed before implementation. [Contract terms and renewals](contract-terms-renewals.md) has a dedicated journey scope covering queries, reviewed updates, native reminders, source-grounded AI suggestions, and public API requirements.

The [source record](../../sources/api/circularo-mcp-planning.source.md) identifies the live references and their limits. The main unresolved API question concerns template `fieldValues` and `fieldIds`, which appear in the guide but are absent from the published schema inspected on 2026-10-17.

The user confirmed internal sales and operations as the first pilot audience and requested administration/reporting/usage and contract terms/renewals as explicit scope on 2026-10-17. Recommended next step: agree pilot clients, representative scenarios across the five journeys, account identity, organization reporting access, and the forthcoming Term API contract; then turn the candidate tool contracts into an implementation backlog. Remaining subscription balances and billing limits need an API-owner decision because the inspected public contract has no dedicated endpoint for them. The requested coordinated feature/API launch also needs version alignment: the feature catalog targets 26.2.0, while the inspected public API is 26.1.0.
