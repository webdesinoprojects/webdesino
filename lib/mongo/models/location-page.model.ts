import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const locationPageSchema = new Schema(
  {
    ...legacyIdField,
    slug: { type: String, required: true, unique: true, index: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    content: { type: Schema.Types.Mixed, default: null },
    serviceFocus: { type: String, default: "all-services", index: true },
    state: { type: String, default: "Delhi", index: true },
  },
  defaultSchemaOptions
);

locationPageSchema.index({ state: 1, serviceFocus: 1 });
locationPageSchema.index({ location: 1 });
locationPageSchema.index({ updatedAt: -1 });
locationPageSchema.index({ createdAt: -1 });

export const LocationPageModel = getOrCreateModel("LocationPage", locationPageSchema, "locationPages");
