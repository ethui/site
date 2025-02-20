import {
  SidebarInset,
  SidebarProvider,
} from "@ethui/ui/components/shadcn/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DocsSidebar } from "./-sidebar";
import { DocsHeader } from "./-header";

export const Route = createFileRoute("/docs/_l")({
  beforeLoad: () => ({ breadcrumb: "Docs" }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <SidebarProvider
        allowMobile
        style={{ "--sidebar-width": "18em" } as React.CSSProperties}
      >
        <DocsSidebar />
        <SidebarInset>
          <DocsHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
