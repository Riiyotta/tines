// /financial-services/ page data (specs/pages-b.md 4 + section 6). Long body copy is original placeholder text of similar length.
import { svg, SHARED, FS, heroButtons } from './assets.js'

export const slug = '/financial-services/'
export const hero = {
  kicker: 'Financial services',
  title: 'Secure, compliant, and scalable workflows',
  description: 'Built for the demands of regulated finance, Tines links your tools and teams so you can lower operational risk with intelligent workflows.',
  buttons: heroButtons(true),
  decoration: { left: `${FS}/FinancialLeft.svg`, right: `${FS}/FinancialRight.svg`, pageIcon: `${FS}/PageIconFinancial.svg` },
  opening: {
    title: 'High stakes, high scrutiny, and high demands',
    paragraphs: [
      'Banks, insurers and payment institutions operate under heavy regulation while facing a steady stream of determined, well-funded attackers. Aging core systems, fragmented tooling and endless alert queues leave little room for careful, consistent response, and every single decision is scrutinized later by auditors and regulators alike. Intelligent workflows give these teams a calmer, auditable way to keep pace with change and stay ahead of mounting risk across the whole business every single day of the year.',
    ],
  },
}

export const sections = [
  {
    type: 'tabs',
    gap: 'none',
    header: { variant: 'horizontal', title: 'Smart, secure workflows', icon: svg.fsIcon },
    tabs: [
      { label: 'Automate', heading: 'Automate threat intelligence and incident response', desc: 'Lower risk and limit mistakes by automating how threats are detected, investigated and handled.', img: `${FS}/tines-illo-build-framed.svg` },
      { label: 'Streamline', heading: 'Streamline your GRC processes', desc: 'Keep compliance work audit-ready with documented workflows and timely notifications.', img: `${SHARED}/tines-illo-compliance-framed.svg` },
      { label: 'Connect', heading: 'Connect to all existing tools', desc: 'Connect and orchestrate every tool you already use through any API, even older internal systems.', img: `${SHARED}/tines-illo-core-capabilities-framed.svg` },
      { label: 'Accelerate', heading: 'Accelerate incident response and reduce alert fatigue', desc: 'Take repetitive triage off analysts by running intelligent workflows that speed up incident handling while keeping enterprise-grade security and regulatory alignment intact.', img: `${SHARED}/tines-illo-incidents-and-alerts-framed.svg` },
    ],
  },
  {
    type: 'quote',
    quote: 'Within our first few months of using Tines, we reclaimed hundreds of hours of work for our small team, ensured continuing regulatory compliance across every business line, and responded to emerging cyber threats far faster than before.',
    name: 'Information Security Manager',
    title: 'Fortune 500 Insurance Company',
  },
  {
    type: 'childGrid',
    title: 'Protect what matters most',
    description: 'See how Tines helps FSIs secure sensitive data and accelerate service delivery.',
    cards: [
      { title: 'GRC', href: '/solutions/security/governance-risk-and-compliance/', hue: 'green', img: `${SHARED}/phishingMediumIllo.svg` },
      { title: 'IT service delivery and support', href: '/solutions/it/it-service-delivery-and-support/', hue: 'purple', img: `${SHARED}/shiftLeftIllo.svg` },
      { title: 'Threat Intelligence', href: '/solutions/security/threat-intelligence/', hue: 'pink', img: `${SHARED}/threatIntelMediumIllo.svg` },
    ],
  },
  {
    type: 'banner',
    hue: 'purple',
    title: 'Scale smarter, safer, faster',
    body: 'A fast-growing exchange security team was buried under manual alerts. Orchestration and automation cut the noise, tuned their workflows, and strengthened their overall security posture across every product, market and user group they serve.',
    footer: 'Trusted by 5 million customers',
    quote: 'Tines lets us build richer detection rules that fit how our organization actually works.',
    name: 'Martin Schlatzer',
    role: 'Corporate IT Security Lead',
    logo: svg.bitpandaLogo,
  },
  {
    type: 'kaleidoscope',
    lines: [
      ['Compliance', 'Brand protection', 'Threat intelligence'],
      ['Reporting', 'Identity and access management', 'Integration'],
      ['Fraud prevention', 'Collaboration', 'Incident response'],
    ],
  },
  {
    type: 'content',
    gap: 'xxl',
    layout: 5,
    cards: [
      { eyebrow: 'Tines 3B', title: 'One environment to deliver AI agents, apps, and automation', cta: 'Learn more', href: '/3b/', hue: 'purple', iconSrc: `${FS}/spot-icon-wildcode-flower.svg` },
      { eyebrow: 'Solution', title: 'Modern SOAR built for speed, security, and scale', cta: 'Learn more', href: '/solutions/security/soar/', hue: 'purple', shade: 'v800', iconSrc: `${SHARED}/spot-icon-soar.svg` },
      { eyebrow: 'Blog', title: 'Beyond compliance: How orchestration and automation make financial services more resilient', cta: 'Read now', href: '/blog/grc-financial-services/', hue: 'pink', iconSrc: `${SHARED}/pendulum.svg` },
      { eyebrow: 'Case study', title: 'How Tines enabled this crypto exchange company to improve onboarding and offboarding globally', cta: 'Read now', href: '/case-studies/crypto-exchange/', hue: 'purple', shade: 'v600', caseDecor: true },
      { eyebrow: 'Blog', title: 'Wild code: the IT crisis hiding in plain sight', cta: 'Read now', href: '/blog/wild-code-it-crisis/', hue: 'green' },
    ],
  },
]
