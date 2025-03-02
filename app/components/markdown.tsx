import { useEmbed } from "#/hooks/embedUrl";
import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";

const components = { Image, img: Image, Video, Youtube, Embed };

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
      {...props}
      className={clsx("mx-auto", className)}
      src={src}
      alt={"asd"}
    />
  );
}

function Video({ src }: { src: string }) {
  return (
    <picture className="flex w-full justify-center">
      <video muted autoPlay loop controls src={src} className="max-w-[600px]" />
    </picture>
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
  className?: string;
}

function Embed({ url, className }: EmbedProps) {
  const { html } = useEmbed(url);

  return (
    <div
      className={clsx("mx-auto w-full", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Embed;
