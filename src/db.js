import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected");
    mongoose.connection.on('disconnected', () => console.log('[db] disconnected'));
    mongoose.connection.on('reconnected', () => console.log('[db] reconnected'));
    mongoose.connection.on('error', (err) => console.error('[db] error', err));
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
}

export const dbState = () => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] ?? 'unknown';
}