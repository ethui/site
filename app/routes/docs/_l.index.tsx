import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_l/")({
  loader: () => redirect({ to: "/docs/getting-started/what-is-ethui" }),
});
