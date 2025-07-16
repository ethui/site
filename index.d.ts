declare module "#/assets/videos/ethui-multi.webm?url";
declare module "#/assets/videos/ethui-fast-mode.webm?url";
declare module "#/assets/videos/ethui-contracts.webm?url";
declare module "#/assets/videos/ethui-local.webm?url";

declare module "#/app.css?url";

declare module "#/*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { Toc } from "@stefanprobst/rehype-extract-toc";

  export const frontmatter: { title: string; slug: string };
  export const tableOfContents: Toc;
  export default () => ReactNode;
}
