import { Buffer, BufferRow } from "./Buffer";
import AvatarFloat from "./AvatarFloat";
import TerminalSplit from "./TerminalSplit";

export default function AboutSection() {
  return (
    <Buffer id="about">
      <div className="hero">
        <div className="hero__text">
          <BufferRow as="h1" cursor>
            <span className="mk" aria-hidden="true"># </span>Islam Taha
          </BufferRow>
          <BufferRow />
          <BufferRow as="blockquote" className="quote">
            <span className="mk" aria-hidden="true">&gt; </span>Senior / Staff Software Engineer · Cairo, Egypt
          </BufferRow>
          <BufferRow />
          <BufferRow as="p">
            <b>11+ years</b> building products end to end with Elixir, Rails, Node, React/TypeScript and AWS.
          </BufferRow>
          <BufferRow />
          <BufferRow as="h2">
            <span className="mk" aria-hidden="true">## </span>lately
          </BufferRow>
          <BufferRow />
          <ul className="list">
            <BufferRow as="li">
              <span className="bullet" aria-hidden="true">- </span>Built a <b>10-agent LLM pipeline</b> in production on Elixir/Phoenix: one
              prompt in, a full-stack app out, each with its own <code>MCP</code> server.
            </BufferRow>
            <BufferRow as="li">
              <span className="bullet" aria-hidden="true">- </span>At Accredible, went <b>Senior → Staff</b>, led an analytics team of 5–6,
              redesigned the billing core and rebuilt analytics for <b>40M+ requests a week</b>.
            </BufferRow>
          </ul>
          <BufferRow />
          <BufferRow as="p" className="virt">
            ● open to remote or relocation
          </BufferRow>
        </div>
        <AvatarFloat />
      </div>
      <TerminalSplit />
    </Buffer>
  );
}
