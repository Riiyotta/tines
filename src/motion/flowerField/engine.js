import { createSpriteCache } from './sprites.js'
import { createFieldShape, renderShapeMask, seededRandom } from './glyphMask.js'
import { createDroneFleet } from './drones.js'
import {
  recolorFlowerSvg, scaleStrokes, pickFamily, pickGroup, waveWeightsFor, RESTORE_GROUP,
} from './palette.js'

// FlowerField canvas engine (own implementation of the behaviour measured on tines.com):
//
//  intro    each flower blooms after delay = normalised distance from introOrigin * sweepDuration;
//           bloom = easeOutCubic scale over bloomDuration while unwinding a +-120deg spin
//  idle     two-sine sway (5-17deg, 0.5-1.2 rad/s; specials capped by swayMax)
//  pointer  move: flowers within 38 CSS px (+ their radius) get excited (sway x3) and nudged along the
//           pointer direction (<= nudgeMaxPx, 8 CSS px), decaying over 0.85s;
//           press (primary button): recolour ripple (range 70 units, 0.45s to the edge) + squish (0.6s),
//           dragging while pressed emits a new ripple every 35 units
//  auto     after the intro, a recolour wave every 4s +-1s jitter sweeps the whole field in 2.4s
//  palette  family crossfade 0.2s
//  frame    DPR = min(devicePixelRatio, 1.8) (Safari 1.5 / Firefox 1 above 0.5MP), 60fps gate,
//           IntersectionObserver (threshold 0, rootMargin "50% 0px") start/stop, pauses on hidden tab,
//           prefers-reduced-motion: one static, fully bloomed frame and no pointer response

const DEFAULT_NUDGE_MAX_PX = 8
const SPIN_MAX = (120 * Math.PI) / 180
const SWAY_MIN = (5 * Math.PI) / 180
const SWAY_MAX = (17 * Math.PI) / 180
const POINTER_RADIUS_PX = 38
const PRESS_SECONDS = 0.6
const FADE_SECONDS = 0.2
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

export function effectiveDpr(cssW, cssH) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.8)
  if (cssW * cssH > 5e5) {
    if (navigator.userAgent.includes('Firefox/')) return 1
    if (navigator.vendor?.startsWith('Apple')) return Math.min(dpr, 1.5)
  }
  return dpr
}

function frameGate(fps = 60) {
  const interval = 1000 / fps
  let last = -Infinity
  return (now) => {
    const d = now - last
    if (d < interval - 2) return false
    last = Number.isFinite(d) && d >= interval ? now - (d % interval) : now
    return true
  }
}

// pointer influence: 1 inside 35% of the radius, smoothstep to 0 at radius * reach (sharper for fast flicks)
function influence(dist, radius, reach) {
  const outer = radius * reach
  if (dist >= outer) return 0
  const inner = 0.35 * radius * Math.min(1, reach)
  if (dist <= inner) return 1
  const s = 1 - (dist - inner) / (outer - inner)
  const sm = s * s * (3 - 2 * s)
  const pow = 1 + 1.6 * Math.max(0, reach - 1)
  return pow === 1 ? sm : sm ** pow
}

function pointerTracker() {
  let lx = 0, ly = 0, lt = 0, has = false, speed = 0
  return {
    track(x, y, time, cssPerUnit) {
      let dx = 0, dy = 0, movedPx = 0, dt = 0
      if (has) {
        const ex = x - lx, ey = y - ly, d = Math.hypot(ex, ey)
        if (d > 0) { dx = ex / d; dy = ey / d }
        movedPx = cssPerUnit > 0 ? d * cssPerUnit : 0
        dt = Math.min(Math.max((time - lt) / 1000, 1 / 240), 0.2)
      }
      lx = x; ly = y; lt = time; has = true
      if (dt > 0) speed += (movedPx / dt - speed) * (1 - Math.exp(-dt / 0.12))
      const f = Math.sqrt(clamp01(speed / 450))
      return { dx, dy, impulse: clamp01(movedPx / 8), reach: 0.25 + 2 * f, gesture: 0.25 + 0.75 * f }
    },
    reset() { has = false; speed = 0 },
  }
}

