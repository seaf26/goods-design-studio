import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

import { BlurText } from "./BlurText";
import { Footer, Nav, Reveal } from "./Landing";
import { blogArticles, type BlogArticle } from "./blogData";
import { PreferredSourceLink } from "./PreferredSourceLink";
import { useI18n } from "@/lib/i18n";
import { localizedPath } from "@/components/site/seo";

function localizeArticle(article: BlogArticle, t: (key: string) => string) {
  return {
    ...article,
    title: t(`blog.article.${article.slug}.title`),
    deck: t(`blog.article.${article.slug}.deck`),
    topic: t(`blog.article.${article.slug}.topic`),
    readTime: t(`blog.article.${article.slug}.readTime`),
    publishedAt: t(`blog.article.${article.slug}.publishedAt`),
    audience: t(`blog.article.${article.slug}.audience`),
    operatingQuestion: t(`blog.article.${article.slug}.question`),
    signals: article.signals.map((_, index) => ({
      label: t(`blog.article.${article.slug}.signal.${index}.label`),
      value: t(`blog.article.${article.slug}.signal.${index}.value`),
    })),
    sections: (article.detailSections ?? []).map((sectionKey) => ({
      title: t(`blog.article.${article.slug}.section.${sectionKey}.title`),
      text: t(`blog.article.${article.slug}.section.${sectionKey}.text`),
    })),
  };
}

