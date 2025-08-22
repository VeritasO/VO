#!/usr/bin/env bash
set -euo pipefail

# Build and run JUNO in server mode for local testing
cd "$(dirname "$0")/.."
IMAGE=veritas-tribunal-chatgpt:local

docker build -t $IMAGE veritas-tribunal

docker run --rm -p 8080:8080 -e SERVER_MODE=server -e APIFY_TOKEN="$APIFY_TOKEN" $IMAGE
