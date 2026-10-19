/**
 * UseCaseTabs (live SolutionForUseCasesSection, specs/pages-b.md 4.2): tab list + stacked fading cards + a 75x88 "next" notch with a
 * 10s progress ring that auto-advances while the cards are on screen. Below 768 it is a static stack of cards (no tabs, no notch).
 *
 * Props
 *   header   { variant: 'horizontal' | 'centered', title (alias heading), description?, icon (raw <svg> string or an image src) }
 *            horizontal = h2 left + 124x81 icon right; centered = icon, h2 (max 690), description (max 608).
 *   tabs     [{ label, heading, desc (alias description), img }]   (alias prop: items). Hue cycles purple > orange > green > pink > teal.
 *   as       root element (default 'div'; IndustryPage passes 'section'), className
 * >=768: grid gap 24, columns 8.5em | 1fr (200px >=1280); tab list (gap .75em, font 13/14/16) with bordered hue tabs; cards stacked absolutely
 * in a 320px box, inactive ones opacity 0 (.2s). Ring: dashoffset 191.54 -> 0 over 10s linear (motion.css .usecase-ring) while the section is
 * visible, then the next tab activates. Reduced motion: no auto-advance (tabs and the notch still work by click).
 */
import { useEffect, useRef, useState } from 'react'
import InlineSvg from '../InlineSvg.jsx'
import { SectionHeading } from './SectionHeading.jsx'

const HUES = ['purple', 'orange', 'green', 'pink', 'teal']

function NextNotch({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Next"
      onClick={onClick}
      className="group absolute left-[calc(100%+.5px)] top-1/2 z-10 hidden h-[88px] w-[75px] -translate-x-1/2 -translate-y-1/2 cursor-pointer md:block"
    >
      <svg width="75" height="88" viewBox="0 0 75 88" fill="none" aria-hidden="true" className="block">
        <path d="M37.9 0H31.5C29.2909 0 27.5 1.79086 27.5 4V5.52178C27.5 7.29446 26.3242 8.83489 24.6706 9.4737C10.8226 14.8235 1 28.2647 1 44C1 59.7353 10.8226 73.1765 24.6706 78.5263C26.3242 79.1651 27.5 80.7055 27.5 82.4782V84C27.5 86.2091 29.2909 88 31.5 88H37.9C37.9552 88 38 87.9552 38 87.9V85C38 82.7909 39.7972 81.0227 41.9937 80.787C60.55 78.7955 75 63.0852 75 44C75 24.9148 60.55 9.20455 41.9937 7.21303C39.7972 6.97729 38 5.20914 38 3V0.1C38 0.0447715 37.9552 0 37.9 0Z" fill="var(--acc20)" />
        <path d="M36.9 0H4.5C2.01472 0 0 2.01472 0 4.5V44V83.5C0 85.9853 2.01472 88 4.5 88H36.9C36.9552 88 37 87.9539 37 87.8987V84.5C37 82.0147 39.024 80.028 41.4923 79.7373C59.8082 77.5804 74 62.4028 74 44C74 25.5972 59.8082 10.4196 41.4923 8.26265C39.024 7.97199 37 5.98528 37 3.5V0.101319C37 0.0460904 36.9552 0 36.9 0Z" fill="var(--acc5)" />
        <circle cx="38.5" cy="43.5" r="31.5" className="fill-[var(--acc10)] group-hover:fill-[var(--acc30)]" />
        <circle
          cx="38.5" cy="43.5" r="30.5" fill="transparent" strokeDasharray="191.54"
          className="usecase-ring" data-ring
          style={{ transformOrigin: '38.5px 43.5px', transform: 'rotate(-90deg)', stroke: 'var(--acc70)', strokeWidth: 2 }}
        />
        <path d="M47 45.4082L39.5 53L32 45.4082L33.3354 43.8716L38.524 49.1236L38.524 34L40.476 34L40.476 49.1236L45.6646 43.8716L47 45.4082Z" fill="var(--acc70)" />
      </svg>
    </button>
  )
}

function Icon({ icon, className }) {
  if (!icon) return null
  return icon.trimStart().startsWith('<') ? <InlineSvg svg={icon} className={className} /> : <img src={icon} alt="" className={className} />
}

