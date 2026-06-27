import { ArrowLeft, ArrowRight, ExternalLink, Layers3, LineChart, TimerReset } from "lucide-react";

import { Footer, Nav, Reveal } from "./Landing";
import { ProjectGallery, ProjectHeroBanner } from "./ProjectMedia";
import { WorkVisual } from "./WorkPage";
import { getWorkItem, workItems, type WorkItem } from "./workData";

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
        {label}
      </div>
      <div className="mt-5 line-clamp-2 font-display text-[clamp(1.45rem,2.4vw,2.25rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]">
        {value}
      </div>
    </div>
  );
}

function DetailSection({
  section,
  index,
}: {
  section: { title: string; text: string };
  index: number;
}) {
  return (
    <Reveal delay={index * 0.035}>
      <article className="border-t border-[var(--hairline)] py-7 md:grid md:grid-cols-[0.38fr_0.62fr] md:gap-10 md:py-9">
        <div>
          <div className="font-mono text-[11px] text-[var(--muted-foreground)]">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h2 className="mt-3 max-w-md font-display text-[clamp(1.65rem,2.6vw,2.75rem)] font-semibold leading-[1] tracking-[-0.04em] text-[var(--ink)]">
            {section.title}
          </h2>
        </div>
        <p className="mt-4 max-w-4xl text-[15px] leading-[1.72] text-[var(--muted-foreground)] md:mt-1 md:text-[16px]">
          {section.text}
        </p>
      </article>
    </Reveal>
  );
}

function ModuleCard({ module, index }: { module: string; index: number }) {
  return (
    <Reveal delay={index * 0.035}>
      <div className="group flex min-h-28 flex-col justify-between rounded-2xl bg-white p-5 ring-1 ring-[var(--hairline)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.99] motion-reduce:transition-none">
        <div className="flex items-center justify-between gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--surface)] text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
            <Layers3 className="h-4 w-4" />
          </span>
          <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-7 font-display text-[clamp(1.25rem,2vw,1.65rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">
          {module}
        </div>
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
        <span className="mt-1 block font-display text-2xl font-semibold tracking-[-0.04em]">
          {item.title}
        </span>
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
          <a
            href="/work"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </a>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.055em] text-balance">
            Project not found.
          </h1>
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
        <section className="relative overflow-hidden pt-24 md:pt-28">
          <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
            <Reveal>
              <a
                href="/work"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[12px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)] transition-colors hover:text-[var(--ink)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Work
              </a>
              <div className="mt-8 grid gap-7 lg:grid-cols-[0.92fr_0.58fr] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--muted-foreground)]">
                    <Icon className="h-4 w-4 text-primary" />
                    {eyebrow}
                  </div>
                  <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.9rem,6.2vw,5.9rem)] font-bold leading-[0.93] tracking-[-0.04em] text-balance">
                    {project.headline}
                  </h1>
                </div>
                <div className="lg:pb-2">
                  <p className="max-w-xl text-[16px] leading-[1.68] text-[var(--muted-foreground)] md:text-[18px]">
                    {project.detailIntro}
                  </p>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-[14px] font-semibold text-white transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]"
                    >
                      Open project
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <StatPill label="System" value={project.title} />
                <StatPill label="Timeline" value={project.duration} />
                <StatPill label="Launch" value={project.outcome} />
                <StatPill label="Year" value={project.year} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="mx-auto mt-7 max-w-[92rem] px-5 sm:px-6">
              <ProjectHeroBanner item={project} visual={<WorkVisual item={project} />} />
            </div>
          </Reveal>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-10 px-5 sm:px-6 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
            <div>
              {project.detailSections.map((section, index) => (
                <DetailSection key={`${section.title}-${index}`} section={section} index={index} />
              ))}
            </div>
            <Reveal delay={0.08}>
              <aside className="relative h-full overflow-hidden rounded-2xl bg-[var(--surface)] p-5 ring-1 ring-[var(--hairline)] lg:min-h-full lg:self-stretch">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_50%_0%,rgba(115,136,223,0.24),transparent_68%)]" />
                <div className="relative lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-primary ring-1 ring-[var(--hairline)]">
                      <LineChart className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[12px] font-medium text-[var(--muted-foreground)]">
                        Delivery scope
                      </div>
                      <div className="mt-1 font-display text-xl font-semibold tracking-[-0.03em]">
                        {project.team}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    {project.outcomes.slice(0, 5).map((outcome) => (
                      <div
                        key={outcome}
                        className="rounded-xl bg-white px-4 py-3 text-[13px] font-medium text-[var(--ink)] ring-1 ring-[var(--hairline)]"
                      >
                        {outcome}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white p-4 ring-1 ring-[var(--hairline)]">
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                        Timeline
                      </div>
                      <div className="mt-3 font-display text-lg font-semibold tracking-[-0.03em]">
                        {project.duration}
                      </div>
                    </div>
                    <div className="rounded-xl bg-white p-4 ring-1 ring-[var(--hairline)]">
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                        Launch
                      </div>
                      <div className="mt-3 line-clamp-2 font-display text-lg font-semibold leading-[1.05] tracking-[-0.03em]">
                        {project.outcome}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>

        <section className="bg-[var(--surface)] py-16 md:py-24">
          <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <div>
                  <h2 className="max-w-2xl font-display text-[clamp(2.2rem,4.4vw,4.5rem)] font-bold leading-[0.96] tracking-[-0.04em] text-balance">
                    Stack and capabilities.
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-[1.65] text-[var(--muted-foreground)]">
                    The technical footprint stays visible without turning the case study into a
                    sparse list.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[12px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
                  <Layers3 className="h-4 w-4 text-primary" />
                  {project.modules.length} capabilities
                </div>
              </Reveal>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.modules.map((module, index) => (
                <ModuleCard key={module} module={module} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-6 px-5 sm:px-6 lg:grid-cols-[0.48fr_0.52fr]">
            <Reveal>
              <div className="h-full rounded-2xl bg-black p-6 text-white md:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary ring-1 ring-white/14">
                  <TimerReset className="h-5 w-5" />
                </div>
                <h2 className="mt-8 max-w-xl font-display text-[clamp(2rem,4vw,4.1rem)] font-bold leading-[0.96] tracking-[-0.04em] text-balance">
                  Build notes and proof.
                </h2>
                <div className="mt-8 divide-y divide-white/12">
                  {project.timeline.map((step) => (
                    <div key={step.label} className="grid gap-3 py-5 md:grid-cols-[0.3fr_0.7fr]">
                      <div className="font-display text-xl font-semibold tracking-[-0.03em] text-white">
                        {step.label}
                      </div>
                      <p className="text-[14px] leading-[1.68] text-white/66">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ProjectGallery item={project} />
            </Reveal>
          </div>
        </section>

        <section className="bg-black py-20 text-white md:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-10 px-5 sm:px-6 lg:grid-cols-[0.78fr_1.22fr]">
            <Reveal>
              <div>
                <h2 className="max-w-lg font-display text-[clamp(2.25rem,4.8vw,4.9rem)] font-bold leading-[0.94] tracking-[-0.04em] text-balance">
                  More systems under pressure.
                </h2>
                <a
                  href="/work"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-black transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:scale-[0.97]"
                >
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
