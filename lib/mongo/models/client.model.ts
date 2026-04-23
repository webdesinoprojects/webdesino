import { Schema } from "mongoose";
import { getOrCreateModel } from "../model-registry";
import { defaultSchemaOptions, legacyIdField } from "../schema-options";

const clientSchema = new Schema(
  {
    ...legacyIdField,
    name: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
  },
  defaultSchemaOptions
);

clientSchema.index({ createdAt: -1 });

export const ClientModel = getOrCreateModel("Client", clientSchema, "clients");
