import { app } from "./app";
import { log } from "./utils/logger";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        log.info(`🌐 Server started on port http://localhost:${PORT}`);
      }
    });
  } catch (err: any) {
    log.error(err.message);
  }
};

startServer();
