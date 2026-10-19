import { useParams } from 'react-router-dom'
import { AreaNav, NewsletterSection } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import EventDetail from '../../components/pages/events/Detail.jsx'
import { getEvent, eventNav } from '../../components/pages/events/data.js'

export const title = 'Events | Tines'
export const theme = 'events-65'

export default function EventPage() {
  const { slug } = useParams()
  const event = getEvent(slug)
  return (
    <>
      <AreaNav pill={eventNav.pill} links={eventNav.links} />
      {event ? (
        <>
          <EventDetail event={event} />
          <NewsletterSection bleed heading="Can’t make it this time?" description="Subscribe to our newsletter to always keep up to date with all the latest news and updates from us." />
          <CtaStartToday />
        </>
      ) : (
        <section className="mx-auto flex min-h-[50vh] max-w-page flex-col items-center justify-center px-page text-center">
          <h1 className="font-serif text-h2-sm">Event not found in this clone</h1>
          <a href="/events/" className="btn btn-filled mt-6">All events</a>
        </section>
      )}
    </>
  )
}
