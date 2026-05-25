import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const enquirySchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: null },
    service: { type: String, default: null, index: true },
    message: { type: String, required: true },
    status: { type: String, default: "new", index: true },
    source: { type: String, default: null, index: true },
    landingService: { type: String, default: null, index: true },
  },
  defaultSchemaOptions
);

enquirySchema.index({ createdAt: -1 });

export const EnquiryModel = getOrCreateModel("Enquiry", enquirySchema, "enquiries");
