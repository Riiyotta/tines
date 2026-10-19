/**
 * SubSolutionHero (pages-b section 3.1, SolutionChildPageHero): colour-stepped card
 * [text panel | c100 strip | c200 strip | illustration]; stacks illustration-first below 768; bleeds by -card-pad at >=1280.
 *
 * Props: theme (hue, default purple), crumbs [{label, href?}] (last = current), title (h1), description,
 *        buttons [{ label, href, variant, ext }], illustration (img src), className.
 */
export function SubSolutionHero({ theme = 'purple', crumbs = [], title, description, buttons = [], illustration, className = '' }) {
  return (
    <div
      data-color-theme={theme}
      className={`grid rounded-card border border-[var(--acc20)] text-[var(--acc70)] md:grid-cols-[minmax(auto,12fr)_minmax(24px,1fr)_minmax(24px,1fr)_minmax(auto,7.2fr)] 2xl:-mx-card-pad ${className}`}
    >
      <div className="order-4 rounded-b-[12px] bg-[var(--acc5)] p-card-pad text-left md:order-1 md:rounded-b-none md:rounded-l-[14px]">
        <nav aria-label="Breadcrumb" className="font-sans text-nav font-semibold">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span aria-hidden="true" className="mx-[.4em] opacity-50">/</span>}
              {c.href ? (
                <a href={c.href} className="opacity-70 transition-opacity hover:opacity-100">{c.label}</a>
              ) : (
                <span className="opacity-70">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="m-0 mt-6 max-w-[575px] text-balance font-serif text-subsol-h1-sm font-normal md:text-subsol-h1-md lg:text-subsol-h1-lg 2xl:text-subsol-h1">{title}</h1>
        <p className="m-0 mt-[1em] font-sans text-[14px] font-medium leading-[16.8px] lg:text-[16px] lg:leading-[19.2px]">{description}</p>
        <div className="btn-tone-70 mt-6 grid w-fit auto-cols-[minmax(140px,1fr)] grid-flow-col gap-2">
          {buttons.map((b) => (
            <a key={b.label} href={b.href} {...(b.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`btn ${b.variant === 'outlined' ? 'btn-outlined' : 'btn-filled'}`}>
              {b.label}
            </a>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="order-3 h-4 bg-[var(--acc10)] md:order-2 md:h-auto" />
      <div aria-hidden="true" className="order-2 h-4 bg-[var(--acc20)] md:order-3 md:h-auto" />
      <div className="relative order-1 rounded-t-[12px] bg-[var(--acc30)] md:order-4 md:min-h-[250px] md:rounded-l-none md:rounded-r-[14px] md:rounded-t-none">
        <img src={illustration} alt="" className="mx-auto my-[2em] block max-w-[90%] md:absolute md:left-1/2 md:top-1/2 md:m-0 md:w-[120%] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2" />
      </div>
    </div>
  )
}
