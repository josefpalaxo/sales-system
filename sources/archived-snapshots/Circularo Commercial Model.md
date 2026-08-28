---
title: Circularo Commercial Model
status: approved
classification: internal
audience: sales
scope: Internal Team
owner: CSO
version: 1.9
last_updated: 2026-08-28
---

# Circularo Commercial Model

# **Purpose of this document**

This document defines the commercial structure of Circularo subscriptions.

Part A summarises what we sell, describes different sales ‘layers’ and defines some basic terminology. Part B gives more detail about different aspects of our sales model and licensing structure. 

Add-Ons are defined separately in the [Add-On Master Catalogue and Sales Guide](https://docs.google.com/document/d/1rUX3qL5WYVm5yYhGwu-HjmG2_CBE4rvRKAkYSQF58wk/edit?usp=sharing).

# **Part A. Sales ‘layers’** 

1. ## **Definitions** 

This is how we define each sales ‘layer’:

* **Solutions** are where the customer sees value in the product

* **Product** is what customers, partners and the market sees Circularo selling 

* **Editions** define the maximum product/service capability and this includes **Add-Ons,** which extend product/service capabilities but only within the Editions 

* **Plan**s put a price on and limit Edition and its Add-Ons

* **Subscriptions,** which is the contractual container for Editions, any Add-Ons and Plans

* **Subscription Items**, which is the structured set of components in each invoice. 

Each of these is considered in more detail below. 

2. ## **What do we actually sell?** 

There are different ways of thinking about what we actually sell and how we present this to customers. 

In this document, we call the different aspects of our commercial model “layers” and these are summarised in the table and described in more detail below. 

| No.  | Sales Question | “Layer” | Reality |
| :---- | :---- | :---- | :---- |
| 1 | What problem are we solving? | Solution | Where a customer sees value in what Circularo offers in solving real problems |
| 2 | What are we selling? | Product | What the market understands and buys |
| 3 | What’s possible at all? | Edition | What functionality exists or does not exist |
| 4 | How is it priced? | Plan | How the Edition is priced, packaged, and constrained |
| 5 | What’s the contract? | Subscription | Who has access, for how long, under which terms |
| 6 | What’s on the invoice? | Subscription Item | What is actually billed, metered, and enforced. |

Each of these is considered in more detail below. 

3. ## **Solution (Why the customers care)**

**Question it answers:** *What problem does this solve?*

A **Solution** is a use-case story. It is **how we explain value**, not what we bill.

* Combines Product \+ Plan \+ Add-Ons \+ Credits  
* No SKUs, no pricing, no limits  
* Industry- and problem-oriented

**Examples**

* Digital Customer Onboarding Solution  
* Government Shared Signing Solution  
* Banking KYC & Contract Execution Solution

👉 Sales uses **Solutions** to start conversations and frame outcomes.

4. ## **Product (What the market recognizes)**

**Question it answers:** *What are we selling, in market language?*

A **Product** is the named offering customers understand and compare.

* Market-facing  
* Stable naming  
* Maps to one or more Editions internally

**Examples**

* Circularo Business eSignature  
* Circularo Enterprise Trust Platform

👉 Sales sells **Products**; customers buy Products.

5. ## **Edition (What exists vs does not exist)**

**Question it answers:** *What capabilities are available at all?*

An **Edition** represents standardized platform configuration and defines the product/service **capability**.

* Determines what features can be enabled  
* No pricing, no limits  
* Hard functional line (ie. and Edition is pre-configured and some features are linked only to particular edition)

**Examples**

* Start Edition  
* Business Edition  
* Enterprise Edition

👉 Edition answers **“can we do this at all?”**

6. ## **Plan (How it’s packaged and priced)**

**Question it answers:** *How is this Edition commercialised?*

A Plan commercializes an Edition by defining:

* Licensing Model (User-Based, Transaction-Based, DMS User, etc.)  
* Pricing  
* Usage limits  
* Included entitlements  
* Commercial bundles and promotions  
* What sales actually quotes

**Examples**

* Business Plan  
* Enterprise Plan

👉 Plan answers **“how much and under what limits?”**

7. ## **Subscription (The legal contract)**

**Question it answers:** *Who has access, for how long?*

A **Subscription** is the **time-bound commercial agreement**.

* Business Plan – User-Based Annual  
* Business Plan – Transaction-Based Annual  
* Customer \+ Plan \+ Term  
* Governed by Terms & Add-On Terms  
* One or more Subscription Items underneath

**Examples**

* ACME Ltd – Business Plan – Annual Subscription  
* Ministry of Finance – Enterprise Plan – 3-Year Subscription

👉 Subscription answers **“who, when, and under what contract?”**

A **Subscription** is the contractual container that binds all commercial and technical elements together. While sales interacts with Subscriptions at a high level (Plan, term, scope), internally a Subscription expands into a structured set of components including: **exactly one Subscription Model, Plan limits, optional Add-Ons,** Credits for consumption-based usage, **Server Subscriptions for self-hosted deployments, and Support Plans.** This internal structure ensures consistent billing, enforcement, and compliance across all deployments.

```
Subscription
 │
 ├─ Subscription Model (only one)
 │   ├─ User-based Subscription 
 │   │   └─ User Based Limit (per Circularo User Account)
 │   │   └─ Consumption Limit (even if unlimited, always present)
 │   │
 │   └─ Transaction-Based Subscription 
 │   │   └─ Consumption Limit(per Organization)
 │   │   └─ User Based Limit(per Organization)
 │   │
 │   └─ DMS-Only Subscription 
 │
 ├─ Plans (commercial packaging & limits)
 │
 ├─ Add-Ons (capabilities)
 │   ├─ Feature-Based
 │   ├─ Consumption-Based
 │   ├─ User-Based (applies to all licensed users)
 │   └─ Service-Based
 │
 │
 ├─ Server Subscription (only if Self-Hosted)
 │   ├─ Single-tenanted 
 │   └─ Multi-tenanted
 │ 
 └─ Support Plans (service coverage, SLA)
```

8. ## **Subscription Item (What is billed and enforced)**

**Question it answers:** *What shows up on the invoice and gets metered?*

A **Subscription Item** is the **atomic billing unit**.

* What finance team bills  
* What the system enforces  
* Recurring or consumption-based

**Examples**

* Business Plan base entitlement (recurring), described based on SKUs  
* KYC Verification Add-On (credit-based)  
* API eSigning  Transactions  
* Premium Support Plan  
* Qualified Timestamp credit pack

👉 Subscription Items answer **“what exactly are we charging for?”**

**An example** 

| No.  | Sales Question | “Layer” | Example |
| :---- | :---- | :---- | :---- |
| 1 | What problem are we solving? | Solution | Digital Customer Onboarding Solution |
| 2 | What are we selling? | Product | Circularo Business eSignature |
| 3 | What’s possible at all? | Edition | Business Edition |
| 4 | How is it priced? | Plan | Business Plan – Transaction-Based |
| 5 | What’s the contract? | Subscription | ACME Ltd – Business Plan – Annual Subscription (2026) |
| 6 | What’s on the invoice? | Subscription Item | Business Plan base entitlement API eSigning Transactions KYC Verification credit pack Plus Support Plan |

*Solutions explain value. Products sell. Plans price. Subscriptions bind. Subscription Items bill.*

# 

# **Part B. Commercial model behind sales layers** 

1. ## **Editions vs Plans**

Circularo is offered in five **Plans**, mapped to **four base Editions (configurations)**:

| Edition | Plan(s) | Deployment\* |
| :---- | :---- | :---- |
| Start | Start | SaaS |
| Pro | Pro | SaaS |
| Business | Business | SaaS |
| Enterprise | Enterprise | SaaS |
| Enterprise | Ultimate | Self-Hosted |

\*See [Deployment Modes](#deployment-modes) below for more detail

Only four base Editions exist (Start, Pro, Business and Enterprise); plans and bundles may evolve on top of them.

The Enterprise and Ultimate Editions are functionally equivalent; the only difference is deployment.

2. ## **Deployment Modes**  {#deployment-modes}

Deployment refers to the technical capability of an Edition and, in particular, the way in which a Product can be implemented. Circularo deploys products/services in two ways: 

1. ### **SaaS – Circularo Cloud**

This mode of deployment involves: 

* Circularo hosting the Product   
* Use of a third party cloud provider (Azure (EU, UAE) / Oracle Cloud (KSA))   
* The cloud provider is engaged by Circularo and is fully managed by Circularo  
* Default for Start, Pro, Business and Enterprise Plans

  2. ### **Self-Hosted (Single Tenant vs Multi-tenant)**

This mode of deployment is only available on the ‘Ultimate’ Plan. It includes either: 

**Single-Tenant Server Subscription**

* Dedicated instance per organization  
* Full isolation of data and cryptographic material  
* Typical for governments and regulated entities  
* Priced per server / environment

**Multi-Tenant Server Subscription**

* Shared platform hosting multiple organizations  
* Logical tenant isolation  
* Typical for sovereign shared services, telcos, white-label platforms  
* Priced per server / number of tenants (organizations)

We try to refer to ‘subscriptions’ when talking about SaaS and ‘licenses’ when talking about on-premises deployments. 

3. ## **Subscription Models (User-based vs Transaction-based)**

Circularo offers three Subscription ‘Models’ (sometimes called ‘licenses’) designed to align with different business needs and usage patterns. 

 

| Subscription  | Best For |
| :---- | :---- |
| **User-Based**  | Organizations where internal users regularly prepare, review, approve, and sign documents. |
| **Transaction-Based**  | Organizations with variable user counts or high volumes of external recipients where pricing is better aligned to document transaction volume. |
| **DMS-Only** | Organizations that require document management, archiving, search, retention, and lifecycle management without eSigning workflows. |

Each Subscription Model is mutually exclusive. This means that each Subscription Model is sold separately (ie. a customer must select either a user-based, a transaction-based or DMS-only subscription model), although a customer can change Models. For example, the User-based Subscription Model sets maximum numbers of Transactions that can be undertaken by each User. Each model is described below in more detail ([User-based Subscriptions](#user-based-subscriptions) vs [Transaction-Based Licensing](#transaction-based-subscriptions)).

1. ### **User-based Subscriptions**   {#user-based-subscriptions}

Under the User-based Subscription Model, the Product is “licensed” (ie. permission is given  to) a specifically **named ‘internal’** user. An ‘internal’ user is a Regular or Lite User (see[User types](#user-types)). Each User-based Subscription comes with an annual Transaction allowance. This is described below (see [Transaction Limits for User-based Subscriptions](#transaction-limits-for-user-based-subscriptions)). All Transaction allowances are pooled and consumed collectively at the organisation level.

**Characteristics**

* Subscription-based (time based restriction)  
* Controls **platform access and core capabilities**  
* Does **not** include any extras apart from human initiated transaction allowance  
* External recipients are always free and unlimited

  1. #### **User types** {#user-types}

There are 3 types of Users: 

* **Regular User**: The standard user type with full Product access. It is a ‘mandatory’ user type as it is not possible to use the Product without this type of user.   
* **Lite User (optional)**: This is a non-standard user with limited functionality. It is ‘optional’ as a customer to purchase Lite Users based on their needs. There are 3 types of Lite Users defined based on the limited functionality that each of them supports:   
  * Sign-Only: can only use the Product to sign documents  
  * Read-Only:  can only use the Product to view documents  
  * Prepare-Only: can only use the Product to prepare documents   
* **External Users** / **External Recipients:** This is a standard type of user that is external to the customer’s organization and usually is the recipient of a transaction or other actions taken by Users (eg. receives a documents for counter-signature). It is a free and unpaid type of user. 

There must always be at least one Regular User per organization. Lite Users are priced at 50% of the Regular User license. External Users / Recipients are free and unlimited.

2. #### **Transaction Limits for User-based Subscriptions** {#transaction-limits-for-user-based-subscriptions}

Under the User-based Subscription Model, each User-based Subscription comes with an annual Transaction allowance. This is described below (see [Transaction Limits for User-based Subscriptions](#transaction-limits-for-user-based-subscriptions)). The Transaction Allowance per User is: 

| Variant | Annual Transaction Allowance |
| :---- | :---- |
| Regular User 60 | Up to 60 Transactions / year |
| Regular User 120 | Up to 120 Transactions / year |
| Regular User Unlimited | Unlimited Transactions (\*)/ year |
| Lite User (Sign-Only / Read-Only / Prepare-Only) | No transaction  allowance |

(\*) Unlimited Manual (human-initiated) Transactions, subject to fair use and explicit exclusions (see [Fair use](#fair-use)).

Transaction allowances are **pooled at the Organization level.** For example:  
	*5 × Regular User 120 \= 600 Transactions per year (shared pool)*

3. #### **Manual Transactions vs Automated Transactions** {#manual-transactions-vs-automated-transactions}

A ‘Manual Transaction’ is a human-initiated signing or execution request, manually created and completed by an authenticated user, not automation. Unlimited Manual Transactions (subject to fair use) are: 

* Initiated manually by authenticated users  
* Sent via:  
  * Circularo Web App  
  * Circularo Mobile Apps  
  * Official productivity add-ins (e.g. Microsoft 365, Google Workspace)

The following are **not** Manual Transactions. We call these ‘Automated Transactions’ and are not covered by “unlimited” user-based transactions:

* Automated or system-generated transactions  
* API-triggered or script-driven execution  
* 3rd party API integrations  
* Workflow automation and background processing  
* Integration-driven signing or sealing  
* Bulk or batch signing operations (CSV uploads, batch sends)

  4. #### **Bulk Signing Rule** {#bulk-signing-rule}

To support higher bulk volumes without changing the Subscription model, additional bulk signing capacity is provided exclusively via a consumption based  Bulk Signing Transactions Add-On. This means that: 

* Bulk signing is **never unlimited**  
* Capped at **120 Transactions per Regular User per year**  
* Counts against the shared transaction pool

Under the **Transaction-based Subscription Model**, bulk signing consumes transactions from the licensed annual transaction volume.

5. #### **Fair use**  {#fair-use}

Circularo manages ‘unlimited’ user-based Transaction allowances through a ‘Fair Use’ policy. Under this policy, Circularo reserves the right to:

* Monitor usage patterns  
* Detect misuse of user-based licensing for automation or mass processing  
* Require migration to:  
  * Transaction-Based Licensing, and/or  
  * Appropriate Consumption-Based Add-Ons

    6. #### **User Type vs Roles**

The User Type (Regular, Lite and External Users) defines access to the Product; however, Roles define permissions to the Product. Roles (e.g. Admin, Controller, Preparator, Auditor) define what an authenticated user is permitted to do within the Product. They do not represent a license, and do not replace the requirement for a valid user subscription, which is the sole commercial entitlement that grants access to the Product. Examples include: 

* Organization Admin → Regular User license \+ Admin role  
* Workflow Approver → Lite User (Sign-Only) \+ Approver role

  7. #### **Summary**


| Dimension | User-Based Licensing |
| :---- | :---- |
| What you buy | Named Users \+ annual transaction allowance (60, 120 or Unlimited Transaction blocks) |
| Transaction pool | Shared across the Organization |
| Human-initiated transactions | Included (within allowance / fair use) |
| Bulk signing | Capped (120 per Regular User / year) |
| Best for | Knowledge workers, manual workflows |
| External Users | Unlimited, free |
| Automation / API | ❌ Not included (REST API Add-On \+ API consumption required e.g API eSigning or API eSealing Transaction Add-Ons) |
| Trust services (KYC, SMS, QTSA) | ❌ Not included (Add-Ons required) |
| Plans available | Start, Pro, Business, Enterprise, Ultimate |
| Combine with Transaction-Based | ❌ No |

  2. ### **Transaction-Based Subscriptions** {#transaction-based-subscriptions}

Under the Transaction-based Subscription Model, the Product is “licensed” (ie. permission is given) for a subscription period **annual transaction volume** (e.g monthly, annually), independent of user count

Each Transaction-based Subscription comes with a pre-agreed number of ‘Transactions’ that Users can use duing the Transaction period. All transaction allowances are pooled and consumed collectively at the organisation level.

1. #### **Characteristics**

* Optimized for predictable manual transaction volumes
* Internal users are typically unlimited  
* Included execution may occur via UI, add-ins, or mobile; API and automated execution are separately licensed and subject to plan eligibility

  2. #### **Transaction Categories** 

There are different categories of Transaction and are described in the table below. Transaction Categories describe the legal and evidentiary nature of the Transaction, but not its execution flow or automation. 

Currently, Circularo only sells Digital Signing and Digital Sealing Transactions. 

| Category | Meaning |
| :---- | :---- |
| Digital Signing | Individual intent via electronic signature |
| Digital Sealing | Organizational authenticity via electronic seal |
| Document Delivery (future) | Evidence of controlled delivery |
| Document Verification (future) | Evidence validation without execution |

#### 

3. #### **Transaction Types** 

Transaction Types describe **how** a transaction runs within a Transaction Category and what extra services are used (e.g KYC, SMS OTP, Qualified Signature etc). 

| Category | Example Transaction Types |
| :---- | :---- |
| Digital Signing | Single signer, multiple signers, sequential, parallel, bulk |
| Digital Sealing | Manual sealing; batch and API sealing require applicable Add-Ons |
| Document Delivery | Manual send, bulk delivery |
| Document Verification | Manual verification; automated verification requires applicable Add-Ons |

Transaction-based subscriptions include Manual Transactions for Digital Signing and Digital Sealing. Automated and API-initiated transactions are not included and require applicable separately licensed Add-Ons, subject to plan eligibility.

4. #### **Trust Services Add-Ons**

Circularo also sells ‘Trust Services’. This is a functionality that **augments** transactions but is not a separate Transaction Category or Transaction Type. Instead, this functionality is available through Add-Ons (see [Combination of Add-Ons & Plans](#combination-of-add-ons-&-plans)). 

| Trust Service | Billing |
| :---- | :---- |
| SMS OTP / Notifications | Consumption Add-On |
| National eID (UAE Pass, NAFATH, etc.) | Consumption Add-On |
| KYC / AML | Consumption Add-On |
| Organizational Certificates | Feature Add-On |
| Certified / Qualified Timestamps | Consumption Add-On |
| Qualified Certificates / Seals (eIDAS) | Consumption Add-On |

Advanced trust services (eg. SMS OTP, KYC, National eID, Qualified Timestamps, Qualified Signatures/Seals etc.) are not included in Transaction-based Subscriptions and must be purchased separately as Add-Ons. 

5. #### **Transaction Types for Transaction-based Subscriptions**

| License Variant | Included Users | Transaction Allowance |
| :---- | :---- | :---- |
| **eSign Transactions (Unlimited Users)** | Unlimited internal users | Licensed annual volume of **Manual Transactions** |
| **eSign Transactions (50 Users)** | Up to 50 internal users | Licensed annual volume of **Manual Transactions** |
| **eSign Transactions (25 Users)** | Up to 25 internal users | Licensed annual volume of **Manual Transactions** |

   6. #### **Summary**

   

| Dimension | Transaction-Based Licensing |
| :---- | :---- |
| What you buy | Annual Transaction Volume |
| Best for | Manual transaction-volume based commercial model |
| Users included | Usually unlimited internal users |
| External recipients | Unlimited, free |
| Included execution channels | UI, Add-ins, Mobile |
| API & automation | ❌ Not included. Applicable access and consumption Add-Ons are required, subject to plan eligibility. |
| Trust services (KYC, SMS, QTSA) | ❌ Not included (Consumption-Based Add-On required) |
| Plans available | Business, Enterprise, Ultimate |
| Can be combined with User-Based Licensing | ❌ No |

4. ## **Combination of Subscription Models & Plans**

   1. ### **Permitted combination of Subscription Models & Plans** 

The following combination of Subscription Models and Plans are sold by Circularo: 

| Variant | Start | Pro | Business | Enterprise | Ultimate |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **User-based** |  |  |  |  |  |
| **Regular User\* (up to 60 transactions)**  | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Regular User (up to 120 transactions)** | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Regular User Unlimited** | ❌ | ✅ | ✅ | ✅ | ✅ |
| **Lite User (Sign / Read / Prepare)** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Transaction-based** |  |  |  |  |  |
| **eSign Transactions (Unlimited Users)** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **eSign Transactions (up to 50 Users)** | ❌ | ❌ | ✅ | ✅ | ❌ |
| **eSign Transactions (up to 25 Users)** | ❌ | ❌ | ✅ | ✅ | ❌ |

\* **User-based variants** define *who* can use the platform and *how much* they can execute.  
\*\* **Transaction-based variants** define *how much volume* can be processed, independent of user count.

2. ### **Characteristics** 

* **Start**: Entry-only, capped User-based only, no flexibility  
* **Pro**: User-based only, no Lite Users, no Transaction-based subscriptions  
* **Business / Enterprise**: Full commercial flexibility (user or transaction-based subscriptions)  
* **Ultimate**:  
  * **User-Based** → Regular User Unlimited only  
  * **Transaction-Based** → eSign Transactions (Unlimited Users) only

  3. ### **Commercial strategy**

This license structure is **intentional**. It allows Circularo to:

* Enforce **clear caps and guardrails** under each Plan  
* Prevent misuse of “unlimited” variants  
* Keep User-based and Transaction-based licensing cleanly separated

It also allows Circularo to introduce special-purpose plans (e.g. EDU) without affecting the core commercial model. An example of a special-purpose plan is an “EDU Plan” that is focused on educational institutions and, because licensing is **variant-driven**, it allows plans like the following:

**EDU Plan (example)**

* Regular User 120  
* Max 50 users per organization  
* EDU-specific pricing  
* No transaction-based licensing

This:

* Caps execution per user  
* Caps total user count  
* Prevents abuse of “unlimited” semantics  
* Requires no changes to core pricing logic

Plans define **which license variants are allowed**. Variants define **how usage is capped**.

5. ## **Subscription Inclusions & Exclusions**

   1. ### **Subscription inclusions** 

Each subscription includes the following components:

* **Plan**:   
  * Start, Pro, Business, Enterprise or Ultimate plan   
* **Subscription Model:**  
  * User-based *or* Transaction-based subscription (depending on plan)  
  * DMS-Only subscription   
* **Support:**   
  * Essential Support are always included  
  * Standard, Plus or Premium Support are optional upgrades  
* **Standard Storage:** 

  * All 'Transactional Documents’ (see [5\. Storage & Retention](?tab=t.0#heading=h.l1ivhifnhy5l) \- those documents that are being signed or in-signing) have unlimited storage and are always retained for audit-trail and evidence-preservation purposes, subject to the fair use policy. Standalone Documents remain governed by their separate storage and Add-On rules.

  2. ### **Subscription Exclusions** 

Each Subscription excludes the following components (and Add-Ons) by default. These may be ‘enabled’ through the purpose of Add-Ons:

| Capability | How Enabled |
| :---- | :---- |
| API automation | Feature & Consumption Add-Ons |
| SMS OTP / reminders | Consumption Add-On |
| KYC / AML / National ID | Consumption Add-On |
| Qualified timestamps / seals | Consumption Add-On |
| Bulk / batch processing | Consumption Add-On |
| White-label branding | Feature Add-On |
| Corporate Branding & Identity | Multiple Feature Add-Ons |
| Unlimited standalone storage  | DMS  & Archiving Add-On plus storage can be expanded via Storage Add-On |

6. ## **Combination of Add-Ons & Plans** {#combination-of-add-ons-&-plans}

Add-Ons extend default Product functionality and are discussed in more detail in the [Circularo Add-Ons Sales Guide (Internal)](https://docs.google.com/document/u/0/d/1rUX3qL5WYVm5yYhGwu-HjmG2_CBE4rvRKAkYSQF58wk/edit). The following combination of Add-Ons and Plans are sold by Circularo: 

| Plan | User-Based Subscription | Transaction-Based Subscription | API Trust Service Add-Ons | Add-Ons Availability |
| :---- | :---- | :---- | :---- | :---- |
| Start | ✅ Allowed | ❌ Not Allowed | ❌ Not Allowed | 🚫 None |
| Pro | ✅ Allowed | ❌ Not Allowed | ❌ Not Allowed | ⚠️ Limited |
| Business | ✅ Allowed | ✅ Allowed | ✅ Allowed only with User-Based Subscription | ✅ Broad |
| Enterprise | ✅ Allowed | ✅ Allowed | ✅ Allowed only with User-Based Subscription | ⭐ Full |
| Ultimate | ✅ Allowed | ✅ Allowed | ✅ Allowed only with User-Based Subscription | ✅ Full, Self-Hosted |

API Trust Service Add-Ons, including API eSigning and API eSealing Transactions, may only be sold together with a User-Based Subscription. Transaction-Based Subscriptions are not used for API commercial configurations.

7. ## **API usage** 

The REST API is not a separate Product, Plan, or Subscription Model.

API capabilities are available only with **User-Based Subscriptions**.

Every API customer must license all Internal Users who access or benefit from the Circularo platform through a User-Based Subscription. API automation does not replace Internal User licensing.

The REST API Access Add-On enables platform integration and automation, but it does not include the programmatic consumption of trust services.

Additional trust services, including Identity Verification (KYC), National eID, Qualified Timestamps, SMS OTP and future trust service, are licensed independently through their respective Consumption Add-Ons.

If an application performs trust services, the customer must purchase the corresponding trust service consumption Add-On, such as:

* API eSigning Transactions Add-On
* API eSealing Transactions Add-On
* Identity Verification Add-On
* National eID Add-On
* Qualified Timestamp Add-On
* SMS OTP / SMS Notification Add-On

1. ### **User-Based Subscription**

The REST API Access Add-On enables platform integration and automation.

User-Based transaction allowances are intended for manual, human-initiated transactions performed by licensed Internal Users through the Circularo application, mobile app, or official productivity add-ins.

**User-Based transaction allowances do not apply to API-initiated trust services. These must be purchased as separate API Add-Ons.**

If an application performs trust services programmatically (such as electronic signing or electronic sealing), the customer must purchase the corresponding:

* API eSigning Transactions Add-On  
* API eSealing Transactions Add-On

2. ### **Transaction-Based Subscription**

Transaction-Based Subscriptions are not used for API-based commercial configurations.

Customers requiring API integration or API-initiated trust services must be sold a User-Based Subscription plus the required API Add-Ons.

The only exceptions are existing customers onboarded before 1 August 2026.

Customer entitlements are governed by the subscription agreement in effect when the subscription was purchased or renewed. New commercial packaging applies prospectively at the beginning of a new term or on renewal and does not automatically alter existing subscription entitlements unless agreed at renewal.

3. ### **Commercial Principle**

* **REST API Access Add-On** enables platform integration.  
* **API eSigning / eSealing Transaction Add-Ons** enable programmatic trust service consumption.  
* **Other Trust Service Add-Ons** license additional programmatic trust services independently.

| Customer Type | REST API | API Add-Ons | Migration Required |
| :---- | :---- | :---- | :---- |
| Existing Transaction-Based customer | ✅ Yes | ✅ Yes | No |
| Existing customer at renewal | ✅ Yes | ✅ Yes | Commercial review if usage has fundamentally changed |
| New Transaction-Based customer | ❌ No | ❌ No | Must purchase a User-Based subscription for API access |
| User-Based customer | ✅ Yes | ✅ Yes | No |

8. ## **Manual vs Automated Transactions**

See [Manual Transactions vs Automated Transactions](#manual-transactions-vs-automated-transactions) above. 

1. ### **Manual (Human-Initiated) Transactions**

Both User-Based and Transaction-Based licensing models include Manual (human-initiated) Transactions. **Manual transactions** are transactions that are **initiated by authenticated, licensed internal users** and are intended for routine knowledge-worker signing scenarios.

**They are performed via:**

* Circularo Web Application  
* Circularo Mobile Applications  
* Circularo Official productivity add-ins (e.g. Microsoft 365, Google Workspace)

**Included by default**

* Email-based identity verification  
* Standard (non-qualified) timestamps  
* Full audit trail and certificate of fulfillment   
* Guaranteed archiving and retention of all Transactional Documents processed

These transactions are included within the applicable plan limits or allowances, but are subject to fair use and explicit bulk-signing caps (see [Bulk Signing Rule](#bulk-signing-rule) and [Fair use](#fair-use)). 

**Not included by default**

* Advanced or regulated identity services  
* National eID (e.g. UAE Pass, NAFATH)  
* KYC / AML verification  
* Certified or Qualified timestamps  
* Qualified certificates, signatures, or seals  
* SMS OTP / SMS Reminders

These advanced trust and assurance services may be added on top of manual or API transactions via the corresponding **Consumption-Based Add-Ons.**

2. ### **Automated Transactions (Always Add-On Based)**

Any Automated Transaction (ie. automated system-generated, API-driven or background execution) is not included in either Transaction-based or User-based model and must be licensed separately via Consumption-Based Add-Ons. 

Automated transactions include:

* API-triggered signing or sealing  
* System-initiated workflows  
* Batch or background processing  
* Integration-driven execution

  3. ### **Rules for Automated Transactions**

* Manual Transactions are included in both User-Based and Transaction-Based licensing.  
* Automated transactions are never included by default.  
* API access unlocks the channel; API Transactions Add-Ons unlock the volume.  
* eSignature automation and eSeal automation are licensed separately.  
* Mixing manual and automated usage without the appropriate Add-Ons is not permitted.

9. ## **Storage & Retention**

A ‘Transactional Document’ is a document that is uploaded, created or edited in the Product as part of a User-based or Transaction-based Subscription (eg. document is uploaded to be signed). Transactional Documents include metadata, permissions and archival content associated with the orgnaization’s Subscription. 

1. ### **Transactional Document Storage** 

Transactional Documents have unlimited storage and are always stored and retained for audit-trail and evidence-preservation purposes, subject to the fair use policy. They do not consume a plan-specific storage allocation.

2. ### **Standalone Storage** 

There is a finite ‘working-storage buffer’ for non-Transactional Documents. We call these ‘Standalone Documents’ and they include: 

* All documents, metadata, permissions and archival content that a User uploads to the Product \- including all drafts   
* Collaboration files

The ‘buffer’ is determined by the fair use policy (see [Fair use](#fair-use)). 

Standalone Documents exceeding the buffer require a **DMS & Archiving Add-On.** Storage Add-Ons extend capacity but **never replace DMS & Archiving Add-On**

10. ## **Support & Services**

| Category | Description |
| :---- | :---- |
| Support Plans | The default support plan is ‘Essential’ and it is included in any Subscription.  It can be upgraded to the ‘Standard’, ‘Plus’ or ‘Premium’ support plan.  |
| Onboarding | One-time service |
| Implementation | Project-based or through a Service-based Add-On |
| Self-Hosted Operations | Standard Plan \+ Maintenance |

11. ## **Developer & Non-Production Access**

Circularo offers a dedicated sandbox environments that are logically isolated from production for:

* API development  
* Integration testing  
* Automation validation

Sandbox usage does not consume production credits. 

Sandbox environments are intended for testing and development only. They may be reset, updated, or have their data deleted at any time without prior notice. They should not be used to store production or business-critical data.

Dedicated sandbox environments are available in Business and Enterprise plans or sold separately as part of the REST API Access Add-On.
