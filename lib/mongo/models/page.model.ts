import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const pageSchema = new Schema(
  {
    ...legacyIdField,
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    content: { type: Schema.Types.Mixed, default: null },
  },
  defaultSchemaOptions
);

pageSchema.index({ title: 1 });

export const PageModel = getOrCreateModel("Page", pageSchema, "pages");
