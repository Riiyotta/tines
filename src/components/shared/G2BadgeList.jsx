/**
 * G2BadgeList. Implements specs/pages-a.md §1.5 + §13.3. Props:
 *   badges: [{ src, alt, href? }]
 *   size: img max-width in px (140 pricing, 164 customers tiles, 120 enterprise). Default 140.
 *   gap: px between items at >=640 (pricing 40, enterprise 24); itemWidth: li width (pricing 155 = size+15; enterprise = size)
 *   linkClass: e.g. 'rounded-usp' (enterprise links r14); imgSize: [w, h] intrinsic size attributes so lazy images reserve space (pages-b2: [130, 150])
 * gapSm: gap px between 640 and 1279 (defaults to gap; pricing 30). Items shrink in a single row from 640 up.
 * <640: a 3-column grid, gap 16, img max 90 (pricing/customers mobile).
 */
export function G2BadgeList({ badges = [], size = 140, gap = 40, gapSm = gap, itemWidth = size + 15, linkClass = '', imgSize, className = '' }) {
  return (
    <ul
      className={`m-0 grid list-none grid-cols-3 justify-items-center gap-4 p-0 sm:flex sm:flex-nowrap sm:items-start sm:justify-center sm:gap-[var(--g2-gap-sm)] 2xl:gap-[var(--g2-gap)] ${className}`}
      style={{ '--g2-gap': `${gap}px`, '--g2-gap-sm': `${gapSm}px`, '--g2-size': `${size}px`, '--g2-item': `${itemWidth}px` }}
    >
      {badges.map((b) => {
        const img = (
          <img
            src={b.src}
            alt={b.alt}
            loading="lazy"
            {...(imgSize ? { width: imgSize[0], height: imgSize[1] } : {})}
            className="mx-auto block h-auto w-full max-w-[90px] sm:max-w-[var(--g2-size)]"
          />
        )
        return (
          <li key={b.src} className="w-full sm:w-[var(--g2-item)] sm:shrink">
            {b.href ? (
              <a href={b.href} target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
                {img}
              </a>
            ) : (
              img
            )}
          </li>
        )
      })}
    </ul>
  )
}
