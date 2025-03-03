import { createServerFn } from "@tanstack/start";
import { load } from "cheerio";
import { z } from "zod";

export const getGithubEmbedData = createServerFn({ method: "GET" })
  .validator(z.object({ url: z.string().url() }))
  .handler(async (ctx) => {
    const url = URL.parse(ctx.data.url);

    if (!url) {
      throw new Error("Invalid URL");
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch oEmbed data for ${url}`);
    }

    const text = await response.text();

    console.log(text);
    const $ = load(text);
    const image = $('meta[property="og:image"]').attr("content") || "";
    const title = $('meta[property="og:title"]').attr("content") || "";
    const description =
      $('meta[property="og:description"]').attr("content") || "";

    return { image, title, description };
  });

export type GithubMetadata = Awaited<ReturnType<typeof getGithubEmbedData>>;
