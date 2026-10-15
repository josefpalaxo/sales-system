# Commercial master restoration and canonical library import

Date: 2026-10-14  
Classification: Restricted  
Scope: Local migration and authority repair requested by Josef; no commit, push, or publication.

## Result

The full Commercial Model and Add-On Model are active masters under [shared/master-documents](../../shared/master-documents/README.md). Existing structured knowledge is retained as derived representations with stable IDs, explicit master relations, and reconciled master revision references. The original commercial content, existing review dates, and open conflicts are preserved.

The sales-repo canonical library has been imported into shared and partnership master-document locations. The source folder was not modified. All 34 source files other than OS/cache files are accounted for in [manifest.json](manifest.json); the different Commercial Model is retained as an exact historical input while the approved sales-system version remains active. The Add-On Model is additionally restored from sales-system's approved source snapshot.

## Status and handling

Most imported documents are drafts. Draft claims of approved specifications or canonical policies in inherited prose do not override metadata or establish business approval. The source-approved API rationale lacks review dates and is imported as reviewed pending confirmation. Original metadata is preserved in `spec.legacy_frontmatter`.

Legacy `external` classification is normalized to internal, retaining its intended audience in source metadata. `strictly-internal` becomes restricted. The internal price-book package, including previously unclassified supporting documentation, is restricted and must not be sent to partners. Migration dates describe integrity/metadata review, not renewed business approval.

## Commercial Model comparison

The sales-repo input and existing approved sales-system revision are not interchangeable. Full differences are saved in [commercial-model-comparison.diff](commercial-model-comparison.diff).

Differences include API/subscription eligibility and legacy-customer treatment; manual versus automated transaction consumption; the 25-user variant's strike-through status; transactional-storage fair use; and sandbox conditions/availability. No new commercial decision was made during this migration. The previously approved sales-system content is retained and the original source is preserved at [sales-repo-commercial-model-original.md](../../sources/archived-snapshots/sales-repo-commercial-model-original.md).

The current [Workspace scope conflict](../../governance/conflicts/add-on-workspace-scope.md) remains open and constrains the Add-On master and its derived scope record.

## Changes to source presentation

Imported Markdown receives the governed metadata envelope, original metadata and checksum, and a visible draft/import qualification. Local links are relocated and URL-decoded. The Commercial Model's obsolete Google Docs storage anchor is replaced with a local anchor. An invalid TODO link is corrected to the imported API Pricing Recommendations. No commercial prices, limits, margins, or entitlements are rewritten.

Binary workbook, CSV files, generator, and historical Commercial Model input are preserved byte-for-byte. Python caches and macOS metadata are excluded. No source-folder TODO instructions have been executed.

## Dependencies outside the imported folder

- `partner-management/README.md` refers to `../../wip/qtn-calculator/`. Its text remains visible as a legacy dependency; no broken local link is created.
- `partner-management/pricing-book/technical-documentation.md` refers to `../../../catalog/unified-catalog/unified-pricing-book.csv`. Its text remains visible as a legacy dependency; no broken local link is created.

The workbook generator also assumes the former repository layout and reads `catalog/unified-catalog/unified-pricing-book.csv` at import time. It is preserved as source, not advertised as a working sales-system rebuild command. The source catalog, its ownership/refresh pipeline, any supporting design assets, and the quotation calculator require a separate scoped migration before regeneration is reliable. The CSV price lists and workbook remain unapproved draft inputs.

The SaaS partner catalog's inherited `source_files` also names `catalog/odoo-product-catalog-variants.csv` and `catalog/20250310 Circularo Features & Plans Matrix.csv`. These source datasets are outside the requested canonical folder and remain dependency gaps; their references do not establish that the imported catalog or price lists are current.

## File coverage

