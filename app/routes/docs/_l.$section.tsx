import { titleize } from "#/utils/titleize";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/_l/$section")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.section) }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
