// Hero demo transport (TimelineScrubber "public" variant), driven from the DOM.
// Ported from the original's TimelineScrubber / ThreeBAppShell source (www.tines.com, Oct 2026):
//  - 9 chapters; duration + chapter starts depend on the frame width (see timelineChapters.js);
//    1x real-time playback, loops, autoplays on load
//  - a "gate" at t = 1.8s (reveal .8s + wait 1s): playback holds there until the product
//    visual is >= 65% in view (IntersectionObserver thresholds [0,.35,.65,.9,1]); once met it stays open
//  - caption target = hovered x (if the pointer is over the track) else the knob, clamped to
//    [-leftRoom + barH/2 + capW/2 + 8, trackW + rightRoom - barH/2 - capW/2 - 8];
//    eased per frame: k += (target - k) * .3 (snap when < .5px), rounded to whole px; translateX(-capW/2)
//  - hover: caption shows the hovered chapter (snaps to a chapter start within 6px), a hover tick
//    marks the x, the hovered segment turns "hot", the knob dot grows when hovered within 16px
//  - scrubbing: pointerdown on the track pauses + seeks (snaps to a chapter start within 6px); release resumes
//  - data-dock: a 1px sentinel at the frame top is observed with rootMargin -120px; once it is out
//    of that root above 120px the bar docks to the frame bottom (translateY(--frameH)); data-docking
//    is set for 520ms after a flip (caption hidden while the bar slides)
//  - prefers-reduced-motion: no playback; time frozen at the initial scene's end (89.8063s, min'd with
//    the current duration), which is what the original renders
//  - the scripted product demo itself (scenes, cursor, typing, mascot gaze) is rendered by
//    src/components/hero-demo from this clock: every tick hands it (time, duration, chapter starts,
//    isPlaying) -- there is no second clock. Gaze: scripted cursor while playing, real pointer while paused.
import { CHAPTER_BANDS } from './timelineChapters.js'
import { createHeroDemo } from '../components/hero-demo/index.js'

const GATE_T = 1.8
const REDUCED_T = 89.8063
const TITLES = [
  'Your workspace',
  'Open the IT space',
  'Open the workflow',
  'Preview workflow frontend',
  'Configure connectors',
  'Monitoring',
  'Managing access',
  'Savings reporting',
  'AI usage and spend',
]
const PAUSE_ICON =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4.5" y="3" width="2.5" height="10" rx="0.8"></rect><rect x="9" y="3" width="2.5" height="10" rx="0.8"></rect></svg>'
const PLAY_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.4 L12.4 8 L5 12.6 Z"></path></svg>'

