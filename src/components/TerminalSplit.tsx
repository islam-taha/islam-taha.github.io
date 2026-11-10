const PROMPT = (
  <>
    <span className="term__path">~/islam-taha</span> on main <span className="term__chev">❯</span>
  </>
);

const CONTACT = [
  { key: "email", label: "islamtaha53@gmail.com", href: "mailto:islamtaha53@gmail.com" },
  { key: "linkedin", label: "linkedin.com/in/islamtaha53", href: "https://linkedin.com/in/islamtaha53" },
  { key: "github", label: "github.com/islam-taha", href: "https://github.com/islam-taha" },
];

export default function TerminalSplit() {
  return (
    <div className="term">
      <div className="term__bar">
        <span className="term__label">term://</span> ~/islam-taha//zsh
        <span className="term__close" aria-hidden="true">:q to close ✕</span>
      </div>
      <div className="term__body">
        <div>{PROMPT} whoami</div>
        <div>islam taha — staff software engineer · elixir, rails, llm agents</div>
        <div>{PROMPT} cat contact.md</div>
        {CONTACT.map((c) => (
          <div key={c.key}>
            <span className="term__key">{c.key}</span>
            <a href={c.href}>{c.label}</a>
          </div>
        ))}
        <div>
          {PROMPT} <span className="cursor" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
