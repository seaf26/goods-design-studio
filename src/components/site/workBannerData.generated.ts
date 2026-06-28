export type WorkBannerFamily =
  | "commerce"
  | "logistics"
  | "backend"
  | "mobile"
  | "corporate"
  | "dashboard"
  | "specialty";

export type WorkBannerMetadata = {
  banner: string;
  bannerFamily: WorkBannerFamily;
};

export const workBannerData = {
  "wikifood-commerce-delivery-backend": {
    banner: "/work-banners/wikifood-commerce-delivery-backend.webp",
    bannerFamily: "commerce",
  },
  "printout-laravel-rest-api": {
    banner: "/work-banners/printout-laravel-rest-api.webp",
    bannerFamily: "backend",
  },
  "taggz-ai-event-photography-platform": {
    banner: "/work-banners/taggz-ai-event-photography-platform.webp",
    bannerFamily: "specialty",
  },
} satisfies Record<string, WorkBannerMetadata>;
