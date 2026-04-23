import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const certificationSchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true, index: true },
    image: { type: String, required: true },
  },
  defaultSchemaOptions
);

export const CertificationModel = getOrCreateModel(
  "Certification",
  certificationSchema,
  "certifications"
);
