import { tileTone } from './data.js'

/**
 * WhatsNewCard (specs/pages-c.md §5.1 / §5.2). `variant="compact"`: grid `56px 1fr` gap 24; `full`: adds a 28px contributor avatar column.
 * Tile 56 r 12 border tinted per category; H3 Reckless 22/27.5 (390: Roobert 16/19.2); meta row = categories 600, "|", time 500.
 */
export default function WhatsNewCard({ e, variant = 'compact', className = '' }) {
  return (
    <a
      href={e.href}
      className={`group grid items-start gap-4 sm:gap-6 ${variant === 'full' ? 'grid-cols-[42px_1fr] sm:grid-cols-[56px_1fr_28px]' : 'grid-cols-[42px_1fr] sm:grid-cols-[56px_1fr]'} ${className}`}
    >
      <span className={`flex h-[42px] w-[42px] sm:h-14 sm:w-14 items-center justify-center rounded-[12px] border ${tileTone(e.categories)}`}>
        <img src={e.icon} alt="" className="max-w-[75%]" />
      </span>
      <div className="min-w-0">
        <h3 className="mb-1 font-sans text-[16px] font-semibold leading-[19.2px] group-hover:underline sm:font-serif sm:text-card-title-serif sm:font-normal">{e.title}</h3>
        <p className="flex flex-wrap items-baseline gap-x-1 font-sans text-nav">
          <span className="font-semibold">{e.categories}</span>
          <span className="font-normal">|</span>
          <time className="font-medium">{e.date}</time>
        </p>
      </div>
      {variant === 'full' && (
        <span className="hidden h-7 w-7 overflow-hidden rounded-full border border-lightest bg-purple-45 sm:block">
          <img src={e.avatar} alt="" className="h-full w-full object-cover" />
        </span>
      )}
    </a>
  )
}
