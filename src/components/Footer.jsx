import { useState } from 'react'
import InlineSvg from './InlineSvg.jsx'
import chevron from '../../reference/svg/footer-chevron-120.svg?raw'
import tinesIcon from '../../reference/svg/footer-tines-logo-icon_-130.svg?raw'
import aiChatGPT from '../../reference/svg/footer-askAiLink-125.svg?raw'
import aiClaude from '../../reference/svg/footer-askAiLink-126.svg?raw'
import aiGemini from '../../reference/svg/footer-askAiLink-127.svg?raw'
import aiPerplexity from '../../reference/svg/footer-askAiLink-128.svg?raw'
import aiGrok from '../../reference/svg/footer-askAiLink-129.svg?raw'

const T = 'https://www.tines.com'

// Each column is a list of groups; a group = { title?: [label, href], links: [[label, href, opts]] }.
// opts: { ext: external ↗, bold: bold leaf }. Groups after the first get a divider (snapshot CSS).
const COLUMNS = [
  {
    id: 'product', title: 'Product', groups: [
      { title: ['Tines 3B', `${T}/3b/`], links: [
        ['Examples gallery', `${T}/3b/examples/`], ['Product updates', `${T}/3b/product-updates/`],
        ['Academy', 'https://academy.tines.com/', { ext: true }], ['Docs', 'https://docs.3b.tines.com/', { ext: true }],
        ['Status', 'https://status.tines.com/', { ext: true }],
      ] },
      { title: ['Tines Stories', `${T}/stories/`], links: [
        ['Storyboard', `${T}/stories/storyboard/`], ['Cases', `${T}/stories/cases/`], ['Workbench', `${T}/stories/workbench/`],
        ['Agents', `${T}/stories/agents/`], ['Monitoring', `${T}/stories/monitoring/`],
        ['Workflow capability matrix', `${T}/workflow-capability-matrix/`], ['Templates', `${T}/stories/templates/`],
        ['Library', `${T}/library/`], ['Five-minute flows', `${T}/stories/five-minute-flows/`],
        ['What’s new', `${T}/stories/whats-new/`], ['Docs and API', `${T}/stories/docs/`],
        ['Status', 'https://status.tines.com/', { ext: true }],
      ] },
      { links: [['Pricing', `${T}/pricing/`]] },
    ],
  },
  {
    id: 'solutions', title: 'Solutions', groups: [
      { title: ['IT', `${T}/solutions/it/`], links: [
        ['IT as a business enabler', `${T}/solutions/it/it-as-a-business-enabler/`],
        ['Infrastructure management', `${T}/solutions/it/infrastructure-management/`],
        ['Networking', `${T}/solutions/it/networking/`], ['Application management', `${T}/solutions/it/application-management/`],
        ['IT service delivery and support', `${T}/solutions/it/it-service-delivery-and-support/`],
      ] },
      { title: ['Security', `${T}/solutions/security/`], links: [
        ['AI SOC', `${T}/solutions/security/ai-soc/`], ['SOAR', `${T}/solutions/security/soar/`],
        ['GRC', `${T}/solutions/security/governance-risk-and-compliance/`],
        ['Threat intelligence', `${T}/solutions/security/threat-intelligence/`],
        ['Vulnerability management', `${T}/solutions/security/vulnerability-management/`],
        ['Network security', `${T}/solutions/security/network-security/`],
      ] },
      { links: [
        ['Public sector', `${T}/public-sector/`, { bold: true }], ['Financial services', `${T}/financial-services/`, { bold: true }],
        ['MSSPs', `${T}/mssps/`, { bold: true }],
      ] },
      { links: [
        ['Professional services', `${T}/professional-services/`], ['AI in Tines', `${T}/ai-in-tines/`], ['Enterprise', `${T}/enterprise/`],
      ] },
    ],
  },
  {
    id: 'discover', title: 'Discover', groups: [
      { title: ['Customers', `${T}/customers/`], links: [] },
      { title: ['Blog', `${T}/blog/`], links: [['Series', `${T}/blog/series/`], ['Guides', `${T}/blog/guides/`], ['Podcast', `${T}/podcast/`]] },
      { title: ['Events', `${T}/events/`], links: [
        ['Webinars', `${T}/webinars/`], ['Bootcamps', `${T}/bootcamps/`], ['Builder Connect', `${T}/events/builder-connect/`],
        ['Workflow.live', 'https://www.workflow.live/', { ext: true }],
      ] },
      { links: [['Community', 'https://community.tines.com/', { ext: true }], ['YDWWT', `${T}/you-did-what-with-tines/`]] },
      { links: [['Customer center', `${T}/customer-center/`]] },
    ],
  },
  {
    id: 'company', title: 'Company', stacked: true, groups: [
      { links: [
        ['About us', `${T}/about/`], ['Careers', `${T}/careers/`], ['Newsroom', `${T}/newsroom/`], ['Partners', `${T}/partners/`],
        ['Contact', `${T}/contact/`], ['Store', 'https://store.tines.com/', { ext: true }],
        ['Brand assets', 'https://live.standards.site/tines', { ext: true }],
      ] },
      { links: [
        ['LinkedIn', 'https://www.linkedin.com/company/tines-io/', { ext: true }], ['X', 'https://twitter.com/tines_hq', { ext: true }],
        ['YouTube', 'https://www.youtube.com/@TinesHQ', { ext: true }],
      ] },
    ],
  },
  {
    id: 'trust', title: 'Trust and security', stacked: true, groups: [
      { title: ['Security', `${T}/security/`], links: [
        ['Security best practices', `${T}/tines-security-best-practices/`], ['Trust center', 'https://trust.tines.com/', { ext: true }],
      ] },
      { title: ['Legal', `${T}/legal/`], links: [
        ['Privacy', `${T}/privacy/`], ['Terms', `${T}/terms/`], ['DPA', `${T}/dpa/`], ['Cookies policy', `${T}/cookies-policy/`],
      ] },
    ],
  },
]

