// Data for the SolutionPage / SubSolutionPage templates (specs/pages-b.md sections 2-3).
// Headings, labels, card titles and links follow the live site; descriptions and body copy are original placeholders of similar length.
const A = '/assets/pages/'
const SH = `${A}solutions-shared/`
const SIGNUP = 'https://login.tines.com/saml_idp/signup'
const HERO_BUTTONS = [
  { label: 'Book a demo', href: '/book-a-demo/', variant: 'filled' },
  { label: 'Sign up free', href: SIGNUP, variant: 'outlined', ext: true },
]

export const SECURITY_LINKS = [
  { label: 'AI SOC', href: '/solutions/security/ai-soc/' },
  { label: 'SOAR', href: '/solutions/security/soar/' },
  { label: 'GRC', href: '/solutions/security/governance-risk-and-compliance/' },
  { label: 'Threat intelligence', href: '/solutions/security/threat-intelligence/' },
  { label: 'Vulnerability management', href: '/solutions/security/vulnerability-management/' },
  { label: 'Network security', href: '/solutions/security/network-security/' },
]
export const IT_LINKS = [
  { label: 'IT as a business enabler', href: '/solutions/it/it-as-a-business-enabler/' },
  { label: 'Infrastructure management', href: '/solutions/it/infrastructure-management/' },
  { label: 'Networking', href: '/solutions/it/networking/' },
  { label: 'Application management', href: '/solutions/it/application-management/' },
  { label: 'IT service delivery and support', href: '/solutions/it/it-service-delivery-and-support/' },
]

export const SECURITY = {
  area: { crumb: { label: 'Security', href: '/solutions/security/' }, links: SECURITY_LINKS },
  hero: {
    kicker: 'Security',
    title: 'Built by security practitioners, for security practitioners',
    description: 'Leading security teams rely on Tines to run their most critical workflows and to build a resilient, confident defense.',
    buttons: HERO_BUTTONS,
    decoration: {
      left: { src: `${A}solutions-security/ShieldsLeft.svg`, w: 393, h: 239, className: 'right-full top-1/4 -translate-y-[35%] translate-x-[8%] 3xl:translate-x-[10%]' },
      right: { src: `${A}solutions-security/ShieldsRight.svg`, w: 406, h: 179, className: 'left-full top-1/2 translate-y-[40%] -translate-x-[35%] 3xl:-translate-x-[15%]' },
      icon: { src: `${A}solutions-security/PageIconShields.svg`, w: 117, h: 84 },
    },
  },
  opening: {
    heading: 'The ever-evolving threat landscape demands faster security responses',
    paragraphs: [
      'Security teams juggle a patchwork of disconnected tools while the threats they face keep changing shape. Intelligent workflows adapt as quickly as the risks do, handling repetitive work automatically so analysts can focus on judgment, reduce burnout and keep the whole organization better protected over time.',
    ],
  },
  valueProps: {
    heading: 'Smart, secure workflows',
    items: [
      { title: 'Build your way', icon: `${SH}spot-icon-build.svg`, body: 'Describe a workflow in plain language or assemble it step by step on a visual canvas. Either way you end up with a production-ready automation, built on a secure foundation, running in minutes instead of weeks, with no heavy engineering project behind it.' },
      { title: 'Turn every alert into action', icon: `${SH}spot-icon-alert-2.svg`, body: 'Pull context from every tool you own, enrich each alert automatically, and give analysts a clear recommended next step instead of a raw notification. Every alert ends in a decision, not another tab to investigate.' },
      { title: 'Faster triage, sharper focus', icon: `${SH}spot-icon-agents.svg`, body: 'AI-assisted workflows absorb the repetitive noise so people can concentrate on the threats that matter. You decide when the system acts alone and when a human approves the next move.' },
      { title: 'Full visibility built in', icon: `${SH}spot-icon-monitor.svg`, body: 'Every step of every run is recorded and auditable, giving you full governance across the security stack. Nothing disappears between tools, and you can always show exactly what happened, when, and why, to anyone who asks.' },
      { title: 'Flexible case management', icon: `${SH}spot-icon-cases.svg`, body: 'Move past rigid, fixed templates. Shape cases around how your team really works, then let AI agents open, triage and close them at the level of autonomy you choose, with people stepping in whenever needed.' },
      { title: 'One secure environment built for every team', icon: `${SH}endpoint-gate.svg`, body: 'Give every team a safe path from idea to deployed workflow, with guardrails that let everyone adopt AI without adding new risk. Visibility stays shared and nothing becomes a bottleneck as usage grows across the business.' },
    ],
  },
  children: {
    intro: 'Explore specific security solutions.',
    layout: 'fourPerRowCentered',
    cards: [
      { title: 'AI SOC', href: '/solutions/security/ai-soc/', theme: 'purple', img: `${A}solutions-security/aiSocIllo.svg` },
      { title: 'SOAR', href: '/solutions/security/soar/', theme: 'purple', img: `${A}solutions-security/soarMediumIllo.svg` },
      { title: 'GRC', href: '/solutions/security/governance-risk-and-compliance/', theme: 'green', img: `${SH}phishingMediumIllo.svg` },
      { title: 'Threat intelligence', href: '/solutions/security/threat-intelligence/', theme: 'pink', img: `${SH}threatIntelMediumIllo.svg` },
      { title: 'Vulnerability management', href: '/solutions/security/vulnerability-management/', theme: 'orange', img: `${A}solutions-security/vulnMngtMediumIllo.svg` },
      { title: 'Network security', href: '/solutions/security/network-security/', theme: 'green', img: `${A}solutions-security/networkSecurityMediumIllo.svg` },
    ],
  },
  ribbon: {
    theme: 'purple',
    title: 'For the whole team',
    body: 'Accessible workflows for the whole team, from analysts to engineers. Teams work best when every member can build, share and improve the automation behind your security program, instead of waiting on a single group. That openness lets the platform scale across the enterprise.',
    stat: '93 days gained from workflows',
    quote: 'Tines does the work of several full-time analysts, and it lets our team be far more thorough on the investigations that matter most.',
    name: 'Aaron Jewitt',
    role: 'Principal Security Analyst, Elastic',
    logo: 'elastic',
  },
}

