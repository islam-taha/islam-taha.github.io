export type FileEntry = {
  name: string;
  href: string;
  /** Catppuccin colour token used for the tree icon. */
  icon: "blue" | "peach" | "green" | "pink";
  /** Statusline filetype chip. Present only for entries that are real sections (scroll-spied). */
  filetype?: string;
};

/** Single source of truth for the tabline, the file tree and the scroll-aware chrome. */
export const FILES: FileEntry[] = [
  { name: "about.md", href: "#about", icon: "blue", filetype: "markdown" },
  { name: "shipped.md", href: "#shipped", icon: "blue", filetype: "markdown" },
  { name: "experience.log", href: "#experience", icon: "peach", filetype: "git log" },
  { name: "skills.health", href: "#skills", icon: "green", filetype: "checkhealth" },
  { name: "contact.md", href: "#contact", icon: "blue", filetype: "markdown" },
  { name: "avatar.png", href: "#about", icon: "pink" },
];
