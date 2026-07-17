const DEFAULT_ADMIN_EMAILS = ["admin@webdesino.com"];

export function normalizeAdminEmail(email?: string | null) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function getAllowedAdminEmails() {
  const configuredEmails = [
    process.env.ADMIN_EMAILS,
    process.env.ADMIN_EMAIL,
  ]
    .filter(Boolean)
    .join(",");

  const emails = configuredEmails
    .split(/[,\s]+/)
    .map(normalizeAdminEmail)
    .filter(Boolean);

  return Array.from(new Set(emails.length ? emails : DEFAULT_ADMIN_EMAILS));
}

export function isAllowedAdminEmail(email?: string | null) {
  const normalizedEmail = normalizeAdminEmail(email);
  if (!normalizedEmail) return false;

  return getAllowedAdminEmails().includes(normalizedEmail);
}
