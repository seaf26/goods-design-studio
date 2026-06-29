import {
  Building2,
  Code2,
  ServerCog,
  ShoppingCart,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { behanceWorkItems } from "./behanceWorkData.generated";
import { workBannerData, type WorkBannerFamily } from "./workBannerData.generated";

export type WorkSection = {
  title: string;
  text: string;
};

export type WorkCategory = "website" | "mobile-app" | "figma-design";

export type WorkItem = {
  title: string;
  slug: string;
  href: string;
  client: string;
  type: string;
  category: WorkCategory;
  source?: string;
  sourceUrl?: string;
  description: string;
  summary: string;
  scope: string;
  outcome: string;
  icon: LucideIcon;
  visual: "portfolio" | "retail" | "warehouse" | "finance" | "distribution";
  span: "wide" | "side" | "half";
  tone: "light" | "dark" | "dim" | "warm";
  stats: string[];
  year: string;
  duration: string;
  team: string;
  headline: string;
  detailIntro: string;
  challenge: string;
  build: string;
  impact: string;
  modules: string[];
  outcomes: string[];
  timeline: { label: string; text: string }[];
  thumbnail: string;
  banner?: string;
  bannerFamily?: WorkBannerFamily;
  images: string[];
  stack: string[];
  sections?: WorkSection[];
  detailSections: WorkSection[];
};

const icons = { Building2, Code2, ServerCog, ShoppingCart, Smartphone };

export type WorkItemInput = Omit<WorkItem, "icon"> & {
  iconName: keyof typeof icons;
};

const portfolioProjects = [
  {
    title: "WikiFood Multi-Vendor Commerce Backend",
    slug: "wikifood-commerce-delivery-backend",
    href: "https://web-js-three.vercel.app/home",
    description:
      "A full-stack Laravel 10 backend and API platform powering a multi-vendor ecommerce web app plus three mobile apps for vendors, customers, and delivery operations.",
    thumbnail: "/work-images/wikifood.webp",
    images: ["/work-images/wikifood.webp"],
    stack: [
      "Laravel 10",
      "PHP 8.2",
      "MySQL",
      "REST APIs",
      "Laravel Passport",
      "Firebase",
      "WebSockets",
      "Laravel Mix",
    ],
    sections: [
      {
        title: "Project Overview",
        text: "WikiFood is a large-scale multi-vendor commerce and delivery management platform built for food, grocery, pharmacy, ecommerce, and parcel operations. I developed and customized the Laravel backend that powers the ecommerce web app and three connected mobile apps: vendor, customer ecommerce, and delivery.",
      },
      {
        title: "Backend & API Scope",
        text: "Built and maintained modules for orders, sub-orders, POS workflows, products, vendors, customers, deliverymen, warehouses, stock, coupons, campaigns, banners, advertisements, subscriptions, wallets, disbursements, reports, and tax/VAT operations. The API layer supports authentication, cart, checkout, order tracking, wallet flows, loyalty points, notifications, chat, reviews, location tracking, and delivery status updates across the mobile and web ecosystem.",
      },
      {
        title: "Commerce Operations",
        text: "Implemented admin and vendor POS workflows with item-level percentage discounts, purchase-price validation, tax recalculation, order editing, and stock-safe order placement. Enhanced order management with parent/sub-order tracking, cancellation APIs, stock restoration, inline filters, pagination, scroll memory, receipt hash updates, and accurate parent-order totals.",
      },
      {
        title: "Imports, Payments & Promotions",
        text: "Built advanced Excel, Fodex, and Wiki import tools with dynamic column mapping, editable previews, create/update detection, stock conversion logic, warehouse-aware validation, and safer bulk product/order importing. Integrated and maintained payment gateways including Stripe, PayPal, Razorpay, Paystack, Flutterwave, Paymob, Paytabs, MercadoPago, SSLCommerz, Bkash, LiqPay, SenangPay, Paytm, PhonePe, and Xendit.",
      },
      {
        title: "Operational Tooling",
        text: "Added promotional systems for store, category, and item advertisements, redirect metadata, campaigns, flash sales, cashback, coupons, banners, and global brand support. Improved catalog management with bulk actions, product galleries, brand filtering, warehouse stock handling, always-in-stock logic, variations, add-ons, suppliers, units, attributes, and product approval flows. Built activity logging, role/module permissions, admin access control, exports, wallet transactions, withdrawal methods, deliveryman earnings, and tax reports.",
      },
    ],
    client: "WikiFood Multi-Vendor Commerce Backend",
    type: "Mobile product",
    category: "mobile-app",
    summary:
      "A full-stack Laravel 10 backend and API platform powering a multi-vendor ecommerce web app plus three mobile apps for vendors, customers, and delivery operations.",
    scope: "Laravel 10, PHP 8.2",
    outcome: "Live project",
    visual: "portfolio",
    span: "wide",
    tone: "light",
    stats: ["Mobile product", "Laravel 10"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "WikiFood Multi-Vendor Commerce Backend",
    detailIntro:
      "A full-stack Laravel 10 backend and API platform powering a multi-vendor ecommerce web app plus three mobile apps for vendors, customers, and delivery operations.",
    challenge:
      "Built and maintained modules for orders, sub-orders, POS workflows, products, vendors, customers, deliverymen, warehouses, stock, coupons, campaigns, banners, advertisements, subscriptions, wallets, disbursements, reports, and tax/VAT operations. The API layer supports authentication, cart, checkout, order tracking, wallet flows, loyalty points, notifications, chat, reviews, location tracking, and delivery status updates across the mobile and web ecosystem.",
    build:
      "Implemented admin and vendor POS workflows with item-level percentage discounts, purchase-price validation, tax recalculation, order editing, and stock-safe order placement. Enhanced order management with parent/sub-order tracking, cancellation APIs, stock restoration, inline filters, pagination, scroll memory, receipt hash updates, and accurate parent-order totals.",
    impact:
      "Added promotional systems for store, category, and item advertisements, redirect metadata, campaigns, flash sales, cashback, coupons, banners, and global brand support. Improved catalog management with bulk actions, product galleries, brand filtering, warehouse stock handling, always-in-stock logic, variations, add-ons, suppliers, units, attributes, and product approval flows. Built activity logging, role/module permissions, admin access control, exports, wallet transactions, withdrawal methods, deliveryman earnings, and tax reports.",
    modules: [
      "Laravel 10",
      "PHP 8.2",
      "MySQL",
      "REST APIs",
      "Laravel Passport",
      "Firebase",
      "WebSockets",
      "Laravel Mix",
    ],
    outcomes: ["Mobile product", "Laravel 10", "PHP 8.2", "External project link"],
    timeline: [
      {
        label: "Project Overview",
        text: "WikiFood is a large-scale multi-vendor commerce and delivery management platform built for food, grocery, pharmacy, ecommerce, and parcel operations. I developed and customized the Laravel backend that powers the ecommerce web app and three connected mobile apps: vendor, customer ecommerce, and delivery.",
      },
      {
        label: "Backend",
        text: "Built and maintained modules for orders, sub-orders, POS workflows, products, vendors, customers, deliverymen, warehouses, stock, coupons, campaigns, banners, advertisements, subscriptions, wallets, disbursements, reports, and tax/VAT operations. The API layer supports authentication, cart, checkout, order tracking, wallet flows, loyalty points, notifications, chat, reviews, location tracking, and delivery status updates across the mobile and web ecosystem.",
      },
      {
        label: "Commerce Operation",
        text: "Implemented admin and vendor POS workflows with item-level percentage discounts, purchase-price validation, tax recalculation, order editing, and stock-safe order placement. Enhanced order management with parent/sub-order tracking, cancellation APIs, stock restoration, inline filters, pagination, scroll memory, receipt hash updates, and accurate parent-order totals.",
      },
    ],
    detailSections: [
      {
        title: "Project Overview",
        text: "WikiFood is a large-scale multi-vendor commerce and delivery management platform built for food, grocery, pharmacy, ecommerce, and parcel operations. I developed and customized the Laravel backend that powers the ecommerce web app and three connected mobile apps: vendor, customer ecommerce, and delivery.",
      },
      {
        title: "Backend & API Scope",
        text: "Built and maintained modules for orders, sub-orders, POS workflows, products, vendors, customers, deliverymen, warehouses, stock, coupons, campaigns, banners, advertisements, subscriptions, wallets, disbursements, reports, and tax/VAT operations. The API layer supports authentication, cart, checkout, order tracking, wallet flows, loyalty points, notifications, chat, reviews, location tracking, and delivery status updates across the mobile and web ecosystem.",
      },
      {
        title: "Commerce Operations",
        text: "Implemented admin and vendor POS workflows with item-level percentage discounts, purchase-price validation, tax recalculation, order editing, and stock-safe order placement. Enhanced order management with parent/sub-order tracking, cancellation APIs, stock restoration, inline filters, pagination, scroll memory, receipt hash updates, and accurate parent-order totals.",
      },
      {
        title: "Imports, Payments & Promotions",
        text: "Built advanced Excel, Fodex, and Wiki import tools with dynamic column mapping, editable previews, create/update detection, stock conversion logic, warehouse-aware validation, and safer bulk product/order importing. Integrated and maintained payment gateways including Stripe, PayPal, Razorpay, Paystack, Flutterwave, Paymob, Paytabs, MercadoPago, SSLCommerz, Bkash, LiqPay, SenangPay, Paytm, PhonePe, and Xendit.",
      },
      {
        title: "Operational Tooling",
        text: "Added promotional systems for store, category, and item advertisements, redirect metadata, campaigns, flash sales, cashback, coupons, banners, and global brand support. Improved catalog management with bulk actions, product galleries, brand filtering, warehouse stock handling, always-in-stock logic, variations, add-ons, suppliers, units, attributes, and product approval flows. Built activity logging, role/module permissions, admin access control, exports, wallet transactions, withdrawal methods, deliveryman earnings, and tax reports.",
      },
    ],
    iconName: "Smartphone",
  },
  {
    title: "Printout Backend | Laravel REST API",
    slug: "printout-laravel-rest-api",
    href: "https://printout.solutions/",
    description:
      "A Laravel 10 REST API backend for an online printing and delivery platform connecting clients, admins, vendors, and delivery drivers through separate app modules.",
    thumbnail: "/work-images/printoutt.webp",
    images: ["/work-images/printoutt.webp"],
    stack: [
      "Laravel 10",
      "PHP",
      "MySQL",
      "JWT Auth",
      "Sanctum",
      "Spatie Media",
      "Firebase",
      "Paymob",
      "Pusher",
      "PDF Parser",
      "Imagick",
      "REST APIs",
    ],
    sections: [
      {
        title: "Project Overview",
        text: "Printout is an online printing and delivery platform that connects customers, admins, vendors, and delivery drivers through dedicated API modules. I developed the Laravel backend powering custom print orders, product catalogs, cart management, file uploads, payments, delivery tracking, real-time communication, and admin reporting.",
      },
      {
        title: "Authentication & App APIs",
        text: "Built REST APIs for the client app, admin dashboard, vendor portal, and delivery app. Implemented multi-guard JWT authentication for clients, admins, vendors, and delivery users, with OTP verification through email/SMS, password reset, social login, and FCM token handling.",
      },
      {
        title: "Print Ordering & Pricing",
        text: "Developed custom print flows for documents, banners, uploaded files, PDFs, images, and Google Drive links. Implemented dynamic pricing for paper type, size, quantity, pages, selected page ranges, banner dimensions, materials, and customizations. Built cart and checkout systems for authenticated users and guests using guest tokens.",
      },
      {
        title: "Payments, Files & Order Lifecycle",
        text: "Integrated Paymob payment intentions, cash/deposit payments, guest checkout, coupons, and order total calculation. Added PDF validation and preview generation with page-count limits, file-size limits, and memory-safe PDF-to-image conversion. Implemented order creation, status updates, vendor assignment, delivery assignment, reviews, ratings, uploaded files, and media handling.",
      },
      {
        title: "Operations, Delivery & Reporting",
        text: "Built delivery APIs for order acceptance, current/completed orders, arrival confirmation, unreachable reports, wallet calculations, location updates, and delivery ratings. Added vendor APIs for product assignment, vendor orders, order details, profile updates, and production workflow updates. Implemented real-time chat using private broadcast channels, Firebase push notifications, loyalty points, referral rewards, vouchers, coupon usage tracking, and admin reports for production, financial performance, delivery logistics, revenue, cost, profit margin, and delivery timing.",
      },
      {
        title: "Backend Tooling",
        text: "Used Spatie Media Library for file/media management, Spatie Permissions for roles and permissions, and Laravel localization for multilingual catalog data. Added unit tests for PDF validation, PDF configuration, upload limits, and structured PDF error handling.",
      },
    ],
    client: "Printout Backend",
    type: "Backend platform",
    category: "website",
    summary:
      "A Laravel 10 REST API backend for an online printing and delivery platform connecting clients, admins, vendors, and delivery drivers through separate app modules.",
    scope: "Laravel 10, PHP",
    outcome: "Live project",
    visual: "portfolio",
    span: "side",
    tone: "dark",
    stats: ["Backend platform", "Laravel 10"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Printout Backend | Laravel REST API",
    detailIntro:
      "A Laravel 10 REST API backend for an online printing and delivery platform connecting clients, admins, vendors, and delivery drivers through separate app modules.",
    challenge:
      "Built REST APIs for the client app, admin dashboard, vendor portal, and delivery app. Implemented multi-guard JWT authentication for clients, admins, vendors, and delivery users, with OTP verification through email/SMS, password reset, social login, and FCM token handling.",
    build:
      "Developed custom print flows for documents, banners, uploaded files, PDFs, images, and Google Drive links. Implemented dynamic pricing for paper type, size, quantity, pages, selected page ranges, banner dimensions, materials, and customizations. Built cart and checkout systems for authenticated users and guests using guest tokens.",
    impact:
      "Used Spatie Media Library for file/media management, Spatie Permissions for roles and permissions, and Laravel localization for multilingual catalog data. Added unit tests for PDF validation, PDF configuration, upload limits, and structured PDF error handling.",
    modules: [
      "Laravel 10",
      "PHP",
      "MySQL",
      "JWT Auth",
      "Sanctum",
      "Spatie Media",
      "Firebase",
      "Paymob",
    ],
    outcomes: ["Backend platform", "Laravel 10", "PHP", "External project link"],
    timeline: [
      {
        label: "Project Overview",
        text: "Printout is an online printing and delivery platform that connects customers, admins, vendors, and delivery drivers through dedicated API modules. I developed the Laravel backend powering custom print orders, product catalogs, cart management, file uploads, payments, delivery tracking, real-time communication, and admin reporting.",
      },
      {
        label: "Authentication",
        text: "Built REST APIs for the client app, admin dashboard, vendor portal, and delivery app. Implemented multi-guard JWT authentication for clients, admins, vendors, and delivery users, with OTP verification through email/SMS, password reset, social login, and FCM token handling.",
      },
      {
        label: "Print Ordering",
        text: "Developed custom print flows for documents, banners, uploaded files, PDFs, images, and Google Drive links. Implemented dynamic pricing for paper type, size, quantity, pages, selected page ranges, banner dimensions, materials, and customizations. Built cart and checkout systems for authenticated users and guests using guest tokens.",
      },
    ],
    detailSections: [
      {
        title: "Project Overview",
        text: "Printout is an online printing and delivery platform that connects customers, admins, vendors, and delivery drivers through dedicated API modules. I developed the Laravel backend powering custom print orders, product catalogs, cart management, file uploads, payments, delivery tracking, real-time communication, and admin reporting.",
      },
      {
        title: "Authentication & App APIs",
        text: "Built REST APIs for the client app, admin dashboard, vendor portal, and delivery app. Implemented multi-guard JWT authentication for clients, admins, vendors, and delivery users, with OTP verification through email/SMS, password reset, social login, and FCM token handling.",
      },
      {
        title: "Print Ordering & Pricing",
        text: "Developed custom print flows for documents, banners, uploaded files, PDFs, images, and Google Drive links. Implemented dynamic pricing for paper type, size, quantity, pages, selected page ranges, banner dimensions, materials, and customizations. Built cart and checkout systems for authenticated users and guests using guest tokens.",
      },
      {
        title: "Payments, Files & Order Lifecycle",
        text: "Integrated Paymob payment intentions, cash/deposit payments, guest checkout, coupons, and order total calculation. Added PDF validation and preview generation with page-count limits, file-size limits, and memory-safe PDF-to-image conversion. Implemented order creation, status updates, vendor assignment, delivery assignment, reviews, ratings, uploaded files, and media handling.",
      },
      {
        title: "Operations, Delivery & Reporting",
        text: "Built delivery APIs for order acceptance, current/completed orders, arrival confirmation, unreachable reports, wallet calculations, location updates, and delivery ratings. Added vendor APIs for product assignment, vendor orders, order details, profile updates, and production workflow updates. Implemented real-time chat using private broadcast channels, Firebase push notifications, loyalty points, referral rewards, vouchers, coupon usage tracking, and admin reports for production, financial performance, delivery logistics, revenue, cost, profit margin, and delivery timing.",
      },
      {
        title: "Backend Tooling",
        text: "Used Spatie Media Library for file/media management, Spatie Permissions for roles and permissions, and Laravel localization for multilingual catalog data. Added unit tests for PDF validation, PDF configuration, upload limits, and structured PDF error handling.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "Taggz AI Event Photography Platform",
    slug: "taggz-ai-event-photography-platform",
    href: "https://apps.apple.com/eg/app/taggz/id6504503293",
    description:
      "A full-stack AI event photography platform with a Laravel API backend and a Next.js admin dashboard for events, media workflows, payments, analytics, moderation, and permissions.",
    thumbnail: "/work-images/taggz.webp",
    images: ["/work-images/taggz.webp"],
    stack: [
      "Laravel 13",
      "PHP 8.3",
      "Sanctum",
      "Spatie Permission",
      "Stripe",
      "Paymob",
      "Firebase FCM",
      "S3/B2 Storage",
      "tusd",
      "Docker",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "TanStack Query",
      "NextAuth v5",
      "Zustand",
      "Recharts",
      "Framer Motion",
      "GSAP",
      "Vitest",
    ],
    sections: [
      {
        title: "Project Overview",
        text: "Taggz is an AI-powered event photography and photo-sharing platform with a Laravel API backend, a Next.js dashboard, and a mobile app on the Apple App Store. The system supports event creation, role-based hosting, attendee management, AI face matching, scalable media uploads, subscriptions, payments, analytics, moderation, notifications, and admin operations.",
      },
      {
        title: "Backend API",
        text: "Developed the Laravel backend API with Sanctum authentication, role-based permissions, AI photo processing workflows, payment integrations, and scalable media upload infrastructure. Built RESTful APIs for authentication, social login, OTP email verification, password reset, user profiles, account management, Firebase push notifications, notification preferences, support issues, and device token management.",
      },
      {
        title: "Events, Roles & Photo Workflows",
        text: "Implemented event management with public/private events, hosts, co-hosts, moderators, invitations, ownership transfer, QR/code joining, attendee check-in, and event groups. Developed advanced photo workflows including direct uploads, batch uploads, multipart uploads, ZIP uploads, resumable tus uploads, folders, favorites, reports, share links, and download tracking.",
      },
      {
        title: "AI, Payments & Admin Operations",
        text: "Integrated AI photo indexing and face matching through internal callback APIs, face enrollment, user-photo matches, and retroactive matching jobs. Added monetization features including event packages, subscriptions, package tiers, upgrade requests, recurring billing, download entitlements, Stripe, Paymob, webhooks, receipts, refunds, and billing history. Built admin features for banning, event flagging and archive, moderation queues, photo approval/rejection, analytics, audit logs, Telegram notifications, subscription settings, scheduled commands, queue jobs, Docker deployment files, and automated feature tests.",
      },
      {
        title: "Next.js Dashboard",
        text: "Developed a protected dashboard using Next.js App Router, NextAuth, role-based access guards, and reusable dashboard shell navigation. Built event screens for listing, creating, editing, publishing, cancelling, completing, deleting, grouping, and viewing detailed event data. Added event detail tabs for overview, photos, members, analytics, and subscriptions, with grid, list, and advanced views.",
      },
      {
        title: "Dashboard Product Surface",
        text: "Implemented photo management with upload monitoring, photo detail pages, lightbox viewing, favorites, deletion, retry flows, moderation reporting, and tus upload support. Built member management, package tiers, pricing rules, upgrade requests, inquiries, expiry views, billing console tabs, KPI cards, charts, revenue analytics, event metrics, photo metrics, audit logs, payment transactions, subscriptions, payout views, Telegram/admin notification settings, and admin subscription rules.",
      },
    ],
    client: "Taggz AI Event Photography Platform",
    type: "Backend platform",
    category: "website",
    summary:
      "A full-stack AI event photography platform with a Laravel API backend and a Next.js admin dashboard for events, media workflows, payments, analytics, moderation, and permissions.",
    scope: "Laravel 13, PHP 8.3",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dim",
    stats: ["Backend platform", "Laravel 13"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Taggz AI Event Photography Platform",
    detailIntro:
      "A full-stack AI event photography platform with a Laravel API backend and a Next.js admin dashboard for events, media workflows, payments, analytics, moderation, and permissions.",
    challenge:
      "Developed the Laravel backend API with Sanctum authentication, role-based permissions, AI photo processing workflows, payment integrations, and scalable media upload infrastructure. Built RESTful APIs for authentication, social login, OTP email verification, password reset, user profiles, account management, Firebase push notifications, notification preferences, support issues, and device token management.",
    build:
      "Implemented event management with public/private events, hosts, co-hosts, moderators, invitations, ownership transfer, QR/code joining, attendee check-in, and event groups. Developed advanced photo workflows including direct uploads, batch uploads, multipart uploads, ZIP uploads, resumable tus uploads, folders, favorites, reports, share links, and download tracking.",
    impact:
      "Implemented photo management with upload monitoring, photo detail pages, lightbox viewing, favorites, deletion, retry flows, moderation reporting, and tus upload support. Built member management, package tiers, pricing rules, upgrade requests, inquiries, expiry views, billing console tabs, KPI cards, charts, revenue analytics, event metrics, photo metrics, audit logs, payment transactions, subscriptions, payout views, Telegram/admin notification settings, and admin subscription rules.",
    modules: [
      "Laravel 13",
      "PHP 8.3",
      "Sanctum",
      "Spatie Permission",
      "Stripe",
      "Paymob",
      "Firebase FCM",
      "S3/B2 Storage",
    ],
    outcomes: ["Backend platform", "Laravel 13", "PHP 8.3", "External project link"],
    timeline: [
      {
        label: "Project Overview",
        text: "Taggz is an AI-powered event photography and photo-sharing platform with a Laravel API backend, a Next.js dashboard, and a mobile app on the Apple App Store. The system supports event creation, role-based hosting, attendee management, AI face matching, scalable media uploads, subscriptions, payments, analytics, moderation, notifications, and admin operations.",
      },
      {
        label: "Backend API",
        text: "Developed the Laravel backend API with Sanctum authentication, role-based permissions, AI photo processing workflows, payment integrations, and scalable media upload infrastructure. Built RESTful APIs for authentication, social login, OTP email verification, password reset, user profiles, account management, Firebase push notifications, notification preferences, support issues, and device token management.",
      },
      {
        label: "Events, Roles",
        text: "Implemented event management with public/private events, hosts, co-hosts, moderators, invitations, ownership transfer, QR/code joining, attendee check-in, and event groups. Developed advanced photo workflows including direct uploads, batch uploads, multipart uploads, ZIP uploads, resumable tus uploads, folders, favorites, reports, share links, and download tracking.",
      },
    ],
    detailSections: [
      {
        title: "Project Overview",
        text: "Taggz is an AI-powered event photography and photo-sharing platform with a Laravel API backend, a Next.js dashboard, and a mobile app on the Apple App Store. The system supports event creation, role-based hosting, attendee management, AI face matching, scalable media uploads, subscriptions, payments, analytics, moderation, notifications, and admin operations.",
      },
      {
        title: "Backend API",
        text: "Developed the Laravel backend API with Sanctum authentication, role-based permissions, AI photo processing workflows, payment integrations, and scalable media upload infrastructure. Built RESTful APIs for authentication, social login, OTP email verification, password reset, user profiles, account management, Firebase push notifications, notification preferences, support issues, and device token management.",
      },
      {
        title: "Events, Roles & Photo Workflows",
        text: "Implemented event management with public/private events, hosts, co-hosts, moderators, invitations, ownership transfer, QR/code joining, attendee check-in, and event groups. Developed advanced photo workflows including direct uploads, batch uploads, multipart uploads, ZIP uploads, resumable tus uploads, folders, favorites, reports, share links, and download tracking.",
      },
      {
        title: "AI, Payments & Admin Operations",
        text: "Integrated AI photo indexing and face matching through internal callback APIs, face enrollment, user-photo matches, and retroactive matching jobs. Added monetization features including event packages, subscriptions, package tiers, upgrade requests, recurring billing, download entitlements, Stripe, Paymob, webhooks, receipts, refunds, and billing history. Built admin features for banning, event flagging and archive, moderation queues, photo approval/rejection, analytics, audit logs, Telegram notifications, subscription settings, scheduled commands, queue jobs, Docker deployment files, and automated feature tests.",
      },
      {
        title: "Next.js Dashboard",
        text: "Developed a protected dashboard using Next.js App Router, NextAuth, role-based access guards, and reusable dashboard shell navigation. Built event screens for listing, creating, editing, publishing, cancelling, completing, deleting, grouping, and viewing detailed event data. Added event detail tabs for overview, photos, members, analytics, and subscriptions, with grid, list, and advanced views.",
      },
      {
        title: "Dashboard Product Surface",
        text: "Implemented photo management with upload monitoring, photo detail pages, lightbox viewing, favorites, deletion, retry flows, moderation reporting, and tus upload support. Built member management, package tiers, pricing rules, upgrade requests, inquiries, expiry views, billing console tabs, KPI cards, charts, revenue analytics, event metrics, photo metrics, audit logs, payment transactions, subscriptions, payout views, Telegram/admin notification settings, and admin subscription rules.",
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "JAWAD Horse Riding Booking Platform",
    slug: "jawad-horse-riding-booking-platform",
    href: "https://play.google.com/store/apps/details?id=com.JAWAD&pli=1",
    description:
      "A cross-platform React Native booking marketplace for horse riding experiences in Egypt, connecting riders with stables, horses, events, schools, and photographers.",
    thumbnail: "/work-images/jawad.webp",
    images: ["/work-images/jawad.webp"],
    stack: [
      "React Native",
      "TypeScript",
      "React Navigation",
      "React Query",
      "Axios",
      "Zustand",
      "AsyncStorage",
      "Firebase FCM",
      "i18next",
      "React Hook Form",
      "Zod",
      "NativeWind",
      "React Native Maps",
      "WebView",
      "Image Picker",
      "Xcode",
      "CocoaPods",
      "Android Gradle",
    ],
    sections: [
      {
        title: "Project Overview",
        text: "JAWAD is a full-featured equestrian booking marketplace built with React Native. It lets riders browse verified stables, horses, events, schools, and photographers, then book experiences through a guided checkout flow with coupons, payment handling, and booking history.",
      },
      {
        title: "Mobile App Experience",
        text: "Developed the iOS and Android app for discovering, booking, and managing horse riding experiences, events, schools, and photography sessions. Built client login, registration, OTP, password reset, Apple Sign-In, Google Sign-In, guest browsing, profile editing, contact us, terms/about pages, booking history, booking details, and saved/favorite horse flows.",
      },
      {
        title: "Roles, Booking & Checkout",
        text: "Implemented multi-role authentication for clients, stable owners, photographers, and schools, with role-based navigation and dashboards. Built booking flows for horses, events, and photo sessions, including cart management, coupons, checkout steps, payment WebView integration, refund/check booking status flows, and deep linking to booking history and horse details.",
      },
      {
        title: "Business Management",
        text: "Created business-side tools for stable owners, photographers, and schools to manage profiles, services, horses, bookings, and visibility. Added horse creation/editing, stable profile completion, photographer management, image upload, and business profile completion flows.",
      },
      {
        title: "Localization & Native Delivery",
        text: "Added bilingual Arabic/English localization with RTL support, dynamic language switching, localized onboarding/content, Firebase push notification token handling, and persistent auth/session storage. Worked on native iOS App Store readiness, including App Intents/deep links, URL schemes, simulator builds, CocoaPods, Android Gradle, and App Store review journey preparation.",
      },
    ],
    client: "JAWAD Horse Riding Booking Platform",
    type: "Mobile product",
    category: "mobile-app",
    summary:
      "A cross-platform React Native booking marketplace for horse riding experiences in Egypt, connecting riders with stables, horses, events, schools, and photographers.",
    scope: "React Native, TypeScript",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "warm",
    stats: ["Mobile product", "React Native"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "JAWAD Horse Riding Booking Platform",
    detailIntro:
      "A cross-platform React Native booking marketplace for horse riding experiences in Egypt, connecting riders with stables, horses, events, schools, and photographers.",
    challenge:
      "Developed the iOS and Android app for discovering, booking, and managing horse riding experiences, events, schools, and photography sessions. Built client login, registration, OTP, password reset, Apple Sign-In, Google Sign-In, guest browsing, profile editing, contact us, terms/about pages, booking history, booking details, and saved/favorite horse flows.",
    build:
      "Implemented multi-role authentication for clients, stable owners, photographers, and schools, with role-based navigation and dashboards. Built booking flows for horses, events, and photo sessions, including cart management, coupons, checkout steps, payment WebView integration, refund/check booking status flows, and deep linking to booking history and horse details.",
    impact:
      "Added bilingual Arabic/English localization with RTL support, dynamic language switching, localized onboarding/content, Firebase push notification token handling, and persistent auth/session storage. Worked on native iOS App Store readiness, including App Intents/deep links, URL schemes, simulator builds, CocoaPods, Android Gradle, and App Store review journey preparation.",
    modules: [
      "React Native",
      "TypeScript",
      "React Navigation",
      "React Query",
      "Axios",
      "Zustand",
      "AsyncStorage",
      "Firebase FCM",
    ],
    outcomes: ["Mobile product", "React Native", "TypeScript", "External project link"],
    timeline: [
      {
        label: "Project Overview",
        text: "JAWAD is a full-featured equestrian booking marketplace built with React Native. It lets riders browse verified stables, horses, events, schools, and photographers, then book experiences through a guided checkout flow with coupons, payment handling, and booking history.",
      },
      {
        label: "Mobile App Experie",
        text: "Developed the iOS and Android app for discovering, booking, and managing horse riding experiences, events, schools, and photography sessions. Built client login, registration, OTP, password reset, Apple Sign-In, Google Sign-In, guest browsing, profile editing, contact us, terms/about pages, booking history, booking details, and saved/favorite horse flows.",
      },
      {
        label: "Roles, Booking",
        text: "Implemented multi-role authentication for clients, stable owners, photographers, and schools, with role-based navigation and dashboards. Built booking flows for horses, events, and photo sessions, including cart management, coupons, checkout steps, payment WebView integration, refund/check booking status flows, and deep linking to booking history and horse details.",
      },
    ],
    detailSections: [
      {
        title: "Project Overview",
        text: "JAWAD is a full-featured equestrian booking marketplace built with React Native. It lets riders browse verified stables, horses, events, schools, and photographers, then book experiences through a guided checkout flow with coupons, payment handling, and booking history.",
      },
      {
        title: "Mobile App Experience",
        text: "Developed the iOS and Android app for discovering, booking, and managing horse riding experiences, events, schools, and photography sessions. Built client login, registration, OTP, password reset, Apple Sign-In, Google Sign-In, guest browsing, profile editing, contact us, terms/about pages, booking history, booking details, and saved/favorite horse flows.",
      },
      {
        title: "Roles, Booking & Checkout",
        text: "Implemented multi-role authentication for clients, stable owners, photographers, and schools, with role-based navigation and dashboards. Built booking flows for horses, events, and photo sessions, including cart management, coupons, checkout steps, payment WebView integration, refund/check booking status flows, and deep linking to booking history and horse details.",
      },
      {
        title: "Business Management",
        text: "Created business-side tools for stable owners, photographers, and schools to manage profiles, services, horses, bookings, and visibility. Added horse creation/editing, stable profile completion, photographer management, image upload, and business profile completion flows.",
      },
      {
        title: "Localization & Native Delivery",
        text: "Added bilingual Arabic/English localization with RTL support, dynamic language switching, localized onboarding/content, Firebase push notification token handling, and persistent auth/session storage. Worked on native iOS App Store readiness, including App Intents/deep links, URL schemes, simulator builds, CocoaPods, Android Gradle, and App Store review journey preparation.",
      },
    ],
    iconName: "Smartphone",
  },
  {
    title: "Elnasser Backend & Logistics Engine",
    slug: "elnasser-backend-dashboard",
    href: "",
    description:
      "A highly sophisticated, enterprise-grade e-commerce and logistics backend built on the Laravel ecosystem. Expertly handles multi-leveled product taxonomy, complex logistics, scalable API architectures, and real-time data processing.",
    thumbnail: "/work-images/elnasserback.webp",
    images: ["/work-images/elnasserback.webp"],
    stack: ["Laravel", "PHP", "MySQL", "Redis/Queues", "Python", "Nginx", "DevOps"],
    sections: [
      {
        title: "Executive Overview",
        text: "The project represents a highly sophisticated, enterprise-grade e-commerce and logistics backend built on the Laravel ecosystem. The system expertly handles multi-leveled product taxonomy, complex logistics (Internal Delivery Payroll, Delivery Fee Engine), scalable API architectures for a vast cross-platform ecosystem (powering 3 distinct mobile apps: Vendor, Delivery, and User, alongside a comprehensive e-commerce website), dynamic customer loyalty and tier programs, and real-time backend processing.",
      },
      {
        title: "Core Technical Architecture & System Mechanics",
        text: "- Database & Query Optimization: Re-engineered the category system to move away from rigid 2-level nested loops to infinite-depth traversal using WITH RECURSIVE SQL CTEs. Implemented cache invalidation strategies using tree-version mechanics with Laravel Cache. Managed zero-downtime database schema upgrades for large datasets. - Background Jobs & Queue Processing: Real-time Trash System and Bulk Delete implementations running via Laravel Queues. Handlers softly delete nested subcategories recursively and flush storage/cache. UI maintains live interactivity using AJAX polling. - Comprehensive API Layer: Microservices-influenced separation using strict headers. Token-based auth via Bearer Tokens, secure password storage, and Multi-Factor/OTP. Robust Postman Collections integration dynamically exported via custom Artisan commands.",
      },
      {
        title: "Comprehensive Feature Set & Technical Implementations",
        text: '- Advanced Recursive Category Architecture: Unlimited subcategory levels allowing complex taxonomies. Implemented descendant/ancestor lookups using SQL CTEs. Deep API endpoints return nested tree JSON structures up to specific depths. - Category Groups API: Admin customizable "Groups" for dynamic storefront features, allowing carousels containing categories and products natively with level type mapping embedded in API responses. - Mobile App V1 API Expansion: Full checkout capability, offline payments via multipart/form-data with up to 5MB screenshot uploads, campaign tracking, and robust filtering rules for items intercepting dynamic query scopes. New checkout summary engine computes live projections for coupons and loyalty points. - Delivery Man Ecosystem & Payroll Engine: Completely functional dispatch and delivery portal. Solved critical visibility bugs for non-vehicular constrained orders. Internal delivery teams earn base monthly salaries plus task commissions while freelancers earn dynamic commissions. Engineered Delivery Fee APIs simulating costs based on distance, volumetric weight, and vehicle mappings. - Delivery & Payment Admin Reports: Dedicated reporting interfaces for delivery operations powered by Eloquent Scopes to resolve complex SQL ambiguity. Devised advanced Seeders demonstrating operational behavior logical flows. - Customer Loyalty, Tiers, & Referral Setup: Automated tiered setups (Bronze, Silver, Gold). End-to-end payload routing dynamically pushes user preferences configuration directly to the settings vault. Integrated helper logic calculating validation tokens natively at the payload layer without persistent coupon entities. Rigorous PHPUnit testing sequence to validate the calculations. - SMS OTP Authentication Protocol: Frictionless phone-based onboarding. Tri-state workflow handler mapping logic into new, old, and existing states seamlessly without premature auth token issuance. - Frontend Images & Dashboard Theme Overrides: System-wide native theme handling supporting layout partial overrides. Devilled an intelligent CSS pyramid grid engine visualizing category structures depending on recursive depth calculations. Dedicated UI bridging image payload storage dynamically. - Admin Tools & Python Automation: Orchestrated python helpers alongside PHP loops (seed_products.py, fetch_product_images.py, cleanup_category_images.py) destroying orphaned blobs, handling mass api integration (Pixabay), and processing raw file dumps efficiently.',
      },
      {
        title: "DevOps & Systems Architecture",
        text: "- Nginx & Network Tuning: Deployed infrastructure overhauls interacting with Nginx server blocks, upgrading client_max_body_size thresholds allowing large payload delivery natively. - Advanced SSH Deployment Protocols: Developed custom single-process tar stream protocols bypassing SSH packet loss, cleanly deploying 1.2 GB of unstructured binary image data natively to server nodes.",
      },
      {
        title: "My Role & Technical Impact",
        text: "Operating as the Lead Backend & DevOps Engineer, I architected this massive Laravel backend to scale. My work heavily centered on advanced database engineering, scalable API designs, caching, seamless queuing algorithms, and comprehensive DevOps pipeline optimizations.",
      },
    ],
    client: "Elnasser Backend & Logistics Engine",
    type: "Backend platform",
    category: "website",
    summary:
      "A highly sophisticated, enterprise-grade e-commerce and logistics backend built on the Laravel ecosystem. Expertly handles multi-leveled product taxonomy, complex logistics, scalable API architectures, and real-time data processing.",
    scope: "Laravel, PHP",
    outcome: "Private build",
    visual: "portfolio",
    span: "half",
    tone: "light",
    stats: ["Backend platform", "Laravel"],
    year: "Portfolio",
    duration: "Private",
    team: "Product, engineering, delivery",
    headline: "Elnasser Backend & Logistics Engine",
    detailIntro:
      "A highly sophisticated, enterprise-grade e-commerce and logistics backend built on the Laravel ecosystem. Expertly handles multi-leveled product taxonomy, complex logistics, scalable API architectures, and real-time data processing.",
    challenge:
      "- Database & Query Optimization: Re-engineered the category system to move away from rigid 2-level nested loops to infinite-depth traversal using WITH RECURSIVE SQL CTEs. Implemented cache invalidation strategies using tree-version mechanics with Laravel Cache. Managed zero-downtime database schema upgrades for large datasets. - Background Jobs & Queue Processing: Real-time Trash System and Bulk Delete implementations running via Laravel Queues. Handlers softly delete nested subcategories recursively and flush storage/cache. UI maintains live interactivity using AJAX polling. - Comprehensive API Layer: Microservices-influenced separation using strict headers. Token-based auth via Bearer Tokens, secure password storage, and Multi-Factor/OTP. Robust Postman Collections integration dynamically exported via custom Artisan commands.",
    build:
      '- Advanced Recursive Category Architecture: Unlimited subcategory levels allowing complex taxonomies. Implemented descendant/ancestor lookups using SQL CTEs. Deep API endpoints return nested tree JSON structures up to specific depths. - Category Groups API: Admin customizable "Groups" for dynamic storefront features, allowing carousels containing categories and products natively with level type mapping embedded in API responses. - Mobile App V1 API Expansion: Full checkout capability, offline payments via multipart/form-data with up to 5MB screenshot uploads, campaign tracking, and robust filtering rules for items intercepting dynamic query scopes. New checkout summary engine computes live projections for coupons and loyalty points. - Delivery Man Ecosystem & Payroll Engine: Completely functional dispatch and delivery portal. Solved critical visibility bugs for non-vehicular constrained orders. Internal delivery teams earn base monthly salaries plus task commissions while freelancers earn dynamic commissions. Engineered Delivery Fee APIs simulating costs based on distance, volumetric weight, and vehicle mappings. - Delivery & Payment Admin Reports: Dedicated reporting interfaces for delivery operations powered by Eloquent Scopes to resolve complex SQL ambiguity. Devised advanced Seeders demonstrating operational behavior logical flows. - Customer Loyalty, Tiers, & Referral Setup: Automated tiered setups (Bronze, Silver, Gold). End-to-end payload routing dynamically pushes user preferences configuration directly to the settings vault. Integrated helper logic calculating validation tokens natively at the payload layer without persistent coupon entities. Rigorous PHPUnit testing sequence to validate the calculations. - SMS OTP Authentication Protocol: Frictionless phone-based onboarding. Tri-state workflow handler mapping logic into new, old, and existing states seamlessly without premature auth token issuance. - Frontend Images & Dashboard Theme Overrides: System-wide native theme handling supporting layout partial overrides. Devilled an intelligent CSS pyramid grid engine visualizing category structures depending on recursive depth calculations. Dedicated UI bridging image payload storage dynamically. - Admin Tools & Python Automation: Orchestrated python helpers alongside PHP loops (seed_products.py, fetch_product_images.py, cleanup_category_images.py) destroying orphaned blobs, handling mass api integration (Pixabay), and processing raw file dumps efficiently.',
    impact:
      "Operating as the Lead Backend & DevOps Engineer, I architected this massive Laravel backend to scale. My work heavily centered on advanced database engineering, scalable API designs, caching, seamless queuing algorithms, and comprehensive DevOps pipeline optimizations.",
    modules: ["Laravel", "PHP", "MySQL", "Redis/Queues", "Python", "Nginx", "DevOps"],
    outcomes: ["Backend platform", "Laravel", "PHP", "Internal delivery"],
    timeline: [
      {
        label: "Executive Overview",
        text: "The project represents a highly sophisticated, enterprise-grade e-commerce and logistics backend built on the Laravel ecosystem. The system expertly handles multi-leveled product taxonomy, complex logistics (Internal Delivery Payroll, Delivery Fee Engine), scalable API architectures for a vast cross-platform ecosystem (powering 3 distinct mobile apps: Vendor, Delivery, and User, alongside a comprehensive e-commerce website), dynamic customer loyalty and tier programs, and real-time backend processing.",
      },
      {
        label: "Core Technical Arc",
        text: "- Database & Query Optimization: Re-engineered the category system to move away from rigid 2-level nested loops to infinite-depth traversal using WITH RECURSIVE SQL CTEs. Implemented cache invalidation strategies using tree-version mechanics with Laravel Cache. Managed zero-downtime database schema upgrades for large datasets. - Background Jobs & Queue Processing: Real-time Trash System and Bulk Delete implementations running via Laravel Queues. Handlers softly delete nested subcategories recursively and flush storage/cache. UI maintains live interactivity using AJAX polling. - Comprehensive API Layer: Microservices-influenced separation using strict headers. Token-based auth via Bearer Tokens, secure password storage, and Multi-Factor/OTP. Robust Postman Collections integration dynamically exported via custom Artisan commands.",
      },
      {
        label: "Comprehensive Feat",
        text: '- Advanced Recursive Category Architecture: Unlimited subcategory levels allowing complex taxonomies. Implemented descendant/ancestor lookups using SQL CTEs. Deep API endpoints return nested tree JSON structures up to specific depths. - Category Groups API: Admin customizable "Groups" for dynamic storefront features, allowing carousels containing categories and products natively with level type mapping embedded in API responses. - Mobile App V1 API Expansion: Full checkout capability, offline payments via multipart/form-data with up to 5MB screenshot uploads, campaign tracking, and robust filtering rules for items intercepting dynamic query scopes. New checkout summary engine computes live projections for coupons and loyalty points. - Delivery Man Ecosystem & Payroll Engine: Completely functional dispatch and delivery portal. Solved critical visibility bugs for non-vehicular constrained orders. Internal delivery teams earn base monthly salaries plus task commissions while freelancers earn dynamic commissions. Engineered Delivery Fee APIs simulating costs based on distance, volumetric weight, and vehicle mappings. - Delivery & Payment Admin Reports: Dedicated reporting interfaces for delivery operations powered by Eloquent Scopes to resolve complex SQL ambiguity. Devised advanced Seeders demonstrating operational behavior logical flows. - Customer Loyalty, Tiers, & Referral Setup: Automated tiered setups (Bronze, Silver, Gold). End-to-end payload routing dynamically pushes user preferences configuration directly to the settings vault. Integrated helper logic calculating validation tokens natively at the payload layer without persistent coupon entities. Rigorous PHPUnit testing sequence to validate the calculations. - SMS OTP Authentication Protocol: Frictionless phone-based onboarding. Tri-state workflow handler mapping logic into new, old, and existing states seamlessly without premature auth token issuance. - Frontend Images & Dashboard Theme Overrides: System-wide native theme handling supporting layout partial overrides. Devilled an intelligent CSS pyramid grid engine visualizing category structures depending on recursive depth calculations. Dedicated UI bridging image payload storage dynamically. - Admin Tools & Python Automation: Orchestrated python helpers alongside PHP loops (seed_products.py, fetch_product_images.py, cleanup_category_images.py) destroying orphaned blobs, handling mass api integration (Pixabay), and processing raw file dumps efficiently.',
      },
    ],
    detailSections: [
      {
        title: "Executive Overview",
        text: "The project represents a highly sophisticated, enterprise-grade e-commerce and logistics backend built on the Laravel ecosystem. The system expertly handles multi-leveled product taxonomy, complex logistics (Internal Delivery Payroll, Delivery Fee Engine), scalable API architectures for a vast cross-platform ecosystem (powering 3 distinct mobile apps: Vendor, Delivery, and User, alongside a comprehensive e-commerce website), dynamic customer loyalty and tier programs, and real-time backend processing.",
      },
      {
        title: "Core Technical Architecture & System Mechanics",
        text: "- Database & Query Optimization: Re-engineered the category system to move away from rigid 2-level nested loops to infinite-depth traversal using WITH RECURSIVE SQL CTEs. Implemented cache invalidation strategies using tree-version mechanics with Laravel Cache. Managed zero-downtime database schema upgrades for large datasets. - Background Jobs & Queue Processing: Real-time Trash System and Bulk Delete implementations running via Laravel Queues. Handlers softly delete nested subcategories recursively and flush storage/cache. UI maintains live interactivity using AJAX polling. - Comprehensive API Layer: Microservices-influenced separation using strict headers. Token-based auth via Bearer Tokens, secure password storage, and Multi-Factor/OTP. Robust Postman Collections integration dynamically exported via custom Artisan commands.",
      },
      {
        title: "Comprehensive Feature Set & Technical Implementations",
        text: '- Advanced Recursive Category Architecture: Unlimited subcategory levels allowing complex taxonomies. Implemented descendant/ancestor lookups using SQL CTEs. Deep API endpoints return nested tree JSON structures up to specific depths. - Category Groups API: Admin customizable "Groups" for dynamic storefront features, allowing carousels containing categories and products natively with level type mapping embedded in API responses. - Mobile App V1 API Expansion: Full checkout capability, offline payments via multipart/form-data with up to 5MB screenshot uploads, campaign tracking, and robust filtering rules for items intercepting dynamic query scopes. New checkout summary engine computes live projections for coupons and loyalty points. - Delivery Man Ecosystem & Payroll Engine: Completely functional dispatch and delivery portal. Solved critical visibility bugs for non-vehicular constrained orders. Internal delivery teams earn base monthly salaries plus task commissions while freelancers earn dynamic commissions. Engineered Delivery Fee APIs simulating costs based on distance, volumetric weight, and vehicle mappings. - Delivery & Payment Admin Reports: Dedicated reporting interfaces for delivery operations powered by Eloquent Scopes to resolve complex SQL ambiguity. Devised advanced Seeders demonstrating operational behavior logical flows. - Customer Loyalty, Tiers, & Referral Setup: Automated tiered setups (Bronze, Silver, Gold). End-to-end payload routing dynamically pushes user preferences configuration directly to the settings vault. Integrated helper logic calculating validation tokens natively at the payload layer without persistent coupon entities. Rigorous PHPUnit testing sequence to validate the calculations. - SMS OTP Authentication Protocol: Frictionless phone-based onboarding. Tri-state workflow handler mapping logic into new, old, and existing states seamlessly without premature auth token issuance. - Frontend Images & Dashboard Theme Overrides: System-wide native theme handling supporting layout partial overrides. Devilled an intelligent CSS pyramid grid engine visualizing category structures depending on recursive depth calculations. Dedicated UI bridging image payload storage dynamically. - Admin Tools & Python Automation: Orchestrated python helpers alongside PHP loops (seed_products.py, fetch_product_images.py, cleanup_category_images.py) destroying orphaned blobs, handling mass api integration (Pixabay), and processing raw file dumps efficiently.',
      },
      {
        title: "DevOps & Systems Architecture",
        text: "- Nginx & Network Tuning: Deployed infrastructure overhauls interacting with Nginx server blocks, upgrading client_max_body_size thresholds allowing large payload delivery natively. - Advanced SSH Deployment Protocols: Developed custom single-process tar stream protocols bypassing SSH packet loss, cleanly deploying 1.2 GB of unstructured binary image data natively to server nodes.",
      },
      {
        title: "My Role & Technical Impact",
        text: "Operating as the Lead Backend & DevOps Engineer, I architected this massive Laravel backend to scale. My work heavily centered on advanced database engineering, scalable API designs, caching, seamless queuing algorithms, and comprehensive DevOps pipeline optimizations.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "Al Nasser E-Commerce Landing Page",
    slug: "alnasser-ecommerce",
    href: "https://www.alnasser.eg/",
    description:
      "A high-performance, modern landing page serving as the primary digital storefront for Al Nasser, a prominent retail brand with over 52 branches in Egypt and Kuwait. Designed to balance impression-driven brand storytelling with conversion optimization.",
    thumbnail: "/work-images/alnasser.webp",
    images: ["/work-images/alnasser.webp"],
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "AOS", "i18n"],
    sections: [
      {
        title: "Details",
        text: "Key Features & Technical Architecture: - High-Performance Animations: Opted for lightweight AOS over Framer Motion to drastically reduce bundle size and protect frame rates during smooth scrolling. - Immersive WebGL Backgrounds: Engineered a custom FloatingLines environment in Three.js, deferring context loading to guarantee ultra-fast Largest Contentful Paint (LCP) times. - Complete Localization: Fully integrated i18n supporting both English and Arabic with robust Right-to-Left (RTL) capability for the GCC market. - Custom Theme Engine: Developed a lightweight useThemeMode hook to manage light/dark mode transitions mapped natively to OS preferences.",
      },
      {
        title: "Details",
        text: "My Role & Implementation: I architected and built the entire front-end of this project from scratch using React 18, establishing our team's first step into level-A corporate systems. I strictly enforced performance best practices-utilizing React.memo, aggressive code splitting for below-the-fold content via Suspense, and modern asset optimizations-resulting in a flawless 100/100 performance and SEO score across all Google Lighthouse tests.",
      },
      {
        title: "Details",
        text: "Project Status & Scale: This successfully completed Phase One serves a brand with 2+ million active cross-platform followers. It anchors the ecosystem before the rollout of the full e-commerce module, management dashboard, and mobile applications.",
      },
    ],
    client: "Al Nasser E-Commerce Landing Page",
    type: "Commerce system",
    category: "website",
    summary:
      "A high-performance, modern landing page serving as the primary digital storefront for Al Nasser, a prominent retail brand with over 52 branches in Egypt and Kuwait. Designed to balance impression-driven brand storytelling with conversion optimization.",
    scope: "React 18, TypeScript",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dark",
    stats: ["Commerce system", "React 18"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Al Nasser E-Commerce Landing Page",
    detailIntro:
      "A high-performance, modern landing page serving as the primary digital storefront for Al Nasser, a prominent retail brand with over 52 branches in Egypt and Kuwait. Designed to balance impression-driven brand storytelling with conversion optimization.",
    challenge:
      "My Role & Implementation: I architected and built the entire front-end of this project from scratch using React 18, establishing our team's first step into level-A corporate systems. I strictly enforced performance best practices-utilizing React.memo, aggressive code splitting for below-the-fold content via Suspense, and modern asset optimizations-resulting in a flawless 100/100 performance and SEO score across all Google Lighthouse tests.",
    build:
      "Project Status & Scale: This successfully completed Phase One serves a brand with 2+ million active cross-platform followers. It anchors the ecosystem before the rollout of the full e-commerce module, management dashboard, and mobile applications.",
    impact:
      "Project Status & Scale: This successfully completed Phase One serves a brand with 2+ million active cross-platform followers. It anchors the ecosystem before the rollout of the full e-commerce module, management dashboard, and mobile applications.",
    modules: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "AOS", "i18n"],
    outcomes: ["Commerce system", "React 18", "TypeScript", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features & Technical Architecture: - High-Performance Animations: Opted for lightweight AOS over Framer Motion to drastically reduce bundle size and protect frame rates during smooth scrolling. - Immersive WebGL Backgrounds: Engineered a custom FloatingLines environment in Three.js, deferring context loading to guarantee ultra-fast Largest Contentful Paint (LCP) times. - Complete Localization: Fully integrated i18n supporting both English and Arabic with robust Right-to-Left (RTL) capability for the GCC market. - Custom Theme Engine: Developed a lightweight useThemeMode hook to manage light/dark mode transitions mapped natively to OS preferences.",
      },
      {
        label: "Details",
        text: "My Role & Implementation: I architected and built the entire front-end of this project from scratch using React 18, establishing our team's first step into level-A corporate systems. I strictly enforced performance best practices-utilizing React.memo, aggressive code splitting for below-the-fold content via Suspense, and modern asset optimizations-resulting in a flawless 100/100 performance and SEO score across all Google Lighthouse tests.",
      },
      {
        label: "Details",
        text: "Project Status & Scale: This successfully completed Phase One serves a brand with 2+ million active cross-platform followers. It anchors the ecosystem before the rollout of the full e-commerce module, management dashboard, and mobile applications.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features & Technical Architecture: - High-Performance Animations: Opted for lightweight AOS over Framer Motion to drastically reduce bundle size and protect frame rates during smooth scrolling. - Immersive WebGL Backgrounds: Engineered a custom FloatingLines environment in Three.js, deferring context loading to guarantee ultra-fast Largest Contentful Paint (LCP) times. - Complete Localization: Fully integrated i18n supporting both English and Arabic with robust Right-to-Left (RTL) capability for the GCC market. - Custom Theme Engine: Developed a lightweight useThemeMode hook to manage light/dark mode transitions mapped natively to OS preferences.",
      },
      {
        title: "Details",
        text: "My Role & Implementation: I architected and built the entire front-end of this project from scratch using React 18, establishing our team's first step into level-A corporate systems. I strictly enforced performance best practices-utilizing React.memo, aggressive code splitting for below-the-fold content via Suspense, and modern asset optimizations-resulting in a flawless 100/100 performance and SEO score across all Google Lighthouse tests.",
      },
      {
        title: "Details",
        text: "Project Status & Scale: This successfully completed Phase One serves a brand with 2+ million active cross-platform followers. It anchors the ecosystem before the rollout of the full e-commerce module, management dashboard, and mobile applications.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "IGC (Influencer & UGC Campaign Platform)",
    slug: "igc-influencer-ugc-platform",
    href: "https://igc-rklp.vercel.app/",
    description:
      "A modern, high-performance two-sided marketplace designed to bridge the gap between Brands and UGC creators/Influencers. Engineered with React Router v7 and TypeScript, it features complex multi-tenant onboarding flows and integrated ROI analytics.",
    thumbnail: "/work-images/igc.webp",
    images: ["/work-images/igc.webp", "/work-images/igc2.webp"],
    stack: [
      "React Router v7",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Formik",
      "Yup",
      "Recharts",
      "Docker",
    ],
    sections: [
      {
        title: "Details",
        text: "Key Modules & Features: - Smart Onboarding: Dual-persona flow for both Brands and Influencers with secure OTP verification. - UGC Marketplace: Advanced discovery engine with granular filtering and integrated real-time messaging. - ROI & Analytics: Integrated suite featuring custom ROI calculators and performance tracking via Recharts. - Transactional Integrity: End-to-end secure checkout system and robust order management.",
      },
      {
        title: "Details",
        text: "Architectural Highlights: - SSR & Performance: Built on React Router v7 (formerly Remix) for superior SEO and faster First Contentful Paint. - Modular Logic: Utilizes Zustand for lightweight state management and custom React Contexts for complex global workflows. - Sophisticated UI: High-performance micro-animations powered by Framer Motion and responsive layouts via Tailwind CSS.",
      },
      {
        title: "Details",
        text: "My Role & Implementation: As the Lead Front-End Developer, I was responsible for transforming complex Figma designs into a high-performance, responsive UI. I architected the front-end structure using React Router v7, integrated all API endpoints, and ensured a seamless, type-safe data flow across the dual-persona marketplace.",
      },
    ],
    client: "IGC (Influencer & UGC Campaign Platform)",
    type: "Digital product",
    category: "website",
    summary:
      "A modern, high-performance two-sided marketplace designed to bridge the gap between Brands and UGC creators/Influencers. Engineered with React Router v7 and TypeScript, it features complex multi-tenant onboarding flows and integrated ROI analytics.",
    scope: "React Router v7, TypeScript",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dim",
    stats: ["Digital product", "React Router v7"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "IGC (Influencer & UGC Campaign Platform)",
    detailIntro:
      "A modern, high-performance two-sided marketplace designed to bridge the gap between Brands and UGC creators/Influencers. Engineered with React Router v7 and TypeScript, it features complex multi-tenant onboarding flows and integrated ROI analytics.",
    challenge:
      "Architectural Highlights: - SSR & Performance: Built on React Router v7 (formerly Remix) for superior SEO and faster First Contentful Paint. - Modular Logic: Utilizes Zustand for lightweight state management and custom React Contexts for complex global workflows. - Sophisticated UI: High-performance micro-animations powered by Framer Motion and responsive layouts via Tailwind CSS.",
    build:
      "My Role & Implementation: As the Lead Front-End Developer, I was responsible for transforming complex Figma designs into a high-performance, responsive UI. I architected the front-end structure using React Router v7, integrated all API endpoints, and ensured a seamless, type-safe data flow across the dual-persona marketplace.",
    impact:
      "My Role & Implementation: As the Lead Front-End Developer, I was responsible for transforming complex Figma designs into a high-performance, responsive UI. I architected the front-end structure using React Router v7, integrated all API endpoints, and ensured a seamless, type-safe data flow across the dual-persona marketplace.",
    modules: [
      "React Router v7",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Formik",
      "Yup",
      "Recharts",
    ],
    outcomes: ["Digital product", "React Router v7", "TypeScript", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Modules & Features: - Smart Onboarding: Dual-persona flow for both Brands and Influencers with secure OTP verification. - UGC Marketplace: Advanced discovery engine with granular filtering and integrated real-time messaging. - ROI & Analytics: Integrated suite featuring custom ROI calculators and performance tracking via Recharts. - Transactional Integrity: End-to-end secure checkout system and robust order management.",
      },
      {
        label: "Details",
        text: "Architectural Highlights: - SSR & Performance: Built on React Router v7 (formerly Remix) for superior SEO and faster First Contentful Paint. - Modular Logic: Utilizes Zustand for lightweight state management and custom React Contexts for complex global workflows. - Sophisticated UI: High-performance micro-animations powered by Framer Motion and responsive layouts via Tailwind CSS.",
      },
      {
        label: "Details",
        text: "My Role & Implementation: As the Lead Front-End Developer, I was responsible for transforming complex Figma designs into a high-performance, responsive UI. I architected the front-end structure using React Router v7, integrated all API endpoints, and ensured a seamless, type-safe data flow across the dual-persona marketplace.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Modules & Features: - Smart Onboarding: Dual-persona flow for both Brands and Influencers with secure OTP verification. - UGC Marketplace: Advanced discovery engine with granular filtering and integrated real-time messaging. - ROI & Analytics: Integrated suite featuring custom ROI calculators and performance tracking via Recharts. - Transactional Integrity: End-to-end secure checkout system and robust order management.",
      },
      {
        title: "Details",
        text: "Architectural Highlights: - SSR & Performance: Built on React Router v7 (formerly Remix) for superior SEO and faster First Contentful Paint. - Modular Logic: Utilizes Zustand for lightweight state management and custom React Contexts for complex global workflows. - Sophisticated UI: High-performance micro-animations powered by Framer Motion and responsive layouts via Tailwind CSS.",
      },
      {
        title: "Details",
        text: "My Role & Implementation: As the Lead Front-End Developer, I was responsible for transforming complex Figma designs into a high-performance, responsive UI. I architected the front-end structure using React Router v7, integrated all API endpoints, and ensured a seamless, type-safe data flow across the dual-persona marketplace.",
      },
    ],
    iconName: "Code2",
  },
  {
    title: "Medad Al Qemam Contracting",
    slug: "medad-alqemam",
    href: "https://medad-alqemam.com.sa/",
    description:
      "A premium, highly interactive corporate web platform for a leading contracting company in Saudi Arabia. Built to showcase civil engineering capabilities and large-scale infrastructure projects, it features immersive 3D/WebGL experiences that reflect the company's alignment with Saudi Vision 2030.",
    thumbnail: "/work-images/medad.webp",
    images: ["/work-images/medad.webp", "/work-images/medad2.webp"],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
      "i18next",
      "Supabase",
    ],
    sections: [
      {
        title: "Details",
        text: "Key Features & Implementations: - Dynamic Hero Sections: Custom WebGL components using Three.js for a premium, interactive first impression. - Scroll & Micro-Animations: Leveraged GSAP for complex scroll-based reveal effects, enhancing user engagement without sacrificing performance. - Built-in Internationalization (i18n): Seamless language switching with robust RTL (Right-to-Left) support tailored for the Saudi market. - Performance Optimization: Utilized Vite bundling, lazy loading, and asset optimization for lightning-fast HMR and minified production builds.",
      },
      {
        title: "Details",
        text: "My Role & Implementation: I built the entire front-end of this corporate platform from scratch using React 18 and TypeScript. My primary focus was on creating a premium, high-performance user experience, integrating complex Three.js and GSAP animations while ensuring the site maintains exceptional loading speeds and responsiveness.",
      },
      {
        title: "Details",
        text: "Target Audience: Clients and partners seeking cutting-edge civil engineering and large-scale infrastructure services within the Kingdom of Saudi Arabia.",
      },
    ],
    client: "Medad Al Qemam Contracting",
    type: "Web experience",
    category: "website",
    summary:
      "A premium, highly interactive corporate web platform for a leading contracting company in Saudi Arabia. Built to showcase civil engineering capabilities and large-scale infrastructure projects, it features immersive 3D/WebGL experiences that reflect the company's alignment with Saudi Vision 2030.",
    scope: "React 18, TypeScript",
    outcome: "Live project",
    visual: "portfolio",
    span: "wide",
    tone: "warm",
    stats: ["Web experience", "React 18"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Medad Al Qemam Contracting",
    detailIntro:
      "A premium, highly interactive corporate web platform for a leading contracting company in Saudi Arabia. Built to showcase civil engineering capabilities and large-scale infrastructure projects, it features immersive 3D/WebGL experiences that reflect the company's alignment with Saudi Vision 2030.",
    challenge:
      "My Role & Implementation: I built the entire front-end of this corporate platform from scratch using React 18 and TypeScript. My primary focus was on creating a premium, high-performance user experience, integrating complex Three.js and GSAP animations while ensuring the site maintains exceptional loading speeds and responsiveness.",
    build:
      "Target Audience: Clients and partners seeking cutting-edge civil engineering and large-scale infrastructure services within the Kingdom of Saudi Arabia.",
    impact:
      "Target Audience: Clients and partners seeking cutting-edge civil engineering and large-scale infrastructure services within the Kingdom of Saudi Arabia.",
    modules: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
      "i18next",
      "Supabase",
    ],
    outcomes: ["Web experience", "React 18", "TypeScript", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features & Implementations: - Dynamic Hero Sections: Custom WebGL components using Three.js for a premium, interactive first impression. - Scroll & Micro-Animations: Leveraged GSAP for complex scroll-based reveal effects, enhancing user engagement without sacrificing performance. - Built-in Internationalization (i18n): Seamless language switching with robust RTL (Right-to-Left) support tailored for the Saudi market. - Performance Optimization: Utilized Vite bundling, lazy loading, and asset optimization for lightning-fast HMR and minified production builds.",
      },
      {
        label: "Details",
        text: "My Role & Implementation: I built the entire front-end of this corporate platform from scratch using React 18 and TypeScript. My primary focus was on creating a premium, high-performance user experience, integrating complex Three.js and GSAP animations while ensuring the site maintains exceptional loading speeds and responsiveness.",
      },
      {
        label: "Details",
        text: "Target Audience: Clients and partners seeking cutting-edge civil engineering and large-scale infrastructure services within the Kingdom of Saudi Arabia.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features & Implementations: - Dynamic Hero Sections: Custom WebGL components using Three.js for a premium, interactive first impression. - Scroll & Micro-Animations: Leveraged GSAP for complex scroll-based reveal effects, enhancing user engagement without sacrificing performance. - Built-in Internationalization (i18n): Seamless language switching with robust RTL (Right-to-Left) support tailored for the Saudi market. - Performance Optimization: Utilized Vite bundling, lazy loading, and asset optimization for lightning-fast HMR and minified production builds.",
      },
      {
        title: "Details",
        text: "My Role & Implementation: I built the entire front-end of this corporate platform from scratch using React 18 and TypeScript. My primary focus was on creating a premium, high-performance user experience, integrating complex Three.js and GSAP animations while ensuring the site maintains exceptional loading speeds and responsiveness.",
      },
      {
        title: "Details",
        text: "Target Audience: Clients and partners seeking cutting-edge civil engineering and large-scale infrastructure services within the Kingdom of Saudi Arabia.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "AR Dish & 3D Model Visualizer",
    slug: "ar-dish-visuals",
    href: "https://dsm-ar.com/",
    description:
      "An immersive, cross-platform Augmented Reality (AR) experience that allows users to view high-fidelity 3D models of food dishes, furniture, and anatomy directly from their web browser. Built from scratch, focusing on high-performance 3D rendering.",
    thumbnail: "/work-images/ar.webp",
    images: ["/work-images/ar.webp", "/work-images/ar2.webp"],
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "React Query", "WebXR"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - Interactive 3D Viewer utilizing Google's &lt;model-viewer&gt; for rotating, zooming, and panning 3D models directly on the web. - Cross-Platform AR: Leverages Apple native AR Quick Look (.usdz) for iOS and Google Scene Viewer (.glb) for Android. - Animation Playback: Built-in controls for playing, pausing, and cycling through 3D model animations directly from the UI. - Dynamic Data Rendering: Utilizes a TypeScript catalog to dynamically render products, descriptions, and nutritional facts. - PBR Environments: Adjusted exposure and shadow intensities for photorealistic model blending into real-world spaces.",
      },
      {
        title: "Details",
        text: "My Role & Technical Approach: I built the entire front-end of this project from scratch. Beyond the complex 3D integration, I focused heavily on performance and SEO, successfully achieving a perfect 100 score on Google Lighthouse. I optimized the model assets (.glb, .usdz, and .webp) and established a seamless bridge between vanilla web components and the React ecosystem.",
      },
      {
        title: "Details",
        text: "Target Audience: Restaurants, furniture retainers, and businesses seeking to elevate customer engagement via an immersive 3D/AR catalog.",
      },
    ],
    client: "AR Dish & 3D Model Visualizer",
    type: "Digital product",
    category: "website",
    summary:
      "An immersive, cross-platform Augmented Reality (AR) experience that allows users to view high-fidelity 3D models of food dishes, furniture, and anatomy directly from their web browser. Built from scratch, focusing on high-performance 3D rendering.",
    scope: "React 18, TypeScript",
    outcome: "Live project",
    visual: "portfolio",
    span: "side",
    tone: "light",
    stats: ["Digital product", "React 18"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "AR Dish & 3D Model Visualizer",
    detailIntro:
      "An immersive, cross-platform Augmented Reality (AR) experience that allows users to view high-fidelity 3D models of food dishes, furniture, and anatomy directly from their web browser. Built from scratch, focusing on high-performance 3D rendering.",
    challenge:
      "My Role & Technical Approach: I built the entire front-end of this project from scratch. Beyond the complex 3D integration, I focused heavily on performance and SEO, successfully achieving a perfect 100 score on Google Lighthouse. I optimized the model assets (.glb, .usdz, and .webp) and established a seamless bridge between vanilla web components and the React ecosystem.",
    build:
      "Target Audience: Restaurants, furniture retainers, and businesses seeking to elevate customer engagement via an immersive 3D/AR catalog.",
    impact:
      "Target Audience: Restaurants, furniture retainers, and businesses seeking to elevate customer engagement via an immersive 3D/AR catalog.",
    modules: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn-ui",
      "React Query",
      "WebXR",
    ],
    outcomes: ["Digital product", "React 18", "TypeScript", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - Interactive 3D Viewer utilizing Google's &lt;model-viewer&gt; for rotating, zooming, and panning 3D models directly on the web. - Cross-Platform AR: Leverages Apple native AR Quick Look (.usdz) for iOS and Google Scene Viewer (.glb) for Android. - Animation Playback: Built-in controls for playing, pausing, and cycling through 3D model animations directly from the UI. - Dynamic Data Rendering: Utilizes a TypeScript catalog to dynamically render products, descriptions, and nutritional facts. - PBR Environments: Adjusted exposure and shadow intensities for photorealistic model blending into real-world spaces.",
      },
      {
        label: "Details",
        text: "My Role & Technical Approach: I built the entire front-end of this project from scratch. Beyond the complex 3D integration, I focused heavily on performance and SEO, successfully achieving a perfect 100 score on Google Lighthouse. I optimized the model assets (.glb, .usdz, and .webp) and established a seamless bridge between vanilla web components and the React ecosystem.",
      },
      {
        label: "Details",
        text: "Target Audience: Restaurants, furniture retainers, and businesses seeking to elevate customer engagement via an immersive 3D/AR catalog.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - Interactive 3D Viewer utilizing Google's &lt;model-viewer&gt; for rotating, zooming, and panning 3D models directly on the web. - Cross-Platform AR: Leverages Apple native AR Quick Look (.usdz) for iOS and Google Scene Viewer (.glb) for Android. - Animation Playback: Built-in controls for playing, pausing, and cycling through 3D model animations directly from the UI. - Dynamic Data Rendering: Utilizes a TypeScript catalog to dynamically render products, descriptions, and nutritional facts. - PBR Environments: Adjusted exposure and shadow intensities for photorealistic model blending into real-world spaces.",
      },
      {
        title: "Details",
        text: "My Role & Technical Approach: I built the entire front-end of this project from scratch. Beyond the complex 3D integration, I focused heavily on performance and SEO, successfully achieving a perfect 100 score on Google Lighthouse. I optimized the model assets (.glb, .usdz, and .webp) and established a seamless bridge between vanilla web components and the React ecosystem.",
      },
      {
        title: "Details",
        text: "Target Audience: Restaurants, furniture retainers, and businesses seeking to elevate customer engagement via an immersive 3D/AR catalog.",
      },
    ],
    iconName: "Code2",
  },
  {
    title: "Kemedar - Real Estate Platform",
    slug: "kemedar-real-estate-platform",
    href: "https://kemedar.com/",
    description:
      "Kemedar is a secure, comprehensive, and global real estate platform that revolutionizes how people buy and rent properties across the world. Born out of a real-life struggle with fraudulent agents and localized platforms, Kemedar organizes and secures the entire real estate process, eliminating borders, language barriers, and security risks.",
    thumbnail: "/work-images/kemedar.webp",
    images: ["/work-images/kemedar.webp"],
    stack: ["Laravel", "Blade Templates", "MongoDB", "Microservices", "Docker", "Nginx", "JWT"],
    sections: [
      {
        title: "Details",
        text: "From a Personal Crisis to a Global Solution: Every great innovation is born from a true human need. For Kemedar, it started six years ago with a distressed phone call at 7:00 PM. A ruined summer trip due to a fraudulent agent awakened a pressing need for an application that completely secures, organizes, and facilitates the real estate process. At first, the vision was local. But after hearing stories of people struggling to buy apartments abroad due to war, language barriers, and localized tech limitations, the direction became clear: Kemedar had to be global. After more than five years of relentless dedication, Kemedar was born alongside its comprehensive ecosystem featuring Kemetro, Kemmeta, and Kemedar Academy. Built by a passionate family of creative minds with over 150 years of combined experience, it provides a trusted, secure, and borderless real estate ecosystem.",
      },
      {
        title: "Details",
        text: "Key Technical Features: - Microservices Architecture for high scalability. - MongoDB for managing complex and large-scale property data. - API Gateway with JWT Authentication for secure access. - Achieved a 40% improvement in overall response times. - Fully containerized deployment using Docker and Nginx.",
      },
      {
        title: "Details",
        text: 'My Role & Technical Focus: Working as a Backend Developer within a large engineering team, I specialized in Laravel-side development. My primary mission was to modernize the platform by refactoring ancient legacy code, decoupling "spaghetti" logic into clean, scalable microservices, and optimizing data flow between the Laravel core and MongoDB.',
      },
      {
        title: "Details",
        text: 'Challenges & Solutions: A major challenge in this project was navigating and modernizing an extensive, aging legacy codebase that had grown over five years. The system contained heavily entangled sections-often referred to as "spaghetti code"-making it incredibly difficult to edit or scale without breaking existing features. My focus was on aggressively refactoring these critical bottlenecks. By dissecting the legacy logic and establishing clean, microservices-oriented boundaries, I successfully reduced technical debt, stabilized the architecture, and significantly improved the maintainability of the codebase for the entire team.',
      },
    ],
    client: "Kemedar - Real Estate Platform",
    type: "Backend platform",
    category: "website",
    summary:
      "Kemedar is a secure, comprehensive, and global real estate platform that revolutionizes how people buy and rent properties across the world. Born out of a real-life struggle with fraudulent agents and localized platforms, Kemedar organizes and secures the entire real estate process, eliminating borders, language barriers, and security risks.",
    scope: "Laravel, Blade Templates",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dark",
    stats: ["Backend platform", "Laravel"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Kemedar - Real Estate Platform",
    detailIntro:
      "Kemedar is a secure, comprehensive, and global real estate platform that revolutionizes how people buy and rent properties across the world. Born out of a real-life struggle with fraudulent agents and localized platforms, Kemedar organizes and secures the entire real estate process, eliminating borders, language barriers, and security risks.",
    challenge:
      "Key Technical Features: - Microservices Architecture for high scalability. - MongoDB for managing complex and large-scale property data. - API Gateway with JWT Authentication for secure access. - Achieved a 40% improvement in overall response times. - Fully containerized deployment using Docker and Nginx.",
    build:
      'My Role & Technical Focus: Working as a Backend Developer within a large engineering team, I specialized in Laravel-side development. My primary mission was to modernize the platform by refactoring ancient legacy code, decoupling "spaghetti" logic into clean, scalable microservices, and optimizing data flow between the Laravel core and MongoDB.',
    impact:
      'Challenges & Solutions: A major challenge in this project was navigating and modernizing an extensive, aging legacy codebase that had grown over five years. The system contained heavily entangled sections-often referred to as "spaghetti code"-making it incredibly difficult to edit or scale without breaking existing features. My focus was on aggressively refactoring these critical bottlenecks. By dissecting the legacy logic and establishing clean, microservices-oriented boundaries, I successfully reduced technical debt, stabilized the architecture, and significantly improved the maintainability of the codebase for the entire team.',
    modules: ["Laravel", "Blade Templates", "MongoDB", "Microservices", "Docker", "Nginx", "JWT"],
    outcomes: ["Backend platform", "Laravel", "Blade Templates", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "From a Personal Crisis to a Global Solution: Every great innovation is born from a true human need. For Kemedar, it started six years ago with a distressed phone call at 7:00 PM. A ruined summer trip due to a fraudulent agent awakened a pressing need for an application that completely secures, organizes, and facilitates the real estate process. At first, the vision was local. But after hearing stories of people struggling to buy apartments abroad due to war, language barriers, and localized tech limitations, the direction became clear: Kemedar had to be global. After more than five years of relentless dedication, Kemedar was born alongside its comprehensive ecosystem featuring Kemetro, Kemmeta, and Kemedar Academy. Built by a passionate family of creative minds with over 150 years of combined experience, it provides a trusted, secure, and borderless real estate ecosystem.",
      },
      {
        label: "Details",
        text: "Key Technical Features: - Microservices Architecture for high scalability. - MongoDB for managing complex and large-scale property data. - API Gateway with JWT Authentication for secure access. - Achieved a 40% improvement in overall response times. - Fully containerized deployment using Docker and Nginx.",
      },
      {
        label: "Details",
        text: 'My Role & Technical Focus: Working as a Backend Developer within a large engineering team, I specialized in Laravel-side development. My primary mission was to modernize the platform by refactoring ancient legacy code, decoupling "spaghetti" logic into clean, scalable microservices, and optimizing data flow between the Laravel core and MongoDB.',
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "From a Personal Crisis to a Global Solution: Every great innovation is born from a true human need. For Kemedar, it started six years ago with a distressed phone call at 7:00 PM. A ruined summer trip due to a fraudulent agent awakened a pressing need for an application that completely secures, organizes, and facilitates the real estate process. At first, the vision was local. But after hearing stories of people struggling to buy apartments abroad due to war, language barriers, and localized tech limitations, the direction became clear: Kemedar had to be global. After more than five years of relentless dedication, Kemedar was born alongside its comprehensive ecosystem featuring Kemetro, Kemmeta, and Kemedar Academy. Built by a passionate family of creative minds with over 150 years of combined experience, it provides a trusted, secure, and borderless real estate ecosystem.",
      },
      {
        title: "Details",
        text: "Key Technical Features: - Microservices Architecture for high scalability. - MongoDB for managing complex and large-scale property data. - API Gateway with JWT Authentication for secure access. - Achieved a 40% improvement in overall response times. - Fully containerized deployment using Docker and Nginx.",
      },
      {
        title: "Details",
        text: 'My Role & Technical Focus: Working as a Backend Developer within a large engineering team, I specialized in Laravel-side development. My primary mission was to modernize the platform by refactoring ancient legacy code, decoupling "spaghetti" logic into clean, scalable microservices, and optimizing data flow between the Laravel core and MongoDB.',
      },
      {
        title: "Details",
        text: 'Challenges & Solutions: A major challenge in this project was navigating and modernizing an extensive, aging legacy codebase that had grown over five years. The system contained heavily entangled sections-often referred to as "spaghetti code"-making it incredibly difficult to edit or scale without breaking existing features. My focus was on aggressively refactoring these critical bottlenecks. By dissecting the legacy logic and establishing clean, microservices-oriented boundaries, I successfully reduced technical debt, stabilized the architecture, and significantly improved the maintainability of the codebase for the entire team.',
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "3Dentix",
    slug: "dental-osrais",
    href: "https://3dentix.com/",
    description:
      "3Dentix is a multilingual dental website available in English, French, and Spanish. It features four main pages: Home, About, Prices, and Contact. I received the UI from my team and handled the full implementation, including building the project, adding animations, and ensuring full responsiveness across devices.",
    thumbnail: "/work-images/dental.png",
    images: ["/work-images/dental.png", "/work-images/dentalosrais2.png"],
    stack: ["React", "Tailwindcss", "Multilingual", "Animation"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - Multilingual support: English, French, and Spanish. - Four core pages: Home, About, Prices, and Contact. - Responsive design for all devices. - Smooth animations for enhanced user experience.",
      },
      {
        title: "Details",
        text: "My Role: I received the UI from my team and built the entire project, implementing the design, adding animations, and ensuring the site is fully responsive.",
      },
      {
        title: "Details",
        text: "Target Audience: Dental clients and visitors seeking information and services in multiple languages.",
      },
    ],
    client: "3Dentix",
    type: "Web experience",
    category: "website",
    summary:
      "3Dentix is a multilingual dental website available in English, French, and Spanish. It features four main pages: Home, About, Prices, and Contact. I received the UI from my team and handled the full implementation, including building the project, adding animations, and ensuring full responsiveness across devices.",
    scope: "React, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dim",
    stats: ["Web experience", "React"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "3Dentix",
    detailIntro:
      "3Dentix is a multilingual dental website available in English, French, and Spanish. It features four main pages: Home, About, Prices, and Contact. I received the UI from my team and handled the full implementation, including building the project, adding animations, and ensuring full responsiveness across devices.",
    challenge:
      "My Role: I received the UI from my team and built the entire project, implementing the design, adding animations, and ensuring the site is fully responsive.",
    build:
      "Target Audience: Dental clients and visitors seeking information and services in multiple languages.",
    impact:
      "Target Audience: Dental clients and visitors seeking information and services in multiple languages.",
    modules: ["React", "Tailwindcss", "Multilingual", "Animation"],
    outcomes: ["Web experience", "React", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - Multilingual support: English, French, and Spanish. - Four core pages: Home, About, Prices, and Contact. - Responsive design for all devices. - Smooth animations for enhanced user experience.",
      },
      {
        label: "Details",
        text: "My Role: I received the UI from my team and built the entire project, implementing the design, adding animations, and ensuring the site is fully responsive.",
      },
      {
        label: "Details",
        text: "Target Audience: Dental clients and visitors seeking information and services in multiple languages.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - Multilingual support: English, French, and Spanish. - Four core pages: Home, About, Prices, and Contact. - Responsive design for all devices. - Smooth animations for enhanced user experience.",
      },
      {
        title: "Details",
        text: "My Role: I received the UI from my team and built the entire project, implementing the design, adding animations, and ensuring the site is fully responsive.",
      },
      {
        title: "Details",
        text: "Target Audience: Dental clients and visitors seeking information and services in multiple languages.",
      },
    ],
    iconName: "Code2",
  },
  {
    title: "polaris-marines",
    slug: "polrais-marine",
    href: "https://polarismarines.com/",
    description:
      "Polrais Marine is a corporate website for a marine company specializing in building ships locally and exporting them worldwide. The site is designed and developed using React, with a strong focus on performance, SEO, and accessibility, achieving a perfect score on Google Insights. I handled the full setup, including deployment and domain acquisition.",
    thumbnail: "/work-images/polraismarine.png",
    images: ["/work-images/polraismarine.png", "/work-images/polraismarine2.png"],
    stack: ["React", "Tailwindcss", "SEO", "Accessibility"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - Corporate website for a marine company specializing in shipbuilding and global export. - Designed and built with React for optimal performance and maintainability. - Enhanced SEO and accessibility, achieving 100% scores on Google Insights. - Fully responsive and optimized for all devices.",
      },
      {
        title: "Details",
        text: "My Role: I was responsible for the entire project lifecycle: design, development, performance optimization, SEO, accessibility, deployment, and domain setup.",
      },
      {
        title: "Details",
        text: "Target Audience: International clients and partners seeking reliable shipbuilding and export services.",
      },
    ],
    client: "polaris-marines",
    type: "Web experience",
    category: "website",
    summary:
      "Polrais Marine is a corporate website for a marine company specializing in building ships locally and exporting them worldwide. The site is designed and developed using React, with a strong focus on performance, SEO, and accessibility, achieving a perfect score on Google Insights. I handled the full setup, including deployment and domain acquisition.",
    scope: "React, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "warm",
    stats: ["Web experience", "React"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "polaris-marines",
    detailIntro:
      "Polrais Marine is a corporate website for a marine company specializing in building ships locally and exporting them worldwide. The site is designed and developed using React, with a strong focus on performance, SEO, and accessibility, achieving a perfect score on Google Insights. I handled the full setup, including deployment and domain acquisition.",
    challenge:
      "My Role: I was responsible for the entire project lifecycle: design, development, performance optimization, SEO, accessibility, deployment, and domain setup.",
    build:
      "Target Audience: International clients and partners seeking reliable shipbuilding and export services.",
    impact:
      "Target Audience: International clients and partners seeking reliable shipbuilding and export services.",
    modules: ["React", "Tailwindcss", "SEO", "Accessibility"],
    outcomes: ["Web experience", "React", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - Corporate website for a marine company specializing in shipbuilding and global export. - Designed and built with React for optimal performance and maintainability. - Enhanced SEO and accessibility, achieving 100% scores on Google Insights. - Fully responsive and optimized for all devices.",
      },
      {
        label: "Details",
        text: "My Role: I was responsible for the entire project lifecycle: design, development, performance optimization, SEO, accessibility, deployment, and domain setup.",
      },
      {
        label: "Details",
        text: "Target Audience: International clients and partners seeking reliable shipbuilding and export services.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - Corporate website for a marine company specializing in shipbuilding and global export. - Designed and built with React for optimal performance and maintainability. - Enhanced SEO and accessibility, achieving 100% scores on Google Insights. - Fully responsive and optimized for all devices.",
      },
      {
        title: "Details",
        text: "My Role: I was responsible for the entire project lifecycle: design, development, performance optimization, SEO, accessibility, deployment, and domain setup.",
      },
      {
        title: "Details",
        text: "Target Audience: International clients and partners seeking reliable shipbuilding and export services.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "Nourtha-Tech V2",
    slug: "nourtha-tech-v2",
    href: "https://nourtha-techs.inomhub.com/",
    description:
      "Nourtha-Tech V2 is a professional portfolio website for a Saudi tech company, featuring 8 distinct pages that highlight the company's services, solutions, and vision. The site is fully responsive and supports both Arabic and English localization.",
    thumbnail: "/work-images/noutha-techv2.png",
    images: ["/work-images/noutha-techv2-2.png", "/work-images/noutha-techv2.png"],
    stack: ["React", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - 8 pages showcasing company services and solutions. - Fully responsive design for all devices. - Multilingual support for Arabic and English. - Modern UI built with React and Tailwind CSS.",
      },
      {
        title: "Details",
        text: "My Role: I built the entire project from scratch, handling design, development, and deployment using React and Tailwind CSS.",
      },
      {
        title: "Details",
        text: "Target Audience: Clients and partners seeking innovative tech solutions in Saudi Arabia.",
      },
    ],
    client: "Nourtha-Tech V2",
    type: "Web experience",
    category: "website",
    summary:
      "Nourtha-Tech V2 is a professional portfolio website for a Saudi tech company, featuring 8 distinct pages that highlight the company's services, solutions, and vision. The site is fully responsive and supports both Arabic and English localization.",
    scope: "React, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "light",
    stats: ["Web experience", "React"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Nourtha-Tech V2",
    detailIntro:
      "Nourtha-Tech V2 is a professional portfolio website for a Saudi tech company, featuring 8 distinct pages that highlight the company's services, solutions, and vision. The site is fully responsive and supports both Arabic and English localization.",
    challenge:
      "My Role: I built the entire project from scratch, handling design, development, and deployment using React and Tailwind CSS.",
    build:
      "Target Audience: Clients and partners seeking innovative tech solutions in Saudi Arabia.",
    impact:
      "Target Audience: Clients and partners seeking innovative tech solutions in Saudi Arabia.",
    modules: ["React", "Tailwindcss"],
    outcomes: ["Web experience", "React", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - 8 pages showcasing company services and solutions. - Fully responsive design for all devices. - Multilingual support for Arabic and English. - Modern UI built with React and Tailwind CSS.",
      },
      {
        label: "Details",
        text: "My Role: I built the entire project from scratch, handling design, development, and deployment using React and Tailwind CSS.",
      },
      {
        label: "Details",
        text: "Target Audience: Clients and partners seeking innovative tech solutions in Saudi Arabia.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - 8 pages showcasing company services and solutions. - Fully responsive design for all devices. - Multilingual support for Arabic and English. - Modern UI built with React and Tailwind CSS.",
      },
      {
        title: "Details",
        text: "My Role: I built the entire project from scratch, handling design, development, and deployment using React and Tailwind CSS.",
      },
      {
        title: "Details",
        text: "Target Audience: Clients and partners seeking innovative tech solutions in Saudi Arabia.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "Nourtha-Tech",
    slug: "nourtha-tech",
    href: "https://nourtha-tech.inomhub.com",
    description:
      "Nourtha-Tech is a cutting-edge landing page designed for a leading tech company in Saudi Arabia. Built entirely from scratch, it showcases the company's innovative solutions, services, and vision. The website features a modern, responsive design with full localization support, ensuring accessibility for both Arabic and English-speaking audiences. Developed using React-Vite and Tailwind CSS, it delivers a seamless user experience and highlights the company's commitment to technological excellence.",
    thumbnail: "/work-images/noutha-tech.png",
    images: ["/work-images/noutha-tech.png", "/work-images/noutha-tech2.png"],
    stack: ["React", "AOS", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - Fully responsive design optimized for all devices. - Multilingual support for Arabic and English. - Integrated email system for seamless communication. - Built with React-Vite and Tailwind CSS for performance and scalability. - Represents the company's innovative approach to technology in Saudi Arabia.",
      },
    ],
    client: "Nourtha-Tech",
    type: "Web experience",
    category: "website",
    summary:
      "Nourtha-Tech is a cutting-edge landing page designed for a leading tech company in Saudi Arabia. Built entirely from scratch, it showcases the company's innovative solutions, services, and vision. The website features a modern, responsive design with full localization support, ensuring accessibility for both Arabic and English-speaking audiences. Developed using React-Vite and Tailwind CSS, it delivers a seamless user experience and highlights the company's commitment to technological excellence.",
    scope: "React, AOS",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dark",
    stats: ["Web experience", "React"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Nourtha-Tech",
    detailIntro:
      "Nourtha-Tech is a cutting-edge landing page designed for a leading tech company in Saudi Arabia. Built entirely from scratch, it showcases the company's innovative solutions, services, and vision. The website features a modern, responsive design with full localization support, ensuring accessibility for both Arabic and English-speaking audiences. Developed using React-Vite and Tailwind CSS, it delivers a seamless user experience and highlights the company's commitment to technological excellence.",
    challenge:
      "Key Features: - Fully responsive design optimized for all devices. - Multilingual support for Arabic and English. - Integrated email system for seamless communication. - Built with React-Vite and Tailwind CSS for performance and scalability. - Represents the company's innovative approach to technology in Saudi Arabia.",
    build:
      "Key Features: - Fully responsive design optimized for all devices. - Multilingual support for Arabic and English. - Integrated email system for seamless communication. - Built with React-Vite and Tailwind CSS for performance and scalability. - Represents the company's innovative approach to technology in Saudi Arabia.",
    impact:
      "Key Features: - Fully responsive design optimized for all devices. - Multilingual support for Arabic and English. - Integrated email system for seamless communication. - Built with React-Vite and Tailwind CSS for performance and scalability. - Represents the company's innovative approach to technology in Saudi Arabia.",
    modules: ["React", "AOS", "Tailwindcss"],
    outcomes: ["Web experience", "React", "AOS", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - Fully responsive design optimized for all devices. - Multilingual support for Arabic and English. - Integrated email system for seamless communication. - Built with React-Vite and Tailwind CSS for performance and scalability. - Represents the company's innovative approach to technology in Saudi Arabia.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - Fully responsive design optimized for all devices. - Multilingual support for Arabic and English. - Integrated email system for seamless communication. - Built with React-Vite and Tailwind CSS for performance and scalability. - Represents the company's innovative approach to technology in Saudi Arabia.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "Fanzvar",
    slug: "fanzvar",
    href: "https://fanzvar.rkmait.com",
    description:
      "Fanzvar is a comprehensive platform that brings together social, entertainment, business, development, and services for local, regional, and global sports fans - with a special focus on football enthusiasts from different clubs and nations worldwide.",
    thumbnail: "/work-images/fanvarl.png",
    images: ["/work-images/fanzvar.jpg", "/work-images/fanvarl.png"],
    stack: ["PHP", "Laravel", "Filament", "Reverb", "Livewire", "Flutter"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - Multi-user system with real-time project-specific chat rooms. - Content center with full multilingual support (Arabic, Hebrew, English). - Advanced employee management (roles, project assignments, approvals). - Ticketing and help desk system for inquiries and project issues. - Attendance tracking with QR-based GPS check-in and shift management. - Financial module for debt and payment tracking across users and projects. - Custom user approval workflows and flexible role assignment. - Complete multilingual admin dashboard with full control via Filament.",
      },
      {
        title: "Details",
        text: "My Role: I developed key core features including the competitions module, reels (media sharing), and the real-time chatting system. I also implemented JWT-based authentication for secure API access, built the full admin panel using Filament, and integrated notification systems for both users and admins.",
      },
      {
        title: "Details",
        text: "Target Audience: Sports fans, contractors, consultants, project managers, and administrative teams seeking an all-in-one platform to manage communities, communication, and operational workflows.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Handling multilingual content while maintaining an intuitive UX was a major challenge. I developed a dynamic language switching system with seamless localization for both frontend and admin sections. Real-time chat and notification delivery were implemented using Laravel Reverb and WebSockets, ensuring smooth cross-region communication. To solve timezone-related attendance recording issues, I standardized time handling based on user location and server synchronization.",
      },
    ],
    client: "Fanzvar",
    type: "Backend platform",
    category: "website",
    summary:
      "Fanzvar is a comprehensive platform that brings together social, entertainment, business, development, and services for local, regional, and global sports fans - with a special focus on football enthusiasts from different clubs and nations worldwide.",
    scope: "PHP, Laravel",
    outcome: "Live project",
    visual: "portfolio",
    span: "wide",
    tone: "dim",
    stats: ["Backend platform", "PHP"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Fanzvar",
    detailIntro:
      "Fanzvar is a comprehensive platform that brings together social, entertainment, business, development, and services for local, regional, and global sports fans - with a special focus on football enthusiasts from different clubs and nations worldwide.",
    challenge:
      "My Role: I developed key core features including the competitions module, reels (media sharing), and the real-time chatting system. I also implemented JWT-based authentication for secure API access, built the full admin panel using Filament, and integrated notification systems for both users and admins.",
    build:
      "Target Audience: Sports fans, contractors, consultants, project managers, and administrative teams seeking an all-in-one platform to manage communities, communication, and operational workflows.",
    impact:
      "Challenges and Solutions: Handling multilingual content while maintaining an intuitive UX was a major challenge. I developed a dynamic language switching system with seamless localization for both frontend and admin sections. Real-time chat and notification delivery were implemented using Laravel Reverb and WebSockets, ensuring smooth cross-region communication. To solve timezone-related attendance recording issues, I standardized time handling based on user location and server synchronization.",
    modules: ["PHP", "Laravel", "Filament", "Reverb", "Livewire", "Flutter"],
    outcomes: ["Backend platform", "PHP", "Laravel", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - Multi-user system with real-time project-specific chat rooms. - Content center with full multilingual support (Arabic, Hebrew, English). - Advanced employee management (roles, project assignments, approvals). - Ticketing and help desk system for inquiries and project issues. - Attendance tracking with QR-based GPS check-in and shift management. - Financial module for debt and payment tracking across users and projects. - Custom user approval workflows and flexible role assignment. - Complete multilingual admin dashboard with full control via Filament.",
      },
      {
        label: "Details",
        text: "My Role: I developed key core features including the competitions module, reels (media sharing), and the real-time chatting system. I also implemented JWT-based authentication for secure API access, built the full admin panel using Filament, and integrated notification systems for both users and admins.",
      },
      {
        label: "Details",
        text: "Target Audience: Sports fans, contractors, consultants, project managers, and administrative teams seeking an all-in-one platform to manage communities, communication, and operational workflows.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - Multi-user system with real-time project-specific chat rooms. - Content center with full multilingual support (Arabic, Hebrew, English). - Advanced employee management (roles, project assignments, approvals). - Ticketing and help desk system for inquiries and project issues. - Attendance tracking with QR-based GPS check-in and shift management. - Financial module for debt and payment tracking across users and projects. - Custom user approval workflows and flexible role assignment. - Complete multilingual admin dashboard with full control via Filament.",
      },
      {
        title: "Details",
        text: "My Role: I developed key core features including the competitions module, reels (media sharing), and the real-time chatting system. I also implemented JWT-based authentication for secure API access, built the full admin panel using Filament, and integrated notification systems for both users and admins.",
      },
      {
        title: "Details",
        text: "Target Audience: Sports fans, contractors, consultants, project managers, and administrative teams seeking an all-in-one platform to manage communities, communication, and operational workflows.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Handling multilingual content while maintaining an intuitive UX was a major challenge. I developed a dynamic language switching system with seamless localization for both frontend and admin sections. Real-time chat and notification delivery were implemented using Laravel Reverb and WebSockets, ensuring smooth cross-region communication. To solve timezone-related attendance recording issues, I standardized time handling based on user location and server synchronization.",
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "Inomhub",
    slug: "inomhub",
    href: "https://inomhub.com",
    description:
      "Inomhub is the official landing page for a parent company that aligns and connects multiple businesses under one unified brand. Built using PHP and Bootstrap, the website presents a professional and responsive interface, showcasing the group's vision and services. It includes full localization support and an integrated email system.",
    thumbnail: "/work-images/inomhub.png",
    images: ["/work-images/inomhub.png", "/work-images/inomhub2.png"],
    stack: ["PHP", "AOS", "Bootstrap"],
    sections: [
      {
        title: "Details",
        text: "Key Features: A corporate landing page for Inomhub, a company that brings together multiple businesses under one unified structure. Built with PHP and Bootstrap, the site is responsive, multilingual, and optimized for a professional online presence.",
      },
      {
        title: "Details",
        text: "My Role: I was responsible for the complete design, development, deployment, and infrastructure setup of the website. This included creating the UI/UX, implementing multilingual support, configuring the email server, and managing deployment.",
      },
      {
        title: "Details",
        text: "Target Audience: Business stakeholders, partners, and clients seeking to understand and engage with the group of companies under Inomhub.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Ensuring clean architecture, smooth deployment, and localization for multiple languages was essential. I addressed this by using lightweight PHP for the backend, Bootstrap for responsive design, and proper server configuration for both email and multilingual routing.",
      },
    ],
    client: "Inomhub",
    type: "Web experience",
    category: "website",
    summary:
      "Inomhub is the official landing page for a parent company that aligns and connects multiple businesses under one unified brand. Built using PHP and Bootstrap, the website presents a professional and responsive interface, showcasing the group's vision and services. It includes full localization support and an integrated email system.",
    scope: "PHP, AOS",
    outcome: "Live project",
    visual: "portfolio",
    span: "side",
    tone: "warm",
    stats: ["Web experience", "PHP"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Inomhub",
    detailIntro:
      "Inomhub is the official landing page for a parent company that aligns and connects multiple businesses under one unified brand. Built using PHP and Bootstrap, the website presents a professional and responsive interface, showcasing the group's vision and services. It includes full localization support and an integrated email system.",
    challenge:
      "My Role: I was responsible for the complete design, development, deployment, and infrastructure setup of the website. This included creating the UI/UX, implementing multilingual support, configuring the email server, and managing deployment.",
    build:
      "Target Audience: Business stakeholders, partners, and clients seeking to understand and engage with the group of companies under Inomhub.",
    impact:
      "Challenges and Solutions: Ensuring clean architecture, smooth deployment, and localization for multiple languages was essential. I addressed this by using lightweight PHP for the backend, Bootstrap for responsive design, and proper server configuration for both email and multilingual routing.",
    modules: ["PHP", "AOS", "Bootstrap"],
    outcomes: ["Web experience", "PHP", "AOS", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: A corporate landing page for Inomhub, a company that brings together multiple businesses under one unified structure. Built with PHP and Bootstrap, the site is responsive, multilingual, and optimized for a professional online presence.",
      },
      {
        label: "Details",
        text: "My Role: I was responsible for the complete design, development, deployment, and infrastructure setup of the website. This included creating the UI/UX, implementing multilingual support, configuring the email server, and managing deployment.",
      },
      {
        label: "Details",
        text: "Target Audience: Business stakeholders, partners, and clients seeking to understand and engage with the group of companies under Inomhub.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: A corporate landing page for Inomhub, a company that brings together multiple businesses under one unified structure. Built with PHP and Bootstrap, the site is responsive, multilingual, and optimized for a professional online presence.",
      },
      {
        title: "Details",
        text: "My Role: I was responsible for the complete design, development, deployment, and infrastructure setup of the website. This included creating the UI/UX, implementing multilingual support, configuring the email server, and managing deployment.",
      },
      {
        title: "Details",
        text: "Target Audience: Business stakeholders, partners, and clients seeking to understand and engage with the group of companies under Inomhub.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Ensuring clean architecture, smooth deployment, and localization for multiple languages was essential. I addressed this by using lightweight PHP for the backend, Bootstrap for responsive design, and proper server configuration for both email and multilingual routing.",
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "Kenz Contractor and Consultant Management",
    slug: "kenz",
    href: "https://kenz.rkmait.com/admin",
    description:
      "Kenz is a powerful, multi-role contractor and consultant management system tailored for large-scale operational control. The system includes multi-user access, real-time chat, multilingual support, employee and content center management, ticketing, attendance, debt tracking, and more. Built with responsiveness and scalability in mind, it ensures a seamless experience across devices and user roles.",
    thumbnail: "/work-images/thumnail.png",
    images: ["/work-images/chat-filament.png", "/work-images/filament.png"],
    stack: ["PHP", "Filament", "LiveWire", "Laravel", "Reverb"],
    sections: [
      {
        title: "Details",
        text: "Key Features: - Multi-user system with real-time chat for project-specific communication. - Content center management with full support for Arabic, Hebrew, and English. - Employee management with role and project assignments. - Ticketing system for project-related inquiries and issues. - Attendance tracking with GPS check-in and shift management. - Debt management and financial tracking for users and projects. - User approval workflow before login and custom role assignment. - Multilingual dashboard and full admin control via Filament.",
      },
      {
        title: "Details",
        text: "My Role: I developed the complete system architecture and implementation-from designing the database structure and user roles to integrating multilingual support and real-time features.",
      },
      {
        title: "Details",
        text: "Target Audience: Contractors, consultants, project managers, and administrative teams seeking a robust platform to manage teams, tasks, and communication in one place.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Managing multilingual content while keeping the UI intuitive was challenging. I implemented a dynamic language switcher and content localization for all user-facing and admin sections. Real-time communication was achieved using Laravel Reverb for WebSocket integration. I also tackled timezone-related attendance issues to ensure accurate tracking across regions.",
      },
    ],
    client: "Kenz Contractor and Consultant Management",
    type: "Backend platform",
    category: "website",
    summary:
      "Kenz is a powerful, multi-role contractor and consultant management system tailored for large-scale operational control. The system includes multi-user access, real-time chat, multilingual support, employee and content center management, ticketing, attendance, debt tracking, and more. Built with responsiveness and scalability in mind, it ensures a seamless experience across devices and user roles.",
    scope: "PHP, Filament",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "light",
    stats: ["Backend platform", "PHP"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Kenz Contractor and Consultant Management",
    detailIntro:
      "Kenz is a powerful, multi-role contractor and consultant management system tailored for large-scale operational control. The system includes multi-user access, real-time chat, multilingual support, employee and content center management, ticketing, attendance, debt tracking, and more. Built with responsiveness and scalability in mind, it ensures a seamless experience across devices and user roles.",
    challenge:
      "My Role: I developed the complete system architecture and implementation-from designing the database structure and user roles to integrating multilingual support and real-time features.",
    build:
      "Target Audience: Contractors, consultants, project managers, and administrative teams seeking a robust platform to manage teams, tasks, and communication in one place.",
    impact:
      "Challenges and Solutions: Managing multilingual content while keeping the UI intuitive was challenging. I implemented a dynamic language switcher and content localization for all user-facing and admin sections. Real-time communication was achieved using Laravel Reverb for WebSocket integration. I also tackled timezone-related attendance issues to ensure accurate tracking across regions.",
    modules: ["PHP", "Filament", "LiveWire", "Laravel", "Reverb"],
    outcomes: ["Backend platform", "PHP", "Filament", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: - Multi-user system with real-time chat for project-specific communication. - Content center management with full support for Arabic, Hebrew, and English. - Employee management with role and project assignments. - Ticketing system for project-related inquiries and issues. - Attendance tracking with GPS check-in and shift management. - Debt management and financial tracking for users and projects. - User approval workflow before login and custom role assignment. - Multilingual dashboard and full admin control via Filament.",
      },
      {
        label: "Details",
        text: "My Role: I developed the complete system architecture and implementation-from designing the database structure and user roles to integrating multilingual support and real-time features.",
      },
      {
        label: "Details",
        text: "Target Audience: Contractors, consultants, project managers, and administrative teams seeking a robust platform to manage teams, tasks, and communication in one place.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: - Multi-user system with real-time chat for project-specific communication. - Content center management with full support for Arabic, Hebrew, and English. - Employee management with role and project assignments. - Ticketing system for project-related inquiries and issues. - Attendance tracking with GPS check-in and shift management. - Debt management and financial tracking for users and projects. - User approval workflow before login and custom role assignment. - Multilingual dashboard and full admin control via Filament.",
      },
      {
        title: "Details",
        text: "My Role: I developed the complete system architecture and implementation-from designing the database structure and user roles to integrating multilingual support and real-time features.",
      },
      {
        title: "Details",
        text: "Target Audience: Contractors, consultants, project managers, and administrative teams seeking a robust platform to manage teams, tasks, and communication in one place.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Managing multilingual content while keeping the UI intuitive was challenging. I implemented a dynamic language switcher and content localization for all user-facing and admin sections. Real-time communication was achieved using Laravel Reverb for WebSocket integration. I also tackled timezone-related attendance issues to ensure accurate tracking across regions.",
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "Conflict Solution",
    slug: "cslf",
    href: "https://cslf.sa",
    description:
      "Conflict Solution is a professional portfolio website designed for a law company. The website features eight distinct pages that showcase the firm's services and expertise. Built with responsiveness in mind, it ensures a seamless browsing experience across devices.",
    thumbnail: "/work-images/78.jpeg",
    images: ["/work-images/78.jpeg", "/work-images/cslf2.png"],
    stack: ["ReactJs", "AOS", "CSS"],
    sections: [
      {
        title: "Details",
        text: "Key Features: Eight pages tailored to highlight the law firm's offerings. Fully responsive design for optimal viewing on any device. Smooth animations integrated using AOS Animate On Scroll.",
      },
      {
        title: "Details",
        text: "My Role: I developed the entire project from scratch, handling the design, coding, and deployment.",
      },
      {
        title: "Details",
        text: "Target Audience: Clients seeking legal services and information about the law firm' expertise.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: During development, I encountered browser compatibility issues and challenges with CSS not rendering properly on the client's phone. Using my experience, I resolved these issues to ensure a flawless user experience.",
      },
    ],
    client: "Conflict Solution",
    type: "Web experience",
    category: "website",
    summary:
      "Conflict Solution is a professional portfolio website designed for a law company. The website features eight distinct pages that showcase the firm's services and expertise. Built with responsiveness in mind, it ensures a seamless browsing experience across devices.",
    scope: "ReactJs, AOS",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dark",
    stats: ["Web experience", "ReactJs"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Conflict Solution",
    detailIntro:
      "Conflict Solution is a professional portfolio website designed for a law company. The website features eight distinct pages that showcase the firm's services and expertise. Built with responsiveness in mind, it ensures a seamless browsing experience across devices.",
    challenge:
      "My Role: I developed the entire project from scratch, handling the design, coding, and deployment.",
    build:
      "Target Audience: Clients seeking legal services and information about the law firm' expertise.",
    impact:
      "Challenges and Solutions: During development, I encountered browser compatibility issues and challenges with CSS not rendering properly on the client's phone. Using my experience, I resolved these issues to ensure a flawless user experience.",
    modules: ["ReactJs", "AOS", "CSS"],
    outcomes: ["Web experience", "ReactJs", "AOS", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Eight pages tailored to highlight the law firm's offerings. Fully responsive design for optimal viewing on any device. Smooth animations integrated using AOS Animate On Scroll.",
      },
      {
        label: "Details",
        text: "My Role: I developed the entire project from scratch, handling the design, coding, and deployment.",
      },
      {
        label: "Details",
        text: "Target Audience: Clients seeking legal services and information about the law firm' expertise.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Eight pages tailored to highlight the law firm's offerings. Fully responsive design for optimal viewing on any device. Smooth animations integrated using AOS Animate On Scroll.",
      },
      {
        title: "Details",
        text: "My Role: I developed the entire project from scratch, handling the design, coding, and deployment.",
      },
      {
        title: "Details",
        text: "Target Audience: Clients seeking legal services and information about the law firm' expertise.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: During development, I encountered browser compatibility issues and challenges with CSS not rendering properly on the client's phone. Using my experience, I resolved these issues to ensure a flawless user experience.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "Inovent",
    slug: "inovent",
    href: "https://inovet.inom-techs.com",
    description:
      "Inovent is a website designed for a virtual events platform. It leverages virtual reality (VR) and Unity, allowing users to navigate with a keyboard or VR headset and create immersive environments. The platform enhances event engagement by providing an interactive and dynamic experience for attendees.",
    thumbnail: "/work-images/inovent.png",
    images: ["/work-images/inovent.png", "/work-images/inovent1.png"],
    stack: ["ReactJs Vite", "AOS", "CSS"],
    sections: [
      {
        title: "Details",
        text: "Key Features: A web application for virtual events utilizing technologies like virtual reality VR and Unity. Users can navigate using a keyboard or VR headset and create their own virtual environments. Designed to enhance event engagement by attracting a larger audience.",
      },
      {
        title: "Details",
        text: "My Role: I developed the entire front-end of the project, handling UI design, interactivity, and responsiveness.",
      },
      {
        title: "Details",
        text: "Target Audience: Event organizers and attendees looking for an immersive virtual event experience.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Ensuring smooth performance and responsiveness across various devices was a key challenge. By optimizing assets and leveraging efficient rendering techniques, I provided a seamless user experience.",
      },
    ],
    client: "Inovent",
    type: "Web experience",
    category: "website",
    summary:
      "Inovent is a website designed for a virtual events platform. It leverages virtual reality (VR) and Unity, allowing users to navigate with a keyboard or VR headset and create immersive environments. The platform enhances event engagement by providing an interactive and dynamic experience for attendees.",
    scope: "ReactJs Vite, AOS",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dim",
    stats: ["Web experience", "ReactJs Vite"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Inovent",
    detailIntro:
      "Inovent is a website designed for a virtual events platform. It leverages virtual reality (VR) and Unity, allowing users to navigate with a keyboard or VR headset and create immersive environments. The platform enhances event engagement by providing an interactive and dynamic experience for attendees.",
    challenge:
      "My Role: I developed the entire front-end of the project, handling UI design, interactivity, and responsiveness.",
    build:
      "Target Audience: Event organizers and attendees looking for an immersive virtual event experience.",
    impact:
      "Challenges and Solutions: Ensuring smooth performance and responsiveness across various devices was a key challenge. By optimizing assets and leveraging efficient rendering techniques, I provided a seamless user experience.",
    modules: ["ReactJs Vite", "AOS", "CSS"],
    outcomes: ["Web experience", "ReactJs Vite", "AOS", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: A web application for virtual events utilizing technologies like virtual reality VR and Unity. Users can navigate using a keyboard or VR headset and create their own virtual environments. Designed to enhance event engagement by attracting a larger audience.",
      },
      {
        label: "Details",
        text: "My Role: I developed the entire front-end of the project, handling UI design, interactivity, and responsiveness.",
      },
      {
        label: "Details",
        text: "Target Audience: Event organizers and attendees looking for an immersive virtual event experience.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: A web application for virtual events utilizing technologies like virtual reality VR and Unity. Users can navigate using a keyboard or VR headset and create their own virtual environments. Designed to enhance event engagement by attracting a larger audience.",
      },
      {
        title: "Details",
        text: "My Role: I developed the entire front-end of the project, handling UI design, interactivity, and responsiveness.",
      },
      {
        title: "Details",
        text: "Target Audience: Event organizers and attendees looking for an immersive virtual event experience.",
      },
      {
        title: "Details",
        text: "Challenges and Solutions: Ensuring smooth performance and responsiveness across various devices was a key challenge. By optimizing assets and leveraging efficient rendering techniques, I provided a seamless user experience.",
      },
    ],
    iconName: "Code2",
  },
  {
    title: "Out Seller landing page",
    slug: "out-seller-landing-page",
    href: "http://outseller.rkmait.com/",
    description:
      "Out Seller is a modern, responsive landing page designed to showcase the Outsellers brand. It features a clean layout with sections for hero, services, about, and contact, all optimized for a professional online presence.",
    thumbnail: "/work-images/landseller.png",
    images: ["/work-images/aboutseller.png", "/work-images/seller-22.png"],
    stack: ["Next", "Type Script", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: A modern, visually engaging landing page designed to present Outsellers with clarity and impact. The layout includes clean sections for hero, services, about, and contact, all crafted to guide the visitor smoothly through the content. Fully responsive and optimized for all screen sizes.",
      },
      {
        title: "Details",
        text: "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
      },
      {
        title: "Details",
        text: "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: One challenge was achieving a consistent design across different browsers and screen sizes. I utilized flexible grid layouts and tested responsiveness thoroughly to ensure pixel-perfect design everywhere.",
      },
    ],
    client: "Out Seller landing page",
    type: "Commerce system",
    category: "website",
    summary:
      "Out Seller is a modern, responsive landing page designed to showcase the Outsellers brand. It features a clean layout with sections for hero, services, about, and contact, all optimized for a professional online presence.",
    scope: "Next, Type Script",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "warm",
    stats: ["Commerce system", "Next"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Out Seller landing page",
    detailIntro:
      "Out Seller is a modern, responsive landing page designed to showcase the Outsellers brand. It features a clean layout with sections for hero, services, about, and contact, all optimized for a professional online presence.",
    challenge:
      "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
    build:
      "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
    impact:
      "Challenges & Solutions: One challenge was achieving a consistent design across different browsers and screen sizes. I utilized flexible grid layouts and tested responsiveness thoroughly to ensure pixel-perfect design everywhere.",
    modules: ["Next", "Type Script", "Tailwindcss"],
    outcomes: ["Commerce system", "Next", "Type Script", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: A modern, visually engaging landing page designed to present Outsellers with clarity and impact. The layout includes clean sections for hero, services, about, and contact, all crafted to guide the visitor smoothly through the content. Fully responsive and optimized for all screen sizes.",
      },
      {
        label: "Details",
        text: "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
      },
      {
        label: "Details",
        text: "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: A modern, visually engaging landing page designed to present Outsellers with clarity and impact. The layout includes clean sections for hero, services, about, and contact, all crafted to guide the visitor smoothly through the content. Fully responsive and optimized for all screen sizes.",
      },
      {
        title: "Details",
        text: "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
      },
      {
        title: "Details",
        text: "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: One challenge was achieving a consistent design across different browsers and screen sizes. I utilized flexible grid layouts and tested responsiveness thoroughly to ensure pixel-perfect design everywhere.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "Inom Techs",
    slug: "inom-techs",
    href: "https://inom-techs.com/",
    description:
      "Inom-Techs is a modern company profile website for a programming and marketing firm, featuring dynamic animations, localization with cookies, and dark mode support for an enhanced user experience.",
    thumbnail: "/work-images/inom.png",
    images: ["/work-images/inom.png", "/work-images/inom1.png"],
    stack: ["Nextjs", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: Localization powered by cookies, ensuring the website adapts to user preferences. Dark mode support for better accessibility and aesthetics. Visually appealing and modern design with heavy animations for an engaging experience.",
      },
      {
        title: "Details",
        text: "My Role: I handled the entire project from design to deployment, ensuring a flawless and functional user interface and experience.",
      },
      {
        title: "Details",
        text: "Target Audience: Consumers and businesses looking for programming and marketing services.",
      },
    ],
    client: "Inom Techs",
    type: "Web experience",
    category: "website",
    summary:
      "Inom-Techs is a modern company profile website for a programming and marketing firm, featuring dynamic animations, localization with cookies, and dark mode support for an enhanced user experience.",
    scope: "Nextjs, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "light",
    stats: ["Web experience", "Nextjs"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Inom Techs",
    detailIntro:
      "Inom-Techs is a modern company profile website for a programming and marketing firm, featuring dynamic animations, localization with cookies, and dark mode support for an enhanced user experience.",
    challenge:
      "My Role: I handled the entire project from design to deployment, ensuring a flawless and functional user interface and experience.",
    build:
      "Target Audience: Consumers and businesses looking for programming and marketing services.",
    impact:
      "Target Audience: Consumers and businesses looking for programming and marketing services.",
    modules: ["Nextjs", "Tailwindcss"],
    outcomes: ["Web experience", "Nextjs", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Localization powered by cookies, ensuring the website adapts to user preferences. Dark mode support for better accessibility and aesthetics. Visually appealing and modern design with heavy animations for an engaging experience.",
      },
      {
        label: "Details",
        text: "My Role: I handled the entire project from design to deployment, ensuring a flawless and functional user interface and experience.",
      },
      {
        label: "Details",
        text: "Target Audience: Consumers and businesses looking for programming and marketing services.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Localization powered by cookies, ensuring the website adapts to user preferences. Dark mode support for better accessibility and aesthetics. Visually appealing and modern design with heavy animations for an engaging experience.",
      },
      {
        title: "Details",
        text: "My Role: I handled the entire project from design to deployment, ensuring a flawless and functional user interface and experience.",
      },
      {
        title: "Details",
        text: "Target Audience: Consumers and businesses looking for programming and marketing services.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "Seller-tech",
    slug: "out-seller",
    href: "http://outseller.tech",
    description:
      "Seller-tech is a professional portfolio website designed for a law company. The website features eight distinct pages that showcase the firm's services and expertise. Built with responsiveness in mind, it ensures a seamless browsing experience across devices.",
    thumbnail: "/work-images/newseller1.png",
    images: ["/work-images/newseller1.png", "/work-images/newseller2.png"],
    stack: ["Next", "Type Script", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: A modern, visually engaging landing page designed to present Outsellers with clarity and impact. The layout includes clean sections for hero, services, about, and contact, all crafted to guide the visitor smoothly through the content. Fully responsive and optimized for all screen sizes.",
      },
      {
        title: "Details",
        text: "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
      },
      {
        title: "Details",
        text: "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: One challenge was achieving a consistent design across different browsers and screen sizes. I utilized flexible grid layouts and tested responsiveness thoroughly to ensure pixel-perfect design everywhere.",
      },
    ],
    client: "Seller-tech",
    type: "Commerce system",
    category: "website",
    summary:
      "Seller-tech is a professional portfolio website designed for a law company. The website features eight distinct pages that showcase the firm's services and expertise. Built with responsiveness in mind, it ensures a seamless browsing experience across devices.",
    scope: "Next, Type Script",
    outcome: "Live project",
    visual: "portfolio",
    span: "wide",
    tone: "dark",
    stats: ["Commerce system", "Next"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Seller-tech",
    detailIntro:
      "Seller-tech is a professional portfolio website designed for a law company. The website features eight distinct pages that showcase the firm's services and expertise. Built with responsiveness in mind, it ensures a seamless browsing experience across devices.",
    challenge:
      "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
    build:
      "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
    impact:
      "Challenges & Solutions: One challenge was achieving a consistent design across different browsers and screen sizes. I utilized flexible grid layouts and tested responsiveness thoroughly to ensure pixel-perfect design everywhere.",
    modules: ["Next", "Type Script", "Tailwindcss"],
    outcomes: ["Commerce system", "Next", "Type Script", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: A modern, visually engaging landing page designed to present Outsellers with clarity and impact. The layout includes clean sections for hero, services, about, and contact, all crafted to guide the visitor smoothly through the content. Fully responsive and optimized for all screen sizes.",
      },
      {
        label: "Details",
        text: "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
      },
      {
        label: "Details",
        text: "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: A modern, visually engaging landing page designed to present Outsellers with clarity and impact. The layout includes clean sections for hero, services, about, and contact, all crafted to guide the visitor smoothly through the content. Fully responsive and optimized for all screen sizes.",
      },
      {
        title: "Details",
        text: "My Role: I designed and built the entire landing page from scratch, focusing on clean UI, responsive structure, and subtle scroll-based animations to keep the user engaged.",
      },
      {
        title: "Details",
        text: "Target Audience: Businesses and clients looking to understand the Outsellers brand and get in touch through a professional online presence.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: One challenge was achieving a consistent design across different browsers and screen sizes. I utilized flexible grid layouts and tested responsiveness thoroughly to ensure pixel-perfect design everywhere.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "Edu Chain",
    slug: "edu-chain",
    href: "http://educhains.live",
    description:
      "An eLearning platform with multiple user roles (Admin, Teacher, User). Teachers manage courses and grades, while Zoom integration supports live sessions.",
    thumbnail: "/work-images/educhain.png",
    images: ["/work-images/educhain.png", "/work-images/educhain2.png"],
    stack: ["Laravel", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: Multi-user roles: Admin, User, Organizer, Teacher, with customizable permissions. Teacher panel for course CRUD, assignment tracking, and grading. Zoom integration for live sessions or video uploads.Admin panel with reports, tickets, and financial graphs.Full-responsive design for optimal user experience across devices. 5 pages for the normal user, outcluding dashboard, course catalog, assignments, grades, and settings.",
      },
      {
        title: "Details",
        text: "My Role: Designed and developed the eLearning platform, including user roles, permissions, teacher panel, Zoom integration, and financial reporting features.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Integrated Zoom API for seamless live sessions and handled large video uploads for recorded sessions. Optimized performance for real-time updates and financial reports.",
      },
      {
        title: "Details",
        text: "Outcome: A comprehensive eLearning platform with an intuitive teacher interface, live session capabilities, and powerful admin features for financial tracking and user management.",
      },
    ],
    client: "Edu Chain",
    type: "Backend platform",
    category: "website",
    summary:
      "An eLearning platform with multiple user roles (Admin, Teacher, User). Teachers manage courses and grades, while Zoom integration supports live sessions.",
    scope: "Laravel, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "side",
    tone: "dim",
    stats: ["Backend platform", "Laravel"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Edu Chain",
    detailIntro:
      "An eLearning platform with multiple user roles (Admin, Teacher, User). Teachers manage courses and grades, while Zoom integration supports live sessions.",
    challenge:
      "My Role: Designed and developed the eLearning platform, including user roles, permissions, teacher panel, Zoom integration, and financial reporting features.",
    build:
      "Challenges & Solutions: Integrated Zoom API for seamless live sessions and handled large video uploads for recorded sessions. Optimized performance for real-time updates and financial reports.",
    impact:
      "Outcome: A comprehensive eLearning platform with an intuitive teacher interface, live session capabilities, and powerful admin features for financial tracking and user management.",
    modules: ["Laravel", "Tailwindcss"],
    outcomes: ["Backend platform", "Laravel", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Multi-user roles: Admin, User, Organizer, Teacher, with customizable permissions. Teacher panel for course CRUD, assignment tracking, and grading. Zoom integration for live sessions or video uploads.Admin panel with reports, tickets, and financial graphs.Full-responsive design for optimal user experience across devices. 5 pages for the normal user, outcluding dashboard, course catalog, assignments, grades, and settings.",
      },
      {
        label: "Details",
        text: "My Role: Designed and developed the eLearning platform, including user roles, permissions, teacher panel, Zoom integration, and financial reporting features.",
      },
      {
        label: "Details",
        text: "Challenges & Solutions: Integrated Zoom API for seamless live sessions and handled large video uploads for recorded sessions. Optimized performance for real-time updates and financial reports.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Multi-user roles: Admin, User, Organizer, Teacher, with customizable permissions. Teacher panel for course CRUD, assignment tracking, and grading. Zoom integration for live sessions or video uploads.Admin panel with reports, tickets, and financial graphs.Full-responsive design for optimal user experience across devices. 5 pages for the normal user, outcluding dashboard, course catalog, assignments, grades, and settings.",
      },
      {
        title: "Details",
        text: "My Role: Designed and developed the eLearning platform, including user roles, permissions, teacher panel, Zoom integration, and financial reporting features.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Integrated Zoom API for seamless live sessions and handled large video uploads for recorded sessions. Optimized performance for real-time updates and financial reports.",
      },
      {
        title: "Details",
        text: "Outcome: A comprehensive eLearning platform with an intuitive teacher interface, live session capabilities, and powerful admin features for financial tracking and user management.",
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "Out Seller",
    slug: "out-seller-2",
    href: "https://outseller.inom-techs.com/",
    description:
      "Out Seller is a feature-rich eCommerce platform built with Laravel and Tailwind CSS, offering advanced product management, user authentication, and a responsive design for an optimal shopping experience.",
    thumbnail: "/work-images/outseller.png",
    images: ["/work-images/outseller.png", "/work-images/outseller1.png"],
    stack: ["Laravel", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: Product comparison, loved product tracking, and add-to-cart functionality. User login/register.advanced filters by category, price, and color.Full-responsive design with a focus on user experience.",
      },
      {
        title: "Details",
        text: "My Role: Developed the entire eCommerce platform, including user authentication, product management, and payment integration.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Handled performance issues with product comparisons and optimized payment flow for seamless transactions.",
      },
      {
        title: "Details",
        text: "Outcome: A feature-rich eCommerce site with robust product management, smooth user experience, and a responsive design.",
      },
    ],
    client: "Out Seller",
    type: "Backend platform",
    category: "website",
    summary:
      "Out Seller is a feature-rich eCommerce platform built with Laravel and Tailwind CSS, offering advanced product management, user authentication, and a responsive design for an optimal shopping experience.",
    scope: "Laravel, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "warm",
    stats: ["Backend platform", "Laravel"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Out Seller",
    detailIntro:
      "Out Seller is a feature-rich eCommerce platform built with Laravel and Tailwind CSS, offering advanced product management, user authentication, and a responsive design for an optimal shopping experience.",
    challenge:
      "My Role: Developed the entire eCommerce platform, including user authentication, product management, and payment integration.",
    build:
      "Challenges & Solutions: Handled performance issues with product comparisons and optimized payment flow for seamless transactions.",
    impact:
      "Outcome: A feature-rich eCommerce site with robust product management, smooth user experience, and a responsive design.",
    modules: ["Laravel", "Tailwindcss"],
    outcomes: ["Backend platform", "Laravel", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Product comparison, loved product tracking, and add-to-cart functionality. User login/register.advanced filters by category, price, and color.Full-responsive design with a focus on user experience.",
      },
      {
        label: "Details",
        text: "My Role: Developed the entire eCommerce platform, including user authentication, product management, and payment integration.",
      },
      {
        label: "Details",
        text: "Challenges & Solutions: Handled performance issues with product comparisons and optimized payment flow for seamless transactions.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Product comparison, loved product tracking, and add-to-cart functionality. User login/register.advanced filters by category, price, and color.Full-responsive design with a focus on user experience.",
      },
      {
        title: "Details",
        text: "My Role: Developed the entire eCommerce platform, including user authentication, product management, and payment integration.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Handled performance issues with product comparisons and optimized payment flow for seamless transactions.",
      },
      {
        title: "Details",
        text: "Outcome: A feature-rich eCommerce site with robust product management, smooth user experience, and a responsive design.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "Hunter",
    slug: "hunter",
    href: "https://sweet-home-sigma.vercel.app",
    description:
      "Hunter is a sleek and modern landing page designed to facilitate the buying and selling of houses.",
    thumbnail: "/work-images/hunter.png",
    images: ["/work-images/hunter.png", "/work-images/hunter3.png"],
    stack: ["ReactJs", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: A responsive and user-friendly design built for seamless navigation. Integrated Swiper.js sliders to showcase property listings dynamically. Tailored for both buyers and sellers to enhance their online real estate experience.",
      },
      {
        title: "Details",
        text: "My Role: I built this project entirely from scratch, handling everything from design to development.",
      },
      {
        title: "Details",
        text: "Target Audience: The platform is designed for consumers looking to buy or sell homes effortlessly.",
      },
    ],
    client: "Hunter",
    type: "Web experience",
    category: "website",
    summary:
      "Hunter is a sleek and modern landing page designed to facilitate the buying and selling of houses.",
    scope: "ReactJs, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "light",
    stats: ["Web experience", "ReactJs"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Hunter",
    detailIntro:
      "Hunter is a sleek and modern landing page designed to facilitate the buying and selling of houses.",
    challenge:
      "My Role: I built this project entirely from scratch, handling everything from design to development.",
    build:
      "Target Audience: The platform is designed for consumers looking to buy or sell homes effortlessly.",
    impact:
      "Target Audience: The platform is designed for consumers looking to buy or sell homes effortlessly.",
    modules: ["ReactJs", "Tailwindcss"],
    outcomes: ["Web experience", "ReactJs", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: A responsive and user-friendly design built for seamless navigation. Integrated Swiper.js sliders to showcase property listings dynamically. Tailored for both buyers and sellers to enhance their online real estate experience.",
      },
      {
        label: "Details",
        text: "My Role: I built this project entirely from scratch, handling everything from design to development.",
      },
      {
        label: "Details",
        text: "Target Audience: The platform is designed for consumers looking to buy or sell homes effortlessly.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: A responsive and user-friendly design built for seamless navigation. Integrated Swiper.js sliders to showcase property listings dynamically. Tailored for both buyers and sellers to enhance their online real estate experience.",
      },
      {
        title: "Details",
        text: "My Role: I built this project entirely from scratch, handling everything from design to development.",
      },
      {
        title: "Details",
        text: "Target Audience: The platform is designed for consumers looking to buy or sell homes effortlessly.",
      },
    ],
    iconName: "Code2",
  },
  {
    title: "Online Games site",
    slug: "gameing",
    href: "https://3assem0.github.io/Online-Games-webpage/",
    description:
      "The Online Games Site is a centralized platform where gamers can explore and download thousands of games from over 100 websites, all in one place. It streamlines the process of finding games by fetching data dynamically via APIs.",
    thumbnail: "/work-images/game1.png",
    images: ["/work-images/game1.png", "/work-images/game2.png"],
    stack: ["Java Script", "Restful API"],
    sections: [
      {
        title: "Details",
        text: "Key Features: Access to thousands of games aggregated from more than 100 sources. API integration for real-time data fetching and updates. User-friendly and responsive design tailored for gamers.",
      },
      {
        title: "Details",
        text: "My Role: I built this project from scratch, handling everything from API integration to the website's design and development.",
      },
      {
        title: "Details",
        text: "Target Audience: Gamers seeking a convenient and centralized hub for exploring and downloading games.",
      },
    ],
    client: "Online Games site",
    type: "Backend platform",
    category: "website",
    summary:
      "The Online Games Site is a centralized platform where gamers can explore and download thousands of games from over 100 websites, all in one place. It streamlines the process of finding games by fetching data dynamically via APIs.",
    scope: "Java Script, Restful API",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dark",
    stats: ["Backend platform", "Java Script"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Online Games site",
    detailIntro:
      "The Online Games Site is a centralized platform where gamers can explore and download thousands of games from over 100 websites, all in one place. It streamlines the process of finding games by fetching data dynamically via APIs.",
    challenge:
      "My Role: I built this project from scratch, handling everything from API integration to the website's design and development.",
    build:
      "Target Audience: Gamers seeking a convenient and centralized hub for exploring and downloading games.",
    impact:
      "Target Audience: Gamers seeking a convenient and centralized hub for exploring and downloading games.",
    modules: ["Java Script", "Restful API"],
    outcomes: ["Backend platform", "Java Script", "Restful API", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Access to thousands of games aggregated from more than 100 sources. API integration for real-time data fetching and updates. User-friendly and responsive design tailored for gamers.",
      },
      {
        label: "Details",
        text: "My Role: I built this project from scratch, handling everything from API integration to the website's design and development.",
      },
      {
        label: "Details",
        text: "Target Audience: Gamers seeking a convenient and centralized hub for exploring and downloading games.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Access to thousands of games aggregated from more than 100 sources. API integration for real-time data fetching and updates. User-friendly and responsive design tailored for gamers.",
      },
      {
        title: "Details",
        text: "My Role: I built this project from scratch, handling everything from API integration to the website's design and development.",
      },
      {
        title: "Details",
        text: "Target Audience: Gamers seeking a convenient and centralized hub for exploring and downloading games.",
      },
    ],
    iconName: "ServerCog",
  },
  {
    title: "Spiro Spates",
    slug: "spiro",
    href: "https://3assem0.github.io/spiro-spates/",
    description:
      "Spiro Spates is a vibrant portfolio website created for a local soda drinks company. The website showcases the brand's products and values through an engaging and modern design, enhanced with interactive animations.",
    thumbnail: "/work-images/Spiro.png",
    images: ["/work-images/Spiro.png", "/work-images/spiro1.png"],
    stack: ["JavaScript", "CSS", "custom mouse tracking animations."],
    sections: [
      {
        title: "Details",
        text: "Key Features: Dynamic mouse tracking animations for an interactive user experience. Smooth animations powered by AOS (Animate On Scroll). A responsive and visually appealing design tailored to attract a wide audience.",
      },
      {
        title: "Details",
        text: "My Role: I co-developed this project equally with my friend Assem , collaborating on both the design and development aspects.",
      },
      {
        title: "Details",
        text: "Target Audience: All users, especially soda drink enthusiasts looking to learn more about the brand.",
      },
    ],
    client: "Spiro Spates",
    type: "Web experience",
    category: "website",
    summary:
      "Spiro Spates is a vibrant portfolio website created for a local soda drinks company. The website showcases the brand's products and values through an engaging and modern design, enhanced with interactive animations.",
    scope: "JavaScript, CSS",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dim",
    stats: ["Web experience", "JavaScript"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Spiro Spates",
    detailIntro:
      "Spiro Spates is a vibrant portfolio website created for a local soda drinks company. The website showcases the brand's products and values through an engaging and modern design, enhanced with interactive animations.",
    challenge:
      "My Role: I co-developed this project equally with my friend Assem , collaborating on both the design and development aspects.",
    build:
      "Target Audience: All users, especially soda drink enthusiasts looking to learn more about the brand.",
    impact:
      "Target Audience: All users, especially soda drink enthusiasts looking to learn more about the brand.",
    modules: ["JavaScript", "CSS", "custom mouse tracking animations."],
    outcomes: ["Web experience", "JavaScript", "CSS", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Dynamic mouse tracking animations for an interactive user experience. Smooth animations powered by AOS (Animate On Scroll). A responsive and visually appealing design tailored to attract a wide audience.",
      },
      {
        label: "Details",
        text: "My Role: I co-developed this project equally with my friend Assem , collaborating on both the design and development aspects.",
      },
      {
        label: "Details",
        text: "Target Audience: All users, especially soda drink enthusiasts looking to learn more about the brand.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Dynamic mouse tracking animations for an interactive user experience. Smooth animations powered by AOS (Animate On Scroll). A responsive and visually appealing design tailored to attract a wide audience.",
      },
      {
        title: "Details",
        text: "My Role: I co-developed this project equally with my friend Assem , collaborating on both the design and development aspects.",
      },
      {
        title: "Details",
        text: "Target Audience: All users, especially soda drink enthusiasts looking to learn more about the brand.",
      },
    ],
    iconName: "Building2",
  },
  {
    title: "Halaa-Bazaar",
    slug: "halaa-bazaar",
    href: "https://3assem0.github.io/e-commerce/",
    description:
      "A sleek and functional eCommerce platform featuring responsive design, user authentication, and seamless shopping experiences with real-time API integration.",
    thumbnail: "/work-images/pro6.png",
    images: ["/work-images/pro6.png"],
    stack: ["ReactJs", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: User authentication with login and registration.Responsive design optimized for all devices.Add-to-cart functionality for seamless shopping.Real-time data fetching via API for dynamic product updates.",
      },
      {
        title: "Details",
        text: "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
      },
      {
        title: "Details",
        text: "Outcome: A fully functional eCommerce app with a modern design and core shopping features tailored for online users.",
      },
    ],
    client: "Halaa-Bazaar",
    type: "Backend platform",
    category: "website",
    summary:
      "A sleek and functional eCommerce platform featuring responsive design, user authentication, and seamless shopping experiences with real-time API integration.",
    scope: "ReactJs, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "warm",
    stats: ["Backend platform", "ReactJs"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "Halaa-Bazaar",
    detailIntro:
      "A sleek and functional eCommerce platform featuring responsive design, user authentication, and seamless shopping experiences with real-time API integration.",
    challenge:
      "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
    build:
      "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
    impact:
      "Outcome: A fully functional eCommerce app with a modern design and core shopping features tailored for online users.",
    modules: ["ReactJs", "Tailwindcss"],
    outcomes: ["Backend platform", "ReactJs", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: User authentication with login and registration.Responsive design optimized for all devices.Add-to-cart functionality for seamless shopping.Real-time data fetching via API for dynamic product updates.",
      },
      {
        label: "Details",
        text: "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
      },
      {
        label: "Details",
        text: "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: User authentication with login and registration.Responsive design optimized for all devices.Add-to-cart functionality for seamless shopping.Real-time data fetching via API for dynamic product updates.",
      },
      {
        title: "Details",
        text: "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
      },
      {
        title: "Details",
        text: "Outcome: A fully functional eCommerce app with a modern design and core shopping features tailored for online users.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "ShopWise",
    slug: "shopwise",
    href: "https://project-olive-two.vercel.app/login",
    description:
      "A dynamic eCommerce platform with user authentication, add-to-cart functionality, and a responsive design for a seamless shopping experience.",
    thumbnail: "/work-images/66.jpg",
    images: ["/work-images/66.jpg", "/work-images/ecommerce.png"],
    stack: ["React", "CSS"],
    sections: [
      {
        title: "Details",
        text: "Key Features: User authentication with login and registration.Responsive design optimized for all devices.Add-to-cart functionality for seamless shopping.Real-time data fetching via API for dynamic product updates.",
      },
      {
        title: "Details",
        text: "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
      },
      {
        title: "Details",
        text: "Outcome: A fully functional eCommerce app with a modern design and core shopping features tailored for online users.",
      },
    ],
    client: "ShopWise",
    type: "Commerce system",
    category: "website",
    summary:
      "A dynamic eCommerce platform with user authentication, add-to-cart functionality, and a responsive design for a seamless shopping experience.",
    scope: "React, CSS",
    outcome: "Live project",
    visual: "portfolio",
    span: "wide",
    tone: "light",
    stats: ["Commerce system", "React"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "ShopWise",
    detailIntro:
      "A dynamic eCommerce platform with user authentication, add-to-cart functionality, and a responsive design for a seamless shopping experience.",
    challenge:
      "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
    build:
      "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
    impact:
      "Outcome: A fully functional eCommerce app with a modern design and core shopping features tailored for online users.",
    modules: ["React", "CSS"],
    outcomes: ["Commerce system", "React", "CSS", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: User authentication with login and registration.Responsive design optimized for all devices.Add-to-cart functionality for seamless shopping.Real-time data fetching via API for dynamic product updates.",
      },
      {
        label: "Details",
        text: "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
      },
      {
        label: "Details",
        text: "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: User authentication with login and registration.Responsive design optimized for all devices.Add-to-cart functionality for seamless shopping.Real-time data fetching via API for dynamic product updates.",
      },
      {
        title: "Details",
        text: "My Role: Developed the app from scratch, including design, coding, and API integration, ensuring functionality and scalability.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Resolved API fetching issues and cross-browser CSS inconsistencies to deliver a smooth, responsive user experience.",
      },
      {
        title: "Details",
        text: "Outcome: A fully functional eCommerce app with a modern design and core shopping features tailored for online users.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "E-commerce Laravel",
    slug: "e-commerce-gamel",
    href: "https://al-gamel.rkmait.com",
    description:
      "An eCommerce admin dashboard built with Laravel and Tailwind CSS, featuring category-product relationships and API export for efficient data management using MySQL.",
    thumbnail: "/work-images/gamel1.png",
    images: ["/work-images/gamel1.png", "/work-images/gamel2.png"],
    stack: ["Laravel", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Key Features: Built using Laravel, Tailwind CSS, and MySQL. Admin dashboard for eCommerce management.Hierarchical data structure with main sections, sub-sections, and products, all linked via one-to-many relationships. API export for seamless integration with external applications.",
      },
      {
        title: "Details",
        text: "My Role: Designed and developed the system architecture, implemented database relationships, and created APIs to manage and expose the data.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Optimized database queries for performance and ensured secure API endpoints to maintain data integrity.",
      },
      {
        title: "Details",
        text: "Outcome: A robust admin dashboard allowing seamless management of eCommerce categories, sub-categories, and products, along with an API layer for external integrations.",
      },
    ],
    client: "E-commerce Laravel",
    type: "Backend platform",
    category: "website",
    summary:
      "An eCommerce admin dashboard built with Laravel and Tailwind CSS, featuring category-product relationships and API export for efficient data management using MySQL.",
    scope: "Laravel, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "side",
    tone: "dark",
    stats: ["Backend platform", "Laravel"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "E-commerce Laravel",
    detailIntro:
      "An eCommerce admin dashboard built with Laravel and Tailwind CSS, featuring category-product relationships and API export for efficient data management using MySQL.",
    challenge:
      "My Role: Designed and developed the system architecture, implemented database relationships, and created APIs to manage and expose the data.",
    build:
      "Challenges & Solutions: Optimized database queries for performance and ensured secure API endpoints to maintain data integrity.",
    impact:
      "Outcome: A robust admin dashboard allowing seamless management of eCommerce categories, sub-categories, and products, along with an API layer for external integrations.",
    modules: ["Laravel", "Tailwindcss"],
    outcomes: ["Backend platform", "Laravel", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Key Features: Built using Laravel, Tailwind CSS, and MySQL. Admin dashboard for eCommerce management.Hierarchical data structure with main sections, sub-sections, and products, all linked via one-to-many relationships. API export for seamless integration with external applications.",
      },
      {
        label: "Details",
        text: "My Role: Designed and developed the system architecture, implemented database relationships, and created APIs to manage and expose the data.",
      },
      {
        label: "Details",
        text: "Challenges & Solutions: Optimized database queries for performance and ensured secure API endpoints to maintain data integrity.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Key Features: Built using Laravel, Tailwind CSS, and MySQL. Admin dashboard for eCommerce management.Hierarchical data structure with main sections, sub-sections, and products, all linked via one-to-many relationships. API export for seamless integration with external applications.",
      },
      {
        title: "Details",
        text: "My Role: Designed and developed the system architecture, implemented database relationships, and created APIs to manage and expose the data.",
      },
      {
        title: "Details",
        text: "Challenges & Solutions: Optimized database queries for performance and ensured secure API endpoints to maintain data integrity.",
      },
      {
        title: "Details",
        text: "Outcome: A robust admin dashboard allowing seamless management of eCommerce categories, sub-categories, and products, along with an API layer for external integrations.",
      },
    ],
    iconName: "ShoppingCart",
  },
  {
    title: "our kids",
    slug: "kids",
    href: "http://gamesandtoys.kesug.com/?i=2",
    description:
      "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
    thumbnail: "/work-images/kids.png",
    images: ["/work-images/kids.png", "/work-images/kids1.png"],
    stack: ["Nextjs", "Tailwindcss"],
    sections: [
      {
        title: "Details",
        text: "Sit eiusmod ex mollit sit quis ad deserunt. Sint aliqua aliqua ullamco dolore nulla amet tempor sunt est ipsum. Dolor laborum eiusmod cupidatat consectetur velit ipsum. Deserunt nisi in culpa laboris cupidatat elit velit aute mollit nisi. Officia ad exercitation laboris non cupidatat duis esse velit ut culpa et.",
      },
      {
        title: "Details",
        text: "Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
      },
    ],
    client: "our kids",
    type: "Web experience",
    category: "website",
    summary:
      "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
    scope: "Nextjs, Tailwindcss",
    outcome: "Live project",
    visual: "portfolio",
    span: "half",
    tone: "dim",
    stats: ["Web experience", "Nextjs"],
    year: "Portfolio",
    duration: "Live",
    team: "Product, engineering, delivery",
    headline: "our kids",
    detailIntro:
      "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
    challenge:
      "Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
    build:
      "Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
    impact:
      "Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
    modules: ["Nextjs", "Tailwindcss"],
    outcomes: ["Web experience", "Nextjs", "Tailwindcss", "External project link"],
    timeline: [
      {
        label: "Details",
        text: "Sit eiusmod ex mollit sit quis ad deserunt. Sint aliqua aliqua ullamco dolore nulla amet tempor sunt est ipsum. Dolor laborum eiusmod cupidatat consectetur velit ipsum. Deserunt nisi in culpa laboris cupidatat elit velit aute mollit nisi. Officia ad exercitation laboris non cupidatat duis esse velit ut culpa et.",
      },
      {
        label: "Details",
        text: "Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
      },
    ],
    detailSections: [
      {
        title: "Details",
        text: "Sit eiusmod ex mollit sit quis ad deserunt. Sint aliqua aliqua ullamco dolore nulla amet tempor sunt est ipsum. Dolor laborum eiusmod cupidatat consectetur velit ipsum. Deserunt nisi in culpa laboris cupidatat elit velit aute mollit nisi. Officia ad exercitation laboris non cupidatat duis esse velit ut culpa et.",
      },
      {
        title: "Details",
        text: "Exercitation pariatur enim occaecat adipisicing nostrud adipisicing Lorem tempor ullamco exercitation quis et dolor sint. Adipisicing sunt sit aute fugiat incididunt nostrud consequat proident fugiat id. Officia aliquip laborum labore eu culpa dolor reprehenderit eu ex enim reprehenderit. Cillum Lorem veniam eu magna exercitation. Reprehenderit adipisicing minim et officia enim et veniam Lorem excepteur velit adipisicing et Lorem magna.",
      },
    ],
    iconName: "Code2",
  },
] satisfies WorkItemInput[];

const allProjectInputs = [...portfolioProjects, ...behanceWorkItems] satisfies WorkItemInput[];

export const workItems: WorkItem[] = allProjectInputs.map((project) => {
  const bannerMetadata = workBannerData[project.slug as keyof typeof workBannerData];

  return {
    ...project,
    ...bannerMetadata,
    icon: icons[project.iconName],
  };
});

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}
