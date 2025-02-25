declare module "#/assets/videos/ethui-multi.webm?url";
declare module "#/assets/videos/ethui-fast-mode.webm?url";
declare module "#/assets/videos/ethui-contracts.webm?url";
declare module "#/assets/videos/ethui-local.webm?url";

declare module "#/app.css?url";

declare module "#/docs/*.md" {
  export const title: string;
  export const slug: string;
  export { MDXContent as default } from "mdx/types";
}
A;
declare module "#/docs/*.mdx" {
  export const frontmatter: { title: string; slug: string };
  const Component: React.ComponentType;
  export default Component;
}
