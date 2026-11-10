"use client";

import { useEffect } from "react";
import { FILES } from "./files";

/**
 * Renders nothing. Watches which section is in view and updates the
 * server-rendered chrome in place (tab, tree item, statusline, message line).
 * Without JS the chrome simply stays on about.md and every link still works.
 */
export default function ScrollSpy() {
  useEffect(() => {
    const sections = FILES.filter((f) => f.filetype).map((f) => ({
      file: f,
      el: document.getElementById(f.href.slice(1)),
    }));
    const els = sections.flatMap((s) => (s.el ? [s.el] : []));
    const inBand = new Set<string>();
    let active = "";
    // Short last sections can't reach the top of the viewport, so a clicked link
    // pins its section until the reader scrolls on their own.
    let pinned = "";

    const q = (sel: string) => document.querySelector<HTMLElement>(sel);

    const setActive = (name: string) => {
      const s = sections.find((x) => x.file.name === name);
      if (!s || !s.el) return;
      if (name !== active) {
        active = name;
        document.querySelectorAll<HTMLElement>("[data-file]").forEach((a) => {
          const on = a.dataset.file === name;
          if (a.classList.contains("tab")) {
            a.classList.toggle("tab--active", on);
            if (on) a.setAttribute("aria-current", "page");
            else a.removeAttribute("aria-current");
          } else {
            a.classList.toggle("tree__item--active", on);
          }
        });
        const file = q("[data-sl=file]");
        if (file) file.textContent = `${name} [+]`;
        const ft = q("[data-sl=ft]");
        if (ft) ft.textContent = s.file.filetype ?? "";
        const rows = s.el.querySelectorAll(".row").length;
        const kb = ((s.el.textContent ?? "").length / 1024).toFixed(1);
        const msg = q("[data-msgline]");
        if (msg) msg.textContent = `"${name}" ${rows}L, ${kb}K`;
      }
      updatePos();
    };

    const updatePos = () => {
      const pos = q("[data-sl=pos]");
      if (!pos) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const where = y <= 1 ? "Top" : y >= max - 1 ? "Bot" : `${Math.round((y / max) * 100)}%`;
      pos.textContent = `${where} 1:1`;
    };

    const pick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY <= 1) return setActive(sections[0].file.name);
      if (window.scrollY >= max - 1) {
        const pin = sections.find((s) => s.el?.id === pinned);
        return setActive((pin ?? sections[sections.length - 1]).file.name);
      }
      const hit = [...sections].reverse().find((s) => s.el && inBand.has(s.el.id));
      if (hit) setActive(hit.file.name);
      else updatePos();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        pick();
      },
      // A thin band 30% from the top of the viewport decides the active section.
      { rootMargin: "-30% 0px -69% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pick);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (!a) return;
      pinned = a.getAttribute("href")!.slice(1);
      onScroll(); // the page may already be at the bottom, so no scroll event will follow

    };
    const unpin = () => {
      pinned = "";
    };
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", unpin, { passive: true });
    window.addEventListener("touchmove", unpin, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    pick();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", unpin);
      window.removeEventListener("touchmove", unpin);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
