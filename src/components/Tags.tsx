/** Tech tags as green inline-code chips, one buffer row. */
export default function Tags({ items, label }: { items: string[]; label?: string }) {
  return (
    <li className="row tags">
      {label ? <span className="tags__label">{label}</span> : null}
      {items.map((t) => (
        <code key={t}>{t}</code>
      ))}
    </li>
  );
}
