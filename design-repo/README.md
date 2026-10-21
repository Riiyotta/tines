# Tines homepage design-repo

An AI-ready design-repo extracted from the local tines.com homepage clone: tokens, primitives, components, section contracts, one template, a PageSpec schema, a semantic validator and adversarial tests. A generator can use it to compose a homepage-shaped page without inventing colours, copy budgets or structure.

> **Local reference only. Commercially sensitive.** This is extracted from a clone of a real, live company's website (Tines). Do not publish it, push it to a public remote or make it public in any way. `registry.manifest.json` carries `productionApproved: false` and `status: design-review-pending`.

## Scope: one page shape

- **Exactly 1 route (`/`) and 1 template (`template.home`).** The clone covers the homepage only, on purpose. No other tines.com page was cloned, so this repo has no evidence for pricing, blog, customer or product page shapes, and none must be invented. Every section contract and template here comes from that one homepage.
- **Section ids and order match the project's `ia.json` exactly** (11 sections: `chrome.site-nav`, `hero.intro`, `proof.logo-marquee`, `hero.wordmark-stage`, `hero.product-demo`, `narrative.monitor-banner`, `narrative.solution-panel`, `showcase.use-case-tabs`, `proof.why-tines`, `conversion.start-today-cta`, `chrome.site-footer`). `extraction/verify_all.py` checks this alignment (`ia-alignment`) whenever the sibling `ia.json` is present.
- `required: false` on seven template nodes is an **inferred allowance**: a generated page may omit those sections, but must keep the order. With only one real instance this is a judgement call, not a measured fact. The nav, `hero.intro`, the Start-today CTA and the footer are required.
- **Links.** The footer links to absolute `https://www.tines.com/...` URLs. The nav items and the hero, solution and CTA buttons, however, use root-relative paths copied from the original (`/customers/`, `/pricing/`, `/3b/`, `/book-a-demo/`). Those resolve against the clone's own host, where only `/` exists, so they are dead links in the clone. PageSpecs never carry URLs. CTAs carry an `intent` enum (`book-demo`, `sign-up`, `explore-product`) instead.

## Two modes: `reference` and `generated` (read before generating anything)

Every PageSpec declares a required, closed `mode`. The rule, exactly:

| Mode | Meaning | `brand.tines-logo` (real Tines logo) |
|---|---|---|
| `reference` | The spec reproduces/describes this local clone of the source site. | **Allowed**, only as the existing chrome asset in `chrome.site-nav` / `chrome.site-footer`. |
| `generated` | The spec is a NEW website for someone else. | **Error (`GENERATED_NO_REFERENCE_ASSET`) anywhere in the spec**, in any field or section. The source brand name "Tines" is also an error in any string (`GENERATED_NO_SOURCE_BRAND_TEXT`, whole-word match, so "routines" is fine). Every section whose contract has a `brandMark` field (nav `logo`, footer `logoMark`) must set it from a generation-safe brand role: **`brand.placeholder` or `brand.user-supplied`** (`GENERATED_BRAND_REQUIRED`). |

- `brand.tines-logo` stays in the repo **for reference/clone use only**; its policy is `reference-context-only` and it is pinned (policy and `generatedMode: blocked-in-generated`), so a different-but-valid value fails `verify_all`.
- `brand.placeholder` (policy `may-generate-new`): a neutral, clearly labelled placeholder or a text-only wordmark of the new site's OWN name. It must not resemble the Tines logo. This repo ships no artwork for it on purpose, and no generated "neutral mark" role exists: nothing in the evidence supports one, and inventing one risks a lookalike.
- `brand.user-supplied` (policy `operator-supplied-only`): a slot for the user's own logo; the generator never creates or imitates it. Prefer it whenever a real logo exists.
- The schema accepts all three brand roles in the two brand-mark fields in both modes (a reference-mode page may use a placeholder too); the semantic validator applies the mode rules. JSON Schema alone cannot express "any field, any depth", which is why the mode rules live in `schema/semantic_validate.py` and `compatibility/graph.json`.
- Examples: `schema/example.pagespec.json` (mode `reference`, real Tines logo, real short headings) and `schema/example.generated.pagespec.json` (mode `generated`, fictional "Example Co" with original copy, `brand.placeholder` in the nav and `brand.user-supplied` in the footer). `verify_all` fails if the generated example contains any reference-only role.

