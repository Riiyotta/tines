Source: https://www.tines.com/

# Tines homepage clone spec (route `/`)

Measured live with Playwright on 2026-10-16 at 1440x900 and 1280x800, with layout checks at 768 and 390. All values below come from `getComputedStyle` / `getBoundingClientRect`. They are not estimates.
Target stack: React 18 + Vite + Tailwind v3, one component per section.

Reference material (Recon output, not app source):
- `reference/desktop-1440-full.png`, `reference/mobile-390-full.png`: full-page screenshots
- `reference/canvas/*.png`: PNG exports of the 4 canvas-rendered artworks at 1440 (static fallbacks)
- `reference/svg/*.svg`: every distinct inline SVG (logos, icons, illustrations, the hero product-visual frame)
- `ASSET_MANIFEST.json`: 70 entries `{url, localPath, section, type, ...}`

Original stack: Next.js (turbopack chunks, CSS Modules with names like `SiteNav26`, `ThreeBHero`, `HomeMonitorBanner`, `HomeSolutionSection`, `HomeUseCasesSection`, `HomeUSPSection`, `WildCodeCTASection`, `SiteFooter26`). There is **no gsap, framer-motion, lottie, lenis or WebGL**. All motion comes from CSS keyframes, CSS scroll-driven animations (`animation-timeline: scroll(root)` / a named view timeline), and custom 2D-canvas renderers (`getContext("2d", {colorSpace:"display-p3"})`). There are also IntersectionObserver hooks (`rootMargin:"50% 0px"`, `"200px"`, `"-120px 0px 0px 0px"`, threshold `[0,.35,.65,.9,1]`) that start or stop the canvases and add the `.visible` class.

Third-party UI to IGNORE: the Intercom top banner (48px iframe, which adds `body{margin-top:48px}` and `--intercomBannerHeight`), the Intercom launcher bubble, and Cookiebot. Measurements below have this banner removed (header at y=0).

---

## 0. Global tokens

### Colors
The site declares colors in `display-p3`. The hex values here are the sRGB conversions taken from a canvas readback, so use them directly.

| Token | Hex | Usage |
|---|---|---|
| `--lightest` / page bg | `#fcf9f5` | `html` background, light text on purple |
| `--pageForeground` = `--c-purple55` | `#714bd0` | ALL default text, borders, filled buttons, solution panel, USP cards |
| `--c-purple70` | `#542f9c` | Nav "Book a demo" pill bg; timeline text |
| `--c-purple60` | `#6741bf` | Search pill icon color; nav-dropdown tile bg; timeline time label |
| `--c-purple50` | `#7a56e0` | Product dropdown hero column bg |
| `--c-purple5` | `#ece8fd` | Search pill bg; Discover blog column bg |
| `--c-purple10` | `#ded8ff` | |
| `--c-purple25` | `#b6a7ff` | (Solutions "By function" column is `#b7a4ff`) |
| `--c-purple75` / `80` | `#4a288a` / `#3f2374` | Text on light dropdown tiles |
| `--darkest` | `#16131e` (`--c-darkest`) | |
| Tab IT / green | `#007f4a` | Use-case tab + panel |
| Tab Security | `#714bd0` | |
| Tab Finance / teal | `#008784` | |
| Tab People / orange | `#c05100` | |
| Tab Operations / blue | `#3565cc` | |
| IT panel text (green10) | `#cae4d4` | Text on the green panel; frame bg |
| IT frame border (green15) | `#aedac2` | |
| Toggle pill text | `#00512f` | |
| Footer ask-AI bg | `rgba(113,75,208,0.05)` | |

The full palette scale is in `:root`. Copy these as Tailwind colors:
`--c-purple1 #f8f6fa, 2 #f5f2fb, 5 #ece8fd, 10 #ded8ff, 15 #d0c8ff, 20 #c3b7ff, 25 #b6a7ff, 30 #aa95ff, 35 #9e84fd, 40 #9274f4, 45 #8665eb, 50 #7a56e0, 55 #714bd0, 60 #6741bf, 65 #5d38ae, 70 #542f9c, 75 #4a288a, 80 #3f2374, 85 #351f5e, 90 #2a1b49, 95 #211735, 97 #1d142d, 99 #191226`;
`--c-green1 #f5f7f4, 2 #f1f5f1, 5 #e4eee7, 10 #cae4d4, 15 #aedac2, 20 #91d1af, 25 #71c79d, 30 #50bc8c, 35 #29b07d`.
Legacy: `--light100 #f8f4f0 … --light500 #dcd7d0`, `--dark500 #32313b … --dark900 #222027`.

There are no section background gradients. Every band sits on `#fcf9f5` except the purple solution panel and the colored use-case tabs and panel. The only gradients are masks:
- Nav blur layer: `mask-image: linear-gradient(#000 0%, #000 30%, transparent 70%)`
- Logo marquee: `mask-image: linear-gradient(to right, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)`

