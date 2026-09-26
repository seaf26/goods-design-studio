import { createFileRoute } from "@tanstack/react-router";

import { GoodsLanding } from "@/components/site/Landing";
import { homeSeo } from "@/components/site/seo";

export const Route = createFileRoute("/ar/")({
  head: () => homeSeo("ar"),
  component: GoodsLanding,
});
