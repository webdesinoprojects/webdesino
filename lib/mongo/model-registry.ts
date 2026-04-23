import { Model, Schema, model, models } from "mongoose";

export function getOrCreateModel<T>(
  name: string,
  schema: Schema<T>,
  collection?: string
): Model<T> {
  return (models[name] as Model<T> | undefined) ?? model<T>(name, schema, collection);
}