export const IT = {
  area: { crumb: { label: 'IT', href: '/solutions/it/' }, links: IT_LINKS },
  hero: {
    kicker: 'IT',
    title: 'One platform for every workflow, every team, and every AI.',
    description: 'Tines gives IT a foundation to orchestrate work across infrastructure, applications and AI, so teams can move faster while staying in control of every process, every approval and every outcome across the whole business, from the first request to the final result.',
    buttons: HERO_BUTTONS,
    decoration: {
      left: { src: `${A}solutions-it/CloudsLeft.svg`, w: 360, h: 454, className: 'right-full top-1/2 -translate-y-[35%] translate-x-[20%]' },
      right: { src: `${A}solutions-it/CloudsRight.svg`, w: 360, h: 454, className: 'left-full top-1/2 -translate-y-1/4 -translate-x-[20%]' },
      icon: { src: `${A}solutions-it/PageIconClouds.svg`, w: 117, h: 84 },
    },
  },
  opening: {
    heading: 'A unified workspace to build, run and monitor IT',
    paragraphs: [
      'Tines brings infrastructure, applications and AI together in one secure workspace, so IT can automate across the whole environment without stitching tools together by hand. Teams get one place to design, run and watch their processes, with shared context and governance applied everywhere they work, from the smallest request to the largest project.',
      'With Tines, IT teams can:',
    ],
    list: [
      { lead: 'Run everything from one place.', text: 'Coordinate work across systems, teams and tools from a single governed workspace, so nobody has to chase updates between consoles.' },
      { lead: 'See every workflow in motion.', text: 'Watch runs as they happen, trace each step back to its cause, and spot problems early, long before users notice anything is wrong or open a ticket. Nothing runs in the dark.' },
      { lead: 'Build the way your team works best.', text: 'Mix no-code, code and AI assistance to suit each task and each person, and share what you build so others across the organization can reuse and extend it.' },
      { lead: 'Adapt as your environment evolves.', text: 'Change workflows quickly as tools, policies and needs shift over time, without rebuilding everything from scratch every time something moves or a vendor changes its interface.' },
      { lead: 'Scale with governance built in.', text: 'Add automation across the business with permissions, approvals and audit trails already in place, so growth never outpaces control and every team keeps moving at full speed.' },
    ],
  },
  valueProps: {
    heading: 'Smart, secure workflows',
    items: [
      { title: 'Build your way', icon: `${SH}spot-icon-build.svg`, body: 'Create agents, apps and automations using natural language or a visual canvas, choosing whatever approach fits the job and the person building it. Deploy securely and go from idea to a running workflow in minutes, with very little friction or delay along the way.' },
      { title: 'Clear the channel mess', icon: `${SH}spot-icon-connected-wires.svg`, body: 'Connect chat, email and ticketing so requests reach the right place on their own, with approvals and context travelling alongside each one. Fewer lost messages, fewer handoffs and far less chasing for answers.' },
      { title: 'Intelligent execution, sharper focus', icon: `${SH}spot-icon-core-capabilities.svg`, body: 'Automate the routine steps, apply AI where judgment helps, and keep people involved only where their decision truly matters. Every run stays explainable and easy to review.' },
      { title: 'Full operational visibility and resilience', icon: `${SH}spot-icon-monitor.svg`, body: 'Know what is running, who touched it and what changed, with monitoring and auditability that keep operations steady and recoverable. If something breaks, you see where.' },
      { title: 'One secure environment built for every team', icon: `${SH}endpoint-gate.svg`, body: 'Empower every team to build and run automation in a protected workspace, with guardrails that let AI adoption proceed safely.' },
    ],
  },
  children: {
    intro: 'Explore specific IT solutions.',
    layout: 'threePerRow',
    cards: [
      { title: 'IT as a business enabler', href: '/solutions/it/it-as-a-business-enabler/', theme: 'purple', img: `${A}solutions-it/itAsABusinessEnablerIllo.svg` },
      { title: 'Infrastructure management', href: '/solutions/it/infrastructure-management/', theme: 'yellow', img: `${A}solutions-it/itpmTilesIllo.svg` },
      { title: 'Networking', href: '/solutions/it/networking/', theme: 'pink', img: `${A}solutions-it/networkingMediumIllo.svg` },
      { title: 'Application management', href: '/solutions/it/application-management/', theme: 'green', img: `${A}solutions-it/itOpsIllo.svg` },
      { title: 'IT service delivery and support', href: '/solutions/it/it-service-delivery-and-support/', theme: 'purple', img: `${SH}shiftLeftIllo.svg` },
    ],
  },
  ribbon: {
    theme: 'pink',
    title: 'Power to scale, freedom to focus',
    body: 'Intercom’s IT team took control of its workflows, moving faster and freeing people to focus on projects that move the business forward. Replacing manual handoffs with automation cut build times dramatically and gave the team a consistent, auditable way to run operations as demand grows, with far less manual effort.',
    stat: 'Build time reduced from 2 months to 2 hours',
    quote: 'Intercom’s future is being built on Tines.',
    shortQuote: true,
    name: 'Emanuele Sparvoli',
    role: 'Director of IT, Intercom',
    logo: 'intercom',
  },
}

