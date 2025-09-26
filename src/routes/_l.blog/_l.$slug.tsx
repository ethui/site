import { createFileRoute } from "@tanstack/react-router";
import { Markdown } from "#/components/markdown";
import { NotFound } from "#/components/NotFound";
import { seo } from "#/utils/seo";
import { blogManifest } from "./-manifest";
import { bannerManifest } from "./-banner-manifest";

export const Route = createFileRoute("/_l/blog/_l/$slug")({
  component: RouteComponent,
  head: ({ params }) => {
    const post = blogManifest.find(
      ({ frontmatter }) => frontmatter.slug === params.slug,
    );
    
    if (!post) {
      return {
        meta: seo({
          title: "Post not found - ethui",
          description: "The requested blog post could not be found.",
        }),
      };
    }

    const bannerImage = bannerManifest[params.slug];
    const title = post.frontmatter.title;
    const description = post.frontmatter.banner?.subtitle || 
      `${post.frontmatter.banner?.type || 'Blog post'} - ${post.frontmatter.banner?.date || ''}`.trim();
    
    return {
      meta: seo({
        title: `${title} - ethui`,
        description,
        type: "article",
        image: bannerImage,
      }),
    };
  },
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
