import { useState, type ReactNode } from "react";

import { useI18n } from "@/lib/i18n";

import { BlurText } from "./BlurText";
import type { WorkItem } from "./workData";

function ProjectShot({
  src,
  alt,
  eager = false,
  fit = "cover",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <div className="absolute inset-0 bg-[#030409]">
      {fit === "contain" ? (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-2xl"
          loading="lazy"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative flex h-full items-center justify-center p-3 md:p-5">
        <img
          src={src}
          alt={alt}
          className={
            fit === "contain"
              ? "max-h-full max-w-full rounded-[1rem] object-contain shadow-[0_24px_70px_-36px_rgba(0,0,0,0.9)]"
              : "h-full w-full object-cover"
          }
          loading={eager ? "eager" : "lazy"}
        />
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
      className={`project-media-frame overflow-hidden rounded-2xl bg-[var(--card)] ring-1 ring-[var(--hairline)] ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#030409] md:aspect-[16/8.6]">
        {children}
      </div>
      <figcaption className="flex min-h-14 items-center justify-between gap-4 border-t border-[var(--hairline)] bg-[var(--card)] px-4 py-3 md:px-5">
        <span className="text-[12px] font-medium text-[var(--muted-foreground)]">{label}</span>
        <span className="line-clamp-1 text-right text-[13px] font-semibold text-[var(--ink)]">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

export function ProjectHeroBanner({ item, visual }: { item: WorkItem; visual: ReactNode }) {
  const { t } = useI18n();
  const heroImage = item.thumbnail || item.images[0];

  return (
    <ProjectMediaFrame
      label={t("project.media.banner")}
      caption={item.title}
      className="shadow-[0_30px_110px_-72px_rgba(0,0,0,0.75)]"
    >
      {heroImage ? (
        <div className="absolute inset-0">
          <ProjectShot
            src={heroImage}
            alt={`${item.title} ${t("project.media.alt")}`}
            eager
            fit="contain"
          />
        </div>
      ) : (
        <div className="absolute inset-0">{visual}</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4 text-white md:bottom-8 md:left-8 md:right-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[12px] font-medium text-white/58">{item.type}</div>
          <BlurText
            as="h2"
            text={item.title}
            className="mt-2 max-w-4xl font-display text-[clamp(1.9rem,4.2vw,4.8rem)] font-bold leading-[0.94] tracking-[-0.04em] text-balance"
          />
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
  const { t } = useI18n();
  const imageItems = item.images.filter(Boolean).slice(0, 3);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!imageItems.length) {
    return null;
  }

  const selectedImage = imageItems[selectedIndex] ?? imageItems[0];
  const getImageLabel = (index: number) =>
    item.imageLabels?.[index] ?? `${t("project.media.image")} ${index + 1}`;

  return (
    <div className="grid gap-3">
      <ProjectMediaFrame
        label={`${getImageLabel(selectedIndex)} · ${selectedIndex + 1}/${imageItems.length}`}
        caption={item.title}
        className="shadow-none"
      >
        <ProjectShot
          src={selectedImage}
          alt={`${item.title} ${t("project.media.alt")} ${selectedIndex + 1}`}
          eager={selectedIndex === 0}
          fit="contain"
        />
      </ProjectMediaFrame>
      {imageItems.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imageItems.map((image, index) => {
            const active = index === selectedIndex;
            const label = getImageLabel(index);

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                aria-label={`${t("project.media.image")} ${label}`}
                aria-pressed={active}
                onClick={() => setSelectedIndex(index)}
                className={`group min-w-28 overflow-hidden rounded-xl text-left ring-1 transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:min-w-36 ${
                  active
                    ? "bg-[var(--card)] text-[var(--ink)] ring-[var(--primary)] shadow-[0_10px_30px_-20px_rgba(115,136,223,0.9)]"
                    : "bg-[var(--surface)] text-[var(--muted-foreground)] ring-[var(--hairline)] hover:-translate-y-0.5 hover:text-[var(--ink)]"
                }`}
              >
                <span className="block aspect-[4/3] overflow-hidden bg-[#030409]">
                  <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </span>
                <span className="block truncate px-3 py-2 text-[11px] font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
