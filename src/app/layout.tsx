import type { Metadata, Viewport } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/400-italic.css";
import "./globals.css";
import Tabline from "@/components/Tabline";
import Sidebar from "@/components/Sidebar";
import Statusline from "@/components/Statusline";
import MessageLine from "@/components/MessageLine";
import ScrollSpy from "@/components/ScrollSpy";

export const metadata: Metadata = {
  title: "Islam Taha — Senior / Staff Software Engineer",
  description:
    "Islam Taha is a Senior / Staff Software Engineer in Cairo, Egypt, building products end to end with Elixir, Rails, Node, React and AWS.",
};

export const viewport: Viewport = {
  themeColor: "#1e1e2e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Tabline />
        <Sidebar />
        <main className="main">{children}</main>
        <Statusline />
        <MessageLine />
        <ScrollSpy />
      </body>
    </html>
  );
}
