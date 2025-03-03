import { MDXProvider } from "@mdx-js/react";
import { Link as LinkIcon, LoaderCircle } from "lucide-react";
import clsx from "clsx";
import { getGithubEmbedData } from "#/server/embed";
import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

const components = {
  Image,
  img: Image,
  Video,
  Youtube,
  GithubEmbed: SuspendedGithubEmbed,
};

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

function SuspendedGithubEmbed({ url }: { url: string }) {
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className="not-prose my-8 block overflow-hidden rounded-xl border-1 bg-background no-underline hover:bg-accent md:h-[9rem]"
    >
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center gap-2 border">
            <LoaderCircle className="animate-spin" />
            {url}
          </div>
        }
      >
        <GithubEmbed url={url} />
      </Suspense>
    </a>
  );
}

function GithubEmbed({ url }: { url: string }) {
  const {
    data: { image, title, description },
  } = useSuspenseQuery({
    queryKey: ["github-embed", url],
    queryFn: () => getGithubEmbedData({ data: { url } }),
  });

  return (
    <div className="flex flex-col items-stretch md:flex-row-reverse ">
      <div className="aspect-16/9 shrink-0 md:w-[16rem]">
        <img
          src={image}
          className="mt-0 mb-0 h-full object-cover"
          alt={title}
        />
      </div>
      <div className="hidden flex-col items-stretch justify-between gap-2 overflow-hidden p-2 pl-4 md:flex">
        <h1 className="font-bold text-base">{title}</h1>
        <p className="line-clamp-3 font-light text-sm">{description}</p>
        <p className="flex items-center gap-2">
          <LinkIcon size="14" />
          github.com
        </p>
      </div>
    </div>
  );
}
