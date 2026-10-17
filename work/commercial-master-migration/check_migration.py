#!/usr/bin/env python3
"""Verify migration coverage, source integrity, local links, and master references."""

from hashlib import sha256
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from repo_records import load_records
from validate import validate, validate_master_dependencies

manifest = json.loads((Path(__file__).parent / "manifest.json").read_text())
relocations = json.loads((ROOT / "work/repository-restructure/path-map.json").read_text())["paths"]
source_relocations = json.loads((ROOT / "work/source-consolidation/path-map.json").read_text())["paths"]


def current_path(relative):
    first = relocations.get(relative, relative)
    return ROOT / source_relocations.get(first, first)


errors = []
exact = []
source_root = Path(manifest["source_root"])
source_files = {
    p.relative_to(source_root).as_posix()
    for p in source_root.rglob("*")
    if p.is_file() and p.name != ".DS_Store" and "__pycache__" not in p.parts
}
listed = {entry["relative"] for entry in manifest["entries"] if "relative" in entry}
if source_files != listed:
    errors.append("Source file inventory differs from migration manifest")
for entry in manifest["entries"]:
    source = source_root / entry["relative"] if "relative" in entry else current_path(entry["source"])
    if sha256(source.read_bytes()).hexdigest() != entry["sha256"]:
        errors.append(f"Original source changed: {source}")
    destination = current_path(entry["destination"])
    if not destination.exists():
        errors.append(f"Missing destination: {destination}")
    if "relative" in entry and (not entry["relative"].endswith(".md") or entry.get("original_copy")):
        destination = current_path(entry.get("original_copy", entry["destination"]))
        if sha256(destination.read_bytes()).hexdigest() != entry["sha256"]:
            errors.append(f"Exact-copy mismatch: {destination}")
        else:
            exact.append(str(destination.relative_to(ROOT)))

roots = [Path(__file__).parent]  # Shared links and records are checked by validate() below.
for base in roots:
    for document in base.rglob("*.md"):
        for raw in re.findall(r"\[[^\]]+\]\(([^)]+)\)", document.read_text()):
            target = raw.strip().strip("<>")
            if target.startswith(("https://", "http://", "mailto:", "#")):
                continue
            if not (document.parent / target.split("#")[0]).exists():
                errors.append(f"Broken link: {document.relative_to(ROOT)}: {target}")

records = load_records()
errors.extend(validate_master_dependencies(records))
all_errors = validate()
changed_scope_errors = [
    error for error in all_errors
    if error.startswith(("shared/", "shared/playbooks/", "governance/", "scripts/", "schemas/", "sources/", "README.md", "AGENTS.md", "GOVERNANCE.md"))
]
errors.extend(changed_scope_errors)
result = {
    "imported_source_files": len(listed),
    "derived_records": sum(record.metadata.get("record_role") == "derived" for record in records),
    "exact_assets_checked": exact,
    "new_errors": errors,
    "unrelated_repository_errors": len(all_errors) - len(changed_scope_errors),
}
print(json.dumps(result, indent=2))
raise SystemExit(bool(errors))
