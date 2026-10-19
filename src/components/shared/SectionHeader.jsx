/**
 * SectionHeader (title + "See all →" action). Implements specs/pages-c.md §1 and §4.1 (blog "Latest articles": H2 Roobert 600 24/28.8 -0.24 left,
 * action Roobert 600 13/14.95 right, flex gap 16, 40px above the grid) and §5.4 ProductExplorerSectionHeader (grid `1fr auto`, align end, gap 16:
 * H2 serif 32/36.8 -0.64 + description Roobert 500 16/22.4 mt 12 max 608 hidden on mobile + decorative icon).
 * pages-c additive: descriptionMobile (show the description <640, vendor template pages).
 * Props: title, serif (use Reckless section-h2-serif), eyebrowPill (node), description, action ({label, href} or node), icon (node), className.
 */
export function SectionHeader({ title, serif = false, eyebrowPill, description, descriptionMobile = false, action, icon, className = '' }) {
  return (
    <div className={`mb-10 grid grid-cols-[1fr_auto] items-end gap-4 max-sm:items-start ${className}`}>
      <div>
        {eyebrowPill}
        <h2
          className={
            serif
              ? 'font-serif text-[24px] font-normal leading-[27.6px] tracking-[-0.24px] sm:text-[32px] sm:leading-[36.8px] sm:tracking-[-0.64px]'
              : 'font-sans text-[24px] font-semibold leading-[28.8px] tracking-[-0.24px]'
          }
        >
          {title}
        </h2>
        {description && <p className={`mt-3 max-w-[608px] font-sans text-[16px] font-medium leading-[22.4px] ${descriptionMobile ? '' : 'hidden sm:block'}`}>{description}</p>}
      </div>
      {icon || (action && (action.href ? (
        <a href={action.href} className="font-sans text-[13px] font-semibold leading-[14.95px] hover:underline">{action.label}</a>
      ) : action))}
    </div>
  )
}
