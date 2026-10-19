/**
 * CaseStudyBookCard. Implements specs/pages-a.md §4.3 and specs/pages-c.md §10.1 (360x270, aspect 4/3).
 * Outer: bg = palette tint, r 24 (768: 14), hover brightness(1.02) .1s. Inner grid `138.8px 185.2px` gap 12 pad 12.
 * Left: customer logo (inline svg, 100w max 87.5%, fill = palette ink). Right "book": bg = saturated hue, r 4 12 12 4,
 * pad 18 18 18 24, content aligned bottom-right, 19x33 bookmark ribbon top-right. Content = quote (Reckless 400 16/17.6 white,
 * truncated) or stat (strong Reckless 38/38 + label Roobert 500 15/18).
 *
 * Props: href, palette ('purple'|'pink'|'green'|'orange'), logo (svg string, rendered inline) OR logoSrc (img url) + logoAlt,
 * quote (string) | stat { value, label }, className.
 */
import InlineSvg from '../InlineSvg.jsx'
import bookmark from '../../../reference/svg/pages/case-studies-bookmark.svg?raw'

// outer / book / logo ink (pages-a §4.3)
const PALETTES = {
  purple: { outer: 'bg-purple-10', book: 'bg-purple-50', ink: 'text-purple-70' },
  pink: { outer: 'bg-tint-rose-mid', book: 'bg-pink-50', ink: 'text-pink-70' },
  green: { outer: 'bg-green-10', book: 'bg-tint-green-book', ink: 'text-tint-green-ink-dk' },
  orange: { outer: 'bg-tint-peach-mid', book: 'bg-orange-50', ink: 'text-orange-70' },
}

export function CaseStudyBookCard({ href = '#', palette = 'purple', logo, logoSrc, logoAlt = '', quote, stat, className = '' }) {
  const p = PALETTES[palette] || PALETTES.purple
  return (
    <a
      href={href}
      className={`block aspect-[4/3] rounded-[14px] transition-[filter] duration-100 hover:brightness-[1.02] md:rounded-[24px] ${p.outer} ${className}`}
    >
      <div className="grid h-full grid-cols-[42.84%_1fr] gap-3 p-3">
        <div className={`p-3 ${p.ink}`}>
          {logo ? <InlineSvg svg={logo} className="block w-[100px] max-w-[87.5%]" label={logoAlt} /> : logoSrc && <img src={logoSrc} alt={logoAlt} className="block w-[100px] max-w-[87.5%]" />}
        </div>
        <div className={`relative flex flex-col items-end justify-end overflow-hidden rounded-l-[4px] rounded-r-[12px] py-[18px] pl-6 pr-[18px] text-right text-white ${p.book}`}>
          <InlineSvg svg={bookmark} className="absolute right-[18px] top-0 h-[33px] w-[19px]" />
          {stat ? (
            <>
              <strong className="font-serif text-[38px] font-normal leading-[38px]">{stat.value}</strong>
              <span className="mt-[6px] max-w-[300px] pl-[7.5px] font-sans text-[15px] font-medium leading-[18px]">{stat.label}</span>
            </>
          ) : (
            <p className="line-clamp-4 font-serif text-[16px] font-normal leading-[17.6px]">{quote}</p>
          )}
        </div>
      </div>
    </a>
  )
}
