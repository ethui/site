import { LRUCache } from "lru-cache";

declare global {
  var docCache: LRUCache<string, unknown>;
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
const docCache =
  globalThis.docCache ||
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  (globalThis.docCache = new LRUCache<string, unknown>({
    max: 300,
    // ttl: 1,
    ttl: process.env.NODE_ENV === "production" ? 100 : 1000000,
  }));

export async function fetchCached<T>(opts: {
  fn: () => Promise<T>;
  key: string;
  ttl: number;
}): Promise<T> {
  if (docCache.has(opts.key)) {
    console.log("cache it");
    return docCache.get(opts.key) as T;
  }
  console.log("no cache");

  const result = await opts.fn();

  docCache.set(opts.key, result, {
    ttl: opts.ttl,
  });

  return result;
}
