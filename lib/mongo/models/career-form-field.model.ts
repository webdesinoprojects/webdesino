import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const careerFormFieldSchema = new Schema(
  {
    ...legacyIdField,
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    type: { type: String, required: true },
    required: { type: Boolean, default: false },
    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
    options: { type: Schema.Types.Mixed, default: null },
    placeholder: { type: String, default: null },
    helpText: { type: String, default: null },
    system: { type: Boolean, default: false },
  },
  defaultSchemaOptions
);

careerFormFieldSchema.index({ order: 1 });

export const CareerFormFieldModel = getOrCreateModel(
  "CareerFormField",
  careerFormFieldSchema,
  "careerFormFields"
);
