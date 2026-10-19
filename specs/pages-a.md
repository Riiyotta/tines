Source: https://www.tines.com/

# Group A page specs: marketing one-offs

Pages: `/pricing/`, `/3b/`, `/3b/examples/`, `/customers/`, `/book-a-demo/`, `/about/`, `/ai-in-tines/`, `/enterprise/`, `/soar/`, `/careers/`, `/contact/`, `/partners/`.

**Measurement.** All 12 URLs were measured live with headless Playwright (Chromium) on 2026-10-19. Every URL returned 200 and none redirected; the final URL equals the requested URL. Each page was loaded at 1440, 1024, 768 and 390 wide (viewport height 900). Values come from `getComputedStyle` and `getBoundingClientRect`. The Intercom banner (48px) and Cookiebot were removed before measuring, so y=0 is the top of the nav.

**Colors.** The site declares colors as `color(display-p3 …)` and also declares an sRGB hex for every token. Hex values below are that sRGB value. `(name)` gives the matching `--c-*` token. Where the project's `tailwind.config.cjs` already has the token, the Tailwind name is used (`purple-55`, `green-10`, `lightest`, …). `(p3~)` means the color is not one of the site's named tokens; its hex was converted from P3 and is accurate to ±1.

**Units.** `html{font-size:62.5%}`, so `1rem = 10px` on the original. All values here are in px.

**Screenshots.** `reference/pages/<slug>-1440.png` and `-390.png`. Slugs: `pricing`, `3b`, `3b-examples`, `customers`, `book-a-demo`, `about`, `ai-in-tines`, `enterprise`, `soar`, `careers`, `contact`, `partners`. They were stitched from 900px viewport captures. Headless `fullPage` capture drops Roobert 500/600 glyphs (`font-display:block`), so fullPage was not used. Sticky elements were made static during capture, so the images show natural document flow.

**Assets.** `specs/assets-a.json` lists every downloaded file and its local path. Inline SVGs are in `reference/svg/pages/<slug>-<name>.svg`.

---

## 0. Two site templates (read first)

| Template | Pages | Notes |
|---|---|---|
| **Next.js v5** (CSS modules, the same stack as the homepage) | pricing, 3b, 3b/examples, customers, about, ai-in-tines, contact, partners | `SiteNav26` + `SiteFooter26`, the same components as the homepage. Sections use the shared `PageSection`, `Button`, `CtaButtons` and `WildCodeCTASection` modules. |
| **Legacy Gatsby 5.14.5** (hashed classes like `hef1dx9`) | book-a-demo, enterprise, soar, careers | The nav and footer are a DOM-identical port of SiteNav26/SiteFooter26: same layers `.blur` / pill / `.bar`, 68px, same columns. Body sections use an older design language: a legacy button with 7px radius and Roobert 600 14px; a legacy palette where text is `#4d3e78` on enterprise; `ContentCard`; an "explosive" CTA. |

### 0.1 Page theme (needed for reuse of Navbar / Footer / CtaStartToday)
Every page sets a page background and foreground, and the nav, footer and CTA inherit them. Nothing else about those components changes. Measured:

| Page | `html` bg | Foreground (`color` on body, nav, footer, CTA) | Nav blur layer bg / pill bg | Filled button (CTA "Sign up free") | Outlined button |
|---|---|---|---|---|---|
| homepage (reference) | `#fcf9f5` lightest | `#714bd0` purple-55 | lightest @.7 / @.9 | bg purple-55, text lightest | border purple-55 |
| pricing | `#7a56e0` purple-50 | `#ffffff` | purple-50 @.7 / @.9 | bg `#ffffff`, text purple-50 | border `#fff`, text `#fff` |
| 3b | `#ece8fd` purple-5 | `#714bd0` purple-55 | purple-5 @.7 / @.9 | bg purple-55 | border purple-55 |
| 3b/examples, customers, contact, partners, ai-in-tines | `#fcf9f5` lightest | `#5d38ae` purple-65 | lightest @.7 / @.9 | bg purple-65, text lightest | border purple-65 |
| about | `#1f1c27` (coolGray95) | `#fcf9f5` lightest | `#1f1c27` @.7 / @.9 | bg lightest, text `#1f1c27` | border lightest |
| book-a-demo | `#ece8fd` purple-5 | `#5d38ae` purple-65 | purple-5 @.7 / @.9 | n/a | n/a |
| careers, soar | `#fcf9f5` | `#5d38ae` purple-65 | lightest @.7 / @.9 | n/a | n/a |
| enterprise | `#fcf9f5` | `#4d3e78` (legacy, p3~) | lightest @.7 / @.9 | n/a | n/a |

