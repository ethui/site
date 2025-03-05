import { MDXProvider } from "@mdx-js/react";
import { Link as LinkIcon, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { getOpengraphEmbedData } from "#/server/embed";
import { Suspense } from "react";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";

const components = {
  Image,
  img: Image,
  Video,
  Youtube,
  Embed: SuspendedEmbed,
};

interface MarkdownProps extends React.ComponentProps<"div"> { }

export function Markdown({ children, className, ...props }: MarkdownProps) {
  return (
    <div className={clsx("prose max-w-full", className)} {...props}>
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
  return "Image";
  //return (
  //  <img
  //    {...props}
  //    className={clsx("mx-auto", className)}
  //    src={src}
  //    alt={"asd"}
  //  />
  //);
}

function Video({ src }: { src: string }) {
  return "Video";
  //return (
  //  <picture className="flex w-full justify-center">
  //    <video muted autoPlay loop controls src={src} className="max-w-[600px]" />
  //  </picture>
  //);
}

function Youtube({ id }: { id: string }) {
  return "Youtube";
  //return (
  //  <iframe
  //    width="560"
  //    height="315"
  //    src={`https://www.youtube.com/embed/${id}`}
  //    title="YouTube video player"
  //    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //    referrerPolicy="strict-origin-when-cross-origin"
  //    allowFullScreen
  //    className="mx-auto"
  //  />
  //);
}

function SuspendedEmbed({ url }: { url: string }) {
  return "SuspendedEmbed";
//return (
//  <a
//    href={url}
//    rel="noopener noreferrer"
//    target="_blank"
//    className="not-prose my-8 block overflow-hidden rounded-xl border-1 bg-background no-underline hover:bg-accent md:h-[9rem]"
//  >
//    <NonSuspenseEmbed url={url} />
//  </a>
//);
}
