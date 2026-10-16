#!/usr/bin/env python3
"""Validate relocated investor evidence and reporting boundaries."""
from datetime import date
import hashlib
import json
from pathlib import Path
import re
from repo_records import ROOT, load_records


def validate_investors():
    errors = []
    records = [r for r in load_records() if r.id.startswith("investor-master:")]
    if not records:
        errors.append("Investor context records are missing from the shared library")
    for record in records:
        metadata = record.metadata
        relative = record.path.relative_to(ROOT)
        if not metadata.get("revision", "").isdigit() or int(metadata.get("revision", "0")) < 1:
            errors.append(f"{relative}: investor context requires a positive revision")
        try:
            if date.fromisoformat(metadata.get("updated_at", "")) > date.today():
                errors.append(f"{relative}: updated_at is in the future")
        except ValueError:
            errors.append(f"{relative}: invalid investor updated_at")
        if metadata.get("status") == "approved":
            for key in ("approved_by", "approval_ref"):
                if metadata.get(key, "") in {"", "null", "unassigned", "pending"}:
                    errors.append(f"{relative}: approved investor context requires {key}")
    try:
        manifest = json.loads((ROOT / "sources/investor-context/internal/sales-system-provenance.json").read_text())
        identifiers = set()
        for source in manifest["records"]:
            if source["id"] in identifiers:
                errors.append(f"Duplicate investor source ID: {source['id']}")
            identifiers.add(source["id"])
            if not re.fullmatch(r"[a-f0-9]{64}", source["sha256"]):
                errors.append(f"Invalid source fingerprint: {source['id']}")
        setup = ROOT / "sources/investor-context/setup.md"
        if hashlib.sha256(setup.read_bytes()).hexdigest() != manifest["setup_brief"]["sha256"]:
            errors.append("Original investor setup mandate changed; preserve its recorded fingerprint")
    except (OSError, ValueError, KeyError) as exc:
        errors.append(f"Invalid investor source provenance: {exc}")
    return errors


if __name__ == "__main__":
    errors = validate_investors()
    if errors:
        print("\n".join(errors))
        raise SystemExit(1)
    print("Investor context metadata and preserved source provenance passed. Business approval is unchanged.")
