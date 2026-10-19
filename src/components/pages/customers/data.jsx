// /customers/ data (specs/pages-a.md §4). Customer quotes and G2 review bodies are original placeholders (rule 5).
import omada from '../../../../reference/svg/pages/customers-case-studies-omada-health.svg?raw'
import intezer from '../../../../reference/svg/pages/customers-case-studies-scaling-service-delivery-ho.svg?raw'
import hawx from '../../../../reference/svg/pages/customers-case-studies-hawx-smart-pest-control-cut.svg?raw'
import personio from '../../../../reference/svg/pages/customers-case-studies-personio-transforms-fragile.svg?raw'
import brex from '../../../../reference/svg/pages/customers-case-studies-brex-modernizes-security-an.svg?raw'
import vimeo from '../../../../reference/svg/pages/customers-case-studies-vimeo.svg?raw'
import netskope from '../../../../reference/svg/pages/customers-case-studies-netskope-triples-the-effici.svg?raw'
import ipp from '../../../../reference/svg/pages/customers-case-studies-ip-performance.svg?raw'
import notion from '../../../../reference/svg/pages/customers-case-studies-notion.svg?raw'
import intercom from '../../../../reference/svg/pages/customers-case-studies-intercom.svg?raw'
import fortune from '../../../../reference/svg/pages/customers-case-studies-fortune-brands.svg?raw'
import crowd from '../../../../reference/svg/pages/customers-case-studies-crowdfunding-tech-company.svg?raw'
import mars from '../../../../reference/svg/pages/customers-case-studies-mars.svg?raw'
import mckesson from '../../../../reference/svg/pages/customers-case-studies-mckesson.svg?raw'
import bitpanda from '../../../../reference/svg/pages/customers-case-studies-bitpanda.svg?raw'

const CS = '/case-studies/'
export const AREA_NAV = {
  pill: { label: 'Customers', href: '/customers/' },
  links: [{ label: 'All case studies', href: '/case-studies/all/' }],
}

export const HERO = {
  kicker: 'Power users, powerful stories',
  title: 'Customers',
  text: 'Our customers share how they brought Tines into their organizations and what changed once it was in place. See how companies, from the largest enterprises to young startups, use Tines to transform the way their teams operate.',
  illustration: '/assets/pages/customers/case-studies-hero-illustration.svg',
}

export const GRID = [
  { slug: 'omada-health', palette: 'purple', logo: omada, quote: 'If Tines disappeared tomorrow we would immediately be trying to rebuild it.' },
  { slug: 'intezer', palette: 'pink', logo: intezer, quote: 'The effect was immediate. Our analysts moved faster from the first week.' },
  { slug: 'hawx', palette: 'green', logo: hawx, quote: 'Everything is visible to the team, so our people now trust what runs.' },
  { slug: 'personio', palette: 'purple', logo: personio, quote: 'A story that we told our teams about once, and now it simply runs.' },
  { slug: 'brex', palette: 'pink', logo: brex, quote: '90% of weekly alerts analyzed and suppressed' },
  { slug: 'vimeo', palette: 'green', logo: vimeo, quote: '20+ hours reclaimed monthly on identity checks' },
  { slug: 'netskope', palette: 'orange', logo: netskope, quote: 'Tripling SOC efficiency without adding headcount' },
  { slug: 'ip-performance', palette: 'purple', logo: ipp, quote: 'We cannot imagine working without it, and nobody here wants to.' },
  { slug: 'notion', palette: 'green', logo: notion, quote: 'It helped our team reduce toil and make room for the deeper work.' },
].map((c) => ({ ...c, href: `${CS}${c.slug}/` }))

export const MORE_CASE_STUDIES = { label: 'See all case studies', href: '/case-studies/all/' }

const G2 = '/assets/pages/pricing/'
const badge = (f, tint, alt) => ({ kind: 'badge', src: G2 + f, tint, alt: `Tines is ${alt} on G2, Fall 2026` })
const review = (title, body, name, role, tone) => ({ kind: 'review', title, body, name, role, tone })
const study = (slug, palette, logo, extra) => ({ kind: 'study', palette, logo, href: `${CS}${slug}/`, ...extra })

