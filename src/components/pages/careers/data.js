// Content + assets for /careers/ (specs/pages-a.md §12). Copy is original placeholder text except headings / UI labels / card titles.
const raw = import.meta.glob('../../../../reference/svg/pages/careers-*.svg', { query: '?raw', import: 'default', eager: true })
export const svg = (name) => {
  const hit = Object.entries(raw).find(([k]) => k.endsWith(`/careers-${name}.svg`))
  if (!hit) throw new Error(`missing careers svg ${name}`)
  return hit[1]
}
const A = '/assets/pages/careers/'
export const asset = (f) => A + f

// Floating hero badges: [svg name, x, y (hero-relative, 1440 wide), width, parallax-free]
export const HERO_DECOS = [
  ['joinourteam', 173, 541, 84], ['joinourteam-2', 432, 311, 84], ['joinourteam-3', 70, 310, 92], ['joinourteam-4', -6, 255, 84],
  ['joinourteam-5', 297, 235, 84], ['joinourteam-6', 401, 44, 84], ['joinourteam-7', 1062, 160, 90], ['joinourteam-8', 1258, 344, 84],
  ['joinourteam-9', 942, 454, 84], ['joinourteam-10', 1226, 425, 84], ['joinourteam-11', 1162, 450, 84], ['joinourteam-12', 1413, 541, 84],
].map(([n, x, y, w]) => ({ svg: svg(n), x, y, w }))
export const HERO_DECOS_SMALL = ['joinourteam-13', 'joinourteam-14', 'joinourteam-15', 'joinourteam-16'].map((n) => svg(n))

export const STATS = [
  { icon: svg('pdnec9y'), lead: '98% of our team would recommend Tines as a ', strong: 'great place to work', ink: 'text-purple-60' },
  { icon: svg('pdnec9y-2'), lead: '98% of our team are ', strong: 'proud to work here', ink: 'text-pga-green-link' },
  { icon: svg('pdnec9y-3'), lead: '97% of our team feel their work ', strong: 'contributes to our goals', ink: 'text-pink-60' },
]

// "Where we work": x/y are relative to the 1440 field below the heading; par = parallax range (px)
export const TILES = [
  { name: 'Dublin', sub: 'Our European headquarters', x: 118, y: 57, size: 360, big: true, border: 'border-purple-40', ink: 'text-purple-60', icon: svg('dataimg-where-we-work'), iw: 80, par: '4,-9' },
  { name: 'Boston', sub: 'Our US headquarters', x: 541, y: 137, size: 360, big: true, border: 'border-lgc-pink-line-40', ink: 'text-pink-60', icon: svg('dataimg-where-we-work-2'), iw: 70, par: '-11,24' },
  { name: 'Remote', x: 964, y: 16, size: 360, big: true, border: 'border-lgc-orange', ink: 'text-pga-green-link', img: asset('HQRemote-15cb7ab4043bb86b478341abdf594b0e.svg'), iw: 89, par: '10,-14' },
  { x: 21, y: 530, size: 162, border: 'border-purple-40', par: '-14,16' },
  { name: 'SF Hub', x: 248, y: 481, size: 250, border: 'border-lgc-orange-line-dk', ink: 'text-lgc-orange-line-dk', par: '12,-16' },
  { x: 550, y: 550, size: 120, border: 'border-lgc-lime-line', par: '-9,12' },
  { name: 'Australia', x: 938, y: 448, size: 250, border: 'border-lgc-blue-line', ink: 'text-pga-green-link', par: '-18,10' },
  { x: 1234, y: 507, size: 258, border: 'border-lgc-teal-line', par: '14,-21' },
]

export const POSTS = [
  { title: 'Five questions with Blake Coolidge, Head of GTM Initiatives', img: '1746197549-inside-tines-blake-1.png' },
  { title: 'Five questions with Yannick Gloster, Software Engineer', img: '1741014420-inside-tines-yannick-1.png' },
  { title: 'Five questions with Ashley Buck, Regional Lead for Sales Development', img: '1741014420-inside-tines-ashley-1.png' },
  { title: 'Five questions with Colm O’Grada, Director of Data and Analytics', img: '1741014420-inside-tines-colm-1.png' },
  { title: 'Tines Technical Advisory Board (TAB) Takeaways with Pete: part one', img: '1689674312-tab_1.png' },
].map((p) => ({ ...p, img: asset(p.img), href: '/blog/' }))

