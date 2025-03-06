import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_l/blog/_l")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto md:max-w-3xl">
      <Outlet />
    </div>
  );
}
