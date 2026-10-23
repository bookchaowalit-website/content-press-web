# Press Room

A browser-only clipping desk for press mentions: add a mention (title, one detail, status Published / Pitch /
Archive), search title, detail and status, and delete. It starts with two sample mentions and is kept in this
browser's localStorage.

Live: https://press.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- Not a press page or media kit: no downloads, uploads, embeds, speaking topics, media contact form, CMS, public feed
  or newsroom sync.
- No editing of a saved mention, no account, no sync between browsers.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: clipping logic, MCP route, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/press.ts`: sample mentions, `parseItems` (validates stored data), `searchItems`, `addItem`, `removeItem`,
  `clipCount` (used by the page and the MCP route).
- `lib/use-stored-state.ts`: localStorage-backed state via `useSyncExternalStore` (server render uses the samples).
- `app/api/mcp/route.ts`: stateless JSON-RPC endpoint with `list_mentions` and `get_mention` over the samples.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
- `app/more-projects/page.tsx`: shared portfolio link page (copied per repository, not a package).
