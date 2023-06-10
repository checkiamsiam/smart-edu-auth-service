import dayjs from "dayjs";
import pino from "pino";
import PinoPretty from "pino-pretty";

const print = pino({
  transport: {
    targets: [
      { target: "pino-pretty", level: "info", options: { colorize: true } },
      {
        level: "error",
        target: "pino/file",
        options: {
          destination: "logs/app.error.log",
          flags: "a",
        },
      },
      {
        level: "info",
        target: "pino/file",
        options: {
          destination: "logs/app.info.log",
          flags: "a",
        },
      },
    ],
    options: {
      colorize: true,
    },
  },
  prettifier: PinoPretty,
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export { print };
