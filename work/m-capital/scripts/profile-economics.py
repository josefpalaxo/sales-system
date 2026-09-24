import json
from collections import Counter, defaultdict
from decimal import Decimal as D
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'evidence/m_capital_20260925_g176/source'
def read(t): return json.loads((SOURCE / (t + '.json')).read_text())['data']
def index(t): return {r['id']: r for r in read(t)}
def dec(x): return D(str(x or 0))
orders, lines, invoices = index('sale_order'), index('sale_order_line'), index('account_move')
partners, products, templates = index('res_partner'), index('product_product'), index('product_template')
def commercial(pid): return partners.get(pid, {}).get('commercial_partner_id') or pid
def recurring(pid): return templates.get(products.get(pid, {}).get('product_tmpl_id'), {}).get('recurring_invoice')
ol = defaultdict(list)
for line in lines.values(): ol[line['order_id']].append(line)
il = index('account_move_line')
bridge = defaultdict(set)
for r in read('sale_order_line_invoice_rel'): bridge[r['order_line_id']].add(r['invoice_line_id'])
active=[]
for order in orders.values():
    if order['subscription_state'] != '3_progress': continue
    ls=[l for l in ol[order['id']] if not l['display_type']]
    active.append({'id':order['id'],'customer':commercial(order['partner_id']), 'billed':commercial(order['partner_invoice_id']),
        'start':order['start_date'], 'end':order['end_date'], 'recurring':order['recurring_total'],
        'source_arr':order['x_studio_arr_usd'], 'total':order['amount_untaxed'],
        'sum_recurring':str(sum((dec(l['price_subtotal']) for l in ls if recurring(l['product_id'])),D(0))),
        'negative_lines':[{'id':l['id'],'product':l['product_id'],'name':l['name'],'amount':l['price_subtotal'],'recurring_product':recurring(l['product_id'])} for l in ls if dec(l['price_subtotal'])<0],
        'channel_discounts':[{'id':l['id'],'subtotal':l['price_subtotal'],'reseller':l['x_studio_reseller_price'],'distributor':l['x_studio_distributor_price']} for l in ls if dec(l['x_studio_reseller_disc'])!=0 or dec(l['x_studio_distributor_disc'])!=0]})
comparisons=[]
for lid, iids in bridge.items():
    l=lines.get(lid)
    if not l or not dec(l['product_uom_qty']): continue
    for iid in iids:
        i=il.get(iid)
        if not i or not dec(i['quantity']): continue
        inv=invoices[i['move_id']]
        if inv['state']!='posted' or inv['move_type']!='out_invoice': continue
        order=orders[l['order_id']]
        if inv['currency_id']!=order['currency_id']: continue
        actual=dec(i['price_subtotal'])/dec(i['quantity'])
        match=[f for f in ['price_subtotal','x_studio_reseller_price','x_studio_distributor_price'] if abs(actual-dec(l[f])/dec(l['product_uom_qty']))<D('.02')]
        comparisons.append({'order_id':order['id'],'line_id':lid,'invoice_line_id':iid,'billed':inv['partner_id'], 'matches':match,'subtotal':l['price_subtotal'],'invoice_subtotal':i['price_subtotal']})
posted=[i for i in invoices.values() if i['state']=='posted' and i['invoice_date'] and '2019-01-01'<=i['invoice_date']<='2026-08-31']
report={'active_count':len(active), 'active_expired':sum(bool(x['end'] and x['end']<'2026-09-06') for x in active),
    'active_future':sum(bool(x['start'] and x['start']>'2026-09-06') for x in active),
    'active_with_negative_lines':sum(bool(x['negative_lines']) for x in active),
    'active_with_channel_discounts':sum(bool(x['channel_discounts']) for x in active),
    'invoice_year_counts':dict(Counter((i['invoice_date'][:4],i['company_id']) for i in posted)),
    'unit_price_matches':dict(Counter('|'.join(x['matches']) or 'NONE' for x in comparisons)),
    'other_company_billed':dict(Counter(commercial(i['partner_id']) for i in posted if commercial(i['partner_id']) in [1,10,465,663,1672,2124])),
    'active':active, 'price_comparisons':comparisons}
report['invoice_year_counts']={str(k):v for k,v in report['invoice_year_counts'].items()}
(SOURCE.parent/'economics-profile.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k not in ['active','price_comparisons']},indent=2))
print('Active negative examples:',json.dumps([x for x in active if x['negative_lines']][:5],indent=2))

