/**
 * QuoteCardNeue (+ grid). Implements specs/pages-b.md 4.14. Colours come from the data-color-theme accent vars (acc5 / acc20 / acc70).
 * Card: r 14 (12 <640), grid rows (minmax(0,1fr) auto), overflow hidden, left-aligned.
 *  variant 'quote': pad 24, Reckless 400 18/24.3 (20/27 -0.2 >=1280), leading quote mark (1em tall, mr .25em).
 *  variant 'stat':  `stat` Reckless 300 42/37.8 -0.84 (48/43.2 -1.44 >=1280) block mb .3em + label Roobert 500 16/22.4 ls -.14 max 18em.
 * Footer: pad 0 21 21, Roobert 500 14/17.5; logo right (max 110), name 600 + title left.
 * Props: hue, variant, quote | stat + label, name, title, logo (ReactNode), quoteMark (ReactNode).
 */
export function QuoteCardNeue({ hue = 'purple', variant = 'quote', quote, stat, label, name, title, logo, quoteMark, className = '' }) {
  return (
    <figure
      data-color-theme={hue}
      className={`m-0 grid grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-[12px] border border-[var(--acc20)] bg-[var(--acc5)] text-left text-[var(--acc70)] sm:rounded-card ${className}`}
    >
      <div className="p-6">
        {variant === 'stat' ? (
          <>
            <em className="mb-[.3em] block font-serif text-[42px] font-light not-italic leading-[37.8px] tracking-[-0.84px] 2xl:text-[48px] 2xl:leading-[43.2px] 2xl:tracking-[-1.44px]">{stat}</em>
            <p className="max-w-[18em] font-sans text-[16px] font-medium leading-[22.4px] tracking-[-0.14px]">{label}</p>
          </>
        ) : (
          <blockquote className="m-0 font-serif text-[18px] font-normal leading-[24.3px] 2xl:text-[20px] 2xl:leading-[27px] 2xl:tracking-[-0.2px]">
            {quoteMark && <span className="mr-[.25em] inline-block h-[1em] w-[1.1em] translate-y-[.15em] [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: quoteMark }} />}
            {quote}
          </blockquote>
        )}
      </div>
      <figcaption className="flex flex-row-reverse items-end justify-between gap-4 px-[21px] pb-[21px] font-sans text-[14px] font-medium leading-[17.5px]">
        {logo && <div className="max-w-[110px] shrink-0">{logo}</div>}
        {(name || title) && (
          <div>
            {name && <p className="font-semibold">{name}</p>}
            {title && <p>{title}</p>}
          </div>
        )}
      </figcaption>
    </figure>
  )
}
