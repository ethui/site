import { createFileRoute } from "@tanstack/react-router"
import { NotFound } from "#/components/NotFound";
import { Markdown } from "#/components/markdown";
import { blogManifest } from "./-manifest";

export const Route = createFileRoute("/_l/blog/_l/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const post = blogManifest.find(
    ({ frontmatter }) => frontmatter.slug === slug,
  );

  if (!post) {
    return <NotFound />;
  }

  return (
    <Markdown className="mb-16">
      <post.default />
    </Markdown>
  );
}
