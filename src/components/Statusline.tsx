export default function Statusline() {
  return (
    <footer className="statusline">
      <span className="sl sl--mode">NORMAL</span>
      <span className="sl sl--branch">⎇ main</span>
      <span className="sl sl--file">about.md [+]</span>
      <span className="sl__spacer" />
      <span className="sl sl--enc">utf-8</span>
      <span className="sl sl--ft">markdown</span>
      <span className="sl sl--pos">Top 1:1</span>
    </footer>
  );
}
