import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { 
  title: "NextSpark Ventures - Empowering AI Founders",
  description: "Seed / Pre-seed capital • Mentorship • Global network for AI founders",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.ico', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }
    ],
    shortcut: '/icon.ico',
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }
    ]
  },
  manifest: '/site.webmanifest'
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/icon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="theme-color" content="#A78BFA" />
      </head>
      <body className="bg-[#060817] text-white antialiased">{children}</body>
    </html>
  );
}
