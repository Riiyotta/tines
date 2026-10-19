import json,sys
d=json.load(open(sys.argv[1]))
if isinstance(d,str): d=json.loads(d)
for k,v in d.items():
    if k=='fontFaces':
        if len(sys.argv)>2: [print('  FF',f) for f in v]
        continue
    print(k, json.dumps(v))
