"""Verify user-approved scope and dates against frozen evidence; preserve exceptions."""
import hashlib
import json
from collections import Counter, defaultdict
from decimal import Decimal as D
from pathlib import Path
from warehouse import ROOT, execute

RUN = ROOT / 'evidence/m_capital_20260925_g176'

def save(name, value):
    (RUN / name).write_text(json.dumps(value, indent=2, default=str))

def source(name):
    return json.loads((RUN / 'source' / (name + '.json')).read_text())['data']

def query(sql):
    r = json.loads(execute(sql))
    assert r['rows'] == len(r['data']) < 100001, 'Truncated extract'
    return r

def main():
    policy = json.loads((RUN / 'approved-decisions.json').read_text())
    excluded = set(policy['excluded_intercompany_commercial_partner_ids'])
    review = set(policy['remaining_ownership_review_commercial_partner_ids'])
    partners = {r['id']: r for r in source('res_partner')}
    headers = {r['id']: r for r in source('account_move')}
    def commercial(pid):
        return partners.get(pid, {}).get('commercial_partner_id') or pid
    def scope(bill, customer):
        bill = int(bill) if bill is not None else None
        customer = int(customer) if customer is not None else None
        if bill in excluded or customer in excluded: return 'intercompany'
        if bill in review or customer in review: return 'ownership_review'
        return 'external_candidate'

    assert scope(231, '10') == 'intercompany'
    assert scope(663, 231) == 'intercompany'
    assert scope(231, 1827) == 'external_candidate'
    assert scope(1, 1827) == 'ownership_review'

    result = query((ROOT / 'sql/40_validation/06_approved_invoice_analysis.sql').read_text())
    save('approved-invoice-analysis.json', result)
    facts = result['data']
    assert len(facts) == len({f['invoice_line_id'] for f in facts}) == 4206
    yearly = defaultdict(lambda: {'lines': 0, 'net_usd': D(0), 'absolute_usd': D(0), 'unresolved_lines': 0, 'unresolved_absolute_usd': D(0)})
    ledger_exceptions = []
    scope_counts = Counter()
    excluded_headers = set()
    external_231 = set()
    for f in facts:
        h = headers[f['invoice_id']]
        bill = commercial(h['partner_id'])
        assert f['approved_transaction_scope'] == scope(bill, f['resolved_end_customer_id'])
        in_window = h['state'] == 'posted' and h['invoice_date'] is not None and policy['billing_start'] <= h['invoice_date'] <= policy['billing_cutoff']
        assert (f['reporting_status'] == 'in_window') == bool(in_window)
        if not in_window: continue
        scope_counts[f['approved_transaction_scope']] += 1
        if abs(D(f['revenue_txn']) - D(f['ledger_revenue_txn'])) > D('.02'):
            ledger_exceptions.append({'invoice_line_id': f['invoice_line_id'], 'subtotal_revenue': f['revenue_txn'], 'ledger_revenue': f['ledger_revenue_txn']})
        if f['approved_transaction_scope'] == 'intercompany':
            excluded_headers.add(f['invoice_id'])
        if f['approved_transaction_scope'] != 'external_candidate': continue
        assert bill not in excluded and f['resolved_end_customer_id'] not in excluded
        assert f['invoice_rate_to_usd'] is not None and f['revenue_usd'] is not None
        assert abs(D(f['revenue_usd']) - D(f['revenue_txn']) * D(f['invoice_rate_to_usd'])) < D('.0000001')
        if bill == 231: external_231.add(f['invoice_id'])
        g = yearly[f['invoice_date'][:4]]
        g['lines'] += 1
        amount = D(f['revenue_usd'])
        g['net_usd'] += amount
        g['absolute_usd'] += abs(amount)
        if f['final_attribution_status'] != 'resolved':
            g['unresolved_lines'] += 1
            g['unresolved_absolute_usd'] += abs(amount)

    orders = query('SELECT * FROM sandbox.m_capital__order_scope ORDER BY order_id LIMIT 100001 FORMAT JSON')
    save('approved-order-scope.json', orders)
    raw_orders = {r['id']: r for r in source('sale_order')}
    assert len(orders['data']) == len({r['order_id'] for r in orders['data']}) == len(raw_orders)
    for o in orders['data']:
        raw = raw_orders[o['order_id']]
        assert o['approved_transaction_scope'] == scope(commercial(raw['partner_invoice_id']), commercial(raw['partner_id']))
    portfolio = [o for o in orders['data'] if o['portfolio_eligibility'] == 'effective_candidate' and o['approved_transaction_scope'] == 'external_candidate']

    objects = query("SELECT name,engine,create_table_query FROM system.tables WHERE database='sandbox' AND startsWith(name,'m_capital__') ORDER BY name LIMIT 100001 FORMAT JSON")
    save('warehouse-object-evidence.json', objects)
    manifests = json.loads((RUN / 'warehouse-manifest.json').read_text())
    deployment = json.loads((RUN / 'model-deployment.json').read_text())
    expected = {o['name'].split('.')[-1] for o in deployment['objects']}
    expected.update('m_capital__g176_20260925_' + p.stem for p in (RUN / 'source').glob('*.json'))
    assert expected == {o['name'] for o in objects['data']}
    assert manifests['complete']
    report = {
        'analysis_run_id': policy['analysis_run_id'],
        'status': 'Approved scope/date checks passed; remaining analytical gates are not waived',
        'billing_cutoff': policy['billing_cutoff'], 'portfolio_date': policy['contractual_portfolio_date'],
        'intercompany_commercial_partner_ids': sorted(excluded),
        'invoice_line_grain_pass': True, 'source_scope_and_dates_pass': True,
        'invoice_usd_arithmetic_pass': True, 'order_scope_pass': True,
        'in_window_line_scope_counts': dict(scope_counts),
        'excluded_in_window_invoice_ids': sorted(excluded_headers),
        'retained_external_reseller_231_invoice_count': len(external_231),
        'posted_in_window_ledger_difference_over_002': ledger_exceptions,
        'effective_external_contracts': len(portfolio),
        'effective_external_customers': len({o['end_customer_id'] for o in portfolio}),
        'external_billing_by_year': dict(sorted(yearly.items())),
        'warehouse_objects_verified': len(objects['data']),
        'decision_overlay_sha256': hashlib.sha256((RUN / 'approved-decisions.json').read_bytes()).hexdigest(),
        'validator_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    }
    save('approved-scope-validation.json', report)
    print(json.dumps(report, indent=2, default=str))

if __name__ == '__main__': main()
