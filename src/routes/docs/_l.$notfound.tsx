import { createFileRoute } from "@tanstack/react-router"
import { NotFound } from "#/components/NotFound";

export const Route = createFileRoute("/docs/_l/$notfound")({
  component: NotFound,
});
