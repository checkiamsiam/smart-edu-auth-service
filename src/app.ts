import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
const app: Application = express();

dotenv.config();

// dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export { app };
