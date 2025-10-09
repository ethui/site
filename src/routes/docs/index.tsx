import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/")({
  loader: () => {
    throw redirect({
      to: "/docs/$section/$subsection",
      params: { section: "getting-started", subsection: "what-is-ethui" },
    });
  },
});
