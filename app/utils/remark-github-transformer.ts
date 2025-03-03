import type { Transformer } from "@remark-embedder/core";
import { load } from "cheerio";

interface GitHubMetadata {
  image: string;
  title: string;
  description: string;
}

export const remarkGithubTransformer: Transformer<any> = {
  name: "Github",
  shouldTransform(url) {
    console.log(url);
    const { host } = new URL(url);
    return ["github.com"].includes(host);
  },

  async getHTML(url) {
    const resp = await fetch(url);
    const $ = load(await resp.text());
    const image = $('meta[property="og:image"]').attr("content") || "";
    const title = $('meta[property="og:title"]').attr("content") || "";
    const description =
      $('meta[property="og:description"]').attr("content") || "";

    return `<img src="${image}" />`;
    //console.log(await resp.text());
    //return `<p className="bg-red-500">asd2</p>`;
  },
};
