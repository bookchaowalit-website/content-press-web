# Design

Since 2026-11-19 Press Room uses the shared App shell (see `APP-SHELL.md`), not the Reader shell: it is
an interactive tool (add, search, remove), not a reading site. Geist via `next/font`, `--as-*` tokens in
`app/app-shell.css` (light and dark, WCAG 2.2 AA, placeholders included), 44px controls, a 3px focus
ring and a forced-colors fallback. The paper-desk look (10px mono labels, 7px stamp on phones, a 25px
× delete with no undo, hard-coded colours) is retired.

- Sidebar lists (All / Published / Pitch / Archive) with counts; on phones a row of pills above the list.
- Head: list title, count, search and the one filled button, New mention, so adding is in the first view.
- Composer opens in place, focuses Title, Add stays disabled until there is a title.
- Rows: title, one line of detail (Show more for long ones), a status pill (text + tint), Remove; a
  toast offers Undo for six seconds.
- The note under the list says the data stays in this browser and that the two starting entries are
  examples; the footer links back to bookchaowalit.com.
