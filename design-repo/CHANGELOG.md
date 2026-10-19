# Changelog

Version headings here are documentation-only (see `versionFieldNote` in `registry.manifest.json`).

## 1.0.0 — initial build

- Built from scratch per the design-repo-extraction BUILD-GUIDE: tokens (312 leaves across foundation/semantic/component/layout + light theme), 6 primitives, 7 components, 11 section contracts, 1 template, 1 route, 13 compatibility rules, 9 asset roles.
- Section ids and template node order aligned 1:1 with the project's `ia.json` (11 sections); `verify_all.py` checks alignment when the sibling `ia.json` is present.
- Evidence ledger `extraction/measured-values.json` (65 entries) with path:line citations plus `contains` anchors; records QA-measured page heights (1440×900→7404, 1280×900→7049, 768→6771, 390×844→7006, original == clone; heights depend on viewport height) and motion values.
- Corrected CLONE_SPEC claims against source code / QA: monitor text centred at 390; footer 12% currentColor dividers; timeline caption docked on top; live segment widths; hero frame 3:4 / 4:3 / 2:1; mobile Roobert (H1/H2 500) for byline, section bylines, solution H3; nav blur/backdrop fades in when scrolled >10px or a menu is open; spacing is stepped, not fluid; footer hover #8d75e6.
- Corrected the pre-investigation claim that all nav/footer links are absolute tines.com URLs: only the footer is; nav items and hero/solution/CTA buttons are root-relative and dead in the clone.
- Budget calibration: the semantic validator flagged the real H1 line "Now give them a secure place to do it." (9 words) against an initial maxWords 8; budgets were recalibrated against the real source copy (H1 line 10, monitor paragraph 32, nav promo title 22).
- Dropped a drafted `SCROLL_DRIVEN_BUDGET` rule before shipping: with NO_REPEAT it could never fire.
- Recheck pass (headless Playwright, live original + fresh build of current source in a temp dir): the brief's "hero frame offset −120px ≥1024 / −40px below" did NOT reproduce. Both sites measure −40px ≥1024, −130px 640–1023, +45px <640. The contract, ledger and README were corrected; the claim is recorded under `briefClaimsNotReproduced`. Also found `dist/` stale vs `src/`, and that page heights depend on viewport height (recorded with viewport sizes).
- Recheck: section `implementedBy` now uses ia.json's exact string (no sibling-path pointer outside the ledger); ia-alignment compares it.
- Verification: Draft-07 0 errors; adversarial 49 mutations rejected / 10 controls pass; drift_proof 18 injections each caught; self-containment re-run in an isolated temp dir; zip hygiene checked.
