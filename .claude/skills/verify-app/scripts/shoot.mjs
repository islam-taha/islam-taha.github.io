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

const SECTIONS = ["about", "shipped", "experience", "skills", "contact"];
const VIEWPORTS = [
  ["phone", { width: 390, height: 844 }],
  ["tablet", { width: 768, height: 1024 }],
  ["laptop", { width: 1024, height: 768 }],
  ["desktop", { width: 1440, height: 900 }],
  ["wide", { width: 1920, height: 1080 }],
];

const chrome = () => ({
  tab: document.querySelector(".tab--active")?.textContent.trim(),
  ariaCurrent: document.querySelector(".tab[aria-current=page]")?.getAttribute("href"),
  tree: document.querySelector(".tree__item--active")?.textContent.trim(),
  file: document.querySelector("[data-sl=file]")?.textContent,
  ft: document.querySelector("[data-sl=ft]")?.textContent,
  pos: document.querySelector("[data-sl=pos]")?.textContent,
  msg: document.querySelector("[data-msgline]")?.textContent,
});

const browser = await chromium.launch();
const report = {};
for (const [name, viewport] of VIEWPORTS) {
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
    const text = document.body.innerText;
    return {
      title: document.title,
      h1Count: document.querySelectorAll("h1").length,
      h2: [...document.querySelectorAll("h2")].map((h) => h.textContent.trim()),
      ids: ["about", "shipped", "experience", "skills", "contact"].map((id) => !!document.getElementById(id)),
      sidebarVisible: vis("aside.sidebar"),
      tabs: [...document.querySelectorAll(".tab")].map((a) => a.getAttribute("href")),
      openFolds: [...document.querySelectorAll("details.fold")].map((d) => d.open),
      externalLinksOk: [...document.querySelectorAll("a[target=_blank]")].every((a) => a.rel === "noopener noreferrer"),
      hasPhone: /\+?\d[\d ()-]{9,}/.test(
        text.replace(/\d{2}\/\d{4}/g, "").replace(/\d+L, [\d.]+K/g, "").replace(/\d{4}/g, ""),
      ),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  report[name] = { ...facts, consoleErrors: errors };

  // Scroll-spy: click each tab, record what the chrome says.
  if (name === "desktop" || name === "phone") {
    report[name].spy = {};
    for (const id of SECTIONS) {
      await page.click(`.tab[href="#${id}"]`); // real click: smooth scroll, then the chrome must follow
      await page.waitForTimeout(1200);
      report[name].spy[id] = await page.evaluate(chrome);
      await page.screenshot({ path: path.join(out, `${name}-${id}.png`) });
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(250);
    report[name].spy.top = await page.evaluate(chrome);
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
    await page.waitForTimeout(250);
    report[name].spy.bottom = await page.evaluate(chrome);
    // Fold toggle by keyboard
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const bardy = page.locator("details.fold", { hasText: "Bardy" }).locator("summary");
    await bardy.focus();
    await page.keyboard.press("Enter");
    report[name].bardyOpenAfterEnter = await page.evaluate(
      () => [...document.querySelectorAll("details.fold")][2].open,
    );
    await page.keyboard.press("Enter");
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: path.join(out, `${name}-first.png`) });
  if (name === "wide" || name === "tablet" || name === "laptop") {
    await page.screenshot({ path: path.join(out, `${name}-full.png`), fullPage: true });
  }
  await page.close();
}

// JS disabled: everything must still be readable and the anchors must exist.
const nojs = await browser.newPage({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
await nojs.goto(base);
report.noJs = await nojs.evaluate(() => ({
  sections: ["about", "shipped", "experience", "skills", "contact"].map((id) => !!document.getElementById(id)),
  text: ["Flowdia", "Accredible", "Benha University", "checkhealth", "islamtaha53@gmail.com"].map((t) =>
    document.body.textContent.includes(t),
  ),
}));
await nojs.close();
await browser.close();
writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
