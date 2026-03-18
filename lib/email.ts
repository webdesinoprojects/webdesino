import nodemailer from "nodemailer";

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
  const from = process.env.SMTP_FROM?.trim() || '"WebDesino" <no-reply@webdesino.com>';
  const to = process.env.SMTP_TO?.trim() || "info@webdesino.com";

  if (!host || !user || !passRaw) {
    console.warn("SMTP config invalid: SMTP_HOST, SMTP_USER, and SMTP_PASS are required. Email skipped.");
    return null;
  }

  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    console.warn(`SMTP config invalid: SMTP_PORT \"${portRaw}\" is not a valid port. Email skipped.`);
    return null;
  }

  const isGmail = host.toLowerCase().includes("gmail.com");
  const pass = isGmail ? passRaw.replace(/\s+/g, "") : passRaw;
  if (isGmail && pass.length !== 16) {
    console.warn("Gmail SMTP detected. Use a 16-character Google App Password in SMTP_PASS.");
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE.toLowerCase() === "true"
    : port === 465;

  return { host, port, secure, user, pass, from, to };
}

export async function sendEnquiryEmail(
  name: string,
  email: string,
  phone: string,
  service: string,
  message: string,
  location?: string
) {
  const config = getSmtpConfig();
  if (!config) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject: `New Enquiry from ${name} - ${service || "General"} ${location ? `(${location})` : ""}`,
      text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service}
      Location: ${location || "N/A"}
      Message: ${message}
    `,
      html: `
      <h1>New Enquiry Received</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Location:</strong> ${location || "N/A"}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `,
    });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    const authHint =
      err?.code === "EAUTH" || /Invalid login|Username and Password not accepted/i.test(err?.message || "")
        ? " Check SMTP_USER/SMTP_PASS. For Gmail, use a Google App Password (not your normal account password)."
        : "";

    console.error(`Email delivery failed: ${err?.message || "Unknown SMTP error"}.${authHint}`);
  }
}
