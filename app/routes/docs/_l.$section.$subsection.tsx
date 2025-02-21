import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeSlug from "rehype-slug";
import { fetchDocFile } from "#/utils/docs";
import { titleize } from "#/utils/titleize";

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

const rehypePlugins: React.ComponentProps<
  typeof ReactMarkdown
>["rehypePlugins"] = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
  [rehypeAddClasses, { "h1>a, h2>a, h3>a": "no-underline font-bold" }],
];

function RouteComponent() {
  const { content } = Route.useLoaderData();
  return (
    <div className="prose p-4">
      <ReactMarkdown rehypePlugins={rehypePlugins}>{content}</ReactMarkdown>
    </div>
  );
}
