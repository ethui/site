import { Link, createFileRoute } from "@tanstack/react-router";
import { blogManifest } from "./-manifest";

const postsList = blogManifest
  .slice()
  .reverse()
  .map(({ frontmatter }) => frontmatter);

export const Route = createFileRoute("/_l/blog/_l/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ul className="prose">
      {postsList.map(({ title, slug }) => (
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
