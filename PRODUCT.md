# Press Room — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `press`, evidence Prototype) on 2026-10-23.

## What it is

A client-only list of press mentions ("clippings") over browser-local data, seeded with two sample mentions.

## Who it is for

A portfolio visitor who wants to see a small record-keeping desk for mentions and pitches.

## What works today

1. Add a mention (title required; an empty detail becomes "No detail added") with status Published, Pitch or Archive.
2. Search title, detail and status; delete a mention. The header and the stamp show the current clip count.
3. The list is saved in localStorage and survives a reload; broken stored data is ignored and the samples are shown.
4. `/api/mcp` answers JSON-RPC with `list_mentions` and `get_mention` over the two sample mentions (it cannot see
   mentions added in a browser).
5. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No downloadable media kit, media appearances with embeds, speaking topics or media contact form (claims removed
  from the portfolio card in the 2026-10 review).
- No upload, CMS, public feed, newsroom sync, editing, account or sync. No product analytics beyond Vercel Analytics.

## Known limits

- Two tabs: every add, remove and Undo reads the latest saved list and writes in one synchronous step, a change that
  alters nothing writes nothing, and a save in another tab shows here through the `storage` event. There is no
  cross-tab lock, so two tabs saving in the same instant can still lose one save (Codex report -93f29471aa).
- Undo when storage is full or blocked: the mentions come back on screen and a red note says they could not be saved
  and will be gone after a reload; there is no retry button (free up site storage and add them again).
- Undo after another tab removed the next mention: the restored one goes to the end of the list (A, B, C: remove A
  here, B there, Undo gives C, A). Multi-tab only (Codex report -ef0dd1221d, P3).
- Frozen 2026-11-20: later review findings are recorded here, not fixed.

## Live URL and deploy state

- Live: https://press.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-press-frontend` is deployed only by CLI (last production 2026-10-23, CLI deploy
  of commit 1042baa, the Next 16.4.2 security patch) and its Git link names the old repository
  `bookchaowalit/bookchaowalit-press-frontend`, so a push to `main` does not deploy. The live site lags `main`
  (no Sentry, template MCP route) until the owner reconnects Vercel Git to this repository (owner action D9).
  `NEXT_PUBLIC_SENTRY_DSN` is already set on the Vercel project (Sentry project `content-press-web`, org
  `personal-yu0`).

## Boundaries

- Browser-only apart from the stateless `/api/mcp` route.
