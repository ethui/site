import {
  SidebarInset,
  SidebarProvider,
} from "@ethui/ui/components/shadcn/sidebar";
import { MDXProvider } from "@mdx-js/react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DocsHeader } from "./-header";
import { DocsSidebar } from "./-sidebar";

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
          <MDXProvider>
            <div className="prose mx-auto w-full max-w-[80ch] p-4 md:pt-8">
              <Outlet />
            </div>
          </MDXProvider>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