### Fonts (all self-hosted WOFF2, all loaded on the homepage)
| Family | Weight | URL |
|---|---|---|
| Roobert | 400 | https://www.tines.com/fonts/Roobert-Regular.woff2 (`font-display:swap`) |
| Roobert | 500 | https://www.tines.com/fonts/Roobert-Medium.woff2 |
| Roobert | 600 | https://www.tines.com/fonts/Roobert-SemiBold.woff2 |
| Roobert | 700 | https://www.tines.com/fonts/Roobert-Bold.woff2 |
| Reckless | 300 | https://www.tines.com/fonts/Reckless-Light.woff2 |
| Reckless | 400 | https://www.tines.com/fonts/Reckless-Regular.woff2 |
| Reckless | 700 | https://www.tines.com/fonts/Reckless-Bold.woff2 |
| Roobert Mono | 500 | https://www.tines.com/v5-assets/fonts/RoobertMono-Medium.woff2 |
| Roobert Mono | 600 | https://www.tines.com/v5-assets/fonts/RoobertMono-SemiBold.woff2 |
| Roobert Mono | 700 | https://www.tines.com/v5-assets/fonts/RoobertMono-Bold.woff2 |

Stacks:
- `--fontSans: Roobert, -apple-system, BlinkMacSystemFont, Arial, Roboto, Ubuntu, "Helvetica Neue", sans-serif`
- `--fontSerif: Reckless, Georgia, serif`
- Mono: `"Roobert Mono", <sans fallbacks>`

Several text roles compute `font-weight:500` on Reckless, but no Reckless 500 face exists, so the browser renders Reckless-Regular (400). Declare 400 and get the same output.
Other declared faces (italics, Mono 300/400/800, Reckless Neue VF, Pangea 4px) are not used on this page.

### Type roles (1440 → 1280 → 768 → 390)
| Role | Family / weight | Size / line-height | Letter-spacing | Notes |
|---|---|---|---|---|
| Hero H1 (two `display:block` lines) | Roobert 400 | 64/67.2 → 56/58.8 → 56/58.8 → 38/42.56 | -0.03em (-1.92px @64) | color `#714bd0` |
| Hero byline | Reckless 500 (=400) | 24/31.2 → 24/31.2 → 24/31.2 → 18/23.4 | normal | |
| Section H2 (use cases, USP, solution) | Roobert 400 | 56/58.8 (1440 & 1280) → 42/44.1 (768; solution 38/39.9) → 36/39.6 (390) | -0.03em | |
| Monitor banner H2 | Reckless 400 line 1 + `<strong>` 700 lines 2-3 | 52/57.2 → 52/57.2 → 32/35.2 → 38/41.8 | -1.56px / -0.64px / -0.76px | max-width 416 (256 @768) |
| Kicker (eyebrow) | Roobert Mono 700 uppercase | 13/13 | 0.65px | |
| Section byline | Reckless 400 | 24/30 (18/22.5 @390) | -0.24px | max-width 768 |
| Monitor body | Reckless 500 (=400) | 22/30.8 (20/28 @≤768) | normal | |
| Solution item H3 | Reckless 700 | 24/26.4 (18/25.2 @≤768) | -0.24px | |
| Solution item body | Roobert 500 | 16/24 (16/22.4 @390) | normal | |
| Solution footer text | Reckless 400 (`strong` 700) | 18/25.2 | normal | |
| Use-case tab title | Reckless 400 | 24/27.6 (13.26/15.25 @390) | -0.24px | |
| Use-case tab body | Roobert 500 | 16/20 (14/17.5 @768; hidden @390) | normal | |
| USP card title | Reckless 400, lead `<strong>` 700 | 24/28.8 (18/21.6 @390) | -0.24px | |
| CTA tagline | Roobert 500 | 24/30 | -0.24px | max-width 528, centered |
| Button label | Roobert Mono 700 uppercase | 13/13 | 0.26px | |
| Nav item / nav text CTA | Roobert 600 | 14/16.1 | normal | |
| Nav "Book a demo" | Roobert Mono 700 uppercase | 13/14.95 | normal | |
| Hero tag "NEW" | Roobert Mono 700 uppercase | 11.9/11.9 | 0.238px | |
| Hero tag text | Roobert 600 | 14/14 | | |
| Footer column title | Roobert Mono 600 uppercase | 11/12.65 | 0.22px | |
| Footer group title link | Roobert 700 | 14/16.8 | | |
| Footer link | Roobert 500 | 14/16.8, row height 24 (30px pitch) | | `↗` mark: Roobert 500 11/13.2 |
| Footer bottom (© / Cookie settings) | Roobert 600 | 14/16.1 | | |
| Toggle (Workflow/Frontend) | Roobert Mono 700 uppercase | 12/13.8 | 0.72px | |
| Timeline caption | Roobert 600 | 12.5/14.375 | -0.125px | color `#542f9c` |
| Timeline time | Roobert 600 | 12/13.8 | | color `#6741bf` |

### Layout system
- Every section is `max-width:1520px; margin:0 auto`. Side padding is **40px at ≥920**, **30px at 768**, **18px at 390**.
- Breakpoints used in the CSS: 420, 511/512, 639/640, 767/768, 919/920, 1023/1024, 1194, 1279/1280, 1366, 1439/1440. The important layout switches:
  - **≥1440**: H1 is 64px.
  - **<1024**: the desktop nav collapses to a hamburger.
  - **<920**: the solution panel goes to 1 column and becomes full-bleed; the scroll-sink on "100×" is disabled.
  - **<640**: use-case tabs become a compact 5-col strip; the inactive frame is hidden.
  - **<768**: the footer becomes an accordion.
- Spacing is fluid between 1280 and 1440. Interpolate linearly using these pairs:
  - section top margin 156 / 140 (768: 120, 390: 96)
  - monitor banner margin 96 / 90 (768: 66 0 48; 390: 40)
  - solution panel padding 55 / 45
  - USP / use-case intro bottom margin 55 / 45
  - CTA padding `30 40 96` / `27.5 40 90`
