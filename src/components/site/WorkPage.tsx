import { useState } from "react";
import { ArrowRight, Boxes, ImageIcon } from "lucide-react";

import { Footer, Nav, Reveal } from "./Landing";
import { workItems, type WorkItem } from "./workData";

const tileSpans = {
  wide: "lg:col-span-7",
  side: "lg:col-span-5",
  half: "lg:col-span-6",
};

const processNotes = [
  {
    title: "Map the floor",
    text: "We start with the handoffs, queues, exceptions, and approval paths operators already live with.",
  },
  {
    title: "Prototype the pressure",
    text: "Weekly reviews use realistic orders, inventory states, and finance rules instead of polished demo data.",
  },
  {
    title: "Sequence the rollout",
    text: "Launch plans are cut around risk, training windows, and measurable operational lift.",
  },
];

function RetailVisual({ item }: { item: WorkItem }) {
  const Icon = item.icon;

  return (
    <>
      <div className="absolute left-[8%] top-[20%] h-[68%] w-[68%] rounded-[1.35rem] bg-[#d5d5d2]" />
      <div className="absolute -bottom-10 left-[19%] h-[66%] w-[56%] rotate-[-3deg] rounded-[1.1rem] bg-black p-3 shadow-[0_28px_80px_-32px_rgba(0,0,0,0.7)]">
        <div className="h-full rounded-[0.8rem] bg-white p-4">
          <div className="flex items-center justify-between text-[10px] font-medium text-black/45">
            <span>GOODS / RETAIL</span>
            <span>LIVE</span>
          </div>
          <div className="mt-8 grid grid-cols-[1.1fr_0.9fr] gap-4">
            <div>
              <div className="h-3 w-20 rounded-full bg-black/10" />
              <div className="mt-3 h-16 rounded-xl bg-[var(--ink)] p-3 text-white">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 h-1.5 w-24 rounded-full bg-white/25" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-14 rounded-lg bg-[var(--surface)] ring-1 ring-black/5" />
                <div className="h-14 rounded-lg bg-[var(--primary)]/10 ring-1 ring-[var(--primary)]/20" />
              </div>
            </div>
            <div className="rounded-xl bg-[var(--surface)] p-3">
              <div className="h-28 rounded-lg bg-white ring-1 ring-black/5">
                <div className="h-full rounded-lg bg-[linear-gradient(90deg,transparent_0_18%,rgba(0,0,0,.08)_18%_20%,transparent_20%_34%,rgba(0,0,0,.1)_34%_36%,transparent_36%_58%,rgba(0,0,0,.12)_58%_60%,transparent_60%)]" />
              </div>
              <div className="mt-3 h-2 w-16 rounded-full bg-black/15" />
              <div className="mt-2 h-2 w-24 rounded-full bg-black/10" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[8%] top-[18%] h-[72%] w-[24%] overflow-hidden rounded-[1.4rem] bg-black p-2 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.7)]">
        <div className="grid h-full place-items-center rounded-[1rem] bg-[#111]">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-primary text-black">
            <Boxes className="h-9 w-9" />
          </div>
        </div>
      </div>
    </>
  );
}

