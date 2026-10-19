import { SidebarSearch } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import chevron from '../../../../reference/svg/pages/library-sidebar-chevron.svg?raw'
import close from '../../../../reference/svg/pages/library-close-icon.svg?raw'
import i1 from '../../../../reference/svg/pages/library-sidebar-icons-1.svg?raw'
import i2 from '../../../../reference/svg/pages/library-sidebar-icons-2.svg?raw'
import i3 from '../../../../reference/svg/pages/library-sidebar-icons-3.svg?raw'
import i4 from '../../../../reference/svg/pages/library-sidebar-icons-4.svg?raw'
import i5 from '../../../../reference/svg/pages/library-sidebar-icons-5.svg?raw'
import i6 from '../../../../reference/svg/pages/library-sidebar-icons-6.svg?raw'
import { teams, useCases } from './data.js'

const row = 'flex h-[41px] w-full items-center gap-[10px] rounded-[1386px] px-[14px] py-[11.55px] font-sans text-nav font-medium hover:bg-[color-mix(in_srgb,currentColor_6%,transparent)]'

function Item({ icon, label, href, active }) {
  return (
    <a href={href} className={`${row} ${active ? 'text-purple-40' : ''}`}>
      <InlineSvg svg={icon} className="h-[18px] w-[18px] shrink-0" />
      {label}
    </a>
  )
}

function Group({ icon, label, links }) {
  return (
    <details className="group">
      <summary className={`${row} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>
        <InlineSvg svg={icon} className="h-[18px] w-[18px] shrink-0" />
        <span className="flex-1">{label}</span>
        <InlineSvg svg={chevron} className="h-[5px] w-2 opacity-30 transition-transform duration-150 group-open:rotate-180" />
      </summary>
      <ul className="pb-1 pl-[42px]">
        {links.map((l) => (
          <li key={l.label}><a href={l.href} className="block rounded-[8px] px-[10px] py-[7px] font-sans text-nav font-medium opacity-80 hover:bg-[color-mix(in_srgb,currentColor_6%,transparent)] hover:opacity-100">{l.label}</a></li>
        ))}
      </ul>
    </details>
  )
}

/** LibrarySidebar (specs/pages-c.md §6.1): search, nav list with accordions, and the "Submit a story or an idea" prompt card. */
export default function LibrarySidebar({ active = 'Home', className = '' }) {
  return (
    <div className={`-ml-3 flex min-h-[calc(100vh-190px)] w-[300px] flex-col justify-between gap-2 pl-3 ${className}`}>
      <div className="grid gap-2">
      <SidebarSearch placeholder="Find a story" />
      <nav aria-label="Library" className="grid">
        <Item icon={i1} label="Home" href="/library/" active={active === 'Home'} />
        <Group icon={i2} label="By team" links={teams.map((t) => ({ label: t.name, href: '/library/' }))} />
        <Group icon={i3} label="By use case" links={useCases.map((u) => ({ label: u.name, href: '/library/' }))} />
        <Group icon={i4} label="By feature" links={['AI agents', 'Cases', 'Records', 'Webhooks'].map((l) => ({ label: l, href: '/library/' }))} />
        <Item icon={i5} label="Community" href="/library/" />
        <Group icon={i6} label="Directory" links={[{ label: 'All stories', href: '/library/stories/' }, { label: 'All tools', href: '/library/' }]} />
      </nav>
      </div>
      <PromptCard />
    </div>
  )
}

export function PromptCard({ className = '' }) {
  return (
    <div className={`relative mt-8 rounded-usp bg-purple-5 p-[17.5px] transition-colors hover:bg-purple-10 ${className}`}>
      <button type="button" aria-label="Close" className="absolute right-[14px] top-[14px] opacity-50 hover:opacity-100"><InlineSvg svg={close} className="h-[9px] w-[9px]" /></button>
      <h3 className="font-sans text-[16px] font-semibold leading-[18.4px]">Submit a story or an idea</h3>
      <p className="mt-[7px] max-w-[80%] font-sans text-[14px] font-medium leading-[19.6px]">Built something useful, or want to see a story we don’t have yet?</p>
      <a href="/contact/" className="mt-[14px] block font-sans text-[14px] font-semibold leading-[19.6px] after:absolute after:inset-0 after:content-['']">Get in touch →</a>
    </div>
  )
}
