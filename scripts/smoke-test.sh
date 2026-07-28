#!/usr/bin/env bash
# Pre-work verification for the AI workshop. Run from the repo root.
# v2 — adds Node >= 20 check, GitHub CLI check, and push-rights check.
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
check "opencode installed" $? "curl -fsSL https://opencode.ai/install | bash   (or: npm install -g opencode-ai)"

if command -v node >/dev/null 2>&1; then
  major=$(node -p "process.versions.node.split('.')[0]")
  if [ "$major" -ge 20 ]; then
    check "Node.js >= 20 (found v$(node -p 'process.versions.node'))" 0 ""
  else
    check "Node.js >= 20" 1 "found v$(node -p 'process.versions.node') — upgrade to 20 LTS or newer"
  fi
else
  check "Node.js >= 20" 1 "install Node.js 20 LTS"
fi

command -v git >/dev/null 2>&1
check "git available" $? "install git"

if command -v gh >/dev/null 2>&1; then
  if gh auth status >/dev/null 2>&1; then
    check "GitHub CLI authenticated" 0 ""
  else
    check "GitHub CLI authenticated" 1 "run: gh auth login"
  fi
else
  check "GitHub CLI (gh) installed" 1 "install from https://cli.github.com then: gh auth login"
fi

[ -d node_modules ]
check "dependencies installed (node_modules)" $? "run: npm install"

# Push rights: verify origin is the user's fork and pushable (dry run, no changes)
origin=$(git remote get-url origin 2>/dev/null || echo "")
case "$origin" in
  *majdule/ai-bootcamp-rb-workshop*)
    check "cloned your OWN fork" 2 "origin points at the original repo — fork it on GitHub and clone YOUR fork (ZIP users: ignore)" ;;
  "")
    check "git remote configured" 2 "no git remote found — ZIP download? That's OK; you'll pair for the PR step" ;;
  *)
    if git push --dry-run origin HEAD >/dev/null 2>&1; then
      check "push rights to your fork verified" 0 ""
    else
      check "push rights to your fork" 1 "git push failed — check gh auth login / credentials"
    fi ;;
esac

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
