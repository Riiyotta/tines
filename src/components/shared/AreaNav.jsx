/**
 * AreaNav: the 62px sub-nav bar under the main Navbar. Implements specs/pages-a.md §2.1 and specs/pages-c.md §2.1.
 *
 * Props
 *   pill        { label, href, static? }   left pill (section name); `static` renders a non-link span without hover (pages-b2)
 *   pillTone    'purple-10' | 'purple-5'   pill bg: purple-10 on /3b/, purple-5 on lightest-bg pages (default 'purple-5')
 *   crumbs      [{ label, href? }]         "› Examples" style crumbs (current crumb coloured --pageAccent)
 *   links       [{ label, href, ext?, caret?, active?, activeClass? }]  right-hand section links (`active` = accent colour, `caret` = dropdown trigger)
 *   collapseLabel / collapseAt  (pages-b) current-section label for the collapsed "> Label v" dropdown; collapseAt 'xl' (default, <1024) or 'md' (<768)
 *   cta         { label, href }            mono pill ("Get started", "TRY TINES STORIES"); ctaTone same options as pillTone
 *   showThemeToggle  30x30 round sun toggle before the CTA
 *   backdrop    library / Tines Stories pages: lightest@.9 layer behind the bar, r 0 0 31 31, max 1476, inset 22
 * Bar: max 1520, px 40 (390: 18), inner gap 10, py 15.45, border-top 1px currentColor@12%, relative z-200, not sticky.
 * <768 the links collapse into a "More" <details> dropdown; pill + CTA remain.
 */
import InlineSvg from '../InlineSvg.jsx'
import sun from '../../../reference/svg/pages/stories-theme-sun.svg?raw'

const TONE = {
  'purple-5': 'bg-purple-5 hover:bg-purple-10',
  'purple-10': 'bg-purple-10',
}

function NavLink({ link }) {
  const { label, href, ext, caret, active } = link
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`hover-tint inline-flex items-center gap-1 whitespace-nowrap rounded-nav-item px-3 py-[6px] font-sans text-nav font-semibold ${active ? (link.activeClass || 'text-accent') : ''}`}
    >
      {label}
      {ext && <span aria-hidden="true" className="inline-block translate-x-[-1.6px] translate-y-[-4.6px] text-[10.92px] opacity-60">↗</span>}
      {caret && <span className="nav-caret ml-[2px]" aria-hidden="true" />}
    </a>
  )
}

export function AreaNav({ pill, pillTone = 'purple-5', crumbs = [], links = [], cta, ctaTone, showThemeToggle = false, backdrop = false, collapseLabel, collapseAt = 'xl', className = '' }) {
  // collapseLabel (pages-b section 1): below 1024 the crumb + section links collapse into "> {collapseLabel} v" with a dropdown.
  const xl = !!collapseLabel
  // collapseAt 'md' (pages-b2, /security/): the collapsed crumb dropdown applies below 768 instead of below 1024.
  const BP = collapseAt === 'md' ? { hide: 'md:hidden', crumb: 'max-md:hidden', mr: 'md:-mr-3', flex: 'md:flex' } : { hide: 'xl:hidden', crumb: 'max-xl:hidden', mr: 'xl:-mr-3', flex: 'xl:flex' }
  const tone = TONE[ctaTone || pillTone]
  return (
    <div className={`relative z-[200] ${className}`}>
      {backdrop && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[22px] top-0 -z-10 mx-auto h-full max-w-[1476px] rounded-b-[31px] bg-lightest/90" />
      )}
      <div className="mx-auto max-w-page px-page">
        <div className={`flex items-center gap-[10px] border-t border-[color-mix(in_srgb,currentColor_12%,transparent)] py-[15.45px] ${xl ? 'min-h-[62px]' : ''}`}>
          {pill.static ? (
            <span className={`inline-flex items-center rounded-pill px-[12.6px] py-[4.2px] font-sans text-nav font-semibold text-purple-60 ${TONE[pillTone].split(' ')[0]}`}>{pill.label}</span>
          ) : (
          <a
            href={pill.href}
            className={`inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-pill px-[12.6px] py-[4.2px] font-sans text-nav font-semibold text-purple-60 ${TONE[pillTone]}`}
          >
            {pill.label}
          </a>
          )}
          {xl && (
            <details className={`group relative ml-[2.5px] ${BP.hide}`}>
              <summary className="flex cursor-pointer list-none items-center gap-[12.5px] font-sans text-nav font-semibold text-accent [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="inline-block h-0 w-0 border-y-[3px] border-l-[4px] border-y-transparent border-l-current text-page-fg opacity-40" />
                <span className="flex items-center gap-1">{collapseLabel} <span className="nav-caret" aria-hidden="true" /></span>
              </summary>
              <div className="absolute left-0 top-full z-10 mt-1 flex min-w-[180px] animate-[areaDropdownIn_.3s_cubic-bezier(.22,1,.36,1)] flex-col rounded-[10px] border border-[color-mix(in_srgb,currentColor_12%,transparent)] bg-lightest p-[6px]">
                {links.map((l) => (
                  <a key={l.label} href={l.href} className={`hover-tint rounded-[6px] px-2 py-[9px] font-sans text-[14px] font-semibold ${l.active ? 'text-accent' : ''}`}>{l.label}</a>
                ))}
              </div>
            </details>
          )}
          {crumbs.map((c, i) => (
            <span key={c.label} className={`${xl ? BP.crumb : ''} flex items-center gap-[12.5px] ${i === 0 ? 'ml-[2.5px]' : ''}`}>
              <span aria-hidden="true" className="inline-block h-0 w-0 border-y-[3px] border-l-[4px] border-y-transparent border-l-current opacity-40" />
              {c.href ? (
                <a href={c.href} className="font-sans text-nav font-semibold text-accent">{c.label}</a>
              ) : (
                <span className="font-sans text-nav font-semibold text-accent">{c.label}</span>
              )}
            </span>
          ))}

          <nav aria-label="Section" className={`ml-auto flex items-center ${showThemeToggle ? "" : "py-px"} ${xl ? BP.mr : 'gap-[6px]'}`}>
            <div className={`hidden items-center ${xl ? BP.flex : 'gap-[6px] md:flex'}`}>
              {links.map((l) => (
                <NavLink key={l.label} link={l} />
              ))}
            </div>
            {links.length > 0 && !xl && (
              <details className="group relative md:hidden">
                <summary className="hover-tint flex cursor-pointer list-none items-center gap-1 rounded-nav-item px-3 py-[6px] font-sans text-nav font-semibold [&::-webkit-details-marker]:hidden">
                  More <span className="nav-caret" aria-hidden="true" />
                </summary>
                <div className="absolute right-0 top-full z-10 mt-1 flex min-w-[180px] flex-col rounded-dd-chip bg-lightest p-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  {links.map((l) => (
                    <NavLink key={l.label} link={l} />
                  ))}
                </div>
              </details>
            )}
            {showThemeToggle && (
              <button
                type="button"
                aria-label="Toggle theme"
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors duration-150 hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]"
              >
                <InlineSvg svg={sun} className="h-[18px] w-[18px]" />
              </button>
            )}
            {cta && (
              <a
                href={cta.href}
                className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-pill px-4 py-[7px] font-mono text-[12px] font-bold uppercase leading-[13.8px] text-purple-60 ${tone}`}
              >
                {cta.label}
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
