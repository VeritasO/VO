#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Start both services in a single terminal using concurrently if installed
if command -v concurrently >/dev/null 2>&1; then
  npx concurrently "npm run dev:backend" "cd frontend && npm run dev"
else
  echo "Install 'concurrently' to use start-all, falling back to background jobs"
  (cd backend && npm run dev:backend) &
  (cd frontend && npm run dev) &
  wait
fi
