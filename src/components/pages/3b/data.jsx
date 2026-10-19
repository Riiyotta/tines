// /3b/ page data (specs/pages-a.md §2). Titles, labels and headings match the live site; bodies and quotes are original placeholders.
export const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'
const A = '/assets/pages/3b/'

export const AREA_NAV = {
  pill: { label: 'Tines 3B', href: '/3b/' },
  links: [
    { label: 'Examples', href: '/3b/examples/' },
    { label: 'Updates', href: '/3b/product-updates/' },
    { label: 'Academy', href: 'https://academy.tines.com/', ext: true },
    { label: 'Docs', href: 'https://docs.3b.tines.com/', ext: true },
  ],
  cta: { label: 'Get started', href: SIGNUP_URL },
}

export const HERO = {
  title: 'The AI-native intelligent workflow platform',
  byline: 'One environment to deliver AI agents, apps, and automation: faster, safely, and at scale.',
  quote: {
    quote: 'With 3B we can see what is running and keep it governed as it spreads across teams.',
    name: 'Chris Oh',
    title: 'Senior Director, AI Enablement',
  },
}

// Chapters: slot widths are proportional to chapter length (172 / 244 / 746 at 1440)
export const CHAPTERS = [
  { label: 'Introducing Tines 3B', w: 172.5, seg: 146 },
  { label: 'Monitoring', w: 244.4, seg: 246 },
  { label: 'Build and Run', w: 745.8, seg: 763 },
]

export const EXPLORE = {
  kicker: 'Explore Tines 3B',
  lead: 'Every team deserves the freedom to move fast.',
  rest: 'Every organization deserves the confidence that work is secure, governed, and built to scale.',
}

export const CODA = {
  kicker: 'Build, run and monitor',
  statement: 'From idea to production: faster delivery, safer operations, and AI that scales with confidence.',
}

export const FAQS = [
  { q: 'Why does Tines 3B exist?', a: 'Teams everywhere want to build with AI, while IT and Security need to stay in control. 3B gives every team one secure environment to build, run and monitor intelligent workflows without trading speed for safety.' },
  { q: 'Who is Tines 3B for?', a: 'It is for builders across the business, from operations to engineering. IT and Security keep the visibility, governance and guardrails they need while everyone else gets room to create useful workflows.' },
  { q: 'What is the pricing approach?', a: 'Tines 3B is licensed as a platform rather than per seat, so you can invite everyone who needs to build. Talk to our team about the edition that fits how you want to deploy.' },
  { q: 'Is there a free edition?', a: 'Yes. The Explore edition is free and lets you try intelligent workflows with a limited number of live workflows and a small one-time AI allowance, with no commitment.' },
  { q: 'How does Tines 3B integrate with existing tools?', a: 'It is vendor-agnostic. Connect the tools and data you already use through APIs and MCP, and bring the AI model of your choice, so nothing needs to be replaced to get started.' },
  { q: 'How is data and security handled in Tines 3B?', a: 'Security is built in from the start. Steps run in isolated sandboxes, secrets are never exposed to builders or models, and access, spend and changes remain visible and governed.' },
]

// ---- Bento sections --------------------------------------------------------------------------------
export const SECTIONS = [
  {
    id: 'build',
    lead: 'Build',
    rest: 'anything, anywhere',
    desc: 'Turn ideas to production AI apps, automation and agents.',
    accent: 'text-orange-50',
    cols: 12,
    rows: '317px 24px 396.3px 396.3px',
    rowsXl: '338.6px 24px 368.2px 368.2px',
    rows2xl: '317px 24px 364.4px 364.4px',
  },
  {
    id: 'run',
    lead: 'Run',
    rest: 'securely, optimize continually',
    desc: 'Keep data secure at every step and ship workflows that get smarter over time.',
    accent: 'text-tab-it',
    cols: 12,
    rows: '246.4px 376.5px 360.8px',
    rowsXl: '271.3px 302px 468.8px',
    rows2xl: '236.4px 347.2px 425.6px',
  },
  {
    id: 'monitor',
    lead: 'Monitor',
    rest: 'everything',
    desc: 'End-to-end visibility of spend, workflow performance, and value.',
    accent: 'text-purple-60',
    cols: 13,
    rows: '187.6px 100px 300px 100px 300px',
    rowsXl: '205.4px 100px 335.9px 100px 335.9px',
  },
]

export const BODIES = {
  prompt: 'Describe the work you want done in plain language and your own words, then let the platform draft it with you.',
  chat: 'Brainstorm and explore with your preferred LLM, wired into the systems and data your team already trusts.',
  code: 'Define workflows as code so they fit the tools, reviews and release habits your engineers already follow, with Git integration included as standard.',
  test: 'Try changes as you build, using suggested tests and sample data so nothing touches live systems before you are ready.',
  anywhere: 'Bring your favorite coding assistants along to design, run and watch workflows without leaving the tools you like.',
  spaces: 'Set up separate areas with the right connectors, skills and permissions so every team can build with confidence.',
  skills: 'Share reusable skills so every build follows the same practices, whichever space or person is doing the work.',
  branches: 'Follow every change as it moves through review, from teammates or the platform, before it goes live.',
  sandbox: 'Each step runs in its own isolated environment, so one workflow can never reach into the next.',
  connectors: 'Credentials are supplied at run time through a protected proxy, so builders and models never see the secrets themselves.',
  deployed: 'Run it where it suits you: hosted, on your own infrastructure or a mix, with the controls you define.',
  autofix: 'Spots problems and likely failures in your workflows and proposes fixes for you to review.',
  autotune: 'Watches running workflows and suggests changes for reliability, speed and clarity, packaged as a branch.',
  spend: 'See and manage what your workflows spend across LLM providers and individual models.',
  access: 'See who and what can reach each connector, skill and space, and adjust it in one place.',
  duplicates: 'Find workflows doing the same job so you can consolidate them and trim unnecessary spend.',
  savings: 'Estimate the time and money each workflow saves, using assumptions you configure yourself.',
  routes: 'Decide how workflow front ends are reached, whether from inside or outside your organization.',
  dependencies: 'See which packages your workflows rely on and avoid surprises when something upstream changes.',
}

export const MONITOR_QUOTE = {
  quote: 'With 3B we get a tailored internal tool without staffing a whole engineering project, and nobody waits.',
  name: 'Emanuele Sparvoli',
  title: 'Senior Director of IT, Fin',
}

export const PROMPTS = [
  'Automate our onboarding checklist',
  'Triage phishing reports and open tickets for the real ones',
  'Summarize yesterday’s incidents for the weekly review',
]
export { A }
