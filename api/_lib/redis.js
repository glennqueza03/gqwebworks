import { createClient } from "redis";

let client;
let connecting;

async function getClient() {
  if (client?.isOpen) return client;
  if (!connecting) {
    const url = process.env.REDIS_URL;
    if (!url) throw new Error("Missing REDIS_URL environment variable");

    client = createClient({ url });
    client.on("error", (err) => console.error("Redis client error:", err));
    connecting = client.connect().then(() => client);
  }
  return connecting;
}

function tryParse(value) {
  if (value === null || value === undefined) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function getRedis() {
  return {
    async get(key) {
      const c = await getClient();
      return tryParse(await c.get(key));
    },
    async set(key, value, options) {
      const c = await getClient();
      const payload = typeof value === "string" ? value : JSON.stringify(value);
      const opts = options?.ex ? { EX: options.ex } : undefined;
      return c.set(key, payload, opts);
    },
    async del(key) {
      const c = await getClient();
      return c.del(key);
    },
    async lpush(key, value) {
      const c = await getClient();
      return c.lPush(key, value);
    },
    async lrange(key, start, stop) {
      const c = await getClient();
      return c.lRange(key, start, stop);
    },
    async ltrim(key, start, stop) {
      const c = await getClient();
      return c.lTrim(key, start, stop);
    },
  };
}
