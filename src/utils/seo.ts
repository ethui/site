const SITE_URL = "https://ethui.dev";
const SITE_NAME = "ethui";
const DEFAULT_DOWNLOAD_URL = "https://github.com/ethui/ethui/releases/latest";
const DEFAULT_SCREENSHOT = `${SITE_URL}/opengraph/default.png`;
const DEFAULT_SOFTWARE_VERSION = import.meta.env.VITE_ETHUI_VERSION || "latest";

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
    downloadUrl: DEFAULT_DOWNLOAD_URL,
    screenshot: DEFAULT_SCREENSHOT,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description,
    softwareVersion: DEFAULT_SOFTWARE_VERSION,
    license: "https://opensource.org/licenses/MIT",
  };
}

export function articleLinkedData({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    author: author
      ? {
          "@type": "Person",
          name: author,
        }
      : {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${url}`,
    },
  };
}

export function breadcrumbLinkedData(items: { label: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
