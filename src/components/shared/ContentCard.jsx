/**
 * ContentCard (resource card). Implements specs/pages-a.md §13.5: grid, 1px border, r 8, overflow hidden, pad 20 (390: 14);
 * eyebrow Mono 700 10/12.5 ls .5 uppercase; title Reckless 400 22/24.2 -0.22 (mt 7.5); CTA line Roobert 700 14/17.5 (mt 7.5)
 * with a trailing arrow that nudges on hover (translate(3px); external: translate(1px,-1px) and ↗); figure mt 16 flex end.
 * Hover: brightness(.97).
 *
 * Props: eyebrow, title, cta, href, ext, tone ('purple'|'pink'|'orange'|'green'|'case-purple'|'case-green'),
 * hue / shade (pages-b2: accent-var colours v50|v500|v600|v800; with caseDecor the radius is 6 8 8 6), legacy (legacy inks: pink-65 / orange #9d3e00), icon (ReactNode, bottom-right figure), minH (px, e.g. 340 on soar),
 * body (pages-b: optional 14/17.5 line under the title), titleBleed (pages-b: title box 8.8px wider than the content box), compact (pages-b: <512 title Roobert 600 14/16.8, <640 CTA 600 12/15), caseDecor (pages-b: case-study left band + bookmark ribbon), className.
 */
const TONES = {
  purple: 'bg-purple-5 border-tint-lilac-line text-purple-65',
  pink: 'bg-tint-rose border-tint-rose-line text-pink-70',
  'pink-legacy': 'bg-tint-rose border-tint-rose-line text-pink-65',
  orange: 'bg-tint-peach border-tint-peach-line text-orange-70',
  'orange-legacy': 'bg-tint-peach border-tint-peach-line text-tint-orange-ink',
  green: 'bg-green-5 border-green-20 text-tint-green-ink',
  // solid case-study variants (soar): lightest text, r 6 8 8 6
  'case-purple': 'bg-purple-60 border-purple-40 text-lightest rounded-l-[6px] rounded-r-[8px]',
  'case-orange': 'bg-orange-50 border-orange-40 text-lightest rounded-l-[6px] rounded-r-[8px]', // pages-b (intercom case study)
  'case-green': 'bg-tint-green-book border-tint-green-line text-lightest rounded-l-[6px] rounded-r-[8px]',
}

// pages-b2 (specs/pages-b.md 3.4): `hue` switches to the accent-var scheme (data-color-theme) of the industry related-content grids.
// shade v50 (default): bg acc5, border acc20, text acc70, hover border acc40 | v500/v600/v800: bg acc50/60/80, border acc40, text lightest, hover border acc30.
const HUE_SHADES = {
  v50: 'bg-[var(--acc5)] border-[var(--acc20)] text-[var(--acc70)] hover:border-[var(--acc40)]',
  v500: 'bg-[var(--acc50)] border-[var(--acc40)] text-lightest hover:border-[var(--acc30)]',
  v600: 'bg-[var(--acc60)] border-[var(--acc40)] text-lightest hover:border-[var(--acc30)]',
  v800: 'bg-[var(--acc80)] border-[var(--acc40)] text-lightest hover:border-[var(--acc30)]',
}

export function ContentCard({ eyebrow, title, cta, href = '#', ext = false, tone = 'purple', legacy = false, icon, body, minH, caseDecor = false, titleBleed = false, compact = false, hue, shade = 'v50', className = '' }) {
  const key = legacy && TONES[`${tone}-legacy`] ? `${tone}-legacy` : tone
  const hued = !!hue
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-color-theme={hued ? hue : undefined}
      className={`group relative grid grid-cols-1 content-between overflow-hidden border p-[14px] sm:p-5 ${hued ? `transition-[border-color] duration-100 ${caseDecor ? 'rounded-l-[6px] rounded-r-[8px]' : 'rounded-[8px]'} ${HUE_SHADES[shade]}` : `rounded-[8px] transition-[filter] duration-100 hover:brightness-[.97] ${TONES[key]}`} ${className}`}
      style={minH ? { minHeight: minH } : undefined}
    >
      {caseDecor && (
        <>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[6px] top-0 hidden w-1 bg-black opacity-10 mix-blend-color-burn sm:block" />
          <span aria-hidden="true" className="pointer-events-none absolute right-5 top-0 hidden h-[44px] w-[28px] bg-black opacity-[.175] mix-blend-color-burn [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)] sm:block" />
        </>
      )}
      <div>
        {eyebrow && <strong className="block font-mono text-[10px] font-bold uppercase leading-[12.5px] tracking-[0.5px]">{eyebrow}</strong>}
        <h4 className={`font-serif text-card-serif font-normal mt-[7.5px] ${titleBleed ? 'min-[512px]:-mr-[.4em]' : ''} ${hued && caseDecor ? 'sm:pr-[1.3em]' : ''} ${compact ? 'max-[511px]:font-sans max-[511px]:text-[14px] max-[511px]:font-semibold max-[511px]:leading-[16.8px] max-[511px]:tracking-[-0.14px] max-[511px]:mt-1' : ''}`}>{title}</h4>
        {body && <p className="m-0 mt-[7.5px] font-sans text-[14px] font-medium leading-[17.5px]">{body}</p>}
        {cta && (
          <strong className={`mt-[7.5px] flex items-center gap-1 font-sans text-[14px] font-bold leading-[17.5px] ${compact ? 'max-sm:font-semibold max-sm:text-[12px] max-sm:leading-[15px]' : ''}`}>
            {cta}
            <span aria-hidden="true" className={`inline-block transition-transform duration-100 ${ext ? 'group-hover:translate-x-px group-hover:-translate-y-px' : 'group-hover:translate-x-[3px]'}`}>
              {ext ? '↗' : '→'}
            </span>
          </strong>
        )}
      </div>
      {icon && <div className="mt-4 flex items-end justify-end">{icon}</div>}
    </a>
  )
}
