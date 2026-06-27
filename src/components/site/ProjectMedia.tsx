import { Check, CircuitBoard, Layers3, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { WorkItem } from "./workData";

function mediaTone(item: WorkItem) {
  if (item.visual === "warehouse") return "from-[#050612] via-[#101742] to-[#030409]";
  if (item.visual === "finance") return "from-[#0b0b0d] via-[#333da7] to-[#d9defb]";
  if (item.visual === "distribution") return "from-[#030409] via-[#1a1a1a] to-[#7388df]";
  if (item.visual === "retail") return "from-[#f8f9ff] via-[#7388df] to-[#030409]";
  return item.tone === "dark"
    ? "from-[#030409] via-[#12152c] to-[#333da7]"
    : "from-[#f8f9ff] via-[#c8d0ff] to-[#333da7]";
}

function SystemPanel({ item, index = 0 }: { item: WorkItem; index?: number }) {
  const Icon = item.icon as LucideIcon;
  const metricOne = item.stats[0] ?? item.type;
  const metricTwo = item.stack[0] ?? item.scope;

  return (
    <div className={`relative h-full overflow-hidden bg-gradient-to-br ${mediaTone(item)}`}>
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="absolute right-[-4%] top-[-18%] h-[58%] w-[44%] rounded-full bg-[#7388df]/35 blur-3xl" />
      <div className="absolute -bottom-28 left-[12%] h-[44%] w-[62%] rounded-full bg-[#333da7]/40 blur-3xl" />
      <div className="absolute inset-x-4 top-6 rounded-2xl border border-white/12 bg-black/34 p-3 shadow-[0_24px_80px_-42px_rgba(0,0,0,0.8)] backdrop-blur-md md:inset-x-10 md:top-10 md:p-4">
        <div className="flex items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/52">
          <span>TRAFFODATA / System {String(index + 1).padStart(2, "0")}</span>
          <span>Live model</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-4 text-black">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7388df]/12 text-[#333da7]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white">
                {item.year}
              </span>
            </div>
            <div className="mt-9 font-display text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.04em]">
              {item.client}
            </div>
            <div className="mt-3 text-[12px] leading-relaxed text-black/54">{item.type}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[metricOne, metricTwo, item.outcome, item.duration].map((value, metricIndex) => (
              <div
                key={`${value}-${metricIndex}`}
                className="rounded-xl border border-white/10 bg-white/[0.08] p-4 text-white backdrop-blur-md"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/42">
                  Signal {metricIndex + 1}
                </div>
                <div className="mt-5 line-clamp-2 font-display text-xl font-semibold leading-[1.02] tracking-[-0.03em]">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-4 right-4 rounded-2xl border border-white/12 bg-black/45 p-4 text-white backdrop-blur-md md:bottom-10 md:left-10 md:right-10">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#aebaff]">
            <CircuitBoard className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold">{item.scope}</div>
            <div className="mt-1 truncate text-[12px] text-white/52">
              {item.stack.slice(0, 4).join(" / ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectMediaFrame({
  children,
  caption,
  label,
  className = "",
  priority = false,
}: {
  children: ReactNode;
  caption: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={`project-media-frame overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--hairline)] ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#030409] md:aspect-[16/8.6]">
        {children}
      </div>
      <figcaption className="flex min-h-14 items-center justify-between gap-4 border-t border-[var(--hairline)] bg-white px-4 py-3 md:px-5">
        <span className="text-[12px] font-medium text-[var(--muted-foreground)]">{label}</span>
        <span className="line-clamp-1 text-right text-[13px] font-semibold text-[var(--ink)]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

export function ProjectHeroBanner({ item, visual }: { item: WorkItem; visual: ReactNode }) {
  return (
    <ProjectMediaFrame
      label="Project banner"
      caption={item.title}
      className="shadow-[0_30px_110px_-72px_rgba(0,0,0,0.75)]"
    >
      <div className="absolute inset-0">{visual}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 text-white md:bottom-8 md:left-8 md:right-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[12px] font-medium text-white/58">{item.type}</div>
          <h2 className="mt-2 max-w-4xl font-display text-[clamp(1.9rem,4.2vw,4.8rem)] font-bold leading-[0.94] tracking-[-0.04em] text-balance">
            {item.title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
          {item.stats.map((stat) => (
            <span
              key={stat}
              className="rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-medium text-white/82 ring-1 ring-white/14 backdrop-blur-sm"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </ProjectMediaFrame>
  );
}

export function ProjectGallery({ item }: { item: WorkItem }) {
  const imageItems = item.images.filter(Boolean).slice(0, 3);
  const needsSystemBanner = imageItems.length < 2;
  const media = needsSystemBanner ? [...imageItems, "system"] : imageItems;

  return (
    <div className="grid gap-4">
      {media.map((image, index) => {
        const isSystem = image === "system";
        const label = isSystem ? "Generated system banner" : `Project image ${index + 1}`;
        return (
          <ProjectMediaFrame
            key={`${image}-${index}`}
            label={label}
            caption={isSystem ? item.scope : item.title}
            className="shadow-none"
          >
            {isSystem ? (
              <SystemPanel item={item} index={index} />
            ) : (
              <img
                src={image}
                alt={`${item.title} project media ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
            <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/14 backdrop-blur-md">
              {isSystem ? <Layers3 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
            </div>
          </ProjectMediaFrame>
        );
      })}
    </div>
  );
}
