#!/bin/bash

set -e

# === CONFIG ===
CHAIN_ID="socialchain"
KEY_NAME="socialchain_validator"
KEYRING="test"
HOME_DIR="./.data"
ADDRESS=$(bin/socialchaind keys show "$KEY_NAME" -a --keyring-backend "$KEYRING" --home "$HOME_DIR")


# === WAIT FOR NODE TO BE READY ===
echo "⏳ Waiting for node to start producing blocks..."
until curl -s localhost:26657/status | grep -q '"catching_up":false'; do
  sleep 1
done

# === CREATE PROFILE ===
echo "👤 Creating profile for validator..."
TX_HASH=$(bin/socialchaind tx profiles create-profile "validator" \
  --from "$ADDRESS" \
  --keyring-backend "$KEYRING" \
  --chain-id "$CHAIN_ID" \
  --home "$HOME_DIR" \
  --fees 5000usoc \
  --yes \
  --output json | jq -r '.txhash')

# === WAIT FOR TX TO BE COMMITTED ===
echo "⏳ Waiting for create-profile TX ($TX_HASH) to be included..."
while true; do
  TX_STATUS=$(bin/socialchaind query tx "$TX_HASH" --home "$HOME_DIR" --output json 2>/dev/null || true)
  CODE=$(echo "$TX_STATUS" | jq -r '.code // 0')
  if [ "$CODE" == "0" ]; then
    break
  fi
  sleep 1
done

# === POST MESSAGE ===
echo "📝 Creating posts from validator..."
for i in {0..9}; do
  TX_HASH=$(bin/socialchaind tx posts create-post "Hello, world! #$i" \
    --from "$ADDRESS" \
    --chain-id "$CHAIN_ID" \
    --keyring-backend "$KEYRING" \
    --home "$HOME_DIR" \
    --fees 5000usoc \
    --yes \
    --output json | jq -r '.txhash')

  echo "⏳ Waiting for create-post TX ($TX_HASH) to be included..."
  while true; do
    TX_STATUS=$(bin/socialchaind query tx "$TX_HASH" --home "$HOME_DIR" --output json 2>/dev/null || true)
    CODE=$(echo "$TX_STATUS" | jq -r '.code // 0')
    if [ "$CODE" == "0" ]; then
      break
    fi
    sleep 1
  done
done