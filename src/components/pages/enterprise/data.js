// Content + assets for /enterprise/ (specs/pages-a.md §10). Body copy is original placeholder text of similar length.
const raw = import.meta.glob('../../../../reference/svg/pages/enterprise-*.svg', { query: '?raw', import: 'default', eager: true })
export const svg = (name) => {
  const hit = Object.entries(raw).find(([k]) => k.endsWith(`/enterprise-${name}.svg`))
  if (!hit) throw new Error(`missing enterprise svg ${name}`)
  return hit[1]
}
const A = '/assets/pages/enterprise/'

export const HERO = {
  left: `${A}enterpriseHeroIllustrationLeft-dc696c12d805cb81d6aa93001e8385e5.svg`,
  right: `${A}enterpriseHeroIllustrationRight-77fc888ef5020ad34e300d72176253ca.svg`,
  mobile: `${A}enterpriseHeroIllustrationMobile-f41fd3e9c243b4bcbed749a7ef193ff4.svg`,
}

// 16 logos per marquee half (file order = on-page order)
export const MARQUEE_LOGOS = [
  'canva', 'code42', 'coinbase', 'databricks', 'elastic', 'intelligent-workflows-for-the-enterprise', 'intelligent-workflows-for-the-enterprise-2',
  'intelligent-workflows-for-the-enterprise-3', 'intelligent-workflows-for-the-enterprise-4', 'mars', 'mckesson', 'navan',
  'intelligent-workflows-for-the-enterprise-5', 'reddit', 'sophos', 'sprinklr',
].map(svg)

export const FRAME_GRID = svg('intelligent-workflows-for-the-enterprise-10')

export const OPERATE = [
  {
    icon: svg('dataimg-intelligent-workflows-for-the-enterprise'),
    title: 'Improve operational efficiency and ROI on tech investments',
    text: 'Work through tech debt with your existing resources to modernize your infrastructure. Tines customers find their teams:',
    bullets: ['Take on more projects', 'Communicate better across stakeholders', 'Get rid of software bloat'],
  },
  {
    icon: svg('dataimg-intelligent-workflows-for-the-enterprise-2'),
    title: 'Accelerate your AI strategic goals',
    text: 'Rolling out AI and LLMs is slowed by security and privacy worries. AI in Tines is:',
    bullets: ['Private and secure by default', 'Free from training, logging, networking, and storage via AWS Bedrock'],
  },
  {
    icon: null, // enterpriseFloatingShieldedBuildingIcon (public asset)
    iconUrl: `${A}enterpriseFloatingShieldedBuildingIcon-1ed05126eb5216037499b356d9f349c8.svg`,
    title: 'Mitigate risk and reinforce your security posture',
    text: 'Avoid vendor lock-in and single points of failure. With Tines, you gain:',
    bullets: ['Agility to your evolving ecosystem', 'Adherence to compliance and corporate policies'],
  },
]

export const FEATURES = [
  { title: 'Vendor-agnostic', href: '/stories/templates/', img: '1730990024-tines-integrations-logo-grid.svg' },
  { title: 'Private and secure AI, always', href: '/ai-in-tines/', img: '1730990056-tines-private-and-secure-ai.svg' },
  { title: 'Enterprise-grade controls and monitoring', img: '1730990075-tines-enterprise-grade-controls-and-monitoring.svg' },
  { title: 'Deployed your way: hosted, self-hosted, or hybrid', img: '1730990110-tines-deploy-anywhere.svg' },
  { title: 'Advanced collaboration', img: '1731508299-tines-advanced-collaboration.svg' },
].map((f) => ({ ...f, img: A + f.img }))

