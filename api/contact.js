const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// In-memory only: resets on cold start and isn't shared across concurrent
// function instances. Good enough to stop rapid-fire clicking/basic bots;
// swap for Vercel KV/Upstash if determined spam becomes a problem.
const submissionsByIp = new Map();

function getClientIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionsByIp.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return false;
}

const OWNER_EMAIL = "gqwebworks@gmail.com";
const SITE_URL = "https://gqwebworks.com";
const LOGO_URL = `${SITE_URL}/images/gqwebworkslogo.png`;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "GQWebworks <hello@gqwebworks.com>";

const PROJECT_TYPE_LABELS = {
  website: "Website Development",
  redesign: "Website Redesign",
  automation: "Automation",
  "web-app": "Web Application",
  other: "Other",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function emailFooter() {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;padding-top:20px;border-top:1px solid #e4e4df;">
      <tr>
        <td style="text-align:center;">
          <img src="${LOGO_URL}" alt="GQWebworks" width="40" height="40" style="display:inline-block;border-radius:8px;" />
          <p style="margin:10px 0 2px;font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;color:#141414;">GQWebworks</p>
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#6a6a66;">
            Rio Grande Valley &amp; beyond · <a href="${SITE_URL}" style="color:#f26b1d;text-decoration:none;">gqwebworks.com</a>
          </p>
        </td>
      </tr>
    </table>
  `;
}

function ownerEmailHtml({ name, email, company, phone, projectType, message, submittedAt }) {
  const rows = [
    ["Submitted", submittedAt],
    ["Project type", PROJECT_TYPE_LABELS[projectType] || projectType || "—"],
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Phone", phone || "—"],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6a6a66;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#141414;font-weight:600;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="max-width:560px;margin:0 auto;padding:28px;font-family:Helvetica,Arial,sans-serif;">
      <p style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#f26b1d;font-weight:700;margin:0 0 6px;">New inquiry</p>
      <h1 style="font-size:20px;margin:0 0 20px;color:#141414;">${escapeHtml(name)} wants to get in touch</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;border-radius:12px;">
        ${rowsHtml}
      </table>
      <p style="font-size:13px;color:#6a6a66;margin:20px 0 6px;text-transform:uppercase;letter-spacing:0.06em;font-weight:700;">Message</p>
      <p style="font-size:14px;color:#141414;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
      ${emailFooter()}
    </div>
  `;
}

function clientEmailHtml({ name }) {
  return `
    <div style="max-width:560px;margin:0 auto;padding:28px;font-family:Helvetica,Arial,sans-serif;">
      <h1 style="font-size:20px;margin:0 0 16px;color:#141414;">Thanks for reaching out, ${escapeHtml(name)}!</h1>
      <p style="font-size:14px;color:#141414;line-height:1.6;">
        Thank you for reaching out. I will get in contact with you as soon as possible —
        usually within 24 hours.
      </p>
      <p style="font-size:14px;color:#6a6a66;line-height:1.6;">
        In the meantime, feel free to reply to this email with any extra details about
        your project.
      </p>
      <p style="font-size:14px;color:#141414;line-height:1.6;margin-top:20px;">— Glenn</p>
      ${emailFooter()}
    </div>
  `;
}

async function sendEmail(payload) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESENDAPI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend request failed (${response.status}): ${detail}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESENDAPI_KEY) {
    console.error("Missing RESENDAPI_KEY environment variable");
    return res.status(500).json({ error: "Email service is not configured" });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: "Too many messages sent. Please try again in a little while.",
    });
  }

  const { projectType, name, email, company, phone, message, website } = req.body || {};

  // Honeypot: real users never fill a field they can't see. Pretend success
  // so bots don't learn their submission was blocked.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message || !isValidEmail(email)) {
    return res.status(400).json({ error: "Please fill in your name, a valid email, and a message." });
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "long",
    timeStyle: "short",
  });

  try {
    await sendEmail({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      reply_to: email,
      subject: `New inquiry from ${name}`,
      html: ownerEmailHtml({ name, email, company, phone, projectType, message, submittedAt }),
    });

    await sendEmail({
      from: FROM_EMAIL,
      to: email,
      subject: "Thanks for reaching out to GQWebworks",
      html: clientEmailHtml({ name }),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return res.status(502).json({ error: "Could not send your message right now. Please try again shortly." });
  }
}
