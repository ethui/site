import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { setHeaders } from "@tanstack/start/server";
import { z } from "zod";
import { fetchRepoFile } from "./docs.server";

export const fetchDocFile = createServerFn({ method: "GET" })
  .validator(
    z.object({ org: z.string(), repo: z.string(), filepath: z.string() }),
  )
  .handler(async ({ data: { org, repo, filepath } }) => {
    const file = await fetchRepoFile({
      org,
      repo,
      filepath,
    });

    if (!file) {
      throw notFound();
    }

    // Cache for 5 minutes on shared cache
    // Revalidate in the background
    setHeaders({
      "cache-control": "public, max-age=0, must-revalidate",
      "cdn-cache-control": "max-age=300, stale-while-revalidate=300, durable",
    });

    return { content: file };
  });

export const fetchDocsConfig = createServerFn({ method: "GET" })
  .validator(
    z.object({ org: z.string(), repo: z.string(), filepath: z.string() }),
  )
  .handler(async ({ data: { org, repo, filepath } }) => {
    const file = await fetchRepoFile({
      org,
      repo,
      filepath,
    });

    if (!file) {
      throw notFound();
    }

    const validationResult = configSchema.safeParse(JSON.parse(file));
    if (!validationResult.success) {
      throw new Error(validationResult.error.message);
    }

    // Cache for 5 minutes on shared cache
    // Revalidate in the background
    setHeaders({
      "cache-control": "public, max-age=0, must-revalidate",
      "cdn-cache-control": "max-age=300, stale-while-revalidate=300, durable",
    });

    return validationResult.data;
  });

const configSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string(),
      slug: z.string(),
      subsections: z.array(
        z.object({
          title: z.string(),
          slug: z.string(),
        }),
      ),
    }),
  ),
});

export type DocsConfig = z.infer<typeof configSchema>;
