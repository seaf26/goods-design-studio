import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/site/WorkPage";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Goods Software" },
      { name: "description", content: "Selected ERP, warehouse, accounting and commerce systems designed and engineered by Goods." },
      { property: "og:title", content: "Work — Goods Software" },
      { property: "og:description", content: "Selected ERP, warehouse, accounting and commerce systems designed and engineered by Goods." },
    ],
  }),
  component: WorkPage,
});
