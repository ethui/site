import { createFileRoute } from "@tanstack/react-router";
import { DocsHeader } from "../-header";

export const Route = createFileRoute("/docs/_l/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <DocsHeader />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
}