Implementation: give each page module an exported `theme = { bg, fg, buttonFilledBg, buttonFilledFg }`. Set the values as CSS variables (`--page-bg`, `--page-fg`) on a layout wrapper. Navbar, Footer and CtaStartToday then use `bg-[var(--page-bg)]` / `text-[var(--page-fg)]` / `currentColor` in place of the hard-coded `purple-55` / `lightest`. Nav dropdown panels keep their own colors on every page: tile purple-60 with lightest text, Stories tile purple-5 with purple-75 text (verified on pricing, about and 3b).

New tokens to add (Tailwind `colors`): `purple-65 #5d38ae` (already present), `coolgray-95 #1f1c27`, `coolgray-99 #181420`, `coolgray-80 #3b3945`, `legacy-ink #4d3e78`. Also the per-page card palettes listed in each section below: orange/pink/lime/blue/teal steps that aren't in the config yet. The `--c-*` hexes they map to are in each section.

---

## REUSE MAP

Legend: **(a)** existing component as-is; **(b)** existing component plus a prop/variant (the difference is stated); **(c)** new section. **[S]** = shared pattern, see the list after the map; build it once in `src/components/shared/`.

Global chrome, verified on all 12 pages:
- **Navbar → (b) `theme`.** DOM, sizes and items match the homepage instance exactly: header 1440×68, items Product▾ / Solutions▾ / Customers / Discover▾ / Pricing, and the same dropdown contents. Only the colors differ, per 0.1. **soar** uses **(b) `variant="simple"`**: header 62px tall, `nav` items hidden (`display:none`), the right group shows only text CTAs "Log in" and "Sign up" (pad 8px 14px, r 50, Roobert 600 14px), and "Book a demo" and search are hidden.
- **Footer → (b) `theme`.** Same 5 columns and the same x-positions (40 / 372 / 727 / 999 / 1255), 862px tall at 1440. **soar** uses **(b) `variant="simple"`**: only the bottom bar is rendered (grid `501.6px 324.7px 501.6px`, gap 16, pad 40, 120px tall) with "© Tines", the "Ask AI about Tines" pill and "Cookie settings".
- **CtaStartToday → (b) `theme` plus a `className`/margin override.** The WildCodeCTASection is the same as the homepage: 1440×518, pad `30px 40px 96px`, wordmark region 1360×299 at mt -46.23, tagline 528 max, buttons `140px 140px` gap 8, and the same copy. It inherits page colors (0.1). Its `margin-top` is 0 on most pages because the preceding spacer provides 156; it is 156 on ai-in-tines and the homepage. The legacy pages (book-a-demo, enterprise, soar, careers) do not use it.

