import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
  component: () =>
    redirect({
      to: "/docs/$section/$subsection",
      params: { section: "getting-started", subsection: "what-is-ethui" },
    }),
});
