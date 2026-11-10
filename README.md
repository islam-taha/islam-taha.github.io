# About-Me

Islam Taha's personal site — a terminal / Neovim-styled "About Me" page.
Static Next.js export (App Router, TypeScript, plain CSS, Catppuccin Mocha,
JetBrains Mono). No database, no env vars, no keys.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm start          # serve out/ locally
npm run lint && npm run typecheck
```

Deploy `out/` anywhere static: Vercel (build command `npm run build`, output
`out`) or GitHub Pages (`public/.nojekyll` is included). Replace
`public/avatar.png` to swap the portrait.

See [AGENTS.md](AGENTS.md) for conventions. Created with [Fredrin](https://fredrin.com).

![desktop](docs/screenshots/desktop-first.png)
