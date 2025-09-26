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
  console.log("seo", title, image);
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: twitterCreator },
    { name: "twitter:site", content: twitterSite },
    { name: "og:type", content: type },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),
  ];

  return tags.filter(tag => tag.content || tag.title);
};
