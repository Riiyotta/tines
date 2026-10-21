#!/usr/bin/env python3
"""One-shot verification for the Tines design-repo.

Checks (each reported PASS / WARN / FAIL by name):
  json-parse            every .json file parses
  hygiene               no .DS_Store / __MACOSX / __pycache__ inside the repo
  absolute-paths        no local machine paths anywhere in the repo
  external-refs         parent-relative paths appear ONLY in extraction/measured-values.json
  schema-example        Draft-07 meta-check of the schema + EVERY example PageSpec (reference + generated) validates with 0 errors
  semantic-example      schema/semantic_validate.py reports 0 errors on every example
  mode-contract         PageSpec mode enum: schema == graph == allowlist == asset-roles == validator MODES; examples declare the right mode
  allowlist-parity      allowlist ids == contract files == schema enums (no phantom, no orphan)
  allowlist-properties  allowlist settable properties == schema node/page properties
  contract-schema       every section contract's fields/maxWords/roles/motion == schema branch
  section-contracts     required contract keys, responsive minWidths are real breakpoints
  asset-roles           closed policy enum, PINNED compliance policies + generatedMode (every role classified, policy<->mode
                        coherent), brand-mark wiring, the real logo only in brand-mark fields, no blocked role in the
                        generated example, role wiring + example coverage
  templates-routes      every route bound to exactly one template, both directions
  graph-validator       compatibility/graph.json rule ids + severities == semantic_validate.RULES
  token-refs            every {token.ref} in tokens/primitives/components resolves; theme values match
  token-catalog         catalog == recomputed token leaves; policy keys are real catalog categories
  evidence-ids          every mv.* id referenced in the repo exists in measured-values.json
  citations             every ledger citation path:line[-line] is in range AND contains its anchor
                        (WARN, not FAIL, when the sibling source tree is absent: standalone mode)
  ia-alignment          templates.json node order + section ids/categories == sibling ia.json
                        (WARN when ia.json is absent)
  manifest              counts recomputed from disk, versions (allowlistVersion, pageSpecVersion
                        machine-checked), entryPoints == every file in the repo, no external paths,
                        productionApproved false
  readme-counts         README counts block == recomputed counts

Usage:
  python3 extraction/verify_all.py [--source-root DIR] [--json]
  --source-root  directory that contains the cited source files (default: the
                 design-repo's parent directory). Citations are written relative
                 to the design-repo folder and resolved against this root.
Requires the 'jsonschema' package.
"""
import argparse
import copy
import glob
import json
import os
import re
import sys

sys.dont_write_bytecode = True
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UP = os.pardir + "/"
ABS_PATTERNS = ["/" + "Users" + "/", "/" + "private" + "/tmp", "/" + "home" + "/", "C:" + "\\\\", "/" + "var/folders"]
BREAKPOINTS = {0, 640, 768, 920, 1024, 1280, 1440}
LEDGER = "extraction/measured-values.json"
MANIFEST = "registry.manifest.json"

results = []


def report(name, status, msgs=()):
    results.append({"check": name, "status": status, "messages": list(msgs)})


def rel(p):
    return os.path.relpath(p, REPO).replace(os.sep, "/")


def all_files():
    out = []
    for root, dirs, files in os.walk(REPO):
        for f in files:
            out.append(rel(os.path.join(root, f)))
    return sorted(out)


def load(r):
    with open(os.path.join(REPO, r), encoding="utf-8") as f:
        return json.load(f)


def text_files():
    return [f for f in all_files() if f.endswith((".json", ".py", ".md", ".txt"))]


# ---------------------------------------------------------------- helpers
def token_tree():
    tree = {}

    def merge(a, b):
        for k, v in b.items():
            if k.startswith("$"):
                continue
            if isinstance(v, dict) and "$value" not in v and isinstance(a.get(k), dict):
                merge(a[k], v)
            else:
                a[k] = v
    for layer in ("00-foundation", "10-semantic", "20-component", "30-layout"):
        for fp in sorted(glob.glob(os.path.join(REPO, "tokens", layer, "*.json"))):
            with open(fp, encoding="utf-8") as f:
                merge(tree, json.load(f))
    return tree


def leaves(d, prefix=""):
    for k, v in d.items():
        if k.startswith("$"):
            continue
        if isinstance(v, dict) and "$value" in v:
            yield prefix + k
        elif isinstance(v, dict):
            for x in leaves(v, prefix + k + "."):
                yield x


def lookup(tree, path):
    cur = tree
    for p in path.split("."):
        if not isinstance(cur, dict) or p not in cur:
            return None
        cur = cur[p]
    return cur


def resolve_value(tree, ref, depth=0):
    if depth > 10:
        return None
    m = re.fullmatch(r"\{([^}]+)\}", ref) if isinstance(ref, str) else None
    if not m:
        return ref
    node = lookup(tree, m.group(1))
    if not isinstance(node, dict) or "$value" not in node:
        return None
    return resolve_value(tree, node["$value"], depth + 1)


