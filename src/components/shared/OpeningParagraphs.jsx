/**
 * OpeningParagraphs (pages-b section 2.1): 2-column text block between top and bottom rules (max 936, columns >=768).
 * Props: heading (h2: opening-h2 34/40.8, max 12em), children (p / ul nodes). Place inside SolutionHero.
 * Nested `<ul>` gets padding-left 1em and li + li margin-top .5em; `<strong>` is Roobert 700.
 */
export function OpeningParagraphs({ heading, children, className = '' }) {
  return (
    <div className="px-page">
    <div
      className={`mx-auto my-section-pad max-w-[936px] border-y border-[color-mix(in_srgb,currentColor_20%,transparent)] py-section-pad text-center font-sans text-solution-body-sm font-medium md:columns-2 md:gap-6 md:text-left [&>*+*]:mt-6 max-md:[&>*+*]:mt-4 [&_li+li]:mt-[.5em] [&_li]:break-inside-avoid [&>p]:break-inside-avoid [&_strong]:font-bold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-[1em] [&_ul]:text-left ${className}`}
    >
      <h2 className="m-0 mx-auto max-w-[15em] text-center font-serif text-opening-h2-sm font-normal md:mx-0 md:max-w-[12em] md:text-left md:text-opening-h2">{heading}</h2>
      {children}
    </div>
    </div>
  )
}
