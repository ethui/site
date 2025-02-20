import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_l/$section")({
  beforeLoad: (ctx) => ({ breadcrumb: ctx.params.section }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
