"use server";

import { randomBytes, randomInt } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { connectToMongo } from "@/lib/mongo/connection";
import { BirthdayWishModel } from "@/lib/mongo/models/birthday-wish.model";
import { getDefaultBirthdayTrack } from "@/lib/birthday-music";

const MAX_MEMORIES = 15;
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_AUDIO_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ALLOWED_AUDIO_TYPES = [
  "audio/aac",
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
  "audio/x-wav",
];
const TEMPLATE_IDS = ["kawaii-unlock", "romantic-puzzle", "heart-year", "dog-scrapbook"] as const;
const CAKE_THEMES = ["strawberry", "chocolate", "matcha", "taro"] as const;

const birthdaySchema = z.object({
  templateId: z.enum(TEMPLATE_IDS),
  recipientName: z.string().trim().min(2, "Recipient name is required").max(60),
  senderName: z.string().trim().max(60).default(""),
  passcode: z.string().trim().max(4).default(""),
  message: z.string().trim().max(1200).default(""),
  cakeTheme: z.enum(CAKE_THEMES),
  finalMessage: z.string().trim().max(240),
  copy: z
    .record(z.string(), z.union([z.string().max(400), z.array(z.string().max(80)).max(24)]))
    .default({}),
}).superRefine((data, ctx) => {
  if (data.senderName.length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["senderName"],
      message: "Sender name is required",
    });
  }

  if (data.templateId !== "kawaii-unlock" && data.templateId !== "dog-scrapbook") return;

  if (!/^\d{4}$/.test(data.passcode)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passcode"],
      message: "Passcode must be exactly 4 numbers",
    });
  }

  if (data.message.length < 20) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["message"],
      message: "Write at least 20 characters",
    });
  }
});

export type BirthdayTemplateId = (typeof TEMPLATE_IDS)[number];

export type BirthdayWish = {
  id: string;
  slug: string;
  templateId: BirthdayTemplateId;
  recipientName: string;
  senderName: string;
  message: string;
  copy: BirthdayCopy;
  revealPhoto: BirthdayPhoto | null;
  memories: BirthdayPhoto[];
  music: BirthdayMedia | null;
  voiceRecording: BirthdayMedia | null;
  cakeTheme: (typeof CAKE_THEMES)[number];
  finalMessage: string;
  photos: BirthdayPhoto[];
  createdAt?: Date | string;
};

type BirthdayPhoto = {
  url: string;
  name: string | null;
  size: number | null;
  mimeType: string | null;
  storageProvider?: "imagekit" | "supabase" | "local";
  fileId?: string | null;
  filePath?: string | null;
  message?: string;
};

type BirthdayMedia = {
  url: string;
  name: string | null;
  size: number | null;
  mimeType: string | null;
  storageProvider?: "imagekit" | "supabase" | "local";
  fileId?: string | null;
  filePath?: string | null;
};

export type BirthdayCopy = Record<string, string | string[]>;

function sanitizeText(value: FormDataEntryValue | null, max: number) {
  if (value == null) return "";
  return String(value).trim().replace(/[<>]/g, "").substring(0, max);
}

function sanitizeFilename(value: string) {
  return value
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .substring(0, 180);
}

function createSlugBase(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 32);

  return slug || "birthday";
}

function parseCopy(value: FormDataEntryValue | null): BirthdayCopy {
  if (!value) return {};

  try {
    const raw = JSON.parse(String(value));
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};

    return Object.entries(raw).reduce<BirthdayCopy>((copy, [key, item]) => {
      const safeKey = key.replace(/[^a-zA-Z0-9_]/g, "").substring(0, 60);
      if (!safeKey) return copy;

      if (Array.isArray(item)) {
        copy[safeKey] = item
          .map((entry) => String(entry || "").trim().replace(/[<>]/g, "").substring(0, 80))
          .filter(Boolean)
          .slice(0, 24);
        return copy;
      }

      if (typeof item === "string" || typeof item === "number") {
        copy[safeKey] = String(item).trim().replace(/[<>]/g, "").substring(0, 400);
      }

      return copy;
    }, {});
  } catch {
    return {};
  }
}

async function generateUniqueSlug(recipientName: string) {
  await connectToMongo();
  const base = createSlugBase(recipientName);

  for (let i = 0; i < 12; i += 1) {
    const slug = `${base}-${randomInt(1000, 9999)}`;
    const existing = await BirthdayWishModel.exists({ slug });
    if (!existing) return slug;
  }

  return `${base}-${randomBytes(3).toString("hex")}`;
}

function getSupabaseStorageClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Birthday image storage is not configured");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getImageKitBirthdayConfig() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) return null;

  const rootFolder = process.env.IMAGEKIT_BIRTHDAY_FOLDER || "/birthday";

  return {
    privateKey,
    rootFolder: rootFolder.startsWith("/") ? rootFolder : `/${rootFolder}`,
  };
}

