import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
const localeStorageKey = "traffodata:locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

const workItemFallbackTranslations: Record<string, string> = {
  "Mobile product": "منتج موبايل",
  "Backend platform": "منصة خلفية",
  "Commerce system": "نظام تجارة",
  "Digital product": "منتج رقمي",
  "Web experience": "تجربة ويب",
  "Figma Design": "تصميم Figma",
  "Live project": "مشروع مباشر",
  "Private build": "بناء خاص",
  "Design case study": "دراسة حالة تصميم",
  Portfolio: "أعمال مختارة",
  Live: "مباشر",
  Private: "خاص",
  Design: "تصميم",
  "Product, engineering, delivery": "المنتج والهندسة والتوصيل",
  "UI/UX design": "تصميم UI/UX",
  "External project link": "رابط مشروع خارجي",
  "Project Overview": "نظرة عامة على المشروع",
  "Backend & API Scope": "نطاق الخلفية وواجهات API",
  "Commerce Operations": "عمليات التجارة",
  "Imports, Payments & Promotions": "الاستيراد والمدفوعات والعروض",
  "Operational Tooling": "أدوات التشغيل",
  Backend: "الخلفية",
  "Commerce Operation": "عمليات التجارة",
  "Authentication & App APIs": "المصادقة وواجهات التطبيقات",
  "Print Ordering & Pricing": "طلبات الطباعة والتسعير",
  "Payments, Files & Order Lifecycle": "المدفوعات والملفات ودورة الطلب",
  "Operations, Delivery & Reporting": "العمليات والتوصيل والتقارير",
  "Backend Tooling": "أدوات الخلفية",
};

const workItemGeneratedTitles = [
  "نظرة عامة على المشروع",
  "نطاق العمل",
  "التنفيذ",
  "التكاملات والتدفقات",
  "الأثر التشغيلي",
  "أدوات التشغيل",
];

function workItemGeneratedTitle(key: string) {
  const index = Number(key.match(/\.(?:detailSections|timeline)\.(\d+)\./)?.[1] ?? 0);
  return workItemGeneratedTitles[index] ?? "تفاصيل المشروع";
}

function workItemGeneratedText(key: string) {
  if (key.includes(".timeline.")) {
    return "توضح هذه المرحلة كيف انتقل العمل من فهم المتطلبات إلى تنفيذ تجربة رقمية قابلة للاستخدام، مع ترتيب التدفقات والواجهات حول احتياج المستخدم وسياق التشغيل.";
  }

  if (key.includes(".detailSections.")) {
    return "يغطي هذا القسم جانباً من بناء المشروع، من تنظيم المتطلبات وتدفقات الاستخدام إلى تنفيذ الواجهة والربط والتجربة المتجاوبة التي تجعل المنتج واضحاً وقابلاً للاستخدام.";
  }

  return "تمت صياغة هذا الجزء من المشروع حول تجربة رقمية واضحة، مع الحفاظ على الأداء والاستجابة وربط التفاصيل التي يحتاجها المستخدمون والفرق.";
}

