/**
 * PartnerLogoGrid. Implements specs/pages-b.md 4.12.
 * Header: centered 90px section icon, h2 centered (max 690), optional description (max 576, mt .75em); then 55 (sp-xl).
 * Grid: flex-wrap centered, max 1000, margin 0 auto -1.4em (-1em <920); items h 90, p 1.4em, basis 20% (>=1024) / 25% (>=920) / 33.33% (>=512) / 50%;
 * logos are inline SVG (currentColor), max-h 40 / max-w 100%.
 * Props: icon (raw svg), title, description, logos [{ name, svg (raw) }], className.
 */
import InlineSvg from '../InlineSvg.jsx'
import { SectionHeading } from './SectionHeading.jsx'

export function PartnerLogoGrid({ icon, title, description, logos = [], className = '' }) {
  return (
    <section className={`mx-auto w-full max-w-[1440px] px-page-wide ${className}`}>
      <header className="flex flex-col items-center text-center">
        {icon && <InlineSvg svg={icon} className="mb-[28px] block h-[90px] w-[90px]" />}
        <SectionHeading solution max="w-full max-w-[690px] [text-wrap:balance]" mb={false}>{title}</SectionHeading>
        {description && <p className="mt-9 max-w-[576px] font-sans text-[16px] font-medium leading-[22.4px]">{description}</p>}
      </header>
      <div className="h-sp-xl" />
      <div className="mx-auto -mb-[1em] flex max-w-[1000px] flex-wrap justify-center lg:-mb-[1.4em]">
        {logos.map((l) => (
          <div key={l.name} className="flex h-[90px] basis-1/2 items-center justify-center p-[1.4em] min-[512px]:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <span role="img" aria-label={l.name} className="flex items-center justify-center" dangerouslySetInnerHTML={{ __html: l.svg }} />
          </div>
        ))}
      </div>
    </section>
  )
}
