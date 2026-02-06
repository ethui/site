import { createFileRoute } from "@tanstack/react-router";
import { Markdown } from "#/components/markdown";
import { NotFound } from "#/components/NotFound";
import { articleLinkedData, canonicalLink, seo } from "#/utils/seo";
import { blogManifest } from "./-manifest";

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

    let image: string | undefined;
    if (post.frontmatter.ogBanner) {
      const baseUrl = import.meta.env.VITE_VERCEL_URL
        ? `https://${import.meta.env.VITE_VERCEL_URL}`
        : "https://ethui.dev";
      image = new URL(post.frontmatter.ogBanner, baseUrl).href;
    }
    const title = post.frontmatter.title;
    const description =
      post.frontmatter.banner?.subtitle ||
      `${post.frontmatter.banner?.type || "Blog post"}`.trim();
    const path = `/blog/${params.slug}`;

    return {
      meta: seo({
        title: `${title} | ethui`,
        description,
        type: "article",
        image,
        url: path,
        article: {
          publishedTime: post.frontmatter.banner?.date,
          author: post.frontmatter.banner?.author,
        },
      }),
      links: [canonicalLink(path)],
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

  const description =
    post.frontmatter.banner?.subtitle ||
    `${post.frontmatter.banner?.type || "Blog post"}`.trim();
  const publishedDate = normalizeDate(post.frontmatter.banner?.date);
  const jsonLd = articleLinkedData({
    title: post.frontmatter.title,
    description,
    url: `/blog/${slug}`,
    image: post.frontmatter.ogBanner,
    datePublished: publishedDate,
    author: post.frontmatter.banner?.author,
  });

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Markdown className="mb-16">
        <post.default />
      </Markdown>
    </>
  );
}

function normalizeDate(dateValue?: string) {
  if (!dateValue) {
    return undefined;
  }

  const cleaned = dateValue.replace(/(\d+)(st|nd|rd|th)/g, "$1");
  const parsed = new Date(cleaned);

  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toISOString();
}
