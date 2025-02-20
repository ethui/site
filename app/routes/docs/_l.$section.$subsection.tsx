import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeAddClasses from "rehype-class-names";
import { titleize } from "#/utils/titleize";
import { fetchRepoFile } from "#/utils/documents.server";

export const Route = createFileRoute("/docs/_l/$section/$subsection")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.subsection) }),
  loader: async (ctx) => {
    const { section, subsection } = ctx.params;

    console.log(ctx.location);
    const file = await fetchRepoFile({
      org: "ethui",
      repo: "docs",
      filepath: `${section}/${subsection}.md`,
    });

    console.log(file);
    return { content: file };
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
  console.log(content);
  return (
    <div className="prose p-4">
      <ReactMarkdown rehypePlugins={rehypePlugins}>{content}</ReactMarkdown>
    </div>
  );
}
