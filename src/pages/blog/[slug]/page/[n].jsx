import { useParams } from 'react-router-dom'
import BlogCategory from '../../../../components/pages/blog/BlogCategory.jsx'
import BlogNotFound from '../../../../components/pages/blog/BlogNotFound.jsx'
import { categoryBySlug } from '../../../../components/pages/blog/data.js'

export const title = 'Blog | Tines'
export const theme = 'plain'

export default function BlogCategoryPage() {
  const { slug, n } = useParams()
  const c = categoryBySlug(slug)
  const page = parseInt(n, 10)
  if (!c || !(page >= 1 && page <= c.pages)) return <BlogNotFound />
  return <BlogCategory slug={slug} page={page} />
}
