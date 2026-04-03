#!/usr/bin/env bash
# ============================================
# set-palette.sh — Permanently set the default
# color palette for your deployed portfolio.
#
# Usage:
#   ./set-palette.sh <palette-id>
#   ./set-palette.sh list
#   ./set-palette.sh reset
#
# This updates palette-config.js which sets
# window.DEFAULT_PALETTE. Commit and push to deploy.
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG="$SCRIPT_DIR/palette-config.js"

VALID_PALETTES=(
  "ash-crimson"
  "steel-blue"
  "amber-gold"
  "calibrated-paper"
  "graphite-sage"
  "carbon-teal"
  "parchment-ochre"
  "midnight-phosphor"
  "obsidian-copper"
  "electric-violet"
)

PALETTE_NAMES=(
  "Ash & Crimson        — Typeset / Ink on void"
  "Steel Blue           — Blueprint / Deep focus"
  "Amber Gold           — Clean workshop / Night lab"
  "Calibrated Paper     — Deep substrate"
  "Graphite & Sage      — Lab bench / Scope trace"
  "Carbon & Teal        — Whiteboard / Logic analyzer"
  "Parchment & Ochre    — Ruled notebook / Amber lamp"
  "Midnight Phosphor    — Retro green terminal"
  "Obsidian & Copper    — Oxidized metal"
  "Electric Violet      — Neon circuits / Deep ultraviolet"
)

current_palette() {
  grep -o '"[^"]*"' "$CONFIG" | tr -d '"'
}

show_list() {
  local current
  current=$(current_palette)
  echo ""
  echo "  Available palettes:"
  echo "  ─────────────────────────────────────────────────────"
  for i in "${!VALID_PALETTES[@]}"; do
    local marker="  "
    if [ "${VALID_PALETTES[$i]}" = "$current" ]; then
      marker="▸ "
    fi
    printf "  %s%-22s %s\n" "$marker" "${VALID_PALETTES[$i]}" "${PALETTE_NAMES[$i]}"
  done
  echo ""
  echo "  Current default: $current"
  echo ""
  echo "  Usage: ./set-palette.sh <palette-id>"
  echo ""
}

set_palette() {
  local target="$1"
  local valid=false

  for p in "${VALID_PALETTES[@]}"; do
    if [ "$p" = "$target" ]; then
      valid=true
      break
    fi
  done

  if ! $valid; then
    echo "Error: Unknown palette '$target'"
    show_list
    exit 1
  fi

  local old
  old=$(current_palette)

  sed -i "s/\"$old\"/\"$target\"/" "$CONFIG"

  echo ""
  echo "  ✓ Default palette changed: $old → $target"
  echo ""
  echo "  Next steps:"
  echo "    git add palette-config.js"
  echo "    git commit -m \"chore: set default palette to $target\""
  echo "    git push"
  echo ""
}

case "${1:-}" in
  "list"|"ls"|"")
    show_list
    ;;
  "reset")
    set_palette "ash-crimson"
    ;;
  *)
    set_palette "$1"
    ;;
esac
