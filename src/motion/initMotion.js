// DOM-level motion behaviours, measured against https://www.tines.com/.
// Each init* returns a cleanup function. initMotion() is called once from App.jsx.
import { initTimeline } from './timeline.js'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const $ = (sel, root = document) => root.querySelector(sel)

/* ---------- Logo marquee (HomeLogoMarquee) ----------
   period = offsetLeft of the first duplicated logo; duration = period / 40 s (40px/s).
   Drag: pointerdown freezes the current translate, follows the pointer; on release the
   animation resumes from the dragged phase via a negative animation-delay. */
function initMarquee() {
  const box = $('[data-motion~="logo-marquee"]')
  const track = $('[data-motion~="logo-marquee-track"]')
  if (!box || !track) return () => {}
  const reduce = reducedMotion()
  const half = track.children.length / 2
  let period = 0
  const measure = () => {
    period = track.children[half]?.offsetLeft ?? 0
    if (period > 0) {
      track.style.setProperty('--marqueePeriod', `${period}px`)
      track.style.setProperty('--marqueeDuration', `${period / 40}s`)
    }
  }
  measure()
  window.addEventListener('resize', measure)
  if (!reduce) track.classList.add('is-animating')

  let x = 0
  let lastX = 0
  const onMove = (e) => {
    x += e.clientX - lastX
    lastX = e.clientX
    track.style.transform = `translate3d(${x}px, 0, 0)`
  }
  const onUp = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
    if (reduce) return
    let phase = period > 0 ? x % period : 0
    if (phase > 0) phase -= period
    track.style.animationDelay = `${phase / 40}s`
    track.style.transform = ''
    track.classList.add('is-animating')
  }
  const onDown = (e) => {
    const t = getComputedStyle(track).transform
    x = t && t !== 'none' ? new DOMMatrixReadOnly(t).m41 : 0
    lastX = e.clientX
    track.classList.remove('is-animating')
    track.style.transform = `translate3d(${x}px, 0, 0)`
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }
  box.style.touchAction = 'pan-y'
  box.addEventListener('pointerdown', onDown)
  return () => {
    window.removeEventListener('resize', measure)
    box.removeEventListener('pointerdown', onDown)
    onUp()
  }
}

/* ---------- Use-case block reveal (useVisibilityObserver: threshold 0, one-shot) ---------- */
function initUseCasesReveal() {
  const el = $('[data-motion~="usecases-reveal"]')
  if (!el) return () => {}
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      el.classList.add('is-visible')
      io.disconnect()
    }
  })
  io.observe(el)
  return () => io.disconnect()
}

/* ---------- CTA tri-spinner cursor (InteractiveCursor) ----------
   Cursor sits at pointer - (19, 20); the shadow copy offsets 7px away from a light source at
   (innerWidth / 2, -0.35 * innerHeight). Press springs the three triangles inward. */
const TRIS = [
  ['top', 'M19 13L14.67 1.75L23.33 1.75L19 13Z'],
  ['br', 'M25.06 23.5L32.64 32.88L36.97 25.38L25.06 23.5Z'],
  ['bl', 'M12.94 23.5L1.03 25.38L5.36 32.88L12.94 23.5Z'],
]
const spinnerMarkup = () =>
  `<div class="tri-cursor__spinner">${TRIS.map(
    ([n, d]) =>
      `<svg class="tri-cursor__tri tri-cursor__tri--${n}" width="38" height="40" viewBox="0 0 38 40" fill="none"><path d="${d}" fill="var(--interactiveCursorFill)" stroke="var(--interactiveCursorStroke)" stroke-width="2"/></svg>`,
  ).join('')}</div>`

