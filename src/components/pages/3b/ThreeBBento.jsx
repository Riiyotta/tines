/**
 * ThreeBBento (specs/pages-a.md §2.4-2.6). One component, three data sets (Build / Run / Monitor) selected with `section`.
 * Tiles are placed with CSS vars (--c / --r) on a 12/13 column grid from 1024, 2 columns at 768, 1 column below
 * (see `.bento-grid` in src/index.css). Illustrations are the downloaded SVGs; the typing prompt, caret blinks and
 * the floating skills cap follow the measured motion (steps(1) 1.1s carets, 4s ease-in-out float).
 */
import { useEffect, useRef, useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import { PullQuoteCard } from '../../shared/PullQuoteCard.jsx'
import { SECTIONS, BODIES as B, MONITOR_QUOTE, PROMPTS, A } from './data.jsx'
import fin from '../../../../reference/svg/pages/3b-fin.svg?raw'
import orb from '../../../../reference/svg/pages/3b-orb.svg?raw'
import chatIcon from '../../../../reference/svg/pages/3b-q5byyg-icon.svg?raw'
import sendIcon from '../../../../reference/svg/pages/3b-q5byyg-send.svg?raw'
import stopwatch from '../../../../reference/svg/pages/3b-stopwatch-showing-the-current-local-time.svg?raw'
import t0 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon.svg?raw'
import t1 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-2.svg?raw'
import t2 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-3.svg?raw'
import t3 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-4.svg?raw'
import t4 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-5.svg?raw'
import t5 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-6.svg?raw'
import t6 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-7.svg?raw'
import t7 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-8.svg?raw'
import t8 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-9.svg?raw'
import t9 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-10.svg?raw'
import t10 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-11.svg?raw'
import t11 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-12.svg?raw'
import t12 from '../../../../reference/svg/pages/3b-kwifpg-tiletitleicon-13.svg?raw'
import corner1 from '../../../../reference/svg/pages/3b-kwifpg-tilecornervisual.svg?raw'
import corner2 from '../../../../reference/svg/pages/3b-kwifpg-tilecornervisual-2.svg?raw'
import corner3 from '../../../../reference/svg/pages/3b-kwifpg-tilecornervisual-3.svg?raw'
import corner4 from '../../../../reference/svg/pages/3b-kwifpg-tilecornervisual-4.svg?raw'
import corner5 from '../../../../reference/svg/pages/3b-kwifpg-tilecornervisual-5.svg?raw'
import connectors from '../../../../reference/svg/pages/3b-kwifpg-connectorsvisual.svg?raw'
import accessMap from '../../../../reference/svg/pages/3b-kwifpg-accessmapvisual.svg?raw'
import overlaySavings from '../../../../reference/svg/pages/3b-kwifpg-tileoverlayillustration.svg?raw'
import overlayCenter from '../../../../reference/svg/pages/3b-kwifpg-tileoverlaycenter.svg?raw'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- small pieces ---------- */
function Caption({ icon, title, body, wide = false, className = '' }) {
  return (
    <figcaption className={`${wide ? 'max-w-[368px]' : 'max-w-[288px]'} ${className}`}>
      <h3 className={`m-0 mb-[6px] flex items-center gap-[7.5px] font-mono text-tile-title-sm font-bold text-purple-55 md:text-tile-title`}>
        {icon && <InlineSvg svg={icon} className="h-[18px] w-[18px] shrink-0" />}
        {title}
      </h3>
      <p className="m-0 font-sans text-tile-body font-medium">{body}</p>
    </figcaption>
  )
}

function Tile({ c, r, feature = false, minH, minHMd, padless = false, className = '', children }) {
  return (
    <figure
      className={`bento-cell bento-tile relative m-0 flex flex-col overflow-hidden rounded-[12px] bg-lightest md:rounded-usp ${padless ? '' : 'p-4 md:p-6'} ${feature ? 'border border-tile-border' : ''} ${className}`}
      style={{ '--c': c, '--r': r, '--min-h': minH, '--min-h-md': minHMd }}
    >
      {children}
    </figure>
  )
}

const Scrim = () => <div aria-hidden="true" className="tile-scrim-b pointer-events-none absolute inset-0" />

/** Visual box: flex-1, optional bleed to the tile edge. */
const Visual = ({ bleed = '', className = '', children }) => (
  <div className={`relative min-h-0 flex-1 ${bleed} ${className}`}>{children}</div>
)

/** "corner" tile: copy column (38.5%) + clipped oversized product visual */
function Corner({ c, r, icon, title, body, art, artSize, artClass = '', visual, copyW = '38.5%', wide = false, gap }) {
  return (
    <Tile c={c} r={r} feature padless>
      <div className="relative grid min-h-0 flex-1 grid-cols-1 xl:grid-cols-[var(--copy-w)_1fr] xl:gap-6" style={{ '--copy-w': copyW }}>
        <div className="relative z-[1] flex h-full flex-col justify-end p-4 md:p-6 xl:justify-start xl:pt-6">
          <img src={art} alt="" className={`hidden xl:block ${artClass}`} style={{ width: artSize[0], height: artSize[1] }} />
          <Caption icon={icon} title={title} body={body} wide={wide} className={`xl:mt-auto ${gap || ''}`} />
        </div>
        <div aria-hidden="true" className="tile-scrim-b pointer-events-none absolute inset-0 z-[1] xl:hidden" />
        <div className="absolute left-4 top-4 origin-top-left scale-[.8] md:left-6 md:top-6 xl:relative xl:left-auto xl:top-auto xl:mt-6 xl:scale-100 xl:overflow-hidden">
          <InlineSvg svg={visual[0]} className="!relative !block max-w-none" style={{ width: visual[1], height: visual[2] }} />
        </div>
      </div>
    </Tile>
  )
}

/** Overlay tile: absolutely positioned illustration + bottom scrim, caption pinned to the bottom */
function Overlay({ c, r, icon, title, body, wide, minH, minHMd, feature = true, children }) {
  return (
    <Tile c={c} r={r} feature={feature} minH={minH} minHMd={minHMd}>
      {children}
      <Scrim />
      <Caption icon={icon} title={title} body={body} wide={wide} className="relative z-[1] mt-auto" />
    </Tile>
  )
}

function Typer() {
  const [text, setText] = useState('')
  useEffect(() => {
    if (reduced()) { setText(PROMPTS[0]); return undefined }
    let i = 0, n = 0, dir = 1, timer
    const step = () => {
      const full = PROMPTS[i]
      n += dir
      setText(full.slice(0, n))
      let delay = dir > 0 ? 55 : 22
      if (dir > 0 && n >= full.length) { dir = -1; delay = 2200 }
      else if (dir < 0 && n <= 0) { dir = 1; i = (i + 1) % PROMPTS.length; delay = 500 }
      timer = setTimeout(step, delay)
    }
    timer = setTimeout(step, 800)
    return () => clearTimeout(timer)
  }, [])
  return (
    <span className="block font-mono text-typer font-medium text-purple-50" aria-label={PROMPTS[0]}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="caret-blink ml-px inline-block h-6 w-[2px] translate-y-[5px] rounded-[1px] bg-purple-50" />
    </span>
  )
}

/* ---------- tile sets ---------- */
function Build() {
  return (
    <>
      {/* Start with a prompt */}
      <Tile c="4 / span 5" r="1 / span 2" padless>
        <div className="absolute inset-y-0 right-0 left-[103px] top-6 rounded-tl-usp bg-purple-5 p-7 max-md:left-[24%]"><Typer /></div>
        <InlineSvg svg={orb} className="absolute left-6 top-10 h-[55px] w-[55px]" />
        <div aria-hidden="true" className="tile-scrim-prompt pointer-events-none absolute inset-x-0 bottom-0 h-[164px]" />
        <Caption title="Start with a prompt" body={B.prompt} className="relative z-[1] mt-auto w-[384px] max-w-full p-6 pr-[24px] [&>p]:max-w-[336px]" />
      </Tile>

      {/* Chat */}
      <Tile c="9 / span 4" r="1" feature padless>
        <div className="relative z-[1] ml-6 h-[200px] shrink-0 -translate-y-6 border-b border-l border-tile-border bg-lightest max-md:-mt-0 xl:-mr-6" style={{ borderBottomLeftRadius: 14 }}>
          <div className="absolute inset-x-0 bottom-[9px] mx-auto flex w-[340px] max-w-full flex-col gap-3 px-5 py-6 text-center">
            <InlineSvg svg={chatIcon} className="mx-auto block h-9 w-9 text-purple-50" />
            <p className="m-0 font-sans text-[16px] font-bold leading-[22.4px] text-purple-65">Evening, Rowan</p>
            <div className="mt-1 flex h-12 items-center rounded-full border border-tile-border bg-lightest px-3">
              <span aria-hidden="true" className="caret-blink h-[14px] w-[2px] shrink-0 rounded-[1px] bg-purple-40" />
              <span className="ml-1 flex-1 truncate text-left font-sans text-[11.5px] leading-[13.2px] text-purple-45">Ask anything across your tools and data…</span>
              <InlineSvg svg={sendIcon} className="ml-2 h-[26px] w-[26px] shrink-0 rounded-full bg-purple-55 p-[3px] text-lightest" />
            </div>
          </div>
        </div>
        <Caption icon={t0} title="Chat" body={B.chat} wide className="-mt-6 p-6" />
      </Tile>

      {/* Code-first */}
      <Tile c="1 / span 4" r="3" minH="335px">
        <Visual bleed="-mt-6"><img src={`${A}build-in-code.svg`} alt="" className="block h-auto w-full" /></Visual>
        <Caption title="Code-first" body={B.code} className="mt-6" />
      </Tile>

      {/* Test as you build */}
      <Tile c="5 / span 4" r="3" minH="321px">
        <Visual className="flex items-center justify-center"><InlineSvg svg={stopwatch} className="block h-[142px] w-[117px]" /></Visual>
        <Caption title="Test as you build" body={B.test} className="mt-6" />
      </Tile>

      {/* Build from anywhere */}
      <Tile c="9 / span 4" r="2 / span 2" minH="367px" minHMd="366.2px">
        <Visual bleed="-mx-4 -mt-4 md:-mx-6 md:-mt-6"><img src={`${A}build-anywhere.svg`} alt="" className="block h-auto w-full" /></Visual>
        <Caption title="Build from anywhere" body={B.anywhere} className="mt-6" />
      </Tile>

      {/* Spaces */}
      <Overlay c="1 / span 3" r="4" icon={t1} title="Spaces" body={B.spaces} minHMd="366.2px">
        <img src={`${A}build-spaces.svg`} alt="" className="pointer-events-none absolute left-[14px] top-px block h-auto w-[406px] max-w-none" />
      </Overlay>

      {/* Skills */}
      <Tile c="4 / span 3" r="4" feature>
        <Visual className="flex items-center justify-center"><img src={`${A}build-skills.svg`} alt="" className="tile-float block h-[126px] w-[123px]" /></Visual>
        <Caption icon={t2} title="Skills" body={B.skills} className="mt-6" />
      </Tile>

      <Corner c="7 / span 6" r="4" icon={t3} title="Branches" body={B.branches} art={`${A}build-branches.svg`} artSize={[161, 92]} artClass="-ml-6 mt-6" visual={[corner1, 900, 608]} />
    </>
  )
}

function Run() {
  return (
    <>
      <Tile c="5 / span 3" r="1 / span 2" minH="389px" minHMd="364.5px">
        <Visual className="flex items-center justify-center"><img src={`${A}sandboxed-execution.svg`} alt="" className="block h-[250px] w-[168px]" /></Visual>
        <Caption title="Sandboxed execution" body={B.sandbox} className="mt-6" />
      </Tile>
      <Overlay c="8 / span 5" r="1 / span 2" icon={t4} title="Connectors" body={B.connectors} minHMd="364.5px">
        <InlineSvg svg={connectors} className="pointer-events-none absolute left-4 top-4 origin-top-left max-xl:scale-[.8] xl:left-6 xl:top-6 !block h-[438px] w-[612px] max-w-none" />
      </Overlay>
      <Tile c="1 / span 4" r="2" feature>
        <Visual bleed="-mx-4 -mt-4 md:-mx-6 md:-mt-6" className="overflow-visible">
          <img src={`${A}deployed.svg`} alt="" className="absolute inset-x-0 -top-[11.77px] block h-auto w-full" />
        </Visual>
        <Caption title="Deployed your way" body={B.deployed} className="mt-6" />
      </Tile>
      <Corner c="1 / span 6" r="3" icon={t5} title="Autofix" body={B.autofix} art={`${A}autofix.svg`} artSize={[69, 77]} copyW="38.5%" visual={[corner2, 900, 560]} />
      <Corner c="7 / span 6" r="3" icon={t6} title="Autotune" body={B.autotune} art={`${A}autotune.svg`} artSize={[52, 83]} visual={[corner3, 900, 560]} />
    </>
  )
}

function Monitor() {
  return (
    <>
      <div className="bento-cell bento-wide-md relative overflow-hidden rounded-[12px] md:rounded-usp xl:min-h-0" style={{ '--c': '6 / span 8', '--r': '1 / span 2' }}>
        <div className="quote-flower-host pointer-events-none absolute inset-0 overflow-hidden rounded-usp" aria-hidden="true">
          <img src={`${A}quote-flower.png`} alt="" className="quote-flower absolute top-[93px] left-0 block h-auto w-[75%] max-w-none" />
        </div>
        <PullQuoteCard
          variant="bento"
          {...MONITOR_QUOTE}
          logo={<InlineSvg svg={fin} label="Fin" className="block h-[30px] w-[76px] shrink-0 text-purple-55" />}
          className="relative h-full !rounded-usp"
        />
      </div>
      <Corner c="1 / span 5" r="2 / span 2" icon={t7} title="AI Spend" body={B.spend} art={`${A}ai-spend.svg`} artSize={[103, 129]} copyW="38.2%" visual={[corner4, 678, 465]} />
      <Overlay c="6 / span 3" r="3" icon={t8} title="Access" body={B.access}>
        <InlineSvg svg={accessMap} className="pointer-events-none absolute left-4 top-4 origin-top-left max-xl:scale-[.8] xl:left-6 xl:top-6 !block h-[142px] w-[308px] max-w-none" />
      </Overlay>
      <Corner c="9 / span 5" r="3 / span 2" icon={t9} title="Duplicates" body={B.duplicates} art={`${A}duplicates.svg`} artSize={[90, 98]} copyW="38.2%" visual={[corner5, 400, 376]} />
      <Overlay c="1 / span 5" r="4 / span 2" icon={t10} title="Savings" body={B.savings}>
        <InlineSvg svg={overlaySavings} className="pointer-events-none absolute left-4 top-4 origin-top-left max-xl:scale-[.8] xl:left-6 xl:top-6 !block h-[465px] w-[678px] max-w-none" />
      </Overlay>
      <Tile c="6 / span 3" r="4 / span 2" feature>
        <Visual className="flex items-center justify-center"><img src={`${A}routes.svg`} alt="" className="block h-[174px] w-[95px]" /></Visual>
        <Caption icon={t11} title="Routes" body={B.routes} className="mt-6" />
      </Tile>
      <Overlay c="9 / span 5" r="5" icon={t12} title="Dependencies" body={B.dependencies} wide>
        <InlineSvg svg={overlayCenter} className="pointer-events-none absolute left-1/2 top-[-46px] !block h-[390px] w-[540px] max-w-none -translate-x-1/2" />
      </Overlay>
    </>
  )
}

const SETS = { build: Build, run: Run, monitor: Monitor }

export function ThreeBBento({ section }) {
  const s = SECTIONS.find((x) => x.id === section)
  const Set = SETS[section]
  return (
    <section className="mx-auto mt-section-margin max-w-page px-page" aria-labelledby={`bento-${s.id}`}>
      <div
        className="bento-grid rounded-[24px] bg-white p-sp-md md:rounded-panel-md xl:rounded-panel"
        style={{ '--cols': s.cols, '--rows': s.rows, '--rows-xl': s.rowsXl, '--rows-2xl': s.rows2xl }}
      >
        <div
          className="bento-intro flex flex-col gap-[9.6px] px-4 pb-sp-xl pt-8 text-center md:mx-auto md:w-full md:max-w-[352px] md:px-[18px] xl:mx-0 xl:px-0 xl:max-w-[352px] xl:pl-6 xl:pr-0 xl:pt-6 xl:text-left"
          style={{ '--c': s.id === 'build' ? '1 / span 3' : s.id === 'run' ? '1 / span 4' : '1 / span 5', '--r': s.id === 'build' ? '1 / span 2' : '1' }}
        >
          <h2 id={`bento-${s.id}`} className={`m-0 font-sans text-bento-h2-sm font-normal xl:text-bento-h2 ${s.accent}`}>
            <strong className="font-bold">{s.lead}</strong> {s.rest}
          </h2>
          <p className={`m-0 font-serif text-bento-desc font-medium ${s.accent}`}>{s.desc}</p>
        </div>
        <Set />
      </div>
    </section>
  )
}
