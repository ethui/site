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
import { ChevronRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { docsManifest } from "./-manifest";
import { SearchForm } from "./-search-form";

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedQuery) {
      return docsManifest.sections;
    }

    return docsManifest.sections
      .map((section) => {
        const sectionMatches = section.title
          .toLowerCase()
          .includes(normalizedQuery);
        if (sectionMatches) {
          return section;
        }

        const filteredChildren = section.children.filter(({ frontmatter }) =>
          frontmatter.title.toLowerCase().includes(normalizedQuery),
        );

        if (filteredChildren.length === 0) {
          return null;
        }

        return {
          ...section,
          children: filteredChildren,
        };
      })
      .filter(
        (section): section is (typeof docsManifest.sections)[number] =>
          section !== null,
      );
  }, [normalizedQuery]);

  const hasResults = filteredSections.length > 0;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/" className="flex flex-row items-center justify-center">
              <EthuiLogo fg="fill-foreground" bg="bg-transparent" />
              <span className="ml-2 font-bold text-2xl text-gray-900">
                ethui
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm value={query} onValueChange={setQuery} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {!hasResults && normalizedQuery && (
          <div className="px-4 py-6 text-muted-foreground text-sm">
            No docs match "{query}".
          </div>
        )}
        {filteredSections.map(({ title, slug: sectionSlug, children }) => (
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
