import { ArrowLeft, ArrowRight, Check, ExternalLink, Layers3, LineChart, TimerReset } from "lucide-react";

import { Footer, Nav, Reveal } from "./Landing";
import { WorkVisual } from "./WorkPage";
import { getWorkItem, workItems, type WorkItem } from "./workData";

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-3 font-display text-[clamp(1.65rem,3vw,2.6rem)] font-bold leading-none tracking-[-0.045em] text-[var(--ink)]">{value}</div>
    </div>
  );
}

function NarrativeBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-t border-[var(--hairline)] py-8 md:grid md:grid-cols-[0.34fr_0.66fr] md:gap-10">
      <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--ink)]">{title}</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-[1.75] text-[var(--muted-foreground)] md:mt-0 md:text-[17px]">{text}</p>
    </div>
  );
}

function DetailSection({ section, index }: { section: { title: string; text: string }; index: number }) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="border-t border-[var(--hairline)] py-8 md:grid md:grid-cols-[0.32fr_0.68fr] md:gap-10">
        <div>
          <div className="font-mono text-[11px] text-[var(--muted-foreground)]">{String(index + 1).padStart(2, "0")}</div>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,3rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--ink)]">
            {section.title}
          </h2>
        </div>
        <p className="mt-4 max-w-4xl text-[15px] leading-[1.75] text-[var(--muted-foreground)] md:mt-0 md:text-[16px]">{section.text}</p>
      </div>
    </Reveal>
  );
}

function ModuleCard({ module, index }: { module: string; index: number }) {
  return (
    <Reveal delay={index * 0.035}>
      <div className="group flex min-h-32 flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_22px_70px_-46px_rgba(0,0,0,0.48)] active:scale-[0.99] motion-reduce:transition-none">
        <div className="flex items-center justify-between gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--surface)] text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
            <Layers3 className="h-4 w-4" />
          </span>
          <span className="font-mono text-[11px] text-[var(--muted-foreground)]">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="mt-8 font-display text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">{module}</div>
      </div>
    </Reveal>
  );
}

function RelatedProject({ item }: { item: WorkItem }) {
  const eyebrow = item.client === item.title ? item.type : item.client;

  return (
    <a
      href={`/work/${item.slug}`}
      className="group flex items-center justify-between gap-5 border-t border-white/12 py-5 text-white transition-colors hover:text-primary"
    >
      <span>
        <span className="block text-[13px] text-white/45">{eyebrow}</span>
        <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.04em]">{item.title}</span>
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
    </a>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const project = getWorkItem(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
        <Nav surface="light" />
        <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-28">
          <a href="/work" className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--ink)]">
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </a>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.055em] text-balance">Project not found.</h1>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-[var(--muted-foreground)]">
            This case study is not available. The work index has the current project list.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = project.icon;
  const related = workItems.filter((item) => item.slug !== project.slug).slice(0, 3);
  const eyebrow = project.client === project.title ? project.type : project.client;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <Nav surface="light" />
      <main>
        <section className="relative overflow-hidden pt-28 md:pt-32">
          <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
            <Reveal>
              <a href="/work" className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)] transition-colors hover:text-[var(--ink)]">
                <ArrowLeft className="h-3.5 w-3.5" />
                Work
              </a>
              <div className="mt-8 grid gap-8 lg:grid-cols-[0.96fr_0.74fr] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--muted-foreground)]">
                    <Icon className="h-4 w-4 text-primary" />
                    {eyebrow}
                  </div>
                  <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.3rem,7.4vw,7.8rem)] font-bold leading-[0.88] tracking-[-0.062em] text-balance">
                    {project.headline}
                  </h1>
                </div>
                <p className="max-w-xl text-[16px] leading-[1.7] text-[var(--muted-foreground)] lg:pb-4 md:text-[18px]">
                  {project.detailIntro}
                </p>
              </div>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-[14px] font-semibold text-white transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  Open project
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : null}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatPill label="System" value={project.title} />
                <StatPill label="Timeline" value={project.duration} />
                <StatPill label="Launch" value={project.outcome} />
                <StatPill label="Year" value={project.year} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-8 max-w-[92rem] px-5 sm:px-6">
              <div className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] bg-[var(--surface)] ring-1 ring-[var(--hairline)] md:min-h-[46rem]">
                <WorkVisual item={project} />
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/78 via-black/38 to-transparent p-6 text-white md:p-9">
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="text-[13px] font-medium text-white/58">{project.type}</div>
                      <h2 className="mt-2 max-w-3xl font-display text-[clamp(2rem,4.8vw,5.2rem)] font-bold leading-[0.9] tracking-[-0.055em] text-balance">
                        {project.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {project.stats.map((stat) => (
                        <span key={stat} className="rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-medium text-white/78 ring-1 ring-white/14 backdrop-blur-sm">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[82rem] px-5 sm:px-6">
            {project.detailSections.map((section, index) => (
              <DetailSection key={`${section.title}-${index}`} section={section} index={index} />
            ))}
          </div>
        </section>

        <section className="bg-[var(--surface)] py-20 md:py-28">
          <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <div className="lg:sticky lg:top-28">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary ring-1 ring-[var(--hairline)]">
                    <LineChart className="h-5 w-5" />
                  </div>
                  <h2 className="mt-7 max-w-lg font-display text-[clamp(2.5rem,5vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.055em] text-balance">
                    Stack and delivery scope.
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-[var(--muted-foreground)]">
                    The original portfolio stack is preserved here so the project detail page keeps its technical context.
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.modules.map((module, index) => (
                  <ModuleCard key={module} module={module} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-[92rem] gap-6 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-[1.5rem] bg-black p-6 text-white md:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary ring-1 ring-white/14">
                  <TimerReset className="h-5 w-5" />
                </div>
                <h2 className="mt-8 max-w-xl font-display text-[clamp(2.35rem,5vw,5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-balance">
                  Project assets and notes.
                </h2>
                <div className="mt-10 divide-y divide-white/12">
                  {project.timeline.map((step) => (
                    <div key={step.label} className="grid gap-3 py-5 md:grid-cols-[0.28fr_0.72fr]">
                      <div className="font-display text-2xl font-semibold tracking-[-0.04em] text-white">{step.label}</div>
                      <p className="text-[14px] leading-[1.7] text-white/62">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid h-full gap-4">
                {project.images.map((image, index) => (
                  <div key={image} className="overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-[var(--hairline)]">
                    <div className="relative aspect-[16/9] bg-[var(--surface)]">
                      <img src={image} alt={`${project.title} asset ${index + 1}`} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex items-center justify-between gap-4 p-4">
                      <span className="text-[13px] font-medium text-[var(--muted-foreground)]">Project image {index + 1}</span>
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-black py-20 text-white md:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-10 px-5 sm:px-6 lg:grid-cols-[0.78fr_1.22fr]">
            <Reveal>
              <div>
                <h2 className="max-w-lg font-display text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.06em] text-balance">
                  More systems under pressure.
                </h2>
                <a href="/work" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]">
                  All work
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                {related.map((item) => (
                  <RelatedProject key={item.slug} item={item} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
