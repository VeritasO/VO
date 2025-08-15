#!/usr/bin/env bash
# Start backend in foreground for development
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Starting backend..."
# Prefer npm script if present
if npm run | grep -q "dev:backend"; then
  npm run dev:backend
else
  # Fallback: run compiled or ts-node main
  if [ -f backend/src/app.ts ]; then
    npx ts-node backend/src/app.ts
  else
    echo "No backend entry found (backend/src/app.ts)"
    exit 1
  fi
fi
