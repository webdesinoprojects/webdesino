import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const mediaSchema = new Schema(
  {
    ...legacyIdField,
    filename: { type: String, required: true },
    url: { type: String, required: true, unique: true, index: true },
    mimeType: { type: String, default: null },
    size: { type: Number, default: null },
  },
  defaultSchemaOptions
);

mediaSchema.index({ createdAt: -1 });

export const MediaModel = getOrCreateModel("Media", mediaSchema, "media");
