// Original placeholder copy generator (COPY RULE: long bodies are not reproduced from the live site).
const WORDS = ('workflow story action agent trigger event signal alert case record team build review approve route enrich triage notify ' +
  'connect system tool inbox queue owner policy audit step branch condition result summary context detail export import schedule ' +
  'monitor change release update draft check confirm assign resolve escalate document template share reuse simple clear steady').split(' ')
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** n words of deterministic filler, returned as sentences. */
export function words(n, seed = 1) {
  let x = seed * 9301 + 49297
  const out = []
  let sentence = 0
  for (let i = 0; i < n; i++) {
    x = (x * 233280 + 12345) % 2147483647
    let w = WORDS[x % WORDS.length]
    sentence += 1
    if (sentence === 1) w = cap(w)
    const end = sentence >= 9 + (x % 5) || i === n - 1
    out.push(end ? `${w}.` : w)
    if (end) sentence = 0
  }
  return out.join(' ')
}
export const title = (n, seed = 1) => words(n, seed).replace(/\.$/, '').replace(/\./g, ',')
