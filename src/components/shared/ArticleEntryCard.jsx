/**
 * ArticleEntryCard (cover image + title). Implements specs/pages-a.md §9.5 / §12.6 and pages-c.md §2.2 CoverCard `default`:
 * cover aspect 1200/630 (552x290 @partners, 360x189 @careers), bg light-200 `#f3efea`, r 10, overflow hidden, object-fit cover;
 * header mt 14, max 90%; title Roobert 500 18/21.6. No hover change (static, cursor pointer).
 * Props: href, cover (img src), alt, title (string), children (extra header content), coverClass, className.
 */
export function ArticleEntryCard({ href = '#', cover, alt = '', title, children, coverClass = '', className = '' }) {
  return (
    <a href={href} className={`block cursor-pointer ${className}`}>
      <div className={`aspect-[1200/630] w-full overflow-hidden rounded-[10px] bg-light-200 ${coverClass}`}>
        {cover && <img src={cover} alt={alt} loading="lazy" className="h-full w-full object-cover" />}
      </div>
      <div className="mt-[14px] max-w-[90%]">
        <h3 className="font-sans text-[18px] font-medium leading-[21.6px]">{title}</h3>
        {children}
      </div>
    </a>
  )
}
