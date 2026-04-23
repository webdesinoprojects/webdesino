import { Schema, Types } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const serviceSubtypeSchema = new Schema(
  {
    ...legacyIdField,
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    icon: { type: String, default: null },
    categoryId: { type: Types.ObjectId, ref: "ServiceCategory", required: true, index: true },
    categoryLegacyId: { type: String, required: true, index: true },
  },
  defaultSchemaOptions
);

serviceSubtypeSchema.index({ categoryId: 1, slug: 1 });

export const ServiceSubtypeModel = getOrCreateModel(
  "ServiceSubtype",
  serviceSubtypeSchema,
  "serviceSubtypes"
);
