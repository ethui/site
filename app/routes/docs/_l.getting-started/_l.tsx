import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_l/getting-started/_l")({
  beforeLoad: () => ({ breadcrumb: "Getting started" }),
});
