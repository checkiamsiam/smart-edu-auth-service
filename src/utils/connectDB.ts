import mongoose from "mongoose";
import { print } from "./customPrint";
const { DB_URI } = process.env;

const connectDB = async (): Promise<void> => {
  try {
    if (!DB_URI) {
      print.error("No URI found in .env file");
      process.exit(1);
    }
    await mongoose.connect(DB_URI);
    print.info("Database connected");
  } catch (err: any) {
    print.error(err.message);
  }
};

export { connectDB };
