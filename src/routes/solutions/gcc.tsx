import { createFileRoute } from "@tanstack/react-router";

import { SolutionPage } from "@/components/site/SolutionPage";
import { solutionSeo } from "@/components/site/seo";

export const Route = createFileRoute("/solutions/gcc")({
  head: () => solutionSeo("gcc"),
  component: () => <SolutionPage market="gcc" />,
});
