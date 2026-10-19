// /mssps/ page data (specs/pages-b.md 4 + section 8). Long body copy / customer quotes are original placeholder text of similar length.
import { svg, SHARED, MS, heroButtons } from './assets.js'

export const slug = '/mssps/'
export const hero = {
  variant: 'split',
  kicker: 'MSSPs',
  title: 'Intelligent workflows for MSSPs',
  description: 'Tines gives managed providers one secure platform to automate work across every client, so analysts can focus on outcomes instead of busywork. Design any process, connect any tool, and keep service quality high for every customer.',
  buttons: heroButtons(false),
  aside: svg.msspHeroIllo,
  // Logo order measured on the live track (widths 146, 90, 162, 154, 192, 53, 114, 152, 90). Two of the nine were not exported with the MSSP set; they reuse the customer-logo set (BEYON Cyber, Sophos).
  marqueeLogos: [svg.mssp1, svg.beyon, svg.mssp2, svg.mssp3, svg.mssp4, svg.mssp5, svg.mssp6, svg.mssp7, svg.sophos],
}

export const sections = [
  {
    type: 'valueProps',
    title: 'Tines transforms the way MSSPs operate',
    columns: [
      { icon: `${SHARED}/spot-icon-core-capabilities.svg`, title: 'Increase margins and operational efficiency', intro: 'Manual steps and disconnected tools cut into profit. With Tines your team can:', bullets: ['Automate workflows across every client', 'Reduce time spent on manual triage and analysis', 'Improve service delivery to your clients'] },
      { icon: `${MS}/spot-icon-application.svg`, title: 'Manage all your clients in one place', intro: 'Serving many clients should not mean juggling many platforms. Tines brings them together:', bullets: ['A unified platform for all client workflows', 'Secure data isolation between every client team', 'Easy workflow sharing and updates across clients'] },
      { icon: `${SHARED}/spot-icon-connected-wires.svg`, title: 'Connect with any tool. Build with natural language', intro: 'Clients run all kinds of software and Tines reaches it. You can describe a workflow and watch it take shape:', bullets: ['Leverage 1,100+ prebuilt workflows', 'Connect to any API', 'Build workflows using natural language'] },
    ],
  },
  {
    type: 'features',
    variant: 'grid',
    title: 'Build, run, and monitor your most important workflows',
    button: { label: 'Explore the platform', href: '/stories/' },
    cards: [
      { title: 'Vendor-agnostic', link: { label: 'Learn more', href: '/stories/templates/' }, img: `${SHARED}/tines-integrations-logo-grid.svg` },
      { title: '1,100+ pre-built workflows', link: { label: 'Explore now', href: '/library/' }, img: `${MS}/feature-highlight-workflows.svg` },
      { title: 'Client data protected at every level', img: `${MS}/feature-highlight-client-protected-data.svg` },
      { title: 'Deployed your way: hosted, self-hosted, or hybrid', img: `${SHARED}/tines-deploy-anywhere.svg` },
      { title: 'Private and secure AI, always', link: { label: 'Learn more', href: '/ai-in-tines/' }, img: `${MS}/tines-private-and-secure-ai.svg` },
    ],
  },
  {
    type: 'quoteCards',
    title: 'Built for teams like yours',
    cards: [
      { hue: 'green', quote: 'The impact was immediate. The moment we adopted this platform, we were able to say yes to many more questions and requests from customers.', logo: svg.co1 },
      { hue: 'pink', quote: 'Thanks to this platform, the first time an analyst looks at a case, they already have all of the information they need.', logo: svg.co2 },
      { hue: 'orange', quote: 'We could not do what we do now without it. It is just integral, and I would cry if somebody took it away from me. And so would my team.', logo: svg.co3 },
    ],
  },
  {
    type: 'tabs',
    header: { variant: 'centered', title: 'The platform MSSPs rely on to scale', icon: svg.msIcon1, description: 'Automate your most complex security workflows so your team can deliver faster and more consistently.' },
    tabs: [
      { label: 'Client onboarding', heading: 'Client onboarding', desc: 'Shorten the time it takes to bring on new clients with repeatable, automated workflows. Standardize your setup process across every client while keeping data fully isolated and protected from day one of the engagement.', img: `${SHARED}/tines-illo-communication-framed.svg` },
      { label: 'Alert triage and response', heading: 'Alert triage and response', desc: 'Automatically enrich, prioritize and act on alerts across every client environment. Tines routes each case to the right team and only brings analysts in where a human decision genuinely helps, cutting noise and wait times.', img: `${SHARED}/tines-illo-incidents-and-alerts-framed.svg` },
      { label: 'Vulnerability management', heading: 'Vulnerability management', desc: 'Streamline how vulnerabilities are found, ranked and fixed across every client environment. Workflows assign clear ownership and track each finding to closure, so nothing is forgotten and every report stays accurate and up to date.', img: `${MS}/tines-illo-application-security-framed.svg` },
      { label: 'Phishing analysis', heading: 'Phishing analysis', desc: 'Automate the end-to-end investigation of reported phishing for every client. Tines pulls indicators, checks them against your intelligence sources, and notifies the user as soon as a verdict is reached, without a manual hand-off.', img: `${SHARED}/tines-illo-core-capabilities-framed.svg` },
      { label: 'Compliance reporting', heading: 'Compliance reporting', desc: 'Automate the collection, formatting and delivery of compliance reports for every client on a schedule. Each report arrives with the evidence trail your auditors expect, and nobody has to maintain spreadsheets by hand.', img: `${SHARED}/tines-illo-compliance-framed.svg` },
    ],
  },
  {
    type: 'quoteCards',
    stat: true,
    cards: [
      { hue: 'purple', stat: '55%', label: 'decrease in vulnerabilities', logo: svg.co4 },
      { hue: 'orange', stat: '20K', label: 'and counting tenants worldwide' },
      { hue: 'pink', stat: '100s', label: 'of hours saved per month', logo: svg.co5 },
      { hue: 'pink', stat: '26K', label: 'and counting builders' },
      { hue: 'green', stat: '98%', label: 'reduction in time spent on threat hunting', logo: svg.co6 },
      { hue: 'purple', stat: '$2M to $10M', label: 'scaling ARR with Tines', logo: svg.co7 },
    ],
  },
  {
    type: 'examples',
    button: { label: 'Visit library', href: '/library/' },
    cards: [
      { label: 'Incidents and alerts', href: '/library/use-cases/incidents-and-alerts/', hue: 'orange', icon: `${SHARED}/spot-icon-incidents-and-alerts.svg` },
      { label: 'Asset and app management', href: '/library/use-cases/asset-and-app-management/', hue: 'purple', icon: `${MS}/spot-icon-brochure-accordion.svg` },
      { label: 'Ticket synchronization', href: '/library/use-cases/ticket-synchronization/', hue: 'green', icon: `${MS}/spot-icon-ticket-management.svg` },
      { label: 'Core capabilities', href: '/library/use-cases/core-capabilities/', hue: 'pink', icon: `${SHARED}/spot-icon-monitor.svg` },
      { label: 'Threat intelligence', href: '/library/threat-intelligence/', hue: 'orange', icon: `${SHARED}/spot-icon-threat-intelligence.svg` },
    ],
  },
  {
    type: 'partners',
    icon: svg.msIcon2,
    title: 'Partnered with the companies you trust today',
    description: 'Our industry-leading partner network spans 200+ innovative companies, from global consultancies to regional specialists, who help to support your business needs today and well into the future.',
    logos: [
      { name: 'AWS Marketplace', svg: svg.aws },
      { name: 'Partner 1', svg: svg.msPartner1 },
      { name: 'Crowdstrike', svg: svg.crowdstrike },
      { name: 'Partner 2', svg: svg.msPartner2 },
      { name: 'Partner 3', svg: svg.customerLogo2 },
      { name: 'Partner 4', svg: svg.msPartner3 },
      { name: 'Partner 5', svg: svg.msPartner4 },
      { name: 'Partner 6', svg: svg.msPartner5 },
    ],
  },
  {
    type: 'services',
    icon: svg.msServicesIcon,
    title: 'With you every step of the way',
    body: 'Our experienced team works alongside your business to reach your goals, and is consistently recognized for service quality by enterprise customers.',
    services: [
      { title: 'Professional services', text: 'When you need extra hands, our team and partners help you plan, build and speed up delivery.', link: 'Learn more', href: '/professional-services/' },
      { title: 'Enterprise-grade support', text: 'A responsive team stays with you across regions and time zones.', link: 'Learn more', href: '/support-reference-guide/' },
      { title: 'University', text: 'Train new teams on Tines Stories so they reach value quickly.', link: 'Start learning', href: '/university/' },
      { title: 'Technical resources', text: 'Docs and how-to articles that support every stage of your rollout.', link: 'Read the docs', href: '/stories/docs/quickstart/' },
    ],
  },
  {
    type: 'g2',
    badges: ['Leader', 'MostImplementable', 'BestUsability', 'BestRelationship', 'EasiestToDoBusinessWith_Enterprise', 'FastestImplementation_Enterprise'],
  },
  {
    type: 'content',
    layout: 5,
    cards: [
      { eyebrow: 'Partners', title: 'Explore our partners', cta: 'Learn more', href: '/partners/', hue: 'pink', iconSrc: `${MS}/icon-partner-directory.svg` },
      { eyebrow: 'Blog', title: 'How Armature Systems uses Tines to transform our SOC into a faster, leaner, low-friction machine', cta: 'Read now', href: '/blog/how-armature-systems-uses-tines-to-transform-our-soc-into-a-faster-leaner-low-fri/', hue: 'purple', iconSrc: `${SHARED}/spot-icon-threat-intelligence.svg` },
      { eyebrow: 'Library', title: 'Explore more workflows', cta: 'Learn more', href: '/library/', hue: 'green', iconSrc: `${MS}/tines-library-spot-icon.svg` },
      { eyebrow: 'Blog', title: 'How intelligent workflows help MSSPs deliver customer outcomes at scale', cta: 'Read now', href: '/blog/how-intelligent-workflows-help-mssps-deliver-customer-outcomes-at-scale/', hue: 'orange' },
      { eyebrow: 'Blog', title: 'Tackling alert fatigue with AI & automation: How MSSPs scale Tier 1 triage', cta: 'Read now', href: '/blog/tackling-alert-fatigue-with-ai-and-automation-how-mssps-scale-tier-1-triage/', hue: 'purple' },
    ],
  },
]
