import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeSlug from "rehype-slug";

const classes = {
  "h1>a, h2>a, h3>a": "no-underline font-bold",
};

const rehypePlugins: React.ComponentProps<
  typeof ReactMarkdown
>["rehypePlugins"] = [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypeAddClasses, classes],
  ];

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose p-4">
      <ReactMarkdown rehypePlugins={rehypePlugins}>{children}</ReactMarkdown>
    </div>
  );
}
