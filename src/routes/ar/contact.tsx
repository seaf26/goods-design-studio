import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/site/ContactPage";
import { contactSeo } from "@/components/site/seo";

export const Route = createFileRoute("/ar/contact")({
  head: () => contactSeo("ar"),
  component: ContactPage,
});
