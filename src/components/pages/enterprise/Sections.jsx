// Page-specific sections for /enterprise/ (specs/pages-a.md §10.3-10.9). Everything generic comes from shared/.
import { useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import { LegacyButton, SplitRibbonCard } from '../../shared/index.js'
import { FRAME_GRID, OPERATE, FEATURES, SCALE_COLUMNS, SCALE_OFFSETS, TABS, TAB_TONES, EXAMPLES, STEP_ITEMS, svg } from './data.js'
import arrowTab from '../../../../reference/svg/pages/enterprise-a-platform-for-organization-wide-intelli-2.svg?raw'
import quoteGlyph from '../../../../reference/svg/pages/enterprise-enterprise-scalability-and-resiliency-2.svg?raw'
import arrowGlyph from '../../../../reference/svg/pages/enterprise-enterprise-scalability-and-resiliency.svg?raw'
import stepIcon from '../../../../reference/svg/pages/enterprise-dataimg-with-you-every-step-of-the-way.svg?raw'
import exampleTicket from '../../../../reference/svg/pages/enterprise-dataimg-see-more-practical-examples.svg?raw'

const sec = 'mx-auto w-full max-w-[1440px] px-page-wide'

/* §10.3 */
export function OperateFrame() {
  return (
    <div className="mx-auto w-full max-w-page px-page">
      <div className="relative overflow-hidden rounded-usp border border-lgc-frame-line xl:h-[741px]">
        <InlineSvg svg={FRAME_GRID} className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="relative mx-auto max-w-[1128px] px-[18px] pb-16 pt-6 xl:px-0 xl:pt-24">
          <h2 className="mx-auto max-w-[460px] text-balance text-center font-serif text-section-h2-sm font-normal sm:text-section-h2">Tines changes the way teams operate</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 xl:mt-[95px]">
            {OPERATE.map((c) => (
              <div key={c.title}>
                <div className="h-[118px]">{c.icon ? <InlineSvg svg={c.icon} className="h-[90px] w-[68px]" /> : <img src={c.iconUrl} alt="" className="h-[90px] w-[68px]" />}</div>
                <h3 className="max-w-[360px] text-balance font-sans text-[24px] font-semibold leading-[26px]">{c.title}</h3>
                <p className="mt-6 max-w-[336px] font-sans text-[16px] font-medium leading-[20.8px]">{c.text}</p>
                <ul className="mt-5 list-disc pl-6 font-sans text-[16px] font-medium leading-[20.8px] [&>li+li]:mt-[5.28px]">
                  {c.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* §10.4 */
export function BuildRunMonitor() {
  return (
    <section className={sec}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="md:col-span-2 xl:col-span-1">
          <h2 className="max-w-[360px] font-serif text-section-h2-sm font-normal sm:text-section-h2">Build, run, and monitor your most important workflows</h2>
          <LegacyButton variant="outlined" href="/stories/" className="mt-[24px]">Explore the platform</LegacyButton>
        </div>
        {FEATURES.map((f, i) => (
          <article key={f.title} className="relative flex min-h-[421px] md:min-h-[451px] flex-col overflow-hidden rounded-[12px] border border-tint-lilac-edge bg-purple-5 sm:rounded-usp">
            <div className="p-6">
              <h3 className="max-w-[288px] font-serif text-[24px] font-normal leading-[26.4px]">{f.title}</h3>
              {f.href && (
                <a href={f.href} className="mt-[7px] inline-block font-sans text-[16px] font-semibold leading-[22.4px] hover:underline">Learn more →</a>
              )}
            </div>
            <div className="relative mt-auto h-[294px]">
              <img src={f.img} alt="" loading="lazy" className="absolute bottom-0 left-1/2 h-[294px] w-[386px] max-w-none -translate-x-1/2" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* §10.5 */
const SCALE_TONE = {
  violet: { box: 'bg-accent border-tint-violet-line text-white', dot: 'bg-legacy-ink text-white' },
  lilac: { box: 'bg-tint-page-bar border-tint-violet-line text-tint-page-ink', dot: 'bg-tint-page-ink text-white' },
  peach: { box: 'bg-lgc-peach-bg border-tint-peach-edge text-lgc-peach-ink', dot: 'bg-lgc-peach-ink text-white' },
  orange: { box: 'bg-lgc-orange border-lgc-orange-line text-white', dot: '' },
  rose: { box: 'bg-lgc-rose-bg border-tint-rose-pale text-lgc-rose-ink', dot: 'bg-lgc-rose-ink text-white' },
  green: { box: 'bg-lgc-green border-pricing-green text-white', dot: '' },
  mint: { box: 'bg-lgc-mint-bg border-lgc-mint-line text-lgc-mint-ink', dot: 'bg-lgc-mint-ink text-white' },
  pink: { box: 'bg-lgc-pink border-lgc-pink-line text-white', dot: '' },
}
function ScaleCard({ c }) {
  const t = SCALE_TONE[c.tone]
  if (c.kind === 'number') {
    return (
      <div style={{ '--h': `${c.h}px` }} className={`xl:min-h-[var(--h)] grid grid-cols-[auto_1fr] items-center gap-3 rounded-usp border p-6 ${t.box}`}>
        <strong className="font-serif text-[54px] font-light leading-[1] tracking-[-0.81px]">{c.value}</strong>
        <span className="font-sans text-[16px] font-medium leading-[17px]">{c.label}</span>
      </div>
    )
  }
  const big = c.kind === 'stat'
  return (
    <div style={{ '--h': `${c.h}px` }} className={`xl:min-h-[var(--h)] flex flex-col justify-between gap-6 rounded-usp border p-6 ${t.box}`}>
      <p className={big ? 'font-serif text-[22px] font-light leading-[24px] tracking-[-0.3px] md:text-[32px] md:leading-[35.2px] md:tracking-[-0.48px]' : 'font-serif text-[15px] font-normal leading-[19px] md:text-[18px] md:leading-[22.5px]'}>
        <span aria-hidden="true" className={`mr-[7px] inline-flex ${big ? 'h-[35px] w-[35px]' : 'h-5 w-5'} translate-y-[${big ? '8px' : '4px'}] items-center justify-center rounded-full align-baseline ${t.dot}`}>
          <InlineSvg svg={big ? arrowGlyph : quoteGlyph} className="h-3 w-3" />
        </span>
        {c.text}
      </p>
      <div>
        {c.caption && <p className="font-sans text-[14px] font-medium leading-[19.6px]">{c.caption}</p>}
        {c.logo && <InlineSvg svg={svg(c.logo)} className="block [&>svg]:h-auto [&>svg]:w-auto [&>svg]:max-h-9" />}
      </div>
    </div>
  )
}
export function Scalability() {
  return (
    <section className={sec}>
      <h2 className="max-w-[552px] font-serif text-section-h2-sm font-normal sm:text-section-h2">Enterprise scalability<br />and resiliency</h2>
      <div className="mt-8 grid grid-cols-2 items-start gap-4 md:gap-6 xl:-mt-[97px] xl:grid-cols-4">
        {SCALE_COLUMNS.map((col, i) => (
          <div key={i} className={`flex flex-col gap-6 ${SCALE_OFFSETS[i]}`}>
            {col.map((c, j) => <ScaleCard key={j} c={c} />)}
          </div>
        ))}
      </div>
    </section>
  )
}

/* §10.6 */
export function PlatformTabs() {
  const [active, setActive] = useState(0)
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[168px_1fr] xl:mt-[64px]">
      <div role="tablist" aria-orientation="vertical" className="hidden gap-3 md:flex md:overflow-x-auto md:pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`ent-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`ent-panel-${t.id}`}
            onClick={() => setActive(i)}
            className={`relative flex min-h-[54px] shrink-0 items-center rounded-[8px] border px-[12.8px] py-[9.6px] text-left font-sans text-[16px] font-normal leading-[18.4px] transition-[filter] duration-100 hover:brightness-[.97] max-lg:w-[168px] lg:w-[168px] ${TAB_TONES[t.tone].tab}`}
          >
            {t.label}
            {i === active && <InlineSvg svg={arrowTab} className={`absolute -right-[12px] top-3 hidden h-[33px] w-[11px] fill-current lg:block ${TAB_TONES[t.tone].panel.split(' ')[0].replace('bg-', 'text-')} [&_path]:fill-current`} />}
          </button>
        ))}
      </div>
      <div className="relative lg:h-[462px]">
        {TABS.map((t, i) => (
          <figure
            key={t.id}
            role="tabpanel"
            id={`ent-panel-${t.id}`}
            aria-labelledby={`ent-tab-${t.id}`}
            aria-hidden={undefined}
            data-motion="legacy-reveal"
            className={`m-0 rounded-usp p-6 lg:absolute lg:inset-0 max-lg:px-6 max-lg:py-6 lg:px-[72px] lg:pb-[72px] lg:pt-16 lg:transition-opacity lg:duration-500 lg:ease-[ease] ${TAB_TONES[t.tone].panel} ${i === active ? 'opacity-100' : 'max-md:opacity-100 md:max-lg:hidden lg:pointer-events-none lg:opacity-0'} max-lg:mb-3`}
          >
            <div className="grid items-center gap-4 lg:gap-6 lg:h-full lg:grid-cols-[465.8px_300.2px]">
              <div className="self-start">
                <h3 className="max-w-[324px] font-serif text-[24px] font-light leading-[28px] tracking-[-0.48px] lg:text-[36px] lg:leading-[36px] lg:tracking-[-0.72px]">{t.label}</h3>
                <p className="mt-[88px] max-w-[528px] font-sans text-[16px] font-medium leading-[20.8px] max-lg:mt-4">{t.text}</p>
              </div>
              <img src={t.img} alt="" loading="lazy" className="mx-auto h-[180px] w-[180px] self-end lg:h-[275px] lg:w-[275px]" />
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute -right-9 top-[190px] hidden lg:block">
              <InlineSvg svg={svg(`a-platform-for-organization-wide-intelli-${t.btn}`)} className="h-[88px] w-[75px]" />
            </span>
          </figure>
        ))}
      </div>
    </div>
  )
}

/* §10.7 */
export function PracticalExamples() {
  return (
    <div className="rounded-usp border border-lgc-sand-line bg-light-100 px-6 pb-12 pt-[55px] xl:h-[456px] xl:px-24 xl:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-[36px] font-light leading-[40px] tracking-[-0.72px]">See more practical examples</h2>
        <LegacyButton variant="outlined" href="/library/">Visit library →</LegacyButton>
      </div>
      <ul className="m-0 mt-[39px] grid list-none grid-cols-2 gap-6 p-0 md:grid-cols-3 xl:grid-cols-5">
        {EXAMPLES.map((e) => (
          <li key={e.title}>
            <a href="/library/" className={`flex h-[223px] flex-col justify-between overflow-hidden rounded-usp border p-[18px] text-white transition-[filter] duration-100 hover:brightness-105 ${e.tone}`}>
              <span className="font-serif text-[18px] font-medium leading-[21.6px]">{e.title}</span>
              <span className="mt-9 flex justify-end">
                {e.icon ? <img src={e.icon} alt="" className="max-w-full" /> : <InlineSvg svg={exampleTicket} className="h-[86px] w-[86px]" />}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* §10.9 */
export function EveryStep() {
  return (
    <SplitRibbonCard
      variant="legacy"
      panelClass="lg:!pl-[118px] lg:!pt-[104px] lg:!pb-[88px]"
      tone="bg-lgc-peach-bg border-tint-peach-edge text-lgc-peach-ink-dk"
      tabClass="flex flex-col justify-between gap-12 p-6 lg:min-h-[544px]"
      tab={
        <>
          <InlineSvg svg={stepIcon} className="h-[90px] w-[82px]" />
          <div>
            <h2 className="max-w-[368px] font-serif text-section-h2-sm font-normal sm:text-section-h2">With you every step of the way</h2>
            <p className="mt-6 max-w-[336px] font-sans text-[16px] font-medium leading-[22.4px]">Our team works alongside yours to help you reach your goals, and is regularly recognized for the service we give enterprise organizations.</p>
          </div>
          <span aria-hidden="true" className="absolute right-0 top-full z-10 hidden h-[47px] w-[72px] bg-tint-peach-edge lg:block [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        </>
      }
    >
      <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2">
        {STEP_ITEMS.map((s) => (
          <li key={s.title} className="grid grid-cols-[42px_1fr] gap-x-3">
            <InlineSvg svg={s.icon} className="h-[42px] w-[42px]" />
            <div>
              <h3 className="font-serif text-[22px] font-normal leading-[24.2px]">{s.title}</h3>
              <p className="mt-4 max-w-[224px] font-sans text-[14px] font-medium leading-[19.6px]">{s.text}</p>
              <a href={s.href} className="mt-[14px] inline-block font-sans text-[14px] font-semibold leading-[19.6px] hover:underline">{s.cta} →</a>
            </div>
          </li>
        ))}
      </ul>
    </SplitRibbonCard>
  )
}
