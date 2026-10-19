/**
 * StoryCard (LibraryStoryCard) + DotGrid. Implements specs/pages-c.md §2.7.
 * Card: <a> flex column space-between, relative, overflow hidden, border 1px transparent; hover border theme-text@40% + brightness(1.03) (.15s).
 *  lg: pad 24 gap 16 r 24 (485x280 library / 360x280 templates); sm: pad 27 gap 18 r 12 (blog in-article 402x236).
 *  Themes green/purple/orange/pink: bg = hue@10% (surface.story-*), dots + text per the table. Icons row: gap 8 (9 sm), mb 16, each 44px circle bg lightest@.5
 *  holding a 24px logo/emoji. Body gap 9.6 (10.8 sm): name Roobert 600 22/26.4; description (lg only) 500 14/18.9 clamp 2; tools 600 14/18.2 @ .8 with strong "Tools:" ;
 *  optional "By <strong>Name</strong>" 500 14/18.2.
 * DotGrid: absolute inset-1px @ .3 opacity; child filled with the dot colour, masked by a 24px SVG dot (r 1) -- also used on StoryEmbed / CurlToTines (opacity .6 pink).
 * Props: theme, size, href, name, description, tools (string), by, icons ([{src, alt}]), className.
 */
const THEME = {
  green: { bg: 'bg-surface-story-green', dot: 'bg-tint-green-dot', text: 'text-tint-green-ink', hover: 'hover:border-[rgb(0_105_59_/_0.4)]' },
  purple: { bg: 'bg-surface-story-purple', dot: 'bg-tint-lilac-edge', text: 'text-purple-65', hover: 'hover:border-[rgb(93_56_174_/_0.4)]' },
  orange: { bg: 'bg-surface-story-orange', dot: 'bg-tint-orange-dot', text: 'text-tint-orange-ink', hover: 'hover:border-[rgb(157_62_0_/_0.4)]' },
  pink: { bg: 'bg-surface-story-pink', dot: 'bg-tint-pink-dot', text: 'text-pink-65', hover: 'hover:border-[rgb(156_36_100_/_0.4)]' },
}
const DOT_MASK = "url(\"data:image/svg+xml,<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='1' fill='black'/></svg>\")"

export function DotGrid({ dotClass = 'bg-tint-lilac-edge', opacity = 0.3, className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-px ${className}`} style={{ opacity }}>
      <div className={`h-full w-full ${dotClass}`} style={{ WebkitMaskImage: DOT_MASK, maskImage: DOT_MASK, WebkitMaskSize: '24px 24px', maskSize: '24px 24px' }} />
    </div>
  )
}

export function StoryCard({ theme = 'purple', size = 'lg', href = '#', name, description, tools, by, icons = [], className = '' }) {
  const t = THEME[theme] || THEME.purple
  const sm = size === 'sm'
  return (
    <a
      href={href}
      className={`relative flex flex-col justify-between overflow-hidden border border-transparent transition-[filter,border-color] duration-150 hover:brightness-[1.03] ${t.bg} ${t.text} ${t.hover} ${sm ? 'gap-[18px] rounded-[12px] p-[27px]' : 'gap-4 rounded-[24px] p-6'} ${className}`}
    >
      <DotGrid dotClass={t.dot} />
      <div className="relative">
        <div className={`mb-4 flex ${sm ? 'gap-[9px]' : 'gap-2'}`}>
          {icons.map((ic, i) => (
            <span key={i} className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-story-icon">
              {ic.src ? <img src={ic.src} alt={ic.alt || ''} className="h-6 w-6 object-contain" /> : <span className="text-[20px]">{ic.emoji}</span>}
            </span>
          ))}
        </div>
      </div>
      <div className={`relative flex flex-col ${sm ? 'gap-[10.8px]' : 'gap-[9.6px]'}`}>
        <h3 className="font-sans text-[22px] font-semibold leading-[26.4px]">{name}</h3>
        {!sm && description && <p className="line-clamp-2 font-sans text-[14px] font-medium leading-[18.9px]">{description}</p>}
        {tools && <p className={`font-sans text-[14px] font-semibold leading-[18.2px] opacity-80 ${sm ? '' : 'line-clamp-2'}`}><strong className="font-black">Tools:</strong> {tools}</p>}
        {by && <p className="font-sans text-[14px] font-medium leading-[18.2px]">By <strong className="font-bold">{by}</strong></p>}
      </div>
    </a>
  )
}
