import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogArticlePage } from "@/components/site/BlogArticlePage";
import { blogArticleSeo } from "@/components/site/seo";
import { getBlogArticle } from "@/components/site/blogData";

export const Route = createFileRoute("/ar/blog_/$slug")({
  beforeLoad: ({ params }) => {
    if (!getBlogArticle(params.slug)?.detailSections?.length) {
      throw notFound();
    }
  },
  head: ({ params }) => blogArticleSeo(getBlogArticle(params.slug), "ar"),
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <BlogArticlePage slug={slug} />;
}
