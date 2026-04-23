import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const employeeSchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "editor" },
    permissions: { type: [String], default: [] },
    status: { type: String, default: "active", index: true },
    lastLogin: { type: Date, default: null },
    note: { type: String, default: null },
  },
  defaultSchemaOptions
);

employeeSchema.index({ createdAt: -1 });

export const EmployeeModel = getOrCreateModel("Employee", employeeSchema, "employees");
