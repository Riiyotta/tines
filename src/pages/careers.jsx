// /careers/ (legacy Gatsby). specs/pages-a.md §12. Theme 'plain': bg lightest, fg purple-65.
import { useEffect, useRef } from 'react'
import { LegacyExplosiveCta, ValueCards, ArticleEntryCard } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import { CareersHero, VideoPoster, StatsStrip, WhereWeWork, Awards, Benefits, OpenPositions, Inclusion } from '../components/pages/careers/Sections.jsx'
import { POSTS, VALUES, svg } from '../components/pages/careers/data.js'
import { useScrollParallax } from '../components/pages/_lib/motion.js'
import ctaMark from '../../reference/svg/pages/enterprise-built-by-you-powered-by-tines.svg?raw'
import decoCube from '../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-2.svg?url'
import decoMug from '../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-3.svg?url'
import decoHex from '../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-4.svg?url'

export const title = 'Careers | Tines'
export const theme = 'plain'

const sec = 'mx-auto w-full max-w-[1440px] px-page-wide'
const DECOS = [
  { src: decoCube, className: 'left-[-40px] top-[-22px] w-[53px]', parallax: '-20,8' },
  { src: decoMug, className: 'left-[-68px] top-[258px] w-[81px]', parallax: '-48,8' },
  { src: decoHex, className: 'left-[323px] top-[363px] w-[51px]', parallax: '-30,8' },
]

export default function Careers() {
  const root = useRef(null)
  useEffect(() => {
    root.current?.querySelectorAll('[data-explosion-deco]').forEach((el, i) => { el.dataset.parallax = DECOS[i]?.parallax || '-30,8' })
  }, [])
  useScrollParallax(root)
  return (
    <div ref={root}>
      <CareersHero />

      <section className={`${sec} mt-0`}>
        <VideoPoster />
      </section>

      <section className="mt-[30px]"><StatsStrip /></section>

      <div className="mt-section-margin"><WhereWeWork /></div>

      <section className={`${sec} mt-0`}>
        <div className="text-center">
          <h2 className="font-serif text-section-h2-sm font-normal text-purple-60 md:text-[38px] md:leading-[39.9px] lg:text-section-h2">Our values</h2>
          <p className="mx-auto mt-6 max-w-[384px] font-sans text-[16px] font-medium leading-6">We live our values of Speed, Simplicity and Soundness in everything we do at Tines.</p>
          <a href="/about/" className="mt-7 inline-block font-sans text-[16px] font-bold leading-[22px] text-purple-60 hover:underline">Learn more about Tines →</a>
        </div>
        <ValueCards variant="careers" items={VALUES} className="mt-[68px]" />
      </section>

      <section className={`${sec} mt-section-margin`}>
        <h2 className="text-center font-serif text-section-h2-sm font-normal md:text-[38px] md:leading-[39.9px] lg:text-section-h2">Hear from our team</h2>
        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-[45px] p-0 md:mt-12 md:gap-y-16 xl:mt-[66px] 2xl:mt-[96px] sm:grid-cols-2 xl:grid-cols-3">
          {POSTS.map((p) => (
            <li key={p.title}><ArticleEntryCard href={p.href} cover={p.img} title={p.title} coverClass="transition-[filter,transform] duration-100 hover:brightness-[1.03]" /></li>
          ))}
          <li>
            <a href="/blog/" className="flex aspect-[360/189] items-center justify-center gap-6 rounded-[10px] border border-tint-lilac-line font-sans text-[16px] font-semibold transition-[background-color] duration-100 hover:bg-purple-5">
              <InlineSvg svg={svg('dataimg-hear-from-our-team')} className="h-[65px] w-[79px]" />
              More in our blog →
            </a>
          </li>
        </ul>
      </section>

      <div className="mt-section-margin"><Awards /></div>

      <div className="mt-section-margin xl:mt-[222px]"><Benefits /></div>

      <div className="mt-section-margin"><OpenPositions /></div>

      <div className="mt-section-margin"><Inclusion /></div>

      <div data-legacy-cta className="mt-[155px] pb-24">
        <LegacyExplosiveCta showMark markSvg={ctaMark} decos={DECOS} />
      </div>
    </div>
  )
}
