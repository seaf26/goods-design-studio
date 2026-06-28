import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/ContactPage";
import { contactSeo } from "@/components/site/seo";

export const Route = createFileRoute("/contact")({
  head: contactSeo,
  component: ContactPage,
});
