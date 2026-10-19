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
        // --pageAccent on the homepage (footer link / ask-AI / cookie-settings hover), resolved live
        accent: '#8d75e6',
        darkest: '#16131e',
        purple: {
          1: '#f8f6fa', 2: '#f5f2fb', 5: '#ece8fd', 10: '#ded8ff', 15: '#d0c8ff', 20: '#c3b7ff',
          25: '#b6a7ff', 30: '#aa95ff', 35: '#9e84fd', 40: '#9274f4', 45: '#8665eb', 50: '#7a56e0',
          55: '#714bd0', 60: '#6741bf', 65: '#5d38ae', 70: '#542f9c', 75: '#4a288a', 80: '#3f2374',
          85: '#351f5e', 90: '#2a1b49', 95: '#211735', 97: '#1d142d', 99: '#191226',
        },
        green: {
          1: '#f5f7f4', 2: '#f1f5f1', 5: '#e4eee7', 10: '#cae4d4', 15: '#aedac2', 20: '#91d1af',
          25: '#71c79d', 30: '#50bc8c', 35: '#29b07d',
        },
        // Legacy scale (spec lists endpoints only)
        light: { 100: '#f8f4f0', 500: '#dcd7d0' },
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
          'nav-blur': 'rgba(252,249,245,0.7)',
          'nav-backdrop': 'rgba(252,249,245,0.9)',
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
