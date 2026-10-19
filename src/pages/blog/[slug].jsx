import BlogArticle from '../../components/pages/blog/BlogArticle.jsx'
import BlogCategory from '../../components/pages/blog/BlogCategory.jsx'
import BlogNotFound from '../../components/pages/blog/BlogNotFound.jsx'
import BlogSeries from '../../components/pages/blog/BlogSeries.jsx'
import { bySlug, categoryBySlug, seriesBySlug } from '../../components/pages/blog/data.js'
import { useParams } from 'react-router-dom'

export const theme = 'plain'

/** /blog/<slug>/ is a category (articles, news, ...), a series, or an article. */
export default function BlogSlug() {
  const { slug } = useParams()
  if (categoryBySlug(slug)) return <BlogCategory slug={slug} />
  if (seriesBySlug(slug)) return <BlogSeries slug={slug} />
  if (bySlug(slug)) return <BlogArticle slug={slug} />
  return <BlogNotFound />
}
