const SIGNUP_URL = 'https://login.tines.com/saml_idp/signup'

/**
 * Props (pages-a REUSE MAP): `flush` removes the top margin (most inner pages: the preceding spacer provides 156px;
 * the homepage and /ai-in-tines/ keep it); `className` is appended. Colors follow the page theme (currentColor / btn vars).
 */
export default function CtaStartToday({ flush = false, className = '' }) {
  return (
    <section className={`relative mx-auto mb-[2em] ${flush ? 'mt-0' : 'mt-section-margin'} flex max-w-page flex-col items-center px-page pb-section-pad pt-sp-md sm:mb-0 ${className}`}>
      {/* "Start today" canvas stand-in. Region hosts the custom tri-spinner cursor (Animation). */}
      <div
        data-motion="cta-wordmark cta-tri-cursor"
        className="relative z-0 -mt-[7.4%] aspect-[610.08/480] w-full md:-mt-[3.4%] md:aspect-[1202.64/264]"
      >
        {/* Live canvas re-lays out per width ("Start / today" on two lines <768); captured at 390 / 768 / 1100 / 1440 */}
        <picture>
          <source media="(min-width: 1280px)" srcSet="/assets/canvas/cta-canvas-3.png" />
          <source media="(min-width: 1024px)" srcSet="/assets/canvas/cta-canvas-lg.png" />
          <source media="(min-width: 768px)" srcSet="/assets/canvas/cta-canvas-md.png" />
        <img
          src="/assets/canvas/cta-canvas-sm.png"
          alt="Start today"
          draggable="false"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[136.66%] w-[128.84%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain md:h-auto md:w-[113.31%]"
        />
        </picture>
      </div>

      <div className="pointer-events-none relative z-[1] flex max-w-[528px] flex-col items-center gap-8 [&_a]:pointer-events-auto">
        <p className="m-0 mb-[0.5em] max-w-[22em] text-balance text-center font-sans text-tagline font-medium">
          Sign up today to get started or schedule time with our team to learn more.
        </p>
        <div className="grid grid-cols-[140px_140px] gap-2">
          <a href={SIGNUP_URL} className="btn btn-filled w-full">Sign up free</a>
          <a href="/book-a-demo/" className="btn btn-outlined w-full">Book a demo</a>
        </div>
      </div>
    </section>
  )
}
