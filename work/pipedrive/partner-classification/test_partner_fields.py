import unittest
import migrate_partner_fields as m


def org(values):
    return {'id': 1, 'name': 'Offline fixture', 'custom_fields': {m.LEGACY: values}}


class Classification(unittest.TestCase):
    def test_single_commercial_model(self):
        self.assertEqual(m.classify(org([345]))['primary_label'], 'Reseller')

    def test_capability_mapping_and_source_preservation(self):
        source = org([345,347,348,349,353])
        row = m.classify(source)
        self.assertEqual(row['role_labels'], ['Integration','On-Premise Solution','Co-Branded','Technology'])
        self.assertEqual(source['custom_fields'][m.LEGACY], [345,347,348,349,353])

    def test_ambiguous_primary_is_never_guessed(self):
        for values in ([344,345,347],[345,346]):
            row = m.classify(org(values))
            self.assertIsNone(row['primary_label'])
            self.assertEqual(row['review'], 'multiple_commercial_models')

    def test_capability_only_has_no_commercial_type(self):
        row = m.classify(org([347,353]))
        self.assertIsNone(row['primary_label'])
        self.assertEqual(row['review'], 'capability_only')

    def test_service_provider_is_not_inferred_from_cobranding(self):
        self.assertEqual(m.classify(org([349]))['role_labels'], ['Co-Branded'])

    def test_unknown_options_stop_migration(self):
        with self.assertRaises(RuntimeError):
            m.classify(org([999]))


if __name__ == '__main__':
    unittest.main()
