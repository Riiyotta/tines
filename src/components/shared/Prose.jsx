/**
 * Prose + ArticleLayout. Implements specs/pages-c.md §2.5 (Prose base) and the ArticleLayout variants in the §1 REUSE MAP.
 * Prose: Roobert 400 18/29.25; p mt 18 max 80%; strong 600; links 700 underline 1px (hover purple-45); em italic;
 *   h2 mt 42 Reckless 400 28/35 -0.28; h3 Roobert 600 22/26.4; ul pl 27 my 18 max 80%, li+li mt 9, nested ul pl 18 mt 9.
 *   `weight500` = case study body (Roobert 500). `lesson` = 16/26.
 * ArticleLayout variants: 'blog' (828 + 260 aside, gap), 'article' (blog article: px-page-wide, 828 + 260, gap 40), 'narrow' (680 centred, case study), 'lesson' (660 + 288 left nav), 'whatsnew' (936, pr 192).
 * pages-c: <640 article scale (14/22.75, h2 24/30, ul pl 21) measured on the blog article.
 * Props: variant, aside (node, sticky), children, className.
 * Prose `fullBelow2xl` (c1): p/ul use the full column below 1280 (blog article: the live 80% cap only applies at >= 1280).
 */
export function Prose({ weight500 = false, lesson = false, fullBelow2xl = false, className = '', children }) {
  return (
    <div
      className={`prose-tines font-sans ${lesson ? 'text-[16px] leading-[26px]' : 'text-prose'} ${weight500 ? 'font-medium' : 'font-normal'} ${fullBelow2xl ? 'max-2xl:[&_p]:!max-w-none max-2xl:[&_ul]:!max-w-none' : ''} ${className}
        [&_p]:mt-[18px] [&_p]:max-w-[80%] [&_strong]:font-semibold [&_em]:italic
        [&_a]:font-bold [&_a]:underline [&_a]:decoration-1 hover:[&_a]:text-purple-45
        [&_h2]:mt-[42px] [&_h2]:font-serif [&_h2]:text-prose-h2 [&_h2]:font-normal
        [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-prose-h3 [&_h3]:font-semibold
        [&_ul]:my-[18px] [&_ul]:max-w-[80%] [&_ul]:list-disc [&_ul]:pl-[27px] [&_li+li]:mt-[9px] [&_ul_ul]:mt-[9px] [&_ul_ul]:pl-[18px]
        max-sm:!text-[14px] max-sm:!leading-[22.75px] max-sm:[&_p]:mt-[14px] max-sm:[&_p]:max-w-full max-sm:[&_h2]:mt-9 max-sm:[&_h2]:text-[24px] max-sm:[&_h2]:leading-[30px] max-sm:[&_h3]:text-[17px] max-sm:[&_h3]:leading-[20.4px] max-sm:[&_ul]:my-[14px] max-sm:[&_ul]:max-w-full max-sm:[&_ul]:pl-[21px] max-sm:[&_li+li]:mt-[7px]`}
    >
      {children}
    </div>
  )
}

const LAYOUT = {
  blog: { wrap: 'mx-auto max-w-[1520px] px-page md:grid md:grid-cols-[minmax(0,828px)_260px] md:justify-between md:gap-12', main: '' },
  narrow: { wrap: 'mx-auto max-w-[1440px] px-page-wide', main: 'mx-auto max-w-[680px]' },
  lesson: { wrap: 'mx-auto max-w-[1520px] px-page md:grid md:grid-cols-[288px_minmax(0,660px)] md:gap-[72px]', main: '' },
  whatsnew: { wrap: 'mx-auto max-w-[1520px] px-page', main: 'max-w-[936px] md:pr-48' },
  // pages-c blog article: padding 0 156 / max 1440 (px-page-wide), grid 828 + 260, gap 40
  article: { wrap: 'mx-auto max-w-[1440px] px-page-wide md:grid md:grid-cols-[minmax(0,828px)_200px] md:gap-[30px] 2xl:grid-cols-[minmax(0,828px)_260px] 2xl:gap-10', main: '' }, // c1: live aside is 200 / gap 30 below 1280
}

export function ArticleLayout({ variant = 'blog', aside, children, className = '' }) {
  const v = LAYOUT[variant] || LAYOUT.blog
  const asideFirst = variant === 'lesson'
  return (
    <div className={`${v.wrap} ${className}`}>
      {asideFirst && aside && <aside className="sticky top-[100px] hidden self-start md:block">{aside}</aside>}
      <article className={v.main}>{children}</article>
      {!asideFirst && aside && <aside className="sticky top-[100px] hidden self-start md:block">{aside}</aside>}
    </div>
  )
}
