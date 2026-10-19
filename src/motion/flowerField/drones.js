import { createSpriteCache } from './sprites.js'

// Drone mascots + pennant banners flying over a FlowerField (measured from tines.com hero 100x):
//  - 20-frame propeller sprite at 12fps, frame offset hashed from seed; height in CSS px (78 desktop, 62.4 phone)
//  - Lissajous loop inside `region` (field units): a = 2pi*u*dir + seed; x = 0.5+0.5 sin a, y = 0.5+0.5 sin(2a+seed),
//    u = (t/loopSeconds + phase) % 1, plus a 3.5-unit bob at 0.6Hz
//  - intro: rise from 90% of the field height (or slide in from a side) with easeInOutCubic over
//    max(introSeconds, 3*distance/introMaxSpeed), settle onto the loop over introSettleSeconds, alpha fade introFadeSeconds
//  - solid ink silhouette shadow thrown 10 CSS px away from a light source above the field centre
//  - pennant banner: 700 weight mono caps, height 2*font, swallow-tail 45% of height, 1.5px stroke,
//    waving tail (amp 15% of height, 1.4 cycles, 3.2 rad/s); optional cycling between banner texts

const ACCENT_SRC = /#eaa836/gi
const INK_SRC = /#3b2570|#4f3197/gi
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const clampRange = (v, lo, hi) => (lo > hi ? (lo + hi) / 2 : v < lo ? lo : v > hi ? hi : v)
const TAU = Math.PI * 2

function drawBannerBitmap(cfg, fontPx, dpr) {
  const font = `700 ${fontPx}px ${cfg.fontFamily}`
  const side = cfg.side ?? 'right'
  const probe = document.createElement('canvas').getContext('2d')
  probe.font = font
  const label = cfg.text.toUpperCase()
  const textW = probe.measureText(label).width
  const pad = fontPx * 0.5
  const h = Math.ceil(fontPx + pad * 2)
  const tail = Math.round(0.45 * h)
  const w = Math.ceil(textW + pad * 2 + tail)
  const sw = cfg.strokeColor ? (cfg.strokeWidthPx ?? 1.5) * dpr : 0
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.ceil(w + sw)); c.height = Math.max(1, Math.ceil(h + sw))
  const ctx = c.getContext('2d')
  ctx.translate(sw / 2, sw / 2)
  ctx.beginPath()
  if (side === 'right') { ctx.moveTo(0, 0); ctx.lineTo(w, 0); ctx.lineTo(w - tail, h / 2); ctx.lineTo(w, h); ctx.lineTo(0, h) }
  else { ctx.moveTo(w, 0); ctx.lineTo(0, 0); ctx.lineTo(tail, h / 2); ctx.lineTo(0, h); ctx.lineTo(w, h) }
  ctx.closePath()
  ctx.fillStyle = cfg.background
  ctx.fill()
  if (sw > 0) { ctx.strokeStyle = cfg.strokeColor; ctx.lineWidth = sw; ctx.lineJoin = 'round'; ctx.stroke() }
  ctx.font = font
  ctx.fillStyle = cfg.textColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(label, side === 'right' ? (w - tail) / 2 : (w + tail) / 2, h / 2 + 0.04 * fontPx)
  return { canvas: c, fontPx }
}

function loopPosition(cfg, u) {
  const { region } = cfg
  const seed = cfg.seed ?? 0
  const a = TAU * u * (Math.sin(seed * 12.9898) > 0 ? 1 : -1) + seed
  return { x: region.x + region.w * (0.5 + 0.5 * Math.sin(a)), y: region.y + region.h * (0.5 + 0.5 * Math.sin(2 * a + seed)) }
}

/**
 * @param {object[]} configs drone configs (see configs/hundredx.js)
 * @param {string[]} frames  20 SVG frame strings
 */
