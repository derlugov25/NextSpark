import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Research & Market Intelligence | NextSpark Ventures",
  description: "Curated collection of cutting-edge AI research from leading venture capital firms. Access reports from Bessemer, A16z, Sequoia, Coatue covering AI investments, market trends, and strategic insights for 2025.",
  keywords: "AI research, venture capital reports, artificial intelligence investment, market intelligence, Bessemer, A16z, Sequoia Capital, Coatue",
  openGraph: {
    title: "AI Research & Market Intelligence | NextSpark Ventures",
    description: "Access cutting-edge AI research from top VC firms covering investments, market trends, and strategic insights for 2025.",
    type: "website",
  }
};

export default function ResearchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 