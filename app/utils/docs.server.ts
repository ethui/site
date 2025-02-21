import fsp from "node:fs/promises";
import path from "node:path";
import { fetchCached } from "./cache.server";

const fiveMinutes = 5 * 60 * 1000;

export async function fetchRepoFile({
  org,
  repo,
  ref = "refs/heads/main",
  filepath,
}: { org: string; repo: string; filepath: string; ref?: string }) {
  console.log(filepath);
  const key = `${org}/${repo}:${ref}:${filepath}`;
  const ttl = process.env.NODE_ENV === "development" ? 1 : fiveMinutes;

  return await fetchCached({
    key,
    ttl,
    fn: async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          return await fetchFs(repo, filepath);
        } else {
          return await fetchRemote(org, repo, "refs/heads/main", filepath);
        }
      } catch (err) {
        console.log(err);
        return null;
      }
    },
  });
}

async function fetchRemote(
  owner: string,
  repo: string,
  ref: string,
  filepath: string,
) {
  const href = new URL(
    `${owner}/${repo}/${ref}/${filepath}`,
    "https://raw.githubusercontent.com/",
  ).href;

  const response = await fetch(href, {
    headers: { "User-Agent": `docs:${owner}/${repo}` },
  });

  if (!response.ok) {
    return null;
  }

  return await response.text();
}

async function fetchFs(repo: string, filepath: string) {
  const dirname = import.meta.url.split("://").at(-1)!;
  const localFilePath = path.resolve(dirname, `../../../../${repo}`, filepath);
  const file = await fsp.readFile(localFilePath);
  return file.toString();
}