def recompute_counts():
    tree_layers = {}
    total = 0
    for layer in ("00-foundation", "10-semantic", "20-component", "30-layout"):
        n = 0
        for fp in glob.glob(os.path.join(REPO, "tokens", layer, "*.json")):
            with open(fp, encoding="utf-8") as f:
                n += len(list(leaves(json.load(f))))
        tree_layers[layer] = n
        total += n
    sys.path.insert(0, os.path.join(REPO, "schema", "tests"))
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import adversarial_test as at  # noqa
    import semantic_validate as sv  # noqa
    tpl = load("templates/templates.json")["templates"]
    return {
        "tokens": total,
        "tokensByLayer": tree_layers,
        "primitives": len(glob.glob(os.path.join(REPO, "primitives", "*.json"))),
        "components": len(glob.glob(os.path.join(REPO, "components", "*.json"))),
        "sections": len(glob.glob(os.path.join(REPO, "sections", "*.json"))),
        "templates": len(tpl),
        "routes": len(load("templates/routes.json")["routes"]),
        "graphRules": len(load("compatibility/graph.json")["rules"]),
        "assetRoles": len(load("assets/asset-roles.json")["roles"]),
        "themes": len(glob.glob(os.path.join(REPO, "tokens", "themes", "*.json"))),
        "evidenceEntries": len(load(LEDGER)["entries"]),
        "examples": len(example_files()),
        "adversarialMutations": at.count_cases(),
        "adversarialControls": len(at.controls(sv.load_context(REPO))),
    }


def example_files():
    return sorted(os.path.basename(f) for f in glob.glob(os.path.join(REPO, "schema", "example*.pagespec.json")))


def schema_field_map(s, root, prefix=""):
    """Flatten a content object schema to {path: (required, kind, maxWords, role)}."""
    out = {}
    req = set(s.get("required", []))
    for name, sub in s.get("properties", {}).items():
        p = prefix + name
        r = name in req
        if "allOf" in sub:
            ar = sub["allOf"][1]["properties"]["assetRole"]
            role = (ar["const"],) if "const" in ar else tuple(sorted(ar["enum"]))
            out[p] = (r, "media", None, role)
        elif "enum" in sub:
            out[p] = (r, "enum", None, None)
        elif sub.get("type") == "string":
            out[p] = (r, "text", sub.get("maxWords"), None)
        elif sub.get("type") == "integer":
            out[p] = (r, "int", None, None)
        elif sub.get("type") == "boolean":
            out[p] = (r, "bool", None, None)
        elif sub.get("type") == "array" and sub["items"].get("type") == "string":
            out[p] = (r, "tlist", sub["items"].get("maxWords"), None)
        elif sub.get("type") == "array":
            out[p] = (r, "olist", None, None)
            out.update(schema_field_map(sub["items"], root, p + "."))
        elif sub.get("type") == "object" and set(sub.get("properties", {})) == {"label", "style", "intent"}:
            out[p] = (r, "cta", sub["properties"]["label"].get("maxWords"), sub["properties"]["style"]["const"])
        elif sub.get("type") == "object":
            out[p] = (r, "obj", None, None)
            out.update(schema_field_map(sub, root, p + "."))
        else:
            out[p] = (r, "?", None, None)
    return out


def contract_field_map(fields, prefix=""):
    out = {}
    for name, f in fields.items():
        p = prefix + name
        k = f["kind"]
        if k == "media":
            role = tuple(sorted([f.get("assetRole")] + list(f.get("generatedAssetRoles", []))))
        else:
            role = f.get("style") if k == "cta" else None
        mw = f.get("maxWords") if k in ("text", "tlist", "cta") else None
        out[p] = (f["required"], k, mw, role)
        if "fields" in f:
            out.update(contract_field_map(f["fields"], p + "."))
    return out


# ---------------------------------------------------------------- checks
def check_json():
    bad = []
    for f in all_files():
        if f.endswith(".json"):
            try:
                load(f)
            except Exception as e:  # noqa
                bad.append("%s: %s" % (f, e))
    report("json-parse", "FAIL" if bad else "PASS", bad or ["%d json files parse" % len([f for f in all_files() if f.endswith('.json')])])
    return not bad


def check_hygiene():
    bad = [f for f in all_files() if ".DS_Store" in f or "__MACOSX" in f or "__pycache__" in f or f.endswith(".pyc")]
    report("hygiene", "FAIL" if bad else "PASS", bad or ["no .DS_Store/__MACOSX/__pycache__"])


