// /case-studies/<slug>/ data (specs/pages-c.md §10.2 / §10.3). Headings, hero titles/highlights/section names are the live labels for notion + vimeo;
// every body paragraph, pull quote and quoted line is ORIGINAL placeholder copy sized to the live line counts (see STRUCTURE tokens).
import { CASE_STUDIES } from './cards.js'

const files = import.meta.glob('../../../../reference/svg/pages/*.svg', { query: '?raw', import: 'default', eager: true })
export const logoSvg = (name) => (name ? files[`../../../../reference/svg/pages/${name}.svg`] : undefined)

// Wordmark fallback for customers whose logo SVG was not downloaded
export const wordmark = (name) =>
  `<svg viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}"><text x="0" y="17" fill="currentColor" font-family="Roobert, sans-serif" font-size="15" font-weight="700" textLength="${Math.min(100, name.length * 8.6)}" lengthAdjust="spacingAndGlyphs">${name}</text></svg>`

const PLACEHOLDER_QUOTES = [
  'Moving our routine work into one place gave the team back hours it now spends on harder problems.',
  'We stopped chasing hand-offs, because every step is visible and easy to follow from start to end.',
  'The first workflow paid for itself within weeks, and the second took only an afternoon to build.',
  'Our analysts finally have room to think, since the repetitive parts of the job now run on their own.',
  'It connects everything we already use, which meant we could start small and grow without a rebuild.',
]

export const studies = CASE_STUDIES.map((c, i) => ({
  ...c,
  logoSvg: logoSvg(c.logo) || wordmark(c.company),
  hasLogo: !!logoSvg(c.logo),
  quote: c.quote ? PLACEHOLDER_QUOTES[i % PLACEHOLDER_QUOTES.length] : undefined,
  href: `/case-studies/${c.slug}/`,
}))

const TITLES = {
  notion: 'Notion reduces manual effort and improves consistency with Tines, strengthening security and IT operations',
  vimeo: 'Vimeo frees over 1,000 hours of security and IT capacity with Tines',
}
const HIGHLIGHTS = {
  notion: ['Automated workflows save the team 36 hours per week', 'Greater interconnectivity enables smoother operations and faster response', 'Improved consistency strengthens overall security posture'],
  vimeo: ['Daily identity checks now run automatically, saving 20+ hours per month', '2,000+ vulnerability tickets made actionable without manual triage, freeing over a thousand hours of analyst time', 'Security and IT build in one workflow environment, improving visibility, coordination, and handoffs'],
}
const sentence = (slug) => { const w = slug.replace(/-/g, ' '); return w.charAt(0).toUpperCase() + w.slice(1) }

// Block tokens: h = section heading, pN = paragraph of N lines, s = bold lead-in (1 line), qN = pull quote of N quote lines, i = image, L = lead block.
export const STRUCTURE = {
  vimeo: ["h","p5:34","h","p4:27","p5:38","h","p7:59","p5:40","h","p2:16","p7:60","p4:27","p7:60","h","i","p3:23","s","p8:69","s","p4:27","s","p7:51","p10:82","s","p7:63","s","p4:27","h","s","p6:46","s","p6:51","s","p6:51","s","p5:36","q2","h","p6:46","p5:36","h","p8:59","p5:40"],
  notion: ["h","L:36","h","p5:36","h","p5:46","p2:16","p4:38","h","p2:16","p3:29","q4:20","p1:3","p4:27","p2:16","p3:23","p3:23","p1:3","p2:16","h","i","p2:16","s","p4:27","p2:16","s","p2:16","p5:40","p2:16","s","p2:16","p3:24","p2:16","s","p2:16","p4:29","p2:16","q7:43","h","p2:16","s","p1:4","p4:38","p2:16","s","p4:29","p2:16","s","p2:16","p3:23","p2:16","q6:35","s","p2:16","p4:27","p3:22","p2:9","s","p1:3","p4:38","h","p2:16","p6:47","p3:26","p2:16","h","p3:24","p1:3","p4:29","p2:16","p3:29","q4:20"],
}

export const getStudy = (slug) => {
  const s = studies.find((x) => x.slug === slug)
  if (!s) return null
  const heads = ['About ' + (slug === 'vimeo' ? 'the customer' : s.company), 'Executive summary', 'The challenge', 'Why Tines', 'The Impact', 'Top workflows', 'Favorite feature', 'What’s next']
  if (slug === 'vimeo') heads[0] = 'About the customer'
  const customerLogo = slug === 'notion' || slug === 'vimeo' ? `/assets/pages/case-studies/logo-${slug}.svg` : null
  const others = studies.filter((x) => x.slug !== slug).slice(0, 3)
  return {
    ...s,
    title: TITLES[slug] || (slug.length > 30 ? sentence(slug) : `${s.company} cuts manual work and speeds up response with Tines`),
    highlights: HIGHLIGHTS[slug] || ['Routine work now runs on its own, freeing the team for higher-value projects', 'Clearer hand-offs improve visibility across security and IT', 'Teams build and improve workflows in one shared place'],
    heroQuote: 'Handing the routine work to automation changed how our team spends its week, and we can now focus on the projects that move the business forward.',
    customerLogo,
    heads,
    blocks: STRUCTURE[slug] || STRUCTURE.vimeo,
    image: `/assets/pages/case-studies/content-${slug === 'notion' ? 'notion' : 'vimeo'}.png`,
    related: others.map((o) => o),
  }
}