const sub = (o) => o
export const AI_SOC = sub({
  area: { crumb: { label: 'Security', href: '/solutions/security/' }, links: SECURITY_LINKS, active: 'AI SOC' },
  hero: {
    theme: 'purple',
    crumbs: [{ label: 'Security', href: '/solutions/security/' }, { label: 'AI SOC' }],
    title: 'Build the AI SOC your team actually needs',
    description: 'Put flexible AI to work across your security operations. Tines adapts to your use cases, your tools and your preferred level of autonomy, so you can build the AI SOC that fits your team rather than one that forces a rigid, vendor-defined process on everyone involved.',
    buttons: [HERO_BUTTONS[0]],
    illustration: `${A}solutions-security-ai-soc/aiSocExtendedIllo.svg`,
  },
  lead: 'Every SOC is different, and a rigid AI product rarely fits. Tines gives you flexible building blocks to design an AI SOC around your own use cases, vendors and risk appetite, whether you want fully autonomous agents, human approval at key steps, or a blend that evolves as your confidence in the results grows over the coming months and years.',
  columns: 3,
  valueProps: [
    { title: 'AI SOC without compromise', icon: `${SH}spot-icon-agents.svg`, body: 'Run capable AI agents inside governed workflows, with your own policies, approvals and audit trail applied to every action they take. You keep full control of what the agents can see and do.' },
    { title: 'Every use case, every vendor', icon: `${A}solutions-security-ai-soc/funnel.svg`, body: 'Connect to any tool or model through any API and shape the AI SOC around the problems you actually face, rather than a single vendor’s roadmap. Swap components freely as your stack changes.' },
    { title: 'Built for speed without sacrificing control', icon: `${A}solutions-security-ai-soc/accelerate.svg`, body: 'Move from idea to running automation quickly, then decide step by step where AI acts independently and where a person signs off. Speed and oversight reinforce each other, so nothing is traded away.' },
  ],
  cards: [
    { eyebrow: 'Blog', title: 'Building a flexible AI SOC with Tines agents', cta: 'Read now', href: '/blog/building-an-ai-soc-with-tines/', tone: 'green', icon: `${A}solutions-security-ai-soc/ai-soc-tines-icon.svg` },
    { eyebrow: 'Webinar', title: 'Intelligent workflows: SAP’s approach to SOAR in the AI era', cta: 'Watch webinar', href: '/webinars/intelligent-workflows-sap-approach-to-soar-in-the-ai-era/', tone: 'purple', iconSvg: 'webinar' },
    { eyebrow: 'Private and secure', title: 'AI in Tines', cta: 'Learn more', href: '/platform/ai/', tone: 'orange', icon: `${A}solutions-security-ai-soc/ai-in-tines-icon.svg` },
    { eyebrow: 'Solution', title: 'Security Solutions', body: 'Built by security practitioners, for security practitioners', cta: 'Learn more', href: '/solutions/security/', tone: 'pink', icon: `${A}solutions-security-ai-soc/spot-icon-core-capabilities.svg` },
  ],
  layout: 4,
})

