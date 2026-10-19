import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../components/shared/NotFoundPage.jsx'
import { AreaNav, PageSection, Prose } from '../../components/shared/index.js'
import { AccessForm, SpeakerSidebar, MissedBlock } from '../../components/pages/webinars/Detail.jsx'
import { getWebinar, webinarNav } from '../../components/pages/webinars/data.js'
import { formatWebinar } from '../../components/pages/webinars/format.js'

export const title = 'Webinars | Tines'
export const theme = 'events-65'

export default function WebinarPage() {
  const { slug } = useParams()
  const w = getWebinar(slug)
  const nav = <AreaNav pill={webinarNav.pill} crumbs={[{ label: 'Webinars', href: '/webinars/' }]} links={webinarNav.links.map((l) => ({ ...l, active: false }))} />
  if (!w) {
    return (
      <>
        {nav}
        <NotFoundPage actions={[{ href: "/webinars/", label: "All webinars" }, { href: "/", label: "Back to home" }]} />
      </>
    )
  }
  const f = formatWebinar(w.startsAt)
  return (
    <>
      {nav}
      <PageSection className="pt-10">
        <div className="grid gap-x-16 lg:grid-cols-[704px_360px] [&>*]:min-w-0 lg:[&>:not(aside)]:col-start-1">
          <h1 className="order-1 mb-10 font-serif text-article-h1-sm sm:text-article-h1">{w.title}</h1>
          <div className="order-2 mb-10"><AccessForm /></div>
          <Prose className="order-3 mb-10 [&_p]:!max-w-none"><p className="!mt-0">{w.lead}</p></Prose>
          <p className="order-4 mb-10 font-sans text-[16px] font-semibold leading-[22.4px]">Originally hosted on <time dateTime={w.startsAt}>{f.long}.</time></p>
          <aside className="order-5 mb-10 lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:mb-0"><SpeakerSidebar speakers={w.speakers} /></aside>
          <Prose className="order-6 [&_p]:!max-w-none [&_ul]:!max-w-none [&_ul]:!pl-10">
            {w.body.map((b, i) => (b.ul ? <ul key={i}>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={i} className={i === 0 ? '!mt-0' : ''}>{b.p}</p>))}
          </Prose>
        </div>
      </PageSection>
      <MissedBlock />
      <div className="h-section-margin" />
    </>
  )
}
