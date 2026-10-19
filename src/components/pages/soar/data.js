// Content + assets for /soar/ (specs/pages-a.md §11). Body copy is original placeholder text of similar length.
const raw = import.meta.glob('../../../../reference/svg/pages/soar-*.svg', { query: '?raw', import: 'default', eager: true })
export const svg = (name) => {
  const hit = Object.entries(raw).find(([k]) => k.endsWith(`/soar-${name}.svg`))
  if (!hit) throw new Error(`missing soar svg ${name}`)
  return hit[1]
}
const A = '/assets/pages/soar/'
export const asset = (f) => A + f

export const HERO_ILLO = asset('1731490800-tines-illustration-universe.svg')
export const RATINGS = svg('break-away-from-legacy-soar')

// Row 1 then row 2 (the marquee rotates the list by half, so each row shows all 18)
export const TRUSTED = ['3', '4', '5', '6', '7', '8', '9', '', '2', '12', '13', '14', '15', '16', '17', '18', '10', '11'].map((n) =>
  svg(n ? `trusted-by-industry-leaders-${n}` : 'trusted-by-industry-leaders'),
)

export const STATS = [
  { tone: 'purple', lead: '63% of security professionals took ', em: 'more than 6 months to deploy their current SOAR solution.' },
  { tone: 'orange', lead: '88% of security professionals ', em: 'struggle to integrate their SOAR platform with external services.' },
  { tone: 'green', lead: '88% say that they believe bundled SOAR platforms will be ', em: 'replaced by standalone best-in-class products.' },
]
export const STAT_TONES = {
  purple: { box: 'border-purple-40 bg-purple-5 text-purple-70', mid: 'bg-purple-10', strong: 'bg-tint-lilac-line' },
  orange: { box: 'border-tint-orange-dot bg-tint-peach text-orange-70', mid: 'bg-tint-peach-mid', strong: 'bg-tint-peach-line' },
  green: { box: 'border-tint-green-line bg-green-5 text-tint-green-ink-dk', mid: 'bg-green-10', strong: 'bg-green-20' },
}

const mux = (id) => ({ video: asset(`mux-${id}.mp4`), poster: asset(`${id}-thumbnail.jpg`) })
export const FEATURES = [
  { kicker: 'Smart, secure workflows', title: 'Automate with SOAR that scales', body: 'Give analysts and engineers what they need to automate the work closest to them, so repetitive tasks fade and the important work gets their attention.', tone: 'bg-purple-10 border-tint-lilac-edge', ...mux('yBWr48GtZb302cW9k4mSfn5KUIOn7901Iy') },
  { kicker: 'The depth and flexibility to make an impact', title: 'Power interoperability across your stack', body: 'Connect to any tool that exposes an API and keep every system in step, without waiting for a vendor to ship the integration you need.', tone: 'bg-tint-rose-mid border-tint-pink-dot', ...mux('2JlKQb4n4mvg6T2JzoVUZErTQDsV8K7Z') },
  { kicker: 'Scalable and accessible automation', title: 'Build without technical blockers', body: 'A visual builder lets people from any background design, test and ship workflows, while engineers keep the freedom to drop into code.', tone: 'bg-purple-10 border-tint-lilac-edge', ...mux('syyEdoEeVvvPTkTzNCFqAxoPaRNvcVuB') },
  { kicker: 'Built by you, powered by Tines', title: 'Foster a culture of cybersecurity', body: 'Put automation in the hands of the whole organization, so everyone can contribute to keeping the company safe and share what they build.', tone: 'bg-green-10 border-green-30', ...mux('WHaEsYObZGQxgY77u6K9q2oKUOg7QK4d') },
  { kicker: 'Streamlined incident response', title: 'Streamline case management processes', body: 'Fewer cases and faster response come from better automation. Investigate, remediate and report in one collaborative workspace built into the platform.', tone: 'bg-purple-10 border-tint-lilac-edge', ...mux('E3k3UKKP5lMknGd7ZfnbhKHn5aBTMZu4') },
]

export const WHOLE_TEAM = {
  tabText: 'Tines moved us off rigid SOAR playbooks to a platform that scales and that the whole team can use.',
  stat: 'Expanded usage from 1 engineer to 5 teams',
  quote: 'It lets us bring automation to parts of the business that never had engineers to spare, and it feels nothing like writing code.',
  name: 'Gregory Poniatowski',
  role: 'Director of Cyber Threat and Vulnerability',
}

