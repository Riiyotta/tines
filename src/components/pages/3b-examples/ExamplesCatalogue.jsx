/**
 * ExamplesCatalogue (specs/pages-a.md §3.2): sticky sidebar (title + search, function bookmarks, filter accordions) and a main column
 * with a featured row, a 3-column card grid, the example table and pagination. <768 the grid and table become a stacked list (phoneList).
 * Data is a local sample (data.jsx); bookmarks / search / "Works with" filter the table in-page.
 */
import { useMemo, useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import { PaginatedListNav } from '../../shared/PaginatedListNav.jsx'
import { Lattice, LATTICE_DEFS } from './Lattice.jsx'
import { BOOKMARKS, FILTERS, TONES, FN_TONE, FEATURED, CARDS, ROWS, TOTAL_PAGES, toolSrc, toolLabel } from './data.jsx'
import bm0 from '../../../../reference/svg/pages/3b-examples-bvqaqq-bookmarkicon.svg?raw'
import bm1 from '../../../../reference/svg/pages/3b-examples-bvqaqq-bookmarkicon-2.svg?raw'
import bm2 from '../../../../reference/svg/pages/3b-examples-bvqaqq-bookmarkicon-3.svg?raw'
import bm3 from '../../../../reference/svg/pages/3b-examples-bvqaqq-bookmarkicon-4.svg?raw'
import bm4 from '../../../../reference/svg/pages/3b-examples-bvqaqq-bookmarkicon-5.svg?raw'
import bm5 from '../../../../reference/svg/pages/3b-examples-bvqaqq-bookmarkicon-6.svg?raw'
import searchIcon from '../../../../reference/svg/pages/3b-examples-bvqaqq-searchicon.svg?raw'

const BM_ICONS = [bm0, bm1, bm2, bm3, bm4, bm5]
const PER_PAGE = 25

const ToolPill = ({ tools, size = 20, className = '', dark = false }) =>
  tools.length > 0 ? (
    <span className={`inline-flex items-center rounded-full ${className}`}>
      {tools.map((t) => (
        <img key={t} src={toolSrc(t)} alt={toolLabel(t)} className="block shrink-0 rounded-[4px] object-contain" style={{ width: size, height: size }} />
      ))}
    </span>
  ) : null

function FunctionPill({ fn }) {
  return <span className={`inline-block rounded-full px-[9px] py-[3px] font-sans text-[13px] font-medium leading-[14.95px] ${TONES[FN_TONE[fn]].fn}`}>{fn}</span>
}

function Sidebar({ query, setQuery, active, setActive, tools, setTools }) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  return (
    <aside className="flex flex-col gap-4 pb-0 lg:pb-5 lg:sticky lg:top-[88px] lg:-ml-[6px] lg:max-h-[calc(100vh-100px)] lg:self-start lg:overflow-y-auto lg:pl-[6px]">
      <div className="max-lg:contents">
        <div className="flex flex-col gap-3 rounded-t-[12px] border border-b-0 border-tint-lilac-line-2 bg-purple-5 p-[18px] max-lg:order-1 max-lg:rounded-none max-lg:border-0 max-lg:bg-transparent max-lg:p-0">
          <h1 className="m-0 font-sans text-[28px] font-semibold leading-[28px] tracking-[-0.56px]">
            <span className="block">Examples</span>
            <span className="block">Gallery</span>
          </h1>
          <p className="m-0 font-sans text-[14px] font-medium leading-[19.6px]">Real-world examples of what you can build with Tines 3B.</p>
        </div>
        <div className="flex items-center gap-2 max-lg:order-3">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-b-[12px] border border-t-0 border-tint-lilac-line-2 bg-purple-2 px-[18px] py-[10.5px] max-lg:rounded-full max-lg:border max-lg:bg-purple-5 max-lg:py-3">
          <InlineSvg svg={searchIcon} className="h-[17px] w-[17px] shrink-0 opacity-40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search examples…"
            aria-label="Search examples"
            className="min-w-0 flex-1 bg-transparent font-sans text-[14px] font-medium leading-[16.1px] text-purple-80 outline-none placeholder:text-purple-80"
          />
        </label>
        <button type="button" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen} className="shrink-0 rounded-pill bg-purple-5 px-[14px] py-3 font-sans text-[14px] font-semibold leading-[16.1px] lg:hidden">
          Filters
        </button>
        </div>
      </div>

      <nav aria-label="Functions" className="max-lg:order-2 -mx-[18px] overflow-x-auto px-[18px] lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="grid w-max grid-flow-col gap-2 lg:w-auto lg:grid-flow-row lg:grid-cols-[126px_126px]">
          {BOOKMARKS.map((b, i) => {
            const on = active === b.key
            const t = b.tone === 'all' ? null : TONES[b.tone]
            return (
              <button
                key={b.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(b.key)}
                className={`relative flex h-[133px] w-[100px] flex-col lg:h-[85px] lg:w-[126px] justify-between rounded-[12px] border px-3 py-[11px] text-left transition-[background-color,border-color] duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-50 ${
                  on ? 'border-purple-55 bg-purple-55 text-lightest hover:border-purple-60 hover:bg-purple-60' : `${t ? t.bm : 'border-purple-55 bg-purple-55 text-lightest'} hover:border-purple-40 hover:brightness-[.97]`
                }`}
              >
                <InlineSvg svg={BM_ICONS[i]} className="h-6 w-6" />
                <span className="absolute right-3 top-[11px] font-sans text-[13px] font-semibold leading-[14.95px]">{b.count}</span>
                <span className="font-sans text-[14px] font-semibold leading-[16.1px]">{b.key}</span>
              </button>
            )
          })}
        </div>
      </nav>

      <div className={`${filtersOpen ? 'flex' : 'hidden'} flex-col gap-2 lg:flex`}>
        {FILTERS.map((f) => (
          <details key={f.label} className="group rounded-[25px] border border-tint-lilac-line-2 open:rounded-[16px]">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-[14px] font-mono text-[12px] font-semibold uppercase leading-[20px] tracking-[0.36px] text-purple-80 [&::-webkit-details-marker]:hidden">
              {f.label}
              <span aria-hidden="true" className="h-0 w-0 border-x-[3px] border-t-[4px] border-x-transparent border-t-current transition-transform group-open:rotate-180" />
            </summary>
            <ul className="m-0 list-none px-2 pb-2">
              {f.options.map(([name, n]) => {
                const key = f.tools ? name : null
                return (
                  <li key={name}>
                    <label className="flex cursor-pointer items-center gap-2 rounded-[6px] px-2 py-[5px] hover:bg-purple-5">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={key ? tools.includes(key) : undefined}
                        onChange={key ? () => setTools((t) => (t.includes(key) ? t.filter((x) => x !== key) : [...t, key])) : undefined}
                      />
                      <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-[3px] border border-purple-65/65 transition-[background-color,border-color] duration-100 peer-checked:border-purple-55 peer-checked:bg-purple-55 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-purple-50" />
                      {key && <img src={toolSrc(key)} alt="" className="h-[18px] w-[18px] rounded-[3px] object-contain" />}
                      <span className="flex-1 font-sans text-[14px] leading-[16.1px]">{key ? toolLabel(key) : name}</span>
                      <span className="font-sans text-[13px] leading-[14.95px]">{n}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </details>
        ))}
      </div>
    </aside>
  )
}

function FeaturedCard({ c }) {
  return (
    <a
      href={c.href}
      className={`relative flex flex-col gap-6 md:min-h-[312px] overflow-hidden rounded-[16px] border-2 p-[18px] text-left transition-[border-color] duration-150 hover:border-[var(--secondaryFg55)] ${c.bg} ${c.ink}`}
      style={{ '--secondaryFg55': 'color-mix(in srgb, currentColor 55%, transparent)' }}
    >
      <Lattice />
      <span className="relative z-[1] inline-flex self-start rounded-full border border-lightest/30 bg-black/20 px-4 py-3 backdrop-blur-[8px] backdrop-saturate-[1.3] max-sm:px-3">
        <ToolPill tools={c.tools} size={33} className="gap-[14px]" />
      </span>
      <span className="relative z-[1] mt-auto flex flex-col gap-[6px]">
        <span className="font-mono text-[13px] font-medium leading-[14.95px]">{c.eyebrow}</span>
        <span className="font-sans text-[28px] font-medium leading-[30.8px] tracking-[-0.84px] sm:text-[34px] sm:leading-[37.4px] sm:tracking-[-1.02px]">{c.title}</span>
      </span>
    </a>
  )
}

const rowToCard = (r) => ({ eyebrow: r.fns.join(' & '), title: r.title, tools: r.tools, fn: ['HR', 'Security', 'RevOps', 'Finance'].find((k) => r.fns.includes(k)) || 'IT' })

function ExampleCard({ c, className = '' }) {
  const t = TONES[FN_TONE[c.fn]]
  return (
    <a href="/3b/examples/" className={`flex h-[180px] flex-col gap-7 md:h-[198.9px] rounded-[16px] border p-[18px] text-left transition-[border-color] duration-150 ${t.card} ${className}`}>
      {c.tools.length > 0 && <ToolPill tools={c.tools} size={22} className={`gap-[10px] self-start px-[14px] py-[9px] ${t.pill}`} />}
      <span className="mt-auto flex flex-col gap-[6px]">
        <span className="font-mono text-[13px] font-medium leading-[14.95px]">{c.eyebrow}</span>
        <span className="font-sans text-[20px] font-semibold leading-[24px] tracking-[-0.2px]">{c.title}</span>
      </span>
    </a>
  )
}

function ExampleTable({ rows }) {
  const th = 'pb-3 pt-0 pl-4 pr-4 text-left font-mono text-[12px] font-semibold uppercase leading-[13.8px] tracking-[0.36px] border-b border-tint-lilac-line'
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[698.5px] table-fixed border-collapse text-left">
      <colgroup><col /><col style={{ width: 148 }} /><col style={{ width: 198 }} /><col style={{ width: 203 }} /></colgroup>
      <thead>
        <tr><th className={th}>Example</th><th className={th}>Works with</th><th className={th}>Function</th><th className={th}>Author</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.title} className="group transition-colors duration-100 hover:bg-purple-2">
            <td className="border-b border-purple-10 px-4 py-3"><a href="/3b/examples/" className="font-sans text-[16px] font-semibold leading-[18.4px]">{r.title}</a></td>
            <td className="border-b border-purple-10 px-4 py-3"><ToolPill tools={r.tools} className="gap-[6px] bg-purple-5 px-[9px] py-[5px]" /></td>
            <td className="border-b border-purple-10 px-4 py-3"><span className="flex flex-wrap gap-1">{r.fns.map((f) => <FunctionPill key={f} fn={f} />)}</span></td>
            <td className="border-b border-purple-10 px-4 py-3 font-sans text-[14px] font-medium leading-[16.1px]">{r.author}</td>
          </tr>
        ))}
      </tbody>
    </table></div>
  )
}

