"""Behavior checks for reusable records and local-only dependencies."""
from dataclasses import replace
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

from repo_records import ROOT, load_records, repository_files
from validate import validate


class RepositoryStructure(unittest.TestCase):
    def test_git_exclusions_protect_local_dependencies_and_private_files(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            subprocess.run(["git", "init", "-q", str(root)], check=True)
            (root / ".gitignore").write_text("node_modules/\nlocal/\n")
            for name in ("shared/example.md", "node_modules/broken.md", "relationships/local/private.md"):
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("[broken](absent.md)")
            names = {path.relative_to(root).as_posix() for path in repository_files(root)}
            self.assertIn("shared/example.md", names)
            self.assertNotIn("node_modules/broken.md", names)
            self.assertNotIn("relationships/local/private.md", names)

    def test_exported_snapshot_skips_dependencies_and_symlinks(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "shared").mkdir()
            (root / "shared/example.md").write_text("example")
            (root / "node_modules").mkdir()
            (root / "node_modules/broken.md").write_text("broken")
            (root / "shared/dependency.md").symlink_to(root / "node_modules/broken.md")
            names = {path.relative_to(root).as_posix() for path in repository_files(root)}
            self.assertEqual(names, {"shared/example.md"})

    def test_promoted_narrative_stays_draft_and_sources_are_not_records(self):
        records = [r for r in load_records() if r.path.is_relative_to(ROOT / "shared/messaging/circularo-narrative")]
        self.assertGreaterEqual(len(records), 4)
        self.assertTrue(all(r.metadata["status"] == "draft" for r in records))
        self.assertTrue(all("sources" not in r.path.relative_to(ROOT).parts for r in records))

    def test_source_snapshot_cannot_duplicate_an_active_record(self):
        from repo_records import record_paths
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            descriptor = root / "sources/example.source.md"
            snapshot = root / "sources/snapshots/example.source.md"
            raw = root / "sources/example-original.md"
            for path in (descriptor, snapshot, raw):
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("---\nid: source:example\nkind: source\n---\nSame source ID\n")
            with patch.multiple("repo_records", ROOT=root, RECORD_ROOTS=(root / "sources",),
                                repository_files=lambda: [descriptor, snapshot, raw]):
                self.assertEqual(record_paths(), [descriptor])

    def test_malformed_source_descriptor_is_reported(self):
        from repo_records import load_records as read_records
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            descriptor = root / "sources/broken.source.md"
            descriptor.parent.mkdir()
            descriptor.write_text("Missing record metadata\n")
            with patch.multiple("repo_records", ROOT=root, RECORD_ROOTS=(root / "sources",),
                                repository_files=lambda: [descriptor]):
                with self.assertRaisesRegex(ValueError, "broken.source.md.*frontmatter"):
                    read_records()

    def test_relationships_are_outside_reusable_catalogue(self):
        self.assertTrue(all("relationships" not in r.path.relative_to(ROOT).parts for r in load_records()))

    def test_template_links_survive_copying_into_relationships(self):
        import re
        from urllib.parse import unquote, urlsplit
        template = ROOT / "shared/templates/investor-relationship"
        checked = 0
        for path in template.rglob("*.md"):
            destination = ROOT / "relationships/investors/example" / path.relative_to(template)
            for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", path.read_text()):
                parsed = urlsplit(target.strip("<>"))
                if parsed.scheme or not parsed.path:
                    continue
                original = (path.parent / unquote(parsed.path)).resolve()
                if original.is_relative_to(template):
                    continue
                self.assertEqual((destination.parent / unquote(parsed.path)).resolve(), original)
                self.assertTrue(original.exists())
                checked += 1
        self.assertGreater(checked, 0)

    def test_unknown_accountability_cannot_pass_as_approved(self):
        draft = next(r for r in load_records() if r.metadata.get("owner") == "unassigned")
        with patch("validate.load_records", return_value=[draft]):
            self.assertFalse(any("owner" in e or "must use YYYY" in e for e in validate()))
        approved = replace(draft, metadata={**draft.metadata, "status": "approved", "revision": "1"})
        with patch("validate.load_records", return_value=[approved]):
            errors = validate()
        self.assertTrue(any("owner" in e for e in errors))
        self.assertTrue(any("must use YYYY" in e for e in errors))

    def test_partner_deck_routes_to_shared_assets(self):
        deck = next(r for r in load_records() if r.metadata.get("kind") == "slide-deck")
        partner = replace(deck, metadata={**deck.metadata, "domain": "partnerships"})
        with patch("validate.load_records", return_value=[partner]):
            self.assertFalse(any("topic must mirror" in e for e in validate()))
        wrong_path = replace(partner, path=ROOT / "domains/partnerships/assets/slides" / deck.topic / deck.path.name)
        with patch("validate.load_records", return_value=[wrong_path]):
            self.assertTrue(any("topic must mirror" in e for e in validate()))


if __name__ == "__main__":
    unittest.main(verbosity=2)
