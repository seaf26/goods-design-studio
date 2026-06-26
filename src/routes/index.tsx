import { createFileRoute } from "@tanstack/react-router";
import { GoodsLanding } from "@/components/site/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRAFFODATA - The Operating System for Modern Enterprises" },
      { name: "description", content: "Premium ERP, inventory, warehouse, POS, accounting, CRM and HR software engineered for operators." },
      { property: "og:title", content: "TRAFFODATA - The Operating System for Modern Enterprises" },
      { property: "og:description", content: "Premium ERP, inventory, warehouse, POS, accounting, CRM and HR software engineered for operators." },
    ],
  }),
  component: GoodsLanding,
});
