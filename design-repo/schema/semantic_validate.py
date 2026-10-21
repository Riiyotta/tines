#!/usr/bin/env python3
"""Semantic validator for Tines design-repo PageSpecs.

Enforces what JSON Schema (draft-07) cannot: the declared template's real node
list (templates/templates.json), route binding, rhythm/position rules from
compatibility/graph.json, asset-role/section licensing, the reference/generated MODE brand rules, const reduced-motion
fallbacks cross-checked against section contracts, and per-instance maxWords.

Every rule id in RULES must also exist in compatibility/graph.json with the
same severity; extraction/verify_all.py fails if the two drift.

Usage:  python3 schema/semantic_validate.py <pagespec.json> [...]
Exit 1 if any error-severity finding (warnings are printed, non-fatal).
Requires the 'jsonschema' package for the SCHEMA layer.
"""
import copy
import glob
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# rule id -> severity. Must match compatibility/graph.json exactly.
RULES = {
    "TEMPLATE_SEQUENCE": "error",
    "ROUTE_BINDING": "error",
    "NAV_FIRST": "error",
    "FOOTER_LAST": "error",
    "CTA_PRECEDES_FOOTER": "error",
    "ONE_HERO_INTRO": "error",
    "NO_REPEAT": "error",
    "HERO_CLUSTER": "error",
    "NO_ADJACENT_SAME_CATEGORY": "warn",
    "ASSET_ROLE_SECTION": "error",
    "GENERATED_NO_REFERENCE_ASSET": "error",
    "GENERATED_BRAND_REQUIRED": "error",
    "GENERATED_NO_SOURCE_BRAND_TEXT": "error",
    "REDUCED_MOTION_REQUIRED": "error",
    "MAX_WORDS": "error",
    "UNIQUE_TEAM_TABS": "error",
}

# PageSpec modes. Must equal schema properties.mode.enum, compatibility/graph.json modes.enum and the
# allowlist's modes (verify_all 'mode-contract' fails on drift).
MODES = ("reference", "generated")
BLOCKED = "blocked-in-generated"
SAFE = "generation-safe"

NAV, FOOTER, CTA, INTRO = "chrome.site-nav", "chrome.site-footer", "conversion.start-today-cta", "hero.intro"
HERO_CLUSTER = {"proof.logo-marquee", "hero.wordmark-stage", "hero.product-demo"}
BODY_CATEGORIES = {"NARRATIVE", "SHOWCASE"}
BODY_EXTRA = {"proof.why-tines"}


def _load(rel, repo):
    with open(os.path.join(repo, rel), encoding="utf-8") as f:
        return json.load(f)


def load_context(repo=REPO):
    """All registries the validator reads. Tests may deep-copy and mutate this."""
    sections = {}
    for fp in glob.glob(os.path.join(repo, "sections", "*.json")):
        with open(fp, encoding="utf-8") as f:
            c = json.load(f)
        sections[c["id"]] = c
    return {
        "schema": _load("schema/pagespec.schema.json", repo),
        "templates": _load("templates/templates.json", repo)["templates"],
        "graph": _load("compatibility/graph.json", repo),
        "assetRoles": _load("assets/asset-roles.json", repo)["roles"],
        "sourceBrand": _load("assets/asset-roles.json", repo).get("sourceBrand", {}),
        "assetRolesDoc": _load("assets/asset-roles.json", repo),
        "sections": sections,
    }


# ---------------------------------------------------------------- asset registry coherence
# Roles whose policy AND generated-mode classification must be PINNED to an exact value (membership in the
# closed enums alone would accept a different-but-valid value). verify_all and the adversarial suite both
# call registry_findings(), so there is exactly one implementation of this rule.
REQUIRED_POLICY_PINS = ("brand.tines-logo", "brand.placeholder", "brand.user-supplied", "customer.logo-trademark",
                        "partner.assistant-icon", "product.demo-frame", "product.screenshot", "artwork.canvas-standin")
REQUIRED_MODE_PINS = ("brand.tines-logo", "brand.placeholder", "brand.user-supplied")


