#!/usr/bin/env python3
"""Adversarial suite: every mutation of the real example must be REJECTED with
the expected rule id; every control must produce ZERO errors.

Two kinds of mutation:
  * spec mutations  - change the PageSpec, keep the real registries.
  * ctx mutations   - keep the PageSpec, change an in-memory copy of a registry
                      (templates / asset roles / section contracts) to prove the
                      validator really reads those files instead of hardcoding.

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


# (name, ctx-mutator, spec-mutator or None, expected rule id)
CTX_CASES = [
    ("validator reads template's REAL node list (section removed from template)", ctx_drop_template_node, None, "TEMPLATE_SEQUENCE"),
    ("validator reads template's REAL route list", ctx_unbind_route, None, "ROUTE_BINDING"),
    ("validator reads asset-roles allowedSections", ctx_disallow_role, None, "ASSET_ROLE_SECTION"),
    ("validator cross-checks contract fallback", ctx_contract_fallback, None, "REDUCED_MOTION_REQUIRED"),
    ("validator reads required flags", ctx_make_optional_required, lambda s: (drop(s, "proof.logo-marquee"), s)[1], "TEMPLATE_SEQUENCE"),
]


def controls(ctx):
    out = [("unmutated example", copy.deepcopy(EXAMPLE), None)]
    by_type = {n["type"]: n for n in EXAMPLE["nodes"]}
    for tid, tpl in ctx["templates"].items():
        base = dict(copy.deepcopy(EXAMPLE), template=tid, route=tpl["routes"][0])
        req = copy.deepcopy(base)
        req["nodes"] = [copy.deepcopy(by_type[n["section"]]) for n in tpl["nodes"] if n["required"]]
        out.append(("%s required-only" % tid, req, None))
        for n in tpl["nodes"]:
            if not n["required"]:
                s = copy.deepcopy(base)
                s["nodes"] = [x for x in s["nodes"] if x["type"] != n["section"]]
                out.append(("%s without optional %s" % (tid, n["section"]), s, None))
    # warn-only control: still 0 errors, but the warn rule must fire
    s = copy.deepcopy(EXAMPLE)
    drop(s, "proof.logo-marquee")
    out.append(("warn-only: marquee dropped -> intro/wordmark adjacency", s, "NO_ADJACENT_SAME_CATEGORY"))
    return out


def count_cases():
    return len(SPEC_CASES) + len(CTX_CASES)


def run():
    ctx = sv.load_context(REPO)
    fails = 0
    print("MUTATIONS (must be rejected)")
    for name, fn, rule in SPEC_CASES:
        errors, _ = sv.validate(fn(copy.deepcopy(EXAMPLE)), ctx)
        ok = any(r == rule for r, _ in errors)
        fails += not ok
        print("  %s  %-58s expect %-24s got %s" % ("PASS" if ok else "FAIL", name, rule, sorted({r for r, _ in errors}) or "no errors"))
    for name, cfn, sfn, rule in CTX_CASES:
        c = copy.deepcopy(ctx)
        cfn(c)
        spec = copy.deepcopy(EXAMPLE)
        if sfn:
            spec = sfn(spec)
        errors, _ = sv.validate(spec, c)
        ok = any(r == rule for r, _ in errors)
        fails += not ok
        print("  %s  %-58s expect %-24s got %s" % ("PASS" if ok else "FAIL", name, rule, sorted({r for r, _ in errors}) or "no errors"))
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
