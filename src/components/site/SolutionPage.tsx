import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { useI18n, localizedPath } from "@/lib/i18n";

import { Footer, Nav } from "./Landing";
import { solutionPages, type SolutionMarket } from "./solutionData";

export function SolutionPage({ market }: { market: SolutionMarket }) {
  const { locale } = useI18n();
  const page = solutionPages[market];
  const copy = page.copy[locale];
  const otherMarket = market === "egypt" ? "gcc" : "egypt";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <Nav surface="light" />
      <main>
        <header className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-6 md:pb-24 md:pt-40">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_75%_15%,rgba(115,136,223,0.18),transparent_45%)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-[clamp(3rem,6.2vw,6.25rem)] font-bold leading-[0.98] tracking-[-0.05em] text-balance">
              {copy.heading}
            </h1>
            <p className="mt-7 max-w-3xl text-[17px] leading-[1.75] text-[var(--muted-foreground)] md:text-[20px]">
              {copy.intro}
            </p>
          </div>
        </header>

        <section className="px-5 pb-20 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[1.75rem] bg-[#080b17] p-7 text-white sm:p-10 md:p-12">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {locale === "ar" ? "الإجابة المختصرة" : "The short answer"}
            </h2>
            <p className="mt-5 max-w-5xl font-display text-[clamp(1.5rem,2.7vw,2.65rem)] font-semibold leading-[1.3]">
              {copy.directAnswer}
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--hairline)] px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.04em]">
              {copy.servicesHeading}
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {copy.services.map((service, index) => (
                <div
                  key={service.title}
                  className="rounded-[1.5rem] bg-[var(--surface)] p-6 ring-1 ring-[var(--hairline)] sm:p-8"
                >
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-[1.55rem] font-semibold leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.75] text-[var(--muted-foreground)]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--hairline)] px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.04em]">
              {copy.questionsHeading}
            </h2>
            <div>
              {copy.questions.map((item) => (
                <section key={item.question} className="border-t border-[var(--hairline)] py-7">
                  <h3 className="font-display text-[1.35rem] font-semibold leading-snug">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[var(--muted-foreground)]">
                    {item.answer}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--hairline)] px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-tight">
                {copy.workHeading}
              </h2>
              <ul className="mt-7 space-y-3">
                {page.work.map((item) => (
                  <li key={item.href}>
                    <a
                      href={localizedPath(item.href, locale)}
                      className="flex items-center justify-between gap-4 rounded-xl bg-[var(--surface)] px-5 py-4 text-[15px] font-semibold ring-1 ring-[var(--hairline)] transition-colors hover:text-primary"
                    >
                      {item.label[locale]}
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-tight">
                {copy.sourcesHeading}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-[1.75] text-[var(--muted-foreground)]">
                {copy.sourcesNote}
              </p>
              <ul className="mt-7 space-y-3">
                {page.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary underline underline-offset-4"
                    >
                      {source.label[locale]}
                      <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-black px-5 py-20 text-white sm:px-6 md:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-3xl font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.04em]">
                {copy.nextHeading}
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/65">
                {copy.nextText}
              </p>
            </div>
            <a
              href={localizedPath("/contact", locale)}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition hover:bg-primary hover:text-white"
            >
              {copy.contactLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <a
            href={localizedPath(solutionPages[otherMarket].path, locale)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {copy.otherMarketLabel}
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
