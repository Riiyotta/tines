/**
 * LogoSet + LogoMarquee. Extracted from src/components/Hero.jsx (homepage spec §2 Logo marquee).
 * Implements specs/pages-a.md REUSE MAP "Logo marquee" and §1.3: `size="lg"` renders the same 11 logos
 * at 1.25x (118x26 vs 94x21), box 47 tall (vs 37), fill currentColor, gap 45, 41.625s drift.
 *
 * LogoSet({ hidden, size })   -> the 11 <span> logos (Hero.jsx wraps it in its own marquee box).
 * LogoMarquee({ size, className }) -> mask box + duplicated track, with the data-motion hooks
 *   (logo-marquee / logo-marquee-track) that src/motion/initMotion.js drives. NOTE initMotion only
 *   binds the FIRST marquee in the document -- Animation must handle per-page instances.
 */
import coinbase from '../../../reference/svg/logo-coinbase.svg?raw'
import databricks from '../../../reference/svg/logo-databricks.svg?raw'
import reddit from '../../../reference/svg/logo-reddit.svg?raw'
import snowflake from '../../../reference/svg/logo-snowflake.svg?raw'
import intercom from '../../../reference/svg/logo-intercom.svg?raw'
import dropbox from '../../../reference/svg/logo-dropbox.svg?raw'
import pinterest from '../../../reference/svg/logo-pinterest.svg?raw'
import mongodb from '../../../reference/svg/logo-mongodb.svg?raw'
import sophos from '../../../reference/svg/logo-sophos.svg?raw'
import canva from '../../../reference/svg/logo-canva.svg?raw'
import mckesson from '../../../reference/svg/logo-mckesson.svg?raw'

// §2 Logo marquee order
export const LOGOS = [
  ['Coinbase', coinbase], ['Databricks', databricks], ['Reddit', reddit], ['Snowflake', snowflake],
  ['Intercom', intercom], ['Dropbox', dropbox], ['Pinterest', pinterest], ['MongoDB', mongodb],
  ['Sophos', sophos], ['Canva', canva], ['McKesson', mckesson],
]

export function LogoSet({ hidden, size = 'md' }) {
  return LOGOS.map(([name, svg]) => (
    <span
      key={name}
      // pages-a §1.3: lg = logos x1.25 of the homepage's rendered size (svg natural x1.2; zoom keeps the svg's own aspect ratio)
      className={`relative flex shrink-0 items-center [&>svg]:block ${size === 'lg' ? '[zoom:1.2] sm:[zoom:.8] xl:[zoom:1.2]' : ''}`}
      aria-hidden={hidden || undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  ))
}

export function LogoMarquee({ size = 'md', className = '' }) {
  const lg = size === 'lg'
  return (
    <div
      data-motion="logo-marquee"
      // lg (pages-a §1.3): margin 0 -20px, padding 4px 0, box 47 tall; gap 45 (390: 20)
      className={`marquee-mask -mx-5 cursor-grab select-none overflow-hidden py-1 active:cursor-grabbing ${className}`}
    >
      <div
        data-motion="logo-marquee-track"
        className={`flex w-max items-center ${lg ? 'gap-5 sm:gap-[30px] xl:gap-[45px]' : 'gap-5 sm:gap-[30px] xl:gap-[45px]'}`}
      >
        <LogoSet size={size} />
        <LogoSet size={size} hidden />
      </div>
    </div>
  )
}
