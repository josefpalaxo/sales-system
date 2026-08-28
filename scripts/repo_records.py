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
REF_PATTERN = re.compile(r"^\s+-?\s*ref\s*:\s*['\"]?([^'\"\s#]+)")
RELATION_FIELD_PATTERN = re.compile(r"^\s{2}([a-z][a-z0-9_]*)\s*:\s*$")
LIST_ITEM_PATTERN = re.compile(r"^\s{4}-\s+(.+?)\s*$")


@dataclass(frozen=True)
class Record:
    path: Path
    metadata: dict[str, str]
    topic: str
    tags: tuple[str, ...]
    relations: tuple[tuple[str, str], ...]
    source_refs: tuple[str, ...]

    @property
    def id(self) -> str:
        return self.metadata.get("id", "")

    @property
    def targets(self) -> tuple[str, ...]:
        return tuple(target for _, target in self.relations)

    @property
    def relation_types(self) -> tuple[str, ...]:
        return tuple(relation_type for relation_type, _ in self.relations)


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


def read_top_level_list(frontmatter: list[str], key: str) -> tuple[str, ...]:
    """Read a constrained top-level YAML scalar list without a YAML dependency."""
    values: list[str] = []
    active = False
    for line in frontmatter:
        if line and not line[0].isspace():
            match = KEY_VALUE_PATTERN.match(line)
            active = bool(match and match.group(1) == key)
            if active and match:
                inline = match.group(2).strip()
                if inline.startswith("[") and inline.endswith("]"):
                    values.extend(
                        strip_scalar(item.strip())
                        for item in inline[1:-1].split(",")
                        if item.strip()
                    )
            continue
        if active:
            item = re.match(r"^\s+-\s+(.+?)\s*$", line)
            if item:
                values.append(strip_scalar(item.group(1)))
    return tuple(values)


def read_relations(frontmatter: list[str]) -> tuple[tuple[str, str], ...]:
    """Read relationship-named frontmatter fields without a YAML dependency."""
    relations: list[tuple[str, str]] = []
    active = False
    relation_type = ""
    for line in frontmatter:
        if line and not line[0].isspace():
            match = KEY_VALUE_PATTERN.match(line)
            active = bool(match and match.group(1) == "relations")
            relation_type = ""
            continue
        if not active:
            continue
        field = RELATION_FIELD_PATTERN.match(line)
        if field:
            relation_type = field.group(1)
            continue
        item = LIST_ITEM_PATTERN.match(line)
        if item and relation_type:
            relations.append((relation_type, strip_scalar(item.group(1))))
    return tuple(relations)


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
    source_refs: list[str] = []
    for line in frontmatter:
        if line and not line[0].isspace():
            match = KEY_VALUE_PATTERN.match(line)
            if match:
                metadata[match.group(1)] = strip_scalar(match.group(2))
        source_ref = REF_PATTERN.match(line)
        if source_ref:
            source_refs.append(source_ref.group(1))

    return Record(
        path=path,
        metadata=metadata,
        topic=metadata.get("topic", ""),
        tags=read_top_level_list(frontmatter, "tags"),
        relations=read_relations(frontmatter),
        source_refs=tuple(source_refs),
    )


def load_records() -> list[Record]:
    return [read_record(path) for path in record_paths()]
