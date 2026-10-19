/**
 * BannerQuoteSection ("ribbon" quote, banner size). Implements specs/pages-b.md 2.4 + 4.5 on top of shared SplitRibbonCard (variant quote, tab 360).
 * Colours from the data-color-theme accent (acc5 / acc10 / acc20 / acc70). Header: h2 Reckless 28/30.8, body Roobert 500 16/22.4 (mt 14),
 * end block acc10 Reckless 22/26.4; folded corner 71x23 acc20 at the header's top-right (>=920). Card: pad sp-xl sp-lg, 40px mark,
 * blockquote Reckless 32/40 -0.32 (>=1280) / 24 (>=920) / 20/26, max 700, source 16/22.4 + logo (max-h 38).
 */
import { SplitRibbonCard } from '../../shared/SplitRibbonCard.jsx'
import InlineSvg from '../../InlineSvg.jsx'
import quoteMark from '../../../../reference/svg/pages/solutions-it-quote-mark-1.svg?raw'

export function BannerQuote({ hue = 'purple', title, body, footer, quote, name, role, logo }) {
  return (
    <section data-color-theme={hue} className="mx-auto w-full max-w-[1440px] px-page-wide text-[var(--acc70)]">
      <SplitRibbonCard
        variant="quote"
        tabWidth={360}
        tone="bg-[var(--acc5)] border-[var(--acc20)]"
        tabClass="grid grid-rows-[minmax(auto,1fr)_auto] overflow-hidden max-lg:text-center lg:!pr-[71px]"
        panelClass="!px-6 !py-sp-xl lg:!px-12"
        tab={
          <>
            <span aria-hidden="true" className="absolute right-0 top-0 hidden h-[23px] w-[71px] bg-[var(--acc20)] [clip-path:polygon(100%_0,0%_100%,100%_100%)] lg:block" />
            <div className="p-7">
              <h2 className="font-serif text-[28px] font-normal leading-[30.8px]">{title}</h2>
              <p className="mt-[14px] font-sans text-[16px] font-medium leading-[22.4px]">{body}</p>
            </div>
            <div className="bg-[var(--acc10)] p-7 font-sans text-[18px] font-semibold leading-[21.6px] lg:font-serif lg:text-[22px] lg:font-normal lg:leading-[26.4px]">{footer}</div>
          </>
        }
      >
        <InlineSvg svg={quoteMark} className="block h-10 w-10" />
        <blockquote className="my-sp-md max-w-[400px] font-serif text-[20px] font-normal leading-[26px] lg:max-w-[700px] lg:text-[24px] lg:leading-[31.2px] 2xl:text-[32px] 2xl:leading-[40px] 2xl:tracking-[-0.32px]">{quote}</blockquote>
        <figcaption className="grid font-sans text-[16px] leading-[22.4px]">
          <strong className="font-bold">{name}</strong>
          <span className="font-medium">{role}</span>
          <div className="mt-6 [&>span]:max-h-[38px] [&>span>svg]:max-h-[38px] [&>span>svg]:w-auto">{logo}</div>
        </figcaption>
      </SplitRibbonCard>
    </section>
  )
}
