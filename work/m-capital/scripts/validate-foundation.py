"""Independent Decimal and identity checks against the frozen raw evidence."""
import hashlib
import json
from collections import Counter, defaultdict
from decimal import Decimal as D
from warehouse import ROOT, execute

RUN=ROOT/'evidence/m_capital_20260925_g176'
def read(t): return json.loads((RUN/'source'/f'{t}.json').read_text())['data']
def dec(v): return None if v is None else D(str(v))
def save(path,obj): path.write_text(json.dumps(obj,indent=2,default=str))

def main():
    results={}
    for key,file in [('invoice_facts','01_invoice_facts.sql'),('header_controls','02_header_controls.sql'),('order_context','03_order_context.sql')]:
        path=ROOT/'sql/40_validation'/file
        result=json.loads(execute(path.read_text()))
        assert result['rows']==len(result['data'])<100001
        save(RUN/(key+'.json'),result)
        results[key]=result['data']
    source_lines={r['id']:r for r in read('account_move_line') if r['display_type']=='product'}
    headers={r['id']:r for r in read('account_move')}
    orders={r['id']:r for r in read('sale_order')}
    sold={r['id']:r for r in read('sale_order_line')}
    partners={r['id']:r for r in read('res_partner')}
    def commercial(pid): return partners.get(pid,{}).get('commercial_partner_id') or pid
    links=defaultdict(set)
    for r in read('sale_order_line_invoice_rel'):
        links[r['invoice_line_id']].add(sold.get(r['order_line_id'],{}).get('order_id'))
    facts=results['invoice_facts']
    assert len(facts)==len({int(r['invoice_line_id']) for r in facts})==len(source_lines)
    controls=results['header_controls']
    assert len(controls)==len({int(r['invoice_id']) for r in controls})==len(headers)
    assert len(results['order_context'])==len(orders)
    independent_totals=defaultdict(lambda:D(0))
    for fact in facts:
        line=source_lines[int(fact['invoice_line_id'])]
        head=headers[line['move_id']]
        expected=dec(line['price_subtotal'])*(-1 if head['move_type']=='out_refund' else 1)
        assert dec(fact['revenue_txn'])==expected
        independent_totals[head['id']]+=expected
        candidate_orders=set(links[line['id']])
        if line['subscription_id'] is not None: candidate_orders.add(line['subscription_id'])
        customers={commercial(orders[x]['partner_id']) for x in candidate_orders if x in orders}
        if fact['attribution_status']=='resolved':
            assert len(customers)==1 and int(fact['end_customer_id']) in customers
            assert all(x in orders and orders[x]['company_id']==head['company_id'] for x in candidate_orders)
    for c in controls:
        assert dec(c['line_revenue_txn'])==independent_totals[int(c['invoice_id'])]
    posted_controls=[c for c in controls if c['state']=='posted']
    discrepancies=[c for c in posted_controls if c['difference_txn'] is None or abs(dec(c['difference_txn']))>D('.02') or abs(dec(c['difference_company']) or D(0))>D('.02')]
    inwindow=[f for f in facts if f['reporting_status']=='in_window']
    billing=defaultdict(lambda:{'lines':0,'invoices':set(),'net_txn':D(0),'absolute_txn':D(0),'unresolved_lines':0,'unresolved_absolute_txn':D(0),'recurring_lines':0,'dated_recurring_lines':0})
    for f in inwindow:
        key=(f['company_id'],f['currency_id'],f['transaction_scope'])
        b=billing[key]; amount=dec(f['revenue_txn'])
        b['lines']+=1; b['invoices'].add(f['invoice_id']);b['net_txn']+=amount;b['absolute_txn']+=abs(amount)
        if f['attribution_status']!='resolved': b['unresolved_lines']+=1;b['unresolved_absolute_txn']+=abs(amount)
        if f['recurring_product']:
            b['recurring_lines']+=1
            if f['deferred_start_date'] and f['deferred_end_date'] and f['deferred_end_date']>=f['deferred_start_date']: b['dated_recurring_lines']+=1
    grouped=[{'company_id':k[0],'currency_id':k[1],'scope':k[2],**{**v,'invoices':len(v['invoices'])}} for k,v in sorted(billing.items())]
    suspected=[h for h in headers.values() if h['state']=='posted' and h['invoice_date'] and '2019-01-01'<=h['invoice_date']<='2026-08-31' and commercial(h['partner_id']) in (1,10,465,663,1672,2124)]
    ghost=[o['id'] for o in results['order_context'] if o['portfolio_eligibility']=='effective_candidate' and not (o['state']=='sale' and o['is_subscription'] and o['subscription_state']=='3_progress')]
    report={'analysis_run_id':'m_capital_20260925_g176','status':'foundation checks; not certified investor totals',
        'checks':{'invoice_line_grain':True,'header_grain':True,'order_grain':True,'credit_sign_matches_raw':True,'resolved_attribution_matches_independent_links':True,'line_sums_match_independent_decimal_sums':True},
        'counts':{'all_invoice_product_lines':len(facts),'all_invoice_headers':len(controls),'in_window_lines':len(inwindow),
        'posted_header_discrepancies_over_002':len(discrepancies)},
        'portfolio_status_counts':dict(Counter(o['portfolio_eligibility'] for o in results['order_context'])),
        'invoice_attribution_counts':dict(Counter(f['attribution_status'] for f in inwindow)),
        'invoice_reporting_status_counts':dict(Counter(f['reporting_status'] for f in facts)),
        'nullable_eligibility_false_positives':ghost,'billing_by_company_currency_scope':grouped,
        'header_discrepancies':discrepancies,'ownership_review_headers':suspected,
        'validator_sha256':hashlib.sha256(__import__('pathlib').Path(__file__).read_bytes()).hexdigest()}
    save(RUN/'foundation-validation.json',report)
    print(json.dumps({k:v for k,v in report.items() if k not in ['header_discrepancies','ownership_review_headers']},indent=2,default=str))
    print('Ownership review:',[(h['id'],commercial(h['partner_id']),h['currency_id'],h['amount_untaxed']) for h in suspected])

if __name__=='__main__': main()
