import {
  SidebarInset,
  SidebarProvider,
} from "@ethui/ui/components/shadcn/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DocsSidebar } from "./-sidebar";

export const Route = createFileRoute("/docs/_l")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <SidebarProvider
        style={{ "--sidebar-width": "18em" } as React.CSSProperties}
      >
        <DocsSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
