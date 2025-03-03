import { useGithubEmbed } from "#/hooks/useEmbed";
import { MDXProvider } from "@mdx-js/react";
import { Link as LinkIcon } from "lucide-react";
import clsx from "clsx";

const components = { Image, img: Image, Video, Youtube, GithubEmbed };

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

function GithubEmbed({ url }: { url: string }) {
  const { image, title, description } = useGithubEmbed(url);

  console.log(image);
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className="not-prose flex items-stretch border no-underline"
    >
      <div className="flex flex-col justify-between gap-2 overflow-hidden p-2">
        <h1 className="font-bold text-base">{title}</h1>
        <p className="line-clamp-3 font-light text-sm">{description}</p>
        <p className="flex items-center gap-2">
          <LinkIcon size="14" />
          github.com
        </p>
      </div>
      <div className="aspect-16/9 w-[16rem] shrink-0">
        <img
          src={image}
          className="mt-0 mb-0 h-full object-cover"
          alt={title}
        />
      </div>
    </a>
  );
}
