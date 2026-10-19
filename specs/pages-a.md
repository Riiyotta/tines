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
8. **ContentCard** (resource card: eyebrow, Reckless title, bold CTA, icon bottom-right): partners (4), enterprise (5), soar (7). Spec in §13.5.
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
## 1. `/pricing/` (theme: bg purple-50 `#7a56e0`, fg `#ffffff`, dark mode). Page h 4048 @1440 / 3684 @390
`div.page` padding `30px 0 156px` (390: `30px 0 96px`). The sections below follow the nav (68).

### 1.1 Hero (`page__hero`): y 98, h 201
- Inner grid `490px 320px 490px`, gap 30, max 1360 (1024: `293 320 293`, gap 24; ≤768: 1 column, gap 18, and the right illustration is `display:none`). Section margin-bottom 24 (1024: 18; ≤768: 45).
- Left figure: flex justify-end, inline SVG 240×201 (viewBox 0 0 400 335), a retro monitor with floating colored bars: `reference/svg/pages/pricing-3hxbxq-heroillustration.svg`. Right figure: flex justify-start, the mirrored variant `pricing-3hxbxq-heroillustration-2.svg`. At 390 the left illustration is 200×168, centered, above the title.
- H1 "Pricing": Roobert 400 64/64, ls -1.92px, `#fff`, centered (390: 48/48, ls -0.96).

