import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const blogCommentSchema = new Schema(
  {
    ...legacyIdField,
    blogPostLegacyId: { type: String, required: true, index: true },
    postSlug: { type: String, required: true, index: true },
    postTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    comment: { type: String, required: true },
    status: { type: String, default: "pending", index: true },
  },
  defaultSchemaOptions
);

blogCommentSchema.index({ blogPostLegacyId: 1, status: 1, createdAt: -1 });
blogCommentSchema.index({ status: 1, createdAt: -1 });

export const BlogCommentModel = getOrCreateModel("BlogComment", blogCommentSchema, "blogComments");
