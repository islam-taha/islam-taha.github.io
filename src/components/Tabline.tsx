import { FILES } from "./files";

const TABS = FILES.slice(0, 5);

export default function Tabline({ active = "about.md" }: { active?: string }) {
  return (
    <nav className="tabline" aria-label="Sections">
      <ul className="tabs">
        {TABS.map((f, i) => (
          <li key={f.name}>
            <a
              className={`tab${f.name === active ? " tab--active" : ""}`}
              data-file={f.name}
              href={f.href}
              aria-current={f.name === active ? "page" : undefined}
            >
              <span className="tab__num">{i + 1}</span> {f.name}
            </a>
          </li>
        ))}
      </ul>
      <span className="tabline__host">islam@cairo</span>
    </nav>
  );
}