const fmt = (s) => {
  const v = Math.max(0, Math.floor(s))
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`
}

// Duration + chapter start % for a viewport / frame width, interpolated within the matching band.
function chapterGeometry(vw, frameW) {
  const key =
    vw < 640 ? 'phone' : vw >= 1280 ? 'desktop' : frameW < 640 ? 'tabletPhone' : frameW < 1200 ? 'tablet' : 'tabletWide'
  const rows = CHAPTER_BANDS[key]
  let a = rows[0]
  let b = rows[rows.length - 1]
  if (frameW <= a[0]) b = a
  else if (frameW >= b[0]) a = b
  else {
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] >= frameW) {
        a = rows[i - 1]
        b = rows[i]
        break
      }
    }
  }
  const f = b[0] === a[0] ? 0 : (frameW - a[0]) / (b[0] - a[0])
  const row = a.map((v, i) => v + (b[i] - v) * f)
  return { duration: row[1], lefts: [0, ...row.slice(2)] }
}

export function initTimeline() {
  const bar = document.querySelector('[data-motion~="timeline-bar"]')
  const visual = document.querySelector('[data-motion~="product-visual"]')
  const root = document.querySelector('[data-motion~="product-visual-root"]')
  const sentinel = document.querySelector('[data-motion~="timeline-dock-sentinel"]')
  if (!bar) return () => {}
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let duration = 91.63153223079219
  let lefts = [0, 4.09248, 8.83975, 11.9636, 25.8704, 45.4208, 62.6956, 81.9015, 91.3936]
  let chapters = []
  let time = 0
  let playing = !reduce
  let gateOpen = false
  let scrubbing = false
  let resumeAfterScrub = false
  let capX = null
  let lastTs = null
  let raf = 0
  let hover = null // { left, title } in track px (snapped)
  let hoverRaw = null // raw pointer x in track px
  let geomKey = ''

  const q = (m) => bar.querySelector(`[data-motion~="${m}"]`)
  const segments = () => bar.querySelectorAll('[data-motion~="timeline-segment"]')

  // Chapter-accurate segment geometry for the current frame width
  const applyGeometry = () => {
    const fw = (root || visual)?.getBoundingClientRect().width || window.innerWidth
    const g = chapterGeometry(window.innerWidth, fw)
    const key = `${g.duration.toFixed(4)}`
    if (key === geomKey) return
    geomKey = key
    duration = g.duration
    lefts = g.lefts
    chapters = lefts.map((l, i) => ({ t: (l / 100) * duration, title: TITLES[i] }))
    segments().forEach((seg, i) => {
      const left = lefts[i] ?? 100
      const right = lefts[i + 1] ?? 100
      seg.style.left = `calc(${+left.toFixed(5)}% + 1px)`
      seg.style.width = `calc(${+(right - left).toFixed(5)}% - 2px)`
    })
    time = reduce ? Math.min(REDUCED_T, duration) : Math.min(time, duration)
  }
  applyGeometry()

  const setIcon = () => {
    const btn = q('timeline-play')
    if (!btn) return
    // While held at the 65%-in-view gate the original shows the paused state (aria-label "Play").
    const held = !gateOpen && time >= GATE_T - 1e-6
    const showPlaying = playing && !held
    const want = showPlaying ? 'Pause' : 'Play'
    if (btn.getAttribute('aria-label') !== want) {
      btn.setAttribute('aria-label', want)
      const span = btn.querySelector('span') || btn
      span.innerHTML = showPlaying ? PAUSE_ICON : PLAY_ICON
    }
  }

  const chapterAt = (t) => chapters.reduce((acc, c) => (c.t <= t + 1e-6 ? c : acc), chapters[0])
  // Nearest chapter start within 6px of x (track px)
  const snapChapter = (x, w) => {
    let best = null
    let bestD = Infinity
    for (const c of chapters) {
      const d = Math.abs(x - (c.t / duration) * w)
      if (d < bestD) {
        bestD = d
        best = { left: (c.t / duration) * w, title: c.title, t: c.t }
      }
    }
    return best && bestD <= 6 ? best : null
  }

  const render = () => {
    const track = q('timeline-track')
    const knob = q('timeline-knob')
    const dot = q('timeline-knob-dot')
    const tick = q('timeline-hover-tick')
    const cap = q('timeline-caption')
    const timeEl = q('timeline-time')
    const transport = bar.firstElementChild
    const pct = (time / duration) * 100
    if (knob) knob.style.left = `${pct}%`
    const tr = track?.getBoundingClientRect()
    const hoverPct = hover && tr?.width > 0 ? (hover.left / tr.width) * 100 : null
    segments().forEach((seg, i) => {
      const s = chapters[i]?.t ?? duration
      const e = chapters[i + 1]?.t ?? duration
      const played = time <= s ? 0 : time >= e ? 100 : ((time - s) / Math.max(1e-6, e - s)) * 100
      const fill = seg.firstElementChild
      if (fill) fill.style.width = `${played}%`
      const l = lefts[i] ?? 100
      const r = lefts[i + 1] ?? 100
      seg.toggleAttribute('data-hot', hoverPct != null && hoverPct >= l && hoverPct < r)
    })
    if (timeEl) {
      const txt = `${fmt(time)} / ${fmt(duration)}`
      if (timeEl.textContent !== txt) timeEl.textContent = txt
    }
    if (tr && transport) {
      const br = transport.getBoundingClientRect()
      const barTop = tr.top - br.top
      const captionTop = br.bottom - tr.top - 1
      if (dot) dot.toggleAttribute('data-hot', hoverRaw != null && tr.width > 0 && Math.abs(hoverRaw - (pct / 100) * tr.width) <= 16)
      if (tick) {
        if (hover) {
          tick.style.display = 'block'
          tick.style.left = `${hover.left}px`
          tick.style.top = `${-barTop}px`
          tick.style.height = `${captionTop + barTop}px`
        } else tick.style.display = ''
      }
      if (cap) {
        const title = hover ? hover.title : chapterAt(time).title
        const textNode = Array.from(cap.childNodes).find((n) => n.nodeType === 3 && n.nodeValue.trim())
        if (textNode && textNode.nodeValue !== title) textNode.nodeValue = title
        cap.style.top = bar.dataset.dock === 'bottom' ? `${Math.round(captionTop)}px` : ''
        const capW = cap.offsetWidth
        if (tr.width > 0 && capW > 0) {
          const er = br.height / 2
          const es = capW / 2 + 8
          const lo = -(tr.left - br.left) + er + es
          const hi = tr.width + (br.right - tr.right) - er - es
          const x = hover ? hover.left : (pct / 100) * tr.width
          const target = lo <= hi ? Math.max(lo, Math.min(hi, x)) : (lo + hi) / 2
          capX = capX == null || Math.abs(target - capX) < 0.5 ? target : capX + (target - capX) * 0.3
          cap.style.left = `${Math.round(capX)}px`
          cap.style.transform = `translateX(${-Math.round(capW / 2)}px)`
        }
      }
    }
    setIcon()
  }

  // ---- Scripted product demo (scene player) ----
  const demo = createHeroDemo(visual, { reduce })
  // controls.isPlaying() on the original: playing, not scrubbing and not held at the gate
  const gazePlaying = () => !reduce && playing && !scrubbing && !(!gateOpen && time >= GATE_T - 1e-6)
  const onMouseMove = (e) => demo?.pointer(e)

  const tick = (ts) => {
    if (lastTs != null && playing && !scrubbing) {
      const dt = (ts - lastTs) / 1000
      const limit = !gateOpen && time <= GATE_T + 1e-6 ? GATE_T : duration
      time = Math.min(limit, time + dt)
      if (time >= duration - 1e-6) time = 0 // loop
    }
    lastTs = ts
    render()
    demo?.frame(time, duration, lefts, gazePlaying())
    raf = requestAnimationFrame(tick)
  }

  // Gate: visual >= 65% in view
  let io = null
  if (visual) {
    io = new IntersectionObserver(
      (entries) => {
        if ((entries[0]?.intersectionRatio ?? 0) >= 0.65) {
          gateOpen = true
          io.disconnect()
        }
      },
      { threshold: [0, 0.35, 0.65, 0.9, 1] },
    )
    io.observe(visual)
  }

  // Dock: sentinel at the frame top vs a root inset 120px from the viewport top
  let dockIo = null
  let dockTimer = 0
  if (sentinel) {
    dockIo = new IntersectionObserver(
      ([e]) => {
        const want = !e.isIntersecting && e.boundingClientRect.top < 120 ? 'bottom' : 'top'
        if (bar.dataset.dock === want) return
        bar.dataset.dock = want
        bar.setAttribute('data-docking', '')
        clearTimeout(dockTimer)
        dockTimer = setTimeout(() => bar.removeAttribute('data-docking'), 520)
      },
      { threshold: 0, rootMargin: '-120px 0px 0px 0px' },
    )
    dockIo.observe(sentinel)
  }
  // --frameH (frame height) for the bottom dock; frame width drives the chapter geometry
  let ro = null
  const onResize = () => {
    if (root && visual) root.style.setProperty('--frameH', `${visual.getBoundingClientRect().height}px`)
    applyGeometry()
    demo?.layout(window.innerWidth, (root || visual)?.getBoundingClientRect().width || window.innerWidth)
  }
  if (visual) {
    ro = new ResizeObserver(onResize)
    ro.observe(visual)
  }
  onResize()

  const onToggle = (e) => {
    if (!e.target.closest('[data-motion~="timeline-play"]')) return
    const held = !gateOpen && time >= GATE_T - 1e-6
    if (held && playing) {
      gateOpen = true // button reads "Play" during the hold; clicking it releases the gate
      return
    }
    playing = !playing
    if (playing) gateOpen = true // an explicit play releases the gate
  }

  const seekTo = (clientX) => {
    const track = q('timeline-track')
    if (!track) return
    const r = track.getBoundingClientRect()
    if (r.width <= 0) return
    const n = Math.max(0, Math.min(1, (clientX - r.left) / r.width))
    time = snapChapter(n * r.width, r.width)?.t ?? n * duration
  }
  const onHover = (e) => {
    const track = q('timeline-track')
    if (!track || !e.target.closest('[data-motion~="timeline-track"]')) return
    const r = track.getBoundingClientRect()
    if (r.width <= 0) return
    const x = Math.max(0, Math.min(r.width, e.clientX - r.left))
    hoverRaw = x
    hover = snapChapter(x, r.width) || { left: x, title: chapterAt((x / r.width) * duration).title }
  }
  const onHoverLeave = () => {
    hover = null
    hoverRaw = null
  }
  const onScrubMove = (e) => seekTo(e.clientX)
  const onScrubEnd = () => {
    scrubbing = false
    window.removeEventListener('pointermove', onScrubMove)
    window.removeEventListener('pointerup', onScrubEnd)
    window.removeEventListener('pointercancel', onScrubEnd)
    if (resumeAfterScrub) playing = true
  }
  const onScrubStart = (e) => {
    if (!e.target.closest('[data-motion~="timeline-track"]')) return
    resumeAfterScrub = playing
    playing = false
    scrubbing = true
    gateOpen = true
    seekTo(e.clientX)
    window.addEventListener('pointermove', onScrubMove)
    window.addEventListener('pointerup', onScrubEnd)
    window.addEventListener('pointercancel', onScrubEnd)
  }

  // Programmatic transport (QA / tooling): same semantics as the original's controls object
  bar.__controls = {
    play: () => { playing = true; gateOpen = true },
    pause: () => { playing = false },
    seek: (t) => { time = Math.max(0, Math.min(duration, t)) },
    getTime: () => time,
    getDuration: () => duration,
    isPlaying: () => gazePlaying(),
  }

  const trackEl = q('timeline-track')
  bar.addEventListener('click', onToggle)
  bar.addEventListener('pointerdown', onScrubStart)
  bar.addEventListener('pointermove', onHover)
  trackEl?.addEventListener('pointerleave', onHoverLeave)
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  raf = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(raf)
    demo?.destroy()
    delete bar.__controls
    clearTimeout(dockTimer)
    io?.disconnect()
    dockIo?.disconnect()
    ro?.disconnect()
    bar.removeEventListener('click', onToggle)
    bar.removeEventListener('pointerdown', onScrubStart)
    bar.removeEventListener('pointermove', onHover)
    trackEl?.removeEventListener('pointerleave', onHoverLeave)
    window.removeEventListener('mousemove', onMouseMove)
    onScrubEnd()
  }
}
