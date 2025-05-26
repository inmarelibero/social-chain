#!/bin/bash

set -e

# === CONFIG ===
DENOM="usoc"
HOME_DIR="./.data"

# === START CHAIN ===
echo "🚦 Starting chain..."
bin/socialchaind start --home "$HOME_DIR" --minimum-gas-prices="0.025$DENOM"
