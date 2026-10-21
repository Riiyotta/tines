#!/usr/bin/env python3
"""Proves verify_all.py's drift checks actually FAIL on bad input.

For each injection: copy this design-repo to a fresh temporary directory, inject
one defect, run the COPY's own extraction/verify_all.py (--json), and assert the
named check fails. A pristine copy must produce zero FAILs. The real repo is
never modified.

Citation / ia.json injections need the sibling source tree; pass it with
--source-root (default: this design-repo's parent directory). If it is absent
those injections are reported SKIPPED rather than silently passing.

Usage: python3 extraction/drift_proof.py [--source-root DIR]
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UP = os.pardir + "/"


def jload(base, r):
    with open(os.path.join(base, r), encoding="utf-8") as f:
        return json.load(f)


def jsave(base, r, obj):
    with open(os.path.join(base, r), "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)


def edit(r, fn):
    def apply(base):
        obj = jload(base, r)
        fn(obj)
        jsave(base, r, obj)
    return apply


def append_text(r, txt):
    def apply(base):
        with open(os.path.join(base, r), "a", encoding="utf-8") as f:
            f.write(txt)
    return apply


def replace_text(r, old, new):
    def apply(base):
        p = os.path.join(base, r)
        with open(p, encoding="utf-8") as f:
            s = f.read()
        assert old in s, "injection anchor not found: %r" % old
        with open(p, "w", encoding="utf-8") as f:
            f.write(s.replace(old, new, 1))
    return apply


def _first_cite(o):
    o["entries"]["mv.tw.colors.tab"]["citations"][0]["ref"] = UP + "tailwind.config.cjs:99990-99999"


def _wrong_anchor(o):
    o["entries"]["mv.tw.colors.tab"]["citations"][0]["contains"] = "people: '#000000'"


def _swap_nodes(o):
    n = o["templates"]["template.home"]["nodes"]
    n[5], n[6] = n[6], n[5]


def _schema_maxwords(o):
    for b in o["definitions"]["node"]["allOf"]:
        if b["if"]["properties"]["type"]["const"] == "hero.intro":
            b["then"]["properties"]["content"]["properties"]["byline"]["maxWords"] = 99


def _drop_rule(o):
    o["rules"] = [r for r in o["rules"] if r["id"] != "UNIQUE_TEAM_TABS"]


def _sev(o):
    for r in o["rules"]:
        if r["id"] == "NO_ADJACENT_SAME_CATEGORY":
            r["severity"] = "error"


def _unwired_role(o):
    o["roles"]["stock.photo"] = {"generationPolicy": "may-generate-new", "allowedSections": ["hero.intro"],
                                 "description": "x", "guidance": "x", "sourceFiles": [], "evidence": ["mv.assets.manifest"]}


def _schema_mode_enum(o):
    o["properties"]["mode"]["enum"].append("staging")


def _schema_mode_optional(o):
    o["required"].remove("mode")


def _nav_logo_drop_placeholder(o):
    for b in o["definitions"]["node"]["allOf"]:
        if b["if"]["properties"]["type"]["const"] == "chrome.site-nav":
            b["then"]["properties"]["content"]["properties"]["logo"]["allOf"][1]["properties"]["assetRole"]["enum"].remove("brand.placeholder")


def _marquee_allows_logo(o):
    for b in o["definitions"]["node"]["allOf"]:
        if b["if"]["properties"]["type"]["const"] == "proof.logo-marquee":
            ar = b["then"]["properties"]["content"]["properties"]["logoAsset"]["allOf"][1]["properties"]
            ar["assetRole"] = {"enum": ["customer.logo-trademark", "brand.tines-logo"]}


def _gen_example_logo(o):
    o["nodes"][-1]["content"]["logoMark"]["assetRole"] = "brand.tines-logo"


def _gen_example_mode_ref(o):
    o["mode"] = "reference"


def _unflag_brand(o):
    o["content"]["fields"]["logo"].pop("brandMark")


def _contract_drop_role(o):
    o["assetRoles"].remove("brand.placeholder")


def _nav_generated_roles(o):
    o["content"]["fields"]["logo"]["generatedAssetRoles"] = ["brand.placeholder"]


INJECTIONS = [
    # (name, mutator, check that must FAIL, needs source tree)
    ("phantom allowlist entry", edit("tokens/llm/component-allowlist.json", lambda o: o["sections"].append("proof.testimonials")), "allowlist-parity", False),
    ("orphan contract (allowlist entry removed)", edit("tokens/llm/component-allowlist.json", lambda o: o["primitives"].remove("kicker")), "allowlist-parity", False),
    ("out-of-range citation", edit("extraction/measured-values.json", _first_cite), "citations", True),
    ("in-range citation, wrong code (anchor)", edit("extraction/measured-values.json", _wrong_anchor), "citations", True),
    ("manifest count drift", edit("registry.manifest.json", lambda o: o["counts"].update(sections=12)), "manifest", False),
    ("allowlistVersion drift", edit("tokens/llm/component-allowlist.json", lambda o: o.update(allowlistVersion="1.0.1")), "manifest", False),
    ("pinned asset policy -> different VALID value", edit("assets/asset-roles.json", lambda o: o["roles"]["customer.logo-trademark"].update(generationPolicy="must-not-reuse-in-new-pages")), "asset-roles", False),
    ("documented-but-unwired asset role", edit("assets/asset-roles.json", _unwired_role), "asset-roles", False),
    # ---- reference / generated mode + brand-logo drift
    ("mode enum drift (schema gains 'staging')", edit("schema/pagespec.schema.json", _schema_mode_enum), "mode-contract", False),
    ("schema no longer requires mode", edit("schema/pagespec.schema.json", _schema_mode_optional), "mode-contract", False),
    ("graph modes enum drift", edit("compatibility/graph.json", lambda o: o["modes"]["enum"].append("staging")), "mode-contract", False),
    ("allowlist modes drift", edit("tokens/llm/component-allowlist.json", lambda o: o["modes"].remove("generated")), "mode-contract", False),
    ("manifest modes drift", edit("registry.manifest.json", lambda o: o["modes"].remove("reference")), "mode-contract", False),
    ("generated example declares reference mode", edit("schema/example.generated.pagespec.json", _gen_example_mode_ref), "mode-contract", False),
    ("generated example deleted", lambda b: os.remove(os.path.join(b, "schema", "example.generated.pagespec.json")), "mode-contract", False),
    ("README stops documenting a GENERATED rule", replace_text("README.md", "GENERATED_BRAND_REQUIRED", "GENERATED_BRAND_NEEDED"), "mode-contract", False),
    ("graph rule GENERATED_NO_REFERENCE_ASSET removed", edit("compatibility/graph.json", lambda o: o.update(rules=[r for r in o["rules"] if r["id"] != "GENERATED_NO_REFERENCE_ASSET"])), "graph-validator", False),
    ("PINNED: brand.tines-logo policy -> different VALID value", edit("assets/asset-roles.json", lambda o: o["roles"]["brand.tines-logo"].update(generationPolicy="may-generate-new")), "asset-roles", False),
    ("PINNED: brand.tines-logo generatedMode -> generation-safe", edit("assets/asset-roles.json", lambda o: o["roles"]["brand.tines-logo"].update(generatedMode="generation-safe")), "asset-roles", False),
    ("PINNED: brand.placeholder generatedMode -> blocked", edit("assets/asset-roles.json", lambda o: o["roles"]["brand.placeholder"].update(generatedMode="blocked-in-generated")), "asset-roles", False),
    ("role left unclassified (no generatedMode)", edit("assets/asset-roles.json", lambda o: o["roles"]["product.screenshot"].pop("generatedMode")), "asset-roles", False),
    ("generatedMode outside the closed enum", edit("assets/asset-roles.json", lambda o: o["roles"]["icon.ui-glyph"].update(generatedMode="allowed")), "asset-roles", False),
    ("policy/generatedMode contradiction", edit("assets/asset-roles.json", lambda o: o["roles"]["customer.logo-trademark"].update(generatedMode="generation-safe")), "asset-roles", False),
    ("pin dropped for the real logo", edit("assets/asset-roles.json", lambda o: o["pinnedGeneratedMode"].pop("brand.tines-logo")), "asset-roles", False),
    ("sourceBrand terms emptied", edit("assets/asset-roles.json", lambda o: o["sourceBrand"].update(terms=[])), "asset-roles", False),
    ("generated example uses the reference-only logo", edit("schema/example.generated.pagespec.json", _gen_example_logo), "asset-roles", False),
    ("Tines logo reachable in a non-brand field (schema)", edit("schema/pagespec.schema.json", _marquee_allows_logo), "asset-roles", False),
    ("nav contract unflags brandMark", edit("sections/chrome.site-nav.json", _unflag_brand), "asset-roles", False),
    ("contract assetRoles misses a brand role", edit("sections/chrome.site-nav.json", _contract_drop_role), "asset-roles", False),
    ("contract generatedAssetRoles drift", edit("sections/chrome.site-nav.json", _nav_generated_roles), "asset-roles", False),
    ("schema nav logo drops brand.placeholder (schema vs contract)", edit("schema/pagespec.schema.json", _nav_logo_drop_placeholder), "contract-schema", False),
    ("graph rule removed (validator still has it)", edit("compatibility/graph.json", _drop_rule), "graph-validator", False),
    ("graph severity drift", edit("compatibility/graph.json", _sev), "graph-validator", False),
    ("absolute local path injected", append_text("CHANGELOG.md", "\nsee /" + "Users" + "/someone/tines\n"), "absolute-paths", False),
    ("external citation outside the ledger", replace_text("sections/hero.intro.json", '"purpose": "', '"purpose": "see ' + UP + 'src/components/Hero.jsx. '), "external-refs", False),
    ("entryPoint outside the package", edit("registry.manifest.json", lambda o: o["entryPoints"].append(UP + "CLONE_SPEC.md")), "manifest", False),
    ("template order drift vs ia.json", edit("templates/templates.json", _swap_nodes), "ia-alignment", True),
    ("schema maxWords drift vs section contract", edit("schema/pagespec.schema.json", _schema_maxwords), "contract-schema", False),
    ("README count drift", replace_text("README.md", "| sections | 11 |", "| sections | 12 |"), "readme-counts", False),
    ("unknown evidence id", edit("sections/hero.intro.json", lambda o: o["evidence"].append("mv." + "nonexistent")), "evidence-ids", False),
    ("theme value drift", edit("tokens/themes/light.json", lambda o: o["resolved"]["color.text.primary"].update(value="#000000")), "token-refs", False),
]


def run_copy(mutate, source_root):
    tmp = tempfile.mkdtemp(prefix="drift-")
    dst = os.path.join(tmp, "design-repo")
    shutil.copytree(REPO, dst, ignore=shutil.ignore_patterns("__pycache__", ".DS_Store"))
    try:
        if mutate:
            mutate(dst)
        p = subprocess.run([sys.executable, "-B", os.path.join(dst, "extraction", "verify_all.py"), "--json", "--source-root", source_root],
                           stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        try:
            return json.loads(p.stdout)
        except ValueError:
            return {"failed": ["<crash>"], "results": [], "stderr": p.stderr[-800:]}
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-root", default=os.path.dirname(REPO))
    a = ap.parse_args()
    src = os.path.abspath(a.source_root)
    have_src = os.path.isfile(os.path.join(src, "ia.json")) and os.path.isfile(os.path.join(src, "tailwind.config.cjs"))
    bad = 0
    base = run_copy(None, src)
    ok = not base["failed"]
    bad += not ok
    print("%s  pristine copy -> FAILs: %s" % ("PASS" if ok else "FAIL", base["failed"] or "none"))
    for name, fn, check, needs in INJECTIONS:
        if needs and not have_src:
            print("SKIP  %-46s (needs sibling source tree)" % name)
            continue
        r = run_copy(fn, src)
        ok = check in r["failed"]
        bad += not ok
        print("%s  %-46s expect FAIL %-17s got FAIL %s" % ("PASS" if ok else "FAIL", name, check, r["failed"]))
    print("\n%d injections, %d unexpected result(s)%s" % (len(INJECTIONS), bad, "" if have_src else " (source tree absent: citation/ia injections skipped)"))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
