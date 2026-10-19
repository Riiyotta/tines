/**
 * ChildEntryCard grid with a heading cell (IndustryPage "withHeadingCell"). Implements specs/pages-b.md 2.3 (card) + 4.4 (grid).
 * NOTE for reconciliation: group b1 owns ChildEntryCard for SolutionPage; this one carries the same card spec.
 * Grid gap 24; 1 col (<640), 2 cols (>=640), 4 cols (>=1194). Cell 1 = h2 + p (left, centered <640).
 * Card: grid areas illustration / c200 / c100 / header, r --radius, 1px acc20 (hover acc30, .15s), bg acc50, colour acc80;
 * illustration bg acc30 min-h 250 centered (img max 220); strips h sp-gap acc20 + acc10; header pad sp-gap bg acc5, balance, Reckless 24/27.6 -0.2.
 */
import { SectionHeading } from '../../shared/SectionHeading.jsx'

export function ChildEntryCard({ title, href, hue, img }) {
  return (
    <a
      href={href}
      data-color-theme={hue}
      className="grid grid-rows-[auto_auto_auto_minmax(auto,1fr)] overflow-hidden rounded-card border border-[var(--acc20)] bg-[var(--acc50)] text-[var(--acc80)] transition-[border-color] duration-150 hover:border-[var(--acc30)]"
    >
      <div className="flex min-h-[250px] items-center justify-center bg-[var(--acc30)]">
        <img src={img} alt="" className="max-w-[220px]" />
      </div>
      <div className="h-sp-gap bg-[var(--acc20)]" />
      <div className="h-sp-gap bg-[var(--acc10)]" />
      <div className="bg-[var(--acc5)] p-sp-gap [text-wrap:balance]">
        <h3 className="font-serif text-card-h3-24 font-normal">{title}</h3>
      </div>
    </a>
  )
}

export function ChildCardGrid({ title, description, cards }) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-page-wide">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 min-[1194px]:grid-cols-4">
        <header className="max-sm:text-center">
          <SectionHeading solution align="left" mb={false} className="max-sm:!text-center [text-wrap:balance]">{title}</SectionHeading>
          <p className="mt-6 font-sans text-[16px] font-medium leading-[22.4px]">{description}</p>
        </header>
        {cards.map((c) => (
          <ChildEntryCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  )
}