def check_abs_paths():
    bad = []
    for f in text_files():
        with open(os.path.join(REPO, f), encoding="utf-8") as fh:
            for i, line in enumerate(fh, 1):
                for pat in ABS_PATTERNS:
                    if pat in line:
                        bad.append("%s:%d contains a local machine path" % (f, i))
    report("absolute-paths", "FAIL" if bad else "PASS", bad or ["no local machine paths in %d text files" % len(text_files())])


def check_external_refs():
    bad = []
    for f in text_files():
        if f == LEDGER:
            continue
        with open(os.path.join(REPO, f), encoding="utf-8") as fh:
            for i, line in enumerate(fh, 1):
                if UP in line:
                    bad.append("%s:%d has a parent-relative path (only allowed in %s)" % (f, i, LEDGER))
    report("external-refs", "FAIL" if bad else "PASS", bad or ["parent-relative paths only in " + LEDGER])


def check_schema_example():
    import jsonschema
    s = load("schema/pagespec.schema.json")
    try:
        jsonschema.Draft7Validator.check_schema(s)
    except Exception as ex:  # noqa
        report("schema-example", "FAIL", ["schema invalid: %s" % ex])
        return
    msgs = []
    for fn in example_files():
        errs = list(jsonschema.Draft7Validator(s).iter_errors(load("schema/" + fn)))
        msgs += ["%s %s: %s" % (fn, list(x.absolute_path), x.message) for x in errs]
    report("schema-example", "FAIL" if msgs else "PASS", msgs or ["Draft7Validator: 0 errors on %d example PageSpecs (%s)" % (len(example_files()), ", ".join(example_files()))])


def check_semantic_example():
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import semantic_validate as sv
    ctx = sv.load_context(REPO)
    msgs, nw = [], 0
    for fn in example_files():
        errors, warnings = sv.validate(load("schema/" + fn), ctx)
        msgs += ["%s: %s %s" % ((fn,) + e) for e in errors]
        nw += len(warnings)
    report("semantic-example", "FAIL" if msgs else "PASS", msgs or ["0 errors, %d warnings across %d examples" % (nw, len(example_files()))])


def check_mode_contract():
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import semantic_validate as sv
    s = load("schema/pagespec.schema.json")
    al = load("tokens/llm/component-allowlist.json")
    g = load("compatibility/graph.json")
    ar = load("assets/asset-roles.json")
    bad = []
    sm = s["properties"].get("mode", {}).get("enum")
    sets = {"schema properties.mode.enum": sm, "graph modes.enum": g.get("modes", {}).get("enum"),
            "allowlist modes": al.get("modes"), "manifest modes": load(MANIFEST).get("modes"), "asset-roles modes.enum": ar.get("modes", {}).get("enum"),
            "semantic_validate.MODES": list(sv.MODES)}
    for k, v in sets.items():
        if v is None or sorted(v) != sorted(sets["semantic_validate.MODES"]):
            bad.append("%s = %r != semantic_validate.MODES %r" % (k, v, list(sv.MODES)))
    if "mode" not in s.get("required", []):
        bad.append("schema does not require 'mode'")
    for fn in example_files():
        e = load("schema/" + fn)
        want = "generated" if "generated" in fn else "reference"
        if e.get("mode") != want:
            bad.append("%s declares mode %r, its name implies %r" % (fn, e.get("mode"), want))
    if not any("generated" in f for f in example_files()) or "example.pagespec.json" not in example_files():
        bad.append("need both example.pagespec.json (reference) and example.generated.pagespec.json")
    for rid in ("GENERATED_NO_REFERENCE_ASSET", "GENERATED_BRAND_REQUIRED", "GENERATED_NO_SOURCE_BRAND_TEXT"):
        if sv.RULES.get(rid) != "error":
            bad.append("validator rule %s missing or not error severity" % rid)
    with open(os.path.join(REPO, "README.md"), encoding="utf-8") as f:
        readme = f.read()
    for rid in sorted(r for r in sv.RULES if r.startswith("GENERATED_")) + sorted(ar["roles"]) + ["`reference`", "`generated`"]:
        if rid not in readme:
            bad.append("README does not document %s (prose and enforcement must agree)" % rid)
    report("mode-contract", "FAIL" if bad else "PASS", bad or ["mode enum %s identical in schema, graph, allowlist, asset-roles, validator; %d examples declare the right mode" % (sorted(sm), len(example_files()))])


