import { CardGrid, PaginatedListNav } from '../../shared/index.js'
import ArticleGrid from './ArticleGrid.jsx'
import CtaStartToday from '../../CtaStartToday.jsx'
import BlogNav from './BlogNav.jsx'
import ArticleCard from './ArticleCard.jsx'
import { usePageTitle } from '../_lib/usePageTitle.js'
import { allArticles, articles, categoryBySlug } from './data.js'

/** Category / paginated list: 24 cards per page, cycling the sample articles (placeholder filler beyond them). */
export default function BlogCategory({ slug, page = 1 }) {
  const c = categoryBySlug(slug)
  usePageTitle(page > 1 ? `${c.h1} - Page ${page} | Tines Blog` : `${c.docTitle || c.h1} | Tines Blog`)
  // "All articles" lists the live first-page order (c1); other categories filter the sample set.
  const pool = c.filter ? articles.filter((a) => a.categories?.includes(c.filter)) : allArticles
  const list = Array.from({ length: 24 }, (_, i) => {
    const a = (pool.length ? pool : articles)[(i + (page - 1) * 24) % (pool.length || articles.length)]
    return c.slug === 'articles' ? { ...a, cover: a.thumb || a.cover } : a
  })
  return (
    <>
      <BlogNav active={`/blog/${c.slug}/`} />
      <div className="mx-auto max-w-page px-page pt-[58px] md:pt-[64px] xl:pt-[63px] 2xl:pt-[78px]">
        <div className="relative">
          <h1 className="font-serif text-category-h1-sm font-normal sm:text-category-h1">{c.h1}</h1>
          {c.slug === 'articles' && <img src="/assets/pages/blog/articles-header-icon.svg" alt="" width="59" height="90" className="absolute right-0 top-1/2 h-[90px] w-[59px] -translate-y-1/2" />}
        </div>
        <ArticleGrid className="mt-[58px] xl:mt-[63px] 2xl:mt-[78px]">
          {list.map((a, i) => <ArticleCard key={i} a={a} />)}
        </ArticleGrid>
        <PaginatedListNav className="mt-16" page={page} total={c.pages} hrefFor={(n) => (n === 1 ? `/blog/${c.slug}/` : `/blog/${c.slug}/page/${n}/`)} />
      </div>
      <div className="pt-[136px] max-md:pt-10"><CtaStartToday flush /></div>
    </>
  )
}
