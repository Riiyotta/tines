import InlineSvg from '../../InlineSvg.jsx'
import left from '../../../../reference/svg/pages/pricing-3hxbxq-heroillustration.svg?raw'
import right from '../../../../reference/svg/pages/pricing-3hxbxq-heroillustration-2.svg?raw'

/** Pricing hero (specs/pages-a.md §1.1): grid 490 / 320 / 490, centered H1 "Pricing", mirrored illustrations. */
export function PricingHero() {
  return (
    <section className="mx-auto mb-sp-xxl grid max-w-page grid-cols-1 gap-[18px] px-page xl:mb-sp-sm xl:grid-cols-[293px_320px_293px] xl:gap-6 2xl:grid-cols-[490px_320px_490px] 2xl:gap-[30px]">
      <div className="flex justify-center xl:justify-end">
        <InlineSvg svg={left} className="h-[168px] w-[200px] xl:h-[201px] xl:w-[240px]" />
      </div>
      <h1 className="m-0 self-center text-center font-sans text-[48px] font-normal leading-[48px] tracking-[-0.96px] text-white sm:text-[64px] sm:leading-[64px] sm:tracking-[-1.92px] xl:order-none max-xl:-order-none">
        Pricing
      </h1>
      <div className="hidden justify-start xl:flex">
        <InlineSvg svg={right} className="h-[201px] w-[240px]" />
      </div>
    </section>
  )
}
