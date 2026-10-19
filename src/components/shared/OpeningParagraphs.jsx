/**
 * OpeningParagraphs (pages-b section 2.1): 2-column text block between top and bottom rules (max 936, columns >=768).
 * Props: heading (alias title; h2: opening-h2 34/40.8, max 12em), children (p / ul nodes) or paragraphs (string[]), className,
 *        variant 'solution' (default; px-page inset, mobile gap 16, h2 centered box) | 'wide' (industry pages: its own <section> with
 *        px-page-wide inset, mobile gap 24, h2 box left-aligned). Place inside SolutionHero.
 * Nested `<ul>` gets padding-left 1em and li + li margin-top .5em; `<strong>` is Roobert 700.
 */
const RULE = 'border-y border-[color-mix(in_srgb,currentColor_20%,transparent)]'

export function OpeningParagraphs({ heading, title, children, paragraphs, variant = 'solution', className = '' }) {
  const h = heading ?? title
  if (variant === 'wide') {
    return (
      <section className={`relative mx-auto w-full max-w-[1440px] px-page-wide ${className}`}>
        <div className={`mx-auto my-section-pad max-w-[936px] ${RULE} py-section-pad md:columns-2 md:gap-6 [&>*+*]:mt-6`}>
          <h2 className="max-w-[15em] text-center font-serif text-opening-h2-sm font-normal md:max-w-[12em] md:text-left md:text-opening-h2">{h}</h2>
          {paragraphs
            ? paragraphs.map((p) => (
                <p key={p} className="text-center font-sans text-[16px] font-medium leading-[22.4px] md:text-left">{p}</p>
              ))
            : children}
        </div>
      </section>
    )
  }
  return (
    <div className="px-page">
    <div
      className={`mx-auto my-section-pad max-w-[936px] ${RULE} py-section-pad text-center font-sans text-solution-body-sm font-medium md:columns-2 md:gap-6 md:text-left [&>*+*]:mt-6 max-md:[&>*+*]:mt-4 [&_li+li]:mt-[.5em] [&_li]:break-inside-avoid [&>p]:break-inside-avoid [&_strong]:font-bold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-[1em] [&_ul]:text-left ${className}`}
    >
      <h2 className="m-0 mx-auto max-w-[15em] text-center font-serif text-opening-h2-sm font-normal md:mx-0 md:max-w-[12em] md:text-left md:text-opening-h2">{h}</h2>
      {paragraphs ? paragraphs.map((p) => <p key={p} className="m-0">{p}</p>) : children}
    </div>
    </div>
  )
}
