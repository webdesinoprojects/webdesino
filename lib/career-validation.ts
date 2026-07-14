import { z } from "zod";

export const INDIAN_PHONE_DIGITS = 10;

export const careerPhoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9]+$/, "Phone number must contain only digits")
  .length(INDIAN_PHONE_DIGITS, `Phone number must be exactly ${INDIAN_PHONE_DIGITS} digits`);

export const careerEmailSchema = z
  .string()
  .trim()
  .email("Email address must be valid");

export function keepDigitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeCareerPhone(value: string) {
  const digits = keepDigitsOnly(value);
  if (digits.length > INDIAN_PHONE_DIGITS && digits.startsWith("91")) {
    return digits.slice(2, 2 + INDIAN_PHONE_DIGITS);
  }
  if (digits.length > INDIAN_PHONE_DIGITS && digits.startsWith("0")) {
    return digits.slice(1, 1 + INDIAN_PHONE_DIGITS);
  }
  return digits.slice(0, INDIAN_PHONE_DIGITS);
}

export function removeEmailWhitespace(value: string) {
  return value.replace(/\s/g, "");
}

export function isCareerEmailField(field: {
  key?: string | null;
  label?: string | null;
  type?: string | null;
}) {
  const key = (field.key || "").toLowerCase();
  const label = (field.label || "").toLowerCase();
  return (
    field.type === "email" ||
    key === "email" ||
    key.includes("email") ||
    label.includes("email") ||
    label.includes("e-mail")
  );
}

export function isCareerPhoneField(field: {
  key?: string | null;
  label?: string | null;
  type?: string | null;
}) {
  const key = (field.key || "").toLowerCase();
  const label = (field.label || "").toLowerCase();
  return (
    field.type === "tel" ||
    key === "phone" ||
    key.includes("phone") ||
    key.includes("mobile") ||
    label.includes("phone") ||
    label.includes("mobile")
  );
}

export function validateCareerPhone(value: string, label = "Phone number") {
  const trimmed = value.trim();
  const result = careerPhoneSchema.safeParse(value);
  if (result.success) return null;
  if (/[^0-9]/.test(trimmed)) {
    return `${label} must contain only numbers`;
  }
  return `${label} must be exactly ${INDIAN_PHONE_DIGITS} digits`;
}

export function validateCareerEmail(value: string, label = "Email address") {
  const result = careerEmailSchema.safeParse(value);
  if (result.success) return null;
  if (/\s/.test(value)) {
    return `${label} cannot contain spaces`;
  }
  return `${label} must be a valid email address`;
}
