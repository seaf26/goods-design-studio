/* eslint-disable prettier/prettier */

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
    "jawad-horse-riding-booking-platform": {
        banner: "/work-banners/jawad-horse-riding-booking-platform.webp",
        bannerFamily: "mobile",
    },
    "elnasser-backend-dashboard": {
        banner: "/work-banners/elnasser-backend-dashboard.webp",
        bannerFamily: "logistics",
    },
    "alnasser-ecommerce": {
        banner: "/work-banners/alnasser-ecommerce.webp",
        bannerFamily: "commerce",
    },
    "igc-influencer-ugc-platform": {
        banner: "/work-banners/igc-influencer-ugc-platform.webp",
        bannerFamily: "commerce",
    },
    "medad-alqemam": {
        banner: "/work-banners/medad-alqemam.webp",
        bannerFamily: "corporate",
    },
    "ar-dish-visuals": {
        banner: "/work-banners/ar-dish-visuals.webp",
        bannerFamily: "specialty",
    },
    "kemedar-real-estate-platform": {
        banner: "/work-banners/kemedar-real-estate-platform.webp",
        bannerFamily: "corporate",
    },
    "dental-osrais": {
        banner: "/work-banners/dental-osrais.webp",
        bannerFamily: "specialty",
    },
    "polrais-marine": {
        banner: "/work-banners/polrais-marine.webp",
        bannerFamily: "specialty",
    },
    "nourtha-tech-v2": {
        banner: "/work-banners/nourtha-tech-v2.webp",
        bannerFamily: "corporate",
    },
    "nourtha-tech": {
        banner: "/work-banners/nourtha-tech.webp",
        bannerFamily: "corporate",
    },
    "fanzvar": {
        banner: "/work-banners/fanzvar.webp",
        bannerFamily: "corporate",
    },
    "inomhub": {
        banner: "/work-banners/inomhub.webp",
        bannerFamily: "corporate",
    },
    "kenz": {
        banner: "/work-banners/kenz.webp",
        bannerFamily: "corporate",
    },
    "cslf": {
        banner: "/work-banners/cslf.webp",
        bannerFamily: "corporate",
    },
    "inovent": {
        banner: "/work-banners/inovent.webp",
        bannerFamily: "corporate",
    },
    "out-seller-landing-page": {
        banner: "/work-banners/out-seller-landing-page.webp",
        bannerFamily: "commerce",
    },
    "inom-techs": {
        banner: "/work-banners/inom-techs.webp",
        bannerFamily: "corporate",
    },
    "out-seller": {
        banner: "/work-banners/out-seller.webp",
        bannerFamily: "commerce",
    },
    "edu-chain": {
        banner: "/work-banners/edu-chain.webp",
        bannerFamily: "specialty",
    },
    "out-seller-2": {
        banner: "/work-banners/out-seller-2.webp",
        bannerFamily: "commerce",
    },
    "hunter": {
        banner: "/work-banners/hunter.webp",
        bannerFamily: "specialty",
    },
    "gameing": {
        banner: "/work-banners/gameing.webp",
        bannerFamily: "specialty",
    },
    "spiro": {
        banner: "/work-banners/spiro.webp",
        bannerFamily: "specialty",
    },
    "halaa-bazaar": {
        banner: "/work-banners/halaa-bazaar.webp",
        bannerFamily: "commerce",
    },
    "shopwise": {
        banner: "/work-banners/shopwise.webp",
        bannerFamily: "commerce",
    },
    "e-commerce-gamel": {
        banner: "/work-banners/e-commerce-gamel.webp",
        bannerFamily: "commerce",
    },
    "kids": {
        banner: "/work-banners/kids.webp",
        bannerFamily: "commerce",
    },
    "behance-sync-gym-app": {
        banner: "/work-banners/behance-sync-gym-app.webp",
        bannerFamily: "mobile",
    },
    "behance-i-grill": {
        banner: "/work-banners/behance-i-grill.webp",
        bannerFamily: "mobile",
    },
    "behance-baqa-app": {
        banner: "/work-banners/behance-baqa-app.webp",
        bannerFamily: "mobile",
    },
    "behance-max-hub-e-commerce": {
        banner: "/work-banners/behance-max-hub-e-commerce.webp",
        bannerFamily: "commerce",
    },
    "behance-naqlty-app": {
        banner: "/work-banners/behance-naqlty-app.webp",
        bannerFamily: "logistics",
    },
    "behance-logistic-platform": {
        banner: "/work-banners/behance-logistic-platform.webp",
        bannerFamily: "logistics",
    },
    "behance-e-coomerce": {
        banner: "/work-banners/behance-e-coomerce.webp",
        bannerFamily: "commerce",
    },
    "behance-inovent": {
        banner: "/work-banners/behance-inovent.webp",
        bannerFamily: "corporate",
    },
    "behance-e-commerce": {
        banner: "/work-banners/behance-e-commerce.webp",
        bannerFamily: "commerce",
    },
    "behance-test-system": {
        banner: "/work-banners/behance-test-system.webp",
        bannerFamily: "dashboard",
    },
    "behance-tawsila-app": {
        banner: "/work-banners/behance-tawsila-app.webp",
        bannerFamily: "logistics",
    },
    "behance-financial-dashboard": {
        banner: "/work-banners/behance-financial-dashboard.webp",
        bannerFamily: "dashboard",
    },
} satisfies Record<string, WorkBannerMetadata>;
