import clsx from "clsx";
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

export function Markdown({
  className,
  children,
}: { children: string; className?: string }) {
  return (
    <div className={clsx("prose", className)}>
      <ReactMarkdown rehypePlugins={rehypePlugins}>{children}</ReactMarkdown>
    </div>
  );
}
