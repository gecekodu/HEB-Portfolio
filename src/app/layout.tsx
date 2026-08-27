import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/dom/SmoothScroll";

export const metadata: Metadata = {
  title: "Hasan Emre Bircan — Portfolyo",
  description: "Hasan Emre Bircan'ın yazılım, web projeleri, deneyim ve sertifika portfolyosu.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}
