# Content sections

`#shipped`, `#experience`, `#skills`, `#contact` are siblings of `#about` in `<main>`, each a
`section.buffer` with a `.winbar` and line numbers that restart at 1 (row 1 is `.row--cursor`).

- Drive: `shoot.mjs`, then view `desktop-shipped.png` … `desktop-contact.png` and the phone set.
- Expect: shipped has 6 `details.fold`, Flowdia and Accredible open, the rest folded with a dim
  `+-- N lines: …` row; Enter/Space on a focused `summary` toggles it. Experience has 11 log rows
  (reverse-chronological) plus 2 `tag` rows. Skills has 5 `✔ OK` rows. Contact has email, linkedin,
  github, location, status; mailto + external links (`target=_blank`, `rel="noopener noreferrer"`).
- Phone: dates sit under the heading, chips wrap, log dates stack above the role, no sideways scroll.
- Must always hold: the phone number appears nowhere (`hasPhone` false).
