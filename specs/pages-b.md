Source: https://www.tines.com/

# Pages B: solutions, industries, trust

Measured live on 2026-10-19. I used headless Playwright (Chromium 1.63) at 1440x900 and 390x900, plus layout checks at 768 and 1024. Values come from `getComputedStyle` / `getBoundingClientRect` and from the live CSS-module rules, which I downloaded and parsed. The site writes colors in `display-p3`. Hex values here are the site's own sRGB fallbacks (`--c-<hue><step>:#hex` in its CSS). Where Tailwind already has a token, the token is named.

Routes covered. All returned 200 and none redirected:

| Route | Final URL | Template | `<title>` |
|---|---|---|---|
| /solutions/security/ | same | **SolutionPage** | Security Solutions: Built by security practitioners, for security practitioners |
| /solutions/it/ | same | **SolutionPage** | IT Solutions: One platform for every workflow, every team, and every AI. |
| /solutions/security/ai-soc/ | same | **SubSolutionPage** | AI SOC Solutions: Build the AI SOC your team actually needs |
| /solutions/security/soar/ | same | **SubSolutionPage** | SOAR Solutions: Modern SOAR built for speed, security, and scale |
| /solutions/it/it-service-delivery-and-support/ | same | **SubSolutionPage** | IT service delivery and support Solutions: Build the future of IT service delivery |
| /financial-services/ | same | **IndustryPage** | Financial Services \| Tines |
| /public-sector/ | same | **IndustryPage** | Public sector \| Tines |
| /mssps/ | same | **IndustryPage** (split hero) | MSSPs \| Tines |
| /security/ | same | **TrustArticlePage**, a legacy build (see section 9) | Security at Tines \| Tines |

Screenshots are in `reference/pages/<slug>-1440.png` and `<slug>-390.png`. The slug is the path with `/` replaced by `-`, for example `solutions-security-ai-soc-1440.png`. In the full-page captures, top-nav item labels sometimes render blank. That is a capture artifact: the nav measures normally.

Assets are listed in `specs/assets-b.json`: 91 files downloaded to `public/assets/pages/<slug>/…`, with files used on 2+ pages in `public/assets/pages/solutions-shared/`. There are also 76 inline SVGs in `reference/svg/pages/<slug>-<name>.svg`.

Third-party UI to ignore: the Intercom banner (48px dark bar at the very top when `data-has-intercom-banner`), the Intercom launcher, and Cookiebot. The HackerOne iframe on /security/ is third-party content (see 9.4).

---

## 0. REUSE MAP (read first)

### 0.1 Templates found (established by identical CSS-module class sets)

1. **SolutionPage**. Used by `/solutions/security/` and `/solutions/it/`. Both pages share the same 6-section skeleton: `AreaNav → SolutionHero(centered) → SolutionPageValuePropsSection → SolutionChildPageGridSection → SolutionPageQuoteSection → WildCodeCTASection`, wrapped in `page.solutionPageContent`. The only differences are data:
   - copy;
   - which hero decoration pair is used;
   - the number of value props (6 vs 5);
   - the child grid (`fourPerRowCentered` with 6 cards vs `threePerRow` with 5 cards);
   - the ribbon colour theme (purple vs pink);
   - whether the quote is long or short;
   - an optional bullet list in the opening paragraphs (IT only).
2. **SubSolutionPage**. Used by `/solutions/security/ai-soc/`, `/solutions/security/soar/` and `/solutions/it/it-service-delivery-and-support/`. Skeleton: `AreaNav → SolutionChildPageHero → SolutionPageSecondaryDescription + ValueProps → SolutionPageCustomerLogosSection → SolutionPageContentCardSection → WildCodeCTASection`, wrapped in `page.solutionChildPageContent`. Differences:
   - ValueProps `data-columns` (3 on ai-soc, 2 on soar and itsd);
   - hero buttons (1 on ai-soc, 2 on the others);
   - content-card layout (`data-layout` 4 vs 5).
3. **IndustryPage**. Used by `/financial-services/`, `/public-sector/` and `/mssps/`. It is one page shell, `page.page`, made of a `SolutionHero` (centered, or the `sectionSplit` variant on MSSPs), an ordered list of `SolutionFor*` sections separated by fixed spacer divs, and `ExplosionCTASection`. Each page picks a different subset and order of sections, so drive it from a `sections: []` array.
4. **TrustArticlePage**. Used only by `/security/`. It is an older build (linaria hashed classes, not CSS modules), but it visually reproduces the same nav, area nav and footer. Its body is a long-form article with a sticky TOC.

### 0.2 Global chrome (all 9 pages)

