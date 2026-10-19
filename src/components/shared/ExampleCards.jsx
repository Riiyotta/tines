/**
 * ExampleCards ("See more practical examples"). Implements specs/pages-b.md 4.11.
 * Header: row (>=640) h2 left + outlined "Visit library →" button right (gap sp-md), centered column below; header -> grid 55 (sp-xl).
 * Grid: 2 cols gap 8 (<920), 3 cols gap 24 (>=920), 5 cols (>=1280). Card <a>: grid rows (1fr auto) gap sp-xxl, p 1em at 18px, r --radius,
 * bg acc50 + border acc55 (data-color-theme), colour lightest, p Roobert 500 18/21.6, icon place-self end max 86; hover brightness(1.05) with no transition.
 * Props: title, button {label, href}, cards [{ label, href, hue ('orange'|'pink'|'purple'|'blue'|'green'), icon }], className.
 */
import { SectionHeading } from './SectionHeading.jsx'


export function ExampleCards({ title = 'See more practical examples', button, cards = [], className = '' }) {
  return (
    <section className={`mx-auto w-full max-w-[1440px] px-page-wide ${className}`}>
      <header className="flex flex-col items-center gap-sp-md sm:flex-row sm:justify-between">
        <SectionHeading solution align="left" mb={false} className="max-sm:!text-center">{title}</SectionHeading>
        {button && <a href={button.href} className="btn btn-outlined shrink-0">{button.label} →</a>}
      </header>
      <div className="h-sp-xl" />
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-5">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            data-color-theme={c.hue}
            className="grid grid-rows-[minmax(auto,1fr)_auto] gap-sp-xxl rounded-card border border-[var(--acc55)] bg-[var(--acc50)] p-[18px] text-lightest hover:brightness-[1.05]"
          >
            <p className="font-sans text-[18px] font-medium leading-[21.6px]">{c.label}</p>
            <img src={c.icon} alt="" className="max-w-[86px] place-self-end" />
          </a>
        ))}
      </div>
    </section>
  )
}
