export const seo = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  twitterCreator = "@naps62",
  twitterSite = "@naps62",
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  type?: "website" | "article";
  twitterCreator?: string;
  twitterSite?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: twitterCreator },
    { name: "twitter:site", content: twitterSite },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: image },
        ]
      : []),
  ];

  return tags.filter((tag) => tag.content || tag.title);
};

export function linkedData({ description }: { description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ethui",
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
