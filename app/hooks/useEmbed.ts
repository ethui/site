import { getGithubEmbedData, type GithubMetadata } from "#/server/embed";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useGithubEmbed(url: string) {
  const [data, setData] = useState<GithubMetadata>({
    image: "",
    title: "",
    description: "",
  });

  return useSuspenseQuery({
    queryKey: ["github-embed", url],
    queryFn: () => getGithubEmbedData({ data: { url } }),
  });

  //useEffect(() => {
  //  getGithubEmbedData({ data: { url } })
  //    .then((resp) => setData(resp))
  //    .catch((error) =>
  //      console.error(`Failed to fetch github embed for ${url}:`, error),
  //    );
  //}, [url]);
  //
  //return data;
}
