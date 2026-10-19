// Blog sample data (specs/pages-c.md §4.5). Titles, hrefs, authors and categories are real; bodies/excerpts are placeholders.
const B = '/assets/pages/blog'
const art = (slug, title, cover, extra = {}) => ({ slug, title, href: `/blog/${slug}/`, cover: `${B}/${cover}`, ...extra })

export const authors = {
  martin: { name: 'Martin Moroney', role: 'Director of Internal Automation, Tines' },
  colleen: { name: 'Colleen Gallagher', role: 'Senior Customer Success Engineer, Tines', src: `${B}/author-building-ai-agents-getting-started-1.jpg` },
  michael: { name: 'Michael Tolan', role: 'Senior Engineer - Customer Experience, Tines', src: `${B}/author-building-ai-agents-getting-started-2.jpg` },
  amber: { name: 'Amber Langdon', role: 'Product Marketing Manager, Tines', src: `${B}/author-introducing-the-workflow-capability-matrix-1.jpg` },
}

export const articles = [
  art('tines-3b-first-90', "We gave all our employees access to Tines 3B. Here's what happened next.", 'featured-1-tines-3b-first-90.jpg', {
    categories: ['Inside Tines'], date: 'Published on October 8, 2026', authors: [authors.martin],
    excerpt: 'A short placeholder summary of how an internal rollout went, what surprised the team, and which guardrails made it safe to open up to everyone in the company.',
  }),
  art('building-ai-agents-getting-started', 'Building AI agents in Tines Stories: tips and tricks for getting started', 'featured-2-building-ai-agents-getting-started.jpg', {
    categories: ['Tutorials'], date: 'Published on July 16, 2026', authors: [authors.colleen, authors.michael], detailCover: 'article-cover-building-ai-agents-getting-started.jpg',
    excerpt: 'A practical guide to building reliable AI agents: when to reach for an agent, how to shape prompts, and which safeguards to add before going live.',
  }),
  art('introducing-the-workflow-capability-matrix', 'Introducing the workflow capability matrix', 'article-cover-introducing-the-workflow-capability-matrix.jpg', {
    categories: ['Tutorials'], date: 'Published on March 25, 2026', authors: [authors.amber], kind: 'video',
  }),
  art('it-onboarding-automation-building-a-provisioning-agent-with-tines-3b', 'IT onboarding automation: building a provisioning agent with Tines 3B', 'cover-it-onboarding-automation-building-a-provisioning-agent.jpg', { categories: ['Tutorials'] }),
  art('headspace-taming-wild-code-with-tines-3b', 'How Headspace is taming wild code with Tines 3B', 'cover-headspace-taming-wild-code-with-tines-3b.jpg', { categories: ['News'] }),
  art('finance-billing-app', '“Better than the tools we were quoted six figures for”: How Tines’ finance team built a custom billing app for <$1,000', 'cover-finance-billing-app.jpg', { categories: ['Tines × Tines'] }),
  art('build-your-own-ai-soc', 'The AI SOC is commoditized. Here’s why building our own is the next frontier.', 'cover-build-your-own-ai-soc.jpg', { categories: ['Engineering'] }),
  art('ai-governance-monitoring-how-to-prove-your-program-is-actually-working', 'AI governance monitoring: how to prove your program is actually working', 'cover-ai-governance-monitoring-how-to-prove-your-program-is-.jpg', { categories: ['News'] }),
  art('thomas-kinsella-technovation', 'Why wild code is the next big challenge for CIOs', 'cover-thomas-kinsella-technovation.jpg', { categories: ['News'] }),
  art('whats-new-in-tines-august-2026-edition', "What's new in Tines: August 2026 edition", 'cover-whats-new-in-tines-august-2026-edition.jpg', { categories: ['Product updates'] }),
  art('tines-achieves-tx-ramp-level-2-certification', 'Tines achieves TX-RAMP Level 2 certification', 'cover-tines-achieves-tx-ramp-level-2-certification.jpg', { categories: ['News'] }),
]
export const bySlug = (s) => articles.find((a) => a.slug === s)

