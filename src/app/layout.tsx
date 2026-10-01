import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/dom/SmoothScroll";

export const metadata: Metadata = {
  title: "Hasan Emre Bircan — Portfolyo",
  description: "Hasan Emre Bircan'ın web projeleri, staj deneyimi, TEKNOFEST çalışmaları ve teknik gelişim portfolyosu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}