def check_allowlist():
    al = load("tokens/llm/component-allowlist.json")
    s = load("schema/pagespec.schema.json")
    bad = []
    pairs = [
        ("sections", {load("sections/" + os.path.basename(f))["id"] for f in glob.glob(os.path.join(REPO, "sections", "*.json"))}),
        ("primitives", {load("primitives/" + os.path.basename(f))["id"] for f in glob.glob(os.path.join(REPO, "primitives", "*.json"))}),
        ("components", {load("components/" + os.path.basename(f))["id"] for f in glob.glob(os.path.join(REPO, "components", "*.json"))}),
        ("templates", set(load("templates/templates.json")["templates"])),
        ("assetRoles", set(load("assets/asset-roles.json")["roles"])),
    ]
    for key, real in pairs:
        listed = set(al.get(key, []))
        for x in sorted(listed - real):
            bad.append("phantom allowlist %s entry %r (no contract)" % (key, x))
        for x in sorted(real - listed):
            bad.append("orphan %s %r (contract exists, not allowlisted)" % (key, x))
    for d in ("sections", "primitives", "components"):
        for f in glob.glob(os.path.join(REPO, d, "*.json")):
            cid = load(d + "/" + os.path.basename(f))["id"]
            if os.path.basename(f) != cid + ".json":
                bad.append("%s file name %s does not match id %s" % (d, os.path.basename(f), cid))
    if set(s["definitions"]["node"]["properties"]["type"]["enum"]) != set(al["sections"]):
        bad.append("schema node type enum != allowlist sections")
    if set(s["properties"]["template"]["enum"]) != set(al["templates"]):
        bad.append("schema template enum != allowlist templates")
    if set(s["definitions"]["assetRole"]["enum"]) != set(al["assetRoles"]):
        bad.append("schema assetRole enum != allowlist assetRoles")
    report("allowlist-parity", "FAIL" if bad else "PASS", bad or ["allowlist == contracts == schema enums"])

    bad = []
    if set(al["nodeSettableProperties"]) != set(s["definitions"]["node"]["properties"]):
        bad.append("nodeSettableProperties %s != schema node properties %s" % (sorted(al["nodeSettableProperties"]), sorted(s["definitions"]["node"]["properties"])))
    if set(al["pageSettableProperties"]) != set(s["properties"]):
        bad.append("pageSettableProperties != schema top-level properties")
    report("allowlist-properties", "FAIL" if bad else "PASS", bad or ["settable properties match schema"])


def check_contract_schema():
    s = load("schema/pagespec.schema.json")
    branches = {b["if"]["properties"]["type"]["const"]: b["then"] for b in s["definitions"]["node"]["allOf"]}
    bad = []
    for f in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        c = load("sections/" + os.path.basename(f))
        sid = c["id"]
        if sid not in branches:
            bad.append("%s has no schema branch" % sid)
            continue
        b = branches[sid]
        sm = schema_field_map(b["properties"]["content"], s)
        cm = contract_field_map(c["content"]["fields"])
        for p in sorted(set(sm) | set(cm)):
            if sm.get(p) != cm.get(p):
                bad.append("%s.%s contract %s != schema %s" % (sid, p, cm.get(p), sm.get(p)))
        mo = b["properties"]["motion"]
        if mo.get("additionalProperties") is not False:
            bad.append("%s motion schema not closed" % sid)
        if mo["properties"]["pattern"]["enum"] != c["motion"]["allowedPatterns"]:
            bad.append("%s motion patterns drift" % sid)
        if mo["properties"]["trigger"]["enum"] != c["motion"]["allowedTriggers"]:
            bad.append("%s motion triggers drift" % sid)
        if mo["properties"]["reducedMotionFallback"].get("const") != c["motion"]["reducedMotionFallback"]:
            bad.append("%s reducedMotionFallback const drift" % sid)
        if b["properties"]["content"].get("additionalProperties") is not False:
            bad.append("%s content schema not closed" % sid)
    if set(branches) != {load("sections/" + os.path.basename(f))["id"] for f in glob.glob(os.path.join(REPO, "sections", "*.json"))}:
        bad.append("schema branches != section contracts")
    report("contract-schema", "FAIL" if bad else "PASS", bad or ["%d section contracts agree with schema (fields, maxWords, roles, motion)" % len(branches)])


def check_section_contracts():
    bad = []
    for f in sorted(glob.glob(os.path.join(REPO, "sections", "*.json"))):
        c = load("sections/" + os.path.basename(f))
        for k in ("id", "category", "purpose", "content", "constraints", "motion", "responsive", "evidence", "implementedBy"):
            if not c.get(k):
                bad.append("%s missing %s" % (c.get("id"), k))
        if not c.get("motion", {}).get("reducedMotionFallback"):
            bad.append("%s missing reducedMotionFallback" % c.get("id"))
        for r in c.get("responsive", []):
            if r.get("minWidth") not in BREAKPOINTS or not r.get("changes"):
                bad.append("%s responsive entry %s not on a real breakpoint" % (c["id"], r))
    report("section-contracts", "FAIL" if bad else "PASS", bad or ["all contracts complete; responsive steps on real breakpoints"])


