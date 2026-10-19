/**
 * RibbonQuote (pages-b section 2.4, `solution` size): folded-corner ribbon header + quote card, built on SplitRibbonCard (variant quote, 360 tab).
 *
 * Props: theme ('purple' | 'pink'), title (h2 in the tab), body (tab paragraph), stat (tab footer line), quote, shortQuote (bool: 64px display quote),
 *        name, role, logo (ReactNode, <=38px tall), mark (ReactNode quote mark).
 */
import { SplitRibbonCard } from './SplitRibbonCard.jsx'

export function RibbonQuote({ theme = 'purple', title, body, stat, quote, shortQuote = false, name, role, logo, mark, className = '' }) {
  const tab = (
    <>
      <div className="p-7">
        <h2 className="m-0 font-serif text-[28px] font-normal leading-[30.8px]">{title}</h2>
        <p className="m-0 mt-[14px] font-sans font-medium leading-[18.2px]">{body}</p>
      </div>
      <div className="bg-[var(--acc10)] p-7 font-sans text-[18px] font-semibold leading-[21.6px] lg:font-serif lg:text-[22px] lg:font-normal lg:leading-[26.4px]">{stat}</div>
    </>
  )
  return (
    <div data-color-theme={theme} className={`text-[var(--acc70)] ${className}`}>
      <SplitRibbonCard variant="quote" tabWidth={360} tone="bg-[var(--acc5)] border-[var(--acc20)]" tab={tab} tabClass="grid grid-rows-[minmax(auto,1fr)_auto] overflow-hidden text-[14px] max-lg:text-center lg:after:absolute lg:after:right-0 lg:after:top-0 lg:after:h-[23px] lg:after:w-[71px] lg:after:bg-[var(--acc20)] lg:after:[clip-path:polygon(100%_0,0%_100%,100%_100%)] lg:after:content-['']" panelClass="min-h-[400px] max-lg:text-center">
        {mark}
        <blockquote
          className={`m-0 my-sp-md max-w-[700px] font-serif font-normal max-lg:mx-auto ${shortQuote ? 'text-quote-short-sm sm:text-quote-short-md lg:text-quote-short-lg 2xl:text-quote-short' : 'text-quote-xl-sm lg:text-quote-xl-md 2xl:text-quote-xl'}`}
        >
          {quote}
        </blockquote>
        <figcaption className="grid font-sans text-[14px] leading-[19.6px]">
          <strong className="font-bold">{name}</strong>
          <span className="font-medium">{role}</span>
          <span className="mt-6 flex leading-[0] max-lg:justify-center [&_svg]:max-h-[38px] [&_svg]:w-auto">{logo}</span>
        </figcaption>
      </SplitRibbonCard>
    </div>
  )
}
