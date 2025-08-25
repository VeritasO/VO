#!/usr/bin/env python3
import yaml
import hashlib
import sys
import os

MANIFEST_PATH = 'boot/BP-01-Omnis-Initium.yaml'

def main():
    if not os.path.exists(MANIFEST_PATH):
        print(f'Manifest not found: {MANIFEST_PATH}')
        sys.exit(2)
    with open(MANIFEST_PATH,'r') as f:
        manifest = yaml.safe_load(f)

    verify = manifest.get('spec',{}).get('integrity',{}).get('verify',[])
    errs = 0
    for v in verify:
        path = v.get('path')
        expected = v.get('sha256')
        if not path:
            print('MISSING path in verify entry')
            errs += 1
            continue
        if not os.path.exists(path):
            print(f'MISSING FILE: {path}')
            errs += 1
            continue
        if expected and expected != '<fill-from-cvcm>':
            h = hashlib.sha256(open(path,'rb').read()).hexdigest()
            if h != expected:
                print(f'HASH MISMATCH: {path} expected {expected} got {h}')
                errs += 1
            else:
                print(f'OK: {path} matches')
        else:
            print(f'NO EXPECTED HASH SET FOR: {path}')

    if errs > 0:
        print('\nManifest verification failed')
        sys.exit(2)
    else:
        print('\nManifest verification passed')

if __name__ == '__main__':
    main()
