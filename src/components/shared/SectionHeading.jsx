/**
 * SectionHeading ("SectionHeading2"). Implements specs/pages-a.md §REUSE shared pattern 4 + §1.5:
 * centered Reckless 400 46/48.3 ls -0.92 (390: 32/33.6 ls -0.32), mb 55 (390: 35).
 * Props: solution (pages-b: 32 <640 / 38 >=640 / 46 >=1024), as ('h2'), align ('center'|'left'), loose (46/52.9, used by /contact/), mb (false to drop the margin),
 * max (Tailwind max-w class e.g. 'max-w-[690px]'), className, children.
 */
export function SectionHeading({ as: Tag = 'h2', align = 'center', loose = false, size, solution = false, mb = true, max = '', className = '', children, ...rest }) {
  return (
    <Tag
      className={`font-serif font-normal ${loose ? 'text-section-h2-loose max-sm:text-[32px] max-sm:leading-[36.8px] max-sm:tracking-[-0.32px]' : solution ? '[text-wrap:balance] max-sm:text-section-h2-sm sm:max-xl:text-section-h2-md xl:text-section-h2' : 'max-sm:text-section-h2-sm sm:text-section-h2'} ${align === 'center' ? 'mx-auto text-center' : 'text-left'} ${mb ? 'mb-[35px] sm:mb-[55px]' : ''} ${max} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
