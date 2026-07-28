#!/usr/bin/env bash
# Pre-work verification for the AI workshop. Run from the repo root.
set -u
GREEN="\033[0;32m"; RED="\033[0;31m"; YELLOW="\033[0;33m"; NC="\033[0m"
fail=0

check() { # $1 label, $2 status (0 ok / 1 fail / 2 warn), $3 hint
  if [ "$2" -eq 0 ]; then printf "${GREEN}  ✓ %s${NC}\n" "$1";
  elif [ "$2" -eq 2 ]; then printf "${YELLOW}  ! %s — %s${NC}\n" "$1" "$3";
  else printf "${RED}  ✗ %s — %s${NC}\n" "$1" "$3"; fail=1; fi
}

echo "Workshop smoke test"
echo "-------------------"

command -v opencode >/dev/null 2>&1
check "opencode installed" $? "install: curl -fsSL https://opencode.ai/install | bash"

command -v node >/dev/null 2>&1 && command -v git >/dev/null 2>&1
check "node + git available" $? "install Node 20+ and git"

[ -d node_modules ]
check "dependencies installed (node_modules)" $? "run: npm install"

if [ -n "${TR_TOKEN:-}" ]; then
  check "TR_TOKEN environment variable set" 0 ""
else
  check "TR_TOKEN environment variable set" 1 "export TR_TOKEN=<your Track & Release token>"
fi

# Optional: verify a model responds (soft check — flag but don't fail on timeout)
if command -v opencode >/dev/null 2>&1; then
  if timeout 60 opencode run "Reply with exactly: OK" 2>/dev/null | grep -q "OK"; then
    check "opencode model responds" 0 ""
  else
    check "opencode model responds" 2 "run 'opencode auth login' and select a free model; if this keeps failing, ping the Teams channel"
  fi
fi

echo "-------------------"
if [ "$fail" -eq 0 ]; then
  printf "${GREEN}ALL GREEN — you are ready for the workshop.${NC}\n"
  exit 0
else
  printf "${RED}NOT READY — fix the ✗ items above (help: workshop Teams channel).${NC}\n"
  exit 1
fi