function translateWorkItemFallback(locale: Locale, key: string, fallback: string) {
  if (locale !== "ar" || !key.startsWith("work.item.")) return fallback;

  const direct = workItemFallbackTranslations[fallback];
  if (direct) return direct;

  if (key.endsWith(".title") || key.endsWith(".label")) {
    return workItemGeneratedTitle(key);
  }

  if (key.endsWith(".text")) {
    return workItemGeneratedText(key);
  }

  if (
    key.endsWith(".description") ||
    key.endsWith(".summary") ||
    key.endsWith(".detailIntro") ||
    key.endsWith(".challenge") ||
    key.endsWith(".build") ||
    key.endsWith(".impact")
  ) {
    return workItemGeneratedText(key);
  }

  return fallback;
}

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    "brand.name": "TRAFFODATA",
    "brand.segment": "Software",
    "brand.home": "TRAFFODATA home",
    "nav.primary": "Primary",
    "nav.work": "Work",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.start": "Start",
    "nav.startProject": "Start a project",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "language.label": "Language",
    "language.switchTo": "Switch language",
    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "theme.switchTo": "Switch theme",
    "root.notFound.code": "404",
    "root.notFound.title": "Page not found",
    "root.notFound.description": "The page you're looking for doesn't exist or has been moved.",
    "root.error.title": "This page didn't load",
    "root.error.description": "Something went wrong on our end.",
    "root.error.tryAgain": "Try again",
    "root.goHome": "Go home",
    "seo.defaultTitle": "TRAFFODATA - Operational Software for Serious Operators",
    "seo.defaultDescription":
      "TRAFFODATA builds and supports custom operational software for businesses in Egypt, the Gulf, and international markets that have outgrown spreadsheets and disconnected tools.",
    "seo.imageAlt.logo": "TRAFFODATA Software Solutions logo",
    "seo.imageAlt.home": "TRAFFODATA enterprise operations software preview",
    "seo.organization.description":
      "TRAFFODATA builds and supports custom operational software for businesses in Egypt, the Gulf, and international markets that have outgrown spreadsheets and disconnected tools.",
    "seo.navigation.name": "TRAFFODATA site navigation",
    "seo.navigation.work": "Case Studies",
    "seo.navigation.blog": "Blog",
    "seo.navigation.contact": "Contact",
    "seo.work.collectionName": "TRAFFODATA case studies",
    "seo.work.collectionDescription":
      "Case studies for custom operational software across inventory, warehouse, POS, accounting, CRM, ecommerce, dashboards, backend platforms, mobile apps, and internal tools.",
    "seo.work.title": "Case Studies - Operational Software and Backend Systems | TRAFFODATA",
    "seo.work.description":
      "Explore TRAFFODATA case studies for businesses with real workflows, real teams, and real money moving through backend platforms, dashboards, mobile apps, commerce engines, and internal tools.",
    "seo.blog.title": "Blog - TRAFFODATA Software",
    "seo.blog.description":
      "Practical answers about custom business software, ERP, inventory, warehouse management, ecommerce, Laravel APIs, integrations, project timelines, and post-launch support across Egypt, the Gulf, and international markets.",
    "seo.contact.title": "Contact Us - TRAFFODATA Software",
    "seo.contact.description":
      "Talk to TRAFFODATA about the workflow, system gap, or disconnected toolchain slowing your business down.",
    "seo.project.title": "Project - TRAFFODATA Software",
    "seo.project.description":
      "Project details for selected operational software work by TRAFFODATA.",
    "seo.project.imageAltSuffix": "project preview",
    "home.hero.eyebrow": "TRAFFODATA Enterprise OS",
    "home.hero.title":
      "Operational software for businesses that have outgrown disconnected tools.",
    "home.hero.titleLine1": "Operational software",
    "home.hero.titleLine2": "for serious operators.",
    "home.hero.lead":
      "Operational software for businesses that have outgrown disconnected tools. We turn messy workflows across inventory, POS, delivery, payments, finance, CRM and AI into integrated systems teams can run the business on.",
    "home.hero.primaryCta": "Start a project",
    "home.hero.secondaryCta": "View selected work",
    "home.hero.note":
      "Custom systems for companies outgrowing spreadsheets, disconnected SaaS and fragile internal tools.",
    "home.hero.continue": "Continue to about section",
    "home.trust.label": "Selected systems\nshipped for operators",
    "home.trust.proof.commerce.title": "Backend depth",
    "home.trust.proof.commerce.text": "Vendor, checkout, wallet, payment, and delivery operations",
    "home.trust.proof.platforms.title": "Workflow complexity",
    "home.trust.proof.platforms.text":
      "Inventory, warehouse, logistics, finance, and approvals",
    "home.trust.proof.ai.title": "Product surfaces",
    "home.trust.proof.ai.text": "Dashboards, mobile apps, AI tools, and team-facing controls",
    "home.about.eyebrow": "Who we are",
    "home.about.title1": "Software",
    "home.about.title2": "engineered for",
    "home.about.title3": "operators.",
    "home.about.copy1":
      "We turn messy business operations into serious integrated systems. TRAFFODATA maps the handoffs, exceptions, permissions and data flows behind the business, then ships the backend, dashboards, mobile apps and automations that make the work run cleanly.",
    "home.about.copy2":
      "Our strongest fit is with commerce, logistics, retail, service and growth companies that need custom software built around how their teams actually operate.",
    "home.services.eyebrow": "What we build",
    "home.services.title1": "Eight disciplines.",
    "home.services.title2": "One operating system.",
    "home.services.copy":
      "Every module is engineered to stand alone and compose seamlessly, so you adopt only what you need, when you need it.",
    "home.services.operational.title": "Operational Platforms",
    "home.services.operational.text":
      "Custom backbones for inventory, finance, teams, approvals and source-of-truth data.",
    "home.services.inventory.title": "Inventory Management",
    "home.services.inventory.text": "Real-time stock, multi-location, batch & serial, accurate to the SKU.",
    "home.services.warehouse.title": "Warehouse Management",
    "home.services.warehouse.text": "Pick, pack, putaway and wave planning for high-velocity fulfillment.",
    "home.services.pos.title": "Point of Sale",
    "home.services.pos.text": "Offline-first retail POS with omnichannel inventory sync.",
    "home.services.accounting.title": "Accounting Systems",
    "home.services.accounting.text": "Multi-entity ledgers, tax engines, statutory compliance built in.",
    "home.services.crm.title": "CRM",
    "home.services.crm.text": "Pipeline, service and account intelligence connected to live operations.",
    "home.services.ai.title": "AI Automation",
    "home.services.ai.text":
      "Operational copilots, workflow intelligence and automation across your business systems.",
    "home.services.integration.title": "System Integration",
    "home.services.integration.text":
      "Bespoke modules and integrations for companies outgrowing disconnected tools.",
    "home.platform.eyebrow": "TRAFFODATA Operating Systems",
    "home.platform.title1": "One platform.",
    "home.platform.title2": "Every workflow.",
    "home.platform.copy":
      "A single source of truth for inventory, finance, sales, people and operations, engineered for businesses that have outgrown spreadsheets, disconnected SaaS, and fragile internal tools.",
    "home.platform.connectedWorkflow": "Connected workflow",
    "home.platform.sharedRecord": "One shared record",
    "home.platform.currentFocus": "Current focus",
    "home.platform.tab.inventory": "Inventory",
    "home.platform.tab.accounting": "Accounting",
    "home.platform.tab.crm": "CRM",
    "home.platform.tab.ai": "AI",
    "home.platform.tab.warehouse": "Warehouse",
    "home.platform.tab.pos": "POS",
    "home.platform.tab.reports": "Reports",
    "home.platform.handoff.0.label": "Source event",
    "home.platform.handoff.0.value": "Captured",
    "home.platform.handoff.1.label": "Shared record",
    "home.platform.handoff.1.value": "Validated against workflow rules",
    "home.platform.handoff.2.label": "Operator action",
    "home.platform.handoff.2.value": "Assigned to owner",
    "home.platform.scene.inventory.title": "Inventory control room",
    "home.platform.scene.inventory.subtitle":
      "Stock, warehouses, suppliers, and exceptions in one operating view.",
    "home.platform.scene.inventory.operator": "Inventory manager",
    "home.platform.scene.inventory.focus": "Replenishment and exception handling",
    "home.platform.scene.inventory.queue.0.label": "Reorder queue",
    "home.platform.scene.inventory.queue.0.value": "Supplier review",
    "home.platform.scene.inventory.queue.1.label": "Location health",
    "home.platform.scene.inventory.queue.1.value": "Receiving today",
    "home.platform.scene.inventory.queue.2.label": "Exception lane",
    "home.platform.scene.inventory.queue.2.value": "Low stock watched",
    "home.platform.scene.inventory.lanes.0.label": "Stock movement",
    "home.platform.scene.inventory.lanes.0.items.0": "Purchase order received",
    "home.platform.scene.inventory.lanes.0.items.1": "Transfer reserved",
    "home.platform.scene.inventory.lanes.0.items.2": "Return inspected",
    "home.platform.scene.inventory.lanes.1.label": "Rules",
    "home.platform.scene.inventory.lanes.1.items.0": "Minimum quantity",
    "home.platform.scene.inventory.lanes.1.items.1": "Always-in-stock items",
    "home.platform.scene.inventory.lanes.1.items.2": "Warehouse priority",
    "home.platform.scene.inventory.lanes.2.label": "Operator actions",
    "home.platform.scene.inventory.lanes.2.items.0": "Approve transfer",
    "home.platform.scene.inventory.lanes.2.items.1": "Update supplier",
    "home.platform.scene.inventory.lanes.2.items.2": "Resolve mismatch",
    "home.platform.scene.inventory.footer.0": "SKU history",
    "home.platform.scene.inventory.footer.1": "Warehouse stock",
    "home.platform.scene.inventory.footer.2": "Bulk import",
    "home.platform.scene.inventory.footer.3": "Supplier terms",
    "home.platform.scene.accounting.title": "Finance close board",
    "home.platform.scene.accounting.subtitle":
      "Receivables, payouts, taxes, and approvals tied back to operational events.",
    "home.platform.scene.accounting.operator": "Finance lead",
    "home.platform.scene.accounting.focus": "Month-end without spreadsheet drift",
    "home.platform.scene.accounting.queue.0.label": "Close checklist",
    "home.platform.scene.accounting.queue.0.value": "Entity review",
    "home.platform.scene.accounting.queue.1.label": "Receivables",
    "home.platform.scene.accounting.queue.1.value": "Aging watched",
    "home.platform.scene.accounting.queue.2.label": "Audit trail",
    "home.platform.scene.accounting.queue.2.value": "Ready for export",
    "home.platform.scene.accounting.lanes.0.label": "Revenue",
    "home.platform.scene.accounting.lanes.0.items.0": "POS receipts",
    "home.platform.scene.accounting.lanes.0.items.1": "Online payments",
    "home.platform.scene.accounting.lanes.0.items.2": "Wallet adjustments",
    "home.platform.scene.accounting.lanes.1.label": "Controls",
    "home.platform.scene.accounting.lanes.1.items.0": "Tax review",
    "home.platform.scene.accounting.lanes.1.items.1": "Refund approval",
    "home.platform.scene.accounting.lanes.1.items.2": "Disbursement lock",
    "home.platform.scene.accounting.lanes.2.label": "Outputs",
    "home.platform.scene.accounting.lanes.2.items.0": "Ledger export",
    "home.platform.scene.accounting.lanes.2.items.1": "VAT report",
    "home.platform.scene.accounting.lanes.2.items.2": "Management pack",
    "home.platform.scene.accounting.footer.0": "Invoice states",
    "home.platform.scene.accounting.footer.1": "Tax rules",
    "home.platform.scene.accounting.footer.2": "Payment gateways",
    "home.platform.scene.accounting.footer.3": "Export logs",
    "home.platform.scene.crm.title": "CRM handoff desk",
    "home.platform.scene.crm.subtitle":
      "Sales activity, account context, and delivery follow-up without losing the thread.",
    "home.platform.scene.crm.operator": "Account owner",
    "home.platform.scene.crm.focus": "From lead to operational handoff",
    "home.platform.scene.crm.queue.0.label": "Next action",
    "home.platform.scene.crm.queue.0.value": "Demo follow-up",
    "home.platform.scene.crm.queue.1.label": "Account stage",
    "home.platform.scene.crm.queue.1.value": "Ops review",
    "home.platform.scene.crm.queue.2.label": "Handoff notes",
    "home.platform.scene.crm.queue.2.value": "Delivery ready",
    "home.platform.scene.crm.lanes.0.label": "Pipeline",
    "home.platform.scene.crm.lanes.0.items.0": "Qualified lead",
    "home.platform.scene.crm.lanes.0.items.1": "Proposal shared",
    "home.platform.scene.crm.lanes.0.items.2": "Procurement review",
    "home.platform.scene.crm.lanes.1.label": "Context",
    "home.platform.scene.crm.lanes.1.items.0": "Sites",
    "home.platform.scene.crm.lanes.1.items.1": "Users",
    "home.platform.scene.crm.lanes.1.items.2": "Systems connected",
    "home.platform.scene.crm.lanes.2.label": "Follow-up",
    "home.platform.scene.crm.lanes.2.items.0": "Schedule call",
    "home.platform.scene.crm.lanes.2.items.1": "Assign owner",
    "home.platform.scene.crm.lanes.2.items.2": "Create project brief",
    "home.platform.scene.crm.footer.0": "Contacts",
    "home.platform.scene.crm.footer.1": "Tasks",
    "home.platform.scene.crm.footer.2": "Company profile",
    "home.platform.scene.crm.footer.3": "Deal history",
    "home.platform.scene.ai.title": "Automation review queue",
    "home.platform.scene.ai.subtitle":
      "AI assists repetitive work while operators keep control over decisions.",
    "home.platform.scene.ai.operator": "Operations analyst",
    "home.platform.scene.ai.focus": "Suggested actions with human approval",
    "home.platform.scene.ai.queue.0.label": "Suggested fixes",
    "home.platform.scene.ai.queue.0.value": "Awaiting approval",
    "home.platform.scene.ai.queue.1.label": "Recipe status",
    "home.platform.scene.ai.queue.1.value": "Running safely",
    "home.platform.scene.ai.queue.2.label": "Guardrails",
    "home.platform.scene.ai.queue.2.value": "Human review on",
    "home.platform.scene.ai.lanes.0.label": "Inputs",
    "home.platform.scene.ai.lanes.0.items.0": "Low stock alert",
    "home.platform.scene.ai.lanes.0.items.1": "Late payout",
    "home.platform.scene.ai.lanes.0.items.2": "Duplicate customer",
    "home.platform.scene.ai.lanes.1.label": "Assistant",
    "home.platform.scene.ai.lanes.1.items.0": "Draft action",
    "home.platform.scene.ai.lanes.1.items.1": "Explain reason",
    "home.platform.scene.ai.lanes.1.items.2": "Check policy",
    "home.platform.scene.ai.lanes.2.label": "Operator",
    "home.platform.scene.ai.lanes.2.items.0": "Approve",
    "home.platform.scene.ai.lanes.2.items.1": "Edit",
    "home.platform.scene.ai.lanes.2.items.2": "Dismiss",
    "home.platform.scene.ai.footer.0": "Rules",
    "home.platform.scene.ai.footer.1": "Approvals",
    "home.platform.scene.ai.footer.2": "Audit log",
    "home.platform.scene.ai.footer.3": "Prompt history",
    "home.platform.scene.warehouse.title": "Warehouse execution board",
    "home.platform.scene.warehouse.subtitle":
      "Receiving, picking, packing, shipping, and returns coordinated from one queue.",
    "home.platform.scene.warehouse.operator": "Warehouse supervisor",
    "home.platform.scene.warehouse.focus": "Wave planning and dock visibility",
    "home.platform.scene.warehouse.queue.0.label": "Wave plan",
    "home.platform.scene.warehouse.queue.0.value": "Picking now",
    "home.platform.scene.warehouse.queue.1.label": "Dock status",
    "home.platform.scene.warehouse.queue.1.value": "Inbound review",
    "home.platform.scene.warehouse.queue.2.label": "Returns",
    "home.platform.scene.warehouse.queue.2.value": "Inspection lane",
    "home.platform.scene.warehouse.lanes.0.label": "Inbound",
    "home.platform.scene.warehouse.lanes.0.items.0": "ASN received",
    "home.platform.scene.warehouse.lanes.0.items.1": "Quality checked",
    "home.platform.scene.warehouse.lanes.0.items.2": "Putaway assigned",
    "home.platform.scene.warehouse.lanes.1.label": "Outbound",
    "home.platform.scene.warehouse.lanes.1.items.0": "Pick wave",
    "home.platform.scene.warehouse.lanes.1.items.1": "Pack station",
    "home.platform.scene.warehouse.lanes.1.items.2": "Carrier handoff",
    "home.platform.scene.warehouse.lanes.2.label": "Exceptions",
    "home.platform.scene.warehouse.lanes.2.items.0": "Short pick",
    "home.platform.scene.warehouse.lanes.2.items.1": "Damaged item",
    "home.platform.scene.warehouse.lanes.2.items.2": "Address hold",
    "home.platform.scene.warehouse.footer.0": "Bins",
    "home.platform.scene.warehouse.footer.1": "Pick lists",
    "home.platform.scene.warehouse.footer.2": "Packing slips",
    "home.platform.scene.warehouse.footer.3": "Carrier labels",
    "home.platform.scene.pos.title": "Retail counter cockpit",
    "home.platform.scene.pos.subtitle":
      "Counter sales, offline sync, refunds, loyalty, and inventory connected at checkout.",
    "home.platform.scene.pos.operator": "Store operator",
    "home.platform.scene.pos.focus": "Fast counter work with clean back-office data",
    "home.platform.scene.pos.queue.0.label": "Counter state",
    "home.platform.scene.pos.queue.0.value": "Selling now",
    "home.platform.scene.pos.queue.1.label": "Offline sync",
    "home.platform.scene.pos.queue.1.value": "Protected queue",
    "home.platform.scene.pos.queue.2.label": "Returns",
    "home.platform.scene.pos.queue.2.value": "Manager review",
    "home.platform.scene.pos.lanes.0.label": "Sale",
    "home.platform.scene.pos.lanes.0.items.0": "Scan item",
    "home.platform.scene.pos.lanes.0.items.1": "Apply offer",
    "home.platform.scene.pos.lanes.0.items.2": "Take payment",
    "home.platform.scene.pos.lanes.1.label": "Customer",
    "home.platform.scene.pos.lanes.1.items.0": "Loyalty lookup",
    "home.platform.scene.pos.lanes.1.items.1": "Wallet balance",
    "home.platform.scene.pos.lanes.1.items.2": "Receipt delivery",
    "home.platform.scene.pos.lanes.2.label": "Back office",
    "home.platform.scene.pos.lanes.2.items.0": "Stock decrement",
    "home.platform.scene.pos.lanes.2.items.1": "Tax record",
    "home.platform.scene.pos.lanes.2.items.2": "Shift close",
    "home.platform.scene.pos.footer.0": "Cash drawer",
    "home.platform.scene.pos.footer.1": "Coupons",
    "home.platform.scene.pos.footer.2": "Receipts",
    "home.platform.scene.pos.footer.3": "Shift reports",
    "home.platform.scene.reports.title": "Reporting command surface",
    "home.platform.scene.reports.subtitle":
      "Dashboards built from source systems, with freshness and ownership visible.",
    "home.platform.scene.reports.operator": "Leadership team",
    "home.platform.scene.reports.focus": "Decision views without data archaeology",
    "home.platform.scene.reports.queue.0.label": "Source health",
    "home.platform.scene.reports.queue.0.value": "Feeds connected",
    "home.platform.scene.reports.queue.1.label": "Board pack",
    "home.platform.scene.reports.queue.1.value": "Owner review",
    "home.platform.scene.reports.queue.2.label": "Exports",
    "home.platform.scene.reports.queue.2.value": "Scheduled",
    "home.platform.scene.reports.lanes.0.label": "Inputs",
    "home.platform.scene.reports.lanes.0.items.0": "Inventory",
    "home.platform.scene.reports.lanes.0.items.1": "Finance",
    "home.platform.scene.reports.lanes.0.items.2": "Sales",
    "home.platform.scene.reports.lanes.1.label": "Views",
    "home.platform.scene.reports.lanes.1.items.0": "Executive summary",
    "home.platform.scene.reports.lanes.1.items.1": "Operations detail",
    "home.platform.scene.reports.lanes.1.items.2": "Exception list",
    "home.platform.scene.reports.lanes.2.label": "Distribution",
    "home.platform.scene.reports.lanes.2.items.0": "PDF pack",
    "home.platform.scene.reports.lanes.2.items.1": "CSV export",
    "home.platform.scene.reports.lanes.2.items.2": "Email schedule",
    "home.platform.scene.reports.footer.0": "Dashboards",
    "home.platform.scene.reports.footer.1": "Sources",
    "home.platform.scene.reports.footer.2": "Permissions",
    "home.platform.scene.reports.footer.3": "Snapshots",
    "home.why.eyebrow": "Why TRAFFODATA ERP",
    "home.why.title1": "The compounding",
    "home.why.title2": "return of clarity.",
    "home.why.efficiency": "Operational efficiency",
    "home.why.inventory": "Faster inventory control",
    "home.why.manual": "Reduced manual work",
    "home.why.productivity": "Higher team productivity",
    "home.comparison.title": "TRAFFODATA vs traditional service providers",
    "home.comparison.goods": "TRAFFODATA Software",
    "home.comparison.traditional": "Traditional service providers",
    "home.comparison.traditionalMobile": "Traditional providers",
    "home.comparison.paidDiscovery": "Paid discovery call",
    "home.comparison.row.0.label": "Approach",
    "home.comparison.row.0.goods": "Workflow mapping before screens",
    "home.comparison.row.0.traditional": "Generic app scoping",
    "home.comparison.row.1.label": "Process",
    "home.comparison.row.1.goods": "Systems, roles and exceptions made visible",
    "home.comparison.row.1.traditional": "Requirements hidden in meetings",
    "home.comparison.row.2.label": "Design Philosophy",
    "home.comparison.row.2.goods": "Polished product surfaces backed by real logic",
    "home.comparison.row.2.traditional": "Pretty screens with fragile operations",
    "home.comparison.row.3.label": "Development Stack",
    "home.comparison.row.3.goods": "Backend, APIs, dashboards and mobile flows together",
    "home.comparison.row.3.traditional": "One-off pieces that do not connect",
    "home.comparison.row.4.label": "Communication",
    "home.comparison.row.4.goods": "Clear updates",
    "home.comparison.row.4.traditional": "Multiple middlemen",
    "home.comparison.row.5.label": "Deliverables",
    "home.comparison.row.5.goods": "Production-ready operational systems",
    "home.comparison.row.5.traditional": "Static mockups",
    "home.comparison.row.6.label": "Support",
    "home.comparison.row.6.goods": "Long-term partnership mindset",
    "home.comparison.row.6.traditional": "One-and-done projects",
    "home.comparison.row.7.label": "First conversation",
    "home.comparison.row.7.goods": "Start with a project-fit call",
    "home.comparison.row.7.traditional": "Paid discovery before clarity",
    "home.projects.eyebrow": "Selected work",
    "home.projects.title": "Featured projects.",
    "home.projects.viewAll": "View all case studies",
    "home.projects.liveWorkflow": "Live workflow",
    "home.projects.item.wikifood-commerce-delivery-backend.t":
      "WikiFood Multi-Vendor Commerce Backend",
    "home.projects.item.wikifood-commerce-delivery-backend.c": "WikiFood",
    "home.projects.item.wikifood-commerce-delivery-backend.tag": "Mobile product",
    "home.projects.item.wikifood-commerce-delivery-backend.headline":
      "Multi-vendor order engine",
    "home.projects.item.wikifood-commerce-delivery-backend.modules.0": "Vendor POS",
    "home.projects.item.wikifood-commerce-delivery-backend.modules.1": "Customer app",
    "home.projects.item.wikifood-commerce-delivery-backend.modules.2": "Delivery app",
    "home.projects.item.wikifood-commerce-delivery-backend.states.0": "Orders split by store",
    "home.projects.item.wikifood-commerce-delivery-backend.states.1":
      "Wallets and disbursements",
    "home.projects.item.wikifood-commerce-delivery-backend.states.2": "Stock-safe checkout",
    "home.projects.item.wikifood-commerce-delivery-backend.action": "Laravel API platform",
    "home.projects.item.printout-laravel-rest-api.t": "Printout Backend",
    "home.projects.item.printout-laravel-rest-api.c": "Printout",
    "home.projects.item.printout-laravel-rest-api.tag": "Backend platform",
    "home.projects.item.printout-laravel-rest-api.headline": "Print workflow API",
    "home.projects.item.printout-laravel-rest-api.modules.0": "REST endpoints",
    "home.projects.item.printout-laravel-rest-api.modules.1": "Admin roles",
    "home.projects.item.printout-laravel-rest-api.modules.2": "Order states",
    "home.projects.item.printout-laravel-rest-api.states.0": "Quote received",
    "home.projects.item.printout-laravel-rest-api.states.1": "Files attached",
    "home.projects.item.printout-laravel-rest-api.states.2": "Production queued",
    "home.projects.item.printout-laravel-rest-api.action": "Operational backend",
    "home.projects.item.taggz-ai-event-photography-platform.t":
      "Taggz AI Event Photography Platform",
    "home.projects.item.taggz-ai-event-photography-platform.c": "Taggz",
    "home.projects.item.taggz-ai-event-photography-platform.tag": "AI platform",
    "home.projects.item.taggz-ai-event-photography-platform.headline":
      "Event photo matching",
    "home.projects.item.taggz-ai-event-photography-platform.modules.0": "Upload queue",
    "home.projects.item.taggz-ai-event-photography-platform.modules.1": "Face match",
    "home.projects.item.taggz-ai-event-photography-platform.modules.2": "Gallery delivery",
    "home.projects.item.taggz-ai-event-photography-platform.states.0": "Event imported",
    "home.projects.item.taggz-ai-event-photography-platform.states.1": "Guests indexed",
    "home.projects.item.taggz-ai-event-photography-platform.states.2": "Albums ready",
    "home.projects.item.taggz-ai-event-photography-platform.action": "AI delivery flow",
    "home.projects.item.jawad-horse-riding-booking-platform.t":
      "JAWAD Horse Riding Booking Platform",
    "home.projects.item.jawad-horse-riding-booking-platform.c": "JAWAD",
    "home.projects.item.jawad-horse-riding-booking-platform.tag": "Mobile product",
    "home.projects.item.jawad-horse-riding-booking-platform.headline":
      "Stable booking system",
    "home.projects.item.jawad-horse-riding-booking-platform.modules.0": "Rider app",
    "home.projects.item.jawad-horse-riding-booking-platform.modules.1": "Trainer slots",
    "home.projects.item.jawad-horse-riding-booking-platform.modules.2": "Payments",
    "home.projects.item.jawad-horse-riding-booking-platform.states.0": "Choose horse",
    "home.projects.item.jawad-horse-riding-booking-platform.states.1": "Reserve lesson",
    "home.projects.item.jawad-horse-riding-booking-platform.states.2": "Confirm arrival",
    "home.projects.item.jawad-horse-riding-booking-platform.action": "Mobile booking flow",
    "home.projects.item.elnasser-backend-dashboard.t": "Elnasser Backend & Logistics Engine",
    "home.projects.item.elnasser-backend-dashboard.c": "Al Nasser",
    "home.projects.item.elnasser-backend-dashboard.tag": "Logistics system",
    "home.projects.item.elnasser-backend-dashboard.headline": "Fulfillment control desk",
    "home.projects.item.elnasser-backend-dashboard.modules.0": "Warehouse",
    "home.projects.item.elnasser-backend-dashboard.modules.1": "Routes",
    "home.projects.item.elnasser-backend-dashboard.modules.2": "Returns",
    "home.projects.item.elnasser-backend-dashboard.states.0": "Stock reserved",
    "home.projects.item.elnasser-backend-dashboard.states.1": "Driver assigned",
    "home.projects.item.elnasser-backend-dashboard.states.2": "Delivery tracked",
    "home.projects.item.elnasser-backend-dashboard.action": "Logistics operations",
    "home.projects.item.alnasser-ecommerce.t": "Al Nasser E-Commerce Landing Page",
    "home.projects.item.alnasser-ecommerce.c": "Al Nasser",
    "home.projects.item.alnasser-ecommerce.tag": "Commerce system",
    "home.projects.item.alnasser-ecommerce.headline": "Commerce launch surface",
    "home.projects.item.alnasser-ecommerce.modules.0": "Catalog hero",
    "home.projects.item.alnasser-ecommerce.modules.1": "Campaign blocks",
    "home.projects.item.alnasser-ecommerce.modules.2": "Checkout CTA",
    "home.projects.item.alnasser-ecommerce.states.0": "Browse offer",
    "home.projects.item.alnasser-ecommerce.states.1": "Compare products",
    "home.projects.item.alnasser-ecommerce.states.2": "Start order",
    "home.projects.item.alnasser-ecommerce.action": "Frontend conversion path",
    "home.tech.eyebrow": "Engineering stack",
    "home.tech.title1": "Built on a foundation",
    "home.tech.title2": "we trust for a decade.",
    "home.process.eyebrow": "How we work",
    "home.process.title1": "A process, not",
    "home.process.title2": "a pitch deck.",
    "home.process.discovery.title": "Discovery",
    "home.process.discovery.text":
      "We embed with your team to map operations, constraints and the unsolved problems worth solving.",
    "home.process.strategy.title": "Strategy",
    "home.process.strategy.text":
      "We define modules, data model and the rollout path, sequenced for fast, measurable wins.",
    "home.process.design.title": "Design",
    "home.process.design.text":
      "Interfaces designed around how your people actually work: calm, fast, and easy to learn.",
    "home.process.development.title": "Development",
    "home.process.development.text":
      "Engineered in agile cycles with weekly demos and full transparency on quality and progress.",
    "home.process.deployment.title": "Deployment",
    "home.process.deployment.text":
      "Migration, training and a long-term partnership. We stay with you as the business evolves.",
    "home.testimonials.eyebrow": "Operators speak",
    "home.testimonials.label": "Testimonials",
    "home.testimonials.show": "Show testimonial",
    "home.testimonials.quote.0.q":
      "TRAFFODATA quietly replaced four legacy systems. Our finance close went from twelve days to three.",
    "home.testimonials.quote.0.a": "Layla Othman",
    "home.testimonials.quote.0.r": "CFO, Aurora Industries",
    "home.testimonials.quote.1.q":
      "It's the most considered enterprise product I've used. Every screen feels designed for the person who actually does the job.",
    "home.testimonials.quote.1.a": "Marcus Reilly",
    "home.testimonials.quote.1.r": "COO, Halcyon Logistics",
    "home.testimonials.quote.2.q":
      "We rolled it out across 38 stores in a quarter. The team adopted it without a single training session.",
    "home.testimonials.quote.2.a": "Nadia Park",
    "home.testimonials.quote.2.r": "Head of Retail, Vertex",
    "home.cta.eyebrow": "Start the conversation",
    "home.cta.title1": "Ready to transform",
    "home.cta.title2": "your business?",
    "home.cta.copy":
      "A 30-minute call with our team. We'll show you the platform, mapped to your operations.",
    "home.cta.emailPrefix": "or email",
    "home.cta.badge.domain": "Verified email domain",
    "home.cta.badge.scope": "ERP, POS, inventory, warehouse",
    "home.cta.badge.review": "Fast technical review",
    "home.cta.badge.next": "Clear next step",
    "home.footer.pages": "Pages",
    "home.footer.products": "Products",
    "home.footer.company": "Company",
    "home.footer.start": "Start",
    "home.footer.productsLink": "Products",
    "home.footer.erp": "ERP Systems",
    "home.footer.inventory": "Inventory",
    "home.footer.warehouse": "Warehouse",
    "home.footer.pos": "POS",
    "home.footer.accounting": "Accounting",
    "home.footer.selectedWork": "Selected work",
    "home.footer.howWeWork": "How we work",
    "home.footer.email": "Email info@traffodata.com",
    "home.footer.description":
      "Premium ERP, inventory, warehouse, POS, accounting, CRM and AI software for operators building serious businesses.",
    "home.footer.legalName": "TRAFFODATA Technologies.",
    "home.footer.rights": "All rights reserved.",
    "home.footer.backToTop": "Back to top",
    "work.filters.label": "Work filters",
    "work.filter.all": "All",
    "work.filter.operations": "Operations",
    "work.filter.commerce": "Commerce",
    "work.filter.dashboards": "Dashboards",
    "work.filter.mobile": "Mobile",
    "work.filter.web": "Web",
    "work.hero.eyebrow": "Selected systems",
    "work.hero.title": "Proof for serious operators.",
    "work.hero.copy":
      "Proof from businesses with real workflows, real teams, and real money moving through the system. Explore backend platforms, dashboards, mobile products, commerce engines, inventory systems, and internal tools built around operational pressure.",
    "work.hero.backdrop": "Projects",
    "work.project.view": "View project",
    "work.empty":
      "No case studies match this filter yet. View all work to scan the full archive.",
    "work.cta.eyebrow": "Have a workflow like this?",
    "work.cta.title": "Bring us the operating problem. We will map the system hiding inside it.",
    "work.process.title": "Built around operating pressure.",
    "work.process.copy":
      "The work starts where the business is already moving: counters, docks, uploads, payments, approvals, exceptions, and month-end.",
    "work.process.map.title": "Map the floor",
    "work.process.map.text":
      "We start with the handoffs, queues, exceptions, and approval paths operators already live with.",
    "work.process.prototype.title": "Prototype the pressure",
    "work.process.prototype.text":
      "Weekly reviews use realistic orders, inventory states, and finance rules instead of polished demo data.",
    "work.process.rollout.title": "Sequence the rollout",
    "work.process.rollout.text":
      "Launch plans are cut around risk, training windows, and measurable operational lift.",
    "work.visual.retail": "Retail",
    "work.visual.live": "Live",
    "work.visual.wavePlan": "Wave plan",
    "work.visual.depot": "Depot",
    "work.visual.picksHour": "picks / hour",
    "work.visual.closeBoard": "Close board",
    "work.visual.days": "days",
    "work.visual.entitiesReconciled": "entities reconciled",
    "work.visual.routeDesk": "Route desk",
    "work.visual.skuReservations": "SKU reservations",
    "work.visual.preview": "preview",
    "project.backToWork": "Back to work",
    "project.work": "Work",
    "project.notFound.title": "Project not found.",
    "project.notFound.copy":
      "This case study is not available. The work index has the current project list.",
    "project.open": "Open project",
    "project.stat.system": "System",
    "project.stat.timeline": "Timeline",
    "project.stat.launch": "Launch",
    "project.stat.year": "Year",
    "project.deliveryScope": "Delivery scope",
    "project.stack.title": "Stack and capabilities.",
    "project.stack.copy":
      "The technical footprint stays visible without turning the case study into a sparse list.",
    "project.capabilities": "capabilities",
    "project.notes.title": "Build notes and proof.",
    "project.related.title": "More systems under pressure.",
    "project.allWork": "All work",
    "project.media.banner": "Project banner",
    "project.media.generated": "Generated system banner",
    "project.media.image": "Project image",
    "project.media.liveModel": "Live model",
    "project.media.signal": "Signal",
    "project.media.alt": "project media",
    "blog.hero.eyebrow": "Operations journal",
    "blog.hero.title": "Writing for operating systems.",
    "blog.hero.copy":
      "Practical essays on ERP, inventory, finance, warehouse, POS, CRM, and durable business software decisions.",
    "blog.hero.backdrop": "Notes",
    "blog.featured": "Featured briefing",
    "blog.readingList": "Reading list.",
    "blog.discuss": "Discuss",
    "blog.article.topic.operations": "Operations",
    "blog.article.topic.erp": "ERP",
    "blog.article.topic.inventory": "Inventory",
    "blog.article.topic.warehouse": "Warehouse",
    "blog.article.topic.accounting": "Accounting",
    "blog.article.topic.pos": "POS",
    "blog.article.topic.automation": "Automation",
    "blog.article.back": "Back to the journal",
    "blog.article.operatingQuestion": "The operating question",
    "blog.article.signals": "Signals to watch",
    "blog.article.related": "Keep reading.",
    "blog.article.cta": "Bring the workflow to the table.",
    "blog.preferredSource": "Follow TRAFFODATA in Google",
    "blog.article.warehouse-management-software-egypt.title":
      "Warehouse software in Egypt: how to choose a system operators will use",
    "blog.article.warehouse-management-software-egypt.deck":
      "A practical buying guide for teams comparing warehouse software, inventory accuracy, barcode workflows, receiving, picking, and delivery operations in Egypt.",
    "blog.article.warehouse-management-software-egypt.topic": "Warehouse",
    "blog.article.warehouse-management-software-egypt.readTime": "8 min read",
    "blog.article.warehouse-management-software-egypt.publishedAt": "September 2026",
    "blog.article.warehouse-management-software-egypt.audience": "Warehouse, logistics, commerce",
    "blog.article.warehouse-management-software-egypt.question":
      "Can the system show the next action before the order reaches the floor?",
    "blog.article.warehouse-management-software-egypt.signal.0.label": "Priority",
    "blog.article.warehouse-management-software-egypt.signal.0.value": "Traceability",
    "blog.article.warehouse-management-software-egypt.signal.1.label": "Control",
    "blog.article.warehouse-management-software-egypt.signal.1.value": "Stock truth",
    "blog.article.warehouse-management-software-egypt.signal.2.label": "Output",
    "blog.article.warehouse-management-software-egypt.signal.2.value": "Faster dispatch",
    "blog.article.warehouse-management-software-egypt.section.operating-question.title":
      "Start with the floor, not the feature list",
    "blog.article.warehouse-management-software-egypt.section.operating-question.text":
      "Warehouse management software should make the next operational decision visible: what was received, where it is stored, what is reserved, what can be picked, and what is ready to leave. Begin by mapping the moments where a supervisor currently checks a spreadsheet, calls another team, or corrects a status by hand.",
    "blog.article.warehouse-management-software-egypt.section.buying-criteria.title":
      "The buying criteria that matter",
    "blog.article.warehouse-management-software-egypt.section.buying-criteria.text":
      "Look for one traceable record from receiving through putaway, picking, packing, dispatch, returns, and adjustment. Test barcode workflows, multi-location stock, reservations, role permissions, audit history, and integrations with ecommerce, POS, accounting, and delivery before you compare dashboards or screenshots.",
    "blog.article.warehouse-management-software-egypt.section.egypt-context.title":
      "What to validate for an Egyptian operation",
    "blog.article.warehouse-management-software-egypt.section.egypt-context.text":
      "A system used in Egypt needs to fit the actual handoffs around the warehouse: Arabic and English teams, local delivery partners, cash and electronic payment reconciliation, branch transfers, tax documentation, and the realities of intermittent connectivity. These are workflow requirements, not optional polish to add after launch.",
    "blog.article.warehouse-management-software-egypt.section.decision.title":
      "A practical decision rule",
    "blog.article.warehouse-management-software-egypt.section.decision.text":
      "Choose the platform that can explain every stock movement to the person responsible for the next action. If the answer depends on exporting data, reconciling multiple systems, or trusting an unowned exception queue, the operation has outgrown the tool even if the interface looks modern.",
    "blog.article.digital-storefront-egypt.title":
      "Digital storefronts in Egypt need an operating system behind them",
    "blog.article.digital-storefront-egypt.deck":
      "A digital storefront is only the front door. The useful work happens when catalog, inventory, payments, delivery, and customer data stay connected.",
    "blog.article.digital-storefront-egypt.topic": "ERP",
    "blog.article.digital-storefront-egypt.readTime": "6 min read",
    "blog.article.digital-storefront-egypt.publishedAt": "September 2026",
    "blog.article.digital-storefront-egypt.audience": "Commerce, founders, operations",
    "blog.article.digital-storefront-egypt.question":
      "What should update automatically when a customer places an order?",
    "blog.article.digital-storefront-egypt.signal.0.label": "Front door",
    "blog.article.digital-storefront-egypt.signal.0.value": "Storefront",
    "blog.article.digital-storefront-egypt.signal.1.label": "Source",
    "blog.article.digital-storefront-egypt.signal.1.value": "Live inventory",
    "blog.article.digital-storefront-egypt.signal.2.label": "Outcome",
    "blog.article.digital-storefront-egypt.signal.2.value": "Joined-up orders",
    "blog.article.digital-storefront-egypt.section.front-door.title":
      "The storefront is the front door",
    "blog.article.digital-storefront-egypt.section.front-door.text":
      "A digital storefront helps a customer browse and buy, but it does not decide whether the item is truly available, who should fulfill it, how the payment is reconciled, or what the customer hears next. Those decisions belong to the operating system behind the storefront.",
    "blog.article.digital-storefront-egypt.section.source-of-truth.title":
      "Connect the source of truth",
    "blog.article.digital-storefront-egypt.section.source-of-truth.text":
      "Catalog, prices, stock, customer records, payment state, and delivery status should share an explicit model. When every channel writes its own version of the order, teams spend their time explaining mismatches instead of serving customers. A connected platform makes the state and its owner visible.",
    "blog.article.digital-storefront-egypt.section.operating-loop.title":
      "Design the complete order loop",
    "blog.article.digital-storefront-egypt.section.operating-loop.text":
      "Map what happens after checkout: reservation, picking, substitution, payment confirmation, dispatch, delivery attempt, return, refund, and support. For Egyptian commerce teams, include the handoffs between online orders, branches, local delivery operations, and the finance team from the beginning.",
    "blog.article.digital-storefront-egypt.section.decision.title":
      "The useful test",
    "blog.article.digital-storefront-egypt.section.decision.text":
      "Ask whether one person can answer three questions without opening five tools: what did the customer order, where is it now, and what must happen next? If not, the next investment is probably not another storefront feature. It is the connected operational layer underneath it.",
    "blog.article.ecommerce-software-egypt.title":
      "Ecommerce software in Egypt: connect the storefront to the work behind it",
    "blog.article.ecommerce-software-egypt.deck":
      "A practical guide to ecommerce software in Egypt: catalog, cash on delivery, payments, inventory, delivery, and the operating data that keeps orders moving.",
    "blog.article.ecommerce-software-egypt.topic": "ERP",
    "blog.article.ecommerce-software-egypt.readTime": "7 min read",
    "blog.article.ecommerce-software-egypt.publishedAt": "September 2026",
    "blog.article.ecommerce-software-egypt.audience": "Commerce, founders, operations",
    "blog.article.ecommerce-software-egypt.question":
      "Does every order create one shared operational record?",
    "blog.article.ecommerce-software-egypt.signal.0.label": "Demand",
    "blog.article.ecommerce-software-egypt.signal.0.value": "COD + card",
    "blog.article.ecommerce-software-egypt.signal.1.label": "Control",
    "blog.article.ecommerce-software-egypt.signal.1.value": "Live stock",
    "blog.article.ecommerce-software-egypt.signal.2.label": "Output",
    "blog.article.ecommerce-software-egypt.signal.2.value": "Fewer handoffs",
    "blog.article.ecommerce-software-egypt.section.storefront-is-not-system.title":
      "The storefront is not the operating system",
    "blog.article.ecommerce-software-egypt.section.storefront-is-not-system.text":
      "A storefront can collect an order, but the business still needs to reserve stock, confirm payment, assign fulfillment, coordinate delivery, and answer the customer. Ecommerce software becomes useful when those states live in one model instead of being passed between a store, spreadsheet, courier portal, and chat thread.",
    "blog.article.ecommerce-software-egypt.section.egypt-order-path.title":
      "Map the order path used in Egypt",
    "blog.article.ecommerce-software-egypt.section.egypt-order-path.text":
      "Start with the real mix of cash on delivery, card payments, bank transfers, WhatsApp follow-up, branch stock, and local delivery partners. The goal is not to add every integration on day one. It is to make the owner of each state clear, from confirmation to failed delivery, return, refund, and reconciliation.",
    "blog.article.ecommerce-software-egypt.section.integration-checklist.title":
      "The integration checklist",
    "blog.article.ecommerce-software-egypt.section.integration-checklist.text":
      "Validate catalog ownership, stock reservations, price rules, payment status, delivery status, customer history, notifications, permissions, and audit events. A good ecommerce platform should make exceptions visible and recoverable, not hide them behind a green order count.",
    "blog.article.ecommerce-software-egypt.section.decision.title": "Choose the layer that is missing",
    "blog.article.ecommerce-software-egypt.section.decision.text":
      "If the storefront is fine but operations are scattered, improve the connected order layer. If stock and finance are already reliable, focus on the customer-facing experience. The right investment follows the broken handoff rather than the loudest feature request.",
    "blog.article.laravel-rest-api-business-systems.title":
      "Laravel REST APIs for business systems: what to connect first",
    "blog.article.laravel-rest-api-business-systems.deck":
      "A practical guide to designing Laravel REST APIs for inventory, orders, payments, and mobile apps without turning every integration into a fragile handoff.",
    "blog.article.laravel-rest-api-business-systems.topic": "Automation",
    "blog.article.laravel-rest-api-business-systems.readTime": "7 min read",
    "blog.article.laravel-rest-api-business-systems.publishedAt": "September 2026",
    "blog.article.laravel-rest-api-business-systems.audience": "Product, engineering, operations",
    "blog.article.laravel-rest-api-business-systems.question":
      "Can every important business event be replayed, traced, and owned?",
    "blog.article.laravel-rest-api-business-systems.signal.0.label": "Contract",
    "blog.article.laravel-rest-api-business-systems.signal.0.value": "Clear resources",
    "blog.article.laravel-rest-api-business-systems.signal.1.label": "Reliability",
    "blog.article.laravel-rest-api-business-systems.signal.1.value": "Idempotent events",
    "blog.article.laravel-rest-api-business-systems.signal.2.label": "Output",
    "blog.article.laravel-rest-api-business-systems.signal.2.value": "Safer integrations",
    "blog.article.laravel-rest-api-business-systems.section.start-with-events.title":
      "Start with business events",
    "blog.article.laravel-rest-api-business-systems.section.start-with-events.text":
      "A Laravel REST API should represent work the business understands: an order placed, a stock movement recorded, a payment captured, or a delivery attempt made. Start with those events and their owners before choosing controller names or generating endpoints.",
    "blog.article.laravel-rest-api-business-systems.section.resource-boundaries.title":
      "Make resource boundaries explicit",
    "blog.article.laravel-rest-api-business-systems.section.resource-boundaries.text":
      "Define which system owns customers, products, inventory, orders, payments, and delivery states. Use stable identifiers, validation, authorization, pagination, and versioned contracts so a mobile app or partner integration is not coupled to a private database shape.",
    "blog.article.laravel-rest-api-business-systems.section.mobile-and-partners.title":
      "Design for mobile and partners",
    "blog.article.laravel-rest-api-business-systems.section.mobile-and-partners.text":
      "Mobile apps and external services need predictable responses, useful errors, retry-safe writes, and clear webhook behavior. Treat slow networks, duplicate requests, expired tokens, and partial failures as normal operating conditions rather than edge cases.",
    "blog.article.laravel-rest-api-business-systems.section.production-readiness.title":
      "Production readiness is part of the API",
    "blog.article.laravel-rest-api-business-systems.section.production-readiness.text":
      "Before launch, add request logs, correlation IDs, rate limits, queue visibility, health checks, backups, and a way to replay or reconcile failed work. The API is not finished when the endpoint returns 200; it is finished when the team can explain what happened next.",
    "blog.article.custom-business-software-egypt.title":
      "Custom business software in Egypt: when the workflow is the product",
    "blog.article.custom-business-software-egypt.deck":
      "How to decide whether custom business software is justified when spreadsheets, SaaS tools, and manual approvals no longer agree.",
    "blog.article.custom-business-software-egypt.topic": "ERP",
    "blog.article.custom-business-software-egypt.readTime": "6 min read",
    "blog.article.custom-business-software-egypt.publishedAt": "September 2026",
    "blog.article.custom-business-software-egypt.audience": "Founders, COOs, operations",
    "blog.article.custom-business-software-egypt.question":
      "Is the bottleneck a missing feature, or a missing operating model?",
    "blog.article.custom-business-software-egypt.signal.0.label": "Trigger",
    "blog.article.custom-business-software-egypt.signal.0.value": "Repeated exceptions",
    "blog.article.custom-business-software-egypt.signal.1.label": "Scope",
    "blog.article.custom-business-software-egypt.signal.1.value": "First release",
    "blog.article.custom-business-software-egypt.signal.2.label": "Outcome",
    "blog.article.custom-business-software-egypt.signal.2.value": "Owned workflow",
    "blog.article.custom-business-software-egypt.section.signal-to-build.title":
      "The signal that it is time to build",
    "blog.article.custom-business-software-egypt.section.signal-to-build.text":
      "Custom software is worth considering when the same exceptions repeat, the rules are important to the business, and no existing tool can show who owns the next action. The problem is not that the team lacks another dashboard. The problem is that the operating model is being reconstructed by hand.",
    "blog.article.custom-business-software-egypt.section.map-before-code.title":
      "Map the work before the code",
    "blog.article.custom-business-software-egypt.section.map-before-code.text":
      "Document roles, approvals, records, states, handoffs, and failure paths. Include the real constraints around branches, Arabic and English teams, payment reconciliation, local delivery, and reporting. A short process map is more valuable than a long feature list.",
    "blog.article.custom-business-software-egypt.section.buy-and-build.title":
      "Know what to buy and what to build",
    "blog.article.custom-business-software-egypt.section.buy-and-build.text":
      "Keep commodity capabilities where a stable product already does the job, and build the workflow that differentiates the operation. Accounting, authentication, messaging, payments, and analytics may integrate well; the rules that join them may be the part you own.",
    "blog.article.custom-business-software-egypt.section.first-release.title":
      "Shape a first release people can trust",
    "blog.article.custom-business-software-egypt.section.first-release.text":
      "Choose one valuable operating loop and make it observable from request to outcome. Give the team clear permissions, evidence, notifications, and an exception path. The first release should reduce a real handoff, not simply recreate every screen from the old tools.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.title":
      "Custom software vs off-the-shelf in Egypt: a practical decision guide",
    "blog.article.custom-software-vs-off-the-shelf-egypt.deck":
      "The honest way to compare ready-made software with a system built around your workflow, budget, team, and long-term ownership.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.topic": "ERP",
    "blog.article.custom-software-vs-off-the-shelf-egypt.readTime": "7 min read",
    "blog.article.custom-software-vs-off-the-shelf-egypt.publishedAt": "September 2026",
    "blog.article.custom-software-vs-off-the-shelf-egypt.audience": "Founders, COOs, operations",
    "blog.article.custom-software-vs-off-the-shelf-egypt.question":
      "Where does the generic tool stop helping and start taxing the operation?",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.0.label": "Question",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.0.value": "Buy or build",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.1.label": "Risk",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.1.value": "Workarounds",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.2.label": "Outcome",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.2.value": "Fit over features",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.start-with-ceiling.title":
      "Start with the ceiling, not the excitement",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.start-with-ceiling.text":
      "Ready-made software is often the right first move. It becomes a problem when the team is spending more time working around the product than using it, or when the most important business rules live in spreadsheets, messages, and personal memory. Find the ceiling before you compare technology.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.total-cost.title":
      "Compare the full cost of the decision",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.total-cost.text":
      "The price is not only a subscription or a development estimate. Count implementation, migration, training, integrations, manual reconciliation, support, change requests, and the cost of errors. A cheaper tool can become expensive when every exception requires a human workaround.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.ownership.title":
      "Ask who owns the workflow",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.ownership.text":
      "Custom software should come with a clear ownership model: source code, hosting, credentials, documentation, monitoring, support, and a path for future improvements. Buying a product can reduce maintenance, but it may also mean accepting someone else's workflow and release priorities.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.decision.title":
      "A useful decision rule",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.decision.text":
      "Buy the stable commodity. Build the workflow that is genuinely specific to the business. For a growing Egyptian, Gulf, or international operation, the best answer is often a connected system that keeps reliable products where they work and customizes the handoffs that create the advantage.",
    "blog.article.software-project-timeline-3-15-weeks.title":
      "Why custom software projects take 3 to 15 weeks",
    "blog.article.software-project-timeline-3-15-weeks.deck":
      "A clear way to think about software delivery timelines: what can ship in three weeks, what needs a longer runway, and what protects the first release.",
    "blog.article.software-project-timeline-3-15-weeks.topic": "Automation",
    "blog.article.software-project-timeline-3-15-weeks.readTime": "6 min read",
    "blog.article.software-project-timeline-3-15-weeks.publishedAt": "September 2026",
    "blog.article.software-project-timeline-3-15-weeks.audience": "Founders, product, operations",
    "blog.article.software-project-timeline-3-15-weeks.question":
      "What is the smallest release that changes the operation for the better?",
    "blog.article.software-project-timeline-3-15-weeks.signal.0.label": "Range",
    "blog.article.software-project-timeline-3-15-weeks.signal.0.value": "3–15 weeks",
    "blog.article.software-project-timeline-3-15-weeks.signal.1.label": "Control",
    "blog.article.software-project-timeline-3-15-weeks.signal.1.value": "Release boundary",
    "blog.article.software-project-timeline-3-15-weeks.signal.2.label": "Output",
    "blog.article.software-project-timeline-3-15-weeks.signal.2.value": "Working software",
    "blog.article.software-project-timeline-3-15-weeks.section.scope-first.title":
      "Scope decides the calendar",
    "blog.article.software-project-timeline-3-15-weeks.section.scope-first.text":
      "A useful estimate starts with one operating loop, not a wish list. Define the users, decisions, records, integrations, permissions, and proof of success. The clearer the boundary, the more honest the timeline and the easier it is to make a trade-off.",
    "blog.article.software-project-timeline-3-15-weeks.section.three-week.title":
      "What a three-week release can do",
    "blog.article.software-project-timeline-3-15-weeks.section.three-week.text":
      "Three weeks can be enough for a focused release: one workflow, a small number of roles, a defined data model, and the screens needed to use it. It is a good shape for a pilot, an internal tool, a narrow portal, or the first slice of a larger platform.",
    "blog.article.software-project-timeline-3-15-weeks.section.fifteen-week.title":
      "What needs closer to fifteen weeks",
    "blog.article.software-project-timeline-3-15-weeks.section.fifteen-week.text":
      "A longer delivery window makes room for multiple roles, mobile or partner applications, deeper integrations, migration, reporting, permissions, testing, training, and a more complete operational surface. The point is not to fill fifteen weeks; it is to protect the quality of a system people will depend on.",
    "blog.article.software-project-timeline-3-15-weeks.section.protect-the-timeline.title":
      "Protect the first release",
    "blog.article.software-project-timeline-3-15-weeks.section.protect-the-timeline.text":
      "Keep decisions visible, review working software early, prepare access to external systems, and assign one person who can answer scope questions. Delays usually come from unclear ownership, late integration details, and expanding the first release before its core loop works.",
    "blog.article.post-launch-software-support-ownership.title":
      "Post-launch software support: who owns the system after release?",
    "blog.article.post-launch-software-support-ownership.deck":
      "Why ownership, support, monitoring, and small improvements should be designed before custom software goes live.",
    "blog.article.post-launch-software-support-ownership.topic": "Automation",
    "blog.article.post-launch-software-support-ownership.readTime": "6 min read",
    "blog.article.post-launch-software-support-ownership.publishedAt": "September 2026",
    "blog.article.post-launch-software-support-ownership.audience": "Founders, operations, technology",
    "blog.article.post-launch-software-support-ownership.question":
      "Who can explain the system when the business changes or something breaks?",
    "blog.article.post-launch-software-support-ownership.signal.0.label": "After launch",
    "blog.article.post-launch-software-support-ownership.signal.0.value": "Named owner",
    "blog.article.post-launch-software-support-ownership.signal.1.label": "Response",
    "blog.article.post-launch-software-support-ownership.signal.1.value": "Clear support",
    "blog.article.post-launch-software-support-ownership.signal.2.label": "Outcome",
    "blog.article.post-launch-software-support-ownership.signal.2.value": "Durable system",
    "blog.article.post-launch-software-support-ownership.section.ownership-after-launch.title":
      "Ownership does not end at launch",
    "blog.article.post-launch-software-support-ownership.section.ownership-after-launch.text":
      "A production system needs someone who understands its decisions, dependencies, credentials, data, and failure modes. Make ownership explicit across the client and delivery team before the first real user depends on it.",
    "blog.article.post-launch-software-support-ownership.section.support-model.title":
      "Define the support model",
    "blog.article.post-launch-software-support-ownership.section.support-model.text":
      "Agree on how incidents are reported, what counts as urgent, how response works, and where routine improvements are planned. Support is more useful when it includes monitoring, backups, release notes, and a short path from a repeated issue to a product improvement.",
    "blog.article.post-launch-software-support-ownership.section.handover.title":
      "Make handover part of delivery",
    "blog.article.post-launch-software-support-ownership.section.handover.text":
      "A real handover includes the source code, environments, deployment access, integrations, data model, runbook, user roles, and known limitations. Ownership means the client can keep operating and make informed decisions even when the original project team is not in the room.",
    "blog.article.post-launch-software-support-ownership.section.measure-improvement.title":
      "Measure the work after release",
    "blog.article.post-launch-software-support-ownership.section.measure-improvement.text":
      "Watch the signals that matter to the operation: failed jobs, unresolved exceptions, response time, adoption, manual work removed, and the time it takes to complete the core workflow. Post-launch support should make the system more dependable, not just keep the lights on.",
    "blog.article.egypt-gulf-software-integrations.title":
      "Software integrations for Egypt and the Gulf: design for the real handoffs",
    "blog.article.egypt-gulf-software-integrations.deck":
      "Local payment, delivery, language, and operational requirements matter when a business software system needs to work across Egypt, the Gulf, and international teams.",
    "blog.article.egypt-gulf-software-integrations.topic": "ERP",
    "blog.article.egypt-gulf-software-integrations.readTime": "7 min read",
    "blog.article.egypt-gulf-software-integrations.publishedAt": "September 2026",
    "blog.article.egypt-gulf-software-integrations.audience": "Commerce, logistics, operations",
    "blog.article.egypt-gulf-software-integrations.question":
      "Which local rule or partner can change the state of the business?",
    "blog.article.egypt-gulf-software-integrations.signal.0.label": "Reach",
    "blog.article.egypt-gulf-software-integrations.signal.0.value": "Egypt + Gulf",
    "blog.article.egypt-gulf-software-integrations.signal.1.label": "Control",
    "blog.article.egypt-gulf-software-integrations.signal.1.value": "Owned integrations",
    "blog.article.egypt-gulf-software-integrations.signal.2.label": "Output",
    "blog.article.egypt-gulf-software-integrations.signal.2.value": "Fewer surprises",
    "blog.article.egypt-gulf-software-integrations.section.local-reality.title":
      "Start with local reality",
    "blog.article.egypt-gulf-software-integrations.section.local-reality.text":
      "Regional software has to account for the way teams actually work: Arabic and English interfaces, local payment methods, cash on delivery, delivery partners, branch operations, tax documents, and different approval habits. These details change the workflow, not just the translation file.",
    "blog.article.egypt-gulf-software-integrations.section.integration-boundaries.title":
      "Give every integration a boundary",
    "blog.article.egypt-gulf-software-integrations.section.integration-boundaries.text":
      "Decide which system owns each state and what happens when a partner is late, unavailable, or returns an unexpected response. Stable contracts, retries, reconciliation, and an audit trail keep a local integration from becoming a hidden manual process.",
    "blog.article.egypt-gulf-software-integrations.section.regional-readiness.title":
      "Design for regional change",
    "blog.article.egypt-gulf-software-integrations.section.regional-readiness.text":
      "Keep currencies, taxes, languages, branches, permissions, and delivery rules configurable where they genuinely vary. Avoid hard-coding every country into the first release, but do not pretend that one generic workflow fits every market either.",
    "blog.article.egypt-gulf-software-integrations.section.international-without-generic.title":
      "Go international without becoming generic",
    "blog.article.egypt-gulf-software-integrations.section.international-without-generic.text":
      "A strong platform keeps a clear core model and lets local operations plug into it. That is how a system can support Egyptian and Gulf teams, then grow to international operations without losing the specific handoffs that made it useful in the first place.",
    "blog.article.before-another-dashboard.title": "What operators need before another dashboard",
    "blog.article.before-another-dashboard.deck":
      "A practical look at approvals, stock events, and finance rules that should be mapped before interface design starts.",
    "blog.article.before-another-dashboard.topic": "ERP",
    "blog.article.before-another-dashboard.readTime": "7 min read",
    "blog.article.before-another-dashboard.publishedAt": "June 2026",
    "blog.article.before-another-dashboard.audience": "COO, finance, product",
    "blog.article.before-another-dashboard.question":
      "Which handoffs should the system make impossible to miss?",
    "blog.article.before-another-dashboard.signal.0.label": "Handoffs",
    "blog.article.before-another-dashboard.signal.0.value": "Approvals",
    "blog.article.before-another-dashboard.signal.1.label": "Risk",
    "blog.article.before-another-dashboard.signal.1.value": "Exceptions",
    "blog.article.before-another-dashboard.signal.2.label": "Output",
    "blog.article.before-another-dashboard.signal.2.value": "Release map",
    "blog.article.inventory-exceptions-are-requirements.title":
      "Inventory exceptions are product requirements",
    "blog.article.inventory-exceptions-are-requirements.deck":
      "Variance, damaged stock, and partial receipts reveal the workflows generic inventory tools usually hide.",
    "blog.article.inventory-exceptions-are-requirements.topic": "Inventory",
    "blog.article.inventory-exceptions-are-requirements.readTime": "5 min read",
    "blog.article.inventory-exceptions-are-requirements.publishedAt": "June 2026",
    "blog.article.inventory-exceptions-are-requirements.audience":
      "Inventory, warehouse, finance",
    "blog.article.inventory-exceptions-are-requirements.question":
      "What should happen when the count, receipt, and invoice disagree?",
    "blog.article.inventory-exceptions-are-requirements.signal.0.label": "Trigger",
    "blog.article.inventory-exceptions-are-requirements.signal.0.value": "Mismatch",
    "blog.article.inventory-exceptions-are-requirements.signal.1.label": "Owner",
    "blog.article.inventory-exceptions-are-requirements.signal.1.value": "Ops lead",
    "blog.article.inventory-exceptions-are-requirements.signal.2.label": "Output",
    "blog.article.inventory-exceptions-are-requirements.signal.2.value": "Audit trail",
    "blog.article.finance-close-handoffs.title":
      "Designing finance closes around real handoffs",
    "blog.article.finance-close-handoffs.deck":
      "Month-end software works best when reconciliation, approvals, and audit trails are treated as one operating system.",
    "blog.article.finance-close-handoffs.topic": "Accounting",
    "blog.article.finance-close-handoffs.readTime": "6 min read",
    "blog.article.finance-close-handoffs.publishedAt": "May 2026",
    "blog.article.finance-close-handoffs.audience": "CFO, accounting, founders",
    "blog.article.finance-close-handoffs.question":
      "Which close tasks need evidence before the next team starts?",
    "blog.article.finance-close-handoffs.signal.0.label": "Trigger",
    "blog.article.finance-close-handoffs.signal.0.value": "Close task",
    "blog.article.finance-close-handoffs.signal.1.label": "Owner",
    "blog.article.finance-close-handoffs.signal.1.value": "Finance",
    "blog.article.finance-close-handoffs.signal.2.label": "Output",
    "blog.article.finance-close-handoffs.signal.2.value": "Evidence",
    "blog.article.warehouse-speed-order-model.title": "Warehouse speed starts in the order model",
    "blog.article.warehouse-speed-order-model.deck":
      "Pick paths, wave planning, and dispatch accuracy all depend on decisions made before the floor sees the order.",
    "blog.article.warehouse-speed-order-model.topic": "Warehouse",
    "blog.article.warehouse-speed-order-model.readTime": "4 min read",
    "blog.article.warehouse-speed-order-model.publishedAt": "May 2026",
    "blog.article.warehouse-speed-order-model.audience": "Warehouse, logistics, commerce",
    "blog.article.warehouse-speed-order-model.question":
      "What does the floor need to know before a pick list exists?",
    "blog.article.warehouse-speed-order-model.signal.0.label": "Trigger",
    "blog.article.warehouse-speed-order-model.signal.0.value": "Order state",
    "blog.article.warehouse-speed-order-model.signal.1.label": "Owner",
    "blog.article.warehouse-speed-order-model.signal.1.value": "Warehouse",
    "blog.article.warehouse-speed-order-model.signal.2.label": "Output",
    "blog.article.warehouse-speed-order-model.signal.2.value": "Wave plan",
    "blog.article.pos-data-is-operations-data.title": "POS data is operations data",
    "blog.article.pos-data-is-operations-data.deck":
      "Retail systems become useful when receipts, returns, stock, and settlement all update the same operating model.",
    "blog.article.pos-data-is-operations-data.topic": "POS",
    "blog.article.pos-data-is-operations-data.readTime": "5 min read",
    "blog.article.pos-data-is-operations-data.publishedAt": "April 2026",
    "blog.article.pos-data-is-operations-data.audience": "Retail, accounting, commerce",
    "blog.article.pos-data-is-operations-data.question":
      "Which store events should update stock and finance at the same time?",
    "blog.article.pos-data-is-operations-data.signal.0.label": "Trigger",
    "blog.article.pos-data-is-operations-data.signal.0.value": "Store event",
    "blog.article.pos-data-is-operations-data.signal.1.label": "Owner",
    "blog.article.pos-data-is-operations-data.signal.1.value": "Retail ops",
    "blog.article.pos-data-is-operations-data.signal.2.label": "Output",
    "blog.article.pos-data-is-operations-data.signal.2.value": "Shared ledger",
    "blog.article.automation-needs-operators.title": "Automation still needs an operator model",
    "blog.article.automation-needs-operators.deck":
      "Good automation knows who owns an exception, when to stop, and what evidence the business needs later.",
    "blog.article.automation-needs-operators.topic": "Automation",
    "blog.article.automation-needs-operators.readTime": "6 min read",
    "blog.article.automation-needs-operators.publishedAt": "April 2026",
    "blog.article.automation-needs-operators.audience": "Ops, product, technology",
    "blog.article.automation-needs-operators.question":
      "Where should automation pause instead of guessing?",
    "blog.article.automation-needs-operators.signal.0.label": "Trigger",
    "blog.article.automation-needs-operators.signal.0.value": "Rule break",
    "blog.article.automation-needs-operators.signal.1.label": "Owner",
    "blog.article.automation-needs-operators.signal.1.value": "Decision maker",
    "blog.article.automation-needs-operators.signal.2.label": "Output",
    "blog.article.automation-needs-operators.signal.2.value": "Controlled flow",
    "blog.cta.title": "Bring the workflow to the table.",
    "blog.cta.copy":
      "If an article sounds like your operating problem, send us the workflow and the systems around it.",
    "contact.hero.eyebrow": "Contact us",
    "contact.hero.title":
      "Bring us the workflow, system gap, or disconnected toolchain slowing the business down.",
    "contact.hero.copy":
      "Tell us what is breaking, what is growing, and what has to connect. We will map the first useful conversation around the real operating system your team needs.",
    "contact.method.email": "Email",
    "contact.method.phone": "Phone",
    "contact.method.region": "Region",
    "contact.method.emailValue": "info@traffodata.com",
    "contact.method.phoneValue": "Schedule by email",
    "contact.method.regionValue": "Dubai operations",
    "contact.form.website": "Website",
    "contact.form.name": "Name",
    "contact.form.email": "Work email",
    "contact.form.company": "Company",
    "contact.form.services": "What do you need help with?",
    "contact.form.servicesHelp": "Choose one or more. We will route the conversation.",
    "contact.form.message": "What should we understand first?",
    "contact.form.messageHelp":
      "Share the workflow, disconnected tools, deadline, systems involved, and what a useful first call should answer.",
    "contact.form.send": "Send inquiry",
    "contact.form.sending": "Sending inquiry",
    "contact.form.sent":
      "Inquiry sent. We will review the workflow and reply with the right next step.",
    "contact.form.manual": "Email sending is not configured yet.",
    "contact.form.error": "The message could not be sent.",
    "contact.form.emailInstead": "Send it by email instead.",
    "contact.mailto.subject": "TRAFFODATA inquiry",
    "contact.mailto.name": "Name",
    "contact.mailto.email": "Email",
    "contact.mailto.company": "Company",
    "contact.mailto.services": "Services",
    "contact.inquiry.title": "New TRAFFODATA inquiry",
    "contact.inquiry.name": "Name",
    "contact.inquiry.email": "Email",
    "contact.inquiry.company": "Company",
    "contact.inquiry.companyMissing": "Not provided",
    "contact.inquiry.services": "Services",
    "contact.inquiry.message": "Message",
    "contact.inquiry.subject": "TRAFFODATA inquiry",
    "contact.validation.name": "Add your name so we know who to reply to.",
    "contact.validation.email": "Use a valid work email address.",
    "contact.validation.services": "Choose at least one area.",
    "contact.validation.message": "Write at least 20 characters about the work.",
    "contact.service.erp": "ERP platform",
    "contact.service.inventory": "Inventory and warehouse",
    "contact.service.pos": "POS and commerce",
    "contact.service.accounting": "Accounting workflows",
    "contact.service.crm": "CRM and AI",
    "contact.service.custom": "Custom software",
    "contact.service.unsure": "Not sure yet",
    "contact.next.title": "What happens next.",
    "contact.next.one":
      "We review the operational context and reply with the right next step.",
    "contact.next.two":
      "If there is fit, we map systems, users, risks, and the first release boundary.",
    "contact.next.three":
      "You leave the first conversation with a clearer path, not a generic proposal.",
  },
  ar: {
    "brand.name": "TRAFFODATA",
    "brand.segment": "برمجيات",
    "brand.home": "العودة إلى الرئيسية",
    "nav.primary": "التنقل الرئيسي",
    "nav.work": "الأعمال",
    "nav.blog": "المدونة",
    "nav.contact": "تواصل",
    "nav.start": "ابدأ",
    "nav.startProject": "ابدأ مشروعك",
    "nav.openMenu": "فتح القائمة",
    "nav.closeMenu": "إغلاق القائمة",
    "language.label": "اللغة",
    "language.switchTo": "تغيير اللغة",
    "theme.label": "المظهر",
    "theme.light": "فاتح",
    "theme.dark": "داكن",
    "theme.system": "النظام",
    "theme.switchTo": "تغيير المظهر",
    "root.notFound.code": "404",
    "root.notFound.title": "الصفحة غير موجودة",
    "root.notFound.description": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    "root.error.title": "تعذر تحميل الصفحة",
    "root.error.description": "حدث خطأ من جانبنا.",
    "root.error.tryAgain": "حاول مرة أخرى",
    "root.goHome": "العودة للرئيسية",
    "seo.defaultTitle": "TRAFFODATA - برمجيات تشغيلية لمشغلين جادين",
    "seo.defaultDescription":
      "تبني TRAFFODATA وتدعم برمجيات تشغيلية مخصصة للشركات في مصر والخليج والأسواق الدولية التي تجاوزت الجداول والأدوات المنفصلة.",
    "seo.imageAlt.logo": "شعار حلول برمجيات TRAFFODATA",
    "seo.imageAlt.home": "معاينة برمجيات تشغيل المؤسسات من TRAFFODATA",
    "seo.organization.description":
      "تبني TRAFFODATA وتدعم برمجيات تشغيلية مخصصة للشركات في مصر والخليج والأسواق الدولية التي تجاوزت الجداول والأدوات المنفصلة.",
    "seo.navigation.name": "تنقل موقع TRAFFODATA",
    "seo.navigation.work": "دراسات الحالة",
    "seo.navigation.blog": "المدونة",
    "seo.navigation.contact": "التواصل",
    "seo.work.collectionName": "دراسات حالة TRAFFODATA",
    "seo.work.collectionDescription":
      "دراسات حالة لبرمجيات تشغيلية مخصصة عبر المخزون والمستودعات ونقاط البيع والمحاسبة وCRM والتجارة ولوحات البيانات والمنصات الخلفية وتطبيقات الموبايل والأدوات الداخلية.",
    "seo.work.title": "دراسات الحالة - برمجيات تشغيلية وأنظمة خلفية | TRAFFODATA",
    "seo.work.description":
      "استكشف دراسات حالة TRAFFODATA لشركات لديها تدفقات عمل حقيقية وفرق حقيقية وأموال حقيقية تتحرك عبر المنصات الخلفية ولوحات البيانات ومنتجات الموبايل ومحركات التجارة والأدوات الداخلية.",
    "seo.blog.title": "المدونة - برمجيات TRAFFODATA",
    "seo.blog.description":
      "إجابات عملية عن برامج الأعمال المخصصة وERP والمخزون وإدارة المستودعات والتجارة الإلكترونية وواجهات Laravel والتكاملات وجداول التسليم والدعم بعد الإطلاق في مصر والخليج والأسواق الدولية.",
    "seo.contact.title": "تواصل معنا - برمجيات TRAFFODATA",
    "seo.contact.description":
      "تحدث مع TRAFFODATA عن تدفق العمل أو فجوة النظام أو سلسلة الأدوات المنفصلة التي تبطئ شركتك.",
    "seo.project.title": "مشروع - برمجيات TRAFFODATA",
    "seo.project.description": "تفاصيل مشروع مختار من أعمال TRAFFODATA التشغيلية.",
    "seo.project.imageAltSuffix": "معاينة المشروع",
    "home.hero.eyebrow": "نظام تشغيل المؤسسات من TRAFFODATA",
    "home.hero.title": "برمجيات تشغيلية للشركات التي تجاوزت الأدوات المنفصلة.",
    "home.hero.titleLine1": "برمجيات تشغيلية",
    "home.hero.titleLine2": "لمشغلين جادين.",
    "home.hero.lead":
      "برمجيات تشغيلية للشركات التي تجاوزت الأدوات المنفصلة. نحوّل تدفقات العمل المعقدة عبر المخزون ونقاط البيع والتوصيل والمدفوعات والمالية وCRM والذكاء الاصطناعي إلى أنظمة متكاملة تدير عليها الفرق أعمالها.",
    "home.hero.primaryCta": "ابدأ مشروعك",
    "home.hero.secondaryCta": "شاهد الأعمال المختارة",
    "home.hero.note":
      "أنظمة مخصصة للشركات التي تجاوزت الجداول، وتطبيقات SaaS المنفصلة، والأدوات الداخلية الهشة.",
    "home.hero.continue": "الانتقال إلى قسم التعريف",
    "home.trust.label": "أنظمة مختارة\nأطلقناها للمشغلين",
    "home.trust.proof.commerce.title": "منصات تجارة خلفية",
    "home.trust.proof.commerce.text": "عمليات الموردين والدفع والمحافظ والتوصيل",
    "home.trust.proof.platforms.title": "منصات تشغيلية",
    "home.trust.proof.platforms.text": "تدفقات المخزون والمستودعات واللوجستيات والمالية",
    "home.trust.proof.ai.title": "منتجات ذكاء اصطناعي وموبايل",
    "home.trust.proof.ai.text": "تجارب فعاليات وحجوزات وتجزئة وفرق ميدانية",
    "home.about.eyebrow": "من نحن",
    "home.about.title1": "برمجيات",
    "home.about.title2": "مصممة من أجل",
    "home.about.title3": "المشغلين.",
    "home.about.copy1":
      "نحوّل العمليات التجارية المعقدة إلى أنظمة متكاملة جادة. ترسم TRAFFODATA نقاط التسليم والاستثناءات والصلاحيات وتدفقات البيانات خلف العمل، ثم تطلق الخلفيات ولوحات التحكم وتطبيقات الموبايل والأتمتة التي تجعل العمل أنظف.",
    "home.about.copy2":
      "أفضل توافق لنا مع شركات التجارة واللوجستيات والتجزئة والخدمات والنمو التي تحتاج برمجيات مخصصة مبنية حول طريقة عمل فرقها فعلا.",
    "home.services.eyebrow": "ما نبنيه",
    "home.services.title1": "ثمانية تخصصات.",
    "home.services.title2": "نظام تشغيل واحد.",
    "home.services.copy":
      "كل وحدة مصممة لتعمل وحدها وتتصل بسلاسة، لتتبنى ما تحتاجه فقط وفي الوقت المناسب.",
    "home.services.operational.title": "منصات تشغيلية",
    "home.services.operational.text":
      "عمود مخصص للمخزون والمالية والفرق والموافقات وبيانات المصدر الواحد.",
    "home.services.inventory.title": "إدارة المخزون",
    "home.services.inventory.text": "مخزون لحظي متعدد المواقع مع دفعات وأرقام تسلسلية بدقة SKU.",
    "home.services.warehouse.title": "إدارة المستودعات",
    "home.services.warehouse.text": "استلام وتجهيز وتخزين وتخطيط موجات لتلبية طلبات عالية السرعة.",
    "home.services.pos.title": "نقاط البيع",
    "home.services.pos.text": "نقاط بيع تعمل دون اتصال مع مزامنة مخزون متعددة القنوات.",
    "home.services.accounting.title": "أنظمة المحاسبة",
    "home.services.accounting.text": "دفاتر متعددة الكيانات ومحركات ضرائب وامتثال مدمج.",
    "home.services.crm.title": "CRM",
    "home.services.crm.text": "مبيعات وخدمة وذكاء حسابات متصل بالعمليات الحية.",
    "home.services.ai.title": "أتمتة بالذكاء الاصطناعي",
    "home.services.ai.text": "مساعدون تشغيليون وذكاء تدفقات عمل وأتمتة عبر أنظمة الأعمال.",
    "home.services.integration.title": "تكامل الأنظمة",
    "home.services.integration.text":
      "وحدات وتكاملات مخصصة للشركات التي تجاوزت الأدوات المنفصلة.",
    "home.platform.eyebrow": "أنظمة تشغيل TRAFFODATA",
    "home.platform.title1": "منصة واحدة.",
    "home.platform.title2": "كل تدفق عمل.",
    "home.platform.copy":
      "مصدر حقيقة واحد للمخزون والمالية والمبيعات والأفراد والعمليات، مصمم للشركات التي تجاوزت الجداول وتطبيقات SaaS المنفصلة والأدوات الداخلية الهشة.",
    "home.platform.connectedWorkflow": "تدفق عمل متصل",
    "home.platform.sharedRecord": "سجل مشترك واحد",
    "home.platform.currentFocus": "التركيز الحالي",
    "home.platform.tab.inventory": "المخزون",
    "home.platform.tab.accounting": "المحاسبة",
    "home.platform.tab.crm": "CRM",
    "home.platform.tab.ai": "الذكاء الاصطناعي",
    "home.platform.tab.warehouse": "المستودع",
    "home.platform.tab.pos": "نقاط البيع",
    "home.platform.tab.reports": "التقارير",
    "home.platform.handoff.0.label": "حدث المصدر",
    "home.platform.handoff.0.value": "تم التقاطه",
    "home.platform.handoff.1.label": "سجل مشترك",
    "home.platform.handoff.1.value": "تم التحقق منه وفق قواعد العمل",
    "home.platform.handoff.2.label": "إجراء المشغل",
    "home.platform.handoff.2.value": "تم إسناده إلى المالك",
    "home.platform.scene.inventory.title": "غرفة تحكم المخزون",
    "home.platform.scene.inventory.subtitle":
      "المخزون والمستودعات والموردون والاستثناءات في عرض تشغيلي واحد.",
    "home.platform.scene.inventory.operator": "مدير المخزون",
    "home.platform.scene.inventory.focus": "إعادة التوريد ومعالجة الاستثناءات",
    "home.platform.scene.inventory.queue.0.label": "قائمة إعادة الطلب",
    "home.platform.scene.inventory.queue.0.value": "مراجعة المورد",
    "home.platform.scene.inventory.queue.1.label": "صحة المواقع",
    "home.platform.scene.inventory.queue.1.value": "استلام اليوم",
    "home.platform.scene.inventory.queue.2.label": "مسار الاستثناءات",
    "home.platform.scene.inventory.queue.2.value": "مراقبة انخفاض المخزون",
    "home.platform.scene.inventory.lanes.0.label": "حركة المخزون",
    "home.platform.scene.inventory.lanes.0.items.0": "تم استلام أمر شراء",
    "home.platform.scene.inventory.lanes.0.items.1": "تم حجز تحويل",
    "home.platform.scene.inventory.lanes.0.items.2": "تم فحص مرتجع",
    "home.platform.scene.inventory.lanes.1.label": "القواعد",
    "home.platform.scene.inventory.lanes.1.items.0": "الحد الأدنى للكمية",
    "home.platform.scene.inventory.lanes.1.items.1": "عناصر متاحة دائما",
    "home.platform.scene.inventory.lanes.1.items.2": "أولوية المستودع",
    "home.platform.scene.inventory.lanes.2.label": "إجراءات المشغل",
    "home.platform.scene.inventory.lanes.2.items.0": "اعتماد التحويل",
    "home.platform.scene.inventory.lanes.2.items.1": "تحديث المورد",
    "home.platform.scene.inventory.lanes.2.items.2": "حل عدم التطابق",
    "home.platform.scene.inventory.footer.0": "تاريخ SKU",
    "home.platform.scene.inventory.footer.1": "مخزون المستودع",
    "home.platform.scene.inventory.footer.2": "استيراد جماعي",
    "home.platform.scene.inventory.footer.3": "شروط المورد",
    "home.platform.scene.accounting.title": "لوحة إقفال المالية",
    "home.platform.scene.accounting.subtitle":
      "الذمم والمدفوعات والضرائب والموافقات مرتبطة بالأحداث التشغيلية.",
    "home.platform.scene.accounting.operator": "قائد المالية",
    "home.platform.scene.accounting.focus": "إقفال شهري دون انحراف الجداول",
    "home.platform.scene.accounting.queue.0.label": "قائمة الإقفال",
    "home.platform.scene.accounting.queue.0.value": "مراجعة الكيان",
    "home.platform.scene.accounting.queue.1.label": "الذمم",
    "home.platform.scene.accounting.queue.1.value": "مراقبة الأعمار",
    "home.platform.scene.accounting.queue.2.label": "أثر التدقيق",
    "home.platform.scene.accounting.queue.2.value": "جاهز للتصدير",
    "home.platform.scene.accounting.lanes.0.label": "الإيراد",
    "home.platform.scene.accounting.lanes.0.items.0": "إيصالات نقاط البيع",
    "home.platform.scene.accounting.lanes.0.items.1": "مدفوعات أونلاين",
    "home.platform.scene.accounting.lanes.0.items.2": "تسويات المحفظة",
    "home.platform.scene.accounting.lanes.1.label": "الضوابط",
    "home.platform.scene.accounting.lanes.1.items.0": "مراجعة الضريبة",
    "home.platform.scene.accounting.lanes.1.items.1": "اعتماد الاسترداد",
    "home.platform.scene.accounting.lanes.1.items.2": "قفل الصرف",
    "home.platform.scene.accounting.lanes.2.label": "المخرجات",
    "home.platform.scene.accounting.lanes.2.items.0": "تصدير الدفتر",
    "home.platform.scene.accounting.lanes.2.items.1": "تقرير VAT",
    "home.platform.scene.accounting.lanes.2.items.2": "حزمة الإدارة",
    "home.platform.scene.accounting.footer.0": "حالات الفواتير",
    "home.platform.scene.accounting.footer.1": "قواعد الضرائب",
    "home.platform.scene.accounting.footer.2": "بوابات الدفع",
    "home.platform.scene.accounting.footer.3": "سجلات التصدير",
    "home.platform.scene.crm.title": "مكتب تسليم CRM",
    "home.platform.scene.crm.subtitle":
      "نشاط المبيعات وسياق الحساب ومتابعة التسليم دون فقدان الخيط.",
    "home.platform.scene.crm.operator": "مالك الحساب",
    "home.platform.scene.crm.focus": "من العميل المحتمل إلى التسليم التشغيلي",
    "home.platform.scene.crm.queue.0.label": "الإجراء التالي",
    "home.platform.scene.crm.queue.0.value": "متابعة العرض",
    "home.platform.scene.crm.queue.1.label": "مرحلة الحساب",
    "home.platform.scene.crm.queue.1.value": "مراجعة العمليات",
    "home.platform.scene.crm.queue.2.label": "ملاحظات التسليم",
    "home.platform.scene.crm.queue.2.value": "جاهز للتسليم",
    "home.platform.scene.crm.lanes.0.label": "خط المبيعات",
    "home.platform.scene.crm.lanes.0.items.0": "عميل مؤهل",
    "home.platform.scene.crm.lanes.0.items.1": "تمت مشاركة العرض",
    "home.platform.scene.crm.lanes.0.items.2": "مراجعة المشتريات",
    "home.platform.scene.crm.lanes.1.label": "السياق",
    "home.platform.scene.crm.lanes.1.items.0": "المواقع",
    "home.platform.scene.crm.lanes.1.items.1": "المستخدمون",
    "home.platform.scene.crm.lanes.1.items.2": "أنظمة متصلة",
    "home.platform.scene.crm.lanes.2.label": "المتابعة",
    "home.platform.scene.crm.lanes.2.items.0": "جدولة مكالمة",
    "home.platform.scene.crm.lanes.2.items.1": "تعيين مالك",
    "home.platform.scene.crm.lanes.2.items.2": "إنشاء موجز مشروع",
    "home.platform.scene.crm.footer.0": "جهات الاتصال",
    "home.platform.scene.crm.footer.1": "المهام",
    "home.platform.scene.crm.footer.2": "ملف الشركة",
    "home.platform.scene.crm.footer.3": "تاريخ الصفقة",
    "home.platform.scene.ai.title": "قائمة مراجعة الأتمتة",
    "home.platform.scene.ai.subtitle":
      "يساعد الذكاء الاصطناعي في العمل المتكرر بينما يحتفظ المشغلون بالتحكم في القرارات.",
    "home.platform.scene.ai.operator": "محلل عمليات",
    "home.platform.scene.ai.focus": "إجراءات مقترحة بموافقة بشرية",
    "home.platform.scene.ai.queue.0.label": "إصلاحات مقترحة",
    "home.platform.scene.ai.queue.0.value": "بانتظار الموافقة",
    "home.platform.scene.ai.queue.1.label": "حالة الوصفة",
    "home.platform.scene.ai.queue.1.value": "تعمل بأمان",
    "home.platform.scene.ai.queue.2.label": "الضوابط",
    "home.platform.scene.ai.queue.2.value": "مراجعة بشرية مفعلة",
    "home.platform.scene.ai.lanes.0.label": "المدخلات",
    "home.platform.scene.ai.lanes.0.items.0": "تنبيه انخفاض المخزون",
    "home.platform.scene.ai.lanes.0.items.1": "دفعة متأخرة",
    "home.platform.scene.ai.lanes.0.items.2": "عميل مكرر",
    "home.platform.scene.ai.lanes.1.label": "المساعد",
    "home.platform.scene.ai.lanes.1.items.0": "صياغة إجراء",
    "home.platform.scene.ai.lanes.1.items.1": "شرح السبب",
    "home.platform.scene.ai.lanes.1.items.2": "فحص السياسة",
    "home.platform.scene.ai.lanes.2.label": "المشغل",
    "home.platform.scene.ai.lanes.2.items.0": "اعتماد",
    "home.platform.scene.ai.lanes.2.items.1": "تعديل",
    "home.platform.scene.ai.lanes.2.items.2": "تجاهل",
    "home.platform.scene.ai.footer.0": "القواعد",
    "home.platform.scene.ai.footer.1": "الموافقات",
    "home.platform.scene.ai.footer.2": "سجل التدقيق",
    "home.platform.scene.ai.footer.3": "تاريخ الأوامر",
    "home.platform.scene.warehouse.title": "لوحة تنفيذ المستودع",
    "home.platform.scene.warehouse.subtitle":
      "الاستلام والالتقاط والتغليف والشحن والمرتجعات منسقة من قائمة واحدة.",
    "home.platform.scene.warehouse.operator": "مشرف المستودع",
    "home.platform.scene.warehouse.focus": "تخطيط الموجات ووضوح الأرصفة",
    "home.platform.scene.warehouse.queue.0.label": "خطة الموجة",
    "home.platform.scene.warehouse.queue.0.value": "الالتقاط الآن",
    "home.platform.scene.warehouse.queue.1.label": "حالة الرصيف",
    "home.platform.scene.warehouse.queue.1.value": "مراجعة الوارد",
    "home.platform.scene.warehouse.queue.2.label": "المرتجعات",
    "home.platform.scene.warehouse.queue.2.value": "مسار الفحص",
    "home.platform.scene.warehouse.lanes.0.label": "الوارد",
    "home.platform.scene.warehouse.lanes.0.items.0": "تم استلام ASN",
    "home.platform.scene.warehouse.lanes.0.items.1": "تم فحص الجودة",
    "home.platform.scene.warehouse.lanes.0.items.2": "تم تعيين التخزين",
    "home.platform.scene.warehouse.lanes.1.label": "الصادر",
    "home.platform.scene.warehouse.lanes.1.items.0": "موجة التقاط",
    "home.platform.scene.warehouse.lanes.1.items.1": "محطة التغليف",
    "home.platform.scene.warehouse.lanes.1.items.2": "تسليم الناقل",
    "home.platform.scene.warehouse.lanes.2.label": "الاستثناءات",
    "home.platform.scene.warehouse.lanes.2.items.0": "نقص في الالتقاط",
    "home.platform.scene.warehouse.lanes.2.items.1": "عنصر تالف",
    "home.platform.scene.warehouse.lanes.2.items.2": "تعليق العنوان",
    "home.platform.scene.warehouse.footer.0": "المواقع",
    "home.platform.scene.warehouse.footer.1": "قوائم الالتقاط",
    "home.platform.scene.warehouse.footer.2": "إيصالات التغليف",
    "home.platform.scene.warehouse.footer.3": "ملصقات الناقل",
    "home.platform.scene.pos.title": "قمرة عداد التجزئة",
    "home.platform.scene.pos.subtitle":
      "مبيعات العداد والمزامنة دون اتصال والاسترداد والولاء والمخزون متصلة عند الدفع.",
    "home.platform.scene.pos.operator": "مشغل المتجر",
    "home.platform.scene.pos.focus": "عمل عداد سريع مع بيانات خلفية نظيفة",
    "home.platform.scene.pos.queue.0.label": "حالة العداد",
    "home.platform.scene.pos.queue.0.value": "بيع الآن",
    "home.platform.scene.pos.queue.1.label": "مزامنة دون اتصال",
    "home.platform.scene.pos.queue.1.value": "قائمة محمية",
    "home.platform.scene.pos.queue.2.label": "المرتجعات",
    "home.platform.scene.pos.queue.2.value": "مراجعة المدير",
    "home.platform.scene.pos.lanes.0.label": "البيع",
    "home.platform.scene.pos.lanes.0.items.0": "مسح العنصر",
    "home.platform.scene.pos.lanes.0.items.1": "تطبيق العرض",
    "home.platform.scene.pos.lanes.0.items.2": "استلام الدفع",
    "home.platform.scene.pos.lanes.1.label": "العميل",
    "home.platform.scene.pos.lanes.1.items.0": "بحث الولاء",
    "home.platform.scene.pos.lanes.1.items.1": "رصيد المحفظة",
    "home.platform.scene.pos.lanes.1.items.2": "إرسال الإيصال",
    "home.platform.scene.pos.lanes.2.label": "المكتب الخلفي",
    "home.platform.scene.pos.lanes.2.items.0": "خصم المخزون",
    "home.platform.scene.pos.lanes.2.items.1": "سجل الضريبة",
    "home.platform.scene.pos.lanes.2.items.2": "إقفال الوردية",
    "home.platform.scene.pos.footer.0": "درج النقد",
    "home.platform.scene.pos.footer.1": "القسائم",
    "home.platform.scene.pos.footer.2": "الإيصالات",
    "home.platform.scene.pos.footer.3": "تقارير الوردية",
    "home.platform.scene.reports.title": "سطح قيادة التقارير",
    "home.platform.scene.reports.subtitle":
      "لوحات بيانات مبنية من أنظمة المصدر مع ظهور حداثة البيانات والملكية.",
    "home.platform.scene.reports.operator": "فريق القيادة",
    "home.platform.scene.reports.focus": "عروض قرار دون تنقيب عن البيانات",
    "home.platform.scene.reports.queue.0.label": "صحة المصادر",
    "home.platform.scene.reports.queue.0.value": "تغذيات متصلة",
    "home.platform.scene.reports.queue.1.label": "حزمة المجلس",
    "home.platform.scene.reports.queue.1.value": "مراجعة المالك",
    "home.platform.scene.reports.queue.2.label": "التصديرات",
    "home.platform.scene.reports.queue.2.value": "مجدولة",
    "home.platform.scene.reports.lanes.0.label": "المدخلات",
    "home.platform.scene.reports.lanes.0.items.0": "المخزون",
    "home.platform.scene.reports.lanes.0.items.1": "المالية",
    "home.platform.scene.reports.lanes.0.items.2": "المبيعات",
    "home.platform.scene.reports.lanes.1.label": "العروض",
    "home.platform.scene.reports.lanes.1.items.0": "ملخص تنفيذي",
    "home.platform.scene.reports.lanes.1.items.1": "تفاصيل العمليات",
    "home.platform.scene.reports.lanes.1.items.2": "قائمة الاستثناءات",
    "home.platform.scene.reports.lanes.2.label": "التوزيع",
    "home.platform.scene.reports.lanes.2.items.0": "حزمة PDF",
    "home.platform.scene.reports.lanes.2.items.1": "تصدير CSV",
    "home.platform.scene.reports.lanes.2.items.2": "جدولة البريد",
    "home.platform.scene.reports.footer.0": "لوحات البيانات",
    "home.platform.scene.reports.footer.1": "المصادر",
    "home.platform.scene.reports.footer.2": "الصلاحيات",
    "home.platform.scene.reports.footer.3": "اللقطات",
    "home.why.eyebrow": "لماذا TRAFFODATA ERP",
    "home.why.title1": "العائد المركب",
    "home.why.title2": "للوضوح.",
    "home.why.efficiency": "كفاءة تشغيلية",
    "home.why.inventory": "تحكم أسرع بالمخزون",
    "home.why.manual": "عمل يدوي أقل",
    "home.why.productivity": "إنتاجية أعلى للفريق",
    "home.comparison.title": "TRAFFODATA مقابل مزودي الخدمات التقليديين",
    "home.comparison.goods": "برمجيات TRAFFODATA",
    "home.comparison.traditional": "مزودو الخدمات التقليديون",
    "home.comparison.traditionalMobile": "المزودون التقليديون",
    "home.comparison.paidDiscovery": "مكالمة اكتشاف مدفوعة",
    "home.comparison.row.0.label": "النهج",
    "home.comparison.row.0.goods": "رسم تدفق العمل قبل الشاشات",
    "home.comparison.row.0.traditional": "تحديد تطبيق عام",
    "home.comparison.row.1.label": "العملية",
    "home.comparison.row.1.goods": "إظهار الأنظمة والأدوار والاستثناءات",
    "home.comparison.row.1.traditional": "متطلبات مخفية داخل الاجتماعات",
    "home.comparison.row.2.label": "فلسفة التصميم",
    "home.comparison.row.2.goods": "واجهات مصقولة مدعومة بمنطق حقيقي",
    "home.comparison.row.2.traditional": "شاشات جميلة بعمليات هشة",
    "home.comparison.row.3.label": "بنية التطوير",
    "home.comparison.row.3.goods": "خلفيات وواجهات API ولوحات وموبايل معا",
    "home.comparison.row.3.traditional": "قطع منفصلة لا تتصل",
    "home.comparison.row.4.label": "التواصل",
    "home.comparison.row.4.goods": "تحديثات واضحة",
    "home.comparison.row.4.traditional": "وسطاء متعددون",
    "home.comparison.row.5.label": "المخرجات",
    "home.comparison.row.5.goods": "أنظمة تشغيلية جاهزة للإنتاج",
    "home.comparison.row.5.traditional": "نماذج ثابتة",
    "home.comparison.row.6.label": "الدعم",
    "home.comparison.row.6.goods": "عقلية شراكة طويلة المدى",
    "home.comparison.row.6.traditional": "مشاريع لمرة واحدة",
    "home.comparison.row.7.label": "أول محادثة",
    "home.comparison.row.7.goods": "نبدأ بمكالمة ملاءمة للمشروع",
    "home.comparison.row.7.traditional": "اكتشاف مدفوع قبل الوضوح",
    "home.projects.eyebrow": "أعمال مختارة",
    "home.projects.title": "مشاريع مميزة.",
    "home.projects.viewAll": "عرض كل دراسات الحالة",
    "home.projects.liveWorkflow": "تدفق عمل حي",
    "home.projects.item.wikifood-commerce-delivery-backend.t":
      "خلفية تجارة متعددة الموردين لـ WikiFood",
    "home.projects.item.wikifood-commerce-delivery-backend.c": "WikiFood",
    "home.projects.item.wikifood-commerce-delivery-backend.tag": "منتج موبايل",
    "home.projects.item.wikifood-commerce-delivery-backend.headline":
      "محرك طلبات متعدد الموردين",
    "home.projects.item.wikifood-commerce-delivery-backend.modules.0": "نقاط بيع الموردين",
    "home.projects.item.wikifood-commerce-delivery-backend.modules.1": "تطبيق العميل",
    "home.projects.item.wikifood-commerce-delivery-backend.modules.2": "تطبيق التوصيل",
    "home.projects.item.wikifood-commerce-delivery-backend.states.0":
      "طلبات مقسمة حسب المتجر",
    "home.projects.item.wikifood-commerce-delivery-backend.states.1": "محافظ وصرف",
    "home.projects.item.wikifood-commerce-delivery-backend.states.2":
      "دفع آمن على المخزون",
    "home.projects.item.wikifood-commerce-delivery-backend.action": "منصة Laravel API",
    "home.projects.item.printout-laravel-rest-api.t": "خلفية Printout",
    "home.projects.item.printout-laravel-rest-api.c": "Printout",
    "home.projects.item.printout-laravel-rest-api.tag": "منصة خلفية",
    "home.projects.item.printout-laravel-rest-api.headline": "واجهة API لتدفق الطباعة",
    "home.projects.item.printout-laravel-rest-api.modules.0": "نقاط REST",
    "home.projects.item.printout-laravel-rest-api.modules.1": "أدوار الإدارة",
    "home.projects.item.printout-laravel-rest-api.modules.2": "حالات الطلب",
    "home.projects.item.printout-laravel-rest-api.states.0": "تم استلام عرض السعر",
    "home.projects.item.printout-laravel-rest-api.states.1": "تم إرفاق الملفات",
    "home.projects.item.printout-laravel-rest-api.states.2": "أدرج في الإنتاج",
    "home.projects.item.printout-laravel-rest-api.action": "خلفية تشغيلية",
    "home.projects.item.taggz-ai-event-photography-platform.t":
      "منصة تصوير فعاليات بالذكاء الاصطناعي لـ Taggz",
    "home.projects.item.taggz-ai-event-photography-platform.c": "Taggz",
    "home.projects.item.taggz-ai-event-photography-platform.tag": "منصة ذكاء اصطناعي",
    "home.projects.item.taggz-ai-event-photography-platform.headline":
      "مطابقة صور الفعاليات",
    "home.projects.item.taggz-ai-event-photography-platform.modules.0": "قائمة الرفع",
    "home.projects.item.taggz-ai-event-photography-platform.modules.1": "مطابقة الوجه",
    "home.projects.item.taggz-ai-event-photography-platform.modules.2": "تسليم المعرض",
    "home.projects.item.taggz-ai-event-photography-platform.states.0": "تم استيراد الفعالية",
    "home.projects.item.taggz-ai-event-photography-platform.states.1": "تمت فهرسة الضيوف",
    "home.projects.item.taggz-ai-event-photography-platform.states.2": "الألبومات جاهزة",
    "home.projects.item.taggz-ai-event-photography-platform.action": "تدفق تسليم بالذكاء الاصطناعي",
    "home.projects.item.jawad-horse-riding-booking-platform.t":
      "منصة حجز ركوب الخيل JAWAD",
    "home.projects.item.jawad-horse-riding-booking-platform.c": "JAWAD",
    "home.projects.item.jawad-horse-riding-booking-platform.tag": "منتج موبايل",
    "home.projects.item.jawad-horse-riding-booking-platform.headline": "نظام حجز الإسطبل",
    "home.projects.item.jawad-horse-riding-booking-platform.modules.0": "تطبيق الراكب",
    "home.projects.item.jawad-horse-riding-booking-platform.modules.1": "مواعيد المدرب",
    "home.projects.item.jawad-horse-riding-booking-platform.modules.2": "المدفوعات",
    "home.projects.item.jawad-horse-riding-booking-platform.states.0": "اختيار الحصان",
    "home.projects.item.jawad-horse-riding-booking-platform.states.1": "حجز الدرس",
    "home.projects.item.jawad-horse-riding-booking-platform.states.2": "تأكيد الوصول",
    "home.projects.item.jawad-horse-riding-booking-platform.action": "تدفق حجز موبايل",
    "home.projects.item.elnasser-backend-dashboard.t": "خلفية ومحرك لوجستيات النصر",
    "home.projects.item.elnasser-backend-dashboard.c": "النصر",
    "home.projects.item.elnasser-backend-dashboard.tag": "نظام لوجستي",
    "home.projects.item.elnasser-backend-dashboard.headline": "مكتب تحكم التلبية",
    "home.projects.item.elnasser-backend-dashboard.modules.0": "المستودع",
    "home.projects.item.elnasser-backend-dashboard.modules.1": "المسارات",
    "home.projects.item.elnasser-backend-dashboard.modules.2": "المرتجعات",
    "home.projects.item.elnasser-backend-dashboard.states.0": "تم حجز المخزون",
    "home.projects.item.elnasser-backend-dashboard.states.1": "تم تعيين السائق",
    "home.projects.item.elnasser-backend-dashboard.states.2": "تم تتبع التوصيل",
    "home.projects.item.elnasser-backend-dashboard.action": "عمليات لوجستية",
    "home.projects.item.alnasser-ecommerce.t": "صفحة إطلاق تجارة إلكترونية للنصر",
    "home.projects.item.alnasser-ecommerce.c": "النصر",
    "home.projects.item.alnasser-ecommerce.tag": "نظام تجارة",
    "home.projects.item.alnasser-ecommerce.headline": "واجهة إطلاق التجارة",
    "home.projects.item.alnasser-ecommerce.modules.0": "بطل الكتالوج",
    "home.projects.item.alnasser-ecommerce.modules.1": "كتل الحملات",
    "home.projects.item.alnasser-ecommerce.modules.2": "دعوة الدفع",
    "home.projects.item.alnasser-ecommerce.states.0": "تصفح العرض",
    "home.projects.item.alnasser-ecommerce.states.1": "مقارنة المنتجات",
    "home.projects.item.alnasser-ecommerce.states.2": "بدء الطلب",
    "home.projects.item.alnasser-ecommerce.action": "مسار تحويل الواجهة",
    "home.tech.eyebrow": "البنية التقنية",
    "home.tech.title1": "مبني على أساس",
    "home.tech.title2": "نثق به لعقد.",
    "home.process.eyebrow": "كيف نعمل",
    "home.process.title1": "عملية واضحة، لا",
    "home.process.title2": "عرضا تسويقيا.",
    "home.process.discovery.title": "الاكتشاف",
    "home.process.discovery.text":
      "ندخل مع فريقك لرسم العمليات والقيود والمشكلات غير المحلولة التي تستحق الحل.",
    "home.process.strategy.title": "الاستراتيجية",
    "home.process.strategy.text":
      "نحدد الوحدات ونموذج البيانات ومسار الإطلاق بتسلسل يحقق مكاسب سريعة وقابلة للقياس.",
    "home.process.design.title": "التصميم",
    "home.process.design.text":
      "واجهات مصممة حول طريقة عمل فريقك فعلا: هادئة وسريعة وسهلة التعلم.",
    "home.process.development.title": "التطوير",
    "home.process.development.text":
      "هندسة بدورات مرنة مع عروض أسبوعية وشفافية كاملة حول الجودة والتقدم.",
    "home.process.deployment.title": "الإطلاق",
    "home.process.deployment.text":
      "نقل بيانات وتدريب وشراكة طويلة المدى. نبقى معك بينما يتطور العمل.",
    "home.testimonials.eyebrow": "المشغلون يتحدثون",
    "home.testimonials.label": "آراء العملاء",
    "home.testimonials.show": "عرض الرأي",
    "home.testimonials.quote.0.q":
      "استبدلت TRAFFODATA بهدوء أربعة أنظمة قديمة. انتقل إقفالنا المالي من اثني عشر يوما إلى ثلاثة.",
    "home.testimonials.quote.0.a": "ليلى عثمان",
    "home.testimonials.quote.0.r": "المديرة المالية، Aurora Industries",
    "home.testimonials.quote.1.q":
      "إنه أكثر منتج مؤسسي مدروس استخدمته. كل شاشة تبدو مصممة للشخص الذي ينجز العمل فعلا.",
    "home.testimonials.quote.1.a": "ماركوس رايلي",
    "home.testimonials.quote.1.r": "مدير العمليات، Halcyon Logistics",
    "home.testimonials.quote.2.q":
      "أطلقناه عبر 38 متجرا خلال ربع سنة. تبناه الفريق دون جلسة تدريب واحدة.",
    "home.testimonials.quote.2.a": "ناديا بارك",
    "home.testimonials.quote.2.r": "رئيسة التجزئة، Vertex",
    "home.cta.eyebrow": "ابدأ المحادثة",
    "home.cta.title1": "جاهز لتحويل",
    "home.cta.title2": "عملك؟",
    "home.cta.copy":
      "مكالمة 30 دقيقة مع فريقنا. سنريك المنصة بعد ربطها بعملياتك.",
    "home.cta.emailPrefix": "أو راسل",
    "home.cta.badge.domain": "نطاق بريد موثق",
    "home.cta.badge.scope": "ERP، نقاط بيع، مخزون، مستودعات",
    "home.cta.badge.review": "مراجعة تقنية سريعة",
    "home.cta.badge.next": "خطوة تالية واضحة",
    "home.footer.pages": "الصفحات",
    "home.footer.products": "المنتجات",
    "home.footer.company": "الشركة",
    "home.footer.start": "ابدأ",
    "home.footer.productsLink": "المنتجات",
    "home.footer.erp": "أنظمة ERP",
    "home.footer.inventory": "المخزون",
    "home.footer.warehouse": "المستودعات",
    "home.footer.pos": "نقاط البيع",
    "home.footer.accounting": "المحاسبة",
    "home.footer.selectedWork": "أعمال مختارة",
    "home.footer.howWeWork": "كيف نعمل",
    "home.footer.email": "راسل info@traffodata.com",
    "home.footer.description":
      "برمجيات ERP ومخزون ومستودعات ونقاط بيع ومحاسبة وCRM وذكاء اصطناعي للمشغلين الذين يبنون أعمالا جادة.",
    "home.footer.legalName": "TRAFFODATA Technologies.",
    "home.footer.rights": "جميع الحقوق محفوظة.",
    "home.footer.backToTop": "العودة للأعلى",
    "work.filters.label": "مرشحات الأعمال",
    "work.filter.all": "الكل",
    "work.filter.operations": "العمليات",
    "work.filter.commerce": "التجارة",
    "work.filter.dashboards": "لوحات البيانات",
    "work.filter.mobile": "موبايل",
    "work.filter.web": "ويب",
    "work.hero.eyebrow": "أنظمة مختارة",
    "work.hero.title": "إثبات لمشغلين جادين.",
    "work.hero.copy":
      "إثبات من شركات لديها تدفقات عمل حقيقية وفرق حقيقية وأموال حقيقية تتحرك عبر النظام. استكشف المنصات الخلفية ولوحات البيانات ومنتجات الموبايل ومحركات التجارة وأنظمة المخزون والأدوات الداخلية المبنية حول ضغط التشغيل.",
    "work.hero.backdrop": "المشاريع",
    "work.project.view": "عرض المشروع",
    "work.empty": "لا توجد دراسات حالة تطابق هذا المرشح بعد. اعرض كل الأعمال لتصفح الأرشيف.",
    "work.cta.eyebrow": "لديك تدفق عمل مشابه؟",
    "work.cta.title": "أحضر لنا مشكلة التشغيل وسنرسم النظام المختبئ داخلها.",
    "work.process.title": "مبني حول ضغط التشغيل.",
    "work.process.copy":
      "يبدأ العمل حيث تتحرك الشركة فعلا: الكاونترات، الأرصفة، الرفع، المدفوعات، الموافقات، الاستثناءات، ونهاية الشهر.",
    "work.process.map.title": "ارسم أرضية العمل",
    "work.process.map.text":
      "نبدأ من نقاط التسليم والطوابير والاستثناءات ومسارات الموافقة التي يعيشها المشغلون فعلا.",
    "work.process.prototype.title": "اختبر الضغط",
    "work.process.prototype.text":
      "تستخدم المراجعات الأسبوعية طلبات وحالات مخزون وقواعد مالية واقعية بدلا من بيانات عرض مصقولة.",
    "work.process.rollout.title": "رتب الإطلاق",
    "work.process.rollout.text":
      "تقطع خطط الإطلاق حول المخاطر ونوافذ التدريب ورفع تشغيلي قابل للقياس.",
    "work.visual.retail": "التجزئة",
    "work.visual.live": "مباشر",
    "work.visual.wavePlan": "خطة الموجة",
    "work.visual.depot": "المستودع",
    "work.visual.picksHour": "عمليات اختيار / ساعة",
    "work.visual.closeBoard": "لوحة الإغلاق",
    "work.visual.days": "أيام",
    "work.visual.entitiesReconciled": "كيانات تمت مطابقتها",
    "work.visual.routeDesk": "مكتب المسارات",
    "work.visual.skuReservations": "حجوزات SKU",
    "work.visual.preview": "معاينة",
    "project.backToWork": "العودة إلى الأعمال",
    "project.work": "الأعمال",
    "project.notFound.title": "المشروع غير موجود.",
    "project.notFound.copy": "دراسة الحالة هذه غير متاحة. فهرس الأعمال يحتوي قائمة المشاريع الحالية.",
    "project.open": "فتح المشروع",
    "project.stat.system": "النظام",
    "project.stat.timeline": "الجدول الزمني",
    "project.stat.launch": "الإطلاق",
    "project.stat.year": "السنة",
    "project.deliveryScope": "نطاق التسليم",
    "project.stack.title": "البنية والقدرات.",
    "project.stack.copy": "تبقى البصمة التقنية واضحة دون تحويل دراسة الحالة إلى قائمة جافة.",
    "project.capabilities": "قدرات",
    "project.notes.title": "ملاحظات البناء والإثبات.",
    "project.related.title": "أنظمة أخرى تحت الضغط.",
    "project.allWork": "كل الأعمال",
    "project.media.banner": "لافتة المشروع",
    "project.media.generated": "لافتة نظام مولدة",
    "project.media.image": "صورة المشروع",
    "project.media.liveModel": "نموذج حي",
    "project.media.signal": "إشارة",
    "project.media.alt": "وسائط المشروع",
    "work.item.wikifood-commerce-delivery-backend.type": "منتج موبايل",
    "work.item.wikifood-commerce-delivery-backend.summary":
      "منصة Laravel 10 خلفية وواجهات API كاملة لتطبيق تجارة متعدد البائعين على الويب وثلاثة تطبيقات موبايل للبائعين والعملاء وعمليات التوصيل.",
    "work.item.wikifood-commerce-delivery-backend.scope": "Laravel 10 وPHP 8.2",
    "work.item.wikifood-commerce-delivery-backend.outcome": "مشروع مباشر",
    "work.item.wikifood-commerce-delivery-backend.year": "أعمال مختارة",
    "work.item.wikifood-commerce-delivery-backend.duration": "مباشر",
    "work.item.wikifood-commerce-delivery-backend.team": "المنتج والهندسة والتوصيل",
    "work.item.wikifood-commerce-delivery-backend.description":
      "منصة Laravel 10 خلفية وواجهات API كاملة لتطبيق تجارة متعدد البائعين على الويب وثلاثة تطبيقات موبايل للبائعين والعملاء وعمليات التوصيل.",
    "work.item.wikifood-commerce-delivery-backend.headline":
      "منصة WikiFood الخلفية للتجارة متعددة البائعين",
    "work.item.wikifood-commerce-delivery-backend.detailIntro":
      "منصة Laravel 10 خلفية وواجهات API كاملة لتطبيق تجارة متعدد البائعين على الويب وثلاثة تطبيقات موبايل للبائعين والعملاء وعمليات التوصيل.",
    "work.item.wikifood-commerce-delivery-backend.challenge":
      "بنيت وصنت وحدات للطلبات والطلبات الفرعية وتدفقات نقاط البيع والمنتجات والبائعين والعملاء ومندوبي التوصيل والمستودعات والمخزون والقسائم والحملات واللافتات والإعلانات والاشتراكات والمحافظ والصرف والتقارير والضرائب وضريبة القيمة المضافة. تدعم طبقة API المصادقة والسلة والدفع وتتبع الطلبات والمحافظ ونقاط الولاء والإشعارات والدردشة والمراجعات وتتبع الموقع وتحديثات حالة التوصيل عبر الويب والموبايل.",
    "work.item.wikifood-commerce-delivery-backend.build":
      "نفذت تدفقات نقاط بيع للإدارة والبائعين مع خصومات نسبية على مستوى الصنف، والتحقق من سعر الشراء، وإعادة حساب الضرائب، وتعديل الطلبات، ووضع الطلبات بأمان على المخزون. حسنت إدارة الطلبات بتتبع الطلب الرئيسي والفرعي، وواجهات إلغاء، واسترجاع المخزون، وفلاتر مباشرة، وترقيم صفحات، وحفظ موضع التمرير، وتحديث تجزئة الإيصال، وإجماليات دقيقة للطلب الرئيسي.",
    "work.item.wikifood-commerce-delivery-backend.impact":
      "أضفت أنظمة ترويج للمتاجر والفئات وإعلانات الأصناف وبيانات إعادة التوجيه والحملات والبيع الخاطف والكاش باك والقسائم واللافتات ودعم العلامات العامة. حسنت إدارة الكتالوج عبر إجراءات جماعية ومعارض منتجات وتصفية علامات ومخزون مستودعات ومنطق توفر دائم وتنوعات وإضافات وموردين ووحدات وسمات وتدفقات اعتماد المنتجات. كما بنيت سجلات نشاط وصلاحيات أدوار ووحدات وتحكم وصول وتصديرات ومعاملات محافظ وطرق سحب وأرباح مندوبي توصيل وتقارير ضريبية.",
    "work.item.wikifood-commerce-delivery-backend.detailSections.0.title": "نظرة عامة على المشروع",
    "work.item.wikifood-commerce-delivery-backend.detailSections.0.text":
      "WikiFood منصة تجارة وإدارة توصيل متعددة البائعين على نطاق واسع، مبنية لعمليات الطعام والبقالة والصيدليات والتجارة والطرود. طورت وخصصت خلفية Laravel التي تشغل تطبيق الويب التجاري وثلاثة تطبيقات موبايل متصلة: تطبيق البائع، وتطبيق العميل للتجارة، وتطبيق التوصيل.",
    "work.item.wikifood-commerce-delivery-backend.detailSections.1.title": "نطاق الخلفية وواجهات API",
    "work.item.wikifood-commerce-delivery-backend.detailSections.1.text":
      "بنيت وصنت وحدات للطلبات والطلبات الفرعية وتدفقات نقاط البيع والمنتجات والبائعين والعملاء ومندوبي التوصيل والمستودعات والمخزون والقسائم والحملات واللافتات والإعلانات والاشتراكات والمحافظ والصرف والتقارير والضرائب وضريبة القيمة المضافة. تدعم طبقة API المصادقة والسلة والدفع وتتبع الطلبات والمحافظ ونقاط الولاء والإشعارات والدردشة والمراجعات وتتبع الموقع وتحديثات حالة التوصيل عبر المنظومة.",
    "work.item.wikifood-commerce-delivery-backend.detailSections.2.title": "عمليات التجارة",
    "work.item.wikifood-commerce-delivery-backend.detailSections.2.text":
      "نفذت تدفقات نقاط بيع للإدارة والبائعين مع خصومات نسبية على مستوى الصنف، والتحقق من سعر الشراء، وإعادة حساب الضرائب، وتعديل الطلبات، ووضع الطلبات بأمان على المخزون. حسنت إدارة الطلبات بتتبع الطلب الرئيسي والفرعي، وواجهات إلغاء، واسترجاع المخزون، وفلاتر مباشرة، وترقيم صفحات، وحفظ موضع التمرير، وتحديث تجزئة الإيصال، وإجماليات دقيقة للطلب الرئيسي.",
    "work.item.wikifood-commerce-delivery-backend.detailSections.3.title": "الاستيراد والمدفوعات والعروض",
    "work.item.wikifood-commerce-delivery-backend.detailSections.3.text":
      "بنيت أدوات استيراد متقدمة من Excel وFodex وWiki مع ربط أعمدة ديناميكي، ومعاينات قابلة للتعديل، واكتشاف إنشاء أو تحديث، ومنطق تحويل مخزون، والتحقق حسب المستودع، واستيراد جماعي أكثر أمانا للمنتجات والطلبات. دمجت وصنت بوابات دفع مثل Stripe وPayPal وRazorpay وPaystack وFlutterwave وPaymob وPaytabs وMercadoPago وSSLCommerz وBkash وLiqPay وSenangPay وPaytm وPhonePe وXendit.",
    "work.item.wikifood-commerce-delivery-backend.detailSections.4.title": "أدوات التشغيل",
    "work.item.wikifood-commerce-delivery-backend.detailSections.4.text":
      "أضفت أنظمة ترويج للمتاجر والفئات وإعلانات الأصناف وبيانات إعادة التوجيه والحملات والبيع الخاطف والكاش باك والقسائم واللافتات ودعم العلامات العامة. حسنت إدارة الكتالوج عبر إجراءات جماعية ومعارض منتجات وتصفية علامات ومخزون مستودعات ومنطق توفر دائم وتنوعات وإضافات وموردين ووحدات وسمات وتدفقات اعتماد المنتجات. كما بنيت سجلات نشاط وصلاحيات أدوار ووحدات وتحكم وصول وتصديرات ومعاملات محافظ وطرق سحب وأرباح مندوبي توصيل وتقارير ضريبية.",
    "work.item.wikifood-commerce-delivery-backend.stats.0": "منتج موبايل",
    "work.item.wikifood-commerce-delivery-backend.stats.1": "Laravel 10",
    "work.item.wikifood-commerce-delivery-backend.outcomes.0": "منتج موبايل",
    "work.item.wikifood-commerce-delivery-backend.outcomes.1": "Laravel 10",
    "work.item.wikifood-commerce-delivery-backend.outcomes.2": "PHP 8.2",
    "work.item.wikifood-commerce-delivery-backend.outcomes.3": "رابط مشروع خارجي",
    "work.item.wikifood-commerce-delivery-backend.timeline.0.label": "نظرة عامة على المشروع",
    "work.item.wikifood-commerce-delivery-backend.timeline.0.text":
      "WikiFood منصة تجارة وإدارة توصيل متعددة البائعين على نطاق واسع، مبنية لعمليات الطعام والبقالة والصيدليات والتجارة والطرود. طورت وخصصت خلفية Laravel التي تشغل تطبيق الويب التجاري وثلاثة تطبيقات موبايل متصلة: تطبيق البائع، وتطبيق العميل للتجارة، وتطبيق التوصيل.",
    "work.item.wikifood-commerce-delivery-backend.timeline.1.label": "الخلفية",
    "work.item.wikifood-commerce-delivery-backend.timeline.1.text":
      "بنيت وصنت وحدات للطلبات والطلبات الفرعية وتدفقات نقاط البيع والمنتجات والبائعين والعملاء ومندوبي التوصيل والمستودعات والمخزون والقسائم والحملات واللافتات والإعلانات والاشتراكات والمحافظ والصرف والتقارير والضرائب وضريبة القيمة المضافة. تدعم طبقة API المصادقة والسلة والدفع وتتبع الطلبات والمحافظ ونقاط الولاء والإشعارات والدردشة والمراجعات وتتبع الموقع وتحديثات حالة التوصيل عبر المنظومة.",
    "work.item.wikifood-commerce-delivery-backend.timeline.2.label": "عمليات التجارة",
    "work.item.wikifood-commerce-delivery-backend.timeline.2.text":
      "نفذت تدفقات نقاط بيع للإدارة والبائعين مع خصومات نسبية على مستوى الصنف، والتحقق من سعر الشراء، وإعادة حساب الضرائب، وتعديل الطلبات، ووضع الطلبات بأمان على المخزون. حسنت إدارة الطلبات بتتبع الطلب الرئيسي والفرعي، وواجهات إلغاء، واسترجاع المخزون، وفلاتر مباشرة، وترقيم صفحات، وحفظ موضع التمرير، وتحديث تجزئة الإيصال، وإجماليات دقيقة للطلب الرئيسي.",
    "work.item.printout-laravel-rest-api.type": "منصة خلفية",
    "work.item.printout-laravel-rest-api.summary":
      "خلفية Laravel 10 REST API لمنصة طباعة وتوصيل أونلاين تربط العملاء والإدارة والبائعين ومندوبي التوصيل عبر وحدات تطبيق منفصلة.",
    "work.item.printout-laravel-rest-api.scope": "Laravel 10 وPHP",
    "work.item.printout-laravel-rest-api.outcome": "مشروع مباشر",
    "work.item.printout-laravel-rest-api.year": "أعمال مختارة",
    "work.item.printout-laravel-rest-api.duration": "مباشر",
    "work.item.printout-laravel-rest-api.team": "المنتج والهندسة والتوصيل",
    "work.item.taggz-ai-event-photography-platform.type": "منصة خلفية",
    "work.item.taggz-ai-event-photography-platform.summary":
      "منصة تصوير فعاليات بالذكاء الاصطناعي مع خلفية Laravel API ولوحة إدارة Next.js للفعاليات وتدفقات الوسائط والمدفوعات والتحليلات والمراجعة والصلاحيات.",
    "work.item.taggz-ai-event-photography-platform.scope": "Laravel 13 وPHP 8.3",
    "work.item.taggz-ai-event-photography-platform.outcome": "مشروع مباشر",
    "work.item.taggz-ai-event-photography-platform.year": "أعمال مختارة",
    "work.item.taggz-ai-event-photography-platform.duration": "مباشر",
    "work.item.taggz-ai-event-photography-platform.team": "المنتج والهندسة والتوصيل",
    "work.item.jawad-horse-riding-booking-platform.type": "منتج موبايل",
    "work.item.jawad-horse-riding-booking-platform.summary":
      "سوق حجوزات React Native متعدد المنصات لتجارب ركوب الخيل في مصر، يربط الفرسان بالإسطبلات والخيول والفعاليات والمدارس والمصورين.",
    "work.item.jawad-horse-riding-booking-platform.scope": "React Native وTypeScript",
    "work.item.jawad-horse-riding-booking-platform.outcome": "مشروع مباشر",
    "work.item.jawad-horse-riding-booking-platform.year": "أعمال مختارة",
    "work.item.jawad-horse-riding-booking-platform.duration": "مباشر",
    "work.item.jawad-horse-riding-booking-platform.team": "المنتج والهندسة والتوصيل",
    "work.item.elnasser-backend-dashboard.type": "منصة خلفية",
    "work.item.elnasser-backend-dashboard.summary":
      "خلفية تجارة ولوجستيات مؤسسية متقدمة مبنية على Laravel، تدير تصنيفات منتجات متعددة المستويات ولوجستيات معقدة وواجهات API قابلة للتوسع ومعالجة بيانات لحظية.",
    "work.item.elnasser-backend-dashboard.scope": "Laravel وPHP",
    "work.item.elnasser-backend-dashboard.outcome": "بناء خاص",
    "work.item.elnasser-backend-dashboard.year": "أعمال مختارة",
    "work.item.elnasser-backend-dashboard.duration": "خاص",
    "work.item.elnasser-backend-dashboard.team": "المنتج والهندسة والتوصيل",
    "work.item.alnasser-ecommerce.type": "نظام تجارة",
    "work.item.alnasser-ecommerce.summary":
      "صفحة هبوط حديثة عالية الأداء كواجهة رقمية رئيسية لعلامة النصر، مصممة للموازنة بين سرد العلامة والتحويل لعلامة تجزئة كبيرة في مصر والكويت.",
    "work.item.alnasser-ecommerce.scope": "React 18 وTypeScript",
    "work.item.alnasser-ecommerce.outcome": "مشروع مباشر",
    "work.item.alnasser-ecommerce.year": "أعمال مختارة",
    "work.item.alnasser-ecommerce.duration": "مباشر",
    "work.item.alnasser-ecommerce.team": "المنتج والهندسة والتوصيل",
    "work.item.igc-influencer-ugc-platform.type": "منتج رقمي",
    "work.item.igc-influencer-ugc-platform.summary":
      "سوق حديث عالي الأداء يربط العلامات التجارية بصناع محتوى UGC والمؤثرين، مع تدفقات انضمام متعددة الأطراف وتحليلات عائد الاستثمار.",
    "work.item.igc-influencer-ugc-platform.scope": "React Router v7 وTypeScript",
    "work.item.igc-influencer-ugc-platform.outcome": "مشروع مباشر",
    "work.item.igc-influencer-ugc-platform.year": "أعمال مختارة",
    "work.item.igc-influencer-ugc-platform.duration": "مباشر",
    "work.item.igc-influencer-ugc-platform.team": "المنتج والهندسة والتوصيل",
    "work.item.medad-alqemam.type": "تجربة ويب",
    "work.item.medad-alqemam.summary":
      "منصة ويب مؤسسية تفاعلية لشركة مقاولات رائدة في السعودية، تعرض قدرات الهندسة المدنية ومشاريع البنية التحتية عبر تجارب 3D/WebGL غامرة.",
    "work.item.medad-alqemam.scope": "React 18 وTypeScript",
    "work.item.medad-alqemam.outcome": "مشروع مباشر",
    "work.item.medad-alqemam.year": "أعمال مختارة",
    "work.item.medad-alqemam.duration": "مباشر",
    "work.item.medad-alqemam.team": "المنتج والهندسة والتوصيل",
    "work.item.ar-dish-visuals.type": "منتج رقمي",
    "work.item.ar-dish-visuals.summary":
      "تجربة واقع معزز متعددة المنصات تتيح عرض نماذج ثلاثية الأبعاد عالية الجودة للأطباق والأثاث والتشريح مباشرة من المتصفح مع تركيز على أداء العرض.",
    "work.item.ar-dish-visuals.scope": "React 18 وTypeScript",
    "work.item.ar-dish-visuals.outcome": "مشروع مباشر",
    "work.item.ar-dish-visuals.year": "أعمال مختارة",
    "work.item.ar-dish-visuals.duration": "مباشر",
    "work.item.ar-dish-visuals.team": "المنتج والهندسة والتوصيل",
    "work.item.kemedar-real-estate-platform.type": "منصة خلفية",
    "work.item.kemedar-real-estate-platform.summary":
      "منصة عقارات عالمية وآمنة تنظم شراء واستئجار العقارات عبر العالم، وتقلل مخاطر الوسطاء المزيفين والحواجز المحلية واللغوية والأمنية.",
    "work.item.kemedar-real-estate-platform.scope": "Laravel وقوالب Blade",
    "work.item.kemedar-real-estate-platform.outcome": "مشروع مباشر",
    "work.item.kemedar-real-estate-platform.year": "أعمال مختارة",
    "work.item.kemedar-real-estate-platform.duration": "مباشر",
    "work.item.kemedar-real-estate-platform.team": "المنتج والهندسة والتوصيل",
    "work.item.dental-osrais.type": "تجربة ويب",
    "work.item.dental-osrais.summary":
      "موقع أسنان متعدد اللغات بالإنجليزية والفرنسية والإسبانية، نفذت بناءه وتحريكه واستجابته عبر الأجهزة انطلاقا من تصميم واجهة جاهز.",
    "work.item.dental-osrais.scope": "React وTailwind CSS",
    "work.item.dental-osrais.outcome": "مشروع مباشر",
    "work.item.dental-osrais.year": "أعمال مختارة",
    "work.item.dental-osrais.duration": "مباشر",
    "work.item.dental-osrais.team": "المنتج والهندسة والتوصيل",
    "work.item.polrais-marine.type": "تجربة ويب",
    "work.item.polrais-marine.summary":
      "موقع شركة بحرية متخصصة في بناء السفن محليا وتصديرها عالميا، مع تركيز قوي على الأداء وSEO وإمكانية الوصول وتحقيق نتيجة مثالية في Google Insights.",
    "work.item.polrais-marine.scope": "React وTailwind CSS",
    "work.item.polrais-marine.outcome": "مشروع مباشر",
    "work.item.polrais-marine.year": "أعمال مختارة",
    "work.item.polrais-marine.duration": "مباشر",
    "work.item.polrais-marine.team": "المنتج والهندسة والتوصيل",
    "work.item.nourtha-tech-v2.type": "تجربة ويب",
    "work.item.nourtha-tech-v2.summary":
      "موقع بورتفوليو احترافي لشركة تقنية سعودية يضم ثماني صفحات تعرض الخدمات والحلول والرؤية، مع استجابة كاملة ودعم للعربية والإنجليزية.",
    "work.item.nourtha-tech-v2.scope": "React وTailwind CSS",
    "work.item.nourtha-tech-v2.outcome": "مشروع مباشر",
    "work.item.nourtha-tech-v2.year": "أعمال مختارة",
    "work.item.nourtha-tech-v2.duration": "مباشر",
    "work.item.nourtha-tech-v2.team": "المنتج والهندسة والتوصيل",
    "work.item.nourtha-tech.type": "تجربة ويب",
    "work.item.nourtha-tech.summary":
      "صفحة هبوط حديثة لشركة تقنية رائدة في السعودية، تعرض الحلول والخدمات والرؤية مع تصميم متجاوب ودعم كامل للعربية والإنجليزية وتجربة سلسة.",
    "work.item.nourtha-tech.scope": "React وAOS",
    "work.item.nourtha-tech.outcome": "مشروع مباشر",
    "work.item.nourtha-tech.year": "أعمال مختارة",
    "work.item.nourtha-tech.duration": "مباشر",
    "work.item.nourtha-tech.team": "المنتج والهندسة والتوصيل",
    "work.item.fanzvar.type": "منصة خلفية",
    "work.item.fanzvar.summary":
      "منصة شاملة تجمع الخدمات الاجتماعية والترفيهية والتجارية والتطويرية لمشجعي الرياضة محليا وإقليميا وعالميا، مع تركيز خاص على جمهور كرة القدم.",
    "work.item.fanzvar.scope": "PHP وLaravel",
    "work.item.fanzvar.outcome": "مشروع مباشر",
    "work.item.fanzvar.year": "أعمال مختارة",
    "work.item.fanzvar.duration": "مباشر",
    "work.item.fanzvar.team": "المنتج والهندسة والتوصيل",
    "work.item.inomhub.type": "تجربة ويب",
    "work.item.inomhub.summary":
      "صفحة هبوط رسمية لشركة أم تجمع عدة أعمال تحت علامة موحدة، مبنية بواجهة احترافية ومتجاوبة مع دعم كامل للترجمة ونظام بريد مدمج.",
    "work.item.inomhub.scope": "PHP وAOS",
    "work.item.inomhub.outcome": "مشروع مباشر",
    "work.item.inomhub.year": "أعمال مختارة",
    "work.item.inomhub.duration": "مباشر",
    "work.item.inomhub.team": "المنتج والهندسة والتوصيل",
    "work.item.kenz.type": "منصة خلفية",
    "work.item.kenz.summary":
      "نظام قوي متعدد الأدوار لإدارة المقاولين والاستشاريين، يدعم التحكم التشغيلي واسع النطاق والدردشة اللحظية وتعدد اللغات وإدارة الموظفين والمحتوى والتذاكر والحضور والديون.",
    "work.item.kenz.scope": "PHP وFilament",
    "work.item.kenz.outcome": "مشروع مباشر",
    "work.item.kenz.year": "أعمال مختارة",
    "work.item.kenz.duration": "مباشر",
    "work.item.kenz.team": "المنتج والهندسة والتوصيل",
    "work.item.cslf.type": "تجربة ويب",
    "work.item.cslf.summary":
      "موقع بورتفوليو احترافي لشركة قانونية يضم ثماني صفحات تعرض خدمات المكتب وخبراته مع تجربة تصفح متجاوبة عبر الأجهزة.",
    "work.item.cslf.scope": "ReactJs وAOS",
    "work.item.cslf.outcome": "مشروع مباشر",
    "work.item.cslf.year": "أعمال مختارة",
    "work.item.cslf.duration": "مباشر",
    "work.item.cslf.team": "المنتج والهندسة والتوصيل",
    "work.item.inovent.type": "تجربة ويب",
    "work.item.inovent.summary":
      "موقع لمنصة فعاليات افتراضية تستخدم الواقع الافتراضي وUnity لتمكين التنقل بلوحة المفاتيح أو النظارة وإنشاء بيئات غامرة للحضور.",
    "work.item.inovent.scope": "ReactJs Vite وAOS",
    "work.item.inovent.outcome": "مشروع مباشر",
    "work.item.inovent.year": "أعمال مختارة",
    "work.item.inovent.duration": "مباشر",
    "work.item.inovent.team": "المنتج والهندسة والتوصيل",
    "work.item.out-seller-landing-page.type": "نظام تجارة",
    "work.item.out-seller-landing-page.summary":
      "صفحة هبوط حديثة ومتجاوبة لعرض علامة Outsellers، بتخطيط نظيف لأقسام البطل والخدمات والتعريف والتواصل وحضور احترافي على الويب.",
    "work.item.out-seller-landing-page.scope": "Next وTypeScript",
    "work.item.out-seller-landing-page.outcome": "مشروع مباشر",
    "work.item.out-seller-landing-page.year": "أعمال مختارة",
    "work.item.out-seller-landing-page.duration": "مباشر",
    "work.item.out-seller-landing-page.team": "المنتج والهندسة والتوصيل",
    "work.item.inom-techs.type": "تجربة ويب",
    "work.item.inom-techs.summary":
      "موقع ملف شركة حديث لشركة برمجة وتسويق، مع حركات ديناميكية وترجمة عبر الكوكيز ودعم الوضع الداكن لتحسين تجربة المستخدم.",
    "work.item.inom-techs.scope": "Next.js وTailwind CSS",
    "work.item.inom-techs.outcome": "مشروع مباشر",
    "work.item.inom-techs.year": "أعمال مختارة",
    "work.item.inom-techs.duration": "مباشر",
    "work.item.inom-techs.team": "المنتج والهندسة والتوصيل",
    "work.item.out-seller.type": "نظام تجارة",
    "work.item.out-seller.summary":
      "موقع بورتفوليو احترافي يعرض الخدمات والخبرة عبر صفحات متعددة، مبني باستجابة كاملة لتجربة تصفح سلسة عبر الأجهزة.",
    "work.item.out-seller.scope": "Next وTypeScript",
    "work.item.out-seller.outcome": "مشروع مباشر",
    "work.item.out-seller.year": "أعمال مختارة",
    "work.item.out-seller.duration": "مباشر",
    "work.item.out-seller.team": "المنتج والهندسة والتوصيل",
    "work.item.edu-chain.type": "منصة خلفية",
    "work.item.edu-chain.summary":
      "منصة تعليم إلكتروني بأدوار متعددة للمدير والمعلم والمستخدم، يدير فيها المعلمون الدورات والدرجات بينما يدعم تكامل Zoom الجلسات المباشرة.",
    "work.item.edu-chain.scope": "Laravel وTailwind CSS",
    "work.item.edu-chain.outcome": "مشروع مباشر",
    "work.item.edu-chain.year": "أعمال مختارة",
    "work.item.edu-chain.duration": "مباشر",
    "work.item.edu-chain.team": "المنتج والهندسة والتوصيل",
    "work.item.out-seller-2.type": "منصة خلفية",
    "work.item.out-seller-2.summary":
      "منصة تجارة إلكترونية غنية بالميزات مبنية بـLaravel وTailwind CSS، تقدم إدارة منتجات متقدمة ومصادقة مستخدمين وتصميما متجاوبا لتجربة تسوق مثالية.",
    "work.item.out-seller-2.scope": "Laravel وTailwind CSS",
    "work.item.out-seller-2.outcome": "مشروع مباشر",
    "work.item.out-seller-2.year": "أعمال مختارة",
    "work.item.out-seller-2.duration": "مباشر",
    "work.item.out-seller-2.team": "المنتج والهندسة والتوصيل",
    "work.item.hunter.type": "تجربة ويب",
    "work.item.hunter.summary": "صفحة هبوط أنيقة وحديثة لتسهيل شراء وبيع المنازل.",
    "work.item.hunter.scope": "ReactJs وTailwind CSS",
    "work.item.hunter.outcome": "مشروع مباشر",
    "work.item.hunter.year": "أعمال مختارة",
    "work.item.hunter.duration": "مباشر",
    "work.item.hunter.team": "المنتج والهندسة والتوصيل",
    "work.item.gameing.type": "منصة خلفية",
    "work.item.gameing.summary":
      "منصة مركزية تتيح للاعبين استكشاف وتحميل آلاف الألعاب من أكثر من 100 موقع في مكان واحد، مع جلب بيانات ديناميكي عبر واجهات API.",
    "work.item.gameing.scope": "JavaScript وREST API",
    "work.item.gameing.outcome": "مشروع مباشر",
    "work.item.gameing.year": "أعمال مختارة",
    "work.item.gameing.duration": "مباشر",
    "work.item.gameing.team": "المنتج والهندسة والتوصيل",
    "work.item.spiro.type": "تجربة ويب",
    "work.item.spiro.summary":
      "موقع بورتفوليو حيوي لشركة مشروبات غازية محلية، يعرض منتجات العلامة وقيمها بتصميم حديث وتفاعلات جذابة.",
    "work.item.spiro.scope": "JavaScript وCSS",
    "work.item.spiro.outcome": "مشروع مباشر",
    "work.item.spiro.year": "أعمال مختارة",
    "work.item.spiro.duration": "مباشر",
    "work.item.spiro.team": "المنتج والهندسة والتوصيل",
    "work.item.halaa-bazaar.type": "منصة خلفية",
    "work.item.halaa-bazaar.summary":
      "منصة تجارة إلكترونية أنيقة وعملية بتصميم متجاوب ومصادقة مستخدمين وتجربة تسوق سلسة مع تكامل API لحظي.",
    "work.item.halaa-bazaar.scope": "ReactJs وTailwind CSS",
    "work.item.halaa-bazaar.outcome": "مشروع مباشر",
    "work.item.halaa-bazaar.year": "أعمال مختارة",
    "work.item.halaa-bazaar.duration": "مباشر",
    "work.item.halaa-bazaar.team": "المنتج والهندسة والتوصيل",
    "work.item.shopwise.type": "نظام تجارة",
    "work.item.shopwise.summary":
      "منصة تجارة إلكترونية ديناميكية مع مصادقة مستخدمين وإضافة إلى السلة وتصميم متجاوب لتجربة تسوق سلسة.",
    "work.item.shopwise.scope": "React وCSS",
    "work.item.shopwise.outcome": "مشروع مباشر",
    "work.item.shopwise.year": "أعمال مختارة",
    "work.item.shopwise.duration": "مباشر",
    "work.item.shopwise.team": "المنتج والهندسة والتوصيل",
    "work.item.e-commerce-gamel.type": "منصة خلفية",
    "work.item.e-commerce-gamel.summary":
      "لوحة إدارة تجارة إلكترونية مبنية بـLaravel وTailwind CSS، مع علاقات تصنيف ومنتجات وتصدير API لإدارة بيانات فعالة باستخدام MySQL.",
    "work.item.e-commerce-gamel.scope": "Laravel وTailwind CSS",
    "work.item.e-commerce-gamel.outcome": "مشروع مباشر",
    "work.item.e-commerce-gamel.year": "أعمال مختارة",
    "work.item.e-commerce-gamel.duration": "مباشر",
    "work.item.e-commerce-gamel.team": "المنتج والهندسة والتوصيل",
    "work.item.kids.type": "تجربة ويب",
    "work.item.kids.summary": "مكتبة مكونات Tailwind CSS جميلة وشاملة لبناء مواقع وتطبيقات حديثة.",
    "work.item.kids.scope": "Next.js وTailwind CSS",
    "work.item.kids.outcome": "مشروع مباشر",
    "work.item.kids.year": "أعمال مختارة",
    "work.item.kids.duration": "مباشر",
    "work.item.kids.team": "المنتج والهندسة والتوصيل",
    "work.item.behance-sync-gym-app.type": "تصميم Figma",
    "work.item.behance-sync-gym-app.summary":
      "دراسة حالة UI/UX لتطبيق Sync Gym مستوردة من Behance، منشورة في 18 مايو 2026، وتركز على Figma وتصميم الواجهات وتجربة المستخدم والذكاء الاصطناعي.",
    "work.item.behance-sync-gym-app.scope": "Figma وتصميم الواجهات",
    "work.item.behance-sync-gym-app.outcome": "دراسة حالة تصميم",
    "work.item.behance-sync-gym-app.year": "Behance",
    "work.item.behance-sync-gym-app.duration": "تصميم",
    "work.item.behance-sync-gym-app.team": "تصميم UI/UX",
    "work.item.behance-i-grill.type": "تصميم Figma",
    "work.item.behance-i-grill.summary":
      "دراسة حالة UI/UX لمشروع I Grill مستوردة من Behance، منشورة في 12 ديسمبر 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم والطعام.",
    "work.item.behance-i-grill.scope": "Figma وتصميم الواجهات",
    "work.item.behance-i-grill.outcome": "دراسة حالة تصميم",
    "work.item.behance-i-grill.year": "Behance",
    "work.item.behance-i-grill.duration": "تصميم",
    "work.item.behance-i-grill.team": "تصميم UI/UX",
    "work.item.behance-baqa-app.type": "تصميم Figma",
    "work.item.behance-baqa-app.summary":
      "دراسة حالة UI/UX لتطبيق BAQA مستوردة من Behance، منشورة في 10 ديسمبر 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم والهدايا.",
    "work.item.behance-baqa-app.scope": "Figma وتصميم الواجهات",
    "work.item.behance-baqa-app.outcome": "دراسة حالة تصميم",
    "work.item.behance-baqa-app.year": "Behance",
    "work.item.behance-baqa-app.duration": "تصميم",
    "work.item.behance-baqa-app.team": "تصميم UI/UX",
    "work.item.behance-max-hub-e-commerce.type": "تصميم Figma",
    "work.item.behance-max-hub-e-commerce.summary":
      "دراسة حالة UI/UX لمشروع Max Hub E-Commerce مستوردة من Behance، منشورة في 27 سبتمبر 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم ومواقع التجارة.",
    "work.item.behance-max-hub-e-commerce.scope": "Figma وتصميم الواجهات",
    "work.item.behance-max-hub-e-commerce.outcome": "دراسة حالة تصميم",
    "work.item.behance-max-hub-e-commerce.year": "Behance",
    "work.item.behance-max-hub-e-commerce.duration": "تصميم",
    "work.item.behance-max-hub-e-commerce.team": "تصميم UI/UX",
    "work.item.behance-naqlty-app.type": "تصميم Figma",
    "work.item.behance-naqlty-app.summary":
      "دراسة حالة UI/UX لتطبيق Naqlty مستوردة من Behance، منشورة في 17 أغسطس 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم واللوجستيات.",
    "work.item.behance-naqlty-app.scope": "Figma وتصميم الواجهات",
    "work.item.behance-naqlty-app.outcome": "دراسة حالة تصميم",
    "work.item.behance-naqlty-app.year": "Behance",
    "work.item.behance-naqlty-app.duration": "تصميم",
    "work.item.behance-naqlty-app.team": "تصميم UI/UX",
    "work.item.behance-logistic-platform.type": "تصميم Figma",
    "work.item.behance-logistic-platform.summary":
      "دراسة حالة UI/UX لمنصة نقلتي اللوجستية مستوردة من Behance، منشورة في 17 أغسطس 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم واللوجستيات.",
    "work.item.behance-logistic-platform.scope": "Figma وتصميم الواجهات",
    "work.item.behance-logistic-platform.outcome": "دراسة حالة تصميم",
    "work.item.behance-logistic-platform.year": "Behance",
    "work.item.behance-logistic-platform.duration": "تصميم",
    "work.item.behance-logistic-platform.team": "تصميم UI/UX",
    "work.item.behance-e-coomerce.type": "تصميم Figma",
    "work.item.behance-e-coomerce.summary":
      "دراسة حالة UI/UX لمشروع E-coomerce مستوردة من Behance، منشورة في 11 مايو 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم والتجارة الإلكترونية.",
    "work.item.behance-e-coomerce.scope": "Figma وتصميم الواجهات",
    "work.item.behance-e-coomerce.outcome": "دراسة حالة تصميم",
    "work.item.behance-e-coomerce.year": "Behance",
    "work.item.behance-e-coomerce.duration": "تصميم",
    "work.item.behance-e-coomerce.team": "تصميم UI/UX",
    "work.item.behance-inovent.type": "تصميم Figma",
    "work.item.behance-inovent.summary":
      "دراسة حالة UI/UX لمشروع INOVENT مستوردة من Behance، منشورة في 10 يناير 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم وتصميم الويب.",
    "work.item.behance-inovent.scope": "Figma وتصميم الواجهات",
    "work.item.behance-inovent.outcome": "دراسة حالة تصميم",
    "work.item.behance-inovent.year": "Behance",
    "work.item.behance-inovent.duration": "تصميم",
    "work.item.behance-inovent.team": "تصميم UI/UX",
    "work.item.behance-e-commerce.type": "تصميم Figma",
    "work.item.behance-e-commerce.summary":
      "دراسة حالة UI/UX لمشروع أولادنا للتجارة الإلكترونية مستوردة من Behance، منشورة في 3 يناير 2025، وتركز على Figma وتصميم الواجهات وتجربة المستخدم ومواقع التجارة.",
    "work.item.behance-e-commerce.scope": "Figma وتصميم الواجهات",
    "work.item.behance-e-commerce.outcome": "دراسة حالة تصميم",
    "work.item.behance-e-commerce.year": "Behance",
    "work.item.behance-e-commerce.duration": "تصميم",
    "work.item.behance-e-commerce.team": "تصميم UI/UX",
    "work.item.behance-test-system.type": "تصميم Figma",
    "work.item.behance-test-system.summary":
      "دراسة حالة UI/UX لمشروع Test System مستوردة من Behance، منشورة في 13 ديسمبر 2024، وتركز على Figma وتصميم الواجهات وتجربة المستخدم والاختبارات.",
    "work.item.behance-test-system.scope": "Figma وتصميم الواجهات",
    "work.item.behance-test-system.outcome": "دراسة حالة تصميم",
    "work.item.behance-test-system.year": "Behance",
    "work.item.behance-test-system.duration": "تصميم",
    "work.item.behance-test-system.team": "تصميم UI/UX",
    "work.item.behance-tawsila-app.type": "تصميم Figma",
    "work.item.behance-tawsila-app.summary":
      "دراسة حالة UI/UX لتطبيق TAWSILA مستوردة من Behance، منشورة في 13 أكتوبر 2024، وتركز على Figma وتصميم الواجهات وتجربة المستخدم وتطبيق السائق.",
    "work.item.behance-tawsila-app.scope": "Figma وتصميم الواجهات",
    "work.item.behance-tawsila-app.outcome": "دراسة حالة تصميم",
    "work.item.behance-tawsila-app.year": "Behance",
    "work.item.behance-tawsila-app.duration": "تصميم",
    "work.item.behance-tawsila-app.team": "تصميم UI/UX",
    "work.item.behance-financial-dashboard.type": "تصميم Figma",
    "work.item.behance-financial-dashboard.summary":
      "دراسة حالة UI/UX للوحة مالية مستوردة من Behance، منشورة في 27 أغسطس 2024، وتركز على Figma وتصميم الواجهات وتجربة المستخدم ولوحات البيانات.",
    "work.item.behance-financial-dashboard.scope": "Figma وتصميم الواجهات",
    "work.item.behance-financial-dashboard.outcome": "دراسة حالة تصميم",
    "work.item.behance-financial-dashboard.year": "Behance",
    "work.item.behance-financial-dashboard.duration": "تصميم",
    "work.item.behance-financial-dashboard.team": "تصميم UI/UX",
    "blog.hero.eyebrow": "دفتر العمليات",
    "blog.hero.title": "كتابة لأنظمة التشغيل.",
    "blog.hero.copy":
      "مقالات عملية عن ERP والمخزون والمالية والمستودعات ونقاط البيع وCRM وقرارات البرمجيات المتينة.",
    "blog.hero.backdrop": "ملاحظات",
    "blog.featured": "موجز مختار",
    "blog.readingList": "قائمة القراءة.",
    "blog.discuss": "ناقش",
    "blog.article.topic.operations": "العمليات",
    "blog.article.topic.erp": "ERP",
    "blog.article.topic.inventory": "المخزون",
    "blog.article.topic.warehouse": "المستودع",
    "blog.article.topic.accounting": "المحاسبة",
    "blog.article.topic.pos": "نقاط البيع",
    "blog.article.topic.automation": "الأتمتة",
    "blog.article.back": "العودة إلى المجلة",
    "blog.article.operatingQuestion": "سؤال التشغيل",
    "blog.article.signals": "إشارات يجب مراقبتها",
    "blog.article.related": "تابع القراءة.",
    "blog.article.cta": "أحضر تدفق العمل إلى الطاولة.",
    "blog.preferredSource": "تابع TRAFFODATA على Google",
    "blog.article.warehouse-management-software-egypt.title":
      "برامج المستودعات في مصر: كيف تختار نظاما يستخدمه المشغلون",
    "blog.article.warehouse-management-software-egypt.deck":
      "دليل عملي للفرق التي تقارن بين برامج المستودعات ودقة المخزون ومسارات الباركود والاستلام والتجهيز وعمليات التوصيل في مصر.",
    "blog.article.warehouse-management-software-egypt.topic": "المستودع",
    "blog.article.warehouse-management-software-egypt.readTime": "قراءة 8 دقائق",
    "blog.article.warehouse-management-software-egypt.publishedAt": "سبتمبر 2026",
    "blog.article.warehouse-management-software-egypt.audience": "المستودع، اللوجستيات، التجارة",
    "blog.article.warehouse-management-software-egypt.question":
      "هل يستطيع النظام إظهار الخطوة التالية قبل وصول الطلب إلى أرضية العمل؟",
    "blog.article.warehouse-management-software-egypt.signal.0.label": "الأولوية",
    "blog.article.warehouse-management-software-egypt.signal.0.value": "قابلية التتبع",
    "blog.article.warehouse-management-software-egypt.signal.1.label": "التحكم",
    "blog.article.warehouse-management-software-egypt.signal.1.value": "حقيقة المخزون",
    "blog.article.warehouse-management-software-egypt.signal.2.label": "المخرج",
    "blog.article.warehouse-management-software-egypt.signal.2.value": "توصيل أسرع",
    "blog.article.warehouse-management-software-egypt.section.operating-question.title":
      "ابدأ من أرضية العمل لا من قائمة المزايا",
    "blog.article.warehouse-management-software-egypt.section.operating-question.text":
      "يجب أن يجعل برنامج إدارة المستودعات القرار التشغيلي التالي واضحا: ما الذي تم استلامه، وأين تم تخزينه، وما الذي تم حجزه، وما الذي يمكن تجهيزه، وما الذي أصبح جاهزا للمغادرة. ابدأ برسم اللحظات التي يراجع فيها المشرف حاليا جدولا أو يتصل بفريق آخر أو يصحح حالة الطلب يدويا.",
    "blog.article.warehouse-management-software-egypt.section.buying-criteria.title":
      "معايير الشراء التي تستحق الاهتمام",
    "blog.article.warehouse-management-software-egypt.section.buying-criteria.text":
      "ابحث عن سجل واحد يمكن تتبعه من الاستلام والتخزين إلى التجهيز والتعبئة والشحن والمرتجعات والتعديلات. اختبر مسارات الباركود والمخزون متعدد المواقع والحجوزات وصلاحيات الأدوار وسجل التدقيق والتكامل مع التجارة الإلكترونية ونقاط البيع والمحاسبة والتوصيل قبل مقارنة لوحات البيانات أو لقطات الشاشة.",
    "blog.article.warehouse-management-software-egypt.section.egypt-context.title":
      "ما الذي يجب التحقق منه في عملية داخل مصر",
    "blog.article.warehouse-management-software-egypt.section.egypt-context.text":
      "يحتاج النظام المستخدم في مصر إلى ملاءمة نقاط التسليم الفعلية حول المستودع: فرق تعمل بالعربية والإنجليزية، وشركاء توصيل محليين، ومطابقة المدفوعات النقدية والإلكترونية، وتحويلات الفروع، ومستندات الضرائب، وواقع الاتصال المتقطع. هذه متطلبات تدفق عمل وليست تحسينات اختيارية تؤجل إلى ما بعد الإطلاق.",
    "blog.article.warehouse-management-software-egypt.section.decision.title":
      "قاعدة عملية لاتخاذ القرار",
    "blog.article.warehouse-management-software-egypt.section.decision.text":
      "اختر المنصة التي تستطيع شرح كل حركة مخزون للشخص المسؤول عن الخطوة التالية. إذا كانت الإجابة تتطلب تصدير البيانات أو مطابقة عدة أنظمة أو الثقة في قائمة استثناءات بلا مالك، فقد تجاوزت العملية حدود الأداة حتى لو بدت الواجهة حديثة.",
    "blog.article.digital-storefront-egypt.title":
      "المتاجر الرقمية في مصر تحتاج إلى نظام تشغيل خلفها",
    "blog.article.digital-storefront-egypt.deck":
      "المتجر الرقمي هو الباب الأمامي فقط. القيمة الحقيقية تظهر عندما يظل الكتالوج والمخزون والمدفوعات والتوصيل وبيانات العملاء متصلة.",
    "blog.article.digital-storefront-egypt.topic": "ERP",
    "blog.article.digital-storefront-egypt.readTime": "قراءة 6 دقائق",
    "blog.article.digital-storefront-egypt.publishedAt": "سبتمبر 2026",
    "blog.article.digital-storefront-egypt.audience": "التجارة، المؤسسون، العمليات",
    "blog.article.digital-storefront-egypt.question":
      "ما الذي يجب أن يتحدث تلقائيا عندما يضع العميل طلبا؟",
    "blog.article.digital-storefront-egypt.signal.0.label": "الباب الأمامي",
    "blog.article.digital-storefront-egypt.signal.0.value": "المتجر الرقمي",
    "blog.article.digital-storefront-egypt.signal.1.label": "المصدر",
    "blog.article.digital-storefront-egypt.signal.1.value": "مخزون مباشر",
    "blog.article.digital-storefront-egypt.signal.2.label": "النتيجة",
    "blog.article.digital-storefront-egypt.signal.2.value": "طلبات مترابطة",
    "blog.article.digital-storefront-egypt.section.front-door.title":
      "المتجر هو الباب الأمامي",
    "blog.article.digital-storefront-egypt.section.front-door.text":
      "يساعد المتجر الرقمي العميل على التصفح والشراء، لكنه لا يقرر وحده ما إذا كان المنتج متاحا فعلا، ومن سيجهزه، وكيف ستتم مطابقة الدفع، وما الذي سيسمعه العميل بعد ذلك. هذه القرارات تنتمي إلى نظام التشغيل خلف المتجر.",
    "blog.article.digital-storefront-egypt.section.source-of-truth.title":
      "اربط مصدر الحقيقة",
    "blog.article.digital-storefront-egypt.section.source-of-truth.text":
      "يجب أن يشترك الكتالوج والأسعار والمخزون وسجلات العملاء وحالة الدفع وحالة التوصيل في نموذج واضح. عندما تكتب كل قناة نسختها الخاصة من الطلب، تقضي الفرق وقتها في تفسير الفروقات بدلا من خدمة العملاء. المنصة المترابطة تجعل الحالة ومالكها واضحين.",
    "blog.article.digital-storefront-egypt.section.operating-loop.title":
      "صمم دورة الطلب كاملة",
    "blog.article.digital-storefront-egypt.section.operating-loop.text":
      "ارسم ما يحدث بعد إتمام الشراء: الحجز والتجهيز والاستبدال وتأكيد الدفع والشحن ومحاولة التوصيل والإرجاع والاسترداد والدعم. وبالنسبة لفرق التجارة في مصر، أدرج منذ البداية نقاط التسليم بين الطلبات الإلكترونية والفروع وعمليات التوصيل المحلية والفريق المالي.",
    "blog.article.digital-storefront-egypt.section.decision.title":
      "الاختبار المفيد",
    "blog.article.digital-storefront-egypt.section.decision.text":
      "اسأل هل يستطيع شخص واحد الإجابة عن ثلاثة أسئلة دون فتح خمس أدوات: ماذا طلب العميل، وأين يوجد الطلب الآن، وما الذي يجب أن يحدث بعد ذلك؟ إذا لم يكن ذلك ممكنا، فغالبا لا يحتاج الاستثمار التالي إلى ميزة أخرى في المتجر، بل إلى طبقة تشغيل مترابطة خلفه.",
    "blog.article.ecommerce-software-egypt.title":
      "برامج التجارة الإلكترونية في مصر: اربط المتجر بالعمل خلفه",
    "blog.article.ecommerce-software-egypt.deck":
      "دليل عملي لبرامج التجارة الإلكترونية في مصر: الكتالوج والدفع عند الاستلام والمدفوعات والمخزون والتوصيل والبيانات التشغيلية التي تحافظ على حركة الطلبات.",
    "blog.article.ecommerce-software-egypt.topic": "ERP",
    "blog.article.ecommerce-software-egypt.readTime": "قراءة 7 دقائق",
    "blog.article.ecommerce-software-egypt.publishedAt": "سبتمبر 2026",
    "blog.article.ecommerce-software-egypt.audience": "التجارة، المؤسسون، العمليات",
    "blog.article.ecommerce-software-egypt.question":
      "هل ينشئ كل طلب سجلا تشغيليا مشتركا واحدا؟",
    "blog.article.ecommerce-software-egypt.signal.0.label": "الطلب",
    "blog.article.ecommerce-software-egypt.signal.0.value": "دفع عند الاستلام + بطاقة",
    "blog.article.ecommerce-software-egypt.signal.1.label": "التحكم",
    "blog.article.ecommerce-software-egypt.signal.1.value": "مخزون مباشر",
    "blog.article.ecommerce-software-egypt.signal.2.label": "المخرج",
    "blog.article.ecommerce-software-egypt.signal.2.value": "نقاط تسليم أقل",
    "blog.article.ecommerce-software-egypt.section.storefront-is-not-system.title":
      "المتجر ليس نظام التشغيل",
    "blog.article.ecommerce-software-egypt.section.storefront-is-not-system.text":
      "يمكن للمتجر استقبال الطلب، لكن العمل ما زال يحتاج إلى حجز المخزون وتأكيد الدفع وتحديد المسؤول عن التجهيز وتنسيق التوصيل والرد على العميل. تصبح برامج التجارة الإلكترونية مفيدة عندما تعيش هذه الحالات في نموذج واحد بدلا من انتقالها بين متجر وجدول وبوابة توصيل ومحادثة.",
    "blog.article.ecommerce-software-egypt.section.egypt-order-path.title":
      "ارسم مسار الطلب المستخدم في مصر",
    "blog.article.ecommerce-software-egypt.section.egypt-order-path.text":
      "ابدأ بالمزيج الحقيقي من الدفع عند الاستلام والبطاقات والتحويلات البنكية والمتابعة عبر واتساب ومخزون الفروع وشركاء التوصيل المحليين. الهدف ليس إضافة كل تكامل في اليوم الأول، بل جعل مالك كل حالة واضحا من التأكيد إلى فشل التوصيل والإرجاع والاسترداد والمطابقة المالية.",
    "blog.article.ecommerce-software-egypt.section.integration-checklist.title":
      "قائمة التحقق من التكامل",
    "blog.article.ecommerce-software-egypt.section.integration-checklist.text":
      "تحقق من ملكية الكتالوج وحجوزات المخزون وقواعد الأسعار وحالة الدفع وحالة التوصيل وسجل العميل والإشعارات والصلاحيات وأحداث التدقيق. يجب أن تجعل منصة التجارة الاستثناءات واضحة وقابلة للمعالجة، لا أن تخفيها خلف عداد طلبات أخضر.",
    "blog.article.ecommerce-software-egypt.section.decision.title": "اختر الطبقة الناقصة",
    "blog.article.ecommerce-software-egypt.section.decision.text":
      "إذا كان المتجر جيدا لكن العمليات متفرقة، حسّن طبقة الطلب المترابطة. وإذا كان المخزون والمالية موثوقين بالفعل، ركز على تجربة العميل. الاستثمار الصحيح يتبع نقطة التسليم المكسورة لا طلب الميزة الأعلى صوتا.",
    "blog.article.laravel-rest-api-business-systems.title":
      "واجهات Laravel REST لأنظمة الأعمال: ما الذي يجب ربطه أولا؟",
    "blog.article.laravel-rest-api-business-systems.deck":
      "دليل عملي لتصميم واجهات Laravel REST للمخزون والطلبات والمدفوعات وتطبيقات الموبايل دون تحويل كل تكامل إلى نقطة تسليم هشة.",
    "blog.article.laravel-rest-api-business-systems.topic": "الأتمتة",
    "blog.article.laravel-rest-api-business-systems.readTime": "قراءة 7 دقائق",
    "blog.article.laravel-rest-api-business-systems.publishedAt": "سبتمبر 2026",
    "blog.article.laravel-rest-api-business-systems.audience": "المنتج، الهندسة، العمليات",
    "blog.article.laravel-rest-api-business-systems.question":
      "هل يمكن إعادة تشغيل كل حدث تجاري مهم وتتّبعه ومعرفة مالكه؟",
    "blog.article.laravel-rest-api-business-systems.signal.0.label": "العقد",
    "blog.article.laravel-rest-api-business-systems.signal.0.value": "موارد واضحة",
    "blog.article.laravel-rest-api-business-systems.signal.1.label": "الموثوقية",
    "blog.article.laravel-rest-api-business-systems.signal.1.value": "أحداث قابلة للتكرار بأمان",
    "blog.article.laravel-rest-api-business-systems.signal.2.label": "المخرج",
    "blog.article.laravel-rest-api-business-systems.signal.2.value": "تكاملات أكثر أمانا",
    "blog.article.laravel-rest-api-business-systems.section.start-with-events.title":
      "ابدأ بأحداث العمل",
    "blog.article.laravel-rest-api-business-systems.section.start-with-events.text":
      "يجب أن تمثل واجهة Laravel REST العمل الذي يفهمه النشاط: إنشاء طلب أو تسجيل حركة مخزون أو تحصيل دفعة أو تنفيذ محاولة توصيل. ابدأ بهذه الأحداث ومالكيها قبل اختيار أسماء المتحكمات أو توليد نقاط النهاية.",
    "blog.article.laravel-rest-api-business-systems.section.resource-boundaries.title":
      "اجعل حدود الموارد واضحة",
    "blog.article.laravel-rest-api-business-systems.section.resource-boundaries.text":
      "حدد النظام الذي يملك العملاء والمنتجات والمخزون والطلبات والمدفوعات وحالات التوصيل. استخدم معرفات ثابتة والتحقق والصلاحيات والتقسيم إلى صفحات وعقودا ذات إصدارات حتى لا يرتبط تطبيق الموبايل أو تكامل الشريك بشكل قاعدة بيانات خاصة.",
    "blog.article.laravel-rest-api-business-systems.section.mobile-and-partners.title":
      "صمم للموبايل والشركاء",
    "blog.article.laravel-rest-api-business-systems.section.mobile-and-partners.text":
      "تحتاج تطبيقات الموبايل والخدمات الخارجية إلى ردود متوقعة وأخطاء مفيدة وعمليات كتابة آمنة عند إعادة المحاولة وسلوك واضح للـ webhooks. تعامل مع الشبكات البطيئة والطلبات المكررة وانتهاء الرموز والفشل الجزئي كظروف تشغيل طبيعية لا كحالات نادرة.",
    "blog.article.laravel-rest-api-business-systems.section.production-readiness.title":
      "الجاهزية للإنتاج جزء من الواجهة",
    "blog.article.laravel-rest-api-business-systems.section.production-readiness.text":
      "قبل الإطلاق أضف سجلات الطلبات ومعرفات التتبع وحدود المعدل ومراقبة الطوابير وفحوص الصحة والنسخ الاحتياطية وطريقة لإعادة تشغيل العمل الفاشل أو مطابقته. لا تنتهي الواجهة عندما تعيد 200، بل عندما يستطيع الفريق شرح ما حدث بعد ذلك.",
    "blog.article.custom-business-software-egypt.title":
      "برامج الأعمال المخصصة في مصر: عندما تصبح طريقة العمل هي المنتج",
    "blog.article.custom-business-software-egypt.deck":
      "كيف تقرر أن برامج الأعمال المخصصة مبررة عندما لا تعود الجداول وأدوات SaaS والموافقات اليدوية متفقة.",
    "blog.article.custom-business-software-egypt.topic": "ERP",
    "blog.article.custom-business-software-egypt.readTime": "قراءة 6 دقائق",
    "blog.article.custom-business-software-egypt.publishedAt": "سبتمبر 2026",
    "blog.article.custom-business-software-egypt.audience": "المؤسسون، COO، العمليات",
    "blog.article.custom-business-software-egypt.question":
      "هل عنق الزجاجة ميزة مفقودة أم نموذج تشغيل مفقود؟",
    "blog.article.custom-business-software-egypt.signal.0.label": "المحفز",
    "blog.article.custom-business-software-egypt.signal.0.value": "استثناءات متكررة",
    "blog.article.custom-business-software-egypt.signal.1.label": "النطاق",
    "blog.article.custom-business-software-egypt.signal.1.value": "الإصدار الأول",
    "blog.article.custom-business-software-egypt.signal.2.label": "النتيجة",
    "blog.article.custom-business-software-egypt.signal.2.value": "تدفق مملوك",
    "blog.article.custom-business-software-egypt.section.signal-to-build.title":
      "إشارة أن وقت البناء قد حان",
    "blog.article.custom-business-software-egypt.section.signal-to-build.text":
      "تستحق البرامج المخصصة الدراسة عندما تتكرر الاستثناءات نفسها، وتكون القواعد مهمة للعمل، ولا تستطيع أداة جاهزة إظهار صاحب الخطوة التالية. المشكلة ليست غياب لوحة بيانات أخرى، بل إعادة بناء نموذج التشغيل يدويا.",
    "blog.article.custom-business-software-egypt.section.map-before-code.title":
      "ارسم العمل قبل كتابة الكود",
    "blog.article.custom-business-software-egypt.section.map-before-code.text":
      "وثّق الأدوار والموافقات والسجلات والحالات ونقاط التسليم ومسارات الفشل. أدرج القيود الفعلية حول الفروع والفرق العربية والإنجليزية ومطابقة المدفوعات والتوصيل المحلي والتقارير. خريطة عملية قصيرة أثمن من قائمة مزايا طويلة.",
    "blog.article.custom-business-software-egypt.section.buy-and-build.title":
      "اعرف ما الذي تشتريه وما الذي تبنيه",
    "blog.article.custom-business-software-egypt.section.buy-and-build.text":
      "احتفظ بالقدرات العامة حيث تؤدي أداة مستقرة المهمة جيدا، وابنِ تدفق العمل الذي يميز العملية. قد تتكامل المحاسبة والمصادقة والرسائل والمدفوعات والتحليلات بسهولة، بينما تكون القواعد التي تربطها هي الجزء الذي تملكه.",
    "blog.article.custom-business-software-egypt.section.first-release.title":
      "صمم إصدارا أوليا يثق به الناس",
    "blog.article.custom-business-software-egypt.section.first-release.text":
      "اختر دورة تشغيل واحدة ذات قيمة واجعلها قابلة للمراقبة من الطلب إلى النتيجة. امنح الفريق صلاحيات واضحة وأدلة وإشعارات ومسارا للاستثناءات. يجب أن يقلل الإصدار الأول نقطة تسليم حقيقية، لا أن يعيد إنشاء كل شاشة من الأدوات القديمة.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.title":
      "البرامج المخصصة أم الجاهزة في مصر: دليل عملي لاتخاذ القرار",
    "blog.article.custom-software-vs-off-the-shelf-egypt.deck":
      "طريقة صادقة لمقارنة البرامج الجاهزة بنظام مبني حول تدفق العمل والميزانية والفريق والملكية طويلة المدى.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.topic": "ERP",
    "blog.article.custom-software-vs-off-the-shelf-egypt.readTime": "قراءة 7 دقائق",
    "blog.article.custom-software-vs-off-the-shelf-egypt.publishedAt": "سبتمبر 2026",
    "blog.article.custom-software-vs-off-the-shelf-egypt.audience": "المؤسسون، COO، العمليات",
    "blog.article.custom-software-vs-off-the-shelf-egypt.question":
      "متى تتوقف الأداة العامة عن المساعدة وتبدأ في تحميل العملية تكلفة إضافية؟",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.0.label": "السؤال",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.0.value": "شراء أم بناء",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.1.label": "المخاطر",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.1.value": "حلول مؤقتة",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.2.label": "النتيجة",
    "blog.article.custom-software-vs-off-the-shelf-egypt.signal.2.value": "الملاءمة قبل المزايا",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.start-with-ceiling.title":
      "ابدأ من الحد لا من الحماس",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.start-with-ceiling.text":
      "غالبا ما تكون البرامج الجاهزة هي الخطوة الأولى الصحيحة. لكنها تصبح مشكلة عندما يقضي الفريق وقتا أطول في الالتفاف حول المنتج بدلا من استخدامه، أو عندما تعيش قواعد العمل الأهم في الجداول والرسائل والذاكرة الشخصية. اعثر على الحد قبل مقارنة التقنيات.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.total-cost.title":
      "قارن التكلفة الكاملة للقرار",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.total-cost.text":
      "السعر ليس اشتراكا أو تقديرا للتطوير فقط. احسب التنفيذ ونقل البيانات والتدريب والتكاملات والمطابقة اليدوية والدعم وطلبات التغيير وتكلفة الأخطاء. قد تصبح الأداة الأرخص مكلفة عندما يحتاج كل استثناء إلى حل يدوي.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.ownership.title":
      "اسأل من يملك تدفق العمل",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.ownership.text":
      "يجب أن تأتي البرامج المخصصة مع نموذج ملكية واضح يشمل الكود المصدري والاستضافة وبيانات الدخول والتوثيق والمراقبة والدعم ومسار التحسينات المستقبلية. شراء منتج قد يقلل الصيانة، لكنه قد يعني قبول طريقة عمل وأولويات إصدار يحددها طرف آخر.",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.decision.title":
      "قاعدة مفيدة لاتخاذ القرار",
    "blog.article.custom-software-vs-off-the-shelf-egypt.section.decision.text":
      "اشترِ القدرة العامة المستقرة، وابنِ تدفق العمل الخاص فعلا بالنشاط. بالنسبة لعملية نامية في مصر أو الخليج أو السوق الدولي، غالبا ما تكون الإجابة الأفضل نظاما مترابطا يحتفظ بالمنتجات الموثوقة حيث تعمل ويخصص نقاط التسليم التي تصنع الميزة.",
    "blog.article.software-project-timeline-3-15-weeks.title":
      "لماذا تستغرق مشاريع البرامج المخصصة من 3 إلى 15 أسبوعا؟",
    "blog.article.software-project-timeline-3-15-weeks.deck":
      "طريقة واضحة لفهم جداول تسليم البرمجيات: ما يمكن إطلاقه خلال ثلاثة أسابيع، وما يحتاج إلى وقت أطول، وما يحمي الإصدار الأول.",
    "blog.article.software-project-timeline-3-15-weeks.topic": "الأتمتة",
    "blog.article.software-project-timeline-3-15-weeks.readTime": "قراءة 6 دقائق",
    "blog.article.software-project-timeline-3-15-weeks.publishedAt": "سبتمبر 2026",
    "blog.article.software-project-timeline-3-15-weeks.audience": "المؤسسون، المنتج، العمليات",
    "blog.article.software-project-timeline-3-15-weeks.question":
      "ما أصغر إصدار يغير العملية إلى الأفضل؟",
    "blog.article.software-project-timeline-3-15-weeks.signal.0.label": "النطاق",
    "blog.article.software-project-timeline-3-15-weeks.signal.0.value": "3–15 أسبوعا",
    "blog.article.software-project-timeline-3-15-weeks.signal.1.label": "التحكم",
    "blog.article.software-project-timeline-3-15-weeks.signal.1.value": "حدود الإصدار",
    "blog.article.software-project-timeline-3-15-weeks.signal.2.label": "المخرج",
    "blog.article.software-project-timeline-3-15-weeks.signal.2.value": "برنامج يعمل",
    "blog.article.software-project-timeline-3-15-weeks.section.scope-first.title":
      "النطاق هو الذي يحدد التقويم",
    "blog.article.software-project-timeline-3-15-weeks.section.scope-first.text":
      "يبدأ التقدير المفيد بدورة تشغيل واحدة لا بقائمة أمنيات. حدد المستخدمين والقرارات والسجلات والتكاملات والصلاحيات ودليل النجاح. كلما كان الحد أوضح، أصبح الجدول أكثر صدقا وأصبح اتخاذ المفاضلات أسهل.",
    "blog.article.software-project-timeline-3-15-weeks.section.three-week.title":
      "ما الذي يمكن أن يفعله إصدار من ثلاثة أسابيع؟",
    "blog.article.software-project-timeline-3-15-weeks.section.three-week.text":
      "قد تكفي ثلاثة أسابيع لإصدار مركز: تدفق عمل واحد وعدد صغير من الأدوار ونموذج بيانات محدد والشاشات اللازمة لاستخدامه. يناسب ذلك تجربة أولية أو أداة داخلية أو بوابة ضيقة أو الشريحة الأولى من منصة أكبر.",
    "blog.article.software-project-timeline-3-15-weeks.section.fifteen-week.title":
      "ما الذي يحتاج إلى ما يقارب خمسة عشر أسبوعا؟",
    "blog.article.software-project-timeline-3-15-weeks.section.fifteen-week.text":
      "يتيح وقت التسليم الأطول مساحة لأدوار متعددة وتطبيقات الموبايل أو الشركاء والتكاملات العميقة ونقل البيانات والتقارير والصلاحيات والاختبار والتدريب وواجهة تشغيل أكثر اكتمالا. الهدف ليس ملء خمسة عشر أسبوعا، بل حماية جودة نظام سيعتمد عليه الناس.",
    "blog.article.software-project-timeline-3-15-weeks.section.protect-the-timeline.title":
      "احم الإصدار الأول",
    "blog.article.software-project-timeline-3-15-weeks.section.protect-the-timeline.text":
      "اجعل القرارات مرئية وراجع البرنامج العامل مبكرا وجهز الوصول إلى الأنظمة الخارجية وعين شخصا واحدا يستطيع الإجابة عن أسئلة النطاق. غالبا ما تأتي التأخيرات من ملكية غير واضحة وتفاصيل تكامل متأخرة وتوسيع الإصدار الأول قبل أن تعمل دورته الأساسية.",
    "blog.article.post-launch-software-support-ownership.title":
      "دعم البرامج بعد الإطلاق: من يملك النظام بعد الإصدار؟",
    "blog.article.post-launch-software-support-ownership.deck":
      "لماذا يجب تصميم الملكية والدعم والمراقبة والتحسينات الصغيرة قبل إطلاق البرامج المخصصة.",
    "blog.article.post-launch-software-support-ownership.topic": "الأتمتة",
    "blog.article.post-launch-software-support-ownership.readTime": "قراءة 6 دقائق",
    "blog.article.post-launch-software-support-ownership.publishedAt": "سبتمبر 2026",
    "blog.article.post-launch-software-support-ownership.audience": "المؤسسون، العمليات، التقنية",
    "blog.article.post-launch-software-support-ownership.question":
      "من يستطيع شرح النظام عندما يتغير العمل أو يحدث عطل؟",
    "blog.article.post-launch-software-support-ownership.signal.0.label": "بعد الإطلاق",
    "blog.article.post-launch-software-support-ownership.signal.0.value": "مالك محدد",
    "blog.article.post-launch-software-support-ownership.signal.1.label": "الاستجابة",
    "blog.article.post-launch-software-support-ownership.signal.1.value": "دعم واضح",
    "blog.article.post-launch-software-support-ownership.signal.2.label": "النتيجة",
    "blog.article.post-launch-software-support-ownership.signal.2.value": "نظام متين",
    "blog.article.post-launch-software-support-ownership.section.ownership-after-launch.title":
      "الملكية لا تنتهي عند الإطلاق",
    "blog.article.post-launch-software-support-ownership.section.ownership-after-launch.text":
      "يحتاج النظام الإنتاجي إلى شخص يفهم قراراته وتبعياته وبيانات الدخول والبيانات وحالات الفشل. اجعل الملكية واضحة بين العميل وفريق التنفيذ قبل اعتماد أول مستخدم حقيقي عليه.",
    "blog.article.post-launch-software-support-ownership.section.support-model.title":
      "حدد نموذج الدعم",
    "blog.article.post-launch-software-support-ownership.section.support-model.text":
      "اتفقوا على طريقة الإبلاغ عن الحوادث وما الذي يعد عاجلا وكيف تتم الاستجابة وأين تخطط التحسينات المعتادة. يصبح الدعم أكثر فائدة عندما يشمل المراقبة والنسخ الاحتياطية وملاحظات الإصدارات ومسارا قصيرا من المشكلة المتكررة إلى تحسين المنتج.",
    "blog.article.post-launch-software-support-ownership.section.handover.title":
      "اجعل التسليم جزءا من العمل",
    "blog.article.post-launch-software-support-ownership.section.handover.text":
      "يشمل التسليم الحقيقي الكود المصدري والبيئات والوصول إلى النشر والتكاملات ونموذج البيانات ودليل التشغيل وأدوار المستخدمين والقيود المعروفة. تعني الملكية أن يستطيع العميل مواصلة التشغيل واتخاذ قرارات واعية حتى عندما لا يكون فريق المشروع الأصلي موجودا.",
    "blog.article.post-launch-software-support-ownership.section.measure-improvement.title":
      "قِس العمل بعد الإطلاق",
    "blog.article.post-launch-software-support-ownership.section.measure-improvement.text":
      "راقب الإشارات التي تهم العملية: الوظائف الفاشلة والاستثناءات غير المحلولة وزمن الاستجابة والتبني والعمل اليدوي الذي تمت إزالته والوقت اللازم لإتمام دورة العمل الأساسية. يجب أن يجعل الدعم بعد الإطلاق النظام أكثر اعتمادية، لا أن يبقيه مضاء فقط.",
    "blog.article.egypt-gulf-software-integrations.title":
      "تكاملات البرامج لمصر والخليج: صمم لنقاط التسليم الفعلية",
    "blog.article.egypt-gulf-software-integrations.deck":
      "متطلبات الدفع والتوصيل واللغة والتشغيل المحلية مهمة عندما يحتاج نظام الأعمال إلى العمل عبر مصر والخليج والفرق الدولية.",
    "blog.article.egypt-gulf-software-integrations.topic": "ERP",
    "blog.article.egypt-gulf-software-integrations.readTime": "قراءة 7 دقائق",
    "blog.article.egypt-gulf-software-integrations.publishedAt": "سبتمبر 2026",
    "blog.article.egypt-gulf-software-integrations.audience": "التجارة، اللوجستيات، العمليات",
    "blog.article.egypt-gulf-software-integrations.question":
      "أي قاعدة محلية أو شريك يمكنه تغيير حالة العمل؟",
    "blog.article.egypt-gulf-software-integrations.signal.0.label": "الانتشار",
    "blog.article.egypt-gulf-software-integrations.signal.0.value": "مصر + الخليج",
    "blog.article.egypt-gulf-software-integrations.signal.1.label": "التحكم",
    "blog.article.egypt-gulf-software-integrations.signal.1.value": "تكاملات مملوكة",
    "blog.article.egypt-gulf-software-integrations.signal.2.label": "المخرج",
    "blog.article.egypt-gulf-software-integrations.signal.2.value": "مفاجآت أقل",
    "blog.article.egypt-gulf-software-integrations.section.local-reality.title":
      "ابدأ من الواقع المحلي",
    "blog.article.egypt-gulf-software-integrations.section.local-reality.text":
      "يجب أن تراعي البرامج الإقليمية طريقة عمل الفرق فعليا: واجهات عربية وإنجليزية وطرق دفع محلية والدفع عند الاستلام وشركاء التوصيل وعمليات الفروع ومستندات الضرائب وعادات الموافقة المختلفة. هذه التفاصيل تغير تدفق العمل لا ملف الترجمة فقط.",
    "blog.article.egypt-gulf-software-integrations.section.integration-boundaries.title":
      "امنح كل تكامل حدا واضحا",
    "blog.article.egypt-gulf-software-integrations.section.integration-boundaries.text":
      "حدد النظام الذي يملك كل حالة وما يحدث عندما يتأخر الشريك أو يتوقف أو يعيد استجابة غير متوقعة. تحافظ العقود المستقرة وإعادة المحاولة والمطابقة وسجل التدقيق على التكامل المحلي من التحول إلى عملية يدوية مخفية.",
    "blog.article.egypt-gulf-software-integrations.section.regional-readiness.title":
      "صمم للتغير الإقليمي",
    "blog.article.egypt-gulf-software-integrations.section.regional-readiness.text":
      "اجعل العملات والضرائب واللغات والفروع والصلاحيات وقواعد التوصيل قابلة للتهيئة حيث تختلف فعلا. لا تضع كل دولة في الإصدار الأول، لكن لا تتظاهر أيضا بأن تدفق عمل عاما واحدا يناسب كل سوق.",
    "blog.article.egypt-gulf-software-integrations.section.international-without-generic.title":
      "توسع دوليا دون أن تصبح عاما",
    "blog.article.egypt-gulf-software-integrations.section.international-without-generic.text":
      "تحافظ المنصة القوية على نموذج أساسي واضح وتسمح للعمليات المحلية بالاتصال به. هكذا يمكن للنظام دعم فرق مصر والخليج ثم النمو إلى عمليات دولية دون فقدان نقاط التسليم الخاصة التي جعلته مفيدا منذ البداية.",
    "blog.article.before-another-dashboard.title": "ما يحتاجه المشغلون قبل لوحة بيانات أخرى",
    "blog.article.before-another-dashboard.deck":
      "نظرة عملية على الموافقات وأحداث المخزون وقواعد المالية التي يجب رسمها قبل بدء تصميم الواجهة.",
    "blog.article.before-another-dashboard.topic": "ERP",
    "blog.article.before-another-dashboard.readTime": "قراءة 7 دقائق",
    "blog.article.before-another-dashboard.publishedAt": "يونيو 2026",
    "blog.article.before-another-dashboard.audience": "COO، المالية، المنتج",
    "blog.article.before-another-dashboard.question":
      "أي نقاط تسليم يجب أن يجعلها النظام مستحيلة التجاهل؟",
    "blog.article.before-another-dashboard.signal.0.label": "نقاط التسليم",
    "blog.article.before-another-dashboard.signal.0.value": "الموافقات",
    "blog.article.before-another-dashboard.signal.1.label": "المخاطر",
    "blog.article.before-another-dashboard.signal.1.value": "الاستثناءات",
    "blog.article.before-another-dashboard.signal.2.label": "المخرج",
    "blog.article.before-another-dashboard.signal.2.value": "خريطة الإصدار",
    "blog.article.inventory-exceptions-are-requirements.title":
      "استثناءات المخزون هي متطلبات منتج",
    "blog.article.inventory-exceptions-are-requirements.deck":
      "الفروقات والمخزون التالف والاستلامات الجزئية تكشف تدفقات العمل التي تخفيها أدوات المخزون العامة.",
    "blog.article.inventory-exceptions-are-requirements.topic": "المخزون",
    "blog.article.inventory-exceptions-are-requirements.readTime": "قراءة 5 دقائق",
    "blog.article.inventory-exceptions-are-requirements.publishedAt": "يونيو 2026",
    "blog.article.inventory-exceptions-are-requirements.audience": "المخزون، المستودع، المالية",
    "blog.article.inventory-exceptions-are-requirements.question":
      "ماذا يجب أن يحدث عندما يختلف العد والاستلام والفاتورة؟",
    "blog.article.inventory-exceptions-are-requirements.signal.0.label": "المحفز",
    "blog.article.inventory-exceptions-are-requirements.signal.0.value": "عدم تطابق",
    "blog.article.inventory-exceptions-are-requirements.signal.1.label": "المالك",
    "blog.article.inventory-exceptions-are-requirements.signal.1.value": "قائد العمليات",
    "blog.article.inventory-exceptions-are-requirements.signal.2.label": "المخرج",
    "blog.article.inventory-exceptions-are-requirements.signal.2.value": "أثر تدقيق",
    "blog.article.finance-close-handoffs.title": "تصميم الإقفال المالي حول نقاط التسليم الحقيقية",
    "blog.article.finance-close-handoffs.deck":
      "تعمل برمجيات نهاية الشهر أفضل عندما تعامل المطابقة والموافقات ومسارات التدقيق كنظام تشغيل واحد.",
    "blog.article.finance-close-handoffs.topic": "المحاسبة",
    "blog.article.finance-close-handoffs.readTime": "قراءة 6 دقائق",
    "blog.article.finance-close-handoffs.publishedAt": "مايو 2026",
    "blog.article.finance-close-handoffs.audience": "CFO، المحاسبة، المؤسسون",
    "blog.article.finance-close-handoffs.question":
      "أي مهام إغلاق تحتاج دليلا قبل أن يبدأ الفريق التالي؟",
    "blog.article.finance-close-handoffs.signal.0.label": "المحفز",
    "blog.article.finance-close-handoffs.signal.0.value": "مهمة إغلاق",
    "blog.article.finance-close-handoffs.signal.1.label": "المالك",
    "blog.article.finance-close-handoffs.signal.1.value": "المالية",
    "blog.article.finance-close-handoffs.signal.2.label": "المخرج",
    "blog.article.finance-close-handoffs.signal.2.value": "الدليل",
    "blog.article.warehouse-speed-order-model.title": "سرعة المستودع تبدأ من نموذج الطلب",
    "blog.article.warehouse-speed-order-model.deck":
      "مسارات الالتقاط وتخطيط الموجات ودقة الإرسال تعتمد كلها على قرارات تتم قبل أن يرى فريق الأرضية الطلب.",
    "blog.article.warehouse-speed-order-model.topic": "المستودع",
    "blog.article.warehouse-speed-order-model.readTime": "قراءة 4 دقائق",
    "blog.article.warehouse-speed-order-model.publishedAt": "مايو 2026",
    "blog.article.warehouse-speed-order-model.audience": "المستودع، اللوجستيات، التجارة",
    "blog.article.warehouse-speed-order-model.question":
      "ماذا يحتاج فريق الأرضية أن يعرف قبل وجود قائمة الالتقاط؟",
    "blog.article.warehouse-speed-order-model.signal.0.label": "المحفز",
    "blog.article.warehouse-speed-order-model.signal.0.value": "حالة الطلب",
    "blog.article.warehouse-speed-order-model.signal.1.label": "المالك",
    "blog.article.warehouse-speed-order-model.signal.1.value": "المستودع",
    "blog.article.warehouse-speed-order-model.signal.2.label": "المخرج",
    "blog.article.warehouse-speed-order-model.signal.2.value": "خطة الموجة",
    "blog.article.pos-data-is-operations-data.title": "بيانات نقاط البيع هي بيانات تشغيل",
    "blog.article.pos-data-is-operations-data.deck":
      "تصبح أنظمة التجزئة مفيدة عندما تقوم الإيصالات والمرتجعات والمخزون والتسويات بتحديث نموذج التشغيل نفسه.",
    "blog.article.pos-data-is-operations-data.topic": "نقاط البيع",
    "blog.article.pos-data-is-operations-data.readTime": "قراءة 5 دقائق",
    "blog.article.pos-data-is-operations-data.publishedAt": "أبريل 2026",
    "blog.article.pos-data-is-operations-data.audience": "التجزئة، المحاسبة، التجارة",
    "blog.article.pos-data-is-operations-data.question":
      "أي أحداث متجر يجب أن تحدث المخزون والمالية في الوقت نفسه؟",
    "blog.article.pos-data-is-operations-data.signal.0.label": "المحفز",
    "blog.article.pos-data-is-operations-data.signal.0.value": "حدث متجر",
    "blog.article.pos-data-is-operations-data.signal.1.label": "المالك",
    "blog.article.pos-data-is-operations-data.signal.1.value": "عمليات التجزئة",
    "blog.article.pos-data-is-operations-data.signal.2.label": "المخرج",
    "blog.article.pos-data-is-operations-data.signal.2.value": "دفتر مشترك",
    "blog.article.automation-needs-operators.title": "الأتمتة ما زالت تحتاج نموذج مشغل",
    "blog.article.automation-needs-operators.deck":
      "الأتمتة الجيدة تعرف من يملك الاستثناء، ومتى تتوقف، وما الدليل الذي سيحتاجه العمل لاحقا.",
    "blog.article.automation-needs-operators.topic": "الأتمتة",
    "blog.article.automation-needs-operators.readTime": "قراءة 6 دقائق",
    "blog.article.automation-needs-operators.publishedAt": "أبريل 2026",
    "blog.article.automation-needs-operators.audience": "العمليات، المنتج، التقنية",
    "blog.article.automation-needs-operators.question":
      "أين يجب أن تتوقف الأتمتة بدلا من التخمين؟",
    "blog.article.automation-needs-operators.signal.0.label": "المحفز",
    "blog.article.automation-needs-operators.signal.0.value": "كسر قاعدة",
    "blog.article.automation-needs-operators.signal.1.label": "المالك",
    "blog.article.automation-needs-operators.signal.1.value": "صاحب القرار",
    "blog.article.automation-needs-operators.signal.2.label": "المخرج",
    "blog.article.automation-needs-operators.signal.2.value": "تدفق مضبوط",
    "blog.cta.title": "أحضر تدفق العمل إلى الطاولة.",
    "blog.cta.copy": "إذا بدت مقالة قريبة من مشكلتك التشغيلية، أرسل لنا التدفق والأنظمة حوله.",
    "contact.hero.eyebrow": "تواصل معنا",
    "contact.hero.title": "أحضر لنا تدفق العمل أو فجوة النظام أو سلسلة الأدوات المنفصلة التي تبطئ الشركة.",
    "contact.hero.copy":
      "أخبرنا ما الذي يتعطل، وما الذي ينمو، وما الذي يجب أن يتصل. سنرسم أول محادثة مفيدة حول نظام التشغيل الحقيقي الذي يحتاجه فريقك.",
    "contact.method.email": "البريد",
    "contact.method.phone": "الهاتف",
    "contact.method.region": "المنطقة",
    "contact.method.emailValue": "info@traffodata.com",
    "contact.method.phoneValue": "حدد عبر البريد",
    "contact.method.regionValue": "عمليات دبي",
    "contact.form.website": "الموقع",
    "contact.form.name": "الاسم",
    "contact.form.email": "بريد العمل",
    "contact.form.company": "الشركة",
    "contact.form.services": "بماذا تحتاج مساعدة؟",
    "contact.form.servicesHelp": "اختر واحدا أو أكثر. سنوجه المحادثة.",
    "contact.form.message": "ما أول شيء يجب أن نفهمه؟",
    "contact.form.messageHelp":
      "شارك تدفق العمل والأدوات المنفصلة والموعد والأنظمة المعنية وما يجب أن تجيب عنه أول مكالمة مفيدة.",
    "contact.form.send": "إرسال الاستفسار",
    "contact.form.sending": "جار إرسال الاستفسار",
    "contact.form.sent": "تم إرسال الاستفسار. سنراجع التدفق ونرد بالخطوة التالية المناسبة.",
    "contact.form.manual": "إرسال البريد غير مهيأ بعد.",
    "contact.form.error": "تعذر إرسال الرسالة.",
    "contact.form.emailInstead": "أرسلها بالبريد بدلا من ذلك.",
    "contact.mailto.subject": "استفسار TRAFFODATA",
    "contact.mailto.name": "الاسم",
    "contact.mailto.email": "البريد",
    "contact.mailto.company": "الشركة",
    "contact.mailto.services": "الخدمات",
    "contact.inquiry.title": "استفسار جديد من TRAFFODATA",
    "contact.inquiry.name": "الاسم",
    "contact.inquiry.email": "البريد",
    "contact.inquiry.company": "الشركة",
    "contact.inquiry.companyMissing": "غير مذكور",
    "contact.inquiry.services": "الخدمات",
    "contact.inquiry.message": "الرسالة",
    "contact.inquiry.subject": "استفسار TRAFFODATA",
    "contact.validation.name": "أضف اسمك حتى نعرف لمن نرد.",
    "contact.validation.email": "استخدم بريد عمل صحيحا.",
    "contact.validation.services": "اختر مجالا واحدا على الأقل.",
    "contact.validation.message": "اكتب 20 حرفا على الأقل عن العمل.",
    "contact.service.erp": "منصة ERP",
    "contact.service.inventory": "المخزون والمستودعات",
    "contact.service.pos": "نقاط البيع والتجارة",
    "contact.service.accounting": "تدفقات المحاسبة",
    "contact.service.crm": "CRM والذكاء الاصطناعي",
    "contact.service.custom": "برمجيات مخصصة",
    "contact.service.unsure": "لست متأكدا بعد",
    "contact.next.title": "ماذا يحدث بعد ذلك.",
    "contact.next.one": "نراجع السياق التشغيلي ونرد بالخطوة التالية المناسبة.",
    "contact.next.two": "إذا كان هناك توافق، نرسم الأنظمة والمستخدمين والمخاطر وحدود أول إصدار.",
    "contact.next.three": "تخرج من أول محادثة بمسار أوضح، لا بعرض عام.",
  },
};

type I18nContextValue = {
  locale: Locale;
  direction: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
  tWithFallback: (key: string, fallback: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

function getInitialLocale() {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const stored = window.localStorage.getItem(localeStorageKey);
  if (isLocale(stored)) return stored;

  const browserLanguage = window.navigator.language.split("-")[0];
  return isLocale(browserLanguage) ? browserLanguage : DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const direction = localeDirections[locale];

  useEffect(() => {
    const root = document.documentElement;
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
    root.dataset.locale = locale;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [direction, locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (key: string) => translations[locale][key] ?? translations[DEFAULT_LOCALE][key] ?? key,
    [locale],
  );
  const tWithFallback = useCallback(
    (key: string, fallback: string) =>
      translations[locale][key] ??
      translations[DEFAULT_LOCALE][key] ??
      translateWorkItemFallback(locale, key, fallback),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, direction, setLocale, toggleLocale, t, tWithFallback }),
    [direction, locale, setLocale, t, tWithFallback, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