function WarehouseVisual({ item }: { item: WorkItem }) {
  const Icon = item.icon;

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(124,58,237,0.28),transparent_34%),linear-gradient(145deg,#101010,#030303)]" />
      <div className="absolute -right-10 top-20 h-[76%] w-[76%] rotate-3 rounded-[1.35rem] bg-white/95 p-4 shadow-[0_28px_90px_-34px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between text-[10px] font-medium text-black/45">
          <span>WAVE PLAN</span>
          <span>DEPOT 04</span>
        </div>
        <div className="mt-4 grid grid-cols-[0.85fr_1fr] gap-3">
          <div className="rounded-xl bg-black p-3 text-white">
            <Icon className="h-5 w-5 text-primary" />
            <div className="mt-8 font-display text-4xl font-bold tracking-tight">412</div>
            <div className="mt-1 text-[10px] text-white/45">picks / hr</div>
          </div>
          <div className="space-y-2">
            {[82, 68, 91, 54].map((width) => (
              <div key={width} className="rounded-lg bg-[var(--surface)] p-2">
                <div className="h-2 rounded-full bg-black/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 h-28 rounded-xl bg-[var(--surface)] p-4">
          <div className="grid h-full grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className={`rounded-md ${index % 3 === 0 ? "bg-primary/35" : "bg-black/10"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-8 top-8 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-primary ring-1 ring-white/15">
        <Icon className="h-6 w-6" />
      </div>
    </>
  );
}

function FinanceVisual({ item }: { item: WorkItem }) {
  const Icon = item.icon;

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_38%,rgba(0,0,0,0.22),transparent_30%),linear-gradient(135deg,#8d8d88,#c7c7c1)]" />
      <div className="absolute inset-x-12 top-20 h-[62%] rounded-[1.25rem] bg-white/70 p-5 shadow-[0_24px_80px_-34px_rgba(0,0,0,0.65)] backdrop-blur-md ring-1 ring-white/70">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-black/45">CLOSE BOARD</span>
          <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white">3 days</span>
        </div>
        <div className="mt-7 grid grid-cols-[1fr_0.7fr] gap-4">
          <div>
            <div className="font-display text-5xl font-bold tracking-tight">5</div>
            <div className="text-[11px] text-black/45">entities reconciled</div>
            <div className="mt-6 space-y-2">
              {[92, 74, 61].map((width) => (
                <div key={width} className="h-2 rounded-full bg-black/10">
                  <div className="h-full rounded-full bg-black" style={{ width: `${width}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="grid place-items-center rounded-xl bg-black text-primary">
            <Icon className="h-10 w-10" />
          </div>
        </div>
      </div>
    </>
  );
}

function DistributionVisual({ item }: { item: WorkItem }) {
  const Icon = item.icon;

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f7f4,#fff5ed)]" />
      <div className="absolute -right-12 -top-10 h-[72%] w-[76%] rotate-[-10deg] rounded-[1.4rem] bg-black p-4 shadow-[0_26px_90px_-34px_rgba(0,0,0,0.75)]">
        <div className="relative h-full overflow-hidden rounded-[1rem] bg-[#151515] p-5">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative flex items-center justify-between text-[10px] text-white/45">
            <span>ROUTE DESK</span>
            <span>LIVE</span>
          </div>
          <div className="relative mt-12 flex h-32 items-center">
            <div className="h-2 flex-1 rounded-full bg-primary" />
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary ring-8 ring-primary/15" style={{ left: `${22 + dot * 26}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 left-10 w-[56%] rounded-[1.25rem] bg-white p-5 shadow-[0_20px_70px_-34px_rgba(0,0,0,0.55)] ring-1 ring-black/10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <div className="font-display text-2xl font-bold tracking-tight">24k</div>
            <div className="text-[10px] font-medium text-black/45">SKU reservations</div>
          </div>
        </div>
      </div>
    </>
  );
}

function PortfolioVisual({ item }: { item: WorkItem }) {
  const Icon = item.icon;
  const image = item.thumbnail || item.images[0];

  return (
    <>
      <div className={`absolute inset-0 ${item.tone === "dark" || item.tone === "dim" ? "bg-black" : "bg-[var(--surface)]"}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(115,136,223,0.26),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%)]" />
      <div className="absolute inset-x-6 top-16 overflow-hidden rounded-[1.35rem] bg-white shadow-[0_28px_90px_-44px_rgba(0,0,0,0.65)] ring-1 ring-black/10 md:inset-x-10 md:top-20">
        <div className="flex h-10 items-center gap-2 border-b border-black/8 bg-white px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-2 w-28 rounded-full bg-black/8" />
        </div>
        <div className="relative aspect-[16/10] bg-[var(--surface)]">
          {image ? (
            <img src={image} alt={`${item.title} preview`} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="grid h-full place-items-center text-[var(--muted-foreground)]">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>
      <div className="absolute bottom-14 left-7 right-7 rounded-[1.25rem] bg-white/92 p-4 shadow-[0_18px_60px_-34px_rgba(0,0,0,0.6)] ring-1 ring-black/10 backdrop-blur-md md:left-10 md:right-auto md:w-[62%]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="truncate font-display text-xl font-semibold tracking-[-0.04em] text-black">{item.type}</div>
            <div className="mt-1 truncate text-[11px] font-medium text-black/45">{item.stack.slice(0, 3).join(" / ")}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function WorkVisual({ item }: { item: WorkItem }) {
  if (item.visual === "portfolio") return <PortfolioVisual item={item} />;
  if (item.visual === "warehouse") return <WarehouseVisual item={item} />;
  if (item.visual === "finance") return <FinanceVisual item={item} />;
  if (item.visual === "distribution") return <DistributionVisual item={item} />;
  return <RetailVisual item={item} />;
}

function ProjectTile({ item, index }: { item: WorkItem; index: number }) {
  const Icon = item.icon;
  const isDark = item.tone === "dark" || item.tone === "dim";
  const [isActive, setIsActive] = useState(false);
  const eyebrow = item.client === item.title ? item.type : item.client;

  return (
    <Reveal delay={index * 0.06} className={tileSpans[item.span]}>
      <a
        href={`/work/${item.slug}`}
        data-project-card
        data-active={isActive ? "true" : undefined}
        onPointerEnter={() => setIsActive(true)}
        onPointerLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`project-card group relative block min-h-[30rem] overflow-hidden rounded-[1.5rem] ring-1 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99] motion-reduce:transition-none md:min-h-[36rem] ${
          isDark
            ? "bg-black text-white ring-white/10 shadow-[0_24px_90px_-50px_rgba(0,0,0,0.75)]"
            : "bg-[var(--surface)] text-[var(--ink)] ring-[var(--hairline)] shadow-[0_24px_90px_-58px_rgba(0,0,0,0.55)]"
        }`}
      >
        <div
          data-project-visual
          className="absolute inset-0 transition-[transform,filter] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        >
          <WorkVisual item={item} />
        </div>

        <div
          data-project-scrim
          className="absolute inset-0 z-10 bg-black/58 opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        />

        <div
          data-project-hover-content
          className="absolute inset-0 z-20 flex flex-col justify-between p-5 text-white opacity-100 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none sm:p-7"
        >
          <div className="max-w-xl">
            <div className="text-[13px] font-medium text-white/58">{eyebrow}</div>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.1vw,4.4rem)] font-bold leading-[0.9] tracking-[-0.052em] text-balance">{item.title}</h2>
            <p className="mt-4 max-w-lg text-[14px] leading-[1.55] text-white/74 md:text-[15px]">{item.summary}</p>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/14 pt-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="inline-flex items-center gap-2 text-[14px] font-medium text-white">
              View project <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
            </div>
            <div className="flex max-w-lg flex-wrap gap-2 sm:justify-end">
              <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-medium text-white/76 ring-1 ring-white/12 backdrop-blur-sm">{item.scope}</span>
              <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-medium text-white/76 ring-1 ring-white/12 backdrop-blur-sm">{item.outcome}</span>
            </div>
          </div>
        </div>

        <div data-project-rest-icon className={`absolute left-5 top-5 z-20 hidden h-12 w-12 place-items-center rounded-2xl transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:grid ${isDark ? "bg-white/10 text-primary ring-1 ring-white/15" : "bg-white/90 text-black shadow-[0_14px_34px_-24px_rgba(0,0,0,0.6)] ring-1 ring-black/5"}`}>
          <Icon className="h-5 w-5" />
        </div>
      </a>
    </Reveal>
  );
}

export function WorkPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <Nav surface="light" />
      <main>
        <section className="relative overflow-hidden pt-28 pb-0 md:pt-32">
          <div className="relative mx-auto max-w-[92rem] px-5 sm:px-6">
            <Reveal>
              <div className="max-w-5xl">
                <div className="inline-flex rounded-full bg-[var(--surface)] px-3 py-1.5 text-[11px] font-medium text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
                  Selected systems
                </div>
                <h1 className="mt-7 max-w-[72rem] font-display text-[clamp(3.15rem,6.4vw,6rem)] font-bold leading-[0.94] tracking-[-0.052em] text-balance">
                  Operational software, productized.
                </h1>
                <p className="mt-6 max-w-xl text-[15px] leading-[1.65] text-[var(--muted-foreground)] md:text-[17px]">
              A selected archive of backend platforms, mobile products, dashboards, commerce systems, and web experiences.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="pointer-events-none mt-10 overflow-hidden sm:mt-12 md:mt-14">
            <div
              aria-hidden
              data-work-backdrop-title
              className="mx-auto max-w-[92rem] select-none px-5 text-left font-display text-[clamp(6.5rem,24vw,23rem)] font-bold leading-[0.72] tracking-[-0.075em] text-[var(--ink)]/[0.08] sm:px-6"
            >
              Projects
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden pt-6 pb-24 md:pt-8 md:pb-36">
          <div className="relative mx-auto grid max-w-[92rem] grid-cols-1 gap-5 px-5 sm:px-6 lg:grid-cols-12 lg:gap-6">
            {workItems.map((item, index) => (
              <ProjectTile key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="bg-[var(--surface)] py-20 text-[var(--ink)] md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <Reveal>
              <div>
                <h2 className="max-w-xl font-display text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[0.96] tracking-[-0.05em] text-balance">
                  Built around operating pressure.
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-[var(--muted-foreground)]">
                  The work starts where the business is already moving: counters, docks, approvals, exceptions, and month-end.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="grid gap-3 sm:grid-cols-3">
                {processNotes.map((note) => (
                  <div key={note.title} className="rounded-2xl bg-white p-6 ring-1 ring-[var(--hairline)]">
                    <div className="font-display text-2xl font-semibold tracking-tight">{note.title}</div>
                    <p className="mt-7 text-[14px] leading-[1.6] text-[var(--muted-foreground)]">{note.text}</p>
                  </div>
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
