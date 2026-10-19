/**
 * RelatedGrid: "More series / More case studies / More updates / Explore more resources / You can also join us at" row.
 * Implements specs/pages-c.md §1 "Related-items row". Header (SectionHeader) + CardGrid of the collection's own card,
 * rendered via `renderItem(item)` so each collection reuses its card (CoverCard, CaseStudyBookCard, ...).
 * Props: title, items, renderItem, cols ({base,md,lg}, default 1/2/3), gap, action, serif, footer (node, e.g. an outlined "See all" button), className.
 */
import { CardGrid } from './CardGrid.jsx'
import { SectionHeader } from './SectionHeader.jsx'

export function RelatedGrid({ title, items = [], renderItem, cols = { base: 1, md: 2, lg: 3 }, gap = [24, 24], action, serif = true, footer, className = '' }) {
  return (
    <section className={className}>
      <SectionHeader title={title} serif={serif} action={action} />
      <CardGrid cols={cols} gap={gap}>
        {items.map((it, i) => <div key={it.key ?? i}>{renderItem(it)}</div>)}
      </CardGrid>
      {footer && <div className="mt-[55px] flex justify-center">{footer}</div>}
    </section>
  )
}
