import { ArrowRight, BookOpen, type LucideIcon } from "lucide-react";

import { BlurText } from "./BlurText";
import { Footer, Nav, Reveal } from "./Landing";
import { blogArticles, blogTopics, type BlogArticle } from "./blogData";

const featuredArticle = blogArticles[0];

function OperationsVisual({ article }: { article: BlogArticle }) {
  const Icon = article.icon;

  return (
    <div className="relative min-h-[25rem] overflow-hidden rounded-[1.5rem] bg-black text-white ring-1 ring-black/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(115,136,223,0.36),transparent_35%),linear-gradient(145deg,#151826,#030409)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative flex min-h-[25rem] flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-primary ring-1 ring-white/14">
            <Icon className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 ring-1 ring-white/12">
            {article.topic}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {article.signals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/12 backdrop-blur"
            >
              <div className="text-[11px] font-medium text-white/45">{signal.label}</div>
              <div className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em]">
                {signal.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArticleRow({ article, index }: { article: BlogArticle; index: number }) {
  const Icon = article.icon;

  return (
    <Reveal delay={index * 0.035}>
      <a
        href="/contact"
        className="group grid gap-5 border-t border-[var(--hairline)] py-7 transition-colors hover:bg-[var(--surface)]/48 active:bg-[var(--surface)] md:grid-cols-[0.22fr_0.5fr_0.28fr] md:px-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
            <Icon className="h-3.5 w-3.5 text-primary" />
            {article.topic}
          </div>
          <div className="mt-4 text-[12px] text-[var(--muted-foreground)]">
            {article.publishedAt} / {article.readTime}
          </div>
        </div>

        <div>
          <BlurText
            as="h2"
            text={article.title}
            className="font-display text-[clamp(1.7rem,3vw,3.15rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--ink)] text-balance"
          />
          <BlurText
            as="p"
            text={article.deck}
            delay={0.08}
            className="mt-4 max-w-2xl text-[14px] leading-[1.62] text-[var(--muted-foreground)] md:text-[15px]"
          />
        </div>

        <div className="flex flex-col justify-between gap-5 md:items-end">
          <div className="max-w-xs text-[13px] leading-[1.55] text-[var(--muted-foreground)] md:text-right">
            {article.operatingQuestion}
          </div>
          <span className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--ink)]">
            Discuss
            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

function TopicPill({ topic }: { topic: string }) {
  return (
    <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
      {topic}
    </span>
  );
}

function BriefingMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)]">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface)] text-primary ring-1 ring-[var(--hairline)]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="mt-6 text-[12px] font-medium text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
        {value}
      </div>
    </div>
  );
}

export function BlogPage() {
  const FeaturedIcon = featuredArticle.icon;
  const otherArticles = blogArticles.slice(1);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <Nav surface="light" />
      <main>
        <section className="relative overflow-hidden pt-28 md:pt-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_78%_8%,rgba(115,136,223,0.22),transparent_42%)]" />
          <div className="relative mx-auto max-w-[92rem] px-5 sm:px-6">
            <Reveal>
              <div className="max-w-5xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  Operations journal
                </div>
                <BlurText
                  as="h1"
                  text="Writing for operating systems."
                  className="mt-7 max-w-[68rem] font-display text-[clamp(3.1rem,6.2vw,5.9rem)] font-bold leading-[0.94] tracking-[-0.052em] text-balance"
                />
                <BlurText
                  as="p"
                  text="Practical essays on ERP, inventory, finance, warehouse, POS, CRM, and durable business software decisions."
                  delay={0.18}
                  className="mt-6 max-w-2xl text-[15px] leading-[1.66] text-[var(--muted-foreground)] md:text-[17px]"
                />
              </div>
            </Reveal>
          </div>
          <div className="pointer-events-none mt-10 overflow-hidden sm:mt-12">
            <div className="mx-auto max-w-[92rem] select-none px-5 text-left font-display text-[clamp(6rem,21vw,20rem)] font-bold leading-[0.72] tracking-[-0.075em] text-[var(--ink)]/[0.07] sm:px-6">
              Notes
            </div>
          </div>
        </section>

        <section className="relative pb-14 md:pb-20">
          <div className="mx-auto grid max-w-[92rem] gap-6 px-5 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-stretch">
            <Reveal>
              <OperationsVisual article={featuredArticle} />
            </Reveal>

            <Reveal delay={0.08}>
              <article className="flex h-full flex-col justify-between rounded-[1.5rem] bg-[var(--surface)] p-6 ring-1 ring-[var(--hairline)] sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--muted-foreground)]">
                    <FeaturedIcon className="h-4 w-4 text-primary" />
                    Featured briefing
                  </div>
                  <BlurText
                    as="h2"
                    text={featuredArticle.title}
                    className="mt-5 max-w-3xl font-display text-[clamp(2.25rem,4.8vw,4.7rem)] font-bold leading-[0.94] tracking-[-0.052em] text-balance"
                  />
                  <BlurText
                    as="p"
                    text={featuredArticle.deck}
                    delay={0.12}
                    className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-[var(--muted-foreground)]"
                  />
                </div>

                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {featuredArticle.signals.map((signal) => (
                    <BriefingMetric
                      key={signal.label}
                      icon={FeaturedIcon}
                      label={signal.label}
                      value={signal.value}
                    />
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
            <Reveal>
              <div className="mb-8 flex flex-col gap-5 border-t border-[var(--hairline)] pt-8">
                <BlurText
                  as="h2"
                  text="Reading list."
                  className="max-w-2xl font-display text-[clamp(2.1rem,4vw,4rem)] font-bold leading-[0.98] tracking-[-0.045em]"
                />
                <div className="flex flex-wrap gap-2">
                  {blogTopics.map((topic) => (
                    <TopicPill key={topic} topic={topic} />
                  ))}
                </div>
              </div>
            </Reveal>
            <div>
              {otherArticles.map((article, index) => (
                <ArticleRow key={article.slug} article={article} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white md:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <Reveal>
              <BlurText
                as="h2"
                text="Bring the workflow to the table."
                className="max-w-xl font-display text-[clamp(2.25rem,4.8vw,4.9rem)] font-bold leading-[0.94] tracking-[-0.04em] text-balance"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="lg:justify-self-end">
                <BlurText
                  as="p"
                  text="If an article sounds like your operating problem, send us the workflow and the systems around it."
                  delay={0.1}
                  className="max-w-xl text-[15px] leading-[1.65] text-white/62"
                />
                <a
                  href="/contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
