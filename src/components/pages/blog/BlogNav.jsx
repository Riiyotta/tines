import { AreaNav } from '../../shared/index.js'
import { navLinks } from './data.js'

/** Blog sub-nav (specs/pages-c.md §2.1): pill "Blog" + category links; `active` is the href of the current page. */
export default function BlogNav({ active }) {
  return <AreaNav pill={{ label: 'Blog', href: '/blog/' }} links={navLinks.map((l) => ({ ...l, active: l.href === active }))} />
}
