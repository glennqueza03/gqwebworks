import { getRedis } from "../_lib/redis.js";
import { hashPassword, bumpSessionEpoch } from "../_lib/auth.js";
import { createRateLimiter, getClientIp } from "../_lib/rateLimit.js";

const isRateLimited = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: "Too many attempts. Try again later." });
  }

  const { token, newPassword } = req.body || {};

  if (!token || !newPassword || newPassword.length < 8) {
    return res.status(400).json({
      error: "A reset token and a password of at least 8 characters are required.",
    });
  }

  const redis = getRedis();
  const key = `admin:reset:${token}`;
  const valid = await redis.get(key);

  if (!valid) {
    return res.status(400).json({ error: "This reset link is invalid or has expired." });
  }

  await redis.del(key);
  await redis.set("admin:passwordHash", await hashPassword(newPassword));
  await bumpSessionEpoch();

  return res.status(200).json({ ok: true });
}
