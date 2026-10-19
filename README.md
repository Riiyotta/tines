# Tines homepage clone — information architecture

Local reference clone of the tines.com homepage (React 18 + Vite + Tailwind v3). Run it with `npm install && npm run dev` (port 5191). Tines' brand, customer logos, fonts and product imagery belong to their owners, so keep this local and don't deploy it.

## IA files

| File | Hand-edited? | What it is |
|---|---|---|
| `ia.json` | **yes, the only one** | Source of truth: categories, sections (each defined once, with `implementedBy`), templates |
| `IA.md` | no, generated | Readable IA doc |
| `matrix.csv` | no, generated | Section × template matrix |
| `validate.mjs` / `build.mjs` | no, copied from the ia-builder skill | Consistency checker / generator |

After editing `ia.json`, re-run:

```bash
node validate.mjs && node build.mjs
```

## What the data shows

- **One route, one template.** The clone covers only `/`, so there's no evidence yet for any other page shape. Templates for pricing, blog or customer pages would be guesses. Only a few footer links are absolute tines.com URLs. Most nav and button links are root-relative (`/book-a-demo/`, `/3b/`, `/blog/`…) and go nowhere in the clone.
- **11 sections in 6 categories, all page-local.** None is reused because there's only one template. The `validate.mjs` reuse report therefore can't yet say which components should be shared. `chrome.site-nav` and `chrome.site-footer` are the obvious first candidates once a second page is added.
- **The hero is four sections, all in one component.** `hero.intro`, `proof.logo-marquee`, `hero.wordmark-stage` and `hero.product-demo` are all rendered by `Hero.jsx`. Every other section maps one-to-one to its own file under `src/components/`.
- **Three sections depend on canvas stand-ins.** `hero.wordmark-stage`, `narrative.monitor-banner` and `conversion.start-today-cta` use runtime canvas art on the original, but static PNGs here. `narrative.solution-panel`'s flower bed is in the same situation.
