import mdx from "@mdx-js/rollup";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeAddClasses from "rehype-class-names";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeGithubEmoji from "rehype-github-emoji";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const classes = {
  "h1>a, h2>a, h3>a": "no-underline font-bold",
};

export default defineConfig({
  plugins: [
    devtools(),
    nitro({ preset: "vercel" }),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    mdx({
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],

        [rehypeAddClasses, classes],
        [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
        rehypeGithubAlerts,
        rehypeGithubEmoji,
        rehypeMdxImportMedia,
        withToc,
        withTocExport,
      ],
    }),
    viteReact(),
    tailwindcss(),
  ],
});
