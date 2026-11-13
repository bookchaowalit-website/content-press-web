---
name: Press Room
description: A darkroom clipping desk for keeping local press notes easy to find.
---

# Design System: Press Room

## Overview

Press Room is a browser-local clipping desk. The left side is a darkroom index of mentions; the right is a paper work sheet for adding the next one. It feels like keeping proof on a contact sheet, while the no-CMS boundary stays as visible as the content.

## Colors

- **Charcoal** `#1b1d21`: darkroom and index ground.
- **Deep charcoal** `#141619`: quiet clip field.
- **Paper** `#f2eee2`: clipping sheet and form surface.
- **Red** `#d15b45`: clipping marks, add action, and status.
- **Blue** `#8fb4ba`: secondary press-room annotation.
- **Rule** `#555a5d`: contact-sheet structure.

Red belongs to an edit or a mark; blue is supporting annotation. Neither becomes a general gradient or decorative status color.

## Typography

Geist Sans gives the headline, clipping titles, and form labels a direct newsroom voice. Geist Mono is reserved for local counts, statuses, and boundary copy. Georgia italic makes the paper sheet feel like a note rather than a dashboard.

## Layout

The opening statement leads to a two-column clipping desk. Search and current mentions stay in the dark index; the paper side holds the add form and local-only explanation. At mobile the index precedes the form so the archive is still encountered before the next clipping is made.

## Elevation & Depth

Charcoal-to-paper contrast and hairline rules supply depth. The tilted stamp is a physical local mark. No shadows or card stacks compete with the working sheet.

## Shapes

The contact sheet and paper are square editorial surfaces. Inputs are underlined fields, not rounded boxes. Delete is a small text mark in the index, keeping destructive action legible without a bright button block.

## Components

- **Clip index:** search, count, authored mention rows, status/detail metadata, and delete action.
- **Clipping sheet:** title, details, status selector, add action, and boundary note.
- **Local state:** `press-v1` in browser storage; no upload or newsroom integration.

## Do's and Don'ts

- Do make a mention scannable in one index row.
- Do keep adding and deleting immediate and reversible through local state.
- Do label the demo boundary in the paper itself.
- Don't claim publication, upload, media distribution, or CMS sync.
- Don't turn press mentions into a generic rounded CRM card grid.


---

## Storybook

Storybook 10 (`@storybook/nextjs-vite`) shows this design system with the app's real CSS, tokens and fonts.

```bash
npm run storybook        # http://localhost:6006
npm run build-storybook  # static build in storybook-static/ (CI: .github/workflows/storybook.yml)
```

- **Foundations/Tokens** reads every CSS custom property the app defines at runtime, so it never drifts from the code.
- **Design/DESIGN.md** renders this file.
- **Components/**, **Sections/** and **Pages/** show the UI with mock data only (no network, analytics off).
- Toolbar: locale, theme (light / dark, when the app has a dark theme), viewports 320 / 375 / 768 / 1440. The a11y panel runs axe (WCAG 2.2 AA).
- Rule: a new shared component or page section ships with a story in `stories/`.
