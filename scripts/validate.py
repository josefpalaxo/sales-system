#!/usr/bin/env python3
"""Validate essential sales-system repository invariants without dependencies."""

from __future__ import annotations

from datetime import date
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

from repo_records import ID_PATTERN, REQUIRED_KEYS, ROOT, historical_path, load_records, repository_files, source_record_path


ALLOWED_RECORD_STATUSES = {"draft", "reviewed", "approved", "deprecated"}
ALLOWED_CONFLICT_STATUSES = {"open", "resolved", "accepted-risk"}
ALLOWED_CLASSIFICATIONS = {"public", "internal", "confidential", "restricted"}
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")
MARKDOWN_LINK_PATTERN = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
MARKDOWN_REFERENCE_PATTERN = re.compile(r"^ {0,3}\[[^\]\n]+\]:\s*(<[^>]+>|\S+)", re.M)
TOPIC_PATTERN = re.compile(r"^[a-z][a-z0-9-]*$")


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


def validate_master_dependencies(records) -> list[str]:
    """Prevent structured representations from silently drifting past a master."""
    errors: list[str] = []
    by_id = {record.id: record for record in records}
    for record in records:
        metadata = record.metadata
        role = metadata.get("record_role", "")
        if role not in {"", "master", "derived"}:
            errors.append(f"{record.path.relative_to(ROOT)}: invalid record_role '{role}'")
        if role == "master" and metadata.get("kind") != "master-document":
            errors.append(f"{record.path.relative_to(ROOT)}: master role requires master-document kind")
        if role != "derived":
            continue
        relative = record.path.relative_to(ROOT)
        master_id = metadata.get("master_id", "")
        revision = metadata.get("master_revision", "")
        if not master_id or not revision.isdigit() or int(revision) < 1:
            errors.append(f"{relative}: derived records require master_id and positive master_revision")
            continue
        if ("derives_from", master_id) not in record.relations:
            errors.append(f"{relative}: master_id must also appear in derives_from")
        master = by_id.get(master_id)
        if master is None:
            errors.append(f"{relative}: unresolved master_id '{master_id}'")
            continue
        if master.metadata.get("record_role") != "master" or master.metadata.get("kind") != "master-document":
            errors.append(f"{relative}: governing master must be a master-document with master role")
        if revision != master.metadata.get("revision"):
            errors.append(f"{relative}: master revision mismatch; reconcile against {master_id}")
        if metadata.get("status") == "approved" and master.metadata.get("status") != "approved":
            errors.append(f"{relative}: approved representation requires an approved governing master")
    return errors


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
        if metadata.get("schema_version") != "1":
            errors.append(f"{relative}: schema_version must be 1")
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
        if source_record_path(record.path) and kind != "source":
            errors.append(f"{relative}: .source.md descriptors require kind: source")
        if kind == "source" and not source_record_path(record.path):
            errors.append(f"{relative}: source records belong in sources/ as .source.md descriptors")
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
        draft_unknown = status == "draft"
        if owner and owner not in owners and not (draft_unknown and owner in {"null", "unassigned"}):
            errors.append(f"{relative}: unregistered owner '{owner}'")
        if not owner or (not draft_unknown and owner in {"null", "unassigned"}):
            errors.append(f"{relative}: accountable owner is required outside draft status")

        for field in ("last_reviewed", "review_by"):
            value = metadata.get(field, "")
            if draft_unknown and value in {"null", "unassigned"}:
                continue
            if not value:
                errors.append(f"{relative}: {field} is required; use null only for unknown draft dates")
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

        for relation_type, target in record.relations:
            if relation_type not in allowed_relation_types:
                errors.append(f"{relative}: unregistered relation type '{relation_type}'")
            if not ID_PATTERN.fullmatch(target):
                errors.append(f"{relative}: invalid relation target '{target}'")

        if kind == "slide-deck":
            topic = record.topic
            if not topic:
                errors.append(f"{relative}: slide-deck records require a topic")
            elif not TOPIC_PATTERN.fullmatch(topic):
                errors.append(f"{relative}: invalid topic slug '{topic}'")

            slides_root = ROOT / "shared" / "assets" / "slides"
            expected_parent = slides_root / topic
            if record.path.parent != expected_parent:
                expected = expected_parent.relative_to(ROOT)
                errors.append(f"{relative}: topic must mirror folder path '{expected}'")

            deck_path = record.path.with_suffix(".pptx")
            if not deck_path.exists():
                errors.append(
                    f"{relative}: slide-deck record requires same-basename PPTX '{deck_path.name}'"
                )

    errors.extend(validate_master_dependencies(records))

    known_ids = set(by_id)
    for record in records:
        relative = record.path.relative_to(ROOT)
        for target in record.targets:
            if target not in known_ids:
                errors.append(f"{relative}: unresolved relation target '{target}'")
        for source_ref in record.source_refs:
            if source_ref not in known_ids:
                errors.append(f"{relative}: unresolved source ref '{source_ref}'")

    files = repository_files()
    retired_roots = {"domains", "partners", "investors", "slides-projects", "output", "tmp", "temp", ".work"}
    for path in files:
        relative = path.relative_to(ROOT)
        if relative.parts[0] in retired_roots:
            errors.append(f"{relative}: use shared/, relationships/ or work/ rather than a retired root")
        if relative.parts[:2] == ("governance", "source-register"):
            errors.append(f"{relative}: source descriptions and inputs belong together in sources/")

    slide_roots = [ROOT / "shared" / "assets" / "slides"]
    for slide_root in slide_roots:
        if not slide_root.exists():
            continue
        for deck_path in slide_root.rglob("*.pptx"):
            record_path = deck_path.with_suffix(".md")
            if not record_path.exists():
                errors.append(
                    f"{deck_path.relative_to(ROOT)}: missing same-basename governed record '{record_path.name}'"
                )

    for markdown_path in files:
        relative = markdown_path.relative_to(ROOT)
        if markdown_path.suffix != ".md" or relative.parts[0] == "work":
            continue
        if historical_path(markdown_path):
            continue
        text = markdown_path.read_text(encoding="utf-8")
        text = re.sub(r"```.*?```", "", text, flags=re.S)
        text = re.sub(r"`[^`\n]*`", "", text)
        targets = MARKDOWN_LINK_PATTERN.findall(text) + MARKDOWN_REFERENCE_PATTERN.findall(text)
        for raw_target in targets:
            target = raw_target.strip().strip("<>")
            parsed = urlsplit(target)
            if parsed.scheme or target.startswith("#"):
                continue
            target_path = unquote(parsed.path)
            if not target_path:
                continue
            resolved = (markdown_path.parent / target_path).resolve()
            if not resolved.is_relative_to(ROOT):
                errors.append(f"{markdown_path.relative_to(ROOT)}: local link escapes repository '{target}'")
            elif not resolved.exists():
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
