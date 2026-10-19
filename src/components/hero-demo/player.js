// Time-driven player for the hero product demo (ThreeBProductVisual / ThreeBAppShell on www.tines.com).
//
// The original renders a scripted app (9 chapters: workspace -> IT space -> workflow -> frontend preview ->
// connectors -> monitoring -> access -> savings -> AI spend) whose state is a pure function of the scene
// time. We sampled that function on the live page (real 1x playback under a fake clock, ~30 samples/s,
// per layout band) into scene data: an interned node table (identical subtrees share one id) plus one
// root id + cursor pose per sample. See recordings.js for the bands.
//
// render(t) is stateless with respect to time: it finds the two samples around t and reconciles the
// SVG against them, interpolating numeric attribute values (cursor path, scroll offsets, growing
// circles, tweens) where both samples share structure, and stepping discrete changes (text typing,
// number roll-ups, panels opening) at their sampled times. Scrub, loop, pause and reduced-motion
// freeze therefore work by construction. Unchanged subtrees are skipped by id, so a typical frame
// touches only the cursor and the few nodes that are tweening.
//
// Mascot / avatar gaze (useGazeController on the original): while playing, faces look at the scripted
// demo cursor; while paused, at the real pointer. offset = dir * min(dist, .35 * outerW) / (.35 * outerW)
// * maxOffset (ThreeBMascot .14 r, AvatarFace .12 r), eased by the faces' .3s ease-out transform
// transition (motion.css). Reduced motion: faces stay centred.

const SVG_NS = 'http://www.w3.org/2000/svg'
const XML_NS = 'http://www.w3.org/XML/1998/namespace'
const NUM = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi
const MASCOT_FACE = 'ThreeBMascot-module-scss-module__Gy_XlW__face'
const AVATAR_FACE = 'AvatarFace-module-scss-module__yl3Jdq__face'
// Attributes whose numbers are identifiers / references, never tweened
const NO_LERP = new Set(['id', 'class', 'href', 'clip-path', 'mask', 'filter', 'fill', 'stroke', 'xml:space', 'text-anchor', 'dominant-baseline'])

const fix = (n) => {
  const r = Math.round(n * 1000) / 1000
  return Object.is(r, -0) ? '0' : String(r)
}

function lerpValue(name, a, b, al) {
  if (a === b) return a
  if (NO_LERP.has(name) || a.includes('url(') || a.includes('#') || b.includes('#')) return al < 0.5 ? a : b
  const na = a.match(NUM)
  const nb = b.match(NUM)
  if (!na || !nb || na.length !== nb.length) return al < 0.5 ? a : b
  const sa = a.split(NUM)
  const sb = b.split(NUM)
  for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return al < 0.5 ? a : b
  let out = sa[0]
  for (let i = 0; i < na.length; i++) {
    const x = +na[i]
    const y = +nb[i]
    out += (x === y ? na[i] : fix(x + (y - x) * al)) + sa[i + 1]
  }
  return out
}

function setAttr(el, name, v) {
  if (name.startsWith('xml:')) el.setAttributeNS(XML_NS, name, v)
  else el.setAttribute(name, v)
}
function removeAttr(el, name) {
  if (name.startsWith('xml:')) el.removeAttributeNS(XML_NS, name.slice(4))
  else el.removeAttribute(name)
}

export class DemoScene {
  constructor(data) {
    this.meta = data.meta
    this.defs = data.defs
    const f = data.frames
    this.times = new Float64Array(f.length)
    this.roots = new Int32Array(f.length)
    this.poses = f.map((x) => x[2])
    f.forEach((x, i) => {
      this.times[i] = x[0]
      this.roots[i] = x[1]
    })
    const vb = (this.meta.viewBox || '0 0 1360 680').split(/\s+/).map(Number)
    this.outer = { w: vb[2], h: vb[3] }
    this.viewBox = vb
    this.compatCache = new Map()
  }

