import { Schema, Types } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const careerApplicationSchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: null },
    cvUrl: { type: String, default: null },
    cvName: { type: String, default: null },
    note: { type: String, default: null },
    data: { type: Schema.Types.Mixed, default: {} },
    categoryId: { type: Types.ObjectId, ref: "CareerCategory", default: null, index: true },
    categoryLegacyId: { type: String, default: null, index: true },
    categorySlug: { type: String, default: null, index: true },
    categoryName: { type: String, default: null },
    status: { type: String, default: "new", index: true },
  },
  defaultSchemaOptions
);

careerApplicationSchema.index({ createdAt: -1 });

export const CareerApplicationModel = getOrCreateModel(
  "CareerApplication",
  careerApplicationSchema,
  "careerApplications"
);
