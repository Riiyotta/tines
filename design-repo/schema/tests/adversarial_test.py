#!/usr/bin/env python3
"""Adversarial suite: every mutation of the real example must be REJECTED with
the expected rule id; every control must produce ZERO errors.

Two kinds of mutation:
  * spec mutations  - change the PageSpec, keep the real registries.
  * ctx mutations   - keep the PageSpec, change an in-memory copy of a registry
                      (templates / asset roles / section contracts) to prove the
                      validator really reads those files instead of hardcoding.

Mode (reference | generated) coverage: GEN_CASES mutate the GENERATED example (a spec that must never
carry the Tines logo or the source brand name); REGISTRY_CASES mutate an in-memory copy of
assets/asset-roles.json and must be rejected by semantic_validate.registry_findings (the pinned-value check:
a different-but-VALID value for a compliance-critical role).

Controls are synthesized generically from templates/templates.json: the full
example, a required-nodes-only spec per template, and one spec per optional
node dropped. A new template therefore gets controls with zero new code.

Usage: python3 schema/tests/adversarial_test.py   (exit 1 on any failure)
"""
import copy
import json
import os
import sys

sys.dont_write_bytecode = True
HERE =os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "schema"))
import semantic_validate as sv  # noqa: E402

with open(os.path.join(REPO, "schema", "example.pagespec.json"), encoding="utf-8") as f:
    EXAMPLE = json.load(f)
with open(os.path.join(REPO, "schema", "example.generated.pagespec.json"), encoding="utf-8") as f:
    GENERATED = json.load(f)


def node(spec, t):
    return next(n for n in spec["nodes"] if n["type"] == t)


def idx(spec, t):
    return [n["type"] for n in spec["nodes"]].index(t)


def move(spec, t, to):
    n = spec["nodes"].pop(idx(spec, t))
    spec["nodes"].insert(to, n)


def drop(spec, t):
    spec["nodes"].pop(idx(spec, t))


LONG = " ".join(["word"] * 40)


def m(fn):
    def apply(s):
        fn(s)
        return s
    return apply


