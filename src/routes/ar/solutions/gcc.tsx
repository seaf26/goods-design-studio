import { createFileRoute } from "@tanstack/react-router";

import { SolutionPage } from "@/components/site/SolutionPage";
import { solutionSeo } from "@/components/site/seo";

export const Route = createFileRoute("/ar/solutions/gcc")({
  head: () => solutionSeo("gcc", "ar"),
  component: () => <SolutionPage market="gcc" />,
});