function initCtaCursor() {
  const region = $('[data-motion~="cta-tri-cursor"]')
  if (!region) return () => {}
  const cursor = document.createElement('div')
  cursor.className = 'tri-cursor'
  cursor.setAttribute('aria-hidden', 'true')
  cursor.innerHTML = `<div class="tri-cursor__shadow">${spinnerMarkup()}</div>${spinnerMarkup()}`
  document.body.appendChild(cursor)
  const shadow = cursor.firstElementChild
  let raf = 0
  let pos = null
  const paint = () => {
    raf = 0
    if (!pos) return
    cursor.style.transform = `translate3d(${pos.x - 19}px, ${pos.y - 20}px, 0)`
    const dx = pos.x - window.innerWidth / 2
    const dy = pos.y + 0.35 * window.innerHeight
    const len = Math.hypot(dx, dy) || 1
    shadow.style.transform = `translate(${(dx / len) * 7}px, ${(dy / len) * 7}px)`
  }
  const show = (v) => {
    region.classList.toggle('hide-native-cursor', v)
    cursor.classList.toggle('is-visible', v)
  }
  const press = (v) => cursor.classList.toggle('is-pressed', v)
  const onEnter = (e) => {
    if (e.pointerType !== 'mouse') return
    pos = { x: e.clientX, y: e.clientY }
    paint()
    show(true)
  }
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    pos = { x: e.clientX, y: e.clientY }
    if (!raf) raf = requestAnimationFrame(paint)
    show(true)
  }
  const onLeave = () => {
    show(false)
    press(false)
  }
  const onDown = (e) => e.pointerType === 'mouse' && press(true)
  const onUp = () => press(false)
  region.addEventListener('pointerenter', onEnter)
  region.addEventListener('pointermove', onMove, { passive: true })
  region.addEventListener('pointerleave', onLeave)
  region.addEventListener('pointerdown', onDown)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
  return () => {
    region.removeEventListener('pointerenter', onEnter)
    region.removeEventListener('pointermove', onMove)
    region.removeEventListener('pointerleave', onLeave)
    region.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
    if (raf) cancelAnimationFrame(raf)
    region.classList.remove('hide-native-cursor')
    cursor.remove()
  }
}

/* ---------- Solution orb gaze (useGazeController) ----------
   Face translates toward the pointer: offset = dir * min(dist, 0.35 * 100) / 35 * 4.48 (svg units,
   maxOffset = r(32) * 0.14). Eased by the .3s ease-out transform transition on the face. */
function initOrbGaze() {
  const host = $('[data-motion~="solution-orb"]')
  const svg = host?.querySelector('svg')
  const face = svg?.querySelector('.ThreeBMascot-module-scss-module__Gy_XlW__face')
  if (!face) return () => {}
  const reduce = reducedMotion()
  const OUTER = 100
  const MAX = 32 * 0.14
  const D = Math.max(1, 0.35 * OUTER)
  let center = null
  let raf = 0
  let ptr = null
  const apply = () => {
    raf = 0
    if (!ptr || reduce) return
    const r = svg.getBoundingClientRect()
    if (!r.width) return
    const sx = OUTER / r.width
    const sy = OUTER / r.height
    if (!center) {
      const f = face.getBoundingClientRect()
      center = { x: (f.left + f.width / 2 - r.left) * sx, y: (f.top + f.height / 2 - r.top) * sy }
    }
    const dx = (ptr.x - r.left) * sx - center.x
    const dy = (ptr.y - r.top) * sy - center.y
    const n = Math.hypot(dx, dy)
    const a = Math.min(n, D) / D
    const hx = n > 0 ? (dx / n) * a * MAX : 0
    const hy = n > 0 ? (dy / n) * a * MAX : 0
    face.style.transform = `translate(${hx.toFixed(2)}px, ${hy.toFixed(2)}px)`
  }
  const onMove = (e) => {
    ptr = { x: e.clientX, y: e.clientY }
    if (!raf) raf = requestAnimationFrame(apply)
  }
  const invalidate = () => (center = null)
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('resize', invalidate, { passive: true })
  return () => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', invalidate)
    if (raf) cancelAnimationFrame(raf)
    face.style.transform = ''
  }
}

export function initMotion() {
  const cleanups = [initMarquee(), initUseCasesReveal(), initCtaCursor(), initOrbGaze(), initTimeline()]
  return () => cleanups.forEach((fn) => fn && fn())
}
