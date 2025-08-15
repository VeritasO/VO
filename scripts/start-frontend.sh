#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Starting frontend..."
if [ -d frontend ]; then
  cd frontend
  if [ -f package.json ]; then
    npm install --no-audit --no-fund
    npm run dev
  else
    echo "No frontend package.json found"
    exit 1
  fi
else
  echo "No frontend directory found"
  exit 1
fi
