"""Offline safety checks; no credentials or Pipedrive writes."""
import unittest
from unittest.mock import patch
import urllib.error
import migrate


def source(child, parent):
    return {'child_id': str(child), 'parent_id': str(parent), 'parent_raw': str(parent)}


class FakeAPI:
    def __init__(self, rows, relations=()):
        self.orgs = {i: {'id': i, 'custom_fields': {migrate.FIELD: p}} for i,p in rows}
        self.relations = relations

    def organizations(self):
        return self.orgs

    def relationships(self, org):
        return [r for r in self.relations if org in (
            migrate.org_id(r['rel_owner_org_id']), migrate.org_id(r['rel_linked_org_id']))]


def relation(parent, child, kind='parent', rid=1):
    return {'id': rid, 'type': kind, 'rel_owner_org_id': parent, 'rel_linked_org_id': child}


class MigrationSafety(unittest.TestCase):
    def statuses(self, api, rows):
        return [r['status'] for r in migrate.analyze(api, rows)[0]]

    def test_parent_direction_and_existing_skip(self):
        api = FakeAPI([(1,2),(2,None)], [relation({'value':2},{'value':1})])
        self.assertEqual(self.statuses(api,[source(1,2)]), ['existing'])

    def test_conflicting_parent_is_never_replaced(self):
        api = FakeAPI([(1,2),(2,None),(3,None)], [relation(3,1)])
        self.assertEqual(self.statuses(api,[source(1,2)]), ['conflicting_parent'])

    def test_self_missing_and_stale_source(self):
        api = FakeAPI([(1,1),(2,4),(3,None)])
        self.assertEqual(self.statuses(api,[source(1,1),source(2,9),source(2,3)]),
                         ['self_reference','organization_unavailable','source_changed'])

    def test_combined_source_and_native_cycle(self):
        api = FakeAPI([(1,2),(2,None),(3,None)], [relation(1,3),relation(3,2,rid=2)])
        self.assertEqual(self.statuses(api,[source(1,2)]), ['cycle'])

    def test_source_cycle(self):
        api = FakeAPI([(1,2),(2,1)])
        self.assertEqual(self.statuses(api,[source(1,2),source(2,1)]), ['cycle','cycle'])

    def test_parent_self_reference_does_not_invalidate_child(self):
        api = FakeAPI([(1,2),(2,2)])
        self.assertEqual(self.statuses(api,[source(1,2),source(2,2)]), ['ready','self_reference'])

    def test_duplicate_native_and_lateral_conflict(self):
        api = FakeAPI([(1,2),(2,None)], [relation(2,1),relation(2,1,rid=2)])
        self.assertEqual(self.statuses(api,[source(1,2)]), ['duplicate_native_relationships'])
        api.relations = [relation(2,1,'related')]
        self.assertEqual(self.statuses(api,[source(1,2)]), ['conflicting_related_relationship'])

    def test_ambiguous_post_is_never_automatically_retried(self):
        with patch.object(migrate, 'load_token', return_value='offline-test'), \
             patch.object(migrate.time, 'sleep'), \
             patch.object(migrate.urllib.request, 'urlopen',
                          side_effect=urllib.error.URLError('timeout')) as request:
            with self.assertRaisesRegex(RuntimeError, 'outcome may be unknown'):
                migrate.API().request('v1/organizationRelationships', body={
                    'type':'parent','rel_owner_org_id':2,'rel_linked_org_id':1})
            self.assertEqual(request.call_count, 1)


if __name__ == '__main__':
    unittest.main()
