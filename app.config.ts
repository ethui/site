import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeGithubEmoji from "rehype-github-emoji";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import tsConfigPaths from "vite-tsconfig-paths";

const classes = {
  "h1>a, h2>a, h3>a": "no-underline font-bold",
};

export default defineConfig({
  server: {
    preset: "vercel",
    esbuild: { options: { supported: { "top-level-await": true } } },
  },
  vite: {
    plugins: [
      tailwindcss(),
      mdx({
        mdExtensions: [".mdx"],
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,

          [rehypeAddClasses, classes],
          [
            rehypeExternalLinks,
            { target: "_blank", rel: "noopener noreferrer" },
          ],
          rehypeGithubAlerts,
          rehypeGithubEmoji,
        ],
      }),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
