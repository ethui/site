import { redirect, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
  loader: () =>
    redirect({
      to: "/docs/$section/$subsection",
      params: { section: "getting-started", subsection: "what-is-ethui" },
    }),
});
