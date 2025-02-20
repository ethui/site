import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_l/")({
  loader: () =>
    redirect({
      href: "/docs/getting-started/what-is-ethui",
    }),
});
