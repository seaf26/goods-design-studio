import { createFileRoute } from "@tanstack/react-router";

import { ProjectDetailPage } from "@/components/site/ProjectDetailPage";
import { getWorkItem } from "@/components/site/workData";

export const Route = createFileRoute("/work_/$slug")({
  head: ({ params }) => {
    const project = getWorkItem(params.slug);
    const title = project && project.client !== project.title ? `${project.title} - ${project.client}` : project?.title ?? "Project - Goods Software";
    const description = project?.summary ?? "Project details for selected operational software work.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <ProjectDetailPage slug={slug} />;
}
