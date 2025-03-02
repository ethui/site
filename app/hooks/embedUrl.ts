import { useEffect, useState } from "react";

export function useEmbed(url: string) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    fetchMetadata(url)
      .then((html) => setHtml(html))
      .catch((error) =>
        console.error(`Failed to fetch embed for ${url}:`, error),
      );
  }, [url]);

  return { html };
}

async function fetchMetadata(url: string): Promise<string> {
  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; GitHubPreviewBot/1.0)",
    },
  });

  console.log(resp);
  const html = await resp.text();
  console.log(html);

  return "";
}
