import nodemailer from "nodemailer";
import type { CareerFormField } from "@/lib/career-actions";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim() || "587";
  const user = process.env.SMTP_USER?.trim();
  const passRaw = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim() || '"Webdesino Careers" <no-reply@webdesino.com>';
  const to = process.env.CAREERS_EMAIL_TO?.trim() || process.env.SMTP_TO?.trim() || "info@webdesino.com";

  if (!host || !user || !passRaw) {
    console.warn("SMTP config invalid: SMTP_HOST, SMTP_USER, SMTP_PASS required. Career email skipped.");
    return null;
  }
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) return null;

  const isGmail = host.toLowerCase().includes("gmail.com");
  const pass = isGmail ? passRaw.replace(/\s+/g, "") : passRaw;

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === "true"
    : port === 465;

  return { host, port, secure, user, pass, from, to };
}

function transport(cfg: SmtpConfig) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://webdesino.com").replace(/\/$/, "");
}

function logoImgTag(): string {
  // WebDesino.png lives in Supabase storage (see components/Footer.tsx). We
  // fall back to the site's public URL for compatibility with any mail client.
  const url = `${siteUrl()}/WebDesino.png`;
  return `<img src="${url}" alt="Webdesino" width="140" style="display:block;height:auto;max-width:140px;" />`;
}

function summariseFields(
  fields: CareerFormField[],
  data: Record<string, any>,
  cvName: string | null
): { key: string; label: string; value: string }[] {
  const rows: { key: string; label: string; value: string }[] = [];
  for (const f of fields) {
    if (f.type === "file") {
      rows.push({ key: f.key, label: f.label, value: cvName ? cvName : (data[f.key] ? "Attached" : "—") });
      continue;
    }
    const raw = data[f.key];
    const value = raw == null || raw === "" ? "—" : String(raw);
    rows.push({ key: f.key, label: f.label, value });
  }
  return rows;
}

function rowsToHtml(rows: { label: string; value: string }[]): string {
  return rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 14px;background:#f5f7fb;border-bottom:1px solid #e5e9f2;font-size:13px;color:#6b7280;width:35%;vertical-align:top;">${escapeHtml(r.label)}</td>
        <td style="padding:10px 14px;background:#ffffff;border-bottom:1px solid #e5e9f2;font-size:14px;color:#111827;vertical-align:top;">${escapeHtml(r.value).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("");
}

function rowsToText(rows: { label: string; value: string }[]): string {
  return rows.map((r) => `${r.label}: ${r.value}`).join("\n");
}

/* ------------------------------------------------------------------------- */

export async function sendCareerApplicantEmail(args: {
  to: string;
  name: string;
  categoryName: string | null;
  fields: CareerFormField[];
  data: Record<string, any>;
  cvName: string | null;
}) {
  const cfg = getSmtpConfig();
  if (!cfg) return;

  const rows = summariseFields(args.fields, args.data, args.cvName);
  const subject = args.categoryName
    ? `Thanks for applying to ${args.categoryName} — Webdesino`
    : "Thanks for applying — Webdesino";

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f0f2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#111184;padding:24px;border-radius:16px 16px 0 0;text-align:center;">
      ${logoImgTag()}
    </div>
    <div style="background:#ffffff;padding:32px 28px;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(17,17,132,0.08);">
      <h1 style="margin:0 0 8px;font-size:22px;color:#111184;">Thank you, ${escapeHtml(args.name)}!</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
        We've received your application${args.categoryName ? ` for <strong>${escapeHtml(args.categoryName)}</strong>` : ""}.
        Our team will review it and get back to you soon.
      </p>
      <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#6b7280;">
        Here's a copy of what you submitted:
      </p>
      <table role="presentation" style="width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid #e5e9f2;">
        ${rowsToHtml(rows)}
      </table>
      <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">
        If you didn't submit this application, please ignore this email or contact us at
        <a href="mailto:info@webdesino.com" style="color:#111184;">info@webdesino.com</a>.
      </p>
    </div>
    <p style="text-align:center;margin:16px 0 0;font-size:12px;color:#9ca3af;">
      &copy; ${new Date().getFullYear()} Webdesino · Delhi NCR
    </p>
  </div>
</body>
</html>`;

  const text = `Thank you, ${args.name}!

We've received your application${args.categoryName ? ` for ${args.categoryName}` : ""}. Our team will review it and get back to you soon.

Here's a copy of what you submitted:

${rowsToText(rows)}

If you didn't submit this application, please contact us at info@webdesino.com.

— Team Webdesino`;

  try {
    await transport(cfg).sendMail({
      from: cfg.from,
      to: args.to,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error("Failed to send applicant email:", err);
  }
}

export async function sendCareerAdminEmail(args: {
  applicationId: string;
  name: string;
  email: string;
  phone: string | null;
  categoryName: string | null;
  fields: CareerFormField[];
  data: Record<string, any>;
  cvUrl: string | null;
  cvName: string | null;
}) {
  const cfg = getSmtpConfig();
  if (!cfg) return;

  const rows = summariseFields(args.fields, args.data, args.cvName);
  const deepLink = `${siteUrl()}/admin/careers/applications/${args.applicationId}`;
  const subject = `New career application: ${args.name}${args.categoryName ? ` — ${args.categoryName}` : ""}`;

  const cvBlock = args.cvUrl
    ? `<p style="margin:16px 0;font-size:14px;">
        <a href="${escapeHtml(args.cvUrl)}" style="display:inline-block;background:#111184;color:#ffffff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;">Download CV</a>
      </p>`
    : "";

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f0f2f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#111184;padding:20px;border-radius:12px 12px 0 0;">
      <div style="color:#ffffff;font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.75;">Webdesino Careers</div>
      <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:4px;">New application received</div>
    </div>
    <div style="background:#ffffff;padding:24px;border-radius:0 0 12px 12px;box-shadow:0 4px 20px rgba(17,17,132,0.08);">
      <p style="margin:0 0 8px;font-size:14px;color:#374151;">
        <strong>${escapeHtml(args.name)}</strong> just applied${args.categoryName ? ` for <strong>${escapeHtml(args.categoryName)}</strong>` : ""}.
      </p>
      <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">
        Contact: <a href="mailto:${escapeHtml(args.email)}" style="color:#111184;">${escapeHtml(args.email)}</a>
        ${args.phone ? ` · <a href="tel:${escapeHtml(args.phone)}" style="color:#111184;">${escapeHtml(args.phone)}</a>` : ""}
      </p>
      ${cvBlock}
      <table role="presentation" style="width:100%;border-collapse:collapse;border-radius:10px;overflow:hidden;border:1px solid #e5e9f2;margin-top:12px;">
        ${rowsToHtml(rows)}
      </table>
      <p style="margin:20px 0 0;">
        <a href="${escapeHtml(deepLink)}" style="display:inline-block;padding:10px 18px;border-radius:8px;background:#f5f7fb;color:#111184;font-weight:600;text-decoration:none;border:1px solid #e5e9f2;">Open in admin panel</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = `New career application

Name: ${args.name}
Email: ${args.email}
Phone: ${args.phone || "N/A"}
Category: ${args.categoryName || "N/A"}
CV: ${args.cvUrl || "—"}

Details:
${rowsToText(rows)}

Open: ${deepLink}`;

  try {
    await transport(cfg).sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: args.email,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error("Failed to send admin career email:", err);
  }
}
