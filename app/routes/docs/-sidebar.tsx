import { ChevronRightIcon } from "lucide-react";

import { EthuiLogo } from "@ethui/ui/components/ethui-logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ethui/ui/components/shadcn/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@ethui/ui/components/shadcn/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import { docsManifest } from "./-manifest";
import { SearchForm } from "./-search-form";

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to="/docs"
              className="flex flex-row items-center justify-center"
            >
              <EthuiLogo fg="fill-foreground" bg="bg-transparent" />
              <span className="ml-2 font-bold text-2xl text-gray-900">
                ethui docs
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {docsManifest.sections.map(({ title, slug: sectionSlug, children }) => (
          <Collapsible
            key={title}
            title={title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="cursor-pointer">
                  {title}{" "}
                  <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenuSub>
                    {children.map(
                      ({ frontmatter: { title, slug: subsectionSlug } }) => {
                        const to = `/docs/${sectionSlug}/${subsectionSlug}`;
                        return (
                          <SidebarMenuSubItem key={to}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={currentPath === to}
                            >
                              <Link to={to}>{title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      },
                    )}
                  </SidebarMenuSub>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
