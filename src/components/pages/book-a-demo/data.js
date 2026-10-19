// Backdrop product cards for /book-a-demo/ (specs/pages-a.md §5.1). Positions are page coordinates at 1440 wide.
import storyboard from '../../../../reference/svg/pages/book-a-demo-talk-to-a-product-expert.svg?raw'
import cases from '../../../../reference/svg/pages/book-a-demo-talk-to-a-product-expert-2.svg?raw'
import ops from '../../../../reference/svg/pages/book-a-demo-talk-to-a-product-expert-3.svg?raw'
import workbench from '../../../../reference/svg/pages/book-a-demo-talk-to-a-product-expert-4.svg?raw'
import canva from '../../../../reference/svg/pages/enterprise-canva.svg?raw'
import code42 from '../../../../reference/svg/pages/enterprise-code42.svg?raw'
import elastic from '../../../../reference/svg/pages/enterprise-elastic.svg?raw'
import mars from '../../../../reference/svg/pages/enterprise-mars.svg?raw'
import coinbase from '../../../../reference/svg/pages/enterprise-coinbase.svg?raw'
import reddit from '../../../../reference/svg/pages/enterprise-reddit.svg?raw'
import { LOGOS } from '../../shared/LogoSet.jsx'
import foreground from '../../../../reference/svg/pages/book-a-demo-talk-to-a-product-expert-5.svg?raw'

export const MOBILE_BACKDROP = '/assets/pages/book-a-demo/product-mobile-backdrop-2ae189ade6f1fe20599b469a477ddd73.svg'

// shift = parallax end translateY (px): storyboard -32, cases -24, ops -16, foreground -56 (workbench none)
export const BACKDROP_CARDS = [
  { id: 'cases', svg: cases, x: 970, y: 308, w: 660, h: 423, shift: -24 },
  { id: 'ops', svg: ops, x: -530, y: 261, w: 820, h: 454, shift: -16 },
  { id: 'storyboard', svg: storyboard, x: 72, y: 96, w: 560, h: 560, shift: -32 },
  { id: 'workbench', svg: workbench, x: 985, y: 130, w: 420, h: 336, shift: -8 },
  { id: 'foreground', svg: foreground, x: 230, y: 567, w: 400, h: 343, shift: -56 },
]

const pick = (n) => LOGOS.find(([name]) => name === n)[1]
// 390: static "Trusted by" logo grid (two rows) instead of the marquee
export const MOBILE_LOGOS = [canva, code42, pick('Dropbox'), elastic, pick('Intercom'), mars, coinbase, reddit]

export const EXPECT = [
  'Zero-pressure, technical demo of the Tines platform',
  'Walkthrough of a relevant use case',
  'Overview of products and plans',
  'Insight into API and integration capabilities',
]
