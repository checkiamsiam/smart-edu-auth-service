import app from "./app";
import config from "./config";
import { print } from "./utils/customPrint";

const runServer = async (): Promise<void> => {
  try {
    // await connectDB();
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
