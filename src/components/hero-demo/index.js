// Hero product demo controller: picks the scene recording for the current layout band, maps the
// timeline clock (src/motion/timeline.js) onto recording time chapter by chapter, renders only while
// the visual is on screen, and drives mascot gaze (scripted cursor while playing, pointer while paused).
import { DemoPlayer, DemoScene } from './player.js'
import { pickRecording } from './recordings.js'
import './heroDemo.css'

const cache = new Map()
function load(rec) {
  if (!cache.has(rec.file)) {
    cache.set(
      rec.file,
      fetch(rec.file)
        .then((r) => {
          if (!r.ok) throw new Error(`hero demo: ${rec.file} ${r.status}`)
          return r.json()
        })
        .then((d) => new DemoScene(d))
        .catch((e) => {
          cache.delete(rec.file)
          throw e
        }),
    )
  }
  return cache.get(rec.file)
}

// Clone time t (chapter starts `lefts` % of `duration`) -> recording time (its own chapter starts)
function mapTime(t, duration, lefts, meta) {
  const rd = meta.duration
  const rl = meta.lefts
  if (!lefts || lefts.length !== rl.length || !(duration > 0)) return (t / Math.max(1e-6, duration)) * rd
  const p = Math.max(0, Math.min(100, (t / duration) * 100))
  let i = 0
  while (i < lefts.length - 1 && lefts[i + 1] <= p) i++
  const a = lefts[i]
  const b = i + 1 < lefts.length ? lefts[i + 1] : 100
  const ra = rl[i]
  const rb = i + 1 < rl.length ? rl[i + 1] : 100
  const f = b > a ? (p - a) / (b - a) : 0
  return ((ra + (rb - ra) * f) / 100) * rd
}

export function createHeroDemo(visual, { reduce }) {
  if (!visual) return null
  const host = document.createElement('div')
  host.setAttribute('data-motion', 'hero-demo')
  host.setAttribute('aria-hidden', 'true')
  host.style.cssText = 'position:absolute;inset:0;pointer-events:none'
  visual.appendChild(host)
  const player = new DemoPlayer(host, { reduce })

  let want = null // recording descriptor for the current layout
  let onScreen = true
  let last = { t: 0, duration: 1, lefts: null, playing: false }
  let ptr = null
  let ptrRaf = 0
  let wasPlaying = null
  let destroyed = false

  const io = new IntersectionObserver(
    ([e]) => {
      onScreen = e.isIntersecting
      if (onScreen) draw(true)
    },
    { threshold: 0 },
  )
  io.observe(visual)

  // continue the static frame's .6s appear animation on the live svg so the hand-over is seamless
  const adoptAppear = () => {
    const stat = Array.from(visual.querySelectorAll(':scope > span > svg')).find((s) => s.getBoundingClientRect().width > 0)
    const anim = stat?.getAnimations?.()[0]
    const ct = anim && anim.playState !== 'finished' ? +anim.currentTime : null
    if (ct != null && !reduce && ct < 600) {
      player.svg.style.animation = `threeBVisualAppear .6s cubic-bezier(.22, 1, .36, 1) ${-ct}ms both`
    }
  }

  const sceneTime = () => mapTime(last.t, last.duration, last.lefts, player.scene.meta)

  function draw(force) {
    if (!player.scene || destroyed) return
    if (!onScreen && !force) return
    const rt = sceneTime()
    player.render(rt)
    if (reduce) return
    if (last.playing) {
      const pose = player.scene.poseAt(rt)
      player.gaze(pose && pose.opacity > 0.01 ? pose : null)
    }
  }

  const pointerGaze = () => {
    ptrRaf = 0
    if (reduce || last.playing || !ptr || !player.scene) return
    player.gaze(player.toOuter(ptr))
  }

  return {
    // called on resize with viewport + frame width
    layout(vw, frameW) {
      const rec = pickRecording(vw, frameW)
      if (want && rec.file === want.file) {
        player.invalidate()
        return
      }
      want = rec
      load(rec)
        .then((scene) => {
          if (destroyed || want !== rec) return
          const first = !player.scene
          player.setScene(scene)
          if (first) adoptAppear()
          // the live scene replaces the static first-paint frames
          visual.setAttribute('data-demo-ready', '')
          visual.querySelectorAll(':scope > span').forEach((el) => el.style.setProperty('display', 'none', 'important'))
          draw(true)
        })
        .catch((e) => console.warn(e.message))
    },
    // called every timeline tick
    frame(t, duration, lefts, playing) {
      last = { t, duration, lefts, playing }
      if (wasPlaying !== playing) {
        wasPlaying = playing
        if (!playing && ptr && !ptrRaf) ptrRaf = requestAnimationFrame(pointerGaze)
      }
      draw(false)
    },
    pointer(e) {
      ptr = { x: e.clientX, y: e.clientY }
      if (!reduce && !last.playing && !ptrRaf) ptrRaf = requestAnimationFrame(pointerGaze)
    },
    destroy() {
      destroyed = true
      io.disconnect()
      if (ptrRaf) cancelAnimationFrame(ptrRaf)
      player.destroy()
      host.remove()
      visual.removeAttribute('data-demo-ready')
      visual.querySelectorAll(':scope > span').forEach((el) => el.style.removeProperty('display'))
    },
  }
}
