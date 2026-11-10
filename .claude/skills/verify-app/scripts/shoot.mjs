// Drive the served site with headless Chromium and write evidence to .verify/.
// Usage: node shoot.mjs [baseUrl]   (default http://localhost:3000)
// Playwright is resolved from $PLAYWRIGHT_DIR (default /tmp/verify-pw) so it is not a repo dependency.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const pwDir = process.env.PLAYWRIGHT_DIR ?? "/tmp/verify-pw";
const { chromium } = createRequire(path.join(pwDir, "x.js"))("playwright");
const out = path.resolve(".verify");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const report = {};
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["phone", { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(base, { waitUntil: "networkidle" });
  const facts = await page.evaluate(() => {
    const vis = (sel) => {
      const el = document.querySelector(sel);
      return !!el && getComputedStyle(el).display !== "none";
    };
    const box = (sel) => document.querySelector(sel)?.getBoundingClientRect().toJSON();
    return {
      title: document.title,
      lang: document.documentElement.lang,
      h1: document.querySelector("h1")?.textContent,
      sidebarVisible: vis("aside.sidebar"),
      hasNavMainAside: !!(document.querySelector("nav") && document.querySelector("main") && document.querySelector("aside")),
      tabs: [...document.querySelectorAll(".tab")].map((a) => a.getAttribute("href")),
      statuslineEncVisible: vis(".sl--enc"),
      avatarBox: box(".float"),
      gutterIsDomText: document.body.innerText.includes("12\n"),
      hasPhone: /\+?\d[\d ()-]{9,}/.test(document.body.innerText.replace(/12L, 0\.9K/, "")),
      links: [...document.querySelectorAll(".term a")].map((a) => a.href),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  await page.screenshot({ path: path.join(out, `${name}-first.png`) });
  report[name] = { ...facts, consoleErrors: errors };
  await page.close();
}
await browser.close();
writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
