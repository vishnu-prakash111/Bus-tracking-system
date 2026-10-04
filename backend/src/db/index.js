import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI?.trim();

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connectionInstance = await mongoose.connect(mongoUri, {
      dbName: DB_NAME,
    });

    console.log(
      `MongoDB connected successfully !! DB HOST: ${connectionInstance.connection.host}, DB NAME: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;