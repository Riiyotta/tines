// /3b/examples/ sample data (specs/pages-a.md §3). The live catalogue is CMS-driven (316 examples); this is a local sample.
export const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'
const L = '/assets/pages/3b-examples/'
export const TOOL_FILES = {
  slack: '1684522920-logo-slack.svg', anthropic: '1791212748-anthropic-icon.svg', salesforce: '1684522846-logo-salesforce.svg',
  notion: '1692231110-logo-notion.svg', calendar: '1781602588-calendar.svg', gmail: '1781602610-gmail.svg',
  greenhouse: '1756819854-greenhouse.png', bamboohr: '1684500824-logo-bamboohr.svg', sheets: '1781602539-sheets.svg',
  drive: '1781602557-drive.svg', google: '1781603599-google.svg', okta: '1684521852-logo-okta.svg', github: '1684502461-logo-github.svg',
  jira: '1684503328-logo-jira.svg', netsuite: '1739960574-netsuite.png', openai: '1684522175-logo-openai.svg',
  confluence: '1718370713-confluence.svg', zoom: '1694507781-logo-zoom.svg', teams: '1684521594-logo-microsoft-teams.svg',
}
export const toolSrc = (k) => L + TOOL_FILES[k]
export const toolLabel = (k) => k.charAt(0).toUpperCase() + k.slice(1)

export const AREA_NAV = {
  pill: { label: 'Tines 3B', href: '/3b/' },
  crumbs: [{ label: 'Examples', href: '/3b/examples/' }],
  links: [
    { label: 'Examples', href: '/3b/examples/' },
    { label: 'Updates', href: '/3b/product-updates/' },
    { label: 'Academy', href: 'https://academy.tines.com/', ext: true },
    { label: 'Docs', href: 'https://docs.3b.tines.com/', ext: true },
  ],
  cta: { label: 'Get started', href: SIGNUP_URL },
}

// Function filters ("bookmarks"): key, label, count, tone. Counts as on the live page.
export const BOOKMARKS = [
  { key: 'IT', count: 191, tone: 'green' },
  { key: 'Security', count: 104, tone: 'purple' },
  { key: 'RevOps', count: 91, tone: 'blue' },
  { key: 'Finance', count: 41, tone: 'teal' },
  { key: 'HR', count: 51, tone: 'orange' },
  { key: 'All', count: 316, tone: 'all' },
]

export const FILTERS = [
  { label: 'Build types', options: [['Agents', 82], ['Websites and dashboards', 112], ['Automations', 94], ['Forms and apps', 28]] },
  { label: 'Use cases', options: [['Investigate and enrich', 54], ['Monitor, alert and report on state', 76], ['Approve and provision', 41], ['Generate and summarize', 38]] },
  { label: 'Works with…', tools: true, options: [['slack', 99], ['salesforce', 48], ['anthropic', 62], ['gmail', 17], ['greenhouse', 9], ['notion', 14]] },
]

// Function palette (pages-a §3.2). All class strings are literal so Tailwind sees them.
export const TONES = {
  green: { card: 'border-green-20 text-tint-green-ink hover:border-purple-50', pill: 'bg-green-5', fn: 'bg-green-10 text-tint-green-ink-xdk', bm: 'border-green-20 bg-green-5 text-tint-green-ink' },
  purple: { card: 'border-tint-lilac-line text-purple-65 hover:border-purple-50', pill: 'bg-purple-5', fn: 'bg-purple-10 text-purple-80', bm: 'border-tint-lilac-line bg-purple-5 text-purple-65' },
  blue: { card: 'border-blue-20 text-blue-70 hover:border-purple-50', pill: 'bg-blue-5', fn: 'bg-blue-10 text-blue-80', bm: 'border-blue-20 bg-blue-5 text-blue-70' },
  teal: { card: 'border-teal-20 text-teal-70 hover:border-purple-50', pill: 'bg-teal-5', fn: 'bg-teal-5 text-teal-70', bm: 'border-teal-20 bg-teal-5 text-teal-70' },
  orange: { card: 'border-tint-peach-line text-tint-orange-ink hover:border-purple-50', pill: 'bg-tint-peach', fn: 'bg-tint-peach-mid text-orange-80', bm: 'border-tint-peach-line bg-tint-peach text-tint-orange-ink' },
}
export const FN_TONE = { IT: 'green', Security: 'purple', RevOps: 'blue', Finance: 'teal', HR: 'orange' }

export const FEATURED = [
  { eyebrow: 'IT', title: 'Automated device management for refresh cycles', tools: ['jira'], bg: 'bg-func-it border-func-it', ink: 'text-tint-rose', href: '/3b/examples/' },
  { eyebrow: 'Finance & RevOps', title: 'Revenue recognition automation from Salesforce to NetSuite with human review', tools: ['salesforce', 'netsuite'], bg: 'bg-func-finance border-func-finance', ink: 'text-purple-5', href: '/3b/examples/' },
]

