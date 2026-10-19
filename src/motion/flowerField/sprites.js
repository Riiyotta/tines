import { svgToImage } from './assets.js'

/**
 * Lazy SVG -> bitmap sprite cache.
 *  - `want(key, makeSvg)` starts decoding an SVG (once per key).
 *  - `get(key, sidePx)` returns a square-ish raster canvas once decoded (re-rasterised when the size changes), else null.
 *  - `allReady(keys)` true once every listed key decoded (or failed).
 *  - `rasterize(keys, budgetMs)` pre-rasterises within a time budget (keeps the first animated frame jank-free).
 */
export function createSpriteCache() {
  const images = new Map() // key -> HTMLImageElement | 'loading' | 'error'
  const rasters = new Map() // key -> { canvas, w, h }
  const makers = new Map()

  const want = (key, makeSvg) => {
    if (images.has(key)) return
    makers.set(key, makeSvg)
    images.set(key, 'loading')
    svgToImage(makeSvg()).then(
      (img) => images.set(key, img),
      () => images.set(key, 'error'),
    )
  }

  const raster = (key, w, h) => {
    const img = images.get(key)
    if (!img || typeof img === 'string') return null
    const r = rasters.get(key)
    if (r && r.w === w && r.h === h) return r.canvas
    const c = document.createElement('canvas')
    c.width = Math.max(1, w); c.height = Math.max(1, h)
    const ctx = c.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(img, 0, 0, c.width, c.height)
    rasters.set(key, { canvas: c, w, h })
    return c
  }

  return {
    want,
    has: (key) => images.has(key),
    get: (key, w, h = w) => raster(key, w, h),
    isReady: (key) => { const v = images.get(key); return !!v && v !== 'loading' },
    allReady(keys) {
      for (const k of keys) { const v = images.get(k); if (!v || v === 'loading') return false }
      return true
    },
    rasterize(entries, budgetMs = 6) {
      const end = performance.now() + budgetMs
      for (const [key, w, h] of entries) {
        const r = rasters.get(key)
        if (r && r.w === w && r.h === (h ?? w)) continue
        raster(key, w, h ?? w)
        if (performance.now() >= end) return false
      }
      return true
    },
    clearRasters: () => rasters.clear(),
  }
}
