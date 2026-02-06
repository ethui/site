import { Label } from "@ethui/ui/components/shadcn/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@ethui/ui/components/shadcn/sidebar";
import { Search } from "lucide-react";

interface SearchFormProps extends React.ComponentProps<"form"> {
  value: string;
  onValueChange: (value: string) => void;
}

export function SearchForm({
  value,
  onValueChange,
  ...props
}: SearchFormProps) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            className="pl-8"
            type="search"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