def _schema_role_fields(s):
    """{(section, field-path): set(roles)} for every media field in the schema."""
    out = {}

    def walk(o, sid, path):
        if isinstance(o, dict):
            ar = o.get("assetRole")
            if isinstance(ar, dict) and ("const" in ar or "enum" in ar):
                out[(sid, path)] = {ar["const"]} if "const" in ar else set(ar["enum"])
                return
            for k, v in o.items():
                walk(v, sid, path + "." + k if k not in ("properties", "items", "then", "allOf") else path)
        elif isinstance(o, list):
            for v in o:
                walk(v, sid, path)
    for b in s["definitions"]["node"]["allOf"]:
        walk(b["then"]["properties"]["content"], b["if"]["properties"]["type"]["const"], "")
    return out


def check_asset_roles():
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import semantic_validate as sv
    ar = load("assets/asset-roles.json")
    s = load("schema/pagespec.schema.json")
    exs = {fn: json.dumps(load("schema/" + fn)) for fn in example_files()}
    ref_ex = exs.get("example.pagespec.json", "")
    gen_ex = "".join(v for k, v in exs.items() if "generated" in k)
    contracts = {}
    for f in glob.glob(os.path.join(REPO, "sections", "*.json")):
        c = load("sections/" + os.path.basename(f))
        contracts[c["id"]] = c
    bad = []
    # 1. registry coherence + pins (single implementation shared with the adversarial suite)
    bad += sv.registry_findings(ar)
    for rid, r in ar["roles"].items():
        if not r.get("guidance"):
            bad.append("%s has no AI-generation guidance" % rid)
        for sec in r.get("allowedSections", []):
            if sec not in contracts:
                bad.append("%s allowedSections lists unknown %s" % (rid, sec))
        needle = '"assetRole": "%s"' % rid
        if needle not in "".join(exs.values()):
            bad.append("role %s not exercised by any example PageSpec" % rid)
        if r.get("generatedMode") == sv.BLOCKED:
            if needle in gen_ex:
                bad.append("generated example uses reference-only role %s" % rid)
            if needle not in ref_ex:
                bad.append("reference-only role %s is not exercised by the reference example" % rid)
        elif r.get("brandMark") and needle not in gen_ex:
            bad.append("generation-safe brand role %s is not exercised by the generated example" % rid)
    # 2. wiring: every role is wired into a schema field of an allowed section
    fields = _schema_role_fields(s)
    wired = {}
    for (sid, path), roles in fields.items():
        for r in roles:
            wired.setdefault(r, set()).add(sid)
    for rid in ar["roles"]:
        if rid not in wired:
            bad.append("role %s documented but never wired into a schema field" % rid)
        else:
            for sid in wired[rid] - set(ar["roles"][rid]["allowedSections"]):
                bad.append("role %s wired in %s but not in its allowedSections" % (rid, sid))
    for rid in wired:
        if rid not in ar["roles"]:
            bad.append("schema wires unknown role %s" % rid)
    # 3. section contracts: assetRoles list == roles allowed there; brandMark fields agree with schema + registry
    for sid, c in contracts.items():
        allowed = {rid for rid, r in ar["roles"].items() if sid in r.get("allowedSections", [])}
        if set(c.get("assetRoles", [])) != allowed:
            bad.append("%s contract assetRoles %s != roles allowing it %s" % (sid, sorted(c.get("assetRoles", [])), sorted(allowed)))
    safe_brand = {rid for rid, r in ar["roles"].items() if r.get("brandMark") and r.get("generatedMode") == sv.SAFE}
    for sid, c in contracts.items():
        brand_paths = set()
        for p, f in sv._brand_fields(c["content"]["fields"]):
            brand_paths.add(p)
            want = {f.get("assetRole")} | set(f.get("generatedAssetRoles", []))
            if fields.get((sid, "." + p)) != want:
                bad.append("%s brand-mark field %s: schema roles %s != contract roles %s" % (sid, p, fields.get((sid, "." + p)), want))
            gen = set(f.get("generatedAssetRoles", []))
            expect = {r for r in safe_brand if sid in ar["roles"][r]["allowedSections"]}
            if gen != expect:
                bad.append("%s.%s generatedAssetRoles %s != generation-safe brand roles allowed there %s" % (sid, p, sorted(gen), sorted(expect)))
            if ar["roles"].get(f.get("assetRole"), {}).get("generatedMode") != sv.BLOCKED:
                bad.append("%s.%s reference brand role %r must be blocked-in-generated" % (sid, p, f.get("assetRole")))
        # a blocked (reference-only) role may only be reachable through a brand-mark field
        for (fs, path), roles in fields.items():
            if fs == sid and path.lstrip(".") not in brand_paths:
                for r in roles:
                    if ar["roles"].get(r, {}).get("generatedMode") == sv.BLOCKED:
                        bad.append("%s field %s allows reference-only role %s but is not a brandMark field" % (sid, path, r))
    # 4. sections that can carry a brand mark must exist in the template
    if not any(True for c in contracts.values() for _ in sv._brand_fields(c["content"]["fields"])):
        bad.append("no section contract declares a brandMark field")
    n_blocked = sum(r.get("generatedMode") == sv.BLOCKED for r in ar["roles"].values())
    report("asset-roles", "FAIL" if bad else "PASS", bad or ["%d roles: all classified (%d reference-only/blocked-in-generated, %d generation-safe, %d slot-operator-supplied), closed policy enum, %d pinned policies + %d pinned generatedMode hold, brand marks wired, generated example clean" % (
        len(ar["roles"]), n_blocked, sum(r["generatedMode"] == sv.SAFE for r in ar["roles"].values()), sum(r["generatedMode"] == "slot-operator-supplied" for r in ar["roles"].values()), len(ar["pinnedPolicies"]), len(ar["pinnedGeneratedMode"]))])


