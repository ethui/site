import { createFileRoute, Link } from "@tanstack/react-router";
import { blogManifest } from "./-manifest";

export const Route = createFileRoute("/_l/blog/_l/")({
  loader: () => blogManifest.reverse().map(({ frontmatter }) => frontmatter),
  component: RouteComponent,
});

function RouteComponent() {
  const posts = Route.useLoaderData();

  return (
    <ul className="prose">
      {posts.map(({ title, slug }) => (
        <li key={slug}>
          <Link to="/blog/$slug" params={{ slug }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
