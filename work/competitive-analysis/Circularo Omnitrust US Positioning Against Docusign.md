# Circularo and OmniTrust US positioning against Docusign

Prepared 30 September 2026 for Circularo and OmniTrust commercial planning. **Internal working draft for review; not approved for publication.** The 40% saving is a launch pricing target, as confirmed by the requester, not a demonstrated customer average. Public pricing and plan inclusions were checked on this date.

## Recommended positioning

**Lead with practical control over business documents, supported by a compelling price.** Use Circularo Business to win teams that need signing, approvals and document organization. Use Circularo Enterprise to win organizations that also need their own domain and email identity, centralized access administration and operational oversight. Introduce OmniTrust’s cryptographic governance when the buyer has a corresponding security requirement.

The proposed umbrella message is:

> **Your documents. Your identity. Your control.**
>
> Circularo brings document preparation, approvals, signing and follow-up into a connected business process. Choose Business for everyday team workflows, or Enterprise for your own domain and email infrastructure, centralized access management and greater oversight. Together with OmniTrust, extend selected workflows with enterprise-controlled identity and cryptographic trust.

This is a positioning recommendation derived from the supplied competitive analysis, Enterprise appendix and the [published joint solution](https://omnitrust.com/partners/omnitrust-circularo/). The partnership page establishes the architectural proposition; it does not establish that every integration or OmniTrust service is included in a Circularo subscription.

For the US launch, translate the master analysis’s sovereignty narrative into buyer language: recognizable customer communications, IT control, accountable approvals and verifiable documents. Keep UAE PASS, Nafath and GCC government shared services as relevant international background. They are unlikely to be the primary reason a typical US business switches signing platforms.

## The benefits to emphasize

### Keep the customer relationship under your identity

**Buyer message:** “Make signing requests recognizable as part of your business.”

Enterprise includes Custom Domain and Custom E-mail Identity. The latter uses the customer’s own mail infrastructure; the domain capability makes Circularo accessible through an organization-owned address. This is a more precise proposition than generic branding. It gives IT and customer-facing teams concrete controls to evaluate and demonstrate. See the [Enterprise appendix](</Users/josefneumann/Projects/ai-workspace/sales-system/work/enterprise-quotation-appendix/Circularo Enterprise Included Add-ons Appendix.md>), [email documentation](https://help.circularo.com/en/add-on-custom-email-identity) and [domain documentation](https://help.circularo.com/en/add-on-custom-domain).

Demonstrate a request from an organization-controlled sender and access through an illustrative address such as `sign.example.com`. Verify the complete recipient journey in the configured environment before promising that every link uses that domain. Domain customization does not change SaaS hosting or give the customer control of all infrastructure. Logos, styling and application naming have separate scope.

Docusign offers branding. Frame this comparison around the buyer’s exact domain, sender and mail-routing requirements; do not claim that Docusign has no branding or custom-email capability. The master’s specific AWS SES claims require current technical confirmation before use in external copy.

### Give operations a way to keep agreements moving

**Buyer message:** “See what is waiting, resolve ownership problems and act before renewal dates.”

The Enterprise appendix includes Advanced Reporting, Transaction Controller and Contract Deadlines & Renewals. Together, these create a useful demonstration: find a stalled approval, let an authorized controller resolve ownership, complete signing and set up contract follow-up. Controller access to metadata does not automatically grant access to document contents.

Sell the usefulness of this included combination. Reporting and ownership transfer are not exclusive to Circularo, and renewal tracking alone does not establish equivalence to a full contract lifecycle management system. The [master analysis](</Users/josefneumann/Projects/ai-workspace/sales-system/work/competitive-analysis/30-09-2026-Circularo Competitive Positioning Master.md>) itself recognizes Docusign’s strength in advanced agreement management.

### Put enterprise administration into the package

**Buyer message:** “Bring signing into your existing employee access and business systems.”

Enterprise includes SAML single sign-on, SCIM user provisioning, REST API access and third-party data pre-fill, according to the supplied appendix. Explain the practical benefits: fewer separate logins, less manual account administration and less rekeying of business information.

This is principally a packaging advantage to test against the customer’s Docusign quote. Docusign places SSO in its sales-assisted offering, and it also offers APIs. Circularo API access does not include implementation or automated transaction consumption. Apply [commercial-rule:api-access](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/commercial-rules/api-access.md>) and [commercial-rule:automated-transactions](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/commercial-rules/automated-transactions.md>) when quoting. [Docusign US plan comparison](https://ecom.docusign.com/en-US/plans-and-pricing/esignature).

### Connect business workflows to OmniTrust’s trust infrastructure

**Buyer message:** “Apply your identity and cryptographic governance to the documents that matter.”

The joint page assigns document collaboration, workflow, verification and signing to Circularo. OmniTrust contributes ILM governance for certificates, keys, secrets and signatures, plus PKI infrastructure for issuance, validation and revocation. This creates a credible enterprise conversation about who controls signing credentials, their lifecycle and the evidence associated with a transaction. [OmniTrust and Circularo](https://omnitrust.com/partners/omnitrust-circularo/).

**Recommended sales use:** Make this an expansion path for customers with an identified assurance requirement. Quote OmniTrust products, integration, certificates and services explicitly. Confirm the supported integration and evidence-preservation design in the proposed deployment. Do not imply that the public joint-solution description proves a turnkey integration for every use case.

Docusign also supports PKI-based signatures and trust-service integrations. The competitive question is how the proposed solution meets the customer’s governance requirements, not which vendor “has cryptography.” [Docusign digital signatures](https://www.docusign.com/products/digital-signature).

## How to position Business and Enterprise

The following is a dated working comparison, not a replacement for the quotation. Circularo entries were checked against the rendered [plan matrix](https://www.circularo.com/pricing/#compare-plans); Enterprise scope is also supported by the supplied appendix. “Paid” means separately priced, not included in the base plan.

| Capability | Circularo Business | Circularo Enterprise |
| --- | --- | --- |
| Signing, approvals, shared templates, document versioning and search | Included | Included |
| Custom domain and customer mail infrastructure | Paid | Included |
| SAML single sign-on | Paid | Included |
| SCIM provisioning | Not offered in this plan matrix | Included |
| Advanced reporting, Transaction Controller and renewal tools | Paid | Included |
| REST API, third-party pre-fill and PDF form field recognition | Paid | Included |
| AI Document Assistant | Paid | Included; customer AI provider usage is separate |
| Custom Web Forms, Custom Upload Form and Custom Application Name | Not offered in this plan matrix | Paid |
| Custom branding/styling, custom signing certificate, KYC and qualified trust services | Paid | Paid |

**Business sales message:** “An affordable workspace for signing, approvals and organized business documents.” Target routine team workflows and demonstrate preparation, review, signing and retrieval. Price required add-ons before presenting savings. Business should not inherit the Enterprise benefits in launch copy.

**Enterprise sales message:** “Your signing service, integrated with your identity and operations.” Lead with the included combination of domain, mail identity, employee access management and transaction oversight. Compare against the Docusign configuration that actually satisfies those requirements, including an Enhanced or IAM proposal where appropriate.

**Plan boundary:** Both plans are SaaS. Customer-hosted infrastructure and sovereign multi-tenant shared services require a separately scoped Ultimate opportunity. See [edition-model:plan-edition-deployment](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/editions/plan-edition-deployment.md>). Custom domain is not private hosting; several departments in one organization are not independent sovereign tenants.

## A fair Docusign comparison

| Buyer requirement | What the comparison should establish |
| --- | --- |
| Routine team signing | Docusign Standard already includes branding and collaborative comments. Demonstrate Circularo’s document workflow fit; avoid presenting basic signing as unique. |
| Forms, payments or mass distribution | Business Pro includes web forms, payment collection and bulk send. Circularo Custom Web Forms is a paid Enterprise extension. Verify payment requirements and licensed bulk capacity before declaring an equivalent replacement. |
| Centralized employee access | Compare Circularo Enterprise’s included identity administration with the relevant Docusign sales-assisted configuration. |
| AI and agreement automation | Docusign offers AI-assisted summaries and broader IAM functionality. Circularo’s assistant is a supporting feature, not evidence of AI superiority or full IAM parity. |
| Customer identity and trust governance | Demonstrate the configured Circularo domain/mail experience and, where needed, the separately scoped OmniTrust solution. Ask both suppliers to document the same requirements. |

Docusign observations above come from its [US pricing page](https://ecom.docusign.com/en-US/plans-and-pricing/esignature), its [digital-signature offering](https://www.docusign.com/products/digital-signature), and the supplied master analysis. A feature absent from an online pricing table is not evidence that Docusign cannot provide it.

## How to use the 40 percent pricing target

Use the US annual-prepaid baseline for the US launch. The supplied [Australian page](https://ecom.docusign.com/en-AU/plans-and-pricing/esignature) displays Australian-dollar pricing and should not anchor a US-dollar savings claim.

The US page initially displayed annual commitments billed monthly. Selecting **Annual | Billed upfront** showed the following prices on 30 September 2026. [Docusign US pricing](https://ecom.docusign.com/en-US/plans-and-pricing/esignature).

| US benchmark | Annual prepaid per user | Monthly equivalent | Circularo price required for 40% lower base subscription |
| --- | --- | --- | --- |
| Docusign Standard | US$300 | US$25 | US$180/year, or US$15/month equivalent |
| Docusign Business Pro | US$480 | US$40 | US$288/year, or US$24/month equivalent |
| Docusign Enhanced or negotiated enterprise offering | Customer quote | Customer quote | 60% of the comparable annual price |

These are arithmetic pricing targets, not approved Circularo offers. Circularo’s annual pricing view displays Business from $24 per user/month; confirm the US currency, applicable term and partner offer before publication. Enterprise remains quote-based. [Circularo pricing](https://www.circularo.com/pricing/).

A US$24 Business offer would be **40% below Business Pro but only 4% below Standard** on base annual subscription price. The pricing calculation does not establish feature parity or an average saving. At 25 users, the illustrative annual base totals would be US$7,200 versus US$12,000 for Business Pro, before tax, additions and services.

**Recommended launch CTA:** “Get a side-by-side quote for your actual signing workflow.”

**Conditional copy after the US offer is approved:** “Circularo Business from US$24 per user/month, billed annually — 40% below Docusign Business Pro’s US annual-prepaid list price.” Place the comparison date and scope beside it: base subscription only; features, allowances, add-ons and services differ. Recheck the benchmark at publication.

Keep “40% cheaper on average” out of public copy until there is a defined, representative set of matched US comparisons. For Enterprise, use the customer’s actual alternative quote and calculate the saving on a documented scope.

Each comparison should match user roles, annual volume, document grouping, API/bulk usage, required identity services, support, migration and implementation. Separate recurring subscription savings from first-year total cost. Include OmniTrust charges when comparing the joint solution. Do not inflate the Docusign baseline with functionality the customer does not need.

## Transaction economics need a workflow check

The observed public plans list 120 pooled transactions per Business user annually for Circularo and 100 envelopes per user annually for Docusign Standard and Business Pro. These are different charging units. A Docusign envelope can contain multiple documents and recipients; Circularo describes a transaction as a request to process a document. Do not advertise “20% more signing” without replaying representative customer workflows. [Circularo pricing](https://www.circularo.com/pricing/), [Docusign pricing](https://ecom.docusign.com/en-US/plans-and-pricing/esignature), [Docusign transaction explanation](https://www.docusign.com/en-ca/faq/getting-started).

Use the approved internal rules by reference when preparing an offer: [commercial-rule:user-transaction-allowances](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/commercial-rules/user-transaction-allowances.md>), [commercial-rule:manual-transactions](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/commercial-rules/manual-transactions.md>), [commercial-rule:bulk-signing](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/commercial-rules/bulk-signing.md>) and [commercial-rule:transaction-fair-use](</Users/josefneumann/Projects/ai-workspace/sales-system/shared/knowledge/commercial/commercial-rules/transaction-fair-use.md>). Feature availability does not establish included consumption. Neither “unlimited everything” nor “no transaction charges” is a suitable launch promise.

## Recommended first US opportunities

These are proposed priorities, not validated market findings.

| Priority | Buyer and trigger | Opening proposition |
| --- | --- | --- |
| First | Midmarket operations, procurement and IT teams reviewing a Docusign renewal | Demonstrate one recurring document process and compare its full annual cost. Use Business where its scope fits; Enterprise where administration and identity requirements justify it. |
| First | Existing OmniTrust relationships with document approval needs | Connect a supplier agreement, engineering approval or controlled-document workflow to the customer’s trust-governance requirements. Validate the integration before selling it as included. |
| Next | Organizations extending signing across departments | Demonstrate ownership recovery, directory provisioning and contract follow-up; price the actual mix of users and usage. |
| Qualify separately | Healthcare, financial services, public sector and defense procurements with mandatory controls | Establish hosting, contractual, certification and workflow requirements before making an offer. Neither the partnership nor an international reference proves US regulatory eligibility. |

Use an agreed pilot to reduce switching uncertainty. Rebuild a small set of representative templates, test internal approvals and external signing, validate the resulting PDFs and audit records, and confirm export, access and renewal behavior. Propose rollout assistance and support responsibilities explicitly; the partnership page does not establish a US SLA or free migration service.

## Proposed campaign copy

### Landing page

**Headline:** Your documents. Your identity. Your control.

**Subheading:** Prepare, approve, sign and organize business documents with Circularo. Choose the plan that fits your team, with Enterprise options included for your own domain, email identity and centralized employee access.

**Partner message:** For workflows that need deeper trust governance, Circularo and OmniTrust connect document processes with identity, certificate and cryptographic lifecycle controls. Joint-solution scope is configured and quoted for your requirements.

**Benefits:** Keep approvals moving. Make signing requests recognizable. Simplify employee access. Bring contract follow-up into the process.

**Primary CTA:** Compare your Docusign renewal.

**Secondary CTA:** See your workflow in Circularo.

This proposed copy draws on the supplied Enterprise appendix and published joint solution. The 40% price line belongs beside an approved, specifically scoped offer, not in the unqualified umbrella promise.

### Short sales pitch

> Circularo gives your teams one place to prepare, approve, sign and organize business documents. Business provides the everyday workflow; Enterprise adds your own domain and email identity, centralized access management and tools to keep transactions moving. With OmniTrust, we can also scope identity and cryptographic governance for higher-assurance workflows. Let’s compare your current Docusign setup against the process you actually need and show you the cost of each option.

### Discovery questions

1. Which processes are you renewing Docusign for, and which features do people actually use?
2. Do signing requests need to use your own domain and corporate mail infrastructure?
3. Who resolves a transaction when its owner leaves or an approval stalls?
4. How do you provision users and track contract renewals today?
5. Which transactions need separately governed certificates, signing identities or trust services?
6. What volume runs through users, APIs and bulk operations, and which migration costs must the comparison include?

## Claims and decisions to resolve before launch

The positioning is usable as an internal sales framework. External copy and commercial offers require the normal owner review specified in the repository governance.

| Decision | Required confirmation |
| --- | --- |
| US offer | Confirm currency, term, price, allowances, add-ons, partner margin and support. Recheck competitor prices at publication. |
| Joint solution | Confirm supported Circularo–OmniTrust integration, deployment architecture, product licenses and responsibility for implementation and support. |
| US procurement | Confirm actual SaaS hosting and processing locations, contract terms and evidence for any required certification. Do not assert US hosting, FedRAMP, HIPAA or other sector eligibility from the partnership alone. |
| Differentiation | Demonstrate the domain and email journey. Avoid claiming Docusign lacks branding, APIs, PKI, AI or agreement management. |
| Product maturity | Keep agentic execution governance and structured eDocs out of current-plan promises. The supplied master treats these as future direction or roadmap. |
| Packaging scope | Treat custom branding, application naming, certificates, expanded archiving, KYC, AI provider usage and API consumption according to their actual quoted scope. Do not describe Enterprise as including every add-on. |

The source documents under `work/` remain non-canonical. Referenced approved commercial records are current through their stated review dates; this brief does not amend them. The open [conflict:add-on-workspace-scope](</Users/josefneumann/Projects/ai-workspace/sales-system/governance/conflicts/add-on-workspace-scope.md>) remains unresolved, and no workspace-level add-on promise is made here. The Enterprise appendix and public plan matrix are evidence for the proposed plan-specific packaging, not a newly approved commercial record.
