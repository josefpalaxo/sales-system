#!/usr/bin/env python3
"""Behavior checks for master/representation authority, without file mutations."""

from dataclasses import replace
import unittest

from repo_records import ROOT, Record, load_records
from validate import validate_master_dependencies


def fixture(identifier, role, **metadata):
    return Record(
        path=ROOT / "shared" / f"{identifier.replace(':', '-')}.md",
        metadata={
            "id": identifier,
            "kind": "master-document" if role == "master" else "commercial-rule",
            "record_role": role,
            "status": "approved",
            "revision": "1",
            **metadata,
        },
        topic="", tags=(), relations=(), source_refs=(),
    )


class MasterDependencies(unittest.TestCase):
    def setUp(self):
        self.master = fixture("master:example", "master")
        self.derived = replace(
            fixture("rule:example", "derived", master_id="master:example", master_revision="1"),
            relations=(("derives_from", "master:example"),),
        )

    def test_reconciled_representation_passes(self):
        self.assertEqual(validate_master_dependencies([self.master, self.derived]), [])

    def test_master_change_requires_reconciliation(self):
        changed = replace(self.master, metadata={**self.master.metadata, "revision": "2"})
        self.assertTrue(any("revision mismatch" in e for e in validate_master_dependencies([changed, self.derived])))

    def test_unrelated_record_does_not_count_as_master(self):
        other = replace(self.master, metadata={**self.master.metadata, "record_role": "derived"})
        self.assertTrue(any("governing master must" in e for e in validate_master_dependencies([other, self.derived])))

    def test_approved_derivation_cannot_override_draft_master(self):
        draft = replace(self.master, metadata={**self.master.metadata, "status": "draft"})
        self.assertTrue(any("approved governing master" in e for e in validate_master_dependencies([draft, self.derived])))

    def test_master_id_requires_graph_relation(self):
        no_relation = replace(self.derived, relations=())
        self.assertTrue(any("derives_from" in e for e in validate_master_dependencies([self.master, no_relation])))

    def test_missing_master_and_revision_are_rejected(self):
        self.assertTrue(any("unresolved master_id" in e for e in validate_master_dependencies([self.derived])))
        missing = replace(self.derived, metadata={k: v for k, v in self.derived.metadata.items() if k != "master_revision"})
        self.assertTrue(any("positive master_revision" in e for e in validate_master_dependencies([self.master, missing])))

    def test_actual_repository_master_dependencies(self):
        self.assertEqual(validate_master_dependencies(load_records()), [])


if __name__ == "__main__":
    unittest.main(verbosity=2)
