// Deterministic ORIGINAL placeholder prose for the case-study bodies (the live copy is customer content and is not reproduced).
const CLAUSES = [
  'the organization began by documenting the repetitive responsibilities consuming most of everyone’s available attention',
  'every automated workflow replaced several disconnected hand-offs with one transparent, dependable sequence',
  'stakeholders gained immediate visibility into progress without requesting additional status updates',
  'incoming requests were forwarded to appropriate owners the moment they appeared',
  'information gathered from numerous systems was consolidated into a single trustworthy record',
  'important judgement calls remained with experienced people, supported by relevant background material',
  'engineers repeatedly reused established building blocks, shortening the time required for subsequent projects',
  'suspicious notifications were enriched automatically before anybody needed to investigate manually',
  'outcomes were recorded throughout, which simplified compliance reviews and retrospective discussions considerably',
  'colleagues across neighbouring departments started requesting comparable improvements for their daily operations',
  'incremental refinements accumulated surprisingly quickly once tedious maintenance disappeared from the schedule',
  'the group maintained a prioritised backlog and delivered the most valuable improvement every few weeks',
  'supporting documentation stayed alongside each workflow, making ownership transfers straightforward',
  'mistakes that previously escaped detection were identified early and corrected in one central location',
  'employees regained enough capacity to concentrate on genuinely challenging, rewarding problems',
]

export function makeText(words, seed = 0) {
  const out = []
  let i = seed
  while (out.join(' ').split(/\s+/).length < words) {
    const c = CLAUSES[i % CLAUSES.length]
    out.push((out.length ? '' : '') + (out.length === 0 || /\.$/.test(out[out.length - 1]) ? c.charAt(0).toUpperCase() + c.slice(1) : c) + (out.length % 2 === 1 ? '.' : ','))
    i += 3 + (seed % 4)
  }
  let t = out.join(' ').split(/\s+/).slice(0, Math.max(3, words)).join(' ').replace(/[,.;]$/, '')
  return t + '.'
}
