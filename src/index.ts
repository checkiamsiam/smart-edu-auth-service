import { app } from "./app";
import { print } from "./utils/customPrint";

const PORT = process.env.PORT || 5000;

const runServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        print.info(`✔ Server started at http://localhost:${PORT}`);
      }
    });
  } catch (err: any) {
    print.error(err.message);
  }
};

runServer();
