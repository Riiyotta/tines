/**
 * /3b/ demo player (specs/pages-a.md §2.2). Chapter tabs above a frosted transport bar above a framed "screen".
 * The screen autoplays the downloaded teaser MP4 (muted, looping, paused off-screen via IntersectionObserver
 * rootMargin 0 0 25% 0). Clicking "Watch demo" is the placeholder for the Wistia full video (media 3bbdsjxfjs):
 * the teaser is unmuted and restarted. Time and progress are mapped onto the 7:46 running time.
 */
import { useEffect, useRef, useState } from 'react'
import InlineSvg from '../../InlineSvg.jsx'
import playIcon from '../../../../reference/svg/pages/3b-3gthra-playpause.svg?raw'
import filletLeft from '../../../../reference/svg/pages/3b-3gthra-filletleft.svg?raw'
import filletRight from '../../../../reference/svg/pages/3b-3gthra-filletright.svg?raw'
import { CHAPTERS, A } from './data.jsx'

const TOTAL = 7 * 60 + 46
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function VideoPlayer() {
  const root = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const [p, setP] = useState(0) // 0..1
  const pausedByUser = useRef(false)

  useEffect(() => {
    const v = video.current
    if (!v) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!pausedByUser.current && !reduced()) v.play().catch(() => {})
        } else v.pause()
      },
      { rootMargin: '0px 0px 25% 0px' },
    )
    io.observe(v)
    const on = () => setPlaying(true)
    const off = () => setPlaying(false)
    const tick = () => v.duration && setP(v.currentTime / v.duration)
    v.addEventListener('play', on)
    v.addEventListener('pause', off)
    v.addEventListener('timeupdate', tick)
    return () => {
      io.disconnect()
      v.removeEventListener('play', on)
      v.removeEventListener('pause', off)
      v.removeEventListener('timeupdate', tick)
    }
  }, [])

  const toggle = () => {
    const v = video.current
    if (v.paused) { pausedByUser.current = false; v.play().catch(() => {}) } else { pausedByUser.current = true; v.pause() }
  }
  const watch = () => {
    const v = video.current
    setEngaged(true)
    v.muted = false
    v.loop = false
    v.currentTime = 0
    pausedByUser.current = false
    v.play().catch(() => {})
  }

  const total = CHAPTERS.reduce((a, c) => a + c.seg, 0)
  let acc = 0
  const segs = CHAPTERS.map((c) => {
    const left = acc / total
    acc += c.seg
    return { ...c, fill: Math.max(0, Math.min(1, (p - left) / (c.seg / total))) }
  })
  const active = segs.findIndex((s) => s.fill < 1)

  return (
    <div ref={root} className="relative">
      {/* Chapter labels (hidden <640), absolute above the bar from x 116 */}
      <div className="absolute bottom-full left-[76px] hidden h-[26px] sm:flex" style={{ width: 'calc(100% - 156px)' }}>
        {CHAPTERS.map((c, i) => (
          <div key={c.label} className="label-rise flex items-end" style={{ flexGrow: c.w, flexBasis: 0, animationDelay: `${i * 0.05}s` }}>
            <button
              type="button"
              className={`relative mr-2 flex h-6 items-center gap-[6.5px] whitespace-nowrap rounded-t-[13px] bg-surface-quote-card px-[14.3px] pb-[1.56px] pt-[4.55px] font-sans text-[13px] leading-[18.2px] backdrop-blur-[16px] ${i === active || (active < 0 && i === 2) ? 'font-bold text-purple-75' : 'font-semibold'}`}
            >
              <InlineSvg svg={filletLeft} className="absolute bottom-0 right-full h-2 w-2 [&_svg]:fill-current text-surface-quote-card" />
              <span aria-hidden="true" className={`h-[7px] w-[7px] rounded-full ${i === Math.max(active, 0) ? 'bg-tint-green-book' : 'bg-purple-55'}`} />
              {c.label}
              <InlineSvg svg={filletRight} className="absolute bottom-0 left-full h-2 w-2 [&_svg]:fill-current text-surface-quote-card" />
            </button>
          </div>
        ))}
      </div>

      {/* Transport bar */}
      <div className="relative z-[1] mx-[18px] flex h-10 items-center gap-3 rounded-t-[18px] bg-player-bar px-4 py-2 backdrop-blur-[20px] sm:mx-6">
        <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-purple-65 transition-colors hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)]">
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><rect x="4" y="3" width="3.4" height="12" rx="1" /><rect x="10.6" y="3" width="3.4" height="12" rx="1" /></svg>
          ) : (
            <InlineSvg svg={playIcon} className="h-5 w-5" />
          )}
        </button>
        <div className="relative flex min-w-0 flex-1 items-center gap-[6.5px] py-[6px]">
          {segs.map((s) => (
            <div key={s.label} className="h-1 overflow-hidden rounded-full bg-seg-track" style={{ flexGrow: s.seg, flexBasis: 0 }}>
              <div className="h-full bg-purple-55" style={{ width: `${s.fill * 100}%` }} />
            </div>
          ))}
          <span aria-hidden="true" className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-55" style={{ left: `${p * 100}%` }} />
        </div>
        <span className="font-sans text-[13px] font-semibold leading-[14.95px] tabular-nums">{fmt(p * TOTAL)} / {fmt(TOTAL)}</span>
      </div>

      {/* Frame + screen */}
      <div className="rounded-[24px] sm:border sm:border-b-[3px] sm:border-purple-45 sm:bg-lightest sm:px-[6px] sm:pb-2 sm:pt-[6px]">
        <div className="relative aspect-[16/9] overflow-hidden max-sm:rounded-[24px] sm:rounded-[18px] sm:border sm:border-tint-lilac-edge bg-purple-97">
          <video
            ref={video}
            src={`${A}3b-demo-teaser.mp4`}
            poster={`${A}3b-demo-poster.jpg`}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {!engaged && (
            <button type="button" onClick={watch} className="group absolute inset-0 flex items-center justify-center" aria-label="Watch demo">
              <span aria-hidden="true" className="absolute inset-0 bg-purple-90 opacity-0 transition-opacity duration-150 group-hover:opacity-[.15]" />
              <span className="relative flex items-center gap-2 rounded-full bg-teaser-pill px-[18px] py-[11px] font-sans text-[14px] font-semibold text-lightest backdrop-blur-[8px] transition-colors group-hover:bg-purple-95">
                <InlineSvg svg={playIcon} className="teaser-blink h-4 w-4" />
                Watch demo
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