- Buttons (`.buttonInner`): height 35.75px, padding `0 18.2px`, radius 9990px, 1px border. Variants:
  - **filled**: bg `#714bd0`, text `#fcf9f5`
  - **frosted**: bg `rgba(252,249,245,.65)`, `backdrop-filter: blur(12px)`, border `#714bd0`, text `#714bd0`
  - **outlined**: transparent, border `#714bd0`
  - **filledWhite**: bg `#fcf9f5`, text `#714bd0`
  - Button pairs sit in a grid `140px 140px`, gap 8px.
- Radii: nav pill 990px; dropdown column 20px; dropdown tile 12px; solution panel 48px (24px @390); USP card 14px; use-case tab `14px 14px 0 0`; use-case panel `0 0 48px 48px`; use-case frame 24px; hero product frame 18px (mobile); timeline transport `22px 22px 0 0`.
- No `box-shadow`s on static elements. Backdrop filters: nav blur(10px); frosted buttons, hero tag and USP cards blur(12px); timeline caption blur(24px).

---

## 1. Navbar (`SiteNav`)
- `<header id="site-nav">`: `position:sticky; top:0; z-index:1000`, height **68px**. It does not change on scroll; `html[data-scrolled]` toggles but the visuals stay the same.
- Layers inside the header:
  1. `.blur`: absolute, full width, 68px tall, bg `rgba(252,249,245,.7)`, `backdrop-filter: blur(10px)`, with the vertical mask from §0.
  2. `.backdrop`: a pill at `left/right 22px`, `top 6px`, height 62px, radius 990px, bg `rgba(252,249,245,.9)`, blur(10px). At 390 it sits at x=8, width 374, height 62.
  3. `.bar`: flex, padding `18px 40px 12px` (768: `18px 30px 12px`; 390: `12px`), gap 20, max-width 1520.
- Left group (flex, gap 14):
  - Tines logo (inline SVG `reference/svg/tines-logo.svg`, viewBox 0 0 103 32, rendered **91x28**; 78x24 @390)
  - `nav` items: **Product ▾, Solutions ▾, Customers, Discover ▾, Pricing**. Each item has padding `8px 12px`, radius 50px, gap 6px (text to caret), height 32. Item widths at 1440: 87 / 96 / 94 / 91 / 69. Left edge x=145.
- Right group (pushed right with an auto margin):
  - "Log in" and "Sign up": text pills, padding `8px 14px`, radius 50px
  - "BOOK A DEMO": bg `#542f9c`, color `#fcf9f5`, padding `10px 20px`, radius 990px, `margin-left:12px`, 130x35
  - Search pill: 38x38, bg `#ece8fd`, icon `#6741bf` 16px (`nav-pillButton-1.svg`)
- Links: Customers `/customers/`, Pricing `/pricing/`, Log in `https://login.tines.com`, Sign up `https://login.tines.com/saml_idp/signup`, Book a demo `/book-a-demo/`.
- Hover (`@media(hover:hover)`):
  - nav items and text CTAs: `background: color-mix(in srgb, currentColor 10%, transparent)`
  - filled CTA: bg `#6741bf` (`--acc60`), text `#fcf9f5`
  - search pill: bg `#ded8ff`
  - The header color uses `transition: color .4s`. The backdrop and blur layers use `transition: opacity .2s`.
- **<1024**: the nav list, Log in and Sign up are hidden. The bar shows logo + Book a demo (107w) + search (46) + hamburger (38x38).
  - The mobile menu is a fixed card at x=8, 15px below the bar: bg `rgba(252,249,245,.8)`, radius 20px, padding `8px 12px 12px`, rows gap 4px.
  - Rows are pills 48px tall, bg `rgba(118,78,206,.10)`, radius 990px, padding 16px, Roobert 600 14px: Product ▾, Solutions ▾, Customers, Discover ▾, Pricing.
  - The last row holds two half-width pills, "Log in" and "Sign up".
  - Chevron: an 11px square with a 2px border, rotated 45deg; it rotates with `transition: transform .2s`.
  - Accordion: animates `grid-template-rows` over .25s.
  - Enter animation: `snappyDown` .35s `cubic-bezier(.22,1,.36,1)`, going from translateY(-12px) to 0.

### Dropdowns
Triggered by hover or click on Product, Solutions and Discover. The panel is full width and absolute, with top = 16px below the bar (y=84 when the header is at 0). `.panelInner` has padding `4px 40px 0` and is a flex row with gap 3px. Each column animates in with `snappyIn` 0.4s `cubic-bezier(.22,1,.36,1)` (translateY(12px)→0, opacity 0→1); the second column has a 0.05s delay.

**Product** (panel 310 tall):
- Column 1 "hero", 600x306: bg `#7a56e0`, radius 20, padding 8, gap 6. Contains:
  - Big tile 384x288 (bg `#6741bf`, radius 12, padding 12) linking to `/3b/`. Label "Tines 3B" (Roobert 500 22/22 `#fcf9f5`); description "One environment to deliver AI agents, apps, and automation." (Roobert 500 13/14.95). Art: `3b-flower-pc.svg` 160x133 centered, on top of a small flower canvas strip along the bottom (94px tall).
  - A stack of 2 tiles, 192x141 each:
    - "Examples gallery" (Roobert 700 16/16) + "Real-world examples of Tines 3B at work." + arrow → (18px), linking to `/3b/examples/`
    - "Docs" + ↗, linking to `https://docs.3b.tines.com/`
