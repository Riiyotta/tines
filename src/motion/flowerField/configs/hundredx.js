// Hero "100x" wordmark field: values measured from tines.com (ThreeBHundredXBanner / DroneFlowerField).
// Colours here are canvas paint values (resolved from the site's --c-* tokens), not JSX styles.

export const HUNDREDX_SHAPE =
  'M70.08 47.04L70.08 215.04L33.84 215.04L33.84 95.28C32.4 97.36 29.44 99 24.96 100.2C20.48 101.4 16.16 102 12 102L12 102L0 102L0 71.04L11.28 71.04C18.64 71.04 24.32 69.28 28.32 65.76C32.32 62.24 34.88 56 36 47.04L36 47.04L70.08 47.04M150.72 216.96C129.92 216.96 114.32 210.04 103.92 196.2C93.52 182.36 88.32 162.4 88.32 136.32L88.32 136.32L88.32 125.52C88.32 99.44 93.52 79.52 103.92 65.76C114.32 52 129.92 45.12 150.72 45.12L150.72 45.12L160.56 45.12C181.36 45.12 196.96 52.04 207.36 65.88C217.76 79.72 222.96 99.6 222.96 125.52L222.96 125.52L222.96 136.32C222.96 162.4 217.76 182.36 207.36 196.2C196.96 210.04 181.36 216.96 160.56 216.96L160.56 216.96L150.72 216.96M124.56 147.12C124.56 159.6 127.12 169.16 132.24 175.8C137.36 182.44 144.08 185.76 152.4 185.76L152.4 185.76L158.88 185.76C167.2 185.76 173.96 182.44 179.16 175.8C184.36 169.16 186.96 159.6 186.96 147.12L186.96 147.12L186.96 114.72C186.96 102.24 184.36 92.68 179.16 86.04C173.96 79.4 167.2 76.08 158.88 76.08L158.88 76.08L152.4 76.08C144.08 76.08 137.36 79.4 132.24 86.04C127.12 92.68 124.56 102.24 124.56 114.72L124.56 114.72L124.56 147.12M298.32 216.96C277.52 216.96 261.92 210.04 251.52 196.2C241.12 182.36 235.92 162.4 235.92 136.32L235.92 136.32L235.92 125.52C235.92 99.44 241.12 79.52 251.52 65.76C261.92 52 277.52 45.12 298.32 45.12L298.32 45.12L308.16 45.12C328.96 45.12 344.56 52.04 354.96 65.88C365.36 79.72 370.56 99.6 370.56 125.52L370.56 125.52L370.56 136.32C370.56 162.4 365.36 182.36 354.96 196.2C344.56 210.04 328.96 216.96 308.16 216.96L308.16 216.96L298.32 216.96M272.16 147.12C272.16 159.6 274.72 169.16 279.84 175.8C284.96 182.44 291.68 185.76 300 185.76L300 185.76L306.48 185.76C314.8 185.76 321.56 182.44 326.76 175.8C331.96 169.16 334.56 159.6 334.56 147.12L334.56 147.12L334.56 114.72C334.56 102.24 331.96 92.68 326.76 86.04C321.56 79.4 314.8 76.08 306.48 76.08L306.48 76.08L300 76.08C291.68 76.08 284.96 79.4 279.84 86.04C274.72 92.68 272.16 102.24 272.16 114.72L272.16 114.72L272.16 147.12M409.44 191.04L389.04 170.64L426.48 132.96L389.04 95.52L409.44 75.12L446.88 112.56L484.32 75.12L504.72 95.52L467.28 132.96L504.96 170.64L484.56 191.04L446.88 153.36L409.44 191.04'

export const HUNDREDX_LAYOUT_URL = '/assets/canvas-art/hundredx-layout.json'
export const HUNDREDX_MOBILE_QUERY = '(max-width: 639px)'

