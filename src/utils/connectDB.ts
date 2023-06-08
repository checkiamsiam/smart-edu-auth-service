import mongoose from "mongoose";
import config from "../config";
import { print } from "./customPrint";

const connectDB = async (): Promise<void> => {
  try {
    if (!config.dbUri) {
      print.error("No URI found in .env file");
      process.exit(1);
    }
    await mongoose.connect(config.dbUri);
    print.info("Database connected");
  } catch (err: any) {
    print.error(err.message);
  }
};

export { connectDB };
