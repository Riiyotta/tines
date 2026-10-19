/** Webinar index pieces (specs/pages-c.md §9.1): speaker rows, date/time pills, featured + on-demand cards. */
import { Pill } from '../../shared/index.js'
import { formatWebinar } from './format.js'

// Card themes measured on the live page (bg / 1px border / ink / dark date-pill / light time-pill)
export const WEBINAR_THEMES = {
  purple: { card: 'bg-purple-5 border-purple-10 text-purple-65', dark: 'bg-purple-70 text-purple-5', light: 'bg-purple-15 text-purple-70' },
  green: { card: 'bg-green-5 border-green-10 text-tint-green-ink', dark: 'bg-tint-green-ink-dk text-green-5', light: 'bg-green-15 text-tint-green-ink-dk' },
  pink: { card: 'bg-tint-rose border-tint-rose-mid text-pink-65', dark: 'bg-pink-70 text-tint-rose', light: 'bg-pcu-pink-pill text-pink-70' },
  orange: { card: 'bg-tint-peach border-tint-peach-mid text-orange-55', dark: 'bg-orange-70 text-tint-peach', light: 'bg-pcu-peach-pill text-orange-70' },
}

export function Avatar({ src, size, alt = '' }) {
  return (
    <figure className="m-0 shrink-0 overflow-hidden rounded-full bg-[rgb(133_120_230)]" style={{ width: size, height: size }}>
      {src && <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />}
    </figure>
  )
}

export function Speaker({ s, size = 28, big = false }) {
  return (
    <div className="grid items-center gap-3" style={{ gridTemplateColumns: `${size}px 1fr` }}>
      <Avatar src={s.photo} size={size} />
      <div className="font-sans">
        <p className="text-[16px] font-medium leading-[22.4px]">{s.name}</p>
        {s.role && <p className="text-[12px] font-medium leading-[13.8px] opacity-75">{s.role}</p>}
      </div>
    </div>
  )
}

export function WebinarPills({ startsAt, t }) {
  const f = formatWebinar(startsAt)
  return (
    <div className="-ml-[2.3px] -mt-[2.3px] flex flex-wrap">
      <Pill size="md" rounded="24" tone={`${t.dark} m-[2.4px]`}>{f.date}</Pill>
      <Pill size="md" rounded="24" tone={`${t.light} m-[2.4px]`}>{f.time}</Pill>
    </div>
  )
}

export function FeaturedCard({ w }) {
  const t = WEBINAR_THEMES[w.theme]
  return (
    <a href={`/webinars/${w.slug}/`} className={`grid gap-[28.8px] rounded-usp border p-8 transition-[filter] duration-100 hover:brightness-[1.02] ${t.card}`}>
      <div className="grid gap-7">
        <div className="grid gap-4">
          <WebinarPills startsAt={w.startsAt} t={t} />
          <h3 className="max-w-[588px] font-serif text-[24px] font-normal leading-[27.6px] sm:text-[42px] sm:leading-[42px] sm:tracking-[-0.42px]">{w.title}</h3>
          <p className="min-h-[71.1px] max-w-[448px] font-sans text-[14px] font-medium leading-[19.6px]">
            Learn how a security team can assemble a tailored, enterprise-ready AI SOC in minutes, with a live build and plenty of practical tips you can reuse right away.
          </p>
        </div>
        <div className="flex gap-4">{w.speakers.map((s) => <Speaker key={s.name} s={s} size={64} />)}</div>
      </div>
    </a>
  )
}

export function WebinarCard({ w }) {
  const t = WEBINAR_THEMES[w.theme]
  return (
    <a href={`/webinars/${w.slug}/`} className={`grid gap-[28.8px] rounded-usp border p-8 transition-[filter] duration-100 hover:brightness-[1.02] ${t.card}`}>
      <div className="grid grid-rows-[1fr_auto] gap-7">
        <div className="grid content-start gap-4 md:pb-4">
          <WebinarPills startsAt={w.startsAt} t={t} />
          <h3 className="font-serif text-[24px] font-normal leading-[27.6px] tracking-[-0.24px] sm:text-[28px] sm:leading-[32.2px] sm:tracking-[-0.28px]">{w.title}</h3>
        </div>
        <div className="flex flex-col gap-3">{w.speakers.map((s) => <Speaker key={s.name} s={s} size={28} />)}</div>
      </div>
    </a>
  )
}