const C = {
  purple60: '#6741bf', green55: '#007953', green35: '#29b07d', red60: '#b02727', red35: '#fc6159',
  orange45: '#e26717', orange35: '#ff823a', lightest: '#fcf9f5',
}
const MONO = "'Roobert Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
const BLEED = { top: 40, right: 80, bottom: 40, left: 80 }
const banner = (text, background, side, fontSizePx = 12) => ({
  text, side, fontFamily: MONO, fontSizePx, textColor: C.lightest, background, strokeColor: C.purple60, strokeWidthPx: 1.5, waveAmpFraction: 0.15,
})
const TEXTS = [['100× simpler', C.green55], ['100× faster', C.red60], ['100× easier to adopt', C.orange45]]

const DRONE_BASE = {
  frameWidth: 400, frameHeight: 300, heightPx: 78, introSeconds: 3.4, introStartYFraction: 0.9, introMaxSpeed: 130,
  introSettleSeconds: 2.6, introFadeSeconds: 0.5, shadowColor: C.purple60, inkColor: C.purple60,
}
// Home page fleet (HUNDREDX_DRONES_ALT_HOME regions)
const DESKTOP_DRONES = [
  { ...DRONE_BASE, accentColor: C.green35, loopSeconds: 27, phase: 0, seed: 0.4, flipX: false, introDelaySeconds: 0, region: { x: 118, y: 60, w: 133, h: 99 }, banner: banner(...TEXTS[0], 'left') },
  { ...DRONE_BASE, accentColor: C.red35, loopSeconds: 24, phase: 0.4, seed: 1.7, flipX: true, introDelaySeconds: 0.3, region: { x: 260, y: 80, w: 149, h: 80 }, banner: banner(...TEXTS[1], 'right') },
  { ...DRONE_BASE, accentColor: C.orange35, loopSeconds: 30, phase: 0.75, seed: 3.1, flipX: true, introDelaySeconds: 0.6, region: { x: 421, y: 49, w: 105, h: 110 }, banner: banner(...TEXTS[2], 'right') },
]
// < 640px: two drones (1st + 3rd), slide in from the sides, cycle all three banners every 4s, 80% size
const MOBILE_REGIONS = [{ x: 158, y: 58, w: 376, h: 216 }, { x: 120, y: 41, w: 351, h: 230 }]
const MOBILE_DRONES = [DESKTOP_DRONES[0], DESKTOP_DRONES[2]].map((d, i) => ({
  ...d,
  heightPx: d.heightPx * 0.8,
  region: MOBILE_REGIONS[i],
  introFrom: i === 0 ? 'left' : 'right',
  introTargetXFraction: i === 0 ? 0.33 : 0.55,
  introTargetYFraction: i === 0 ? 0.33 : 0.67,
  introMaxSpeed: 280,
  clampInsetX: BLEED.left,
  banner: undefined,
  bannerCycle: TEXTS.map(([t, bg]) => banner(t, bg, d.banner.side, 12 * 0.8)),
  bannerCycleSeconds: 4,
  bannerCycleOffset: 2 * i,
  bannerCycleDelaySeconds: 1.7 * i,
}))

/** Engine options for the hero field. `layouts` = parsed hundredx-layout.json. */
export function hundredXOptions({ mobile, layouts }) {
  const layout = mobile ? layouts.mobile : layouts.desktop
  return {
    width: 504.96,
    height: 264,
    bleed: BLEED,
    shapePath: HUNDREDX_SHAPE,
    clipToShape: true,
    layout,
    seed: mobile ? 617 : 8699,
    sizeScale: mobile ? 0.46 : 0.26,
    introOrigin: { x: 0.5, y: 0.85 },
    sweepDuration: mobile ? 1.25 : 3,
    bloomDuration: mobile ? 0.75 : 0.5,
    autoRecolor: { intervalSeconds: 4, travelSeconds: 2.4, jitterSeconds: 1, includeInitialPalette: true },
    manualRecolorRange: 70,
    drones: mobile ? MOBILE_DRONES : DESKTOP_DRONES,
  }
}

/** CSS box of the canvas relative to its stage (bleed expressed as % of the stage), as on the live site. */
export function bleedBox({ width, height, bleed }) {
  return {
    left: `${(-bleed.left / width) * 100}%`,
    top: `${(-bleed.top / height) * 100}%`,
    width: `${(1 + (bleed.left + bleed.right) / width) * 100}%`,
    height: `${(1 + (bleed.top + bleed.bottom) / height) * 100}%`,
  }
}
