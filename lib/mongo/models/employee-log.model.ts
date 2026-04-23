import { Schema, Types } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const employeeLogSchema = new Schema(
  {
    ...legacyIdField,
    employeeId: { type: Types.ObjectId, ref: "Employee", required: true, index: true },
    employeeLegacyId: { type: String, required: true, index: true },
    action: { type: String, required: true },
    section: { type: String, required: true },
  },
  {
    ...defaultSchemaOptions,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

employeeLogSchema.index({ createdAt: -1 });

export const EmployeeLogModel = getOrCreateModel("EmployeeLog", employeeLogSchema, "employeeLogs");