  // Index of the last sample at or before t, and the blend toward the next one
  locate(t) {
    const ts = this.times
    const n = ts.length
    if (t <= ts[0]) return [0, 0]
    if (t >= ts[n - 1]) return [n - 1, 0]
    let lo = 0
    let hi = n - 1
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1
      if (ts[m] <= t) lo = m
      else hi = m
    }
    return [lo, (t - ts[lo]) / Math.max(1e-6, ts[hi] - ts[lo])]
  }

  poseAt(t) {
    const [k, al] = this.locate(t)
    const a = this.poses[k]
    const b = this.poses[Math.min(k + 1, this.poses.length - 1)]
    if (!a) return null
    if (!b || al === 0) return { x: a[0], y: a[1], opacity: a[2] }
    return { x: a[0] + (b[0] - a[0]) * al, y: a[1] + (b[1] - a[1]) * al, opacity: a[2] + (b[2] - a[2]) * al }
  }

  // Same tag, same attribute names, same child count -> can blend attribute values pairwise
  compatible(a, b) {
    const key = a * 4194304 + b
    let c = this.compatCache.get(key)
    if (c !== undefined) return c
    const A = this.defs[a]
    const B = this.defs[b]
    c = false
    if (typeof A !== 'string' && typeof B !== 'string' && A[0] === B[0] && A[1].length === B[1].length && A[2].length === B[2].length) {
      c = true
      for (let i = 0; i < A[1].length; i += 2) if (A[1][i] !== B[1][i]) { c = false; break }
    }
    if (this.compatCache.size > 200000) this.compatCache.clear()
    this.compatCache.set(key, c)
    return c
  }

  // Reconcile `node` (or create one) to the blend of defs a -> b at al. Returns the node to keep.
  patch(node, a, b, al, created) {
    const defs = this.defs
    if (a !== b && (al <= 0 || !this.compatible(a, b))) b = a
    if (a === b && node && node.__id === a) return node
    const A = defs[a]
    if (typeof A === 'string') {
      const txt = a === b || al < 0.5 ? A : defs[b]
      if (!node || node.nodeType !== 3) node = document.createTextNode(txt)
      else if (node.data !== txt) node.data = txt
      node.__id = a === b ? a : -1
      return node
    }
    const tag = A[0]
    if (!node || node.nodeType !== 1 || node.__tag !== tag) {
      node = document.createElementNS(SVG_NS, tag)
      node.__tag = tag
      node.__attrs = Object.create(null)
      created.push(node)
    }
    const prev = node.__attrs
    const next = Object.create(null)
    const AA = A[1]
    const BA = a === b ? null : defs[b][1]
    for (let i = 0; i < AA.length; i += 2) {
      const name = AA[i]
      const v = BA ? lerpValue(name, AA[i + 1], BA[i + 1], al) : AA[i + 1]
      next[name] = v
      if (prev[name] !== v) setAttr(node, name, v)
    }
    for (const name in prev) if (!(name in next)) removeAttr(node, name)
    node.__attrs = next
    const KA = A[2]
    const KB = a === b ? KA : defs[b][2]
    let child = node.firstChild
    for (let i = 0; i < KA.length; i++) {
      const nextSibling = child ? child.nextSibling : null
      const nc = this.patch(child, KA[i], KB[i], al, created)
      if (nc !== child) {
        if (child) node.replaceChild(nc, child)
        else node.appendChild(nc)
      }
      child = nextSibling
    }
    while (child) {
      const n = child.nextSibling
      node.removeChild(child)
      child = n
    }
    node.__id = a === b ? a : -1
    return node
  }
}

export class DemoPlayer {
  constructor(host, { reduce }) {
    this.host = host
    this.reduce = reduce
    this.svg = document.createElementNS(SVG_NS, 'svg')
    this.svg.setAttribute('class', 'ThreeBProductVisual-module-scss-module__D3PxTa__visual')
    this.svg.setAttribute('aria-hidden', 'true')
    this.svg.setAttribute('data-scheme', 'light')
    this.svg.setAttribute('overflow', 'visible')
    this.svg.style.cssText = 'display:block;width:100%;height:100%;overflow:hidden'
    this.scene = null
    this.lastKey = ''
    this.faces = []
    this.facesDirty = true
    this.lastGazeKey = ''
  }

