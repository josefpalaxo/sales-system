#!/usr/bin/env python3
"""Validate essential sales-system repository invariants without dependencies."""

from __future__ import annotations

from datetime import date
from pathlib import Path
import re
import sys

from repo_records import ID_PATTERN, REQUIRED_KEYS, ROOT, load_records


ALLOWED_RECORD_STATUSES = {"draft", "reviewed", "approved", "deprecated"}
ALLOWED_CONFLICT_STATUSES = {"open", "resolved", "accepted-risk"}
ALLOWED_CLASSIFICATIONS = {"public", "internal", "confidential", "restricted"}
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")
MARKDOWN_LINK_PATTERN = re.compile(r"\[[^\]]+\]\(([^)]+)\)")


def load_registered_values(path: Path, section: str) -> set[str]:
    values: set[str] = set()
    in_section = False
    section_indent = 0
    for raw in path.read_text(encoding="utf-8").splitlines():
        stripped = raw.strip()
        indent = len(raw) - len(raw.lstrip())
        if stripped == f"{section}:":
            in_section = True
            section_indent = indent
            continue
        if in_section and stripped and indent <= section_indent and not stripped.startswith("-"):
            break
        if in_section and stripped.startswith("- "):
            values.add(stripped[2:].strip())
    return values


def load_owner_ids(path: Path) -> set[str]:
    owners: set[str] = set()
    for raw in path.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^\s+- id:\s*(\S+)\s*$", raw)
        if match:
            owners.add(match.group(1))
    return owners


def validate() -> list[str]:
    errors: list[str] = []
    try:
        records = load_records()
    except ValueError as exc:
        return [str(exc)]

    vocab_path = ROOT / "governance" / "vocabularies.yaml"
    owner_path = ROOT / "governance" / "owners.yaml"
    allowed_domains = load_registered_values(vocab_path, "domains")
    allowed_relation_types = load_registered_values(vocab_path, "relation_types")
    owners = load_owner_ids(owner_path)
    by_id: dict[str, Path] = {}

    for record in records:
        relative = record.path.relative_to(ROOT)
        metadata = record.metadata
        missing = sorted(REQUIRED_KEYS - metadata.keys())
        if missing:
            errors.append(f"{relative}: missing required keys: {', '.join(missing)}")

        record_id = metadata.get("id", "")
        if record_id and not ID_PATTERN.fullmatch(record_id):
            errors.append(f"{relative}: invalid id '{record_id}'")
        if record_id in by_id:
            errors.append(f"{relative}: duplicate id '{record_id}' also used by {by_id[record_id].relative_to(ROOT)}")
        elif record_id:
            by_id[record_id] = record.path

        kind = metadata.get("kind", "")
        status = metadata.get("status", "")
        allowed_statuses = ALLOWED_CONFLICT_STATUSES if kind == "conflict" else ALLOWED_RECORD_STATUSES
        if status and status not in allowed_statuses:
            errors.append(f"{relative}: status '{status}' is invalid for kind '{kind}'")
        if status == "approved" and not metadata.get("revision", "").isdigit():
            errors.append(f"{relative}: approved records require an integer revision")

        classification = metadata.get("classification", "")
        if classification and classification not in ALLOWED_CLASSIFICATIONS:
            errors.append(f"{relative}: invalid classification '{classification}'")

        domain = metadata.get("domain", "")
        if domain and domain not in allowed_domains:
            errors.append(f"{relative}: unregistered domain '{domain}'")

        owner = metadata.get("owner", "")
        if owner and owner not in owners:
            errors.append(f"{relative}: unregistered owner '{owner}'")

        for field in ("last_reviewed", "review_by"):
            value = metadata.get(field, "")
            if value and not DATE_PATTERN.fullmatch(value):
                errors.append(f"{relative}: {field} must use YYYY-MM-DD")
            elif value:
                try:
                    date.fromisoformat(value)
                except ValueError:
                    errors.append(f"{relative}: {field} is not a valid date")

        review_by = metadata.get("review_by", "")
        if status == "approved" and DATE_PATTERN.fullmatch(review_by):
            try:
                review_date = date.fromisoformat(review_by)
            except ValueError:
                pass
            else:
                if review_date < date.today():
                    errors.append(f"{relative}: approved record review date has expired")

        for relation_type in record.relation_types:
            if relation_type not in allowed_relation_types:
                errors.append(f"{relative}: unregistered relation type '{relation_type}'")

    known_ids = set(by_id)
    for record in records:
        relative = record.path.relative_to(ROOT)
        for target in record.targets:
            if target not in known_ids:
                errors.append(f"{relative}: unresolved relation target '{target}'")
        for source_ref in record.source_refs:
            if source_ref not in known_ids:
                errors.append(f"{relative}: unresolved source ref '{source_ref}'")

    forbidden_work_dirs = [ROOT / "tmp", ROOT / "temp", ROOT / ".work"]
    for path in forbidden_work_dirs:
        if path.exists():
            errors.append(f"{path.relative_to(ROOT)}: use the single root work/ directory")
    for path in ROOT.rglob("work"):
        if path.is_dir() and path != ROOT / "work" and ".git" not in path.parts:
            errors.append(f"{path.relative_to(ROOT)}: nested work directories are not allowed")

    for markdown_path in ROOT.rglob("*.md"):
        if ".git" in markdown_path.parts or "work" in markdown_path.parts:
            continue
        if "sources" in markdown_path.parts and "archived-snapshots" in markdown_path.parts:
            continue
        text = markdown_path.read_text(encoding="utf-8")
        for raw_target in MARKDOWN_LINK_PATTERN.findall(text):
            target = raw_target.strip().strip("<>")
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            target_path = target.split("#", 1)[0]
            if not target_path:
                continue
            resolved = (markdown_path.parent / target_path).resolve()
            if not resolved.exists():
                errors.append(
                    f"{markdown_path.relative_to(ROOT)}: unresolved Markdown link '{target}'"
                )

    return errors


def main() -> int:
    errors = validate()
    if errors:
        print("Repository validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Repository validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
