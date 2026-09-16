// In-memory only: resets on cold start and isn't shared across concurrent
// function instances. Fine for deterring rapid-fire abuse from one source;
// not a substitute for a real distributed limiter under sustained attack.
export function createRateLimiter({ windowMs, max }) {
  const hits = new Map();

  return function isRateLimited(key) {
    const now = Date.now();
    const timestamps = (hits.get(key) || []).filter((t) => now - t < windowMs);

    if (timestamps.length >= max) {
      hits.set(key, timestamps);
      return true;
    }

    timestamps.push(now);
    hits.set(key, timestamps);
    return false;
  };
}

export function getClientIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}
