/**
 * PullQuoteCard. Implements specs/pages-a.md §2.2 (3b side quote `card`: 420x253, pad 42, r 42, purple-10@.55, blur 18, max 544),
 * §2.4-2.6 Monitor quote tile (`bento`: pad 48, r 14, quote Reckless 36/46.8 -0.72) and §7.7 (`centered`: 40px mark, Reckless 32/40, caption grid 516 516).
 *
 * Props: variant ('card'|'bento'|'centered'), quote (string/node), name, title, logo (ReactNode, e.g. <InlineSvg/> or <img/>), className.
 * `card` at <640 sits below the video: margin 24 18 0, pad 24, r 24, quote 18/23.4.
 */
import { QuoteMark } from './QuoteMark.jsx'

export function PullQuoteCard({ variant = 'card', quote, name, title, logo, className = '' }) {
  if (variant === 'centered') {
    // pages-a §7.7: figure max 1080; mark + quote colour `#6956a8` (tint-page-ink)
    return (
      <figure className={`mx-auto flex w-full max-w-[1080px] flex-col items-center px-0 text-tint-page-ink sm:px-6 ${className}`}>
        <QuoteMark size={40} />
        <blockquote className="mt-4 max-w-[720px] text-center font-serif text-[22px] leading-[28.6px] tracking-[-0.22px] sm:mt-6 sm:text-[32px] sm:leading-[40px] sm:tracking-[-0.32px]">{quote}</blockquote>
        <figcaption className="mt-4 grid w-full grid-cols-2 items-center gap-x-8 sm:mt-8 sm:gap-x-12">
          <div className="text-right">
            <p className="font-sans text-[14px] font-bold leading-[16.8px] sm:text-[16px] sm:leading-[19.2px]">{name}</p>
            <p className="font-sans text-[14px] font-medium leading-[16.8px] sm:text-[16px] sm:leading-[19.2px]">{title}</p>
          </div>
          <div className="flex justify-start">{logo}</div>
        </figcaption>
      </figure>
    )
  }
  const bento = variant === 'bento'
  return (
    <figure
      className={`m-0 bg-surface-quote-card backdrop-blur-[18px] ${
        bento
          ? 'flex flex-col justify-between rounded-usp p-6 xl:p-12'
          : 'mx-[18px] mt-6 w-auto rounded-[24px] p-6 sm:mx-0 sm:mt-0 sm:min-h-[253px] sm:max-w-[544px] sm:rounded-[42px] sm:p-[42px]'
      } ${className}`}
    >
      <blockquote
        className={`m-0 font-serif ${bento ? 'max-w-[900px] text-[22px] leading-[28.6px] tracking-[-0.22px] xl:text-[36px] xl:leading-[46.8px] xl:tracking-[-0.72px]' : 'text-[18px] leading-[23.4px] sm:text-[24px] sm:leading-[31.2px] sm:tracking-[-0.24px]'}`}
      >
        {quote}
      </blockquote>
      <figcaption className={`${bento ? 'mt-[22px] xl:mt-9' : 'mt-[16.8px]'} flex items-end justify-between gap-4`}>
        <div>
          <p className="font-sans text-[14px] font-bold leading-[19.6px]">{name}</p>
          <p className="font-sans text-[14px] font-medium leading-[19.6px]">{title}</p>
        </div>
        {logo}
      </figcaption>
    </figure>
  )
}
