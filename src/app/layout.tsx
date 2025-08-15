import type { Metadata, Viewport } from "next";
import "./globals.css";


export const metadata: Metadata = { title: "NextSpark VC" };
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
