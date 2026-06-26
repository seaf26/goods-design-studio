import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/site/WorkPage";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work - TRAFFODATA Software" },
      { name: "description", content: "Selected ERP, warehouse, accounting and commerce systems designed and engineered by TRAFFODATA." },
      { property: "og:title", content: "Work - TRAFFODATA Software" },
      { property: "og:description", content: "Selected ERP, warehouse, accounting and commerce systems designed and engineered by TRAFFODATA." },
    ],
  }),
  component: WorkPage,
});
