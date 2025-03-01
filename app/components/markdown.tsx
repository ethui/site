import { fetchOEmbedHtml } from "#/utils/oembed";
import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

const components = { img: Image, Youtube, Embed };

export function Markdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose max-w-full">
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
}

function Image({
  src,
  alt,
  className = "",
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      className={clsx("mx-auto", className)}
      {...props}
      src={src}
      alt={"asd"}
    />
  );
}

function Youtube({ id }: { id: string }) {
  return (
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="mx-auto"
    />
  );
}

interface EmbedProps {
  url: string;
}

function Embed({ url }: EmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);

  useEffect(() => {
    fetchOEmbedHtml(url)
      .then((html) => setEmbedHtml(html))
      .catch((error) =>
        console.error(`Failed to fetch oEmbed for ${url}:`, error),
      );
  }, [url]);
  console.log(embedHtml);

  return <div dangerouslySetInnerHTML={{ __html: embedHtml ?? "" }} />;
}

export default Embed;
