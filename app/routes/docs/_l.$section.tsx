import { Outlet, createFileRoute } from "@tanstack/react-router";
import { titleize } from "#/utils/titleize";

export const Route = createFileRoute("/docs/_l/$section")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.section) }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