async function uploadBirthdayFileToImageKit({
  file,
  slug,
  folder,
  index,
}: {
  file: File;
  slug: string;
  folder: "reveal" | "memories" | "music" | "voice";
  index: number;
}): Promise<BirthdayMedia> {
  const config = getImageKitBirthdayConfig();
  if (!config) throw new Error("ImageKit birthday storage is not configured");

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = sanitizeFilename(file.name) || `${folder}-${index + 1}`;
  const uploadFolder = `${config.rootFolder}/${slug}/${folder}`.replace(/\/{2,}/g, "/");
  const body = new FormData();

  body.append("file", new Blob([new Uint8Array(buffer)], { type: file.type }), safeName);
  body.append("fileName", `${index + 1}-${Date.now()}-${safeName}`);
  body.append("folder", uploadFolder);
  body.append("useUniqueFileName", "true");

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.privateKey}:`).toString("base64")}`,
    },
    body,
  });

  const data = (await response.json().catch(() => null)) as
    | {
        url?: string;
        fileId?: string;
        filePath?: string;
        name?: string;
        message?: string;
      }
    | null;

  if (!response.ok || !data?.url) {
    throw new Error(data?.message || "ImageKit upload failed");
  }

  return {
    url: data.url,
    name: data.name || file.name,
    size: file.size,
    mimeType: file.type,
    storageProvider: "imagekit",
    fileId: data.fileId || null,
    filePath: data.filePath || null,
  };
}

async function uploadBirthdayFile({
  file,
  slug,
  folder,
  index,
  allowedTypes,
  maxBytes,
}: {
  file: File;
  slug: string;
  folder: "reveal" | "memories" | "music" | "voice";
  index: number;
  allowedTypes: string[];
  maxBytes: number;
}): Promise<BirthdayMedia> {
  if (file.size <= 0) throw new Error("File is empty");
  if (file.size > maxBytes) {
    throw new Error(
      folder === "music" || folder === "voice"
        ? "Audio file must be under 8 MB"
        : "Each image must be under 3 MB"
    );
  }
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      folder === "music" || folder === "voice"
        ? "Only common audio files are allowed"
        : "Only JPG, PNG, and WebP images are allowed"
    );
  }

  const imageKitConfig = getImageKitBirthdayConfig();
  if (imageKitConfig) {
    return uploadBirthdayFileToImageKit({ file, slug, folder, index });
  }

  const supabase = getSupabaseStorageClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const storagePath = `birthday/${slug}/${folder}/${index + 1}-${Date.now()}-${sanitizeFilename(file.name)}`;

  const { error } = await supabase.storage.from("images").upload(storagePath, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("images").getPublicUrl(storagePath);
  if (!data?.publicUrl) throw new Error("Could not create image URL");

  return {
    url: data.publicUrl,
    name: file.name,
    size: file.size,
    mimeType: file.type,
    storageProvider: "supabase",
    filePath: storagePath,
  };
}

