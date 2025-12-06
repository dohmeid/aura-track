import mongoose, { Mongoose } from 'mongoose';

// This utility file handles the connection to the MongoDB database.
// a singleton pattern was used here to optimize performance in Next.js's serverless environment.

// Retrieve the MongoDB connection string from environment variables.
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// type for our cached mongoose object.
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS.Global interface to include our mongoose cache.
declare global {
  var mongoose: MongooseCache;
}

/**
 * We cache the database connection (mongoose.conn) and the promise (mongoose.promise) on the global object.
 * This prevents multiple, concurrent connections from being created during hot-reloading in development.
 *
 * In production, serverless functions spin up and down, and this ensures
 * we reuse an existing connection if one is available.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If we already have a connection, return it immediately.
  if (cached.conn) {
    console.log('Using cached database connection.');
    return cached.conn;
  }

  // If a connection promise is already in progress, wait for it to resolve.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log('Creating new database connection.');
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  // Wait for the connection to complete and store it in the cache.
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, clear the promise to allow retries.
    cached.promise = null;
    throw error;
  }

  // Return the active connection.
  return cached.conn;
}

export default connectDB;
