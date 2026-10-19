import { useEffect } from 'react'
import { initMotion } from '../motion/initMotion.js'
import CtaStartToday from '../components/CtaStartToday.jsx'
import InlineSvg from '../components/InlineSvg.jsx'
import ribbonMark from '../../reference/svg/pages/pricing-3xe0ag-ribboncontent.svg?raw'
import { PageSection, SplitRibbonCard, SectionHeading, G2BadgeList, FaqAccordion } from '../components/shared/index.js'
import { LogoMarquee } from '../components/shared/LogoSet.jsx'
import { PricingHero } from '../components/pages/pricing/PricingHero.jsx'
import { PricingPlanCards } from '../components/pages/pricing/PricingPlanCards.jsx'
import { QUOTE, BADGES, FAQS } from '../components/pages/pricing/data.jsx'

export const title = 'Pricing | Tines'
export const theme = 'pricing'

export default function Pricing() {
  useEffect(() => {
    const stop = initMotion()
    // pages-a §1.3: the live page keeps the homepage period (1665px / 41.625s) at the larger logo size
    const pin = () => {
      const t = document.querySelector('[data-motion~="logo-marquee-track"]')
      if (!t) return
      t.style.setProperty('--marqueePeriod', '1665px')
      t.style.setProperty('--marqueeDuration', '41.625s')
    }
    pin()
    window.addEventListener('resize', pin)
    return () => {
      window.removeEventListener('resize', pin)
      stop && stop()
    }
  }, [])
  return (
    <>
    <div className="pb-section-margin pt-[30px] text-page-fg">
      <PricingHero />
      <PricingPlanCards />

      <div className="mx-auto mb-section-margin mt-sp-xl max-w-page px-page">
        <LogoMarquee size="lg" className="max-sm:min-h-[47px] sm:min-h-[39px] xl:min-h-[47px]" />
      </div>

      <PageSection>
        <SplitRibbonCard variant="quote" tone="border-purple-40 bg-purple-60" tab={<span aria-hidden="true" className="absolute right-[71px] top-0 hidden h-6 w-[68px] bg-purple-50 [clip-path:polygon(0_0,100%_100%,0_100%)] lg:block" />} tabWidth={140} panelClass="pb-[38.3px] 3xl:pb-[36px]">
          <InlineSvg svg={ribbonMark} className="!block h-10 w-10 text-purple-5 max-lg:mx-auto max-lg:mb-1" />
          <blockquote className="m-0 my-sp-md text-center font-serif text-[20px] font-normal leading-[26px] tracking-[-0.2px] text-purple-5 lg:text-left xl:text-[24px] xl:leading-[31.2px] xl:tracking-[-0.24px] 2xl:text-[30px] 2xl:leading-[37.5px] 2xl:tracking-[-0.3px]">
            {QUOTE.text}
          </blockquote>
          <figcaption className="text-center font-sans text-[14px] leading-[16.8px] lg:text-left lg:leading-[19.6px]">
            <strong className="block font-bold">{QUOTE.name}</strong>
            <span className="block font-medium">{QUOTE.title}</span>
          </figcaption>
        </SplitRibbonCard>
      </PageSection>

      <PageSection spaced>
        <SectionHeading solution mb={false} className="mb-sp-xl">Don’t take our word for it</SectionHeading>
        <G2BadgeList badges={BADGES} gapSm={30} />
      </PageSection>

      <PageSection wider spaced>
        <FaqAccordion heading="FAQs" items={FAQS} size="lg" />
      </PageSection>
    </div>
    <CtaStartToday flush />
    </>
  )
}
