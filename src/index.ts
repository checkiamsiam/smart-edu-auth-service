import app from "./app";
import config from "./config";
import { print, printError } from "./utils/customPrint";

const runServer = async (): Promise<void> => {
  try {
    // await connectDB();
    app.listen(config.port, () => {
      if (config.isDevelopment) {
        print.info(`✔ Server started at http://localhost:${config.port}`);
      }
    });
  } catch (err: any) {
    printError.error(err.message);
  }
};

runServer();
