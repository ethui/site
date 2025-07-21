import { cn } from "@ethui/ui/lib/utils";
import { useEffect, useState } from "react";

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

interface TableOfContentsProps {
  className?: string;
  tableOfContents?: Array<TocEntry>;
}

export function TableOfContents({
  className,
  tableOfContents,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) {
      return;
    }

    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      },
    );

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderTocItem = (item: TocEntry) => {
    if (!item.id) {
      return null;
    }

    return (
      <li key={item.id}>
        <button
          type="button"
          onClick={() => scrollToHeading(item.id!)}
          className={cn(
            "block w-full text-left text-xs transition-colors hover:text-foreground",
            activeId === item.id
              ? "border-l-primary text-foreground"
              : "text-muted-foreground hover:border-l-muted-foreground/50",
          )}
        >
          {item.value}
        </button>
        <ul className="list-none space-y-1 pl-2">
          {item?.children?.map(renderTocItem)}
        </ul>
      </li>
    );
  };

  if (!tableOfContents || tableOfContents.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <ul className="list-none pl-3">{tableOfContents.map(renderTocItem)}</ul>
    </div>
  );
}
