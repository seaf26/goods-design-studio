import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/components/site/BlogPage";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - TRAFFODATA Software" },
      {
        name: "description",
        content:
          "Operational essays on ERP, inventory, warehouse, POS, accounting, CRM, automation, and durable business software.",
      },
      { property: "og:title", content: "Blog - TRAFFODATA Software" },
      {
        property: "og:description",
        content:
          "Operational essays on ERP, inventory, warehouse, POS, accounting, CRM, automation, and durable business software.",
      },
    ],
  }),
  component: BlogPage,
});