export const AWARDS = [
  { img: 'TimesAward-dc788a1fa0c0bd826bdb5ea78922437a.png', source: 'The Sunday Times Ireland', title: 'Best places to work', year: '2025' },
  { img: 'BostonJournalAward-4419bf0f667b065e1ea55ac06a05fe9c.png', source: 'Boston Business Journal', title: 'Best places to work', year: '2026' },
  { img: 'DeloitteAward-76ef37a837efba6f7fc2980ab8f3cb6a.png', source: 'Deloitte', title: 'Ireland Technology Fast 50', year: '2025' },
].map((a) => ({ ...a, img: asset(a.img) }))

export const BENEFITS = [
  ['Competitive compensation', 'We pay fairly and consistently. Compensation reflects your skills, impact and growth, and follows the same philosophy in every location where we hire, so that people are rewarded in the same way everywhere.'],
  ['Startup equity', 'Share in what we build together with equity and a generous window to exercise it after you join.'],
  ['Retirement (401k) / pension / superannuation', 'Plan for the future with employer contributions to a retirement or pension plan.'],
  ['Comprehensive healthcare', 'Private healthcare coverage that is tailored to you.'],
  ['Generous paid time-off (PTO)', 'Plenty of annual leave in every location, plus extra company-wide holidays so you can switch off.'],
  ['Parental leave', 'Inclusive, generous leave policies that support every kind of family.'],
  ['Employee assistance programs', 'Confidential support and resources for when you need them most.'],
  ['Breastfeeding support', 'Help for parents who travel for their role at Tines.'],
  ['Home office setup', 'Everything you need to build a comfortable, productive workspace at home.'],
  ['Phone and home internet reimbursement', 'A monthly allowance to help with these costs.'],
  ['Upskill', 'An annual education budget to invest in your growth and career.'],
  ['Social gatherings', 'Team events that help us connect, celebrate and have fun together.'],
]

// ~34 PLACEHOLDER openings (team / role / location). Not real postings: they stand in for the Greenhouse feed.
const L = ['United States (Remote)', 'Dublin, Ireland (Hybrid)', 'Ireland (Remote)', 'Boston, MA (Hybrid)', 'North America (Remote)', 'United Kingdom (Remote)', 'Ireland (Remote), Dublin', 'Boston, MA (Hybrid), Remote']
const PLAN = [
  ['Marketing', ['Field Marketing Manager', 'Content Marketing Specialist', 'Lifecycle Marketing Manager', 'Brand Designer']],
  ['Legal', ['Legal Counsel']],
  ['Commercial Operations', ['Sales Systems Specialist', 'Manager, Sales Compensation', 'Deal Desk Analyst']],
  ['Product', ['Product Marketing Manager', 'Senior Product Manager', 'Product Designer']],
  ['Knowledge, Education & Support', ['Technical Support Engineer I', 'Technical Support Engineer II', 'Documentation Specialist']],
  ['Professional Services', ['Professional Services Engineer', 'Senior Forward Deployed Engineer', 'Solutions Architect']],
  ['Engineering', ['Software Engineer, Platform', 'Software Engineer, Product', 'Senior Software Engineer', 'Site Reliability Engineer', 'Security Engineer', 'Engineering Manager']],
  ['Sales', ['Account Executive', 'Sales Development Representative', 'Solutions Engineer', 'Regional Sales Manager', 'Enterprise Account Executive']],
  ['Customer Success', ['Customer Success Manager', 'Senior Customer Success Manager', 'Renewals Manager']],
  ['People', ['Talent Partner', 'People Operations Specialist', 'Recruiting Coordinator']],
]
export const JOBS = PLAN.flatMap(([team, roles], ti) =>
  roles.map((role, i) => ({ id: `${ti}${i}`, team, role, location: L[(ti * 3 + i * 2 + (i % 3)) % L.length] })),
).map((j, n) => (n % 7 === 3 ? { ...j, location: 'North America (Remote), United States - East (Remote)' } : j))
export const TEAMS = PLAN.map(([t]) => t)
export const LOCATIONS = L.slice(0, 6)

// ~40-word ORIGINAL placeholder bodies for the three value cards (icons from the downloaded careers set)
export const VALUES = [
  { title: 'Simplicity', icon: svg('dataimg-simplicity'), body: 'We cut through complexity so our product, our processes and our conversations stay easy to understand. Every decision should remove friction and keep attention on the work that matters.' },
  { title: 'Speed', icon: svg('dataimg-simplicity-2'), body: 'We move quickly, ship often and learn from what we hear. Speed only matters with purpose, so we take ownership, gather feedback and improve in small steps until pace becomes momentum.' },
  { title: 'Soundness', icon: svg('dataimg-simplicity-3'), body: 'We hold ourselves to a high bar for quality, security and honesty. Doing right by customers and teammates sets us apart, so we are open about our work, our limits and our mistakes.' },
]