| Piece | Decision | Exactly what differs from the homepage instance |
|---|---|---|
| `Navbar` | **(b) existing + variant** | The markup, layout and dropdowns match the homepage (`SiteNav26`, 68px tall, same item metrics). Three things differ. **(1) Foreground colour:** link, logo and chevron `currentColor` is `purple-65` (#5d38ae) on SolutionPage, SubSolutionPage and /security/, and `purple-70` (#542f9c) on IndustryPage pages. The homepage uses `purple-55`. **(2) Filled "BOOK A DEMO" CTA background** (≥1024) is `purple-70` on every page in this group. The homepage uses #6741bf. **(3) Text colour:** the round search button stays `purple-5` bg / `purple-60` icon, the same as the homepage. `Navbar.jsx` currently hardcodes `text-purple-55` (lines 303 and 381) and its CTA colour. Add a `tone` prop (`'55' \| '65' \| '70'`) or make it inherit `currentColor` from a page-level class. |
| `Footer` | **(b) existing + variant** | Same columns, links and metrics. Its colour is `currentColor`, which is `purple-65` on Solution, SubSolution and /security/ pages and `purple-70` on Industry pages (homepage: `purple-55`). Footer.jsx already uses inherited colour, so it is enough to set `color` on a wrapper. |
| `AreaNav` (secondary bar under the nav) | **(c) NEW shared** → `src/components/shared/AreaNav.jsx` | It is not on the homepage, and every page here uses it. Spec is in section 1. |
| Page foreground | NEW page-level prop | `<main>` `color`: `purple-65` (Solution, SubSolution, /security/) or `purple-70` (Industry). Page background stays `lightest` #fcf9f5. The app Layout needs a way for a page module to export e.g. `export const tone = 'purple-65'` and apply it to Navbar, main and Footer. |
| Buttons (`.btn .btn-filled/.btn-outlined` from index.css) | **(b) existing + colour variable** | The geometry is the same as the homepage: 35.75px tall, 9990px radius, padding 0 18.2px (≥640) or 9.75px 16.25px (<640), Roobert Mono 700 13/13, letter-spacing .26px, uppercase, transition `filter .1s, background-color .1s`, hover `brightness(1.1)` (filled) or `--unfilledHoverBg` (outlined). Only the colour changes. The live CSS uses `--buttonColor` (default `--acc40`). Measured values: **hero buttons on all 8 CSS-module pages = `purple-70`**; **WildCode CTA buttons = page fg `purple-65`**; **Explosion CTA buttons = `purple-70`**. index.css hardcodes `purple-55`, so change it to `var(--btn-color, theme(colors.purple.55))`. |

### 0.3 Section → component map, per page

Legend: **(a)** existing component as-is · **(b)** existing + prop/variant · **(c)** genuinely new (create in `src/components/shared/`).

**/solutions/security/** (SolutionPage)
1. AreaNav: (c) `AreaNav` (crumb variant)
2. Hero: (c) `SolutionHero` variant `centered`, `decoration="shields"`, with openingParagraphs
3. "Smart, secure workflows": (c) `ValuePropsSection` (header = h2 + RainbowBridge icon, 3 columns, 6 items)
4. "Dive into the details": (c) `ChildEntryCardGrid` (`fourPerRowCentered`, 6 cards)
5. "For the whole team" ribbon quote: (c) `RibbonQuote` size `solution`, theme purple
6. CTA "Start today": (b) `CtaStartToday`, with `tone="purple-65"` for tagline, button and border colours. The canvas, wordmark, spacing and copy are unchanged. Verified: tagline Roobert 500 24/30 ls -.24px, max-width 528, button order [SIGN UP FREE][BOOK A DEMO], section padding `30px 40px 96px`, margin-top 156; at 390, padding `18px 18px 40px`, margin `96px 0 32px`. This matches the homepage spec section 7. The only difference is colour: `purple-65` instead of `purple-55`.

**/solutions/it/** (SolutionPage): the same as /solutions/security/, with these data changes:
- hero `decoration="clouds"`;
- openingParagraphs gets an extra intro line plus a 5-item bold-lead bullet list;
- 5 value props;
- the child grid is `threePerRow` with 5 cards;
- RibbonQuote theme `pink` with `shortQuote`.

**/solutions/security/ai-soc/**, **/solutions/security/soar/**, **/solutions/it/it-service-delivery-and-support/** (SubSolutionPage)
1. AreaNav: (c) `AreaNav` (crumb + active section)
2. `SubSolutionHero`: (c) (SolutionChildPageHero). It is the colour-stepped card that reuses the same "colorStep" motif as `ChildEntryCard`.
3. Secondary description + value props: (c) `ValuePropsSection` (header = serif paragraph + RainbowBridge icon). `columns=3` on ai-soc, `columns=2` on soar and itsd.
4. "Trusted by industry leaders": (c) `CustomerLogosMarquee`. **This is not** the homepage `Hero`/`LogoSet`. It is a different component: 2 rows, JS-driven translate, different logo set and order, and a bordered container. The logos overlap the homepage set (canva, coinbase, databricks, dropbox, mckesson, reddit, snowflake, sophos), but the exported SVG markup differs. Use the new exports in `reference/svg/pages/solutions-security-ai-soc-customer-logo-*.svg`.
5. Content cards: (c) `ContentCardGrid`, which is shared with the Industry pages' related-content section.
6. CTA: (b) `CtaStartToday` `tone="purple-65"` (as above)

**/financial-services/** (IndustryPage)
1. AreaNav: (c) `AreaNav` (section-links variant, no crumb)
2. Hero: (c) `SolutionHero` `centered`, `decoration="financial"`, with openingParagraphs. **Same component as the SolutionPage hero.**
3. "Smart, secure workflows" tabs: (c) `UseCaseTabs` (horizontal header with an icon on the right)
4. Centered quote: (c) `CenteredQuote` (no-logo variant)
5. "Protect what matters most": (c) `ChildEntryCardGrid` variant `withHeadingCell` (4-column grid whose first cell is the heading). **Same card component as SolutionPage.**
6. "Scale smarter, safer, faster": (c) `RibbonQuote` size `banner` (BannerQuoteSection). **The same component as SolutionPage's ribbon**, with a different size token set (see 3.5).
7. Kaleidoscope: (c) `UseCaseKaleidoscope`
8. Related content: (c) `ContentCardGrid` (`layout=5`)
9. CTA: (c) `ExplosionCTA`

**/public-sector/** (IndustryPage)
1. AreaNav: (c)
2. Hero: (c) `SolutionHero` `centered`, single button, with `smallPrint` lines and a bottom-left SVG illustration. No openingParagraphs.
3. Layered product visual: (c) `ResponsivePictureBand` (3 breakpoint images)
4. "Modernize your security approach": (c) `FeatureHighlights` variant `compact` (section-icon header)
5. Centered quote: (c) `CenteredQuote` variant `withLogo + button`
6. "Intelligent workflows for federal agencies": (c) `UseCaseTabs` (centered header with icon)
7. "See more practical examples": (c) `ExampleCards`
8. "Partnered with the companies you trust today": (c) `PartnerLogoGrid`
9. Related content: (c) `ContentCardGrid` (`layout=4`)
10. CTA: (c) `ExplosionCTA`

**/mssps/** (IndustryPage)
1. AreaNav: (c)
2. Hero: (c) `SolutionHero` variant `split`, which contains the `MSSPLogoMarquee` footer and the aside illustration
3. "Tines transforms the way MSSPs operate": (c) `ValuePropositionGrid` (green bordered panel with grid-line SVG)
4. "Build, run, and monitor…": (c) `FeatureHighlights` variant `grid` (heading occupies cell 1)
5. "Built for teams like yours": (c) `QuoteCardGrid` (QuoteCardNeue `medium`)
6. "The platform MSSPs rely on to scale": (c) `UseCaseTabs`
7. Stat cards: (c) `QuoteCardGrid` with `stat` variant. **This is the same QuoteCardNeue card**, just a different body.
8. "See more practical examples": (c) `ExampleCards`
9. Partners: (c) `PartnerLogoGrid` (with description)
10. "With you every step of the way": (c) `ServicesRibbon`. It uses the ribbon fold technique of `RibbonQuote`, but its own layout.
11. G2 badges: (c) `G2BadgeRow`
12. Related content: (c) `ContentCardGrid` (`layout=5`)
13. CTA: (c) `ExplosionCTA`

**/security/** (TrustArticlePage)
1. AreaNav: (c) `AreaNav` variant with dropdown triggers ("Trust and security" pill + Security▾ / Legal▾ / Trust center ↗)
2. Page header: (c) `StandardPageHeader` (rounded tinted band + H1)
3. Article + sticky TOC: (c) `ArticleWithToc` (pull quote, h3/h4 with hover anchor, paragraphs, lists, HackerOne iframe)
4. Footer: (b) `Footer`, purple-65. There is **no** CTA section on this page.

### 0.4 Shared patterns, to build once in `src/components/shared/`

| Component | Used on | Notes |
|---|---|---|
| `AreaNav` | all 9 | 3 configurations: crumb + sections, sections only, and pill + dropdowns |
| `SolutionHero` | security, it, financial-services, public-sector, mssps | `centered` / `split`; optional `decoration`, `openingParagraphs`, `smallPrint`, `backdropSvg`, `footer` (marquee), `aside` |
| `OpeningParagraphs` | security, it, financial-services | 2-column CSS-column block between top and bottom rules |
| `ValuePropsSection` + `ValuePropCard` | security, it, ai-soc, soar, itsd | 5-colour cycle via `colorIndex` |
| `ChildEntryCard` (+ grid) | security, it, financial-services | colour-stepped card, `theme` = purple/pink/orange/green/yellow |
| `SubSolutionHero` | ai-soc, soar, itsd | uses the same colour-step motif |
| `RibbonQuote` | security, it (`solution` size), financial-services (`banner` size) | folded-corner ribbon header + card |
| `CustomerLogosMarquee` | ai-soc, soar, itsd | |
| `ContentCard` + `ContentCardGrid` | ai-soc, soar, itsd, financial-services, public-sector, mssps | `data-layout` 4 or 5, colour × variant (v50/v600/v800/v500) |
| `UseCaseTabs` | financial-services, public-sector, mssps | auto-advancing tabs with progress ring |
| `CenteredQuote` | financial-services, public-sector | |
| `FeatureHighlights` + `FeatureHighlightCard` | public-sector, mssps | |
| `ExampleCards` | public-sector, mssps | |
| `PartnerLogoGrid` | public-sector, mssps | |
| `QuoteCardNeue` (+ grid) | mssps (×2 sections) | `quote` / `stat` body |
| `SectionHeading` (h2 `SectionHeading2` + optional icon + description) | all CSS-module pages | Reckless 400 46/48.3, ls -.92px (≥1024) · 38px (≥640) · 32/33.6 ls -.32px (<640); `centered` adds max-width 690 (480 at 390) |
| `Kicker` (`SolutionPageAllcapsHeading`) | Solution and Industry heroes, MSSP marquee | Roobert Mono 700 11.5/16.1 ls .575px uppercase |
| `ExplosionCTA` | financial-services, public-sector, mssps | |
| `SectionSpacer` | Industry pages | heights `--section-margin` (156/96), `--section-padding` (96/40) or `--sp-xxl` (64/45) |

---

## 0.5 Tokens

### Existing tokens that match (use them, don't add duplicates)
- Spacing variables in `index.css` match the live `:root` exactly at 390/640/920/1024/1280/1366/1440 (re-measured): `page` = `--widerPageMargin` (18/30/35/40), `page-wide` = `--pageMargin` (18/70/85/125/156), `sp-sm/md/lg/xl/xxl`, `sp-gap` (= live `--gridGap` and `--gap`, 16/24), `section-pad` (40/48/75/80/90/96), `section-margin` (96/120/125/140/156).
- Content max width: live `--gridMaxWidth` is 1128px. It is the result of `PageSection.section { padding: 0 var(--pageMargin) }` with `.inner { max-width: 1128px }`, which equals `px-page-wide` inside a full-width section at 1440. `--gridWideMaxWidth` 1520 = `max-w-page`.
- Colours already in Tailwind: the `purple-*` scale, `lightest`, `accent` (#8d75e6, the AreaNav active colour and `--pageAccent`), `green-1…35`.
- `rounded-usp`/`rounded-tab` 14px equals `--radius` at ≥640.

### Genuinely new values (add to tailwind.config.cjs)
- **Colour scales**, from the live CSS hex fallbacks. Several of the existing ad-hoc tokens (`dd-*`, `tab-*`, `panel-*`) are p3 readbacks of the same steps, which is why some are 1–8 units off. For example, `--c-orange5` is #ffe9dd in CSS, while the canvas readback gives #ffe1c4.
  - `pink`: 2 #fff0f4, 5 #ffe4ee, 10 #ffd1e3, 20 #ffa8cf, 25 #ff91c6, 30 #ff78bc, 40 #ed52a6, 50 #cd3d8b, 55 #be327e, 60 #ad2a71, 70 #8a1f57, 80 #631e40, 90 #3e192a
  - `orange`: 2 #fff2ea, 5 #ffe9dd, 10 #ffd9c6, 20 #ffb996, 25 #ffa87b, 30 #ff965e, 40 #f27324, 50 #d15c08, 55 #c05200, 60 #ad4900, 70 #8a3701, 80 #622c12, 90 #3e1f14
  - `green` (extend): 40 #00a370, 50 #00855b, 55 #007953, 60 #006d4b, 70 #00573c, 80 #00422d, 90 #032d20
  - `teal`: 5 #ddf1ed, 10 #bee9e4, 20 #7ad8d0, 30 #2ac4bc, 50 #008e89, 70 #005b5b, 80 #004445
  - `yellow`: 5 #ffebd0, 10 #ffddb0, 20 #ffc065, 30 #f5a500, 50 #b87200, 70 #7c4400, 80 #5b320e
  - `blue`: 5 #e7ecf5, 10 #d4dff3, 20 #acc4f3, 30 #84a9f1, 50 #4372d6, 55 #3565cc
  - `warmGray-95` #251b21 (iframe placeholder on /security/)
  - `trust-header` #f3ecf7 (StandardPageHeader and PullQuote background on /security/; it is not in any scale)
  - `green-100` #d6edd9 (GridCanvas line stroke, `--green100`)
- **Accent "theme" mechanism.** The live site sets `data-color-theme=<hue>` on a card, which remaps `--acc5/10/20/30/50/70/80` to that hue's steps. The theme values are purple, pink, orange, green, teal, yellow and blue. Recommended implementation: a small `themeVars(hue)` helper that returns inline CSS vars, plus Tailwind arbitrary values such as `bg-[var(--acc5)]`.
- **Radius** `--radius`: 12px below 640, 14px at ≥640. Add `rounded-card: var(--radius)` and a CSS var in index.css. Content cards use a fixed 8px. QuoteCardNeue uses 12px (<640) and 14px (≥640). Explosion card uses 12px.
- **`--cardSectionPadding`**: 28 (<640), 40 (≥640), 55 (≥1024), 72 (≥1440). Add it as spacing `card-pad`.
- **Type roles** (Reckless unless noted):
  - `solution-hero-h1`: 42/40.74 ls -.84px (<640) · 54/52.38 ls -1.35px (≥640) · 64/62.08 ls -1.92px (≥1280). CSS: `line-height:.97`, `letter-spacing:-.02em/-.025em/-.03em`, `text-wrap:balance`, `max-width:15em`.
  - `subsolution-h1`: 32 (<768) · 38 (≥768) · 46 (≥920) · 52 (≥1280); line-height .97; ls -.02em, then -.03em at ≥1280. Measured: 52/50.44 ls -1.56px; 32/31.04 ls -.64px at 390.
  - `section-h2`: 32/33.6 (<640) · 38/39.9 (≥640) · 46/48.3 (≥1024); line-height 1.05; ls -.01em (<768) / -.02em.
  - `opening-h2`: 22/26.4 (<768) · 34/40.8 ls -.34px (≥768).
  - `valueprop-h3`: 20/26 ls -.2px · 24/31.2 ls -.24px (≥1280).
  - `card-h3-24`: 24/27.6 ls -.2px (child entry cards).
  - `usecase-h3`: 24/27.6 · 36/36 ls -.72px (≥1280).
  - `quote-xl`: 30/37.5 ls -.3px (ribbon quote ≥1280; 24 ≥920; 20/26 below).
  - `quote-short`: 64/64 ls -1.6px (≥1280), 50/50 (≥920), 32 (≥640), 24 (<640).
  - `quote-32`: 32/40 ls -.32px (centered and banner ≥1280; 32/41.6 at 920–1279; 24/31.2 ≥640; 22/28.6 <640).
  - `kaleidoscope`: 38/43.7 ls -.38px (≥920) · 28 (≥640) · 24/27.6 (<640).
  - `stat`: Reckless **300** 48/43.2 ls -1.44px (≥1280) · 42/37.8 ls -.84px.
  - `content-card-h4`: 22/24.2 ls -.22px (≥512); Roobert 600 14/16.8 ls -.14px below 512.
  - `card-eyebrow`: Roobert Mono 700 10/12.5 ls .5px uppercase.
  - Sans: `body-16` Roobert 500 16/22.4; `valueprop-body` Roobert 500 16/24; `ribbon-body` Roobert 500 14/18.2; `feature-h3` Roobert 600 22/25.3 (≥1024) and 20/23; `example-label` Roobert 500 18/21.6; `explosion-h3` Roobert 500 28/32.2 ls -.56px.

---

## 1. AreaNav (shared; all pages)

Live module `AreaNav`. Position: in normal flow directly below the 68px site nav (y 68–130 at 1440). It is **not** sticky on these pages (the `sticky` class is absent). `z-index:200`, `text-wrap:pretty`.

- `.bar`: `max-width:1520px; margin:0 auto; padding:0 var(--widerPageMargin)` (40 at 1440). Below 640 it uses `padding-inline: var(--pageMargin)` (18).
- `.inner`: flex row, `align-items:center`, `gap:10px` (1rem with root font-size 10px); `border-top:1px solid color-mix(in srgb, currentColor 12%, transparent)`, i.e. purple-65 or purple-70 at 12%. Padding is `15.45px 0`, which gives a 62px total height at ≥1024 and 390. At 768 the padding is `18.45px 0` and the height 68px, because `--areaNavGap` derives from the nav height.
- **Pill** (`.pill.pillStatic`): text "Solutions" (or "Trust and security" on /security/). Roobert 600 14/16.1, colour `purple-60`, bg `purple-5`, radius 990px, padding `4.2px 12.6px` (.3em .9em), box 84.7×24.5. The static pill has no hover change. A linked pill has hover bg `purple-10`.
- **Crumb** (Solution and SubSolution pages): `margin-left:2.5px`, gap 12.5px. The separator is a CSS triangle (`border:.3rem solid transparent; border-left:.45rem solid`, so 4×6px) at opacity .4. The current crumb link (Security / IT) is Roobert 600 14/16.1 in **`accent` #8d75e6**. Non-current crumb links have opacity .75; on hover, opacity 1 + underline.
- **Section links** (right-aligned, `margin-left:auto`, `.flushEnd` → `margin-inline-end:-12px`): `<a>` Roobert 600 14/16.1, padding `6px 12px`, radius 50px, gap 4px, colour = page fg. Hover background is `color-mix(in srgb, currentColor 10%, transparent)` with no transition. The active link (`.sectionActive`) is `accent` #8d75e6.
  - Security pages: AI SOC, SOAR, GRC, Threat intelligence, Vulnerability management, Network security. Hrefs are `/solutions/security/<slug>/`, where the slug is ai-soc, soar, governance-risk-and-compliance, threat-intelligence, vulnerability-management or network-security.
  - IT pages: IT as a business enabler, Infrastructure management, Networking, Application management, IT service delivery and support.
  - Industry pages (no crumb): IT, Security, Public sector, Financial services, MSSPs. The current page is active.
  - /security/: "Security ▾" (active, `purple-50`) · "Legal ▾" · "Trust center ↗". The arrow is Roobert 600 10.92px at opacity .6, linking to https://trust.tines.com/. The carets are CSS triangles (`border-top:.4rem solid; border-inline:.3rem solid transparent`, 6×4) at opacity .55.
- **Below 1024 (collapsed)**: `.flatGroup` is hidden. The crumb zone becomes `.collapsedNav`: separator + button showing the current section label (accent colour) + caret. It opens `.dropdown`, which has:
  - bg `lightest`, `border:1px solid currentColor 12%`, radius 10px, padding 6px, min-width 180, `margin-top:4px`, absolutely positioned below;
  - entry animation `areaDropdownIn .3s cubic-bezier(.22,1,.36,1)` (opacity 0→1 at 0.1%, translateY 8px→0);
  - links Roobert 600 14, padding `9px 8px`, radius 6px, hover bg currentColor 10%.
  - At 390 the bar is `[Solutions pill][› Security ▾]`.
  - While the bar measures itself (`.preMeasure`, ≤1439px), the zones fade in with `animation: 0s linear .8s forwards` (opacity 0 → 1).
- Dropdown contents (collapsed menu) were not opened during measurement. They use the same link list as the flat nav.

---

## 2. SolutionPage template (/solutions/security/, /solutions/it/)

Vertical rhythm at 1440. Section tops: AreaNav 68 · hero 130 · value props 1041 (security) / 1337 (it) · child grid +156 · ribbon +156 · CTA +156 · footer. Between content sections the gap is `margin-top: var(--section-margin)`: 156 at 1440, 96 at 390. The hero's openingParagraphs carries `margin: var(--section-pad) auto` (96 at 1440, 40 at 390), so the value-props section follows with margin 0.

### 2.1 SolutionHero (centered)
- Section: `max-width:1520px; margin:0 auto; padding-top: var(--sp-xxl)` (64 at 1440, 45 at 390); `position:relative`.
- `.centered`: flex column, `align-items:center`, `text-align:center`. `.content` has `padding-inline: var(--widerPageMargin)` and is 1040 wide at 1440 (x 200).
- Order:
  - Kicker (SECURITY / IT / FINANCIAL SERVICES / PUBLIC SECTOR / MSSPS), centered, 16.1 tall, followed by a 30px spacer.
  - H1, `solution-hero-h1`, centered, width 960. Text: "Built by security practitioners, for security practitioners" / "One platform for every workflow, every team, and every AI.". It renders on 2 lines, 124.2px tall at 1440.
  - 30px spacer.
  - Description: Roobert 500 16/22.4, max-width 576 (36em), centered. Security has 19 words: the gist is that smart security teams trust Tines for mission-critical workflows. IT has 35 words: IT as a foundation, orchestrating across infra/apps/AI.
  - 40px spacer.
  - Button group: `display:grid; grid-auto-flow:column; grid-auto-columns:minmax(140px,1fr); gap:8px; width:fit-content; margin-inline:auto`. Buttons are [BOOK A DEMO] filled → /book-a-demo/ and [SIGN UP FREE] outlined → https://login.tines.com/saml_idp/signup (`--btn-color` purple-70).
  -
- **Decorations (≥1280 only; `display:none` below)**. These are `HeroHeadlineDecoration`, absolutely positioned relative to `.headlineWrap` (the H1 wrapper, z-index 0), and they are static: no scroll or pointer motion was measured.
  - `shields` (security):
    - left `ShieldsLeft.svg` 393×239, `top:25%; right:100%; transform:translate(10%,-35%)` at ≥1440 (8% at 1280–1439);
    - right `ShieldsRight.svg` 406×179, `top:50%; left:100%; transform:translate(-15%,40%)` at ≥1440 (-35% below).
  - `clouds` (it): `CloudsLeft.svg` and `CloudsRight.svg`, both 360×454 (aspect 360/454).
    - left `top:50%; right:100%; transform:translate(20%,-35%)`;
    - right `top:50%; left:100%; transform:translate(-20%,-25%)`.
  - `financial` (financial-services): `FinancialServicesHeroBackdrop`, positioned in the full-bleed `.backdrop` (`position:absolute; inset:0; overflow:hidden; pointer-events:none`):
    - `FinancialLeft.svg` 360×454 at `bottom:110px; left:-20px; transform:translateY(-50%)`;
    - `FinancialRight.svg` at `top:250px; right:-20px; transform:translateY(-50%)`.
- **Below 1280**, a single centered page icon replaces the decorations (`PageIconDispatcher`, `margin-bottom:2em`): `PageIconShields.svg` (117×84 at 390), `PageIconClouds.svg` or `PageIconFinancial.svg`. Public-sector and MSSPs have no page icon.
- **OpeningParagraphs** (`.openingParagraphs`):
  - `max-width:936px; margin: var(--section-pad) auto; padding: var(--section-pad) 0; border-top/bottom: 1px solid color-mix(currentColor 20%)`;
  - `column-count:2; column-gap:24px` at ≥768 (1 column below), with `> * + * { margin-top:24px }`;
  - h2 `opening-h2`, max-width 12em (408px), text-align left (centered below 768, max-width 15em = 330);
  - paragraphs Roobert 500 16/22.4, text-align left (center below 768);
  - h2 "The ever-evolving threat landscape demands faster security responses" + 1 paragraph (50 words: security teams juggle stitched-together tools; intelligent workflows evolve with threats, reducing burnout);
  - IT: h2 "A unified workspace to build, run and monitor IT" + paragraph (51 words: Tines unifies infra, apps and AI in one secure workspace) + "With Tines, IT teams can:" + `ul` (padding-left 1em, Roobert 500 16/22.4, `li + li` margin-top .5em) with 5 items. Each item starts with a `<strong>` lead (Roobert 700) followed by 15–25 words: "Run everything from one place." / "See every workflow in motion." / "Build the way your team works best." / "Adapt as your environment evolves." / "Scale with governance built in."
- Heights at 1440: hero section 815 (security), 1111 (it), 832 (financial).

### 2.2 ValuePropsSection (also used by SubSolutionPage)
- Section wrapper: `PageSection` = `padding: 0 var(--page-wide)` (156 at 1440, 18 at 390) + inner max-width 1128.
- **Header** (`SolutionPageSecondaryDescription.header`):
  - `display:grid; gap:24px; grid-template-columns:repeat(3,1fr); grid-template-areas:"text text image"` (≥768), text-align left;
  - below 768 it becomes one column, `"image" "text"`, centered, and the image gets `margin:0 auto 1em`.
  - SolutionPage: text = h2 `section-h2` "Smart, secure workflows" (`align-self:center`).
  - SubSolutionPage: text = serif paragraph, Reckless **500** 20/28 ls -.2px, `padding-right:1em` (≥768), 724 wide. Word counts: ai-soc 55, soar 49, itsd 35. Gists: ai-soc, flexible AI that adapts to use cases; soar, legacy SOAR maintenance pain; itsd, unify IdPs, ticketing and approvals.
  - Image: `RainbowBridgeToSkyIcon.svg` 124×81, `margin-left:auto`.
- Gap header → list: 55px at 1440 (a `--sp-xl` spacer div), 35 at 390.
- **List**:
  - `display:grid; gap:24px`; 1 column (<768), 2 columns (≥768), 3 columns (≥1280), with `align-items:start`;
  - `data-columns="2"` keeps 2 columns at ≥1280; at 1440 these are 552px columns (soar, itsd).
- **Card** (`article.item`):
  - bg `--itemBg`, `border:1px solid --itemBorder`, radius `--radius` (14 / 12), padding `var(--md)` (30 at 1440, 18 at 390), flex column, gap 24px (≥640; 16px below), `height:100%`;
  - colour cycle by index (`data-color-index` 0–4, then it repeats):
    0. bg purple-5, border purple-20, fg purple-70
    1. bg pink-5, border pink-25, fg pink-70
    2. bg orange-5, border orange-25, fg orange-70
    3. bg green-5, border green-25, fg green-70
    4. bg teal-5, border teal-20, fg teal-70
  - h3 `valueprop-h3`, colour = fg;
  - p Roobert 500 16/24, `padding-right:1em`, colour = fg; 30–44 words per card;
  - icon: `margin-top:auto; margin-left:auto; height:90px; width:auto` (img object-fit contain), bottom-right.
  - Card heights at 1440 (3 columns): 399–406. Cards in a row share row height; the SolutionPage list is 830 tall for 2 rows.
- Card titles, verbatim:
  - security: Build your way · Turn every alert into action · Faster triage, sharper focus · Full visibility built in · Flexible case management · One secure environment built for every team
  - it: Build your way · Clear the channel mess · Intelligent execution, sharper focus · Full operational visibility and resilience · One secure environment built for every team
  - ai-soc: AI SOC without compromise · Every use case, every vendor · Built for speed without sacrificing control
  - soar: Automate security operations · Eliminate alert fatigue · AI on your terms · Streamline case management
  - itsd: Always provide the right access at the right time · Deliver services, not just tickets · Every incident deserves the full picture · Let endpoint operations take care of itself
- Icons (bottom-right, 90px tall) are datocms spot icons, listed in assets-b.json under section `PageSection` (spot-icon-build, spot-icon-alert-2, funnel, spot-icon-monitor, spot-icon-cases, endpoint-gate, spot-icon-agents, accelerate, pendulum, credentials-key, event-leak, patch-configuration, spot-icon-connected-wires, spot-icon-core-capabilities).

### 2.3 ChildEntryCardGrid ("Dive into the details")
- Header:
  - h2 `section-h2` "Dive into the details", centered;
  - p Roobert 500 16/22.4, centered, margin-top 24: "Explore specific security solutions." / "Explore specific IT solutions.";
  - header → grid gap 55 (`--sp-xl`).
- Grid:
  - `display:grid; gap:24px`; 2 columns (≥768); 4 columns (≥1280);
  - **fourPerRowCentered** (security): at ≥1280 `display:flex; flex-wrap:wrap; justify-content:center; gap:24px`, children `width:calc((100% - 72px)/4)` = 264px, so row 2 (2 cards) is centered;
  - **threePerRow** (it): flex, children `calc((100% - 48px)/3)` = 360px.
- **Card** (`a.card`):
  - `display:grid; grid-template-areas:"illustration" "c200" "c100" "header"; grid-template-rows:auto auto auto minmax(auto,1fr); overflow:hidden`;
  - radius `--radius`, `border:1px solid var(--acc20)`, bg `var(--acc50)`, colour `var(--acc80)`, `transition:border-color .15s`; **hover border → `--acc30`**;
  - illustration: bg `--acc30`, `min-height:250px`, flex centered, img `max-width:220px`;
  - c200 strip: height `--sp-gap` (24 / 16), bg `--acc20`; c100 strip: same height, bg `--acc10`;
  - header: padding `--sp-gap` (24 / 16), bg `--acc5`, `text-wrap:balance`, h3 `card-h3-24` Reckless 400 24/27.6 ls -.2px, colour `--acc80`.
  - Card heights: 375.6 (one-line title), 403 (two-line title).
- Cards (title → href, theme, illustration):
  - security:
    - AI SOC → /solutions/security/ai-soc/ (purple, aiSocIllo.svg)
    - SOAR → /solutions/security/soar/ (purple, soarMediumIllo.svg)
    - GRC → /solutions/security/governance-risk-and-compliance/ (green, phishingMediumIllo.svg)
    - Threat intelligence → /solutions/security/threat-intelligence/ (pink, threatIntelMediumIllo.svg)
    - Vulnerability management → /solutions/security/vulnerability-management/ (orange, vulnMngtMediumIllo.svg)
    - Network security → /solutions/security/network-security/ (green, networkSecurityMediumIllo.svg)
  - it:
    - IT as a business enabler → /solutions/it/it-as-a-business-enabler/ (purple, itAsABusinessEnablerIllo.svg)
    - Infrastructure management (yellow, itOpsIllo.svg)
    - Networking (pink, networkingMediumIllo.svg)
    - Application management (green, itpmTilesIllo.svg)
    - IT service delivery and support (purple, shiftLeftIllo.svg)

### 2.4 RibbonQuote, `solution` size (SolutionPageQuoteSection)
- Layout: `.ribbon` grid, `grid-template-columns: 360px minmax(0,1fr)` (≥920), colour `--acc70`. Below 920 it is 1 column with centered text.
- **ribbonHeader** (360 wide at 1440):
  - bg `--acc5`, `border:1px solid --acc20`, radius `14px 0 0 14px`, `padding-right:71px`, `display:grid; grid-template-rows:minmax(auto,1fr) auto`, **`transform:translateY(-24px)`** (≥920), overflow hidden, font-size 14;
  - folded corner `::after`: 71×23 at top-right, bg `--acc20`, `clip-path:polygon(100% 0,0% 100%,100% 100%)` (≥920 only);
  - start block: padding 28; h2 Reckless 400 28/30.8; then (margin-top 14) body Roobert 500 14/18.2. Security has 46 words (accessible workflows for analysts to engineers). IT has 44 words (Intercom's IT team took control of workflows);
  - end block (`ribbonHeaderEnd`): bg `--acc10`, padding 28, Reckless 400 22/26.4 (≥920; Roobert 600 18/21.6 below). Text: "93 days gained from workflows" / "Build time reduced from 2 months to 2 hours".
- **ribbonContent**:
  - bg `--acc5`, border `--acc20`, radius `0 14px 14px 0`, `min-height:400px`, padding `32px 48px`, `margin-left:-72px` (it tucks under the header), position relative;
  - quote mark SVG 40×40 (`reference/svg/pages/solutions-it-quote-mark-1.svg`, fill currentColor);
  - blockquote `margin: var(--md) 0` (30), max-width 700, Reckless 400 30/37.5 ls -.3px (≥1280), 24 (920–1279), 20/26 below. Security has 26 words (an analyst says Tines does the work of 3 FTEs). IT uses **shortQuote** "Intercom's future is being built on Tines." (7 words), Reckless 64/64 ls -1.6px (≥1280);
  - figcaption: grid, Roobert 14/19.6. Name `<strong>` 700 (Aaron Jewitt / Emanuele Sparvoli), title 500 (Principal Security Analyst, Elastic / Director of IT, Intercom), then a 24px spacer and the company logo SVG (`max-height:38px`; elastic 110×38, intercom 160 wide).
- Themes: security purple (acc70 purple-70), it **pink** (bg pink-5, border pink-20, end block pink-10, text pink-70).
- Below 920 (390): the header gets radius `12 12 0 0` with no translate and centered text. Content: `border-top:0`, radius `0 0 12 12`, padding `32px 24px`, quote 20/26.
- Height 406 (security) / 451 (it) at 1440.

### 2.5 CTA: `CtaStartToday` (b), see the reuse map. Margin-top 156.

---

## 3. SubSolutionPage template (ai-soc, soar, it-service-delivery-and-support)

Wrapper `page.solutionChildPageContent`: `padding-top: var(--sp-xxl)` (64 at 1440; content starts at y=194). Sections are separated by `margin-top: calc(var(--section-margin) * .8)`, which measured 124.8 at 1440 and 76.8 at 390. The CTA margin is also 124.8.

### 3.1 SubSolutionHero (SolutionChildPageHero)
- `.headerWrap`:
  - colour `--acc70`, radius `--radius`, `border:1px solid --acc20`, `display:grid`;
  - ≥768: `grid-template-areas:"header c100 c200 illustration"; grid-template-columns: minmax(auto,12fr) minmax(24px,1fr) minmax(24px,1fr) minmax(auto,7.2fr)`. Measured columns at 1440 are 718.9 / 59.9 / 59.9 / 431.3; at 1024, 437 / 36.4 / 36.4 / 262; at 768, 354 / 29.5 / 29.5 / 212.6;
  - ≥1280: `margin: 0 calc(var(--card-pad) * -1)`, i.e. -72px at 1440, so the card is 1272 wide at x 84;
  - <768: single column, `"illustration" "c200" "c100" "header"`.
  - Height: 439.5 (ai-soc), 420.3 (soar, itsd).
- `.headerTextContent`: padding `var(--card-pad)` (72 / 28), bg `--acc5`, radius `14 0 0 14` (≥768) or `0 0 12 12` (<768), text-align left.
  - Breadcrumbs: Roobert 600 14/16.1, each child opacity .7. Link (Security → /solutions/security/, or IT → /solutions/it/) hover opacity 1. Separator "/" opacity .5, margin `0 .4em`. Current label (AI SOC / SOAR / IT service delivery and support).
  - h1 `subsolution-h1`, `text-wrap:balance`, 575 wide, 24px below the breadcrumb. Text: "Build the AI SOC your team actually needs" / "Modern SOAR built for speed, security, and scale" / "Build the future of IT service delivery".
  - Description: `margin-top:1em`, Roobert 500 16/19.2 (≥920), 14/16.8 below. Word counts: ai-soc 46, soar 33, itsd 31.
  - Buttons: `margin-top:24px` (1.5em), same grid as the hero group, left-aligned. ai-soc has [BOOK A DEMO] only. soar and itsd have [BOOK A DEMO][SIGN UP FREE].
- Colour strips: c100 bg `--acc10`, c200 bg `--acc20`, each `min-width/min-height:24px` (they are vertical columns ≥768 and 16px-tall rows at 390).
- `.illustration`: bg `--acc30`, radius `0 14 14 0` (≥768) or `12 12 0 0` (<768), `min-height:250px` (≥768), position relative.
  - The img is `width:120%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)` (≥768), which overflows the column. At <768: `max-width:90%; margin:2em auto; display:block`.
  - Images: `aiSocExtendedIllo.svg` 594×440, `soarExtendedIllo.svg` 594×440, `shiftLeftExtendedIllo.svg` 513×312.
- Theme on all 3 pages: purple.

### 3.2 Secondary description + ValueProps: see 2.2 (`columns` 3 / 2 / 2).

### 3.3 CustomerLogosMarquee (SolutionPageCustomerLogosSection)
- Container: `border:1px solid color-mix(currentColor 20%)`, radius `--radius`, `padding: var(--sp-xl) 0` (55 / 35), `overflow:hidden`. Height 337 at 1440, 352 at 390.
- Header:
  - ≥640: `display:grid; grid-template-columns: minmax(auto,265px) minmax(265px,1fr)` (≥1280), `margin-left:8.333%`, max-width 650 (≥1024), `padding: 0 16px`, `align-items:center`, text-align left;
  - h2 Reckless 400 28/32.2 ls -.56px "Trusted by industry leaders", with `border-right:1px solid currentColor 20%`, `margin-right:1em; padding-right:1em` (≥640);
  - p Roobert 500 16/22.4: "Businesses from global enterprises to national laboratories scale their workflows with Tines." (12 words);
  - <640: centered; h2 gets `padding-inline:1.25em`, then a 1em gap.
- A 55px spacer, then `.marqueeContainer`: flex column, `align-items:flex-start`, gap 40px (≥1024) or 32px (2em).
- Each row is `display:inline-flex; align-items:center`, with each logo `margin-right:2em` (32px). Logos are inline SVGs at fill currentColor (page fg purple-65), heights 20–36px.
  - Row 1 (8 logos, rendered twice, 2124px): beyon-cyber 90×33, canva 56×30, coinbase 98×22, databricks 131×31, dropbox 118×24, elastic 91×36, (logo 129×28), (logo 93×32).
  - Row 2 (8 logos, rendered twice, 2218px): kayak 125×24, mars 70×20, mckesson 103, myfitnesspal 132×21, reddit 80×27, snowflake 131×30, sophos 90, sprinklr 122×27.
  - Files are in `reference/svg/pages/solutions-security-ai-soc-customer-logo-*.svg`. The two unnamed logos are `-1`/`-2`.
- **Motion**: JS-driven (requestAnimationFrame), inline `transform: translate3d(-X%,0,0)` that runs continuously while on screen; both rows move left. Measured rates over 1s and over a 6s window: row 1 ≈ 1.18%/s of its width (≈25px/s); row 2 ≈ 1.36%/s (≈30px/s). The content is duplicated, so wrap at −50%. The rows start at an offset (-6.6% / -7.5% on load). Hover pause behaviour was not observed (no pointer test).

### 3.4 ContentCardGrid (SolutionPageContentCardSection; identical CSS to Industry `SolutionForRelatedContentSection`)
- Grid: 2 columns with gap 8px (.5em) below 640; gap 24 at ≥640; at ≥1024, `grid-template-columns:repeat(4,1fr); grid-template-rows:repeat(2,1fr)`.
  - Children 1–3 span 2 rows (`min-height` 225 / 300 at ≥640 / 340 at ≥1024).
  - Child 4 also spans 2 rows unless `data-layout="5"`, in which case children 4 and 5 stack in column 4 (heights 240 + 135 at 1440 on financial-services). In that layout their figure gets `margin-top:-.75em` and the img `translate(.5em,.5em)`.
- **ContentCard**:
  - `display:grid; grid-template-rows:minmax(auto,1fr); border-radius:8px; border:1px solid var(--cc200); background:var(--cc50); color:var(--cc700); overflow:hidden; position:relative`;
  - `--ccN` = the chosen hue's scale (`data-color` = purple / pink / orange / green). Hover (hover-capable devices): border → `--cc400`;
  - variants: `v50` (default), `v500` bg cc500 + border cc400 + text lightest, `v600` bg cc600, `v800` bg cc800 (hover border cc300);
  - content: padding 20px (1.25em; 14px below 640), `grid-template-rows:minmax(auto,1fr) auto`;
  - header: eyebrow `card-eyebrow`; h4 `content-card-h4` (margin-top 12px, i.e. .75rem at ≥512); optional p Roobert 500 14/17.5; CTA `<strong>` Roobert 700 14/17.5 (600 12/15 below 640) followed by an `::after` "→" (margin-left .25em, `transition: all .2s`, card hover → `translateX(3px)`). External cards get "↗" at 80% size;
  - figure: `margin-top:1em; display:flex; justify-content:flex-end`, with the spot icon bottom-right (66–98px wide, ~90px tall).
  - **Case-study cards** (`ContentCardCaseStudy`): radius `6px 8px 8px 6px`. A ≥640 `::before` adds a 4px-wide vertical band at left:6px (black, `mix-blend-mode:color-burn`, opacity .1). An `::after` bookmark ribbon (36×56 SVG data-URI, color-burn, opacity .175) is 28×44 at `top:0; right:20px` (≥640). The figure shows a white customer logo (max-width 8em; 7em with `.short`).
- Cards per page (eyebrow · title · CTA · colour/variant):
  - ai-soc (`layout=4`):
    - BLOG · Building a flexible AI SOC with Tines agents · Read now (green v50)
    - WEBINAR · Intelligent workflows: SAP's approach to SOAR in the AI era · Watch webinar (purple v50, inline SVG icon)
    - PRIVATE AND SECURE · AI in Tines · Learn more (orange)
    - SOLUTION · Security Solutions + p "Built by security practitioners, for security practitioners" · Learn more (pink)
  - soar (`layout=5`):
    - SOAR · The essential SOAR buyer's guide · Read now (purple)
    - BLOG · Introduction: migrating to Tines Cases (green)
    - CASE STUDY · Mars achieves coverage of 80-90% of sources for true positives in weeks (purple v600, mars logo)
    - BLOG · SOAR in the AI era: how SAP uses intelligent workflows to build an AI SOC (pink)
    - PRIVATE AND SECURE · AI in Tines (orange)
  - itsd (`layout=4`):
    - BLOG · From backlog to breakthrough: enhancing IT service delivery and support with automation (pink)
    - BLOG · Smarter ticket handling with AI and the new wave of orchestration (green)
    - CASE STUDY · Intercom's IT team boosts efficiency by overhauling their workflows with Tines (orange v500, intercom logo)
    - PRODUCT · Meet the product · Learn more (purple)

### 3.5 CTA: `CtaStartToday` (b), tone purple-65.

---

## 4. IndustryPage template (/financial-services/, /public-sector/, /mssps/)

The shell `page.page` contains sections separated by **spacer divs**. Spacer heights at 1440 / 390: `S156` = section-margin (156/96); `S96` = section-pad (96/40); `S64` = sp-xxl (64/45). All content sections are `PageSection` (`padding: 0 var(--page-wide)`, inner max 1128) unless noted. Page fg is purple-70.

### Section order
- **financial-services**: Hero(+opening) → [96 from opening margin] UseCaseTabs → S156 → CenteredQuote → S156 → ChildEntryCardGrid(withHeadingCell) → S156 → RibbonQuote(banner) → S156 → Kaleidoscope → S64 → ContentCardGrid(layout 5) → S156 → ExplosionCTA
- **public-sector**: Hero → ProductVisual (margin-top 24) → S96 → FeatureHighlights(compact) → S156 → CenteredQuote → S156 → UseCaseTabs → S156 → ExampleCards → S156 → PartnerLogoGrid → S156 → ContentCardGrid(layout 4) → S156 → ExplosionCTA
- **mssps**: Hero(split) → S156 → ValuePropositionGrid → S156 → FeatureHighlights(grid) → S156 → QuoteCardGrid → S156 → UseCaseTabs → S156 → StatCards → S156 → ExampleCards → S156 → PartnerLogoGrid → S156 → ServicesRibbon → S156 → G2BadgeRow → S156 → ContentCardGrid(layout 5) → S156 → ExplosionCTA

### 4.1 SolutionHero on Industry pages
- financial-services: centered, as in 2.1.
  - Kicker FINANCIAL SERVICES; H1 "Secure, compliant, and scalable workflows"; desc 20 words (purpose-built for FS pressures, reducing operational risk); 2 buttons.
  - Opening: h2 "High stakes, high scrutiny, and high demands" + p (51 words: FS is heavily regulated, with legacy tools and alert overload).
  - Decorations `financial` (2.1).
- public-sector: centered, **1 button** [BOOK A DEMO], no opening paragraphs.
  - Kicker PUBLIC SECTOR; H1 "Smart, secure workflows for SOAR and beyond"; desc 19 words (federal agencies reach zero-trust goals).
  - Then two `heroSmallPrint` lines: Roobert 500 13/18.2, opacity .7, max-width 650 (50em), centered, second line margin-top .6em; a 30px spacer above.
    - Line 1 has 23 words and links "Carahsoft's GSA Schedule 47QSWA18D008F" (underline, offset .15em) → https://www.carahsoft.com/tines-automation-inc/contracts. Gist: available via the GSA Schedule, SEWP V and ITES-SW2.
    - Line 2 has 15 words (listed on the DHS CDM APL).
  - **Backdrop illustration**: inline SVG 207×169 (`public-sector-hero-illustration-1.svg`), `position:absolute; bottom:0; left:70px`, ≥1280 only.
- mssps: **split** (`.sectionSplit` adds `padding-inline: var(--page-wide)`).
  - ≥768: `display:grid; grid-template-areas:"content aside" "footer footer"; grid-template-columns:1fr auto; column-gap:24px; row-gap:72px` (gridGap×3); `align-items:center`; text-align left. Measured columns 818 / 286 at 1440, 464 / 286 at 1024, 318 / 286 at 768.
  - Content: kicker MSSPS; H1 "Intelligent workflows for MSSPs" (max-width 12em = 768; 2 lines); desc max-width 24em = 384, 39 words (unified secure platform to automate across clients); 1 button [BOOK A DEMO], left-aligned.
  - Aside: `MsspHeroIllustration.svg`, inline, 286×307 (`mssps-mssp-hero-illustration-1.svg`). Below 768 it gets max-height 220 and `margin-top:48px`. Static.
  - Footer (`margin: 60px calc(-1*(var(--page-wide) - var(--page))) 0`, i.e. it bleeds to the wider margin, 1360 wide at 1440): **MSSPLogoMarquee**.
    - Heading "TRUSTED BY LEADING MSSPS" (kicker style, centered, `margin-bottom:40px`). Viewport `--fade:60px`, `margin-inline:-20px`, `mask-image:linear-gradient(to right, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)`, `cursor:grab` (`:active` grabbing), `touch-action:pan-y`.
    - Track: flex, gap 45px (30 ≤1023, 20 ≤639), `width:max-content`, 7 logos × repeats; logos are inline SVG in currentColor, 24px tall (146–192 wide), with `transform:scale(.82)` ≤1023.
    - Animation `marqueeDrift var(--marqueeDuration) linear infinite`, translate 0 → `-var(--marqueePeriod)`. Measured `--marqueePeriod:1558px; --marqueeDuration:38.95s` at 1440, and 33.325s at 390 (this works out to ≈40px/s). `prefers-reduced-motion` → none. The site also supports drag-to-scrub (grab cursor); the drag physics were not measured.

### 4.2 UseCaseTabs (SolutionForUseCasesSection): all 3 Industry pages
- Header, horizontal variant (financial-services): `display:flex; justify-content:space-between; align-items:center; gap:24px` (≥768), with h2 "Smart, secure workflows" on the left and a 124×81 inline icon on the right. Below 768 it is `flex-direction:column-reverse`, centered, gap 16.
- Header, centered variant (public-sector, mssps): a section icon SVG (83×89 / 69×108) centered on top, 30px gap, h2 `SectionHeading2.centered` (max-width 690), p max-width 608 (38em) Roobert 500 16/22.4, then a 55px gap.
  - public-sector: h2 "Intelligent workflows for federal agencies"; p 31 words (meets M-22-09, M-21-31 and similar mandates).
  - mssps: h2 "The platform MSSPs rely on to scale"; p 19 words.
- Layout (≥768): `display:grid; gap:24px; grid-template-columns: 8.5em minmax(0,1fr)` (136px at 768/1024); at ≥1280 `200px minmax(0,1fr)`. Height 320.
- **Tab list** (hidden below 768): `display:grid; gap:.75em` (12px at 16px), `z-index:10`, font Roobert 500 13px (768) / 14px (≥1024) / 16px (≥1280).
  - Each tab: `min-height:54px; padding:.6em .8em; border:1px solid var(--tabBorder); border-radius:.5em` (8px), bg `--tabBg`, colour `--tabFg`, `text-align:left; display:flex; align-items:center`. Hover border → `--tabBorderDarker`. Active bg → `--tabBgDarker`.
  - Tab colours cycle purple → orange → green → pink → teal: tabBg = hue-5, tabBgDarker = hue-10, tabBorder = hue-20, tabBorderDarker = hue-30, tabFg = hue-70.
  - Active chevron: an 11×33 SVG at `left: calc(100% + var(--gap) + 1px); top:50%; translateY(-50%)`. It fades in (`opacity .2s`) and its inner svg slides `translate(-10px)` with `transform .35s cubic-bezier(.22,1,.36,1)`, pointing at the card.
  - Tab heights: 71 (financial-services, with 2-line labels at the 16px size) / 54.4.
- **Content cards** (`.contents` min-height 320, position relative; all cards `position:absolute; inset:0`, inactive cards opacity 0, `transition:opacity .2s`):
  - bg `--cardBg`, border `--cardBorder`, colour `--cardFg` (the same hue cycle: 5 / 20 / 70), radius `--radius`, padding `var(--card-pad)` with `padding-top:4em` (64) at ≥1280. At 1440 the padding is `64px 72px 72px`;
  - grid at ≥1194: `grid-template: "heading ." minmax(auto,1fr) "desc icon" minmax(0,auto) / 2fr minmax(38%,1fr)`; columns are 470 / 288 at 1440;
  - h3 `usecase-h3`, balance;
  - desc Roobert 500 16/22.4, max-width 26em (416), `align-self:end`;
  - icon img 275×275 (`width:275px; margin:-15% -9% -20% -15%`, `align-self:end`), a datocms "tines-illo-*-framed.svg" 240×240.
- **Next button**: an inline SVG 75×88 notch shape, absolutely positioned at `top:50%; left:calc(100% + .5px); transform:translate(-50%,-50%)` on the card's right edge. It contains a circle progress ring: `r=30.5`, `stroke-dasharray:191.54`, stroke `--tabFg`, width 2px. Hover: first circle fill → `--buttonHover` (hue-30). Click → next tab.
- **Auto-advance**: when the section is visible (IntersectionObserver on `.contents`), the active card's ring `stroke-dashoffset` animates linearly from 191.54 to 0 over **≈10s** (measured −29px per 1.5s), then the next tab activates and the ring restarts. Clicking a tab sets it active.
- Below 768: no tabs or next button; all cards are stacked statically (`+ * { margin-top:16px }`), centered text, `grid-template-areas:"heading" "desc" "img"`, padding 28; the icon is `max-width:60%; margin:0 -5% -5%`.
- Tab labels and card headings:
  - financial-services:
    - Automate → "Automate threat intelligence and incident response"
    - Streamline → "Streamline your GRC processes"
    - Connect → "Connect to all existing tools"
    - Accelerate → "Accelerate incident response and reduce alert fatigue"
    - Descriptions are 10–20 words.
  - public-sector: Identity, Devices, Networks, Apps and workloads, Data. Headings equal the labels; descriptions are 12–19 words.
  - mssps: Client onboarding · Alert triage and response · Vulnerability management · Phishing analysis · Compliance reporting. Headings equal the labels; descriptions are 28–32 words.
  - Card illustrations are in assets-b.json under section `SolutionForUseCasesSection`.

### 4.3 CenteredQuote (financial-services, public-sector)
- Section: `max-width: calc(1128px + 2*var(--page-wide)); padding: 0 var(--page-wide)` (vertical padding forced to 0); colour `--acc80` = purple-80 #3f2374. Inner `margin:0 24px` (≥768), centered.
- Quote mark: SVG 40×40, centered.
- Blockquote: `max-width:720px; margin:24px auto`, Reckless 400 32/40 ls -.32px (≥1280), 32/41.6 (920–1279), 24/31.2 (≥640), 22/28.6 (<640).
  - financial-services has 36 words: a Fortune 500 insurer says Tines saved hundreds of hours in 7 months.
  - public-sector has 26 words: the same 3-FTE quote theme as the Security page.
- Source: Roobert 16/19.2 (14/16.8 <640).
  - financial-services (no logo, centered): `<strong>` 700 "Information Security Manager" + 500 "Fortune 500 Insurance Company".
  - public-sector (`.hasLogo`): `display:grid; grid-template:"name logo" 1fr "title logo" 1fr / 1fr 1fr; gap: 0 48px`; name and title right-aligned; a 1px divider `::before` at `left:calc(50% - 1px)`, opacity .2; logo left (max-width 160px, 114×43 inline SVG). Name "Daniel Gallagher", title "Security Automation Engineer".
- public-sector only: `caseStudyButtonWrap` (`margin-top:40px` = sp-lg) with the outlined button "READ THE CASE STUDY" (198.9 wide). The button has `::before` backdrop bg `--acc5`, radius .5em, `transition:background-color .2s`; hover `--acc10`.

### 4.4 ChildEntryCardGrid, `withHeadingCell` (financial-services)
- `page.childPageGrid`: grid, gap 24; 2 columns (≥640), 4 columns (≥1194); 1 column below 640.
  - Cell 1: h2 `section-h2` "Protect what matters most" (2 lines in 264px) + p "See how Tines helps FSIs secure sensitive data and accelerate service delivery.", left-aligned (centered below 640).
  - Cells 2–4 are cards (2.3):
    - GRC (green, phishingMediumIllo) → /solutions/security/governance-risk-and-compliance/
    - IT service delivery and support (purple, shiftLeftIllo)
    - Threat Intelligence (pink, threatIntelMediumIllo)
  - Card height 403.

### 4.5 RibbonQuote, `banner` size (BannerQuoteSection, financial-services)
These are the same structure and ribbon rules as 2.4, with the following deltas:
- base font 16 (`--bannerQuoteBaseFontSize:1.6rem`); body p Roobert 500 16/22.4; 29 words (Bitpanda's alert overload solved with orchestration);
- card padding `var(--sp-xl) var(--sp-lg)` → `55px 48px` at 1440 (35/24 at 390);
- blockquote Reckless 32/40 ls -.32px (≥1280), 24 (≥920), 20/26 below; max-width 700 (400 below 920). 15 words;
- source 16/22.4 "Martin Schlatzer" / "Corporate IT Security Lead" + logo (153×38);
- h2 "Scale smarter, safer, faster"; end block "Trusted by 5 million customers"; theme purple; height 444 at 1440.

### 4.6 UseCaseKaleidoscope (financial-services)
- `.wrap` is full-bleed with overflow hidden. `.masker`: flex column, centered, gap .66em (10.56px), with edge fades `::before`/`::after` of width `var(--page)` (40) — linear-gradient from `--pageBg` (#fcf9f5) to transparent, z-index 1.
- 3 lines, each `display:flex; justify-content:center`; Reckless 400 38/43.7 ls -.38px (≥920), 28 (≥640), 24/27.6 (<640). `lineInner` is `display:inline-grid; grid-auto-flow:column; will-change:transform`, with each phrase set repeated 3×.
- Each entry is a dot + phrase: the dot is `.25em` square (9.5px), bg `--acc10` (purple-10), radius 50%, margin `0 .75em`.
- Lines:
  1. Compliance · Brand protection · Threat intelligence
  2. Reporting · Identity and access management · Integration
  3. Fraud prevention · Collaboration · Incident response
- **Motion**: while the wrap intersects the viewport (IntersectionObserver threshold 0), JS sets inline `transform: translateX(±Npx)` and advances it continuously at **≈80px/s**. Line 1 moves left (−), line 2 right (+), line 3 left (−). It stops when out of view and resumes from the same offset. N does not reset on load; it starts at 0. Wrap modulo one phrase-set width (971.7px for line 1 at 1440). The wrap point itself was not observed, because the value stopped at 579px when the section left the viewport.

### 4.7 ContentCardGrid (Industry related content): see 3.4.
- financial-services (`layout=5`):
  - TINES 3B · One environment to deliver AI agents, apps, and automation (purple)
  - SOLUTION · Modern SOAR built for speed, security, and scale (purple **v800**, bg purple-80, border purple-40)
  - BLOG · Beyond compliance: How orchestration and automation make financial services more resilient (pink)
  - CASE STUDY (short) · How Tines enabled this crypto exchange company to improve onboarding and offboarding globally (purple v600)
  - BLOG · Wild code: the IT crisis hiding in plain sight (green)
- public-sector (`layout=4`):
  - WHITEPAPER · Operationalizing zero trust · Access the whitepaper (purple; figure is a cover PNG 80×103.5, radius 4, `cover-1.png`)
  - BLOG · A federal AI SOC blueprint (green)
  - BLOG · Understanding your Tines deployment options (pink)
  - CASES · Automation-first case management · Explore cases (purple)
- mssps (`layout=5`):
  - PARTNERS · Explore our partners · Learn more
  - BLOG · How Armature Systems uses Tines… (15-word title)
  - LIBRARY · Explore more workflows
  - plus two short titles: "How intelligent workflows help MSSPs deliver customer outcomes at scale" and "Tackling alert fatigue with AI & automation: How MSSPs scale Tier 1 triage"
  - Colour order: pink, purple, green, orange, purple.

### 4.8 ExplosionCTA (all Industry pages)
- `.wrap`: `margin-top:-2em; padding-top:2em`. `.section`: z-index 1, relative. `.inner`: flex centered, padding `200px 0` (≥640) or `80px 0 100px` (<640). Height 812 at 1440, 536 at 390.
- Backdrop: 1770×900, `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%)` (`scale(.7)` below 640), `opacity:0 → 1` (`.ready`, `transition:opacity .5s`), `pointer-events:none`.
  - It holds 4 nested layers. Each layer group is `position:absolute; inset:0; transform-origin:50% 45%`. Each layer is a background SVG at `background-size:1770px 900px`: `explosion-cta-backdrop-layer-light-speed-1…4.svg`. Rendered boxes at 1440: 1239×630, 1062×540, 885×450, 708×360.
- **Scroll motion**: each layer group has inline `transform: scale(s)`. The resting scales are **.7, .6, .5, .4**, and all go to 1 as the section scrolls into view.
  - Measured settled values vs section top (viewport 900): top 900 → .7466; 800 → .8269; 700 → .8817; 600 → .9194; 500 → .9456; 400 → .9638; 300 → .9763; 200 → .9849; 100 → .9907; 0 → .9944; −100 → .9968.
  - All layers share one progress `p` with `scale_i = s0_i + (1 − s0_i)·p`, where `p = 1 − e^(−(945 − top)/262)` (this fits every sample to ±.003), clamped to [0,1].
  - The value is smoothed toward the target each frame, reaching it within ~0.9s. The per-frame lerp factor is not readable; ≈0.12/frame matches the samples. At p≈1 the site writes `translate3d(0,0,0)` with no scale.
- **Card** (`.cardPositioner` 360 wide, max-width 100%):
  - bg `lightest`, `border:1px solid purple-30`, colour purple-70, radius 12, centered, `user-select:none`;
  - body padding `3.5em 2em 3em` (≥640; `2.5em 2em 3em` below). Tines logo icon SVG 42×42 (`explosion-tines-icon-1.svg`; 30px tall below 640), 24px gap, then h3 "Built by you, powered by Tines" Roobert 500 28/32.2 ls -.56px (with a `<br>` after "you,"), a 32px gap, then buttons (flex wrap, centered, gap 6px): [BOOK A DEMO] filled + [SIGN UP FREE] outlined, purple-70;
  - footer: bg `purple-2` #f5f2fb, radius `0 0 12 12`, padding 3em (42px ≥640; 2em = 28 below), Roobert 500 14/19.6 "Already have an account? Log in." with "Log in" 600 → https://login.tines.com.
  - Decorations (background-image SVGs, contain):
    - `top-left-block-light.svg` 53×60 at the card's top-left, `translate(-75%,-47%)`;
    - `coffee-mug-light.svg` 81×75 at `bottom:4.5em; right:100%; translate(15%)`;
    - `bottom-right-pentagon-light.svg` 51×51 at `top:100%; right:0; translate(25%,-55%)`;
    - below 640 each is scaled .7 with the alternate translates in the CSS.

### 4.9 ResponsivePictureBand (public-sector layered product visual)
- `margin-top: var(--sp-xl)` (35 at 390), or `var(--sp-sm)` (24) at ≥1024. Width 100%, centered img, `user-select:none`.
- Three images by breakpoint: phone <512 (`…-phone.png`, 384×389 at 1x), tablet 512–1023 (`…-tablet.png`), desktop ≥1024 (`…-desktop.png` 1920×913, `max-width:1310px`).
- Rendered size: 1310×623 at 1440, 390×395 at 390.
- All 3 downloaded to `public/assets/pages/public-sector/`.

### 4.10 FeatureHighlights
- `compact` (public-sector):
  - Header: centered 150×150 section icon SVG, h2 "Modernize your security approach", description max-width 600 Roobert 500 16 (34 words: Tines speeds up reaching security goals), `padding-bottom: var(--sp-xl)`.
  - Grid: 1 / 2 (≥640) / 3 (≥920) columns, gap 24.
- `grid` (mssps): the same grid, but cell 1 is the h2 "Build, run, and monitor your most important workflows" (left, 4 lines in 360), followed by an outlined button "EXPLORE THE PLATFORM" (207.4 wide, `margin-top:24px`), then 5 cards. It uses `grid-auto-rows:1fr`.
- **Card**:
  - bg purple-5, `border:1px solid purple-30`, radius `--radius`, `display:grid; grid-template-rows:minmax(auto,1fr) auto; gap:24px; max-width:386px; overflow:hidden` (centered below 640);
  - header padding 24: h3 Roobert 600 22/25.3 (≥1024) / 20/23; optional link "Learn more →" / "Explore now →" Roobert 600 16, `margin-top:.5em`, hover underline (offset .15em);
  - image container `height:294px` (250 at 640–1279), img `height:100%; width:auto; position:absolute; bottom:0; left:50%; translateX(-50%)` (386×294 SVG).
  - Card height 423.7.
- Cards:
  - public-sector: Vendor-agnostic (→ /stories/templates/) · Deployed your way: hosted, self-hosted, or hybrid · Enterprise-grade controls and monitoring
  - mssps: Vendor-agnostic · 1,100+ pre-built workflows (Explore now → /library/) · Client data protected at every level · Deployed your way: hosted, self-hosted, or hybrid · Private and secure AI, always (→ /ai-in-tines/)

### 4.11 ExampleCards ("See more practical examples"; public-sector, mssps)
- Header: flex row (≥640), `justify-content:space-between; align-items:center; gap: var(--sp-md)`, with h2 "See more practical examples" on the left and the outlined button "VISIT LIBRARY →" (165 wide) on the right. Below 640 it is a centered column. Header → grid gap 55.
- Grid: 2 columns with gap 8 (<920); 3 columns with gap 24 (≥920); 5 columns (≥1280; 206.4 each).
- **Card** `<a>`:
  - `display:grid; grid-template-rows:minmax(auto,1fr) auto; gap: var(--sp-xxl)` (64 / 45); padding 1em (18 at font 18); radius `--radius`; bg `--cardBg` = hue-50; border hue-55; colour lightest;
  - p Roobert 500 18/21.6 (line-height 1.2);
  - img spot icon `place-self:end; max-width:86px` (≈70×90);
  - **hover `filter:brightness(1.05)`** (no transition);
  - height 235 at 1440, 216 at 390.
- public-sector: Incidents and alerts (orange) · Threat intelligence (pink) · Phishing attack response (purple) · Compliance (blue) · Vulnerability management (green). All link to `/library/use-cases/<slug>/`.
- mssps: Incidents and alerts (orange) · Asset and app management (purple) · Ticket synchronization (green) · Core capabilities (pink) · Threat intelligence (orange).

### 4.12 PartnerLogoGrid (public-sector, mssps)
- Header: centered section icon SVG 90×90, h2 centered "Partnered with the companies you trust today" (2 lines at max-width 690). mssps adds p max-width 576 (36em, `margin-top:.75em`) with 27 words (200+ partners from global to regional).
- Grid: flex wrap, centered, max-width 1000, `margin: 0 auto -1.4em` (≥920; -1em below).
  - Items: `height:90px; padding:1.4em` (22.4); `flex:0 0 20%` (≥1024), 25% (≥920), 33.33% (≥512), 50% (<512).
  - img/svg `max-height:40px; max-width:100%`.
  - Logos are inline SVG in currentColor.
    - public-sector, 8 logos: aws-marketplace, crowdstrike, recorded-future, elastic, (1), axonius, noname, tenable.
    - mssps: aws-marketplace, crowdstrike + 5 more (`mssps-partner-logo-1…5`).

### 4.13 ValuePropositionGrid (mssps "Tines transforms the way MSSPs operate")
- Section: `max-width:1400px; margin:0 20px` (at 1440); `padding: var(--section-pad) var(--page-wide) 0`, with padding-top 0 below 920; text-align left; relative.
- Backdrop (≥920 only): `position:absolute; top:0; bottom:0; left/right: var(--page)` (40), `border:1px solid green-20`, radius `--radius`. Inside it, a GridCanvas: an SVG of 120px grid lines with stroke `--green100` #d6edd9, inset 0, overflow hidden, radius inherit.
  - On intersect (IO threshold .2), the lines animate `lineEnter .5s forwards` (opacity 0→1). The per-line stagger was not captured (no inline delays were found in the SVG).
- Inner: `padding-bottom: var(--section-pad)` (≥768). h2 centered "Tines transforms the way MSSPs operate" (max-width 690), then a 55px gap.
- Grid: 3 columns with gap 24 (≥768); 1 column with gap 40 below.
- Each column (left-aligned ≥768, centered below; `> * + * { margin-top:24px }`; `> :not(img) { padding-right:1em }`):
  - spot icon img height 90;
  - h3 Roobert 600 22/25.3 (≥1024);
  - p and li Roobert 500 16/20.8 (line-height 1.3);
  - ul `margin-top:.75em; padding-left:1.5em; li margin-top .33em`. Below 768 the ul becomes a box: bg purple-5, border purple-10, radius 12, padding `12px 16px 16px 32px`.
- Columns (h3 · intro words · bullets):
  1. Increase margins and operational efficiency · 15w · "Automate workflows across every client" / "Reduce time spent on manual triage and analysis" / "Improve service delivery to your clients"
  2. Manage all your clients in one place · 13w · "A unified platform for all client workflows" / "Secure data isolation between every client team" / "Easy workflow sharing and updates across clients"
  3. Connect with any tool. Build with natural language · 18w · "Leverage 1,100+ prebuilt workflows" / "Connect to any API" / "Build workflows using natural language"

### 4.14 QuoteCardNeue (mssps: quote cards and stat cards)
- Grid: 1 column (<768), 3 columns (≥768), gap 24. The quote-card section header is h2 centered "Built for teams like yours", followed by a 55px gap.
- Card: bg `--cardBg` (hue-5), colour hue-70, border hue-20, radius 14 (≥640; 12 below), `display:grid; grid-template-rows:minmax(0,1fr) auto; overflow:hidden; text-align:left`.
- Content padding 1.5em (24 at 16px). The quote body (`medium`) is Reckless 400 20/27 ls -.2px (≥1280) or 18/24.3, with a leading quote SVG (`height:1em; margin-right:.25em; translateY(.15em)`, 22×20).
- Footer: padding `0 1.5em 1.5em` (21px at 14px font), Roobert 500 14/17.5. `.spaceBetween.hasLogo` is a row-reverse flex (`justify-content:space-between; align-items:flex-end`), with the logo (max-width 110) on the right and the source on the left (sourceName 600).
- Quote cards: green / pink / orange, 22–27 words each. Card 1: impact was immediate (MSSP leader). Card 2: analysts have all the info at first look. Card 3: integral, "would cry if somebody took it away".
- **Stat variant**: `em` is Reckless **300** 48/43.2 ls -1.44px (≥1280; 42/37.8 below), `display:block; margin-bottom:.3em`, not italic. The p below is Roobert 500 16/22.4 ls -.14px, max-width 18em. The footer has a 110×24.6 logo.
  - Stats in order (value · label · colour):
    - 55% · decrease in vulnerabilities · purple
    - 20K · and counting tenants worldwide · orange
    - 100s · of hours saved per month · pink
    - 26K · and counting builders · pink
    - 98% · reduction in time spent on threat hunting · green
    - $2M to $10M · scaling ARR with Tines · purple
  - Card height 192 at 1440.

### 4.15 ServicesRibbon (mssps "With you every step of the way")
- ≥1280: `display:grid; grid-template-columns: minmax(auto,5fr) minmax(auto,7fr)`. Measured 470 / 658 at 1440, height 478.
- Header (≥1280): colour orange-70, bg orange-5, `border:1px solid orange-20`, padding `var(--sp-lg)` (40), radius `8px 0 0 8px`, `margin: 0 -1px 47px 0`, `display:grid; grid-template-rows:minmax(auto,1fr) auto; gap:24px`, z-index 1.
  - Contents: an 82×90 inline icon, h2 `section-h2` "With you every step of the way", and a p max-width 20em (320) Roobert 500 16/22.4 with 25 words (team works with you, recognised for service).
  - Fold `::after`: 72×47 at `top:calc(100% + 1px); right:-1px`, `border-bottom/left:1px solid orange-20`, background two gradients (`linear-gradient(to right bottom, orange-20 50%, transparent 50%)` over orange-5).
- Grid card: bg orange-5, border orange-20, radius `0 8 8 0`, `margin: 47px 0 0 -72px`, `padding: calc(var(--section-pad) - 24px) 50px 55px calc(var(--section-pad)*1.4)` → `72px 50px 55px 134.4px`, `display:grid; grid-template-columns:repeat(2,1fr); gap:2em` (32), overflow hidden.
- Below 1280: header centered without box; the grid gets full radius 8 and `padding: var(--sp-xl)`; 2 columns (≥640) or 1 column.
- Service cards (`grid-template-columns:auto minmax(0,1fr); gap:1em`, colour orange-70): title Roobert 600 20/23; description Roobert 500 14/18.2; link Roobert 600 14 with hover underline.
  - Professional services (22w) · Learn more → /professional-services/
  - Enterprise-grade support (16w) · Learn more → /support-reference-guide/
  - University (14w) · Start learning → /university/
  - Technical resources (18w) · Read the docs → /stories/docs/quickstart/

### 4.16 G2BadgeRow (mssps)
- `ul`: 3-column grid with gap 24 (<768); at ≥768 a centered flex with gap 24, plus `> * + * { margin-left:24px }` (≥1024).
- Badges: img `width:120px` (130×150 SVG → 120×138.3); hover `brightness(1.02)` when linked.
- 6 badges: Leader, BestRelationship, BestUsability, MostImplementable, EasiestToDoBusinessWith_Enterprise, FastestImplementation_Enterprise. Alt text example: "Tines is a Leader on G2, Fall 2026".

---

## 5–8. Per-page section lists (top → bottom, at 1440, y = section top)

**/solutions/security/** (page height 5213 at 1440, 7532 at 390)
1. Navbar 0–68
2. AreaNav 68
3. Hero 130 (815)
4. ValueProps 1041 (966)
5. ChildGrid 2163 (952)
6. RibbonQuote 3271 (406)
7. CTA 3833 (518)
8. Footer

**/solutions/it/** (5530)
1. AreaNav 68
2. Hero 130 (1111)
3. ValueProps 1337 (942)
4. ChildGrid 2435 (952)
5. RibbonQuote 3543 (451)
6. CTA 4150
7. Footer

**/solutions/security/ai-soc/** (3791 at 1440, 4397 at 390)
1. AreaNav
2. SubHero 194 (439.5)
3. ValueProps 758 (601)
4. Logos 1484 (337)
5. ContentCards 1947 (340)
6. CTA 2411
7. Footer

**/solutions/security/soar/**
1. SubHero 194 (420)
2. ValueProps 739 (921; 2 columns)
3. Logos 1785
4. ContentCards 2247 (391.5)
5. CTA 2764

**/solutions/it/it-service-delivery-and-support/**
1. SubHero 194 (420)
2. ValueProps 739 (893; 2 columns)
3. Logos 1757
4. ContentCards 2219 (340)
5. CTA 2684

**/financial-services/** (5761)
1. Hero 130 (832)
2. UseCaseTabs 1057 (456)
3. CenteredQuote 1669 (331)
4. ChildGrid 2156 (403)
5. BannerQuote 2715 (444)
6. Kaleidoscope 3315 (152)
7. ContentCards 3531 (400)
8. ExplosionCTA wrap 4055 (844)
9. Footer

**/public-sector/** (6854)
1. Hero 130 (477)
2. ProductVisual 631 (623)
3. FeatureHighlights 1350 (773)
4. CenteredQuote 2279 (336)
5. UseCaseTabs 2770 (680)
6. Examples 3606 (338)
7. Partners 4101 (450)
8. ContentCards 4684 (340)
9. ExplosionCTA 5148
10. Footer

**/mssps/** (9110)
1. Hero 130 (693)
2. ValueProposition 979 (737)
3. FeatureHighlights 1872 (871)
4. QuoteCards 2899 (341)
5. UseCaseTabs 3397 (634)
6. StatCards 4187 (432)
7. Examples 4776 (338)
8. Partners 5270 (553)
9. Services 5957 (478)
10. G2 6590 (143)
11. ContentCards 6889 (392)
12. ExplosionCTA 7405
13. Footer

Interactive-state summary (all from live CSS):
- AreaNav link hover: bg currentColor 10%.
- Child card hover: border acc30, `.15s`.
- Content card hover: border cc400, arrow +3px (`.2s`).
- Use-case tab hover: border hue-30.
- Next-button hover: circle fill hue-30.
- Example card hover: brightness 1.05.
- Feature and service link hover: underline.
- Buttons: the same as the homepage.
- Centered-quote case-study button hover: backdrop acc10 (`.2s`).

---

## 9. TrustArticlePage: /security/

This is a legacy build: linaria hashed classes, react-helmet, no `<main>`. It re-implements the same chrome in its own CSS. Page fg is purple-65 and `--pageAccent` is purple-50. Page height 9496 at 1440, 9712 at 390.

### 9.1 Nav / AreaNav
- The nav measures the same as `Navbar`: 68 tall, bar padding `18px 40px 12px`, logo 91×28, items Roobert 600 14 with padding `8px 12px`, Log in / Sign up `8px 14px`, filled CTA purple-70 with radius 990 and padding `10px 20px`, search 38×38 purple-5. Reuse `Navbar` with tone purple-65.
- AreaNav (1.x) has the pill "Trust and security" → /security/, with dropdown triggers on the right. Below 1024 it collapses to "› Security ▾" (purple-50).

### 9.2 StandardPageHeader (y 130–460)
- Band: margin `0 40px` (`--page`), bg #f3ecf7, radius 32px (12 at 390), padding `40px 0` (18 at 390), height 330 (158 at 390).
- H1 "Security at Tines": Reckless 400 52/58 ls -.3px (38/42 at 390), left-aligned at x 196 (i.e. `--page-wide` 156 + 40), vertically centered in the band.
- Gap of 96px (`S96`) below.

### 9.3 Article + TOC (section y 556)
- Container: `margin: 0 var(--page-wide)` (156), `display:grid; grid-template-columns:816px 264px; gap:48px; padding-bottom:40px`. Below 1024 it is a single column with the TOC hidden; at 390 the article spans the full width minus 18px margins.
- Article (800 wide):
  - **PullQuote**: bg #f3ecf7, radius 14 (12 at 390), `margin-top:18px`, content inset 45px left and right, 41px top (svg at x 201, y 615; box at x 156, y 574). Contents: a 36×36 quote-mark SVG (`security-pullquote-mark-1.svg`, light circle drawn inside the SVG), then a Reckless 400 22/28.6 paragraph (18/23.4 at 390), 63 words: the world's leading security teams trust Tines; here is an overview of the measures.
  - **h3** section headings: margin-top 26, padding-top 19.5. Inner span Roobert 600 26/29.9 (22/25.3 at 390). They are followed by an anchor link icon (21×21 SVG, purple-50) with opacity 0 that turns opacity 1 on heading hover (no transition duration).
  - **h4** sub-headings: margin-top 20, span Roobert 600 20/32.5; anchor icon 16×16 in `accent`.
  - **p**: Roobert 400 18/29.25 (16/26 at 390), margin-top 18. Links are Roobert 600 in `accent`, underline.
  - **ul**: disc markers in purple-65, padding-left 40, margin `18px 0`; li text is p 18/29.25.
  - Headings, verbatim, in order:
    - h3 Compliance
    - h3 Security in the product
      - h4 Customized session timeout / SSO/SAML / Granular control over data retention / Cloud or on-premise deployment / Full audit log capabilities / Control access to stories and other resources
    - h3 Security in the organization
      - h4 BeyondCorp / Access to production systems / Security and privacy council / Awareness training / Security automation
    - h3 The Tines Trust Center
    - h3 Reporting security vulnerabilities
      - h4 Responsible Disclosure / Out of Scope
  - Body word counts in order: 111, 22, 19, 18, 26, 38, 32, 11, 32, 37, 39, 47, 15, 15, 16, 23, 57, 9. The Trust Center list has 4 items ("SOC2 Type II Report", "Results of our most recent vulnerability scan", "List of Tines security policies and procedures", "Results of a third-party risk assessment"). The guidelines list has 4 items ("Do not disclose the vulnerability outside of the VDP", "Do not violate any laws", "Do not disrupt services (DoS/DDoS)", plus a 16-word one). The Out of Scope list has 5 items ("HTTPS / TLS security headers suggestions", "Direct testing of 3rd parties", "SPF / DMARC / DKIM / DNSSEC suggestions", "Banner/version disclosure", "Social engineering / phishing / spam").
- **TOC aside** (≥1024): `position:sticky; top:100px`, bg `light-100` #f8f4f0, radius 14, padding `16px 24px`, `transition: top .25s ease, max-height .25s ease`, 264 wide.
  - "Contents" Roobert 600 14/17.5, with a bottom border of accent at 20% and padding/margin-bottom 8.4.
  - level-3 links: Roobert 500 14/17.5, padding `5.25px 0` with an 11px indent, radius 5.25.
  - level-4 links: Roobert 500 12.6/15.75, 25px indent.
  - **Scrollspy**: the link for the section in view turns `accent` (#8d75e6). Verified by scrolling: "Compliance" at the top, then "Access to production systems" at y 2500. Hover colour is also `accent`, with no underline.

### 9.4 HackerOne embed (not reproducible)
- Container: 800×4000, bg warmGray-95 #251b21, radius 18, `margin-top:18px`. It holds `<iframe src="https://hackerone.com/e025819c-b737-4902-9c55-c3f667e39fed/embedded_submissions/new?locale=en" title="Submit Vulnerability Report">` at 100%×100%.
- The form is cross-origin and Playwright cannot read its contents. Build should render the dark 4000px placeholder box, either with the same iframe or a static "Submit Vulnerability Report" stand-in.

### 9.5 Footer: `Footer` with tone purple-65. It is not preceded by a CTA.

---

## 10. Motion summary

| Element | Trigger | Implementation | Values |
|---|---|---|---|
| AreaNav pre-measure reveal (≤1439) | load | CSS animation | opacity 0→1 after 0.8s delay (`0s linear .8s forwards`) |
| AreaNav dropdown | open | CSS keyframe | `.3s cubic-bezier(.22,1,.36,1)`, translateY 8→0 |
| Customer logos marquee | while mounted | JS rAF translate3d % | ≈25px/s (row 1), ≈30px/s (row 2), leftward, loop at −50% |
| MSSP logo marquee | always | CSS `marqueeDrift` | period 1558px, 38.95s (1440) / 33.325s (390), linear, infinite; reduced-motion off |
| Kaleidoscope lines | IO (threshold 0) while visible | JS translateX | ≈80px/s; lines alternate −/+/− |
| Use-case tabs | IO on `.contents` | JS timer + SVG ring | 10s linear ring (dashoffset 191.54→0), then advance; card fade `opacity .2s`; chevron `opacity .2s` + `transform .35s cubic-bezier(.22,1,.36,1)` |
| Explosion backdrop | scroll (smoothed) | JS inline scale | scales .7/.6/.5/.4 → 1, `p = 1−e^(−(945−top)/262)`; `.ready` opacity `.5s` |
| GridCanvas lines (MSSPs) | IO threshold .2 | CSS `lineEnter .5s forwards` | opacity 0→1 |
| Child cards / content cards / tabs | hover | CSS | see the interactive-state summary |
| CTA "Start today" canvas + tri-cursor | as homepage | existing `CtaStartToday` + motion | unchanged |
| Hero decorations, sub-hero illustrations, MSSP hero illustration | none | static | verified no transform change across scroll/time |

There are no scroll-reveal fade-ins on these pages. All other IntersectionObservers have `rootMargin:"200px"` and are Next.js link prefetchers.

## 11. Could not be measured
- HackerOne iframe contents (/security/): cross-origin.
- The canvas drawing of the "Start today" CTA: the same as the homepage, already covered by `CtaStartToday` fallbacks.
- AreaNav collapsed dropdowns and the /security/ "Security ▾" / "Legal ▾" menus were not opened. Their item lists are inferred from the flat-nav links (Security/IT) and are unknown for Legal.
- The MSSP marquee drag physics, the customer-logo marquee wrap/hover behaviour, the Kaleidoscope wrap point, and the Explosion lerp factor. Only steady-state rates and settled values were sampled; the per-frame smoothing constant is inferred, not read.
- GridCanvas per-line stagger: no delays exist in the DOM. If there is a stagger, JS applies it after the snapshot.
- Two customer logos and several partner, MSSP and company logos have no accessible name in the DOM, so they are exported as `-N.svg`.
