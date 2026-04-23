import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const blogPostSchema = new Schema(
  {
    ...legacyIdField,
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, default: null },
    content: { type: String, default: null },
  },
  defaultSchemaOptions
);

blogPostSchema.index({ date: -1 });
blogPostSchema.index({ createdAt: -1 });

export const BlogPostModel = getOrCreateModel("BlogPost", blogPostSchema, "blogPosts");
