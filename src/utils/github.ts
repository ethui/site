import { createServerFn } from "@tanstack/start";
import "./cache";

export const getLatestRelease = createServerFn(async () => {
  const response = await fetch(
    "https://api.github.com/repos/ethui/ethui/releases/latest",
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "ethui-site-builder", // GitHub requires a User-Agent
      },
    },
  );

  if (!response.ok) throw new Error("Failed to fetch release");

  const data = await response.json();
  return data.tag_name; // Returns e.g. "v0.1.2"
});
