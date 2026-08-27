"""Small, dependency-free reader for the repository's constrained frontmatter."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
RECORD_ROOTS = (
    ROOT / "shared",
    ROOT / "domains",
    ROOT / "governance" / "source-register",
    ROOT / "governance" / "conflicts",
    ROOT / "governance" / "decisions",
)
REQUIRED_KEYS = {
    "schema_version",
    "id",
    "kind",
    "domain",
    "title",
    "status",
    "classification",
    "owner",
    "last_reviewed",
    "review_by",
    "sources",
    "relations",
}
ID_PATTERN = re.compile(r"^[a-z][a-z0-9-]*:[a-z0-9][a-z0-9-]*$")
KEY_VALUE_PATTERN = re.compile(r"^([a-z][a-z0-9_]*)\s*:\s*(.*)$")
TARGET_PATTERN = re.compile(r"^\s+-?\s*target\s*:\s*['\"]?([^'\"\s#]+)")
REF_PATTERN = re.compile(r"^\s+-?\s*ref\s*:\s*['\"]?([^'\"\s#]+)")
RELATION_TYPE_PATTERN = re.compile(r"^\s+-\s*type\s*:\s*['\"]?([^'\"\s#]+)")


@dataclass(frozen=True)
class Record:
    path: Path
    metadata: dict[str, str]
    targets: tuple[str, ...]
    source_refs: tuple[str, ...]
    relation_types: tuple[str, ...]

    @property
    def id(self) -> str:
        return self.metadata.get("id", "")


def record_paths() -> list[Path]:
    paths: list[Path] = []
    for root in RECORD_ROOTS:
        if not root.exists():
            continue
        for path in root.rglob("*.md"):
            if path.name in {"README.md", "DOMAIN.md"}:
                continue
            paths.append(path)
    return sorted(paths)


def strip_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
        return value[1:-1]
    return value


def read_record(path: Path) -> Record:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError("missing opening YAML frontmatter delimiter")

    try:
        closing = next(index for index, line in enumerate(lines[1:], start=1) if line.strip() == "---")
    except StopIteration as exc:
        raise ValueError("missing closing YAML frontmatter delimiter") from exc

    frontmatter = lines[1:closing]
    metadata: dict[str, str] = {}
    targets: list[str] = []
    source_refs: list[str] = []
    relation_types: list[str] = []
    for line in frontmatter:
        if line and not line[0].isspace():
            match = KEY_VALUE_PATTERN.match(line)
            if match:
                metadata[match.group(1)] = strip_scalar(match.group(2))
        target = TARGET_PATTERN.match(line)
        if target:
            targets.append(target.group(1))
        source_ref = REF_PATTERN.match(line)
        if source_ref:
            source_refs.append(source_ref.group(1))
        relation_type = RELATION_TYPE_PATTERN.match(line)
        if relation_type:
            relation_types.append(relation_type.group(1))

    return Record(
        path=path,
        metadata=metadata,
        targets=tuple(targets),
        source_refs=tuple(source_refs),
        relation_types=tuple(relation_types),
    )


def load_records() -> list[Record]:
    return [read_record(path) for path in record_paths()]