def registry_findings(doc):
    """Return a list of problems in an assets/asset-roles.json document (empty list == coherent)."""
    bad = []
    pol_enum = set(doc.get("generationPolicyEnum", []))
    mode_enum = set(doc.get("generatedModeEnum", []))
    p2m = doc.get("policyToGeneratedMode", {})
    if set(p2m) != pol_enum:
        bad.append("policyToGeneratedMode keys %s != generationPolicyEnum %s" % (sorted(p2m), sorted(pol_enum)))
    for pol, gm in p2m.items():
        if gm not in mode_enum:
            bad.append("policyToGeneratedMode[%s]=%r not in generatedModeEnum" % (pol, gm))
    if set(doc.get("generatedModeMeaning", {})) != mode_enum:
        bad.append("generatedModeMeaning keys != generatedModeEnum")
    if set(doc.get("generationPolicyMeaning", {})) != pol_enum:
        bad.append("generationPolicyMeaning keys != generationPolicyEnum")
    if set(doc.get("modes", {}).get("enum", [])) != set(MODES) or set(doc.get("modes", {}).get("meaning", {})) != set(MODES):
        bad.append("modes block != %s" % (MODES,))
    roles = doc.get("roles", {})
    for rid, r in roles.items():
        pol, gm = r.get("generationPolicy"), r.get("generatedMode")
        if pol not in pol_enum:
            bad.append("%s generationPolicy %r not in closed enum" % (rid, pol))
        if gm not in mode_enum:
            bad.append("%s generatedMode %r missing or not in closed generatedModeEnum (every role must be classified)" % (rid, gm))
        elif pol in p2m and p2m[pol] != gm:
            bad.append("%s generatedMode %r contradicts policy %r (maps to %r)" % (rid, gm, pol, p2m[pol]))
        if bool(r.get("brandMark")) != rid.startswith("brand."):
            bad.append("%s brandMark=%r but brand.* naming says %r" % (rid, r.get("brandMark"), rid.startswith("brand.")))
    for rid, pol in doc.get("pinnedPolicies", {}).items():
        if roles.get(rid, {}).get("generationPolicy") != pol:
            bad.append("PINNED policy drift: %s is %r, must be %r" % (rid, roles.get(rid, {}).get("generationPolicy"), pol))
    for rid, gm in doc.get("pinnedGeneratedMode", {}).items():
        if roles.get(rid, {}).get("generatedMode") != gm:
            bad.append("PINNED generatedMode drift: %s is %r, must be %r" % (rid, roles.get(rid, {}).get("generatedMode"), gm))
    for rid in REQUIRED_POLICY_PINS:
        if rid not in doc.get("pinnedPolicies", {}):
            bad.append("compliance-critical role %s is not in pinnedPolicies" % rid)
    for rid in REQUIRED_MODE_PINS:
        if rid not in doc.get("pinnedGeneratedMode", {}):
            bad.append("brand role %s is not in pinnedGeneratedMode" % rid)
    sb = doc.get("sourceBrand", {})
    if not sb.get("name") or sb["name"].lower() not in [x.lower() for x in sb.get("terms", [])]:
        bad.append("sourceBrand.terms must contain the lower-cased sourceBrand.name (else the brand name check is vacuous)")
    if not any(r.get("brandMark") and r.get("generatedMode") == SAFE for r in roles.values()):
        bad.append("no generation-safe brand role exists: generated mode could not satisfy GENERATED_BRAND_REQUIRED")
    if not any(r.get("generatedMode") == BLOCKED for r in roles.values()):
        bad.append("no role is blocked-in-generated: the real brand logo would be usable in generated mode")
    return bad


# ---------------------------------------------------------------- maxWords walker
def _resolve(schema, root):
    while isinstance(schema, dict) and "$ref" in schema:
        node = root
        for part in schema["$ref"].lstrip("#/").split("/"):
            node = node[part]
        schema = node
    return schema


def _if_matches(cond, inst):
    if not isinstance(inst, dict):
        return False
    for k in cond.get("required", []):
        if k not in inst:
            return False
    for k, sub in cond.get("properties", {}).items():
        if "const" in sub and inst.get(k) != sub["const"]:
            return False
    return True


def walk_max_words(schema, inst, root, path, out):
    schema = _resolve(schema, root)
    if not isinstance(schema, dict):
        return
    if isinstance(inst, str) and "maxWords" in schema:
        n = len(inst.split())
        if n > schema["maxWords"]:
            out.append(("MAX_WORDS", "%s has %d words (maxWords %d)" % (path, n, schema["maxWords"])))
    for sub in schema.get("allOf", []):
        sub_r = _resolve(sub, root)
        if "if" in sub_r:
            if _if_matches(sub_r["if"], inst):
                walk_max_words(sub_r.get("then", {}), inst, root, path, out)
        else:
            walk_max_words(sub_r, inst, root, path, out)
    if isinstance(inst, dict):
        for k, sub in schema.get("properties", {}).items():
            if k in inst:
                walk_max_words(sub, inst[k], root, "%s.%s" % (path, k), out)
    if isinstance(inst, list) and "items" in schema:
        for i, item in enumerate(inst):
            walk_max_words(schema["items"], item, root, "%s[%d]" % (path, i), out)


