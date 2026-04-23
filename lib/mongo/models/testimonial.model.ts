import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const testimonialSchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    text: { type: String, required: true },
    company: { type: String, default: null },
    location: { type: String, default: null },
  },
  defaultSchemaOptions
);

testimonialSchema.index({ createdAt: -1 });

export const TestimonialModel = getOrCreateModel("Testimonial", testimonialSchema, "testimonials");
