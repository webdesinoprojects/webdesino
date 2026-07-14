"use client";

import { useState, useTransition, useRef } from "react";
import { CheckCircle2, Loader2, XCircle, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitCareerApplication } from "@/lib/career-actions";
import {
  isCareerEmailField,
  isCareerPhoneField,
  normalizeCareerPhone,
  removeEmailWhitespace,
  validateCareerEmail,
  validateCareerPhone,
} from "@/lib/career-validation";

type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "number"
  | "file"
  | "select"
  | "date"
  | "url";

type Field = {
  id: string;
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder: string | null;
  helpText: string | null;
  options: { label: string; value: string }[] | null;
};

const CV_MAX_MB = 5;
const CV_ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

type CategoryOption = { slug: string; name: string };

export default function CareerApplicationForm({
  fields,
  categories,
  defaultCategorySlug,
}: {
  fields: Field[];
  categories: CategoryOption[];
  defaultCategorySlug?: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);
  const [fileName, setFileName] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategorySlug && categories.some((c) => c.slug === defaultCategorySlug)
      ? defaultCategorySlug
      : ""
  );
  const formRef = useRef<HTMLFormElement>(null);

  const selectedCategoryName =
    categories.find((c) => c.slug === selectedCategory)?.name || "";

  function clientValidate(formData: FormData): string | null {
    for (const f of fields) {
      if (f.type === "file") {
        const file = formData.get(f.key);
        if (file instanceof File && file.size > 0) {
          if (file.size > CV_MAX_MB * 1024 * 1024) {
            return `${f.label} must be under ${CV_MAX_MB} MB`;
          }
        } else if (f.required) {
          return `${f.label} is required`;
        }
        continue;
      }
      const value = String(formData.get(f.key) || "").trim();
      if (f.required && !value) return `${f.label} is required`;
      if (isCareerEmailField(f) && value) {
        const emailError = validateCareerEmail(value, f.label);
        if (emailError) return emailError;
      }
      if (isCareerPhoneField(f) && value) {
        const phoneError = validateCareerPhone(value, f.label);
        if (phoneError) return phoneError;
      }
      if (f.type === "url" && value) {
        try {
          new URL(value);
        } catch {
          return `${f.label} must be a valid URL`;
        }
      }
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (categories.length > 0 && !selectedCategory) {
      setError("Please choose the role you're applying for.");
      return;
    }

    if (!consent) {
      setError("Please tick the consent box to continue.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("_categorySlug", selectedCategory);

    const validationError = clientValidate(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    startTransition(async () => {
      try {
        const result = await submitCareerApplication(formData);
        if (result?.success) {
          const label = selectedCategoryName || "Webdesino";
          setSubmittedRole(label);
          formRef.current?.reset();
          setFileName({});
          setConsent(false);
          setSelectedCategory(
            defaultCategorySlug && categories.some((c) => c.slug === defaultCategorySlug)
              ? defaultCategorySlug
              : ""
          );
        } else {
          const msg = result?.error || "Something went wrong. Please try again.";
          setError(msg);
        }
      } catch (err: any) {
        const msg = err?.message || "Unexpected error. Please try again.";
        setError(msg);
      }
    });
  }

  function handleSubmitAnother() {
    setSubmittedRole(null);
    setError(null);
  }

  if (submittedRole) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white px-6 py-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="h-9 w-9" strokeWidth={2.2} />
        </div>
        <h3 className="text-2xl font-bold text-slate-950">Application submitted</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
          Thanks for applying to {submittedRole}. We have received your details and CV.
          Our team will review your application and contact you soon.
        </p>
        <Button
          type="button"
          onClick={handleSubmitAnother}
          className="mt-7 w-full md:w-auto"
        >
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      {categories.length > 0 && (
        <div className="space-y-1.5">
          <Label htmlFor="_categorySlug">
            Role you're applying for
            <span className="text-rose-500 ml-0.5">*</span>
          </Label>
          <select
            id="_categorySlug"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.currentTarget.value);
              if (e.currentTarget.value) setError(null);
            }}
            className="w-full h-10 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="" disabled>
              Select a role…
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400">
            Don't see the role you want? Send us your CV at{" "}
            <a href="mailto:info@webdesino.com" className="text-[#111184] hover:underline">
              info@webdesino.com
            </a>
            .
          </p>
        </div>
      )}

      {fields.map((f) => (
        <FieldRow
          key={f.id}
          field={f}
          fileName={fileName[f.key]}
          onFile={(name) => setFileName((s) => ({ ...s, [f.key]: name }))}
        />
      ))}

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 flex items-start gap-2">
          <XCircle className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
          <p className="text-sm text-rose-700">{error}</p>
        </div>
      )}

      <label
        htmlFor="career-consent"
        className={`flex items-start gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${
          consent
            ? "border-[#111184]/40 bg-[#111184]/[0.03]"
            : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
        }`}
      >
        <input
          id="career-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.currentTarget.checked);
            if (e.currentTarget.checked) setError(null);
          }}
          className="mt-0.5 h-4 w-4 accent-[#111184]"
        />
        <span className="text-sm text-slate-700 leading-snug">
          I agree that Webdesino may contact me about this role using the details I've provided.
          <span className="text-rose-500 ml-0.5">*</span>
        </span>
      </label>

      <div className="pt-1">
        <Button
          type="submit"
          disabled={isPending || !consent}
          className="w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Submit application"
          )}
        </Button>
        {!consent && (
          <p className="mt-2 text-[11px] text-slate-400">
            Tick the consent box above to enable the Submit button.
          </p>
        )}
      </div>
    </form>
  );
}

