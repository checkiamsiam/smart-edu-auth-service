import dotenv from "dotenv";
import IConfig from "../types/configInterface";

dotenv.config();

const config: IConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
  port: process.env.PORT || 5000,
  dbUriDev: process.env.DB_URL_DEV,
  dbUriProd: process.env.DB_URL_PROD,
};

export default config;