def _asset_refs(obj, path):
    if isinstance(obj, dict):
        if isinstance(obj.get("assetRole"), str):
            yield path, obj["assetRole"]
        for k, v in obj.items():
            for r in _asset_refs(v, "%s.%s" % (path, k)):
                yield r
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            for r in _asset_refs(v, "%s[%d]" % (path, i)):
                yield r


def _strings(obj, path):
    """Yield (path, string) for every string value under obj (keys excluded)."""
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            for r in _strings(v, "%s.%s" % (path, k)):
                yield r
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            for r in _strings(v, "%s[%d]" % (path, i)):
                yield r


def _brand_fields(fields, prefix=""):
    """Contract fields flagged brandMark: yield (dotted path, field)."""
    for name, f in fields.items():
        if isinstance(f, dict) and f.get("brandMark"):
            yield prefix + name, f
        if isinstance(f, dict) and "fields" in f:
            for r in _brand_fields(f["fields"], prefix + name + "."):
                yield r


def _get(obj, dotted):
    for part in dotted.split("."):
        if not isinstance(obj, dict) or part not in obj:
            return None
        obj = obj[part]
    return obj


# ---------------------------------------------------------------- validate
def validate(spec, ctx=None):
    """Return (errors, warnings); each a list of (ruleId, message)."""
    ctx = ctx or load_context()
    findings = []

    # SCHEMA layer
    try:
        import jsonschema
    except ImportError:
        return [("SCHEMA", "jsonschema package not installed; cannot validate")], []
    v = jsonschema.Draft7Validator(ctx["schema"])
    schema_errors = [("SCHEMA", "%s: %s" % ("/".join(str(p) for p in e.absolute_path) or "<root>", e.message))
                     for e in v.iter_errors(spec)]
    if not isinstance(spec, dict) or not isinstance(spec.get("nodes"), list):
        return schema_errors or [("SCHEMA", "not a PageSpec")], []

    nodes = [n for n in spec["nodes"] if isinstance(n, dict)]
    types = [n.get("type") for n in nodes]
    tpl = ctx["templates"].get(spec.get("template"))

    # TEMPLATE_SEQUENCE + ROUTE_BINDING: cross-reference the DECLARED template
    if tpl is None:
        findings.append(("TEMPLATE_SEQUENCE", "declared template %r not in templates/templates.json" % spec.get("template")))
    else:
        order = [n["section"] for n in tpl["nodes"]]
        last = -1
        for i, t in enumerate(types):
            if t not in order:
                findings.append(("TEMPLATE_SEQUENCE", "node %d %r is not part of %s" % (i, t, spec["template"])))
                continue
            idx = order.index(t)
            if idx <= last:
                findings.append(("TEMPLATE_SEQUENCE", "node %d %r is out of %s order" % (i, t, spec["template"])))
            last = max(last, idx)
        for n in tpl["nodes"]:
            if n["required"] and n["section"] not in types:
                findings.append(("TEMPLATE_SEQUENCE", "required node %r missing for %s" % (n["section"], spec["template"])))
        if spec.get("route") not in tpl.get("routes", []):
            findings.append(("ROUTE_BINDING", "route %r is not bound to %s" % (spec.get("route"), spec.get("template"))))

    # position rules
    if not types or types[0] != NAV:
        findings.append(("NAV_FIRST", "first node is %r, expected %s" % (types[0] if types else None, NAV)))
    if not types or types[-1] != FOOTER:
        findings.append(("FOOTER_LAST", "last node is %r, expected %s" % (types[-1] if types else None, FOOTER)))
    if CTA in types and (len(types) < 2 or types[-2] != CTA or types[-1] != FOOTER):
        findings.append(("CTA_PRECEDES_FOOTER", "%s must sit immediately before %s" % (CTA, FOOTER)))
    intro_idx = [i for i, t in enumerate(types) if t == INTRO]
    if len(intro_idx) != 1:
        findings.append(("ONE_HERO_INTRO", "expected exactly one %s, found %d" % (INTRO, len(intro_idx))))
    elif intro_idx[0] != 1 or types[0] != NAV:
        findings.append(("ONE_HERO_INTRO", "%s must immediately follow %s" % (INTRO, NAV)))
    seen = set()
    for t in types:
        if t in seen:
            findings.append(("NO_REPEAT", "%r appears more than once" % t))
        seen.add(t)

    cat = {sid: c.get("category") for sid, c in ctx["sections"].items()}
    body_pos = [i for i, t in enumerate(types) if cat.get(t) in BODY_CATEGORIES or t in BODY_EXTRA]
    if body_pos:
        first_body = min(body_pos)
        for i, t in enumerate(types):
            if t in HERO_CLUSTER and i > first_body:
                findings.append(("HERO_CLUSTER", "%r at %d appears after body content (first body node at %d)" % (t, i, first_body)))

    rule = next((r for r in ctx["graph"]["rules"] if r["id"] == "NO_ADJACENT_SAME_CATEGORY"), {})
    exceptions = {tuple(p) for p in rule.get("exceptions", [])}
    for a, b in zip(types, types[1:]):
        if a in cat and cat.get(a) == cat.get(b) and (a, b) not in exceptions:
            findings.append(("NO_ADJACENT_SAME_CATEGORY", "%r and %r are adjacent and both %s" % (a, b, cat[a])))

    # per-node rules
    for i, n in enumerate(nodes):
        t = n.get("type")
        contract = ctx["sections"].get(t)
        for p, role in _asset_refs(n.get("content", {}), "nodes[%d].content" % i):
            r = ctx["assetRoles"].get(role)
            if r is None:
                findings.append(("ASSET_ROLE_SECTION", "%s uses unknown assetRole %r" % (p, role)))
            elif t not in r.get("allowedSections", []):
                findings.append(("ASSET_ROLE_SECTION", "%s: assetRole %r not allowed in %s" % (p, role, t)))
        if contract is not None:
            want = contract["motion"]["reducedMotionFallback"]
            got = (n.get("motion") or {}).get("reducedMotionFallback")
            if got != want:
                findings.append(("REDUCED_MOTION_REQUIRED", "nodes[%d] %s fallback %r, contract requires %r" % (i, t, got, want)))
        if t == "showcase.use-case-tabs":
            ids = [tab.get("teamId") for tab in n.get("content", {}).get("tabs", []) if isinstance(tab, dict)]
            if len(ids) != len(set(ids)):
                findings.append(("UNIQUE_TEAM_TABS", "duplicate teamId in %s" % ids))

    # MODE rules (reference | generated). An unknown/missing mode is a SCHEMA error already; skip here.
    if spec.get("mode") == "generated":
        roles = ctx["assetRoles"]
        # (a) no blocked role ANYWHERE in the spec (any field, any section, any depth)
        for p, role in _asset_refs(spec, "$"):
            if roles.get(role, {}).get("generatedMode") == BLOCKED:
                findings.append(("GENERATED_NO_REFERENCE_ASSET",
                                 "%s: assetRole %r is reference-only and forbidden in a generated PageSpec" % (p, role)))
        # (b) every contract brand-mark field must be set from a generation-safe brand role
        safe_brand = {rid for rid, r in roles.items() if r.get("brandMark") and r.get("generatedMode") == SAFE}
        for i, n in enumerate(nodes):
            contract = ctx["sections"].get(n.get("type"))
            if contract is None:
                continue
            for path, fld in _brand_fields(contract["content"]["fields"]):
                val = _get(n.get("content", {}), path)
                role = val.get("assetRole") if isinstance(val, dict) else None
                if role not in safe_brand:
                    findings.append(("GENERATED_BRAND_REQUIRED",
                                     "nodes[%d].content.%s brand mark has assetRole %r; generated mode requires one of %s"
                                     % (i, path, role, sorted(safe_brand))))
        # (c) the source brand name may not appear in any string
        terms = [t.lower() for t in ctx.get("sourceBrand", {}).get("terms", [])]
        texts = list(_strings(spec.get("meta", {}), "$.meta"))
        for i, n in enumerate(nodes):
            texts += list(_strings(n.get("content", {}), "nodes[%d].content" % i))
        for p, s in texts:
            if p.endswith(".assetRole"):
                continue  # role ids are covered by GENERATED_NO_REFERENCE_ASSET
            low = s.lower()
            for term in terms:
                # whole-word match (not inside another word: 'routines' must not trip 'tines')
                if term and re.search(r"(?<![a-z])%s(?![a-z])" % re.escape(term), low):
                    findings.append(("GENERATED_NO_SOURCE_BRAND_TEXT", "%s contains the source brand name %r" % (p, term)))

    mw = []
    walk_max_words(ctx["schema"], spec, ctx["schema"], "$", mw)
    findings.extend(mw)

    errors = list(schema_errors) + [f for f in findings if RULES.get(f[0]) == "error"]
    warnings = [f for f in findings if RULES.get(f[0]) == "warn"]
    return errors, warnings


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 2
    ctx = load_context()
    bad = 0
    for p in argv[1:]:
        with open(p, encoding="utf-8") as f:
            spec = json.load(f)
        errors, warnings = validate(spec, ctx)
        print("%s: %d error(s), %d warning(s)" % (p, len(errors), len(warnings)))
        for r, m in errors:
            print("  ERROR [%s] %s" % (r, m))
        for r, m in warnings:
            print("  warn  [%s] %s" % (r, m))
        bad += bool(errors)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
