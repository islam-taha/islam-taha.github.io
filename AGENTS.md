# AGENTS.md

Conventions for AI coding agents working in **About-Me**. This file is the
canonical entry point under the [AGENTS.md](https://agents.md) standard.

## Project

Personal "About Me" site for Islam Taha (Senior / Staff Software Engineer, Cairo),
styled as a terminal / Neovim session in Catppuccin Mocha. A static Next.js
(App Router, TypeScript) export: no database, no env vars, no API keys, no
client-side JS needed. Deployable on Vercel or GitHub Pages (`public/.nojekyll`).

## Commands

| command | what it does |
|---|---|
| `npm install` | install dependencies |
| `npm run dev` | dev server on http://localhost:3000 |
| `npm run build` | static export to `out/` |
| `npm start` | serve `out/` on http://localhost:3000 (build first) |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | `tsc --noEmit` |

To see a change working in a browser, use the project skill
`.claude/skills/verify-app/SKILL.md` (build, serve, headless screenshots).

## Conventions

- Plain CSS only: one stylesheet, `src/app/globals.css`, driven by Catppuccin CSS
  variables. No Tailwind, no UI kit. Font is self-hosted via `@fontsource/jetbrains-mono`.
- Page content is a stack of line-numbered buffers. Build each section with
  `<Buffer id>` + `<BufferRow>` (`src/components/Buffer.tsx`) and a `<Winbar>`
  header (`Winbar.tsx`); sections are siblings inside `<main>` in `src/app/page.tsx`.
  Line numbers come from a CSS counter, never from DOM text.
- Everything is server-rendered real text; don't add keyboard handlers or typed
  commands. The blinking cursor is the only motion and must respect `prefers-reduced-motion`.
- Tabline and file tree share `src/components/files.ts`; add a section there too.
- **Never put the phone number anywhere** in source or output.
- Swap the portrait by replacing `public/avatar.png` (it sits on a cream card with `mix-blend-mode: multiply`).
- Keep `output: 'export'` and `images.unoptimized`; no server features (route handlers, `next/image` optimisation).