def check_templates_routes():
    tpl = load("templates/templates.json")["templates"]
    routes = load("templates/routes.json")["routes"]
    bad = []
    paths = [r["path"] for r in routes]
    for p in set(paths):
        if paths.count(p) != 1:
            bad.append("route %s assigned %d times" % (p, paths.count(p)))
    for r in routes:
        if r["template"] not in tpl:
            bad.append("route %s -> unknown template %s" % (r["path"], r["template"]))
        elif r["path"] not in tpl[r["template"]]["routes"]:
            bad.append("route %s not listed by %s" % (r["path"], r["template"]))
    for tid, t in tpl.items():
        for p in t["routes"]:
            if not any(r["path"] == p and r["template"] == tid for r in routes):
                bad.append("%s lists %s but routes.json does not bind it" % (tid, p))
        for n in t["nodes"]:
            if set(n) != {"section", "required", "repeatable"}:
                bad.append("%s node %s not a structured object" % (tid, n))
    report("templates-routes", "FAIL" if bad else "PASS", bad or ["%d route(s) -> %d template(s), 1:1" % (len(routes), len(tpl))])


def check_graph_validator():
    sys.path.insert(0, os.path.join(REPO, "schema"))
    import semantic_validate as sv
    g = {r["id"]: r["severity"] for r in load("compatibility/graph.json")["rules"]}
    bad = []
    for rid in sorted(set(g) | set(sv.RULES)):
        if g.get(rid) != sv.RULES.get(rid):
            bad.append("rule %s: graph=%s validator=%s" % (rid, g.get(rid), sv.RULES.get(rid)))
    for r in load("compatibility/graph.json")["rules"]:
        if r["severity"] not in ("error", "warn"):
            bad.append("rule %s bad severity" % r["id"])
    report("graph-validator", "FAIL" if bad else "PASS", bad or ["%d rules agree (ids + severities)" % len(g)])


def check_token_refs():
    tree = token_tree()
    bad = []
    files = glob.glob(os.path.join(REPO, "tokens", "*", "*.json")) + glob.glob(os.path.join(REPO, "primitives", "*.json")) + glob.glob(os.path.join(REPO, "components", "*.json"))
    n = 0
    for fp in files:
        r = rel(fp)
        if r.startswith("tokens/llm/"):
            continue
        with open(fp, encoding="utf-8") as f:
            txt = f.read()
        for m in re.finditer(r"\{([A-Za-z][A-Za-z0-9_.-]*)\}", txt):
            n += 1
            if lookup(tree, m.group(1)) is None:
                bad.append("%s: unresolved token ref {%s}" % (r, m.group(1)))
    theme = load("tokens/themes/light.json")["resolved"]
    for path, v in theme.items():
        node = lookup(tree, path)
        if node is None or node.get("$value") != v["ref"]:
            bad.append("theme %s ref drift" % path)
        elif resolve_value(tree, v["ref"]) != v["value"]:
            bad.append("theme %s resolves to %s, theme says %s" % (path, resolve_value(tree, v["ref"]), v["value"]))
    sem_colors = [p for p in leaves(load("tokens/10-semantic/semantic.json")) if p.startswith("color.")]
    for p in sem_colors:
        if p not in theme:
            bad.append("semantic %s not resolved by theme light" % p)
    report("token-refs", "FAIL" if bad else "PASS", bad or ["%d token refs resolve; theme resolves %d semantic colours" % (n, len(theme))])


def check_token_catalog():
    cat = load("tokens/llm/token-catalog.json")["categories"]
    listed = {e["path"] for v in cat.values() for e in v}
    real = set()
    for layer in ("00-foundation", "10-semantic", "20-component", "30-layout"):
        for fp in glob.glob(os.path.join(REPO, "tokens", layer, "*.json")):
            with open(fp, encoding="utf-8") as f:
                real |= set(leaves(json.load(f)))
    bad = ["catalog lists missing token %s" % p for p in sorted(listed - real)] + ["token %s missing from catalog" % p for p in sorted(real - listed)]
    pol = load("tokens/llm/token-policy.json")
    for k in pol["rawValueRestrictions"]:
        if k not in cat:
            bad.append("policy category %r is not a real catalog key" % k)
    report("token-catalog", "FAIL" if bad else "PASS", bad or ["catalog == %d token leaves; policy keys real" % len(real)])


