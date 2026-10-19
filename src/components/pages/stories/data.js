// Stories sample data (specs/pages-c.md §5.6). Titles, dates, categories, vendors and hrefs are real; bodies/descriptions are placeholders.
import { stories, storyProps } from '../library/data.js'

const S = '/assets/pages/stories'
const wn = (slug, title, categories, date, icon, n) => ({
  slug, title, categories, date, icon: `${S}/whatsnew-icon-${icon}.svg`, avatar: `${S}/whatsnew-contributor-${n}.jpg`, href: `/stories/whats-new/${slug}/`,
})

export const products = [
  { name: 'Storyboard', href: '/stories/storyboard/', blurb: 'Flexible, intuitive workflow builder', icon: `${S}/product-icon-storyboard.svg`, backdrop: `${S}/card-backdrop-storyboard.svg`,
    card: 'bg-tint-peach border-tint-peach-hover text-tab-people hover:border-tab-people' },
  { name: 'Workbench', href: '/stories/workbench/', blurb: 'Universal, Tines-powered AI copilot', icon: `${S}/product-icon-workbench.svg`, backdrop: `${S}/card-backdrop-workbench.svg`,
    card: 'bg-green-5 border-tint-green-dot text-tab-it hover:border-tab-it' },
  { name: 'Cases', href: '/stories/cases/', blurb: 'Intuitive case and incident management', icon: `${S}/product-icon-cases.svg`, backdrop: `${S}/card-backdrop-cases.svg`,
    card: 'bg-purple-2 border-tint-lilac-edge text-purple-65 hover:border-purple-65' },
]
export const features = [
  { name: 'Agents', href: '/stories/agents/', blurb: 'Enable autonomous workflow activity and user interaction.', icon: `${S}/feature-icon-agents.svg`, ring: 'bg-green-5 border-green-15 group-hover:border-green-20' },
  { name: 'AI in Tines', href: '/ai-in-tines/', blurb: 'Leverage the power of AI in your most important workflows.', icon: `${S}/feature-icon-ai-in-tines.svg`, ring: 'bg-purple-2 border-tint-lilac-line-2 group-hover:border-tint-lilac-line' },
  { name: 'Monitoring', href: '/stories/monitoring/', blurb: 'Visibility into workflow performance, trends, and impact.', icon: `${S}/feature-icon-monitoring.svg`, ring: 'bg-coll-blush border-coll-blush-line group-hover:border-tint-rose-line' },
]

// Category -> tile tint (records = sand, AI = blue-grey, everything else lilac)
export const tileTone = (categories) =>
  categories.startsWith('Records') ? 'bg-coll-sand border-coll-sand-line'
    : categories.startsWith('AI') ? 'bg-coll-mist border-coll-mist-line'
      : 'bg-purple-5 border-purple-10'

export const whatsNew = [
  wn('record-list-actions-get-cursor-pagination-multi-field-sorting-and-lighter-queries', 'Record List actions get cursor pagination, multi-field sorting, and lighter queries', 'Records and dashboards, Actions', 'October 16, 2026', 'spot-icon-monitor', 1),
  wn('personal-tool-controls-in-workbench', 'Personal tool controls in Workbench', 'AI in Tines', 'October 16, 2026', 'spot-icon-agents', 2),
  wn('claude-haiku-55-is-now-available', 'Claude Haiku 5.5 is now available', 'AI in Tines', 'October 16, 2026', 'spot-icon-agents', 3),
  wn('postgresql-18-support-for-for-self-hosted-deployments', 'PostgreSQL 18 support for for self-hosted deployments', 'Self-hosted', 'October 15, 2026', 'spot-icon-radar-self-hosted', 4),
  wn('keyless-cloud-credentials-with-workload-identity-federation', 'Keyless cloud credentials with workload identity federation', 'Credentials and resources', 'October 15, 2026', 'credentials-key', 5),
  wn('ai-web-search-web-extraction-now-available-in-the-eu', 'AI web search: web extraction now available in the EU', 'AI in Tines', 'October 15, 2026', 'spot-icon-agents', 6),
  wn('new-field-types-for-cases', 'New field types for cases', 'Cases', 'October 15, 2026', 'spot-icon-cases', 7),
  wn('mention-tasks-in-cases', 'Mention tasks in cases', 'Cases', 'October 15, 2026', 'spot-icon-cases', 8),
  wn('cases-full-text-search', 'Full-text search and filter groups in Cases', 'Cases', 'October 14, 2026', 'spot-icon-cases', 9),
]
export const whatsNewBySlug = (s) => whatsNew.find((w) => w.slug === s)
export const WHATS_NEW_PAGES = 55

