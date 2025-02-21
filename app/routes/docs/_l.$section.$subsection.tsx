import { createFileRoute } from "@tanstack/react-router";
import { Markdown } from "#/components/markdown";
import { fetchDocFile } from "#/utils/docs";
import { titleize } from "#/utils/titleize";

export const Route = createFileRoute("/docs/_l/$section/$subsection")({
  beforeLoad: (ctx) => ({ breadcrumb: titleize(ctx.params.subsection) }),
  loader: async (ctx) => {
    const { section, subsection } = ctx.params;

    return await fetchDocFile({
      data: {
        org: "ethui",
        repo: "docs",
        filepath: `${section}/${subsection}.md`,
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { content } = Route.useLoaderData();
  return (
    <Markdown className="mx-auto w-full max-w-[80ch] p-4 md:pt-8">
      {content}
    </Markdown>
  );
}
