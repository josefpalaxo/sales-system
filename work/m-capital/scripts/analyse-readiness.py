"""Quantify outstanding financial/identity/coverage gates, without fabricating headline KPIs."""
import bisect
import hashlib
import json
from collections import Counter,defaultdict
from decimal import Decimal as D, getcontext
from pathlib import Path
from warehouse import ROOT,execute

getcontext().prec=50
RUN=ROOT/'evidence/m_capital_20260925_g176'
ZERO=D(0)
def dec(v): return None if v is None else D(str(v))
def source(t): return json.loads((RUN/'source'/f'{t}.json').read_text())['data']
def idx(t): return {r['id']:r for r in source(t)}
def save(name,obj): (RUN/name).write_text(json.dumps(obj,indent=2,default=str))
def main():
    reads={}
    for key,file in [('fx_context','04_fx_context.sql'),('approved-invoice-analysis','06_approved_invoice_analysis.sql')]:
        result=json.loads(execute((ROOT/'sql/40_validation'/file).read_text()))
        assert result['rows']==len(result['data'])<100001
        save(key+'.json',result);reads[key]=result['data']
    companies=idx('res_company');partners=idx('res_partner');orders=idx('sale_order');headers=idx('account_move')
    products=idx('product_product');templates=idx('product_template');plans=idx('sale_subscription_plan')
    currencies=idx('res_currency')
    order_context={int(o['id']):o for o in json.loads((RUN/'order_context.json').read_text())['data']}
    order_scope={int(o['order_id']):o['approved_transaction_scope'] for o in json.loads((RUN/'approved-order-scope.json').read_text())['data']}
    def commercial(pid): return partners.get(pid,{}).get('commercial_partner_id') or pid
    rate_rows=defaultdict(list)
    for r in source('res_currency_rate'): rate_rows[(r['company_id'],r['currency_id'])].append(r)
    for a in rate_rows.values():
        a.sort(key=lambda r:r['name']);assert len(a)==len({r['name'] for r in a})
    def rate(company,currency,date):
        if companies[company]['currency_id']==currency: return D(1)
        a=rate_rows[(company,currency)];n=bisect.bisect_right([r['name'] for r in a],date)
        return dec(a[n-1]['rate']) if n else None
    def fx(company,currency,date):
        if currency==2:return D(1)
        numerator,denominator=rate(company,2,date),rate(company,currency,date)
        return numerator/denominator if numerator is not None and denominator else None
    fx_rows=reads['fx_context']
    assert len(fx_rows)==len({(r['company_id'],r['currency_id'],r['fx_date']) for r in fx_rows})
    for r in fx_rows:
        expected=fx(int(r['company_id']),int(r['currency_id']),r['fx_date'])
        actual=dec(r['rate_to_usd'])
        assert (expected is None)==(actual is None),(r,expected)
        if expected is not None:assert abs(expected-actual)<=D('.0000000011'),(r,expected)
    facts=reads['approved-invoice-analysis'];assert len(facts)==4206==len({f['invoice_line_id'] for f in facts})
    by_name=defaultdict(list);sold=defaultdict(list)
    for o in orders.values():by_name[(o['company_id'],o['name'])].append(o)
    for l in source('sale_order_line'):sold[l['order_id']].append(l)
    for f in facts:
        if f['attribution_method']=='exact_order_origin_with_controls':
            h=headers[int(f['invoice_id'])]; candidates=by_name[(h['company_id'],h['invoice_origin'])]
            assert len(candidates)==1
            o=candidates[0]
            assert int(f['resolved_end_customer_id'])==commercial(o['partner_id'])
            assert commercial(h['partner_id'])==commercial(o['partner_invoice_id'])
            assert any(l['product_id']==f['product_id'] and l['display_type'] is None for l in sold[o['id']])
    yearly=defaultdict(lambda:{'lines':0,'revenue_usd':ZERO,'absolute_usd':ZERO,'unresolved_net_usd':ZERO,'unresolved_absolute_usd':ZERO,'unresolved_lines':0,'missing_fx_lines':0,'recurring_absolute_usd':ZERO,'dated_recurring_absolute_usd':ZERO})
    exceptions=[]
    for f in facts:
        if f['reporting_status']!='in_window' or f['approved_transaction_scope']!='external_candidate':continue
        year=f['invoice_date'][:4];g=yearly[year];g['lines']+=1
        conversion=fx(int(f['company_id']),int(f['currency_id']),f['invoice_date'])
        if conversion is None:g['missing_fx_lines']+=1;continue
        amount=dec(f['revenue_txn'])*conversion;g['revenue_usd']+=amount;g['absolute_usd']+=abs(amount)
        if f['final_attribution_status']!='resolved':
            g['unresolved_lines']+=1;g['unresolved_net_usd']+=amount;g['unresolved_absolute_usd']+=abs(amount)
            exceptions.append({'invoice_line_id':f['invoice_line_id'],'invoice_id':f['invoice_id'],'year':year,'billed_partner_id':f['billed_partner_id'],
                'shipping_partner_id':headers[int(f['invoice_id'])]['partner_shipping_id'],'status':f['final_attribution_status'],'revenue_usd':amount})
        if f['recurring_product']:
            g['recurring_absolute_usd']+=abs(amount)
            if f['deferred_start_date'] and f['deferred_end_date'] and f['deferred_start_date']<=f['deferred_end_date']:g['dated_recurring_absolute_usd']+=abs(amount)
    contract_checks=[]
    for oid,o in orders.items():
        if o['subscription_state']!='3_progress':continue
        ctx=order_context[oid];lines=[l for l in sold[oid] if l['display_type'] is None]
        recurring=[l for l in lines if templates.get(products.get(l['product_id'],{}).get('product_tmpl_id'),{}).get('recurring_invoice')]
        total=sum((dec(l['price_subtotal']) for l in recurring),ZERO)
        unknown_products=[l['id'] for l in lines if l['product_id'] not in products or products[l['product_id']]['product_tmpl_id'] not in templates]
        plan=plans.get(o['plan_id'],{});unit=plan.get('billing_period_unit');n=plan.get('billing_period_value')
        factor={'month':D(12),'year':D(1),'week':D('52.14')}.get(unit)
        annualizer=factor/D(n) if factor is not None and n and n>0 else None
        current_fx=fx(o['company_id'],o['currency_id'],'2026-09-06')
        channel_fields=[l['id'] for l in recurring if (dec(l['x_studio_reseller_disc']) or ZERO)!=0 or (dec(l['x_studio_distributor_disc']) or ZERO)!=0]
        calculated=total*annualizer*current_fx if annualizer is not None and current_fx is not None else None
        start_fx=fx(o['company_id'],o['currency_id'],o['start_date']) if o['start_date'] else None
        source_expected=dec(o['recurring_total'])*annualizer*start_fx if annualizer is not None and start_fx is not None else None
        contract_checks.append({'order_id':oid,'end_customer_id':ctx['end_customer_id'],'company_id':o['company_id'],
            'scope':order_scope[oid],'eligibility':ctx['portfolio_eligibility'],'plan':ctx['recurring_plan'],'edition':ctx['raw_edition'],
            'currency':currencies[o['currency_id']]['name'],'recurring_period_line_sum':total,'recurring_total_source':o['recurring_total'],
            'recurring_difference':total-dec(o['recurring_total']),'negative_recurring_line_ids':[l['id'] for l in recurring if dec(l['price_subtotal'])<0],
            'custom_channel_line_ids':channel_fields,'unknown_product_line_ids':unknown_products,'annualizer':annualizer,'snapshot_fx':current_fx,
            'calculated_line_net_arr_usd_provisional':calculated,'source_arr_usd':o['x_studio_arr_usd'],
            'source_arr_start_fx_difference':None if source_expected is None else source_expected-dec(o['x_studio_arr_usd']),
            'price_status':'custom_channel_fields_require_reconciliation' if channel_fields else 'line_subtotal_basis; not yet certified'})
    save('contract-price-checks.json',contract_checks)
    save('customer-attribution-exceptions.json',exceptions)
    eligible=[c for c in contract_checks if c['eligibility']=='effective_candidate' and c['scope']=='external_candidate']
    summary={'status':'review gates; no certified net ARR/retention/CLV',
        'scope_basis':'approved-decisions.json; approved_transaction_scope for invoices and orders',
        'fx_contexts_validated':len(fx_rows),'fx_status_counts':dict(Counter(r['fx_status'] for r in fx_rows)),
        'origin_fallback_lines_validated':sum(f['attribution_method']=='exact_order_origin_with_controls' for f in facts),
        'external_candidate_billing_by_year':dict(sorted(yearly.items())),
        'effective_external_contract_candidates':len(eligible),'candidate_customers':len({c['end_customer_id'] for c in eligible}),
        'candidate_recurring_sum_mismatches':sum(abs(c['recurring_difference'])>D('.02') for c in eligible),
        'candidate_custom_channel_orders':sum(bool(c['custom_channel_line_ids']) for c in eligible),
        'candidate_unknown_product_orders':sum(bool(c['unknown_product_line_ids']) for c in eligible),
        'source_arr_start_fx_mismatch_orders':sum(c['source_arr_start_fx_difference'] is not None and abs(c['source_arr_start_fx_difference'])>D('.1') for c in eligible),
        'validator_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
    save('analytical-readiness.json',summary)
    print(json.dumps(summary,indent=2,default=str))

if __name__=='__main__':main()
