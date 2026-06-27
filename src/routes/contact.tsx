import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us - TRAFFODATA Software" },
      {
        name: "description",
        content:
          "Talk to TRAFFODATA about ERP, inventory, warehouse, POS, accounting, CRM, AI, and custom software systems.",
      },
      { property: "og:title", content: "Contact Us - TRAFFODATA Software" },
      {
        property: "og:description",
        content:
          "Talk to TRAFFODATA about ERP, inventory, warehouse, POS, accounting, CRM, AI, and custom software systems.",
      },
    ],
  }),
  component: ContactPage,
});
