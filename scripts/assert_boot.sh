#!/usr/bin/env bash
set -euo pipefail

if ! grep -q "Boot sequence complete" boot_output.txt; then
  echo "Boot did not complete" >&2
  exit 2
fi

if ! grep -q "Loaded [0-9]\+ seed file(s)" boot_output.txt; then
  echo "Seeds not loaded" >&2
  exit 3
fi

echo "boot assertions passed"
