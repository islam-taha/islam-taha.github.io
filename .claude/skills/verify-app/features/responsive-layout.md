# Responsive layout

- Drive: viewports 1440×900 and 390×844 (shoot.mjs does both); optionally 899/900 px edge.
- Expect (<900px): sidebar hidden, tabline scrolls sideways, `utf-8`/`markdown` statusline segments and `islam@cairo` hidden, gutter 36px, avatar float ~150px stacked above text, no horizontal page overflow (`report.json` `horizontalOverflow: false`). From 900px: sidebar 252px, gutter 52px, avatar 296px on the right.
- Evidence: `phone-first.png` vs the phone mockup.