| Source | Destination | Disposition |
| --- | --- | --- |
| `Circularo Commercial Dictionary.md` | `shared/master-documents/Circularo Commercial Dictionary.md` | Draft preserved; metadata and local links normalized |
| `Circularo Commercial Model.md` | `shared/master-documents/Circularo Commercial Model.md` | Existing approved sales-system v1.9 retained; exact sales-repo original preserved as historical comparison |
| `Sales Hub.md` | `shared/master-documents/Sales Hub.md` | Draft preserved; metadata and local links normalized |
| `TODO.md` | `shared/master-documents/TODO.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Internal Partner Price Book.md` | `domains/partnerships/master-documents/partner-management/Circularo Internal Partner Price Book.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Deal Registration Guide.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Deal Registration Guide.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Pricing & Special Pricing Guide.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Pricing & Special Pricing Guide.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Pricing Strategy Architecture.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Pricing Strategy Architecture.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Program FAQ.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Program FAQ.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Program Guide.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Program Guide.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Program Operations Guide.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Program Operations Guide.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo Partner Program Policy.md` | `domains/partnerships/master-documents/partner-management/Circularo Partner Program Policy.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Circularo SaaS Partner Sales Catalog.md` | `domains/partnerships/master-documents/partner-management/Circularo SaaS Partner Sales Catalog.md` | Draft preserved; metadata and local links normalized |
| `partner-management/README.md` | `domains/partnerships/master-documents/partner-management/README.md` | Draft preserved; metadata and local links normalized |
| `partner-management/Selling Circularo SaaS as a Partner.md` | `domains/partnerships/master-documents/partner-management/Selling Circularo SaaS as a Partner.md` | Draft preserved; metadata and local links normalized |
| `partner-management/partner-facing-addon-pricelist-saas.csv` | `domains/partnerships/master-documents/partner-management/partner-facing-addon-pricelist-saas.csv` | Copied without content changes; legacy build dependencies remain explicit |
| `partner-management/partner-facing-price-list-saas.csv` | `domains/partnerships/master-documents/partner-management/partner-facing-price-list-saas.csv` | Copied without content changes; legacy build dependencies remain explicit |
| `partner-management/pricing-book/Circularo_Internal_Annual_Price_Book.xlsx` | `domains/partnerships/master-documents/partner-management/pricing-book/Circularo_Internal_Annual_Price_Book.xlsx` | Binary retained exactly; draft generated workbook, not approved pricing |
| `partner-management/pricing-book/README.md` | `domains/partnerships/master-documents/partner-management/pricing-book/README.md` | Draft preserved; metadata and local links normalized |
| `partner-management/pricing-book/build_price_book.py` | `domains/partnerships/master-documents/partner-management/pricing-book/build_price_book.py` | Copied without content changes; legacy build dependencies remain explicit |
| `partner-management/pricing-book/lessons-learned.md` | `domains/partnerships/master-documents/partner-management/pricing-book/lessons-learned.md` | Draft preserved; metadata and local links normalized |
| `partner-management/pricing-book/plan.md` | `domains/partnerships/master-documents/partner-management/pricing-book/plan.md` | Draft preserved; metadata and local links normalized |
| `partner-management/pricing-book/technical-documentation.md` | `domains/partnerships/master-documents/partner-management/pricing-book/technical-documentation.md` | Draft preserved; metadata and local links normalized |
| `partner-management/pricing-book/user-manual.md` | `domains/partnerships/master-documents/partner-management/pricing-book/user-manual.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/API Licensing FAQs.md` | `shared/master-documents/sales-guidelines/API Licensing FAQs.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/API Licensing Principles.md` | `shared/master-documents/sales-guidelines/API Licensing Principles.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/API Pricing Recommendations.md` | `shared/master-documents/sales-guidelines/API Pricing Recommendations.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/Circularo Positioning Framework.md` | `shared/master-documents/sales-guidelines/Circularo Positioning Framework.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/Circularo Sales DOs and DO NOTs.md` | `shared/master-documents/sales-guidelines/Circularo Sales DOs and DO NOTs.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/README.md` | `shared/master-documents/sales-guidelines/README.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/Selling Circularo  SaaS.md` | `shared/master-documents/sales-guidelines/Selling Circularo  SaaS.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/Selling Circularo API Plans.md` | `shared/master-documents/sales-guidelines/Selling Circularo API Plans.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/Selling Sovereign Trust Solutions.md` | `shared/master-documents/sales-guidelines/Selling Sovereign Trust Solutions.md` | Draft preserved; metadata and local links normalized |
| `sales-guidelines/Why API is Sold Only with User-Based Subscriptions.md` | `shared/master-documents/sales-guidelines/Why API is Sold Only with User-Based Subscriptions.md` | Source approval retained as provenance; reviewed pending confirmation of dates |
| `sources/archived-snapshots/Circularo Commercial Model.md` | `shared/master-documents/Circularo Commercial Model.md` | Approved master restored to active location; commercial body preserved apart from local links and conflict notice |
| `sources/archived-snapshots/Circularo Add-On Model and How it Works.md` | `shared/master-documents/Circularo Add-On Model and How it Works.md` | Approved master restored to active location; commercial body preserved apart from local links and conflict notice |

## Verification

Verification results are recorded in [QA.md](QA.md). Source checksums are retained for reproducibility and to detect accidental modifications to the original folder.
