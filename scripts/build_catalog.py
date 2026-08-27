#!/usr/bin/env python3
"""Build or verify deterministic record and dependency catalogues."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

from repo_records import ROOT, load_records


CATALOG_PATH = ROOT / "generated" / "catalog.json"
GRAPH_PATH = ROOT / "generated" / "dependency-graph.json"


def render() -> tuple[str, str]:
    records = load_records()
    catalog_records = []
    reverse: dict[str, list[str]] = {}
    for record in records:
        metadata = record.metadata
        catalog_records.append(
            {
                "id": record.id,
                "kind": metadata.get("kind", ""),
                "domain": metadata.get("domain", ""),
                "title": metadata.get("title", ""),
                "status": metadata.get("status", ""),
                "revision": int(metadata["revision"]) if metadata.get("revision", "").isdigit() else None,
                "classification": metadata.get("classification", ""),
                "owner": metadata.get("owner", ""),
                "last_reviewed": metadata.get("last_reviewed", ""),
                "review_by": metadata.get("review_by", ""),
                "path": record.path.relative_to(ROOT).as_posix(),
                "depends_on": list(record.targets),
                "source_refs": sorted(set(record.source_refs)),
            }
        )
        for target in record.targets:
            reverse.setdefault(target, []).append(record.id)

    catalog = {"schema_version": 1, "records": sorted(catalog_records, key=lambda item: item["id"])}
    graph = {
        "schema_version": 1,
        "dependencies": {item["id"]: item["depends_on"] for item in catalog["records"]},
        "used_by": {key: sorted(value) for key, value in sorted(reverse.items())},
    }
    return (
        json.dumps(catalog, indent=2, sort_keys=True) + "\n",
        json.dumps(graph, indent=2, sort_keys=True) + "\n",
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Fail when generated files are stale")
    args = parser.parse_args()
    catalog_text, graph_text = render()
    expected = ((CATALOG_PATH, catalog_text), (GRAPH_PATH, graph_text))

    if args.check:
        stale = [path.relative_to(ROOT).as_posix() for path, text in expected if not path.exists() or path.read_text(encoding="utf-8") != text]
        if stale:
            print("Generated files are stale: " + ", ".join(stale))
            return 1
        print("Generated catalogues are current.")
        return 0

    for path, text in expected:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text, encoding="utf-8")
    print("Generated catalogues updated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
