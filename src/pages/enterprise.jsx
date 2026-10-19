// /enterprise/ (legacy Gatsby). specs/pages-a.md §10. Theme 'enterprise': bg lightest, ink #4d3e78.
import { useEffect, useRef } from 'react'
import { LegacyHero, LegacyButton, LegacyLogoMarquee, CenteredIntro, G2BadgeList, ContentCard, LegacyExplosiveCta } from '../components/shared/index.js'
import InlineSvg from '../components/InlineSvg.jsx'
import { OperateFrame, BuildRunMonitor, Scalability, PlatformTabs, PracticalExamples, EveryStep } from '../components/pages/enterprise/Sections.jsx'
import { HERO, MARQUEE_LOGOS, PARTNER_LOGOS, G2_BADGES, CARDS, svg } from '../components/pages/enterprise/data.js'
import { useMarqueeDrift, useScrollParallax } from '../components/pages/_lib/motion.js'
import cello from '../../reference/svg/pages/enterprise-a-platform-for-organization-wide-intelli.svg?raw'
import rings from '../../reference/svg/pages/enterprise-partnered-with-the-companies-you-trust-t.svg?raw'
import ctaMark from '../../reference/svg/pages/enterprise-built-by-you-powered-by-tines.svg?raw'
import decoCube from '../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-2.svg?url'
import decoMug from '../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-3.svg?url'
import decoHex from '../../reference/svg/pages/enterprise-dataimg-built-by-you-powered-by-tines-4.svg?url'

export const title = 'Enterprise | Tines'
export const theme = 'enterprise'

const sec = 'mx-auto w-full max-w-[1440px] px-page-wide'
const DECOS = [
  { src: decoCube, className: 'left-[-40px] top-[-22px] w-[53px]', parallax: '-20,8' },
  { src: decoMug, className: 'left-[-68px] top-[258px] w-[81px]', parallax: '-48,8' },
  { src: decoHex, className: 'left-[323px] top-[363px] w-[51px]', parallax: '-30,8' },
]

export default function Enterprise() {
  const root = useRef(null)
  // decorations get the scroll parallax (translateY ~ -48 -> +8px as the card scrolls into view)
  useEffect(() => {
    root.current?.querySelectorAll('[data-explosion-deco]').forEach((el, i) => { el.dataset.parallax = DECOS[i]?.parallax || '-30,8' })
  }, [])
  useMarqueeDrift(root)
  useScrollParallax(root)
  return (
    <div ref={root}>
      <LegacyHero
        kicker="Enterprise"
        title={<>Intelligent workfl<span>o</span>ws for the enterprise</>}
        decoLeft={HERO.left}
        decoRight={HERO.right}
        decoLeftClass="max-xl:!hidden xl:-left-[64px] xl:top-[195px] xl:w-[165px] 2xl:-left-[124px] 2xl:top-[133px] 2xl:w-[232px]"
        decoRightClass="w-[75vw] left-[49.6vw] top-[63px] xl:left-[47.7vw] xl:top-[8px] xl:w-[768px] 2xl:left-auto 2xl:-right-[48px] 2xl:top-[13px] 2xl:w-[820px]"
        className="md:h-[410px] xl:h-[470px] 2xl:h-[506px]"
        innerClassName="md:!pt-16 max-md:!pt-[49px] max-md:!pb-[40px] max-md:[&>h1]:!mt-[14px]"
        actions={<LegacyButton href="/book-a-demo/">Book a demo</LegacyButton>}
      >
        Leading organizations trust Tines for security and IT operations, from advancing SOAR workflows at Mars to faster incident response at Jamf, all built to scale with your team.
      </LegacyHero>

      <div className="mt-6 text-legacy-ink">
        <LegacyLogoMarquee label="Trusted by global leaders across industries" logos={MARQUEE_LOGOS} />
      </div>

      <div aria-hidden="true" className="mt-6 flex h-[266px] justify-center overflow-hidden md:hidden"><img src={HERO.mobile} alt="" className="block h-[266px] w-[483px] max-w-none shrink-0" /></div>

      <section className="mt-6 md:mt-[94px]"><OperateFrame /></section>

      <div className="mt-section-margin xl:mt-[229px]"><BuildRunMonitor /></div>
      <div className="mt-section-margin"><Scalability /></div>

      <section className={`${sec} mt-section-margin xl:mt-[124px]`}>
        <CenteredIntro icon={cello} iconClass="-mb-[5px] h-[108px] w-[69px]" title="A platform for organization-wide intelligent workflows" titleMax="max-w-[744px]" textMax="max-w-[552px]">
          Tines is powerful enough to handle the most complex security and IT processes without compromising on user experience.
        </CenteredIntro>
        <PlatformTabs />
      </section>

      <section className={`${sec} mt-6`}><PracticalExamples /></section>

      <section className={`${sec} mt-section-margin`}>
        <CenteredIntro icon={rings} iconClass="mb-[34px] h-[74px] w-[118px]" title="Partnered with the companies you trust today" titleMax="max-w-[648px]" textMax="max-w-[528px]">
          Our industry-leading partner network spans 200+ innovative companies, from global consultants to regional experts, ready to support your business today and well into the future.
        </CenteredIntro>
        <ul className="m-0 mx-auto mt-[49px] flex max-w-[936px] list-none flex-wrap justify-center p-0">
          {PARTNER_LOGOS.map((l) => (
            <li key={l.label} className="flex min-h-[90px] items-center justify-center p-[22.4px]" title={l.label} dangerouslySetInnerHTML={{ __html: l.svg }} />
          ))}
        </ul>
      </section>

      <section className={`${sec} mt-section-margin xl:mt-[131px]`}><EveryStep /></section>

      <section className={`${sec} mt-24`}>
        <G2BadgeList badges={G2_BADGES} size={120} gap={48} itemWidth={120} linkClass="rounded-usp" />
      </section>

      <section className={`${sec} mt-section-margin`}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-4 xl:grid-rows-[135.5px_135.5px]">
          {CARDS.map((c) => (
            <ContentCard
              key={c.title}
              eyebrow={c.eyebrow}
              title={c.title}
              cta={c.cta}
              href={c.href}
              tone={c.tone}
              legacy={c.legacy}
              className={c.compact ? '' : 'xl:row-span-2'}
              icon={c.icon ? <img src={c.icon} alt="" className={`w-auto ${c.iconH || 'h-[60px]'}`} /> : c.iconSvg ? <InlineSvg svg={c.iconSvg} className="h-[78px] w-[85px]" /> : null}
            />
          ))}
        </div>
      </section>

      <div data-legacy-cta className="mt-[155px] pb-24">
        <LegacyExplosiveCta showMark markSvg={ctaMark} decos={DECOS} />
      </div>
    </div>
  )
}
