/**
 * Article content blocks. Implements specs/pages-c.md §2.5.
 *  Callout    margin-top 40, pad 15.3 22.5 18, bg rgb(146 117 244 / .12), border 1px rgb(146 117 244 / .25), r 14; title row (emoji + label) Roobert 600 18/29.25 #9274f4.
 *  TintedBlock pad 40, mt 40, r 14, bg purple-10 (`tone="green"`: bg green-10, ink #00693b, links #00a46e); usually an h2 + link list.
 *  PullQuote  (case study) margin 40 0 18, bg rgb(122 86 224 / .1), r 14, ink purple-70, pad 45; 36px mark mb 13.2; quote Reckless 500 22/28.6; source Roobert 500 18/29.25 mt 27.
 *  ImageBlock margin 40 0 18, img r 9.
 *  VideoBlock figure mt 40, frame bg #312f3b (coolgray-85), r 14, aspect 1380/1080, <video> object-fit contain (autoplay muted loop).
 */
import { QuoteMark } from './QuoteMark.jsx'

export function Callout({ title = 'Note', emoji = '💡', children, className = '' }) {
  return (
    <aside className={`mt-10 rounded-usp border border-surface-callout-border bg-surface-callout px-[22.5px] pb-[18px] pt-[15.3px] max-sm:mt-[30px] max-sm:px-[17.5px] max-sm:pb-[14px] max-sm:pt-[11.9px] ${className}`}>
      <h4 className="mb-[7.2px] flex items-center gap-[7.2px] font-sans text-prose font-semibold text-purple-40 max-sm:mb-[5.6px] max-sm:text-[14px] max-sm:leading-[22.75px]">
        <span aria-hidden="true">{emoji}</span>
        {title}
      </h4>
      <div className="mt-[9px] [&_p]:mt-0">{children}</div>
    </aside>
  )
}

export function TintedBlock({ tone = 'purple', children, className = '' }) {
  const green = tone === 'green'
  return (
    <div
      className={`mt-10 rounded-usp p-10 max-sm:mt-[30px] max-sm:p-[31px] ${green ? 'bg-green-10 text-tint-green-ink [&_a]:text-tint-green-line' : 'bg-purple-10 [&_a]:text-purple-40'} [&_h2]:mt-0 ${className}`}
    >
      {children}
    </div>
  )
}

export function PullQuote({ children, source, className = '' }) {
  return (
    <figure className={`mx-0 mb-[18px] mt-10 rounded-usp bg-surface-pull-quote p-[45px] text-purple-70 ${className}`}>
      <QuoteMark size={36} className="mb-[13.2px]" />
      <blockquote className="m-0 font-serif text-[22px] font-medium leading-[28.6px]">{children}</blockquote>
      {source && <figcaption className="mt-[27px] font-sans text-prose font-medium">{source}</figcaption>}
    </figure>
  )
}

export function ImageBlock({ src, alt = '', caption, className = '' }) {
  return (
    <figure className={`mx-0 mb-[18px] mt-10 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block w-full rounded-[9px]" />
      {caption && <figcaption className="mt-2 font-sans text-[14px] opacity-80">{caption}</figcaption>}
    </figure>
  )
}

export function VideoBlock({ src, poster, aspect = 'aspect-[1380/1080]', className = '' }) {
  return (
    <figure className={`m-0 mt-10 ${className}`}>
      <div className={`${aspect} overflow-hidden rounded-usp bg-coolgray-85`}>
        <video src={src} poster={poster} muted loop playsInline autoPlay className="h-full w-full object-contain" />
      </div>
    </figure>
  )
}