const ASK_AI_PROMPT = encodeURIComponent(
  'As a potential customer, I want to understand concretely what I would get with Tines (tines.com).\n\nDetail step by step: what Tines is, how it lets every team build workflows, apps, and AI agents while IT and security keep visibility, governance, and control, how it connects to the tools we already use, its security and compliance features, and how it helps teams scale.\n\nExplain it simply, as if you were describing the real experience of using Tines. Useful sources:\n\n- Feature highlights: https://www.tines.com/3b/\n- Real examples of what teams build: https://www.tines.com/3b/examples/\n- In-depth docs: https://docs.3b.tines.com/ (markdown index at https://docs.3b.tines.com/llms.txt)',
)
const ASK_AI = [
  ['ChatGPT', aiChatGPT, `https://chatgpt.com/?q=${ASK_AI_PROMPT}`],
  ['Claude', aiClaude, `https://claude.ai/new?q=${ASK_AI_PROMPT}`],
  ['Gemini', aiGemini, `https://www.google.com/search?udm=50&source=searchlabs&q=${ASK_AI_PROMPT}`],
  ['Perplexity', aiPerplexity, `https://www.perplexity.ai/search?q=${ASK_AI_PROMPT}`],
  ['Grok', aiGrok, `https://grok.com/?q=${ASK_AI_PROMPT}`],
]

// Live: .leaf/.groupTitleLink/.askAiLink/.cookieSettings:hover { color: var(--pageAccent) } = #8d75e6, no transition
const hover = 'hover:text-accent'