- Column 2 "solo": one tile 275x275, bg `#ece8fd`, radius 20, padding 18, text `#4a288a`. "Tines Stories" / "The intelligent workflow platform." / →. Icon `nav-storiesIcon-3.svg` 94x88 bottom-left. Links to `/stories/`.

**Solutions** (279 tall):
- Column 1, 480 wide, bg `#b7a4ff`, radius 20, padding 8. Title "BY FUNCTION" (Mono 600 11/15.4, ls .22, `#3f2374`, padding-left 8). Then 2 square tiles, 228x228, gap 6:
  - **IT**, bg `#008b53`: "Strengthen IT as the foundation for business-wide execution." Links to `/solutions/it/`.
  - **Security**, bg `#7a56e0`: "Build, run, and monitor mission-critical cybersecurity workflows." Links to `/solutions/security/`.
  - Each tile has a 64x92 / 86x76 illustration at bottom-left (inline SVG, not exported) and an arrow →.
- Column 2, 300 wide, bg `#ffe1c4`, title "BY INDUSTRY" (`#622c12`). Leaf rows: padding 8, radius 12, gap 8, a 34x34 icon chip (bg `#ffcea6`, radius 9, 18px icon), label Roobert 600 14/16.1, description Roobert 500 13/15.6. Rows:
  - "Public sector — Modernize your security approach." (`/public-sector/`)
  - "Financial services — Streamline compliance and reduce operational risk." (`/financial-services/`)
  - "MSSPs — Transform MSSP operations." (`/mssps/`)
  - Leaf hover: bg `var(--boxHover)`; icon chip goes to `#d0c8ff`.

**Discover** (391 tall):
- Column 1, 380 wide, bg `#ece8fd`: a blog card 362x301 (bg `#fcf9f5`, radius 14) with an image 360x189 and a body with padding 14:
  - title "“Better than the tools we were quoted six figures for”: How Tines’ finance team built a custom billing app for <$1,000" (Roobert 600 18/19.8 `#3f2374`)
  - CTA "READ ARTICLE →" (Mono 700 11/12.65 ls .22)
  - Below it, a leaf "Tines Blog" (`/blog/`) with chip `#ded8ff`
- Column 2, 380 wide, bg `#e4eee7`: an event card "Builder Connect New York" / "VIEW EVENT →" (text `#00452a`), then leaves "Upcoming events" (`/events/`) and "Webinars" (`/webinars/`) with chip `#cae4d4`.
- Column 3 solo tile 250x250: bg `#e26817`, "Community" / "Connect, learn, and share with peers." / ↗, art `community-crystal-ball.svg` 72x72. Links to `https://community.tines.com/`.
- Blog card hover: border-color is currentColor at 40%.

---

## 2. Hero (`ThreeBHero`) — y 68 → 1540 @1440 (1472 tall)
`section` has padding-top 16.5px (19.5 @768).

**Copy block** (`.heroTop`, padding 0 40). It is left-aligned at ≥768 and **center-aligned at 390**.
1. Tag pill, linking to `/blog/introducing-tines-3b/`, 219x30:
   - Pill: radius 28, 1px border `#714bd0`, bg `rgba(252,249,245,.55)`, blur(12px), gap 7.
   - Left segment "NEW": padding `2.38px 11.9px`, with a 1px divider.
   - Then "Introducing Tines 3B" and a 9x8 arrow SVG (`hero-content-4.svg`).
2. 24px below: the H1, split into two block lines: "You told everyone to use AI." / "Now give them a secure place to do it." Use a `&nbsp;` before the last word of each line. H1 width 1018 @1440; max-width 896 @1280.
3. byline, margin-top 19.2: "Tines lets every team build. IT and Security maintain complete visibility, governance, and control." (max-width 1152; 342 @390)
4. Actions, margin-top 24, grid `140px 140px` gap 8:
   - [BOOK A DEMO] filled → `/book-a-demo/`
   - [SIGN UP FREE] frosted → signup URL

**Logo marquee** (`.aboveWordmark`, margin `40px 0 8px`, i.e. 32.5 @1280, 30 @768, 24 @390; padding 0 40):
- The marquee box is `margin: 0 -20px; padding: 4px 0`, about 37px tall, with the edge-fade mask.
- Track: flex, gap **45px**, items 13–30px tall.
- Order: Coinbase, Databricks, Reddit, Snowflake, Intercom, Dropbox, Pinterest, MongoDB, Sophos, Canva, McKesson. The set is rendered twice so the loop is seamless.
- All logos are monochrome `#714bd0` inline SVGs in `reference/svg/logo-*.svg`, rendered at 94x21, 126x30, 77x26, 126x29, 124x27, 113x23, 118x29, 107x27, 86x15, 54x29, 99x13.
- Motion: `@keyframes marqueeDrift { to { transform: translate3d(calc(-1 * var(--marqueePeriod)),0,0) } }`, linear infinite. `--marqueePeriod: 1665px` (one set + gaps); `--marqueeDuration: 41.625s`, i.e. **40px/s**. It is also drag-scrollable (`cursor:grabbing` on active). Paused under reduced motion.

