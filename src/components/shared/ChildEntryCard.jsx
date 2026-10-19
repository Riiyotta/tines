import { SectionHeading } from './SectionHeading.jsx'

/**
 * ChildEntryCard + ChildEntryCardGrid (pages-b section 2.3 / 4.4): colour-stepped link card (illustration / 20 / 10 strips + title).
 * ChildEntryCard props: title, href, theme (alias hue; 'purple'|'pink'|'orange'|'green'|'yellow'|'teal'), img, className.
 * ChildEntryCardGrid props: layout 'fourPerRowCentered' | 'threePerRow' (flex-wrap centred rows from 1280; 2 columns from 768)
 *   | 'headingCell' (industry pages: 1 col <640, 2 cols >=640, 4 cols >=1194; cell 1 is an h2 `title` + p `description`), className.
 * Hover: border acc20 -> acc30 (.15s).
 */
export function ChildEntryCard({ title, href, theme, hue, img, className = '' }) {
  theme = theme || hue || 'purple'
  return (
    <a
      href={href}
      data-color-theme={theme}
      className={`grid overflow-hidden rounded-card border border-[var(--acc20)] bg-[var(--acc50)] text-[var(--acc80)] transition-[border-color] duration-150 [grid-template-rows:auto_auto_auto_minmax(auto,1fr)] hover:border-[var(--acc30)] ${className}`}
    >
      <div className="flex min-h-[250px] items-center justify-center bg-[var(--acc30)]">
        <img src={img} alt="" className="block max-w-[220px]" />
      </div>
      <div aria-hidden="true" className="h-sp-gap bg-[var(--acc20)]" />
      <div aria-hidden="true" className="h-sp-gap bg-[var(--acc10)]" />
      <div className="bg-[var(--acc5)] p-sp-gap">
        <h3 className="m-0 text-balance font-serif text-card-h3-24 font-normal">{title}</h3>
      </div>
    </a>
  )
}

const LAYOUT = {
  fourPerRowCentered: '2xl:flex 2xl:flex-wrap 2xl:justify-center [&>*]:2xl:w-[calc((100%-72px)/4)]',
  threePerRow: '2xl:flex 2xl:flex-wrap 2xl:justify-center [&>*]:2xl:w-[calc((100%-48px)/3)]',
}

export function ChildEntryCardGrid({ layout = 'fourPerRowCentered', title, description, children, className = '' }) {
  if (layout === 'headingCell') {
    return (
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 min-[1194px]:grid-cols-4 ${className}`}>
        <header className="max-sm:text-center">
          <SectionHeading solution align="left" mb={false} className="max-sm:!text-center [text-wrap:balance]">{title}</SectionHeading>
          <p className="mt-6 font-sans text-[16px] font-medium leading-[22.4px]">{description}</p>
        </header>
        {children}
      </div>
    )
  }
  return <div className={`grid gap-sp-gap md:grid-cols-2 ${LAYOUT[layout]} ${className}`}>{children}</div>
}
