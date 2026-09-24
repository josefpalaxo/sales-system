"""Read frozen evidence; write a supplemental diagnostic, never change the release."""
import hashlib
import json
from collections import Counter, defaultdict
from decimal import Decimal, getcontext
from pathlib import Path

getcontext().prec = 50
ROOT = Path(__file__).resolve().parents[1]
RUN = ROOT / 'evidence/m_capital_20260925_g176'
HASHES = {}


def read(name):
    path = RUN / name
    HASHES[str(path.relative_to(ROOT))] = hashlib.sha256(path.read_bytes()).hexdigest()
    obj = json.loads(path.read_text())
    return obj.get('data', obj) if isinstance(obj, dict) else obj


def totals(rows):
    return {'lines': len(rows), 'invoices': len({r['invoice_id'] for r in rows}),
            'net_usd': str(sum((Decimal(r['revenue_usd']) for r in rows), Decimal(0))),
            'absolute_line_usd': str(sum((abs(Decimal(r['revenue_usd'])) for r in rows), Decimal(0)))}


facts = read('approved-invoice-analysis.json')
invoices = {x['id']: x for x in read('source/account_move.json')}
raw_lines = {x['id']: x for x in read('source/account_move_line.json')}
orders = {x['id']: x for x in read('source/sale_order.json')}
contexts = {x['id']: x for x in read('order_context.json')}
sold_lines = read('source/sale_order_line.json')
sold_by_id = {r['id']: r for r in sold_lines}
bridge = defaultdict(list)
for row in read('source/sale_order_line_invoice_rel.json'):
    bridge[row['invoice_line_id']].append(row['order_line_id'])
names = defaultdict(list)
products = defaultdict(set)
for row in orders.values():
    names[(row['company_id'], row['name'])].append(row['id'])
for row in sold_lines:
    if row['display_type'] is None and row['product_id'] is not None:
        products[row['order_id']].add(row['product_id'])
invoice_facts = defaultdict(list)
for row in facts:
    invoice_facts[row['invoice_id']].append(row)
prepared = read('investor-model/invoice_lines.json')
prepared_by_id = {r['invoice_line_id']: r for r in prepared}
external = [r for r in prepared if r['in_reporting_total']]
unresolved = [r for r in external if r['attribution'] != 'resolved']
detail = []
for row in unresolved:
    f = next(x for x in invoice_facts[row['invoice_id']] if x['invoice_line_id'] == row['invoice_line_id'])
    h = invoices[row['invoice_id']]
    raw = raw_lines[row['invoice_line_id']]
    candidates = names.get((h['company_id'], h['invoice_origin']), [])
    failed = []
    if f['attribution_status'] != 'unlinked':
        failed.append('source_' + f['attribution_status'])
    if not h['invoice_origin']:
        failed.append('missing_invoice_origin')
    elif not candidates:
        failed.append('no_exact_same_issuer_order_name')
    elif len(candidates) != 1:
        failed.append('nonunique_order_name')
    else:
        c = contexts[candidates[0]]
        known = {x['end_customer_id'] for x in invoice_facts[row['invoice_id']] if x['attribution_status'] == 'resolved'}
        if c['customer_identity_status'] != 'resolved':
            failed.append('candidate_customer_unresolved')
        if f['billed_commercial_partner_id'] != c['billed_commercial_partner_id']:
            failed.append('billed_commercial_partner_mismatch')
        if f['product_id'] not in products[candidates[0]]:
            failed.append('product_absent_from_candidate_order')
        if any(x['attribution_status'] not in ('resolved', 'unlinked') for x in invoice_facts[row['invoice_id']]):
            failed.append('invoice_contains_conflicting_source_links')
        if len(known) > 1 or (known and c['end_customer_id'] not in known):
            failed.append('invoice_known_customer_conflict')
    assert failed, f'Unexplained unresolved line {row["invoice_line_id"]}'
    detail.append({**row, 'source_attribution_status': f['attribution_status'],
                   'bridge_order_line_ids': bridge[row['invoice_line_id']],
                   'source_subscription_id': raw['subscription_id'],
                   'linked_order_customers': [
                       {'order_id': oid, 'end_customer_id': contexts.get(oid, {}).get('end_customer_id')}
                       for oid in sorted({sold_by_id[i]['order_id'] for i in bridge[row['invoice_line_id']] if i in sold_by_id}
                                         | ({raw['subscription_id']} if raw['subscription_id'] is not None else set()))],
                   'invoice_origin': h['invoice_origin'], 'candidate_order_ids': candidates,
                   'failed_controls': failed, 'primary_reason': failed[0]})
by_reason = defaultdict(list)
for row in detail:
    by_reason[row['primary_reason']].append(row)
by_year = {}
for year in sorted({r['invoice_date'][:4] for r in external}):
    all_rows = [r for r in external if r['invoice_date'].startswith(year)]
    bad = [r for r in unresolved if r['invoice_date'].startswith(year)]
    by_year[year] = {'external': totals(all_rows), 'unresolved': totals(bad)}