// Scalability masonry: 4 columns. kind: quote | stat | number. tone keys -> classes in Scalability.jsx
export const SCALE_COLUMNS = [
  [
    { kind: 'quote', tone: 'violet', text: 'Our legacy tool slows down on a busy day, while Tines keeps pace without anyone noticing a change in speed.', caption: 'Tines vs. existing XSOAR performance at a Fortune 500 company', h: 250 },
    { kind: 'stat', tone: 'lilac', text: '750 days of work time saved', logo: 'cardfooter-elastic-1', h: 218 },
  ],
  [
    { kind: 'stat', tone: 'peach', text: '20x faster time to build a workflow compared to Python', logo: 'cardfooter-logo-2', h: 345 },
    { kind: 'number', tone: 'orange', value: '+4K', label: 'average action runs per second for a single story', h: 118 },
    { kind: 'quote', tone: 'rose', text: 'Automation reaches the parts of our business that never had developers on hand, in a way that feels far less like writing code.', logo: 'cardfooter-mars-3', h: 274 },
  ],
  [
    { kind: 'quote', tone: 'rose', text: 'Beyond the product and product teams’ agility and speed, the level of support from the team is the benchmark we hold every other vendor to.', logo: 'cardfooter-snowflake-4', h: 357 },
    { kind: 'stat', tone: 'lilac', text: '1.5 analysts per week freed to tackle other work', logo: 'cardfooter-mckesson-5', h: 360 },
    { kind: 'number', tone: 'green', value: '20K', label: 'and counting tenants worldwide', h: 108 },
  ],
  [
    { kind: 'stat', tone: 'mint', text: '91.4% faster time to correlate alerts', logo: 'cardfooter-snowflake-4', h: 212 },
    { kind: 'number', tone: 'pink', value: '26K', label: 'and counting builders', h: 108 },
  ],
]
export const SCALE_OFFSETS = ['xl:pt-[382px]', 'xl:pt-[145px]', '', 'xl:pt-[145px]']

const F = (n) => `${A}tines-illo-${n}`
export const TABS = [
  { id: 'security', label: 'Security', tone: 'lilac', img: F('security-operations--framed-a30b1f6905cc9b7f5b860e80b8373ff2.svg'), btn: 3,
    text: 'Across security operations, threat intelligence, vulnerability management and IAM, teams streamline their work and strengthen their security posture with Tines.' },
  { id: 'grc', label: 'Governance, Risk and Compliance', tone: 'mint', img: F('compliance--framed-ff0bd9fa4a986bab9b7a9e14b27a604d.svg'), btn: 4,
    text: 'Keep audit trails, evidence collection and policy checks running on schedule, so compliance work stops piling up behind everything else.' },
  { id: 'incidents', label: 'Managing incidents and alerts', tone: 'coral', img: F('incidents-and-alerts--framed-b3018038eac88ceed53622d74dafc87b.svg'), btn: 5,
    text: 'Triage, enrich and route alerts automatically, and bring the right people into an incident with the context they need to act quickly.' },
  { id: 'integration', label: 'System integration', tone: 'peach', img: F('asset-management--framed-95236292df040b5773fbb8cb53808c5a.svg'), btn: 6,
    text: 'Connect any tool with an API and keep records synchronized across systems, without waiting on a custom integration to be built.' },
  { id: 'lifecycle', label: 'Employee lifecycle management', tone: 'rose', img: F('employee-lifecycle-management--framed-dfd1b4398e0ec5c08b4bc89679ff84d4.svg'), btn: 7,
    text: 'Automate onboarding, role changes and offboarding across every system, so access is granted and removed on time, every time.' },
  { id: 'chatops', label: 'ChatOps', tone: 'lilac', img: F('chatops--framed-44ca26ebe9aece900064efdc27262570.svg'), btn: 8,
    text: 'Let people trigger and approve workflows right from chat, keeping humans in the loop where decisions matter most.' },
  { id: 'zerotrust', label: 'Zero trust', tone: 'mint', img: F('zero-trust--framed-a14dbd53112b10184b4965f74863c6e5.svg'), btn: 4,
    text: 'Continuously verify devices, identities and access with workflows that check posture and respond when something looks wrong.' },
]
export const TAB_TONES = {
  lilac: { tab: 'bg-tint-page-active border-tint-page-active text-legacy-ink', panel: 'bg-tint-page-bar text-legacy-ink' },
  mint: { tab: 'bg-lgc-mint-bg border-green-100 text-lgc-mint-ink-dk', panel: 'bg-lgc-mint-bg text-lgc-mint-ink-dk' },
  coral: { tab: 'bg-lgc-coral-bg border-lgc-coral-line text-lgc-coral-ink', panel: 'bg-lgc-coral-bg text-lgc-coral-ink' },
  peach: { tab: 'bg-lgc-peach-bg border-lgc-peach-tab-line text-lgc-peach-ink-dk', panel: 'bg-lgc-peach-bg text-lgc-peach-ink-dk' },
  rose: { tab: 'bg-lgc-rose-bg border-lgc-rose-tab-line text-lgc-rose-ink-dk', panel: 'bg-lgc-rose-bg text-lgc-rose-ink-dk' },
}

