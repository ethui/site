import { Breadcrumbs } from "#/components/breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ethui/ui/components/shadcn/breadcrumb";
import { SidebarTrigger } from "@ethui/ui/components/shadcn/sidebar";

export function DocsHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Breadcrumbs />
    </header>
  );
}