date_groups = defaultdict(list)
for row in external:
    if row['recurrence'] == 'recurring' and not row['service_dates_valid']:
        start, end = row['service_start'], row['service_end']
        reason = ('both_missing' if not start and not end else 'start_missing' if not start
                  else 'end_missing' if not end else 'end_before_start')
        date_groups[reason].append(row)
months = read('investor-model/customer_months.json')
allocations = read('investor-model/service_allocations.json')
negative = []
for month in months:
    if Decimal(month['invoice_backed_mrr_usd']) >= 0:
        continue
    contributions = [a for a in allocations if a['customer_id'] == month['customer_id'] and a['service_month'] == month['service_month']]
    negative.append({**month, 'contributions': [
        {'invoice_line_id': a['invoice_line_id'], 'invoice_id': prepared_by_id[a['invoice_line_id']]['invoice_id'],
         'move_type': prepared_by_id[a['invoice_line_id']]['move_type'], 'revenue_usd': a['revenue_usd']}
        for a in contributions]})
pipeline = read('investor-model/pipeline.json')
contracts = read('investor-model/contracts.json')
prices = read('investor-model/price_reviews.json')
contract_by_id = {r['order_id']: r for r in contracts}
for row in prices:
    row['currency'] = contract_by_id[row['order_id']]['currency']
    row['candidate_net_arr_usd'] = contract_by_id[row['order_id']]['net_arr_usd']
result = {
    'status': 'Supplemental internal-review diagnostic; not a new financial release',
    'run_id': 'm_capital_20260925_g176',
    'method': 'Mutually exclusive primary attribution reason is the first failed control; all failed controls retained. USD amounts copied from issued model, excluding tax. No guessed identities.',
    'attribution': {'external': totals(external), 'unresolved': totals(unresolved),
                    'source_statuses': dict(Counter(r['source_attribution_status'] for r in detail)),
                    'no_bridge_and_no_subscription': sum(not r['bridge_order_line_ids'] and r['source_subscription_id'] is None for r in detail),
                    'primary_reasons': {k: totals(v) for k, v in sorted(by_reason.items())},
                    'failed_controls_nonadditive': dict(Counter(x for r in detail for x in r['failed_controls'])),
                    'by_year': by_year, 'lines': detail},
    'missing_service_dates': {k: {**totals(v), 'invoice_line_ids': [r['invoice_line_id'] for r in v]} for k, v in date_groups.items()},
    'missing_service_date_custom_fields': {
        'custom_start_present_but_custom_end_missing': sum(
            raw_lines[r['invoice_line_id']]['x_studio_subs_start_date'] is not None
            and raw_lines[r['invoice_line_id']]['x_studio_subs_end_date'] is None
            for v in date_groups.values() for r in v),
        'both_custom_dates_missing': sum(
            raw_lines[r['invoice_line_id']]['x_studio_subs_start_date'] is None
            and raw_lines[r['invoice_line_id']]['x_studio_subs_end_date'] is None
            for v in date_groups.values() for r in v)},
    'negative_customer_months': negative,
    'negative_month_example_C2783': [r for r in prepared if r['customer_id'] == 'C2783'],
    'price_reviews': prices,
    'pipeline': {'quotes': len(pipeline), 'missing': {k: sum(r[k] is None for r in pipeline) for k in ['probability_source', 'service_start', 'service_end', 'expected_invoice_date', 'opportunity_id']},
                 'start_year_counts': dict(Counter((r['service_start'] or 'missing')[:4] if r['service_start'] else 'missing' for r in pipeline))},
    'lifecycle_exceptions': {k: [r['id'] for r in contexts.values() if r['portfolio_eligibility'] == k] for k in ['future_start', 'expired_in_progress']},
    'historical_semantic_gaps': {
        'confirmed_subscription_null_state': [r['id'] for r in contexts.values() if r['state'] == 'sale' and r['is_subscription'] and r['subscription_state'] is None],
        'same_org_indirect_orders': [r['id'] for r in contexts.values() if r['same_organization_channel_exception']],
    },
    'input_sha256': HASHES,
}
assert len(external) == 3625 and len(unresolved) == 648
assert sum(len(v) for v in date_groups.values()) == 983
assert len(negative) == 17
target = ROOT / 'evidence/issue-root-cause-analysis.json'
target.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({'output': str(target), 'attribution': result['attribution']['unresolved'],
                  'primary_reasons': result['attribution']['primary_reasons'],
                  'pipeline': result['pipeline']}, indent=2))
print('Service-date causes:', {k: totals(v) for k, v in date_groups.items()})
print('Negative-month contribution types:', dict(Counter(c['move_type'] for r in negative for c in r['contributions'] if Decimal(c['revenue_usd']) < 0)))