export const EXAMPLES = [
  { title: 'Incidents and alerts', tone: 'bg-lgc-red border-lgc-red-line', icon: 'tines-spot-icon-incidents-and-alerts-53a417a03af3738567c5b4e965e2301b.svg' },
  { title: 'Asset and app management', tone: 'bg-lgc-pink border-lgc-pink-line', icon: 'tines-spot-icon-asset-management-11ecb73ff2a204de597f6f0e0426087e.svg' },
  { title: 'Ticket synchronization', tone: 'bg-lgc-green border-pricing-green', icon: null, dataIcon: 'dataimg-see-more-practical-examples' },
  { title: 'Core capabilities', tone: 'bg-accent border-tint-violet-mid', icon: 'tines-spot-icon-core-capabilities-a858b8f65e06cbbd171c78d6d04bd2b3.svg' },
  { title: 'Threat intelligence', tone: 'bg-lgc-orange border-lgc-orange-line', icon: 'tines-spot-icon-threat-intel-0e21be167ccd0fb073898eb207e52803.svg' },
].map((e) => ({ ...e, icon: e.icon ? A + e.icon : null }))

export const PARTNER_LOGOS = [
  ['aws-marketplace', 'AWS Marketplace'], ['elastic-3', 'Elastic'], ['cardfooter-snowflake-4', 'Snowflake'], ['intelligent-workflows-for-the-enterprise-4', 'Jamf'],
  ['partnered-with-the-companies-you-trust-t-2', 'HashiCorp'], ['partnered-with-the-companies-you-trust-t-3', 'GuidePoint Security'],
  ['partnered-with-the-companies-you-trust-t-4', 'Wiz'], ['partnered-with-the-companies-you-trust-t-5', 'Optiv'],
  ['partnered-with-the-companies-you-trust-t-6', 'Drata'], ['partnered-with-the-companies-you-trust-t-7', 'Trace3'],
].map(([n, label]) => ({ svg: svg(n), label }))

export const STEP_ITEMS = [
  { icon: svg('with-you-every-step-of-the-way'), title: 'Professional services', text: 'Extra hands from our team and partners to speed up the value you get from Tines.', cta: 'Learn more', href: '/professional-services/' },
  { icon: svg('with-you-every-step-of-the-way-2'), title: 'Enterprise-grade support', text: 'A dedicated support team that stays with you across regions and time zones.', cta: 'Learn more', href: '/support/' },
  { icon: svg('with-you-every-step-of-the-way-3'), title: 'University', text: 'Onboard new teams to Tines Stories with a structured learning program.', cta: 'Start learning', href: '/university/' },
  { icon: svg('with-you-every-step-of-the-way-4'), title: 'Technical resources', text: 'Docs and how-to content that guide your team through every stage of adoption.', cta: 'Read the docs', href: 'https://explained.tines.com/' },
]

const G = (f) => `${A}${f}`
export const G2_BADGES = [
  { alt: 'Leader in Enterprise', data: 'dataimg-pdnec9y' },
  { alt: 'Best Usability in Enterprise', data: 'dataimg-pdnec9y-2' },
  { alt: 'Best Relationship in Enterprise', data: 'dataimg-pdnec9y-3' },
  { alt: 'Easiest To Do Business With in Enterprise', file: G('EasiestToDoBusinessWith_Enterprise-7eb17464f4f96d22cb74d4a2ab0d972d.svg') },
  { alt: 'Fastest Implementation in Enterprise', file: G('FastestImplementation_Enterprise-f8b0dc5564862f2c69260f96f07dbc75.svg') },
  { alt: 'Easiest Admin in Enterprise', data: 'dataimg-pdnec9y-4' },
].map((b) => ({ alt: b.alt, href: 'https://www.g2.com/products/tines/reviews', src: b.file || `data:image/svg+xml;utf8,${encodeURIComponent(svg(b.data))}` }))

export const CARDS = [
  { eyebrow: 'Partners', title: 'Explore our partners', cta: 'Learn more', href: '/partners/', tone: 'pink', legacy: true, icon: G('1731438139-icon-partner-directory.svg'), iconH: 'h-[92px]' },
  { eyebrow: 'Webinar', title: 'Remediating Mars’ Cloud Security Risks with Wiz and Tines', cta: 'Watch webinar', href: '/webinars/', tone: 'purple', iconSvg: svg('webinars-remediating-mars-cloud-security') },
  { eyebrow: 'Professional services', title: 'Explore our professional services', cta: 'Learn more', href: '/professional-services/', tone: 'green', icon: G('1731438183-tines-icon-professional-services.svg'), iconH: 'h-[102px]' },
  { eyebrow: 'Blog', title: 'Migrating from legacy SOAR to Tines', cta: 'Read now', href: '/blog/', tone: 'orange', legacy: true, compact: true },
  { eyebrow: 'Podcast', title: 'The Future of Security Operations', cta: 'Explore episodes', href: '/podcast/', tone: 'purple', compact: true },
]
