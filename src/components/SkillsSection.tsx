import { BufferRow } from "./Buffer";
import Winbar from "./Winbar";

const GROUPS: [string, string[]][] = [
  ["languages & frameworks", ["elixir", "phoenix", "ruby on rails", "node.js", "react", "typescript", "javascript", "java", "html"]],
  ["data", ["postgresql", "citus", "mysql", "mongodb", "neo4j", "redis"]],
  ["infra & tooling", ["aws", "terraform", "ansible", "nomad", "kubernetes", "docker", "gvisor", "git", "rest apis"]],
  ["ai", ["llm agents", "multi-agent orchestration", "mcp", "anthropic api", "openai api", "prompt caching", "context management"]],
  ["leadership", ["team leadership", "mentoring", "incident response"]],
];

export default function SkillsSection() {
  return (
    <section id="skills" className="buffer">
      <Winbar name="skills.health" filetype=":checkhealth skills" />
      <BufferRow as="h2" cursor>
        <span className="mk" aria-hidden="true">## </span>skills <span className="mk">— {GROUPS.length} checks</span>
      </BufferRow>
      <BufferRow />
      <ul className="list">
        {GROUPS.map(([label, items]) => (
          <BufferRow as="li" key={label} className="check">
            <span className="check__ok"><span aria-hidden="true">✔ </span>OK</span>{" "}
            <b className="check__label">{label}</b>
            <span className="check__items">
              {items.map((t) => (
                <code key={t}>{t}</code>
              ))}
            </span>
          </BufferRow>
        ))}
      </ul>
    </section>
  );
}