export function createDroneFleet(configs, frames) {
  const sprites = createSpriteCache()
  const drones = configs.map((cfg, i) => {
    const recolored = frames.map((svg) => svg.replace(ACCENT_SRC, cfg.accentColor ?? '#eaa836').replace(INK_SRC, cfg.inkColor ?? '#3b2570'))
    const keys = recolored.map((svg, f) => { const k = `d${i}:${f}`; sprites.want(k, () => svg); return k })
    const banners = (cfg.bannerCycle?.length ? cfg.bannerCycle : cfg.banner ? [cfg.banner] : []).map((b) => ({ cfg: b, bitmap: null }))
    const frameOffset = Math.floor(((Math.abs(43758.5453 * Math.sin((cfg.seed ?? 0) * 12.9898)) % 1) * frames.length))
    return { cfg, keys, banners, frameOffset, rasterH: 0, frameCanvases: [], shadowCanvases: [] }
  })

  const buildRasters = (d, w, h) => {
    d.frameCanvases = d.keys.map((k) => sprites.get(k, w, h))
    d.shadowCanvases = d.frameCanvases.map((src) => {
      if (!src) return null
      const c = document.createElement('canvas')
      c.width = w; c.height = h
      const ctx = c.getContext('2d')
      ctx.drawImage(src, 0, 0)
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillStyle = d.cfg.shadowColor ?? 'rgba(40, 24, 74, 0.22)'
      ctx.fillRect(0, 0, w, h)
      return c
    })
    d.rasterH = h
  }

  const invalidateBanners = () => { for (const d of drones) for (const b of d.banners) b.bitmap = null }
  if (document.fonts?.ready) document.fonts.ready.then(invalidateBanners)

  return {
    ready: () => drones.every((d) => sprites.allReady(d.keys)),

    /**
     * @param ctx   main 2d context (identity transform)
     * @param t     seconds since the field started
     * @param unit  device px per field unit
     * @param dpr   effective device pixel ratio (drone + banner sizes are CSS px)
     * @param field { totalW, totalH }
     * @param still reduced-motion static pose
     */
    draw(ctx, t, unit, dpr, field, still) {
      const W = field.totalW, H = field.totalH
      for (const d of drones) {
        const { cfg } = d
        const hPx = Math.max(1, Math.round((cfg.heightPx ?? 78) * dpr))
        const wPx = Math.max(1, Math.round(hPx * (cfg.frameWidth / cfg.frameHeight)))
        if (d.rasterH !== hPx || d.frameCanvases.some((c) => !c)) buildRasters(d, wPx, hPx)

        const u = still ? (cfg.phase ?? 0) % 1 : (t / (cfg.loopSeconds ?? 14) + (cfg.phase ?? 0)) % 1
        const loop = loopPosition(cfg, u)
        const flip = cfg.flipX ?? false
        const bob = still ? 0 : (cfg.bobUnits ?? 3.5) * Math.sin(0.6 * TAU * t + (cfg.seed ?? 0))

        let banner = null
        if (d.banners.length) {
          const every = cfg.bannerCycleSeconds ?? 6
          const idx = d.banners.length === 1 ? 0
            : ((still ? 0 : Math.floor(Math.max(0, t - (cfg.bannerCycleDelaySeconds ?? 0)) / every)) + (cfg.bannerCycleOffset ?? 0)) % d.banners.length
          banner = d.banners[idx]
          for (const b of d.banners) {
            const fontPx = (b.cfg.fontSizePx ?? 12) * dpr
            if (!b.bitmap || b.bitmap.fontPx !== fontPx) b.bitmap = drawBannerBitmap(b.cfg, fontPx, dpr)
          }
        }

        // keep drone + its widest banner inside the field
        const halfW = wPx / unit / 2, halfH = hPx / unit / 2, gap = 0.22 * wPx
        let leftExt = 0, rightExt = 0, bannerHalfH = 0
        for (const b of d.banners) {
          if (!b.bitmap) continue
          const ext = (gap + b.bitmap.canvas.width) / unit
          if ((b.cfg.side ?? 'right') === 'left') leftExt = Math.max(leftExt, ext); else rightExt = Math.max(rightExt, ext)
          bannerHalfH = Math.max(bannerHalfH, b.bitmap.canvas.height / unit / 2)
        }
        const inset = cfg.clampInsetX ?? 0
        const minX = inset + halfW + leftExt, maxX = W - inset - halfW - rightExt
        const vy = Math.max(halfH, bannerHalfH)
        const px = clampRange(loop.x, minX, maxX)
        const py = clampRange(loop.y + bob, vy, H - vy)

        let x = px, y = py, alpha = 1
        const introS = cfg.introSeconds ?? 0
        const local = t - (cfg.introDelaySeconds ?? 0)
        if (!still && introS > 0) {
          const tx = cfg.introTargetXFraction != null
            ? clampRange(inset + (W - 2 * inset) * cfg.introTargetXFraction, inset + halfW, W - inset - halfW)
            : clampRange(cfg.region.x + cfg.region.w / 2, minX, maxX)
          const ty = clampRange(cfg.introTargetYFraction != null ? H * cfg.introTargetYFraction : cfg.region.y + cfg.region.h / 2, vy, H - vy)
          const from = cfg.introFrom ?? 'bottom'
          let sx = tx, sy
          if (from === 'bottom') sy = cfg.introStartYFraction != null ? H * cfg.introStartYFraction : H + 2 * vy
          else { sx = from === 'left' ? -2 * halfW : W + 2 * halfW; sy = ty }
          const speed = cfg.introMaxSpeed ?? 0
          const dur = speed > 0 ? Math.max(introS, (3 * Math.hypot(tx - sx, ty - sy)) / speed) : introS
          const k = easeInOutCubic(clamp01(local / dur))
          const ix = sx + (tx - sx) * k, iy = sy + (ty - sy) * k
          const settle = cfg.introSettleSeconds ?? 1.2
          const s = easeInOutCubic(settle > 0 ? clamp01((local - dur) / settle) : 1)
          x = ix + (px - ix) * s
          y = iy + (py - iy) * s
          alpha = clamp01(local / (cfg.introFadeSeconds ?? 0.35))
        }
        if (alpha <= 0) continue

        const prevAlpha = ctx.globalAlpha
        if (alpha < 1) ctx.globalAlpha = prevAlpha * alpha

        if (banner?.bitmap) {
          const bmp = banner.bitmap.canvas, bw = bmp.width, bh = bmp.height
          const side = banner.cfg.side ?? 'right'
          const cx = x * unit, top = y * unit - bh / 2
          const left = side === 'right' ? cx + gap : cx - gap - bw
          const amp = still ? 0 : (banner.cfg.waveAmpFraction ?? 0.22) * bh
          const freq = banner.cfg.waveFreq ?? 1.4, speed = banner.cfg.waveSpeed ?? 3.2
          const step = Math.max(1, Math.ceil(bw / 240))
          for (let col = 0; col < bw; col += step) {
            const cw = Math.min(step + 1, bw - col)
            const f = col / bw
            const off = amp * (side === 'right' ? f : 1 - f) * Math.sin(TAU * freq * f - speed * t)
            ctx.drawImage(bmp, col, 0, cw, bh, left + col, top + off, cw, bh)
          }
        }

        const fi = still ? 0 : (Math.floor(t * (cfg.fps ?? 12)) + d.frameOffset) % d.frameCanvases.length
        const frame = d.frameCanvases[fi] ?? d.frameCanvases.find(Boolean)
        if (frame) {
          const shadow = d.shadowCanvases[fi] ?? d.shadowCanvases.find(Boolean)
          if (shadow) {
            const lx = x - W / 2, ly = y + 0.45 * W
            const len = Math.hypot(lx, ly) || 1
            const throwPx = (cfg.shadowThrowPx ?? 10) * dpr
            ctx.save()
            ctx.translate(x * unit + (lx / len) * throwPx, y * unit + (ly / len) * throwPx)
            if (flip) ctx.scale(-1, 1)
            ctx.drawImage(shadow, -wPx / 2, -hPx / 2, wPx, hPx)
            ctx.restore()
          }
          ctx.save()
          ctx.translate(x * unit, y * unit)
          if (flip) ctx.scale(-1, 1)
          ctx.drawImage(frame, -wPx / 2, -hPx / 2, wPx, hPx)
          ctx.restore()
        }
        ctx.globalAlpha = prevAlpha
      }
    },
  }
}
