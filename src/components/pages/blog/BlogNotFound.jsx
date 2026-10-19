import BlogNav from './BlogNav.jsx'
import { NotFoundPage } from '../../shared/NotFoundPage.jsx'

/** Unknown blog slug: shared "Page not found" state under the blog nav. */
export default function BlogNotFound() {
  return (
    <>
      <BlogNav />
      <NotFoundPage actions={[{ href: '/blog/', label: 'Back to the blog' }, { href: '/', label: 'Back to home' }]} />
    </>
  )
}
