"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getEmployeeSession } from "@/lib/employee-session";
import { logEmployeeAction } from "@/lib/employee-logger";
import {
  sendCareerApplicantEmail,
  sendCareerAdminEmail,
} from "@/lib/career-email";
import {
  isCareerEmailField,
  isCareerPhoneField,
  validateCareerEmail,
  validateCareerPhone,
} from "@/lib/career-validation";

/* ------------------------------------------------------------------------- */
/* Types                                                                     */
/* ------------------------------------------------------------------------- */

export type CareerFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "number"
  | "file"
  | "select"
  | "date"
  | "url";

export type CareerFieldOption = { label: string; value: string };

export type CareerFormField = {
  id: string;
  key: string;
  label: string;
  type: CareerFieldType;
  required: boolean;
  order: number;
  active: boolean;
  system: boolean;
  options: CareerFieldOption[] | null;
  placeholder: string | null;
  helpText: string | null;
};

export type CareerCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CareerApplication = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  cvUrl: string | null;
  cvName: string | null;
  note: string | null;
  data: Record<string, any>;
  categoryId: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

/* ------------------------------------------------------------------------- */
/* Auth helpers                                                              */
/* ------------------------------------------------------------------------- */

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

async function requireApplicationsAccess() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) return { kind: "admin" as const, user };

  const employee = await getEmployeeSession();
  if (employee && employee.permissions.includes("careers-applications")) {
    return { kind: "employee" as const, employee };
  }
  throw new Error("Unauthorized");
}

/* ------------------------------------------------------------------------- */
/* Defaults / seeding                                                        */
/* ------------------------------------------------------------------------- */

const DEFAULT_FIELDS: Array<{
  key: string;
  label: string;
  type: CareerFieldType;
  required: boolean;
  order: number;
  system: boolean;
  placeholder?: string;
  helpText?: string;
}> = [
  { key: "name", label: "Full Name", type: "text", required: true, order: 10, system: true, placeholder: "e.g. Priya Sharma" },
  { key: "email", label: "Email Address", type: "email", required: true, order: 20, system: true, placeholder: "you@example.com" },
  { key: "phone", label: "Phone Number", type: "tel", required: true, order: 30, system: true, placeholder: "9876543210" },
  { key: "education", label: "Educational Qualification", type: "text", required: true, order: 40, system: false, placeholder: "e.g. B.Tech CSE, MBA in Marketing" },
  { key: "cv", label: "Upload CV", type: "file", required: true, order: 50, system: true, helpText: "PDF, DOC or DOCX. Max 5 MB." },
  { key: "note", label: "Note / Cover Letter", type: "textarea", required: false, order: 60, system: false, placeholder: "Tell us why you're a great fit..." },
];

/**
 * Idempotent seeding: ensures the six default fields exist. Called from CMS
 * and public form pages on load so the app works with no manual seed step.
 */
export async function ensureDefaultCareerFields() {
  const count = await prisma.careerFormField.count({});
  if (count > 0) return;
  for (const field of DEFAULT_FIELDS) {
    await prisma.careerFormField.create({
      data: {
        key: field.key,
        label: field.label,
        type: field.type,
        required: field.required,
        order: field.order,
        active: true,
        system: field.system,
        placeholder: field.placeholder ?? null,
        helpText: field.helpText ?? null,
        options: null,
      },
    });
  }
}

/* ------------------------------------------------------------------------- */
/* Slug + validation helpers                                                 */
/* ------------------------------------------------------------------------- */

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 80);
}

function keyify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .substring(0, 60);
}

const VALID_FIELD_TYPES: CareerFieldType[] = [
  "text",
  "email",
  "tel",
  "textarea",
  "number",
  "file",
  "select",
  "date",
  "url",
];

/* ------------------------------------------------------------------------- */
/* Category CRUD (admin only)                                                */
/* ------------------------------------------------------------------------- */

