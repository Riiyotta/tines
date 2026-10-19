# https://www.tines.com/ (homepage only), as rebuilt in this React + Vite clone

Source: https://www.tines.com/ (homepage only), as rebuilt in this React + Vite clone
Status: **measured-from-clone**
1 routes · 1 templates · 11 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 1 template (Homepage) accounts for 1 of 1 routes (100%). The remaining 0 routes span 0 templates.

| template | routes | share |
|---|---:|---:|
| Homepage | 1 | 100% |

## Page chrome

**1 routes carry chrome = `full`** — Homepage.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `chrome.site-nav` | CHROME | 1 | 1 | `Navbar.jsx` | Present on the homepage, the only route in this clone. |
| `hero.intro` | HERO | 1 | 1 | `Hero.jsx` | Homepage only; the first block inside main. |
| `proof.logo-marquee` | PROOF | 1 | 1 | `Hero.jsx > LogoSet` | Homepage only, directly under the hero copy. |
| `hero.wordmark-stage` | HERO | 1 | 1 | `Hero.jsx` | Homepage only, behind and below the logo marquee. |
| `hero.product-demo` | HERO | 1 | 1 | `Hero.jsx > TimelineBar` | Homepage only; closes the hero region. |
| `narrative.monitor-banner` | NARRATIVE | 1 | 1 | `MonitorBanner.jsx` | Homepage only, after the hero. |
| `narrative.solution-panel` | NARRATIVE | 1 | 1 | `SolutionPanel.jsx` | Homepage only, after the monitor banner. |
| `showcase.use-case-tabs` | SHOWCASE | 1 | 1 | `UseCases.jsx` | Homepage only, after the solution panel. |
| `proof.why-tines` | PROOF | 1 | 1 | `WhyTines.jsx` | Homepage only, after the use-case showcase. |
| `conversion.start-today-cta` | CONVERSION | 1 | 1 | `CtaStartToday.jsx` | Homepage only; the last block inside main. |
| `chrome.site-footer` | CHROME | 1 | 1 | `Footer.jsx` | Present on the homepage, the only route in this clone. |

**0 shared sections** appear in more than one template and belong in a component library.

**11 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | CHROME | `chrome.site-nav` | page-local |
| 2 | HERO | `hero.intro` | page-local |
| 3 | PROOF | `proof.logo-marquee` | page-local |
| 4 | HERO | `hero.wordmark-stage` | page-local |
| 5 | HERO | `hero.product-demo` | page-local |
| 6 | NARRATIVE | `narrative.monitor-banner` | page-local |
| 7 | NARRATIVE | `narrative.solution-panel` | page-local |
| 8 | SHOWCASE | `showcase.use-case-tabs` | page-local |
| 9 | PROOF | `proof.why-tines` | page-local |
| 10 | CONVERSION | `conversion.start-today-cta` | page-local |
| 11 | CHROME | `chrome.site-footer` | page-local |

## Section reference

### CHROME

_Site-wide navigation and footer frame wrapped around page content._

**`chrome.site-nav`** — Sticky 68px frosted-pill navbar: Tines logo, Product / Solutions / Discover mega-dropdowns (staggered column entrance), Customers and Pricing links, search, Log in, Book a demo and Sign up. Collapses to a hamburger menu with accordion panels below 1024px. Blur/backdrop layer fades in only when scrolled or a menu is open.

· Present on the homepage, the only route in this clone. · appears on 1 routes · implemented by `Navbar.jsx`

**`chrome.site-footer`** — Site footer: five link columns (Product, Solutions, Discover, Company, Trust and security) with thin dividers, an 'Ask AI about Tines' pill with assistant links, copyright and Cookie settings. Becomes a multi-open accordion below 768px.

· Present on the homepage, the only route in this clone. · appears on 1 routes · implemented by `Footer.jsx`

### HERO

_Top-of-page introduction: headline, primary CTAs and the hero visuals beneath them._

**`hero.intro`** — Hero copy block: 'NEW / Introducing Tines 3B' tag pill linking to the launch, the page H1, a serif byline, and the Book a demo (filled) + Sign up free (frosted) button pair.

· Homepage only; the first block inside main. · appears on 1 routes · implemented by `Hero.jsx`

**`hero.wordmark-stage`** — Large '100x' flower wordmark stage that sinks with page scroll on wide screens. On the original it is a runtime canvas with drifting drone banners; the clone uses static PNG stand-ins per breakpoint.

· Homepage only, behind and below the logo marquee. · appears on 1 routes · implemented by `Hero.jsx`

**`hero.product-demo`** — Framed product-demo visual (phone / tablet / desktop SVG frames by breakpoint) with a chaptered timeline bar: play/pause, segmented scrubber, caption and elapsed/total time. The original's scripted demo animation is a static frame in the clone; the timeline itself plays.

· Homepage only; closes the hero region. · appears on 1 routes · implemented by `Hero.jsx > TimelineBar`

### PROOF

_Credibility blocks: customer logos and reasons-to-believe cards._

**`proof.logo-marquee`** — Horizontally scrolling customer-logo marquee (logo set duplicated, linear at 40px/s, draggable, edge-masked). Contains real third-party trademarks.

· Homepage only, directly under the hero copy. · appears on 1 routes · implemented by `Hero.jsx > LogoSet`

**`proof.why-tines`** — 'Why Tines' reasons-to-believe block: H2 beside a slowly spinning constellation/radar illustration with twinkling stars, followed by four purple cards each with an icon, serif title and short body.

· Homepage only, after the use-case showcase. · appears on 1 routes · implemented by `WhyTines.jsx`

### NARRATIVE

_Problem/solution storytelling bands that explain the product's positioning._

**`narrative.monitor-banner`** — Problem statement band: serif H2 about AI making everyone a builder, set over a retro monitor-wall illustration (runtime canvas on the original, PNG stand-ins in the clone).

· Homepage only, after the hero. · appears on 1 routes · implemented by `MonitorBanner.jsx`

**`narrative.solution-panel`** — Large rounded purple panel answering the problem band: H2, a two-by-two grid of solution items with an orb mascot whose face follows the pointer, a Tines 3B footer with an Explore the product button, and a flower-bed illustration with scroll parallax.

· Homepage only, after the monitor banner. · appears on 1 routes · implemented by `SolutionPanel.jsx`

### SHOWCASE

_Interactive product showcase that lets the visitor switch between team-specific views._

**`showcase.use-case-tabs`** — Team use-case showcase: H2, five colour-coded team tabs (IT, Security, Finance, People, Operations) with hover grow and a colour wipe on change, and a Workflow / Frontend toggle swapping between two screenshot frames. Fades up once on scroll into view.

· Homepage only, after the solution panel. · appears on 1 routes · implemented by `UseCases.jsx`

### CONVERSION

_Closing call-to-action band that asks for sign-up or a demo._

**`conversion.start-today-cta`** — Closing CTA: giant 'Start today' wordmark (runtime canvas on the original, PNG stand-ins in the clone) that hosts a custom spinning-triangle cursor, a tagline, and Sign up free + Book a demo buttons.

· Homepage only; the last block inside main. · appears on 1 routes · implemented by `CtaStartToday.jsx`
