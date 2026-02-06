import { createFileRoute, Link } from "@tanstack/react-router";
import { canonicalLink, seo } from "#/utils/seo";
import { blogManifest } from "./-manifest";

const postsList = blogManifest
  .slice()
  .reverse()
  .map(({ frontmatter }) => frontmatter);

export const Route = createFileRoute("/_l/blog/_l/")({
  component: RouteComponent,
  head: () => ({
    meta: seo({
      title: "Blog | ethui",
      description:
        "Latest updates, release notes, and development insights from the ethui team.",
      url: "/blog",
    }),
    links: [canonicalLink("/blog")],
  }),
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
