export type FileEntry = {
  name: string;
  href: string;
  /** Catppuccin colour token used for the tree icon. */
  icon: "blue" | "peach" | "green" | "pink";
};

/** Single source of truth for the tabline and the file tree. */
export const FILES: FileEntry[] = [
  { name: "about.md", href: "#about", icon: "blue" },
  { name: "shipped.md", href: "#shipped", icon: "blue" },
  { name: "experience.log", href: "#experience", icon: "peach" },
  { name: "skills.health", href: "#skills", icon: "green" },
  { name: "contact.md", href: "#contact", icon: "blue" },
  { name: "avatar.png", href: "#about", icon: "pink" },
];
