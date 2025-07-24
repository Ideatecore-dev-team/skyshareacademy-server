import { PrismaClient } from "@prisma/client";
import { env } from "./env";
// import { logger } from "./logger";

export const Prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

// Prisma.$on("query", (e) => {
// 	logger.info(e.query);
// 	logger.info(e.params);
// 	logger.info(`${e.duration}ms`);
// });

// Prisma.$on("error", (e) => {
// 	logger.info(e);
// });

// Prisma.$on("warn", (e) => {
// 	logger.info(e);
// });

// Prisma.$on("info", (e) => {
// 	logger.info(e);
// });
