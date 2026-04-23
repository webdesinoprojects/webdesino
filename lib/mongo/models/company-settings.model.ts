import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const companySettingsSchema = new Schema(
  {
    ...legacyIdField,
    key: { type: String, required: true, unique: true, index: true },
    value: { type: String, required: true },
  },
  defaultSchemaOptions
);

export const CompanySettingsModel = getOrCreateModel(
  "CompanySettings",
  companySettingsSchema,
  "companySettings"
);
