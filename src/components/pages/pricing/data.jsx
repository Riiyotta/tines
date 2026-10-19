// Pricing page data (specs/pages-a.md §1). Edit here to change copy.
export const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'

export const PLANS = [
  {
    id: 'free',
    pill: 'Explore',
    title: 'Free edition',
    description: 'For experimenting with intelligent workflows.',
    cta: { label: 'Get started', href: SIGNUP_URL },
    features: ['Unlimited users, spaces, and connectors', '3 live workflows', 'One time $50 AI allowance'],
  },
  {
    id: 'paid',
    pill: 'Deploy',
    title: 'Paid editions',
    description: 'For intelligent workflows across your entire organization.',
    cta: { label: 'Get pricing', href: '/book-a-demo/' },
    features: [
      'Unlimited users, spaces, and connectors',
      'Unlimited workflows',
      'Flexible deploy options to fit your organization’s needs',
      'Bring your own AI model',
    ],
  },
]

// Placeholder quote (original wording, ~48 words)
export const QUOTE = {
  text:
    'Our IT team has relied on Tines for years, and 3B is a welcome step forward. People across the whole company can now build their own workflows in one shared environment, while IT keeps the oversight and guardrails it needs so every new idea can grow safely and at scale.',
  name: 'Emanuele Sparvoli',
  title: 'Senior Director of IT, Fin',
}

const G2 = '/assets/pages/pricing/'
export const BADGES = [
  ['Leader.svg', 'Leader'],
  ['MostImplementable.svg', 'Most Implementable'],
  ['BestUsability.svg', 'Best Usability'],
  ['BestRelationship.svg', 'Best Relationship'],
  ['EasiestToDoBusinessWith_Enterprise.svg', 'Easiest To Do Business With'],
  ['FastestImplementation_Enterprise.svg', 'Fastest Implementation'],
].map(([f, l]) => ({ src: G2 + f, alt: `Tines is ${l === 'Leader' ? 'a Leader' : `rated ${l}`} on G2, Fall 2026` }))

export const FAQS = [
  {
    q: 'Do you offer flexible hosting options?',
    a: (<>Yes. Paid editions can be deployed in the way that suits your organization. <a href="/book-a-demo/">Talk to our team</a> about what fits.</>),
  },
  {
    q: 'Where can I find more information about pricing?',
    a: (<>Plans are tailored to usage and scale, so <a href="/book-a-demo/">book a conversation</a> and we will walk you through the options.</>),
  },
  {
    q: 'Where can I find examples of Tines 3B in action?',
    a: (<>Browse real workflows in the <a href="/3b/examples/">examples gallery</a>, or read the <a href="https://docs.3b.tines.com" target="_blank" rel="noopener noreferrer">docs</a>.</>),
  },
  {
    q: 'Is there a community I can join?',
    a: (<>Absolutely. Our <a href="https://www.tines.com/community" target="_blank" rel="noopener noreferrer">community</a> is open to everyone building with Tines.</>),
  },
  {
    q: 'Do you offer startup discounts?',
    a: (<>We do. <a href="/contact/">Get in touch</a> and tell us a little about your company.</>),
  },
]
