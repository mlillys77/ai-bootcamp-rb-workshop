# AI Bootcamp Workshop Sandbox — GenAI Garage

A deliberately small (and deliberately imperfect) team dashboard used in the
**"From Chatbot to Agent Delegation"** workshop. You will point AI agents at this
repo, give them goals, set guardrails, and review their work.

> **This repo is synthetic.** It contains no Bosch code and no real data — it exists
> so we can safely send it to external model APIs during the workshop. Do not point
> the workshop tooling at real projects.

## Quick start

1. **Fork** this repo (button top right) — everyone works in their own fork; your
   branches and pull requests stay in your copy, no special access rights needed.
2. Clone **your fork** and set up:

```bash
git clone https://github.com/<YOUR-GITHUB-USERNAME>/ai-bootcamp-rb-workshop.git
cd ai-bootcamp-rb-workshop
npm install
npm test          # expected: exactly 1 failing test — that's intentional
```

3. Create your working branch and verify you can push (the finale needs this):

```bash
git checkout -b personal/<your-name>
git push -u origin personal/<your-name>
```

4. Verify everything:

```bash
./scripts/smoke-test.sh   # aim for ALL GREEN
```

**Plan B:** if forking or cloning is blocked for you, **Code → Download ZIP** works
for every exercise except the final push/PR step — you'll pair with a neighbor for that.

## Getting updates

Your fork does **not** update automatically when this repo changes. If we announce
an update:

1. On **your fork's GitHub page**, click **Sync fork → Update branch**.
2. Locally:

```bash
git checkout main && git pull
git checkout personal/<your-name> && git merge main
```

That's it. (Keep your own work on `personal/<your-name>`, never on `main`, and
syncing will never conflict.)

## What's inside

| Path | Purpose |
|---|---|
| `src/` | React dashboard: filter, table, hand-rolled SVG chart |
| `api/` | Tiny Express API (`/api/health`, `/api/metrics`) |
| `data/team_metrics.csv` | Messy on purpose: duplicates, nulls, mixed date formats |
| `tests/` | Vitest suite — one test fails on purpose |
| `tickets/` | Workshop tickets (also mirrored in the Track & Release sandbox project) |
| `AGENTS.md` | Conventions every agent reads automatically |
| `.opencode/skills/` | Example skill (component checklist) |
| `.opencode/commands/ticket-to-pr.md` | The finale workflow: `/ticket-to-pr FE-01` |
| `.opencode/agents/` | Empty — you create your agents here in Exercise 2 |
| `opencode.json` | Track & Release MCP config (disabled until Exercise 3) |

## Models

- **Free models** work directly after installing opencode — in the TUI, `/models`,
  pick one, and test it with a real question. If no free models appear, `opencode
  auth login` → *opencode (Zen)* as a backup.
- **Kimi / Moonshot API key** is handed out **at the workshop** — nothing to set up
  in advance.

## Track & Release MCP (Exercise 3)

The MCP config lives in `opencode.json` with `"enabled": false`. Connection details
(project link and token) are shared separately before the workshop — nothing to do
until then. Note the permission line already present:

```json
"permission": { "trackrelease_*": "ask" }
```

Every Track & Release call will ask for your approval. That's a feature.

## The finale

```
/ticket-to-pr FE-01
```

Fetches the ticket (via MCP, or `tickets/FE-01.md` as fallback), plans, implements,
delegates testing to `@test-author`, gets a read-only review from `@reviewer`,
**stops for your approval**, then pushes a branch and opens a **draft PR in your
own fork**.

## Known imperfections (they are the curriculum)

- One failing test (inclusive-boundary bug in `filterRecentItems`).
- `filterByStatus` has no edge-case tests.
- `/api/metrics` silently accepts garbage query values.
- `parseDate` only really handles ISO dates; the CSV disagrees.
- The chart is hand-rolled and inaccessible to screen readers.

Do not fix these ahead of the workshop. They are somebody's ticket.

## Troubleshooting

- **API error when prompting a free model** (even though you're connected): you need
  the Local Proxy setup — https://inside-docupedia.bosch.com/confluence/spaces/DEVCORNER/pages/1375211352/Local+Proxy
- **Error mentioning `127.0.0.1:3128` / `proxyconnect` / "actively refused"**: your
  machine is configured for the Local Proxy but the proxy isn't running. On the
  Bosch network: start the Local Proxy app and retry. At home without VPN: clear the
  proxy variables for the session (`$env:HTTP_PROXY=""; $env:HTTPS_PROXY=""` in
  PowerShell) and retry.
- **npm / TLS issues behind the corporate proxy**: see `docs/proxy.md`.
- Still stuck? Post the exact error in the workshop Teams channel — blockers get
  fixed before the day, not during it.
