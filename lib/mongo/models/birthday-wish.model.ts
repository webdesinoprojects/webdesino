import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions } from "../schema-options";

const birthdayPhotoSchema = new Schema(
  {
    url: { type: String, required: true },
    name: { type: String, default: null },
    size: { type: Number, default: null },
    mimeType: { type: String, default: null },
    storageProvider: { type: String, default: null },
    fileId: { type: String, default: null },
    filePath: { type: String, default: null },
    message: { type: String, default: "" },
  },
  { _id: false }
);

const birthdayMediaSchema = new Schema(
  {
    url: { type: String, required: true },
    name: { type: String, default: null },
    size: { type: Number, default: null },
    mimeType: { type: String, default: null },
    storageProvider: { type: String, default: null },
    fileId: { type: String, default: null },
    filePath: { type: String, default: null },
  },
  { _id: false }
);

const birthdayWishSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    templateId: { type: String, required: true, index: true },
    recipientName: { type: String, required: true },
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    copy: { type: Schema.Types.Mixed, default: {} },
    passcode: { type: String, default: null },
    revealPhoto: { type: birthdayPhotoSchema, default: null },
    memories: { type: [birthdayPhotoSchema], default: [] },
    music: { type: birthdayMediaSchema, default: null },
    voiceRecording: { type: birthdayMediaSchema, default: null },
    cakeTheme: { type: String, default: "strawberry" },
    finalMessage: { type: String, default: "Thank you for celebrating with me!" },
    photos: { type: [birthdayPhotoSchema], default: [] },
  },
  defaultSchemaOptions
);

birthdayWishSchema.index({ createdAt: -1 });

export const BirthdayWishModel = getOrCreateModel(
  "BirthdayWish",
  birthdayWishSchema,
  "birthdayWishes"
);
