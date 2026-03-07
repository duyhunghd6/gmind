#!/bin/bash
# ────────────────────────────────────────────────────────
# Telegram Bot Test Script
# Usage:
#   1. Send any message to your bot on Telegram first
#   2. Run: bash scripts/telegram-test.sh get-id
#   3. Copy the chat_id and add to .env.local as TELEGRAM_CHAT_ID
#   4. Run: bash scripts/telegram-test.sh test-message
# ────────────────────────────────────────────────────────

set -euo pipefail

# Load env from root .env.local
ENV_FILE="$(cd "$(dirname "$0")/.." && pwd)/.env.local"
if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

# Also try apps/website/.env.local
WEBSITE_ENV="$(cd "$(dirname "$0")/.." && pwd)/apps/website/.env.local"
if [ -f "$WEBSITE_ENV" ]; then
  set -a
  source "$WEBSITE_ENV"
  set +a
fi

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ]; then
  echo "❌ TELEGRAM_BOT_TOKEN not found in .env.local"
  echo "   Add it to .env.local: TELEGRAM_BOT_TOKEN=your-token-here"
  exit 1
fi

API="https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}"

case "${1:-help}" in
  get-id)
    echo "📡 Fetching recent messages (getUpdates)..."
    echo "   ⚠ Make sure you've sent a message to your bot first!"
    echo ""
    RESPONSE=$(curl -s "$API/getUpdates")
    
    # Pretty print the response
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    
    echo ""
    echo "────────────────────────────────────────"
    # Extract chat IDs
    CHAT_IDS=$(echo "$RESPONSE" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if data.get('ok') and data.get('result'):
    seen = set()
    for update in data['result']:
        msg = update.get('message', {})
        chat = msg.get('chat', {})
        chat_id = chat.get('id')
        username = chat.get('username', 'N/A')
        first_name = chat.get('first_name', 'N/A')
        if chat_id and chat_id not in seen:
            seen.add(chat_id)
            print(f'  Chat ID: {chat_id}')
            print(f'  Username: @{username}')
            print(f'  Name: {first_name}')
            print()
    if not seen:
        print('  ⚠ No messages found. Send a message to your bot first!')
else:
    print('  ⚠ No updates. Send a message to your bot first!')
" 2>/dev/null)
    
    echo "📋 Found chat(s):"
    echo "$CHAT_IDS"
    echo "────────────────────────────────────────"
    echo "👉 Add to .env.local: TELEGRAM_CHAT_ID=<your-chat-id>"
    ;;

  test-message)
    if [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
      echo "❌ TELEGRAM_CHAT_ID not set in .env.local"
      echo "   Run 'bash scripts/telegram-test.sh get-id' first"
      exit 1
    fi

    echo "📤 Sending test message to chat_id=${TELEGRAM_CHAT_ID}..."
    
    MSG="🧪 *Gmind Quiz Test Message*

✅ Bot is working correctly!
📅 $(date '+%Y-%m-%d %H:%M:%S')

_This is a test from scripts/telegram-test.sh_"

    RESPONSE=$(curl -s -X POST "$API/sendMessage" \
      -H "Content-Type: application/json" \
      -d "{
        \"chat_id\": \"${TELEGRAM_CHAT_ID}\",
        \"text\": $(echo "$MSG" | python3 -c "import json,sys; print(json.dumps(sys.stdin.read()))"),
        \"parse_mode\": \"Markdown\"
      }")

    OK=$(echo "$RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('ok', False))" 2>/dev/null)
    
    if [ "$OK" = "True" ]; then
      echo "✅ Message sent successfully! Check your Telegram."
    else
      echo "❌ Failed to send message:"
      echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    fi
    ;;

  *)
    echo "Telegram Bot Test Script"
    echo ""
    echo "Usage:"
    echo "  bash scripts/telegram-test.sh get-id         # Get your chat ID"
    echo "  bash scripts/telegram-test.sh test-message    # Send test message"
    echo ""
    echo "Prerequisites:"
    echo "  1. Create bot via @BotFather on Telegram"
    echo "  2. Add TELEGRAM_BOT_TOKEN to .env.local"
    echo "  3. Send any message to your bot"
    echo "  4. Run 'get-id' to discover your chat_id"
    echo "  5. Add TELEGRAM_CHAT_ID to .env.local"
    echo "  6. Run 'test-message' to verify"
    ;;
esac
