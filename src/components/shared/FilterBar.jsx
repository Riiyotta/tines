/**
 * FilterBar parts. Implements specs/pages-c.md §2.4.
 *  SearchPill      what's-new: label flex gap 5, pad 0 12.8, h 36, bg rgb(141 117 230 / .08), r 160, icon 18 @ .7, input Roobert 16.
 *  PillDropdown    "Categories" / "RSS": pad 8.4 15.4, h 35, bg purple-65@5%, border purple-65@20%, r 990, Roobert 14; hover bg 10% / border 35%;
 *                  chevron 12px rotates when open. `options` renders a simple menu (details/summary) when given.
 *  SegmentedTabs   events: buttons pad 9.8 16.8, Roobert 600 14/16.1, h 38, joined with -1px margins; active bg purple-55 text lightest; inactive bg purple-5
 *                  border #c3b5ff text purple-80; optional trailing search segment (w 198, bg purple-2).
 *  JoinedSearchSelect  templates: grid `854px 274px` h 52 bg lightest border #c3b5ff; input r 160 0 0 160 pad 16 10 16 42; select r 0 160 160 0.
 *  SidebarSearch   library: 288x41 bg purple-5 border #d1c7ff r 990 pad 11.55 14 11.55 38.5; `variant="webinar"` 240x42 r 7.
 * FilterBar = a flex wrapper (gap 12) for the above. Colors use currentColor mixes so they adapt to the page theme.
 */
import InlineSvg from '../InlineSvg.jsx'
import searchIcon from '../../../reference/svg/pages/stories-whatsnew-search-icon.svg?raw'
import chevronIcon from '../../../reference/svg/pages/stories-whatsnew-chevron.svg?raw'
import eventsSearch from '../../../reference/svg/pages/events-search-icon.svg?raw'
import librarySearch from '../../../reference/svg/pages/library-search-icon.svg?raw'

export function FilterBar({ children, className = '' }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className}`}>{children}</div>
}

export function SearchPill({ placeholder = 'Search', value, onChange, className = '' }) {
  return (
    <label className={`flex h-9 items-center gap-[5px] rounded-[160px] bg-surface-search-pill px-[12.8px] ${className}`}>
      <InlineSvg svg={searchIcon} className="h-[18px] w-[18px] opacity-70" />
      <input value={value} onChange={onChange} placeholder={placeholder} aria-label={placeholder} className="min-w-0 flex-1 bg-transparent font-sans text-[16px] focus:outline-none" />
    </label>
  )
}

export function PillDropdown({ label, icon, options, className = '' }) {
  const base =
    'flex h-[35px] cursor-pointer list-none items-center gap-2 rounded-pill border border-[color-mix(in_srgb,currentColor_20%,transparent)] bg-[color-mix(in_srgb,currentColor_5%,transparent)] px-[15.4px] py-[8.4px] font-sans text-[14px] transition-colors hover:border-[color-mix(in_srgb,currentColor_35%,transparent)] hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)] [&::-webkit-details-marker]:hidden'
  const inner = (
    <>
      {icon && <InlineSvg svg={icon} className="h-[14px] w-[14px]" />}
      {label}
      {options && <InlineSvg svg={chevronIcon} className="h-3 w-3 transition-transform duration-150 group-open:rotate-180" />}
    </>
  )
  if (!options) return <button type="button" className={`${base} ${className}`}>{inner}</button>
  return (
    <details className={`group relative ${className}`}>
      <summary className={base}>{inner}</summary>
      <ul className="absolute left-0 top-full z-20 mt-1 min-w-[200px] rounded-usp bg-lightest p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        {options.map((o) => (
          <li key={o.label || o}>
            <a href={o.href || '#'} className="hover-tint block rounded-[8px] px-3 py-2 font-sans text-[14px] font-medium">{o.label || o}</a>
          </li>
        ))}
      </ul>
    </details>
  )
}

export function SegmentedTabs({ tabs = [], active, onSelect, search, onSearch, className = '' }) {
  return (
    <div role="tablist" className={`flex max-w-full overflow-x-auto ${className}`}>
      {tabs.map((t, i) => {
        const on = t.value === active
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            type="button"
            onClick={() => onSelect?.(t.value)}
            className={`-ml-px h-[38px] border px-[16.8px] py-[9.8px] font-sans text-nav font-semibold first:ml-0 first:rounded-l-[8px] ${!search && i === tabs.length - 1 ? 'rounded-r-[8px]' : ''} ${
              on ? 'z-[1] border-purple-55 bg-purple-55 text-lightest' : 'border-tint-lilac-line bg-purple-5 text-purple-80'
            }`}
          >
            {t.label}
          </button>
        )
      })}
      {search && (
        <label className="-ml-px flex h-[38px] w-[198px] items-center gap-2 rounded-r-[8px] border border-tint-lilac-line bg-purple-2 px-3">
          <InlineSvg svg={eventsSearch} className="h-[18px] w-[18px] opacity-60" />
          <input placeholder={search} aria-label={search} onChange={(e) => onSearch?.(e.target.value)} className="min-w-0 flex-1 bg-transparent font-sans text-nav font-medium focus:outline-none" />
        </label>
      )}
    </div>
  )
}

export function JoinedSearchSelect({ placeholder = 'Search', options = [], className = '' }) {
  return (
    <div className={`grid h-auto grid-cols-1 border border-tint-lilac-line bg-lightest md:h-[52px] md:grid-cols-[1fr_274px] md:rounded-pill ${className}`}>
      <label className="relative block md:rounded-l-[160px]">
        <InlineSvg svg={librarySearch} className="pointer-events-none absolute left-[18px] top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
        <input placeholder={placeholder} aria-label={placeholder} className="h-[52px] w-full bg-transparent py-4 pl-[42px] pr-[10px] font-sans text-[16px] focus:outline-none md:rounded-l-[160px]" />
      </label>
      <label className="relative block border-t border-tint-lilac-line md:border-l md:border-t-0">
        <select aria-label="Category" className="h-[52px] w-full appearance-none bg-transparent p-4 font-sans text-[16px] focus:outline-none md:rounded-r-[160px]">
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <InlineSvg svg={chevronIcon} className="pointer-events-none absolute right-4 top-1/2 h-[14px] w-[14px] -translate-y-1/2 opacity-60" />
      </label>
    </div>
  )
}

export function SidebarSearch({ placeholder = 'Find a story', variant = 'library', onChange, className = '' }) {
  if (variant === 'webinar') {
    return (
      <label className={`relative block h-[42px] w-full max-w-[240px] rounded-[7px] border-2 border-transparent bg-[rgb(234_223_248_/_0.4)] ${className}`}>
        <input placeholder={placeholder} aria-label={placeholder} onChange={(e) => onChange?.(e.target.value)} className="h-full w-full bg-transparent pl-[14px] pr-[35px] font-sans text-nav font-medium focus:outline-none" />
        <InlineSvg svg={librarySearch} className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
      </label>
    )
  }
  return (
    <label className={`relative block h-[41px] w-full max-w-[288px] rounded-pill border border-tint-lilac-line-2 bg-purple-5 ${className}`}>
      <InlineSvg svg={librarySearch} className="pointer-events-none absolute left-[14px] top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
      <input placeholder={placeholder} aria-label={placeholder} onChange={(e) => onChange?.(e.target.value)} className="h-full w-full bg-transparent py-[11.55px] pl-[38.5px] pr-[14px] font-sans text-[14px] focus:outline-none" />
    </label>
  )
}
