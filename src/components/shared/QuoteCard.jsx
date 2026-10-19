/**
 * QuoteCard ("QuoteCardNeue.large"). Implements specs/pages-a.md §9.4: 320 tall, r 14 (390: 12), 1px border, overflow hidden;
 * content pad 24: 27x24 quote glyph + quote Reckless 400 24/31.2 -0.24; footer flex space-between align end, pad 0 21 21:
 * name Roobert 600 14/17.5 + role 500; logo max 110.
 * Props: tone (key of themes.js; orange = peach bg / ink orange-70, purple = purple-5), quote, name, role, logo (ReactNode), className.
 */
import { QuoteMark } from './QuoteMark.jsx'
import { getTheme } from './themes.js'

export function QuoteCard({ tone = 'purple', quote, name, role, logo, className = '' }) {
  const t = getTheme(tone)
  return (
    <figure className={`m-0 flex min-h-[200px] flex-col sm:min-h-[320px] justify-between overflow-hidden rounded-[12px] border sm:rounded-usp ${t.soft} ${t.lineAlt} ${t.ink} ${className}`}>
      <div className="p-6">
        <QuoteMark size={27} className="h-6 w-[27px]" />
        <blockquote className="mt-6 font-serif text-[18px] leading-[23.4px] sm:text-[24px] sm:leading-[31.2px] sm:tracking-[-0.24px]">{quote}</blockquote>
      </div>
      <figcaption className="flex items-end justify-between gap-4 px-[21px] pb-[21px]">
        <div className="font-sans text-[14px] leading-[17.5px]">
          <p className="font-semibold">{name}</p>
          <p className="font-medium">{role}</p>
        </div>
        <div className="max-w-[110px] shrink-0">{logo}</div>
      </figcaption>
    </figure>
  )
}
