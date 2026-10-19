/**
 * LegacyHero. Implements specs/pages-a.md §10.1 (enterprise) and §11.1 (soar `split`).
 *  default: header overflow hidden (506 tall @1440), content pad 0 156, kicker Roobert 700 11.5/16.1 ls 1.15 uppercase, H1 Reckless 300 64/62.08
 *           -1.28 (390: 38/36.86 -0.57 centered) mt 30 max 576, text Roobert 500 16/20.8 mt 24 max 416, button row; decorative
 *           illustrations (left / right >=768, mobile <768) absolutely positioned behind the text.
 *  split:   grid `552 552` gap 24; H1 Roobert 400 62/62 -1.24 (390: 500 44/44 -0.66 centered); text 16/24 mt 24 max 552; actions mt 30; illustration right.
 * Additive: innerClassName (extra classes on the content wrapper, e.g. to change the top pad), decoLeftClass / decoRightClass / decoMobileClass (position classes).
 * Props: variant, kicker, title (node, may contain <span> ligature splits), children (text), actions (node), illustration (node; split),
 *        decoLeft / decoRight / decoMobile (img src strings), className.
 */
export function LegacyHero({ variant = 'default', kicker, title, children, actions, illustration, decoLeft, decoRight, decoMobile, className = '', innerClassName = '', decoLeftClass = 'left-0 top-0', decoRightClass = 'right-0 top-0', decoMobileClass = 'inset-x-0 bottom-0 mx-auto' }) {
  if (variant === 'split') {
    return (
      <header className={`mx-auto grid max-w-[1440px] items-center gap-6 px-page-wide pt-10 md:grid-cols-2 md:pt-[110px] ${className}`}>
        <div className="text-center md:text-left">
          {kicker && <p className="font-sans text-[11.5px] font-bold uppercase leading-[16.1px] tracking-[1.15px]">{kicker}</p>}
          <h1 className="font-sans text-[44px] font-medium leading-[44px] tracking-[-0.66px] md:text-[62px] md:font-normal md:leading-[62px] md:tracking-[-1.24px]">{title}</h1>
          <p className="mt-6 max-w-[552px] font-sans text-[16px] font-medium leading-6">{children}</p>
          {actions && <div className="mt-[30px] flex flex-wrap justify-center gap-[7px] md:justify-start">{actions}</div>}
        </div>
        <div className="flex justify-center md:justify-end">{illustration}</div>
      </header>
    )
  }
  return (
    <header className={`relative overflow-hidden ${className}`}>
      {decoLeft && <img src={decoLeft} alt="" aria-hidden="true" className={`pointer-events-none absolute ${decoLeftClass} hidden md:block`} />}
      {decoRight && <img src={decoRight} alt="" aria-hidden="true" className={`pointer-events-none absolute ${decoRightClass} hidden md:block`} />}
      {decoMobile && <img src={decoMobile} alt="" aria-hidden="true" className={`pointer-events-none absolute ${decoMobileClass} md:hidden`} />}
      <div className={`relative mx-auto max-w-[1440px] px-page-wide pb-16 pt-10 text-center md:pb-[100px] md:pt-[148px] md:text-left ${innerClassName}`}>
        {kicker && <p className="font-sans text-[11.5px] font-bold uppercase leading-[16.1px] tracking-[1.15px]">{kicker}</p>}
        <h1 className="mt-[30px] max-w-[576px] max-md:mx-auto font-serif text-[38px] font-light leading-[36.86px] tracking-[-0.57px] md:text-[64px] md:leading-[62.08px] md:tracking-[-1.28px]">{title}</h1>
        <p className="mt-6 max-w-[416px] font-sans text-[16px] font-medium leading-[20.8px] max-md:mx-auto">{children}</p>
        {actions && <div className="mt-6 flex flex-wrap justify-center gap-[7px] md:justify-start">{actions}</div>}
      </div>
    </header>
  )
}
