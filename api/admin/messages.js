import { getRedis } from "../_lib/redis.js";
import { isAuthenticated } from "../_lib/auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!(await isAuthenticated(req))) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  const redis = getRedis();
  const raw = await redis.lrange("messages", 0, 199);
  const messages = raw
    .map((entry) => {
      try {
        return typeof entry === "string" ? JSON.parse(entry) : entry;
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return res.status(200).json({ messages });
}
