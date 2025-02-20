import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeAddClasses from "rehype-add-classes";

export const Route = createFileRoute("/docs/_l/$section/$sub")({
  beforeLoad: (ctx) => ({ breadcrumb: ctx.params.sub }),
  component: RouteComponent,
});

function RouteComponent() {
  const { sub } = Route.useParams();
  return (
    <div className="prose">
      <h1>{sub}</h1>
      <Markdown rawContent={`## Hello2\n\nWorld\n\n${sub} [asd](dsa)`} />
    </div>
  );
}

interface MarkdownProps {
  rawContent: string;
}

function Markdown({ rawContent }: MarkdownProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypeAddClasses, { "h2>a": "no-underline" }],
      ]}
    >
      {rawContent}
    </ReactMarkdown>
  );
}