export const CARDS = [
  { eyebrow: 'Blog', title: 'SOAR tools: what to look for before investing in security automation', cta: 'Read now', href: '/blog/', tone: 'purple', icon: asset('1731080855-spot-icon-plug-purple.svg'), iconH: 'h-[72px]' },
  { eyebrow: 'Case study', title: 'Mars achieves coverage of 80-90% of sources for true positives in weeks', cta: 'Read now', href: '/case-studies/', tone: 'case-purple', logo: asset('1689279266-mars-com-logo-white.svg'), caseDecor: true },
  { eyebrow: 'Report', title: 'GigaOm Radar Report for SOAR', cta: 'Access the report', href: '/library/', tone: 'orange', legacy: true, icon: asset('1730307672-gigaom-report-24-landing-page-image.png'), iconH: 'h-[30px]' },
  { eyebrow: 'Blog', title: 'Migrating from legacy SOAR platform to Tines: a step-by-step guide', cta: 'Read now', href: '/blog/', tone: 'pink', legacy: true, icon: asset('1731493887-spot-icon-run.svg'), iconH: 'h-[70px]' },
  { eyebrow: 'Case study', title: 'Beyon Cyber uses Tines to fuel expansion and innovation', cta: 'Read now', href: '/case-studies/', tone: 'case-green', logo: asset('1720800025-beyon-cyber-logo-white.svg'), caseDecor: true },
  { eyebrow: 'Blog', title: 'Solving the integrations problem, why it’s time to think differently', cta: 'Read now', href: '/blog/', tone: 'orange', legacy: true, icon: asset('1730980836-spot-icon-soar.svg'), iconH: 'h-[78px]' },
  { eyebrow: 'Podcast', title: 'Security Weekly: The Case for Migrating from Legacy SOAR Systems', cta: 'Watch now', href: 'https://www.youtube.com/', ext: true, tone: 'green', icon: asset('1731080761-spot-icon-core-capabilities.svg'), iconH: 'h-[88px]' },
]

// "Sounds... hard to believe?" mosaic (positions inside the 720x654 right panel at 1440)
export const MOSAIC = [
  { x: 0, y: 0, w: 144, h: 96, tone: 'bg-tint-peach' },
  { x: 168, y: 0, w: 120, h: 96, tone: 'bg-purple-10' },
  { x: 312, y: 24, w: 168, h: 168, kind: 'stat', tone: 'bg-orange-50 text-lightest', logo: 'knowbe4', big: '50% reduction', small: 'in time spent per ticket' },
  { x: 504, y: 24, w: 168, h: 168, kind: 'stat', tone: 'bg-pink-50 text-lightest', big: '750 days', small: 'of work time saved', logoWord: 'elastic' },
  { x: 696, y: 0, w: 40, h: 192, tone: 'bg-green-5' },
  { x: 25, y: 120, w: 263, h: 285, kind: 'quote', tone: 'bg-green-5 border-green-20 text-tint-green-ink-dk border', text: 'Beyond the product itself, the support from the team is the benchmark we hold every other vendor to.', logoWord: 'snowflake' },
  { x: 312, y: 216, w: 263, h: 189, kind: 'quote', tone: 'bg-tint-peach border-tint-peach-line text-tint-orange-ink border', text: 'An opportunity to bring automation to teams that have no developers on hand.', logoWord: 'MARS' },
  { x: 599, y: 216, w: 140, h: 189, tone: 'bg-purple-10' },
  { x: 0, y: 430, w: 48, h: 222, tone: 'bg-tint-rose' },
  { x: 72, y: 430, w: 120, h: 120, kind: 'more', tone: 'bg-purple-5 border-tint-lilac-line text-purple-65 border' },
  { x: 216, y: 430, w: 264, h: 174, kind: 'quote', tone: 'bg-tint-rose border-tint-rose-line text-pink-70 border', text: 'However many tools you swap out, you can keep Tines right where it is.', logoWord: 'intercom' },
  { x: 504, y: 430, w: 168, h: 174, kind: 'stat', tone: 'bg-purple-50 text-lightest', big: '10 hours of work time', small: 'saved every day', logoWord: 'snowflake' },
  { x: 695, y: 430, w: 40, h: 222, tone: 'bg-tint-peach' },
  { x: 72, y: 574, w: 120, h: 78, tone: 'bg-tint-peach' },
  { x: 216, y: 628, w: 264, h: 24, tone: 'bg-green-5' },
  { x: 504, y: 628, w: 168, h: 24, tone: 'bg-tint-rose' },
]