Every role in `assets/asset-roles.json` is classified by `generatedMode` (closed vocabulary, coherent with its generation policy):

| `generatedMode` | Roles | In a generated PageSpec |
|---|---|---|
| `generation-safe` | `brand.placeholder`, `brand.user-supplied`, `icon.ui-glyph` | Allowed. |
| `slot-operator-supplied` | `customer.logo-trademark`, `partner.assistant-icon`, `product.demo-frame`, `product.screenshot`, `illustration.brand-art`, `editorial.promo-image`, `artwork.canvas-standin` | Allowed only as an empty slot the operator fills with their own or licensed assets; the Tines/third-party original is never reproduced. Their policies are unchanged. |
| `blocked-in-generated` (policy `reference-context-only`) | `brand.tines-logo` | Error anywhere. |

## Licensing and asset rules

See `assets/asset-roles.json`. Every media field in the schema is a closed `assetRole`, pinned per field (the two brand-mark fields accept the three `brand.*` roles), with a generation policy:

| Role | Policy | Meaning |
|---|---|---|
| `customer.logo-trademark` | must-not-fabricate | 11 real third-party trademarks (Canva, Coinbase, Databricks, Dropbox, Intercom, McKesson, MongoDB, Pinterest, Reddit, Snowflake, Sophos). Never generate, redraw, name or reuse them, and never present real customers as endorsements. A marquee holds operator-supplied licensed logos only. |
| `brand.tines-logo` | reference-context-only | The Tines logo and wordmark appear only as the existing chrome asset in this local reference (mode `reference`). Never alter or imitate them. Forbidden in mode `generated`. |
| `brand.placeholder` | may-generate-new | Generation-safe neutral brand placeholder (see modes above). |
| `brand.user-supplied` | operator-supplied-only | Generation-safe slot for the user's own logo. |
| `partner.assistant-icon` | must-not-fabricate | ChatGPT, Claude, Gemini, Perplexity and Grok marks in the footer. |
| `product.demo-frame`, `product.screenshot` | must-not-reuse-in-new-pages | Proprietary Tines product UI. These are slots only. |
| `illustration.brand-art`, `editorial.promo-image` | must-not-reuse-in-new-pages | Proprietary illustrations and real editorial imagery. |
| `artwork.canvas-standin` | snapshot-not-source-art | PNG snapshots of runtime procedural canvases. They are not source art. |
| `icon.ui-glyph` | may-generate-new | Generic functional glyphs. |

- Generated pages must not reproduce real logos, real customer names presented as endorsements, real employee or customer photos, or Tines' proprietary product screenshots and copy. Short headings are the only exception.
- **Fonts:** Roobert, Roobert Mono and Reckless are commercial licensed typefaces self-hosted by Tines. Generated pages may reference the font tokens only within this local reference context. Production use requires obtaining licences. Never redistribute the WOFF2 files (this repo ships none).
- The reference example PageSpec uses only short real headings and labels; the generated example uses original fictional copy only. Body fields are kept brief and stay within every `maxWords` budget.

## Layout

```
registry.manifest.json      status, recomputed counts, versions, entryPoints (in-repo files only)
tokens/00-foundation/       color, typography, radius, spacing (stepped), breakpoint, elevation, icon-size, motion
tokens/10-semantic/         text/surface/border roles + typography roles
tokens/20-component/        button, nav, use-case tab, timeline, footer
tokens/30-layout/           container, gutters, grids
tokens/themes/light.json    the only evidenced theme; resolves every semantic colour
tokens/llm/                 component-allowlist, token-catalog, token-policy
assets/asset-roles.json     closed asset-role vocabulary, generatedMode classification, modes, licensing + font policy
primitives/ components/     contracts (props, token refs, evidence)
sections/                   11 section contracts (content+maxWords, constraints, motion, responsive)
templates/                  templates.json (structured nodes) + routes.json
compatibility/graph.json    rhythm/position + mode (GENERATED_*) rules with severity
schema/                     pagespec.schema.json, example.pagespec.json (reference), example.generated.pagespec.json (generated), semantic_validate.py, tests/adversarial_test.py
extraction/                 measured-values.json (evidence ledger), verify_all.py, drift_proof.py
```

## Counts (recomputed from disk; `verify_all.py` fails if these drift)

