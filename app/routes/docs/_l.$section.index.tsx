import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_l/$section/")({
  loader: () => redirect({ to: "/docs/getting-started/what-is-ethui" }),
});