export const SOAR = sub({
  area: { crumb: { label: 'Security', href: '/solutions/security/' }, links: SECURITY_LINKS, active: 'SOAR' },
  hero: {
    theme: 'purple',
    crumbs: [{ label: 'Security', href: '/solutions/security/' }, { label: 'SOAR' }],
    title: 'Modern SOAR built for speed, security, and scale',
    description: 'A next-generation SOAR platform designed around how security teams really work. Deploy in minutes, connect any tool in your stack, and put AI to work within your guardrails, with every action visible and auditable.',
    buttons: HERO_BUTTONS,
    illustration: `${A}solutions-security-soar/soarExtendedIllo.svg`,
  },
  lead: 'Legacy SOAR demands constant upkeep, custom integrations and dedicated engineers just to keep it running. Tines is an intelligent workflow platform that removes that burden, so your whole team can automate faster with pre-built workflows, any-API connectivity and AI from day one, whatever your team size, budget or level of experience.',
  columns: 2,
  valueProps: [
    { title: 'Automate security operations', icon: `${SH}pendulum.svg`, body: 'Automate your most important security work, from vulnerability management to identity and access, and run it faster and at greater scale without growing the team. Every workflow stays visible, adjustable and owned by the people who rely on it, with nothing hidden behind a vendor.' },
    { title: 'Eliminate alert fatigue', icon: `${SH}spot-icon-alert-2.svg`, body: 'Prioritize and enrich alerts automatically before an analyst ever sees them, so people spend their time on the threats that deserve it. Duplicates, noise and low-value signals are handled quietly in the background.' },
    { title: 'AI on your terms', icon: `${SH}spot-icon-agents.svg`, body: 'Set exactly how much autonomy each workflow gets, from fully autonomous agents to human-in-the-loop decisions, and investigate faster with confidence. You choose the boundaries and can tighten or relax them whenever the situation changes, as your trust grows, with every decision logged for later review.' },
    { title: 'Streamline case management', icon: `${SH}spot-icon-cases.svg`, body: 'Bring cases into your workflows and give the team one place to track actions and collaborate. Keep a complete audit trail from open to close, with context gathered automatically at each step along the way and handed to whoever picks the case up next.' },
  ],
  cards: [
    { eyebrow: 'SOAR', title: 'The essential SOAR buyer’s guide', cta: 'Read now', href: '/soar/', tone: 'purple', icon: `${SH}spot-icon-soar.svg` },
    { eyebrow: 'Blog', title: 'Introduction: migrating to Tines Cases', cta: 'Read now', href: '/blog/introduction-migrating-to-tines-cases/', tone: 'green', icon: `${SH}spot-icon-cases.svg` },
    { eyebrow: 'Case study', title: 'Mars achieves coverage of 80-90% of sources for true positives in weeks', cta: 'Read now', href: '/case-studies/mars/', tone: 'case-purple', caseDecor: true, logo: `${A}solutions-security-soar/mars-com-logo-white.svg`, logoW: 'max-w-[128px]' },
    { eyebrow: 'Blog', title: 'SOAR in the AI era: how SAP uses intelligent workflows to build an AI SOC', cta: 'Read now', href: '/blog/soar-sap-intelligent-workflows-ai-soc/', tone: 'pink' },
    { eyebrow: 'Private and secure', title: 'AI in Tines', cta: 'Learn more', href: '/platform/ai/', tone: 'orange' },
  ],
  layout: 5,
})

