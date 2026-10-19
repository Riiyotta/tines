/**
 * CenteredQuote (live CenteredQuoteSection). Implements specs/pages-b.md 4.3.
 * Section max calc(1128 + 2*page-wide), px page-wide, colour acc80 (purple-80); inner mx 24 (>=768), centered.
 * 40px quote mark, blockquote max 720 my 24 Reckless 400 32/40 -0.32 (>=1280) / 32/41.6 (920-1279) / 24/31.2 (>=640) / 22/28.6.
 * Source Roobert 16/19.2 (14/16.8 <640): noLogo = centered name (700) + title (500); with `logo` = 2-col grid (names right-aligned,
 * 1px divider at 50%, logo left, gap 48). `button` {label, href} adds the outlined "case study" button (mt 40).
 * Props: quote, name, title, logo (ReactNode), button, className.
 */
import InlineSvg from '../InlineSvg.jsx'
import quoteMark from '../../../reference/svg/pages/public-sector-centered-quote-mark-1.svg?raw'

export function CenteredQuote({ quote, name, title, logo, button, className = '' }) {
  return (
    <section data-color-theme="purple" className={`mx-auto w-full max-w-[calc(1128px+2*var(--page-margin-wide))] px-page-wide text-[var(--acc80)] ${className}`}>
      <figure className="m-0 mx-auto flex max-w-[1080px] flex-col items-center md:mx-6 min-[1440px]:mx-auto">
        <InlineSvg svg={quoteMark} className="block h-10 w-10" />
        <blockquote className="mx-auto my-6 max-w-[720px] text-center font-serif text-[22px] font-normal leading-[28.6px] sm:text-[24px] sm:leading-[31.2px] lg:text-[32px] lg:leading-[41.6px] 2xl:leading-[40px] 2xl:tracking-[-0.32px]">
          {quote}
        </blockquote>
        {logo ? (
          <figcaption className="relative grid w-full grid-cols-1 gap-x-12 gap-y-4 font-sans text-[14px] leading-[16.8px] sm:grid-cols-2 sm:text-[16px] sm:leading-[19.2px]">
            <div className="text-center sm:text-right sm:self-center">
              <p className="font-bold">{name}</p>
              <p className="font-medium">{title}</p>
            </div>
            <div className="flex items-center justify-center sm:min-h-[47.4px] sm:justify-start [&>span]:max-w-[160px]">
              <span aria-hidden="true" className="absolute left-[calc(50%-1px)] top-0 hidden h-full w-px bg-current opacity-20 sm:block" />
              {logo}
            </div>
          </figcaption>
        ) : (
          <figcaption className="text-center font-sans text-[14px] leading-[16.8px] sm:text-[16px] sm:leading-[19.2px]">
            <p className="font-bold">{name}</p>
            <p className="font-medium">{title}</p>
          </figcaption>
        )}
        {button && (
          <div className="mt-sp-lg flex justify-center max-sm:mt-6 sm:mt-10">
            <a href={button.href} className="btn btn-outlined !bg-[var(--acc5)] hover:!bg-[var(--acc10)] [transition:background-color_.2s]">{button.label}</a>
          </div>
        )}
      </figure>
    </section>
  )
}