| Page | # | Section | Reuse |
|---|---|---|---|
| **pricing** | 1 | Hero: two illustrations and a centered "Pricing" H1 | (c) PricingHero |
| | 2 | Plan cards (Free edition / Paid editions) | (c) PricingPlanCards |
| | 3 | Logo marquee | (b) **LogoSet** from Hero.jsx, exported, with `size="lg"`: logos at 1.25× (118×26 vs 94×21), box 47 tall (vs 37), fill `currentColor` (white). Same 11 logos and order, gap 45, 41.625s. |
| | 4 | Quote ribbon (Emanuele Sparvoli) | (c) **[S] SplitRibbonCard** (`variant="quote"`) |
| | 5 | "Don't take our word for it" + G2 badges | (c) **[S] SectionHeading2** + **[S] G2BadgeList** |
| | 6 | FAQs | (c) **[S] FaqAccordion** (`size="lg"`, centered serif heading) |
| | 7 | Start today CTA | (b) CtaStartToday `theme` (white) |
| **3b** | 1 | Area sub-nav | (c) **[S] AreaNav** |
| | 2 | Hero ("The AI-native intelligent workflow platform") + side pull-quote + video player | (b)+(c). The copy block (H1 64/67.2 -0.03em, byline Reckless 24/31.2 mt 19.2, actions grid 140×2 gap 8 mt 24) is identical to Hero.jsx's copy block. Extract **HeroCopy** from Hero.jsx and reuse it. New: **[S] PullQuoteCard**, **VideoPlayer** (replaces the TimelineBar and product visual), flower-field backdrop. No tag pill, no marquee, no 100× wordmark (`ThreeBHero__noWordmark`). |
| | 3 | Explore Tines 3B (kicker + big serif statement + garden canvas) | (c) |
| | 4–6 | Three bento sections (Build / Run / Monitor) | (c) **ThreeBBento** with `accent="orange|green|purple"` (one component, three data sets) |
| | 7 | Coda ("From idea to production…") | (c) |
| | 8 | Frequently asked questions | (c) **[S] FaqAccordion** (`size="md"`, left sans heading) |
| | 9 | Start today CTA | (b) CtaStartToday `theme` (purple-55 on purple-5) |
| **3b/examples** | 1 | Area sub-nav, with crumb "› Examples" + theme toggle | (c) **[S] AreaNav** (`crumb`, `utilities`) |
| | 2 | Catalogue: sticky sidebar + featured row + card grid + table + pagination | (c) ExamplesCatalogue |
| | 3 | Start today CTA | (b) CtaStartToday `theme` (purple-65) |
| **customers** | 1 | Area sub-nav ("Customers" pill, link "All case studies") | (c) **[S] AreaNav** |
| | 2 | Customers hero (illustration + split header) | (c) CaseStudiesHero |
| | 3 | Case-study book-card grid (9) + "See all case studies" | (c) **[S] CaseStudyBookCard** grid |
| | 4 | Mobile-only "Recognized as a leader…" cards | (c) RecognitionCards; uses **[S] G2BadgeList** |
| | 5 | Accreditation masonry (3 parallax columns) | (c) AccreditationGrid; uses **[S] CaseStudyBookCard**, **G2ReviewCard** |
| | 6 | Start today CTA | (b) CtaStartToday `theme` |
| **book-a-demo** | 1 | Backdrop (product-card illustrations with parallax) + marquee | (c) DemoBackdrop + (b) **LogoSet `size="lg"`** (same 1.25× scale and timing as pricing; fill purple-65) |
| | 2 | Demo form card ("Talk to a product expert") | (c) **[S] DemoForm** |
| **about** | 1 | About hero (kicker, 2-line serif H1, text, big SVG illustration) | (c) |
| | 2 | How it started + Our mission card | (c) |
| | 3 | Our leadership (8 cards) | (c) |
| | 4 | Backed by the best (8 investor logos) | (c) |
| | 5 | Our values (3 cards) | (c) **[S] ValueCards** (`variant="about"`) |
| | 6 | Join our team card | (c) |
| | 7 | Start today CTA | (b) CtaStartToday `theme` (dark) |
| **ai-in-tines** | 1 | Hero ("Your AI interaction layer") | (c) **[S] SimplePageHero** (left-aligned) |
| | 2 | Hero banner ribbon (header panel + quote figure) | (c) **[S] SplitRibbonCard** (`variant="figure"`) |
| | 3 | Extend your AI… (2×2 cards) | (c) |
| | 4 | Taking trust seriously (ribbon + badges + lists) | (c) **[S] SplitRibbonCard** |
| | 5 | Bring your own (2 figure cards) | (c) |
| | 6 | A practical way… (4 highlight cards) | (c) |
| | 7 | Centered quote (IDC) | (c) **[S] PullQuoteCard** (`variant="centered"`) |
| | 8 | Start today CTA | (b) CtaStartToday `theme` (mt 156) |
| **enterprise** (legacy) | 1 | Hero (kicker, light-serif H1, text, button) | (c) **[S] LegacyHero** |
| | 2 | "Trusted by global leaders" logo marquee | (c) **[S] LegacyLogoMarquee** |
| | 3 | "Tines changes the way teams operate" (3 columns) | (c) |
| | 4 | Build, run, and monitor (heading + 5 feature cards) | (c) |
| | 5 | Enterprise scalability (masonry stat/quote cards) | (c) |
| | 6 | A platform for organization-wide… (7 vertical tabs + panel) | (c) |
| | 7 | See more practical examples (5 colored tiles) | (c) |
| | 8 | Partnered with the companies you trust (logo wall) | (c) |
| | 9 | With you every step of the way (split card) | (c) **[S] SplitRibbonCard** (`variant="legacy"`) |
| | 10 | G2 badges row (6) | (c) **[S] G2BadgeList** (`size=120`) |
| | 11 | Content cards (5) | (c) **[S] ContentCard** grid |
| | 12 | Explosive CTA ("Built by you, powered by Tines") | (c) **[S] LegacyExplosiveCta** |
| **soar** (legacy, simple chrome) | 1 | Hero ("Break away from legacy SOAR") | (c) **[S] LegacyHero** (`split`) |
| | 2 | Modernize your security approach (icon + centered heading) | (c) **[S] CenteredIntro** |
| | 3 | 3 stat cards | (c) |
| | 4 | Meet Tines (heading + illo) | (c) |
| | 5 | Trusted by industry leaders (two-row marquee in a bordered box) | (c) **[S] LegacyLogoMarquee** (`rows=2`) |
| | 6–10 | 5 alternating feature rows (text + video figure) | (c) FeatureRow, ×5 |
| | 11 | For the whole team (quote ribbon) | (c) **[S] SplitRibbonCard** (`variant="quote"`); the same ribbon geometry as pricing |
| | 12 | Key resources heading | (c) **[S] CenteredIntro** |
| | 13 | 7 content cards | (c) **[S] ContentCard** grid |
| | 14 | Closing statement + "See Tines in action" | (c) |
| | 15 | Sounds… hard to believe? (split card + quote mosaic) | (c) **[S] SplitRibbonCard** (`variant="legacy"`) |
| | 16 | Talk to a product expert (demo form) | (c) **[S] DemoForm** (`variant="embedded"`) |
| **careers** (legacy) | 1 | Hero ("Join our team" giant serif) | (c) |
| | 2 | YouTube embed | (c) |
| | 3 | 3 stats strip | (c) |
| | 4 | Where we work (parallax office tiles) | (c) |
| | 5 | Our values (3 cards) | (c) **[S] ValueCards** (`variant="careers"`) |
| | 6 | Hear from our team (5 article cards + "More in our blog") | (c) **[S] ArticleEntryCard** grid |
| | 7 | Awards (3) | (c) |
| | 8 | Benefits (12 items) | (c) |
| | 9 | Open positions (filters + table, 34 rows) | (c) |
| | 10 | Inclusion matters | (c) |
| | 11 | Explosive CTA | (c) **[S] LegacyExplosiveCta** |
| **contact** | 1 | Hero ("Contact us") | (c) **[S] SimplePageHero** (centered) |
| | 2 | Department cards (2 primary + 4 secondary) + fallback text | (c) |
| | 3 | Our offices (Dublin, Boston) | (c) |
| | 4 | Contact support (form + sidebar) | (c) |
| | 5 | Start today CTA | (b) CtaStartToday `theme` |
| **partners** | 1 | Area sub-nav ("Partners" › Overview) | (c) **[S] AreaNav** |
| | 2 | Hero (2-line H1, buttons, SVG illustration) | (c) |
| | 3 | Directory search + Channel/Technology partner panels | (c) |
| | 4 | Make your tools… + 2 quote cards | (c) **[S] SectionHeading2** + **[S] QuoteCard** |
| | 5 | Backed by the companies you trust (2 article cards) | (c) **[S] ArticleEntryCard** |
| | 6 | Get the latest updates (4 content cards) | (c) **[S] ContentCard** |
| | 7 | Start today CTA | (b) CtaStartToday `theme` |

