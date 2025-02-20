import { createServerFn } from "@tanstack/start";

export const loadLods = createServerFn({ method: "GET" })
  .validator(z.object({ filePath: z.string() }))
  .handler(async ({ data: { filePath } }) => {});
