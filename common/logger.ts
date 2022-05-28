import winston from "winston";
import config from "../config";

const { combine, label, timestamp, printf, colorize, errors } = winston.format;

function createLogger(): winston.Logger {
    const consoleTransport = new winston.transports.Console({
        level: config.logs.level || "debug",
        format: combine(
            timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }),
            colorize(),
            label({ label: config.applicationName }),
            printf(({ timestamp, level, label, stack, message }) => {
                // print the stack if we have it, message otherwise.
                message = stack || message;
                return `${timestamp} [${label}] ${level}: ${message}`;
            })
        ),
    });

    return winston.createLogger({
        format: errors({ stack: true }),
        transports: [consoleTransport],
    });
}

const loggerInstance: winston.Logger = createLogger();

module.exports = loggerInstance;