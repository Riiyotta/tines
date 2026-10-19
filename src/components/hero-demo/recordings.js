// Scene recordings of the original hero demo, one per layout band, sampled at the listed viewport.
// The original lays its app out in "outer" units = frameW / scale, scale = frameW < 640 ? .72 :
// frameW < 1200 ? .75 : 1, and switches layout (phone nav / compact builder) at those widths too.
// Phone (< 640 viewport) and tablet-phone (frame < 640 inside the 4:3 tablet frame) crop the frame
// border (viewBox starts at the 6px inset). Within a band we use the recording whose outer width is
// nearest; the svg viewBox scales it to the actual frame.
const BASE = '/assets/hero-demo/'
export const RECORDINGS = {
  phone: [
    { file: `${BASE}p390.json`, outerW: 541.67 },
    { file: `${BASE}p560.json`, outerW: 777.78 },
  ],
  tabletPhone: [{ file: `${BASE}tp640.json`, outerW: 805.56 }],
  tablet: [
    { file: `${BASE}t768.json`, outerW: 944 },
    { file: `${BASE}t1024.json`, outerW: 1272 },
  ],
  desktop: [
    { file: `${BASE}d1280.json`, outerW: 1200 },
    { file: `${BASE}d1440.json`, outerW: 1360 },
  ],
}

const scaleFor = (frameW) => (frameW < 640 ? 0.72 : frameW < 1200 ? 0.75 : 1)

export function pickRecording(vw, frameW) {
  // tablet-wide (4:3 frame >= 1200px) has no recording of its own: the 4:3 tablet scene is used
  const band = vw < 640 ? 'phone' : vw >= 1280 ? 'desktop' : frameW < 640 ? 'tabletPhone' : 'tablet'
  const outer = frameW / scaleFor(frameW)
  let best = RECORDINGS[band][0]
  for (const r of RECORDINGS[band]) if (Math.abs(r.outerW - outer) < Math.abs(best.outerW - outer)) best = r
  return best
}
