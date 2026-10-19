/**
 * RibbonQuote (pages-b section 2.4 / 4.5): folded-corner ribbon header + quote card, built on SplitRibbonCard (variant quote, 360 tab).
 * Colours come from the data-color-theme accent (acc5 / acc10 / acc20 / acc70).
 *
 * Props: size ('solution' = SolutionPage ribbon, 14px tab copy, min-h 400 card | 'banner' = industry banner, 16/22.4 copy, padded card),
 *        theme (alias hue; 'purple' | 'pink' | 'orange' ...), title (h2 in the tab), body (tab paragraph), stat (alias footer; tab footer line),
 *        quote, shortQuote (bool: 64px display quote, solution size), name, role, logo (ReactNode, <=38px tall), mark (ReactNode quote mark),
 *        as (root element, default 'div'; industry pages pass 'section'), className.
 */
import { SplitRibbonCard } from './SplitRibbonCard.jsx'

const SIZE = {
  solution: {
    tab: 'text-[14px]',
    body: 'm-0 mt-[14px] font-sans font-medium leading-[18.2px]',
    panel: 'min-h-[400px] max-lg:text-center',
    quote: (short) => `m-0 my-sp-md max-w-[700px] font-serif font-normal max-lg:mx-auto ${short ? 'text-quote-short-sm sm:text-quote-short-md lg:text-quote-short-lg 2xl:text-quote-short' : 'text-quote-xl-sm lg:text-quote-xl-md 2xl:text-quote-xl'}`,
    caption: 'grid font-sans text-[14px] leading-[19.6px]',
    logo: 'mt-6 flex leading-[0] max-lg:justify-center [&_svg]:max-h-[38px] [&_svg]:w-auto',
    logoTag: 'span',
  },
  banner: {
    tab: '',
    body: 'mt-[14px] font-sans text-[16px] font-medium leading-[22.4px]',
    panel: '!px-6 !py-sp-xl lg:!px-12',
    quote: () => 'my-sp-md max-w-[400px] font-serif text-[20px] font-normal leading-[26px] lg:max-w-[700px] lg:text-[24px] lg:leading-[31.2px] 2xl:text-[32px] 2xl:leading-[40px] 2xl:tracking-[-0.32px]',
    caption: 'grid font-sans text-[16px] leading-[22.4px]',
    logo: 'mt-6 [&>span]:max-h-[38px] [&>span>svg]:max-h-[38px] [&>span>svg]:w-auto',
    logoTag: 'div',
  },
}

export function RibbonQuote({ size = 'solution', theme, hue, title, body, stat, footer, quote, shortQuote = false, name, role, logo, mark, as: Root = 'div', className = '' }) {
  const z = SIZE[size]
  const LogoTag = z.logoTag
  const tab = (
    <>
      <div className="p-7">
        <h2 className={`font-serif text-[28px] font-normal leading-[30.8px] ${size === 'solution' ? 'm-0' : ''}`}>{title}</h2>
        <p className={z.body}>{body}</p>
      </div>
      <div className="bg-[var(--acc10)] p-7 font-sans text-[18px] font-semibold leading-[21.6px] lg:font-serif lg:text-[22px] lg:font-normal lg:leading-[26.4px]">{stat ?? footer}</div>
    </>
  )
  return (
    <Root data-color-theme={theme || hue || 'purple'} className={`text-[var(--acc70)] ${className}`}>
      <SplitRibbonCard
        variant="quote"
        tabWidth={360}
        tone="bg-[var(--acc5)] border-[var(--acc20)]"
        tab={tab}
        tabClass={`grid grid-rows-[minmax(auto,1fr)_auto] overflow-hidden max-lg:text-center ${z.tab} lg:after:absolute lg:after:right-0 lg:after:top-0 lg:after:h-[23px] lg:after:w-[71px] lg:after:bg-[var(--acc20)] lg:after:[clip-path:polygon(100%_0,0%_100%,100%_100%)] lg:after:content-['']`}
        panelClass={z.panel}
      >
        {mark}
        <blockquote className={z.quote(shortQuote)}>{quote}</blockquote>
        <figcaption className={z.caption}>
          <strong className="font-bold">{name}</strong>
          <span className="font-medium">{role}</span>
          <LogoTag className={z.logo}>{logo}</LogoTag>
        </figcaption>
      </SplitRibbonCard>
    </Root>
  )
}
