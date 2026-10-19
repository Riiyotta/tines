Source: https://www.tines.com/

# Tines clone: collection layouts (group C). Index and detail templates

Covers `/blog/`, `/stories/` (Tines Stories hub plus its collections `/stories/whats-new/` and `/stories/templates/`), `/library/`, `/university/`, `/events/`, `/webinars/` and `/case-studies/` (index is `/case-studies/all/`; `/customers/` belongs to another agent and is not covered here).
Measured 2026-10-19 with headless Chromium (Playwright 1.63) at 1440×900 and 390×844. Cookiebot and Intercom were removed before measuring. Values are computed styles. Colours were converted from `display-p3` to sRGB hex, and where a value matches a live `:root --c-*` token the token name is given in brackets.

Outputs that go with this spec:
- Assets: `specs/assets-c.json` has 236 entries. 180 files were downloaded to `public/assets/pages/<collection>/…`: 75 images, 49 SVG illustrations/icons, 36 logos, 19 card icons/emoji and 1 MP4 video. The other 56 are inline SVGs saved to `reference/svg/pages/<collection>-<name>.svg`.
- Screenshots: `reference/pages/<collection>-{index,detail,detail-2}-{1440,390}.png`. There are also extra templates: `blog-category`, `blog-series`, `stories-templates`, `stories-whatsnew`, `stories-whatsnew-detail(-2)` and `university-lesson`.

---

## 0. Read first: global findings that affect every collection page

1. **The default text colour on these pages is `#5d38ae` (purple-65), not `#714bd0`.** On every collection page `--pageForegroundColor: var(--acc65)` computes to `color(display-p3 .3454 .2253 .6586)`, which is `#5d38ae`. That is `--c-purple65`, already defined as `purple.65` in Tailwind. Body text, headings and borders (as `currentColor` mixes) use it. The homepage spec gives `#714bd0`. Build should set the foreground per page: wrap collection pages in `text-purple-65`. Do not change the homepage.
   - `/events/` overrides this to `--pageForegroundColor: var(--c-purple70)` (`#542f9c`) using an inline `<style>`.
   - The live `--pageAccent` is `#8d75e6`, which is the `accent` token. It is used for active sub-nav items and breadcrumb-current text. On Events and Webinars it is `#7a56e0` (purple-50).
2. **The pages run on two front-end stacks.** Visually they are almost identical.
   - Next.js with CSS-module class names (`Foo-module-scss-module__hash__bar`): blog, stories, library, events and case-studies. The module names are used throughout this spec because they map one-to-one to the components to build.
   - Legacy Gatsby with hashed atomic classes: `/university/**` and `/webinars/**`. Their nav and footer are an older build that looks the same. **Reuse `Navbar` and `Footer` anyway.**
3. **Chrome that appears on every collection page:**
   - `Navbar`: 68px tall, unchanged.
   - A new **AreaNav** sub-nav bar, 62px, directly below it (§2.1).
   - `Footer`: unchanged.
   - Each page ends with one of two CTAs: **WildCodeCTA**, which is the existing `CtaStartToday` (blog, events, case studies), or the new **ExplosionCTA** (Tines Stories area, university). Library pages have neither CTA.
4. **Layout widths:** all content is inside `max-width:1520px; padding:0 40px` at 1440 (18px at 390), the same as the homepage's `px-page`. Article and narrow pages use `padding:0 156px; max-width:1440px`, which is the existing `px-page-wide` token (156 at ≥1280). Sidebar pages (library, webinars, lesson) use `grid-template-columns: 288px 1000px; gap:72px`.
5. **No scroll-reveal motion.** Before scrolling I captured every element in `main` with `opacity:0` or a pending transform. Only the nav blur and backdrop layers were hidden. The `IntersectionObserver` instance count is 4–6 on Next pages (lazy images and nav). Gatsby pages report 22–92, which comes from lazy images. There are no fade-in or slide-in reveals. All motion is hover and pointer driven (§10).
6. **Body copy.** Article, story, course, event and case-study text is Tines content and is **not** transcribed here. Each detail section gives element types, counts and word counts. Build writes original placeholder copy at those lengths. Titles, dates, categories and labels in the sample-data blocks are real.

---

## 1. REUSE MAP

Legend: **AS-IS** means reuse the existing component unchanged. **+VARIANT** means the existing component plus a prop (the difference is stated). **NEW-SHARED** means create it once in `src/components/shared/`. **NEW-LOCAL** means it is page-specific.