def check_evidence_ids():
    entries = load(LEDGER)["entries"]
    used = set()
    bad = []
    for f in text_files():
        with open(os.path.join(REPO, f), encoding="utf-8") as fh:
            for m in re.finditer(r"\bmv\.[A-Za-z0-9_.-]*[A-Za-z0-9]", fh.read()):
                used.add(m.group(0))
                if m.group(0) not in entries:
                    bad.append("%s references unknown evidence id %s" % (f, m.group(0)))
    unused = sorted(set(entries) - used)
    status = "FAIL" if bad else ("WARN" if unused else "PASS")
    report("evidence-ids", status, sorted(set(bad)) + ["unused ledger entry %s" % u for u in unused] or ["all %d referenced ids exist" % len(used)])


def check_citations(source_root):
    entries = load(LEDGER)["entries"]
    cits = [(k, c) for k, e in entries.items() for c in e["citations"]]
    bad, missing = [], []
    for k, c in cits:
        m = re.fullmatch(r"(.+):(\d+)(?:-(\d+))?", c["ref"])
        if not m or not m.group(1).startswith(UP):
            bad.append("%s: malformed citation %r" % (k, c["ref"]))
            continue
        target = os.path.join(source_root, m.group(1)[len(UP):])
        a, b = int(m.group(2)), int(m.group(3) or m.group(2))
        if not os.path.isfile(target):
            missing.append("%s: %s" % (k, m.group(1)))
            continue
        with open(target, encoding="utf-8") as f:
            lines = f.read().splitlines()
        if a < 1 or b < a or b > len(lines):
            bad.append("%s: %s out of range (file has %d lines)" % (k, c["ref"], len(lines)))
            continue
        if c.get("contains") is None:
            bad.append("%s: %s has no 'contains' anchor" % (k, c["ref"]))
        elif c["contains"] not in "\n".join(lines[a - 1:b]):
            bad.append("%s: %s in range but does not contain %r (wrong code cited)" % (k, c["ref"], c["contains"]))
    if missing and len(missing) == len(cits):
        report("citations", "WARN" if not bad else "FAIL",
               bad + ["standalone mode: sibling source tree absent, %d citations not resolvable (not a failure)" % len(cits)])
    elif missing:
        report("citations", "FAIL", bad + ["cited file missing in a present source tree: " + x for x in missing])
    else:
        report("citations", "FAIL" if bad else "PASS", bad or ["%d citations in range and anchored" % len(cits)])


def check_ia_alignment(source_root):
    p = os.path.join(source_root, "ia.json")
    if not os.path.isfile(p):
        report("ia-alignment", "WARN", ["standalone mode: sibling ia.json absent, alignment not checked"])
        return
    with open(p, encoding="utf-8") as f:
        ia = json.load(f)
    tpl = load("templates/templates.json")["templates"]
    bad = []
    ia_t = {t["id"]: t for t in ia["templates"]}
    if set(ia_t) != set(tpl):
        bad.append("template ids %s != ia.json %s" % (sorted(tpl), sorted(ia_t)))
    for tid in set(ia_t) & set(tpl):
        mine = [n["section"] for n in tpl[tid]["nodes"]]
        if mine != ia_t[tid]["sections"]:
            bad.append("%s node order %s != ia.json %s" % (tid, mine, ia_t[tid]["sections"]))
        if sorted(tpl[tid]["routes"]) != sorted(ia_t[tid]["routes"]):
            bad.append("%s routes drift from ia.json" % tid)
    for f in glob.glob(os.path.join(REPO, "sections", "*.json")):
        c = load("sections/" + os.path.basename(f))
        s = ia["sections"].get(c["id"])
        if s is None:
            bad.append("section %s not in ia.json" % c["id"])
        else:
            if s["category"] != c["category"]:
                bad.append("%s category %s != ia.json %s" % (c["id"], c["category"], s["category"]))
            if s.get("implementedBy") != c.get("implementedBy"):
                bad.append("%s implementedBy %r != ia.json %r" % (c["id"], c.get("implementedBy"), s.get("implementedBy")))
    for sid in ia["sections"]:
        if not os.path.isfile(os.path.join(REPO, "sections", sid + ".json")):
            bad.append("ia.json section %s has no contract" % sid)
    report("ia-alignment", "FAIL" if bad else "PASS", bad or ["templates/sections match ia.json exactly"])


