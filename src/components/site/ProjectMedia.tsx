import { useMemo, useState, type ReactNode } from "react";

import { useI18n } from "@/lib/i18n";

import { BlurText } from "./BlurText";
import type { WorkItem } from "./workData";

function ProjectShot({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const [portrait, setPortrait] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#030409]">
      <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
        <img
          src={src}
          alt={alt}
          className={
            portrait
              ? "h-auto w-auto max-h-[86%] max-w-[min(72vw,18rem)] rounded-[1.25rem] object-contain md:max-w-[min(28vw,18rem)]"
              : "h-full w-full object-cover"
          }
          loading={eager ? "eager" : "lazy"}
          onLoad={(event) => {
            const target = event.currentTarget;
            setPortrait(target.naturalHeight > target.naturalWidth);
          }}
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
  const heroImages = useMemo(
    () => Array.from(new Set(item.images.filter(Boolean).slice(0, 3))),
    [item.images],
  );

  return (
    <ProjectMediaFrame
      label={t("project.media.banner")}
      caption={item.title}
      className="shadow-[0_30px_110px_-72px_rgba(0,0,0,0.75)]"
    >
      {heroImages.length ? (
        <div
          className={`absolute inset-0 grid gap-3 p-3 md:p-4 ${
            heroImages.length === 1
              ? "grid-cols-1"
              : heroImages.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {heroImages.map((image, index) => (
            <div
              key={image}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20"
            >
              <ProjectShot
                src={image}
                alt={`${item.title} ${t("project.media.alt")} ${index + 1}`}
                eager={index === 0}
              />
            </div>
          ))}
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

  if (!imageItems.length) {
    return null;
  }

  return (
    <div className="grid gap-4">
      {imageItems.map((image, index) => (
        <ProjectMediaFrame
          key={`${image}-${index}`}
          label={`${t("project.media.image")} ${index + 1}`}
          caption={item.title}
          className="shadow-none"
        >
          <ProjectShot src={image} alt={`${item.title} ${t("project.media.alt")} ${index + 1}`} />
        </ProjectMediaFrame>
      ))}
    </div>
  );
}
