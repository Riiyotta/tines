// Flower recolouring + palette selection for the FlowerField engine.
//
// Behaviour measured from tines.com's FlowerField (hero 100x wordmark):
//  - every stroke is re-inked to purple60 (#6741bf)
//  - fills are classified by their OKLab lightness (per-variant table in flower-palette.json):
//      "default"/"altcenter": fills darker than L 0.78 are lifted toward white, lighter fills keep their colour
//      solid families (purple/green/orange/pink/lime/yellow/red): dark fills (L < 0.54) -> ink, the rest -> one flat tint
//      ramp families (teal/magenta/sky/blue): dark fills -> ink (65% of variants), the rest -> nearest ramp step to L (min 0.816)
//  - recolour waves pick a "palette group" (weighted), then each flower draws a family: 5x weight inside the group, 0.25 outside

export const INK = '#6741bf' // purple60

export const FLOWER_FAMILIES = ['purple', 'green', 'orange', 'pink', 'teal', 'magenta', 'sky', 'blue', 'yellow', 'lime', 'red']

// Weighted palette groups used by click + auto recolour waves (index === PALETTE_GROUPS.length => "restore initial")
export const PALETTE_GROUPS = [
  { families: ['red', 'orange', 'yellow'], weight: 3 },
  { families: ['orange', 'yellow', 'lime'], weight: 3 },
  { families: ['purple', 'pink', 'orange', 'yellow'], weight: 2.5 },
  { families: ['purple', 'magenta', 'pink'], weight: 2 },
  { families: ['blue', 'purple', 'magenta'], weight: 1 },
  { families: ['lime', 'green', 'teal'], weight: 1 },
  { families: ['teal', 'sky', 'blue'], weight: 0.7 },
  { families: ['blue', 'green', 'teal', 'sky'], weight: 0.7 },
]
export const RESTORE_GROUP = PALETTE_GROUPS.length
const RESTORE_WEIGHT = 2.5

const LIGHTNESS_BIAS = { yellow: 0.06, lime: 0.06 }

function fnv(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return (h >>> 0) / 4294967296
}

function lift(hex, l) {
  if (l >= 0.78) return hex
  const k = (0.78 - l) / (1 - l)
  const n = parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => Math.max(0, Math.min(255, Math.round(c + (255 - c) * k))))
  return '#' + ch.map((c) => c.toString(16).padStart(2, '0')).join('')
}

function nearestRamp(ramp, l) {
  let best = ramp[0], d = Infinity
  for (const step of ramp) { const dd = Math.abs(step[0] - l); if (dd < d) { d = dd; best = step } }
  return best[1]
}

/** Returns the SVG text for `variant` (1-based) recoloured into `family`. */
export function recolorFlowerSvg(svg, variant, family, palette) {
  const table = new Map(palette.variantColors[variant - 1].map(([hex, l]) => [hex, l]))
  const solid = palette.solid[family]
  const ramp = solid ? null : palette.ramps[family]
  const isDefault = family === 'default' || family === 'altcenter'
  const keepDark = !!ramp && fnv(`${variant}:${family}`) < 0.35
  const mapFill = (hex) => {
    const key = hex.toLowerCase()
    if (family === 'altcenter' && key === '#e5eee7') return INK
    const l = table.get(key)
    if (l == null) return hex
    if (isDefault) return lift(key, l)
    if (l < 0.54 && (!keepDark || solid)) return INK
    if (solid) return solid
    if (ramp) return nearestRamp(ramp, Math.max(0.816, Math.min(1, l + (LIGHTNESS_BIAS[family] ?? 0))))
    return hex
  }
  return svg
    .replace(/(stroke\s*[:=]\s*["']?)#[0-9a-fA-F]{3,6}/g, (_, p) => p + INK)
    .replace(/(fill\s*[:=]\s*["']?)(#[0-9a-fA-F]{6})/g, (_, p, hex) => p + mapFill(hex))
}

/** Normalises stroke widths so on-screen line weight stays constant when a sprite is drawn larger/smaller (reference 2). */
export function scaleStrokes(svg, strokeScale = 1) {
  const w = 2 / strokeScale
  return svg.replace(/(stroke-width\s*[:=]\s*["']?)[\d.]+/g, (_, p) => p + w)
}

export function groupWeights(families) {
  const w = {}
  for (const f of FLOWER_FAMILIES) w[f] = families.includes(f) ? 5 : 0.25
  return w
}

export function pickFamily(roll, weights, exclude) {
  const list = exclude ? FLOWER_FAMILIES.filter((f) => f !== exclude) : FLOWER_FAMILIES
  let r = roll * list.reduce((s, f) => s + (weights[f] ?? 0), 0)
  for (const f of list) if ((r -= weights[f] ?? 0) <= 0) return f
  return list[list.length - 1]
}

export function pickGroup(last, includeRestore, rand = Math.random) {
  const n = PALETTE_GROUPS.length + (includeRestore ? 1 : 0)
  const wOf = (i) => (i === RESTORE_GROUP ? RESTORE_WEIGHT : PALETTE_GROUPS[i].weight)
  let total = 0
  for (let i = 0; i < n; i++) if (i !== last) total += wOf(i)
  let r = rand() * total
  for (let i = 0; i < n; i++) if (i !== last && (r -= wOf(i)) <= 0) return i
  return last === 0 ? 1 : 0
}

export function waveWeightsFor(group) {
  return group === RESTORE_GROUP ? null : groupWeights(PALETTE_GROUPS[group].families)
}
