---
title: Circularo Add-On Model and How It Works
status: approved
classification: internal
audience: sales
scope: Internal Team
owner: CSO
last_updated: 2026-08-28
---

# Circularo Add-On Model and How it Works

## **1. Add-On Model Overview**

* **Four Add-On Types:** Feature-Based | Consumption-Based | User-Based | Service-Based
* **Commercial Rails:** Activation Fee | Entitlement Fee | Credit Consumption | One-Time Fee
* **Scope:** Organization | Workspace | User | Event | Deployment Type
* **Policy Flags:** Regulatory | Regional | Requires Approval | Bundlable | Credit-Only

**`Add-On`**  
 `├─ Type (what it is)`  
 `│   ├─ Feature-Based`  
 `│   ├─ Consumption-Based`  
 `│   ├─ User-Based`  
 `│   └─ Service-Based`  
 `│`  
 `└─ Commercial Rails (how it’s charged)`  
     `├─ Activation Fee (optional)`  
     `├─ Entitlement Fee (recurring)`  
     `├─ Credit Consumption (usage)`  
     `└─ One-Time Fee (Service-Based only)`

## **2. Add-On Model is aligned with our Add-On Terms**

### **A. Add-On Types (WHAT is sold)**

| Add-On Type | What it represents | Key constraint |
| :---- | :---- | :---- |
| **Feature Based** | Capability / configuration unlock | Not usage-limited, not per user |
| **Consumption Based** | Usage-driven capability | Metered via Chargeable Events |
| **User Based** | Per-user licensed capability | Scales with users, not usage |
| **Service Based** | One-time professional service | Finite, no ongoing entitlement |

Each Add-On belongs to **exactly one** type.

### **B. Commercial Rails (HOW it is charged)**

| Commercial Rail | Meaning | Applicability |
| :---- | :---- | :---- |
| Activation Fee | One-time enablement/setup | Optional for Feature / Consumption |
| Entitlement Fee | Recurring right-to-use fee | Feature, User |
| Credit Consumption | Usage-based charging | Consumption only |
| One-Time Fee | Fixed service delivery fee | Service only |

### **C. Allowed combinations**

| Add-On Type | Allowed Commercial Rails | Not Allowed |
| :---- | :---- | :---- |
| Feature Based | Entitlement Fee (+ optional Activation Fee) | Credits, One-Time |
| Consumption Based | Credit Consumption (+ optional Activation Fee) | Entitlement, Per-User |
| User Based | Entitlement Fee (priced per user) | Credits, Usage |
| Service Based | One-Time Fee only | Entitlement, Credits |

## **3. Scope (WHERE it applies)**

Internal enforcement logic.

* Organization (default for all Add-Ons)
* User (User Based Add-Ons only)
* Event (Consumption Based Add-Ons only)
* Deployment Type (edge case: on-prem / sovereign)

## **4. Policy Flags (WHEN sales must pause)**

These are **commercial guardrails**, not features.

* **Regulatory** – legal/compliance dependency
* **Regional** – geographic availability
* **Requires Approval** – pricing or risk gate
* **Bundlable** – can be sold standalone or only with a plan
* **Credit-Only** – must be prepaid or wallet-based

## **5. Key Principles to follow**

* Add-Ons never redefine legal semantics—only assurance level or capability.
* Consumption-Based Add-Ons always use Credits (UI, API, automation).
* API access never includes free usage; it only unlocks the channel.
* National ID and Qualified services are region-locked.
* Retry and attempt controls apply to all verification services.
* Bundles do not create new entitlements; they package existing Add-Ons only.
* Any automated execution maps to a Chargeable Event by definition.

## **6. Sales-ready explanations**

* **Feature Add-On:** You pay to unlock a capability. Once enabled, usage is not counted.
* **Consumption Add-On:** You only pay when you use it. Every action consumes credits.
* **User Add-On:** You pay per user covered, regardless of how much they use it.
* **Service Add-On:** One-off professional work. No ongoing rights or usage included.