export function UseCaseTabs({ header, tabs: tabsProp, items, as: Root = 'div', className = '' }) {
  const tabs = (tabsProp || items).map((t) => ({ ...t, desc: t.desc ?? t.description }))
  const title = header.title ?? header.heading
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const box = useRef(null)
  useEffect(() => {
    const el = box.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const next = () => setActive((a) => (a + 1) % tabs.length)
  const centered = header.variant === 'centered'
  return (
    <Root className={className}>
      {centered ? (
        <header className="flex flex-col items-center text-center">
          <Icon icon={header.icon} className="mb-[30px] block" />
          <SectionHeading solution max="w-full max-w-[690px] [text-wrap:balance]" mb={false}>{title}</SectionHeading>
          {header.description && <p className="mt-6 max-w-[608px] font-sans text-[16px] font-medium leading-[22.4px]">{header.description}</p>}
        </header>
      ) : (
        <header className="flex flex-col-reverse items-center gap-4 text-center md:flex-row md:justify-between md:gap-6 md:text-left">
          <SectionHeading solution align="left" mb={false} className="max-md:!text-center">{title}</SectionHeading>
          <Icon icon={header.icon} className="block h-[81px] w-[124px] shrink-0" />
        </header>
      )}
      <div className="h-sp-xl" />
      <div className="grid gap-6 md:grid-cols-[8.5em_minmax(0,1fr)] 2xl:grid-cols-[200px_minmax(0,1fr)]" style={{ fontSize: undefined }}>
        <div role="tablist" className="z-10 hidden gap-[.75em] text-[13px] font-medium xl:text-[14px] 2xl:text-[16px] md:grid">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              data-color-theme={HUES[i % 5]}
              onClick={() => setActive(i)}
              className={`relative flex min-h-[54px] items-center rounded-[.5em] border border-[var(--acc20)] px-[.8em] py-[.6em] text-left text-[var(--acc70)] hover:border-[var(--acc30)] ${i === active ? 'bg-[var(--acc10)]' : 'bg-[var(--acc5)]'}`}
            >
              {t.label}
              <svg
                width="11" height="33" viewBox="0 0 11 33" aria-hidden="true"
                className={`pointer-events-none absolute left-[calc(100%+1px)] top-1/2 -translate-y-1/2 transition-opacity duration-200 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                style={{ left: 'calc(100% + 24px - 10px)' }}
              >
                <g className={`transition-transform duration-[350ms] ease-snappy ${i === active ? 'translate-x-0' : '-translate-x-[10px]'}`}>
                  <path fill="var(--acc20)" d="M11 0.91095C10.4053 1.45914 10.0327 2.24473 10.0327 3.11738V3.55808C10.0327 4.33568 9.73083 5.08278 9.19072 5.64208L1.53376 13.5711C-0.000838481 15.1602 -0.000837766 17.7367 1.53376 19.3258L9.19073 27.2548C9.73083 27.8141 10.0327 28.5612 10.0327 29.3387V30.1174C10.0327 30.99 10.4053 31.7756 11 32.3238V0.91095Z" />
                  <path fill="var(--acc5)" d="M11 4.52261C10.9122 5.14618 10.6296 5.73029 10.1873 6.18836L2.36321 14.2904C1.21226 15.4823 1.21226 17.4146 2.36321 18.6065L10.1873 26.7085C10.6296 27.1665 10.9122 27.7506 11 28.3742V4.52261Z" />
                </g>
              </svg>
            </button>
          ))}
        </div>
        <div ref={box} className="relative flex flex-col gap-4 md:block md:min-h-[320px]">
          {tabs.map((t, i) => {
            const on = i === active
            return (
              <div
                key={t.label}
                data-color-theme={HUES[i % 5]}
                aria-hidden={!on || undefined}
                className={`grid grid-cols-1 gap-4 rounded-card border border-[var(--acc20)] bg-[var(--acc5)] p-[28px] text-center text-[var(--acc70)] max-md:[grid-template-areas:'heading'_'desc'_'img'] md:absolute md:inset-0 md:grid-cols-[1fr_minmax(0,40%)] md:grid-rows-[minmax(auto,1fr)_auto] md:gap-0 md:p-card-pad md:text-left md:transition-opacity md:duration-200 min-[1194px]:grid-cols-[2fr_minmax(38%,1fr)] 2xl:pt-16 ${on ? 'md:opacity-100' : 'md:pointer-events-none md:opacity-0'}`}
              >
                <h3 className="text-balance font-serif text-[24px] font-normal leading-[27.6px] max-md:[grid-area:heading] md:col-span-2 min-[1194px]:col-span-1 2xl:text-[36px] 2xl:leading-[36px] 2xl:tracking-[-0.72px]">{t.heading}</h3>
                <p className="font-sans text-[16px] font-medium leading-[22.4px] max-md:[grid-area:desc] md:self-end md:max-w-[26em]">{t.desc}</p>
                <img
                  src={t.img}
                  alt=""
                  className="mx-auto w-[60%] max-w-none -mb-[5%] max-md:[grid-area:img] max-md:-mx-[5%] md:absolute md:bottom-0 md:right-0 md:w-[275px] md:m-0 md:-mb-[20%] md:-mr-[9%] md:self-end min-[1194px]:static min-[1194px]:row-span-2 min-[1194px]:row-start-1 min-[1194px]:col-start-2 min-[1194px]:-mb-[20%] min-[1194px]:-ml-[15%] min-[1194px]:-mr-[9%] min-[1194px]:-mt-[15%] min-[1194px]:w-[275px]"
                />
                {on && (
                  <NextNotchWrap onClick={next} running={visible} onDone={next} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Root>
  )
}

function NextNotchWrap({ onClick, running, onDone }) {
  const ref = useRef(null)
  useEffect(() => {
    const ring = ref.current?.querySelector('[data-ring]')
    if (!ring) return undefined
    ring.addEventListener('animationend', onDone)
    return () => ring.removeEventListener('animationend', onDone)
  })
  useEffect(() => {
    const ring = ref.current?.querySelector('[data-ring]')
    if (!ring) return
    ring.setAttribute('data-running', '')
    ring.style.setProperty('--ring-state', running ? 'running' : 'paused')
  }, [running])
  return (
    <div ref={ref} className="contents">
      <NextNotch onClick={onClick} />
    </div>
  )
}
