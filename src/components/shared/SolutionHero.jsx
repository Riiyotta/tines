/**
 * SolutionHero (pages-b section 2.1). Centered hero used by SolutionPage and the Industry pages.
 *
 * Props
 *   kicker        mono 11.5/16.1 uppercase label
 *   title         h1 (sol-h1: 42 / 54 / 64; balance, max 15em)
 *   description   p, Roobert 500 16/22.4, max 36em
 *   buttons       [{ label, href, variant: 'filled' | 'outlined', ext }]  (purple-70 via .btn-tone-70)
 *   decoration    { left, right, icon } >=1280 left/right images flank the h1; below 1280 `icon` is shown centered.
 *                 left/right: { src, w, h, className } (className positions the image against the h1 wrapper)
 *   smallPrint    node, centered Roobert 500 13/18.2 at .7 opacity under the buttons
 *   children      OpeningParagraphs (follows the hero inside the same section)
 */
export function SolutionHero({ kicker, title, description, buttons = [], decoration, smallPrint, children, className = '' }) {
  return (
    <section className={`relative mx-auto max-w-page pt-sp-xxl ${className}`}>
      <div className="flex flex-col items-center text-center">
        <div className="w-full max-w-[1040px] px-page">
          {decoration?.icon && (
            <img src={decoration.icon.src} alt="" width={decoration.icon.w} height={decoration.icon.h} className="mx-auto mb-[36px] block 2xl:hidden" />
          )}
          {kicker && <p className="m-0 font-mono text-kicker-mono font-bold uppercase">{kicker}</p>}
          <div className="relative z-0 mx-auto mt-sp-md max-w-[15em] text-sol-h1-sm sm:text-sol-h1-md 2xl:text-sol-h1">
            {decoration?.left && <img src={decoration.left.src} alt="" width={decoration.left.w} height={decoration.left.h} className={`pointer-events-none absolute hidden max-w-none 2xl:block ${decoration.left.className}`} />}
            {decoration?.right && <img src={decoration.right.src} alt="" width={decoration.right.w} height={decoration.right.h} className={`pointer-events-none absolute hidden max-w-none 2xl:block ${decoration.right.className}`} />}
            <h1 className="relative m-0 text-balance font-serif text-sol-h1-sm font-normal sm:text-sol-h1-md 2xl:text-sol-h1">{title}</h1>
          </div>
          {description && <p className="mx-auto mt-sp-md max-w-[36em] font-sans text-solution-body-sm font-medium">{description}</p>}
          {buttons.length > 0 && (
            <div className="btn-tone-70 mx-auto mt-sp-lg grid w-fit auto-cols-[minmax(140px,1fr)] grid-flow-col gap-2">
              {buttons.map((b) => (
                <a key={b.label} href={b.href} {...(b.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`btn ${b.variant === 'outlined' ? 'btn-outlined' : 'btn-filled'}`}>
                  {b.label}
                </a>
              ))}
            </div>
          )}
          {smallPrint && <div className="mx-auto mt-sp-md max-w-[50em] font-sans text-[13px] font-medium leading-[18.2px] opacity-70">{smallPrint}</div>}
        </div>
      </div>
      {children}
    </section>
  )
}