export async function createBirthdayWish(formData: FormData) {
  const parsed = birthdaySchema.safeParse({
    templateId: sanitizeText(formData.get("templateId"), 40),
    recipientName: sanitizeText(formData.get("recipientName"), 60),
    senderName: sanitizeText(formData.get("senderName"), 60),
    passcode: sanitizeText(formData.get("passcode"), 4),
    message: sanitizeText(formData.get("message"), 1200),
    cakeTheme: sanitizeText(formData.get("cakeTheme"), 40) || "strawberry",
    finalMessage:
      sanitizeText(formData.get("finalMessage"), 240) || "Thank you for celebrating with me!",
    copy: parseCopy(formData.get("copy")),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Please check the birthday details",
    };
  }

  const isKawaiiTemplate = parsed.data.templateId === "kawaii-unlock";
  const isRomanticTemplate = parsed.data.templateId === "romantic-puzzle";
  const isHeartTemplate = parsed.data.templateId === "heart-year";
  const isDogTemplate = parsed.data.templateId === "dog-scrapbook";
  const revealFile = formData.get("revealPhoto");
  if ((isKawaiiTemplate || isDogTemplate) && (!(revealFile instanceof File) || revealFile.size <= 0)) {
    return { success: false, error: "Main reveal photo is required" };
  }

  const memoryFiles = formData
    .getAll("memories")
    .filter((file): file is File => file instanceof File && file.size > 0)
    .slice(0, MAX_MEMORIES);

  if (isRomanticTemplate && memoryFiles.length < 4) {
    return { success: false, error: "Please upload at least 4 photos for this template" };
  }

  if (isHeartTemplate && memoryFiles.length !== 3) {
    return { success: false, error: "Please upload exactly 3 photos for the heart template" };
  }

  if (isDogTemplate && memoryFiles.length < 4) {
    return { success: false, error: "Please upload at least 4 photos for the dog scrapbook template" };
  }

  const memoryMessages = formData
    .getAll("memoryMessages")
    .map((message) => sanitizeText(message, 180));

  const musicFile = formData.get("music");
  const defaultMusicId = sanitizeText(formData.get("defaultMusic"), 60);
  const defaultMusic = defaultMusicId ? getDefaultBirthdayTrack(defaultMusicId) : null;
  if (defaultMusicId && !defaultMusic) {
    return { success: false, error: "Please choose a valid included birthday song" };
  }
  const voiceFile = formData.get("voiceRecording");

  let slug = "";
  try {
    slug = await generateUniqueSlug(parsed.data.recipientName);

    let revealPhoto: BirthdayPhoto | null = null;
    if ((isKawaiiTemplate || isDogTemplate) && revealFile instanceof File) {
      try {
        revealPhoto = await uploadBirthdayFile({
          file: revealFile,
          slug,
          folder: "reveal",
          index: 0,
          allowedTypes: ALLOWED_IMAGE_TYPES,
          maxBytes: MAX_IMAGE_BYTES,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        const safeMessages = [
          "File is empty",
          "Each image must be under 3 MB",
          "Only JPG, PNG, and WebP images are allowed",
        ];

        if (safeMessages.includes(message)) {
          return { success: false, error: message };
        }

        console.error("Birthday reveal upload failed:", message || error);
        return { success: false, error: "Image upload failed. Please try again later." };
      }
    }

    const memories: BirthdayPhoto[] = [];

    for (const [index, file] of memoryFiles.entries()) {
      try {
        const uploaded = await uploadBirthdayFile({
          file,
          slug,
          folder: "memories",
          index,
          allowedTypes: ALLOWED_IMAGE_TYPES,
          maxBytes: MAX_IMAGE_BYTES,
        });

        memories.push({
          ...uploaded,
          message: memoryMessages[index] || "",
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        const safeMessages = [
          "File is empty",
          "Each image must be under 3 MB",
          "Only JPG, PNG, and WebP images are allowed",
        ];

        if (safeMessages.includes(message)) {
          return { success: false, error: message };
        }

        console.error("Birthday photo upload failed:", message || error);
        return { success: false, error: "Image upload failed. Please try again later." };
      }
    }

    let music: BirthdayMedia | null = null;
    if (musicFile instanceof File && musicFile.size > 0) {
      try {
        music = await uploadBirthdayFile({
          file: musicFile,
          slug,
          folder: "music",
          index: 0,
          allowedTypes: ALLOWED_AUDIO_TYPES,
          maxBytes: MAX_AUDIO_BYTES,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        const safeMessages = [
          "File is empty",
          "Audio file must be under 8 MB",
          "Only common audio files are allowed",
        ];

        if (safeMessages.includes(message)) {
          return { success: false, error: message };
        }

        console.error("Birthday music upload failed:", message || error);
        return { success: false, error: "Music upload failed. Please try again later." };
      }
    } else if (defaultMusic) {
      music = {
        url: defaultMusic.url,
        name: `${defaultMusic.label} - ${defaultMusic.artist}`,
        size: null,
        mimeType: "audio/mpeg",
        storageProvider: "local",
        fileId: null,
        filePath: defaultMusic.url,
      };
    }

    let voiceRecording: BirthdayMedia | null = null;
    if (isKawaiiTemplate && voiceFile instanceof File && voiceFile.size > 0) {
      try {
        voiceRecording = await uploadBirthdayFile({
          file: voiceFile,
          slug,
          folder: "voice",
          index: 0,
          allowedTypes: ALLOWED_AUDIO_TYPES,
          maxBytes: MAX_AUDIO_BYTES,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        const safeMessages = [
          "File is empty",
          "Audio file must be under 8 MB",
          "Only common audio files are allowed",
        ];

        if (safeMessages.includes(message)) {
          return { success: false, error: message };
        }

        console.error("Birthday voice upload failed:", message || error);
        return { success: false, error: "Voice upload failed. Please try again later." };
      }
    }

    await BirthdayWishModel.create({
      slug,
      ...parsed.data,
      senderName: parsed.data.senderName || "Someone",
      passcode: isKawaiiTemplate || isDogTemplate ? parsed.data.passcode : null,
      message:
        parsed.data.message ||
        parsed.data.finalMessage ||
        `Happy birthday, ${parsed.data.recipientName}!`,
      revealPhoto,
      memories,
      music,
      voiceRecording,
      photos: revealPhoto ? [revealPhoto, ...memories] : memories,
    });

    return { success: true, slug };
  } catch (error) {
    console.error("Birthday wish create failed:", error);
    return { success: false, error: "Could not create the birthday page. Please try again." };
  }
}

export async function verifyBirthdayPasscode(slug: string, passcode: string) {
  const safeSlug = slug.trim().toLowerCase();
  const safePasscode = passcode.trim();

  if (!/^[a-z0-9-]{3,64}$/.test(safeSlug) || !/^\d{4}$/.test(safePasscode)) {
    return { success: false };
  }

  await connectToMongo();
  const wish = await BirthdayWishModel.findOne({ slug: safeSlug }).select({ passcode: 1 }).lean();

  return { success: Boolean(wish && wish.passcode === safePasscode) };
}
