import CurlToTines from './CurlToTines.jsx'

/** BuildYourOwnConnectionsSection (specs/pages-c.md §5.4): dashed figure card, caption left, cURL illustration right. */
export default function BuildYourOwn({ className = '' }) {
  return (
    <section className={`grid gap-6 rounded-usp border border-dashed border-tint-lilac-line bg-lightest p-6 sm:p-[72px] lg:grid-cols-[383px_575px] ${className}`}>
      <div className="lg:pr-16">
        <h2 className="max-w-[320px] font-serif text-[26px] font-normal leading-[28.6px] tracking-[-0.26px] sm:text-monitor-h2-md">Build your own connections</h2>
        <p className="mt-6 font-sans text-[16px] font-medium leading-[22.4px] [&_a]:font-bold [&_a]:underline">
          With Tines Stories, you can easily take any action that has a defined API using an <a href="/stories/docs/actions/">HTTP request</a>. To build
          even more quickly, <a href="/stories/docs/actions/">copy a cURL command</a> and paste it into the storyboard.
        </p>
      </div>
      <CurlToTines />
    </section>
  )
}
