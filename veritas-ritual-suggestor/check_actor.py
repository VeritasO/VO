import subprocess, sys
print('Checking veritas-ritual-suggestor...')
try:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
    print('requirements OK')
except Exception as e:
    print('requirements failed:', e)
    sys.exit(2)

print('Importing src.main...')
try:
    import importlib
    importlib.import_module('src.main')
    print('import OK')
except Exception as e:
    print('import failed:', e)
    sys.exit(3)
