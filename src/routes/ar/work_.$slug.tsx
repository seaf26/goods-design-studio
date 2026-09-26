import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProjectDetailPage } from "@/components/site/ProjectDetailPage";
import { projectSeo } from "@/components/site/seo";
import { getWorkItem } from "@/components/site/workData";

export const Route = createFileRoute("/ar/work_/$slug")({
  beforeLoad: ({ params }) => {
    if (!getWorkItem(params.slug)) {
      throw notFound();
    }
  },
  head: ({ params }) => projectSeo(getWorkItem(params.slug), "ar"),
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <ProjectDetailPage slug={slug} />;
}
