import { getGithubEmbedData, type GithubMetadata } from "#/server/embed";
import { useEffect, useState } from "react";

export function useGithubEmbed(url: string) {
  const [data, setData] = useState<GithubMetadata>({
    image: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    getGithubEmbedData({ data: { url } })
      .then((resp) => setData(resp))
      .catch((error) =>
        console.error(`Failed to fetch github embed for ${url}:`, error),
      );
  }, [url]);

  return data;
}
