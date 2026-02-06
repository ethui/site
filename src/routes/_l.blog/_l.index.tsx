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
    <div className="flex flex-col gap-6">
      <header className="prose">
        <h1>Blog</h1>
        <p>
          Product updates, release notes, and behind-the-scenes development
          stories from the ethui team.
        </p>
      </header>
      <div className="grid gap-6">
        {postsList.map(({ title, slug, banner, ogBanner, bannerImage }) => (
          <article key={slug} className="border">
            <Link
              to="/blog/$slug"
              params={{ slug }}
              className="block no-underline"
            >
              <div className="grid gap-4 md:grid-cols-[140px_1fr] md:items-stretch">
                {(bannerImage || ogBanner) && (
                  <img
                    src={bannerImage || ogBanner}
                    alt={`${title} banner`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="space-y-2 p-4">
                  {banner?.date && (
                    <p className="text-gray-500 text-sm">{banner.date}</p>
                  )}
                  <h2 className="font-semibold text-gray-900 text-xl">
                    {title}
                  </h2>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
