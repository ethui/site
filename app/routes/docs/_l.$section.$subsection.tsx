import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "#/components/NotFound";
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
    ?.children.find(({ frontmatter }) => frontmatter.slug === subsection)!;

  if (!doc) {
    return <NotFound />;
  }

  return <doc.default />;
}
