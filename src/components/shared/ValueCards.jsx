/**
 * ValueCards (Simplicity / Speed / Soundness). Implements specs/pages-a.md §6.5 (about) and §12.5 (careers).
 *  about:   grid 360x3 gap 24; card pad 55 (390: 24), gap 40, r 14; body first (Roobert 500 16/24) then header row
 *           (flex space-between align end): H3 Reckless 28/32.2 -0.28 + icon. Colours green-10/#00452a, rose-mid/pink-80, peach-mid/orange-80.
 *  careers: card pad 32 28.8 28.8, r 14, gap 12.8; icon first; H3 Reckless 42 -1.26; body Roobert 500 16/19.2.
 *           Colours purple-5/purple-70, peach/orange-70, green-5/#005d35.
 * Props: variant, (items[].iconW overrides the about icon width in px), items ([{ title, body, icon (svg string) }]; defaults provided with short ORIGINAL placeholder copy), className.
 */
import InlineSvg from '../InlineSvg.jsx'
import aboutIcon1 from '../../../reference/svg/pages/about-g1t3uw-cardheader.svg?raw'
import aboutIcon2 from '../../../reference/svg/pages/about-g1t3uw-cardheader-2.svg?raw'
import aboutIcon3 from '../../../reference/svg/pages/about-g1t3uw-cardheader-3.svg?raw'
import careersIcon1 from '../../../reference/svg/pages/careers-dataimg-simplicity.svg?raw'
import careersIcon2 from '../../../reference/svg/pages/careers-dataimg-simplicity-2.svg?raw'
import careersIcon3 from '../../../reference/svg/pages/careers-dataimg-simplicity-3.svg?raw'

const BODY = [
  'We cut through complexity so people can get real work done, with tools that are easy to learn and easy to trust.',
  'We move quickly, ship often and learn from what customers tell us, without losing sight of quality.',
  'We build things that last: secure by default, dependable under load and honest about their limits.',
]
const TITLES = ['Simplicity', 'Speed', 'Soundness']
const ICONS = { about: [aboutIcon1, aboutIcon2, aboutIcon3], careers: [careersIcon1, careersIcon2, careersIcon3] }
const COLORS = {
  about: ['bg-green-10 text-tint-green-ink-xdk', 'bg-tint-rose-mid text-pink-80', 'bg-tint-peach-mid text-orange-80'],
  careers: ['bg-purple-5 text-purple-70', 'bg-tint-peach text-orange-70', 'bg-green-5 text-tint-green-ink-dk'],
}

export function ValueCards({ variant = 'about', items, className = '' }) {
  const data = items || TITLES.map((title, i) => ({ title, body: BODY[i], icon: ICONS[variant][i] }))
  return (
    <ul className={`m-0 grid list-none grid-cols-1 gap-4 p-0 md:gap-6 ${variant === 'careers' ? 'xl:grid-cols-3' : 'md:grid-cols-3'} ${className}`}>
      {data.map((it, i) =>
        variant === 'about' ? (
          <li key={it.title} className={`grid content-between gap-6 rounded-[12px] p-6 sm:gap-10 sm:rounded-usp sm:p-[55px] ${COLORS.about[i]}`}>
            <p className="font-sans text-[16px] font-medium leading-6">{it.body}</p>
            <div className="flex items-end justify-between gap-[30px]">
              <h3 className="font-serif text-[24px] font-normal leading-[27.6px] sm:text-[28px] sm:leading-[32.2px] sm:tracking-[-0.28px]">{it.title}</h3>
              {it.icon && <InlineSvg svg={it.icon} className="h-auto w-[74px] shrink-0" style={it.iconW ? { width: it.iconW } : undefined} />}
            </div>
          </li>
        ) : (
          <li key={it.title} className={`grid content-between gap-[12.8px] rounded-usp p-10 text-center xl:min-h-[386px] xl:px-[28.8px] xl:pb-[28.8px] xl:pt-8 xl:text-left ${COLORS.careers[i]}`}>
            {it.icon ? <div className="flex h-[120px] items-center justify-center xl:items-start xl:justify-start"><InlineSvg svg={it.icon} className="h-14 w-[83px]" /></div> : <span />}
            <div>
              <h3 className="font-serif text-[24px] font-normal leading-normal tracking-[-0.72px] xl:text-[42px] xl:tracking-[-1.26px]">{it.title}</h3>
              <p className="mx-auto mt-[12.8px] max-w-[448px] font-sans text-[16px] font-medium leading-[19.2px] xl:mx-0 xl:max-w-none">{it.body}</p>
            </div>
          </li>
        ),
      )}
    </ul>
  )
}
