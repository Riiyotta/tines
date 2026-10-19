/**
 * EventDirectoryCard (specs/pages-c.md §8.1): grid, r12, 1px border, bg = theme soft, hover border = theme hover (.2s). Inner pad 21 gap 10.5:
 * date pill(s) (+ arrow disc when a range) + type pill, title (Roobert 500 22/25.3), location with pin; figure 1200/630 with a 1px top border.
 * Theme classes are literal so Tailwind sees them. Not the shared `THEMES`: the live event cards use darker inks (specs §2.10 gives the lighter ones).
 */
import InlineSvg from '../../InlineSvg.jsx'
import arrow from '../../../../reference/svg/pages/events-date-arrow.svg?raw'
import pin from '../../../../reference/svg/pages/events-location-icon.svg?raw'

export const EVENT_THEMES = {
  orange: { card: 'bg-tint-peach border-tint-peach-mid hover:border-tint-peach-hover text-orange-80', fig: 'border-tint-peach-mid', pill: 'bg-orange-80 text-tint-peach', disc: 'bg-tint-peach-mid text-orange-70', ink: 'text-orange-70', pin: 'text-orange-55' },
  purple: { card: 'bg-purple-5 border-purple-10 hover:border-tint-lilac-edge text-purple-80', fig: 'border-purple-10', pill: 'bg-purple-80 text-purple-5', disc: 'bg-purple-10 text-purple-70', ink: 'text-purple-70', pin: 'text-purple-55' },
  green: { card: 'bg-green-5 border-green-10 hover:border-green-30 text-tint-green-ink-xdk', fig: 'border-green-10', pill: 'bg-tint-green-ink-xdk text-green-5', disc: 'bg-green-10 text-tint-green-ink-dk', ink: 'text-tint-green-ink', pin: 'text-tint-green-book' },
  teal: { card: 'bg-teal-5 border-pcu-teal-soft hover:border-pcu-teal-line text-pcu-teal-dk', fig: 'border-pcu-teal-soft', pill: 'bg-pcu-teal-dk text-teal-5', disc: 'bg-pcu-teal-soft text-teal-70', ink: 'text-teal-70', pin: 'text-teal-70' },
  blue: { card: 'bg-blue-5 border-pcu-blue-soft hover:border-pcu-blue-line text-pcu-blue-dk', fig: 'border-pcu-blue-soft', pill: 'bg-pcu-blue-dk text-blue-5', disc: 'bg-pcu-blue-soft text-blue-70', ink: 'text-blue-70', pin: 'text-blue-70' },
  pink: { card: 'bg-tint-rose border-tint-rose-mid hover:border-tint-rose-line text-pink-80', fig: 'border-tint-rose-mid', pill: 'bg-pink-80 text-tint-rose', disc: 'bg-tint-rose-mid text-pink-70', ink: 'text-pink-70', pin: 'text-pink-65' },
}

export default function EventCard({ event, className = '' }) {
  const t = EVENT_THEMES[event.theme] || EVENT_THEMES.purple
  const pill = `rounded-pill px-[7.7px] py-[3.85px] font-mono text-[11px] font-semibold uppercase leading-[12.65px] tracking-[0.22px]`
  return (
    <a href={event.href || `/events/${event.slug}/`} className={`grid overflow-hidden rounded-[12px] border transition-[border-color] duration-200 ${t.card} ${className}`}>
      <div className="flex flex-col gap-[10.5px] p-[21px]">
        <div className="flex items-start justify-between gap-[10.5px]">
          <div className="flex items-center gap-[5.6px]">
            {event.dates.map((d, i) => (
              <span key={d} className="contents">
                {i > 0 && <span className={`flex h-5 w-5 items-center justify-center rounded-full ${t.disc}`}><InlineSvg svg={arrow} className="h-[7px] w-2" /></span>}
                <span className={`${pill} ${t.pill}`}>{d}</span>
              </span>
            ))}
          </div>
          <span className={`${pill} bg-[color-mix(in_srgb,currentColor_12%,transparent)] ${t.ink}`}>{event.type}</span>
        </div>
        <h3 className="font-sans text-[16px] font-medium leading-[18.4px] tracking-[-0.16px] sm:text-[22px] sm:leading-[25.3px] sm:tracking-[-0.22px]">{event.title}</h3>
        {event.location && (
          <p className="-ml-[2.8px] flex items-center gap-[4.9px] font-sans text-[14px] font-semibold leading-[19.6px]">
            <InlineSvg svg={pin} className={`h-[18px] w-[18px] shrink-0 ${t.pin}`} />
            <span>{event.location}</span>
          </p>
        )}
      </div>
      <div className={`border-t ${t.fig}`}>
        <img src={event.image} alt="" loading="lazy" className="block aspect-[320/167] w-full object-cover" />
      </div>
    </a>
  )
}
