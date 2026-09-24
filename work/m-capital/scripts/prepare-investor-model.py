"""Reproducible review model from hash-verified generation-176 evidence; no log lineage."""
import calendar
import hashlib
import json
from collections import Counter, defaultdict
from datetime import date, timedelta
from decimal import Decimal as D, getcontext
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUN = ROOT/'evidence/m_capital_20260925_g176'
OUT = RUN/'investor-model'
getcontext().prec = 40
ZERO = D(0)
ASOF = date(2026,9,6)
CUTOFF = date(2026,8,31)

def read(n): return json.loads((RUN/(n+'.json')).read_text())
def source(n): return json.loads((RUN/'source'/(n+'.json')).read_text())['data']
def idx(n): return {int(r['id']):r for r in source(n)}
def dec(v): return None if v is None else D(str(v))
def integer(v): return int(v) if v is not None else None
def label(v):
    if not v:return ''
    try:return json.loads(v).get('en_US',v)
    except (ValueError,AttributeError):return v
def save(n,v): (OUT/(n+'.json')).write_text(json.dumps(v,indent=2,default=str))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def months(a,b):
    m=a.replace(day=1)
    while m<=b:
        last=m.replace(day=calendar.monthrange(m.year,m.month)[1])
        days=(min(b,last)-max(a,m)).days+1
        yield m,D(days)/D(last.day)
        m=last+timedelta(days=1)

