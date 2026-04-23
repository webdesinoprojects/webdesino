import mongoose from "mongoose";

type MongoCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __mongoCache: MongoCache | undefined;
}

const cached: MongoCache = global.__mongoCache ?? { conn: null, promise: null };

if (!global.__mongoCache) {
  global.__mongoCache = cached;
}

export async function connectToMongo(): Promise<typeof mongoose> {
  const mongoUri = process.env.MONGODB_URI;
  const mongoDb = process.env.MONGODB_DB;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!mongoDb) {
    throw new Error("Missing MONGODB_DB environment variable.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri, {
      dbName: mongoDb,
      maxPoolSize: 20,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function disconnectMongo(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  cached.conn = null;
  cached.promise = null;
}
