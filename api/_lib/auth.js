import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { getRedis } from "./redis.js";

const COOKIE_NAME = "gq_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const IS_PROD = Boolean(process.env.VERCEL);

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET environment variable");
  return secret;
}

function sign(encodedPayload) {
  return crypto.createHmac("sha256", getSecret()).update(encodedPayload).digest("base64url");
}

// Sessions embed the epoch that was current when they were issued.
// Bumping admin:sessionEpoch (done on password reset) instantly invalidates
// every previously issued cookie, even though the tokens themselves are
// stateless and unrevokable individually.
async function getCurrentEpoch() {
  const epoch = await getRedis().get("admin:sessionEpoch");
  return typeof epoch === "number" ? epoch : 0;
}

export async function bumpSessionEpoch() {
  const redis = getRedis();
  const current = await getCurrentEpoch();
  await redis.set("admin:sessionEpoch", current + 1);
}

function createSessionToken(epoch) {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_MS, epoch });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function verifySessionToken(token, currentEpoch) {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = sign(encoded);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return (
      typeof payload.exp === "number" &&
      payload.exp > Date.now() &&
      payload.epoch === currentEpoch
    );
  } catch {
    return false;
  }
}

export function parseCookies(req) {
  const header = req.headers?.cookie;
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((part) => {
      const [key, ...rest] = part.trim().split("=");
      return [key, decodeURIComponent(rest.join("="))];
    })
  );
}

export async function isAuthenticated(req) {
  const cookies = parseCookies(req);
  const currentEpoch = await getCurrentEpoch();
  return verifySessionToken(cookies[COOKIE_NAME], currentEpoch);
}

export async function setSessionCookie(res) {
  const epoch = await getCurrentEpoch();
  const token = createSessionToken(epoch);
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  const secureAttr = IS_PROD ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly${secureAttr}; SameSite=Strict; Path=/; Max-Age=${maxAge}`
  );
}

export function clearSessionCookie(res) {
  const secureAttr = IS_PROD ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly${secureAttr}; SameSite=Strict; Path=/; Max-Age=0`
  );
}

export function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
