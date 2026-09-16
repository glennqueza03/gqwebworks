import crypto from "node:crypto";
import { getRedis } from "../_lib/redis.js";
import { setSessionCookie, verifyPassword } from "../_lib/auth.js";
import { createRateLimiter, getClientIp } from "../_lib/rateLimit.js";

const ADMIN_USERNAME = "gqwebworksadmin";
const isRateLimited = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 6 });

function usernameMatches(input) {
  const a = Buffer.from(String(input || ""));
  const b = Buffer.from(ADMIN_USERNAME);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: "Too many attempts. Try again later." });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  if (!usernameMatches(username)) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }

  const redis = getRedis();
  const passwordHash = await redis.get("admin:passwordHash");

  if (!passwordHash) {
    return res.status(500).json({ error: "Admin account is not set up yet." });
  }

  const valid = await verifyPassword(password, passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }

  await setSessionCookie(res);
  return res.status(200).json({ ok: true });
}
