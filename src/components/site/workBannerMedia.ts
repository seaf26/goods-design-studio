import type { WorkItem } from "./workData";

export function getWorkBannerImage(item: WorkItem) {
  return item.banner || item.thumbnail || item.images[0] || "";
}

export function getWorkProofImage(item: WorkItem) {
  return item.thumbnail || item.images[0] || item.banner || "";
}

export function getWorkBannerFamilyLabel(item: WorkItem) {
  const family = item.bannerFamily || "specialty";

  const labels = {
    commerce: "Commerce system",
    logistics: "Logistics operation",
    backend: "Backend platform",
    mobile: "Mobile product",
    corporate: "Corporate system",
    dashboard: "Dashboard system",
    specialty: "Digital product",
  } satisfies Record<NonNullable<WorkItem["bannerFamily"]>, string>;

  return labels[family];
}

export function getWorkBannerAlt(item: WorkItem) {
  return `${item.title} ${item.type} banner showing the project interface in a TRAFFODATA cinematic operations frame`;
}
