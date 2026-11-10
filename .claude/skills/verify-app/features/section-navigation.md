# Section navigation

- Drive: read `.tab` hrefs; click `.tab[href="#about"]`; focus a link with Tab and screenshot the ring.
- Expect: 5 tabs hrefs `#about #shipped #experience #skills #contact`, `about.md` has `aria-current="page"` and a 2px mauve top border; sidebar lists 6 files with `├─`/`└─`; every href resolves to a section id; focus ring is 2px mauve.
- Evidence: `report.json` `tabs`.
