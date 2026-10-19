/**
 * FaqAccordion. Implements specs/pages-a.md §1.6 (native <details>, plus/minus marker, no animation) with the
 * lg (pricing) / md (3b) variant table. Items: [{ q: string, a: ReactNode }]. Props: heading, size ('lg'|'md'),
 * wider (PageSection wider wrapper), className.
 *   lg: centered Reckless 46/48.3 heading (SectionHeading); question Roobert 600 24/33; gap 24; answer 16/22.4.
 *   md: left Roobert 500 42/46.2 -1.26 heading, max 840 (390: 32/35.2); question 22/30.25 (390 18/24.75); gap 22; answer 18/25.2 max 1152.
 * Item borders: border-top 1px currentColor@20%, last item also border-bottom. summary pad 30 0 (390: 18 0).
 */
import { SectionHeading } from './SectionHeading.jsx'

export function FaqAccordion({ heading, items = [], size = 'lg', className = '' }) {
  const lg = size === 'lg'
  return (
    <div className={className}>
      {heading &&
        (lg ? (
          <SectionHeading solution mb={false} className="mb-sp-xl">{heading}</SectionHeading>
        ) : (
          <h2 className="mb-[35px] max-w-[840px] font-sans text-faq-h2-sm font-medium sm:text-faq-h2-md lg:mb-10 2xl:mb-[45px] 3xl:mb-[55px]">{heading}</h2>
        ))}
      <div>
        {items.map((it, i) => (
          <details key={it.q} className="faq-item group border-t border-[color-mix(in_srgb,currentColor_20%,transparent)] last:border-b">
            <summary
              className={`flex cursor-pointer list-none items-center justify-between py-[18px] font-sans font-semibold lg:py-6 2xl:py-[27.5px] 3xl:py-[30px] [&::-webkit-details-marker]:hidden ${
                lg ? 'gap-6 text-faq-q-sm md:text-[20px] md:leading-[27.5px] 2xl:text-faq-q' : 'gap-[22px] text-faq-q-sm md:text-faq-q-md'
              }`}
            >
              <span>{it.q}</span>
              <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                <span className="absolute left-px top-[7px] h-[2px] w-[14px] bg-current" />
                <span className="absolute left-[7px] top-px h-[14px] w-[2px] bg-current group-open:hidden" />
              </span>
            </summary>
            <div className={`pb-[18px] pr-8 font-sans font-medium lg:pb-6 2xl:pb-[27.5px] 3xl:pb-[30px] ${lg ? 'text-[16px] leading-[24px]' : 'max-w-[1152px] text-[18px] leading-[25.2px]'} [&_a]:font-medium [&_a]:underline [&_p+p]:mt-[0.75em]`}>
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
