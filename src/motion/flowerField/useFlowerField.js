import { useEffect, useState } from 'react'
import { loadFlowerArt, loadDroneFrames, loadJson } from './assets.js'
import { createFlowerField } from './engine.js'

function useMediaQuery(query) {
  const get = () => (query && typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    if (!query) return undefined
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

/**
 * Mounts a FlowerField engine on `canvasRef`.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {object}   spec
 * @param {string}   [spec.query]      media query selecting the "mobile" variant (field re-mounts + replays its intro on change)
 * @param {string}   [spec.layoutUrl]  baked placement JSON ({ desktop, mobile } or a single { families, flowers })
 * @param {boolean}  [spec.withDrones] load the drone mascot frames
 * @param {(ctx: { mobile: boolean, layouts: any }) => object} spec.options  engine options (art + frames are injected)
 * @returns {{ drawn: boolean }} drawn flips true after the first canvas frame (use it to retire a static fallback)
 */
export function useFlowerField(canvasRef, { query, layoutUrl, withDrones = false, options }) {
  const mobile = useMediaQuery(query)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    let engine = null, cancelled = false
    Promise.all([loadFlowerArt(), withDrones ? loadDroneFrames() : null, layoutUrl ? loadJson(layoutUrl) : null])
      .then(([art, droneFrames, layouts]) => {
        if (cancelled) return
        const opts = options({ mobile, layouts })
        engine = createFlowerField(canvas, { ...opts, art, droneFrames, onFirstFrame: () => { if (!cancelled) setDrawn(true) } })
      })
      .catch((err) => { if (!cancelled) console.warn('[flowerField] static fallback kept:', err) })
    return () => { cancelled = true; engine?.destroy() }
    // options is expected to be a stable module-level function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, mobile, layoutUrl, withDrones])

  return { drawn }
}
