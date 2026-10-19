// Deterministic ORIGINAL placeholder prose for the case-study bodies (the live copy is customer content and is not reproduced).
const CLAUSES = [
  'the team started by mapping the routine steps that took the most time each week',
  'each workflow replaced a handful of manual hand-offs with one clear sequence',
  'stakeholders could see what was happening at every stage without asking for updates',
  'new requests were routed to the right owner as soon as they arrived',
  'the data from several tools was combined into a single record that people could trust',
  'review steps were kept for the decisions that deserved a human eye',
  'builders reused the same pieces across projects, so new ideas took far less effort to launch',
  'alerts were enriched automatically before anyone had to open a ticket',
  'results were logged along the way, which made audits and retrospectives much simpler',
  'colleagues from other departments began asking for workflows of their own',
  'small improvements added up quickly once the repetitive work was out of the way',
  'the group kept a short list of ideas and shipped the most valuable one every few weeks',
  'documentation lived next to the workflow, so handing it over was never a problem',
  'errors that used to slip through were caught early and fixed in one place',
  'people felt able to focus on the interesting problems again',
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
