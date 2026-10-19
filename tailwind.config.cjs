/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // CLONE_SPEC §0 breakpoints that drive layout switches (390 is the base).
    screens: {
      sm: '640px',
      md: '768px',
      lg: '920px',
      xl: '1024px',
      '2xl': '1280px',
      '3xl': '1440px',
    },
    extend: {
      colors: {
        lightest: '#fcf9f5',
        // Page theme (see [data-page-theme] in index.css): nav, footer and CTA read these
        'page-bg': 'var(--page-bg)',
        'page-fg': 'var(--page-fg)',
        'page-btn': 'var(--page-btn-bg)',
        'page-btn-fg': 'var(--page-btn-fg)',
        // Dark/legacy page neutrals (specs/pages-a.md §0.1)
        coolgray: { 80: '#3b3945', 85: '#312f3b', 95: '#1f1c27', 99: '#181420' },
        'legacy-ink': '#4d3e78',
        // pages-a: pricing free-card CTA green (p3~ #239667)
        'pricing-green': '#239667',
        // --pageAccent on the homepage (footer link / ask-AI / cookie-settings hover), resolved live
        accent: '#8d75e6',
        darkest: '#16131e',
        purple: {
          1: '#f8f6fa', 2: '#f5f2fb', 5: '#ece8fd', 10: '#ded8ff', 15: '#d0c8ff', 20: '#c3b7ff',
          25: '#b6a7ff', 30: '#aa95ff', 35: '#9e84fd', 40: '#9274f4', 45: '#8665eb', 50: '#7a56e0',
          55: '#714bd0', 60: '#6741bf', 65: '#5d38ae', 70: '#542f9c', 75: '#4a288a', 80: '#3f2374',
          85: '#351f5e', 90: '#2a1b49', 95: '#211735', 97: '#1d142d', 99: '#191226',
        },
        // ---- Shared page-library palette (specs/pages-a.md §0-§13, specs/pages-c.md §2.10 / §3) ----
        // Only the steps the specs use; the live :root has full 1-99 scales.
        orange: { 2: '#ffeedd', 5: '#ffe9dd', 10: '#ffd9c6', 50: '#d15c08', 55: '#c05200', 70: '#8a3701', 80: '#622c12' },
        pink: { 50: '#cd3d8b', 60: '#ad2a71', 65: '#9c2464', 70: '#8a1f57', 80: '#631e40' },
        teal: { 5: '#ddf1ed', 20: '#8fd9d1', 70: '#006061' },
        blue: { 5: '#e7ecf5', 10: '#d4dff3', 20: '#a6c2f2', 70: '#1f42a1', 80: '#192f7d' },
        // pages-a (/3b/examples/): featured example card backgrounds
        func: { it: '#007442', finance: '#007a78' },
        red: { 50: '#d13936' },
        // ---- pages group A2: /about/ /ai-in-tines/ /contact/ /partners/ (specs/pages-a.md §6-§9 bare hexes) ----
        pga: {
          'orange-line': '#ff9c5b', 'orange-edge': '#ffbc89', 'orange-ink': '#af4700', 'pink-line': '#ff87c8', 'pink-edge': '#ffb1dc',
          'cream': '#fff1d1', 'cream-line': '#ffca69', 'cream-ink': '#7e4200',
          'lime-5': '#eef4b4', 'lime-25': '#beca3f', 'blue-25': '#98b7f2', 'green-link': '#007442',
        },
        // ---- end pages group A2 ----
        // Named one-offs the specs list as bare hexes (card/theme borders, pale tints, inks, pagination)
        tint: {
          peach: '#ffe1c4', 'peach-mid': '#ffcea6', 'peach-line': '#ffab70', 'peach-hover': '#ff8e46', 'peach-edge': '#ffc8a3',
          rose: '#ffdeee', 'rose-mid': '#ffc7e5', 'rose-line': '#ff9ad2', 'rose-pale': '#ffbfdb',
          'lilac-line': '#c3b5ff', 'lilac-line-2': '#d1c7ff', 'lilac-edge': '#aa94ff', 'violet-line': '#d7c4fa', 'violet-mid': '#b7a4ff',
          'orange-ink': '#9d3e00', 'green-book': '#008b53', 'green-line': '#00a46e',
          'green-ink': '#00693b', 'green-ink-dk': '#005d35', 'green-ink-xdk': '#00452a',
          'pink-dot': '#ff75bd', 'green-dot': '#50bc8c', 'orange-dot': '#f27324', 'page-bar': '#f3ecf7', 'page-active': '#eadff8', 'page-ink': '#6956a8', 'page-ink-hover': '#7f69ce',
        },
        green: {
          1: '#f5f7f4', 2: '#f1f5f1', 5: '#e4eee7', 10: '#cae4d4', 15: '#aedac2', 20: '#91d1af',
          25: '#71c79d', 30: '#50bc8c', 35: '#29b07d',
        },
        // ---- pages-c: blog / stories / library (colors) ----
        coll: { blush: "#ffeee8", "blush-line": "#ffb1dc", sand: "#edecd4", "sand-line": "#d0d396", mist: "#e6e9f1", "mist-line": "#bbcaea", "pink-btn": "#e269a4", "orange-btn": "#f47e3f", "howto": "rgba(205,61,139,0.2)", "embed-purple": "rgba(122,86,224,0.15)", "embed-orange": "rgba(209,92,8,0.15)", "lilac-50": "rgba(209,199,255,0.5)", "lilac-80": "rgba(209,199,255,0.8)", "badge": "rgba(84,47,156,0.5)", "tab-off": "rgba(146,117,244,0.5)", "tool-card": "rgba(122,86,224,0.08)", "tool-edge": "rgba(84,47,156,0.3)" },
        // ---- pages-c: university / events / webinars / case studies (colors) ----
        pcu: {
          'blue-line': '#84a9f1', amber: '#f6a400', 'teal-line': '#2ac4bc', 'lime-ink': '#576700', 'teal-ink': '#006d6d', 'blue-ink': '#234db2',
          'teal-soft': '#bee9e4', 'teal-dk': '#004648', 'blue-soft': '#d4dff3', 'blue-dk': '#192f7d', 'peach-pill': '#ffbc89', 'violet-line': '#c2aafa', 'pink-pill': '#ffb1dc',
        },
        // Legacy scale (spec lists endpoints only)
        light: { 100: '#f8f4f0', 200: '#f3efea', 500: '#dcd7d0' }, // light-200: cover/placeholder bg (pages-c §3)
        dark: { 500: '#32313b', 900: '#222027' },
        // Use-case tab / panel colors (§0 + §5)
        tab: {
          it: '#007f4a',
          security: '#714bd0',
          finance: '#008784',
          people: '#c05100',
          operations: '#3565cc',
        },
        // Per-tab panel text / frame bezel / toggle-pill text.
        // IT + Security come from the spec palette; finance/people/operations are the
        // hex fallbacks of --c-teal/orange/blue{10,15,75} in the saved snapshot CSS (not in spec).
        panel: {
          'it-text': '#cae4d4', 'it-edge': '#aedac2', 'it-pill': '#00512f',
          'security-text': '#ded8ff', 'security-edge': '#d0c8ff', 'security-pill': '#4a288a',
          'finance-text': '#bee9e4', 'finance-edge': '#9ee1da', 'finance-pill': '#005050',
          'people-text': '#ffd9c6', 'people-edge': '#ffc9ae', 'people-pill': '#75320d',
          'operations-text': '#d4dff3', 'operations-edge': '#c0d1f3', 'operations-pill': '#1c3890',
        },
        // Nav dropdown colors (§1 Dropdowns)
        dd: {
          'it-tile': '#008b53',
          'by-function': '#b7a4ff',
          'by-industry': '#ffe1c4',
          'by-industry-text': '#622c12',
          'industry-chip': '#ffcea6',
          // Industry leaf hover (--c-orange10 in snapshot CSS; spec only says var(--boxHover))
          'by-industry-hover': '#ffd9c6',
          'events-text': '#00452a',
          community: '#e26817',
        },
        // Translucent surfaces (§0/§1/§2/§5/§8)
        surface: {
          'nav-blur': 'color-mix(in srgb, var(--page-bg) 70%, transparent)', // page-themed (default lightest)
          'nav-backdrop': 'color-mix(in srgb, var(--page-bg) 90%, transparent)',
          'mobile-menu': 'rgba(252,249,245,0.8)',
          'mobile-pill': 'rgba(113,75,208,0.10)',
          'mobile-pill-open': 'rgba(113,75,208,0.16)',
          frosted: 'rgba(252,249,245,0.65)',
          tag: 'rgba(252,249,245,0.55)',
          // AnnouncementBar :hover / :active -> var(--unfilledHoverBg): purple55 10% over lightest, at 85% (instant, transition 0s)
          'tag-hover': 'color-mix(in srgb, color-mix(in srgb, #714bd0 10%, #fcf9f5) 85%, transparent)',
          'card-border': 'rgba(252,249,245,0.14)',
          'timeline-bar': 'rgba(223,216,255,0.62)',
          'timeline-track': 'rgba(113,75,208,0.22)',
          // --barTrackHot (light bar theme): purple55 42% -- hovered segment
          'timeline-track-hot': 'rgba(113,75,208,0.42)',
          'ask-ai': 'rgba(113,75,208,0.05)',
          'toggle-it': 'rgba(206,230,214,0.12)',
          // Shared page library (pages-a §2.2 PullQuoteCard card/bento, pages-c §2.5 callout / §2.7 StoryCard tints)
          'quote-card': 'rgba(222,216,255,0.55)',
          'search-pill': 'rgba(141,117,230,0.08)',
          'callout': 'rgba(146,117,244,0.12)',
          'callout-border': 'rgba(146,117,244,0.25)',
          'pull-quote': 'rgba(122,86,224,0.10)',
          'story-green': 'rgba(0,139,83,0.10)',
          'story-purple': 'rgba(122,86,224,0.10)',
          'story-orange': 'rgba(209,92,8,0.10)',
          'story-pink': 'rgba(205,61,139,0.10)',
          'story-icon': 'rgba(252,249,245,0.5)',
          // pages-a (/3b/): feature-tile border, video segment track, label/bar glass, teaser pill
          'tile-border': 'rgba(134,101,235,0.55)',
          'seg-track': 'rgba(134,101,235,0.25)',
          'player-bar': 'rgba(222,216,255,0.6)',
          'teaser-pill': 'rgba(42,27,73,0.6)',
        },
      },
      fontFamily: {
        sans: ['Roobert', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'Roboto', 'Ubuntu', '"Helvetica Neue"', 'sans-serif'],
        serif: ['Reckless', 'Georgia', 'serif'],
        mono: ['"Roobert Mono"', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'Roboto', 'Ubuntu', '"Helvetica Neue"', 'sans-serif'],
      },
      // Type roles (§0 Type roles). [size, { lineHeight, letterSpacing }]
      fontSize: {
        'h1-sm': ['38px', { lineHeight: '42.56px', letterSpacing: '-0.03em' }],
        'h1-md': ['56px', { lineHeight: '58.8px', letterSpacing: '-0.03em' }],
        'h1-lg': ['64px', { lineHeight: '67.2px', letterSpacing: '-0.03em' }],
        'hero-byline-sm': ['18px', { lineHeight: '23.4px' }],
        'hero-byline': ['24px', { lineHeight: '31.2px' }],
        'h2-sm': ['36px', { lineHeight: '39.6px', letterSpacing: '-0.03em' }],
        'h2-md': ['42px', { lineHeight: '44.1px', letterSpacing: '-0.03em' }],
        'h2-solution-md': ['38px', { lineHeight: '39.9px', letterSpacing: '-0.03em' }],
        h2: ['56px', { lineHeight: '58.8px', letterSpacing: '-0.03em' }],
        'monitor-h2-sm': ['38px', { lineHeight: '41.8px', letterSpacing: '-0.76px' }],
        'monitor-h2-md': ['32px', { lineHeight: '35.2px', letterSpacing: '-0.64px' }],
        'monitor-h2': ['52px', { lineHeight: '57.2px', letterSpacing: '-1.56px' }],
        kicker: ['13px', { lineHeight: '13px', letterSpacing: '0.65px' }],
        'byline-sm': ['18px', { lineHeight: '22.5px' }],
        byline: ['24px', { lineHeight: '30px', letterSpacing: '-0.24px' }],
        'monitor-body-sm': ['20px', { lineHeight: '28px' }],
        'monitor-body': ['22px', { lineHeight: '30.8px' }],
        'solution-h3-sm': ['18px', { lineHeight: '25.2px', letterSpacing: '-0.18px' }],
        'solution-h3': ['24px', { lineHeight: '26.4px', letterSpacing: '-0.24px' }],
        'solution-body-sm': ['16px', { lineHeight: '22.4px' }],
        'solution-body': ['16px', { lineHeight: '24px' }],
        'solution-footer': ['18px', { lineHeight: '25.2px' }],
        'tab-title-sm': ['clamp(12px, 3.4vw, 16px)', { lineHeight: '1.15' }],
        'tab-title': ['24px', { lineHeight: '27.6px', letterSpacing: '-0.24px' }],
        'tab-body-md': ['14px', { lineHeight: '17.5px' }],
        'tab-body': ['16px', { lineHeight: '20px' }],
        'usecase-caption': ['16px', { lineHeight: '22.4px' }],
        'usp-title-sm': ['18px', { lineHeight: '21.6px' }],
        'usp-title': ['24px', { lineHeight: '28.8px', letterSpacing: '-0.24px' }],
        tagline: ['24px', { lineHeight: '30px', letterSpacing: '-0.24px' }],
        button: ['13px', { lineHeight: '13px', letterSpacing: '0.26px' }],
        nav: ['14px', { lineHeight: '16.1px' }],
        'nav-demo': ['13px', { lineHeight: '14.95px' }],
        'tag-new': ['11.9px', { lineHeight: '11.9px', letterSpacing: '0.238px' }],
        tag: ['14px', { lineHeight: '14px' }],
        'footer-title': ['11px', { lineHeight: '12.65px', letterSpacing: '0.22px' }],
        'footer-link': ['14px', { lineHeight: '16.8px' }],
        'footer-mark': ['11px', { lineHeight: '13.2px' }],
        'footer-bottom': ['14px', { lineHeight: '16.1px' }],
        'ask-ai': ['11px', { lineHeight: '15.4px', letterSpacing: '0.22px' }],
        toggle: ['12px', { lineHeight: '13.8px', letterSpacing: '0.72px' }],
        'timeline-caption': ['12.5px', { lineHeight: '14.375px', letterSpacing: '-0.125px' }],
        'timeline-time': ['12px', { lineHeight: '13.8px' }],
        // ---- Shared page library roles (pages-a §1.5/§1.6/§13, pages-c §2 / §3) ----
        'section-h2': ['46px', { lineHeight: '48.3px', letterSpacing: '-0.92px' }],
        'section-h2-sm': ['32px', { lineHeight: '33.6px', letterSpacing: '-0.32px' }],
        'section-h2-loose': ['46px', { lineHeight: '52.9px', letterSpacing: '-0.92px' }],
        'faq-q': ['24px', { lineHeight: '33px' }],
        'faq-q-md': ['22px', { lineHeight: '30.25px' }],
        'faq-q-sm': ['18px', { lineHeight: '24.75px' }],
        'faq-h2-md': ['42px', { lineHeight: '46.2px', letterSpacing: '-1.26px' }],
        'faq-h2-sm': ['32px', { lineHeight: '35.2px', letterSpacing: '-0.64px' }],
        // pages-a (/3b/) roles
        'bento-h2': ['38px', { lineHeight: '39.9px', letterSpacing: '-0.76px' }],
        'bento-h2-sm': ['32px', { lineHeight: '33.6px', letterSpacing: '-0.64px' }],
        'bento-desc': ['20px', { lineHeight: '26px' }],
        'tile-title': ['15px', { lineHeight: '20.25px' }],
        'tile-title-sm': ['13px', { lineHeight: '17.55px' }],
        'tile-body': ['16px', { lineHeight: '21.6px' }],
        'statement': ['48px', { lineHeight: '52.8px', letterSpacing: '-0.48px' }],
        'statement-sm': ['32px', { lineHeight: '35.2px', letterSpacing: '-0.32px' }],
        'coda': ['48px', { lineHeight: '55.2px', letterSpacing: '-0.48px' }],
        'coda-sm': ['32px', { lineHeight: '36.8px', letterSpacing: '-0.32px' }],
        'typer': ['20px', { lineHeight: '30px' }],
        'statement-md': ['40px', { lineHeight: '44px', letterSpacing: '-0.4px' }],
        'coda-md': ['42px', { lineHeight: '48.3px', letterSpacing: '-0.42px' }],
        'btn-sans': ['14px', { lineHeight: '14px' }],
        'mono-label-sm': ['11.5px', { lineHeight: '16.1px', letterSpacing: '0.575px' }],
        'mono-pill': ['11px', { lineHeight: '12.65px', letterSpacing: '0.22px' }],
        'card-serif': ['22px', { lineHeight: '24.2px', letterSpacing: '-0.22px' }],
        prose: ['18px', { lineHeight: '29.25px' }],
        'prose-h2': ['28px', { lineHeight: '35px', letterSpacing: '-0.28px' }],
        'prose-h3': ['22px', { lineHeight: '26.4px' }],
        'newsletter-h2': ['40px', { lineHeight: '46px', letterSpacing: '-0.4px' }],
        'newsletter-h2-sm': ['24px', { lineHeight: '27.6px', letterSpacing: '-0.24px' }],
        'meta-14': ['14px', { lineHeight: '16.1px' }],
        // ---- pages-c: blog / stories / library (fontSize) ----
        'display-lg': ["64px", { lineHeight: "73.6px", letterSpacing: "-1.92px" }],
        'display-lg-sm': ["38px", { lineHeight: "43.7px", letterSpacing: "-0.76px" }],
        'display-xl': ["72px", { lineHeight: "70.56px", letterSpacing: "-1.26px" }],
        'display-xl-sm': ["36px", { lineHeight: "39.6px", letterSpacing: "-0.54px" }],
        'mono-dt': ["12px", { lineHeight: "13.8px", letterSpacing: "1.2px" }],
        'page-h1': ["48px", { lineHeight: "55.2px", letterSpacing: "-1.44px" }],
        'whatsnew-h1': ["38px", { lineHeight: "45.6px", letterSpacing: "-0.76px" }],
        'whatsnew-h1-sm': ["28px", { lineHeight: "33.6px", letterSpacing: "-0.28px" }],
        'stories-h1': ["48px", { lineHeight: "52.8px", letterSpacing: "-1.44px" }],
        'card-title-serif': ["22px", { lineHeight: "27.5px", letterSpacing: "-0.22px" }],
        'article-h1': ["54px", { lineHeight: "59.4px", letterSpacing: "-0.81px" }],
        'article-h1-sm': ["38px", { lineHeight: "41.8px", letterSpacing: "-0.76px" }],
        'category-h1': ["38px", { lineHeight: "43.7px", letterSpacing: "-0.76px" }],
        'category-h1-sm': ["38px", { lineHeight: "43.7px", letterSpacing: "-0.76px" }],
        'series-h1': ["58px", { lineHeight: "58px", letterSpacing: "-0.87px" }],
        'series-h1-sm': ["32px", { lineHeight: "32px", letterSpacing: "-0.32px" }],
        // Nav dropdown roles (§1 Dropdowns)
        'dd-hero-label': ['22px', { lineHeight: '22px' }],
        'dd-desc': ['13px', { lineHeight: '14.95px' }],
        'dd-tile-title': ['16px', { lineHeight: '16px' }],
        'dd-col-title': ['11px', { lineHeight: '15.4px', letterSpacing: '0.22px' }],
        'dd-leaf-desc': ['13px', { lineHeight: '15.6px' }],
        'dd-blog-title': ['18px', { lineHeight: '19.8px' }],
        'dd-cta': ['11px', { lineHeight: '12.65px', letterSpacing: '0.22px' }],
      },
      spacing: {
        // Stepped spacing scale (CSS vars in index.css mirror the live :root steps)
        page: 'var(--page-margin)', // --widerPageMargin: 18 / 30@640 / 35@1024 / 40@1280
        'page-wide': 'var(--page-margin-wide)', // --pageMargin: 18 / 70@640 / 85@920 / 125@1024 / 156@1280
        'sp-sm': 'var(--sp-sm)',
        'sp-md': 'var(--sp-md)',
        'sp-lg': 'var(--sp-lg)',
        'sp-xl': 'var(--sp-xl)',
        'sp-xxl': 'var(--sp-xxl)',
        'sp-gap': 'var(--sp-gap)',
        'section-pad': 'var(--section-padding)',
        'section-margin': 'var(--section-margin)',
        'tl-inset': 'var(--timeline-inset)',
      },
      maxWidth: {
        page: '1520px',
      },
      borderRadius: {
        pill: '990px',
        full2: '9990px',
        'dd-col': '20px',
        'dd-tile': '12px',
        'dd-chip': '9px',
        panel: '48px',
        'panel-sm': '24px',
        'panel-md': '32px',
        usp: '14px',
        tab: '14px',
        frame: '24px',
        'frame-img': '19px',
        'frame-sm': '16px',
        'frame-img-sm': '11px',
        'tabbed-sm': '18px',
        'hero-frame': '18px',
        transport: '22px',
        tag: '28px',
        'nav-item': '50px',
      },
      backgroundImage: {
        // TimelineScrubber .hoverTick: --barTick (purple55) at .7 fading out over the last 30%
        'timeline-hover-tick': 'linear-gradient(to bottom, rgba(113,75,208,0.7) 0%, rgba(113,75,208,0.7) 70%, rgba(113,75,208,0) 100%)',
      },
      backdropBlur: {
        nav: '10px',
        frosted: '12px',
        menu: '16px',
        timeline: '24px',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(.22,1,.36,1)',
        ease: 'ease', // plain CSS `ease` (Tailwind's default ease is cubic-bezier(.4,0,.2,1))
        spring: 'cubic-bezier(.34,1.56,.64,1)',
      },
      zIndex: {
        nav: '1000',
      },
    },
  },
  plugins: [],
}

