"""Small, dependency-free reader for the repository's constrained frontmatter."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import os
import re
import subprocess


ROOT = Path(__file__).resolve().parents[1]
RECORD_ROOTS = (
    ROOT / "shared",
    ROOT / "sources",
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


def repository_files(root: Path = ROOT) -> list[Path]:
    """Respect Git exclusions; also support dependency-free exported snapshots."""
    result = subprocess.run(
        ["git", "-C", str(root), "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        capture_output=True, check=False,
    )
    if result.returncode == 0:
        return sorted({root / os.fsdecode(name) for name in result.stdout.split(b"\0")
                       if name and (root / os.fsdecode(name)).is_file()
                       and not (root / os.fsdecode(name)).is_symlink()})
    paths = []
    for directory, children, names in os.walk(root, followlinks=False):
        children[:] = [name for name in children
                       if name not in {".git", "node_modules", ".venv", "__pycache__"}
                       and not name.startswith((".build-", ".lo-profile-"))]
        paths.extend(Path(directory) / name for name in names
                     if not (Path(directory) / name).is_symlink())
    return sorted(paths)


def source_record_path(path: Path) -> bool:
    """Explicit descriptors are active; preserved copies never join the catalogue."""
    parts = path.relative_to(ROOT).parts
    return (parts[0] == "sources" and path.name.endswith(".source.md")
            and not {"snapshots", "originals", "archive", "archived-snapshots"}.intersection(parts[1:-1]))


def historical_path(path: Path) -> bool:
    # Source indices and descriptors stay live; original inputs keep historical links.
    return ("sources" in path.relative_to(ROOT).parts and path.name != "README.md"
            and not source_record_path(path))


def record_paths() -> list[Path]:
    paths: list[Path] = []
    for path in repository_files():
        if path.suffix != ".md" or historical_path(path):
            continue
        if not any(path.is_relative_to(root) for root in RECORD_ROOTS):
            continue
        if path.name in {"README.md", "DOMAIN.md", "AGENTS.md"}:
            # Supporting navigation needs no envelope. Preserve IDs on imported indices.
            text = path.read_text(encoding="utf-8")
            if not text.startswith("---\n") or not re.search(r"^id:", text.split("\n---\n", 1)[0], re.M):
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
    records = []
    for path in record_paths():
        try:
            records.append(read_record(path))
        except ValueError as exc:
            raise ValueError(f"{path.relative_to(ROOT)}: {exc}") from exc
    return records
