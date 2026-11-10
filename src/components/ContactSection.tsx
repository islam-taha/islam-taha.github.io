import { BufferRow } from "./Buffer";
import Winbar from "./Winbar";
import ExtLink from "./ExtLink";

export default function ContactSection() {
  return (
    <section id="contact" className="buffer">
      <Winbar name="contact.md" filetype="markdown" />
      <BufferRow as="h2" cursor>
        <span className="mk" aria-hidden="true">## </span>contact
      </BufferRow>
      <BufferRow />
      <ul className="list">
        <BufferRow as="li">
          <span className="bullet" aria-hidden="true">- </span>
          <span className="kv__key">email</span>
          <a href="mailto:islamtaha53@gmail.com">islamtaha53@gmail.com</a>
        </BufferRow>
        <BufferRow as="li">
          <span className="bullet" aria-hidden="true">- </span>
          <span className="kv__key">linkedin</span>
          <ExtLink href="https://linkedin.com/in/islamtaha53">linkedin.com/in/islamtaha53</ExtLink>
        </BufferRow>
        <BufferRow as="li">
          <span className="bullet" aria-hidden="true">- </span>
          <span className="kv__key">github</span>
          <ExtLink href="https://github.com/islam-taha">github.com/islam-taha</ExtLink>
        </BufferRow>
        <BufferRow as="li">
          <span className="bullet" aria-hidden="true">- </span>
          <span className="kv__key">location</span>Cairo, Egypt
        </BufferRow>
        <BufferRow as="li">
          <span className="bullet" aria-hidden="true">- </span>
          <span className="kv__key">status</span>
          <span className="virt">● open to remote or relocation</span>
        </BufferRow>
      </ul>
    </section>
  );
}
