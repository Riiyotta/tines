/**
 * PaginatedListNav. Implements specs/pages-c.md §2.3 (and the 3b/examples pagination, pages-a §3.2).
 * Bar: flex space-between, bg #f3ecf7 (tint-page-bar), r 990, pad 7 5.25, h 49. Prev/Next pad 10.5 17.5 r 5.6 Roobert 500 14/16.1
 * (disabled = span @ .3). Page links 35x35 r 5.6, gap 14, active bg #eadff8 text #6956a8 bold, ellipsis @ .4. Pattern: first 4,
 * a window of 3 around the middle, last 4. <640 shows "Page n / total" and hides the page links.
 * Props: page (1-based), total, hrefFor(n) -> url (default `?page=n`), onPage(n) (optional click handler), className.
 */
function pagesFor(page, total) {
  if (total <= 12) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set([1, 2, 3, 4, total - 3, total - 2, total - 1, total])
  const mid = Math.min(Math.max(page, 5), total - 4)
  ;[mid - 1, mid, mid + 1].forEach((n) => n > 4 && n < total - 3 && set.add(n))
  const sorted = [...set].sort((a, b) => a - b)
  const out = []
  sorted.forEach((n, i) => {
    if (i && n - sorted[i - 1] > 1) out.push('…')
    out.push(n)
  })
  return out
}

export function PaginatedListNav({ page = 1, total = 1, hrefFor = (n) => `?page=${n}`, onPage, className = '' }) {
  const link = 'rounded-[5.6px] font-sans text-nav font-medium transition-colors hover:bg-tint-page-active/60'
  const click = (n) => (onPage ? (e) => { e.preventDefault(); onPage(n) } : undefined)
  return (
    <nav aria-label="Pagination" className={`flex h-[49px] items-center justify-between rounded-pill bg-tint-page-bar px-[5.25px] py-[7px] ${className}`}>
      {page > 1 ? (
        <a href={hrefFor(page - 1)} onClick={click(page - 1)} className={`${link} px-[17.5px] py-[10.5px]`}>← Previous</a>
      ) : (
        <span className="rounded-[5.6px] px-[17.5px] py-[10.5px] font-sans text-nav font-medium opacity-30">← Previous</span>
      )}
      <span className="font-sans text-nav font-medium sm:hidden">Page {page} / {total}</span>
      <div className="hidden items-center justify-center gap-[14px] sm:flex">
        {pagesFor(page, total).map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="opacity-40">…</span>
          ) : (
            <a
              key={n}
              href={hrefFor(n)}
              onClick={click(n)}
              aria-current={n === page ? 'page' : undefined}
              className={`${link} flex h-[35px] w-[35px] items-center justify-center px-[3.5px] ${n === page ? 'bg-tint-page-active font-bold text-tint-page-ink' : ''}`}
            >
              {n}
            </a>
          ),
        )}
      </div>
      {page < total ? (
        <a href={hrefFor(page + 1)} onClick={click(page + 1)} className={`${link} px-[17.5px] py-[10.5px]`}>Next →</a>
      ) : (
        <span className="rounded-[5.6px] px-[17.5px] py-[10.5px] font-sans text-nav font-medium opacity-30">Next →</span>
      )}
    </nav>
  )
}
