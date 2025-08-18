"use client";

import NextSparkLogo from "@/components/NextSparkLogo";
import SparkField from "@/components/SparkField";
import WorldMap from "@/components/WorldMap";


const BRAND = {
  name: "NextSpark Ventures",
  thesis:
    "Empowering AI Founders to Transform Emerging Markets",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScdKYAWVVYqXMJpopcWuiBReobFoHILWRHomsLLWMh8lK5-zA/viewform",
  email: "contact@nextspark.vc",
  linkedin: "https://docs.google.com/forms/d/e/1FAIpQLSfCO3Pu9makDEDE1KB3oU0lTffTzTHQx7dKZ2K1rNwpPVblVA/viewform",
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#060817] text-white antialiased">
      {/* новый динамичный фон */}
      <WorldMap />    {/* карта (контур материков + контуры регионов) */}
      <SparkField />  {/* искры с шлейфами, не затемняют карту */}

      {/* Header с логотипом */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <NextSparkLogo size={65} />
          <nav className="text-xs md:text-sm opacity-80">
            <a href="/researches" className="hover:opacity-100 mr-6">Researches</a>
            <a href="#apply" className="hover:opacity-100">Apply</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="pt-14 pb-10">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              {BRAND.thesis}
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/70">
              Seed / Pre-seed capital • Mentorship • Global network
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="apply" className="py-6">
          <div className="mx-auto max-w-3xl px-4">
            <a
              href={BRAND.formUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group block rounded-3xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition shadow-2xl"
            >
              <div className="p-6 md:p-10">
                <div className="text-left md:text-center">
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    Submit your pitch
                  </div>
                  <div className="mt-2 text-2xl md:text-4xl font-semibold">
                    Join Next Unicorn Spark
                  </div>
                  <div className="mt-4 md:mt-6">
                    <div className="mx-auto w-full md:w-3/4">
                      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-black/30 px-4 py-4 md:px-6 md:py-5">
                        <div className="h-3 w-3 rounded-full bg-emerald-400/90 shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
                        <span className="flex-1 text-left text-white/70 text-sm md:text-base">
                          Talk to our Board — click to open and submit your
                          deck
                        </span>
                        <span className="shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-3 py-2 text-xs md:text-sm font-medium">
                          Open ↗
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-xs md:text-sm text-white/60">
                    We review seed / pre-seed AI applications on a rolling
                    basis.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Short info */}
        <section className="py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm uppercase tracking-wider text-white/60">
                  Stages
                </div>
                <div className="mt-2 font-medium">Pre-seed / Seed</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-white/60">
                  Focus
                </div>
                <div className="mt-2 font-medium">Consumer AI & AI apps</div>
              </div>
              <div>
                <div className="text-sm uppercase tracking-wider text-white/60">
                  Regions
                </div>
                <div className="mt-2 font-medium">MENA, Africa, CIS, SEA</div>
              </div>
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
            <a href={`mailto:${BRAND.email}`} className="hover:text-white">
              {BRAND.email}
            </a>
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
