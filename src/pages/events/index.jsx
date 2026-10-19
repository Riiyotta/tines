import { useMemo, useState } from 'react'
import { AreaNav, CardGrid, FilterBar, SegmentedTabs, NewsletterSection } from '../../components/shared/index.js'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import EventCard from '../../components/pages/events/EventCard.jsx'
import { events, eventNav } from '../../components/pages/events/data.js'

export const title = 'Upcoming events | Tines'
export const theme = 'events'

const TABS = [{ value: 'all', label: 'All events' }, { value: 'virtual', label: 'Virtual' }]

export default function EventsIndex() {
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const list = useMemo(() => events.filter((e) => (tab === 'all' || e.type === 'WEBINAR') && `${e.title} ${e.location || ''}`.toLowerCase().includes(q.toLowerCase())), [tab, q])
  return (
    <>
      <AreaNav pill={eventNav.pill} crumbs={[{ label: 'Upcoming' }]} links={eventNav.links} />
      <div className="mx-auto max-w-page px-page">
        {/* The live page embeds a Google Maps world map with markers: shown here as a static crop of the live page */}
        <div className="mb-10 hidden h-[450px] overflow-hidden rounded-[12px] bg-[rgb(84_47_156_/_0.06)] sm:block">
          <img src="/assets/pages/events/world-map.png" alt="Map of upcoming events" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <h1 className="-mt-1 font-serif text-[32px] font-normal leading-[35.2px] tracking-[-0.64px]">Upcoming events</h1>
            <FilterBar><SegmentedTabs tabs={TABS} active={tab} onSelect={setTab} search="Search events" onSearch={setQ} /></FilterBar>
          </div>
          <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[48, 24]} className="2xl:grid-cols-4">
            {list.map((e) => <EventCard key={e.slug} event={e} />)}
          </CardGrid>
        </div>
      </div>
      <NewsletterSection bleed heading="Can’t make it this time?" description="Subscribe to our newsletter to always keep up to date with all the latest news and updates from us." />
      <CtaStartToday />
    </>
  )
}