# (name, spec-mutator, expected rule id)
SPEC_CASES = [
    # ---- schema layer
    ("unknown template enum", m(lambda s: s.update(template="template.pricing")), "SCHEMA"),
    ("route not in enum", m(lambda s: s.update(route="/pricing")), "SCHEMA"),
    ("wrong pageSpecVersion", m(lambda s: s.update(pageSpecVersion="9.9.9")), "SCHEMA"),
    ("invented top-level field", m(lambda s: s.update(styleOverrides={"color": "#ff0000"})), "SCHEMA"),
    ("invented node type alias", m(lambda s: s["nodes"].insert(2, {"type": "hero.video", "content": {}, "motion": {"reducedMotionFallback": "static"}})), "SCHEMA"),
    ("node missing motion", m(lambda s: node(s, "hero.intro").pop("motion")), "SCHEMA"),
    ("missing reducedMotionFallback", m(lambda s: node(s, "proof.logo-marquee")["motion"].pop("reducedMotionFallback")), "SCHEMA"),
    ("marquee fallback swapped to generic", m(lambda s: node(s, "proof.logo-marquee")["motion"].update(reducedMotionFallback="static")), "SCHEMA"),
    ("scroll-sink fallback swapped", m(lambda s: node(s, "hero.wordmark-stage")["motion"].update(reducedMotionFallback="static")), "SCHEMA"),
    ("timeline fallback swapped", m(lambda s: node(s, "hero.product-demo")["motion"].update(reducedMotionFallback="static")), "SCHEMA"),
    ("tab-wipe fallback swapped", m(lambda s: node(s, "showcase.use-case-tabs")["motion"].update(reducedMotionFallback="static")), "SCHEMA"),
    ("cursor fallback swapped", m(lambda s: node(s, "conversion.start-today-cta")["motion"].update(reducedMotionFallback="static")), "SCHEMA"),
    ("invented motion field", m(lambda s: node(s, "hero.intro")["motion"].update(inventedAnimation="bounce")), "SCHEMA"),
    ("marquee pattern not in per-section enum", m(lambda s: node(s, "proof.logo-marquee")["motion"].update(pattern="fade-up")), "SCHEMA"),
    ("pattern borrowed from another section", m(lambda s: node(s, "proof.why-tines")["motion"].update(pattern="marquee-drift")), "SCHEMA"),
    ("extra content property", m(lambda s: node(s, "hero.intro")["content"].update(subheadline="x")), "SCHEMA"),
    ("missing required content field", m(lambda s: node(s, "hero.intro")["content"].pop("byline")), "SCHEMA"),
    ("invented assetRole", m(lambda s: node(s, "hero.wordmark-stage")["content"]["media"].update(assetRole="stock.photo")), "SCHEMA"),
    ("valid role in wrong field (logo in marquee)", m(lambda s: node(s, "proof.logo-marquee")["content"]["logoAsset"].update(assetRole="brand.tines-logo")), "SCHEMA"),
    ("real-logo source smuggled in", m(lambda s: node(s, "proof.logo-marquee")["content"].update(logoSource="real-customer-logos")), "SCHEMA"),
    ("CTA style swapped", m(lambda s: node(s, "hero.intro")["content"]["primaryCta"].update(style="outlined")), "SCHEMA"),
    ("raw live URL on CTA", m(lambda s: node(s, "hero.intro")["content"]["primaryCta"].update(href="https://www.tines.com/book-a-demo/")), "SCHEMA"),
    ("too many team tabs", m(lambda s: node(s, "showcase.use-case-tabs")["content"]["tabs"].append(dict(node(s, "showcase.use-case-tabs")["content"]["tabs"][0]))), "SCHEMA"),
    ("unknown teamId", m(lambda s: node(s, "showcase.use-case-tabs")["content"]["tabs"][0].update(teamId="marketing")), "SCHEMA"),
    ("theme not evidenced", m(lambda s: s.update(theme="dark")), "SCHEMA"),
    # ---- mode field (required, closed)
    ("missing mode", m(lambda s: s.pop("mode")), "SCHEMA"),
    ("mode value not in enum", m(lambda s: s.update(mode="production")), "SCHEMA"),
    ("mode wrong case", m(lambda s: s.update(mode="Generated")), "SCHEMA"),
    ("mode null", m(lambda s: s.update(mode=None)), "SCHEMA"),
    ("mode wrong type (list)", m(lambda s: s.update(mode=["generated"])), "SCHEMA"),
    ("reference example flipped to generated still carries the Tines logo", m(lambda s: s.update(mode="generated")), "GENERATED_NO_REFERENCE_ASSET"),
    ("reference example flipped to generated: no generation-safe brand mark", m(lambda s: s.update(mode="generated")), "GENERATED_BRAND_REQUIRED"),
    ("reference example flipped to generated: source brand name in copy", m(lambda s: s.update(mode="generated")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    # ---- structural / template cross-reference
    ("duplicate hero.intro", m(lambda s: s["nodes"].insert(2, copy.deepcopy(node(s, "hero.intro")))), "NO_REPEAT"),
    ("duplicate why-tines", m(lambda s: s["nodes"].insert(idx(s, "proof.why-tines"), copy.deepcopy(node(s, "proof.why-tines")))), "NO_REPEAT"),
    ("removed mandatory nav", m(lambda s: drop(s, "chrome.site-nav")), "TEMPLATE_SEQUENCE"),
    ("removed nav also breaks NAV_FIRST", m(lambda s: drop(s, "chrome.site-nav")), "NAV_FIRST"),
    ("removed mandatory CTA", m(lambda s: drop(s, "conversion.start-today-cta")), "TEMPLATE_SEQUENCE"),
    ("removed mandatory hero.intro", m(lambda s: drop(s, "hero.intro")), "ONE_HERO_INTRO"),
    ("footer not last", m(lambda s: move(s, "chrome.site-footer", idx(s, "conversion.start-today-cta"))), "FOOTER_LAST"),
    ("CTA moved before why-tines", m(lambda s: move(s, "conversion.start-today-cta", idx(s, "proof.why-tines"))), "CTA_PRECEDES_FOOTER"),
    ("hero.intro after marquee", m(lambda s: move(s, "hero.intro", 2)), "ONE_HERO_INTRO"),
    ("monitor banner before product demo (order vs template)", m(lambda s: move(s, "narrative.monitor-banner", idx(s, "hero.product-demo"))), "TEMPLATE_SEQUENCE"),
    ("product demo pushed below body", m(lambda s: move(s, "hero.product-demo", idx(s, "proof.why-tines"))), "HERO_CLUSTER"),
    ("solution before monitor (order vs template)", m(lambda s: move(s, "narrative.solution-panel", idx(s, "narrative.monitor-banner"))), "TEMPLATE_SEQUENCE"),
    ("duplicate team tab ids", m(lambda s: node(s, "showcase.use-case-tabs")["content"]["tabs"][1].update(teamId="it")), "UNIQUE_TEAM_TABS"),
    # ---- runtime maxWords
    ("maxWords overflow hero byline", m(lambda s: node(s, "hero.intro")["content"].update(byline=LONG)), "MAX_WORDS"),
    ("maxWords overflow headline line", m(lambda s: node(s, "hero.intro")["content"]["headlineLines"].__setitem__(0, LONG)), "MAX_WORDS"),
    ("maxWords overflow nested tab body", m(lambda s: node(s, "showcase.use-case-tabs")["content"]["tabs"][2].update(body=LONG)), "MAX_WORDS"),
    ("maxWords overflow CTA label", m(lambda s: node(s, "conversion.start-today-cta")["content"]["primaryCta"].update(label="Sign up for free right now")), "MAX_WORDS"),
    ("maxWords overflow meta.title", m(lambda s: s["meta"].update(title=LONG)), "MAX_WORDS"),
    ("maxWords overflow media alt", m(lambda s: node(s, "hero.wordmark-stage")["content"]["media"].update(alt=LONG)), "MAX_WORDS"),
]


def logo_in_nav(s):
    node(s, "chrome.site-nav")["content"]["logo"]["assetRole"] = "brand.tines-logo"


def logo_in_footer(s):
    node(s, "chrome.site-footer")["content"]["logoMark"]["assetRole"] = "brand.tines-logo"


def logo_smuggle_other_section(s):
    node(s, "hero.wordmark-stage")["content"]["media"]["assetRole"] = "brand.tines-logo"


def logo_smuggle_new_field(s):
    node(s, "hero.intro")["content"]["badgeLogo"] = {"assetRole": "brand.tines-logo", "alt": "badge"}


def logo_smuggle_meta(s):
    s["meta"]["logo"] = {"assetRole": "brand.tines-logo"}


def logo_smuggle_motion(s):
    node(s, "proof.why-tines")["motion"]["watermark"] = {"assetRole": "brand.tines-logo"}


def logo_smuggle_toplevel(s):
    s["favicon"] = {"assetRole": "brand.tines-logo"}


def logo_smuggle_deep_list(s):
    node(s, "showcase.use-case-tabs")["content"]["tabs"][0]["icon"]["assetRole"] = "brand.tines-logo"


def drop_nav_logo(s):
    node(s, "chrome.site-nav")["content"].pop("logo")


def drop_footer_mark(s):
    node(s, "chrome.site-footer")["content"].pop("logoMark")


def nav_logo_other_role(s):
    node(s, "chrome.site-nav")["content"]["logo"]["assetRole"] = "illustration.brand-art"


def nav_logo_customer_trademark(s):
    node(s, "chrome.site-nav")["content"]["logo"]["assetRole"] = "customer.logo-trademark"


# (name, spec-mutator applied to the GENERATED example, expected rule id)
GEN_CASES = [
    ("generated + Tines logo in nav", m(logo_in_nav), "GENERATED_NO_REFERENCE_ASSET"),
    ("generated + Tines logo in nav (also loses safe brand)", m(logo_in_nav), "GENERATED_BRAND_REQUIRED"),
    ("generated + Tines logo in footer", m(logo_in_footer), "GENERATED_NO_REFERENCE_ASSET"),
    ("generated + Tines logo in BOTH brand marks", m(lambda s: (logo_in_nav(s), logo_in_footer(s))), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled into hero.wordmark-stage media", m(logo_smuggle_other_section), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled via invented content field", m(logo_smuggle_new_field), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled via meta", m(logo_smuggle_meta), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled via motion object", m(logo_smuggle_motion), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled via invented top-level field", m(logo_smuggle_toplevel), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled deep inside a tab icon", m(logo_smuggle_deep_list), "GENERATED_NO_REFERENCE_ASSET"),
    ("logo smuggled in a field the schema also rejects (schema layer)", m(logo_smuggle_other_section), "SCHEMA"),
    ("generated: nav logo removed", m(drop_nav_logo), "GENERATED_BRAND_REQUIRED"),
    ("generated: footer brand mark removed", m(drop_footer_mark), "GENERATED_BRAND_REQUIRED"),
    ("generated: nav logo is a non-brand role", m(nav_logo_other_role), "GENERATED_BRAND_REQUIRED"),
    ("generated: nav logo is a third-party trademark role", m(nav_logo_customer_trademark), "GENERATED_BRAND_REQUIRED"),
    ("generated: nav logo role missing", m(lambda s: node(s, "chrome.site-nav")["content"]["logo"].pop("assetRole")), "GENERATED_BRAND_REQUIRED"),
    ("generated: brand name in placeholder alt", m(lambda s: node(s, "chrome.site-nav")["content"]["logo"].update(alt="Tines logo")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    ("generated: brand name UPPERCASE in footer alt", m(lambda s: node(s, "chrome.site-footer")["content"]["logoMark"].update(alt="TINES")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    ("generated: brand name in meta.title", m(lambda s: s["meta"].update(title="Tines for everyone")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    ("generated: brand name in hero byline", m(lambda s: node(s, "hero.intro")["content"].update(byline="Tines lets every team build.")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    ("generated: brand name in a nested tab body", m(lambda s: node(s, "showcase.use-case-tabs")["content"]["tabs"][1].update(body="Tines alerts.")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    ("generated: brand name with trailing punctuation/digits", m(lambda s: node(s, "hero.intro")["content"]["tag"].update(label="Tines3B")), "GENERATED_NO_SOURCE_BRAND_TEXT"),
    ("generated: missing mode", m(lambda s: s.pop("mode")), "SCHEMA"),
    ("generated example pushed to unknown mode", m(lambda s: s.update(mode="generated-ish")), "SCHEMA"),
    ("generated example with schema-layer role outside enum", m(lambda s: node(s, "chrome.site-nav")["content"]["logo"].update(assetRole="brand.tines-logo-2")), "SCHEMA"),
]


def ctx_drop_template_node(ctx):
    t = ctx["templates"]["template.home"]
    t["nodes"] = [n for n in t["nodes"] if n["section"] != "proof.why-tines"]


def ctx_unbind_route(ctx):
    ctx["templates"]["template.home"]["routes"] = ["/elsewhere"]


def ctx_disallow_role(ctx):
    r = ctx["assetRoles"]["illustration.brand-art"]
    r["allowedSections"] = [s for s in r["allowedSections"] if s != "proof.why-tines"]


def ctx_contract_fallback(ctx):
    ctx["sections"]["hero.intro"]["motion"]["reducedMotionFallback"] = "something-else"


def ctx_make_optional_required(ctx):
    for n in ctx["templates"]["template.home"]["nodes"]:
        if n["section"] == "proof.logo-marquee":
            n["required"] = True


def ctx_placeholder_blocked(ctx):
    ctx["assetRoles"]["brand.placeholder"]["generatedMode"] = "blocked-in-generated"


def ctx_contract_unflag_brand(ctx):
    ctx["sections"]["chrome.site-nav"]["content"]["fields"]["logo"]["brandMark"] = False


def ctx_source_term(ctx):
    ctx["sourceBrand"]["terms"] = ["example"]


# (name, ctx-mutator, spec-mutator or None, expected rule id, base spec)
CTX_CASES = [
    ("validator reads template's REAL node list (section removed from template)", ctx_drop_template_node, None, "TEMPLATE_SEQUENCE"),
    ("validator reads template's REAL route list", ctx_unbind_route, None, "ROUTE_BINDING"),
    ("validator reads asset-roles allowedSections", ctx_disallow_role, None, "ASSET_ROLE_SECTION"),
    ("validator cross-checks contract fallback", ctx_contract_fallback, None, "REDUCED_MOTION_REQUIRED"),
    ("validator reads required flags", ctx_make_optional_required, lambda s: (drop(s, "proof.logo-marquee"), s)[1], "TEMPLATE_SEQUENCE"),
    ("validator reads generatedMode from the registry (placeholder re-classified blocked)", ctx_placeholder_blocked, lambda s: s.update(mode="generated") or s, "GENERATED_NO_REFERENCE_ASSET", "generated"),
    ("validator reads brandMark flag from the section contract", ctx_contract_unflag_brand, lambda s: (drop_nav_logo(s), s)[1], "SCHEMA", "generated"),
    ("validator reads sourceBrand terms from the registry", ctx_source_term, lambda s: s["meta"].update(title="Example Co home") or s, "GENERATED_NO_SOURCE_BRAND_TEXT", "generated"),
]


def reg_policy(rid, val):
    return lambda d: d["roles"][rid].update(generationPolicy=val)


def reg_mode(rid, val):
    return lambda d: d["roles"][rid].update(generatedMode=val)


# (name, asset-roles-document mutator, substring that must appear in a registry finding)
REGISTRY_CASES = [
    ("PINNED: brand.tines-logo policy -> different-but-valid value", reg_policy("brand.tines-logo", "may-generate-new"), "PINNED policy drift: brand.tines-logo"),
    ("PINNED: brand.tines-logo policy -> must-not-reuse-in-new-pages", reg_policy("brand.tines-logo", "must-not-reuse-in-new-pages"), "PINNED policy drift: brand.tines-logo"),
    ("PINNED: brand.tines-logo generatedMode -> generation-safe", reg_mode("brand.tines-logo", "generation-safe"), "PINNED generatedMode drift: brand.tines-logo"),
    ("PINNED: brand.tines-logo generatedMode -> slot-operator-supplied", reg_mode("brand.tines-logo", "slot-operator-supplied"), "PINNED generatedMode drift: brand.tines-logo"),
    ("PINNED: brand.placeholder policy -> operator-supplied-only", reg_policy("brand.placeholder", "operator-supplied-only"), "PINNED policy drift: brand.placeholder"),
    ("PINNED: brand.user-supplied generatedMode -> blocked-in-generated", reg_mode("brand.user-supplied", "blocked-in-generated"), "PINNED generatedMode drift: brand.user-supplied"),
    ("policy/mode coherence: customer.logo-trademark made generation-safe", reg_mode("customer.logo-trademark", "generation-safe"), "contradicts policy"),
    ("policy/mode coherence: icon.ui-glyph made blocked", reg_mode("icon.ui-glyph", "blocked-in-generated"), "contradicts policy"),
    ("every role classified: generatedMode removed", lambda d: d["roles"]["product.screenshot"].pop("generatedMode"), "missing or not in closed generatedModeEnum"),
    ("closed enum: generatedMode outside enum", reg_mode("icon.ui-glyph", "allowed"), "not in closed generatedModeEnum"),
    ("closed enum: policy outside enum", reg_policy("icon.ui-glyph", "anything-goes"), "not in closed enum"),
    ("policy->mode map must cover every policy", lambda d: d["policyToGeneratedMode"].pop("snapshot-not-source-art"), "policyToGeneratedMode keys"),
    ("pin removed for the real logo", lambda d: d["pinnedPolicies"].pop("brand.tines-logo"), "not in pinnedPolicies"),
    ("mode pin removed for the real logo", lambda d: d["pinnedGeneratedMode"].pop("brand.tines-logo"), "not in pinnedGeneratedMode"),
    ("brand role loses brandMark flag", lambda d: d["roles"]["brand.placeholder"].pop("brandMark"), "brandMark"),
    ("non-brand role flagged brandMark", lambda d: d["roles"]["icon.ui-glyph"].update(brandMark=True), "brandMark"),
    ("no generation-safe brand role left", lambda d: [d["roles"][r].update(generatedMode="slot-operator-supplied") for r in ("brand.placeholder", "brand.user-supplied")], "no generation-safe brand role"),
    ("sourceBrand terms emptied (brand-name check would be vacuous)", lambda d: d["sourceBrand"].update(terms=[]), "sourceBrand.terms"),
    ("modes block drifts from validator MODES", lambda d: d["modes"]["enum"].append("staging"), "modes block"),
]


def controls(ctx):
    out = []
    for label, ex in (("reference", EXAMPLE), ("generated", GENERATED)):
        out.append(("unmutated %s example" % label, copy.deepcopy(ex), None))
        by_type = {n["type"]: n for n in ex["nodes"]}
        for tid, tpl in ctx["templates"].items():
            base = dict(copy.deepcopy(ex), template=tid, route=tpl["routes"][0])
            req = copy.deepcopy(base)
            req["nodes"] = [copy.deepcopy(by_type[n["section"]]) for n in tpl["nodes"] if n["required"]]
            out.append(("%s: %s required-only" % (label, tid), req, None))
            for n in tpl["nodes"]:
                if not n["required"]:
                    s = copy.deepcopy(base)
                    s["nodes"] = [x for x in s["nodes"] if x["type"] != n["section"]]
                    out.append(("%s: %s without optional %s" % (label, tid, n["section"]), s, None))
    # mode-specific controls: each must still produce ZERO errors
    s = copy.deepcopy(EXAMPLE)
    out.append(("reference mode keeps the Tines logo (nav + footer)", s, None))
    assert node(s, "chrome.site-nav")["content"]["logo"]["assetRole"] == "brand.tines-logo"
    s = copy.deepcopy(EXAMPLE)
    node(s, "chrome.site-nav")["content"]["logo"]["assetRole"] = "brand.placeholder"
    node(s, "chrome.site-footer")["content"]["logoMark"]["assetRole"] = "brand.user-supplied"
    out.append(("reference mode may also use the generation-safe brand roles", s, None))
    s = copy.deepcopy(GENERATED)
    s["mode"] = "reference"
    out.append(("generated example is also valid when declared reference", s, None))
    s = copy.deepcopy(GENERATED)
    node(s, "chrome.site-nav")["content"]["logo"]["assetRole"] = "brand.user-supplied"
    node(s, "chrome.site-footer")["content"]["logoMark"]["assetRole"] = "brand.placeholder"
    out.append(("generated: swapped placeholder/user-supplied brand roles", s, None))
    s = copy.deepcopy(GENERATED)
    s["meta"]["title"] = "Routines and daily rhythm"  # whole-word match: 'routines' etc. must not trip
    node(s, "hero.intro")["content"]["byline"] = "Daily routines, quietly handled."
    out.append(("generated: 'routines' is not the brand name (whole-word match)", s, None))
    # warn-only control: still 0 errors, but the warn rule must fire
    s = copy.deepcopy(EXAMPLE)
    drop(s, "proof.logo-marquee")
    out.append(("warn-only: marquee dropped -> intro/wordmark adjacency", s, "NO_ADJACENT_SAME_CATEGORY"))
    return out


def count_cases():
    return len(SPEC_CASES) + len(GEN_CASES) + len(CTX_CASES) + len(REGISTRY_CASES)


def run():
    ctx = sv.load_context(REPO)
    fails = 0
    print("MUTATIONS (must be rejected)")
    for name, fn, rule in SPEC_CASES:
        errors, _ = sv.validate(fn(copy.deepcopy(EXAMPLE)), ctx)
        ok = any(r == rule for r, _ in errors)
        fails += not ok
        print("  %s  %-58s expect %-24s got %s" % ("PASS" if ok else "FAIL", name, rule, sorted({r for r, _ in errors}) or "no errors"))
    for name, fn, rule in GEN_CASES:
        errors, _ = sv.validate(fn(copy.deepcopy(GENERATED)), ctx)
        ok = any(r == rule for r, _ in errors)
        fails += not ok
        print("  %s  %-58s expect %-24s got %s" % ("PASS" if ok else "FAIL", name, rule, sorted({r for r, _ in errors}) or "no errors"))
    for case in CTX_CASES:
        name, cfn, sfn, rule = case[:4]
        c = copy.deepcopy(ctx)
        cfn(c)
        spec = copy.deepcopy(GENERATED if len(case) > 4 else EXAMPLE)
        if sfn:
            spec = sfn(spec)
        errors, _ = sv.validate(spec, c)
        ok = any(r == rule for r, _ in errors)
        fails += not ok
        print("  %s  %-58s expect %-24s got %s" % ("PASS" if ok else "FAIL", name, rule, sorted({r for r, _ in errors}) or "no errors"))
    real = copy.deepcopy(ctx["assetRolesDoc"])
    ok = not sv.registry_findings(real)
    fails += not ok
    print("  %s  %-58s (control) registry findings on the real asset-roles.json: %s" % ("PASS" if ok else "FAIL", "REGISTRY control", sv.registry_findings(real) or "none"))
    for name, fn, needle in REGISTRY_CASES:
        doc = copy.deepcopy(ctx["assetRolesDoc"])
        fn(doc)
        found = sv.registry_findings(doc)
        ok = any(needle in f for f in found)
        fails += not ok
        print("  %s  %-58s expect %-24s got %s" % ("PASS" if ok else "FAIL", name, needle[:24], ("%d finding(s)" % len(found)) if found else "no findings"))
    print("CONTROLS (must produce 0 errors)")
    ctl = controls(ctx)
    for name, spec, warn_rule in ctl:
        errors, warnings = sv.validate(spec, ctx)
        ok = not errors and (warn_rule is None or any(r == warn_rule for r, _ in warnings))
        fails += not ok
        print("  %s  %-58s errors=%d warnings=%s" % ("PASS" if ok else "FAIL", name, len(errors), sorted({r for r, _ in warnings})))
        for e in errors:
            print("        ", e)
    total = count_cases()
    print("\n%d mutations, %d controls, %d failure(s)" % (total, len(ctl), fails))
    return fails


if __name__ == "__main__":
    sys.exit(1 if run() else 0)
