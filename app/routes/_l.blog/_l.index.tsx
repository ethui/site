import { createFileRoute, Link } from "@tanstack/react-router";
import { blogManifest } from "./-manifest";

export const Route = createFileRoute("/_l/blog/_l/")({
  //loader: () =>
  //  blogManifest
  //    .slice()
  //    .reverse()
  //    .map(({ frontmatter }) => frontmatter),
  component: RouteComponent,
});

function RouteComponent() {
  //const posts = Route.useLoaderData();
  const posts = [];

  return (
    <ul className="prose">
      {posts.map(({ title, slug }) => (
        <li key={slug} className="border-b pb-2">
          <Link
            to="/blog/$slug"
            params={{ slug }}
            className="font-medium text-lg no-underline transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
