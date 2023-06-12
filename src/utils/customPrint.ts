import dayjs from "dayjs";
import fs from "fs";
import path from "path";
import pino from "pino";
import PinoPretty from "pino-pretty";

const errorsDir = path.join("logs", "errors");
const infosDir = path.join("logs", "infos");

// Create the necessary directories if they don't exist
fs.mkdirSync(errorsDir, { recursive: true });
fs.mkdirSync(infosDir, { recursive: true });

const print = pino({
  level: "info",
  transport: {
    targets: [
      { target: "pino-pretty", level: "info", options: { colorize: true } },
      {
        level: "info",
        target: "pino/file",
        options: {
          destination: path.join(infosDir, "app.info.log"),
          flags: "a",
        },
      },
    ],
    options: {
      colorize: true,
    },
  },
  prettifier: PinoPretty,
  timestamp: () => `,"time":"${dayjs().format("D MMMM, YYYY [at] h:mm A")}"`,
});
const printError = pino({
  level: "error",
  transport: {
    targets: [
      { target: "pino-pretty", level: "info", options: { colorize: true } },
      {
        level: "error",
        target: "pino/file",
        options: {
          destination: path.join(errorsDir, "app.error.log"),
          flags: "a",
        },
      },
    ],
    options: {
      colorize: true,
    },
  },
  prettifier: PinoPretty,
  timestamp: () => `,"time":"${dayjs().format("D MMMM, YYYY [at] h:mm A")}"`,
});

export { print, printError };
