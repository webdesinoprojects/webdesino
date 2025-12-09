import nodemailer from "nodemailer";

export async function sendEnquiryEmail(
  name: string,
  email: string,
  phone: string,
  service: string,
  message: string,
  location?: string
) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("SMTP configuration missing. Email not sent.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"WebDesino" <no-reply@webdesino.com>',
    to: process.env.SMTP_TO || "info@webdesino.com",
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
}
