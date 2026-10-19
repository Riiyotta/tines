import { useRef, useState } from 'react'
import InlineSvg from './InlineSvg.jsx'
import { useTabWipe } from '../motion/useTabWipe.js'
import iconIt from '../../reference/svg/useCases-tabIcon-113.svg?raw'
import iconSecurity from '../../reference/svg/useCases-tabIcon-114.svg?raw'
import iconFinance from '../../reference/svg/useCases-tabIcon-115.svg?raw'
import iconPeople from '../../reference/svg/useCases-tabIcon-116.svg?raw'
import iconOps from '../../reference/svg/useCases-tabIcon-117.svg?raw'

// Class strings are written out in full so Tailwind can see them.
const TABS = [
  {
    id: 'it', title: 'IT', short: 'IT', icon: iconIt,
    body: 'MCP and AI client management with an AI gateway to govern deployments.',
    bg: 'bg-tab-it', text: 'text-panel-it-text', mat: 'bg-panel-it-text', edge: 'border-panel-it-edge', pill: 'text-panel-it-pill',
  },
  {
    id: 'security', title: 'Security', short: 'Security', icon: iconSecurity,
    body: 'AI SOC: alert intake, triage, and remediation, routing to an analyst when needed.',
    bg: 'bg-tab-security', text: 'text-panel-security-text', mat: 'bg-panel-security-text', edge: 'border-panel-security-edge', pill: 'text-panel-security-pill',
  },
  {
    id: 'finance', title: 'Finance', short: 'Finance', icon: iconFinance,
    body: 'Finance requests dashboard with insights from email and tooling.',
    bg: 'bg-tab-finance', text: 'text-panel-finance-text', mat: 'bg-panel-finance-text', edge: 'border-panel-finance-edge', pill: 'text-panel-finance-pill',
  },
  {
    id: 'people', title: 'People', short: 'People', icon: iconPeople,
    body: 'End-to-end job request manager, from finance approvals through to offer.',
    bg: 'bg-tab-people', text: 'text-panel-people-text', mat: 'bg-panel-people-text', edge: 'border-panel-people-edge', pill: 'text-panel-people-pill',
  },
  {
    id: 'operations', title: 'Operations', short: 'Ops', icon: iconOps,
    body: 'Lead dashboard: tracking, managing, and closing open lifecycle loops.',
    bg: 'bg-tab-operations', text: 'text-panel-operations-text', mat: 'bg-panel-operations-text', edge: 'border-panel-operations-edge', pill: 'text-panel-operations-pill',
  },
]

const Z = ['sm:z-[1]', 'sm:z-[2]', 'sm:z-[3]', 'sm:z-[4]', 'sm:z-[5]']
const VIEWS = ['workflow', 'frontend']
const VIEW_LABEL = { workflow: 'Workflow', frontend: 'Frontend' }

// Live hover "fisheye": the hovered tab gets --grow 1.0843 and the others give up the
// difference with Gaussian weights exp(-d²/5.12) (d = distance in tabs), so the sum stays 5.
// Values reproduce the live --grow readings to 4 decimals.
const HOVER_GROW = 1.0843
// Live formula (Animation): hovered grow = 1 + 24 * n / (tablistWidth + 64); 1.0843 at 1440. Only on
// hover-capable pointers without reduced motion.
let hoverGrow = HOVER_GROW
function growFor(i, hovered) {
  if (hovered == null) return 1
  if (i === hovered) return hoverGrow
  const w = (d) => Math.exp(-(d * d) / 5.12)
  let sum = 0
  for (let j = 0; j < TABS.length; j++) if (j !== hovered) sum += w(Math.abs(j - hovered))
  return 1 - ((hoverGrow - 1) * w(Math.abs(i - hovered))) / sum
}

