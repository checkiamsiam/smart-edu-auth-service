import dotenv from "dotenv";
import IConfig from "../interfaces/config.interface";

dotenv.config();

const config: IConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
  port: process.env.PORT || 5000,
  dbUriDev: process.env.DB_URL_DEV,
  dbUriProd: process.env.DB_URL_PROD,
  studentDefaultPassword: process.env.STUDENT_DEFAULT_PASSWORD || "12345678",
};

export default config;
