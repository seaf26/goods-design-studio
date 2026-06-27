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
  signals: { label: string; value: string }[];
  visual: "operations-board" | "warehouse-flow" | "finance-close" | "inventory-exceptions";
  icon: LucideIcon;
};

export const blogArticles: BlogArticle[] = [
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