Section counts: pricing 7 · 3b 9 · 3b/examples 3 · customers 6 · book-a-demo 2 · about 7 · ai-in-tines 8 · enterprise 12 · soar 16 · careers 11 · contact 5 · partners 7. These counts exclude the Navbar and Footer.

### Shared patterns (appear on 2+ pages in group A). Build these in `src/components/shared/`
1. **PageTheme** (layout infra, not a visual): sets `--page-bg` / `--page-fg` (see 0.1). Navbar, Footer and CtaStartToday consume it. Used by all 12 pages.
2. **AreaNav** (sub-nav bar under the main nav): 3b, 3b/examples, customers, partners. Spec in §2.1.
3. **FaqAccordion**: pricing (size lg, centered Reckless heading) and 3b (size md, left Roobert heading). Native `<details>`, plus/minus marker. Spec in §1.6.
4. **SectionHeading2** (centered Reckless 400 46/48.3, -0.92px; at 390: 32/33.6, -0.32px; mb 55 / 35): pricing (×2), partners (×3). contact uses 46/52.9. The legacy pages use the same 46/48.3 role.
5. **G2BadgeList**: pricing (6 badges, 140 wide), customers mobile (90 wide, 3-col grid), enterprise (120 wide, links). Spec in §1.5.
6. **SplitRibbonCard** (two-panel card where the left "tab" panel is offset vertically and overlapped by the right panel): pricing quote, soar "For the whole team", ai-in-tines hero banner and trust, enterprise "With you every step", soar "Sounds… hard to believe?". Spec in §1.4 and §7.
7. **PullQuoteCard / QuoteCard**: 3b (ThreeBPullQuote: frosted card), ai-in-tines (centered quote), partners (QuoteCardNeue: colored card). Variants are listed per page.
8. **ContentCard** (resource card: eyebrow, Reckless title, bold CTA, icon bottom-right): partners (4), enterprise (5), soar (7). Spec in §12.6.
9. **ArticleEntryCard** (cover image r10, title Roobert 500 18/21.6): partners (2-col 552) and careers (3-col 360).
10. **CaseStudyBookCard**: customers (grid and masonry). Defined once; it also shows up in group B case-study pages.
11. **ValueCards** (Simplicity / Speed / Soundness, same body copy): about and careers. The styling differs per page, so expose a variant prop.
12. **DemoForm** (legacy HubSpot-style form: Business email / First / Last / Phone / Company / Country select / textarea / 2 consent checkboxes / submit): book-a-demo and soar.
13. **LegacyExplosiveCta** ("Built by you, powered by Tines" card with exploding decorations): enterprise, careers.
14. **LegacyHero / CenteredIntro / LegacyLogoMarquee / LegacyButton**: enterprise, soar, careers.
15. **SimplePageHero** (H1 Reckless + short text + optional buttons): ai-in-tines (left), contact (centered).
16. **PageSection** container: `max-width:1128px; padding:0 156px` at 1440 (0 125 @1024, 0 70 @768, 0 18 @390), and a `wider` variant with `max-width:1520px; padding:0 40px` (35 / 30 / 18). Sections are separated by a 156px spacer (140 @1280, 125 @1024, 120 @768, 96 @390), which is the existing `mt-section-margin` token. Used on pricing, about, ai-in-tines, partners and customers.