// Three independent columns (pages-a §4.5, item heights 360 / 270 / 500 / 376)
export const COLUMNS = [
  [
    badge('Leader.svg', 'bg-purple-5', 'a Leader'),
    study('intercom', 'orange', intercom, { quote: 'So no matter how many tools you change, you can keep Tines in place.' }),
    review('The Legos of security automation', 'Plugs into the tools we already run and lets analysts assemble what they need without waiting on a developer, so small fixes ship the same afternoon they are requested.', 'Glen S.', 'Security Engineer', 'pink'),
    badge('MostImplementable.svg', 'bg-green-5', 'rated Most Implementable'),
    review('Powerful automation, easy to use', 'Our analysts save hours every week, and onboarding new teammates takes very little time, which means more of the group can contribute useful automations from the start.', 'Gavin F.', 'Security Analyst Engineer', 'green'),
    study('fortune-brands', 'purple', fortune, { stat: { value: '99%', label: 'reduction in time spent on certain processes' } }),
    review('The go-to security automation tool', 'It has handled everything we have thrown at it so far, and the team gets real work done within the first few minutes of sitting down with it.', 'Heath W.', 'Security Manager', 'purple'),
    badge('BestRelationship.svg', 'bg-tint-rose', 'rated Best Relationship'),
  ],
  [
    review('Tines automated our SOC', 'A flexible tool that gave us a playbook for the busy work and a quick path to getting it live, with very little ceremony between an idea and a running workflow.', 'Rylan P.', 'Security Ops Manager', 'purple'),
    { kind: 'gartner' },
    study('crowdfunding', 'green', crowd, { stat: { value: '83%', label: 'reduction in unpatched vulnerabilities' } }),
    review('More like coworkers than a vendor', 'Support is attentive and honest, and our questions always get a thoughtful answer from someone who knows the product well, even when the request is unusual or the timeline is tight.', 'Adam B.', 'Security Leader', 'orange'),
    study('mars', 'purple', mars, { stat: { value: '79', label: 'automated workflows' } }),
    review('Tines saved me so much time and energy!', 'It took a pile of manual routines off my plate and gave me the space to focus on the work that matters, and the documentation fills in whatever gaps remain.', 'Alexa S.', 'Business Operations Analyst', 'pink'),
    badge('BestUsability.svg', 'bg-tint-peach', 'rated Best Usability'),
    study('texas-a-m', 'orange', null, { logoSrc: '/assets/pages/customers/1741779100-texas-a-m-system-cyber-operations-logo-dark-gray.png', stat: { value: '300+', label: 'hours saved per month' } }),
    { kind: 'cta' },
  ],
  [
    review('Rapid automation, for anyone', 'A much smoother experience than scripting by hand, and people on the team can build and adjust their own workflows without waiting on a developer to be free.', 'Paul M.', 'Lead Engineer', 'green'),
    badge('EasiestToDoBusinessWith_Enterprise.svg', 'bg-tint-peach', 'rated Easiest To Do Business With'),
    review('Tines’s innovation is YOUR innovation', 'The platform keeps getting better, and many of the improvements started with suggestions from people like us, which makes it feel like a shared effort rather than a product.', 'Brent L.', 'CISO', 'purple'),
    study('mckesson', 'green', mckesson, { stat: { value: '1.5', label: 'analysts freed up per month' } }),
    badge('FastestImplementation_Enterprise.svg', 'bg-purple-5', 'rated Fastest Implementation'),
    review('Promises made, promises kept', 'A straightforward product with a gentle learning curve, and the integrations behave exactly as advertised, which is rarer than it should be in this corner of the market.', 'Prasanth K.', 'Software Engineer', 'orange'),
    study('bitpanda', 'green', bitpanda, { quote: 'With Tines, we are capable of building more automations than we ever planned.' }),
    review('Laser-focused on Automation', 'A sophisticated product with a strong grip on the problem, and an excellent fit for our SOC, where the same patterns come up again and again and need to be handled well.', 'Takeshi M.', 'Security Ops Manager', 'pink'),
  ],
]

export const REVIEW_TONES = {
  pink: { bg: 'bg-tint-rose', ink: 'text-pink-70' },
  green: { bg: 'bg-green-5', ink: 'text-tint-green-ink-dk' },
  purple: { bg: 'bg-purple-5', ink: 'text-purple-70' },
  orange: { bg: 'bg-tint-peach', ink: 'text-orange-80' },
}

// Piecewise-linear parallax samples: [scrollY - sectionTop, translateY px] (spec §4.5, scrollY 0 / 1200 / 2400 / 3600 / 4800 on a section at y 1890)
export const PARALLAX = [
  [[-1890, -36], [-690, -2.6], [510, 155.6], [1710, 258.6], [2910, 306.3]],
  [[-1890, 72], [-690, 65.1], [510, 32.1], [1710, 10.7], [2910, 0.8]],
  [[-1890, -72], [-690, -48.7], [510, 62], [1710, 134], [2910, 167.4]],
]

export const RECOGNITION = {
  g2: {
    lead: 'Recognized as a',
    bold: 'leader in security & SOAR',
    text: 'Customers rank Tines among the leading security automation platforms on G2 across usability, implementation and support.',
    cta: { label: 'Read what customers say', href: '#accreditation' },
  },
  gartner: {
    lead: 'Highlighted as a Gartner Cool Vendor',
    bold: 'in Security Operations',
    text: 'Analysts named Tines a Cool Vendor for its approach to security operations.',
    cta: { label: 'Learn more', href: '/gartner-cool-vendor/' },
  },
}
