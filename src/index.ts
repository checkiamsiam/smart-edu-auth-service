import dotenv from "dotenv";
import { app } from "./app";
import config from "./config";
import { connectDB } from "./utils/connectDB";
import { print } from "./utils/customPrint";

const runServer = async (): Promise<void> => {
  try {
    dotenv.config();
    await connectDB();
    app.listen(config.port, () => {
      if (config.isDevelopment) {
        print.info(`✔ Server started at http://localhost:${config.port}`);
      }
    });
  } catch (err: any) {
    print.error(err.message);
  }
};

runServer();
