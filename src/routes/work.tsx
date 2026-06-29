import { createFileRoute } from "@tanstack/react-router";

import { WorkPage } from "@/components/site/WorkPage";
import { workSeo } from "@/components/site/seo";
import { workItems } from "@/components/site/workData";

export const Route = createFileRoute("/work")({
  head: () => workSeo(workItems),
  component: WorkPage,
});
