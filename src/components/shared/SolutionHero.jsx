/**
 * SolutionHero (pages-b section 2.1 / 4.1). Hero used by SolutionPage and the Industry pages (financial-services, public-sector, mssps).
 *
 * Props
 *   variant       'centered' (default) | 'split' (mssps: left-aligned copy + `aside` illustration, `footer` full-width row below, px page-wide)
 *   kicker        mono 11.5/16.1 uppercase label
 *   title         h1 (sol-h1: 42 / 54 / 64; balance, max 15em; 12em in split)
 *   description   p, Roobert 500 16/22.4, max 36em (24em in split)
 *   buttons       [{ label, href, variant: 'filled' | 'outlined' (alias kind), ext }]  (purple-70 via .btn-tone-70)
 *   decoration    { left, right, icon } >=1280 left/right images flank the h1; below 1280 `icon` is shown centered.
 *                 left/right: { src, w, h, className } (className positions the image against the h1 wrapper)
 *                 icon: { src, w, h, className? } (className replaces the default 'mb-[36px]')
 *   backdrop      node: absolutely positioned decoration layer behind the whole hero section (>=1280 only); industry pages put their
 *                 section-level left/right art + illustration here. Positioned against the section.
 *   smallPrint    node, centered Roobert 500 13/18.2 at .7 opacity under the buttons
 *   aside         split only: node (raw svg) in the right column (286 wide)
 *   footer        split only: node spanning both columns (the MSSP logo marquee)
 *   children      OpeningParagraphs (follows the hero inside the same section)
 */
function HeroButtons({ buttons, className }) {
  return (
    <div className={`btn-tone-70 grid w-fit auto-cols-[minmax(140px,1fr)] grid-flow-col gap-2 ${className}`}>
      {buttons.map((b) => (
        <a key={b.label} href={b.href} {...(b.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`btn ${(b.variant || b.kind) === 'outlined' ? 'btn-outlined' : 'btn-filled'}`}>
          {b.label}
        </a>
      ))}
    </div>
  )
}

export function SolutionHero({ variant = 'centered', kicker, title, description, buttons = [], decoration, backdrop, smallPrint, aside, footer, children, className = '' }) {
  if (variant === 'split') {
    return (
      <section className={`mx-auto w-full max-w-page px-page-wide pt-sp-xxl ${className}`}>
        <div className="grid grid-cols-1 items-center gap-x-6 text-center md:grid-cols-[1fr_auto] md:gap-y-[72px] md:text-left">
          <div>
            <p className="m-0 font-mono text-kicker-mono font-bold uppercase">{kicker}</p>
            <h1 className="m-0 mx-auto mt-sp-md max-w-[12em] text-balance font-serif text-sol-h1-sm font-normal sm:text-sol-h1-md md:mx-0 2xl:text-sol-h1">{title}</h1>
            <p className="m-0 mx-auto mt-sp-md max-w-[24em] font-sans text-solution-body-sm font-medium md:mx-0">{description}</p>
            <HeroButtons buttons={buttons} className="mt-sp-lg max-md:mx-auto" />
          </div>
          {aside}
          <div className="mt-[60px] max-md:order-2 md:col-span-2" style={{ marginInline: 'calc(-1 * (var(--page-margin-wide) - var(--page-margin)))' }}>
            {footer}
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className={`relative mx-auto max-w-page pt-sp-xxl ${className}`}>
      {backdrop && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden max-2xl:hidden">
          {backdrop}
        </div>
      )}
      <div className="relative flex flex-col items-center text-center">
        <div className="w-full max-w-[1040px] px-page">
          {decoration?.icon && (
            <img src={decoration.icon.src} alt="" width={decoration.icon.w} height={decoration.icon.h} className={`mx-auto block 2xl:hidden ${decoration.icon.className || 'mb-[36px]'}`} />
          )}
          {kicker && <p className="m-0 font-mono text-kicker-mono font-bold uppercase">{kicker}</p>}
          <div className="relative z-0 mx-auto mt-sp-md max-w-[15em] text-sol-h1-sm sm:text-sol-h1-md 2xl:text-sol-h1">
            {decoration?.left && <img src={decoration.left.src} alt="" width={decoration.left.w} height={decoration.left.h} className={`pointer-events-none absolute hidden max-w-none 2xl:block ${decoration.left.className}`} />}
            {decoration?.right && <img src={decoration.right.src} alt="" width={decoration.right.w} height={decoration.right.h} className={`pointer-events-none absolute hidden max-w-none 2xl:block ${decoration.right.className}`} />}
            <h1 className="relative m-0 text-balance font-serif text-sol-h1-sm font-normal sm:text-sol-h1-md 2xl:text-sol-h1">{title}</h1>
          </div>
          {description && <p className="mx-auto mt-sp-md max-w-[36em] font-sans text-solution-body-sm font-medium">{description}</p>}
          {buttons.length > 0 && <HeroButtons buttons={buttons} className="mx-auto mt-sp-lg" />}
          {smallPrint && <div className="mx-auto mt-sp-md max-w-[50em] font-sans text-[13px] font-medium leading-[18.2px] opacity-70 [&>p+p]:mt-[.6em]">{smallPrint}</div>}
        </div>
      </div>
      {children}
    </section>
  )
}
