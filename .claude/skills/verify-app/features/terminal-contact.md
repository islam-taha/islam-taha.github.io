# Terminal contact block

- Drive: `page.locator('.term a')` hrefs.
- Expect: `mailto:islamtaha53@gmail.com`, `https://linkedin.com/in/islamtaha53`, `https://github.com/islam-taha`; blinking `.cursor` (animation `none` under `prefers-reduced-motion: reduce`: `page.emulateMedia({reducedMotion:'reduce'})` then `getComputedStyle(.cursor).animationName`); `.term__close` is `aria-hidden`; no phone number anywhere (`report.json` `hasPhone: false`; `! grep -rEn '\+?[0-9][0-9 ()-]{9,}' out/index.html`).