// ---- pages group B1 (solutions / sub-solutions): colour-scale steps from specs/pages-b.md section 0.5 ----
// Fills ONLY steps the scales above don't define (existing steps keep their values).
{
  const _b1 = {
    pink: { 2: '#fff0f4', 5: '#ffe4ee', 10: '#ffd1e3', 20: '#ffa8cf', 25: '#ff91c6', 30: '#ff78bc', 40: '#ed52a6', 55: '#be327e', 90: '#3e192a' },
    orange: { 20: '#ffb996', 25: '#ffa87b', 30: '#ff965e', 40: '#f27324', 60: '#ad4900', 90: '#3e1f14' },
    green: { 40: '#00a370', 50: '#00855b', 55: '#007953', 60: '#006d4b', 70: '#00573c', 80: '#00422d', 90: '#032d20' },
    teal: { 10: '#bee9e4', 20: '#7ad8d0', 30: '#2ac4bc', 50: '#008e89', 80: '#004445' },
    // yellow 5-50: rendered values read back from the live Infrastructure management card (the spec's hex fallbacks render lighter/darker); 70/80 from spec
    yellow: { 5: '#ffe7b0', 10: '#ffd88c', 20: '#ffbd4d', 30: '#f6a400', 50: '#bd6f00', 70: '#7c4400', 80: '#5b320e' },
    blue: { 10: '#d4dff3', 20: '#acc4f3', 30: '#84a9f1', 50: '#4372d6', 55: '#3565cc' },
  }
  const _c = module.exports.theme.extend.colors
  for (const [hue, steps] of Object.entries(_b1)) {
    _c[hue] = _c[hue] || {}
    for (const [k, v] of Object.entries(steps)) if (!(k in _c[hue])) _c[hue][k] = v
  }
}
{
  const _t = module.exports.theme.extend
  Object.assign(_t.spacing, { 'card-pad': 'var(--card-pad)' })
  Object.assign(_t.borderRadius, { card: 'var(--radius)' })
  Object.assign(_t.fontSize, {
    // type roles, specs/pages-b.md section 0.5 (Reckless unless noted)
    'sol-h1-sm': ['42px', { lineHeight: '40.74px', letterSpacing: '-0.84px' }],
    'sol-h1-md': ['54px', { lineHeight: '52.38px', letterSpacing: '-1.35px' }],
    'sol-h1': ['64px', { lineHeight: '62.08px', letterSpacing: '-1.92px' }],
    'subsol-h1-sm': ['32px', { lineHeight: '31.04px', letterSpacing: '-0.64px' }],
    'subsol-h1-md': ['38px', { lineHeight: '36.86px', letterSpacing: '-0.76px' }],
    'subsol-h1-lg': ['46px', { lineHeight: '44.62px', letterSpacing: '-0.92px' }],
    'subsol-h1': ['52px', { lineHeight: '50.44px', letterSpacing: '-1.56px' }],
    'section-h2-md': ['38px', { lineHeight: '39.9px', letterSpacing: '-0.76px' }],
    'opening-h2-sm': ['22px', { lineHeight: '26.4px' }],
    'opening-h2': ['34px', { lineHeight: '40.8px', letterSpacing: '-0.34px' }],
    'valueprop-h3': ['20px', { lineHeight: '26px', letterSpacing: '-0.2px' }],
    'valueprop-h3-lg': ['24px', { lineHeight: '31.2px', letterSpacing: '-0.24px' }],
    'card-h3-24': ['24px', { lineHeight: '27.6px', letterSpacing: '-0.2px' }],
    'quote-xl-sm': ['20px', { lineHeight: '26px' }],
    'quote-xl-md': ['24px', { lineHeight: '31.2px' }],
    'quote-xl': ['30px', { lineHeight: '37.5px', letterSpacing: '-0.3px' }],
    'quote-short-sm': ['24px', { lineHeight: '24px' }],
    'quote-short-md': ['32px', { lineHeight: '32px' }],
    'quote-short-lg': ['50px', { lineHeight: '50px' }],
    'quote-short': ['64px', { lineHeight: '64px', letterSpacing: '-1.6px' }],
    'content-card-h4': ['22px', { lineHeight: '24.2px', letterSpacing: '-0.22px' }],
    'kicker-mono': ['11.5px', { lineHeight: '16.1px', letterSpacing: '0.575px' }],
  })
}
// ---- end pages group B1 ----

