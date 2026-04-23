import { SchemaOptions } from "mongoose";

export const defaultSchemaOptions: SchemaOptions = {
  strict: true,
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any) => {
      ret.id = ret._id?.toString?.();
      return ret;
    },
  },
};

export const legacyIdField: Record<string, unknown> = {
  legacyId: { type: String, required: true, unique: true, index: true },
};
