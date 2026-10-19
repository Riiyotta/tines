import { AreaNav, ExplosionCta } from '../../shared/index.js'

const LINKS = [
  { label: 'Overview', href: '/stories/', caret: true },
  { label: 'Discover', href: '/stories/templates/', caret: true },
  { label: 'Learn', href: '/stories/docs/quickstart/', caret: true },
]

/** Tines Stories sub-nav (specs/pages-c.md §2.1): pill + optional crumb + Overview / Discover / Learn + theme toggle + CTA. */
export default function StoriesNav({ crumb, crumbHref, active }) {
  return (
    <AreaNav
      pill={{ label: 'Tines Stories', href: '/stories/' }}
      crumbs={crumb ? [{ label: crumb, href: crumbHref }] : []}
      links={LINKS.map((l) => ({ ...l, active: l.label === active }))}
      showThemeToggle
      backdrop
      cta={{ label: 'Try Tines Stories', href: 'https://login.tines.com/saml_idp/signup' }}
    />
  )
}

export { ExplosionCta }
