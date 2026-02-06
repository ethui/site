import {
  SidebarInset,
  SidebarProvider,
} from "@ethui/ui/components/shadcn/sidebar";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { AnimatedOutlet } from "#/components/animated-outlet";
import { breadcrumbLinkedData } from "#/utils/seo";
import { DocsHeader } from "./-header";
import { DocsSidebar } from "./-sidebar";

export const Route = createFileRoute("/docs/_l")({
  beforeLoad: () => ({ breadcrumb: "Docs" }),
  component: RouteComponent,
});

function RouteComponent() {
  const matches = useRouterState({ select: (s) => s.matches });
  const breadcrumbs = matches.reduce(
    (acc, { context, pathname }) => {
      if (
        context &&
        typeof context === "object" &&
        "breadcrumb" in context &&
        typeof context.breadcrumb === "string" &&
        context.breadcrumb !== acc[acc.length - 1]?.label
      ) {
        acc.push({ label: context.breadcrumb, path: pathname });
      }
      return acc;
    },
    [] as { label: string; path: string }[],
  );
  const breadcrumbJsonLd =
    breadcrumbs.length > 0 ? breadcrumbLinkedData(breadcrumbs) : null;

  return (
    <div className="flex flex-col">
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
      <SidebarProvider
        allowMobile
        style={{ "--sidebar-width": "18em" } as React.CSSProperties}
      >
        <DocsSidebar />
        <SidebarInset>
          <DocsHeader />
          <div className="prose mx-auto w-full max-w-[100ch] p-4 md:pt-8">
            <AnimatedOutlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
