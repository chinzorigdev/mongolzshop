import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Mongoose кэшийн типийг тодорхойлох
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Global типийг зөв тодорхойлох
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB-тэй амжилттай холбогдлоо");
        console.log(`📦 Холбогдсон өгөгдлийн сан: ${mongoose.connection.name}`);
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MongoDB холболтын алдаа:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
