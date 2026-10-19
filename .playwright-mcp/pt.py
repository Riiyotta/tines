import json,sys
d=json.load(open(sys.argv[1]))
if isinstance(d,str): d=json.loads(d)
if isinstance(d,str): print(d); sys.exit()
print({k:v for k,v in d.items() if k!='tree'})
def p(n,i=0):
    s=' '*i+n['t']+n['c']+' '+str(n['box'])
    for k in ['bg','rad','pad','gap','gtc','sh','href','src','svg']:
        if k in n: s+=f' {k}={n[k]}'
    if 'text' in n: s+=f" :: '{n['text']}' [{n['font']}]"
    print(s)
    for c in n.get('k',[]): p(c,i+1)
p(d['tree'])
