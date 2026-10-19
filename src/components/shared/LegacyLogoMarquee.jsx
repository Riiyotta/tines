/**
 * LegacyLogoMarquee. Implements specs/pages-a.md §10.2 (enterprise: label + one strip, logos cells pad 16 0 mx 24, fill ink) and
 * §11.5 (soar: `rows={2}` in a bordered box, each logo span mr 32). Defaults to the homepage logo set when `logos` is not given.
 * Static render: the duplicated halves are laid out and the track carries data-motion="legacy-marquee-track" with
 * `--legacy-marquee-rows`; MOTION (Animation): the original is JS translateX drift at ~40px/s, leftward, both rows same direction.
 * Additive: cellClass (default 'mx-6 py-4'; soar uses 'mr-8' per spec), offsets (initial translateX per row, default [-107, -137]).
 * Props: label, logos (array of svg strings), rows (1|2), boxed (border 1px purple-20 r 14 pad 55 0), className.
 */
import InlineSvg from '../InlineSvg.jsx'
import { LOGOS } from './LogoSet.jsx'

const DEFAULT = LOGOS.map(([, svg]) => svg)

export function LegacyLogoMarquee({ label, logos = DEFAULT, rows = 1, boxed = false, cellClass = 'mx-6 py-4', offsets = [-107, -137], className = '' }) {
  const lines = rows === 2 ? [logos, [...logos.slice(Math.floor(logos.length / 2)), ...logos.slice(0, Math.floor(logos.length / 2))]] : [logos]
  return (
    <div className={`${boxed ? 'rounded-usp border border-tint-lilac-line py-[55px]' : ''} ${className}`}>
      {label && <p className="px-6 pb-6 text-center font-sans text-[11.5px] font-bold uppercase leading-[16.1px] tracking-[1.15px]">{label}</p>}
      <div className={`flex flex-col ${rows === 2 ? 'gap-8' : '-mt-4 py-4'}`}>
        {lines.map((row, r) => (
          <div key={r} className="marquee-mask overflow-hidden">
            <div data-motion="legacy-marquee-track" className="flex w-max items-center" style={{ transform: `translateX(${offsets[r] ?? offsets[0]}px)` }}>
              {[...row, ...row].map((svg, i) => (
                <span key={i} className={`${cellClass} flex shrink-0 items-center [&>svg]:block [&>svg]:h-auto [&>svg]:max-h-9 [&>svg]:w-auto`} aria-hidden={i >= row.length || undefined} dangerouslySetInnerHTML={{ __html: svg }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
