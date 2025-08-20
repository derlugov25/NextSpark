"use client";

import NextSparkLogo from "@/components/NextSparkLogo";
import SparkField from "@/components/SparkField";
import WorldMap from "@/components/WorldMap";
import { Download } from "lucide-react";

const BRAND = {
  name: "NextSpark Ventures",
  linkedin: "https://docs.google.com/forms/d/e/1FAIpQLSfCO3Pu9makDEDE1KB3oU0lTffTzTHQx7dKZ2K1rNwpPVblVA/viewform",
};

// Research data sourced from leading VC firms and industry reports
const RESEARCHES = [
  {
    id: 0,
    title: "Alpha for AI VCs: Why CIS-Rooted Founders Are More Likely to Win?",
    summary: "Alpha isn't a story—it's a system. CIS-rooted founders scale faster on the back of math-first training, OSS credibility, and tax-efficient hubs. We map the metrics, the hotspots, and the telltale signals (GitHub, ICPC, grant wins), then outline how to structure, hire, and price risk to consistently beat the market.",
    date: "2025-08-19",
    pdfUrl: "/CIS AI VS Alpha.pdf",
    tags: ["Alpha", "CIS", "Founders", "AI VCs", "Investment Strategy"]
  },
  {
    id: 1,
    title: "The State of AI 2025: Cloud AI Universe and Early Galaxies Formation",
    summary: "Bessemer Venture Partners' comprehensive analysis of AI industry evolution. Three years after the AI Big Bang, early galaxies are forming with new benchmarks for AI startups. Features analysis of AI Supernovas vs Shooting Stars, Q2T3 growth patterns, and roadmaps across Infrastructure, Developer Tools, Horizontal AI, and Vertical AI sectors.",
    date: "2025-08-14",
    pdfUrl: "https://nextbigteng.substack.com/p/the-state-of-ai-2025",
    tags: ["AI", "Venture Capital", "Bessemer", "Cloud"]
  },
  {
    id: 2,
    title: "AI Investment Surge to Record Heights: 2025 Global Analysis",
    summary: "AI investments have reached unprecedented levels in 2025, with global funding exceeding $100B - an 80% increase from 2023. This report analyzes the generative AI revolution, automation trends, government military AI spending, and identifies top industries driving growth including healthcare, autonomous vehicles, fintech, and cybersecurity.",
    date: "2025-03-15",
    pdfUrl: "https://vocal.media/journal/ai-investment-surges-to-new-heights-in-2025",
    tags: ["AI", "Investment", "Funding", "Global"]
  },
  {
    id: 3,
    title: "Andreessen Horowitz Leads 2024's AI-Driven Venture Funding Surge",
    summary: "A16z emerges as the most active post-seed investor with 100 funding rounds in 2024. Analysis of how AI investments drove venture capital growth, with Thrive Capital's major $10B+ investments in Databricks and OpenAI, and the concentration of capital in AI-focused companies reshaping the investment landscape.",
    date: "2025-01-10",
    pdfUrl: "https://opentools.ai/news/a16z-leads-the-charge-in-2024s-ai-driven-venture-funding-surge",
    tags: ["A16z", "Venture Capital", "AI", "Funding"]
  },
  {
    id: 4,
    title: "The Rise of AI Agents: Market Impact and Investment Strategy",
    summary: "StartFast Ventures explores the transformative impact of AI agents like Manus.im and OpenAI's Operator. Analysis covers automation of capital markets decision-making, productivity gains projected to add $15.7T to global GDP by 2030, and strategic portfolio positioning for the AI agent era including sector recommendations.",
    date: "2025-03-14",
    pdfUrl: "https://startfastventures.com/the-rise-of-ai-agents-impacts-on-markets-productivity-and-investment-strategy/",
    tags: ["AI Agents", "Investment Strategy", "Productivity", "GDP"]
  },
  {
    id: 5,
    title: "Generative AI Landscape Q4 2024: Historic Investment Highs",
    summary: "Scale Capital's analysis of Q4 2024 showing AI funding explosion with $100B+ invested globally. Covers billion-dollar rounds surge, OpenAI and Databricks $10B deals, xAI's $50B valuation, and geographic shifts with US capturing 57% of global investment driven by Silicon Valley AI boom.",
    date: "2025-01-15",
    pdfUrl: "https://www.scalecapital.com/stories/generative-ai-landscape-q4-2024-ai-investments-reach-historic-high",
    tags: ["Generative AI", "Q4 2024", "Scale Capital", "Investment"]
  },
  {
    id: 6,
    title: "AI Valuation Boom: Secondary Sales and Sector Maturation",
    summary: "Analysis of the AI sector's transition from speculation to mature ecosystem through secondary share sales. Covers OpenAI's $300B valuation trajectory, Mistral AI's European sovereignty strategy, and how secondary market activity reflects investor confidence shifts toward enterprise scalability and long-term value creation.",
    date: "2025-08-05",
    pdfUrl: "https://www.ainvest.com/news/ai-valuation-boom-secondary-sales-barometer-sector-maturation-investor-confidence-2508/",
    tags: ["AI Valuation", "Secondary Sales", "OpenAI", "Mistral"]
  },
  {
    id: 7,
    title: "AI in 2025: Sequoia Capital's Strategic Predictions",
    summary: "Sequoia Capital's forward-looking analysis identifying five dominant players in large language models: Microsoft/OpenAI, Amazon/Anthropic, Google, Meta, and xAI. Examines competitive advantages, vertical integration strategies, and the rise of AI search as a killer application with market consolidation trends.",
    date: "2025-01-03",
    pdfUrl: "https://medium.com/@lbq999/ai-in-2025-sequoia-capitals-predictions-95be4da4f139",
    tags: ["Sequoia Capital", "LLM", "Predictions", "Market"]
  },
  {
    id: 8,
    title: "Coatue Management AI Full Report: Investment Framework 2023-2025",
    summary: "Comprehensive 115-page report from Coatue Management analyzing the AI revolution from early days through 2025. Covers growth metrics, ecosystem expansion, financial results from AI companies, investment fund strategies, and expanding AI capabilities across industries with detailed market analysis.",
    date: "2024-11-15",
    pdfUrl: "https://www.scribd.com/document/686040849/Coatue-AI-Full-Report-Nov-2023-vF-2",
    tags: ["Coatue", "Investment Framework", "AI Revolution", "Comprehensive"]
  }
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function ResearchesPage() {
  // Sort researches by date in descending order (newest first)
  const sortedResearches = [...RESEARCHES].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="relative min-h-screen bg-[#060817] text-white antialiased">
      {/* Background */}
      <WorldMap />
      <SparkField />

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <a href="/">
            <NextSparkLogo size={65} />
          </a>
          <nav className="text-xs md:text-sm opacity-80">
            <a href="/" className="hover:opacity-100">Home</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-14 pb-10">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Research & 
              <span className="text-gradient"> Market Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-4">
              Curated collection of cutting-edge AI research from leading venture capital firms and industry analysts. 
              Access reports from Bessemer, A16z, Sequoia, Coatue, and other top-tier sources covering AI investments, market trends, and strategic insights for 2025.
            </p>
            <p className="text-sm text-white/60">
              Latest research first • Updated regularly
            </p>
          </div>
        </section>

        {/* Research Feed */}
        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="space-y-8">
              {sortedResearches.map((research) => (
                <article 
                  key={research.id}
                  className="glass p-6 md:p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {research.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
                        {research.title}
                      </h2>
                      
                      <p className="text-white/80 leading-relaxed mb-4">
                        {research.summary}
                      </p>
                      
                      <div className="text-sm text-white/60">
                        Published on {formatDate(research.date)}
                      </div>
                    </div>

                    <div className="lg:shrink-0">
                      <a
                        href={research.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        <Download size={20} />
                        <span>Read Report</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button (placeholder) */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-xl font-medium transition-all duration-300 hover:bg-white/5">
                Load More Research
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. Not an offer to sell
            securities.
          </div>
          <div className="flex items-center gap-6">
            <a
              href={BRAND.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white"
            >
              For Investors
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
} 