export const ITSD = sub({
  area: { crumb: { label: 'IT', href: '/solutions/it/' }, links: IT_LINKS, active: 'IT service delivery and support' },
  hero: {
    theme: 'purple',
    crumbs: [{ label: 'IT', href: '/solutions/it/' }, { label: 'IT service delivery and support' }],
    title: 'Build the future of IT service delivery',
    description: 'Automate the full lifecycle of IT requests, from access to incidents, and give your service desk the speed and context to resolve every one of them without waiting on handoffs.',
    buttons: HERO_BUTTONS,
    illustration: `${A}solutions-it-it-service-delivery-and-support/shiftLeftExtendedIllo.svg`,
  },
  lead: 'Bring identity providers, ticketing systems, approvals and the people behind them together in one place, so service delivery stays fast, consistent and visible while your team spends far less time moving between tools, dashboards, inboxes and queues every single day.',
  columns: 2,
  valueProps: [
    { title: 'Always provide the right access at the right time', icon: `${A}solutions-it-it-service-delivery-and-support/credentials-key.svg`, body: 'Automate access requests and approvals across your identity providers so people get what they need quickly and permissions never linger longer than intended. Every grant and removal is recorded, reviewable and consistent from one request to the next.' },
    { title: 'Deliver services, not just tickets', icon: `${SH}spot-icon-build.svg`, body: 'Resolve routine requests end to end without a human touching them, and route only the exceptions to the right person with full context attached. Requesters get answers faster, and your team spends its time on the harder problems that genuinely need people.' },
    { title: 'Every incident deserves the full picture', icon: `${A}solutions-it-it-service-delivery-and-support/event-leak.svg`, body: 'Gather data from every system the moment an incident opens, so responders start with a complete view instead of hunting through separate tools. Timelines, owners and affected assets are assembled automatically and kept current as things change, which shortens every investigation.' },
    { title: 'Let endpoint operations take care of itself', icon: `${A}solutions-it-it-service-delivery-and-support/patch-configuration.svg`, body: 'Keep devices patched, configured and compliant through workflows that detect drift and fix it automatically, escalating to a person only when something truly needs judgment. Fleet health stays visible without manual checks, reminders or spreadsheets, even across a large and distributed fleet.' },
  ],
  cards: [
    { eyebrow: 'Blog', title: 'From backlog to breakthrough: enhancing IT service delivery and support with automation', cta: 'Read now', href: '/blog/enhancing-it-service-delivery-and-support-automation/', tone: 'pink', icon: `${A}solutions-it-it-service-delivery-and-support/pallet-jack.svg` },
    { eyebrow: 'Blog', title: 'Smarter ticket handling with AI and the new wave of orchestration', cta: 'Read now', href: '/blog/smarter-ticket-handling-with-ai-orchestration/', tone: 'green', icon: `${SH}icon-automation-robot.svg` },
    { eyebrow: 'Case study', title: 'Intercom’s IT team boosts efficiency by overhauling their workflows with Tines', cta: 'Read now', href: '/case-studies/intercom/', tone: 'case-orange', caseDecor: true, logo: `${A}solutions-it-it-service-delivery-and-support/intercom-logo-white.svg`, logoW: 'max-w-[128px]' },
    { eyebrow: 'Product', title: 'Meet the product', cta: 'Learn more', href: '/3b/', tone: 'purple', icon: `${A}solutions-it-it-service-delivery-and-support/spot-icon-actions-as-building-blocks.svg` },
  ],
  layout: 4,
})

export const CUSTOMERS = {
  title: 'Trusted by industry leaders',
  description: 'Businesses from global enterprises to national laboratories scale their workflows with Tines.',
}
