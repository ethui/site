import { MDXProvider } from "@mdx-js/react";
import clsx from "clsx";

export function Markdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose max-w-full">
      <MDXProvider components={{ img: Image, Video, Youtube }}>
        {children}
      </MDXProvider>
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
