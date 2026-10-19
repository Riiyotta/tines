// Page-specific sections for /soar/ (specs/pages-a.md §11.3-11.15). Generic pieces come from shared/.
import { useEffect, useRef, useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import { LegacyLogoMarquee, SplitRibbonCard } from '../../shared/index.js'
import { STATS, STAT_TONES, FEATURES, TRUSTED, WHOLE_TEAM, MOSAIC, svg, asset } from './data.js'
import arrowUp from '../../../../reference/svg/pages/soar-for-the-whole-team.svg?raw'
import quoteDot from '../../../../reference/svg/pages/soar-for-the-whole-team-2.svg?raw'
import smallQuote from '../../../../reference/svg/pages/soar-case-studies-snowflake.svg?raw'
import arrowRight from '../../../../reference/svg/pages/soar-case-studies.svg?raw'
import g2Icon from '../../../../reference/svg/pages/soar-g2-com-products-tines-reviews.svg?raw'
import extArrow from '../../../../reference/svg/pages/soar-g2-com-products-tines-reviews-2.svg?raw'
import stars from '../../../../reference/svg/pages/soar-g2-com-products-tines-reviews-3.svg?raw'
import gartner from '../../../../reference/svg/pages/soar-gartner-com-reviews-market-security-orch.svg?raw'
import brick from '../../../../reference/svg/pages/soar-sounds-hard-to-believe.svg?raw'
import brickShadow from '../../../../reference/svg/pages/soar-sounds-hard-to-believe-2.svg?raw'
import knowbe4 from '../../../../reference/svg/pages/soar-knowbe4.svg?raw'
import ent3 from '../../../../reference/svg/pages/enterprise-intelligent-workflows-for-the-enterprise-3.svg?raw'

const WORD_LOGOS = { elastic: svg('trusted-by-industry-leaders-8'), MARS: svg('trusted-by-industry-leaders-11'), snowflake: svg('trusted-by-industry-leaders-16'), intercom: ent3 }

/* §11.3 */
export function StatCards() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 md:gap-6">
      {STATS.map((s) => {
        const t = STAT_TONES[s.tone]
        return (
          <li key={s.tone} className={`relative flex h-[186px] flex-col justify-end overflow-hidden rounded-usp border md:h-[464px] ${t.box}`}>
            <span aria-hidden="true" className={`absolute inset-x-0 bottom-[168px] hidden h-[84px] md:block ${t.mid}`} />
            <div className={`relative flex h-full flex-col justify-end p-4 md:h-[168px] md:p-6 ${t.strong}`}>
              <h3 className="font-serif text-[24px] font-medium leading-[30px]">{s.lead}<em className="font-bold not-italic">{s.em}</em></h3>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* §11.5 */
export function TrustedBox() {
  return (
    <div className="rounded-usp border border-tint-lilac-line pb-[74px] pt-[55px]">
      <div className="grid items-center gap-4 px-6 md:ml-24 md:grid-cols-[265px_383px] md:gap-0 md:px-0">
        <h2 className="font-serif text-[28px] font-normal leading-[33.5px] md:mr-7 md:border-r md:border-tint-lilac-line md:pr-7">Trusted by industry leaders</h2>
        <p className="max-w-[336px] font-sans text-[14px] font-medium leading-[22px] md:ml-0 md:pl-0">Businesses of all sizes, from global enterprises to national laboratories, automate processes at scale with Tines.</p>
      </div>
      <LegacyLogoMarquee logos={TRUSTED} rows={2} cellClass="mr-8" offsets={[-30, -60]} className="mt-8" />
    </div>
  )
}

/* §11.6-11.10 */
export function FeatureRow({ f, flip }) {
  const ref = useRef(null)
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (reduced) v.pause()
    else v.play?.().catch(() => {})
  }, [reduced])
  return (
    <div className="grid gap-6 md:grid-cols-3 md:items-start">
      <figure className={`m-0 overflow-hidden rounded-usp border md:col-span-2 ${flip ? 'md:order-2' : ''} ${f.tone}`}>
        <video ref={ref} className="block aspect-[742/374] w-full object-cover" src={f.video} poster={f.poster} autoPlay={!reduced} loop muted playsInline preload="metadata" aria-hidden="true" />
      </figure>
      <div className={`max-w-[320px] ${flip ? 'md:order-1' : 'md:pl-6'}`}>
        <p className="font-mono text-[11.5px] font-bold uppercase leading-[16.1px] tracking-[0.57px]">{f.kicker}</p>
        <h3 className="mt-[10px] max-w-[296px] font-serif text-[32px] font-normal leading-[35px] tracking-[-0.48px]">{f.title}</h3>
        <p className="mt-[10px] font-sans text-[16px] font-medium leading-[22.4px]">{f.body}</p>
      </div>
    </div>
  )
}
export const FeatureRows = () => FEATURES.map((f, i) => (
  <section key={f.title} className="mx-auto mt-section-margin w-full max-w-[1440px] px-page-wide">
    <FeatureRow f={f} flip={i % 2 === 1} />
  </section>
))

/* §11.11 */
export function WholeTeam() {
  return (
    <SplitRibbonCard
      variant="quote"
      tabWidth={360}
      tone="bg-tint-peach border-tint-peach-hover"
      tabClass="flex flex-col justify-between text-tint-orange-ink lg:min-h-[424px] lg:!pr-[71px]"
      panelClass="text-tint-orange-ink lg:!px-10 lg:!py-[55px] lg:min-h-[424px]"
      tab={
        <>
          <div className="p-7 pb-6 lg:p-[29px]">
            <h2 className="font-serif text-[28px] font-normal leading-[30.8px]">For the<br />whole team</h2>
            <p className="mt-4 font-sans text-[14px] font-medium leading-[18.2px]">{WHOLE_TEAM.tabText}</p>
          </div>
          <div className="flex items-start gap-1 bg-tint-peach-mid p-7">
            <InlineSvg svg={arrowUp} className="mt-[3px] hidden" />
            <p className="font-serif text-[22px] font-normal leading-[26.4px]">
              <span aria-hidden="true" className="mr-[6px] inline-flex h-[26px] w-[26px] translate-y-[6px] items-center justify-center rounded-full bg-tint-orange-ink text-white"><InlineSvg svg={arrowUp} className="h-[11px] w-[11px]" /></span>
              {WHOLE_TEAM.stat}
            </p>
          </div>
          <span aria-hidden="true" className="absolute right-0 top-0 hidden h-6 w-[72px] -translate-y-full bg-tint-peach-hover lg:block [clip-path:polygon(0_100%,100%_0,100%_100%)]" />
        </>
      }
    >
      <InlineSvg svg={quoteDot} className="h-10 w-10 text-tint-orange-ink [&_circle]:fill-current" />
      <blockquote className="m-0 mt-8 font-serif text-[24px] font-normal leading-[1.25] lg:text-[30px] lg:leading-[37.5px]">{WHOLE_TEAM.quote}</blockquote>
      <p className="mt-8 font-sans text-[14px] font-bold leading-[17.5px]">{WHOLE_TEAM.name}</p>
      <p className="font-sans text-[14px] font-medium leading-[17.5px]">{WHOLE_TEAM.role}</p>
      <InlineSvg svg={WORD_LOGOS.MARS} className="mt-3 h-10 w-[138px] text-tint-orange-ink [&_path]:fill-current" />
    </SplitRibbonCard>
  )
}

/* §11.15 */
function MosaicTile({ t }) {
  const base = 'absolute overflow-hidden rounded-[8px]'
  const style = { left: t.x, top: t.y, width: t.w, height: t.h }
  if (!t.kind) return <div aria-hidden="true" className={`${base} ${t.tone}`} style={style} />
  if (t.kind === 'more') {
    return (
      <a href="/case-studies/" className={`${base} flex flex-col justify-between p-3 font-sans text-[12px] font-bold leading-[13px] ${t.tone}`} style={style}>
        <InlineSvg svg={arrowRight} className="ml-auto h-3 w-[14px]" />
        <span>More<br />case studies</span>
      </a>
    )
  }
  return (
    <div className={`${base} flex flex-col p-4 ${t.tone}`} style={style}>
      {t.kind === 'quote' ? (
        <>
          <p className="font-serif text-[20px] font-medium leading-[24px]"><span aria-hidden="true" className="mr-[6px] inline-block translate-y-[3px]"><InlineSvg svg={smallQuote} className="h-[19px] w-[19px] [&_rect]:fill-current" /></span>{t.text}</p>
          <InlineSvg svg={WORD_LOGOS[t.logoWord]} className="mt-auto h-[26px] w-auto [&>svg]:h-full [&>svg]:w-auto [&_path]:fill-current" />
        </>
      ) : (
        <>
          {t.logo ? <InlineSvg svg={knowbe4} className="h-7 w-[101px]" /> : <InlineSvg svg={WORD_LOGOS[t.logoWord]} className="h-6 w-auto [&>svg]:h-full [&>svg]:w-auto [&_path]:fill-current" />}
          <div className="mt-auto">
            <p className="font-sans text-[16px] font-bold leading-[18px]">{t.big}</p>
            <p className="font-sans text-[13px] font-medium leading-[15px]">{t.small}</p>
          </div>
        </>
      )}
    </div>
  )
}
export function HardToBelieve() {
  return (
    <SplitRibbonCard
      variant="legacy"
      tone="bg-purple-5 border-tint-lilac-line text-purple-70"
      tabClass="z-[2] flex flex-col justify-between gap-12 p-6 lg:min-h-[654px]"
      panelClass="!bg-lightest lg:!p-0 lg:min-h-[654px] overflow-hidden"
      tab={
        <>
          <div className="relative h-[90px] w-[66px]">
            <InlineSvg svg={brickShadow} className="absolute inset-x-0 bottom-0 h-[85px] w-[66px]" />
            <InlineSvg svg={brick} className="absolute inset-x-0 top-0 h-[85px] w-[66px]" />
          </div>
          <div>
            <h2 className="font-serif text-section-h2-sm font-normal sm:text-section-h2">Sounds…<br />hard to believe?</h2>
            <p className="mt-6 max-w-[360px] font-sans text-[16px] font-medium leading-6">We get it. A lot of products make bold claims, and it is fair to ask if one tool can really do all this.</p>
            <p className="mt-4 font-sans text-[16px] font-medium leading-6">Don’t take our word for it.</p>
            <ul className="m-0 mt-6 w-full max-w-[407px] list-none overflow-hidden rounded-[8px] border border-tint-lilac-line bg-lightest p-0 text-purple-65">
              {[['g2', '200+ reviews on G2.com'], ['gartner', '50+ reviews']].map(([k, label], i) => (
                <li key={k}>
                  <a href="https://www.g2.com/products/tines/reviews" target="_blank" rel="noopener noreferrer" className={`flex h-[58px] items-center justify-between px-5 py-4 transition-[background-color] duration-100 hover:bg-purple-2 ${i ? 'border-t border-tint-lilac-line' : ''}`}>
                    <span className="flex items-center gap-2 font-sans text-[14px] font-semibold">
                      {k === 'g2' ? <InlineSvg svg={g2Icon} className="h-6 w-6" /> : <InlineSvg svg={gartner} className="h-5 w-[89px]" />}
                      {label}<InlineSvg svg={extArrow} className="h-2 w-2" />
                    </span>
                    <span className="flex items-center gap-2 font-sans text-[14px] font-semibold"><InlineSvg svg={stars} className="h-3 w-[72px]" />4.8</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <span aria-hidden="true" className="absolute right-0 top-full z-10 hidden h-[47px] w-[72px] bg-tint-lilac-line lg:block [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
        </>
      }
    >
      <div className="relative ml-[72px] hidden h-[654px] w-[720px] lg:block">
        {MOSAIC.map((t, i) => <MosaicTile key={i} t={t} />)}
      </div>
      <p className="p-6 font-serif text-[20px] leading-6 lg:hidden">Teams of every size replace brittle automation with Tines.</p>
    </SplitRibbonCard>
  )
}
export { asset }
