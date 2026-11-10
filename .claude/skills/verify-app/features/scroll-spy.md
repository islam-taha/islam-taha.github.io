# Scroll-aware chrome

`src/components/ScrollSpy.tsx` (the only client component) updates the server-rendered chrome.

- Drive: click each tab; scroll with the wheel; load with JS disabled.
- Expect: active tab (`.tab--active`, `aria-current=page`) and tree item match the section; statusline
  `file`, `ft` (`markdown`, `git log`, `checkhealth`) and `pos` (`Top`, `NN%`, `Bot`, then `1:1`) change;
  message line reads `"<file>" <N>L, <size>K`. A clicked link pins its section when the page is already
  at the bottom. With JS off the chrome stays on about.md and all links still work.
- Evidence: `report.json` `spy`, `noJs`.
