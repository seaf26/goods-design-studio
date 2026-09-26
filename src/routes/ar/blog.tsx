import { createFileRoute } from "@tanstack/react-router";

import { BlogPage } from "@/components/site/BlogPage";
import { blogSeo } from "@/components/site/seo";

export const Route = createFileRoute("/ar/blog")({
  head: () => blogSeo("ar"),
  component: BlogPage,
});