**"100×" wordmark stage** (`.stage`): 1440x432 at y≈516.
- The big "100×" filled with flowers is a **2D canvas** (1915x991 css px, overflowing). Labels "100× SIMPLER", "100× FASTER" and "100× EASIER TO ADOPT" are drawn as ribbons carried by little drones.
- Static fallback: `reference/canvas/hero-field-0.png`. Accessible name: img "100× — simpler, faster, easier to adopt".
- Wrapper `.hundredX`: 1454x760 at x=-7, z-index 0. Margin is -83px 0 -154px @1280; -50px 0 0 @768; 18px 0 0 @390, where it is 394x206.
- Scroll-driven sink: `animation: hundredXSink linear both; animation-timeline: scroll(root); animation-range: 0px 80vh;` with keyframes `translateY(0) → translateY(4.5rem)`. Disabled at ≤919px and under reduced motion.
- Inner flower beds (`.bed`): `heroBedDrift` translateY(0 → var(--bedDrift,10rem)) over `scroll(root)`, range 0–100vh.
- Drones: `droneDrift` uses var(--floatSeconds) linear infinite, and `droneFlap` is a sprite `steps()` animation.

**Product visual** (`.visualWell`, margin-top -40px, so it overlaps the stage; padding 0 40):
- Frame 1360x680 @1440 (1200x600 @1280, 708x531 @768, 354-390x520 @390, radius 18 on mobile).
- Content is a large scripted inline SVG (viewBox 0 0 1360 680) that plays an animated product demo: a sidebar (Recents, Favorites, Chat, Personal workflows, Monitoring, Links, Connectors, Skills, Spaces: IT/Security/Finance/People/Operations/Design/Engineering/General), a prompt box "What do you want to do?", and workflow rows like "Axonius asset explorer · Live · Last updated 5h ago", plus a sleeping mascot with "z z z".
- The text inside is SVG `<text>`. One captured frame is in `reference/svg/hero-product-visual-frame.svg`. **Recommended clone: render that static SVG frame**, because the 1:31 scripted timeline cannot be extracted as data.
- Mobile shows a different phone-sized "Team insights" composition (see the mobile screenshot).
- Appear animation: `threeBVisualAppear` 0.6s `cubic-bezier(.22,1,.36,1)` both: opacity 0 → 1 at 0.1%, translateY(16px) → 0.
- Mascot loops: `breathe` 3.8s ease-in-out infinite (±0.8px Y); `floatZ` 3s ease-out infinite with delays 0/0.5/1s (opacity 0→1→0, translate(2px,-9px)); `blink` 4s (scaleY 1 → .05 at 95%); ring `spin` 5s/7s linear.
- Radar dial: `radarSweep` 4s linear infinite.

**Timeline scrubber** (docked above the frame top edge, z-index 1, width = frame − 64px, so x=72 w=1296 @1440, height 44):
- Transport: flex, padding 8, gap `8px 12px`, radius `22px 22px 0 0` (`0 0 22px 22px` when docked at bottom on mobile).
- Elements:
  - play/pause button 28x28 round (hover bg `color-mix(#2a1b46-ish 8%)`), icon 14px
  - track of **9 segments** whose relative widths (%) are 6.70, 4.66, 2.87, 13.20, 18.74, 16.61, 18.56, 8.01, 10.66
  - each segment has 1px gaps, is 4px tall, radius 3, bg `rgba(113,75,208,.22)`, fill `#714bd0`
  - 9px knob dot `#714bd0`
  - floating caption chip above the knob: bg `rgba(223,216,255,.62)`, blur(24px), radius `0 0 8px 8px`, padding `2px 9px 4.5px`, with 8px "fillet" SVG corners. Observed captions: "Monitoring", "Configure connectors", "Managing access".
  - time label "0:01 / 1:31" (1:33 on mobile)
- Plays automatically and loops. Intro: `timelineBarIntro` translateY(16px)→0 and `timelineBarFadeIn`, 0.6s `cubic-bezier(.22,1,.36,1)`, delay .2s.

---

## 3. Monitor banner ("The new reality") — `HomeMonitorBanner`
- Wrapper: margin `96px 0` (90 @1280), height 1016 @1440 (1004 @1280, 759 @768, 1178 @390).
- Background art is a **canvas** (1440x1524, absolutely positioned top 0, overflowing below the band): two clusters of retro CRT monitors on vines, left and right, on a transparent background. Their screens animate with psychedelic concentric wavy line patterns. Fallback: `reference/canvas/monitor-canvas-1.png`. At 390 the canvas sits above the copy, and the overlay starts at y+403.
- Overlay: flex column centered, padding `96px 156px` (90/156 @1280, 48/70 @768, `24px 18px 40px` @390). Content column is 440px wide, centered, with text centered (left-aligned at 390).
  1. Kicker "THE NEW REALITY FOR IT AND SECURITY", margin-bottom 62.4px
  2. H2 (max 416): "AI made everyone a builder." (Reckless 400), then `<strong>` "But security and IT got 100× harder." (700), both 52/57.2
  3. Icon `ai-tangle.svg` 114x114, margin `52px 0 36px`
  4. Two paragraphs, gap 14:
     - "Now, finance is building dashboards in Claude Code. Marketing shipped an app on a personal Vercel account. Someone committed an API key to GitHub last week."
     - "None of it is malicious. They’re doing exactly what you asked. But without visibility and control, innovation creates new risk. It’s time to give every team a secure place to build."
- Canvas image accessible name: "An interconnected wall of retro monitors with animated screens".

---

## 4. Solution panel ("Our 100× solution") — `HomeSolutionSection`
- Section padding 0 40.
- Panel: bg `#714bd0`, text `#fcf9f5`, radius 48, padding 55 (45 @1280), height 819 (826 @1280).
  - `display:grid; grid-template-columns: 1fr 1fr` (555.3px each @1440, 492 @1280), gap `40px 139.33px` (`32.5px 126px` @1280).
