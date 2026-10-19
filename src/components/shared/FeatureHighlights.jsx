/**
 * FeatureHighlights (+ card). Implements specs/pages-b.md 4.10.
 *  variant 'compact' (public-sector): centered header (150px section icon, h2, description max 600, pb sp-xl) then a 1/2/3-col grid.
 *  variant 'grid' (mssps): the h2 + optional outlined button is grid cell 1, followed by the cards; rows 1fr.
 * Card: bg purple-5, 1px purple-30, r --radius, grid rows (1fr auto) gap 24, max 386 (centered <640), header pad 24
 * (h3 Roobert 600 22/25.3 >=1024, 20/23; link 600 16 mt .5em hover underline), image box h 294 (250 at 640-1279), img h100% bottom centered.
 * Props: variant, icon (raw svg string), title, description, button {label, href}, cards [{ title, link: {label, href}, img }], className.
 */
import InlineSvg from '../InlineSvg.jsx'
import { SectionHeading } from './SectionHeading.jsx'

export function FeatureHighlightCard({ title, link, img }) {
  return (
    <div className="mx-auto grid w-full max-w-[386px] grid-rows-[minmax(auto,1fr)_auto] gap-4 overflow-hidden sm:gap-6 rounded-card border border-purple-30 bg-purple-5 max-sm:mx-auto sm:mx-0">
      <div className="p-4 sm:p-6">
        <h3 className="max-sm:mt-[10px] font-sans text-[20px] font-semibold leading-[23px] xl:text-[22px] xl:leading-[25.3px]">{title}</h3>
        {link && (
          <a href={link.href} className="mt-[.5em] inline-block font-sans text-[16px] font-semibold leading-[22.4px] underline-offset-[.15em] hover:underline">
            {link.label} →
          </a>
        )}
      </div>
      <div className="relative h-[294px] sm:max-2xl:h-[250px]">
        <img src={img} alt="" className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2" />
      </div>
    </div>
  )
}

export function FeatureHighlights({ variant = 'compact', icon, title, description, button, cards = [], className = '' }) {
  const grid = variant === 'grid'
  return (
    <section className={`mx-auto w-full max-w-[1440px] px-page-wide ${className}`}>
      {!grid && (
        <header className="flex flex-col items-center pb-sp-xl text-center">
          {icon && <InlineSvg svg={icon} className="mb-1 block h-[150px] w-[150px]" />}
          <SectionHeading solution mb={false}>{title}</SectionHeading>
          {description && <p className="mt-6 max-w-[600px] font-sans text-[16px] font-medium leading-[22.4px]">{description}</p>}
        </header>
      )}
      <div className={`grid grid-cols-1 gap-sp-gap sm:grid-cols-2 lg:grid-cols-3 ${grid ? 'sm:auto-rows-fr' : ''}`}>
        {grid && (
          <div className="max-sm:text-center">
            <SectionHeading solution align="left" mb={false} className="max-sm:!text-center">{title}</SectionHeading>
            {button && <a href={button.href} className="btn btn-outlined mt-6">{button.label}</a>}
          </div>
        )}
        {cards.map((c) => (
          <FeatureHighlightCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  )
}