def main():
    OUT.mkdir(exist_ok=True)
    manifest=read('source-manifest')
    for s in manifest['sources']:assert sha(ROOT/s['file'])==s['sha256']
    assert read('warehouse-manifest')['complete']
    policy=read('approved-decisions')
    orders=idx('sale_order');partners=idx('res_partner');products=idx('product_product');templates=idx('product_template')
    currencies=idx('res_currency');countries=idx('res_country');headers=idx('account_move');plans=idx('sale_subscription_plan')
    ctx={integer(o['id']):o for o in read('order_context')['data']}
    scopes={integer(o['order_id']):o['approved_transaction_scope'] for o in read('approved-order-scope')['data']}
    fx={(integer(r['company_id']),integer(r['currency_id']),r['fx_date']):r for r in read('fx_context')['data']}
    sold=defaultdict(list)
    for l in source('sale_order_line'):sold[l['order_id']].append(l)
    facts=read('approved-invoice-analysis')['data']
    for f in facts:
        for k in ['company_id','currency_id','resolved_end_customer_id','billed_commercial_partner_id','product_id','origin_order_id']:
            f[k]=integer(f[k])
    def commercial(p):return partners.get(p,{}).get('commercial_partner_id') or p
    def product(l):return templates.get(products.get(l['product_id'],{}).get('product_tmpl_id'),{})
    def key(c):return 'C'+str(c) if c is not None else 'UNRESOLVED'
    # Explicit classification from frozen product names. It reverses only channel discounts,
    # never end-customer discounts; flags custom price fields separately.
    channel_products={p['id'] for p in products.values() if any(w in label(templates.get(p['product_tmpl_id'],{}).get('name')) for w in ['Reseller Discount','Distributor Discount'])}
    eligible={o['id'] for o in ctx.values() if o['portfolio_eligibility']=='effective_candidate' and scopes[o['id']]=='external_candidate'}
    # Family graph includes permitted predecessor links; same-family active overlaps are review exceptions.
    parent={i:i for i in orders}
    def root(i):
        while parent[i]!=i:i=parent[i]
        return i
    for o in orders.values():
        for p in [o['origin_order_id'],o['subscription_id']]:
            if p in orders and commercial(o['partner_id'])==commercial(orders[p]['partner_id']):parent[root(o['id'])]=root(p)
    families=Counter(root(i) for i in eligible)
    contract_rows=[];price_reviews=[];contract_lines=[]
    for oid,o in orders.items():
        if o['state']!='sale' or not o['is_subscription']:continue
        c=ctx[oid];pl=plans.get(o['plan_id'],{})
        rec=[l for l in sold[oid] if l['display_type'] is None and product(l).get('recurring_invoice')]
        total=sum((dec(l['price_subtotal']) for l in rec),ZERO)
        ch=sum((dec(l['price_subtotal']) for l in rec if l['product_id'] in channel_products),ZERO)
        annual={'month':D(12),'year':D(1),'week':D('52.14')}.get(pl.get('billing_period_unit'))
        annual=annual/D(pl['billing_period_value']) if annual is not None and pl.get('billing_period_value',0)>0 else None
        rate=dec(fx.get((o['company_id'],o['currency_id'],'2026-09-06'),{}).get('rate_to_usd'))
        custom=any((dec(l['x_studio_reseller_disc']) or ZERO)!=0 or (dec(l['x_studio_distributor_disc']) or ZERO)!=0 for l in rec)
        matched=[]
        for f in facts:
            links=[int(s) for s in (f['order_ids'] or '').split(',') if s]
            if f['origin_fallback_valid'] and not links:links=[f['origin_order_id']]
            if links==[oid] and f['state']=='posted' and f['move_type']=='out_invoice' and f['currency_id']==o['currency_id']:
                matched.append(f)
        inv_rec=defaultdict(lambda:ZERO)
        for f in matched:
            if f['recurring_product']:inv_rec[f['invoice_id']]+=dec(f['revenue_txn'])
        exact=[i for i,v in inv_rec.items() if abs(v-total)<=D('.02')]
        price_status='line-net contractual basis'
        if custom:price_status='invoice corroborated; no second channel deduction' if exact else 'price review required'
        if oid in eligible and families[root(oid)]>1:price_status+='; active family overlap review'
        if custom and oid in eligible:
            price_reviews.append({'order_id':oid,'customer_id':key(integer(c['end_customer_id'])),'recurring_net_txn':total,'channel_discount_txn':ch,'exact_recurring_invoice_ids':','.join(map(str,exact)), 'linked_recurring_invoice_amounts':json.dumps({str(k):str(v) for k,v in inv_rec.items()}),'status':price_status})
        arr=total*annual*rate if annual is not None and rate is not None else None
        endarr=(total-ch)*annual*rate if arr is not None else None
        row={'order_id':oid,'customer_id':key(integer(c['end_customer_id'])),'issuer_id':o['company_id'],'billed_partner_id':commercial(o['partner_invoice_id']),
             'reseller_id':o['x_studio_reseller'],'distributor_id':o['x_studio_circularo_distributor'],
             'family_id':root(oid),'lifecycle':o['subscription_state'] or 'unknown','eligibility':c['portfolio_eligibility'],
             'scope':scopes[oid],'plan_id':o['plan_id'],'recurring_plan':c['recurring_plan'],'raw_edition':c['raw_edition'] or 'Unknown',
             'edition':c['reporting_edition'] or 'Unknown','channel':c['source_channel'],'same_org_channel_exception':bool(c['same_organization_channel_exception']),
             'start_date':o['start_date'],'end_date':o['end_date'],'first_contract_date':o['first_contract_date'],
             'currency':currencies[o['currency_id']]['name'],'billing_unit':pl.get('billing_period_unit'),'billing_interval':pl.get('billing_period_value'),
             'recurring_net_txn':total,'channel_discount_txn':ch,'end_customer_period_txn':total-ch,'annualizer':annual,'snapshot_fx':rate,
             'net_arr_usd':arr,'end_customer_arr_usd':endarr,'source_arr_usd':dec(o['x_studio_arr_usd']),
             'price_status':price_status,'current_portfolio':oid in eligible,'source_recurring_total':dec(o['recurring_total'])}
        contract_rows.append(row)
        if oid in eligible:
            assert abs(total-dec(o['recurring_total']))<=D('.02')
            assert arr is not None
            for l in rec:
                contract_lines.append({'line_id':l['id'],'order_id':oid,'customer_id':row['customer_id'],'product_id':l['product_id'],
                    'product':label(product(l).get('name')),'qty':dec(l['product_uom_qty']),'subtotal_txn':dec(l['price_subtotal']),
                    'channel_discount_line':l['product_id'] in channel_products,'recurring_arr_usd':dec(l['price_subtotal'])*annual*rate})
    active=[c for c in contract_rows if c['current_portfolio']]
    # Full financial line ledger: no exclusions are lost, and no customer is fabricated.
    invoices=[];allocations=[];alloc_checks=[];missing_period=[]
    for f in facts:
        ext=f['approved_transaction_scope']=='external_candidate' and f['reporting_status']=='in_window'
        cid=key(f['resolved_end_customer_id']) if f['final_attribution_status']=='resolved' else 'UNRESOLVED'
        a,b=f['deferred_start_date'],f['deferred_end_date']
        valid=bool(a and b and a<=b)
        row={'invoice_line_id':f['invoice_line_id'],'invoice_id':f['invoice_id'],'invoice_date':f['invoice_date'],'issuer_id':f['company_id'],
             'customer_id':cid,'billed_partner_id':f['billed_commercial_partner_id'],'channel':f['resolved_channel'] or 'Unknown',
             'recurring_plan':f['resolved_recurring_plans'] or 'Unknown','attribution':f['final_attribution_status'],'method':f['attribution_method'],
             'scope':f['approved_transaction_scope'],'reporting_status':f['reporting_status'],'in_reporting_total':ext,
             'currency':currencies[f['currency_id']]['name'],'revenue_txn':dec(f['revenue_txn']),'invoice_fx':dec(f['invoice_rate_to_usd']),
             'revenue_usd':dec(f['revenue_usd']),'product_id':f['product_id'],'recurrence':'recurring' if f['recurring_product'] else ('non-recurring' if f['recurring_product'] is False else 'unknown'),
             'service_start':a,'service_end':b,'service_dates_valid':valid,'move_type':f['move_type'],'state':f['state'],
             'source_rate_id':integer(f['invoice_source_rate_id']),'usd_rate_id':integer(f['invoice_usd_rate_id'])}
        invoices.append(row)
        if not ext or not f['recurring_product']:continue
        if not valid:
            missing_period.append({'invoice_line_id':f['invoice_line_id'],'customer_id':cid,'revenue_usd':dec(f['revenue_usd']),'reason':'missing or invalid service dates'})
            continue
        weights=list(months(date.fromisoformat(a),date.fromisoformat(b)))
        total_weight=sum((w for m,w in weights),ZERO)
        usds=[];txns=[]
        for j,(m,w) in enumerate(weights):
            # Final residual preserves exact line totals, not a hidden plug across lines.
            usd=dec(f['revenue_usd'])*w/total_weight if j<len(weights)-1 else dec(f['revenue_usd'])-sum(usds,ZERO)
            txn=dec(f['revenue_txn'])*w/total_weight if j<len(weights)-1 else dec(f['revenue_txn'])-sum(txns,ZERO)
            usds.append(usd);txns.append(txn)
            allocations.append({'invoice_line_id':f['invoice_line_id'],'customer_id':cid,'service_month':str(m),'weight':w/total_weight,
                'revenue_txn':txn,'revenue_usd':usd,'invoice_date':f['invoice_date'],'invoice_fx':dec(f['invoice_rate_to_usd']),
                'period_bucket':'pre_reporting' if m<date(2019,1,1) else ('through_cutoff' if m<=CUTOFF else 'future_service'),
                'attribution':f['final_attribution_status']})
        assert abs(sum(usds,ZERO)-dec(f['revenue_usd']))<D('.000000001')
        alloc_checks.append({'invoice_line_id':f['invoice_line_id'],'line_usd':dec(f['revenue_usd']),'allocated_usd':sum(usds,ZERO),'difference':ZERO})
    # All qualifying observed customers, including inactive customers, not only survivors.
    customer_ids={c['customer_id'] for c in contract_rows if c['scope']=='external_candidate'}|{f['customer_id'] for f in invoices if f['in_reporting_total'] and f['customer_id']!='UNRESOLVED'}
    billing=defaultdict(lambda:ZERO);counts=Counter();monthly=defaultdict(lambda:ZERO)
    for f in invoices:
        if not f['in_reporting_total']:continue
        y=int(f['invoice_date'][:4]);billing[(f['customer_id'],y,'full')]+=f['revenue_usd'];counts[(f['customer_id'],y,'full')]+=1
        if f['invoice_date'][5:10]<='08-31':billing[(f['customer_id'],y,'ytd')]+=f['revenue_usd'];counts[(f['customer_id'],y,'ytd')]+=1
    for a in allocations:monthly[(a['customer_id'],a['service_month'])]+=a['revenue_usd']
    customers=[];growth=[]
    eu={'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'}
    for cid in sorted(customer_ids,key=lambda x:int(x[1:])):
        cp=partners.get(int(cid[1:]),{});country=countries.get(cp.get('country_id'),{});code=country.get('code')
        cc=[c for c in contract_rows if c['customer_id']==cid and c['scope']=='external_candidate'];aa=[c for c in cc if c['current_portfolio']]
        starts=[c['first_contract_date'] or c['start_date'] for c in cc if (c['first_contract_date'] or c['start_date']) and (c['first_contract_date'] or c['start_date'])<='2026-09-06']
        first=min(starts) if starts else None
        age=D((ASOF-date.fromisoformat(first)).days)/D('365.25') if first else None
        region='Unknown' if not code else ('UAE' if code=='AE' else ('KSA' if code=='SA' else ('Other GCC' if code in {'BH','KW','OM','QA'} else ('EU' if code in eu else 'Rest of World'))))
        rec={'customer_id':cid,'current_contracts':len(aa),'net_arr_usd':sum((c['net_arr_usd'] for c in aa),ZERO),
             'end_customer_arr_usd':sum((c['end_customer_arr_usd'] for c in aa),ZERO),'first_contract_date':first,'tenure_years':age,
             'cohort':int(first[:4]) if first else None,'country':label(country.get('name')) or 'Unknown','region':region,
             'recurring_plans':'; '.join(sorted({c['recurring_plan'] for c in aa})) or 'No current active plan',
             'editions':'; '.join(sorted({c['edition'] for c in aa})) or 'No current edition',
             'channels':'; '.join(sorted({c['channel'] for c in aa})) or 'No current channel',
             'observed_billing_usd':sum((billing[(cid,y,'full')] for y in range(2019,2027)),ZERO),
             'billing_lines':sum(counts[(cid,y,'full')] for y in range(2019,2027)),
             'price_review_contracts':sum('review' in c['price_status'] for c in aa),
             'known_term_ends':sum(bool(c['end_date']) for c in aa),'headroom':'Unknown; account plan required',
             'group_id':None,
             'status':'Current subscription' if aa else 'No effective subscription; not proven churn'}
        customers.append(rec)
        growth.append({'customer_id':cid,'current_customer':bool(aa),'billing_2024':billing[(cid,2024,'full')], 'lines_2024':counts[(cid,2024,'full')],
            'billing_2025':billing[(cid,2025,'full')],'lines_2025':counts[(cid,2025,'full')],
            'billing_jan_aug_2025':billing[(cid,2025,'ytd')],'lines_jan_aug_2025':counts[(cid,2025,'ytd')],
            'billing_jan_aug_2026':billing[(cid,2026,'ytd')],'lines_jan_aug_2026':counts[(cid,2026,'ytd')],
            'net_arr_usd':rec['net_arr_usd'],'tenure_years':age,'headroom':rec['headroom']})
    customers.sort(key=lambda r:(-r['net_arr_usd'],r['customer_id']))
    growth.sort(key=lambda r:(-r['net_arr_usd'],r['customer_id']))
    # Preserve all open quotations as candidates. No inferred probability or deal approval.
    pipeline=[]
    for o in orders.values():
        if o['state'] not in ('draft','sent') or scopes[o['id']]!='external_candidate':continue
        c=ctx[o['id']];pl=plans.get(o['plan_id'],{});rate=dec(fx.get((o['company_id'],o['currency_id'],'2026-09-06'),{}).get('rate_to_usd'))
        interval=pl.get('billing_period_value');unit=pl.get('billing_period_unit')
        factor={'month':D(12),'year':D(1),'week':D('52.14')}.get(unit)
        candidate=dec(o['recurring_total'])*factor/D(interval)*rate if factor is not None and interval and rate is not None else None
        pipeline.append({'order_id':o['id'],'customer_id':key(integer(c['end_customer_id'])),'issuer_id':o['company_id'],'state':o['state'],
            'lifecycle':o['subscription_state'] or 'unknown','recurring_plan':c['recurring_plan'],'currency':currencies[o['currency_id']]['name'],
            'recurring_period_txn':dec(o['recurring_total']),'candidate_arr_usd':candidate,'probability_source':dec(o['x_studio_probability']),
            'service_start':o['start_date'],'service_end':o['end_date'],'expected_invoice_date':o['x_studio_expected_invoice_date'],
            'parent_order_id':o['subscription_id'],'opportunity_id':o['opportunity_id'],'included':False,
            'review_reason':'Review net price, current status, service timing and overlap before inclusion'})
    forecast_inputs=[]
    current_ids={a['customer_id'] for a in active}
    for p in pipeline:
        start=p['service_start'];year=int(start[:4]) if start else None
        forecast_inputs.append({'event_id':'Q'+str(p['order_id']),'customer_id':p['customer_id'],'year':year,
            'component':'replacement' if p['parent_order_id'] else ('expansion' if p['customer_id'] in current_ids else 'new'),
            'layer':'open pipeline','arr_usd':p['candidate_arr_usd'],'probability':p['probability_source'],
            'service_start':start,'service_end':p['service_end'],'one_time_usd':None,'include':0,'reviewed':0,
            'overlap_key':'OPP'+str(p['opportunity_id']) if p['opportunity_id'] else 'Q'+str(p['order_id']),
            'source_order_id':p['order_id'],'evidence':'Odoo quotation; price, dates and overlap unreviewed'})
    for y in [2027,2028,2029]:
        for j in range(1,6):
            forecast_inputs.append({'event_id':f'MANUAL-{y}-{j}','customer_id':f'PROSPECT-{j}','year':y,
                'component':'new','layer':'management','arr_usd':None,'probability':None,'service_start':None,'service_end':None,
                'one_time_usd':None,'include':0,'reviewed':0,'overlap_key':f'MANUAL-{y}-{j}',
                'source_order_id':None,'evidence':'Editable slot; replace ID for an existing-customer expansion'})
    assumptions=[{'year':y,'case':case,'retention':D(1) if case=='Flat baseline' else None,
        'expansion_rate':ZERO if case=='Flat baseline' else None,
        'evidence':'Explicit flat carry-forward scenario; not approved forecast' if case=='Flat baseline' else 'Management input required'}
        for y in [2027,2028,2029] for case in ['Flat baseline','Management','Downside']]
    # Static prepared facts are sourced inputs to live Excel aggregations/forecast calculations.
    out={'contracts':contract_rows,'contract_lines':contract_lines,'customers':customers,'growth':growth,'invoice_lines':invoices,
         'service_allocations':allocations,'customer_months':[{'customer_id':k[0],'service_month':k[1],'invoice_backed_mrr_usd':v,'coverage':'Observed contributions only; not complete retention series'} for k,v in sorted(monthly.items())],
         'price_reviews':price_reviews,'missing_service_periods':missing_period,'allocation_controls':alloc_checks,'pipeline':pipeline,
         'fx':read('fx_context')['data'],'forecast_inputs':forecast_inputs,'forecast_assumptions':assumptions}
    for n,v in out.items():save(n,v)
    # Conservation/timing controls are independent of the workbook formulas.
    recurring=sum((f['revenue_usd'] for f in invoices if f['in_reporting_total'] and f['recurrence']=='recurring'),ZERO)
    timing={b:sum((a['revenue_usd'] for a in allocations if a['period_bucket']==b),ZERO) for b in ['pre_reporting','through_cutoff','future_service']}
    missing=sum((m['revenue_usd'] for m in missing_period),ZERO)
    assert abs(recurring-sum(timing.values(),ZERO)-missing)<D('.000001')
    assert len(eligible)==186 and len({a['customer_id'] for a in active})==181
    summary={'run_id':manifest['analysis_run_id'],'model_version':'investor-review-1','forecast_years':[2027,2028,2029],
        'billing_cutoff':str(CUTOFF),'portfolio_date':str(ASOF),'status':'Internal review; not certified for investor publication',
        'candidate_net_arr':sum((a['net_arr_usd'] for a in active),ZERO),'candidate_end_customer_arr':sum((a['end_customer_arr_usd'] for a in active),ZERO),
        'price_review_contracts':[a['order_id'] for a in active if 'review' in a['price_status']],
        'active_family_overlap_ids':[a['order_id'] for a in active if families[a['family_id']]>1],
        'channel_product_ids':sorted(channel_products),'recurring_billing_usd':recurring,'missing_period_usd':missing,'allocation_timing':timing,
        'negative_customer_months':sum(v<0 for v in monthly.values()),
        'counts':{k:len(v) for k,v in out.items()},'source_hashes':{s['table']:s['sha256'] for s in manifest['sources']},
        'files':{k:sha(OUT/(k+'.json')) for k in out},'model_sha256':sha(Path(__file__)),
        'limitations':['No log-derived data','Historical end-customer attribution incomplete','Portfolio retention and full lifetime CLV unavailable',
            'End-customer value adds back explicit recurring channel discount products only; proxy, not independently verified resale value',
            'Flat carry-forward is an explicit scenario, not signed backlog or a management forecast','No customer names in review output; IDs retained',
            'No automatic source quote inclusion; current raw quotations are not validated pipeline','Historical product/plan attributes are current snapshot classifications']}
    save('summary',summary)
    print(json.dumps({k:v for k,v in summary.items() if k not in ['source_hashes','files','channel_product_ids']},indent=2,default=str))

if __name__=='__main__':main()