export default function UseCases() {
  const [active, setActive] = useState('it')
  const [view, setView] = useState('frontend') // default: Frontend frame active
  const [hovered, setHovered] = useState(null)
  const tabRefs = useRef([])
  const tab = TABS.find((t) => t.id === active)
  const wipe = useTabWipe(active)
  const baseTab = TABS.find((t) => t.id === wipe.base) ?? tab

  const onTabKey = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + TABS.length) % TABS.length
    setActive(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="mx-auto mt-section-margin max-w-page px-page">
      <div className="mb-sp-xl max-w-[832px] text-center sm:text-left">
        <p className="kicker mb-sp-sm">Teams using Tines</p>
        <h2 className="mx-auto m-0 max-w-[22em] font-sans text-h2-sm font-medium sm:mx-0 sm:text-h2-md sm:font-normal xl:text-h2">
          Keep important workflows moving for the teams dependent on them.
        </h2>
        <p className="mx-auto mt-sp-gap max-w-[768px] text-pretty font-sans text-byline-sm font-medium sm:mx-0 sm:font-serif sm:text-byline sm:font-normal">
          Tines gives these teams the tools to safely leverage AI across the most sensitive systems, data, and processes at
          the highest level of security.
        </p>
      </div>

      <div data-motion="usecases-reveal" className="-mx-page overflow-hidden rounded-tabbed-sm sm:mx-0 sm:overflow-visible sm:rounded-none">
        <div role="tablist" aria-label="Teams using Tines" className="grid grid-cols-5 sm:flex sm:items-stretch" onMouseLeave={() => setHovered(null)}>
          {TABS.map((t, i) => {
            const selected = t.id === active
            return (
              <button
                key={t.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`use-case-tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`use-case-panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                data-fn={t.id}
                data-motion="usecase-tab"
                onClick={() => setActive(t.id)}
                onMouseEnter={(e) => {
                  if (!window.matchMedia('(hover: hover)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
                  const w = e.currentTarget.parentElement.getBoundingClientRect().width
                  if (w > 0) hoverGrow = 1 + (24 * TABS.length) / (w + 64)
                  setHovered(i)
                }}
                style={{ '--grow': growFor(i, hovered).toFixed(4) }}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex min-h-[60px] min-w-0 cursor-pointer flex-col items-center justify-center px-1 py-4 text-center text-lightest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-[var(--grow,1)_1_0] sm:items-stretch sm:justify-start sm:overflow-hidden sm:rounded-t-tab sm:px-sp-md sm:pb-[calc(var(--sp-md)-8px)] sm:pt-sp-md sm:text-left sm:[transition:flex-grow_.3s_cubic-bezier(.22,1,.36,1),background-color_.18s,color_.18s] ${t.bg} ${Z[i]} ${i > 0 ? 'sm:-ml-4' : ''}`}
              >
                <span className="flex min-w-0 flex-col items-center gap-2 sm:w-[calc((min(100vw,1520px)-2*var(--page-margin)+64px)/5-16px-2*var(--sp-md)-8px)] sm:items-stretch sm:gap-3">
                  <InlineSvg svg={t.icon} className="h-6 w-6 sm:hidden" />
                  <h3 className="m-0 font-sans text-tab-title-sm font-bold sm:font-serif sm:text-tab-title sm:font-normal">
                    <span className="sm:hidden">{t.short}</span>
                    <span className="hidden sm:inline">{t.title}</span>
                  </h3>
                  <p className="m-0 hidden max-w-[22em] text-tab-body-md font-medium sm:block 2xl:text-tab-body">{t.body}</p>
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`use-case-panel-${tab.id}`}
          aria-labelledby={`use-case-tab-${tab.id}`}
          data-fn={tab.id}
          className={`relative isolate overflow-hidden sm:rounded-b-panel ${tab.text}`}
        >
          <div data-motion="usecase-color-layer" className={`absolute inset-0 z-0 ${baseTab.bg}`} />
          {wipe.wiping && (
            <div key={wipe.wipeKey} data-motion="usecase-color-layer" aria-hidden="true" className={`motion-wipe absolute inset-0 z-[1] ${tab.bg}`} onAnimationEnd={wipe.onWipeEnd} />
          )}

          <div className="relative z-[2] grid grid-cols-[minmax(0,1fr)] gap-2 p-sp-md sm:p-sp-lg">
            <div className="toggle-track relative mb-sp-sm mt-sp-md grid grid-cols-2 self-start rounded-[999px] p-[3px] sm:my-0 sm:justify-self-start">
              {VIEWS.map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className="relative cursor-pointer rounded-[999px] px-5 py-[10px] text-center font-mono text-toggle font-bold uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {VIEW_LABEL[v]}
                </button>
              ))}
              <div
                aria-hidden="true"
                data-motion="usecase-toggle-pill"
                className={`toggle-pill pointer-events-none absolute inset-[3px] z-[1] grid grid-cols-2 rounded-[999px] bg-lightest ${tab.pill}`}
                style={{ '--pos': view === 'frontend' ? 1 : 0 }}
              >
                {VIEWS.map((v) => (
                  <span key={v} className="px-5 py-[10px] text-center font-mono text-toggle font-bold uppercase">
                    {VIEW_LABEL[v]}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[1302/806] min-h-fit sm:aspect-[16/8]">
              <div key={tab.id} data-motion="usecase-stage" className={`${wipe.wiping ? 'motion-stage-in ' : ''}relative grid w-full grid-cols-[minmax(0,1fr)] sm:absolute sm:inset-0 sm:h-full`}>
                {VIEWS.map((v) => {
                  const isActive = view === v
                  const pos =
                    v === 'frontend'
                      ? 'sm:right-0 sm:top-0 sm:origin-top-right'
                      : 'sm:bottom-0 sm:left-0 sm:origin-bottom-left'
                  return (
                    <button
                      key={v}
                      type="button"
                      data-motion="usecase-frame"
                      data-active={isActive || undefined}
                      aria-label={`Show ${v}`}
                      onClick={() => setView(v)}
                      className={`box-border block w-full min-w-0 max-w-full cursor-pointer overflow-hidden p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] sm:absolute sm:w-[74%] sm:rounded-frame sm:border sm:border-b-[3px] sm:p-[5px] sm:[transition:transform_.25s_cubic-bezier(.22,1,.36,1),opacity_.25s] ${tab.mat} ${tab.edge} ${pos} ${
                        isActive ? 'sm:z-[2]' : 'hidden sm:z-[1] sm:block sm:scale-[.97] sm:opacity-50'
                      } max-sm:border-0 max-sm:bg-transparent`}
                    >
                      <img
                        src={`/assets/images/team-tabs/${tab.id}-${v}.jpg`}
                        alt={`${tab.title} ${v}`}
                        className={`box-border block h-auto w-full max-w-full rounded-frame-img-sm border sm:rounded-frame-img ${tab.edge}`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            <p className="mx-auto mb-sp-md block max-w-[32em] text-center text-usecase-caption font-medium sm:hidden">{tab.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
