import { NotFound } from "#/components/NotFound";
import { MDXProvider } from "@mdx-js/react";
import { createFileRoute } from "@tanstack/react-router";
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
    <MDXProvider>
      <post.default />
    </MDXProvider>
  );
}
