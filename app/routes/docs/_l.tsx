import {
  SidebarInset,
  SidebarProvider,
} from "@ethui/ui/components/shadcn/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { fetchDocsConfig } from "#/utils/docs";
import { DocsHeader } from "./-header";
import { DocsSidebar } from "./-sidebar";

export const Route = createFileRoute("/docs/_l")({
  beforeLoad: () => ({ breadcrumb: "Docs" }),
  loader: async () => {
    const config = await fetchDocsConfig({
      data: { org: "ethui", repo: "docs", filepath: "config.json" },
    });
    return { config };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { config } = Route.useLoaderData();
  return (
    <div className="flex flex-col">
      <SidebarProvider
        allowMobile
        style={{ "--sidebar-width": "18em" } as React.CSSProperties}
      >
        <DocsSidebar config={config} />
        <SidebarInset>
          <DocsHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