| Section (where) | Implementation | Notes |
|---|---|---|
| Site header (all) | `Navbar` AS-IS | The Gatsby pages' legacy nav is the same 68px pill nav. |
| Sub-nav bar (all) | **NEW-SHARED `AreaNav`** | Props: `pill` (label, href), optional `crumbs[]`, `links[]` (flat, or dropdown triggers with caret), `activeHref`, `cta` (mono pill, e.g. "TRY TINES STORIES"), `showThemeToggle`. §2.1 |
| Site footer (all) | `Footer` AS-IS | |
| "Start today" CTA (blog, events, case studies) | `CtaStartToday` AS-IS | Same module (`WildCodeCTASection`): tagline 24/30, button grid `140px 140px` gap 8, padding `30px 40px 96px`. The live tagline/text colour on these pages is purple-65 (inherits). It needs no prop if it uses `currentColor`; it currently hard-codes nothing, so it inherits. |
| "Built by you, powered by Tines" CTA (stories, templates, what's new, university) | **NEW-SHARED `ExplosionCta`** | §2.9 |
| Newsletter block (blog index, blog series, events index and detail) | **NEW-SHARED `NewsletterSection`** | Props: `heading`, `description?`, `illustrationSvg`. §2.8 |
| Article cover card (blog index/category/series) | **NEW-SHARED `CoverCard`** (`ArticleEntryLink`) | Variants `default` and `featured`. §2.2 |
| Card grid (all indexes) | **NEW-SHARED `CardGrid`** | Props: `cols` {1440, 390}, `gap` [row, col]. Every index uses CSS grid with fixed tracks (values per collection). |
| Pagination (blog categories, what's new, library "All stories") | **NEW-SHARED `PaginatedListNav`** | §2.3 |
| Search / filter bar | **NEW-SHARED `FilterBar`** with sub-parts `SearchPill`, `PillDropdown`, `SegmentedTabs` | What's new uses search + Categories + RSS. Events uses tabs + search. Templates uses joined search + select. Webinars and library use a sidebar search input. §2.4 |
| Article layout (blog article, what's new entry, case study, university lesson) | **NEW-SHARED `ArticleLayout`** + `Prose` | Main column + optional sticky aside. Prose styles §2.5. Variants: `blog` (828 + 260 aside), `narrow` (680 centred, case study), `lesson` (660 + 288 left nav), `whatsnew` (936, padding-right 192). |
| Author block | **NEW-SHARED `AuthorChip`** (`ArticlePageHeader.authorsGridItem`) and `PersonInfo` (`PersonInfoItem`) | §2.6 |
| Speaker list (webinars) | **NEW-SHARED `PersonInfo`**, size 28/48/64 | Same pattern as PersonInfo: avatar + name + role. |
| Callout / note, tinted block, pull quote, image, video | **NEW-SHARED** `Callout`, `TintedBlock`, `PullQuote`, `ImageBlock`, `VideoBlock` | §2.5 |
| Library story card (library, templates detail, inside blog articles) | **NEW-SHARED `StoryCard`** (`LibraryStoryCard`) + `DotGrid` | Sizes `lg` (pad 24, radius 24) and `sm` (pad 27, radius 12). Themes green, purple, orange, pink. §2.7 |
| Related-items row | **NEW-SHARED `RelatedGrid`** | Used for blog "More series", case-study "More case studies", what's-new "More … updates", template "Explore more resources" and event "You can also join us at". Each reuses its collection's card. |
| Section header with "See all →" | **NEW-SHARED `SectionHeader`** | Props: `title`, `eyebrowPill?`, `description?`, `action?` (link or outlined button). |
| Sidebar layout (library, webinars, university lesson) | **NEW-SHARED `SidebarLayout`** | `288px 1000px` gap 72, sticky aside. |
| Date and type pills (events, webinars) | **NEW-SHARED `Pill`** | Mono 11–12px uppercase, radius 990 or 24. |
| Hero / H1 blocks | NEW-LOCAL per collection | Collection heroes differ too much to share; see each section. Do **not** reuse homepage `Hero`, which has wordmark, marquee and timeline. |
| `MonitorBanner`, `SolutionPanel`, `UseCases`, `WhyTines` | not used | These homepage sections appear on none of these pages. |
| `InlineSvg` | AS-IS | For every `reference/svg/pages/*.svg` (logos use `fill=currentColor`). |

Buttons: the existing `.btn` classes in `src/index.css` cover most of them, with two differences:
- **"Roobert" (non-mono) buttons** (`Subscribe`, `See all updates`, `RSS feed ↗`, `Watch now`, `See all case studies`) use Roobert 600 14/14, height 39, padding `0 19.6px`. They need a `.btn-sans` modifier.
- **Mono buttons** use the existing `.btn`: Roobert Mono 700 13/13, letter-spacing .26px, height 36, padding `0 18.2px`.
- Filled colours seen: `#6956a8` (the newsletter Subscribe and What's new buttons; the label is #fff), `#8d75e6` (library), `#4d3e78` (template detail), `#f47e3f` (orange Import), `#542f9c` (ExplosionCTA).
- Hover on filled buttons is `filter: brightness(1.1)` (`transition: filter .1s, background-color .1s`). This matches `.btn-filled:hover`.

---

## 2. Shared patterns (build once in `src/components/shared/`)

### 2.1 AreaNav (sub-nav bar)
- **Wrapper:** `position:relative; z-index:200`. The bar is `max-width:1520px; padding:0 40px`. The inner row is `display:flex; align-items:center; gap:10px; padding:15.45px 0; border-top:1px solid rgb(93 56 174 / .12)`. Height is 62px.
- On the library and Tines Stories pages there is a `backdrop` layer behind the bar: `background: rgb(252 249 245 / .9); border-radius: 0 0 31px 31px; max-width:1476px`, positioned 22px in from each side.
- **Pill (left):** padding `4.2px 12.6px`, bg `#ece8fd` (purple-5), text `#6741bf` (purple-60), radius 990, Roobert 600 14/16.1. Hover bg `#ded8ff` (purple-10).
- **Breadcrumb (optional):** a `›` chevron, then the current crumb in Roobert 600 14/16.1, colour `#8d75e6` (accent). Example: "Tines Stories › Library".
- **Right links** (`margin-left:auto`): each link is padding `6px 12px`, radius 50, Roobert 600 14/16.1, colour purple-65. The active link is coloured `#8d75e6`. Dropdown triggers (Overview/Discover/Learn) add a caret: a 4px/3px CSS triangle at opacity .55.
- **Responsive:** when the links don't fit, they collapse into a "Categories ▾" button. It exists in the DOM with `display:none` at 1440 (blog).
- **Right-fixed group:** gap 6, containing:
  - Theme toggle: 30×30 round button, 18px sun icon, hover bg `currentColor/10%`, transition `background-color .15s`. The icon is `reference/svg/pages/stories-theme-sun.svg`.
  - CTA "TRY TINES STORIES": Roobert Mono 700 12/13.8 uppercase, `#6741bf`, purple-5 pill.
- **Per-collection content:**

| Collection | Pill | Crumb | Right side |
|---|---|---|---|
| Blog | Blog | – | Home · News · Tutorials · Engineering · Product updates · Inside Tines · Tines × Tines · Guides · All articles |
| Stories (all `/stories/**`, library) | Tines Stories | Templates / What's new / Library | Overview▾ · Discover▾ · Learn▾ · ☀ · TRY TINES STORIES |
| Events, Webinars | Events | Upcoming / Webinars (`#7a56e0`) | Upcoming · Webinars · Builder Connect · Workflow.live ↗ |
| Case studies | Customers | – | Customers · All case studies |
| University | University | – | Your badges · Help · ☀ (Gatsby version, row padding `8px 0 20px`) |

- **390:** the bar stays 62px, the pill stays, and the right side folds into the toggle. `ctaFoldedOnPhones` hides the CTA text.

### 2.2 CoverCard (`ArticleEntryLink`)
- **Default:** a block `<a>`.
  - Cover: `aspect-ratio:1200/630` (rendered 437×230 at 1440), bg `#f3efea` (**new token `light-200`**), radius 10, overflow hidden, `<img object-fit:cover>`.
  - Header: `margin-top:14px; max-width:90%`. H3 is Roobert 500 18/21.6, purple-65.
  - Hover: no CSS style change was measured on the card, cover or title. Keep it static with `cursor:pointer`.
- **Featured:**
  - The inner element is a grid of the same 3 tracks as the grid (437.33×3, gap 24). The cover spans 2 tracks (899×472, radius 22).
  - Header in track 3, `padding-left:12px`:
    - H3: Reckless 400 38/41.8, ls −.475px.
    - Excerpt: Roobert 500 16/22.4, opacity .8, `margin-top:10px`, max-width 90%. It is 4–5 lines (≈45 words).
    - `PersonInfo` (48px avatar), margin-top 20.
- **390:** 1 column. The featured card stacks, and its H3 drops to Roobert 500 18/21.6 like the default card.

### 2.3 PaginatedListNav
- **Bar:** `<nav>` flex space-between, bg `#f3ecf7` (new), radius 990, padding `7px 5.25px`, height 49, full content width.
- **Prev/Next:**
  - Padding `10.5px 17.5px`, radius 5.6, Roobert 500 14/16.1, purple-65. Labels "← Previous" / "Next →".
  - Disabled state is a `<span>` at opacity .3.
- **Page links:**
  - The pages container is flex, centred, gap 14. Each link is 35×35, padding `0 3.5px`, radius 5.6, Roobert 500 14/16.1.
  - Active page: bg `#eadff8`, colour `#6956a8`, weight 700.
  - Ellipsis `…`: opacity .4.
- **Page pattern:** 1 2 3 4 … 10 11 12 … 19 20 21 22. That is: first 4, a window of 3 around the middle, and the last 4.
- **Mobile:** `Page 1 / 22` label (`.mobileLabel`, hidden at 1440). Page links are hidden on phones.
- **URLs:** `/<collection>/<category>/page/<n>/`. Page 1 is the bare category URL.

### 2.4 FilterBar parts
- **SearchPill (What's new):**
  - `<label>` flex gap 5, padding `0 12.8px`, height 36, bg `rgb(141 117 230 / .08)`, radius 160.
  - Icon 18px at opacity .7. The input is unstyled, Roobert 16.
  - Icon: `reference/svg/pages/stories-whatsnew-search-icon.svg`.
- **PillDropdown ("Categories ▾", "RSS"):**
  - Padding `8.4px 15.4px`, height 35, bg `rgb(93 56 174 / .05)`, border `1px solid rgb(93 56 174 / .2)`, radius 990, Roobert 14.
  - Hover: bg .10, border .35.
  - The chevron is 12px with `transition: transform .15s` and rotates when the menu is open.
  - Icons: `reference/svg/pages/stories-whatsnew-chevron.svg` and `reference/svg/pages/stories-rss-icon.svg`.
  - A 1×16 divider (`rgb(93 56 174 / .15)`, margin-left 10) sits before the theme toggle (36px).
  - Result count below the bar: Roobert 500 13/18.2, opacity .5, padding `10px 0 0 6.5px` (e.g. "1088 updates").
- **SegmentedTabs + joined search (Events):**
  - Buttons: padding `9.8px 16.8px`, Roobert 600 14/16.1, 38px tall, joined with −1px margins.
  - Active: bg `#714bd0` (purple-55), border same, text lightest.
  - Inactive: bg `#ece8fd`, border `#c3b5ff`, text `#3f2374` (purple-80).
  - The search segment is last: width 198, bg `#f5f2fb` (purple-2), border `#c3b5ff`, radius `0 r r 0`, icon 18 (`reference/svg/pages/events-search-icon.svg`).
- **Joined search + select (Templates):**
  - Grid `854px 274px`, height 52, bg lightest, border `1px solid #c3b5ff`.
  - The input has radius `160px 0 0 160px` and padding `16px 10px 16px 42px`. The icon is 16px at opacity .5.
  - The `<select>` has radius `0 160px 160px 0` and padding 16. Its chevron is 14px at opacity .6.
  - Options: All categories, Communication & collaboration, Security & threat intelligence, Cloud services & infrastructure, Productivity, Identity & access management, Threat detection & response, Enterprise resource management, Data analytics, Email & messaging security, DevOps.
  - At 390 it becomes 1 column (input above select).
- **Sidebar search (Library):**
  - 288×41, bg `#ece8fd`, border `1px solid #d1c7ff`, radius 990, padding `11.55px 14px 11.55px 38.5px`, placeholder "Find a story".
  - Icon: `reference/svg/pages/library-search-icon.svg` (16px, opacity .5).
- **Sidebar search (Webinars):** 240×42, bg `rgb(234 223 248 / .4)`, border `2px solid transparent`, radius 7, padding `0 35px 0 14px`, Roobert 500 14/16.1, icon 16px on the right, placeholder "Search...".

### 2.5 ArticleLayout + Prose (the blog article is the reference; differences noted)
**Prose base (`Article`):**
- Text: Roobert 400 **18/29.25**, purple-65.
- `p`: `margin-top:18px; max-width:80%` (662px of the 828 column).
- `strong`: 600.
- Links: 700, `text-decoration: underline 1px`. Colour is currentColor in the blog or `#9274f4` (purple-40) in what's new and tinted blocks. Hover colour is `#8665eb` (purple-45).
- `em`: italic.
- `h2`: `margin-top:42px`, Reckless 400 28/35, ls −.28px.
  - The heading text is wrapped in `<a href="#slug">` followed by a 17×17 link icon (`reference/svg/pages/blog-heading-anchor-link.svg`, margin-left 8.4).
  - The icon is at opacity 0 and becomes visible on hover, with `transition: opacity .15s`.
- `h3`: Roobert 600 22/26.4. Inside story-grid headers it is Roobert 600 28/33.6 with padding-top 14.
- `ul`: `padding-left:27px; margin:18px 0; max-width:80%`, with `li + li { margin-top:9px }`.
  - Nested `ul`: padding-left 18, margin-top 9.
- **Callout (`article > aside`):**
  - `margin-top:40px; padding:15.3px 22.5px 18px; background: rgb(146 117 244 / .12); border:1px solid rgb(146 117 244 / .25); border-radius:14px`.
  - Title row is an `h4`: flex, gap 7.2, `margin-bottom:7.2px`, containing the emoji "💡" and the word "Note" in Roobert 600 18/29.25, `#9274f4`.
  - Body follows at margin-top 9.
- **TintedBlock (`StructuredTextBlock`):**
  - `padding:40px; margin-top:40px; border-radius:14px; background:#ded8ff` (purple-10).
  - Usually contains an h2 ("Further reading:") and a link list.
  - Green variant: bg `#cae4d4` (green-10), text `#006b3f`-ish (the live value is p3 −.09 .40 .25, which is out of sRGB gamut; use `#00693b`), link `#00a46e`.
- **InArticleStoryGrid:**
  - `padding:36px 0; margin:36px 0; border-top:2px solid rgb(93 56 174 / .075); border-bottom: same`.
  - Header is an h3 "Library example(s)". The grid below is `402px 402px` (2 cols) with gap 24 and margin-top 40, holding `StoryCard sm` items.
- **ImageBlock (case study):** `margin:40px 0 18px`, img radius 9.
- **VideoBlock (what's new):** figure `margin-top:40px`, frame bg `#312f3b` (coolGray85), radius 14, `aspect-ratio:1380/1080`. Contains a `<video>` with `object-fit:contain`, an MP4 from stream.mux.com that autoplays muted and loops (the playback attributes were not measured).
- **PullQuote (case study):**
  - `margin:40px 0 18px; background:rgb(122 86 224 / .1); border-radius:14px; colour:#542f9c`, inner padding 45.
  - Quote mark SVG 36px (`reference/svg/pages/case-studies-pullquote-mark.svg`), margin-bottom 13.2.
  - Quote: Reckless 500 22/28.6.
  - Source: Roobert 500 18/29.25, margin-top 27.

### 2.6 AuthorChip / PersonInfo
- **AuthorChip (blog article header):**
  - Flex, gap 10.5, padding 14, bg `rgb(93 56 174 / .06)`, radius 14, height 70.
  - Photo: 42×42 circle, `object-fit:cover`.
  - Name: Roobert 600 14/16.1. Role: Roobert 500 14/17.5 at opacity .8.
  - Chips sit in a grid of 2 × 418px with gap 24. At 390 it is 1 column with gap 16.
- **PersonInfo (blog featured card):**
  - Grid `48px 1fr`, gap 12. The photo is a 48 circle.
  - Line 1: "Written by" in Roobert 700 14/19.6, then the name in weight 900.
  - Line 2: role/org in Roobert 500 14/19.6 at opacity .8.
- **Speaker (webinars):**
  - Grid `<size>px 1fr`, gap 12. Sizes are 64 (featured card), 28 (grid cards) and 48 (detail sidebar).
  - Avatar: circle with bg `#8578e6` while loading.
  - Name: Roobert 600 14/19.6. Role: Roobert 500 12/13.8 at opacity .75.
  - Stacked speakers are separated by margin-top 12 (cards) or 16 (sidebar).

### 2.7 StoryCard (`LibraryStoryCard`) + DotGrid
- **Card:**
  - `<a>` flex column `justify-content:space-between`, `position:relative; overflow:hidden; border:1px solid transparent`.
  - `transition: filter .15s, border-color .15s`.
  - Hover: border `rgb(<theme-text> / .4)` and `filter: brightness(1.03)`.
- **Sizes:**
  - `lg` (library 485×280, templates 360×280): padding 24, gap 16, radius 24.
  - `sm` (blog in-article 402×236): padding 27, gap 18, radius 12.
- **Themes** (bg = theme colour at 10% alpha, dot colour, text):

| theme | bg | dots | text |
|---|---|---|---|
| green | `rgb(0 139 83 / .1)` | `#50bc8c` | `#00693b` |
| purple | `rgb(122 86 224 / .1)` | `#aa94ff` | `#5d38ae` |
| orange | `rgb(209 92 8 / .1)` | `#f27324` | `#9d3e00` |
| pink | `rgb(205 61 139 / .1)` | `#ff75bd` | `#9c2464` |

- **DotGrid layer:**
  - An absolute `inset:1px` div at opacity .3. Its child is filled with the dot colour and masked with `mask-image:url("data:image/svg+xml,<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='1' fill='black'/></svg>")`, `mask-size:24px 24px`.
  - The same pattern is used on StoryEmbed and the CurlToTines figure (at 60% opacity, pink).
- **Card contents:**
  - Icons row: flex, gap 8 (9 in `sm`), margin-bottom 16. Each icon is a 44px circle with bg `rgb(252 249 245 / .5)` holding a 24px logo or emoji image.
    - Emoji images come from `cdn.jsdelivr.net/npm/emoji-datasource-apple@15.1.2/img/apple/64/<code>.png`. The sampled ones are downloaded.
  - Body: flex column, gap 9.6 (10.8 in `sm`).
    - `.name`: Roobert 600 22/26.4.
    - `.description` (lg only): Roobert 500 14/18.9, 2-line clamp.
    - `.tools`: Roobert 600 14/18.2 at opacity .8, prefixed with `<strong>Tools:</strong>` (weight 900).
    - Optional "By **Name**": Roobert 500 14/18.2 with strong 700.

### 2.8 NewsletterSection
- **Section:** `margin-top:96px`.
- **Inner:** grid `974px 346px` (742/346 inside the 1128 column on narrow pages), gap 40, `padding:96px 0`, `border-top/bottom:1px solid #d7c4fa` (new).
- **Text:**
  - H2: Reckless 400 40/46, ls −.4px. Text is "World class ideas right in your inbox" on the blog and "Can't make it this time?" on events.
  - Events only: a description in Roobert 500 16/25.6.
- **Form:** margin-top 24, max-width 620, flex column, gap 16.
  - Fields: a 2×2 fieldset of inputs, 46px tall, padding `12.8px 16px`, border `1px solid #d7c4fa`, joined with −1px margins. Only the outer corners are rounded (6px). `transition: border-color .15s`.
  - Placeholders: "Your email *", "Your company name", "First name", "Last name".
  - Two consent rows (`Checkbox`): flex, gap 7.
    - Box: 16px, radius 3, border `rgb(93 56 174 / .65)`. Checked: bg+border `#8665eb`. `transition: background-color .1s, border-color .1s`.
    - Label: Roobert 500 14/18.2. The link is `#9274f4`, weight 600, with an underline at 40% alpha.
    - Row 1 ("I have read and agree to Tines' privacy notice") is unchecked by default. Row 2 ("I would like to receive product updates, events, and marketing communications") is checked by default.
  - Submit: "Subscribe" `.btn-sans`, filled `#6956a8`, **opacity .5 until the form is valid**.
- **Illustration card:** 346×342, padding 72, bg `#ded8ff`, radius 14, border `1px solid #d7c4fa`, holding a 200×200 inline SVG (toaster): `reference/svg/pages/blog-newsletter-illustration.svg`.
- **390:** 1 column, H2 24/27.6, the fieldset becomes 1 column, and the illustration moves below.

### 2.9 ExplosionCta ("Built by you, powered by Tines")
- **Section:** wrap `padding-top:32px; margin-top:-32px`, section 812 tall, inner flex centred with `padding:200px 0`.
- **Card:** 360×412, bg `#fcf9f5`, border `1px solid #aa94ff`, radius 12.
  - Body padding `56px 32px 48px`, centred.
  - Tines mark: 42px SVG (`reference/svg/pages/stories-explosion-cta-tines-logo.svg`).
  - H3: Roobert 500 28/32.2, ls −.56px, `#542f9c`. Text is "Built by you,<br>powered by Tines".
  - Buttons (gap 6): filled mono "BOOK A DEMO" (bg `#542f9c`, text lightest) and outlined mono "SIGN UP FREE" (`#542f9c`).
  - The bottom ~105px of the card is a lavender band with a "Log in" link (see screenshot `stories-index-1440.png`).
  - The Gatsby copy on university/webinars uses Reckless 28 for the H3. Use the Next version everywhere.
- **Backdrop:**
  - An absolute 1770×900 box centred on the card (`translate(-885px,-450px)`), with `transition: opacity .5s`. It fades in when the class `.ready` is applied.
  - It holds 4 stacked `background-image` layers. **At rest they are scaled 0.7 / 0.6 / 0.5 / 0.4.** Assets: `public/assets/pages/stories/explosion-cta-layer-{1..4}.svg`.
  - Deco images: `explosion-cta-top-left-block-light.svg`, `-coffee-mug-light.svg`, `-bottom-right-pentagon-light.svg`.
- **Interaction:** on pointer hover the layers scale toward ~1.0 (layer 1 measured at 0.9929 after 700ms). This is JS-driven (no CSS transition on the layers), so it is a lerp per animation frame. Implement it as `transform: scale()` driven by pointer enter/leave with ~0.6s ease-out.
- **390:** the card stays 360 max-width and the backdrop is clipped.

### 2.10 Shared colour themes per item
Events, webinars, case studies, the library and university cards all pick an item theme. Use one `theme` map in `src/components/shared/themes.js`:

| theme | soft bg | border | strong/dark text | mid (book/bg 50) |
|---|---|---|---|---|
| purple | `#ece8fd` | `#ded8ff` / `#c3b5ff` | `#3f2374` / `#542f9c` | `#7a56e0` |
| green | `#e4eee7` | `#cae4d4` | `#005d35` / `#00693b` | `#008b53` |
| orange | `#ffe1c4` | `#ffcea6` (hover `#ff8e46`) | `#622c12` / `#8a3701` | `#d15c08` |
| pink | `#ffdeee` | `#ffc7e5` | `#8a1f57` / `#9c2464` | `#cd3d8b` |
| teal | `#ddf1ed` | – | `#006061` | – |
| blue | `#e7ecf5` | – | `#1f42a1` | `#234db2` |

---

## 3. New tokens (not in `tailwind.config.cjs`)

**Colours.** The live `:root` defines full 1–99 scales for orange, pink, teal, blue, red, magenta, sky, lime, warmGray and coolGray. Add only the values used here.
- light-200 `#f3efea`
- purple-65 is already present (`#5d38ae`)
- orange: 5 `#ffe9dd`, 10 `#ffd9c6`, 50 `#d15c08`, 55 `#c05200`, 70 `#8a3701`, 80 `#622c12`
- Card/theme one-offs: `#ffe1c4`, `#ffcea6`, `#ff8e46`, `#ffdeee`, `#ffc7e5`, `#ff9ad2`, `#ffab70`, `#ffbfdb`, `#ffc8a3`, `#d7c4fa`, `#c3b5ff`, `#d1c7ff`, `#aa94ff`, `#9d3e00`, `#00693b`, `#005d35`, `#00452a`
- pink: 50 `#cd3d8b`, 60 `#ad2a71`, 65 `#9c2464`, 70 `#8a1f57`, 80 `#631e40`
- teal-5 `#ddf1ed`; blue-5 `#e7ecf5`, blue-70 `#1f42a1`; red-50 `#d13936`
- coolGray-85 `#312f3b`
- Pagination: `#f3ecf7`, `#eadff8`, `#6956a8`, `#7f69ce`
- Template detail button: `#4d3e78`

**Type roles** (family weight size/line-height letter-spacing):

| role | value | used on |
|---|---|---|
| display-xl | Reckless 300 72/70.56 −1.26 | template detail H1 (390: 36/39.6 −.54) |
| display-lg | Reckless 400 64/64 −1.92 (64/73.6 on templates) | university H1, templates H1 (390: 38/38 −1.14 or 38/43.7 −.76) |
| course-h1 | Reckless 400 68/61.2 −1.36 | university course (390: 50/45 −1) |
| article-h1 | Reckless 400 54/59.4 −.81 | blog article, webinar detail (390: 38/41.8 −.76 / −.38) |
| page-h1 | Reckless 400 48/55.2 −.96 to −1.44 (what's new, case studies index) | (390: 38/43.7 −.76; case studies 42/48.3 −.84) |
| stories-h1 | Reckless 400 48/52.8 −1.44 | /stories/ (390: 38/41.8) |
| cs-hero-h1 | Reckless 400 48/50.4 −1.44 | case-study hero (390: 28/29.4) |
| lesson-h1 | Reckless 400 48/41.28 −1.44 | university lesson (390: 38/normal −1.14) |
| series-h1 | Reckless 400 58/58 −.87 `#542f9c` | blog series (390: 32/32 −.32) |
| category-h1 | Reckless 400 38/43.7 −.76 | blog category, what's-new entry 38/45.6 |
| event-h1 | Roobert 500 42/45.36 −1.26 | event detail (390: 38/41.04 −.76) |
| library-hero-h1 | Roobert 500 44/44.88 −1.32 lightest | library (390: 30/30.6 −.3) |
| section-h2-serif | Reckless 400 32/36.8 −.64 | templates, case study "More case studies" (390: 24/27.6 −.24) |
| section-h2-sans | Roobert 600 32/33.6 −.32 | library sections (390: 24/25.2 −.12) |
| blog-section-h2 | Roobert 600 24/28.8 −.24 | blog index "Latest articles" |
| newsletter-h2 | Reckless 400 40/46 −.4 | (390: 24/27.6 −.24) |
| prose-h2 | Reckless 400 28/35 −.28 | all articles |
| prose | Roobert 400 18/29.25 (case study w500; lesson 16/26) | |
| lead | Roobert 600 22/33 −.22 | case-study intro block |
| card-title-serif | Reckless 400 22/27.5 −.22 | what's-new entries (390: Roobert 16/19.2) |
| story-name | Roobert 600 22/26.4 | StoryCard |
| embed-title | Roobert 600 30/34.5 −.6 | StoryEmbed (390: 24/27.6 −.24) |
| event-card-title | Roobert 500 22/25.3 −.22 | (390: 16/18.4 −.16) |
| webinar-feature-title | Reckless 400 42/42 −.42 | (390: 24/27.6) |
| webinar-card-title | Reckless 400 28/32.2 −.28 | (390: 24/27.6 −.24) |
| course-card-title | Reckless 400 29/34.8 −.58 | university |
| mono-label-sm | Roobert Mono 700 11.5/16.1 .575 upper | eyebrows ("LIBRARY", "Content") |
| mono-pill | Roobert Mono 600 11/12.65 .22 upper | event pills (webinars: 700 12/12 .24) |
| mono-meta | Roobert Mono 700 12/16.8 .6 upper | university meta |
| mono-dt | Roobert Mono 700 12/13.8 .24 upper | event detail labels; template breadcrumb 600 12/13.8 ls 1.2 |
| meta-14 | Roobert 500 14/16.1 | dates, counts |

Existing tokens reused unchanged: `text-nav` (14/16.1) for AreaNav links, `text-button` (13/13 .26) for mono buttons, `text-tagline` for WildCodeCTA, `font-sans`/`font-serif`/`font-mono`, `max-w-page`, `px-page`, `px-page-wide`, `rounded-pill`, `rounded-usp` (14px, used widely for 14px radii).

---

## 4. BLOG

### 4.1 Index `/blog/`. 1440 height 6757, 390 height 8905. Screenshot `reference/pages/blog-index-{1440,390}.png`
Order (`blog.contentColumnWide`: max-width 1520, padding `0 40px`). Main starts 64px below the AreaNav.
1. **Featured article**: `CoverCard featured`, `/blog/tines-3b-first-90/`.
2. **Latest articles**: `SectionHeader` with H2 "Latest articles" (blog-section-h2) on the left and "See all →" (Roobert 600 13/14.95) on the right. The header is a flex row with gap 16 and sits 40px above the grid.
   - Grid: 3 × 437.33, **gap 64 (row) / 24 (col)**, 9 cards. Sections are separated by `margin-top:96px`.
3. **Pull-quote excerpt** (`BlogArticleExcerptSection`):
   - Inner grid `884px 476px`, `padding:72px 0`, border-top/bottom `1px solid rgb(93 56 174 / .14)`.
   - Left column has `padding-left:96px`. It holds:
     - a 36px quote SVG (`reference/svg/pages/blog-excerpt-quote-mark.svg`);
     - the quote, margin-top 24: Reckless 500 28/38.5, −.28, about 45 words;
     - the source: name Roobert 700 16/22.4, then role at 500;
     - "From the article: <link>" at opacity .6, link underlined, margin-top 16. Hover sets opacity 1.
   - Right column: a 300×300 illustration centred (`public/assets/pages/blog/…` uses `1731492943-tines-illo-key-framed.svg`, which is not in the downloaded set; the URL is in §10).
4. **Tutorials**: same pattern as 1 + 2 (one featured + 3 cards).
5. **Guides, white papers, and original research**: 4 × 322, gap 24.
   - `DocumentEntryLink`: cover wrap `aspect-ratio:8.5/11`, radius 6, border 1px. The border colour cycles per item: `#ffbfdb`, `#ffc8a3`, `#d7c4fa`, `#d7c4fa`. Cover bg is light-200.
   - Title: Roobert 600 16/19.2, margin-top 14. Subheading: Roobert 500 16/19.2 at opacity .8, margin-top 8.
6. **NewsletterSection** (§2.8).
7. **Product updates**: SectionHeader + 3 cards ("What's new in Tines: <Month> 2026 edition").
8. **"View all articles →"** link row: an 88px tall section.
9. `CtaStartToday`, then `Footer`.

**390:** all grids are 1 column with gap 45/16. The guides grid is 2 × 169 with gap 16.

### 4.2 Category / paginated list `/blog/articles/`, `/blog/news/`, `/blog/tutorials/`, …. Screenshot `blog-category-*.png`
- Category header (90px block): H1 is category-h1 ("All articles", "News"), gap 16.
- `categoryGrid`: 3 × 437.33, gap 64/24, **24 cards per page**, using default CoverCards.
- Then `PaginatedListNav` (22 pages for All articles, 12 for News), margin-top ≈ 64. Then `CtaStartToday`.
- No search or filters. Category switching happens through the AreaNav.
- 390: 1 column, gap 45/16.

### 4.3 Article detail `/blog/<slug>/`. Samples: `/blog/building-ai-agents-getting-started/` and `/blog/introducing-the-workflow-capability-matrix/`. Both use the same template (module set `ArticlePageHeader, DefaultSidebarContent, Article`).
Screenshots: `blog-detail-1440.png`, `blog-detail-2-1440.png` (+390).
- **Column:** `blog.contentColumn`, padding `0 156px`, max-width 1440. The header starts 55px below the AreaNav.
- **Header:**
  - H1: article-h1.
  - `authorInfo`: margin-top 48, flex space-between, gap 24.
    - Left: authors grid of AuthorChips (1 or 2 chips).
    - Right `.meta`: flex, gap 10.5, end-aligned:
      - `<time>` "Published on July 16, 2026": Roobert 500 14/16.1, opacity .7.
      - Category pill(s): padding `5.2px 9.75px`, bg `rgb(93 56 174 / .1)`, radius 26, Roobert 500 13/14.95. They link to the category.
  - 390: the meta wraps below the authors.
- **Layout:** grid `828px 260px`, gap 40, padding-bottom 48. This is the `noToc` variant; a TOC variant class exists but was not seen on either sample.
  - The cover image spans the main column: 828×435, radius 22, margin-bottom 32.
  - The aside (column 2) holds a **sticky sidebar card** (`DefaultSidebarContent`), `position:sticky; top:96px`, 260×330:
    - grid gap 14, padding 21, bg `#ece8fd`, border `1px solid #c3b5ff`, radius 14;
    - H3 "Sign up for Tines 3B Explore Edition": Reckless 400 22/25.3;
    - "Get started for free": Roobert 600 14/19.6, margin-top 8;
    - a 90×90 illustration (reuse the existing `public/assets/images/usp/blossoming-transformation.svg`, translateX 4px);
    - hover: border `#aa94ff`.
- **Body element counts** (write placeholder copy to match):
  - Sample 1 (≈1,870 words): 30 top-level `p`, 7 `h2`, 16 `h3`, 12 `ul` (one with nested lists), 4 callouts ("💡 Note"), 3 tinted blocks ("Further reading"-style link lists, one green variant at the end), 5 InArticleStoryGrids holding 6 StoryCards in total. No images, code, tables or blockquotes.
  - Sample 2 (≈320 words): 8 `p`, 1 `ul`, 3 `figure` VideoBlocks (MP4). No headings.
- **After the article:** `CtaStartToday` (no newsletter, no related posts), then `Footer`.
- **390:** header 1 column, authors 1 column (gap 16), layout 1 column (gap 24), and the sidebar card moves below the article.

### 4.4 Series page `/blog/<series-slug>/` (e.g. `/blog/migrating-to-tines-cases/`, 20 such URLs at depth 4). Screenshot `blog-series-*.png`
- Grid `460px 644px`, gap 24.
  - Cover: 460×595, radius 5, aspect 8.5/11.
  - Header block: padding `0 0 32px 24px`.
    - H1: series-h1, `#542f9c`.
    - Description: Roobert 500 16/22.4, `#542f9c`.
  - List area: padding `24px 0 0 24px`.
    - Heading "Content": mono-label-sm.
    - 4 entry links: Roobert 500 16/18.4, each with a 5×8 chevron (`reference/svg/pages/blog-series-list-chevron.svg`).
- "More series": H2 Reckless 600 24/28.8 + "See all →".
  - Grid 4 × 264, gap 24. `BlogSeriesEntryLink` cover borders `#ff9ad2` / `#c3b5ff` / `#ffab70`.
  - Name: Roobert 600 16/19.2. Description: Roobert 500 16/20.8.
- Then NewsletterSection, `CtaStartToday`.
- 390: 1 column; more-series 2 × 169, gap 16.

### 4.5 Blog sample data
```json
{
  "index": {
    "route": "/blog/",
    "featured": [
      {"title":"We gave all our employees access to Tines 3B. Here's what happened next.","href":"/blog/tines-3b-first-90/","author":"Martin Moroney Director of Internal Automation, Tines","cover":"/assets/pages/blog/featured-1-tines-3b-first-90.jpg"},
      {"title":"Building AI agents in Tines Stories: tips and tricks for getting started","href":"/blog/building-ai-agents-getting-started/","author":"Colleen Gallagher Senior Customer Success Engineer, Tines","cover":"/assets/pages/blog/featured-2-building-ai-agents-getting-started.jpg"}
    ],
    "sections": ["Latest articles","Tutorials","Guides, white papers, and original research","Product updates"],
    "latest": [
      {"title":"IT onboarding automation: building a provisioning agent with Tines 3B","href":"/blog/it-onboarding-automation-building-a-provisioning-agent-with-tines-3b/","cover":"/assets/pages/blog/cover-it-onboarding-automation-building-a-provisioning-agent.jpg"},
      {"title":"How Headspace is taming wild code with Tines 3B","href":"/blog/headspace-taming-wild-code-with-tines-3b/","cover":"/assets/pages/blog/cover-headspace-taming-wild-code-with-tines-3b.jpg"},
      {"title":"“Better than the tools we were quoted six figures for”: How Tines’ finance team built a custom billing app for <$1,000","href":"/blog/finance-billing-app/","cover":"/assets/pages/blog/cover-finance-billing-app.jpg"},
      {"title":"The AI SOC is commoditized. Here’s why building our own is the next frontier.","href":"/blog/build-your-own-ai-soc/","cover":"/assets/pages/blog/cover-build-your-own-ai-soc.jpg"},
      {"title":"AI governance monitoring: how to prove your program is actually working","href":"/blog/ai-governance-monitoring-how-to-prove-your-program-is-actually-working/","cover":"/assets/pages/blog/cover-ai-governance-monitoring-how-to-prove-your-program-is-.jpg"},
      {"title":"Why wild code is the next big challenge for CIOs","href":"/blog/thomas-kinsella-technovation/","cover":"/assets/pages/blog/cover-thomas-kinsella-technovation.jpg"},
      {"title":"What's new in Tines: August 2026 edition","href":"/blog/whats-new-in-tines-august-2026-edition/","cover":"/assets/pages/blog/cover-whats-new-in-tines-august-2026-edition.jpg"},
      {"title":"Tines achieves TX-RAMP Level 2 certification","href":"/blog/tines-achieves-tx-ramp-level-2-certification/","cover":"/assets/pages/blog/cover-tines-achieves-tx-ramp-level-2-certification.jpg"},
      {"title":"Building AI agents in Tines Stories: tips and tricks for getting started","href":"/blog/building-ai-agents-getting-started/","cover":"/assets/pages/blog/featured-2-building-ai-agents-getting-started.jpg"}
    ],
    "guides": [
      {"title":"The ultimate guide to network operations management","subheading":"Secure, reliable, and governed","href":"/access/guide/the-ultimate-guide-to-network-operations-management/","cover":"/assets/pages/blog/guide-cover-the-ultimate-guide-to-network-operations-managem.png"},
      {"title":"The IT and security field guide to AI adoption","href":"/access/guide/the-it-and-security-field-guide-to-ai-adoption/","cover":"/assets/pages/blog/guide-cover-the-it-and-security-field-guide-to-ai-adoption.png"},
      {"title":"The security leader's playbook to GRC orchestration","href":"/access/guide/the-security-leaders-playbook-to-grc-orchestration/","cover":"/assets/pages/blog/guide-cover-the-security-leader-s-playbook-to-grc-orchestrat.png"},
      {"title":"The future of IT infrastructure","subheading":"How intelligent workflows improve infrastructure capacity, reliability, and scalability management","href":"/access/guide/the-future-of-it-infrastructure/","cover":"/assets/pages/blog/guide-cover-the-future-of-it-infrastructure.png"}
    ],
    "categoryNav": ["Home","News","Tutorials","Engineering","Product updates","Inside Tines","Tines × Tines","Guides","All articles"]
  },
  "category": {
    "route": "/blog/articles/",
    "h1": "All articles",
    "perPage": 24,
    "totalPages": 22,
    "pagination": ["← Previous","1","2","3","4","…","10","11","12","…","19","20","21","22","Page 1 / 22","Next →"]
  },
  "details": [
    {"route":"/blog/building-ai-agents-getting-started/","title":"Building AI agents in Tines Stories: tips and tricks for getting started","date":"Published on July 16, 2026","categories":["Tutorials"],"authors":["Colleen Gallagher Senior Customer Success Engineer, Tines","Michael Tolan Senior Engineer - Customer Experience, Tines"],"authorPhotos":["/assets/pages/blog/author-building-ai-agents-getting-started-1.jpg","/assets/pages/blog/author-building-ai-agents-getting-started-2.jpg"],"cover":"/assets/pages/blog/article-cover-building-ai-agents-getting-started.jpg","sidebarCard":"Sign up for Tines 3B Explore Edition Get started for free","bodyElementCounts":{"p":30,"h2":7,"h3":16,"h4":4,"ul":12,"ol":0,"callouts":4,"tintedBlocks":3,"storyGrids":5,"storyCards":6,"images":0,"figures":0,"videos":0,"pre":0,"blockquote":0,"table":0,"words":1868}},
    {"route":"/blog/introducing-the-workflow-capability-matrix/","title":"Introducing the workflow capability matrix","date":"Published on March 25, 2026","categories":["Tutorials"],"authors":["Amber Langdon Product Marketing Manager, Tines"],"authorPhotos":["/assets/pages/blog/author-introducing-the-workflow-capability-matrix-1.jpg"],"cover":"/assets/pages/blog/article-cover-introducing-the-workflow-capability-matrix.jpg","sidebarCard":"Sign up for Tines 3B Explore Edition Get started for free","bodyElementCounts":{"p":8,"h2":0,"h3":0,"h4":0,"ul":1,"ol":0,"callouts":0,"tintedBlocks":0,"storyGrids":0,"storyCards":0,"images":0,"figures":3,"videos":3,"pre":0,"blockquote":0,"table":0,"words":320}}
  ],
  "series": {
    "route": "/blog/migrating-to-tines-cases/",
    "title": "Migrating to Tines Cases",
    "cover": "/assets/pages/blog/series-cover-migrating-to-tines-cases.png",
    "entryTitles": ["Introduction: migrating to Tines Cases","Laying the groundwork for your migration to Tines Cases","The operational side of migrating to Tines Cases: communication, rollback, and compliance","After the migration: securing and optimizing Tines Cases"],
    "moreSeries": ["Optimizing your Tines stories","The next evolution of SOAR","Automate beyond the SOC","Hands-on SOAR"]
  }
}
```

---

## 5. STORIES (Tines Stories hub plus its collections)
`/stories/` is a product hub, not a list. The collections under it are **What's new** (`/stories/whats-new/`, 1,088 entries, 55 pages) and **Templates** (`/stories/templates/` + 634 vendor pages). `/stories/docs/**` is out of scope. All of these pages share `AreaNav` (Tines Stories) + `ExplosionCta`.

### 5.1 Hub `/stories/`. 1440 height 4182. Screenshot `stories-index-*.png`
`page.page`: padding `60px 156px 80px`, max-width 1440.
1. **Hero** (centred):
   - H1 "Meet Tines Stories": stories-h1.
   - Description: Roobert 500 16/22.4, max-width 544, margin-top 16.
   - Illustration: 1082×283 (`aspect 984/257`), margin-top 40, at `/assets/pages/stories/hero-illustration.svg`.
2. **Product grid** (margin-top 60): 3 × 360, gap 24. Each `productCard` is 450 tall:
   - grid padding 23.24, radius 14, border 1px, overflow hidden, gap 24.
   - Themes:
     - Storyboard: bg `#ffe1c4`, border `#ff8e46`, text `#c05100`.
     - Workbench: bg `#e4eee7`, border `#50bc8c`, text `#007f4a`.
     - Cases: bg `#f5f2fb`, border `#aa94ff`, text purple-65.
   - H2: Reckless 400 26/26, −.52.
   - P: Roobert 500 14/16.8, margin-top 10.5.
   - "**Details** →": Roobert 700 14/16.8, margin-top 10.5. The arrow has `transition: transform .1s` and moves to `translateX(2px)` on hover.
   - Card hover: border colour becomes the text colour.
   - `::before` holds the UI mock backdrop: absolute, `top:126px; left/right/bottom:0`, `background:url(card-backdrop-<name>.svg) 100% 100%/contain no-repeat`. Assets: `/assets/pages/stories/card-backdrop-{storyboard,workbench,cases}.svg`.
   - Product icon: 92×92 at bottom-left, `translate(-8px, 8px)`, z-index 1.
3. **Feature grid** (margin-top 60): 3 × 360, gap 32/24. Each `featureCard` is a grid `92px 244px`, gap 24:
   - Icon: 92 circle with a border. Agents: `#e4eee7`/`#aedac2`, hover `#91d1af`. AI in Tines: `#f5f2fb`/`#d1c7ff`. Monitoring: `#ffeee8`/`#ffb1dc`. The image inside is at 50% width.
   - H3: Reckless 24/24 −.48, padding-top 21.
   - P: Roobert 500 14/16.8, margin-top 8.
   - "Details →", same as the product cards.
4. **WhatsNewSection** (margin-top 120):
   - Inner grid `408.8px 613.2px`, gap 24, padding 40, border `1px solid rgb(93 56 174 / .14)`, radius 14.
   - The left header is **sticky, top 120px**:
     - H2 "What's new": Reckless 28/28, −.56.
     - P: Roobert 500 16/22.4, max-width 352, margin-top 12.8.
     - Buttons (margin-top 20, gap 8): "See all updates" (filled `#6956a8`, `.btn-sans`) and "RSS feed ↗" (outlined `#6956a8`).
   - The right list holds 7 compact `WhatsNewCard` entries. Rows after the first have `padding-top:24px` and `border-top:1px solid rgb(93 56 174 / .12)`, which gives a ≈99–105px pitch.
     - Entry: grid `56px 1fr`, gap 24.
     - Icon tile: 56, radius 12, border 1px, tinted per category (e.g. records `#edecd4`/`#d0d396`, AI `#e6e9f1`/`#bbcaea`), image max-width 75%.
     - H3: card-title-serif, margin-bottom 4.
     - Meta row (flex, baseline, gap 4): categories (Roobert 600 14/16.1), then "|" (400), then `<time>` (500).
   - "View all product updates →" box: full width, padding 16, border `1px solid rgb(93 56 174 / .18)`, radius 14, Roobert 700 14/16.1, centred.
5. `ExplosionCta`, then `Footer`.

**390:** product and feature grids are 1 column (gap 16; 32/16). The What's new section becomes 1 column, its header is no longer sticky, and entry titles are Roobert 16/19.2.

### 5.2 What's new index `/stories/whats-new/` (+ `/page/2…55/`). Screenshot `stories-whatsnew-*.png`
- `WhatsNewFeedPage`: padding `0 156px`.
- Header (margin-bottom 38.4):
  - H1 "What's new": Reckless 48/55.2, −1.44.
  - Tagline: Roobert 500 16/22.4, margin-top 19.2.
- FilterBar: `SearchPill` (852 wide, grows) + "Categories ▾" + "RSS" + divider + theme toggle. Then the result count.
- Feed:
  - `MonthDivider`: padding `55px 0 30px`, flex, gap 7.5.
    - Label (e.g. "OCTOBER 2026"): Roobert Mono 600 14/16.1, ls .28, uppercase.
    - Count pill "22 updates": Roobert 500 13/14.95, padding `3.9px 11.7px`, bg `#eadff8`, colour `#7f69ce`, radius 130.
  - Entries (20 per page): full `WhatsNewCard`, grid `56px 1fr 28px`, gap 24, row ~56px. The third column is the contributor avatar: 28 circle with a 1px lightest border (overlapping avatars when there are several).
- `PaginatedListNav` (55 pages), then ExplosionCta.
- 390: H1 38/43.7. Entries keep the icon and drop the avatar column.

### 5.3 What's new entry `/stories/whats-new/<slug>/`. Samples: `personal-tool-controls-in-workbench`, `claude-haiku-55-is-now-available` (same template)
- Header:
  - Icon tile: 64, radius 12, tinted border.
  - H1: Reckless 400 38/45.6, −.76 (390: 28/33.6).
  - Meta: "AI in Tines | October 16, 2026".
- `Article`: width 936 within the 1128 column, `padding-right:192px`; prose 18/29.25, links `#9274f4`.
  - Sample 1: 2 short paragraphs (33 words) + 1 VideoBlock.
  - Sample 2: 1 paragraph (48 words).
- Related:
  - H2 "More "<category>" updates": Reckless 600 24/28.8, −.24 (390: Roobert 18/20.7). Followed by 4 compact WhatsNewCards.
  - H2 "Other recent updates": 4 compact cards.
- Then ExplosionCta.

### 5.4 Templates index `/stories/templates/` (+ `/stories/templates/all/page/N`). Screenshot `stories-templates-*.png`
- **Background graphic:** `ProductExplorerHeaderGraphic`, an absolute 1440×840 container with z-index −1 holding a 1900×850 SVG centred (`reference/svg/pages/stories-explorer-header-graphic.svg`). The detail pages show it faded (opacity .6).
- **H1** "Connect anything": Reckless 64/73.6 −1.92 (390: 38/43.7). Below it, the joined search + select FilterBar (§2.4) at y≈490.
- **"Top products":**
  - `ProductExplorerSectionHeader`: grid `1fr auto`, align end, gap 16. Contains:
    - H2 (section-h2-serif);
    - P (Roobert 500 16/22.4, margin-top 12, max-width 608; hidden on mobile);
    - a 69×71 decorative SVG (`reference/svg/pages/stories-top-products-icon.svg`).
  - Grid: 6 × 168, gap 24, 24 entries. Each entry is a 168 square:
    - grid, centred, padding 16, bg lightest, border `1px solid #aa94ff`, radius 16, `transition:border-color .15s`, hover border `#7a56e0`;
    - logo 42×42 contain;
    - name: Roobert 600 14/14.
- **"By vendor":** 3 × 360, gap 24, cards 114 tall.
  - Card: grid `254px 64px`, padding 20, bg `#ece8fd`, border `#aa94ff`, radius 14. Hover border `#7a56e0`.
  - H3: Reckless 24/28.8. "View products →": Roobert 700 14/19.6, margin-top 7.
  - Icon: 72 circle, bg `rgb(252 249 245 / .33)`, logo at 45%.
- **"By category":** 4 × 264, gap 24. Each category card has an H3 (Roobert 14/16.8 at 390) and an icon grid of 5 product logos.
- **`BuildYourOwnConnectionsSection`:**
  - Figure card: grid `383px 575px`, gap 24, padding 72, bg lightest, border `1px dashed #c3b5ff`, radius 14.
  - Caption: padding-right 64.
    - H2: Reckless 32/35.2 −.64, max-width 320.
    - P: Roobert 500 16/22.4. Links are bold and underlined ("HTTP request", "copy a cURL command").
  - `CurlToTinesIllustration`: grid `157.9 149 157.9`, padding 30, bg `#ffdeee`, border `#ffc7e5`, radius ~14, with a pink dot layer (`rgb(255 168 207 / .6)`). Contents:
    - Code block: grid `1fr 64px`, padding 16, bg `#631e40`, border `#ad2a71`. Heading "cURL request" in Roobert 700 12/16.8, ls 1.2, uppercase, `#ffdeee`. Code in Roobert Mono 600 12/13.8 (a 4-line generic curl).
    - Copy button: bg `#e269a4`, radius 6, padding `6px 9px`, Roobert 600 12/13.8 lightest, with an 11px icon (`stories-copy-icon.svg`).
    - Hand-drawn arrow SVG (`stories-curl-arrow.svg`) with the label "Paste in your story", rotated −5°, Roobert 600 12/13.2, `#ad2a71`.
    - Mini action card (`stories-action-card.svg`).
- Then ExplosionCta.
- 390: grids 2 × 169, gap 16. The figure card is 1 column.

### 5.5 Template (vendor) detail `/stories/templates/<vendor>/`. Samples: `1password`, `abuseipdb` (same template; AbuseIPDB adds a "Pre-built templates" `ActionTemplateBrowser` section)
- **Header** (`ProductDetailPage.header`): grid `736px 368px`, gap 24, padding-top 96.
  - Breadcrumb "TEMPLATES": mono-dt with ls 1.2, hover underline.
  - H1 "<Vendor> × Tines": display-xl, margin-top 40.
  - Description: Reckless 500 20/26, margin `24px 136px 0 0`, max-width 600, about 35 words. The vendor name is a link (600, underline).
  - CTAs: grid `156px 156px`, gap 8, margin-top 24. "BOOK A DEMO" is filled mono `#4d3e78`; "SIGN UP FREE" is outlined.
  - Right: `iconBubble`, a 220 circle with bg lightest and border `#c3b5ff`, z-index 2, holding an 80×80 vendor logo.
- **Sections:** each is a `ProductExplorerSectionHeader` + content.
  1. (AbuseIPDB only) "Pre-built templates": action template cards (grid; 1 column at 390).
  2. "Full workflow examples": `StoryCard lg` grid of 3 × 360 with gap 24, plus "Explore all →" as an outlined mono button.
  3. "Build your own connections": same as 5.4.
  4. "Connect quickly": `ConnectQuicklySection` grid of 2 × 552, gap 24. Cards are 260 tall: padding 24, bg `#ece8fd`, border `1px solid #aa94ff`, radius 14, with an illustration. Titles: "Credentials documentation" (or "<Vendor> connect flow") and "Authentication guides".
  5. "Explore more resources": `RelatedContentGrid` of 4 × 264, gap 24. `ContentCard`s are 360 tall: padding `24px 24px 50px`, radius 10. The first one is bg `#ffcea6`, border `#ffbc8a`, text `#8a3701`. Each card has an eyebrow (BLOG / CASE STUDIES / LEARN / LEARN), a title and a "Read now →" link.
- Then ExplosionCta.
- 390: H1 36/39.6. Section headers become a 2-column grid (title / button). Story grid is 1 column (gap 8). Related grid is 2 × 173 (gap 8).

### 5.6 Stories sample data
```json
{
  "index": {
    "route": "/stories/",
    "products": [
      {"name":"Storyboard","href":"/stories/storyboard/","icon":"/assets/pages/stories/product-icon-storyboard.svg","backdrop":"/assets/pages/stories/card-backdrop-storyboard.svg"},
      {"name":"Workbench","href":"/stories/workbench/","icon":"/assets/pages/stories/product-icon-workbench.svg","backdrop":"/assets/pages/stories/card-backdrop-workbench.svg"},
      {"name":"Cases","href":"/stories/cases/","icon":"/assets/pages/stories/product-icon-cases.svg","backdrop":"/assets/pages/stories/card-backdrop-cases.svg"}
    ],
    "features": [
      {"name":"Agents","href":"/stories/agents/","icon":"/assets/pages/stories/feature-icon-agents.svg"},
      {"name":"AI in Tines","href":"/ai-in-tines/","icon":"/assets/pages/stories/feature-icon-ai-in-tines.svg"},
      {"name":"Monitoring","href":"/stories/monitoring/","icon":"/assets/pages/stories/feature-icon-monitoring.svg"}
    ],
    "whatsNew": [
      {"title":"Record List actions get cursor pagination, multi-field sorting, and lighter queries","categories":"Records and dashboards, Actions","date":"October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-monitor.svg","href":"/stories/whats-new/record-list-actions-get-cursor-pagination-multi-field-sorting-and-lighter-queries/"},
      {"title":"Personal tool controls in Workbench","categories":"AI in Tines","date":"October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","href":"/stories/whats-new/personal-tool-controls-in-workbench/"},
      {"title":"Claude Haiku 5.5 is now available","categories":"AI in Tines","date":"October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","href":"/stories/whats-new/claude-haiku-55-is-now-available/"},
      {"title":"PostgreSQL 18 support for for self-hosted deployments","categories":"Self-hosted","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-radar-self-hosted.svg","href":"/stories/whats-new/postgresql-18-support-for-for-self-hosted-deployments/"},
      {"title":"Keyless cloud credentials with workload identity federation","categories":"Credentials and resources","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-credentials-key.svg","href":"/stories/whats-new/keyless-cloud-credentials-with-workload-identity-federation/"},
      {"title":"AI web search: web extraction now available in the EU","categories":"AI in Tines","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","href":"/stories/whats-new/ai-web-search-web-extraction-now-available-in-the-eu/"},
      {"title":"New field types for cases","categories":"Cases","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-cases.svg","href":"/stories/whats-new/new-field-types-for-cases/"}
    ]
  },
  "whatsNewIndex": {
    "route": "/stories/whats-new/",
    "resultCount": "1088 updates",
    "months": ["OCTOBER 2026 22 updates"],
    "totalPages": 55,
    "entries": [
      {"title":"Record List actions get cursor pagination, multi-field sorting, and lighter queries","categories":"Records and dashboards, Actions","date":"October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-monitor.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-1.jpg","href":"/stories/whats-new/record-list-actions-get-cursor-pagination-multi-field-sorting-and-lighter-queries/"},
      {"title":"Personal tool controls in Workbench","categories":"AI in Tines","date":"October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-2.jpg","href":"/stories/whats-new/personal-tool-controls-in-workbench/"},
      {"title":"Claude Haiku 5.5 is now available","categories":"AI in Tines","date":"October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-3.jpg","href":"/stories/whats-new/claude-haiku-55-is-now-available/"},
      {"title":"PostgreSQL 18 support for for self-hosted deployments","categories":"Self-hosted","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-radar-self-hosted.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-4.jpg","href":"/stories/whats-new/postgresql-18-support-for-for-self-hosted-deployments/"},
      {"title":"Keyless cloud credentials with workload identity federation","categories":"Credentials and resources","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-credentials-key.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-5.jpg","href":"/stories/whats-new/keyless-cloud-credentials-with-workload-identity-federation/"},
      {"title":"AI web search: web extraction now available in the EU","categories":"AI in Tines","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-6.jpg","href":"/stories/whats-new/ai-web-search-web-extraction-now-available-in-the-eu/"},
      {"title":"New field types for cases","categories":"Cases","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-cases.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-7.jpg","href":"/stories/whats-new/new-field-types-for-cases/"},
      {"title":"Mention tasks in cases","categories":"Cases","date":"October 15, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-cases.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-8.jpg","href":"/stories/whats-new/mention-tasks-in-cases/"},
      {"title":"Full-text search and filter groups in Cases","categories":"Cases","date":"October 14, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-cases.svg","contributorAvatar":"/assets/pages/stories/whatsnew-contributor-9.jpg","href":"/stories/whats-new/cases-full-text-search/"}
    ]
  },
  "whatsNewDetails": [
    {"route":"/stories/whats-new/personal-tool-controls-in-workbench/","title":"Personal tool controls in Workbench","meta":"AI in Tines|October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","video":"/assets/pages/stories/whatsnew-personal-tool-controls-video.mp4","relatedHeadings":["More \"AI in Tines\" updates","Other recent updates"],"bodyElementCounts":{"p":2,"ul":0,"li":0,"video":1,"img":0,"words":33}},
    {"route":"/stories/whats-new/claude-haiku-55-is-now-available/","title":"Claude Haiku 5.5 is now available","meta":"AI in Tines|October 16, 2026","icon":"/assets/pages/stories/whatsnew-icon-spot-icon-agents.svg","video":null,"relatedHeadings":["More \"AI in Tines\" updates","Other recent updates"],"bodyElementCounts":{"p":1,"ul":0,"li":0,"video":0,"img":0,"words":48}}
  ],
  "templatesIndex": {
    "route": "/stories/templates/",
    "topProducts": [
      {"name":"Slack","href":"/stories/templates/slack/","icon":"/assets/pages/stories/product-logo-slack.svg"},
      {"name":"VirusTotal","href":"/stories/templates/virustotal/","icon":"/assets/pages/stories/product-logo-virustotal.svg"},
      {"name":"Jira Software","href":"/stories/templates/jira-software/","icon":"/assets/pages/stories/product-logo-jira-software.svg"},
      {"name":"URLScan.io","href":"/stories/templates/urlscan-io/","icon":"/assets/pages/stories/product-logo-urlscan-io.svg"},
      {"name":"Microsoft Graph","href":"/stories/templates/microsoft-graph/","icon":"/assets/pages/stories/product-logo-microsoft-graph.png"},
      {"name":"Pulsedive","href":"/stories/templates/pulsedive/","icon":"/assets/pages/stories/product-logo-pulsedive.svg"},
      {"name":"Gmail","href":"/stories/templates/gmail/","icon":"/assets/pages/stories/product-logo-gmail.svg"},
      {"name":"CrowdStrike","href":"/stories/templates/crowdstrike/","icon":"/assets/pages/stories/product-logo-crowdstrike.svg"},
      {"name":"Google Calendar","href":"/stories/templates/google-calendar/","icon":"/assets/pages/stories/product-logo-google-calendar.svg"},
      {"name":"AbuseIPDB","href":"/stories/templates/abuseipdb/","icon":"/assets/pages/stories/product-logo-abuseipdb.svg"},
      {"name":"GitHub","href":"/stories/templates/github/","icon":"/assets/pages/stories/product-logo-github.svg"},
      {"name":"EmailRep","href":"/stories/templates/emailrep/","icon":"/assets/pages/stories/product-logo-emailrep.png"}
    ],
    "byVendor": [
      {"name":"AWS","href":"/stories/templates/aws/","icon":"/assets/pages/stories/family-logo-aws.svg"},
      {"name":"Cisco","href":"/stories/templates/cisco/","icon":"/assets/pages/stories/family-logo-cisco.svg"},
      {"name":"Google","href":"/stories/templates/google/","icon":"/assets/pages/stories/family-logo-google.svg"},
      {"name":"Microsoft","href":"/stories/templates/microsoft/","icon":"/assets/pages/stories/family-logo-microsoft.svg"},
      {"name":"Atlassian","href":"/stories/templates/atlassian/","icon":"/assets/pages/stories/family-logo-atlassian.svg"},
      {"name":"Palo Alto Networks","href":"/stories/templates/palo-alto-networks/","icon":"/assets/pages/stories/family-logo-palo-alto-networks.svg"},
      {"name":"Splunk","href":"/stories/templates/splunk/","icon":"/assets/pages/stories/family-logo-splunk.svg"},
      {"name":"Proofpoint","href":"/stories/templates/proofpoint/","icon":"/assets/pages/stories/family-logo-proofpoint.svg"},
      {"name":"HashiCorp","href":"/stories/templates/hashicorp/","icon":"/assets/pages/stories/family-logo-hashicorp.svg"}
    ],
    "byCategory": ["Communication and collaboration","Security and threat intelligence","Cloud services and infrastructure","Productivity","Identity and access management","Threat detection and response","Enterprise resource management","Data analytics","Email and messaging security","DevOps"]
  },
  "templateDetails": [
    {"route":"/stories/templates/1password/","title":"1Password × Tines","breadcrumb":"TEMPLATES","heroIcon":"/assets/pages/stories/template-hero-1password.svg","sections":["Full workflow examples","Build your own connections","Connect quickly","Explore more resources"],"storyCards":[{"name":"Suspend users in 1Password from SIEM alerts enriched with an AI agent","tools":"1Password, AbuseIPDB, Tines, VirusTotal","href":"/library/stories/1346340/suspend-users-in-1password-from-siem-alerts-enriched-with-an-ai-agent/"},{"name":"Create credentials that reference 1Password vaults","tools":"1Password","href":"/library/stories/1144246/create-credentials-that-reference-1password-vaults/"}],"relatedCards":[{"label":"BLOG Stay in the know Read now →","href":"/blog/"},{"label":"CASE STUDIES Powerful users, powerful stories Discover how companies - from Fort","href":"/customers/"},{"label":"LEARN University Build your knowledge with dedicated learning paths at all level","href":"/university/"},{"label":"LEARN Learn to use Tines Stories with our docs Read docs →","href":"/stories/docs/quickstart/"}]},
    {"route":"/stories/templates/abuseipdb/","title":"AbuseIPDB × Tines","breadcrumb":"TEMPLATES","heroIcon":"/assets/pages/stories/product-logo-abuseipdb.svg","sections":["Pre-built templates","Build your own connections","Full workflow examples","Connect quickly","Explore more resources"],"storyCards":[{"name":"Lookup IOCs via Slack using an agent","tools":"AbuseIPDB, Slack, URLScan.io, VirusTotal","href":"/library/stories/1347799/lookup-iocs-via-slack-using-an-agent/"},{"name":"Enrich & remediate suspicious logins reported in Okta","tools":"AbuseIPDB, Okta, Slack, VirusTotal","href":"/library/stories/1129115/enrich-remediate-suspicious-logins-reported-in-okta/"},{"name":"Analyze an IP in many services at once","tools":"AbuseIPDB, APIVoid, GreyNoise, Jira Software, Pulsedive, VirusTotal","href":"/library/stories/87626/analyze-an-ip-in-many-services-at-once/"},{"name":"Receive enriched IP information via Slack","tools":"AbuseIPDB, GreyNoise, Slack, VirusTotal","href":"/library/stories/87698/receive-enriched-ip-information-via-slack/"},{"name":"Lookup IOCs in different tools via Slackbot","tools":"Abuse.ch, AbuseIPDB, Anomali ThreatStream, CrowdStrike, Hunter.io, Hybrid Analysis, MetaDefender, Pulsedive, Slack, URLScan.io, VirusTotal","href":"/library/stories/87595/lookup-iocs-in-different-tools-via-slackbot/"},{"name":"Ingest, enrich, and remediate ExtraHop alerts and block suspicious URLs with Zscaler","tools":"AbuseIPDB, Extrahop, Microsoft Teams, URLScan.io, VirusTotal, Zscaler","href":"/library/stories/1194365/ingest-enrich-and-remediate-extrahop-alerts-and-block-suspicious-urls-with-zscaler/"}],"relatedCards":[{"label":"BLOG Stay in the know Read now →","href":"/blog/"},{"label":"CASE STUDIES Powerful users, powerful stories Discover how companies - from Fort","href":"/customers/"},{"label":"LEARN University Build your knowledge with dedicated learning paths at all level","href":"/university/"},{"label":"LEARN Learn to use Tines Stories with our docs Read docs →","href":"/stories/docs/quickstart/"}]}
  ]
}
```

---

## 6. LIBRARY

### 6.1 Index `/library/`. 1440 height 8509, 390 height 12114. Screenshot `library-index-*.png`
- **Shell** (`layout.layoutWithSidebar`): grid `288px 1000px`, gap 72, padding `24px 40px 64px`, max-width 1520. AreaNav reads "Tines Stories › Library".
- **Sidebar** (`LibrarySidebar`): `position:sticky; top:154px`, `transition: top .25s, height .25s`, grid 288, with `padding-left:12px; margin-left:-12px`. Contents:
  - Sidebar search (§2.4), margin-bottom 8.
  - Nav list. Each item is 41 tall, padding `11.55px 14px`, radius 1386, with an 18px icon (`reference/svg/pages/library-sidebar-icons-1..6.svg`) and a label in Roobert 500 14/16.1.
    - The active item "Home" is coloured `#9274f4`.
    - Items: Home; then `<details>` accordions "By team", "By use case", "By feature", "Community"; then "Directory". Each accordion has an 8×5 chevron at opacity .3 (`library-sidebar-chevron.svg`).
    - Hover state could not be captured (the element sat outside the viewport during the probe). Use bg `currentColor/6%`; this is an estimate, not a measurement.
  - **Prompt card** at the bottom:
    - padding 17.5, bg `#ece8fd`, radius 14, hover bg `#ded8ff`;
    - H3 "Submit a story or an idea": Roobert 600 16/18.4;
    - a close × button (18px, opacity .5, `library-close-icon.svg`);
    - P: Roobert 500 14/19.6, max-width 80%, margin-top 7;
    - "Get in touch →": 600, margin-top 14.
- **Hero** (`LibraryDirectoryHero`): 1000×411, bg `#7a56e0` (purple-50), radius 24, overflow hidden, padding `0 55px 0 60px`.
  - Text block (padding `72px 72px 55px 0`):
    - Eyebrow "LIBRARY": mono-label-sm, lightest.
    - H1 "What will you build?": library-hero-h1, margin-top 14.
    - P: Roobert 500 16/20.8, max-width 480, margin-top 14.
  - Right: a 300×300 illustration (`/assets/pages/library/directory-hero-illustration.png`).
  - Bottom-left: **CollectionViewToggle**, folder tabs sitting on the hero's bottom edge:
    - Active "Featured": bg lightest, radius `10.5px 10.5px 0 0`, padding `14px 17.5px`, 15px icon, label Roobert 600 14/16.1 `#6741bf`.
    - Inactive "All stories": bg `rgb(146 117 244 / .5)`, label lightest, plus a count badge "1213" (Roobert 600 12/13.8, padding `2.4px 6px`, bg `rgb(84 47 156 / .5)`, radius 18).
    - Both tabs have 8px concave corner SVGs on each side (`library-hero-tab-corner.svg`), `transition: background-color .15s, color .15s`.
    - "All stories" switches the view to the paginated all-stories grid (`/library/stories/page/N/`, which shares PaginatedListNav).
- **Sections** (`CollectionPageView`), each with margin-top 96:
  1. **Featured stories**: section header (padding `0 40px 40px 0`, H2 section-h2-sans) + grid 2 × 485, gap 30, holding 2 `StoryCard lg`.
  2. **StoryEmbed** (featured story, orange theme):
     - Card: grid `288px 654px`, gap 24, padding 16, bg `rgb(209 92 8 / .15)`, border same, radius ~24, with a dot layer.
     - Header: grid, padding 16, gap 24.
       - Icon array: 58 circles with padding 12 and bg lightest/.5, gap 8.
       - Title: embed-title, `#9d3e00`.
       - Description: Roobert 500 16/21.6, margin-top 16, about 40 words.
       - "TOOLS" H4 (mono 600 12/13.8, ls .36, opacity .6) + tool links (Roobert 500 14/19.6, hover underline).
       - "IMPORT" filled mono `#f47e3f`.
     - Right side: a live embedded story canvas `<iframe src="https://library.tines.com/embedded_stories/<id>">` with an overlay hint ("Drag to pan around. Use + / − to control zoom level." in Roobert 500 14/19.6 lightest, `<kbd>` mono 700 10.5/14.7).
  3. **How it works** card:
     - grid `492px 358px`, gap 40, padding 55, bg `rgb(205 61 139 / .2)`, colour `#8a1f57`, radius 24.
     - H2: Reckless 30/39 −.6. P: Roobert 500 16/22.4, max-width 448.
     - Steps: grid 3 × 98, gap 32. Each step is a 97px SVG (`library-howitworks-steps-{1,2,3}.svg`) with a label "Explore" / "Import" / "Adapt" in Roobert 700 16/20.8.
  4. **Teams** ("TEAMS" eyebrow pill: mono 700 11.5/13.225, ls .575, padding `6.9px 11.5px`, bg `#ded8ff`, radius 23):
     - H2 "See what your team can build with Tines".
     - Grid 5 × 180.8, gap 24. Each `teamCard` is grid gap 16, padding 16, radius 14. Its image wrap has padding 16, radius 12, aspect 1:1, and holds a 117×135 image.
     - Bg pairs (card/wrap): Security `#ece8fd`/`#ded8ff`, IT operations `#ffe1c4`/`#ffcea6`, Engineering `#e4eee7`/`#cae4d4`, Product `#ffdeee`/`#ffc7e5`, Infrastructure `#ece8fd`/`#ded8ff`.
     - Labels: Roobert 600 16/18.4 in the theme text colour.
  5. **Use cases** ("USE CASES" pill): H2 + grid 2 × 488, gap 24, 6 rich cards, each 250 tall.
     - Card: padding 40, radius 14, text lightest. Title: Reckless 28/32.2 −.56. "View stories →" link. Image on the right.
     - Bgs: `#cd3d8b`, `#008b53`, `#d13936`, magenta, green, `#7a56e0` (see sample data).
  6. **Latest stories** ("FRESHLY BAKED" pill in pink `#ffc7e5`/`#9c2464`): H2 + "See more →" (Roobert 600 16/22.4, `#cd3d8b`) + grid 2 × 485 of 9 StoryCards (with "By <author>").
  7. **Partners**: H2 "Build smart outcomes with *these partners*" (the `em` keeps 600; it is not italic-styled), "All tools →", and a 90px SVG on the right (`library-tools-section-icon`, not captured).
     - Grid 5 × 181 squares. `LibraryToolCard`: grid gap 16, padding 24, radius 14, bg `rgb(122 86 224 / .08)`, text `#542f9c`, 48 logo, label Roobert 600 16/20.8.
     - Hover: border `rgb(84 47 156 / .3)` + brightness 1.03.
  8. **From our community** ("COMMUNITY SELECTION" pill): StoryCards.
  9. **Submit your story** (`SubmitStoryCtaPageSection`):
     - flex, gap 24, padding 55, border `1px dashed #c3b5ff`, radius 24.
     - H2: Reckless 30/34.5 −.6, margin-bottom 15. P: Roobert 500 16/20.8, max-width 480, margin-bottom 32.
     - "GET IN TOUCH" filled mono `#8d75e6`. A 92px SVG on the right (`library-submit-story-icon.svg`).
- **No bottom CTA** on the library. The Footer follows directly.

**390:**
- The sidebar collapses to a top bar with a menu toggle (`mobileToggle`; drawer not opened during measurement).
- Hero H1 30/30.6.
- Grids: Featured 1 column (gap 18), Teams 2 × 169, Use cases 1 column, Tools 2 × 169.
- StoryEmbed header becomes 1 column (316).

### 6.2 Story detail `/library/stories/<id>/<slug>/`. Samples: `1354837/contain-or-release-hosts-in-crowdstrike-from-jira`, `1359340/request-and-approve-slack-posts-to-a-restricted-channel`. Both use the same template (module set `LibrarySidebar, LibraryStoryRequestPromptCard, StoryEmbed, VotingBanner`). The sidebar is not rendered at 1440: the embed spans the full 1360 width.
- **StoryEmbed full:** 1360×812, grid `288px 1014px`, gap 24, padding 16, bg `rgb(122 86 224 / .15)`, dot layer `#9274f4`.
- **Left header:**
  - Icon array (3 × 58).
  - H3 title: embed-title, purple-65.
  - Description: about 45 words.
  - "TOOLS" + linked tool names.
  - "COMMUNITY AUTHOR" or "CREATED BY" + name (Roobert 600 14).
  - "How it works" card: lavender, title 600, short text, full-width "IMPORT" filled mono `#8d75e6`.
  - `VotingBanner`: padding `7px 17.5px`, bg `rgb(209 199 255 / .8)`. "Was this story helpful?" in Roobert 500 14/16.1, followed by 👍/👎 icon buttons (31×31, radius 7, hover colour `#9274f4`; `library-vote-icons-1/2.svg`).
- **Right:** the embedded story canvas iframe (`library.tines.com/embedded_stories/<hash>`) with an expand button (top-right, 32px dark circle). **The iframe content is a third-party canvas: not reproducible. Use a static screenshot crop or a neutral dotted placeholder.**
- No related items and no CTA. Footer.
- 390: stacked 1 column. Embed height ≈1047 (header 558).

### 6.3 Library sample data
```json
{
  "index": {
    "route": "/library/",
    "sidebarNav": ["Home","By team","By use case","By feature","Community","Directory"],
    "sections": ["Featured stories","How it works","See what your team can build with Tines","Get inspired by our featured use cases","Latest stories","Build smart outcomes with these partners","From our community","Submit your story"],
    "heroImage": "/assets/pages/library/directory-hero-illustration.svg",
    "storyCards": [
      {"name":"Monitor and deactivate long-lasting AWS IAM keys","tools":"AWS","author":null,"href":"/library/stories/1165570/monitor-and-deactivate-long-lasting-aws-iam-keys/","theme":"#008b53/0.1","icons":["/assets/pages/library/tool-aws.svg","/assets/pages/library/story-icon-1f511.png","/assets/pages/library/story-icon-26a0-fe0f.png"]},
      {"name":"Download Code42 Cases","tools":"Code42, Jira Software","author":null,"href":"/library/stories/87634/download-code42-cases/","theme":"#7a56e0 (purple50)/0.1","icons":["/assets/pages/library/story-icon-1f6a8.png","/assets/pages/library/story-icon-1f4be.png","/assets/pages/library/story-icon-1f4eb.png"]},
      {"name":"Contain or release hosts in CrowdStrike from Jira","tools":"CrowdStrike, Jira Software","author":"Cody Mood","href":"/library/stories/1354837/contain-or-release-hosts-in-crowdstrike-from-jira/","theme":"#7a56e0 (purple50)/0.1","icons":["/assets/pages/library/tool-crowdstrike.svg","/assets/pages/library/story-icon-logo-jira.svg","/assets/pages/library/story-icon-1f512.png"]},
      {"name":"Request and approve Slack posts to a restricted channel","tools":"Slack","author":null,"href":"/library/stories/1359340/request-and-approve-slack-posts-to-a-restricted-channel/","theme":"#7a56e0 (purple50)/0.1","icons":["/assets/pages/library/story-icon-logo-slack.svg","/assets/pages/library/story-icon-1f4e2.png","/assets/pages/library/story-icon-2705.png"]},
      {"name":"Sync Insider Threat Matrix records and attach to Cases","tools":null,"author":null,"href":"/library/stories/1359513/sync-insider-threat-matrix-records-and-attach-to-cases/","theme":"#d15c08 (orange50)/0.1","icons":["/assets/pages/library/story-icon-logo-tines.svg","/assets/pages/library/story-icon-1f512.png","/assets/pages/library/story-icon-1f517.png"]},
      {"name":"Lookup IOCs via Slack using an agent","tools":"AbuseIPDB, Slack, URLScan.io, VirusTotal","author":null,"href":"/library/stories/1347799/lookup-iocs-via-slack-using-an-agent/","theme":"#7a56e0 (purple50)/0.1","icons":["/assets/pages/library/story-icon-1f928.png","/assets/pages/library/story-icon-logo-virustotal.svg","/assets/pages/library/story-icon-logo-slack.svg"]},
      {"name":"Extract certificate chain and upload to custom CA in Tines","tools":null,"author":null,"href":"/library/stories/1347198/extract-certificate-chain-and-upload-to-custom-ca-in-tines/","theme":"#d15c08 (orange50)/0.1","icons":["/assets/pages/library/story-icon-logo-tines.svg","/assets/pages/library/story-icon-1f6e1-fe0f.png","/assets/pages/library/story-icon-fe0f.png"]},
      {"name":"Detect deepfakes with Reality Defender and triage in Jira","tools":"EmailRep, Reality Defender, Slack, Twilio","author":null,"href":"/library/stories/1346866/detect-deepfakes-with-reality-defender-and-triage-in-jira/","theme":"#008b53/0.1","icons":["/assets/pages/library/story-icon-emailrep.png","/assets/pages/library/story-icon-logo-slack.svg","/assets/pages/library/story-icon-logo-jira.svg"]},
      {"name":"Generate a branching text adventure using the AI Agent action","tools":null,"author":null,"href":"/library/stories/1346522/generate-a-branching-text-adventure-using-the-ai-agent-action/","theme":"#008b53/0.1","icons":["/assets/pages/library/story-icon-logo-tines.svg","/assets/pages/library/story-icon-1f3ae.png","/assets/pages/library/story-icon-1f4fa.png"]}
    ],
    "teams": [
      {"name":"Security","image":"/assets/pages/library/team-security.svg"},
      {"name":"IT operations","image":"/assets/pages/library/team-it-operations.svg"},
      {"name":"Engineering","image":"/assets/pages/library/team-engineering.svg"},
      {"name":"Product","image":"/assets/pages/library/team-product.svg"},
      {"name":"Infrastructure","image":"/assets/pages/library/team-infrastructure.svg"}
    ],
    "useCases": [
      {"name":"Asset and app management","image":"/assets/pages/library/usecase-asset-and-app-management.svg","bg":"#cd3d8b (pink50)"},
      {"name":"Employee lifecycle management","image":"/assets/pages/library/usecase-employee-lifecycle-management.svg","bg":"#008b53"},
      {"name":"Incidents and alerts","image":"/assets/pages/library/usecase-incidents-and-alerts.svg","bg":"#d13936 (red50)"},
      {"name":"Communication","image":"/assets/pages/library/usecase-communication.svg","bg":"#cd3d8b (pink50)"},
      {"name":"Ticket synchronization","image":"/assets/pages/library/usecase-ticket-synchronization.svg","bg":"#008b53"},
      {"name":"Core capabilities","image":"/assets/pages/library/usecase-core-capabilities.svg","bg":"#7a56e0 (purple50)"}
    ],
    "tools": [
      {"name":"AWS","logo":"/assets/pages/library/tool-aws.svg"},
      {"name":"Code42","logo":"/assets/pages/library/tool-code42.svg"},
      {"name":"CrowdStrike","logo":"/assets/pages/library/tool-crowdstrike.svg"},
      {"name":"Elastic","logo":"/assets/pages/library/tool-elastic.svg"},
      {"name":"Drata","logo":"/assets/pages/library/tool-drata.svg"},
      {"name":"HashiCorp","logo":"/assets/pages/library/tool-hashicorp.svg"},
      {"name":"Lacework","logo":"/assets/pages/library/tool-lacework.svg"},
      {"name":"Material Security","logo":"/assets/pages/library/tool-material-security.svg"},
      {"name":"Panther","logo":"/assets/pages/library/tool-panther.svg"},
      {"name":"Recorded Future","logo":"/assets/pages/library/tool-recorded-future.svg"},
      {"name":"Snowflake","logo":"/assets/pages/library/tool-snowflake.svg"},
      {"name":"Wiz","logo":"/assets/pages/library/tool-wiz.svg"}
    ],
    "allStoriesCount": 1213
  },
  "details": [
    {"route":"/library/stories/1354837/contain-or-release-hosts-in-crowdstrike-from-jira/","title":"Contain or release hosts in CrowdStrike from Jira","tools":["CrowdStrike","Jira Software"],"author":"COMMUNITY AUTHOR Cody Mood","icons":["/assets/pages/library/tool-crowdstrike.svg","/assets/pages/library/story-icon-logo-jira.svg","/assets/pages/library/story-icon-1f512.png"],"embedIframe":"https://library.tines.com/embedded_stories/a661fa987246f7d2f25d0eb9ac9e0f6d"},
    {"route":"/library/stories/1359340/request-and-approve-slack-posts-to-a-restricted-channel/","title":"Request and approve Slack posts to a restricted channel","tools":["Slack"],"author":"CREATED BY Audrey Kwong","icons":["/assets/pages/library/story-icon-logo-slack.svg","/assets/pages/library/story-icon-1f4e2.png","/assets/pages/library/story-icon-2705.png"],"embedIframe":"https://library.tines.com/embedded_stories/17ce09566d611608e95e9631ad4e458d"}
  ]
}
```

---

## 7. UNIVERSITY (Gatsby stack)

### 7.1 Index `/university/`. 1440 height 5272, 390 height 7585. Screenshot `university-index-*.png`
1. **Hero card** (section padding `0 40px`): 1360×362, border `1px solid #aa94ff`, radius 12.
   - Grid-paper background: `url("data:image/svg+xml,…24×24 lines, stroke #8d75e6, opacity .1")`.
   - A 168×104 university icon overlaps the top edge (`margin-top:-58px`; `/assets/pages/university/university-hero-icon.svg`).
   - Content (padding `60px 16px`):
     - H1: display-lg (64/64 −1.92), margin-bottom 32.
     - P: Roobert 500 16/22.4, max-width 700.
   - Bottom strip, 53 tall: a **testimonial marquee**, bg `#ece8fd`, border-top `1px solid #aa94ff`, radius `0 0 12px 12px`.
     - Items: emoji (22px, padding 11) + a quote in Roobert 600 16. Write 4 placeholder testimonials.
     - The track is duplicated twice (2 × 2909.5px) and moves via JS `translateX` at **−54.2 px/s** (continuous, linear).
   - A circular "WATCH INTRO" badge (≈120px, rotating text ring, play icon) overlaps the left edge at y≈700. Not captured as SVG; take it from the screenshot.
2. **Divider title** "What are you looking to learn?": grid `1fr auto 1fr`, gap 22. The lines are 1px `#aa94ff`; the label is Reckless 700 22/30.8 −.22.
3. **Learning paths:** row 1 is a grid of 2 × 544 with gap 64/40; the remaining rows are 3 × 349.33 with gap 64/40. 10 cards.
   - Card: bg lightest, radius 12, colour = course theme.
   - Inner border: 1px, colour varies per course (`#aa94ff`, `#84a9f1`, `#ff8e46`, `#f6a400`, `#2ac4bc`, `#50bc8c`).
   - A 168×104 course icon sits on top (the top 48px of the card), translated −21.84px.
   - Body: padding `36px 24px 16px`, with the grid-paper background.
     - H3: course-card-title, centred, margin-bottom 14.
     - Excerpt: Roobert 500 16/22.4, max-width 400, centred, margin-bottom 14 (about 18 words).
     - Meta: mono-meta, e.g. "6 MODULES • 2.5 HOURS".
     - Footer row (margin-top 32): module dots (28px circles with tint bg + border, gap 8) plus a "+3" overflow dot (Roobert 600 14/19.6, `#7a56e0`).
     - Row-1 cards also have a 58px arrow circle (tint bg, 1px theme border, 22×18 arrow, `university-card-arrow.svg`).
4. **Resources:** 3 full-width rows (1128 × 107): Library / Docs / Slack Community. Each has an illustration icon, an H3 in Reckless 700 22/30.8 −.44, and an ↗ arrow. The rows are separated by 1px dividers.
5. **Programs:** 2 × 552, gap 24, cards 314 tall. Green ("FOR BEGINNERS" / Bootcamps) and purple ("FOR PROS" / Certifications), both with the grid paper and an overlapping top illustration.
   - Eyebrow: mono-meta. H3: Reckless 38/38 −.76. P: Roobert 600 16/22.4.
6. ExplosionCta, then Footer.
- 390: H1 38/38. All grids are 1 column; the programs grid has gap 80.

### 7.2 Course (learning path) detail `/university/<course>/`. Samples: `tines-stories-foundations`, `builder-core` (same template; 11 courses)
- **Hero card:** 1360×682, bg lightest, border `#aa94ff`, radius 12, grid paper, padding `50px 96px 160px`.
  - A course scene illustration overlaps the top edge (`/assets/pages/university/scene-<course>.svg`).
  - Kicker "LEARNING PATH": mono-meta in the course colour.
  - H1: course-h1 in the course colour (Foundations `#00693b`), max-width 476, centred.
  - Thin divider lines.
  - Two CTAs: "Sign in to your tenant ↗" (text link) and "Start learning →" (course-tinted pill, 160×44).
- **Modules card:** overlaps the hero bottom by ~60px. White card, 1128 wide, border `#aa94ff`, radius 12, holding a 4-column grid of module tiles:
  - 72px icon circle (`module-large-*.svg`);
  - H2: Roobert 600 16/normal, −.16;
  - `<time>` "15 minutes": Roobert 500 16, opacity .7;
  - hover colour `#7a56e0`;
  - the last tile is "Exam" (`reference/svg/pages/university-exam-icon.svg`).
- Then ExplosionCta.
- 390: H1 50/45. The module grid is 2 columns.

### 7.3 Lesson `/university/<course>/<module>/<lesson>/` (341 URLs). Sample: `…/introduction-to-tines-stories/what-are-intelligent-workflows/`
- **Left aside:** 288, sticky, `transition: top .25s`, overflow auto.
  - Path card (grid paper, padding 16): "LEARNING PATH" (mono 700 11.5, green); course title (Reckless 24/33.6 −.24); "Module 1 / 6" (Roobert 600 14/19.6); a scene image.
  - Module header: 48 icon + "MODULE" (mono 900 12/16.8 ls .6, `#6741bf`) + title (Roobert 600 16).
  - Lesson links: 35 tall, padding `5.25px 12.6px`, radius 7. The active one is `#008b53`, weight 600, with an 18px status dot (bg `#cae4d4`, border `#91d1af`).
- **Content** (x=421, 660 wide):
  - H1: lesson-h1, padding-bottom 40.
  - Prose: Roobert 16/26. `p + p` margin 16. h2 is Reckless 28/35 with margin-top 28 and a hover anchor (22px icon). `ul` padding-left 40, `li + li` margin 8.
  - Callout "💡 Note": bg `rgb(141 117 230 / .125)`, radius 14, padding `10.56px 20px 16px`, title Roobert 600 16/26 `#8d75e6`.
  - Counts: 11 `p`, 3 `h2`, 2 `ul` (6 `li`), 1 callout. About 410 words.
- 390: the aside becomes an off-canvas drawer (`position:fixed; transform:translateX(-390px)`, 326 wide).

### 7.4 University sample data
```json
{
  "index": {
    "route": "/university/",
    "courses": [
      {"name":"Tines Stories Foundations","meta":"6 MODULES • 2.5 HOURS","href":"/university/tines-stories-foundations/","icon":"/assets/pages/university/course-icon-tines-stories-foundations.svg","textColor":"#00693b"},
      {"name":"Platform Administrator","meta":"6 MODULES • 3 HOURS","href":"/university/platform-administrator/","icon":"/assets/pages/university/course-icon-platform-administrator.svg","textColor":"#5d38ae (purple65)"},
      {"name":"Builder: Core","meta":"4 MODULES • 1.5 HOURS","href":"/university/builder-core/","icon":"/assets/pages/university/course-icon-builder-core.svg","textColor":"#576700"},
      {"name":"Builder: Intermediate","meta":"4 MODULES • 2 HOURS","href":"/university/builder-intermediate/","icon":"/assets/pages/university/course-icon-builder-intermediate.svg","textColor":"#006d6d"},
      {"name":"Builder: Expert","meta":"4 MODULES • 2 HOURS","href":"/university/builder-expert/","icon":"/assets/pages/university/course-icon-builder-expert.svg","textColor":"#5d38ae (purple65)"},
      {"name":"Builder: AI","meta":"6 MODULES • 3 HOURS","href":"/university/builder-ai/","icon":"/assets/pages/university/course-icon-builder-ai.svg","textColor":"#5d38ae (purple65)"},
      {"name":"Specialist: Cases","meta":"6 MODULES • 2.5 HOURS","href":"/university/specialist-cases/","icon":"/assets/pages/university/course-icon-specialist-cases.svg","textColor":"#234db2"},
      {"name":"Specialist: Records","meta":"6 MODULES • 2.5 HOURS","href":"/university/specialist-records/","icon":"/assets/pages/university/course-icon-specialist-records.svg","textColor":"#234db2"},
      {"name":"Specialist: Workbench","meta":"5 MODULES • 2 HOURS","href":"/university/specialist-workbench/","icon":"/assets/pages/university/course-icon-specialist-workbench.svg","textColor":"#5d38ae (purple65)"},
      {"name":"Specialist: Apps","meta":"6 MODULES • 2.5 HOURS","href":"/university/specialist-apps/","icon":"/assets/pages/university/course-icon-specialist-apps.svg","textColor":"#00693b"}
    ],
    "resources": ["Library","Docs","Slack Community"],
    "programs": ["Bootcamps","Certifications"]
  },
  "details": [
    {"route":"/university/tines-stories-foundations/","kicker":"LEARNING PATH","title":"Tines Stories Foundations","scene":"/assets/pages/university/scene-tines-stories-foundations.svg","modules":[{"name":"Introduction to Tines Stories","duration":"15 minutes","icon":"/assets/pages/university/module-large-introduction-to-tines-stories.svg","href":"/university/tines-stories-foundations/introduction-to-tines-stories/"},{"name":"Core UI navigation","duration":"15 minutes","icon":"/assets/pages/university/module-large-core-ui-navigation.svg","href":"/university/tines-stories-foundations/core-ui-navigation/"},{"name":"Stories","duration":"15 minutes","icon":"/assets/pages/university/module-large-stories.svg","href":"/university/tines-stories-foundations/stories/"},{"name":"Actions","duration":"30 minutes","icon":"/assets/pages/university/module-large-actions.svg","href":"/university/tines-stories-foundations/actions/"},{"name":"JSON and API","duration":"30 minutes","icon":"/assets/pages/university/module-large-json-and-api.svg","href":"/university/tines-stories-foundations/json-and-api/"},{"name":"Events","duration":"30 minutes","icon":"/assets/pages/university/module-large-events.svg","href":"/university/tines-stories-foundations/events/"},{"name":"Exam","duration":null,"icon":"reference/svg/pages/university-exam-icon.svg","href":"/university/tines-stories-foundations/exam/"}],"ctas":["Sign in to your tenant ↗","Start learning →"]},
    {"route":"/university/builder-core/","kicker":"LEARNING PATH","title":"Builder: Core","scene":"/assets/pages/university/scene-builder-core.svg","modules":[{"name":"Story design","duration":"15 minutes","icon":"/assets/pages/university/module-large-story-design.svg","href":"/university/builder-core/story-design/"},{"name":"Resources","duration":"15 minutes","icon":"/assets/pages/university/module-large-resources.svg","href":"/university/builder-core/resources/"},{"name":"Credentials","duration":"15 minutes","icon":"/assets/pages/university/module-large-credentials.svg","href":"/university/builder-core/credentials/"},{"name":"Introduction to functions","duration":"30 minutes","icon":"/assets/pages/university/module-large-introduction-to-functions.svg","href":"/university/builder-core/introduction-to-functions/"},{"name":"Exam","duration":null,"icon":"reference/svg/pages/university-exam-icon.svg","href":"/university/builder-core/exam/"}],"ctas":["Sign in to your tenant ↗","Start learning →"]}
  ],
  "lesson": {
    "route": "/university/tines-stories-foundations/introduction-to-tines-stories/what-are-intelligent-workflows/",
    "title": "What are intelligent workflows?",
    "sidebar": ["LEARNING PATH Tines Stories Foundations Module 1 / 6","MODULE Introduction to Tines Stories","What are intelligent workflows?","Meet Tines Stories","Identify intelligent workflow opportunities","Building blocks of intelligent workflows","Tines Stories resources","Knowledge check","Key takeaways"],
    "bodyElementCounts": {
      "p": 11,
      "h2": 3,
      "ul": 2,
      "li": 6,
      "callouts": 1,
      "img": 0,
      "video": 0,
      "words": 412
    }
  }
}
```

---

## 8. EVENTS

### 8.1 Index `/events/`. 1440 height 5099, 390 height 10459. Screenshot `events-index-*.png`
- Page foreground is `#542f9c` (purple-70) and the accent is `#7a56e0`.
1. **EventsWorldMap:** 1360×450, radius 12, margin-bottom 40, bg `rgb(84 47 156 / .06)`. **A live Google Maps JS map with event markers. Not reproducible offline: render a static tinted placeholder or a screenshot crop from `events-index-1440.png`.**
2. **EventsDirectory:** flex column, gap 32.
   - Control bar: flex, space-between. Left: H1 "Upcoming events" (Reckless 32/35.2 −.64). Right: SegmentedTabs "All events" | "Virtual" + joined search (§2.4).
   - Grid: **4 × 322, gap 48 / 24**. 23 cards; no pagination.
   - `EventDirectoryCard`: grid, radius 12, overflow hidden, border 1px, bg = theme soft (§2.10), `transition: border-color .2s`, hover border = the theme's hover border (e.g. orange `#ff8e46`, purple `#aa94ff`).
     - Inner: flex column, gap 10.5, padding 21.
       - Top row (space-between): date pill(s), then the type pill.
         - Date pill: mono-pill, padding `3.85px 7.7px`, radius 990, bg = theme dark, text = theme soft.
         - Ranges render two pills joined by a 20px arrow circle (bg = theme border, `events-date-arrow.svg`).
         - Type pill: bg = theme 12% alpha, text = theme 70.
       - Title: event-card-title, theme dark.
       - Location: 18px pin (`events-location-icon.svg`) + Roobert 600 14/19.6, `margin-left:-2.8px`.
     - Figure: `aspect-ratio:1200/630`, border-top 1px theme border, `img object-fit:cover`.
3. NewsletterSection: H2 "Can't make it this time?" in `#542f9c`, plus a description.
4. `CtaStartToday`, then Footer.
- 390: grid 1 column (gap 48/24). Title 16/18.4.

### 8.2 Event detail `/events/<slug>/`. Samples: `cribl-connect-munich`, `black-hat-eu-2026` (same template; the second adds a "You can also join us at" related row)
- `page.page`: padding `0 40px`. The columns card: bg `#f5f2fb`, border `1px solid #ded8ff`, radius 20, padding 40, single column. The main column is max-width 936, centred, flex column, gap 32.
  - Cover: 936×491, radius 16 (1200/630).
  - Header row (flex, gap 32):
    - H1: event-h1 (in the theme text colour; Black Hat is green `#00693b`).
    - Excerpt: Roobert 500 18/25.2 at 75% alpha.
    - CTA, right-aligned: 260×50, wrapped in **AngularGradientBorder**, an SVG conic-gradient border (`events-angular-gradient-border.svg`). Text "Register on cribl.io ↗" in Roobert 600 14 lightest on a filled pill.
  - Details `<dl>`: grid 3 × 304, gap 12, margin `16px 0`.
    - Rows: flex column, gap 6, padding `14px 16px`, bg `#ece8fd`, border `#ded8ff`, radius 10.
    - `<dt>`: mono-dt `#542f9c` (DATE / TIME / LOCATION). `<dd>`: Roobert 600 16/18.4.
  - Article body: max-width 680, Roobert 16/26. Empty on both samples.
  - `EventLocationMap`:
    - Header row: address (Roobert 400 15/17.25, 3 lines) and "Open in Google Maps ↗" (Roobert 500 14/16.1, `#542f9c`, hover underline).
    - A 16:9 iframe (`maps.google.com/maps?q=…&output=embed`, radius 12, border `rgb(93 56 174 / .14)`). **Third-party: use a static placeholder.**
  - (Optional) related: H2 "You can also join us at" (Roobert 16/19.2) + EventDirectoryCard(s), 456 wide.
- NewsletterSection, `CtaStartToday`, Footer.
- 390: card padding 24, details 1 column.

### 8.3 Events sample data
```json
{
  "index": {
    "route": "/events/",
    "tabs": ["All events","Virtual"],
    "total": 23,
    "cards": [
      {"title":"Chicago Bears Tailgate","dates":["NOV 8"],"type":"EVENT","location":"Chicago, IL","image":"/assets/pages/events/event-chicago-bears-tailgate.png","href":"/events/chicago-bears-tailgate/","themeBg":"#ffe1c4"},
      {"title":"Tines at Gartner IT Symposium","dates":["OCT 19","OCT 22"],"type":"CONFERENCE","location":"Orlando, FL","image":"/assets/pages/events/event-meet-tines-at-gartner-it-symposium.png","href":"/events/meet-tines-at-gartner-it-symposium/","themeBg":"#ddf1ed (teal5)"},
      {"title":"IT’s a Wrap: After Hours at the Lake with Tony Hawk","dates":["OCT 19"],"type":"TINES EXPERIENCE","location":"Lake Buena Vista, FL","image":"/assets/pages/events/event-its-a-wrap-after-hours-at-the-lake-with-tines.png","href":"/events/its-a-wrap-after-hours-at-the-lake-with-tines/","themeBg":"#e7ecf5 (blue5)"},
      {"title":"TechEx Europe","dates":["OCT 20"],"type":"EVENT","location":"Amsterdam, Netherlands","image":"/assets/pages/events/event-techex-europe.png","href":"/events/techex-europe/","themeBg":"#e7ecf5 (blue5)"},
      {"title":"Tines + AWS GameDay 🦄","dates":["OCT 27"],"type":"EVENT","location":"Sydney, New South Wales, Australia","image":"/assets/pages/events/event-aws-gameday-sydney-2026.png","href":"/events/aws-gameday-sydney-2026/","themeBg":"#ffe1c4"},
      {"title":"IT-SA Germany","dates":["OCT 27","OCT 29"],"type":"EVENT","location":"Nuremberg, Germany","image":"/assets/pages/events/event-it-sa-germany.png","href":"/events/it-sa-germany/","themeBg":"#ffe1c4"},
      {"title":"Cribl Connect Netherlands","dates":["OCT 28"],"type":"EVENT","location":"Utrecht, Netherlands","image":"/assets/pages/events/event-cribl-connect-netherlands.png","href":"/events/cribl-connect-netherlands/","themeBg":"#ece8fd (purple5)"},
      {"title":"Builder Connect New York","dates":["OCT 29"],"type":"EVENT","location":"New York City, NY","image":"/assets/pages/events/event-builder-connect-new-york.png","href":"/events/builder-connect-new-york/","themeBg":"#ffdeee"},
      {"title":"Fal.Con Europe 2026","dates":["NOV 3","NOV 4"],"type":"PARTNER EVENT","location":"Barcelona, Spain","image":"/assets/pages/events/event-falcon-eu-2026.png","href":"/events/falcon-eu-2026/","themeBg":"#e4eee7 (green5)"}
    ]
  },
  "details": [
    {"route":"/events/cribl-connect-munich/","title":"Cribl Connect Munich","cover":"/assets/pages/events/cover-cribl-connect-munich.png","cta":"Register on cribl.io ↗","details":["DATE November 26, 2026","TIME 11:45 AM Germany Time","LOCATION SOFITEL MUNICH BAYERPOST Bayerstrasse 12 80335 , Munich, Germany"],"address":"SOFITEL MUNICH BAYERPOST Bayerstrasse 12 80335 Munich Germany","related":[],"themeText":"#5d38ae (purple65)"},
    {"route":"/events/black-hat-eu-2026/","title":"Black Hat EU 2026","cover":"/assets/pages/events/cover-black-hat-eu-2026.png","cta":"Register on blackhat.com ↗","details":["DATE December 9–10, 2026","LOCATION ExCel , London, UK"],"address":"ExCel London UK","related":["Book a meeting with Tines at Black Hat EU 2026"],"themeText":"#00693b"}
  ]
}
```

---

## 9. WEBINARS (Gatsby stack)

### 9.1 Index `/webinars/`. 1440 height 14231 (all 72 webinars on one page), 390 height 29199. Screenshot `webinars-index-*.png`
- AreaNav (Events pill, "Webinars" current). `SidebarLayout`: grid `288px 1000px`, gap 72, padding `32px 40px 0`.
- **Sidebar:** sticky, top 100, padding `0 48px 40px 0`.
  - 150px spot illustration at (−12, −12) (`/assets/pages/webinars/sidebar-spot-illustration-webinar.png`).
  - H1 "Webinars": Reckless 36 −.36, margin-top 24.
  - Sidebar search (§2.4), which filters the list client-side.
  - P: Roobert 500 16/22.4.
- **Main:**
  - **Featured upcoming** card, 1000 wide: grid, gap 28.8, padding 32, bg `#ece8fd`, border `1px solid #ded8ff`.
    - Pills: date ("NOV 5": bg `#542f9c`, text `#ece8fd`) and time ("9:30 PM <Local> Time": bg `#d1c7ff`, text `#542f9c`). Both are mono 700 12/12, ls .24, padding `7.2px 12px`, radius 24.
    - H3: webinar-feature-title, max-width 588.
    - Description: Roobert 500 14/19.6, max-width 448, about 40 words.
    - Speakers row: 64px avatars.
  - H2 "Watch on-demand": Reckless 24.
  - Grid: 3 × 317.33, gap 55/24, 71 cards.
    - Card: padding 32, gap 28.8, theme bg (purple-5 / green-5 `#e4eee7` with border `#cae4d4` / pink `#ffdeee`). The dark date pill is the theme dark (`#005d35` for green).
    - H3: webinar-card-title, theme text.
    - Speakers: 28px avatars, stacked with margin-top 12.
- **The time pill shows the visitor's local timezone** (headless Chromium reported "Calcutta Time"). Build should format with `Intl.DateTimeFormat`.
- No pagination, no category filters. Footer follows directly (no ExplosionCta on this page).
- 390: 1 column, H3 24/27.6.

### 9.2 Webinar detail `/webinars/<slug>/`. Samples: `secure-ai-for-the-real-world`, `the-50k-per-hour-network-downtime-dilemma` (same template)
- Two columns: main 704 (x 156) and sidebar 360 (x 924), gap 64.
- **Main:**
  - H1: article-h1 (54/59.4 −.81).
  - **WebinarVideoAccessForm**: padding 40, bg `#3f2374`, text lightest, `transition: opacity .3s`. The form gates the recording.
    - 150px icon SVG (`webinars-access-form-icon.svg`).
    - H3 "Register for this on-demand webinar": Roobert 600 18.72.
    - P "You'll be able to watch instantly.": 16/22.4.
    - Fields: a 2×2 fieldset, margin `32px 0`, inputs 42 tall, padding `0 14px`, bg `#3f2374`, border `1px solid #542f9c`. Placeholders: "First name *", "Last name *", "Email *", "Company *".
    - Two checkbox rows: 18px boxes with radius 20%. On: bg `#8665eb`, border `#714bd0`. Off: bg `#f5f2fb`, border `#d1c7ff`. Labels are Roobert 500 14/17.5; the privacy link is `#714bd0` underlined `#ded8ff`.
    - "Watch now": `.btn-sans` filled `#8d75e6`.
  - Description below: 7–8 paragraphs, about 100–130 words.
- **Sidebar:** sticky, top 68. H3 "Speakers" (Roobert 600 18.72) + PersonInfo 48 list (gap 16), 3–4 speakers.
- "Missed this webinar?": H2 Reckless 300 38 −.57 (390: 26) + NewsletterSection-style block (Gatsby markup, same visuals).
- Footer.
- 390: 1 column. The form fieldset stays 2 columns.

### 9.3 Webinars sample data
```json
{
  "index": {
    "route": "/webinars/",
    "total": 72,
    "cards": [
      {"title":"How we built a custom AI SOC in 23 minutes, and how you can too","date":"NOV 5","time":"9:30 PM","variant":"featured-upcoming","speakers":["Tim Bandos"],"speakerPhotos":["/assets/pages/webinars/speaker-tim-bandos.jpg"],"href":"/webinars/how-we-built-a-custom-ai-soc-in-23-minutes-and-how-you-can-too/","themeBg":"#ece8fd (purple5)"},
      {"title":"Governing at the speed of AI: What IT leaders need to know","date":"OCT 6","time":"8:30 PM","variant":"on-demand","speakers":["Colin Bentley","Mark Moccia"],"speakerPhotos":["/assets/pages/webinars/speaker-colin-bentley.jpg","/assets/pages/webinars/speaker-mark-moccia.jpg"],"href":"/webinars/governing-at-the-speed-of-ai-what-it-leaders-need-to-know/","themeBg":"#e4eee7 (green5)"},
      {"title":"The AI-powered GRC team: Scaling compliance, not complexity","date":"SEP 22","time":"7:30 PM","variant":"on-demand","speakers":["Stephen Creedon","Niall Heffernan","Ayoub Fandi"],"speakerPhotos":["/assets/pages/webinars/speaker-stephen-creedon.jpg","/assets/pages/webinars/speaker-niall-heffernan.jpg","/assets/pages/webinars/speaker-ayoub-fandi.png"],"href":"/webinars/the-ai-powered-grc-team-scaling-compliance-not-complexity/","themeBg":"#ece8fd (purple5)"},
      {"title":"Wild code: You can’t govern what you can’t see","date":"SEP 15","time":"8:30 PM","variant":"on-demand","speakers":["Colin Bentley","Corey Noles"],"speakerPhotos":["/assets/pages/webinars/speaker-colin-bentley.jpg","/assets/pages/webinars/speaker-corey-noles.jpg"],"href":"/webinars/wild-code-you-cant-govern-what-you-cant-see/","themeBg":"#ffdeee"},
      {"title":"Taming wild code with Tines 3B: The Headspace story","date":"AUG 19","time":"8:30 PM","variant":"on-demand","speakers":["Rosie Ellison","Chris Oh"],"speakerPhotos":["/assets/pages/webinars/speaker-rosie-ellison.jpg","/assets/pages/webinars/speaker-chris-oh.jpg"],"href":"/webinars/taming-wild-code-with-tines-3b-the-headspace-story/","themeBg":"#ece8fd (purple5)"},
      {"title":"The $50K per hour network downtime dilemma","date":"JUL 15","time":"8:30 PM","variant":"on-demand","speakers":["Sif Baksh","Gary Jenkins","Robert Butler"],"speakerPhotos":["/assets/pages/webinars/speaker-sif-baksh.jpg","/assets/pages/webinars/speaker-gary-jenkins.png","/assets/pages/webinars/speaker-robert-butler.jpg"],"href":"/webinars/the-50k-per-hour-network-downtime-dilemma/","themeBg":"#e4eee7 (green5)"},
      {"title":"150 hours saved in one month: Inside Jamf's IT Ops automation strategy","date":"JUL 10","time":"8:30 PM","variant":"on-demand","speakers":["Kaylie Torres","Phinehas Bynum"],"speakerPhotos":["/assets/pages/webinars/speaker-kaylie-torres.png","/assets/pages/webinars/speaker-phinehas-bynum.jpg"],"href":"/webinars/150-hours-saved-in-one-month-inside-jamfs-it-ops-automation-strategy/","themeBg":"#ece8fd (purple5)"},
      {"title":"Secure AI for the real world","date":"JUN 24","time":"8:30 PM","variant":"on-demand","speakers":["Andrew Steele","Indu Sajeev","Mario Villatoro","Matt Muller"],"speakerPhotos":["/assets/pages/webinars/speaker-andrew-steele.png","/assets/pages/webinars/speaker-indu-sajeev.png","/assets/pages/webinars/speaker-mario-villatoro.png","/assets/pages/webinars/speaker-matt-muller.png"],"href":"/webinars/secure-ai-for-the-real-world/","themeBg":"#ece8fd (purple5)"},
      {"title":"From AI POC to production: A practical roadmap with Robinhood","date":"APR 23","time":"8:30 PM","variant":"on-demand","speakers":["Erika Mendoza","Matt Houston","Scott Ponte","Hanna Gower"],"speakerPhotos":["/assets/pages/webinars/speaker-erika-mendoza.jpg","/assets/pages/webinars/speaker-matt-houston.jpg","/assets/pages/webinars/speaker-scott-ponte.jpg","/assets/pages/webinars/speaker-hanna-gower.jpg"],"href":"/webinars/from-ai-poc-to-production-a-practical-roadmap-with-robinhood/","themeBg":"#e4eee7 (green5)"}
    ]
  },
  "details": [
    {"route":"/webinars/secure-ai-for-the-real-world/","title":"Secure AI for the real world","speakers":["Andrew Steele","Indu Sajeev","Mario Villatoro","Matt Muller"],"speakerPhotos":["/assets/pages/webinars/speaker-andrew-steele.png","/assets/pages/webinars/speaker-indu-sajeev.png","/assets/pages/webinars/speaker-mario-villatoro.png","/assets/pages/webinars/speaker-matt-muller.png"],"formFields":["First name *","Last name *","Email *","Company *"],"afterFormHeading":"Missed this webinar?","descriptionParagraphs":7,"descriptionWords":101},
    {"route":"/webinars/the-50k-per-hour-network-downtime-dilemma/","title":"The $50K per hour network downtime dilemma","speakers":["Sif Baksh","Gary Jenkins","Robert Butler"],"speakerPhotos":["/assets/pages/webinars/speaker-sif-baksh.jpg","/assets/pages/webinars/speaker-gary-jenkins.png","/assets/pages/webinars/speaker-robert-butler.jpg"],"formFields":["First name *","Last name *","Email *","Company *"],"afterFormHeading":"Missed this webinar?","descriptionParagraphs":8,"descriptionWords":130}
  ]
}
```

---

## 10. CASE STUDIES

### 10.1 Index `/case-studies/all/`. 1440 height 5767, 390 height 12582. Screenshot `case-studies-index-*.png`
- AreaNav: "Customers" pill; right side "Customers · All case studies".
- `PageSection`: padding `0 156px`, inner max-width 1128.
- Header: centred, max-width 640, margin `40px auto 55px`.
  - H1 "All case studies": Reckless 48/55.2 −.96.
  - P: Roobert 500 16/22.4, margin-top 16.
- Grid `<ul>`: 3 × 360, gap 24, **39 cards**. No filters, no pagination.
- **CaseStudyBookCard:**
  - Outer: `aspect-ratio:4/3` (360×270), radius 24, bg theme-10 (purple `#ded8ff`, pink `#ffc7e5`, green `#cae4d4`, orange `#ffcea6`), `transition: filter .1s`, hover `brightness(1.02)`.
  - Inner: grid `138.8px 185.2px`, gap 12, padding 12.
    - Left cell: padding 12, holding the customer logo as an inline SVG with `fill=currentColor` (100×24, max-width 87.5%). Logos are in `reference/svg/pages/case-studies-logo-<company>.svg`.
    - Book: bg theme-50 (`#7a56e0` / `#cd3d8b` / `#008b53` / `#d15c08`), radius `4px 12px 12px 4px`, padding `18px 18px 18px 24px`, content aligned to the bottom-right.
      - A 19×33 bookmark SVG hangs from the top-right (`case-studies-bookmark.svg`).
      - Content is either a short quote (Reckless 400 16/17.6, white, about 15 words) **or** a stat: `<strong>` Reckless 38/38 (e.g. "99%") + a label in Roobert 500 15/18 white.
- `CtaStartToday`, Footer.
- 390: 1 column (gap 16).

### 10.2 Case study detail `/case-studies/<slug>/`. Samples: `notion`, `vimeo` (same template; module set `CaseStudyHeroSection, CaseStudyContent, Article, PullQuote, ImageBlock, CaseStudyReadMoreSection`)
- **Hero** (padding `0 40px`): the card is a grid of 2 × 644, gap 24, padding 24, bg `#e4eee7` (green-5), radius 32. The theme is per study; both samples are green.
  - Header cell: bg `#008b53`, radius 16, padding 40, grid gap 48.
    - H1: cs-hero-h1, lightest, margin-right 72.
    - "HIGHLIGHTS": mono 600 12/12, ls .36.
    - 3 `li`: Roobert 400 16/19.2, `padding-left:40px`, `li+li` margin-top 8. The `ul` has margin `16px 0 0 -40px`. Each item has a bullet icon (not captured).
  - Logo set: grid 2 × 310, gap 24.
    - Two logo cells: bg lightest, radius 16, padding 40, 224 tall. One holds the customer logo image (138×48), the other the Tines mark SVG (48px, `case-studies-tines-logo-cell.svg`).
    - A 78×95 "+" SVG is centred between them (`case-studies-plus-sign.svg`, z-index 2).
  - Featured quote: bg lightest, radius 22, padding 55, centred. Reckless 500 22/30.8 `#00452a`, about 35 words.
- **Content** (`CaseStudyContent`, padding `0 156px`): article max-width 680, centred (margin `0 224px`). Prose uses Roobert **500** 18/29.25.
  - Sections, each with an h2 (prose-h2) and a hover anchor: "About <Company>" | "About the customer", "Executive summary", "The challenge", "Why Tines", "The Impact", "Top workflows", "Favorite feature", "What's next".
  - First block: a lead `StructuredTextBlock` (lead 22/33 600) of about 60 words.
  - `strong` subheads ("Time savings", …): 600. `u` underline: 700.
  - Counts:
    - Notion: 68 `p` (about 1,870 words), 4 PullQuotes (36px mark + Reckless 22/28.6 quote + source), 1 ImageBlock (680 wide, radius 9), 9 strong leads.
    - Vimeo: 35 `p` (about 1,720 words), 2 PullQuotes, 1 ImageBlock.
- **"More case studies"** (`CaseStudyReadMoreSection`): H2 section-h2-serif + 3 BookCards (grid 3 × 360) + "See all case studies" (`.btn-sans` outlined purple-65, 163×39, centred).
- `CtaStartToday`, Footer.
- 390: hero 1 column (header cell padding 32, gap 32), logos 2 × 153, H1 28/29.4, read-more grid 1 column.

### 10.3 Case studies sample data
```json
{
  "index": {
    "route": "/case-studies/all/",
    "total": 39,
    "cards": [
      {"href":"/case-studies/omada-health/","company":"omada-health","logoSvg":"reference/svg/pages/case-studies-logo-omada-health.svg","outerBg":"#ded8ff (purple10)","bookBg":"#7a56e0 (purple50)","bookContent":"quote"},
      {"href":"/case-studies/scaling-service-delivery-how-intezer-extended-their-ai-soc-platforms-value/","company":"intezer","logoSvg":"reference/svg/pages/case-studies-logo-intezer.svg","outerBg":"#ffc7e5","bookBg":"#cd3d8b (pink50)","bookContent":"quote"},
      {"href":"/case-studies/hawx-smart-pest-control-cuts-workflow-costs-by-50percent-and-streamlines-device-m/","company":"hawx","logoSvg":"reference/svg/pages/case-studies-logo-hawx.svg","outerBg":"#cae4d4 (green10)","bookBg":"#008b53","bookContent":"quote"},
      {"href":"/case-studies/personio-transforms-fragile-scripts-into-intelligent-workflows-with-tines/","company":"personio","logoSvg":"reference/svg/pages/case-studies-logo-personio.svg","outerBg":"#ded8ff (purple10)","bookBg":"#7a56e0 (purple50)","bookContent":"quote"},
      {"href":"/case-studies/brex-modernizes-security-and-it-operations-with-tines-intelligent-workflows/","company":"brex","logoSvg":"reference/svg/pages/case-studies-logo-brex.svg","outerBg":"#ffc7e5","bookBg":"#cd3d8b (pink50)","bookContent":"quote"},
      {"href":"/case-studies/vimeo/","company":"vimeo","logoSvg":"reference/svg/pages/case-studies-logo-vimeo.svg","outerBg":"#cae4d4 (green10)","bookBg":"#008b53","bookContent":"quote"},
      {"href":"/case-studies/netskope-triples-the-efficiency-of-its-soc-with-help-from-tines/","company":"netskope","logoSvg":"reference/svg/pages/case-studies-logo-netskope.svg","outerBg":"#ffcea6","bookBg":"#d15c08 (orange50)","bookContent":"quote"},
      {"href":"/case-studies/ip-performance/","company":"ip-performance","logoSvg":"reference/svg/pages/case-studies-logo-ip-performance.svg","outerBg":"#ded8ff (purple10)","bookBg":"#7a56e0 (purple50)","bookContent":"quote"},
      {"href":"/case-studies/notion/","company":"notion","logoSvg":"reference/svg/pages/case-studies-logo-notion.svg","outerBg":"#cae4d4 (green10)","bookBg":"#008b53","bookContent":"quote"}
    ]
  },
  "details": [
    {"route":"/case-studies/notion/","title":"Notion reduces manual effort and improves consistency with Tines, strengthening security and IT operations","highlightsCount":3,"customerLogo":"/assets/pages/case-studies/logo-notion.svg","sectionHeadings":["About Notion","Executive summary","The challenge","Why Tines","The Impact","Top workflows","Favorite feature","What’s next"],"heroBg":"#e4eee7 (green5)","headerCellBg":"#008b53","bodyElementCounts":{"p":68,"pullQuotes":20,"images":1,"ul":0,"li":0,"strongLeads":9,"words":1871},"readMore":["/case-studies/omada-health/","/case-studies/scaling-service-delivery-how-intezer-extended-their-ai-soc-platforms-value/","/case-studies/hawx-smart-pest-control-cuts-workflow-costs-by-50percent-and-streamlines-device-m/","/customers/"]},
    {"route":"/case-studies/vimeo/","title":"Vimeo frees over 1,000 hours of security and IT capacity with Tines","highlightsCount":3,"customerLogo":"/assets/pages/case-studies/logo-vimeo.svg","sectionHeadings":["About the customer","Executive summary","The challenge","Why Tines","The Impact","Top workflows","Favorite feature","What’s next"],"heroBg":"#e4eee7 (green5)","headerCellBg":"#008b53","bodyElementCounts":{"p":35,"pullQuotes":5,"images":1,"ul":0,"li":0,"strongLeads":9,"words":1722},"readMore":["/case-studies/omada-health/","/case-studies/scaling-service-delivery-how-intezer-extended-their-ai-soc-platforms-value/","/case-studies/hawx-smart-pest-control-cuts-workflow-costs-by-50percent-and-streamlines-device-m/","/customers/"]}
  ]
}
```

---

## 11. Motion summary (implement in `src/motion.css` and shared components)

| Element | Trigger | Property / timing |
|---|---|---|
| AreaNav pill, sidebar prompt card, theme toggle | hover | bg change, instant (pill) / `background-color .15s` (toggle) |
| Filled buttons | hover | `filter: brightness(1.1)`, `transition: filter .1s, background-color .1s`; label `opacity .1s` |
| StoryCard, LibraryToolCard | hover | `border-color` → text at 40% (tool 30%) + `filter: brightness(1.03)`, `.15s` each |
| Template entries, vendor cards, event cards | hover | `border-color .15s` (`.2s` on event cards) |
| CaseStudyBookCard | hover | `filter: brightness(1.02)` `.1s` |
| "Details →" arrows (stories hub) | card hover | `transform: translateX(2px)` `.1s` |
| Prose h2 anchor icon | heading hover | `opacity 0→1 .15s` |
| Prose links | hover | colour → `#8665eb` (instant) |
| Newsletter inputs | focus | `border-color .15s` |
| Checkboxes | toggle | `background-color .1s, border-color .1s` |
| PillDropdown chevron | open | `transform rotate(180deg) .15s` |
| LibrarySidebar | scroll (sticky) | `transition: top .25s, height .25s` |
| CollectionViewToggle tabs | click | `background-color .15s`, corner SVG `color .15s` |
| ExplosionCta backdrop | load | `.ready` → `opacity .5s` |
| ExplosionCta layers | pointer hover over the section | JS lerp of `scale` from 0.7/0.6/0.5/0.4 toward ~1.0 (≈0.99 after 700ms); reverse on leave |
| University testimonial marquee | always | JS `translateX`, −54.2 px/s, loop at 2909.5px (track duplicated) |
| WildCodeCTA cursor spinner | always | already implemented (`InteractiveCursor` spin, 6s linear infinite) |
| Webinar access form | submit | `opacity .3s` |

There are no scroll-triggered reveals, no parallax and no staggered entrances on any page in this group.

---

## 12. Not measurable / caveats
- **Third-party embeds:**
  - Library story canvases (`library.tines.com/embedded_stories/<hash>` iframes), the Google Maps JS world map on `/events/` and the per-event Google Maps embed are live third-party content. Use placeholders or screenshot crops.
  - Webinar recordings are gated behind the access form and were not loaded.
- **Hover states not captured:**
  - Library sidebar nav items: the element was outside the viewport during the hover probe.
  - The events world map.
  - `ArticleEntryLink` covers showed no CSS change on hover.
  - ExplosionCta easing is JS-driven, so duration and easing are approximate.
- **Not opened:** dropdown menus (AreaNav Overview/Discover/Learn, What's new Categories, RSS), the library mobile drawer, the lesson off-canvas drawer and the 390 AreaNav "Categories" menu. Their trigger styles are given; their panel styles were not measured.
- **Breakpoints between 390 and 1440 were not measured.** Use the homepage breakpoints (640/768/920/1024/1280) and step the grids 4→3→2→1 at 1280/1024/768. This is inferred, not measured.
- **Missing SVGs:**
  - Not found as inline `<svg>`, so likely CSS/pseudo or `<img>`: newsletter checkbox tick, blog callout icon, case-study highlight bullet, university "Watch intro" badge, library tools-section icon.
  - The blog excerpt illustration `https://www.datocms-assets.com/55802/1731492943-tines-illo-key-framed.svg` is not in the downloaded set. Fetch it with `dl.sh` if needed.
- **Colour edge cases:**
  - One green text colour in blog tinted blocks is outside the sRGB gamut (`p3(-0.09 0.40 0.25)`); `#00693b` is the suggested substitute.
  - Event and webinar themes are assigned per item by the CMS. The sample data records each item's measured bg so Build can reuse those exact assignments.
- **Content excluded:** body text for all detail pages and card descriptions, per the copy rule. Counts and word totals are given instead.
