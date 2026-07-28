# AI Bootcamp RB Workshop — GenAI Garage

A deliberately small (and deliberately imperfect) team dashboard used in the
**"From Chatbot to Agent Delegation"** workshop. You will point AI agents at this
repo, give them goals, set guardrails, and review their work.

## Quick start

```bash
npm install
npm test          # expected: 1 failing test — that's intentional (Exercise 1A)
./scripts/smoke-test.sh   # pre-work verification — aim for ALL GREEN
```

Run the app (optional, nice for seeing your agent's work):
```bash
npm run dev       # frontend on http://localhost:5173
npm run api       # API on http://localhost:3001
```

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

## Exercise 3: enabling the Track & Release MCP server

In `opencode.json`, set `"enabled": true` under `mcp.trackrelease` and make sure
`TR_TOKEN` is exported. Restart opencode. Note the permission line already present:

```json
"permission": { "trackrelease_*": "ask" }
```

Every Track & Release call will ask for your approval. That's a feature.

## The finale

```
/ticket-to-pr FE-01
```

Fetches the ticket (MCP, or `tickets/FE-01.md` as fallback), plans, implements,
delegates testing to `@test-author`, gets a read-only review from `@reviewer`,
**stops for your approval**, then pushes a branch and opens a draft PR.

## Known imperfections (they are the curriculum)

- One failing test (inclusive-boundary bug in `filterRecentItems`).
- `filterByStatus` has no edge-case tests.
- `/api/metrics` silently accepts garbage query values.
- `parseDate` only really handles ISO dates; the CSV disagrees.
- The chart is hand-rolled and inaccessible to screen readers.

Do not fix these ahead of the workshop. They are somebody's ticket.
