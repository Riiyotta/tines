import { useMemo, useState } from 'react'
import { AreaNav, SidebarLayout, SidebarSearch, CardGrid } from '../../components/shared/index.js'
import { FeaturedCard, WebinarCard } from '../../components/pages/webinars/Cards.jsx'
import { WEBINARS, webinarNav } from '../../components/pages/webinars/data.js'

export const title = 'Webinars | Tines'
export const theme = 'events-65'

export default function WebinarsIndex() {
  const [q, setQ] = useState('')
  const match = (w) => `${w.title} ${w.speakers.map((s) => s.name).join(' ')}`.toLowerCase().includes(q.toLowerCase())
  const featured = useMemo(() => WEBINARS.find((w) => w.featured), [])
  const rest = useMemo(() => WEBINARS.filter((w) => !w.featured && match(w)), [q])
  const aside = (
    <>
      <img src="/assets/pages/webinars/sidebar-spot-illustration-webinar.png" alt="" width="150" height="150" className="-mx-3 -mt-3 mb-0 h-[150px] w-[150px] max-w-none" />
      <h1 className="mt-6 font-serif text-[36px] font-normal leading-[normal] tracking-[-0.36px]">Webinars</h1>
      <SidebarSearch variant="webinar" placeholder="Search..." onChange={setQ} className="mt-6" />
      <p className="mt-6 font-sans text-[16px] font-medium leading-[22.4px]">Join our webinars to learn how Tines can help your team automate the work that matters, straight from the people building and using it.</p>
    </>
  )
  return (
    <>
      <AreaNav pill={webinarNav.pill} crumbs={[{ label: 'Webinars' }]} links={webinarNav.links.map((l) => ({ ...l, active: false }))} />
      <SidebarLayout aside={aside}>
        {featured && match(featured) && <FeaturedCard w={featured} />}
        <section className="mt-24">
          <h2 className="font-serif text-[24px] font-normal leading-[normal]">Watch on-demand</h2>
          <CardGrid cols={{ base: 1, md: 2, lg: 3 }} gap={[55, 24]} className="mt-10">
            {rest.map((w) => <WebinarCard key={w.slug} w={w} />)}
          </CardGrid>
          {rest.length === 0 && <p className="mt-10 font-sans text-[16px] font-medium opacity-70">No webinars match your search.</p>}
        </section>
      </SidebarLayout>
      <div className="h-section-margin" />
    </>
  )
}