- Left column (intro):
  - Kicker "OUR 100× SOLUTION"
  - H2, 31px below the kicker: three block lines "Freedom to build." / "Complete security." / "No compromises." (Roobert 400 56/58.8)
- Right column (`.content`): flex column, gap 64.
  - `.grid`: 2x2, column gap 40, row gap 55 (`45px 32.5px` @1280), cells 258w @1440. Each cell is an H3 (Reckless 700 24/26.4) with the body paragraph 12px below:
    1. **Visibility across AI-created work** — "Know what exists, who built it, and what it touches. Focus on empowering teams without leaving a mess to untangle."
    2. **Control without bottlenecks** — "Determine where and how access happens so teams can self-serve and freely build. Make the governed path the easy one."
    3. **Autonomous fixes, controlled by you** — "Tines identifies and suggests fixes for anomalies and potential breaks. Your workflows get better the longer they run. You control what goes live."
    4. **AI on your terms, always** — "Start where you’re already working. Choose where, when, and how your LLMs are used, with freedom to switch as your AI strategy evolves."
  - `.footer`, aligned to the 2nd sub-column (x=1087, w=258), flex column, gap 30:
    - a 48px orb SVG (`solution-orb-112.svg`, a small dark face)
    - "**Tines 3B** powers faster delivery, safer operations, and AI execution that scales with confidence."
    - [EXPLORE THE PRODUCT] button, filledWhite, 199 wide
- Flower bed: a canvas (1005x393) in `.flowerField`, which spans the bottom-left and bleeds to the panel edges via `margin: 0 425px -95px -95px` (920x308 @1440). Fallback: `reference/canvas/solution-field-2.png`.
  - Parallax: `animation: solutionBedParallax linear both; animation-timeline: --solutionPanelView` (a view-timeline on the panel, default cover range), with keyframes translateY(33%) → translateY(12%).
- **<920**: the panel is full-bleed (no side padding or margins), padding `45px 30px 35px` (`45px 18px 35px` @390), radius 24 @390, one column, gap 35.
  - A second flower strip `.flowerFieldTop` (500 max-width, margin `-75px auto 18px`) appears above the kicker, sticking up out of the panel. The bottom flower strip becomes 500 max-width and centered.
  - The H2 is 38px (768) / 36px (390).
  - The grid stays 2 columns (339px @768, 165px @390) with gap 30 / 24 and padding `35px 0`.

---

## 5. Use cases ("Teams using Tines") — `HomeUseCasesSection`
- Section margin-top 156 (140 @1280, 120 @768, 96 @390), padding 0 40.
- Intro (max-width 832, margin-bottom 55):
  - kicker "TEAMS USING TINES" (margin-bottom 24)
  - H2 "Keep important workflows moving for the teams dependent on them."
  - byline (margin-top 24, max 768): "Tines gives these teams the tools to safely leverage AI across the most sensitive systems, data, and processes at the highest level of security."
- Tabs (`role=tablist`): a flex row of 5 buttons, each `flex-grow:1`, overlapping slightly (z-index 1..5), height 172 (167 @1280, 190 @768), padding `30px 30px 22px` (27.5/19.5 @1280, `18px 18px 10px` @768), radius `14px 14px 0 0`. Text is `#fcf9f5`; the selected tab gets `color: var(--pageBg)`.
  - Tab content: H3 title (Reckless 24/27.6) and body (Roobert 500 16/20, max-width ~201) 13px below. Each tab also has an 18px icon (`useCases-tabIcon-*.svg`), which is hidden at desktop.

  | Tab | bg | Body |
  |---|---|---|
  | IT | `#007f4a` | MCP and AI client management with an AI gateway to govern deployments. |
  | Security | `#714bd0` | AI SOC: alert intake, triage, and remediation, routing to an analyst when needed. |
  | Finance | `#008784` | Finance requests dashboard with insights from email and tooling. |
  | People | `#c05100` | End-to-end job request manager, from finance approvals through to offer. |
  | Operations | `#3565cc` | Lead dashboard: tracking, managing, and closing open lifecycle loops. |

  - Transition: `flex-grow .3s cubic-bezier(.22,1,.36,1), background-color .18s, color .18s` (at ≥640).
  - **No autoplay**: the selection only changes on click (verified over 9s).
- Panel (`#use-case-panel-<id>`): 1360x768 (1200x680 @1280, 708x432 @768), radius `0 0 48px 48px`.
  - `.colorLayer` has the active tab's color. When the tab changes, a `.wipeLayer` plays `panelWipe` 1s `cubic-bezier(.22,1,.36,1)`, a clip-path from `inset(0 0 100%)` to `inset(0)`.
  - `.panelContent`: padding 40, gap 8.
  - Toolbar: a segmented toggle 218x40, bg `rgba(206,230,214,.12)`, radius 999, padding 3. Buttons are "WORKFLOW" and "FRONTEND" (106x34, padding `10px 20px`, text `#cae4d4`). The active indicator is a `#fcf9f5` pill with text `#00512f`, moved via `clip-path: inset(0 0% 0 50% round 999px)` with `transition: clip-path .28s cubic-bezier(.22,1,.36,1)`.
  - Stage: 1280x640 @1440. It holds two overlapping screenshot frames:
    - workflow frame: 919x583 at bottom-left
    - frontend frame: ~935x579 at top-right
    - Each frame has bg `#cae4d4`, 1px border `#aedac2`, radius 24, padding 5, and an inner image.
    - The non-active frame has `opacity:.5; transform:scale(.97)`; the active one has z-index 2. Transition: `transform .25s cubic-bezier(.22,1,.36,1), opacity .25s`.
    - On tab change, the stage replays `frameFloatIn` .4s, delay 50ms (opacity 0 → rest, translate 0 12px → 0).
    - Default: IT tab with the Frontend frame active.
  - Images: `team-tabs/<id>-workflow.jpg` and `<id>-frontend.jpg` (see the manifest).
  - The tabbed block reveals with `useCasesReveal` .5s (translateY 16px → 0) when `.visible` is set (IntersectionObserver).