// Stroke normalisation: quantised (1.1^n) ratio of a flower's scale to the field's median scale.
function annotateStrokeScales(flowers, naturalSizes, specials) {
  const ratios = flowers.filter((f) => f.special < 0 && !f.pinned && !f.lifted).map((f) => f.size / naturalSizes[f.variant - 1]).sort((a, b) => a - b)
  if (!ratios.length) return
  const median = ratios[ratios.length >> 1]
  for (const f of flowers) {
    const base = f.special >= 0 ? Math.max(specials[f.special].width, specials[f.special].height) : naturalSizes[f.variant - 1]
    const r = f.size / (base * median)
    const n = Math.round(Math.log(Math.min(5, Math.max(0.4, r))) / Math.log(1.1))
    f.strokeScale = Math.round(1000 * 1.1 ** n) / 1000
  }
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {object} o  see configs/hundredx.js for a full example
 *   width, height, bleed, shapePath, clipToShape, layout {families, flowers}, art {palette, flowers, specials},
 *   sizeScale, seed, introOrigin {x,y} (fractions), sweepDuration, bloomDuration,
 *   autoRecolor {intervalSeconds, travelSeconds, jitterSeconds, includeInitialPalette} | null,
 *   manualRecolorRange, nudgeScale, drones [], droneFrames [], maxFps, onFirstFrame, onIntroComplete
 */
export function createFlowerField(canvas, o) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return { destroy() {} }
  const reduced = o.reducedMotion ?? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const shape = createFieldShape(o)
  const { totalW, totalH } = shape
  const { palette, flowers: flowerSvgs, specials } = o.art
  const naturalSizes = palette.naturalSizes
  const maxNatural = Math.max(...naturalSizes)
  const sizeScale = o.sizeScale ?? 1
  const sweep = o.sweepDuration ?? 1
  const bloom = o.bloomDuration ?? 0.5
  const range = o.manualRecolorRange ?? 70
  const nudgeScale = o.nudgeScale ?? 1
  const rand = seededRandom(o.seed ?? 1)
  const ox = (o.introOrigin?.x ?? 0) * totalW, oy = (o.introOrigin?.y ?? 0.5) * totalH
  const odx = Math.max(ox, totalW - ox), ody = Math.max(oy, totalH - oy)

  // ---- hydrate layout rows: [x, y, size, variant | -(special+1), familyIndex, flags, rotation?]
  const flowers = o.layout.flowers.map((row) => {
    const [x, y, size, v, fam, flags = 0, rot = 0] = row
    const special = v < 0 ? -v - 1 : -1
    const sp = special >= 0 ? specials[special] : null
    const family = o.layout.families[fam] ?? 'default'
    const f = {
      x, y, size, variant: special >= 0 ? 0 : v, special, lifted: (flags & 1) !== 0, bottom: sp?.layer === 'bottom',
      pinned: special < 0 && v === 29, family, shown: family, initial: family, mix: 1, lastWave: -1,
      delay: clamp01(Math.hypot((x - ox) / odx, (y - oy) / ody)) * sweep,
      nudgeMaxPx: sp?.nudgeMaxPx ?? DEFAULT_NUDGE_MAX_PX, pressScale: sp?.pressScale ?? 1,
      excite: 0, offX: 0, offY: 0, tgtX: 0, tgtY: 0, bloomed: false, strokeScale: 1,
    }
    if (special >= 0) { rand(); f.rotation = rot } else f.rotation = ((rand() - 0.5) * 30 * Math.PI) / 180
    f.spin = (rand() - 0.5) * 2 * SPIN_MAX
    f.swaySpeed = 0.5 + 0.7 * rand()
    const amp = SWAY_MIN + rand() * (SWAY_MAX - SWAY_MIN)
    f.swayAmp = sp?.swayMax != null ? Math.min(amp, (sp.swayMax * Math.PI) / 180) : amp
    f.swayOffset = rand() * Math.PI * 2
    f.swayPhase = rand() * Math.PI * 2
    return f
  })
  annotateStrokeScales(flowers, naturalSizes, specials)
  const drawOrder = [
    ...flowers.filter((f) => f.bottom),
    ...flowers.filter((f) => !f.bottom && !f.lifted),
  ]
  const liftedOrder = flowers.filter((f) => f.lifted)

  // ---- sprites
  const sprites = createSpriteCache()
  const flowerKey = (f, family) => `f${f.variant}|${family}|${f.strokeScale}`
  const specialKey = (f) => `s${f.special}|${f.strokeScale}`
  const want = (f, family) => {
    const memo = f.keys ?? (f.keys = {})
    if (memo[family]) return memo[family]
    if (f.special >= 0) {
      const k = specialKey(f)
      if (!sprites.has(k)) sprites.want(k, () => scaleStrokes(specials[f.special].svg, f.strokeScale))
      return (memo[family] = k)
    }
    const k = flowerKey(f, family)
    if (!sprites.has(k)) sprites.want(k, () => scaleStrokes(recolorFlowerSvg(flowerSvgs[f.variant - 1], f.variant, family, palette), f.strokeScale))
    return (memo[family] = k)
  }
  const initialKeys = [...new Set(flowers.map((f) => want(f, f.family)))]

  const drones = o.drones?.length && o.droneFrames?.length ? createDroneFleet(o.drones, o.droneFrames) : null

  // ---- canvas sizing
  let unit = 1, dpr = 1, flowerSide = 1, sized = false
  let layer = null, layerCtx = null, mask = null
  let clip = [0, 0, 0, 0]
  const specialSide = (f) => Math.max(1, Math.ceil(Math.max(specials[f.special].width, specials[f.special].height) * sizeScale * (specials[f.special].scale ?? 1) * unit * 1.12))
  const spriteDims = (f) => {
    if (f.special >= 0) {
      const sp = specials[f.special], side = specialSide(f), m = Math.max(sp.width, sp.height)
      return [Math.max(1, Math.round(side * (sp.width / m))), Math.max(1, Math.round(side * (sp.height / m)))]
    }
    const s = Math.max(1, Math.round(flowerSide * Math.min(1, f.strokeScale)))
    return [s, s]
  }
  const resize = () => {
    const cw = canvas.clientWidth, ch = canvas.clientHeight
    if (!cw || !ch) return false
    dpr = effectiveDpr(cw, ch)
    const w = Math.round(cw * dpr), h = Math.round(ch * dpr)
    if (sized && w === canvas.width && h === canvas.height) return false
    sized = true
    canvas.width = w; canvas.height = h
    unit = w / totalW
    flowerSide = Math.max(1, Math.ceil(maxNatural * sizeScale * 1.12 * unit))
    sprites.clearRasters()
    for (const f of flowers) { const [w, h] = spriteDims(f); f.dw = w; f.dh = h }
    if (o.clipToShape) {
      layer = layer ?? document.createElement('canvas')
      layer.width = w; layer.height = h
      layerCtx = layer.getContext('2d')
      mask = renderShapeMask(shape, w, h, unit, mask)
      const b = shape.bleed
      const x0 = Math.max(0, Math.floor(b.left * unit)), y0 = Math.max(0, Math.floor(b.top * unit))
      clip = [x0, y0, Math.min(w - x0, Math.ceil(o.width * unit) + 1), Math.min(h - y0, Math.ceil(o.height * unit) + 1)]
    }
    return true
  }

  // ---- interaction state
  const waves = [] // { x, y, start, id, weights, restore, range, speed, presses }
  let waveId = 0, lastGroup = -1, pressing = false, pressX = 0, pressY = 0
  let t0 = 0, lastNow = 0, nextAuto = 0, raf = 0, visible = true, started = false, introDone = false, destroyed = false
  const tracker = pointerTracker()
  const elapsed = () => (t0 ? (performance.now() - t0) / 1000 : 0)
  const toField = (e) => {
    const r = canvas.getBoundingClientRect()
    if (!r.width || !r.height) return null
    return { x: ((e.clientX - r.left) / r.width) * totalW, y: ((e.clientY - r.top) / r.height) * totalH }
  }
  const pushWave = (p, group, presses, r = range, speed = range / 0.45) => {
    waves.push({ x: p.x, y: p.y, start: elapsed(), id: waveId++, weights: waveWeightsFor(group), restore: group === RESTORE_GROUP, range: r, speed, presses })
  }
  let activeGroup = 0
  const onMove = (e) => {
    if (reduced || !t0) return
    const p = toField(e)
    if (!p) return
    if (pressing && Math.hypot(p.x - pressX, p.y - pressY) >= range * 0.5) {
      pressX = p.x; pressY = p.y
      pushWave(p, activeGroup, true)
    }
    const cssPerUnit = canvas.clientWidth / totalW
    const reachUnits = cssPerUnit > 0 ? POINTER_RADIUS_PX / cssPerUnit : 0
    const m = tracker.track(p.x, p.y, e.timeStamp, cssPerUnit)
    for (const f of flowers) {
      if (!f.bloomed) continue
      const k = influence(Math.hypot(f.x - p.x, f.y - p.y), reachUnits + f.size / 2, m.reach)
      if (k <= 0) continue
      f.excite = Math.max(f.excite, k * m.gesture)
      f.tgtX += m.dx * f.size * 0.1 * k * m.impulse * nudgeScale
      f.tgtY += m.dy * f.size * 0.1 * k * m.impulse * nudgeScale
      const cap = Math.min(0.3 * f.size, cssPerUnit > 0 ? f.nudgeMaxPx / cssPerUnit : 0) * nudgeScale * m.gesture
      const len = Math.hypot(f.tgtX, f.tgtY)
      if (len > cap) { f.tgtX = (f.tgtX / len) * cap; f.tgtY = (f.tgtY / len) * cap }
    }
  }
  const onDown = (e) => {
    if (reduced || !t0 || e.button !== 0) return
    const p = toField(e)
    if (!p) return
    activeGroup = lastGroup = pickGroup(lastGroup, o.autoRecolor?.includeInitialPalette ?? false)
    pressing = true; pressX = p.x; pressY = p.y
    pushWave(p, activeGroup, true)
  }
  const onUp = () => { pressing = false }
  const onLeave = () => tracker.reset()
  if (!reduced) {
    canvas.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerdown', onDown, { passive: true })
    canvas.addEventListener('pointerleave', onLeave, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  // ---- drawing
  const drawFlower = (c, f, t, dt) => {
    const p = reduced ? 1 : clamp01((t - f.delay) / bloom)
    if (p <= 0) return
    if (p >= 1) f.bloomed = true
    let squish = 1
    if (!reduced) {
      f.excite *= Math.exp(-dt / 0.5)
      f.swayPhase += f.swaySpeed * (1 + 2 * f.excite) * dt
      const decay = Math.exp(-dt / 0.85)
      f.tgtX *= decay; f.tgtY *= decay
      const follow = 1 - Math.exp(-dt / 0.3)
      f.offX += (f.tgtX - f.offX) * follow
      f.offY += (f.tgtY - f.offY) * follow
      for (const w of waves) {
        const ddx = f.x - w.x, ddy = f.y - w.y
        if (ddx * ddx + ddy * ddy > w.range * w.range) continue
        const d = Math.sqrt(ddx * ddx + ddy * ddy)
        const a = t - w.start - d / w.speed
        if (a < 0) continue
        if (f.special < 0 && w.id > f.lastWave) {
          f.lastWave = w.id
          f.shown = f.mix >= 1 ? f.family : f.shown
          f.family = w.restore ? f.initial : pickFamily(Math.random(), w.weights, f.family === 'default' ? undefined : f.family)
          f.mix = 0
        }
        if (!w.presses || a > PRESS_SECONDS) continue
        const s = a / PRESS_SECONDS, k = 1 - d / w.range
        squish -= 0.22 * f.pressScale * (k * k * (3 - 2 * k)) * Math.sin(s * Math.PI * 1.5) * (1 - s)
      }
      if (squish < 0.55) squish = 0.55
    }
    const grow = 1 - (1 - p) ** 3
    const sway = reduced ? 0 : f.swayAmp * (0.6 * Math.sin(f.swayPhase) + 0.4 * Math.sin(0.53 * f.swayPhase + f.swayOffset))
    const angle = f.rotation + f.spin * (1 - grow) + sway
    const cx = (f.x + f.offX) * unit, cy = (f.y + f.offY) * unit
    const r = f.size * unit
    if (cx + r < 0 || cx - r > canvas.width || cy + r < 0 || cy - r > canvas.height) return
    const k = grow * squish
    const side = k >= 1 ? r : Math.max(1, Math.round(r * k))
    const cos = Math.cos(angle), sin = Math.sin(angle)
    if (f.special >= 0) {
      const img = sprites.get(want(f, 'default'), f.dw, f.dh)
      if (!img) return
      const sp = specials[f.special], m = Math.max(sp.width, sp.height)
      c.setTransform(cos, sin, -sin, cos, cx, cy)
      c.drawImage(img, -(side * sp.width) / m / 2, -(side * sp.height) / m / 2, (side * sp.width) / m, (side * sp.height) / m)
      return
    }
    const sw = f.dw, sh = f.dh
    const next = sprites.get(want(f, f.family), sw, sh)
    let prev = null
    if (f.shown !== f.family) prev = sprites.get(want(f, f.shown), sw, sh)
    if (next && f.mix < 1 && !reduced) {
      f.mix = Math.min(1, f.mix + dt / FADE_SECONDS)
      if (f.mix >= 1) f.shown = f.family
    }
    if (!next && !prev) return
    c.setTransform(cos, sin, -sin, cos, cx, cy)
    const half = side / 2
    if (prev && (!next || f.mix < 1)) c.drawImage(prev, -half, -half, side, side)
    if (next) {
      const a = prev ? f.mix : 1
      if (a < 1) { c.globalAlpha = a; c.drawImage(next, -half, -half, side, side); c.globalAlpha = 1 }
      else c.drawImage(next, -half, -half, side, side)
    }
  }

  const render = (t, dt) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const target = o.clipToShape && layerCtx ? layerCtx : ctx
    if (target !== ctx) { target.setTransform(1, 0, 0, 1, 0, 0); target.clearRect(...clip) }
    for (const f of drawOrder) drawFlower(target, f, t, dt)
    target.setTransform(1, 0, 0, 1, 0, 0)
    if (target !== ctx) {
      target.save()
      target.beginPath(); target.rect(...clip); target.clip()
      target.globalCompositeOperation = 'destination-in'
      target.drawImage(mask, clip[0], clip[1], clip[2], clip[3], clip[0], clip[1], clip[2], clip[3])
      target.restore()
      ctx.drawImage(layer, clip[0], clip[1], clip[2], clip[3], clip[0], clip[1], clip[2], clip[3])
    }
    for (const f of liftedOrder) drawFlower(ctx, f, t, dt)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    drones?.draw(ctx, t, unit, dpr, shape, reduced)
  }

  const rasterList = () => flowers.map((f) => [want(f, f.family), f.dw, f.dh])
  const gate = frameGate(o.maxFps ?? 60)
  const introEnd = sweep + bloom
  let rastersWarm = false

  const frame = (now) => {
    raf = 0
    if (destroyed || !canvas.clientWidth || !canvas.clientHeight) return
    if (!t0) {
      // first frame waits for every initial sprite + drone frame to decode, then pre-rasterises (6ms/frame budget)
      if (!sprites.allReady(initialKeys) || (drones && !drones.ready())) return schedule()
      if (!rastersWarm && !(rastersWarm = sprites.rasterize(rasterList(), 6))) return schedule()
    }
    if (!gate(now)) return schedule()
    if (!t0) { t0 = now; lastNow = now }
    const t = (now - t0) / 1000
    const dt = Math.min(0.1, (now - lastNow) / 1000)
    lastNow = now
    const auto = o.autoRecolor
    if (auto && !reduced && t > introEnd) {
      if (!nextAuto) nextAuto = t + auto.intervalSeconds
      else if (t >= nextAuto) {
        if (!pressing) {
          const g = (lastGroup = pickGroup(lastGroup, auto.includeInitialPalette ?? false))
          const origin = flowers[Math.floor(Math.random() * flowers.length)]
          const r = auto.radius ?? Math.hypot(totalW, totalH)
          pushWave(origin, g, false, r, r / (auto.travelSeconds ?? 1.4))
        }
        const j = auto.jitterSeconds ?? 0
        nextAuto = t + auto.intervalSeconds + (j ? (Math.random() * 2 - 1) * j : 0)
      }
    }
    for (let i = waves.length - 1; i >= 0; i--) if (t - waves[i].start > waves[i].range / waves[i].speed + PRESS_SECONDS) waves.splice(i, 1)
    render(t, dt)
    if (!started) { started = true; o.onFirstFrame?.() }
    if (!introDone && (reduced || t > introEnd)) { introDone = true; o.onIntroComplete?.() }
    if (!reduced) schedule()
  }
  function schedule() {
    if (!raf && !destroyed && visible && document.visibilityState !== 'hidden') raf = requestAnimationFrame(frame)
  }

  resize()
  const ro = new ResizeObserver(() => {
    if (resize() && t0) { render(elapsed(), 0); if (reduced) return }
    schedule()
  })
  ro.observe(canvas)
  const io = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting
    if (visible) schedule()
  }, { threshold: 0, rootMargin: '50% 0px' })
  io.observe(canvas)
  const onVis = () => { if (document.visibilityState === 'hidden') { if (raf) cancelAnimationFrame(raf); raf = 0 } else schedule() }
  document.addEventListener('visibilitychange', onVis)
  schedule()

  return {
    destroy() {
      destroyed = true
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    },
    /** Programmatic recolour ripple from field coords (e.g. linked UI). */
    ripple(x, y, group = pickGroup(lastGroup, false)) { lastGroup = group; pushWave({ x, y }, group, true) },
    get running() { return raf !== 0 },
    get time() { return elapsed() },
  }
}
