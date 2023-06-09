import dotenv from "dotenv";
import IConfig from "../types/configInterface";

dotenv.config();

const config: IConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
  port: process.env.PORT || 5000,
  dbUri: process.env.DB_URL,
};

export default config;
