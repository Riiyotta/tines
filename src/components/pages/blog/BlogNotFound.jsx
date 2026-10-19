import BlogNav from './BlogNav.jsx'

/** Unknown blog slug: "not found in this clone" state (spec rule 8). */
export default function BlogNotFound() {
  return (
    <>
      <BlogNav />
      <section className="mx-auto flex min-h-[50vh] max-w-page flex-col items-start justify-center px-page">
        <h1 className="font-serif text-category-h1-sm font-normal sm:text-category-h1">Not found in this clone</h1>
        <p className="mt-4 font-sans text-[16px] font-medium leading-[22.4px]">This article has not been cloned. Browse the sample articles instead.</p>
        <a href="/blog/" className="btn btn-filled mt-6">Back to the blog</a>
      </section>
    </>
  )
}
