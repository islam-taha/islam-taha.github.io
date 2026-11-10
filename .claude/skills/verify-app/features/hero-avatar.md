# Hero and avatar

- Drive: load `/`; read `h1` text and `figure.float img`.
- Expect: `h1` text `# Islam Taha` (`#` is `aria-hidden`); 12 `.row` elements in `#about` text column; row 1 has `.row--cursor` (peach bold number from `::before`); gutter numbers absent from `document.body.innerText`; `/avatar.png` loads (naturalWidth > 0) on the `#efe5d3` card; caption `Cairo, Egypt` / `● remote / relocation` (desktop).
- Evidence: `desktop-first.png`, `report.json` `avatarBox` and `gutterIsDomText: false`.