// ===== pages-b2 (IndustryPage + /security/): tokens not already added by group B1 =====
;(() => {
  const ext = module.exports.theme.extend
  ext.colors['warm-gray-95'] = '#251b21'
  ext.colors['trust-header'] = '#f3ecf7'
  ext.colors.green = { 100: '#d6edd9', ...ext.colors.green }
})()

// ===== pages group Legacy (/book-a-demo/ /enterprise/ /soar/ /careers/): legacy-palette hexes the specs list bare =====
;(() => {
  const ext = module.exports.theme.extend
  ext.colors.lgc = {
    'sand-line': '#ede9e3',
    'peach-bg': '#feede0', 'peach-ink': '#b74d1a', 'peach-ink-dk': '#803218', 'peach-tab-line': '#ffe0cc',
    orange: '#f47e3f', 'orange-line': '#e16521',
    'rose-bg': '#feebee', 'rose-ink': '#a54b7a', 'rose-ink-dk': '#763359', 'rose-tab-line': '#ffdce8',
    'mint-bg': '#e9f3e7', 'mint-line': '#b0e0bd', 'mint-ink': '#1f7a57', 'mint-ink-dk': '#195642',
    pink: '#e269a4', 'pink-line': '#cb5d94',
    'coral-bg': '#fee8e2', 'coral-line': '#ffd8cf', 'coral-ink': '#772e2c',
    red: '#e14f4c', 'red-line': '#ca4845',
    green: '#25a871', 'frame-line': '#eadff8',
    // soar stat cards (mid / strong tints) and borders
    'stat-purple-mid': '#ded8ff', 'stat-purple-ink': '#542f9c', 'stat-purple-line': '#9274f4',
    'stat-orange-base': '#ffe1c4', 'stat-orange-mid': '#ffcea6', 'stat-orange-strong': '#ffab70', 'stat-orange-ink': '#8a3701', 'stat-orange-line': '#f27324',
    'stat-green-base': '#e4eee7', 'stat-green-mid': '#cae4d4', 'stat-green-strong': '#91d1af', 'stat-green-ink': '#005d35', 'stat-green-line': '#00a46e',
    'pink-mid': '#ff75bd', 'quote-orange': '#9d3e00', 'quote-orange-line': '#ff8e46',
    // careers
    'pink-line-40': '#ed52a6', 'blue-line': '#618de8', 'lime-line': '#97a500', 'teal-line': '#00ada5', 'orange-line-dk': '#af4700',
  }
})()
// ===== end pages group Legacy =====
