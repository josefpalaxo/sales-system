# Signfide website prototype

Local implementation completed 2026-10-14. Internal, non-canonical working material.

Eight responsive marketing pages explore Signfide’s proposed US legal agreement experience using the selected Good Faith identity. The site is a local prototype: it performs no signing, booking, submission, billing, authentication, or external integration.

## Circularo heritage update

Implemented 2026-10-14 from [CIRCULARO-HERITAGE-HANDOVER.md](CIRCULARO-HERITAGE-HANDOVER.md), using the existing Impeccable design system and Sites local-only workflow.

- Hero and shared-footer endorsements now link to `/about#powered-by-circularo`.
- The homepage trust narrative explains Signfide’s customer role and Circularo’s technology role.
- About explains the co-branded model, links to Circularo’s official website and attributed customer stories, and includes an accessible applications/support/hosting FAQ at `/about#service-questions`.
- Product pages link to the technology explanation. Security & Trust explains Azure hosting and the planned operations split.
- Josef’s current clarification is reflected: the service is hosted on Microsoft Azure in the United States. The exact dedicated-environment configuration, launch scope/readiness, and assurances remain pending.
- [Evidence notes](references/heritage-evidence.md) distinguish the owner-reported hosting location, internal operating-model draft, and Circularo-published experience.

All eight routes and local-only forms remain. The identity, original reference snapshots, sibling company documents, pricing boundaries, and neutral competitor guide are preserved.

## Preview and run

Open [the local preview](http://127.0.0.1:4173). The server binds only to 127.0.0.1.

Run all commands from:
`/Users/josefneumann/Projects/ai-workspace/sales-system/work/signfide/website-prototype`

Requires Node.js 22.23 or later and npm. Install from the saved lockfile:

```sh
rtk proxy npm ci
rtk proxy npm run dev
```

The server builds the site and prints its URL. Stop it with Ctrl+C. If port 4173 is occupied:

```sh
rtk proxy env PORT=4174 npm run dev
```

Build without starting a server:

```sh
rtk proxy npm run build
```

The output is `dist/`. All eight routes contain their own HTML, so direct navigation and refresh work without a client router. Do not open the HTML through file://; assets use local root-relative URLs.

There is no file watcher. After editing source while the server is running, run `rtk proxy npm run build` in a second terminal, then reload the browser. `npm run preview` also builds and starts the loopback server.

## Pages and interactions

| Route | Content and local behavior |
| --- | --- |
| `/` | Homepage, interactive fictional engagement letter, workflow overview, legal scenarios, trust introduction |
| `/solutions/law-firms` | Engagement letters, NDAs, service agreements; working section links |
| `/features/electronic-signatures` | Prepare / Sign / Record example, with fictional signature and reset |
| `/features/document-workflows` | Five selectable workflow stages, with arrow-key and Home/End support |
| `/pricing` | Pricing enquiry form using team size, volume, and needs; no invented offer |
| `/compare/docusign` | Buyer questions, local preparation checklist, and reset |
| `/security` | Six expandable trust questions and pending assurance details |
| `/about` | Good-faith story, anchored Circularo service model, attributed heritage, and ecosystem FAQ |

Book a Demo opens a native modal with field validation, keyboard focus containment, Escape/close behavior, and focus return. Successful validation displays “Demo request preview — nothing was sent.” Pricing has an equivalent local-only enquiry preview. Entries are cleared after a successful preview and when the demo dialog closes. Nothing is persisted or transmitted. Use fictional test information.

Unknown routes return a designed 404 with a working homepage link.

## Implementation

| Path | Purpose |
| --- | --- |
| `src/pages.mjs` | Homepage and complete route registry |
| `src/supporting-pages.mjs` | Seven supporting pages and their drafted copy |
| `src/layout.mjs` | Shared navigation, linked footer endorsement, dialog, forms, and agreement example |
| `src/external-links.mjs` | Exact reviewed external URLs and accessible link labels |
| `src/styles.css` | Brand colors, typography, spacing, layouts, focus and reduced-motion styles |
| `src/app.js` | Small browser-local interactions; no network or storage APIs |
| `src/favicon.svg` | Provisional serif s favicon |
| `scripts/build.mjs` | Static renderer and local font/license bundling |
| `scripts/link-policy.mjs` | Reviewed-anchor allowance and remote-runtime rejection |
| `scripts/check-link-policy.mjs` | Positive/negative link-policy fixtures |
| `scripts/serve.mjs` | Loopback-only static server and security headers |
| `scripts/qa.mjs` | Reproducible Chrome and axe accessibility checks |
| `references/` | Original instruction-pack source snapshots |
| `qa/` | Verification report, machine results, and ignored screenshots |

No runtime framework or runtime package dependencies. Static templates and native browser elements are sufficient for these eight pages and local interactions. No nested Git repository was created. All project source, dependencies, npm cache, browser profile, assets, outputs, and saved evidence stay in this folder.

Development dependencies are installed locally and pinned by `package-lock.json`. Newsreader normal/italic and Inter font files are copied from the local Fontsource packages at build time, together with their SIL Open Font Licenses. There are no runtime font or asset hotlinks.

The live-text Newsreader wordmark is a provisional typographic rendering, not final custom lettering or an exact reproduction of the raster reference. No separate logo symbol is used. The identity board is retained only as a reference, never used as website UI.

## Verification

With the local server running:

```sh
rtk proxy npm run qa
```

The QA command first runs link-policy fixtures, then uses the existing macOS Google Chrome executable. Override it on another machine:

```sh
rtk proxy env CHROME_PATH=/absolute/path/to/chrome npm run qa
```

For an alternate preview port, also set `QA_URL=http://127.0.0.1:4174`. No browser download is required. The QA profile and downloads are kept in `.cache/`; screenshots go in `qa/screenshots/`.

The completed run covers all eight routes at 1440, 768, 390, and 320px, direct loads and refreshes, internal links and anchors, browser history, desktop/mobile navigation, keyboard controls, forms and focus, no external requests, no POST requests, no browser storage, and reduced motion. Automated axe scans found zero WCAG A/AA violations in those default page states. Heritage anchor visibility and the FAQ are checked at all four widths. Three reviewed external anchors are checked for exact URLs, labels, and new-tab protection without fetching or following them. Zero external page-load requests remains a separate assertion. Browser automation does not replace screen-reader or physical-device testing.

Read [QA report](qa/REPORT.md), [machine results](qa/routes-results.json), and [launch questions](LAUNCH-QUESTIONS.md). Impeccable’s layout and typography were assessed independently from its mechanical scan; the chosen Inter/Newsreader pairing is an intentional identity requirement.

Parent repository validation still fails on pre-existing folder/link issues outside this project. No governed records changed, so no parent catalog rebuild was needed or performed. The source, local checks, and screenshots are ready for review; this is not public-launch approval.

## Source and evidence boundaries

Read [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), and [AGENTS.md](AGENTS.md) for the contract. The [strategy snapshot](references/website-strategy-source.md) and [wordmark reference](references/a-wordmark-reference.png) were captured on 2026-10-14. The selected Good Faith palette explicitly supersedes the source’s older navy/teal direction.

Supporting copy is authored for this prototype within PRODUCT.md’s evidence boundaries. Prices, availability, certifications, competitor verdicts, Signfide customer proof, and actual launch assurances remain unasserted. US Microsoft Azure hosting is included as owner-reported evidence, with the remaining configuration and assurance questions kept separate. See LAUNCH-QUESTIONS.md before any future publication.

The heritage update is versioned in the existing parent repository. The preview remains local; publication, deployment, and domain connection require separate instructions.
