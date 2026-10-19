import { CardGrid, CoverCard, NewsletterSection, SectionHeader } from '../../components/shared/index.js'
import ArticleGrid from '../../components/pages/blog/ArticleGrid.jsx'
import CtaStartToday from '../../components/CtaStartToday.jsx'
import InlineSvg from '../../components/InlineSvg.jsx'
import quoteMark from '../../../reference/svg/pages/blog-excerpt-quote-mark.svg?raw'
import BlogNav from '../../components/pages/blog/BlogNav.jsx'
import ArticleCard from '../../components/pages/blog/ArticleCard.jsx'
import { articles, bySlug, guides, latest, productUpdates, tutorials } from '../../components/pages/blog/data.js'

export const title = 'Blog | Tines'
export const theme = 'plain'

const featuredCard = (a, key) => (
  <CoverCard
    key={key}
    variant="featured"
    href={a.href}
    cover={a.cover}
    title={a.title}
    excerpt={a.excerpt}
    author={{ prefix: 'Written by', name: a.authors[0].name, role: a.authors[0].role, src: a.authors[0].src }}
  />
)

export default function BlogIndex() {
  return (
    <>
      <BlogNav active="/blog/" />
      <div className="mx-auto max-w-page px-page pt-[47px] md:pt-[62px]">
        {featuredCard(articles[0])}

        <section className="mt-[25px] md:mt-16">
          <SectionHeader title="Latest articles" action={{ label: 'See all →', href: '/blog/articles/' }} className="max-md:!mb-6" />
          <ArticleGrid>
            {latest.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </ArticleGrid>
        </section>

        <section className="mt-10 grid border-y border-[color-mix(in_srgb,currentColor_14%,transparent)] pb-[42px] pt-12 max-lg:text-center md:mt-24 md:py-[72px] lg:grid-cols-[884px_1fr]">
          <div className="lg:pl-24">
            <InlineSvg svg={quoteMark} className="mx-auto mt-12 h-9 w-9 lg:mx-0 lg:mt-0" />
            <blockquote className="mt-6 font-serif text-[18px] font-medium leading-[24.75px] tracking-[-0.18px] md:text-[28px] md:leading-[38.5px] md:tracking-[-0.28px]">
              Placeholder pull quote of around forty-five words that stands in for the excerpt shown on the live blog home page. It talks about
              people building workflows on their own, and why a clear and safe route for doing so matters to every team involved.
            </blockquote>
            <p className="mt-4 font-sans text-[16px] leading-[22.4px] lg:mt-6"><strong className="font-bold">Name Surname</strong><br /><span className="font-medium">Role, Tines</span></p>
            <p className="mt-4 font-sans text-[16px] leading-[22.4px] opacity-60 transition-opacity hover:opacity-100">
              From the article: <a href="/blog/tines-3b-first-90/" className="underline">Making Tines 3B</a>
            </p>
          </div>
          <div className="flex h-[250px] items-center justify-center max-lg:order-first lg:h-auto">
            <img src="/assets/images/usp/blossoming-transformation.svg" alt="" className="h-[300px] w-[300px] max-lg:h-[220px] max-lg:w-[220px]" />
          </div>
        </section>

        <section className="mt-10 md:mt-24">
          <SectionHeader title="Tutorials" action={{ label: 'See all →', href: '/blog/tutorials/' }} className="max-md:!mb-6 md:!mb-9" />
          {featuredCard(articles[1], 't')}
          <ArticleGrid className="mt-[26px]  md:mt-[55px]">
            {tutorials.map((a) => <ArticleCard key={a.title} a={a} />)}
          </ArticleGrid>
        </section>

        <section className="mt-10 md:mt-24">
          <SectionHeader title="Guides, white papers, and original research" action={{ label: 'See all →', href: '/blog/guides/' }} className="max-md:!mb-6" />
          <CardGrid cols={{ base: 2, md: 4 }} gap={[24, 24]} className="max-sm:!gap-4">
            {guides.map((g) => (
              <a key={g.href} href={g.href} className="block">
                <div className={`aspect-[8.5/11] overflow-hidden rounded-[6px] border bg-light-200 ${g.border}`}>
                  <img src={g.cover} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-[14px] font-sans text-[14px] font-semibold leading-[17px] sm:text-[16px] sm:leading-[19.2px]">{g.title}</h3>
                {g.subheading && <p className="mt-2 font-sans text-[14px] font-medium leading-[17px] opacity-80 sm:text-[16px] sm:leading-[19.2px]">{g.subheading}</p>}
              </a>
            ))}
          </CardGrid>
        </section>

        <NewsletterSection className="max-md:!mt-10" />

        <section className="mt-10 md:mt-24">
          <SectionHeader title="Product updates" action={{ label: 'See all →', href: '/blog/product-updates/' }} className="max-md:!mb-6" />
          <ArticleGrid>
            {productUpdates.map((a) => <ArticleCard key={a.title} a={a} />)}
          </ArticleGrid>
        </section>

        <div className="mt-10 flex h-[88px] md:mt-24 items-center">
          <a href="/blog/articles/" className="flex h-full w-full items-center justify-center rounded-usp border border-[color-mix(in_srgb,currentColor_18%,transparent)] font-sans text-nav font-bold transition-colors hover:bg-[color-mix(in_srgb,currentColor_5%,transparent)]">
            View all articles →
          </a>
        </div>
      </div>
      <div className="pt-10 md:pt-24"><CtaStartToday flush /></div>
    </>
  )
}
