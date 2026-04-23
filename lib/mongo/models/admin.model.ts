import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const adminSchema = new Schema(
  {
    ...legacyIdField,
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, default: null },
  },
  defaultSchemaOptions
);

export const AdminModel = getOrCreateModel("Admin", adminSchema, "admins");