export function BlogArticlePage({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const article = blogArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return null;
  }

  const localized = localizeArticle(article, t);
  const relatedArticles = blogArticles
    .filter((entry) => entry.slug !== article.slug && entry.detailSections?.length)
    .filter((entry) => entry.topic === article.topic)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <Nav surface="light" />
      <main>
        <article>
          <section className="relative overflow-hidden pt-28 md:pt-36">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_78%_8%,rgba(115,136,223,0.22),transparent_42%)]" />
            <div className="relative mx-auto max-w-[92rem] px-5 sm:px-6">
              <Reveal>
                <a
                  href={localizedPath("/blog", locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)] transition-colors hover:text-[var(--ink)]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t("blog.article.back")}
                </a>
                <div className="mt-10 max-w-5xl">
                  <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--muted-foreground)]">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {localized.topic}
                  </div>
                  <BlurText
                    as="h1"
                    text={localized.title}
                    className="mt-5 max-w-5xl font-display text-[clamp(2.9rem,6.2vw,5.9rem)] font-bold leading-[0.93] tracking-[-0.04em] text-balance"
                  />
                  <BlurText
                    as="p"
                    text={localized.deck}
                    delay={0.1}
                    className="mt-7 max-w-3xl text-[17px] leading-[1.68] text-[var(--muted-foreground)] md:text-[20px]"
                  />
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[var(--muted-foreground)]">
                    <span>{localized.publishedAt}</span>
                    <span>{localized.readTime}</span>
                    <span>{localized.audience}</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {article.directAnswer && (
            <section className="mx-auto max-w-[92rem] px-5 pt-10 sm:px-6">
              <div className="rounded-[1.5rem] border border-[var(--hairline)] bg-[var(--surface)] p-6 sm:p-8">
                <h2 className="font-display text-[clamp(1.5rem,2.7vw,2.5rem)] font-semibold leading-tight">
                  {t("blog.article.quickAnswer")}
                </h2>
                <p className="mt-4 max-w-4xl text-[16px] leading-[1.8] md:text-[18px]">
                  {article.directAnswer[locale]}
                </p>
                {article.evidence && article.evidence.length > 0 && (
                  <div className="mt-6 border-t border-[var(--hairline)] pt-5">
                    <h3 className="text-[13px] font-semibold">{t("blog.article.evidence")}</h3>
                    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {article.evidence.map((source) => (
                        <li key={source.href}>
                          <a
                            href={
                              source.href.startsWith("/")
                                ? localizedPath(source.href, locale)
                                : source.href
                            }
                            rel={source.href.startsWith("/") ? undefined : "noopener noreferrer"}
                            target={source.href.startsWith("/") ? undefined : "_blank"}
                            className="text-[13px] font-medium text-primary underline underline-offset-4"
                          >
                            {source.label[locale]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="mx-auto grid max-w-[92rem] gap-6 px-5 pb-16 pt-12 sm:px-6 md:pb-24 lg:grid-cols-[0.72fr_1.28fr] lg:pt-16">
            <Reveal>
              <aside className="rounded-[1.5rem] bg-black p-6 text-white sm:p-8 lg:sticky lg:top-8 lg:self-start">
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                  {t("blog.article.operatingQuestion")}
                </div>
                <p className="mt-5 font-display text-[clamp(1.7rem,3vw,2.65rem)] font-semibold leading-[1] tracking-[-0.04em]">
                  {localized.operatingQuestion}
                </p>
                <div className="mt-9 border-t border-white/15 pt-5">
                  <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
                    {t("blog.article.signals")}
                  </div>
                  <div className="mt-4 grid gap-3">
                    {localized.signals.map((signal) => (
                      <div key={signal.label} className="flex items-baseline justify-between gap-4">
                        <span className="text-[13px] text-white/55">{signal.label}</span>
                        <span className="text-right text-[14px] font-semibold">{signal.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </Reveal>

            <div>
              {localized.sections.map((section, index) => (
                <Reveal key={section.title} delay={index * 0.04}>
                  <section className="border-t border-[var(--hairline)] py-7 md:py-10">
                    <div className="font-mono text-[11px] text-[var(--muted-foreground)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <BlurText
                      as="h2"
                      text={section.title}
                      className="mt-3 max-w-3xl font-display text-[clamp(1.85rem,3.2vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
                    />
                    <p className="mt-5 max-w-3xl text-[16px] leading-[1.75] text-[var(--muted-foreground)] md:text-[17px]">
                      {section.text}
                    </p>
                  </section>
                </Reveal>
              ))}
            </div>
          </section>
        </article>

        {relatedArticles.length > 0 && (
          <section className="border-t border-[var(--hairline)] py-16 md:py-20">
            <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
              <Reveal>
                <div className="mb-7 flex items-end justify-between gap-5">
                  <BlurText
                    as="h2"
                    text={t("blog.article.related")}
                    className="font-display text-[clamp(2rem,3.8vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
                  />
                  <a
                    href={localizedPath("/blog", locale)}
                    className="hidden items-center gap-2 text-[13px] font-semibold text-[var(--muted-foreground)] transition-colors hover:text-[var(--ink)] sm:inline-flex"
                  >
                    {t("blog.readingList")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedArticles.map((entry, index) => (
                  <Reveal key={entry.slug} delay={index * 0.05}>
                    <a
                      href={localizedPath(`/blog/${entry.slug}`, locale)}
                      className="group flex h-full flex-col justify-between rounded-[1.25rem] bg-[var(--surface)] p-5 ring-1 ring-[var(--hairline)] transition-colors hover:bg-[var(--card)]"
                    >
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                          {t(`blog.article.${entry.slug}.topic`)}
                        </div>
                        <h3 className="mt-5 font-display text-[clamp(1.45rem,2.2vw,2.2rem)] font-semibold leading-[1] tracking-[-0.04em]">
                          {t(`blog.article.${entry.slug}.title`)}
                        </h3>
                      </div>
                      <span className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold">
                        {t("blog.discuss")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-black py-20 text-white md:py-24">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-7 px-5 sm:px-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <BlurText
                as="h2"
                text={t("blog.article.cta")}
                className="max-w-2xl font-display text-[clamp(2.25rem,4.8vw,4.9rem)] font-bold leading-[0.94] tracking-[-0.04em] text-balance"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={localizedPath("/contact", locale)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]"
              >
                {t("nav.startProject")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <PreferredSourceLink dark />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
