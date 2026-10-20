import sys,lzma,pathlib,subprocess,concurrent.futures,hashlib,json
root=pathlib.Path('/tmp/w1-webkit-packages'); dest=pathlib.Path('/tmp/w1-webkit-libs'); dest.mkdir(exist_ok=True)
packages={}
for index in ['main','universe']:
 for block in lzma.open(root/f'{index}.xz','rt').read().split('\n\n'):
  fields={}
  for line in block.splitlines():
   if ': ' in line and not line.startswith(' '):
    k,v=line.split(': ',1);fields[k]=v
  if 'Package' in fields:packages[fields['Package']]=fields
names='libgstreamer-gl1.0-0 libevent-2.1-7t64 libopus0 libgstreamer1.0-0 libgstreamer-plugins-base1.0-0 libgstreamer-plugins-bad1.0-0 libvpx9 libx264-164 libwebpdemux2 libavif16 libharfbuzz-icu0 libepoxy0 libwayland-server0 libmanette-0.2-0 libenchant-2-2 libsecret-1-0 libhyphen0 liborc-0.4-0t64 libgudev-1.0-0 libevdev2 libgraphene-1.0-0 libhunspell-1.7-0 libaspell15 libicu74 libdav1d7 libgav1-1 librav1e0 libSvtAv1Enc1d1 libyuv0 libaom3'.split()
# Exact public package bytes only, no host package state/configuration is queried.
def get(name):
 p=packages[name];path=root/(name+'.deb')
 if not path.exists(): subprocess.run(['curl','--fail','--silent','--show-error','--location','https://archive.ubuntu.com/ubuntu/'+p['Filename'],'-o',str(path)],check=True)
 assert hashlib.sha256(path.read_bytes()).hexdigest()==p['SHA256']
 subprocess.run(['dpkg-deb','-x',str(path),str(dest)],check=True)
 return {'package':name,'version':p['Version'],'source':'https://archive.ubuntu.com/ubuntu/'+p['Filename'],'sha256':p['SHA256']}
# Ubuntu's package name is lower-case.
names=[n.lower() for n in names]+sys.argv[1:]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: rows=list(pool.map(get,names))
pathlib.Path('docs/validation/raw/webkit-runtime-packages.json').write_text(json.dumps(rows,indent=2)+'\n')
print(f'Extracted {len(rows)} verified public runtime packages into temporary storage')