### Buttons used in this group (map to `src/index.css`)
- `.btn .btn-filled / .btn-outlined / .btn-frosted / .btn-filled-white`: unchanged (Mono 700 13/13, h 35.75, pad 0 18.2, r 9990). Their colors follow the page theme.
- **Button "sans" (not mono)**: Roobert 600 14/14, h 39, pad `0 19.6px` (390: `10.5px 17.5px`), r 9990, 1px border. Used by contact cards, customers "See all case studies", recognition cards and partners. Add it as `.btn-sans` (size modifier).
- **Pricing card CTA**: h 42, w 160, pad 0 18.2, border `1px 1px 3px` with the bottom border `rgba(0,0,0,.1)` (a "3D" lip). On `:active` the inner element gets `border-bottom: 2px solid rgba(0,0,0,.1)`.
- **LegacyButton** (Gatsby pages): h 39, pad 0 14px, r 7px, Roobert 600 14/14, filled = bg page ink, text `#fff`. The outlined version uses a 1px border in ink. The legacy "pill" variant (soar, careers) has r 9990 and pad 0 24.5 (mono version: pad 0 22.75, Mono 700 13).
- **Hover rules** (from CSS): filled `filter:brightness(1.1)`; outlined/frosted/transparent `background-color: var(--unfilledHoverBg)` (currentColor 10% over page bg, at 85%); filledWhite `color-mix(lightest 90%, transparent)`; `transition: filter .1s, background-color .1s`; the label uses `opacity .1s`.

---