  setScene(scene) {
    if (scene === this.scene) return
    this.scene = scene
    this.svg.setAttribute('viewBox', scene.meta.viewBox)
    // fresh tree for a new recording (ids, layout differ)
    while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild)
    this.svg.__id = undefined
    this.lastKey = ''
    this.faces = []
    this.facesDirty = true
    if (!this.svg.isConnected) this.host.appendChild(this.svg)
  }

  // Render the scene at recording time t
  render(t) {
    const s = this.scene
    if (!s) return
    const [k, al0] = s.locate(t)
    const k2 = Math.min(k + 1, s.roots.length - 1)
    const al = Math.round(al0 * 64) / 64
    const key = `${k}:${al}`
    if (key === this.lastKey) return
    this.lastKey = key
    const a = s.roots[k]
    const b = s.roots[k2]
    const root = s.defs[a]
    const created = []
    // the recorded root is the <svg> itself: reconcile its children directly into this.svg
    const rb = s.defs[b]
    const blend = a !== b && al > 0 && rb[2].length === root[2].length
    let child = this.svg.firstChild
    for (let i = 0; i < root[2].length; i++) {
      const nextSibling = child ? child.nextSibling : null
      const nc = s.patch(child, root[2][i], blend ? rb[2][i] : root[2][i], blend ? al : 0, created)
      if (nc !== child) {
        if (child) this.svg.replaceChild(nc, child)
        else this.svg.appendChild(nc)
      }
      child = nextSibling
    }
    while (child) {
      const n = child.nextSibling
      this.svg.removeChild(child)
      child = n
    }
    // new elements may be (or contain) faces: re-scan on the next gaze pass
    if (created.length) this.facesDirty = true
  }

  collectFaces() {
    if (!this.facesDirty) return
    this.facesDirty = false
    const list = this.svg.querySelectorAll(`.${MASCOT_FACE}, .${AVATAR_FACE}`)
    const old = new Map(this.faces.map((f) => [f.el, f]))
    this.faces = Array.from(list, (el) => {
      const f = old.get(el)
      if (f) return f
      const avatar = el.classList.contains(AVATAR_FACE)
      // AvatarFace: maxOffset .12 * r of the avatar circle; ThreeBMascot: .14 * r of the body circle
      let c = el.previousElementSibling
      while (c && c.tagName !== 'circle') c = c.previousElementSibling
      if (!c) c = el.parentElement?.querySelector('circle')
      const r = c ? +c.getAttribute('r') : avatar ? 12 : 6.5
      return { el, max: (avatar ? 0.12 : 0.14) * r, center: null, id: el.__id, applied: null }
    })
  }

  // target: {x, y} in outer (viewBox) units or null (faces centred)
  gaze(target) {
    if (!this.scene) return
    this.collectFaces()
    if (!this.faces.length) return
    const s = this.scene
    const D = Math.max(1, 0.35 * s.outer.w)
    let rect = null
    for (const f of this.faces) {
      if (!target) {
        if (f.applied) {
          f.el.style.transform = ''
          f.applied = null
        }
        continue
      }
      // centre in outer units; re-measured when the face node changed (new avatar / mascot)
      if (!f.center || f.id !== f.el.__id) {
        rect = rect || this.svg.getBoundingClientRect()
        if (!rect.width) return
        const b = f.el.getBoundingClientRect()
        const sx = s.viewBox[2] / rect.width
        const sy = s.viewBox[3] / rect.height
        // measured box includes the offset currently applied to the face; take it back out
        const ox = f.applied ? f.applied.x : 0
        const oy = f.applied ? f.applied.y : 0
        f.center = {
          x: (b.left + b.width / 2 - rect.left) * sx + s.viewBox[0] - ox,
          y: (b.top + b.height / 2 - rect.top) * sy + s.viewBox[1] - oy,
        }
        f.id = f.el.__id
      }
      const dx = target.x - f.center.x
      const dy = target.y - f.center.y
      const n = Math.hypot(dx, dy)
      const k = Math.min(n, D) / D
      const hx = n > 0 ? (dx / n) * k * f.max : 0
      const hy = n > 0 ? (dy / n) * k * f.max : 0
      if (!f.applied || Math.abs(hx - f.applied.x) > 0.01 || Math.abs(hy - f.applied.y) > 0.01) {
        f.el.style.transform = `translate(${hx.toFixed(2)}px, ${hy.toFixed(2)}px)`
        f.applied = { x: hx, y: hy }
      }
    }
  }

  // pointer (client px) -> outer units
  toOuter(pt) {
    const s = this.scene
    if (!s || !pt) return null
    const r = this.svg.getBoundingClientRect()
    if (!r.width || !r.height) return null
    return { x: ((pt.x - r.left) * s.viewBox[2]) / r.width + s.viewBox[0], y: ((pt.y - r.top) * s.viewBox[3]) / r.height + s.viewBox[1] }
  }

  invalidate() {
    this.faces.forEach((f) => (f.center = null))
  }

  destroy() {
    this.svg.remove()
  }
}