- **<640 (390)**: the tabs become a 5-col grid of 78px cells, height 79, padding `16px 4px`, radius 0, titles 13.26px, bodies hidden. The panel is full-bleed. Below it, the active tab's body is shown as a caption ("MCP and AI client management…"). The inactive frame is `display:none`.

---

## 6. Why Tines (USP) — `HomeUSPSection`
- Section margin-top 156 / 140, padding 0 40.
- Intro: grid `1fr 1fr` (652.5 each), gap `40px 55px`, margin-bottom 55.
  - Left: flex column gap 24 with kicker "WHY TINES?", H2 "Powerful workflows, proven success." (max-width 616) and byline "Tines is uniquely positioned — and proven — to be the single, secure environment for every team’s AI-native agents, apps, and automations."
  - Right: illustration 300x272, aligned right. It is a satellite-dish radar (`usp-radar-119.svg`, 300x317) plus a spinning constellation (`usp-constellation-118.svg`, 132x132; layers `constellationSpin` 60s and 75s linear infinite; ~25 stars `twinkle` 2.4–3.6s ease-in-out infinite with staggered delays 0–3s; keyframe opacity .35/.5, scale .82/.88).
- Grid: 4 columns, 322px each (293.5 @1280), gap 24.
  - Cards are `figure`s, 429 tall (391 @1280): bg `#714bd0`, 1px border `rgba(252,249,245,.14)`, radius 14, padding 24, blur(12px), flex column with space-between, gap 40.
  - Title at top: an H3 with a `<strong>` lead and regular continuation. Icon well at the bottom (105px tall, icon left-aligned).
  1. **Born in security, built for the enterprise.** Governance, guardrails, and monitoring across every surface. — `cosmic-tulip.svg` 96x105
  2. **Built for your most important workflows.** Trusted by the world’s most ambitious organizations. — `kaleidoscope-monitor.svg` 61x136
  3. **Vendor-agnostic.** Work across your entire tech stack and within your infrastructure. — `pruning-thorns.svg` 105x136
  4. **Unmatched time to value.** Teams love Tines for speed, power, and ease of use. — `blossoming-transformation.svg` 112x126
- @768: the intro grid is `373px 300px`, the H2 is 42px, and cards are in 2 columns (342w, 331 tall), gap 30.
- @390: the intro stacks with the illustration first (200x181, centered). The grid is full-bleed (`margin: 0 -18px`), one column, radius 24 (the cards form one rounded stack). Each card is a row (icon left, title right), padding `32px 16px`, gap 16, 150 tall, with title 18/21.6.

---

## 7. CTA ("Start today") — `WildCodeCTASection`
- Section margin-top 156 / 140, padding `30px 40px 96px` (`18px 30px 48px` @768, `18px 18px 40px` @390). Flex column, centered.
- Wordmark: a 1360x299 region (`.region.wordmark`, margin-top -46px) holding a **canvas** (1541x479, overflowing) that draws "Start today" in a giant rounded sans. The letters are filled with a purple stained-glass/vine pattern from `/v5-assets/wildcode/vines.svg`, with two small robot characters shining pink spotlights.
  - Fallback: `reference/canvas/cta-canvas-3.png`. Accessible name: img "Start today".
  - **Interactive cursor**: over this region the native cursor is hidden (`cursor:none`) and replaced by a fixed 38x40 "tri-spinner" cursor. It is made of three triangle SVGs, rotates continuously (`interactiveCursorSpin` 6s linear infinite), and on press the triangles converge (`transition: transform .3s cubic-bezier(.34,1.56,.64,1)`; top translateY(5px), bottomLeft translate(4.33px,-2.5px), bottomRight translate(-4.33px,-2.5px)). The cursor's opacity fades over .12s.
  - The canvas reacts to the pointer; the exact behavior is drawn in canvas and could not be read programmatically.
  - Height is 155 @768 and 279 @390, where the text wraps to two lines, "Start / today".
- Text block: 528 max, gap 32, centered.
  - Tagline "Sign up today to get started or schedule time with our team to learn more."
  - Buttons: [SIGN UP FREE] filled + [BOOK A DEMO] outlined. Note the order is reversed relative to the hero.

---