export async function createCareerCategory(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const order = Number(formData.get("order") || 0);
  const active = formData.get("active") !== "false";

  if (!name || name.length < 2) {
    return { success: false, error: "Category name is required" };
  }

  const slug = slugify(slugRaw || name);
  if (!slug) return { success: false, error: "Slug is invalid" };

  const existing = await prisma.careerCategory.findFirst({ where: { slug } });
  if (existing) return { success: false, error: "A category with that slug already exists" };

  await prisma.careerCategory.create({
    data: {
      name: name.substring(0, 200),
      slug,
      description: description?.substring(0, 2000) || null,
      order: Number.isFinite(order) ? order : 0,
      active,
    },
  });

  revalidatePath("/admin/careers/cms");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateCareerCategory(id: string, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const order = Number(formData.get("order") || 0);
  const active = formData.get("active") !== "false";

  if (!name) return { success: false, error: "Category name is required" };

  const slug = slugify(slugRaw || name);
  if (!slug) return { success: false, error: "Slug is invalid" };

  const conflict = await prisma.careerCategory.findFirst({ where: { slug } });
  if (conflict && conflict.id !== id) {
    return { success: false, error: "A category with that slug already exists" };
  }

  await prisma.careerCategory.update({
    where: { id },
    data: {
      name: name.substring(0, 200),
      slug,
      description: description?.substring(0, 2000) || null,
      order: Number.isFinite(order) ? order : 0,
      active,
    },
  });

  revalidatePath("/admin/careers/cms");
  revalidatePath("/careers");
  revalidatePath(`/careers/${slug}`);
  return { success: true };
}

export async function deleteCareerCategory(id: string) {
  await requireAdmin();
  await prisma.careerCategory.delete({ where: { id } });
  revalidatePath("/admin/careers/cms");
  revalidatePath("/careers");
  return { success: true };
}

/* ------------------------------------------------------------------------- */
/* Form field CRUD (admin only)                                              */
/* ------------------------------------------------------------------------- */

function parseOptions(raw: string): CareerFieldOption[] | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const lines = trimmed.split(/\r?\n/);
  const out: CareerFieldOption[] = [];
  for (const line of lines) {
    const l = line.trim();
    if (!l) continue;
    const [label, value] = l.split("|").map((s) => s.trim());
    if (!label) continue;
    out.push({ label, value: value || slugify(label) });
  }
  return out.length ? out : null;
}

