import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const projectSchema = new Schema(
  {
    ...legacyIdField,
    title: { type: String, required: true },
    client: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, index: true },
    industry: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fullDescription: { type: String, default: null },
    results: { type: String, default: null },
    resultsData: { type: Schema.Types.Mixed, default: null },
    highlights: { type: [String], default: [] },
    metrics: { type: Schema.Types.Mixed, default: null },
    challenges: { type: Schema.Types.Mixed, default: null },
    solutions: { type: Schema.Types.Mixed, default: null },
    implementation: { type: Schema.Types.Mixed, default: null },
    testimonial: { type: Schema.Types.Mixed, default: null },
    keyLearnings: { type: [String], default: [] },
    relatedServices: { type: Schema.Types.Mixed, default: null },
    faqs: { type: Schema.Types.Mixed, default: null },
  },
  defaultSchemaOptions
);

projectSchema.index({ createdAt: -1 });

export const ProjectModel = getOrCreateModel("Project", projectSchema, "projects");
