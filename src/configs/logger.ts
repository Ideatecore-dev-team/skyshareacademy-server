import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Create a directory for logs if it doesn't exist
const logDirectory = "logs";

// Define file transport settings with rotation
const createDailyRotateTransport = (level: string): DailyRotateFile => {
  return new DailyRotateFile({
    level, // This sets the log level for this transport
    dirname: `${logDirectory}/${level}`, // Separate folder for each level
    filename: "%DATE%.log", // File format with date
    datePattern: "YYYY-MM-DD", // Daily rotation
    maxSize: "10k", // Max size for each file is 1KB
    maxFiles: "1d", // Keep files for 30 days
    // zippedArchive: true, // Archive old log files
  });
};

// Create the logger

const customFormat = winston.format.printf(
  ({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  },
);

export const logger = winston.createLogger({
  level: "debug", // Default log level set to debug to capture all log levels
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }), // Include timestamp for each log entry
    customFormat, // Output logs in JSON format
  ),
  transports: [
    // Console transport (for development or debugging)
    new winston.transports.Console(),

    // File transports for different log levels
    createDailyRotateTransport("debug"), // Adding debug level
    createDailyRotateTransport("info"),
    createDailyRotateTransport("warn"),
    createDailyRotateTransport("error"),
  ],
});

// Graceful shutdown logging
// process.on("SIGINT", () => {
// 	logger.info("Application is shutting down...");
// 	process.exit();
// });

// process.on("SIGTERM", () => {
// 	logger.info("Application is shutting down...");
// 	process.exit();
// });
