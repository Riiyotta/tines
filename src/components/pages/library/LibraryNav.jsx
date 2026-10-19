import { AreaNav } from '../../shared/index.js'

/** Tines Stories › Library sub-nav (specs/pages-c.md §2.1; backdrop layer on library pages). */
export default function LibraryNav() {
  return (
    <AreaNav
      pill={{ label: 'Tines Stories', href: '/stories/' }}
      crumbs={[{ label: 'Library', href: '/library/' }]}
      links={[
        { label: 'Overview', href: '/stories/', caret: true },
        { label: 'Discover', href: '/stories/templates/', caret: true, active: true },
        { label: 'Learn', href: '/stories/docs/quickstart/', caret: true },
      ]}
      showThemeToggle
      backdrop
      cta={{ label: 'Try Tines Stories', href: 'https://login.tines.com/saml_idp/signup' }}
    />
  )
}
