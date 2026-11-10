import type { ReactNode } from "react";

/** External link: always a new tab, always `noopener noreferrer`. */
export default function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
