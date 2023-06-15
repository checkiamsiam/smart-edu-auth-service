import mongoose from "mongoose";
import config from "../config";
import { print, printError } from "./customLogger.util";

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = config.isDevelopment ? config.dbUriDev : config.dbUriProd;
    if (!dbUri) {
      printError.error("No URI found in .env file");
      process.exit(1);
    }
    await mongoose.connect(dbUri);
    print.info("Database connected");
  } catch (err: any) {
    printError.error(err.message);
  }
};

export { connectDB };
