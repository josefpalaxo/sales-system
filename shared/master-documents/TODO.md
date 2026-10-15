---
schema_version: 1
id: master:todo
kind: master-document
domain: shared
title: "Simplify API Pricing"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "TODO.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/TODO.md"
  source_sha256: 7d51da20a7128cc21fd9d67f2728054de9a8a3582f32b072d877787377bdfd05
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

## Simplify API Pricing

[CX-ESEAL-API] eSeal API Transaction (https://hub.circularo.com/odoo/products/365) is Add-On available for Business, Enteprise and Ultimate Plans. With the same price for all the plans as per [API Pricing Recommendations](<sales-guidelines/API Pricing Recommendations.md>)
Same logic applies for [CX-ESIGN-API] eSign API Transaction (https://hub.circularo.com/odoo/products/364)

Result: No API Product Add-On Variants just 2 API consumption Add-Ons ([CX-ESEAL-API] and [CX-ESIGN-API]), plust REST API Add-On.

### Archive (delete) all those SKUs in Odoo:

| Internal Reference | Name |
| :---- | :---- |
| CB-ESEAL-NOREG-API | eSeal API Transaction (no regular users) |
| CB-ESEAL-REG-API | eSeal API Transaction (unlimited regular users) |
| CB-ESIGN-NOREG-API | eSign API Transaction (no regular users) |
| CB-ESIGN-REG-API | eSign API Transaction (unlimited regular users) |
| CE-ESEAL-NOREG-API | eSeal API Transaction (no regular users) |
| CE-ESEAL-REG-API | eSeal API Transaction (unlimited regular users) |
| CE-ESIGN-API | eSign API Transaction |
| CE-ESIGN-NOREG-API | eSign API Transaction (no regular users) |
| CE-ESIGN-REG-API | eSign API Transaction (unlimited regular users) |
| CP-ESEAL-API | eSeal API Transaction |
| CU-ESEAL-API | eSeal API Transaction |
| CU-ESIGN-API | eSign API Transaction |