export const latest = ['it-onboarding-automation-building-a-provisioning-agent-with-tines-3b', 'headspace-taming-wild-code-with-tines-3b', 'finance-billing-app', 'build-your-own-ai-soc', 'ai-governance-monitoring-how-to-prove-your-program-is-actually-working', 'thomas-kinsella-technovation', 'whats-new-in-tines-august-2026-edition', 'tines-achieves-tx-ramp-level-2-certification', 'building-ai-agents-getting-started'].map(bySlug)
export const tutorials = [
  { title: 'Building AI agents in Tines Stories: tips and tricks for advanced builders', href: '/blog/building-ai-agents-getting-started/', cover: `${B}/article-cover-building-ai-agents-getting-started.jpg` },
  bySlug('introducing-the-workflow-capability-matrix'),
  { title: 'Automating your risk register using Tines Records', href: '/blog/tutorials/', cover: `${B}/cover-build-your-own-ai-soc.jpg` },
]
export const productUpdates = ['August', 'July', 'June'].map((m) => ({
  title: `What's new in Tines: ${m} 2026 edition`, href: '/blog/whats-new-in-tines-august-2026-edition/', cover: `${B}/cover-whats-new-in-tines-august-2026-edition.jpg`,
}))
export const guides = [
  { title: 'The ultimate guide to network operations management', subheading: 'Secure, reliable, and governed', href: '/access/guide/the-ultimate-guide-to-network-operations-management/', cover: `${B}/guide-cover-the-ultimate-guide-to-network-operations-managem.png`, border: 'border-tint-rose-pale' },
  { title: 'The IT and security field guide to AI adoption', href: '/access/guide/the-it-and-security-field-guide-to-ai-adoption/', cover: `${B}/guide-cover-the-it-and-security-field-guide-to-ai-adoption.png`, border: 'border-tint-peach-edge' },
  { title: "The security leader's playbook to GRC orchestration", href: '/access/guide/the-security-leaders-playbook-to-grc-orchestration/', cover: `${B}/guide-cover-the-security-leader-s-playbook-to-grc-orchestrat.png`, border: 'border-tint-violet-line' },
  { title: 'The future of IT infrastructure', subheading: 'How intelligent workflows improve infrastructure capacity, reliability, and scalability management', href: '/access/guide/the-future-of-it-infrastructure/', cover: `${B}/guide-cover-the-future-of-it-infrastructure.png`, border: 'border-tint-violet-line' },
]

export const categories = [
  { slug: 'articles', label: 'All articles', h1: 'All articles', pages: 22, filter: null },
  { slug: 'news', label: 'News', h1: 'News', pages: 12, filter: 'News' },
  { slug: 'tutorials', label: 'Tutorials', h1: 'Tutorials', pages: 6, filter: 'Tutorials' },
  { slug: 'engineering', label: 'Engineering', h1: 'Engineering', pages: 3, filter: 'Engineering' },
  { slug: 'product-updates', label: 'Product updates', h1: 'Product updates', pages: 5, filter: 'Product updates' },
  { slug: 'inside-tines', label: 'Inside Tines', h1: 'Inside Tines', pages: 4, filter: 'Inside Tines' },
  { slug: 'tines-x-tines', label: 'Tines × Tines', h1: 'Tines × Tines', pages: 2, filter: 'Tines × Tines' },
  { slug: 'guides', label: 'Guides', h1: 'Guides', pages: 1, filter: null, guides: true },
]
export const categoryBySlug = (s) => categories.find((c) => c.slug === s)

export const navLinks = [
  { label: 'Home', href: '/blog/' },
  ...categories.slice(1).map((c) => ({ label: c.label, href: `/blog/${c.slug}/` })),
  { label: 'All articles', href: '/blog/articles/' },
]

export const series = [
  {
    slug: 'migrating-to-tines-cases', title: 'Migrating to Tines Cases', cover: `${B}/series-cover-migrating-to-tines-cases.png`,
    description: 'A short placeholder description of this series, outlining the steps involved and what each part of the migration covers for teams planning ahead.',
    entries: [
      ['Introduction: migrating to Tines Cases', 'it-onboarding-automation-building-a-provisioning-agent-with-tines-3b'],
      ['Laying the groundwork for your migration to Tines Cases', 'headspace-taming-wild-code-with-tines-3b'],
      ['The operational side of migrating to Tines Cases: communication, rollback, and compliance', 'build-your-own-ai-soc'],
      ['After the migration: securing and optimizing Tines Cases', 'thomas-kinsella-technovation'],
    ].map(([title, slug]) => ({ title, href: `/blog/${slug}/` })),
  },
]
export const moreSeries = [
  { name: 'Optimizing your Tines stories', border: 'border-tint-rose-line' },
  { name: 'The next evolution of SOAR', border: 'border-tint-lilac-line' },
  { name: 'Automate beyond the SOC', border: 'border-tint-peach-line' },
  { name: 'Hands-on SOAR', border: 'border-tint-rose-line' },
].map((s) => ({ ...s, description: 'A placeholder blurb for this series that runs to a few lines in the narrow card column, standing in for the live copy.', href: '/blog/migrating-to-tines-cases/', cover: `${B}/series-cover-migrating-to-tines-cases.png` }))
export const seriesBySlug = (s) => series.find((x) => x.slug === s)
