import { createFileRoute } from "@tanstack/react-router";
import { Markdown } from "#/components/markdown";
import { NotFound } from "#/components/NotFound";
import { TableOfContents } from "#/components/table-of-contents";
import { titleize } from "#/utils/titleize";
import { docsManifest } from "./-manifest";

export const Route = createFileRoute("/docs/_l/$section/$subsection")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.subsection) }),
  component: RouteComponent,
});

function RouteComponent() {
  const { section, subsection } = Route.useParams();

  const doc = docsManifest.sections
    .find(({ slug }) => slug === section)
    ?.children.find(({ frontmatter }) => frontmatter.slug === subsection);

  if (!doc) {
    return <NotFound />;
  }

  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <Markdown>
          <doc.default />
        </Markdown>
      </div>
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-8">
          <TableOfContents tableOfContents={doc.tableOfContents} />
        </div>
      </div>
    </div>
  );
}