const MONTHS = ['OCTOBER', 'SEPTEMBER', 'AUGUST', 'JULY', 'JUNE', 'MAY', 'APRIL', 'MARCH', 'FEBRUARY', 'JANUARY']
/** 20 entries for page n (cycles the 9 real entries), plus the month divider label for that page. */
export function whatsNewPage(n) {
  const entries = Array.from({ length: 20 }, (_, i) => whatsNew[(i + (n - 1) * 20) % whatsNew.length])
  const mi = Math.floor((n - 1) / 4)
  const month = `${MONTHS[mi % MONTHS.length]} ${2026 - Math.floor(mi / 12) - (mi >= 10 ? 1 : 0)}`
  return { entries, month, count: n === 1 ? 22 : 26 }
}
export const whatsNewBodies = {
  'personal-tool-controls-in-workbench': { paras: [['Pick which ', { a: 'preset tools', href: '/stories/docs/quickstart/' }, ' Workbench uses for you. Your choices stay personal, so the shared preset and the rest of your team’s setup are left untouched by whatever you switch on or off.']], video: true },
  'claude-haiku-55-is-now-available': { paras: ['A new, faster model option is now selectable in AI actions and agents. It suits quick classification and short summarising steps, where response time matters more than depth, and it can be mixed with larger models inside the same story for tougher reasoning steps further along the way, keeping both cost and latency in check.'] },
}

// ---- Templates ----
export const topProducts = [
  ['Slack', 'slack', 'svg'], ['VirusTotal', 'virustotal', 'svg'], ['Jira Software', 'jira-software', 'svg'], ['URLScan.io', 'urlscan-io', 'svg'],
  ['Microsoft Graph', 'microsoft-graph', 'png'], ['Pulsedive', 'pulsedive', 'svg'], ['Gmail', 'gmail', 'svg'], ['CrowdStrike', 'crowdstrike', 'svg'],
  ['Google Calendar', 'google-calendar', 'svg'], ['AbuseIPDB', 'abuseipdb', 'svg'], ['GitHub', 'github', 'svg'], ['EmailRep', 'emailrep', 'png'],
].map(([name, slug, ext]) => ({ name, slug, href: `/stories/templates/${slug}/`, icon: `${S}/product-logo-${slug}.${ext}` }))
// The live grid has 24 entries; only the first 12 logos are in the downloaded assets, the rest render a lettered placeholder tile.
export const moreProducts = ['Okta', 'OpenAI', 'GreyNoise', 'AWS IAM', 'Google Sheets', 'PagerDuty', 'Recorded Future', 'APIVoid', 'Google Admin Console', 'Drata', 'Talos Intelligence', 'Tenable Vulnerability Management']
  .map((name) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), href: `/stories/templates/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`, icon: null }))
export const byVendor = [
  ['AWS', 'aws'], ['Cisco', 'cisco'], ['Google', 'google'], ['Microsoft', 'microsoft'], ['Atlassian', 'atlassian'], ['Palo Alto Networks', 'palo-alto-networks'],
  ['Splunk', 'splunk'], ['Proofpoint', 'proofpoint'], ['HashiCorp', 'hashicorp'],
].map(([name, slug]) => ({ name, slug, href: `/stories/templates/${slug}/`, icon: `${S}/family-logo-${slug}.svg` }))
export const byCategory = [
  'Communication and collaboration', 'Security and threat intelligence', 'Cloud services and infrastructure', 'Productivity', 'Identity and access management',
  'Threat detection and response', 'Enterprise resource management', 'Data analytics', 'Email and messaging security', 'DevOps',
]
export const categoryOptions = [
  'All categories', 'Communication & collaboration', 'Security & threat intelligence', 'Cloud services & infrastructure', 'Productivity', 'Identity & access management',
  'Threat detection & response', 'Enterprise resource management', 'Data analytics', 'Email & messaging security', 'DevOps',
]

