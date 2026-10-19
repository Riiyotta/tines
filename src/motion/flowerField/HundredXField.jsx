import { useRef } from 'react'
import { useFlowerField } from './useFlowerField.js'
import { hundredXOptions, bleedBox, HUNDREDX_LAYOUT_URL, HUNDREDX_MOBILE_QUERY } from './configs/hundredx.js'

const CANVAS_BOX = bleedBox({ width: 504.96, height: 264, bleed: { top: 40, right: 80, bottom: 40, left: 80 } })

/**
 * Live hero "100x" flower wordmark. Renders inside the existing hundredx-sink stage (which keeps the
 * scroll transform); the static PNG stays as the accessible image + fallback until the first canvas frame.
 */
export default function HundredXField() {
  const canvasRef = useRef(null)
  const { drawn } = useFlowerField(canvasRef, {
    query: HUNDREDX_MOBILE_QUERY,
    layoutUrl: HUNDREDX_LAYOUT_URL,
    withDrones: true,
    options: hundredXOptions,
  })
  return (
    <>
      <img
        data-motion="hero-canvas-100x"
        src="/assets/canvas/hero-field-0.png"
        alt="100× — simpler, faster, easier to adopt"
        draggable="false"
        className={`pointer-events-none absolute left-1/2 top-1/2 h-auto w-[131.71%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-300 motion-reduce:transition-none ${drawn ? 'opacity-0' : 'opacity-100'}`}
      />
      <canvas
        ref={canvasRef}
        data-motion="hero-canvas-100x-live"
        aria-hidden="true"
        className="absolute block"
        style={CANVAS_BOX}
      />
    </>
  )
}
