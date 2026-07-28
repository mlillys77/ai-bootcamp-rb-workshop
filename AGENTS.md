# Project conventions for agents

## Stack
- Frontend: React 18 + Vite, plain CSS in `src/styles.css`. No CSS-in-JS, no Tailwind.
- API: Express in `api/`, app factory pattern (`createApp` in `api/app.js`).
- Tests: Vitest. Component tests use `@testing-library/react` with the `// @vitest-environment jsdom` pragma.

## Rules
1. Run `npm test` before claiming any task is done, and report results honestly — including failures.
2. Only modify files under `src/`, `api/`, and `tests/`. Ask before touching anything else. NEVER modify files in `data/` — write analysis output to `reports/` instead.
3. Every new component or endpoint change ships with at least one test.
4. Commit messages: conventional commits, e.g. `feat(dashboard): add status badge (FE-01)` — always reference the ticket key.
5. Branches: `feature/<TICKET-KEY>`.
6. Functional React components + hooks only; match existing styling patterns.
7. If a ticket is ambiguous or contradictory, say so and ask — do not guess.
