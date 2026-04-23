import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const legalPageSchema = new Schema(
  {
    ...legacyIdField,
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    lastUpdated: { type: String, required: true },
    content: { type: String, required: true },
  },
  defaultSchemaOptions
);

export const LegalPageModel = getOrCreateModel("LegalPage", legalPageSchema, "legalPages");
