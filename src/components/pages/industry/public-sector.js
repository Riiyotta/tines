// /public-sector/ page data (specs/pages-b.md 4 + section 7). Long body copy is original placeholder text of similar length.
import { svg, SHARED, PS, heroButtons } from './assets.js'

export const slug = '/public-sector/'
export const hero = {
  kicker: 'Public sector',
  title: 'Smart, secure workflows for SOAR and beyond',
  description: 'Agencies use our intelligent workflow platform to meet zero trust objectives and strengthen day-to-day security operations.',
  buttons: heroButtons(false),
  backdropSvg: svg.psHeroIllo,
  smallPrint: [
    { text: 'Our platform is available to federal and public sector buyers through ', link: { label: 'Carahsoft’s GSA Schedule 47QSWA18D008F', href: 'https://www.carahsoft.com/tines-automation-inc/contracts' }, after: ', SEWP V, and ITES-SW2 contracts.' },
    { text: 'Tines also appears on the DHS CDM Approved Products List.' },
  ],
}

const ex = (label, href, hue, icon) => ({ label, href, hue, icon })
export const sections = [
  { type: 'productVisual', gap: 'none', base: `${PS}/tines-public-sector-layered-product-visual` },
  {
    type: 'features',
    gap: 'pad',
    variant: 'compact',
    icon: svg.psIcon1,
    title: 'Modernize your security approach',
    description: 'Whatever your security goals, Tines helps your team reach them faster than traditional tools. Practitioners use Tines to speed up responses to events, cut the noise of duplicate alerts, and improve team efficiency.',
    cards: [
      { title: 'Vendor-agnostic', link: { label: 'Learn more', href: '/stories/templates/' }, img: `${SHARED}/tines-integrations-logo-grid.svg` },
      { title: 'Deployed your way: hosted, self-hosted, or hybrid', img: `${SHARED}/tines-deploy-anywhere.svg` },
      { title: 'Enterprise-grade controls and monitoring', img: `${PS}/tines-enterprise-grade-controls-and-monitoring.svg` },
    ],
  },
  {
    type: 'quote',
    quote: 'Tines does the work of several full-time analysts and gives our team room to dig deeper into the problems that matter.',
    name: 'Daniel Gallagher',
    title: 'Security Automation Engineer',
    logo: svg.elasticLogo,
    button: { label: 'Read the case study', href: '/case-studies/elastic/' },
  },
  {
    type: 'tabs',
    header: { variant: 'centered', title: 'Intelligent workflows for federal agencies', icon: svg.psIcon2, description: 'Meet zero trust, investigation and remediation mandates, and evolving federal requirements faster. Tines is flexible enough to enforce your own security policies while still supporting rapid, consistent response to threats.' },
    tabs: [
      { label: 'Identity', heading: 'Identity', desc: 'Apply dynamic access rules and step-up authentication, then respond automatically to identity-based threats.', img: `${SHARED}/tines-illo-communication-framed.svg` },
      { label: 'Devices', heading: 'Devices', desc: 'Automate device profiling and endpoint security checks in environments with personal devices.', img: `${PS}/tines-illo-endpoint-detection-and-response-framed.svg` },
      { label: 'Networks', heading: 'Networks', desc: 'Block unauthorized access and lateral movement by segmenting your networks as conditions change.', img: `${PS}/tines-networking-medium-illo-squared.svg` },
      { label: 'Apps and workloads', heading: 'Apps and workloads', desc: 'Watch application and workload security with dynamic allow and block lists and timely access.', img: `${PS}/tines-illo-monitor-framed.svg` },
      { label: 'Data', heading: 'Data', desc: 'Keep data programs current with automated tagging and just-in-time access for sensitive records.', img: `${SHARED}/tines-illo-compliance-framed.svg` },
    ],
  },
  {
    type: 'examples',
    button: { label: 'Visit library', href: '/library/' },
    cards: [
      ex('Incidents and alerts', '/library/use-cases/incidents-and-alerts/', 'orange', `${SHARED}/spot-icon-incidents-and-alerts.svg`),
      ex('Threat intelligence', '/library/threat-intelligence/', 'pink', `${SHARED}/spot-icon-threat-intelligence.svg`),
      ex('Phishing attack response', '/library/phishing-attack-response/', 'purple', `${PS}/spot-icon-phishing.svg`),
      ex('Compliance', '/library/compliance/', 'blue', `${PS}/spot-icon-compliance.svg`),
      ex('Vulnerability management', '/solutions/security/vulnerability-management/', 'green', `${PS}/spot-icon-vulnerability-management.svg`),
    ],
  },
  {
    type: 'partners',
    icon: svg.psIcon3,
    title: 'Partnered with the companies you trust today',
    logos: [
      { name: 'AWS Marketplace', svg: svg.aws },
      { name: 'Crowdstrike', svg: svg.crowdstrike },
      { name: 'Recorded Future', svg: svg.recordedFuture },
      { name: 'Elastic', svg: svg.elastic },
      { name: 'HashiCorp', svg: svg.psPartner1 },
      { name: 'Axonius', svg: svg.axonius },
      { name: 'Noname', svg: svg.noname },
      { name: 'Tenable', svg: svg.tenable },
    ],
  },
  {
    type: 'content',
    layout: 4,
    cards: [
      { eyebrow: 'Whitepaper', title: 'Operationalizing zero trust', cta: 'Access the whitepaper', href: '/access/whitepaper/operationalizing-zero-trust/', hue: 'purple', iconSrc: `${PS}/cover-1.png`, iconClass: 'h-[103.5px] w-[80px] rounded-[4px]' },
      { eyebrow: 'Blog', title: 'A federal AI SOC blueprint', cta: 'Read now', href: '/blog/federal-ai-soc-blueprint/', hue: 'green', iconSrc: `${PS}/spot-icon-governance-scroll.svg` },
      { eyebrow: 'Blog', title: 'Understanding your Tines deployment options', cta: 'Read now', href: '/blog/understanding-your-tines-deployment-options/', hue: 'pink', iconSrc: `${SHARED}/icon-automation-robot.svg` },
      { eyebrow: 'Cases', title: 'Automation-first case management', cta: 'Explore cases', href: '/stories/cases/', hue: 'purple', iconSrc: `${SHARED}/spot-icon-cases.svg` },
    ],
  },
]
