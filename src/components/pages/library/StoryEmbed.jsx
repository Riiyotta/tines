import { DotGrid } from '../../shared/index.js'
import InlineSvg from '../../InlineSvg.jsx'
import up from '../../../../reference/svg/pages/library-vote-icons-1.svg?raw'
import down from '../../../../reference/svg/pages/library-vote-icons-2.svg?raw'
import { storyHref } from './data.js'

/**
 * StoryEmbed (specs/pages-c.md §6.1 / §6.2): card with a dot layer, left header (icons, title, description, tools, import) and a right canvas.
 * `variant="featured"` = orange theme, 288/654 grid in the 1000 column; `variant="full"` = purple theme, 288/1014 (detail page).
 * The live canvas is a third-party iframe (library.tines.com/embedded_stories/<id>); here it is a neutral dotted placeholder.
 */
export default function StoryEmbed({ story, variant = 'featured', credit, className = '' }) {
  const full = variant === 'full'
  const t = full
    ? { card: 'bg-coll-embed-purple text-purple-65', dot: 'bg-purple-40', btn: 'bg-accent', title: 'text-purple-65' }
    : { card: 'bg-coll-embed-orange border-coll-embed-orange text-tint-orange-ink', dot: 'bg-tint-orange-dot', btn: 'bg-coll-orange-btn', title: 'text-tint-orange-ink' }
  const tools = (story.tools || '').split(',').map((x) => x.trim()).filter(Boolean)
  return (
    <section className={`relative grid gap-6 overflow-hidden rounded-[24px] border border-transparent p-4 md:grid-cols-[288px_1fr] ${full ? 'min-h-[1047px] md:min-h-[812px]' : 'min-h-[576px]'} ${t.card} ${className}`}>
      <DotGrid dotClass={t.dot} />
      <div className="relative z-[1] flex flex-col gap-6 p-4 max-md:gap-4">
        <div className="flex gap-2">
          {story.icons.map((ic, i) => (
            <span key={i} className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-surface-story-icon p-3"><img src={ic.src} alt="" className="h-full w-full object-contain" /></span>
          ))}
        </div>
        <div>
          <h3 className={`font-sans text-[24px] font-semibold leading-[27.6px] tracking-[-0.24px] sm:text-[30px] sm:leading-[34.5px] sm:tracking-[-0.6px] ${t.title}`}>
            {full ? story.name : <a href={storyHref(story)} className="hover:underline">{story.name}</a>}
          </h3>
          <p className="mt-4 font-sans text-[16px] font-medium leading-[21.6px]">
            A placeholder description of this story: what triggers it, which tools it touches, and what it hands back, summarised in a few short sentences for the clone.
          </p>
        </div>
        <div className="mt-auto">
          {tools.length > 0 && (
            <>
              <h4 className="font-mono text-[12px] font-semibold uppercase leading-[13.8px] tracking-[0.36px] opacity-60">Tools</h4>
              <p className="mt-2 font-sans text-nav font-medium leading-[19.6px]">
                {tools.map((x, i) => <span key={x}>{i ? ', ' : ''}<a href="/stories/templates/" className="hover:underline">{x}</a></span>)}
              </p>
            </>
          )}
          {credit && (
            <p className="mt-4"><span className="block font-mono text-[12px] font-semibold uppercase leading-[13.8px] tracking-[0.36px] opacity-60">{credit.label}</span><span className="font-sans text-nav font-semibold">{credit.name}</span></p>
          )}
          {full && (
            <div className="mt-4 rounded-usp bg-coll-lilac-50 p-4">
              <h4 className="font-sans text-[16px] font-semibold leading-[18.4px]">How it works</h4>
              <p className="mt-2 font-sans text-nav font-medium leading-[19.6px]">Import this story into your tenant, then adapt it to your own tools and credentials.</p>
            </div>
          )}
          <a href="https://login.tines.com/saml_idp/signup" className={`btn mt-4 text-lightest ${full ? 'w-full' : ''} ${t.btn}`}>Import</a>
        </div>
        {full && (
          <div className="-mx-4 -mb-4 flex items-center gap-3 bg-coll-lilac-80 px-[17.5px] py-[7px] font-sans text-nav font-medium">
            Was this story helpful?
            {[up, down].map((ic, i) => (
              <button key={i} type="button" aria-label={i ? 'Not helpful' : 'Helpful'} className="flex h-[31px] w-[31px] items-center justify-center rounded-[7px] transition-colors hover:text-purple-40"><InlineSvg svg={ic} className="h-5 w-5" /></button>
            ))}
          </div>
        )}
      </div>
      <div className="relative min-h-[360px] overflow-hidden rounded-[18px] bg-lightest">
        <DotGrid dotClass="bg-purple-40" opacity={0.25} />
        <p className="absolute inset-x-0 bottom-4 text-center font-sans text-nav font-medium opacity-70">Drag to pan around. Use <kbd className="font-mono text-[10.5px] font-bold">+</kbd> / <kbd className="font-mono text-[10.5px] font-bold">−</kbd> to control zoom level.</p>
        <button type="button" aria-label="Expand" className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-darkest text-lightest">⤢</button>
      </div>
    </section>
  )
}