function Leaf({ label, href, opts = {} }) {
  const ext = opts.ext
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center gap-1 py-[0.25em] text-footer-link ${opts.bold ? 'font-bold' : 'font-medium'} ${hover}`}
    >
      {label}
      {ext && <span className="text-footer-mark font-medium" aria-hidden="true">↗</span>}
    </a>
  )
}

function Column({ col, open, onToggle, className = '' }) {
  const contentId = `footer-section-${col.id}`
  return (
    <div className={`flex w-full flex-none flex-col md:w-auto ${className}`}>
      <h2 className="m-0 font-sans text-[14px] font-semibold md:mb-[33px] md:font-mono md:text-footer-title">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-[10px] py-[17.5px] text-left md:pointer-events-none md:cursor-default md:py-0 md:uppercase"
        >
          {col.title}
          <InlineSvg
            svg={chevron}
            className={`h-[7px] w-[10px] flex-none transition-transform duration-150 ease-ease md:hidden ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h2>
      <div id={contentId} className="footer-accordion" data-open={open}>
        <div>
          <div className={`flex flex-col gap-[14px] ${open ? 'pb-[17.5px]' : ''} md:pb-0`}>
            {col.groups.map((g, gi) => (
              <div key={gi} className={`flex flex-col gap-[6px] ${gi > 0 ? 'footer-divider pt-[14px]' : ''}`}>
                {g.title && (
                  <a href={g.title[1]} className={`m-0 py-[0.25em] text-footer-link font-bold ${hover}`}>
                    {g.title[0]}
                  </a>
                )}
                {g.links.map(([label, href, opts]) => (
                  <Leaf key={label} label={label} href={href} opts={opts} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * variant="simple" (specs/pages-a.md REUSE MAP, /soar/): only the bottom bar (the "Ask AI about Tines" pill,
 * "© Tines", "Cookie settings"); the link columns are not rendered. Default variant unchanged.
 */
export default function Footer({ variant = 'default' }) {
  // Live: sections expand independently (several can be open at once)
  const [openIds, setOpenIds] = useState(() => new Set())
  const toggle = (id) =>
    setOpenIds((cur) => {
      const next = new Set(cur)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  const main = COLUMNS.filter((c) => !c.stacked)
  const stacked = COLUMNS.filter((c) => c.stacked)

  return (
    <footer className="relative z-[1] text-[14px] font-medium">
      {variant !== 'simple' && (
      <div className="mx-auto flex w-full max-w-page flex-col px-page-wide py-[30px] md:grid md:grid-cols-4 md:gap-x-10 md:gap-y-8 md:px-page md:pb-[30px] md:pt-[50px] xl:flex xl:flex-row xl:flex-wrap xl:items-start xl:justify-between">
        {main.map((c, i) => (
          <Column key={c.id} col={c} open={openIds.has(c.id)} onToggle={() => toggle(c.id)} className={i > 0 ? 'footer-divider md:border-0' : ''} />
        ))}
        {/* Columns 4+5: display:contents wrapper (stacked in one grid column at 768–1023) */}
        <div className="contents md:flex md:flex-col md:gap-8 xl:contents">
          {stacked.map((c) => (
            <Column key={c.id} col={c} open={openIds.has(c.id)} onToggle={() => toggle(c.id)} className="footer-divider md:border-0" />
          ))}
        </div>
      </div>
      )}

      <div className="mx-auto grid w-full max-w-page grid-cols-[1fr_auto_1fr] items-center gap-4 gap-y-8 px-page-wide pb-10 font-semibold md:gap-y-4 md:px-page md:pt-5">
        <div className="col-span-full row-start-1 flex items-center justify-between gap-2 rounded-[999px] bg-surface-ask-ai py-1 pl-4 pr-[9px] md:col-span-1 md:col-start-2 md:justify-self-center md:pr-1">
          <p className="m-0 whitespace-nowrap font-mono text-ask-ai font-bold uppercase">Ask AI about Tines</p>
          <ul className="m-0 flex list-none gap-0.5 p-0">
            {ASK_AI.map(([name, svg, href]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask ${name} about Tines`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${hover}`}
                >
                  <InlineSvg svg={svg} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="col-start-1 row-start-2 m-0 text-footer-bottom font-semibold md:row-start-1">© Tines</p>
        <a href="/" aria-label="Tines" className="col-start-2 row-start-2 inline-flex justify-self-center md:hidden">
          <InlineSvg svg={tinesIcon} className="h-7 w-7" />
        </a>
        <button
          type="button"
          className={`col-start-3 row-start-2 cursor-pointer justify-self-end bg-transparent py-[0.25em] text-footer-bottom font-semibold md:row-start-1 ${hover}`}
        >
          Cookie settings
        </button>
      </div>
    </footer>
  )
}
