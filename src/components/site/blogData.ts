import type { LucideIcon } from "lucide-react";
import { Boxes, Calculator, LineChart, PackageCheck, ScanBarcode, Truck } from "lucide-react";

export type BlogTopic = "ERP" | "Inventory" | "Warehouse" | "Accounting" | "POS" | "Automation";

export type BlogArticle = {
  slug: string;
  title: string;
  deck: string;
  topic: BlogTopic;
  readTime: string;
  publishedAt: string;
  audience: string;
  operatingQuestion: string;
  directAnswer?: { en: string; ar: string };
  evidence?: { label: { en: string; ar: string }; href: string }[];
  signals: { label: string; value: string }[];
  visual: "operations-board" | "warehouse-flow" | "finance-close" | "inventory-exceptions";
  icon: LucideIcon;
  detailSections?: string[];
  datePublished?: string;
  dateModified?: string;
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "warehouse-management-software-egypt",
    title: "Warehouse software in Egypt: how to choose a system operators will use",
    deck: "A practical buying guide for teams comparing warehouse software, inventory accuracy, barcode workflows, receiving, picking, and delivery operations in Egypt.",
    topic: "Warehouse",
    readTime: "8 min read",
    publishedAt: "September 2026",
    audience: "Warehouse, logistics, commerce",
    operatingQuestion: "Can the system show the next action before the order reaches the floor?",
    directAnswer: {
      en: "Choose warehouse software by testing the real receiving, picking, returns, and stock-adjustment flows with your operators. Require one traceable stock record across sales and dispatch, then validate barcode and integration needs before buying or building.",
      ar: "اختر برنامج المستودعات بعد تجربة الاستلام والالتقاط والمرتجعات وتسويات المخزون مع فريق التشغيل نفسه. اطلب سجلا واضحا لحركة المخزون بين البيع والشحن، ثم تحقق من احتياج الباركود والتكاملات قبل قرار الشراء أو البناء.",
    },
    evidence: [
      {
        label: {
          en: "Elnasser backend and logistics case study",
          ar: "دراسة حالة نظام الناصر الخلفي واللوجستي",
        },
        href: "/work/elnasser-backend-dashboard",
      },
    ],
    visual: "warehouse-flow",
    icon: Truck,
    detailSections: ["operating-question", "buying-criteria", "egypt-context", "decision"],
    datePublished: "2026-09-23",
    dateModified: "2026-09-26",
    signals: [
      { label: "Priority", value: "Traceability" },
      { label: "Control", value: "Stock truth" },
      { label: "Output", value: "Faster dispatch" },
    ],
  },
  {
    slug: "digital-storefront-egypt",
    title: "Digital storefronts in Egypt need an operating system behind them",
    deck: "A digital storefront is only the front door. The useful work happens when catalog, inventory, payments, delivery, and customer data stay connected.",
    topic: "ERP",
    readTime: "6 min read",
    publishedAt: "September 2026",
    audience: "Commerce, founders, operations",
    operatingQuestion: "What should update automatically when a customer places an order?",
    directAnswer: {
      en: "A storefront should create an order in the system that owns stock, payment state, fulfillment, and customer history. When these records are separate, the website can accept an order that the operation cannot reliably fulfill.",
      ar: "يجب أن ينشئ المتجر طلبا في النظام الذي يدير المخزون وحالة الدفع والتنفيذ وسجل العميل. عندما تبقى هذه البيانات منفصلة، قد يقبل الموقع طلبا لا تستطيع العملية تشغيله بثقة.",
    },
    evidence: [
      {
        label: {
          en: "WikiFood commerce backend case study",
          ar: "دراسة حالة النظام التجاري الخلفي لـ WikiFood",
        },
        href: "/work/wikifood-commerce-delivery-backend",
      },
    ],
    visual: "operations-board",
    icon: ScanBarcode,
    detailSections: ["front-door", "source-of-truth", "operating-loop", "decision"],
    datePublished: "2026-09-23",
    dateModified: "2026-09-26",
    signals: [
      { label: "Front door", value: "Storefront" },
      { label: "Source", value: "Live inventory" },
      { label: "Outcome", value: "Joined-up orders" },
    ],
  },
  {
    slug: "ecommerce-software-egypt",
    title: "Ecommerce software in Egypt: connect the storefront to the work behind it",
    deck: "A practical guide to ecommerce software in Egypt: catalog, cash on delivery, payments, inventory, delivery, and the operating data that keeps orders moving.",
    topic: "ERP",
    readTime: "7 min read",
    publishedAt: "September 2026",
    audience: "Commerce, founders, operations",
    operatingQuestion: "Does every order create one shared operational record?",
    directAnswer: {
      en: "For an Egypt ecommerce operation, evaluate software as one order flow: catalog, payment or cash on delivery, stock reservation, fulfillment, delivery, returns, and reconciliation. Connect those states before optimizing the storefront alone.",
      ar: "قيّم برمجيات التجارة الإلكترونية في مصر كتدفق طلب واحد يشمل الكتالوج والدفع أو الدفع عند الاستلام وحجز المخزون والتجهيز والتوصيل والمرتجعات والتسوية. اربط هذه الحالات قبل تحسين واجهة المتجر وحدها.",
    },
    evidence: [
      {
        label: {
          en: "WikiFood commerce and delivery implementation",
          ar: "تنفيذ WikiFood للتجارة والتوصيل",
        },
        href: "/work/wikifood-commerce-delivery-backend",
      },
    ],
    visual: "operations-board",
    icon: ScanBarcode,
    detailSections: [
      "storefront-is-not-system",
      "egypt-order-path",
      "integration-checklist",
      "decision",
    ],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "Demand", value: "COD + card" },
      { label: "Control", value: "Live stock" },
      { label: "Output", value: "Fewer handoffs" },
    ],
  },
  {
    slug: "laravel-rest-api-business-systems",
    title: "Laravel REST APIs for business systems: what to connect first",
    deck: "A practical guide to designing Laravel REST APIs for inventory, orders, payments, and mobile apps without turning every integration into a fragile handoff.",
    topic: "Automation",
    readTime: "7 min read",
    publishedAt: "September 2026",
    audience: "Product, engineering, operations",
    operatingQuestion: "Can every important business event be replayed, traced, and owned?",
    directAnswer: {
      en: "Start a Laravel business API with the records and events that other systems must trust: orders, stock changes, payments, and user permissions. Give each integration a clear owner, validation rules, and a safe way to retry failed events.",
      ar: "ابدأ واجهة Laravel للأعمال بالسجلات والأحداث التي تعتمد عليها الأنظمة الأخرى: الطلبات وتغيرات المخزون والمدفوعات والصلاحيات. حدد مالك كل تكامل وقواعد التحقق وطريقة آمنة لإعادة محاولة الأحداث الفاشلة.",
    },
    evidence: [
      {
        label: {
          en: "Printout Laravel REST API case study",
          ar: "دراسة حالة واجهة Laravel REST لمشروع Printout",
        },
        href: "/work/printout-laravel-rest-api",
      },
    ],
    visual: "operations-board",
    icon: PackageCheck,
    detailSections: [
      "start-with-events",
      "resource-boundaries",
      "mobile-and-partners",
      "production-readiness",
    ],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "Contract", value: "Clear resources" },
      { label: "Reliability", value: "Idempotent events" },
      { label: "Output", value: "Safer integrations" },
    ],
  },
  {
    slug: "custom-business-software-egypt",
    title: "Custom business software in Egypt: when the workflow is the product",
    deck: "How to decide whether custom business software is justified when spreadsheets, SaaS tools, and manual approvals no longer agree.",
    topic: "ERP",
    readTime: "6 min read",
    publishedAt: "September 2026",
    audience: "Founders, COOs, operations",
    operatingQuestion: "Is the bottleneck a missing feature, or a missing operating model?",
    directAnswer: {
      en: "Custom software is justified when a repeated business workflow cannot be handled reliably by existing tools and the cost of workarounds is clear. Map users, decisions, exceptions, integrations, and ownership before defining the first release.",
      ar: "يصبح بناء برنامج مخصص مبررا عندما تعجز الأدوات الحالية عن تشغيل تدفق عمل متكرر بثبات وتكون تكلفة الحلول الالتفافية واضحة. ارسم المستخدمين والقرارات والاستثناءات والتكاملات والمسؤولية قبل تحديد الإصدار الأول.",
    },
    visual: "operations-board",
    icon: LineChart,
    detailSections: ["signal-to-build", "map-before-code", "buy-and-build", "first-release"],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "Trigger", value: "Repeated exceptions" },
      { label: "Scope", value: "First release" },
      { label: "Outcome", value: "Owned workflow" },
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf-egypt",
    title: "Custom software vs off-the-shelf in Egypt: a practical decision guide",
    deck: "The honest way to compare ready-made software with a system built around your workflow, budget, team, and long-term ownership.",
    topic: "ERP",
    readTime: "7 min read",
    publishedAt: "September 2026",
    audience: "Founders, COOs, operations",
    operatingQuestion: "Where does the generic tool stop helping and start taxing the operation?",
    directAnswer: {
      en: "Buy an existing product when its standard workflow fits and ongoing configuration is manageable. Build when the business depends on a distinctive process, integrations, or ownership requirements that create persistent workarounds in off-the-shelf tools.",
      ar: "اشتر منتجا جاهزا عندما يناسب تدفقه المعتاد عملك ويمكن إدارة تهيئته مع الوقت. وابن نظاما مخصصا عندما تعتمد الشركة على عملية مميزة أو تكاملات أو متطلبات ملكية تفرض حلولا التفافية دائمة في الأدوات الجاهزة.",
    },
    visual: "operations-board",
    icon: LineChart,
    detailSections: ["start-with-ceiling", "total-cost", "ownership", "decision"],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "Question", value: "Buy or build" },
      { label: "Risk", value: "Workarounds" },
      { label: "Outcome", value: "Fit over features" },
    ],
  },
  {
    slug: "software-project-timeline-3-15-weeks",
    title: "Why custom software projects take 3 to 15 weeks",
    deck: "A clear way to think about software delivery timelines: what can ship in three weeks, what needs a longer runway, and what protects the first release.",
    topic: "Automation",
    readTime: "6 min read",
    publishedAt: "September 2026",
    audience: "Founders, product, operations",
    operatingQuestion: "What is the smallest release that changes the operation for the better?",
    directAnswer: {
      en: "A small, bounded workflow can reach a usable first release in a few weeks, while multi-role systems and external integrations need more time. Estimate after mapping decisions, data migration, approvals, testing, and launch responsibilities; do not treat 3–15 weeks as a guarantee.",
      ar: "قد يصل تدفق عمل صغير ومحدد إلى إصدار أول قابل للاستخدام خلال أسابيع قليلة، بينما تحتاج الأنظمة متعددة الأدوار والتكاملات الخارجية وقتا أطول. ضع التقدير بعد فهم القرارات وترحيل البيانات والموافقات والاختبار ومسؤوليات الإطلاق؛ ولا تتعامل مع نطاق 3 إلى 15 أسبوعا كضمان.",
    },
    visual: "operations-board",
    icon: PackageCheck,
    detailSections: ["scope-first", "three-week", "fifteen-week", "protect-the-timeline"],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "Range", value: "3–15 weeks" },
      { label: "Control", value: "Release boundary" },
      { label: "Output", value: "Working software" },
    ],
  },
  {
    slug: "post-launch-software-support-ownership",
    title: "Post-launch software support: who owns the system after release?",
    deck: "Why ownership, support, monitoring, and small improvements should be designed before custom software goes live.",
    topic: "Automation",
    readTime: "6 min read",
    publishedAt: "September 2026",
    audience: "Founders, operations, technology",
    operatingQuestion: "Who can explain the system when the business changes or something breaks?",
    directAnswer: {
      en: "Before launch, name who owns the code, hosting, credentials, monitoring, incident response, and next changes. A useful handover includes documentation, access, known limitations, and a support path the operating team can actually use.",
      ar: "قبل الإطلاق، حدد من يملك الشيفرة والاستضافة والصلاحيات والمراقبة والاستجابة للأعطال والتغييرات التالية. يشمل التسليم المفيد التوثيق والوصول والقيود المعروفة ومسار دعم يستطيع فريق التشغيل استخدامه فعلا.",
    },
    visual: "operations-board",
    icon: PackageCheck,
    detailSections: ["ownership-after-launch", "support-model", "handover", "measure-improvement"],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "After launch", value: "Named owner" },
      { label: "Response", value: "Clear support" },
      { label: "Outcome", value: "Durable system" },
    ],
  },
  {
    slug: "egypt-gulf-software-integrations",
    title: "Software integrations for Egypt and the Gulf: design for the real handoffs",
    deck: "Local payment, delivery, language, and operational requirements matter when a business software system needs to work across Egypt, the Gulf, and international teams.",
    topic: "ERP",
    readTime: "7 min read",
    publishedAt: "September 2026",
    audience: "Commerce, logistics, operations",
    operatingQuestion: "Which local rule or partner can change the state of the business?",
    directAnswer: {
      en: "Design Egypt and GCC integrations country by country. Map payment, delivery, language, and tax-document handoffs first; then verify the applicable e-invoicing interfaces against each authority's current guidance before committing to an implementation.",
      ar: "صمم تكاملات مصر والخليج لكل دولة على حدة. ارسم انتقالات الدفع والتوصيل واللغة والمستندات الضريبية أولا، ثم تحقق من واجهات الفوترة الإلكترونية المطلوبة عبر الإرشادات الحالية لكل جهة رسمية قبل الالتزام بالتنفيذ.",
    },
    evidence: [
      {
        label: {
          en: "Egyptian Tax Authority integration APIs",
          ar: "واجهات التكامل لدى مصلحة الضرائب المصرية",
        },
        href: "https://sdk.invoicing.eta.gov.eg/api/",
      },
      {
        label: {
          en: "Saudi ZATCA e-invoicing guidance",
          ar: "إرشادات الفوترة الإلكترونية لدى هيئة الزكاة والضريبة والجمارك",
        },
        href: "https://zatca.gov.sa/en/E-Invoicing/Introduction/Guidelines/Pages/default.aspx",
      },
      {
        label: {
          en: "UAE Ministry of Finance e-invoicing guidance",
          ar: "إرشادات الفوترة الإلكترونية لدى وزارة المالية الإماراتية",
        },
        href: "https://mof.gov.ae/en/about-us/initiatives/einvoicing/",
      },
    ],
    visual: "warehouse-flow",
    icon: Truck,
    detailSections: [
      "local-reality",
      "integration-boundaries",
      "regional-readiness",
      "international-without-generic",
    ],
    datePublished: "2026-09-24",
    dateModified: "2026-09-26",
    signals: [
      { label: "Reach", value: "Egypt + Gulf" },
      { label: "Control", value: "Owned integrations" },
      { label: "Output", value: "Fewer surprises" },
    ],
  },
  {
    slug: "before-another-dashboard",
    title: "What operators need before another dashboard",
    deck: "A practical look at approvals, stock events, and finance rules that should be mapped before interface design starts.",
    topic: "ERP",
    readTime: "7 min read",
    publishedAt: "June 2026",
    audience: "COO, finance, product",
    operatingQuestion: "Which handoffs should the system make impossible to miss?",
    visual: "operations-board",
    icon: LineChart,
    signals: [
      { label: "Handoffs", value: "Approvals" },
      { label: "Risk", value: "Exceptions" },
      { label: "Output", value: "Release map" },
    ],
  },
  {
    slug: "inventory-exceptions-are-requirements",
    title: "Inventory exceptions are product requirements",
    deck: "Variance, damaged stock, and partial receipts reveal the workflows generic inventory tools usually hide.",
    topic: "Inventory",
    readTime: "5 min read",
    publishedAt: "June 2026",
    audience: "Inventory, warehouse, finance",
    operatingQuestion: "What should happen when the count, receipt, and invoice disagree?",
    visual: "inventory-exceptions",
    icon: Boxes,
    signals: [
      { label: "Trigger", value: "Mismatch" },
      { label: "Owner", value: "Ops lead" },
      { label: "Output", value: "Audit trail" },
    ],
  },
  {
    slug: "finance-close-handoffs",
    title: "Designing finance closes around real handoffs",
    deck: "Month-end software works best when reconciliation, approvals, and audit trails are treated as one operating system.",
    topic: "Accounting",
    readTime: "6 min read",
    publishedAt: "May 2026",
    audience: "CFO, accounting, founders",
    operatingQuestion: "Which close tasks need evidence before the next team starts?",
    visual: "finance-close",
    icon: Calculator,
    signals: [
      { label: "Trigger", value: "Close task" },
      { label: "Owner", value: "Finance" },
      { label: "Output", value: "Evidence" },
    ],
  },
  {
    slug: "warehouse-speed-order-model",
    title: "Warehouse speed starts in the order model",
    deck: "Pick paths, wave planning, and dispatch accuracy all depend on decisions made before the floor sees the order.",
    topic: "Warehouse",
    readTime: "4 min read",
    publishedAt: "May 2026",
    audience: "Warehouse, logistics, commerce",
    operatingQuestion: "What does the floor need to know before a pick list exists?",
    visual: "warehouse-flow",
    icon: Truck,
    signals: [
      { label: "Trigger", value: "Order state" },
      { label: "Owner", value: "Warehouse" },
      { label: "Output", value: "Wave plan" },
    ],
  },
  {
    slug: "pos-data-is-operations-data",
    title: "POS data is operations data",
    deck: "Retail systems become useful when receipts, returns, stock, and settlement all update the same operating model.",
    topic: "POS",
    readTime: "5 min read",
    publishedAt: "April 2026",
    audience: "Retail, accounting, commerce",
    operatingQuestion: "Which store events should update stock and finance at the same time?",
    visual: "operations-board",
    icon: ScanBarcode,
    signals: [
      { label: "Trigger", value: "Store event" },
      { label: "Owner", value: "Retail ops" },
      { label: "Output", value: "Shared ledger" },
    ],
  },
  {
    slug: "automation-needs-operators",
    title: "Automation still needs an operator model",
    deck: "Good automation knows who owns an exception, when to stop, and what evidence the business needs later.",
    topic: "Automation",
    readTime: "6 min read",
    publishedAt: "April 2026",
    audience: "Ops, product, technology",
    operatingQuestion: "Where should automation pause instead of guessing?",
    visual: "inventory-exceptions",
    icon: PackageCheck,
    signals: [
      { label: "Trigger", value: "Rule break" },
      { label: "Owner", value: "Decision maker" },
      { label: "Output", value: "Controlled flow" },
    ],
  },
];

export const blogTopics: BlogTopic[] = [
  "ERP",
  "Inventory",
  "Warehouse",
  "Accounting",
  "POS",
  "Automation",
];

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}
