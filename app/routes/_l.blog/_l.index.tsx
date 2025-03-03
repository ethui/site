import { createFileRoute, Link } from "@tanstack/react-router";
import { blogManifest } from "./-manifest";

export const Route = createFileRoute("/_l/blog/_l/")({
  loader: () =>
    blogManifest
      .slice()
      .reverse()
      .map(({ frontmatter }) => frontmatter),
  component: RouteComponent,
});

function RouteComponent() {
  const posts = Route.useLoaderData();

  return (
    <ul className="prose">
      {posts.map(({ title, slug }) => (
        <li key={slug} className="border-b pb-2">
          <Link
            to="/blog/$slug"
            params={{ slug }}
            className="text-lg font-medium hover:text-primary transition-colors no-underline"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
