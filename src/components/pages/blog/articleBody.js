// Placeholder article bodies matching the element counts in specs/pages-c.md §4.3 (original copy, not transcribed).
import { words, title } from '../placeholder.js'
import { stories, storyProps } from '../library/data.js'

const p = (n, seed) => ({ t: 'p', text: words(n, seed) })
const h2 = (seed) => ({ t: 'h2', text: title(4, seed) })
const h3 = (seed) => ({ t: 'h3', text: title(5, seed) })
const ul = (seed, nested) => ({ t: 'ul', items: [words(9, seed), words(11, seed + 1), words(8, seed + 2)], nested: nested ? [words(6, seed + 3), words(7, seed + 4)] : null })
const callout = (seed) => ({ t: 'callout', text: words(30, seed) })
const tint = (seed, tone = 'purple') => ({ t: 'tint', tone, heading: 'Further reading:', links: [title(5, seed), title(6, seed + 1), title(4, seed + 2)] })
const grid = (seed, ids) => ({ t: 'grid', title: ids.length > 1 ? 'Library examples' : 'Library example', stories: ids })

// Long body: 30 p, 7 h2, 16 h3, 12 ul, 4 callouts, 3 tinted blocks, 5 story grids holding 6 cards, ~1,870 words.
export function longBody() {
  const out = []
  let s = 3
  const h3Plan = [2, 2, 2, 2, 3]
  let h3n = 0
  h3Plan.forEach((count, i) => {
    out.push(h2(s++), p(38, s++), p(30, s++))
    for (let k = 0; k < count; k++) {
      out.push(h3(s++), p(32, s++))
      if (h3n < 11) out.push(ul(s++, h3n === 4))
      h3n++
    }
    if (i === 4) out.push(ul(s++))
    if (i < 4) out.push(callout(s++))
    out.push(grid(s++, i === 3 ? [0, 2] : [i + 1]))
    if (i === 1 || i === 3) out.push(tint(s++))
    if (i === 4) out.push(p(40, s++), tint(s++, 'green'))
  })
  return out
}

// Short body: 8 p, 1 ul, 3 video figures, ~320 words.
export function shortBody() {
  const items = ['Application security', 'Cloud security', 'IT service delivery', 'Governance and risk', 'Network security', 'Infrastructure', 'Identity and access', 'Threat intelligence', 'App management', 'Incident response', 'Vulnerability work', 'Data loss prevention']
  return [p(58, 31), { t: 'ul', items, nested: null }, { ...p(40, 32), gap: 18 }, { t: 'video' }, p(28, 33), p(28, 34), { t: 'video' }, p(48, 35), { t: 'video' }, { t: 'spacer', h: 233 }]
}

export function genericBody(seed = 7) {
  return [p(50, seed), p(60, seed + 1), h2(seed + 2), p(60, seed + 3), ul(seed + 4), p(50, seed + 5), callout(seed + 6), p(55, seed + 7)]
}

export const gridStories = (ids) => ids.map((i) => storyProps(stories[i % stories.length], i))