function PhoneList({ rows }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {rows.map((r) => (
        <li key={r.title}>
          <a href="/3b/examples/" className="flex flex-col gap-3 rounded-[16px] border border-tint-lilac-line p-4">
            <span className="font-sans text-[16px] font-semibold leading-[18.4px]">{r.title}</span>
            <span className="flex flex-wrap items-center gap-2">
              {r.fns.map((f) => <FunctionPill key={f} fn={f} />)}
              <ToolPill tools={r.tools} className="gap-[6px] bg-purple-5 px-[9px] py-[5px]" />
            </span>
            <span className="font-sans text-[14px] font-medium leading-[16.1px] opacity-80">{r.author}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function ExamplesCatalogue() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('All')
  const [tools, setTools] = useState([])
  const [page, setPage] = useState(1)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rotate = (page - 1) % ROWS.length
    const base = ROWS.slice(rotate).concat(ROWS.slice(0, rotate))
    return base.filter(
      (r) => (active === 'All' || r.fns.includes(active)) && (!q || r.title.toLowerCase().includes(q)) && (!tools.length || tools.some((t) => r.tools.includes(t))),
    ).slice(0, PER_PAGE)
  }, [query, active, tools, page])

  return (
    <div className="mx-auto max-w-page px-4 pt-5 sm:px-page">
      <svg width="0" height="0" className="absolute" aria-hidden="true" dangerouslySetInnerHTML={{ __html: `<defs>${LATTICE_DEFS}</defs>` }} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10 max-md:gap-6">
        <Sidebar query={query} setQuery={setQuery} active={active} setActive={setActive} tools={tools} setTools={setTools} />
        <div className="flex min-w-0 flex-col gap-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {FEATURED.map((c) => <FeaturedCard key={c.title} c={c} />)}
          </div>
          <div className="flex flex-col gap-5 md:-mb-[18.9px] md:grid md:grid-cols-2 md:gap-5 2xl:grid-cols-3">
            {CARDS.map((c) => <ExampleCard key={c.title} c={c} />)}
            {/* phoneList: the first rows continue the stack on phones (12 per page) */}
            {ROWS.slice(0, 3).map((r) => <ExampleCard key={r.title} c={rowToCard(r)} className="md:hidden" />)}
          </div>
          <div className="max-md:hidden"><ExampleTable rows={rows} /></div>
          <PaginatedListNav page={page} total={TOTAL_PAGES} onPage={setPage} className="-mt-[18px] max-md:hidden" />
          <PaginatedListNav page={page} total={27} onPage={setPage} className="md:hidden" />
        </div>
      </div>
    </div>
  )
}
