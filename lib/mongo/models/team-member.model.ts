import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const teamMemberSchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0, index: true },
  },
  defaultSchemaOptions
);

teamMemberSchema.index({ createdAt: -1 });

export const TeamMemberModel = getOrCreateModel("TeamMember", teamMemberSchema, "teamMembers");
