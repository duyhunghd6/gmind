#!/usr/bin/env bash

# File: scripts/dev-showcase.sh
# Usage: ./scripts/dev-showcase.sh [PORT]
# Starts the Gmind Showcase Website on the specified port (default: 9993)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEBSITE_DIR="$PROJECT_ROOT/apps/website"

PORT=${1:-9993}
HOST="0.0.0.0"

echo "Checking for existing process on port $PORT..."
PID=$(lsof -ti tcp:$PORT 2>/dev/null || true)
if [ ! -z "$PID" ]; then
    echo "Killing existing process (PID $PID) on port $PORT..."
    kill -9 $PID
    echo "Process killed."
else
    echo "No process running on port $PORT."
fi

if [ ! -d "$WEBSITE_DIR" ]; then
    echo "Error: Directory $WEBSITE_DIR not found."
    exit 1
fi

echo ""
echo "=================================================="
echo "🌐 Gmind Showcase Website"
echo "🌐 Local:   http://localhost:$PORT"
echo "🌐 Network: http://$HOST:$PORT"
echo "=================================================="
echo ""

cd "$WEBSITE_DIR"
exec ./node_modules/.bin/next dev -H $HOST -p $PORT
