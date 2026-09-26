import { createFileRoute } from "@tanstack/react-router";

import { SolutionPage } from "@/components/site/SolutionPage";
import { solutionSeo } from "@/components/site/seo";

export const Route = createFileRoute("/ar/solutions/egypt")({
  head: () => solutionSeo("egypt", "ar"),
  component: () => <SolutionPage market="egypt" />,
});
