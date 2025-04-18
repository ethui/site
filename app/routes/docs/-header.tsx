import {
  SidebarTrigger,
  useSidebar,
} from "@ethui/ui/components/shadcn/sidebar";
import { Breadcrumbs } from "#/components/breadcrumbs";

export function DocsHeader() {
  const sidebar = useSidebar();
  return (
    <header className="flex shrink-0 items-center gap-2 border-b p-4">
      {sidebar.isMobile && <SidebarTrigger className="cursor-pointer" />}
      <Breadcrumbs />
    </header>
  );
}
