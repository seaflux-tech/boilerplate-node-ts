import moment from "moment";
import path from "path";
import { createLogger, format, transports } from "winston";

const {
  combine, timestamp, colorize, json, label, metadata,
} = format;

export class Log {

  public static getLogger() {
    const logFormat = format.printf((info) => {
      if (typeof info.message === "object") {
        info.message = JSON.stringify(info.message, null, 4);
      }
      return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`;
    });

    const logger = createLogger({
      level: process.env.LOG_LEVEL || "debug",
      format: combine(
        label({ label: path.basename(process.mainModule.filename) }),
        timestamp(),
        metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
      ),
      transports: [
        new transports.File({
          filename: "error.log", level: "error",
        }),
        new transports.File({
          filename: "combined.log",
          format: combine(
            json(),
          ),
        }),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      logger.add(new transports.Console({
        format: combine(
          colorize(),
          logFormat,
        ),
      }));
    }

    return logger;
  }
  private static timestampFormat: any = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
}
