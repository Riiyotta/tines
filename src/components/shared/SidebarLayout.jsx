/**
 * SidebarLayout. Implements specs/pages-c.md §1 / §9.1: grid `288px 1000px` gap 72, pad `32px 40px 0` (px-page), sticky aside (top 100, pad 0 48 40 0).
 * pages-c additive: asideClassName (default `xl:pb-10 xl:pr-12`; library passes its own).
 * Props: aside (node), children (main column), stickyTop (px, default 100), className. <1024 the aside stacks above the main column, not sticky.
 */
export function SidebarLayout({ aside, children, stickyTop = 100, asideClassName = 'xl:pb-10 xl:pr-12', className = '' }) {
  return (
    <div className={`mx-auto grid max-w-page grid-cols-1 gap-8 px-page pt-8 xl:grid-cols-[288px_minmax(0,1000px)] xl:gap-[72px] ${className}`}>
      <aside className={`xl:sticky xl:self-start ${asideClassName}`} style={{ top: stickyTop }}>{aside}</aside>
      <div className="min-w-0">{children}</div>
    </div>
  )
}
