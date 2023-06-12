import cors from "cors";
import express, { Application } from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import config from "./config";
import globalErrorHandler from "./middleware/globalErrorHandler";
import routes from "./routes";
import { print, printError } from "./utils/customPrint";
const app: Application = express();

//global app middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ExpressMongoSanitize());
app.use(hpp());

//development middleware
if (config.isDevelopment) {
  app.use(morgan("dev"));
}

//routes
app.use("/api/v1", routes);
printError.error("test");
print.info("test");
// root
app.get("/", (req, res) => {
  res.status(200).send("welcome to Smart Edu server");
});

// Not found catch
app.all("*", (req, res) => {
  res.status(404).send({ success: false, message: "Adress not found" });
});

// error handling middleware
app.use(globalErrorHandler);

export default app;
