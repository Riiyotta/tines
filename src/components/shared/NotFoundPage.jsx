import { useEffect } from 'react'

/**
 * Shared "Page not found" state (live /<unknown>/ 404): UFO spot illustration, serif heading, one line of copy, CTAs.
 * Used by App's catch-all route and by every dynamic page whose data lookup misses (events/[slug], blog, ...).
 * Sets document.title to "Not found | Tines" like live. (The dev SPA still answers HTTP 200.)
 * Props: `actions` = [{ href, label }] (default: Back to home), `bare` = skip the outer section wrapper.
 */
export function NotFoundPage({ actions = [{ href: '/', label: 'Back to home' }], heading = 'Page not found', message = 'We couldn’t find what you were looking for.' }) {
  useEffect(() => {
    // Marker lets App's page-title effect (which runs after this child effect) leave the title alone.
    const root = document.documentElement
    root.dataset.notFound = ''
    document.title = 'Not found | Tines'
    return () => {
      delete root.dataset.notFound
    }
  }, [])
  return (
    <section className="mx-auto max-w-page px-page pb-sp-xxl pt-[48px]">
      <div className="flex flex-col items-center rounded-[20px] bg-purple-5/70 px-4 text-legacy-ink pb-[96px] pt-[80px] text-center sm:pt-[110px]">
        <img
          src="/assets/images/spot/tines-icon-ufo.png"
          srcSet="/assets/images/spot/tines-icon-ufo-150w.png 1x, /assets/images/spot/tines-icon-ufo.png 2x"
          alt="An illustration of a flying UFO"
          width="150"
          height="150"
        />
        <h1 className="mt-4 font-serif text-[32px] font-normal leading-[1.15] sm:text-[42px]">{heading}</h1>
        <p className="mt-4 font-sans text-[16px] font-medium leading-[22.4px]">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions.map((a) => (
            <a key={a.href} href={a.href} className="btn btn-filled">{a.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}
