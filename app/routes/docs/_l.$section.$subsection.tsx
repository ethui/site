import { createFileRoute } from "@tanstack/react-router";
import { Markdown } from "#/components/markdown";
import { titleize } from "#/utils/titleize";
import { docsManifest } from "./-manifest";

export const Route = createFileRoute("/docs/_l/$section/$subsection")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.subsection) }),
  loader: async (ctx) => {
    const { section, subsection } = ctx.params;

    return docsManifest.sections
      .find(({ slug }) => slug === section)
      ?.children.find(({ attributes: { slug } }) => slug === subsection);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { markdown } = Route.useLoaderData();
  return (
    <Markdown className="mx-auto w-full max-w-[80ch] p-4 md:pt-8">
      {markdown}
    </Markdown>
  );
}