### 1.2 Plan cards (`PricingPlanCards`): inside PageSection (max 1128, pad 0 156). Grid `552px 552px`, gap 24 (1024: 375×2; ≤768: 1 column, gap 24 / 16 @390)
Each `article` is a 1-column grid, pad `0 30px 30px` (1024: `0 24 24`; ≤768: `0 18 18`), r 14 (390: 12), 1px border, `overflow:hidden`, h 368.
- **Free card**: bg `#e4eee7` green-5, border `#50bc8c` (green30), text `#00573c` (green70).
- **Paid card**: bg `#542f9c` purple-70, border `#7a56e0` purple-50, text lightest.
- Top pill (tab hanging from the top edge, centered): pad `7px 12px 8px`, r `0 0 9px 9px`, Mono 600 12/13.8 ls .24 uppercase. Free: bg `#aedac2` green-15, text green70. Paid: bg `#d0c8ff` purple-15, text purple-70. Labels: **"Explore"**, **"Deploy"**.
- H2 (mt 32): Roobert 500 32/36.8, ls -0.64, centered. **"Free edition"** / **"Paid editions"**.
- Description (mt 16): Roobert 600 16/20, centered. "For experimenting with intelligent workflows." / "For intelligent workflows across your entire organization."
- Button row (mt 10, margin `0 -40px` so the divider line spans the full card): a horizontal 1px rule runs through the row center (visible in the screenshot, a line at the button's mid-height). The CTA is centered, 160×42, Mono 700 13, the "3D" lip variant (see Buttons). Free: bg `#239667` (p3~ green), text `#fff`, **"Get started"** → signup. Paid: filledWhite (bg lightest, text purple-55), **"Get pricing"** → `/book-a-demo/`.
- Feature row (mt 24): grid `1fr 50px` (paid `1fr 63px`), the list bottom-aligned. `ul` items: Roobert 500 14/16.8, pad-left 17.5 with a check glyph, row gap 5.25.
  - Free: "Unlimited users, spaces, and connectors", "3 live workflows", "One time $50 AI allowance"
  - Paid: "Unlimited users, spaces, and connectors", "Unlimited workflows", "Flexible deploy options to fit your organization’s needs", "Bring your own AI model"
  - Right icon: an inline SVG robot-on-pedestal, 42×106 / 55×106 (`pricing-ugahsw-icon.svg`, `-icon-2.svg`), fill currentColor.

### 1.3 Logo marquee (`page__logoSection`): margin `55px 0 156px` (390: `35px 0 96px`), pad 0 40, max 1520
- Reuse **LogoSet** with `size="lg"`: mask/box same as homepage (`margin 0 -20px; padding 4px 0`), box 1408×47; track gap 45 (390: 20); logos fill currentColor (#fff). Rendered sizes: 118×26, 157×37, 96×32, 157×36, 155×34, 142×29, 148×36, 133×34, 108×19, 67×36, 124×17 (= homepage × 1.25). `--marqueePeriod:1665px`, 41.625s linear infinite (unchanged from home; the original keeps the home period even at the larger size, so copy it as-is).

### 1.4 Quote ribbon (`PricingQuotesGrid__ribbon`): PageSection; grid `140px 800px` (1024: `140 634`; ≤768: 1 column, the header tab is hidden)
- Header "tab" (left): 140w, full height 397, pad-right 71, bg `#6741bf` purple-60, border 1px `#9274f4` purple-40, r `14px 0 0 14px`, `transform: translateY(-24px)`. Its top-right corner shows a folded 45° flap (see screenshot).
- Content: margin-left -72 (overlaps the tab), pad `32px 48px` (390: `32px 24px`), same bg/border, r `0 14 14 0` (390: r 12 all).
  - 40×40 quote-mark SVG (fill purple-5).
  - Blockquote (my 30): Reckless 400 30/37.5, ls -0.3, color purple-5 `#ece8fd`. **48 words**; gist: an IT leader says Tines 3B lets employees build workflows while IT keeps governance. (390: 20/26, ls -0.2, centered.)
  - Figcaption: name **"Emanuele Sparvoli"** Roobert 700 14/19.6; title "Senior Director of IT, Fin" Roobert 500 14/19.6.
- Only one quote renders; there are no carousel controls.

### 1.5 "Don’t take our word for it" + G2 badges: mt 156 (96 @390)
- **SectionHeading2** centered, mb 55 (35): Reckless 400 46/48.3 ls -0.92 (390: 32/33.6 ls -0.32), color `#fff`.
- **G2BadgeList**: `ul` flex, centered, gap 40; `li` 155w; img max-width 140 (rendered 140×161; natural 130×150). At 390: grid 3 columns (107px), gap 16, img max 90 (90×104). Badges in order (local `public/assets/pages/pricing/`): Leader.svg, MostImplementable.svg, BestUsability.svg, BestRelationship.svg, EasiestToDoBusinessWith_Enterprise.svg, FastestImplementation_Enterprise.svg. Alt text pattern: "Tines is a Leader on G2, Fall 2026".

### 1.6 FAQs (`PricingFaqSection`), shared **FaqAccordion**: mt 156; PageSection `wider` (pad 0 40, max 1520)
- Heading "FAQs": SectionHeading2 (Reckless 46/48.3 centered). List mt 55 (35).
- Each `details` item has border-top 1px `color-mix(currentColor 20%, transparent)`; the last also has border-bottom.
- `summary`: flex space-between, align center, gap 24 (1em), pad `30px 0` (390: 18 0), Roobert 600 **24/33** (rem: 1.8rem base, 2rem ≥768, 2.4rem ≥1024; 390 = 18/24.75). Native marker hidden.
- Marker: 16×16 box; `::before` 14×2 bar and `::after` 2×14 bar (currentColor), centered → "+". `[open]` hides `::after` → "−". **No open/close animation** (native details).
- Answer: pad-right 32 (2em), pad-bottom 30 (md), Roobert 500 16/22.4; links `text-decoration: underline; font-weight 500; color inherit`.
- Questions (verbatim): "Do you offer flexible hosting options?", "Where can I find more information about pricing?", "Where can I find examples of Tines 3B in action?", "Is there a community I can join?", "Do you offer startup discounts?". Answers are 1–2 sentences (~15–25 words), each with one inline link (e.g. "Talk to our team" → /book-a-demo/, "docs" → docs.3b.tines.com).
- FaqAccordion variant table:

| prop | pricing (`size="lg"`) | 3b (`size="md"`) |
|---|---|---|
| heading | Reckless 400 46/48.3 centered (SectionHeading2) | Roobert 500 42/46.2 ls -1.26, left, max 840 (390: 32/35.2 ls -.64) |
| question | Roobert 600 24/33 | Roobert 600 22/30.25 (390: 18/24.75) |
| gap | 24 | 22 |
| answer p | 16/22.4 | 18/25.2, max-width 1152 (64em), `p+p` mt .75em |

### 1.7 CTA: CtaStartToday, theme white (filled = bg `#fff` text purple-50; outlined = border/text `#fff`). Section mt 0 (the page's 156 bottom padding precedes it).

Motion (pricing): the marquee only, plus the button hovers. There are no scroll reveals. The two `FlowerField` canvases registered on every page belong to the Navbar dropdown hero art (they are already in Navbar).

---

## 2. `/3b/` (theme: bg purple-5 `#ece8fd`, fg purple-55). Page h 8692 @1440 / 11560 @390

### 2.1 AreaNav (shared): directly below the nav, 1440×62
- `.bar`: pad 0 40 (390: 0 18), max 1520. `.inner`: flex, align center, gap 10, pad 15.45 0, **border-top 1px `color-mix(currentColor 12%, transparent)`**. Not sticky (position relative, z 200).
- Left pill: `a` 24 tall, pad `4.2px 12.6px`, r 990, Roobert 600 14/16.1, bg purple-10 `#ded8ff` on the 3b page (on lightest-bg pages: purple-5 `#ece8fd`), text purple-60. Hover: bg `var(--areaNavPillBgHover, purple-10)`. The label is the section name ("Tines 3B", "Customers", "Partners").
- Optional crumb (examples, partners): margin-left 2.5, gap 12.5; separator = a CSS triangle (border `3px 0 3px 4px`, opacity .4); then the current page: Roobert 600 14/16.1, color `#8d75e6` (accent). Partners: "Overview"; 3b/examples: "Examples" (link).
- Right group (`margin-left:auto`), gap 6: section links, each pad `6px 12px`, r 50, Roobert 600 14/16.1, gap 4 to the external mark "↗" (10.92px, opacity .6, translate(-1.6px,-4.6px)). Hover: bg currentColor 10%.
  - 3b: **Examples** → /3b/examples/, **Updates** → /3b/product-updates/, **Academy↗**, **Docs↗**; then the CTA pill **"Get started"**: pad `7px 16px`, r 990, Mono 700 12/13.8 uppercase, bg purple-10 (purple-5 on examples), text purple-60.
  - 3b/examples adds a theme toggle (30×30 round, an 18px sun icon; hover bg currentColor 10%) before the CTA.
  - customers: **All case studies** → /case-studies/all/ (flush end, no CTA).
  - partners: **Overview / Directory / Become a partner / Partner portal↗**.
- ≤767: the section links collapse (`.innerCollapsed`): only the pill, a "collapsedNav" label and the right CTA remain; the links move into a dropdown.

### 2.2 Hero (`ThreeBHero.noWordmark`): section pad-top 8.5, h 1195 @1440
- **Backdrop**: an absolute 1440×1455 clip region holding two canvas flower beds (`FlowerField`): left 544×281 at (−28, 1075), right 816×452 at (720, 286). Motion: `heroBedDrift` translateY(0 → var(--bedDrift, 10rem = 100px)), `animation-timeline: scroll(root); animation-range: 0px 100vh`, linear both. Canvas art is not extractable (same as the homepage flower beds); use static PNG fallbacks or reuse the homepage flower canvas approach.
- **heroTop**: flex, gap 55, pad 0 40.
  - Copy (reuse **HeroCopy**): H1 **"The AI-native intelligent workflow platform"** Roobert 400 64/67.2 ls -1.92, max 896 (1024/768: 56/58.8, max 784; 390: Roobert **500** 38/42.56, centered). Byline (mt 19.2, max 624): "One environment to deliver AI agents, apps, and automation: faster, safely, and at scale." Reckless 500 24/31.2 (390: Roobert 500 18/23.4, centered, max 288). Actions (mt 24) grid `140 140` gap 8: [BOOK A DEMO] filled → /book-a-demo/; [SIGN UP FREE] frosted (bg `rgba(236,232,253,.65)`, i.e. page bg at .65) → signup.
  - **Side quote, shared PullQuoteCard (`card`)**: 420×253, pad 42, r 42, bg `rgba(222,216,255,.55)` (purple-10 @.55), `backdrop-filter: blur(18px)`, max 544. Blockquote Reckless 400 24/31.2 ls -0.24: "Tines 3B gives us the visibility and control needed to govern workflows at scale." Figcaption mt 16.8, flex space-between gap 16: name "Chris Oh" (Roobert 700 14/19.6) / title "Senior Director, AI Enablement" (500 14/19.6); logo Headspace SVG 144×30 (`reference/svg/pages/3b-headspace.svg`). At 390 it moves below the video: margin `24px 18px 0`, pad 24, r 24, quote 18/23.4.
- **Video player** (`visualWell`, mt 96 / 40 @390, pad 0 40):
  - **Chapter labels** (absolute above the bar, from x 116): 3 tab buttons, 24 tall, pad `4.55px 14.3px 1.56px`, r `13px 13px 0 0`, bg purple-10 @.55, blur(16px), gap 6.5, with 8×8 fillet SVGs at both bottom corners. Dot 7×7 (active: `#008b53` green; others purple-55). Text Roobert 600 13/18.2 (active 700, color purple-75). Labels: **"Introducing Tines 3B"** (slot 172w), **"Monitoring"** (244w), **"Build and Run"** (746w); slot widths are proportional to chapter length. Entrance `labelRise` .4s cubic-bezier(.22,1,.36,1), staggered 0 / .05 / .1s (keyframes: clip-path inset(-1rem -1rem 100%) + translateY(100%) → none). Hidden at 390.
  - **Bar** (`VideoPlayer__bar`): 1312×40 (inset 24 each side), pad `8px 16px`, bg purple-10 @.6, blur(20px), r `18 18 0 0`. Transport flex gap 12: play/pause 24×24 round (20px icon, fill purple-65); track (pad 6 0) with 3 segments (146 / 246 / 763 px; 4px tall, r 999, bg `rgba(134,101,235,.25)`, fill purple-55) and a 12px playhead dot; time "0:00 / 7:46" Roobert 600 13/14.95.
  - **Frame**: 1360×775, pad `6px 6px 8px`, bg lightest, border `1px 1px 3px` purple-45 `#8665eb`, r 24. Screen: bg purple-97 `#1d142d`, 1px border `#aa94ff`, r 18, overflow hidden. Contents: an autoplaying muted looping **teaser video** `public/assets/pages/3b/3b-demo-teaser.mp4` (object-fit cover, 1344×755) under a full-cover teaser button with a centered pill **"Watch demo"** (pad `11px 18px`, r 999, bg `rgba(42,27,73,.6)` purple-90, blur(8px), Roobert 600 14 lightest, 16px play icon that blinks: `teaserPlayBlink` 1.2s steps(1) infinite, opacity 1↔0). Hover: pill bg purple-95; `.teaserTint` opacity .6. Clicking loads the full Wistia video (media id `3bbdsjxfjs`); clone with a `<video>` or an iframe embed. At 390 the frame is 354×199, r 24, and the bar sits above it (inset 18).
  - The video bottom edge is observed by an IntersectionObserver (`rootMargin: 0px 0px 25% 0px`) to start/stop playback.

### 2.3 Explore Tines 3B (`ThreeBExploreSection`): mt 128 (1024: 100; ≤768: 90). Grid `668 668` gap 24, pad 0 40 (1024: 465×2; ≤768: 1 column, gap 35)
- Copy column (margin-left 91.33 at 1440, i.e. inset), flex column:
  - Kicker (an h2 styled as the `.kicker` token): **"Explore Tines 3B"** Mono 700 13/13 ls .65 uppercase, mb 20.8 (centered at 768).
  - Statement `p`: Reckless 400 48/52.8 ls -0.48 (390: 32/35.2 ls -0.32). Lead `<strong>` Reckless 700: **"Every team deserves the freedom to move fast."**, then regular: "Every organization deserves the confidence that work is secure, governed, and built to scale." (~25 words total; short tagline, fine to keep).
- Visual: the "garden" canvas (420×453 box; canvas 1028×1337 overflows) with hanging monitors and flowers. Canvas-rendered and not extractable: take a static capture from the screenshot region (x 732–1400, y 1469–1922 @1440).

### 2.4–2.6 Bento sections (`ThreeBBentoSection`): each mt 156 (1024: 125; 768: 120; 390: 96), pad 0 40
Container `.bento`: bg `#ffffff`, r 48 (768: 32; 390: 24), pad 30 (1024: 24; 768/390: 18), CSS grid, gap 24 (768: 14; 390: 18).
- **Grid columns**: Build and Run use 12 equal columns (86.33px @1440); Monitor uses 13 columns (77.84px). 768: 2 columns (329px); 390: 1 column (318px).
- **Intro cell**: flex column, gap 9.6, pad `24px 0 55px 24px`, max 352 (390: centered, pad `32px 16px 35px`; at 768 it spans `1 / -1` and is centered). H2 Roobert 400 38/39.9 ls -0.76 with the lead word in `<strong>` 700 (390: 32/33.6). Desc Reckless 500 20/26. Accent color per section: **Build** orange-50 `#d15c08`; **Run** green `#007f4a` (= tab-it); **Monitor** purple-60 `#6741bf`.
  - "**Build** anything, anywhere" / "Turn ideas to production AI apps, automation and agents."
  - "**Run** securely, optimize continually" / "Keep data secure at every step and ship workflows that get smarter over time."
  - "**Monitor** everything" / "End-to-end visibility of spend, workflow performance, and value."
- **Tile** (`figure.tile`): flex column, pad 24 (390: 16), bg lightest, r 14 (390: 12). `.tileFeature` tiles add a 1px border `rgba(134,101,235,.55)`. Caption: H3 Roobert Mono 700 15/20.25 (768: 13/17.55), mb 6; `tileTitleFeature` puts an 18px icon before the title (gap 7.5). Body Roobert 500 16/21.6. Caption max 288 (wide: 368). Titles are purple-55 in all sections.
- **Placement at 1440 (grid-column / grid-row)**, same at 1024:

| Section | Tile (title) | col | row | size @1440 | visual |
|---|---|---|---|---|---|
| Build | intro | 1 / span 3 | 1 / span 2 | 307×365 | n/a |
| | Start with a prompt (tilePrompt) | 4 / span 5 | 1 / span 2 | 528×365 | purple-5 panel (r `14 0 0 0`, inset top-left 24/103) with a typing prompt: Mono 500 20/30 purple-50, text "Automate our onboarding checklist" typed char by char; caret 2px blink `promptCaretBlink` 1.1s steps(1). 55px mascot SVG top-left; bottom scrim gradient lightest .7→0 |
| | Chat (tileChat, feature) | 9 / span 4 | 1 | 417×317 | chat mock: framed card bleeding off the top-right (margin `-24 -24 0 24`, border-left/bottom 1px, r `0 0 0 14`), 36px icon, "Evening, Rowan" Roobert 700 16, input pill 300×48 with placeholder "Ask anything across your tools and data…" 11.5px + 26px round send button; caret blink `chatCaretBlink` 1.1s |
| | Code-first (bleedTop) | 1 / span 4 | 3 | 417×396 | `build-in-code.svg` 369×156 bleeding to the top |
| | Test as you build | 5 / span 4 | 3 | 417×396 | stopwatch SVG 117×142 (`3b-stopwatch-showing-the-current-local-time.svg`, live local time) |
| | Build from anywhere (bleedTop, fullWidth) | 9 / span 4 | 2 / span 2 | 417×444 | `build-anywhere.svg` 417×257 |
| | Spaces (overlay, feature) | 1 / span 3 | 4 | 307×396 | `build-spaces.svg` absolute + bottom scrim (lightest 0–25% → transparent) |
| | Skills (feature) | 4 / span 3 | 4 | 307×396 | `build-skills.svg` 123×126 floating: `tileFloat` 4s ease-in-out infinite (translateY 0 → -6% → 0) |
| | Branches (corner, stackedOverlay) | 7 / span 6 | 4 | 638×396 | copy column 245w (illustration `build-branches.svg` 161×92 flush-left) + corner visual SVG 900×608 cropped (`3b-kwifpg-tilecornervisual.svg`) |
| Run | intro | 1 / span 4 | 1 | 352×246 | n/a |
| | Sandboxed execution | 5 / span 3 | 1 / span 2 | 307×647 | `sandboxed-execution.svg` 168×250 centered |
| | Connectors (overlay, feature) | 8 / span 5 | 1 / span 2 | 528×647 | connectors SVG 612×438 (`3b-kwifpg-connectorsvisual.svg`) + scrim |
| | Deployed your way (peek, feature) | 1 / span 4 | 2 | 417×376 | `deployed.svg` 415×235 peeking from the top (translateY -11.77) |
| | Autofix (corner) | 1 / span 6 | 3 | 638×361 | `autofix.svg` 69×77 + corner SVG 900×560 (`-tilecornervisual-2.svg`) |
| | Autotune (corner) | 7 / span 6 | 3 | 638×361 | `autotune.svg` 52×83 + corner SVG (`-tilecornervisual-3.svg`) |
| Monitor | intro | 1 / span 5 | 1 | 352×188 | n/a |
| | Quote tile | 6 / span 8 | 1 / span 2 | 791×312 | PullQuoteCard `bento`: pad 48, r 14, bg purple-10 @.55 blur(18); quote Reckless 400 36/46.8 ls -0.72 max 900: "Tines 3B gives us the power of a custom internal tool without the engineering overhead."; "Emanuele Sparvoli" / "Senior Director of IT, Fin"; Fin logo 76×30. Behind it a flower canvas bed (593×198) with `quoteFlowerParallax` translateY(-8rem → 8rem) on view-timeline `--quoteFlowerView` |
| | AI Spend (corner) | 1 / span 5 | 2 / span 2 | 485×424 | `ai-spend.svg` 103×129 + dashboard SVG 678×465 (`-tilecornervisual-4.svg`) |
| | Access (overlay) | 6 / span 3 | 3 | 282×300 | access-map SVG 308×142 (`3b-kwifpg-accessmapvisual.svg`) |
| | Duplicates (corner) | 9 / span 5 | 3 / span 2 | 485×424 | `duplicates.svg` 90×98 + SVG 400×376 (`-tilecornervisual-5.svg`) |
| | Savings (overlay) | 1 / span 5 | 4 / span 2 | 485×424 | SVG 678×465 (`3b-kwifpg-tileoverlayillustration.svg`) |
| | Routes (feature) | 6 / span 3 | 4 / span 2 | 282×424 | `routes.svg` 95×174 |
| | Dependencies (overlay center) | 9 / span 5 | 5 | 485×300 | SVG 540×390 (`3b-kwifpg-tileoverlaycenter.svg`) |

  Grid rows @1440. Build: `317 24 396.3 396.3`. Run: `246.4 376.5 360.8`. Monitor: `187.6 100 300 100 300`.
- Tile copy: titles above are verbatim. Bodies are 13–22 words each, 1 sentence, describing the feature (e.g. Code-first: workflows are built in code with Git integration).
- At ≤768 the corner tiles become 1 column: the illustration img is `display:none`, the corner visual is absolute and scaled to 0.8, and the copy is pushed down (mt ≈193–215). Overlay visuals scale to 0.75–0.8.
- Hover on tiles: none defined (static).

### 2.7 Coda (`ThreeBCodaSection`): flex column centered, gap 40 (1024: 30; 390: 24), pad `96px 40px 192px` (1024: `96 35 192`; 390: `112 18 144`)
- Stamp image `3b/coda-stamp.svg` 123×129.
- Kicker "Build, run and monitor" (`.kicker`, centered).
- Statement Reckless 400 48/55.2 ls -0.48, max 768, centered (390: 32/36.8, max 512): "From idea to production: faster delivery, safer operations, and AI that scales with confidence."

### 2.8 FAQ (`ThreeBFaqSection`): pad 0 40, mb 96 (1024: 80; 390: 40). FaqAccordion `size="md"` (see table in 1.6)
- Heading: **"Frequently asked questions"**. List mt 55 (35).
- Questions: "Why does Tines 3B exist?", "Who is Tines 3B for?", "What is the pricing approach?", "Is there a free edition?", "How does Tines 3B integrate with existing tools?", "How is data and security handled in Tines 3B?". Answers: 25–48 words each (one paragraph). Gists: a single secure environment for every team; for builders across the business with IT and Security control; platform licence model; Explore plan = free; vendor-agnostic API/MCP; security-first by design.

### 2.9 CTA: CtaStartToday, theme purple-55 on purple-5 (1024: pad `24 35 80`, h 421).

Motion summary (3b): heroBedDrift (scroll root 0→100vh), labelRise (.4s, stagger .05), teaserPlayBlink 1.2s, promptCaretBlink and chatCaretBlink 1.1s steps(1), tileFloat 4s, quoteFlowerParallax (view timeline), flower canvases (IO rootMargin 50%), prompt typer (JS typing). Disable all under reduced motion.

---
## 3. `/3b/examples/` (theme: bg lightest, fg purple-65 `#5d38ae`). Page h 4152 @1440 / 4585 @390
### 3.1 AreaNav: pill "Tines 3B" (bg purple-5) › crumb "Examples" (accent `#8d75e6`) + right links + theme toggle + "Get started".

### 3.2 Catalogue (`ThreeBExamplesCatalogue`): pad `20px 40px 0`, max 1520. Layout grid `260px 1060px`, gap 40
**Sidebar** (`aside`): `position: sticky; top: 88px`, flex column gap 16, pad `0 0 20px 6px`, margin-left -6, `overflow:auto` (scrolls internally).
- Top box: pad 18, bg purple-5, border 1px `#d1c7ff` (no bottom border), r `12 12 0 0`, gap 12. H1 two block lines **"Examples" / "Gallery"**: Roobert 600 28/28 ls -0.56. Intro "Real-world examples of what you can build with Tines 3B." Roobert 500 14/19.6.
- Search row (mt -16, attached): bg purple-2 `#f5f2fb`, border 1px `#d1c7ff`, r `0 0 12 12`; label flex gap 8 pad `11px 18px`; 17px search icon at opacity .4; input placeholder **"Search examples…"** Roobert 500 14/16.1, color purple-80.
- Bookmarks: grid `126 126` gap 8. Each button is 126×85: flex column space-between, pad `11px 12px`, r 12, 1px border, a 24px icon top-left, the count top-right (Roobert 600 13/14.95, absolute), and the name bottom-left (Roobert 600 14/16.1). Items and colors:
  - IT 191: bg green-5 `#e4eee7`, border green-20 `#91d1af`, ink `#00693b`.
  - Security 104: bg purple-5, border `#c3b5ff`, ink purple-65.
  - RevOps 91 / Finance 41 / HR 51: the same pattern in their function hues (see screenshot).
  - **All 316** (active): bg and border purple-55, ink lightest.
  - Hover: bg `--acc10`, border `--acc40`; active hover bg/border `--acc55`. Focus-visible: 2px outline `--acc50`, offset 2.
- Filters (desktop is always visible; at 390 it sits behind a "Filters" pill button: pad 0 14, r 990, bg purple-5): 3 `details` accordions, each 260×50, border 1px `#d1c7ff`, r 25. Summary pad `14px 16px`, label Mono 600 12/20 ls .36 uppercase purple-80, with a CSS caret chevron (border `4px 3px 0`). Labels: **"Build types"**, **"Use cases"**, **"Works with…"**. Options are checkbox rows: pad `5px 8px`, r 6, gap 8; box 16×16 r 3 border 1px `rgba(63,35,116,.65)`; name Roobert 400 14/16.1; count right 13/14.95; "Works with" rows have an 18px tool logo (r 3). Option hover bg `--acc10`. Checkbox transition `background-color, border-color .1s`. Build types (5): "Agents" 82, "Websites and dashboards" 112, … Use cases (6): "Investigate and enrich" 54, "Monitor, alert and report on state" 76, … Works with: 93 tools (Slack 99, Salesforce 48, …).

**Main column** (flex column, gap 40):
- **Featured row**: grid `520 520` gap 20 (390: 1 column). Cards are buttons, 520×312, pad 18, r 16, 2px border in their bg color, flex column gap 24. Background: a function color (IT `#007442`; Finance `#007a78`). Behind the content an **icon lattice**: 6 rows of 1344×40 SVG icon strips, rotated/offset (`reference/svg/pages/3b-examples-qnftca-row*.svg`), drifting horizontally. IntersectionObserver thresholds 0.4 / 0 start and stop the drift (pause off-screen). Top-left: a frosted pill (pad 12/16, r 999, bg ink @.4, border `rgba(252,249,245,.3)`, `backdrop-filter: blur(8px) saturate(1.3)`) with 33px tool logos. Bottom: eyebrow Mono 500 13/14.95 + title Roobert 500 34/37.4 ls -1.02, color = the pale function tint (`#ffdeee` / purple-5). Titles: "IT · Automated device management for refresh cycles", "Finance & RevOps · Revenue recognition automation from Salesforce to NetSuite with human review". Hover: border `var(--secondaryFg55)`.
- **Card grid** (desktop only; `display:none` <768 in favor of `phoneList`): grid `340×3` gap 20. Card 340×199: pad 18, gap 28, 1px border in the function hue (HR/orange `#ffab70`, purple `#c3b5ff`), r 16, transparent bg. Tool-logo pill on top (pad `9px 14px`, r 999, bg function tint, e.g. `#ffe1c4`, 22px logos, gap 10). Eyebrow Mono 500 13 + title Roobert 600 20/24 ls -0.2 in the function ink (orange `#9d3e00`, purple-65). Hover: border `--acc50`. The 9 items (eyebrow · title) are short titles that may be kept verbatim: "IT & HR · Sync BambooHR out of office to Google Calendar with approval", "IT & Security · Agentic Threat Hunting", "IT & Security · AI-native security operations center with governed incident response", "IT · Simple Kanban to-do app with Slack integration", "HR & IT · Employment contract generator with Greenhouse integration", "HR · Interview case study generator with dummy datasets", "IT · Gmail email triage and filtering with AI prioritization", "HR · Internal "Guess who?" using employee directory", "RevOps & IT · Email content approval checker for marketing drafts".
- **Table** (`ThreeBExampleTable`): columns **Example** (511) / **Works with** (148) / **Function** (198) / **Author** (203). `th`: Mono 600 12/13.8 ls .36 uppercase, pad `0 16px 12px`, border-bottom 1px `#c3b5ff`. Rows 55–62 tall: `td` pad `12px 16px`, border-bottom 1px purple-10. Title is a button, Roobert 600 16/18.4. Tools: pill (pad `5px 9px`, r 999, bg purple-5) with 20px logos (r 4) gap 6. Function pills: pad `3px 9px`, r 999, Roobert 500 13/14.95 (IT: bg green-10 / ink `#00452a`; RevOps: bg blue-10 `#d4dff3` / ink blue-80 `#192f7d`). Author: Roobert 500 14/16.1. Row hover: bg `--acc5`, border `--acc35`. 25 rows per page.
- **Pagination**: a `nav` pill (pad `7px 5.25px`, r 990, bg `#f3ecf7`, flex space-between). "← Previous" / "Next →" buttons (pad `10.5px 17.5px`, r 5.6, Roobert 500 14; Previous disabled at opacity .3). Page buttons 35×35 r 5.6; current: bg `#eadff8`, Roobert 700, color `#6956a8`. Shows 1–13 with an "…" ellipsis (opacity .4). Mobile label "Page 1 / 13".
- **390**: sidebar → top box + search + horizontally scrolling bookmarks; featured cards stack (358 wide); the grid and table are replaced by `phoneList` (a stacked card list). Data is CMS-driven (316 examples). Build with a local JSON sample of ~25 rows.

### 3.3 CTA: CtaStartToday, theme purple-65.

Assets: 120 tool logos (DatoCMS) in `public/assets/pages/3b-examples/` (e.g. `1684522920-logo-slack.svg`); lattice rows in `reference/svg/pages/3b-examples-*`.

---

## 4. `/customers/` (theme: bg lightest, fg purple-65). Page h 7084 @1440 / 10147 @390
`div.page` pad-bottom 80, `overflow: clip`.

### 4.1 AreaNav: pill "Customers"; right link "All case studies" (flush end).

### 4.2 Hero (`CaseStudiesHero`): pad `60px 156px 64px` (1024: 125; 768: 70; 390: `40px 18px 35px`)
- Illustration `public/assets/pages/customers/case-studies-hero-illustration.svg` 1128×447, margin `-33.8px 0 55px`, centered.
- Split grid `552 552` gap 24 (390: 1 column gap 16, centered):
  - Kicker (`AllCaps`): **"Power users, powerful stories"** Mono 700 11.5/16.1 ls 1.15 uppercase.
  - H1 (mt 24): **"Customers"** Reckless 400 56/56 ls -1.12 (768: 48/48; 390: 38/38, centered).
  - Description (right column, max 544): Roobert 500 16/20.8. **31 words**; gist: customers share how they brought Tines into their organisations.

### 4.3 Case-study grid (`CaseStudyGridSection`): PageSection; grid `360×3` gap 24 (1024: 242×3; 768: 193×3; 390: 1 column, gap 16)
**CaseStudyBookCard** (`a`, 360×270):
- Outer: bg = card tint, r 24 (768: 14). Inner grid `138.8px 185.2px`, gap 12, pad 12.
- Left: the customer logo (inline SVG, 100w max 87.5%, fill = dark ink of the tint; `reference/svg/pages/customers-case-studies-<slug>.svg`) at the top-left inside a 12px inset.
- Right "book": flex end/end, pad `18px 18px 18px 24px`, bg = saturated hue, r `4px 12px 12px 4px` (book spine), overflow hidden; a 19×33 white bookmark ribbon SVG at the top-right; bottom-right text is either:
  - a quote: Reckless 400 16/17.6, white, right-aligned, truncated with "…", or
  - featured data: `strong` Reckless 400 38/38 (e.g. "99%") + label Roobert 500 15/18 (pad-left 7.5, mt 6, max 300).
- Hover: outer `filter: brightness(1.02)`, `transition: filter .1s`.
- Palettes (outer / book / logo ink): purple `#ded8ff` / `#7a56e0` / `#542f9c`; pink `#ffc7e5` / `#cd3d8b` / `#8a1f57`; green `#cae4d4` / `#008b53` / `#005d35`; orange `#ffcea6` / `#d15c08` / `#8a3701`.
- Grid items (order, palette): Omada Health (purple), Intezer (pink), Hawx (green), Personio (purple), Brex (pink, "90% of weekly alerts analyzed and suppressed"), Vimeo (green, "20+ hours reclaimed monthly…"), Netskope (orange, "Tripling SOC efficiency without adding headcount"), IP Performance (purple), Notion (green). Customer quotes: do not copy verbatim. Use ~15-word placeholder quotes.
- Footer (mt 55): **"See all case studies"** sans outlined button → `/case-studies/all/` (163×39).

### 4.4 Mobile-only recognition (`page__mobileOnly`, `display:none` ≥768; mt 80)
- A dot-grid background layer (`DotGridPattern`: bg `#aeadab` masked by a 24px SVG dot pattern), content pad 48 0.
- Two cards (max 480, bg lightest, pad `24px 16px`, centered, gap 35):
  1. **ComboFontHeading**: "Recognized as a" (Reckless 400 28/32.2) + "leader in security & SOAR" (Roobert 600 28/32.2); text (32 words, G2 ranking claim) Roobert 500 16/22.4; G2BadgeList (3 columns, 90px badges); button **"Read what customers say"** → #accreditation.
  2. Gartner image `public/assets/pages/customers/gartner-cool-vendor-2021.png` (200 max); heading "Highlighted as a Gartner Cool Vendor" + "in Security Operations"; text (18 words); button **"Learn more"** → /gartner-cool-vendor/.

### 4.5 Accreditation masonry (`AccreditationGrid`): mt 120 (80 @390). Grid `360×3` gap 24
Three independent columns (A, B, C), each a vertical stack with gap 24, plus 2 decorative columns (absolute, `display:none` on desktop). Column contents top→bottom (item heights):
- **A**: badge 360 · study 270 (Intercom) · G2 review 500 ("The Legos of security automation") · badge 360 · G2 review 500 ("Powerful automation, easy to use") · study 270 (Fortune Brands "99%") · G2 review 500 ("The go-to security automation tool") · badge 360
- **B**: G2 review 500 ("Tines automated our SOC") · Gartner badge card 376 ("Learn more") · study 270 ("83% reduction in unpatched vulnerabilities") · G2 review 500 ("More like coworkers than a vendor") · study 270 ("79 automated workflows") · G2 review 500 ("Tines saved me so much time and energy!") · badge 360 · study 270 ("300+ hours saved per month") · CTA block 360 ("Read more raving reviews on G2" / "Go to G2.com ↗", 96×99 icon `customers-l7ky0w-ctablock.svg`)
- **C**: G2 review 500 ("Rapid automation—for anyone") · badge 360 · G2 review 500 ("Tines’s innovation is YOUR innovation") · study 270 (McKesson "1.5") · badge 360 · G2 review 500 ("Promises made, promises kept") · study 270 (Bitpanda) · G2 review 500 ("Laser-focused on Automation")
- **Badge tile** (`a`, 360×360): flex centered, pad 16, r 24, bg tint (purple-5, green-5, `#ffe1c4`), G2 badge img 164×189. Hover: `filter: brightness(1.01)`.
- **G2 review card** (`blockquote`, 360×500): grid gap 15, bg tint, r 24 (768: 14). Pad 32 (inner). Top row: 19×16 quote glyph + 5 stars (17×16 each), fill = ink. Title H3 Reckless 400 24/30.6 (mb 12). Body Roobert 400 16/22.4 (27–29 words; do not copy, write placeholder). Footer: pad 32, same bg, r `0 0 24 24`; cite: name `strong` Roobert 600 16/19.2 + role Roobert 500 16/19.2; link **"Read full review on G2.com"** (Roobert 600 16/18.4, flex space-between with an 11×10 arrow; the word "full" is hidden at small sizes; hover `filter: brightness(.9)`). Tints/inks: pink `#ffdeee`/`#8a1f57`; green `#e4eee7`/`#005d35`; purple `#ece8fd`/`#542f9c`.
- **Parallax** (JS scroll listener, not CSS). Column `transform: translateY()` sampled at scrollY 0 / 1200 / 2400 / 3600 / 4800:
  - colA: -36 / -2.6 / 155.6 / 258.6 / 306.3
  - colC: -72 / -48.7 / 62.0 / 134.0 / 167.4
  - colB: +72 / +65.1 / +32.1 / +10.7 / +0.8
  - That is, A and C drift down (A faster, about 0.09 px per scrolled px through the section) and B drifts up slightly, eased toward the end. Implement it as a rAF scroll handler mapping section progress (0 → 1 across the viewport) to `[-36→306]`, `[72→0]` and `[-72→167]`, roughly ease-out. Off under reduced motion.
- 390: 1 column (the three stacks are concatenated), no parallax.

### 4.6 CTA (`page__cta` mt 120): CtaStartToday, theme purple-65.

---

## 5. `/book-a-demo/` (legacy Gatsby; theme: bg purple-5 `#ece8fd`, fg purple-65). Page h 1919 @1440 / 1237 @390
### 5.1 Backdrop (`primaryBackdrop`, absolute 1440×900 from y 156)
- 8-column grid (175px) holding 4 illustrated "product cards" as inline SVGs (`reference/svg/pages/book-a-demo-talk-to-a-product-expert*.svg`):
  - **storyboard** 560×560 at x 72 (`top:-3rem; translateX(72px)`, bg `#feede0`, border `#fd975d`, ink `#b74d1a`)
  - **cases** 660×423 (`top:-38px; translateY(-80%) translateX(96px)`)
  - **ops** 820×454 (`top:-90px; translateY(-75%) translateX(-35%)`)
  - **workbench** 420×336
  - a foreground illustration 400×343 at (230, 567) (`-5.svg`)
- Parallax (scroll-driven, `animation: backdropParallax auto linear both` on a scroll timeline). Keyframe `to { translate: 0 var(--parallaxShift) }` with shifts: storyboard -32px, cases -24px, ops -16px, foreground -56px (and its `::after` shadow, a 20px bar of purple-50 @25%).
- Logo marquee at y 809: **LogoSet `size="lg"`** (same as pricing), fill purple-65, box margin `0 -20px`.
- 390: the backdrop is replaced by `product-mobile-backdrop-*.svg` (`public/assets/pages/book-a-demo/`), and a "Trusted by" heading (Roobert 700 11/15.4 ls 1.65 uppercase, centered) sits above the marquee.

### 5.2 Demo form card (shared **DemoForm**): section `margin: 72px 177px 320px`, card max 774, centered
- Card: 774×542, bg `#ffffff`, border 1px purple-45 `#8665eb`, r 16, overflow hidden. Grid `293px 479px`.
- Left column: header (pad 26, border-bottom 1px purple-10) with H1 **"Talk to a product expert"** Roobert 500 28/28 ls -0.56. Then **"What to expect:"** Roobert 700 14, and a `ul` (pad-left 16.8, items mt 7, Roobert 500 14/16.8): "Zero-pressure, technical demo of the Tines platform", "Walkthrough of a relevant use case", "Overview of products and plans", "Insight into API and integration capabilities". Bottom: icon `book-a-demo-form-icon-*.svg` 59×113.
- Right column (`formWrap`, border-left 1px): stacked borderless fields, each 42 tall, pad 0 24, border-bottom 1px purple-10, Roobert 500 16/18.4. Placeholders: **"Business email *"** (r `0 12 0 0`), **"First name *" | "Last name *"** (2-column grid), **"Phone *"**, **"Company Name *"**, select **"Select country *"** (10×7 chevron purple-15, pad-right 32), and a textarea **"Tell us more about how we can help you…"** (174 tall, pad 16 24).
- Footer (pad 21): two custom checkboxes (18×18, r 20%; checked: bg purple-45, border purple-55; unchecked: bg purple-2, border `#d1c7ff`), label Roobert 500 14/17.5. Marketing-consent text: ~20 words. "I have read and agree to Tines’ privacy notice" (link Roobert 600 purple-55). Submit: full width 436×41, `.ButtonInner` bg `#8d75e6`, r 6.5, Mono 600 13 uppercase white **"Book a demo"**, opacity .5 until valid (outer wrapper bg purple-70, r 8).
- 390: the card becomes one column; the form collapses behind a **"Get started"** button (354×50, bg purple-45, border 2px purple-55, r 8, Roobert 600 16 lightest). Clicking it reveals the fields.
- The form posts to HubSpot on the original. The clone should be a non-submitting form with client-side required validation.
- Footer: the full Footer (theme purple-65).

---
## 6. `/about/` (theme: **dark**. bg `#1f1c27` coolGray95, fg lightest). Page h 6023 @1440 / 5940 @390
`div.page` pad-bottom 64 (390: 45). Sections are PageSection (pad 0 156, max 1128) separated by 156 spacers.

### 6.1 About hero (`AboutHero`): pad `55px 156px 0`, max 1440 (390: `35px 18px 0`). Centered
- Kicker **"About us"**: Roobert 600 12/16.8 ls 1.2 uppercase.
- H1 (mt 30; 390: 18), two block spans **"The intelligent" / "workflow platform."**: Reckless 400 64/62.08 ls -1.92 (390: ~38px; 2 lines, 74 tall).
- Description (mt 40, max 720): Roobert 500 18/25.2. **24 words**; gist: combining AI, automation and integration with human ingenuity makes organisations more effective.
- Illustration (mt 55): an inline SVG 976×555, `reference/svg/pages/about-l7fuyq-illustration.svg` (fill lightest line art).

### 6.2 How it started + Our mission: grid `552 552` gap 24 (390: 1 column, gap 16)
- Left: kicker **"How it started"** (same kicker style); H2 (mt 30) two block lines **"Born in security," / "used by everyone."**: Reckless 400 44/46.2 ls -1.32. Body (mt 40, pad-bottom 90): Roobert 500 18/25.2, **53 words**, gist: the founders (inline links "Eoin", "Thomas" → LinkedIn) spent a decade as security operators and built Tines to remove repetitive work.
- Two founder avatars positioned absolutely: 72×72 round photos (`public/assets/pages/about/tines-photo-icon-thomas-kinsella.jpg` at (120, 1623), `…eoin-hinchy.jpg` at (582, 1202)), each with a name chip (pad `4px 10px`, r 990, Roobert 600 12/13.8; Thomas: bg pink-50 `#cd3d8b` / text `#ffdeee`; Eoin: bg purple-50 / text purple-5) offset +43/+56.
- Right mission card: pad 55 (390: 24), bg `#c3b5ff` (purple-20-ish, p3~), border 1px `#aa94ff`, r 14 (12), gap 40. Kicker **"Our mission"** (color purple-80). Statement (mt 40, max 576) **"To power the world’s most important workflows."** Roobert 600 48/52.8 ls -1.44, purple-80 `#3f2374`. Footer: a 48×80 mascot SVG `reference/svg/pages/about-cardfooter-logo-1.svg`.

### 6.3 Our leadership: heading **"Our leadership"** Reckless 400 48/55.2 ls -1.44 (390: 32/36.8 ls -0.64); grid mt 55 (35)
- `ul` grid `264×4` gap 24 (390: `173×2` gap 8). Card: pad 2, bg coolGray99 `#181420`, r 14, overflow hidden. Photo 260×291, bg coolGray80 `#3b3945`, r `12 12 9 9`, `object-fit: cover`. Name tab: grid `1fr 18px`, gap 8, pad 24 (390: 16, 1 column): name Roobert 600 16/19.2, title Roobert 500 16/19.2 (mt 3.2), LinkedIn icon 18×18 (opacity .8 → 1 on hover; `reference/svg/pages/about-linkedin-com-in-eoinhinchy.svg`).
- People (name | title): Eoin Hinchy | Co-founder and CEO · Thomas Kinsella | Co-founder and COO · Terry Tripp | Chief Revenue Officer · Maria Dillon | Head of People · Niall Cowman | Head of Finance · Stephen O’Brien | Head of Product · Brian Long | Head of Engineering · Jonny Belton | Head of Design. Photos: `public/assets/pages/about/1713882536-tines_eoin_hinchy.jpg` … `1713883104-tines_jonny_belton.jpg` (8 files).

### 6.4 Backed by the best (`PageSection.centered`)
- Heading **"Backed by the best"** (same as 6.3, centered). Logo row mt 55: flex wrap, centered, gap `55px 64px`. 8 investor SVG links (fill lightest; hover opacity .8): Accel 97×31, Activant 185×32, Addition 192×24, Blossom 154×36, Felicis 115×34, Goldman Sachs 191×36, Index Ventures 117×32, SoftBank Vision Fund 150×23 (`reference/svg/pages/about-<name>.svg`).

### 6.5 Our values: shared **ValueCards `variant="about"`**
- Heading **"Our values"** (centered). Grid `360×3` gap 24 mt 55 (390: 1 column, gap 16).
- Card: grid gap 40, pad 55 (390: 24, gap 24), r 14 (12). Body first (Roobert 500 16/24, 39–53 words each), then a header row (flex space-between, align end, gap 30): H3 Reckless 400 28/32.2 ls -0.28 (390: 24/27.6) + an icon SVG (74×50, 89×49, 94×56; `about-g1t3uw-cardheader*.svg`).
  - **Simplicity**: bg green-10 `#cae4d4`, ink `#00452a`.
  - **Speed**: bg `#ffc7e5`, ink pink-80 `#631e40`.
  - **Soundness**: bg `#ffcea6`, ink orange-80 `#622c12`.

### 6.6 Join our team card: flex column centered, gap 24 (16), pad `55px 40px` (`35px 24px`), bg coolGray99 `#181420`, border 1px `rgba(252,249,245,.14)`, r 14 (12)
- 58×95 mascot (`about-ys8.svg`); H2 **"Join our team"** Reckless 400 42/48.3 ls -1.26 (390: 30/34.5); text (max 480) "We invite you to join our world class team in empowering a generation of accidental programmers." Roobert 500 16/22.4; button **"Careers at Tines"** → /careers/ (Mono filled; bg lightest, text coolGray95; 174×36).

### 6.7 CTA: CtaStartToday, dark theme (filled: bg lightest, text `#1f1c27`; outlined: border/text lightest).

---

## 7. `/ai-in-tines/` (theme: bg lightest, fg purple-65). Page h 6026 @1440 / 7460 @390
### 7.1 Hero, shared **SimplePageHero (left)**: PageSection; inner pad 96 0 (390: 40 0, centered)
- H1 **"Your AI interaction layer"** Reckless 400 64/70.4 ls -1.28 (390: 38/41.8 ls -0.76).
- Text (mt 16, max 480): "The straightforward way to bring AI into everyday work." Roobert 500 16/22.4.
- Buttons (mt 40, flex gap 8): [SIGN UP FREE] filled (bg purple-70 `#542f9c`) → signup; [BOOK A DEMO] outlined (border purple-70) → /book-a-demo/ (131 wide).

### 7.2 Hero banner ribbon (`AIPageHeroBannerSection`), **SplitRibbonCard `variant="figure"`**: 12-column grid (72px, gap 24)
- Header panel (cols 1–6, 552w): pad `40px 192px 40px 40px`, margin-right -96 (overlaps under the figure), bg purple-2 `#f5f2fb`, border 1px `#b7a4ff` (no right border), r `14 0 0 14`, `transform: translateY(28px)`. Grid gap 55. H2 Reckless 400 36/41.4 ls -0.72: **"Make AI an accelerator for work you can rely on"**. Text (mt 30, max 448) Roobert 500 14/19.6, **33 words**, gist: use AI across systems within defined initiatives, with guardrails.
- Figure (cols 7–12, 648w × 404): pad `40px 77.75px 40px 40px`, bg `#ffeedd` (orange-2, p3~), border 1px `#ff9c5b`, r `0 14 14 0`, flex column justify-end. Illustration `public/assets/pages/ai-in-tines/ai-page-hero-illo.svg` (462×311, scale .8, positioned top-right, overflowing above the card). Quote (max 400): 24px quote icon + Reckless 400 22/26.4 ls -0.66, color `#af4700` (orange, p3~), **41 words** (a customer praising the AI implementation; do not copy). Attribution "Zack Rohrbach, Security Architect" Roobert 600 16/38.4 + a 100×16 company logo SVG (`ai-in-tines-7qprqg-attribution.svg`).
- 390: stacked; header r `12 12 0 0`, pad `35px 24px`, H2 24/27.6 centered; figure r `0 0 12 12`, pad `45px 24px`.

### 7.3 Extend your AI (`AIPageExtendSection`): mt 156 (96)
- Header grid `549 549` gap 30 (390: 1 column, gap 18, centered): H2 (max 380) Reckless 400 32/38.4 ls -0.96: **"Extend your AI with consistent controls and visibility across all surfaces"**; text (max 450) Roobert 500 16/20 ls -0.16, **44 words** (Tines as the layer between AI and systems).
- Grid mt 64 (45): 2×2 cards of 564×320 (no gap; adjoining borders form one rounded block). Card: grid, pad `0 0 24px 24px`, full-bleed **background-image SVG** (cover) + 1px border; caption at the bottom-left: H3 Roobert 700 14/17.5; text (mt 7) Roobert 500 14/19.6.
  1. **Chat and copilots**: border `#d1c7ff`, ink purple-70, bg `ai-page-extend-chat-illo.svg`. "Ask questions, get summaries, and trigger work through chat, pages, or Slack."
  2. **AI agents**: border green-15, ink `#005d35`, `ai-page-extend-agent-illo.svg`. "Assist with investigations, coordinate tasks, or guide workflows with clearly defined controls."
  3. **MCP servers**: border `#ffbc89`, ink orange-70 `#8a3701`, `ai-page-extend-mcp-server-illo.svg`. "Enforce intentional systems access to AI that’s always aligned to your organizational policies."
  4. **MCP clients**: border `#ffb1dc`, ink pink-70 `#8a1f57`, `ai-page-extend-mcp-client-illo.svg`. "Connect your existing MCP servers to Tines for your AI interactions across the platform."
  - Outer corners r 14 (top-left on card 1, top-right on 2, etc.). At 390 it is 1 column: card 1 r `12 12 0 0`, card 4 r `0 0 12 12`.

### 7.4 Taking trust seriously (`AIPageTrustSection`), SplitRibbonCard: mt 156
- Header (cols 1–6): pad-top 40, margin-right -96, border 1px green-25 `#71c79d`, r `14 0 0 14`, translateY(28). H2 (max 230) **"Taking trust seriously"** Reckless 400 36/41.4, color `#007f4a` (390: 28/32.2). Text (mt 30, max 308) 27 words. Badges: flex wrap gap 24 pad `0 40 40`, max 450: AICPA 83×83, HIPAA 128×68, GDPR 83×83, ISO/IEC 27001 / 27701 / 42001 at 83×110 (`public/assets/pages/ai-in-tines/*Badge.png`, `sensiba-*.png`).
- Figure (cols 7–12, 648×585): bg green-5 + bg-image `AITrustCardBackdrop.svg`, border 1px green-25, r `0 14 14 0`, pad `30px 40px`, centered content: two lists in a grid `157 157` gap `16 32`; items Reckless 500 20/23, mt 30 between items:
  - green list (ink `#005d35`): **Stateless, Private, Geo-bound, Tenant-scoped**
  - orange list (ink `#8a3701`): **No networking, No training, No storage, No logging**

### 7.5 Bring your own (`AIBringYourOwnSection`): mt 156. Grid `552 552` gap 24 (390: 1 column, gap 96)
- Two figures: a card 552×320 (r 14, 1px border, centered illustration 550×318) + figcaption (mt 24, max 392) with a `strong` lead + text, Roobert 500 14/18.9:
  1. bg purple-5 / border `#b7a4ff`, `ai-page-custom-ai-provider-support.svg`; **"Your AI, your choice"** + 29 words (hosted on AWS Bedrock, choose providers).
  2. bg `#ffeedd` / border `#ff9c5b`, `ai-page-ai-for-all.svg`; **"AI for all"** + 23 words (available on any deployment).

### 7.6 A practical way… (`AIPageOutcomesSection`): mt 156
- Header (centered): H2 (max 440) Reckless 400 32/38.4 ls -0.96 **"A practical way to interact with AI across the organization"**; text "Tines gives you consistent ways to interact with AI in the tools you already use." Roobert 500 16/22.4.
- Cards grid mt 55 (35): `264×4` gap 24 (390: 1 column, gap 16). `AIHighlightCard`: grid, pad `18px 24px 18px 18px`, r 14 (12), 1px border; header flex-column gap 24: H4 Reckless 400 21/26.04 ls -0.42; `ul` (pad-left 16, disc) items Roobert 500 16/20; icon figure (mt 16) right-aligned.
  1. bg `#fff1d1` / border `#ffca69` / ink `#7e4200`: **"AI agent and copilot orchestration"**: Multi-agent security investigation · IT help desk copilot · Automated phishing response; icon `ai-page-outcome-agent-icon.svg` 73×87
  2. bg green-2 `#f1f5f1` / border green-15 / ink `#005d35`: **"AI-assisted workflow execution"**: Intelligent alert triage and routing · Dynamic decision-making in workflows · Automated incident report generation; `…execution-icon.svg` 106×100
  3. bg `#ffeedd` / border `#ffbc89` / ink orange-70: **"Custom AI capabilities for internal systems"**: Bring your own AI models · Build AI-powered internal tools · Extend proprietary systems with AI; `…internal-icon.svg` 63×72
  4. bg purple-2 / border `#d1c7ff` / ink purple-70: **"Enterprise knowledge and system coordination"**: Leverage knowledge bases such as Notion/Glean/Confluence · Sync unstructured data across systems · Real-time documentation sync for workflows; `…enterprise-icon.svg` 80×98

### 7.7 Centered quote (`CenteredQuoteSection`), PullQuoteCard `variant="centered"`: mt 156; figure margin 0 24, max 1080
- 40×40 quote mark (`ai-in-tines-5uzf.svg`, color `#6956a8`) centered; blockquote (mt 24, max 720) Reckless 400 32/40 ls -0.32, centered, color `#6956a8` (p3~). **46 words** (an analyst calls Tines a governance layer for AI); write a placeholder.
- Figcaption: grid `516 516` gap 0 48: left right-aligned: **"Chris Kissel"** (Roobert 700 16/19.2) / "IDC Research" (500); right: IDC logo SVG 132×40 (`ai-in-tines-5uzf-2.svg`).

### 7.8 CTA: CtaStartToday mt 156 (96 @390).

---

## 8. `/contact/` (theme: bg lightest, fg purple-65; headings use purple-55 `#714bd0`). Page h 3937 @1440 / 4439 @390
`div.page` max 1520.

### 8.1 Hero, **SimplePageHero (centered)**: pad `96px 0 64px` (390: `40px 0 45px`)
- H1 **"Contact us"** Reckless 400 72/82.8 ls -2.16, mb 36 (390: 48/55.2, mb 24), purple-55.
- Subtitle: "The fastest way to reach us is to " + link **"send us a message"** (Roobert 700; anchor #support, opens Intercom on the original; hover color `--acc45`, underline `--acc40`) + "." Roobert 500 16/22.4 (390: 14/19.6).

### 8.2 Departments: section margin 0 60, pad 0 40, max 1320, flex column gap 24 (390: pad 0 18, gap 16)
- **Primary cards**: grid `608 608` gap 24 (390: 1 column). Card 200 tall: flex column space-between, pad 24, r 14 (12), 1px border. Header: H2 Reckless 700 20/22 ls -0.2 (390: 18/19.8) + subtitle Roobert 600 14/22.4 (mt 3.5); a sticker icon top-right (36–40px inline SVG). Footer: flex wrap, gap 20.
  - **Get support** (bg green-5, border green-25): "Report an issue or get help."; pen sticker `contact-dlpgqa-pensticker.svg`; buttons [Contact support] sans filled (purple-65) → #support, and the text link "Tines status page" (Roobert 600 14; hover `--acc45` + underline).
  - **Talk to sales** (bg purple-5, border `#b7a4ff`): "Book a demo, request pricing or send us an RFP."; bell sticker `contact-0lthvg-bellsticker.svg`; [Contact sales] sans outlined → /book-a-demo/?cta_source=contact_page.
- **Secondary cards**: grid `292×4` gap 24 (390: 1 column). Card 200 tall, pad `20.8px 24px`, r 14, H2 as above + sticker; footer links Roobert 600 14/19.6 (hover `--acc45` underline):
  - **Partnerships** (bg `#ffdeee`, border `#ff87c8`; hands sticker): "Visit our partners page" → /partners/
  - **Federal and public sector** (bg `#ffe1c4`, border `#ff9c5b`; scroll sticker): "Visit our federal page", "federal@tines.com"
  - **Work at Tines** (bg lime-5 `#eef4b4`, border lime-25 `#beca3f`; flower sticker): "Visit our careers page"
  - **Media and analysts** (bg blue-5 `#e7ecf5`, border blue-25 `#98b7f2`; lightbulb sticker): "Press: pr@tines.com", "Analysts: analysts@tines.com"
- Fallback text (centered, max 576): Roobert 500 16/25.6, ~25 words with bold links "this form" (#support) and "hello@tines.com".

### 8.3 Our offices: pad `0 156px 156px` (390: `0 18 96`)
- H2 **"Our offices"** Reckless 400 46/52.9 ls -0.92, centered (390: 32/36.8).
- Grid `552 552` gap 24 (390: 1 column, gap 16). Card: flex column gap 24 (16), pad 24, r 14, 1px border (Dublin green-25, Boston `#ff9c5b`), transparent bg. H3 Reckless 700 28/30.8 (390: 22/24.2) **"Dublin"** / **"Boston"**; sub "Our European headquarters." / "Our US headquarters." Roobert 500 16/22.4; `address` 5 lines Roobert 500 16/22.4 (company name, street, city, country; use placeholder addresses). Footer: [View on maps ↗] sans outlined (138×39, `sup` ↗ 10.5px) + an 80×112 building illustration (`contact-chx0na-officeillustration*.svg`).

### 8.4 Contact support: pad `0 156px 156px` (390: `0 18 96`)
- H2 **"Contact support"** (same style, left-aligned). Grid `552 552` gap 24 (390: 1 column).
- **Form** (`ContactSupportForm`): border 1px `#b7a4ff`, r 8, flex column. Fields stack with -1px overlap: text input 48 tall pad 0 16 (r `8 8 0 0`) **"What is your question? *"**; email **"Email *"**; textarea 128 tall pad `12px 16px` **"Add more details to your inquiry… *"**. Roobert 500 16/18.4; borders `#b7a4ff`, hover border `--acc25`.
  - File section (pad 24; 390: 16): label "Attach a file (optional)" (mb 24); drop zone pad `40px 24px`, bg purple-5, border 1px `#b7a4ff`, r 7, centered meta text (max 205) "Choose a file, or drag and drop here. Size limit: 5MB" Roobert 500 14/19.6; hover bg `--acc10`.
  - Submit row (pad `0 24 24`, gap 24): consent checkbox "I have read and agree to Tines’ privacy notice" (box 16×16 r 3; link color purple-40 `#9274f4`); [Submit] sans filled full width (502×39).
- **Sidebar**: H4 **"Learn more"** Reckless 700 20/22; links (Roobert 500 16/22.4, gap 8; hover `--acc40`): "Tines support reference guide", "Getting answers to your Tines questions". Bottom illustration 243×240 (`contact-chx0na-supportillustration.svg`), hidden at 390.

### 8.5 CTA: CtaStartToday, theme purple-65.

---

## 9. `/partners/` (theme: bg lightest, fg purple-65). Page h 5083 @1440 / 5789 @390
### 9.1 AreaNav: pill "Partners" › crumb "Overview"; right links: Overview, Directory, Become a partner, Partner portal↗.

### 9.2 Hero: PageSection `wider`; grid `699.8px 636.2px` gap 24, pad-top 55 (390: 1 column, pad-top 35, illustration first)
- H1 two block lines **"Work smarter with" / "Tines’ trusted partners"**: Roobert 400 54/54 ls -1.62.
- Text (mt 16): Roobert 500 16/22.4, **27 words** (200+ partner network, consultants to resellers).
- Actions grid `173.6 173.6` gap 8 (390: 1 column, centered): [BECOME A PARTNER] filled → /partners/become-a-partner/; [PARTNER PORTAL ↗] outlined.
- Illustration: inline SVG 636×306 (`reference/svg/pages/partners-1qtwww-illustration.svg`).

### 9.3 Directory: PageSection `wider`, flex column gap 40 (mt 96 after the hero)
- Search bar: flex gap 12.8, pad `12.8px 19.2px`, bg lightest, border 1px purple-10, r 990; 16px search icon purple-50; input placeholder **"Search for a partner…"** Roobert 400 16/18.4; right link **"Go to directory →"** Roobert 600 16/18.4 purple-60 (hover `--acc40`).
- Two panels, grid `668 668` gap 24 (390: 1 column, gap 16). Panel: pad 30 (18), border 1px purple-10, r 14 (12). Header (max 480): H3 two lines Roobert 500 32/30.4 ls -0.64 **"Channel" / "partners"** and **"Technology" / "partners"**; text (max 448) Roobert 500 16/22.4: "Trusted advisors to build better workflow solutions, faster for your organization with Tines." / "The tools and systems you use, working together like never before."
- Logo grid `295 295` gap 16 (390: `150 150`): tile 295×181: bg lightest, border 1px purple-10, r 8. Logo area 147 tall (pad `16px 40px`, img max 85%, `object-fit: contain`); the name H4 is visually hidden; links row (Roobert 600 14/16.1, centered): channel = "Visit website↗" (purple-60) + "View stories" (green `#007442`); technology = "Learn more" (pink-60 `#ad2a71`) + "Website↗" + "View stories".
  - Channel: GuidePoint Security, Trace3, Optiv, World Wide Technology, Evotek, Kudelski Security. Technology: AWS, Elastic, Wiz, CrowdStrike, Cribl, Sysdig. Logos: `public/assets/pages/partners/*`.
  - Footer link **"View all →"** Mono 700 12/13.8 ls .6 uppercase.

### 9.4 Make your tools… + quotes: PageSection
- SectionHeading2 (max 690): **"Make your tools and systems work together like never before"**.
- Grid `552 552` gap 24 (390: 1 column, gap 16). **QuoteCard** (`QuoteCardNeue.large`): 320 tall, r 14 (12), 1px border, overflow hidden; content pad 24: 27×24 quote glyph + quote Reckless 400 24/31.2 ls -0.24 (19–37 words; placeholder). Footer (flex space-between, align end, pad `0 21 21`): name Roobert 600 14/17.5 + role 500; logo max 110 (`partners-cardfooter-logo-1.svg` 110×47, `-logo-2.svg` 88×32). Card 1 orange (bg `#ffe1c4`, border `#ffab70`, ink `#8a3701`): "Dan Rubins", "VP of IT and Information Security". Card 2 purple (bg purple-5, border `#c3b5ff`, ink purple-70): "Shasheen Bandodkar", "Information Security Analyst".

### 9.5 Backed by the companies you trust: SectionHeading2; grid `552 552` gap `40 24` (390: 1 column)
- **ArticleEntryCard**: cover 552×290 (bg `#f3efea`, r 10, overflow hidden, `object-fit: cover`); header mt 14, max 90%: H3 Roobert 500 18/21.6 (max 432). Items: "Tines achieves key AWS Partner milestones ahead of re:Inforce 2023", "Tines named HashiCorp’s 2023 Emerging Partner of the Year" (cover PNGs in `public/assets/pages/partners/`).

### 9.6 Get the latest updates: SectionHeading2 "Get the latest updates"; grid `264×4` gap 24 (390: `173 173` gap 8)
- 4 **ContentCard**s (spec in §13.5), compact: Newsroom (pink) "Deloitte and Tines announce collaboration…"; Webinar (orange) "Securing your cloud infrastructure with Tines and Wiz"; Blog (pink) "“Crawl, walk, run into zero trust”: a Q&A with Elastic’s John Harmon"; Blog (purple) "Tines and Elastic partner to detect security threats and reduce mean time to respond".

### 9.7 CTA: CtaStartToday, theme purple-65.

---
## 10. `/enterprise/` (legacy Gatsby; theme: bg lightest, ink `#4d3e78` legacy). Page h 9267 @1440 / 14451 @390
Legacy layout container: content max 1128 with pad 0 156 (390: 0 18). Section spacing 156 (390: 96).

### 10.1 Hero, shared **LegacyHero**: `header.clipOverflow` 1440×506, overflow hidden; content pad 0 156, max 1440, top 148
- Kicker **"Enterprise"**: Roobert 700 11.5/16.1 ls 1.15 uppercase (max 299).
- H1 (mt 30, max 576): **"Intelligent workflows for the enterprise"** Reckless **300** 64/62.08 ls -1.28 (390: 38/36.86 ls -0.57, centered). The "fl" ligature is in a separate span.
- Text (mt 24, max 416): Roobert 500 16/20.8, **30 words** (leading organisations trust Tines for security and IT operations).
- [Book a demo] LegacyButton filled (bg `#4d3e78`, r 7, 113×39) → /book-a-demo/.
- Decorative hero illustrations: `public/assets/pages/enterprise/enterpriseHeroIllustrationLeft-*.svg`, `…Right-*.svg` (≥768) and `…Mobile-*.svg` (<768), absolutely positioned at the sides behind the text.

### 10.2 Trusted by marquee, shared **LegacyLogoMarquee**
- Label **"Trusted by global leaders across industries"** Roobert 700 11.5 ls 1.15 uppercase centered (pad `0 24 24`).
- Strip (`div.light`, mt -16, pad 16 0): 2 duplicated halves (2363px each). Logo cells pad `16px 0`, mx 24; 17 SVG logos per half, rendered heights 14–36 (Coinbase 98×22, Databricks 131×31, Elastic 91×36, McKesson 103×14, Sophos 90×16, Sprinklr 122×27, Code42 104×25 …), fill ink. Exported as `reference/svg/pages/enterprise-*.svg`. Motion: JS-driven translateX (measured -238px at load, continuous leftward drift; no CSS animation). Implement it as a CSS `marqueeDrift` at about 40px/s to match the homepage.

### 10.3 Tines changes the way teams operate: a decorative bordered frame (1360×741, border 1px `#eadff8`, r 14) containing a full-size line-art SVG 1358×739 behind the section
- H2 (max 460, centered): Reckless 400 46/48.3 ls -0.92 (390: 32/33.6).
- 3 columns `360×3` gap 24 (390: 1 column): icon 68×90 (data-URI SVGs → `reference/svg/pages/enterprise-dataimg-*.svg`; the third is `enterpriseFloatingShieldedBuildingIcon-*.svg`); H3 (mt 24) Roobert 600 24/normal; text (mt 24) Roobert 500 16/20.8 (20–30 words); bullet `ul` (pl 24, item mt 5.28) Roobert 500 16/20.8.
  1. **"Improve operational efficiency and ROI on tech investments"**: Take on more projects · Communicate better across stakeholders · Get rid of software bloat
  2. **"Accelerate your AI strategic goals"**: Private and secure by default · Free from training, logging, networking, and storage via AWS Bedrock
  3. **"Mitigate risk and reinforce your security posture"**: Agility to your evolving ecosystem · Adherence to compliance and corporate policies

### 10.4 Build, run, and monitor: grid `360×3` gap 24 (390: 1 column)
- Cell 1: H2 **"Build, run, and monitor your most important workflows"** Reckless 400 46/48.3 + [Explore the platform] LegacyButton outlined → /stories/.
- 5 feature cards (360×451, max 386): bg purple-5, border 1px `#aa94ff`, r 14 (12), overflow hidden; header pad 24: H3 Reckless 400 24/26.4 (max 288) + optional "Learn more →" Roobert 600 16/22.4; bottom 294-tall image area with an illustration 386×294 (`translateX(-193px)` from the centre, i.e. centered and cropped). Titles and images: **Vendor-agnostic** (`1730990024-tines-integrations-logo-grid.svg`, → /stories/templates/), **Private and secure AI, always** (`…private-and-secure-ai.svg`, → /ai-in-tines/), **Enterprise-grade controls and monitoring**, **Deployed your way: hosted, self-hosted, or hybrid**, **Advanced collaboration**.

### 10.5 Enterprise scalability and resiliency: grid `264×4` gap 24 (masonry via per-cell row placement)
- Header (span 2 columns): H2 two block lines **"Enterprise scalability" / "and resiliency"**.
- Stat/quote cards: grid, pad 24, r 14, 1px border, gap 24. Three types:
  - **Quote (md)**: Reckless 400 18/22.5 with a 20px round quote bullet (bg ink, white glyph) inline; footer = a source caption (Roobert 500 14/19.6) or a company logo SVG (`enterprise-cardfooter-*.svg`).
  - **Stat (lg)**: Reckless 300 32/35.2 ls -0.48 with a 35px round bullet; footer logo.
  - **Number**: grid `auto 1fr`, gap 12: `strong` Reckless 300 54 ls -0.81 + label Roobert 500 16; solid bg.
- Cards (bg / border / ink): violet `#8d75e6`/`#d7c4fa`/white: quote "Tines handles in 20 seconds what our XSOAR handles…" (source "Tines vs. existing XSOAR performance at a Fortune 500 company"); `#f3ecf7`/`#d7c4fa`/`#6956a8`: "750 days of work time saved" (Elastic logo); `#feede0`/`#ffc8a3`/`#b74d1a`: "20x faster time to build a workflow compared to Python"; orange `#f47e3f`/`#e16521`/white: **+4K** "average action runs per second for a single story"; `#feebee`/`#ffbfdb`/`#a54b7a`: two quotes (25–27 words, placeholder); `#f3ecf7`: "1.5 analysts per week freed to tackle other work" (McKesson); green `#25a871`/`#239667`/white: **20K** "and counting tenants worldwide"; `#e9f3e7`/`#b0e0bd`/`#1f7a57`: "91.4% faster time to correlate alerts" (Snowflake); pink `#e269a4`/`#cb5d94`/white: **26K** "and counting builders". Column x: 156 / 444 / 732 / 1020; column 1 starts below the header (y +381).

### 10.6 A platform for organization-wide intelligent workflows (tabs)
- 69×108 icon, H2 (max 744, centered) **"A platform for organization-wide intelligent workflows"**, text (max 552, centered) ~25 words.
- Grid `168px 936px` gap 24. Left: 7 vertical tab buttons (168 wide, 54–58 tall, gap 12, pad `9.6px 12.8px`, r 8, 1px border, Roobert 400 16/18.4, with an 11×33 arrow SVG at the right that appears for the active tab). Tab colors (bg / border / ink): Security `#eadff8`/`#eadff8`/`#4d3e78` · Governance, Risk and Compliance `#e9f3e7`/`#d6edd9`/`#195642` · Managing incidents and alerts `#fee8e2`/`#ffd8cf`/`#772e2c` · System integration `#feede0`/`#ffe0cc`/`#803218` · Employee lifecycle management `#feebee`/`#ffdce8`/`#763359` · ChatOps `#f3ecf7`/`#eadff8`/`#4d3e78` · Zero trust `#e9f3e7`/`#d6edd9`/`#195642`.
- Right: 7 stacked absolute `figure` panels (936×462, grid `465.8px 300.2px` gap 24, pad `64px 72px 72px`, r 14, panel bg = the tab tint). Only the active one is opacity 1; the others are 0, with `transition: opacity .5s ease`. H3 Reckless 300 36/36 ls -0.72 (max 324); text (max 528) Roobert 500 16/20.8 (~24 words); illustration 275×275 (`tines-illo-<topic>--framed-*.svg`); a 75×88 play-style button at the illustration corner. **Click only; no autoplay** (verified over 6s).
- 390: tabs become an accordion/stack (the panels flow), 1 column.

### 10.7 See more practical examples: card 1128×456, pad `55px 96px 96px`, bg `#f8f4f0` (legacy light100), border 1px `#ede9e3`, r 14
- Header flex space-between: H2 **"See more practical examples"** Reckless 300 36 ls -0.72 + [Visit library →] LegacyButton outlined → /library/.
- 5 tiles grid `167.6×5` gap 24: 168×223, pad 18, r 14, 1px border, overflow hidden; title Reckless 500 18/21.6 white; an icon (max 86) at the bottom-right (mt 36). Tiles: **Incidents and alerts** (`#e14f4c`/`#ca4845`), **Asset and app management** (`#e269a4`), **Ticket synchronization** (`#25a871`), **Core capabilities** (`#8d75e6`), **Threat intelligence** (`#f47e3f`). Icons: `tines-spot-icon-*.svg`.

### 10.8 Partnered with the companies you trust
- H2 (max 648, centered) + text (max 528, centered, 27 words). Logo wall: flex wrap centered, max 936; 10 cells (pad 22.4, 90 tall, variable widths 126–241) with inline-SVG partner logos (`reference/svg/pages/enterprise-partnered-*.svg`).

### 10.9 With you every step of the way, **SplitRibbonCard `variant="legacy"`**: wrapper 1224 wide (margin `0 -48px` beyond the 1128 column), grid `504px 720px`
- Left panel: pad 48, gap 48, bg `#feede0`, border 1px `#ffc8a3`, r `8 0 0 8`, margin-bottom 47 (sits higher). 82×90 icon; H2 (max 368) **"With you every step of the way"** Reckless 400 46/48.3, color `#803218`; text (mt 24) 25 words.
- Right panel: margin `47px 0 0 -72px` (offset down and overlapping), pad `96px 72px 96px 120px`, same bg/border, r `0 8 8 0`. 2×2 grid `287 287` gap `40 24`; each item grid `42px 233px` (icon + text): H3 Reckless 400 22, text Roobert 500 14/19.6 (max 224), link Roobert 600 14 "… →". Items: **Professional services** "Learn more →", **Enterprise-grade support** "Learn more →", **University** "Start learning →", **Technical resources** "Read the docs →".

### 10.10 G2 badges row: `ul` flex centered gap 24; 6 badges 120×138 each in a link to G2 (r 14). Alts: "Leader in Enterprise", "Best Usability in Enterprise", "Best Relationship in Enterprise", "Easiest To Do Business With in Enterprise", "Fastest Implementation in Enterprise", "Easiest Admin in Enterprise" (Fall 2026). Some are data-URI SVGs (`enterprise-dataimg-*.svg`), others `public/assets/pages/enterprise/*_Enterprise-*.svg`.

### 10.11 Content cards: grid `264×4` gap 24; 5 **ContentCard**s (the 4th column stacks two short 135-tall cards): Partners (pink) "Explore our partners"; Webinar (purple) "Remediating Mars’ Cloud Security Risks with Wiz and Tines"; Professional services (green) "Explore our professional services"; Blog (orange) "Migrating from legacy SOAR to Tines"; Podcast (purple) "The Future of Security Operations".

### 10.12 Explosive CTA, shared **LegacyExplosiveCta**: wrapper pad-top 32 / mt -32, overflow hidden; section pad-bottom 96
- Backdrop `div.ready`: 1770×900, centered (`translate(-885px,-450px)` from the centre), containing 3 "light-speed" SVG layers (`public/assets/pages/enterprise/explosion-cta-backdrop-layer-light-speed-{1,2,3}-*.svg`). Fades in with `transition: opacity .3s` when the IntersectionObserver adds `.ready`; backdrop glow keyframes `backdropGlow` 1s ease 1s infinite alternate-reverse.
- Inner flex center, pad 200 0. Card 360×408: bg lightest, border 1px `#aa94ff`, r 12. H3 **"Built by you," / "powered by Tines"** Reckless 400 28 ls -0.28, purple-70, centered. Buttons (Mono pill, pad 0 22.75, r 9990): [BOOK A DEMO] filled purple-70 → /book-a-demo/; [SIGN UP FREE] outlined, ml 7. Card footer: pad 42, bg purple-2, r `0 0 12 12`: "Already have an account? **Log in**." Roobert 500 14/19.6.
- Decorations `explosiveCTADeco1..n` (53×60, 81×75, 51×51, …) float around the card with **JS scroll parallax**: translateY ranges roughly -48 → +8px as the card scrolls into view.

---

## 11. `/soar/` (legacy; **simple chrome**; theme: bg lightest, fg purple-65). Page h 9216 @1440 / 10610 @390
Navbar `variant="simple"`, Footer `variant="simple"` (see the Reuse Map).

### 11.1 Hero, **LegacyHero `split`**: grid `552 552` gap 24, top 182
- H1 **"Break away from legacy SOAR"** Roobert 400 62/62 ls -1.24 (390: Roobert 500 44/44 ls -0.66, centered).
- Text (mt 24, max 552) Roobert 500 16/24, **37 words** (SOAR platforms run critical workflows but are hard to maintain).
- Buttons (mt 30): legacy pill sans buttons (h 39, pad 0 24.5, r 9990, Roobert 600 14): [Book a demo] filled purple-65 → #book-a-demo; [SOAR migration guide] outlined → blog guide (ml 7).
- Illustration `public/assets/pages/soar/1731490800-tines-illustration-universe.svg` 535×369 (right column).

### 11.2 Modernize your security approach, shared **CenteredIntro**: 68×90 spot icon (`1730978909-spot-icon-floating-shielded-building.svg`), H2 (mt 24, max 736, centered) Reckless 400 46/48.3, text (mt 24, max 608) 34 words. Section mb -78.

### 11.3 Stat cards: mt 156, grid `360×3` gap 24 (390: 1 column, 186 tall)
- Card 360×464: 1px border, r 14, overflow hidden; layers from the top: base tint (210px empty), a band 84 tall (pad 24, mid tint), a bottom band 168 tall (pad 24, strong tint) holding H3 Reckless 500 24/30 with an `em` Reckless 700 continuation. Colors (base / mid / strong / ink / border): purple `#ece8fd`/`#ded8ff`/`#c3b5ff`/`#542f9c`/`#9274f4`; orange `#ffe1c4`/`#ffcea6`/`#ffab70`/`#8a3701`/`#f27324`; green `#e4eee7`/`#cae4d4`/`#91d1af`/`#005d35`/`#00a46e`.
- Copy (short stats, verbatim OK): "63% of security professionals took *more than 6 months to deploy their current SOAR solution.*"; "88% of security professionals *struggle to integrate their SOAR platform with external services.*"; "88% say that they believe bundled SOAR platforms will be *replaced by standalone best-in-class products.*"

### 11.4 Meet Tines: grid `946px 158px`: H2 (max 624) **"Meet Tines: purpose-built to scale your security operations"** Reckless 400 48/48 ls -0.72; text (mt 24, max 640) ~30 words; figure `1731492762-tines-illo-build.svg` 158×176.

### 11.5 Trusted by industry leaders, LegacyLogoMarquee `rows=2` in a bordered box (1128, pad `55px 0`, border 1px `#c3b5ff`, r 14)
- Header grid `265px 383px` (ml 96): H2 **"Trusted by industry leaders"** Reckless 400 28 (with a right divider, pad-right 28 / mr 28) + text (max 336) 18 words.
- 2 marquee rows (mt 32 between), each 18 logo spans (mr 32), JS translateX drift (rows offset -107 / -137 at load; they move in the same direction). Logo SVGs: `reference/svg/pages/soar-trusted-*.svg`.

### 11.6–11.10 Feature rows (×5): each mt 156; grid `360×3` gap 24. The text takes 1 column (296–320w) and the figure spans 2 columns (744×376); they alternate sides (rows 1, 3, 5: figure left / text right; rows 2, 4: text left)
- Text: kicker `p.mono` Roobert Mono 700 11.5/16.1 ls .57 uppercase; H3 (mt 10) Reckless 400 32/normal ls -0.48; body (mt 10) Roobert 500 16/22.4 (26–36 words, placeholder).
- Figure: r 14, 1px border, tinted bg, holding an autoplay/loop/muted `<video>` 742×374 (HLS from Mux on the original; MP4 renditions downloaded): 
  1. "Smart, secure workflows" / **"Automate with SOAR that scales"**: bg purple-10, border `#aa94ff`. Video `public/assets/pages/soar/mux-yBWr48GtZb302cW9k4mSfn5KUIOn7901Iy.mp4` (poster `…-thumbnail.jpg`)
  2. "The depth and flexibility to make an impact" / **"Power interoperability across your stack"**: bg `#ffc7e5`, border `#ff75bd`. `mux-2JlKQb4n4mvg6T2JzoVUZErTQDsV8K7Z.mp4`
  3. "Scalable and accessible automation" / **"Build without technical blockers"**: purple. `mux-syyEdoEeVvvPTkTzNCFqAxoPaRNvcVuB.mp4`
  4. "Built by you, powered by Tines" / **"Foster a culture of cybersecurity"**: green-10 / `#50bc8c`. `mux-WHaEsYObZGQxgY77u6K9q2oKUOg7QK4d.mp4`
  5. "Streamlined incident response" / **"Streamline case management processes"**: purple. `mux-E3k3UKKP5lMknGd7ZfnbhKHn5aBTMZu4.mp4`
- 390: 1 column, the figure above the text.

### 11.11 For the whole team, **SplitRibbonCard `variant="quote"`** (the same geometry as pricing §1.4): grid `360px 768px`
- Tab panel 360×424: pad-right 71, bg `#ffe1c4`, border 1px `#ff8e46`, r `14 0 0 14`, translateY(-24). Inside: H2 **"For the whole team"** Reckless 400 28/30.8 (ink `#9d3e00`), text 14/18.2 (~25 words); bottom stat band (pad 28, bg `#ffcea6`): "Expanded usage from 1 engineer to 5 teams" Reckless 400 22/26.4 with a 26px round bullet.
- Content (margin-left -72, pad `55px 40px`, r `0 14 14 0`): blockquote Reckless 400 30 (27 words, placeholder); "Gregory Poniatowski" Roobert 700 14 / "Director of Cyber Threat and Vulnerability" 500; logo 138×40.

### 11.12 Key resources: CenteredIntro (84×90 icon `1746808120-spot-icon-asset-management.svg`, H2 **"Key resources"**).
### 11.13 Content cards: grid `264×4` gap 24, 7 ContentCards (340 tall). Includes **case-study variant** (`v600`/`v500`: solid purple-60 or green `#008b53` bg, lightest text, r `6 8 8 6`, white customer logo 128 wide in the figure). Titles: "SOAR tools: what to look for before investing in security automation" (Blog), "Mars achieves coverage of 80-90% of sources for true positives in weeks" (Case study), "GigaOm Radar Report for SOAR" (Report, CTA "Access the report"), "Migrating from legacy SOAR platform to Tines: a step-by-step guide" (Blog), "Beyon Cyber uses Tines to fuel expansion and innovation" (Case study), "Solving the integrations problem, why it’s time to think differently" (Blog), "Security Weekly: The Case for Migrating from Legacy SOAR Systems" (Podcast, "Watch now").

### 11.14 Closing statement: mt 96; Reckless 400 20/28 centered (max 500, ~25 words) + [See Tines in action] legacy pill filled → #book-a-demo-form.
### 11.15 Sounds… hard to believe?, **SplitRibbonCard `variant="legacy"`** (geometry as enterprise §10.9): left bg purple-5 / border `#c3b5ff`; H2 two lines **"Sounds…" / "hard to believe?"** Reckless 400 46/48.3 purple-70; two short lines ("We get it. A lot of products make bold claims…", "Don’t take our word for it."); a review-link stack (407 wide, rows 58 tall, pad `16px 20px`, bg lightest, border `#c3b5ff`, r 8 top / 8 bottom): "200+ reviews on G2.com ★ 4.8", "50+ reviews (Gartner) ★ 4.8". Right panel bg lightest: a 9-column mosaic of colored quote tiles (263×286 / 263×190 …, r 8, pad 16, quote text Reckless 500 20/24) and decorative blank tinted blocks.
### 11.16 Talk to a product expert (embedded DemoForm): mt 156, mb 40. Card 1128 wide, pad 72, bg purple-5, border `#c3b5ff`, r 14. Header grid `311×3`: H2 **"Talk to a product expert"** Reckless 400 46/48.3 (span 2) + "What to expect:" list (Roobert 400 16/20, 4 items, same as book-a-demo, item 3 = "Overview of plans and pricing") + illustration 180×193 (`1731492731-tines-illo-application-security.svg`). Form panel: pad 55, bg purple-10 @.8, border `#c3b5ff`, r 14; inner form 600 wide (bg lightest, border `#aa94ff`, r 14), fields as in §5.2 with borders `#d7c4fa`; submit LegacyButton r 7, "Book a demo".

---

## 12. `/careers/` (legacy; theme: bg lightest, fg purple-65 / purple-60). Page h 11299 @1440 / 14881 @390
### 12.1 Hero: 1440×694; centered column (pad `38px 16px 0`, gap 32)
- Kicker **"Careers at tines"** Mono 700 12 ls .6 uppercase purple-70.
- H1: giant Reckless **600** 115/94.3 ls -1.15, three lines **"Join" / "our" / "team"**, color purple-50. In "team", the letters are individually colored: t purple-50, e green `#008b53`, a pink-50 `#cd3d8b`, m orange-50 `#d15c08`, and the "t" letter has a JS transform. At 390 it is ~164×167 (scaled).
- Text (max 352) Roobert 500 16/22.4 (~25 words); [SEE OPEN POSITIONS] mono pill filled bg purple-40 `#9274f4` → #open-positions (200×36).
- The background has 15 small floating SVG decorations (`reference/svg/pages/careers-joinourteam*.svg`, ~84px) clipped by `backdropClipOverflow`.

### 12.2 Video: `iframe` YouTube `https://www.youtube.com/embed/7ft61ij9CQ0`, 1128×635, r 24. Use a lazy YouTube embed (or a poster + click-to-load).
### 12.3 Stats strip: grid `318.7×3` gap 26, pad `44px 60px`. Each: flex gap 22, a 95×95 badge icon (`careers-pdnec9y*.svg`) + text Roobert 500 18/21.6 with a `strong` 700 tail. Inks: purple-60, green `#007442`, pink-60 `#ad2a71`. Copy: "98% of our team would recommend Tines as a **great place to work**", "98% of our team are **proud to work here**", "97% of our team feel their work **contributes to our goals**".
### 12.4 Where we work (`section.wider`, overflow hidden)
- H2 **"Where we work"** Reckless 400 46/48.3 centered, purple-60.
- 6-column grid (206.7px, gap 24, pad 20 0, mb 156) with large office tiles (360×360) and smaller "deco" tiles (120–258 square), all with **2px borders**, r 14, pad `16px 32px 24px 24px`, transparent bg. Large: **Dublin** "Our European headquarters" (border purple-40, ink purple-60, illustration 80×126 data-URI SVG); **Boston** "Our US headquarters" (border pink-40 `#ed52a6`, ink pink-60); **Remote** (border orange-40, ink green `#007442`, `HQRemote-*.svg` 89×119). Deco: purple 162, **SF Hub** 250 (border `#af4700`), lime 120 (`#97a500`), **Australia** 250 (border `#618de8`, ink green), teal 258 (`#00ada5`). Titles Reckless 400 58/58 ls -2.32 (deco 42/42 ls -1.68).
- **Parallax** (JS): each tile has its own translateY; sampled at scrollY 1200 / 1800 / 2400 → e.g. Dublin 3.7 / -6.3 / -9.0; Boston -11.5 / 16.1 / 24.0; deco tiles ±15–21. Alternating directions, ±~24px range.
- 390: the 3 large tiles stack (354×280, pad 28, r 12); the deco tiles are hidden.
### 12.5 Our values, **ValueCards `variant="careers"`**: H2 **"Our values"**; intro (max 384) "We live our values of Speed, Simplicity and Soundness in everything we do at Tines."; link **"Learn more about Tines →"** Roobert 700 16 purple-60 → /about/. Grid `360×3` gap 24: card pad `32px 28.8px 28.8px`, r 14, grid gap 12.8; icon (83×56 etc., data-URI → `careers-dataimg-simplicity*.svg`); H3 Reckless 400 42 ls -1.26; body Roobert 500 16/19.2 (same copy lengths as about: 39/41/43 words). Colors: Simplicity bg purple-5 / ink purple-70; Speed `#ffe1c4` / orange-70; Soundness green-5 / `#005d35`.
### 12.6 Hear from our team, **ArticleEntryCard** grid `360×3` gap `64 24`: 5 cards (cover 360×189, r 10, bg `#f3efea`; title Roobert 500 18/21.6): "Five questions with Blake Coolidge, Head of GTM Initiatives", "Five questions with Yannick Gloster, Software Engineer", "Five questions with Ashley Buck, Regional Lead for Sales Development", "Five questions with Colm O’Grada, Director of Data and Analytics", "Tines Technical Advisory Board (TAB) Takeaways with Pete: part one"; 6th cell = a bordered link tile (border `#c3b5ff`, r 10) with a 79×65 icon + **"More in our blog →"** Roobert 600 16. The cover `figure.lazy` has `transition: all .1s` (hover zoom/brightness on the original).
### 12.7 Awards: H2 **"Awards"**; flex space-between gap 64, pad-top 96, max 1000: 3 items (img 288×147 PNG; source Roobert 600 14 centered; H3 Reckless 400 24/33.6; year Roobert 600 14): The Sunday Times Ireland / "Best places to work" / 2025 · Boston Business Journal / "Best places to work" / 2026 · Deloitte / "Ireland Technology Fast 50" / 2025.
### 12.8 Benefits: card 1280 (mx 40), pad 72, border 1px green-30 `#50bc8c`, r 24
- H2 **"Benefits"** (left), intro (max 460) 24 words, illustration 290×287 (`StateOfSecurity-*.svg`) at the top-right, overflowing above the card (y -74).
- Grid `265.5×4` gap `48 24`: each article flex column gap 8: H3 Roobert 700 16; p Roobert 500 16/22.4 at opacity .8 (10–28 words). Titles: Competitive compensation · Startup equity · Retirement (401k) / pension / superannuation · Comprehensive healthcare · Generous paid time-off (PTO) · Parental leave · Employee assistance programs · Breastfeeding support · Home office setup · Phone and home internet reimbursement · Upskill · Social gatherings. Footnote "* Benefits listed above are for permanent roles" Roobert 400 16.
### 12.9 Open positions (`#open-positions`)
- H2 **"Open positions"** + `Drums-*.svg` 182×143 at the right.
- Filter `fieldset` (max 744, border 1px `#c3b5ff`, r 6, 3 columns): search input "Search" (pad 0 14, Roobert 500 14), selects **"All teams"** (20 departments) and **"All locations"** (19). Count line "Showing 34 open positions" Roobert 500 14/16.8 ls -0.28 purple-60.
- Table: thead border-bottom 1px green-30; th Roobert 700 16, pad 20 0: **Team** (310) / **Role** (508) / **Location** (310). Rows 71 tall (87 for 2-line rows): td pad `24px 24px 24px 0`, border-bottom 1px green-20 `#91d1af` (the team cell hides its border when it repeats); team Roobert 500 16/19.2 ls -0.32 (shown only on the first row of each team group); role Reckless 400 22/22 ls -0.44 purple-60; location Roobert 500 16/19.2. Every cell links to `/careers/jobs/<id>/`. Job data comes from Greenhouse. **Do not copy job descriptions**; use ~10 placeholder rows (team / role title / location).
- 390: the location column is hidden and `span.mobileLocation` shows under the role.
### 12.10 Inclusion matters: card pad `72px 72px 30px`, bg purple-5, border `#c3b5ff`, r 14. Kicker `h3.mono` **"Inclusion matters"** Mono 700 12.5 ls .62 uppercase; grid `311×3` gap 24: 2 paragraphs (50 and 35 words; DEI commitment, accommodation requests) + `Partnership-*.svg` 278×276.
### 12.11 Explosive CTA: LegacyExplosiveCta (as §10.12).

---

## 13. Shared legacy component specs
### 13.1 LegacyButton: see "Buttons" above. Hover on the Gatsby pages: `background-color .1s ease` (pill variants); outlined hover = ink at 10%.
### 13.2 SplitRibbonCard geometry summary
| variant | left panel | right panel | overlap | vertical offset |
|---|---|---|---|---|
| `quote` (pricing, soar) | 140w (pricing) / 360w (soar), r `14 0 0 14`, pad-right 71 | pad `32 48` / `55 40`, r `0 14 14 0` | right `margin-left:-72px` | left `translateY(-24px)` |
| `figure` (ai-in-tines ×2) | 6 of 12 columns, pad `40 192 40 40` (or `40 0 0`), r `14 0 0 14` | 6 columns, r `0 14 14 0` | left `margin-right:-96px` | left `translateY(28px)` |
| `legacy` (enterprise, soar) | 504w, pad 48, r `8 0 0 8`, mb 47 | 720w (792 incl. overlap), r `0 8 8 0`, mt 47 | right `margin-left:-72px` | right pushed down 47px |
Both panels share the same bg and 1px border, so the overlap reads as one folded ribbon. At ≤768 they stack vertically (top r `12 12 0 0`, bottom r `0 0 12 12`) with no offsets.
### 13.3 G2BadgeList: see §1.5. Sizes: 140 (pricing), 164 (customers badge tiles), 120 (enterprise), 90 (≤390).
### 13.4 DemoForm: see §5.2 and §11.16.
### 13.5 ContentCard (`a.ContentCard`, partners / enterprise / soar)
- Grid, 1px border, r 8, overflow hidden; content pad 20 (390: 14), grid column 222.
- Header: eyebrow `strong` Roobert Mono 700 10/12.5 ls .5–1 uppercase; H4 (mt 7.5) Reckless 400 22/24.2 ls -0.22 (long titles get margin-right -8.8); CTA line (mt 7.5) `strong` Roobert 700 14/17.5 with a trailing arrow `::after` that shifts `translate(3px)` on hover (external links: `translate(1px,-1px)` with ↗).
- Figure (mt 16): flex end, an icon 48–102px tall at the bottom-right (or a white logo for case studies).
- Variants (bg / border / ink): purple `#ece8fd`/`#c3b5ff`/purple-65 or purple-70; pink `#ffdeee`/`#ff9ad2`/`#8a1f57` (pink65 `#9c2464` on legacy); orange `#ffe1c4`/`#ffab70`/`#8a3701` (`#9d3e00` legacy); green `#e4eee7`/`#91d1af`/`#00693b`; solid case study purple-60/`#9274f4`/lightest and green `#008b53`/`#00a46e`/lightest.
- Hover: `filter: brightness(.97)` (Next ContentCard) and border → `--cc400` (base) / `--cc300`. Compact height 368 at 1440 (partners), 295–340 on legacy.

---

## 14. Motion summary (group A)
| Page | Element | Trigger | Animation |
|---|---|---|---|
| all Next pages | Buttons | hover | filled `brightness(1.1)`; unfilled `--unfilledHoverBg`; `filter, background-color .1s` |
| pricing, book-a-demo | LogoSet lg | continuous | `marqueeDrift` 41.625s linear infinite, `--marqueePeriod: 1665px` |
| pricing, 3b | FAQ | click | native `<details>`, instant; marker + → − |
| 3b | hero flower beds | scroll(root) 0→100vh | translateY 0 → 100px (`--bedDrift`) |
| 3b | chapter labels | mount | `labelRise` .4s cubic-bezier(.22,1,.36,1), delays 0/.05/.1s |
| 3b | teaser "Watch demo" icon | continuous | opacity blink 1.2s steps(1) |
| 3b | prompt typer / chat caret | continuous | caret blink 1.1s steps(1); typed text JS |
| 3b | Skills illustration | continuous | `tileFloat` 4s ease-in-out infinite, translateY 0 → -6% |
| 3b | quote flower bed | view-timeline `--quoteFlowerView` | translateY -80px → 80px |
| 3b, 3b/examples | flower and garden canvases, icon lattice | IntersectionObserver (rootMargin 50% / threshold .4) | canvas/JS drift, paused off-screen |
| 3b/examples | bookmarks / options / rows | hover | bg `--acc10` / `--acc5`; checkbox `.1s` |
| customers | accreditation columns | scroll (JS) | translateY ranges in §4.5 |
| customers | book cards / badges | hover | `filter: brightness(1.02 / 1.01)` .1s |
| book-a-demo | backdrop cards | scroll timeline | translate 0 → -16…-56px |
| enterprise | tabs | click | panel opacity .5s ease |
| enterprise, careers | explosive CTA | IO `.ready` + scroll | backdrop opacity .3s; glow 1s alternate infinite; decorations JS parallax ±48px |
| enterprise, soar | logo marquees | continuous (JS) | translateX drift |
| careers | office tiles | scroll (JS) | translateY ±24px alternating |
| soar | feature videos | autoplay | muted loop |
All of these must be disabled under `prefers-reduced-motion: reduce`.

## 15. Not measured, or not extractable
- **Canvas art**: 3b hero flower beds, the 3b Explore "garden" (hanging monitors and flowers) and the 3b Monitor quote flower bed are procedurally drawn 2D canvases with blob sprites, the same engine as the homepage. Use static crops from `reference/pages/3b-1440.png` (garden region x 732–1400, y 1469–1922) or reuse the homepage canvas fallbacks.
- **3b demo video**: only the autoplay teaser MP4 (`public/assets/pages/3b/3b-demo-teaser.mp4`, 1.7 MB) was downloaded. The full 7:46 Wistia video (media `3bbdsjxfjs`) streams from Wistia and was not downloaded. Chapter timings are not exposed beyond the three label widths (172 / 244 / 746 px of a 1163px track).
- **soar videos** are Mux HLS. The `high.mp4` static renditions were downloaded; they may be lower resolution than the HLS top tier.
- **careers video** is a YouTube embed (`7ft61ij9CQ0`), not downloadable.
- **Forms** (book-a-demo, soar, contact, careers filters) post to HubSpot/Greenhouse/Intercom. Their submission behavior was not exercised.
- **3b/examples data**: the 316 examples, the 13 table pages and the filter counts are CMS-driven; only page 1 was captured. The example detail drawer (`ThreeBExampleDetails`) was not opened.
- **Careers job descriptions** and the open-position detail pages are not captured, per the copy rule.
- **JS parallax curves** (customers columns, careers tiles, explosive-CTA decorations) were sampled at 3–5 scroll positions. The exact easing functions are internal.
- **Hover states on the Gatsby pages** come from hashed CSS. Only the transitions listed in §14 were confirmed.
- **The enterprise "Partnered with" logo wall**: its 10 logo cells hold inline SVGs, exported as `reference/svg/pages/enterprise-partnered-*.svg` (7 unique; the rest were duplicates of logos already exported).
