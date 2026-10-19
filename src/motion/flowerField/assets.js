// Shared, memoised loaders for FlowerField art (public/assets/canvas-art/). Every canvas on the page
// (hero 100x, monitor wall, solution bed, "Start today" wordmark) reuses the same fetched SVG text.

export const ART_BASE = '/assets/canvas-art'

export const SPECIAL_NAMES = ['sprout', 'lotus', 'fruits', 'leaves', 'plant', 'dandelion', 'autumn-leaf']
export const FLOWER_VARIANT_COUNT = 29
export const DRONE_FRAME_COUNT = 20

const memo = new Map()
function once(key, fn) {
  if (!memo.has(key)) memo.set(key, fn().catch((err) => { memo.delete(key); throw err }))
  return memo.get(key)
}

const fetchOk = (url) => fetch(url).then((r) => { if (!r.ok) throw new Error(`${url}: ${r.status}`); return r })
// one retry: ~56 small art files are requested in parallel on first paint
const fetchRetry = (url) => fetchOk(url).catch(() => new Promise((res) => setTimeout(res, 300)).then(() => fetchOk(url)))
const text = (url) => fetchRetry(url).then((r) => r.text())
export const loadJson = (url) => once(`json:${url}`, () => fetchRetry(url).then((r) => r.json()))

/** { palette, flowers: string[29], specials: [{ svg, width, height, scale, swayMax, nudgeMaxPx, pressScale, layer }] } */
export function loadFlowerArt() {
  return once('flower-art', async () => {
    const palette = await loadJson(`${ART_BASE}/flower-palette.json`)
    const flowers = await Promise.all(
      Array.from({ length: FLOWER_VARIANT_COUNT }, (_, i) => text(`${ART_BASE}/flowers/flower-${String(i + 1).padStart(2, '0')}.svg`)),
    )
    const specials = await Promise.all(palette.specials.map(async (s) => ({ ...s, svg: await text(`${ART_BASE}/${s.file}`) })))
    return { palette, flowers, specials }
  })
}

/** 20 SVG frames of the propeller drone mascot (400x300 viewBox). */
export function loadDroneFrames() {
  return once('drone-frames', () =>
    Promise.all(Array.from({ length: DRONE_FRAME_COUNT }, (_, i) => text(`${ART_BASE}/drone/drone-${String(i).padStart(2, '0')}.svg`))),
  )
}

/** SVG text -> decoded <img>. Adds width/height when only a viewBox is present (needed for Firefox rasterisation). */
export function svgToImage(svg) {
  const fixed = svg.replace(/<svg\b([^>]*)>/, (m, attrs) => {
    if (/\bwidth\s*=/.test(attrs) && /\bheight\s*=/.test(attrs)) return m
    const vb = attrs.match(/viewBox\s*=\s*["']\s*[-\d.]+\s+[-\d.]+\s+([-\d.]+)\s+([-\d.]+)/)
    return vb ? `<svg width="${vb[1]}" height="${vb[2]}"${attrs}>` : m
  })
  const url = URL.createObjectURL(new Blob([fixed], { type: 'image/svg+xml' }))
  const img = new Image()
  img.decoding = 'async'
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const done = () => { URL.revokeObjectURL(url); resolve(img) }
      img.decode ? img.decode().then(done, done) : done()
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('svg decode failed')) }
    img.src = url
  })
}
