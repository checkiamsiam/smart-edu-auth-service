import dotenv from "dotenv";
import IConfig from "../interfaces/config.interface";

dotenv.config();

const config: IConfig = {
  isDevelopment: process.env.NODE_ENV === "development",
  port: process.env.PORT || 5001,
  dbUriDev: process.env.DB_URL_DEV,
  dbUriProd: process.env.DB_URL_PROD,
  studentDefaultPassword: process.env.STUDENT_DEFAULT_PASSWORD || "12345678",
  facultyDefaultPassword: process.env.FACULTY_DEFAULT_PASSWORD || "F1234567",
  adminDefaultPassword: process.env.STUDENT_DEFAULT_PASSWORD || "A2345678",
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refreshSecret",
    expiresIn: process.env.JWT_EXPIRES_IN || "6h",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
    expires_in: process.env.REDIS_EXPIRES_IN || "3600",
  },
};

export default config;
