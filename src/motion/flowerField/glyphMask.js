// Shape helpers: the glyph / bed outline every FlowerField is planted in.
// Coordinates are "field units": the shape's own SVG units, offset by the bleed so (0,0) is the canvas corner.

export function seededRandom(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function normalizeBleed(b = 0) {
  return typeof b === 'number' ? { top: b, right: b, bottom: b, left: b } : { top: 0, right: 0, bottom: 0, left: 0, ...b }
}

/** Field geometry: total size incl. bleed + the shape as a Path2D in field units. */
export function createFieldShape({ shapePath, width, height, bleed }) {
  const b = normalizeBleed(bleed)
  const path = new Path2D()
  path.addPath(new Path2D(shapePath), new DOMMatrix([1, 0, 0, 1, b.left, b.top]))
  return { path, bleed: b, width, height, totalW: width + b.left + b.right, totalH: height + b.top + b.bottom }
}

/** Alpha mask of the shape at `scale` device px per unit, sized to the canvas. */
export function renderShapeMask(shape, canvasW, canvasH, scale, existing) {
  const c = existing ?? document.createElement('canvas')
  c.width = canvasW; c.height = canvasH
  const ctx = c.getContext('2d')
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  ctx.fill(shape.path)
  return c
}

/** Point-in-shape test (rasterised at 2px/unit, alpha >= 50%). */
export function createHitTest(shape) {
  const w = Math.max(1, Math.ceil(shape.totalW * 2)), h = Math.max(1, Math.ceil(shape.totalH * 2))
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')
  ctx.scale(2, 2); ctx.fill(shape.path)
  const data = ctx.getImageData(0, 0, w, h).data
  return (x, y) => {
    const px = Math.floor(x * 2), py = Math.floor(y * 2)
    return px >= 0 && py >= 0 && px < w && py < h && data[(py * w + px) * 4 + 3] >= 128
  }
}

/**
 * Simple procedural planting for fields without a baked layout (monitor wall / solution bed / CTA wordmark).
 * Multi-pass jittered grid from large to small cells; a flower is accepted when its centre is inside the
 * shape and (for edge flowers) its radius mostly is. Returns rows in the baked format:
 *   [x, y, size, variant, familyIndex, flags]
 */
export function plantFlowers({ shape, naturalSizes, sizeScale = 1, coverage = 0.7, seed = 1, families = ['default'], familyWeights }) {
  const hit = createHitTest(shape)
  const rand = seededRandom(seed)
  const order = naturalSizes.map((_, i) => i).sort((a, b) => naturalSizes[b] - naturalSizes[a])
  const rows = []
  const famRoll = () => {
    if (!familyWeights) return Math.floor(rand() * families.length)
    let r = rand() * familyWeights.reduce((s, w) => s + w, 0)
    for (let i = 0; i < familyWeights.length; i++) if ((r -= familyWeights[i]) <= 0) return i
    return familyWeights.length - 1
  }
  for (const cell of [230, 150, 95, 60, 40, 26]) {
    const step = cell * sizeScale * coverage
    for (let y = step / 2; y < shape.totalH; y += step) {
      for (let x = step / 2; x < shape.totalW; x += step) {
        const fx = x + (rand() - 0.5) * step, fy = y + (rand() - 0.5) * step
        if (!hit(fx, fy)) continue
        let variant = order[order.length - 1] + 1
        for (const i of order) {
          const r = naturalSizes[i] * sizeScale * 0.12
          let ok = true
          for (let k = 0; k < 8 && ok; k++) ok = hit(fx + Math.cos((k / 8) * Math.PI * 2) * r, fy + Math.sin((k / 8) * Math.PI * 2) * r)
          if (ok && rand() < 0.6) { variant = i + 1; break }
        }
        rows.push([fx, fy, naturalSizes[variant - 1] * sizeScale, variant, famRoll(), 0])
      }
    }
  }
  for (let i = rows.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [rows[i], rows[j]] = [rows[j], rows[i]] }
  return { families, flowers: rows }
}
