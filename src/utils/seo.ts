const SITE_URL = "https://ethui.dev";
const SITE_NAME = "ethui";

export const seo = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  url,
  twitterCreator = "@ethuidev",
  twitterSite = "@ethuidev",
  article,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  type?: "website" | "article";
  url?: string;
  twitterCreator?: string;
  twitterSite?: string;
  article?: {
    publishedTime?: string;
    author?: string;
  };
}) => {
  const fullUrl = url ? `${SITE_URL}${url}` : undefined;

  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: twitterCreator },
    { name: "twitter:site", content: twitterSite },
    {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary",
    },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    ...(fullUrl ? [{ property: "og:url", content: fullUrl }] : []),
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { property: "og:image", content: image },
        ]
      : []),
    ...(article?.publishedTime
      ? [{ property: "article:published_time", content: article.publishedTime }]
      : []),
    ...(article?.author
      ? [{ property: "article:author", content: article.author }]
      : []),
  ];

  return tags.filter(
    (tag) =>
      ("content" in tag && tag.content !== undefined) ||
      ("title" in tag && tag.title !== undefined),
  );
};

export function canonicalLink(path: string) {
  return { rel: "canonical", href: `${SITE_URL}${path}` };
}

export function linkedData({ description }: { description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ethui",
    url: SITE_URL,
    operatingSystem: "macOS, Linux",
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    softwareVersion: "1.27.0", // TODO: get dynamically
    license: "https://opensource.org/licenses/MIT",
  };
}
