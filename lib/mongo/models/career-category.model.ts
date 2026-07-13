import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const careerCategorySchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: null },
    active: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  defaultSchemaOptions
);

careerCategorySchema.index({ order: 1, name: 1 });

export const CareerCategoryModel = getOrCreateModel(
  "CareerCategory",
  careerCategorySchema,
  "careerCategories"
);
