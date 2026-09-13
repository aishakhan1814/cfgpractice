import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/saathi';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick failover to in-memory mode if Mongo is offline
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Notice] MongoDB not available locally (${error.message}). Running with resilient in-memory data store for hackathon demo mode.`);
    isConnected = false;
    return false;
  }
}

export function isMongoConnected() {
  return isConnected;
}
