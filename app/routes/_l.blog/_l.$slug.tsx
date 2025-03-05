import { NotFound } from "#/components/NotFound";
import { createFileRoute } from "@tanstack/react-router";
import { blogManifest } from "./-manifest";
import { Markdown } from "#/components/markdown";

export const Route = createFileRoute("/_l/blog/_l/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <p>Blog</p>;
//const { slug } = Route.useParams();
//const post = blogManifest.find(
//  ({ frontmatter }) => frontmatter.slug === slug,
//);
//
//if (!post) {
//  return <NotFound />;
//}
//
//return (
//  <Markdown className="mb-16">
//    <post.default />
//  </Markdown>
//);
}
