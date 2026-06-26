import { createFileRoute } from "@tanstack/react-router";

import { ProjectDetailPage } from "@/components/site/ProjectDetailPage";
import { projectSeo } from "@/components/site/seo";
import { getWorkItem } from "@/components/site/workData";

export const Route = createFileRoute("/work_/$slug")({
  head: ({ params }) => projectSeo(getWorkItem(params.slug)),
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <ProjectDetailPage slug={slug} />;
}
