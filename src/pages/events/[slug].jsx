import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../components/shared/NotFoundPage.jsx'
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
        <NotFoundPage actions={[{ href: "/events/", label: "All events" }, { href: "/", label: "Back to home" }]} />
      )}
    </>
  )
}
