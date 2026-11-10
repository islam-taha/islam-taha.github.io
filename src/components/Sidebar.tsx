import { FILES } from "./files";

export default function Sidebar({ active = "about.md" }: { active?: string }) {
  return (
    <aside className="sidebar" aria-label="File tree">
      <p className="tree__root">
        <span className="tree__caret" aria-hidden="true">▾ </span>
        <span className="tree__dir">~/islam-taha</span>/
      </p>
      <ul className="tree">
        {FILES.map((f, i) => (
          <li key={f.name}>
            <a className={`tree__item${f.name === active ? " tree__item--active" : ""}`} href={f.href}>
              <span className="tree__conn" aria-hidden="true">{i === FILES.length - 1 ? "└─" : "├─"}</span>
              <span className={`tree__icon tree__icon--${f.icon}`} aria-hidden="true" />
              {f.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="tree__hint">
        6 files · 0 dirs
        <br />
        scroll, or click a file to jump
      </p>
    </aside>
  );
}
