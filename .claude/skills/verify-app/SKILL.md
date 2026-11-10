---
name: verify-app
description: Build, serve and drive the About-Me static site with a headless browser to prove a change works. Use after any UI/CSS/content change, or when asked to run, screenshot or verify the site.
---

# verify-app

The site is a static Next.js export (`out/`) with no backend. Verification =
build, serve `out/`, drive it with headless Chromium, keep screenshots.
All evidence goes to `.verify/` (git-ignored).

## Doctor (read-only)

```sh
node -v                                   # >= 20
test -d node_modules && echo deps-ok || echo "run npm install"
(curl -s -o /dev/null localhost:3000 && echo "PORT 3000 BUSY") || echo "port 3000 free"
test -d /tmp/verify-pw/node_modules/playwright && echo playwright-ok || echo "needs browser setup (below)"
```

Browser setup (once per machine; kept outside the repo so it is not a dependency):

```sh
mkdir -p /tmp/verify-pw && cd /tmp/verify-pw && npm init -y >/dev/null \
  && npm i playwright && npx playwright install chromium && npx playwright install-deps chromium
```
(`install-deps` needs sudo/apt; skip it if Chromium already launches.)

## Launch (from a clean state)

```sh
rm -rf out .next
npm run build                              # must exit 0 and create out/index.html
(setsid npm start >/tmp/verify-serve.log 2>&1 & echo $! > /tmp/verify-serve.pid)   # setsid: own process group
# ready means usable, not just listening:
for i in $(seq 30); do curl -sf localhost:3000/ | grep -q 'Islam Taha' && break; sleep 1; done
curl -s -o /dev/null -w '%{http_code}\n' localhost:3000/    # expect 200
```

## Drive + Evidence

```sh
node .claude/skills/verify-app/scripts/shoot.mjs [baseUrl]
```
Opens the page at 1440×900 and 390×844, and writes `.verify/desktop-first.png`,
`.verify/phone-first.png` and `.verify/report.json` (title, lang, `h1`, sidebar and
statusline visibility per viewport, tab hrefs, avatar box, terminal link hrefs,
horizontal overflow, console errors, phone-number scan). Look at the PNGs; compare against
the approved mockups. Expected: desktop avatar float at x=1104,y=66 size 296 wide; phone
avatar at x=36 about 150 wide, stacked above the text; `sidebarVisible` false and
`statuslineEncVisible` false on phone; `hasPhone` false; no console errors.

Real selectors: `nav.tabline a.tab` (href `#about`…`#contact`), `aside.sidebar .tree__item`,
`main#… section.buffer#about .row` (`.row--cursor` = line 1), `figure.float`, `.term a`,
`footer.statusline .sl`, `.msgline`.

Side effects: none (read-only site, no network calls except to localhost).

## Cleanup

Kill only what this skill started, keep `.verify/`:

```sh
kill -- "-$(cat /tmp/verify-serve.pid)" 2>/dev/null; rm -f /tmp/verify-serve.pid   # whole group, incl. serve child
```
(`npm start` runs `serve`; if a child outlives the pid, check `curl -s localhost:3000` and kill the leftover node process you started. Don't use `pkill -f` inside a command line that also contains the pattern: it kills your own shell.)

## Feature map

One file per user-facing feature in `features/`:

- `features/hero-avatar.md` — about.md buffer, cursorline, avatar float
- `features/terminal-contact.md` — terminal split and contact links
- `features/section-navigation.md` — tabline, file tree, anchors
- `features/responsive-layout.md` — mobile (<900px) behaviour
- `features/content-sections.md` — shipped/experience/skills/contact (added by the next ticket)
