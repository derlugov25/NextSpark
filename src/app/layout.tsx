import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { 
  title: "NextSpark Ventures - Empowering AI Founders",
  description: "Seed / Pre-seed capital • Mentorship • Global network for AI founders",
  icons: {
    icon: '/favicon.svg?v=2',
    shortcut: '/favicon.ico'
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#060817] text-white antialiased">{children}</body>
    </html>
  );
}
