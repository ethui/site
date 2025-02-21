import { LRUCache } from "lru-cache";

declare global {
  var docCache: LRUCache<string, any>;
}

const ttl = process.env.NODE_ENV === "production" ? 100 : 1;

globalThis.docCache =
  globalThis.docCache ||
  new LRUCache<string, any>({
    max: 300,
    ttl,
  });

export async function fetchCached<T>(opts: {
  fn: () => Promise<T>;
  key: string;
  ttl: number;
}): Promise<T> {
  if (docCache.has(opts.key)) {
    return docCache.get(opts.key) as T;
  }

  const result = await opts.fn();

  docCache.set(opts.key, result, {
    ttl: opts.ttl,
  });

  return result;
}
