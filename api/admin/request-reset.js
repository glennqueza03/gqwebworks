import crypto from "node:crypto";
import { getRedis } from "../_lib/redis.js";
import { sendEmail, OWNER_EMAIL, SITE_URL, FROM_EMAIL, emailFooter } from "../_lib/email.js";
import { createRateLimiter, getClientIp } from "../_lib/rateLimit.js";

const isRateLimited = createRateLimiter({ windowMs: 60 * 60 * 1000, max: 3 });
const RESET_TTL_SECONDS = 15 * 60;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: "Too many reset requests. Try again later." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  await getRedis().set(`admin:reset:${token}`, "1", { ex: RESET_TTL_SECONDS });

  const resetUrl = `${SITE_URL}/admin/reset?token=${token}`;

  try {
    await sendEmail({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: "Reset your GQWebworks admin password",
      html: `
        <div style="max-width:480px;margin:0 auto;padding:28px;font-family:Helvetica,Arial,sans-serif;">
          <h1 style="font-size:20px;margin:0 0 16px;color:#141414;">Reset your admin password</h1>
          <p style="font-size:14px;color:#141414;line-height:1.6;">
            Click the link below to set a new password. This link expires in 15 minutes
            and can only be used once.
          </p>
          <p style="margin:24px 0;">
            <a href="${resetUrl}" style="display:inline-block;background:#151b1d;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">Reset password</a>
          </p>
          <p style="font-size:12px;color:#6a6a66;line-height:1.6;">
            Didn't request this? You can ignore this email — your password won't change.
          </p>
          ${emailFooter()}
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return res.status(502).json({ error: "Could not send reset email. Try again shortly." });
  }

  return res.status(200).json({ ok: true });
}
