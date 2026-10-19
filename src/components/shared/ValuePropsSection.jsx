/**
 * ValuePropsSection (pages-b section 2.2): header (h2 or serif lead paragraph + RainbowBridge icon) over a card grid.
 * Cards cycle purple / pink / orange / green / teal by index (bg 5, border 20|25, fg 70), via the data-color-theme --acc vars.
 *
 * Props: heading (string, h2 section-h2) | lead (string, Reckless 500 20/28), icon (img src, 124x81),
 *        items [{ title, body, icon (img src) }], columns (3 -> 3-up at >=1280, 2 -> stays 2-up).
 * Parent supplies the surrounding PageSection.
 */
import { SectionHeading } from './SectionHeading.jsx'

const CYCLE = [
  ['purple', 'border-[var(--acc20)]'],
  ['pink', 'border-[var(--acc25)]'],
  ['orange', 'border-[var(--acc25)]'],
  ['green', 'border-[var(--acc25)]'],
  ['teal', 'border-[var(--acc20)]'],
]

export function ValuePropCard({ title, body, icon, colorIndex = 0 }) {
  const [hue, border] = CYCLE[colorIndex % CYCLE.length]
  return (
    <article data-color-theme={hue} className={`flex h-full flex-col gap-4 rounded-card border bg-[var(--acc5)] p-sp-md text-[var(--acc70)] sm:gap-6 ${border}`}>
      <h3 className="m-0 font-serif text-valueprop-h3 font-normal 2xl:text-valueprop-h3-lg">{title}</h3>
      <p className="m-0 pr-[1em] font-sans text-solution-body font-medium">{body}</p>
      {icon && <img src={icon} alt="" className="ml-auto mt-auto h-[90px] w-auto object-contain" />}
    </article>
  )
}

export function ValuePropsSection({ heading, lead, icon, items, columns = 3, className = '' }) {
  return (
    <div className={className}>
      <div className="grid gap-sp-gap max-md:justify-items-center max-md:text-center md:grid-cols-3">
        <div className={`max-md:order-2 max-md:w-full md:col-span-2 ${heading ? 'md:self-center' : ''}`}>
          {heading ? (
            <SectionHeading size="solution" align="left" mb={false} className="max-md:!text-center md:self-center">{heading}</SectionHeading>
          ) : (
            <p className="m-0 font-serif text-[20px] font-medium leading-[28px] tracking-[-0.2px] md:pr-[1em]">{lead}</p>
          )}
        </div>
        <img src={icon} alt="" width="124" height="81" className="max-md:order-1 max-md:mb-[1em] md:ml-auto md:justify-self-end" />
      </div>
      <ul className={`m-0 mt-sp-xl grid list-none gap-sp-gap p-0 md:grid-cols-2 ${columns === 3 ? '2xl:grid-cols-3' : ''}`}>
        {items.map((it, i) => (
          <li key={it.title} className="contents">
            <ValuePropCard {...it} colorIndex={i} />
          </li>
        ))}
      </ul>
    </div>
  )
}
