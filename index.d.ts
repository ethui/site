declare module "#/assets/videos/ethui-multi.webm?url";
declare module "#/assets/videos/ethui-fast-mode.webm?url";
declare module "#/assets/videos/ethui-contracts.webm?url";
declare module "#/assets/videos/ethui-local.webm?url";

declare module "#/app.css?url";

declare module "#/docs/*.md" {
  export default {
    attributes: Record<string, string>,
    markdown: string,
  };
}
