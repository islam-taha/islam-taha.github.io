import type { ReactNode } from "react";

/**
 * A line-numbered buffer. Line numbers come from a CSS counter (see
 * `.buffer` / `.row::before` in globals.css), so they are not in the DOM text.
 * Every <BufferRow> inside increments the counter; the counter restarts per Buffer.
 */
export function Buffer({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="buffer">
      {children}
    </section>
  );
}

type RowTag = "div" | "p" | "li" | "h1" | "h2" | "h3" | "blockquote";

/** One numbered line. Long content wraps; the number shows on the first visual line only. */
export function BufferRow({
  as: Tag = "div",
  cursor = false,
  className,
  children,
}: {
  as?: RowTag;
  /** Marks the cursorline (highlighted row, peach number). */
  cursor?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const cls = ["row", cursor ? "row--cursor" : "", className ?? ""].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
