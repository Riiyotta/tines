/**
 * University sub-nav (the Gatsby build's AreaNav). Same role as shared AreaNav but measured differently on the live page
 * (specs/pages-c.md §2.1 "University: Gatsby version, row padding 8px 0 20px"): header px 40, row `8px 0 20px` (65 tall, no top border),
 * pill 13px/600 r13 `rgb(234 223 248)` p 4/10, crumbs 13px/600 with 16px chevrons, right links "Your badges" / "Help" (13px/700, icon 20) + 1x16 divider + theme toggle 37px.
 * Props: crumbs [{ label, href }] shown after the pill.
 */
import InlineSvg from '../../InlineSvg.jsx'
import sun from '../../../../reference/svg/pages/stories-theme-sun.svg?raw'

const badge = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7.6" r="3.7"/><path d="M6.4 10.6 5 17.2l5-2.2 5 2.2-1.4-6.6"/></svg>`
const help = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7.2"/><circle cx="10" cy="10" r="3.3"/><path d="m5 5 2.7 2.7m4.6 4.6L15 15m0-10-2.7 2.7m-4.6 4.6L5 15"/></svg>`
const chevron = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".45"><path d="m6.5 4.5 3.5 3.5-3.5 3.5"/></svg>`

export default function UniversityNav({ crumbs = [] }) {
  return (
    <header className="mx-auto max-w-page px-page">
      <div className="flex items-center justify-between gap-[5px] pb-5 pt-2">
        <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-y-[3px]">
          <div className="mr-[5.2px] flex items-center">
            <a href="/university/" className="mr-[4.875px] inline-flex rounded-[13px] bg-[rgb(234_223_248)] px-[10px] py-1 font-sans text-[13px] font-semibold leading-[15px] text-purple-65">University</a>
            {crumbs.length > 0 && <InlineSvg svg={chevron} className="h-4 w-4" />}
          </div>
          {crumbs.map((c, i) => (
            <div key={c.label} className="mr-[5.2px] flex items-center max-sm:[&:nth-child(2)]:basis-full max-sm:[&:nth-child(2)]:order-3 sm:order-none">
              <a href={c.href} className="mr-[4.875px] font-sans text-[13px] font-semibold leading-[15px]">{c.label}</a>
              {i < crumbs.length - 1 && <InlineSvg svg={chevron} className="h-4 w-4" />}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://login.tines.com/" className="flex items-center gap-[6.5px] p-[6.5px] font-sans text-[13px]">
            <InlineSvg svg={badge} className="h-5 w-5" />
            <b className="font-bold leading-[15px] max-sm:hidden">Your badges</b>
          </a>
          <a href="https://www.tines.com/docs/" className="flex items-center gap-[6.5px] p-[6.5px] font-sans text-[13px]">
            <InlineSvg svg={help} className="h-5 w-5" />
            <b className="font-bold leading-[15px] max-sm:hidden">Help</b>
          </a>
          <hr className="my-2 ml-2 max-sm:hidden h-4 w-px border-0 bg-[color-mix(in_srgb,currentColor_20%,transparent)]" />
          <button type="button" aria-label="Toggle theme" className="flex h-[37px] w-[37px] items-center justify-center rounded-full p-[6.5px] transition-colors duration-150 hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]">
            <InlineSvg svg={sun} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
