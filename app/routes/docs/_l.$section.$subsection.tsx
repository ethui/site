import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeAddClasses from "rehype-class-names";
import { titleize } from "#/utils/titleize";

export const Route = createFileRoute("/docs/_l/$section/$subsection")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.subsection) }),
  loader: async (ctx) => {
    const { section, subsection } = ctx.params;

    console.log(ctx.location);
    const url = `http://localhost:3000/raw-docs/${section}/${subsection}.md`;
    console.log(url);
    const response = await fetch(url);
    return { content: await response.text() };
  },
  component: RouteComponent,
});

const rehypePlugins: React.ComponentProps<
  typeof ReactMarkdown
>["rehypePlugins"] = [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypeAddClasses, { "h2>a": "no-underline" }],
  ];

function RouteComponent() {
  const { content } = Route.useLoaderData();
  console.log(content);
  const { subsection } = Route.useParams();
  return (
    <div className="prose">
      <ReactMarkdown rehypePlugins={rehypePlugins}>{content}</ReactMarkdown>
    </div>
  );
}