def check_manifest(counts):
    man = load(MANIFEST)
    al = load("tokens/llm/component-allowlist.json")
    s = load("schema/pagespec.schema.json")
    bad = []
    for k, v in counts.items():
        if man.get("counts", {}).get(k) != v:
            bad.append("counts.%s = %r, recomputed %r" % (k, man.get("counts", {}).get(k), v))
    for k in set(man.get("counts", {})) - set(counts):
        bad.append("counts.%s is not recomputed by anything" % k)
    if man.get("allowlistVersion") != al.get("allowlistVersion"):
        bad.append("allowlistVersion %r != allowlist %r" % (man.get("allowlistVersion"), al.get("allowlistVersion")))
    if man.get("pageSpecVersion") != s["properties"]["pageSpecVersion"]["const"]:
        bad.append("pageSpecVersion %r != schema const %r" % (man.get("pageSpecVersion"), s["properties"]["pageSpecVersion"]["const"]))
    if not man.get("versionFieldNote"):
        bad.append("versionFieldNote missing")
    if man.get("productionApproved") is not False:
        bad.append("productionApproved must be false")
    if man.get("status") != "design-review-pending":
        bad.append("status must be design-review-pending")
    for k in ("repositoryId", "defaultTheme", "schemaValidatedThemes", "entryPoints", "distribution"):
        if k not in man:
            bad.append("manifest missing %s" % k)
    ep = man.get("entryPoints", [])
    if not isinstance(ep, list) or not all(isinstance(p, str) for p in ep):
        bad.append("entryPoints must be a flat list of in-repo path strings")
        ep = []
    eps = ep
    for p in eps:
        if UP in p or os.path.isabs(p):
            bad.append("entryPoint %s points outside the design-repo" % p)
        elif not os.path.isfile(os.path.join(REPO, p)):
            bad.append("entryPoint %s does not exist" % p)
    real = set(all_files()) - {MANIFEST}
    for p in sorted(real - set(eps)):
        bad.append("file %s not listed in entryPoints" % p)
    report("manifest", "FAIL" if bad else "PASS", bad or ["counts recomputed, versions match, %d entryPoints == files on disk" % len(eps)])


def check_readme(counts):
    with open(os.path.join(REPO, "README.md"), encoding="utf-8") as f:
        txt = f.read()
    m = re.search(r"<!-- counts:start -->(.*?)<!-- counts:end -->", txt, re.S)
    bad = []
    if not m:
        bad.append("README has no counts block")
    else:
        rows = dict(re.findall(r"^\|\s*([A-Za-z]+)\s*\|\s*(\d+)\s*\|", m.group(1), re.M))
        flat = {k: v for k, v in counts.items() if isinstance(v, int)}
        for k, v in flat.items():
            if k not in rows:
                bad.append("README counts missing %s" % k)
            elif int(rows[k]) != v:
                bad.append("README says %s=%s, recomputed %d" % (k, rows[k], v))
    report("readme-counts", "FAIL" if bad else "PASS", bad or ["README counts match disk"])


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-root", default=os.path.dirname(REPO))
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)
    try:
        import jsonschema  # noqa
    except ImportError:
        print("FAIL: the 'jsonschema' package is required (pip install jsonschema)")
        return 1
    if check_json():
        check_hygiene()
        check_abs_paths()
        check_external_refs()
        check_schema_example()
        check_semantic_example()
        check_mode_contract()
        check_allowlist()
        check_contract_schema()
        check_section_contracts()
        check_asset_roles()
        check_templates_routes()
        check_graph_validator()
        check_token_refs()
        check_token_catalog()
        check_evidence_ids()
        check_citations(os.path.abspath(a.source_root))
        check_ia_alignment(os.path.abspath(a.source_root))
        try:
            counts = recompute_counts()
        except Exception as ex:  # noqa  (e.g. the adversarial suite cannot load a required example)
            counts = None
            report("manifest", "FAIL", ["cannot recompute counts: %s: %s" % (type(ex).__name__, ex)])
        if counts is not None:
            check_manifest(counts)
            check_readme(counts)
    fails = [r for r in results if r["status"] == "FAIL"]
    if a.json:
        print(json.dumps({"results": results, "failed": [r["check"] for r in fails]}, indent=1))
    else:
        for r in results:
            print("%-5s %-21s %s" % (r["status"], r["check"], r["messages"][0] if r["messages"] else ""))
            for msg in r["messages"][1:12]:
                print("      %-21s %s" % ("", msg))
            if len(r["messages"]) > 12:
                print("      %-21s ... %d more" % ("", len(r["messages"]) - 12))
        print("\n%d checks: %d PASS, %d WARN, %d FAIL" % (len(results), sum(r["status"] == "PASS" for r in results),
                                                          sum(r["status"] == "WARN" for r in results), len(fails)))
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
