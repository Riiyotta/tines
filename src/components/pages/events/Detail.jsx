/** Event detail template (specs/pages-c.md §8.2): columns card (purple-2, r20, p40) with cover, header + CTA, details dl, location block, optional related row. */
import InlineSvg from '../../InlineSvg.jsx'
import ring from '../../../../reference/svg/pages/events-angular-gradient-border.svg?raw'
import EventCard from './EventCard.jsx'

function RegisterCta({ label, href = '#' }) {
  return (
    <a href={href} className="relative inline-flex h-[49.6px] w-full items-center justify-center rounded-pill border border-transparent bg-purple-50 px-7 font-sans text-[14px] font-semibold leading-[14px] text-lightest transition-[filter] duration-100 hover:brightness-110 md:w-[260px]">
      <InlineSvg svg={ring} className="pointer-events-none absolute left-px top-px h-[47.6px] w-[calc(100%-2px)] [&>svg]:!h-full [&>svg]:!w-full" />
      <span className="relative">{label}</span>
    </a>
  )
}

export default function EventDetail({ event }) {
  const rows = [['Date', event.date], event.time && ['Time', event.time], ['Location', event.place]].filter(Boolean)
  return (
    <article className="mx-auto max-w-page px-page">
      <div className="grid rounded-[20px] border border-purple-10 bg-purple-2 p-6 sm:p-10">
        <div className={`mx-auto flex w-full max-w-[936px] flex-col gap-8 ${event.textClass}`}>
          <figure className="m-0 overflow-hidden rounded-[16px]"><img src={event.cover} alt="" className="block aspect-[1200/630] w-full object-cover" /></figure>
          <header className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="font-sans text-[38px] font-medium leading-[41.04px] tracking-[-0.76px] sm:text-[42px] sm:leading-[45.36px] sm:tracking-[-1.26px]">{event.title}</h1>
              <p className="font-sans text-[18px] font-medium leading-[25.2px] opacity-75">{event.excerpt}</p>
            </div>
            <div className="shrink-0 md:w-[260px]"><RegisterCta label={event.cta} /></div>
          </header>
          <dl className="my-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {rows.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-[6px] rounded-[10px] border border-purple-10 bg-purple-5 px-4 py-[14px]">
                <dt className="font-mono text-[12px] font-bold uppercase leading-[13.8px] tracking-[0.24px] text-purple-70">{k}</dt>
                <dd className="font-sans text-[16px] font-semibold leading-[18.4px]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="max-w-[680px] font-sans text-[16px] font-medium leading-[26px]" />
          <section className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-x-5 gap-y-2 max-sm:flex-col">
              <address className="flex flex-col gap-[2px] font-sans text-[15px] font-normal not-italic leading-[17.25px]">
                {event.address.map((l) => <span key={l}>{l}</span>)}
              </address>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(event.address.join(' '))}`} target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] font-medium leading-[16.1px] text-purple-70 hover:underline">
                Open in Google Maps <span aria-hidden="true">↗</span>
              </a>
            </div>
            {/* Third-party Google Maps embed replaced by a static placeholder */}
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[12px] border border-[rgb(93_56_174_/_0.14)] bg-[rgb(84_47_156_/_0.06)]">
              <span className="font-sans text-[14px] font-medium opacity-60">Map preview unavailable in this clone</span>
            </div>
          </section>
          {event.related.length > 0 && (
            <section>
              <h2 className="mb-4 font-sans text-[16px] font-medium leading-[19.2px]">You can also join us at</h2>
              <div className="max-w-[456px]">{event.related.map((r) => <EventCard key={r.slug} event={r} />)}</div>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}
