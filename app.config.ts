import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import mdPlugin, { Mode } from "vite-plugin-markdown";
import tsConfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeGithubEmoji from "rehype-github-emoji";
import rehypeSlug from "rehype-slug";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  server: { preset: "vercel" },
  vite: {
    plugins: [
      tailwindcss(),
      mdx({
        mdExtensions: [".mdx"],
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          rehypeAddClasses,
          rehypeExternalLinks,
          rehypeGithubAlerts,
          rehypeGithubEmoji,
        ],
      }),
      mdPlugin.default({ mode: [Mode.MARKDOWN] }),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
