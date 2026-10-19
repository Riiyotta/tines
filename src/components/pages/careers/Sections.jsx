// Page-specific sections for /careers/ (specs/pages-a.md §12). Generic pieces come from shared/.
import { useMemo, useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import { LegacyButton } from '../../shared/index.js'
import { HERO_DECOS, STATS, TILES, AWARDS, BENEFITS, JOBS, TEAMS, LOCATIONS, svg, asset } from './data.js'
import searchIcon from '../../../../reference/svg/pages/careers-open-positions.svg?raw'

/* §12.1 */
// <md: six stickers placed by hand ([svg index in HERO_DECOS, left px, top px]); >=md: the 12 stickers at x/1440 of the hero width.
const HERO_MOBILE = [[5, 118, 0], [4, 48, 160], [6, 262, 124], [1, 52, 280], [7, 306, 304], [0, 44, 452], [11, 338, 458]]
export function CareersHero() {
  return (
    <header className="relative h-[580px] overflow-hidden text-center md:h-[573px] xl:h-[664px] 2xl:h-[694px] [background-image:radial-gradient(theme(colors.purple.10)_1.2px,transparent_1.6px)] [background-size:48px_48px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-full max-w-[1440px] md:block">
        {HERO_DECOS.map((d, i) => (
          <InlineSvg key={i} svg={d.svg} className="absolute h-auto" style={{ left: `${(d.x / 14.4).toFixed(3)}%`, top: d.y, width: d.w }} />
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 md:hidden">
        {HERO_MOBILE.map(([k, x, y]) => <InlineSvg key={k} svg={HERO_DECOS[k].svg} className="absolute h-auto w-[59px]" style={{ left: x, top: y }} />)}
      </div>
      <div className="relative mx-auto flex flex-col items-center px-4 pt-[90px] xl:pt-[81px] 2xl:pt-[109px]">
        <p className="font-mono text-[12px] font-bold uppercase leading-[16.8px] tracking-[0.6px] text-purple-70">Careers at tines</p>
        <h1 className="mt-[22px] font-serif text-[68px] font-semibold leading-[55.76px] tracking-[-0.68px] text-purple-50 md:text-[80px] md:leading-[65.6px] md:tracking-[-0.8px] xl:text-[115px] xl:leading-[94.3px] xl:tracking-[-1.15px]">
          Join<br />our<br />t<span className="text-tint-green-book">e</span><span className="text-pink-50">a</span><span className="text-orange-50">m</span>
        </h1>
        <p className="mt-8 max-w-[352px] font-sans text-[16px] font-medium leading-[22.4px] md:mt-[34px]">We hire diverse, ambitious and smart people, and we give them the room, trust and support to do their very best work every day.</p>
        <a href="#open-positions" className="mt-8 inline-flex h-9 w-[200px] items-center justify-center rounded-full bg-purple-40 font-mono text-[13px] font-bold uppercase leading-[13px] tracking-[0.26px] text-white transition-[filter] duration-100 hover:brightness-110">See open positions</a>
      </div>
    </header>
  )
}

/* §12.2 lite YouTube embed: poster image until clicked, then the iframe loads (autoplay) */
export function VideoPoster() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-[1128/635] w-full overflow-hidden rounded-[24px] bg-purple-90">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src="https://www.youtube.com/embed/7ft61ij9CQ0?autoplay=1&rel=0"
          title="Meet the team at Tines"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label="Play: Meet the team at Tines" className="group absolute inset-0 block h-full w-full cursor-pointer border-0 bg-transparent p-0">
          <img src={asset('team-video-poster.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[84px] bg-gradient-to-b from-black/60 to-transparent" />
          <span className="absolute left-[30px] top-5 flex items-center gap-3 text-left text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><ellipse cx="10" cy="10" rx="6.5" ry="7" /><path d="M3.5 8.5h13M3.5 11.5h13" /></svg>
            </span>
            <span className="flex flex-col"><span className="font-sans text-[18px] font-semibold leading-[22px]">Meet the team at Tines</span><span className="font-sans text-[12px] font-medium leading-[14px] opacity-80">Tines</span></span>
          </span>
          <span className="absolute left-1/2 top-1/2 flex h-[48px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[14px] bg-red-50 transition-transform duration-100 group-hover:scale-105">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" className="text-white" aria-hidden="true"><path d="M2 1.5v19l16-9.5z" /></svg>
          </span>
        </button>
      )}
    </div>
  )
}

/* §12.3 */
export function StatsStrip() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-page-wide">
      <ul className="m-0 grid list-none grid-cols-1 gap-[26px] px-[10px] py-[44px] md:px-5 2xl:grid-cols-3 2xl:px-[60px]">
        {STATS.map((s) => (
          <li key={s.strong} className={`flex items-center gap-[22px] font-sans text-[16px] font-medium leading-[19.2px] 2xl:text-[18px] 2xl:leading-[21.6px] ${s.ink}`}>
            <InlineSvg svg={s.icon} className="h-[95px] w-[95px] shrink-0" />
            <p>{s.lead}<strong className="font-bold">{s.strong}</strong></p>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* §12.4 */
function Tile({ t }) {
  return (
    <div
      className={`absolute rounded-usp border-2 py-4 pl-6 pr-8 pb-6 ${t.border} ${t.ink || ''}`}
      style={{ left: t.x, top: t.y, width: t.size, height: t.size }}
      data-parallax={t.par}
    >
      {t.name && <h3 className={`font-serif font-normal ${t.big ? 'text-[58px] leading-[58px] tracking-[-2.32px]' : 'text-[42px] leading-[42px] tracking-[-1.68px]'}`}>{t.name}</h3>}
      {t.sub && <p className="mt-1 font-sans text-[14px] font-medium leading-[16px]">{t.sub}</p>}
      {t.icon && <InlineSvg svg={t.icon} className="absolute bottom-6 right-6 h-auto" style={{ width: t.iw }} />}
      {t.img && <img src={t.img} alt="" className="absolute bottom-6 right-6 h-auto" style={{ width: t.iw }} />}
    </div>
  )
}
// Mid widths (md..<2xl): three 280px tiles in a 3-col grid + five hand-placed small tiles; <md: a 2-col stack.
const MID = [
  { y: 62, par: '4,-9' }, { y: 120, par: '-11,24' }, { y: 20, par: '10,-14' },
]
const MID_SMALL = [
  { left: '-100px', top: 428, size: 120, border: 'border-purple-40', par: '-14,16' },
  { left: 'calc(33.333% - 196px)', top: 396, size: 180, name: 'SF Hub', border: 'border-lgc-orange-line-dk', ink: 'text-lgc-orange-line-dk', par: '12,-16' },
  { left: 'calc((100% - 48px) / 3 + 24px)', top: 428, size: 120, border: 'border-lgc-lime-line', par: '-9,12' },
  { left: 'calc((100% - 48px) / 3 * 2 + 48px)', top: 364, size: 180, name: 'Australia', border: 'border-lgc-blue-line', ink: 'text-pga-green-link', par: '-18,10' },
  { left: '93%', top: 424, size: 180, border: 'border-lgc-teal-line', par: '14,-21' },
]
export function WhereWeWork() {
  const big = TILES.filter((t) => t.big)
  const small = TILES.filter((t) => t.name && !t.big)
  return (
    <section className="mx-auto w-full max-w-page overflow-hidden px-page pb-0">
      <h2 className="text-center font-serif text-section-h2-sm font-normal text-purple-60 md:text-[38px] md:leading-[39.9px] lg:text-section-h2">Where we work</h2>
      {/* >=1280: the free-floating tile field with scroll parallax */}
      <div className="relative mx-auto mt-0 hidden h-[838px] w-[1440px] max-w-none 2xl:block" style={{ marginLeft: 'calc(50% - 720px - var(--page-margin) + var(--page-margin))' }}>
        {TILES.map((t, i) => <Tile key={i} t={t} />)}
      </div>
      {/* 768-1279: scaled field */}
      <div className="relative mt-10 mb-20 hidden h-[524px] grid-cols-3 gap-6 md:grid xl:mb-[85px] 2xl:hidden">
        {big.map((t, i) => (
          <div key={t.name} data-parallax={MID[i].par} className={`relative h-[280px] rounded-usp border-2 px-6 pt-4 ${t.border} ${t.ink}`} style={{ marginTop: MID[i].y }}>
            <h3 className="font-serif text-[48px] font-normal leading-[48px] tracking-[-1.92px]">{t.name}</h3>
            <p className="mt-1 font-sans text-[14px] font-medium leading-[16px]">{t.sub}</p>
            {t.icon && <InlineSvg svg={t.icon} className="absolute bottom-6 right-6 h-auto" style={{ width: t.iw }} />}
            {t.img && <img src={t.img} alt="" className="absolute bottom-6 right-6 h-auto" style={{ width: t.iw }} />}
          </div>
        ))}
        {MID_SMALL.map((t, i) => (
          <div key={i} data-parallax={t.par} className={`absolute rounded-usp border-2 px-6 pt-4 ${t.border} ${t.ink || ''}`} style={{ left: t.left, top: t.top, width: t.size, height: t.size }}>
            {t.name && <h3 className="font-serif text-[28px] font-normal leading-[28px] tracking-[-1.12px]">{t.name}</h3>}
          </div>
        ))}
      </div>
      {/* <768: stacked */}
      <ul className="m-0 mb-24 grid list-none grid-cols-2 gap-4 p-0 py-10 md:hidden">
        {big.map((t) => (
          <li key={t.name} className={`relative col-span-2 h-[280px] rounded-usp border-2 px-7 pt-7 ${t.border} ${t.ink}`}>
            <h3 className="font-serif text-[28px] font-normal leading-[28px] tracking-[-1.12px]">{t.name}</h3>
            {t.sub && <p className="mt-1 font-sans text-[14px] font-medium leading-[16px]">{t.sub}</p>}
            {t.icon && <InlineSvg svg={t.icon} className="absolute bottom-6 right-6 h-auto" style={{ width: t.iw }} />}
            {t.img && <img src={t.img} alt="" className="absolute bottom-6 right-6 h-auto" style={{ width: t.iw }} />}
          </li>
        ))}
        {small.map((t) => (
          <li key={t.name} className={`h-[140px] rounded-usp border-2 px-7 pt-7 ${t.border} ${t.ink}`}>
            <h3 className="font-serif text-[22px] font-normal leading-[22px] tracking-[-0.88px]">{t.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* §12.7 */
export function Awards() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-page-wide">
      <h2 className="text-center font-serif text-section-h2-sm font-normal md:text-[38px] md:leading-[39.9px] lg:text-section-h2">Awards</h2>
      <ul className="m-0 mx-auto mt-16 flex max-w-[1000px] list-none flex-col items-center justify-between gap-[45px] p-0 md:mt-24 md:flex-row md:items-start md:gap-[45px] 2xl:gap-16 xl:mt-[96px]">
        {AWARDS.map((a) => (
          <li key={a.source} className="flex flex-col items-center text-center md:flex-1">
            <img src={a.img} alt={`${a.source}: ${a.title} ${a.year}`} width="576" height="292" className="h-auto w-full md:max-w-[288px]" />
            <p className="mt-[53px] font-sans text-[14px] font-semibold leading-[17px]">{a.source}</p>
            <h3 className="mt-3 font-serif text-[24px] font-normal leading-[33.6px] tracking-[-0.48px]">{a.title}</h3>
            <p className="mt-1 font-sans text-[14px] font-semibold leading-[17px]">{a.year}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* §12.8 */
export function Benefits() {
  return (
    <section className="relative mx-auto w-full max-w-[1360px] px-page">
      <div className="relative rounded-[24px] border border-green-30 px-6 py-12 md:p-[72px]">
        <img src={asset('StateOfSecurity-9bf305afa71e9231fd8e9e6ef9631c0d.svg')} alt="" className="pointer-events-none absolute -top-[74px] right-6 hidden h-[287px] w-[290px] md:block xl:right-[72px]" />
        <h2 className="font-serif text-section-h2-sm font-normal md:text-[38px] md:leading-[39.9px] lg:text-section-h2">Benefits</h2>
        <p className="mt-7 max-w-[460px] font-sans text-[16px] font-medium leading-[22.4px]">We believe great work starts with a great environment, so we offer a benefits package designed to support your well-being.</p>
        <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-6 gap-y-12 p-0 sm:grid-cols-2 xl:mt-[89px] xl:grid-cols-4">
          {BENEFITS.map(([t, d]) => (
            <li key={t} className="flex flex-col gap-2">
              <h3 className="font-sans text-[16px] font-bold leading-[17px]">{t}</h3>
              <p className="max-w-[230px] font-sans text-[16px] font-medium leading-[22.4px] opacity-80">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-sans text-[16px] font-normal italic">* Benefits listed above are for permanent roles</p>
      </div>
    </section>
  )
}

/* §12.9 */
const sel = 'h-[42px] w-full appearance-none bg-transparent px-[14px] font-sans text-[14px] font-medium focus:bg-purple-2 focus:outline-none'
export function OpenPositions() {
  const [q, setQ] = useState('')
  const [team, setTeam] = useState('')
  const [loc, setLoc] = useState('')
  const rows = useMemo(
    () => JOBS.filter((j) => (!team || j.team === team) && (!loc || j.location.includes(loc)) && (!q || `${j.role} ${j.team}`.toLowerCase().includes(q.toLowerCase()))),
    [q, team, loc],
  )
  return (
    <section id="open-positions" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-page-wide">
      <div className="flex items-start justify-between">
        <h2 className="font-serif text-section-h2-sm font-normal md:text-[38px] md:leading-[39.9px] lg:text-section-h2">Open positions</h2>
        <img src={asset('Drums-9bf8ea7d630732caee4a9f35e6303154.svg')} alt="" className="hidden h-[143px] w-[182px] md:block" />
      </div>
      <form onSubmit={(e) => e.preventDefault()} role="search" className="-mt-[60px] md:-mt-[40px]">
        <fieldset className="m-0 grid max-w-[744px] grid-cols-1 divide-purple-20 rounded-[6px] border border-tint-lilac-line p-0 md:grid-cols-3 md:divide-x">
          <legend className="sr-only">Filter open positions</legend>
          <div className="relative">
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search positions" className={`${sel} placeholder:text-purple-65/60`} />
            <InlineSvg svg={searchIcon} className="pointer-events-none absolute right-[14px] top-[15px] h-3 w-3" />
          </div>
          <div className="relative border-t border-tint-lilac-line md:border-t-0">
            <select value={team} onChange={(e) => setTeam(e.target.value)} aria-label="Team" className={sel}>
              <option value="">All teams</option>
              {TEAMS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <Chevron />
          </div>
          <div className="relative border-t border-tint-lilac-line md:border-t-0">
            <select value={loc} onChange={(e) => setLoc(e.target.value)} aria-label="Location" className={sel}>
              <option value="">All locations</option>
              {LOCATIONS.map((t) => <option key={t}>{t}</option>)}
            </select>
            <Chevron />
          </div>
        </fieldset>
      </form>
      <p className="mt-[26px] font-sans text-[14px] font-medium leading-[16.8px] tracking-[-0.28px] text-purple-60" aria-live="polite">Showing {rows.length} open positions</p>
      <table className="mt-[40px] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-green-30">
            <th className="w-[35%] py-5 font-sans text-[16px] font-bold xl:w-[27.5%]">Team</th>
            <th className="py-5 font-sans text-[16px] font-bold xl:w-[45%]">Role</th>
            <th className="py-5 font-sans text-[16px] font-bold max-xl:hidden">Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((j, i) => {
            const first = i === 0 || rows[i - 1].team !== j.team
            return (
              <tr key={j.id} className="group relative">
                <td className={`py-6 pr-6 align-top font-sans text-[16px] font-medium leading-[19.2px] tracking-[-0.32px] ${first ? 'border-t border-green-20' : ''}`}>{first ? j.team : ''}</td>
                <td className={`border-t py-6 pr-6 align-top ${first ? 'border-green-20' : 'border-green-20/60'}`}>
                  <a href={`/careers/jobs/${j.id}/`} className="block font-sans text-[16px] font-semibold leading-[17px] group-hover:underline xl:font-serif xl:text-[22px] xl:font-normal xl:leading-[22px] xl:tracking-[-0.44px]">{j.role}</a>
                  <span className="mt-1 block font-sans text-[16px] font-normal leading-[17px] xl:hidden">{j.location}</span>
                </td>
                <td className={`border-t py-6 pr-6 align-top font-sans text-[16px] font-medium leading-[19.2px] max-xl:hidden ${first ? 'border-green-20' : 'border-green-20/60'}`}>{j.location}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {rows.length === 0 && <p className="py-10 font-sans text-[16px] font-medium">No open positions match your filters.</p>}
    </section>
  )
}
const Chevron = () => (
  <svg aria-hidden="true" width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1.5" className="pointer-events-none absolute right-4 top-[17px]"><path d="M1 1l4 4 4-4" /></svg>
)

/* §12.10 */
export function Inclusion() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-page-wide">
      <div className="rounded-usp border border-tint-lilac-line bg-purple-5 px-6 pb-8 pt-12 md:px-[72px] md:pb-[38px] md:pt-[72px]">
        <h3 className="font-mono text-[12.5px] font-bold uppercase leading-[15px] tracking-[0.62px]">Inclusion matters</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <p className="font-sans text-[16px] font-medium leading-[22.4px]">We are committed to building a diverse, inclusive workplace where everyone belongs. We are an equal opportunity employer and do not discriminate on the basis of any protected characteristic in the places where we hire.</p>
          <p className="max-w-[280px] font-sans text-[16px] font-medium leading-[22.4px]">If you need accommodations or extra support during the application or interview process, we are here to help. Just let your recruiter know.</p>
          <img src={asset('Partnership-fc9328d48ba4dafe17c0d761295cee9d.svg')} alt="" className="h-[276px] w-[278px] justify-self-center md:justify-self-end" />
        </div>
      </div>
    </section>
  )
}
export { svg, LegacyButton }