const T = (name, tools, id, slug) => ({ name, tools, id, slug })
const vendorStories = {
  '1password': [
    T('Suspend users in 1Password from SIEM alerts enriched with an AI agent', '1Password, AbuseIPDB, Tines, VirusTotal', '1346340', 'suspend-users-in-1password-from-siem-alerts-enriched-with-an-ai-agent'),
    T('Create credentials that reference 1Password vaults', '1Password', '1144246', 'create-credentials-that-reference-1password-vaults'),
  ],
  abuseipdb: [
    T('Lookup IOCs via Slack using an agent', 'AbuseIPDB, Slack, URLScan.io, VirusTotal', '1347799', 'lookup-iocs-via-slack-using-an-agent'),
    T('Enrich & remediate suspicious logins reported in Okta', 'AbuseIPDB, Okta, Slack, VirusTotal', '1129115', 'enrich-remediate-suspicious-logins-reported-in-okta'),
    T('Analyze an IP in many services at once', 'AbuseIPDB, APIVoid, GreyNoise, Jira Software, Pulsedive, VirusTotal', '87626', 'analyze-an-ip-in-many-services-at-once'),
    T('Receive enriched IP information via Slack', 'AbuseIPDB, GreyNoise, Slack, VirusTotal', '87698', 'receive-enriched-ip-information-via-slack'),
    T('Lookup IOCs in different tools via Slackbot', 'Abuse.ch, AbuseIPDB, Anomali ThreatStream, CrowdStrike, Hunter.io, Hybrid Analysis, MetaDefender, Pulsedive, Slack, URLScan.io, VirusTotal', '87595', 'lookup-iocs-in-different-tools-via-slackbot'),
    T('Ingest, enrich, and remediate ExtraHop alerts and block suspicious URLs with Zscaler', 'AbuseIPDB, Extrahop, Microsoft Teams, URLScan.io, VirusTotal, Zscaler', '1194365', 'ingest-enrich-and-remediate-extrahop-alerts-and-block-suspicious-urls-with-zscaler'),
  ],
}
const named = { '1password': { name: '1Password', icon: `${S}/template-hero-1password.svg` }, abuseipdb: { name: 'AbuseIPDB', icon: `${S}/product-logo-abuseipdb.svg`, prebuilt: true } }

export function vendorBySlug(slug) {
  const p = topProducts.find((x) => x.slug === slug) || byVendor.find((x) => x.slug === slug)
  const n = named[slug]
  if (!p && !n) return null
  const name = n?.name || p.name
  const cards = vendorStories[slug] || [
    T(`Look up indicators with ${name} and route the result`, `${name}, Slack`, '1347799', 'lookup-iocs-via-slack-using-an-agent'),
    T(`Triage a ${name} alert and open a ticket`, `${name}, Jira Software`, '1354837', 'contain-or-release-hosts-in-crowdstrike-from-jira'),
    T(`Notify a team about ${name} activity`, `${name}, Slack`, '1359340', 'request-and-approve-slack-posts-to-a-restricted-channel'),
  ]
  const themes = ['purple', 'green', 'orange', 'pink']
  return {
    slug, name, icon: n?.icon || p.icon, prebuilt: !!n?.prebuilt,
    stories: cards.map((c, i) => ({ ...storyProps({ ...stories[i % stories.length], ...c, theme: themes[i % 4] }, i), tools: c.tools, name: c.name, id: c.id, slug: c.slug, href: `/library/stories/${c.id}/${c.slug}/` })),
  }
}
export const relatedResources = [
  { eyebrow: 'Blog', title: 'Stay in the know', cta: 'Read now →', href: '/blog/', tone: 'orange' },
  { eyebrow: 'Case studies', title: 'Powerful users, powerful stories', cta: 'Discover how →', href: '/customers/', tone: 'purple' },
  { eyebrow: 'Learn', title: 'University', cta: 'Start learning →', href: '/university/', tone: 'purple' },
  { eyebrow: 'Learn', title: 'Learn to use Tines Stories with our docs', cta: 'Read docs →', href: '/stories/docs/quickstart/', tone: 'purple' },
]