## 8. Footer — `SiteFooter26`
- Background is the page bg; there are no borders.
- `.sections`: flex row, padding `50px 40px 30px`, gap `32px 40px`. There are 5 columns with flexible widths:
  - x=40 (168w), x=372 (190w), x=727 (108w), x=999 (91w), x=1255 (145w)
  - Columns 4 and 5 sit inside a `display:contents` stacked wrapper.
  - Column title: Mono 600 11px uppercase, with 33px to the first link. Link rows are 24px tall, ~30px pitch, with ~23px extra gap between groups. External links get a trailing `↗`.
  - **PRODUCT**:
    - **Tines 3B**: Examples gallery, Product updates, Academy↗, Docs↗, Status↗
    - **Tines Stories**: Storyboard, Cases, Workbench, Agents, Monitoring, Workflow capability matrix, Templates, Library, Five-minute flows, What’s new, Docs and API
    - then a gap, then Pricing
  - **SOLUTIONS**:
    - **IT**: IT as a business enabler, Infrastructure management, Networking, Application management, IT service delivery and support
    - **Security**: AI SOC, SOAR, GRC, Threat intelligence, Vulnerability management, Network security
    - then a gap, then bold links **Public sector**, **Financial services**, **MSSPs**
    - then a gap, then Professional services, AI in Tines, Enterprise
  - **DISCOVER**:
    - **Customers**
    - **Blog**: Series, Guides, Podcast
    - **Events**: Webinars, Bootcamps, Builder Connect, Workflow.live↗
    - then Community↗, YDWWT
    - then Customer center
  - **COMPANY**: About us, Careers, Newsroom, Partners, Contact, Store↗, Brand assets↗, then LinkedIn↗, X↗, YouTube↗
  - **TRUST AND SECURITY**:
    - Security best practices, Trust center↗
    - **Legal**: Privacy, Terms, DPA, Cookies policy
  - Hover: link color becomes `var(--pageAccent)`. On the homepage that variable resolves through `--matrixGreenBright` to `#71c79d`. Verify visually before relying on it; it was read from the CSS variables and not observed in a hover.
- Bottom bar: grid `1fr 324.7px 1fr`, gap 16, padding `20px 40px 40px`, height 100.
  - Left: "© Tines".
  - Center: an "Ask AI" pill 325x40, bg `rgba(113,75,208,.05)`, radius 999, padding `4px 4px 4px 16px`, gap 8. It holds the label "ASK AI ABOUT TINES" (Mono 700 11/15.4, ls .22) and 5 round 32px icon links, 18px icons (`footer-askAiLink-125..129.svg`): ChatGPT, Claude, Gemini, Perplexity, Grok. Each opens the assistant with a prefilled prompt about Tines.
  - Right: "Cookie settings" button.
- @768: the sections become a 4-col grid (147px each), padding `50px 30px 30px`.
- @390: the footer is an accordion. Sections are a flex column with padding `30px 18px`. Each column title is a 51px-tall toggle (padding `17.5px 0`, gap 10, with a 10x7 chevron `footer-chevron-120.svg` that rotates via `transition: transform .15s`). Content expands with a `grid-template-rows` transition of .2s. The bottom bar is grid `147px 28px 147px`, padding `0 18px 40px`, row-gap 32, and shows a centered 28px Tines icon (`footer-tines-logo-icon_-130.svg`).

---

## 9. Motion summary (for Build)
| Element | Trigger | Animation |
|---|---|---|
| Logo marquee | continuous | translateX by -1665px over 41.625s, linear infinite |
| "100×" wordmark | scroll (root, 0→80vh) | translateY 0→4.5rem (≥920 only) |
| Hero flower beds | scroll (root, 0→100vh) | translateY 0→10rem |
| Product visual | on mount | opacity/translateY(16px→0) .6s cubic-bezier(.22,1,.36,1) |
| Timeline bar | on mount | translateY(16px→0) .6s, delay .2s; segments fill as the demo plays |
| Mascot / radar | continuous | breathe 3.8s, floatZ 3s staggered .5s, blink 4s, spin 5s/7s, radar 4s |
| Monitor wall / flower fields / CTA wordmark | canvas, started by IntersectionObserver (rootMargin 50%) | procedural 2D canvas animation |
| Solution flower bed | view timeline on the panel | translateY 33% → 12% |
| Use-case block | IntersectionObserver `.visible` | translateY 16px→0 .5s cubic-bezier(.22,1,.36,1) |
| Use-case tab switch | click | color-layer clip-path wipe 1s; frames float in .4s (+50ms); tab flex-grow .3s |
| Workflow/Frontend toggle | click | clip-path pill slide .28s |
| USP constellation | continuous | spin 60s/75s, twinkle 2.4–3.6s |
| Nav dropdown | hover/click | snappyIn .4s cubic-bezier(.22,1,.36,1), translateY 12px→0, columns staggered .05s |
| Mobile menu | click | snappyDown .35s |
| Buttons | hover | filled: `filter: brightness(1.1)`; outlined/frosted: bg `--unfilledHoverBg`; active: `brightness(.9)`; `transition: filter .1s, background-color .1s` |
| Nav items | hover | bg currentColor 10% |
| CTA region | pointer | custom spinning tri-cursor; press springs (.3s cubic-bezier(.34,1.56,.64,1)) |

Every motion is disabled under `prefers-reduced-motion: reduce`. Mirror this with Tailwind `motion-safe:` / `motion-reduce:`.

## 10. Not programmatically extractable
- The four canvas artworks (hero "100×" flower field, monitor wall, solution flower bed, "Start today" wordmark) are procedurally drawn from JS-embedded sprites. The ~47 `blob:` image URLs are generated at runtime, so there are no source files to download. Use the PNG snapshots in `reference/canvas/` (captured at DPR 1) as static fallbacks, or rebuild them as custom canvas work.
- The hero product demo is a 1:31 JS-scripted SVG animation. Only a single frame was captured (`reference/svg/hero-product-visual-frame.svg`), and only 3 of the 9 chapter captions were observed.
- The CTA canvas's pointer interaction is visible but its algorithm is internal.
- The Solutions dropdown tile illustrations and nav leaf icons are inline SVGs that were not exported (they are only in the DOM while the menu is open).
