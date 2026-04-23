import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const serviceCategorySchema = new Schema(
  {
    ...legacyIdField,
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    icon: { type: String, default: null },
  },
  defaultSchemaOptions
);

serviceCategorySchema.index({ title: 1 });

export const ServiceCategoryModel = getOrCreateModel(
  "ServiceCategory",
  serviceCategorySchema,
  "serviceCategories"
);
