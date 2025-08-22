#!/usr/bin/env bash
set -euo pipefail

# Controller for mock peers. Usage:
#   scripts/mock_peers_ctl.sh start|stop|status|restart

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
PIDS_FILE="$ROOT_DIR/.mock_peers_pids"

is_listening() {
  local port=$1
  ss -ltn 2>/dev/null | awk '{print $4}' | grep -q ":${port}$"
}

start() {
  echo "[mock-peers] Start requested"
  mkdir -p "$ROOT_DIR"
  : > "$PIDS_FILE" || true
  for port in 9001 9002; do
    if is_listening "$port"; then
      echo "[mock-peers] port $port already in use; skipping"
    else
      (node "$ROOT_DIR/scripts/mock_peer.js" "$port" > /dev/null 2>&1 &) || true
      pid=$!
      if [ -n "$pid" ]; then
        echo "$pid" >> "$PIDS_FILE"
        echo "[mock-peers] started mock peer on port $port (pid $pid)"
      fi
    fi
  done
}

stop() {
  echo "[mock-peers] Stop requested"
  if [ -f "$PIDS_FILE" ]; then
    while read -r pid; do
      if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || true
        echo "[mock-peers] killed pid $pid"
      fi
    done < "$PIDS_FILE" || true
    rm -f "$PIDS_FILE"
  else
    echo "[mock-peers] no pid file found"
  fi
}

status() {
  for port in 9001 9002; do
    if is_listening "$port"; then
      echo "[mock-peers] port $port: listening"
    else
      echo "[mock-peers] port $port: not listening"
    fi
  done
}

case "${1:-status}" in
  start) start ;; 
  stop) stop ;; 
  status) status ;; 
  restart) stop; start ;; 
  *) echo "Usage: $0 {start|stop|status|restart}"; exit 1 ;;
esac
