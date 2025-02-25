import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeGithubEmoji from "rehype-github-emoji";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";

const classes = {
  "h1>a, h2>a, h3>a": "no-underline font-bold",
};

const remarkPlugins = [remarkFrontmatter];
const rehypePlugins: React.ComponentProps<
  typeof ReactMarkdown
>["rehypePlugins"] = [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypeAddClasses, classes],
    [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
    rehypeGithubAlerts,
    rehypeGithubEmoji,
  ];

export function Markdown({
  className,
  children,
}: { children: string; className?: string }) {
  return (
    <div className={clsx("prose", className)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
