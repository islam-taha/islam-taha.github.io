/** Per-buffer header: `name  filetype ────────`. Used by every section after the first screen. */
export default function Winbar({ name, filetype }: { name: string; filetype: string }) {
  return (
    <div className="winbar">
      <span className="winbar__name">{name}</span>
      <span className="winbar__ft">{filetype}</span>
      <span className="winbar__rule" aria-hidden="true" />
    </div>
  );
}