export const CARDS = [
  { eyebrow: 'IT & HR', title: 'Sync BambooHR out of office to Google Calendar with approval', tools: ['bamboohr', 'calendar'] },
  { eyebrow: 'IT & Security', title: 'Agentic Threat Hunting', tools: ['anthropic'] },
  { eyebrow: 'IT & Security', title: 'AI-native security operations center with governed incident response', tools: [] },
  { eyebrow: 'IT', title: 'Simple Kanban to-do app with Slack integration', tools: ['slack', 'anthropic'] },
  { eyebrow: 'HR & IT', title: 'Employment contract generator with Greenhouse integration', tools: ['greenhouse', 'google'] },
  { eyebrow: 'HR', title: 'Interview case study generator with dummy datasets', tools: ['anthropic'] },
  { eyebrow: 'IT', title: 'Gmail email triage and filtering with AI prioritization', tools: ['gmail', 'anthropic', 'slack'] },
  { eyebrow: 'HR', title: 'Internal "Guess who?" using employee directory', tools: ['bamboohr', 'anthropic'] },
  { eyebrow: 'RevOps & IT', title: 'Email content approval checker for marketing drafts', tools: ['anthropic'] },
].map((c) => {
  const f = c.eyebrow.split(' & ')
  // card hue priority (live): HR > Security > RevOps > Finance > IT
  return { ...c, fn: ['HR', 'Security', 'RevOps', 'Finance'].find((k) => f.includes(k)) || 'IT' }
})

// Table rows (25 per page)
const R = (title, tools, fns, author) => ({ title, tools, fns, author })
export const ROWS = [
  R('Weekly goal tracker with Slack sync and calendar integration', ['slack', 'anthropic', 'calendar'], ['IT'], 'Daniela Oliveira'),
  R('Salesforce lifecycle and lead-stage automation with historical tracking', ['salesforce', 'slack', 'notion'], ['RevOps', 'IT'], 'Daniela Oliveira , Taryn Jane'),
  R('Team meeting icebreaker question generator', ['anthropic'], ['HR'], 'Taryn Jane'),
  R('RevOps case management system with AI assistant and Slack integration', ['salesforce', 'gmail', 'notion', 'slack'], ['RevOps', 'IT', 'Security'], 'Daniela Oliveira'),
  R('Marketing app directory with submission and approval workflow', ['slack'], ['IT', 'RevOps'], 'Taryn Jane'),
  R('Automatic Discourse topic tagger with AI', ['anthropic'], ['IT'], 'Spencer Vail'),
  R('Discourse community monitor with hourly Slack digests', ['slack'], ['IT'], 'Spencer Vail'),
  R('Workflow automation platform that generates and debugs automations from plain language', ['anthropic'], ['IT'], 'Edgar Ortiz'),
  R('Salesforce bulk data loader with visual query builder and request portal', ['salesforce'], ['RevOps', 'IT', 'Security'], 'Daniela Oliveira'),
  R('Self-calibrating SOC quality assurance with AI scoring and SOP improvement', [], ['Security', 'IT'], 'Colleen Gallagher'),
  R('Product-led growth funnel dashboard with live CRM data', ['salesforce'], ['RevOps', 'Finance'], 'Kelsey Evans'),
  R('Professional services advisory session scheduler with anonymous availability', ['calendar', 'gmail', 'zoom', 'slack'], ['RevOps', 'IT'], 'Jamison Bigham'),
  R('Vendor security risk assessment automator', [], ['Security', 'IT'], 'Gwen Powers'),
  R('Contract expiration tracker for legal teams', [], ['IT', 'Finance'], 'Kevin Davis'),
  R('Identity governance dashboard with automated access reviews', ['google', 'okta'], ['IT', 'Security'], 'Kevin Davis'),
  R('Compliance automation platform for NIST 800-171 and FedRAMP', [], ['Security', 'IT'], 'Kevin Davis'),
  R('Software spend tracker with renewal alerts', [], ['Finance', 'IT'], 'Kevin Davis'),
  R('Tines Tunnel interactive learning console and troubleshooting guide', ['anthropic', 'confluence'], ['IT', 'Security'], 'Gwen Powers'),
  R('Threat and vulnerability intelligence hub', [], ['Security', 'IT'], 'Kevin Davis'),
  R('Sales pipeline dashboard with deal age and risk flags', [], ['RevOps', 'Finance'], 'Kevin Davis'),
  R('Incident response runbook executor with interactive CLI', [], ['IT', 'Security'], 'Kevin Davis'),
  R('Recruiting dashboard synced to your ATS', ['greenhouse'], ['HR', 'RevOps'], 'Kevin Davis'),
  R('Team directory with AI-powered colleague discovery', ['anthropic'], ['HR', 'IT'], 'Alex Rosse'),
  R('Vendor bakeoff tool with AI-generated research and comparison matrix', ['anthropic'], ['IT'], 'Christina Troy'),
  R('Mock ERP API for prototyping integrations and agent demos', [], ['IT'], 'Edgar Ortiz'),
]
export const TOTAL_PAGES = 13