function FieldRow({
  field,
  fileName,
  onFile,
}: {
  field: Field;
  fileName?: string;
  onFile: (name: string) => void;
}) {
  const isEmailField = isCareerEmailField(field);
  const isPhoneField = isCareerPhoneField(field);
  const validatesInline = isEmailField || isPhoneField;
  const [fieldError, setFieldError] = useState<string | null>(null);
  const common = {
    id: field.key,
    name: field.key,
    required: field.required,
    placeholder:
      isPhoneField && field.placeholder
        ? normalizeCareerPhone(field.placeholder)
        : field.placeholder ?? undefined,
  };
  const fieldErrorId = `${field.key}-error`;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.key}>
        {field.label}
        {field.required && <span className="text-rose-500 ml-0.5">*</span>}
      </Label>

      {field.type === "textarea" ? (
        <Textarea rows={5} {...common} />
      ) : field.type === "select" ? (
        <select
          {...common}
          className="w-full h-10 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          defaultValue=""
        >
          <option value="" disabled>
            {field.placeholder || "Select an option"}
          </option>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "file" ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-6 text-center hover:border-[#111184]/60 transition-colors">
          <label
            htmlFor={field.key}
            className="inline-flex flex-col items-center gap-2 cursor-pointer text-slate-500 hover:text-[#111184] transition-colors"
          >
            <Upload size={22} />
            <span className="text-sm font-medium">
              {fileName ? fileName : "Click to upload CV"}
            </span>
            <span className="text-[11px] text-slate-400">PDF, DOC, or DOCX · Max {CV_MAX_MB} MB</span>
          </label>
          <input
            {...common}
            type="file"
            accept={CV_ACCEPT}
            className="hidden"
            onChange={(e) => {
              const f = e.currentTarget.files?.[0];
              if (f) onFile(f.name);
            }}
          />
        </div>
      ) : (
        <Input
          type={
            isEmailField
              ? "email"
              : isPhoneField
              ? "tel"
              : field.type === "number"
              ? "number"
              : field.type === "date"
              ? "date"
              : field.type === "url"
              ? "url"
              : "text"
          }
          {...common}
          inputMode={isPhoneField ? "numeric" : isEmailField ? "email" : undefined}
          pattern={isPhoneField ? "[0-9]*" : undefined}
          maxLength={isPhoneField ? 10 : undefined}
          aria-invalid={validatesInline && fieldError ? true : undefined}
          aria-describedby={validatesInline && fieldError ? fieldErrorId : undefined}
          onKeyDown={
            validatesInline
              ? (e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) {
                    return;
                  }
                  if (isPhoneField && !/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                    setFieldError(`${field.label} must contain only numbers`);
                  }
                  if (isEmailField && /\s/.test(e.key)) {
                    e.preventDefault();
                    setFieldError(`${field.label} cannot contain spaces`);
                  }
                }
              : undefined
          }
          onChange={
            validatesInline
              ? (e) => {
                  const rawValue = e.currentTarget.value;
                  if (isPhoneField) {
                    const digitsOnly = normalizeCareerPhone(rawValue);
                    e.currentTarget.value = digitsOnly;

                    if (rawValue !== digitsOnly) {
                      setFieldError(`${field.label} must contain only numbers`);
                      return;
                    }
                    setFieldError(
                      digitsOnly ? validateCareerPhone(digitsOnly, field.label) : null
                    );
                    return;
                  }

                  const emailValue = removeEmailWhitespace(rawValue);
                  e.currentTarget.value = emailValue;
                  if (rawValue !== emailValue) {
                    setFieldError(`${field.label} cannot contain spaces`);
                    return;
                  }
                  setFieldError(
                    emailValue ? validateCareerEmail(emailValue, field.label) : null
                  );
                }
              : undefined
          }
          onBlur={
            validatesInline
              ? (e) => {
                  if (isPhoneField) {
                    const digitsOnly = normalizeCareerPhone(e.currentTarget.value);
                    e.currentTarget.value = digitsOnly;
                    if (!digitsOnly) {
                      setFieldError(field.required ? `${field.label} is required` : null);
                      return;
                    }
                    setFieldError(validateCareerPhone(digitsOnly, field.label));
                    return;
                  }

                  const emailValue = removeEmailWhitespace(e.currentTarget.value).trim();
                  e.currentTarget.value = emailValue;
                  if (!emailValue) {
                    setFieldError(field.required ? `${field.label} is required` : null);
                    return;
                  }
                  setFieldError(validateCareerEmail(emailValue, field.label));
                }
              : undefined
          }
        />
      )}

      {validatesInline && fieldError && (
        <p id={fieldErrorId} className="text-[11px] text-rose-500">
          {fieldError}
        </p>
      )}
      {field.helpText && <p className="text-[11px] text-slate-400">{field.helpText}</p>}
    </div>
  );
}
