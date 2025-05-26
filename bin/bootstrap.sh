#!/bin/bash

set -e

# Load .env if exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# === CONFIG ===
CHAIN_ID="socialchain"
MONIKER="my-node"
KEY_NAME="socialchain_validator"
KEYRING="test"
MNEMONIC="fatigue cash blanket vehicle twelve enter hood reward piano elbow claim spin envelope virus stick elder insect attend rabbit phrase expose intact police local"
DENOM="usoc"
AMOUNT="100000000$DENOM"
HOME_DIR="./.data"

# === CLEANUP ===
echo "🧹 Resetting chain..."
rm -rf "$HOME_DIR"
mkdir -p "$HOME_DIR"

# === INIT CHAIN ===
echo "🚀 Initializing chain..."
bin/socialchaind init "$MONIKER" --chain-id "$CHAIN_ID" --home "$HOME_DIR"

# === IMPORT KEY ===
echo "🔐 Importing validator key from mnemonic..."
echo "$MNEMONIC" | bin/socialchaind keys add "$KEY_NAME" --recover --keyring-backend "$KEYRING" --home "$HOME_DIR"

# === FIX DENOM IN genesis.json ===
echo "🛠️ Setting staking/mint denominations to $DENOM..."
jq ".app_state.staking.params.bond_denom = \"$DENOM\" |
    .app_state.mint.params.mint_denom = \"$DENOM\" |
    .app_state.crisis.constant_fee.denom = \"$DENOM\" |
    .app_state.gov.deposit_params.min_deposit[0].denom = \"$DENOM\"" \
    "$HOME_DIR/config/genesis.json" > "$HOME_DIR/config/genesis_temp.json"
mv "$HOME_DIR/config/genesis_temp.json" "$HOME_DIR/config/genesis.json"

# === FUND VALIDATOR ===
echo "💰 Funding validator account in genesis..."
ADDRESS=$(bin/socialchaind keys show "$KEY_NAME" -a --keyring-backend "$KEYRING" --home "$HOME_DIR")
bin/socialchaind genesis add-genesis-account "$ADDRESS" "$AMOUNT" --home "$HOME_DIR"

# === FUND ADDITIONAL ACCOUNTS FROM .env ===
if [ -n "$FUND_ADDRESSES" ]; then
  IFS=',' read -ra ADDR_ARR <<< "$FUND_ADDRESSES"
  for ADDR in "${ADDR_ARR[@]}"; do
    echo "💰 Funding address $ADDR with $AMOUNT"
    bin/socialchaind genesis add-genesis-account "$ADDR" "$AMOUNT" --home "$HOME_DIR"
  done
fi

# === GENTX ===
echo "🪪 Creating gentx..."
bin/socialchaind genesis gentx "$KEY_NAME" "$AMOUNT" \
  --chain-id "$CHAIN_ID" \
  --keyring-backend "$KEYRING" \
  --home "$HOME_DIR"

# === COLLECT GENTX ===
echo "📦 Collecting gentxs..."
bin/socialchaind genesis collect-gentxs --home "$HOME_DIR"

# === VALIDATE ===
echo "🔍 Validating genesis file..."
bin/socialchaind genesis validate-genesis --home "$HOME_DIR"

# === ENABLE API SERVER ===
echo "🌐 Enabling API server at 0.0.0.0:1317..."
sed -i '' 's/^enable = false/enable = true/' "$HOME_DIR/config/app.toml"
sed -i '' 's/^swagger = false/swagger = true/' "$HOME_DIR/config/app.toml"
sed -i '' 's/^address = "tcp:\/\/127.0.0.1:1317"/address = "tcp:\/\/0.0.0.0:1317"/' "$HOME_DIR/config/app.toml"

# === START CHAIN ===
echo "🚦 Starting chain..."
bin/socialchaind start --home "$HOME_DIR" --minimum-gas-prices="0.025$DENOM"
