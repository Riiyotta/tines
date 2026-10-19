import { CardGrid, PaginatedListNav } from '../../shared/index.js'
import ArticleGrid from './ArticleGrid.jsx'
import CtaStartToday from '../../CtaStartToday.jsx'
import BlogNav from './BlogNav.jsx'
import ArticleCard from './ArticleCard.jsx'
import { articles, categoryBySlug } from './data.js'

/** Category / paginated list: 24 cards per page, cycling the sample articles (placeholder filler beyond them). */
export default function BlogCategory({ slug, page = 1 }) {
  const c = categoryBySlug(slug)
  const pool = c.filter ? articles.filter((a) => a.categories?.includes(c.filter)) : articles
  const list = Array.from({ length: 24 }, (_, i) => (pool.length ? pool : articles)[(i + (page - 1) * 24) % (pool.length || articles.length)])
  return (
    <>
      <BlogNav active={`/blog/${c.slug}/`} />
      <div className="mx-auto max-w-page px-page pt-[78px] max-md:pt-[60px]">
        <h1 className="font-serif text-category-h1-sm font-normal sm:text-category-h1">{c.h1}</h1>
        <ArticleGrid className="mt-[78px] max-md:mt-[58px]">
          {list.map((a, i) => <ArticleCard key={i} a={a} />)}
        </ArticleGrid>
        <PaginatedListNav className="mt-16" page={page} total={c.pages} hrefFor={(n) => (n === 1 ? `/blog/${c.slug}/` : `/blog/${c.slug}/page/${n}/`)} />
      </div>
      <div className="pt-[136px] max-md:pt-10"><CtaStartToday flush /></div>
    </>
  )
}
