import { createFileRoute } from "@tanstack/react-router";
import WhatisEthui from "#/docs/01-getting-started/01-what-is-ethui.mdx";

export const Route = createFileRoute(
  "/docs/_l/getting-started/_l/what-is-ethui",
)({
  beforeLoad: () => ({ breadcrumb: "What is ethui?" }),
  component: WhatisEthui,
});