<!-- counts:start -->
| key | value |
|---|---|
| tokens | 312 |
| primitives | 6 |
| components | 7 |
| sections | 11 |
| templates | 1 |
| routes | 1 |
| graphRules | 16 |
| assetRoles | 11 |
| themes | 1 |
| evidenceEntries | 65 |
| examples | 2 |
| adversarialMutations | 104 |
| adversarialControls | 24 |
<!-- counts:end -->

Token split: 223 foundation, 31 semantic, 49 component and 9 layout.

## Source-tree drift

This design-repo models only the homepage (`/`, `template.home`). The source project has since gained a file-based router and many more pages that are NOT modelled here. In this revision the evidence-ledger citations were re-pinned to the current source (49 had drifted; several claims were corrected, e.g. nav blur colours are now page-themed, the 100x wordmark is a live canvas with the PNG as fallback, and the timeline duration varies 88.0-99.5s with frame width). Prose elsewhere in this repo (for example "static PNG stand-ins" in the known gaps below, and the `artwork.canvas-standin` role) still describes the homepage snapshot as first built.

## Evidence

Every token file, contract and template cites `mv.*` ids. Those ids resolve in `extraction/measured-values.json`, the **only** file that cites paths outside this folder: the sibling project's `tailwind.config.cjs`, `src/index.css`, `src/motion.css`, `src/motion/*.js`, `src/components/*.jsx`, `ia.json`, `ASSET_MANIFEST.json` and `CLONE_SPEC.md`. Each citation is `path:line[-line]` plus a literal `contains` anchor, so a citation that is in range but points at the wrong code fails too. Standalone, with no sibling tree, citation and ia checks degrade to WARN.

Where sources disagreed, the source code and headless-Playwright QA measurements won over `CLONE_SPEC.md`. The ledger's `specCorrections` lists each one: monitor text is centred at 390, the footer has 12% dividers, the timeline caption docks on top, segment widths, mobile Roobert, nav layers that fade in on scroll, spacing that steps rather than interpolating, footer hover `#8d75e6`, and the links note above. `briefClaimsNotReproduced` records three pre-investigation claims that did not hold up when re-measured. (1) The hero frame offset is not −120px at ≥1024 / −40px below: the live original and a fresh build of the current clone both measure −40px at ≥1024, −130px at 640–1023 and +45px below 640. (2) Not all links are absolute; only the footer's are. (3) The project's `dist/` is stale relative to `src/`. Page heights depend on viewport height, so the ledger records them with the viewport size.

`knownGaps` lists what the clone does not implement. These are documented gaps, not contracts:

- The four procedural canvases are static PNG stand-ins.
- The 91s product demo is a single static frame.
- The timeline has no dock-to-bottom variant.
- There is no ~300ms dropdown close delay.
- There is no skip link.
- The accordion transitions are not gated on reduced motion.

## Motion

Each section has its own `pattern` and `trigger` enums and a **const** `reducedMotionFallback`, and the motion object is closed (`additionalProperties: false`). Sections with distinctive motion are locked: the marquee (`static-row-drag-only`), the scroll-sink (`static-no-sink`), the timeline (`static-frame-timeline-paused`), the tab wipe (`instant-switch-no-reveal`) and the CTA cursor (`cursor-without-spin`). On both the original and the clone, 0 animations were measured running under `prefers-reduced-motion: reduce`.

## Verify

Requires Python 3.9+ and `jsonschema`.

```bash
python3 extraction/verify_all.py              # all checks; exit 1 on any FAIL
python3 schema/semantic_validate.py schema/example.pagespec.json schema/example.generated.pagespec.json
python3 schema/tests/adversarial_test.py      # every mutation rejected, every control passes
python3 extraction/drift_proof.py             # proves the drift checks fail on injected defects
```

## Version fields

`allowlistVersion` and `pageSpecVersion` (1.1.0: adds required `mode` and the brand roles) are machine-checked by `verify_all.py`, against the allowlist and the schema const. `repositoryVersion` and the CHANGELOG headings are documentation only. Nothing enforces them (see `versionFieldNote` in the manifest).

## Packaging

The sibling `design-repo.zip` is built with the CLI `zip -r -X`, excluding `.DS_Store`, `__MACOSX` and `__pycache__`. It is regenerated last, after every change. It must never be committed next to this folder.