export async function createCareerField(formData: FormData) {
  await requireAdmin();

  const label = String(formData.get("label") || "").trim();
  const type = String(formData.get("type") || "text") as CareerFieldType;
  const keyRaw = String(formData.get("key") || "").trim();
  const required = formData.get("required") === "on" || formData.get("required") === "true";
  const active = formData.get("active") !== "false";
  const order = Number(formData.get("order") || 0);
  const placeholder = String(formData.get("placeholder") || "").trim() || null;
  const helpText = String(formData.get("helpText") || "").trim() || null;
  const optionsRaw = String(formData.get("options") || "");

  if (!label) return { success: false, error: "Label is required" };
  if (!VALID_FIELD_TYPES.includes(type)) {
    return { success: false, error: "Invalid field type" };
  }

  const key = keyify(keyRaw || label);
  if (!key) return { success: false, error: "Field key is invalid" };

  const conflict = await prisma.careerFormField.findFirst({ where: { key } });
  if (conflict) return { success: false, error: "A field with that key already exists" };

  await prisma.careerFormField.create({
    data: {
      key,
      label: label.substring(0, 200),
      type,
      required,
      active,
      order: Number.isFinite(order) ? order : 0,
      placeholder: placeholder?.substring(0, 200) || null,
      helpText: helpText?.substring(0, 500) || null,
      options: type === "select" ? parseOptions(optionsRaw) : null,
      system: false,
    },
  });

  revalidatePath("/admin/careers/cms");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateCareerField(id: string, formData: FormData) {
  await requireAdmin();

  const existing = await prisma.careerFormField.findUnique({ where: { id } });
  if (!existing) return { success: false, error: "Field not found" };

  const label = String(formData.get("label") || "").trim();
  const type = String(formData.get("type") || existing.type) as CareerFieldType;
  const required = formData.get("required") === "on" || formData.get("required") === "true";
  const active = formData.get("active") !== "false";
  const order = Number(formData.get("order") || existing.order);
  const placeholder = String(formData.get("placeholder") || "").trim() || null;
  const helpText = String(formData.get("helpText") || "").trim() || null;
  const optionsRaw = String(formData.get("options") || "");

  if (!label) return { success: false, error: "Label is required" };
  if (!VALID_FIELD_TYPES.includes(type)) {
    return { success: false, error: "Invalid field type" };
  }

  // System fields keep their key + type — only label/order/required/active/help can change.
  const nextType = existing.system ? existing.type : type;

  await prisma.careerFormField.update({
    where: { id },
    data: {
      label: label.substring(0, 200),
      type: nextType,
      required,
      active,
      order: Number.isFinite(order) ? order : existing.order,
      placeholder: placeholder?.substring(0, 200) || null,
      helpText: helpText?.substring(0, 500) || null,
      options: nextType === "select" ? parseOptions(optionsRaw) : null,
    },
  });

  revalidatePath("/admin/careers/cms");
  revalidatePath("/careers");
  return { success: true };
}

export async function deleteCareerField(id: string) {
  await requireAdmin();
  const existing = await prisma.careerFormField.findUnique({ where: { id } });
  if (!existing) return { success: false, error: "Field not found" };
  if (existing.system) {
    return { success: false, error: "System fields cannot be deleted. Toggle Active instead." };
  }
  await prisma.careerFormField.delete({ where: { id } });
  revalidatePath("/admin/careers/cms");
  revalidatePath("/careers");
  return { success: true };
}

/* ------------------------------------------------------------------------- */
/* Public: submit an application                                             */
/* ------------------------------------------------------------------------- */

const CV_ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CV_ALLOWED_EXT = /\.(pdf|doc|docx)$/i;
const CV_MAX_BYTES = 5 * 1024 * 1024;

function sanitizeText(v: FormDataEntryValue | null, max: number): string {
  if (v == null) return "";
  return String(v).trim().replace(/[<>]/g, "").substring(0, max);
}

async function uploadCv(file: File): Promise<{ url: string; name: string }> {
  if (file.size === 0) throw new Error("CV file is empty");
  if (file.size > CV_MAX_BYTES) throw new Error("CV file exceeds the 5 MB limit");
  const okMime = CV_ALLOWED_MIME.includes(file.type);
  const okExt = CV_ALLOWED_EXT.test(file.name);
  if (!okMime && !okExt) throw new Error("CV must be a PDF, DOC or DOCX file");

  // Public form submissions have no Supabase session, so the anon key hits
  // storage RLS. Use the service-role key here — this only runs server-side
  // inside the server action, so it's never exposed to the browser.
  const { createClient: createSupabaseClient } = await import("@supabase/supabase-js");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !serviceKey) throw new Error("Storage is not configured");

  const supabase = createSupabaseClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const buffer = Buffer.from(await file.arrayBuffer());
  const sanitizedFilename = file.name
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .substring(0, 255);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const timestamp = Date.now();
  const storagePath = `careers/${year}/${month}/${timestamp}-${sanitizedFilename}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(storagePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (error) throw new Error(`CV upload failed: ${error.message}`);

  const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(storagePath);
  if (!publicUrlData?.publicUrl) throw new Error("Failed to get CV URL");

  await prisma.media.create({
    data: {
      filename: sanitizedFilename,
      url: publicUrlData.publicUrl,
      size: file.size,
      mimeType: file.type || null,
    },
  });

  return { url: publicUrlData.publicUrl, name: file.name };
}

export async function submitCareerApplication(formData: FormData) {
  const categorySlug = String(formData.get("_categorySlug") || "").trim() || null;

  const fields = (await prisma.careerFormField.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  })) as CareerFormField[];

  if (fields.length === 0) {
    return { success: false, error: "Application form is not configured yet" };
  }

  const data: Record<string, any> = {};
  let name = "";
  let email = "";
  let phone: string | null = null;
  let note: string | null = null;
  let cvUrl: string | null = null;
  let cvName: string | null = null;

  for (const field of fields) {
    const key = field.key;
    if (field.type === "file") {
      const file = formData.get(key);
      if (file instanceof File && file.size > 0) {
        try {
          const uploaded = await uploadCv(file);
          data[key] = uploaded.url;
          if (key === "cv") {
            cvUrl = uploaded.url;
            cvName = uploaded.name;
          }
        } catch (err: any) {
          return { success: false, error: err?.message || "File upload failed" };
        }
      } else if (field.required) {
        return { success: false, error: `${field.label} is required` };
      } else {
        data[key] = null;
      }
      continue;
    }

    const value = sanitizeText(formData.get(key), field.type === "textarea" ? 5000 : 500);

    if (field.required && !value) {
      return { success: false, error: `${field.label} is required` };
    }

    if (isCareerEmailField(field) && value) {
      const emailError = validateCareerEmail(value, field.label);
      if (emailError) return { success: false, error: emailError };
    }
    if (field.type === "url" && value) {
      try {
        new URL(value);
      } catch {
        return { success: false, error: `${field.label} must be a valid URL` };
      }
    }
    if (isCareerPhoneField(field) && value) {
      const phoneError = validateCareerPhone(value, field.label);
      if (phoneError) return { success: false, error: phoneError };
    }
    if (field.type === "select" && value) {
      const allowed = (field.options || []).map((o) => o.value);
      if (allowed.length && !allowed.includes(value)) {
        return { success: false, error: `${field.label} has an invalid value` };
      }
    }

    data[key] = value || null;

    if (key === "name") name = value;
    else if (key === "email") email = value;
    else if (key === "phone") phone = value || null;
    else if (key === "note") note = value || null;
  }

  if (!name || !email) {
    return { success: false, error: "Name and email are required" };
  }

  let category: any = null;
  if (categorySlug) {
    category = await prisma.careerCategory.findFirst({ where: { slug: categorySlug, active: true } });
    if (!category) return { success: false, error: "Invalid category" };
  }

  try {
    const created = await prisma.careerApplication.create({
      data: {
        name: name.substring(0, 200),
        email: email.toLowerCase().substring(0, 255),
        phone,
        cvUrl,
        cvName,
        note,
        data,
        categoryId: category?.id ?? null,
        categoryLegacyId: category?.id ?? null,
        categorySlug: category?.slug ?? null,
        categoryName: category?.name ?? null,
        status: "new",
      } as any,
    });

    // Fire emails, but never fail the submission on email errors.
    try {
      await Promise.all([
        sendCareerApplicantEmail({
          to: email,
          name,
          categoryName: category?.name ?? null,
          fields,
          data,
          cvName,
        }),
        sendCareerAdminEmail({
          applicationId: created.id,
          name,
          email,
          phone,
          categoryName: category?.name ?? null,
          fields,
          data,
          cvUrl,
          cvName,
        }),
      ]);
    } catch (err) {
      console.error("Career email send failed:", err);
    }

    // Intentionally do NOT call revalidatePath here — this is a public form.
    // Revalidating any admin path would trigger a router refresh on the
    // applicant's browser and clobber the toast/reset UX. Admin lists use
    // `force-dynamic`, so they always fetch fresh data on their own visits.
    return { success: true, id: created.id };
  } catch (err) {
    console.error("Career application submit failed:", err);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}

/* ------------------------------------------------------------------------- */
/* Application status / delete (admin OR employee w/ careers-applications)   */
/* ------------------------------------------------------------------------- */

export async function updateCareerApplicationStatus(id: string, status: string) {
  const authz = await requireApplicationsAccess();

  const allowed = ["new", "reviewing", "shortlisted", "rejected", "hired"];
  if (!allowed.includes(status)) {
    return { success: false, error: "Invalid status" };
  }

  await prisma.careerApplication.update({ where: { id }, data: { status } });

  if (authz.kind === "employee") {
    await logEmployeeAction(
      "careers-applications" as any,
      `Updated application ${id} status → ${status}`
    );
  }

  revalidatePath("/admin/careers/applications");
  revalidatePath(`/admin/careers/applications/${id}`);
  revalidatePath("/employee/dashboard/careers-applications");
  revalidatePath(`/employee/dashboard/careers-applications/${id}`);
  return { success: true };
}

export async function deleteCareerApplication(id: string) {
  await requireAdmin();
  await prisma.careerApplication.delete({ where: { id } });
  revalidatePath("/admin/careers/applications");
  return { success: true };
}
