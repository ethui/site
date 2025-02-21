import { createFileRoute } from "@tanstack/react-router";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeSlug from "rehype-slug";
import { fetchDocFile } from "#/utils/docs";
import { titleize } from "#/utils/titleize";
import { Markdown } from "#/components/markdown";

export const Route = createFileRoute("/docs/_l/$section/$subsection")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.subsection) }),
  loader: async (ctx) => {
    const { section, subsection } = ctx.params;

    return await fetchDocFile({
      data: {
        org: "ethui",
        repo: "docs",
        filepath: `${section}/${subsection}.md`,
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { content } = Route.useLoaderData();
  return <Markdown className="mx-auto max-w-3xl px-4 py-8">{content}</Markdown>;
}
