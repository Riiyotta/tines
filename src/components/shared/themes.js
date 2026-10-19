/**
 * Item colour themes shared by events, webinars, case studies, library, university cards and QuoteCard.
 * Implements specs/pages-c.md §2.10 "Shared colour themes per item". Values are Tailwind class strings (tokens from
 * tailwind.config.cjs: purple/green/orange/pink/teal/blue scales and the `tint` one-off group) so Tailwind's scanner sees them.
 *
 *   soft    card background              line    1px border colour
 *   lineHover hovered border             dark    strong / heading ink
 *   ink     secondary ink                mid     saturated "book" / date-pill background
 */
export const THEMES = {
  purple: { soft: 'bg-purple-5', line: 'border-purple-10', lineAlt: 'border-tint-lilac-line', lineHover: 'hover:border-tint-lilac-line', dark: 'text-purple-80', ink: 'text-purple-70', mid: 'bg-purple-50', midText: 'text-purple-5' },
  green: { soft: 'bg-green-5', line: 'border-green-10', lineAlt: 'border-green-20', lineHover: 'hover:border-green-20', dark: 'text-tint-green-ink-dk', ink: 'text-tint-green-ink', mid: 'bg-tint-green-book', midText: 'text-green-5' },
  orange: { soft: 'bg-tint-peach', line: 'border-tint-peach-mid', lineAlt: 'border-tint-peach-line', lineHover: 'hover:border-tint-peach-hover', dark: 'text-orange-80', ink: 'text-orange-70', mid: 'bg-orange-50', midText: 'text-tint-peach' },
  pink: { soft: 'bg-tint-rose', line: 'border-tint-rose-mid', lineAlt: 'border-tint-rose-line', lineHover: 'hover:border-tint-rose-line', dark: 'text-pink-70', ink: 'text-pink-65', mid: 'bg-pink-50', midText: 'text-tint-rose' },
  teal: { soft: 'bg-teal-5', line: 'border-teal-5', lineAlt: 'border-teal-5', lineHover: '', dark: 'text-teal-70', ink: 'text-teal-70', mid: 'bg-teal-70', midText: 'text-teal-5' },
  blue: { soft: 'bg-blue-5', line: 'border-blue-5', lineAlt: 'border-blue-5', lineHover: '', dark: 'text-blue-70', ink: 'text-blue-70', mid: 'bg-blue-70', midText: 'text-blue-5' },
}

export const themeNames = Object.keys(THEMES)
export const getTheme = (name) => THEMES[name] || THEMES.purple
