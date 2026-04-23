import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const faqSchema = new Schema(
  {
    ...legacyIdField,
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, default: "General", index: true },
    order: { type: Number, default: 0, index: true },
  },
  defaultSchemaOptions
);

faqSchema.index({ category: 1, order: 1 });

export const FaqModel = getOrCreateModel("Faq", faqSchema, "faqs");
