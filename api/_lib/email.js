const RESEND_ENDPOINT = "https://api.resend.com/emails";

export const OWNER_EMAIL = "gqwebworks@gmail.com";
export const SITE_URL = "https://gqwebworks.com";
export const LOGO_URL = `${SITE_URL}/images/gqwebworkslogo.png`;
export const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "GQWebworks <hello@gqwebworks.com>";

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function emailFooter() {
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

export async function sendEmail(payload) {
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
