import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { env } from "../configs/env";
import { logger } from "../configs/logger";
import { HttpException } from "../errors/Errors";
// import { logger } from "../config/logger";

export const ErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // logger.error(err.message);
  if (env.NODE_ENV !== "development") {
    // logger.error(err.stack || err.message);
    logger.error(`[${err.name}] ${err.message}`);
  }

  // Check both the instance and the name property
  if (err instanceof ZodError) {
    const errorMessage = err.errors
      // .map((e) => `${e.path}: ${e.message}`)
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");
    const formatted = err.flatten();
    res.status(422).json({
      errors: true,
      data: formatted.fieldErrors,
      message: `Validation failed ${errorMessage}`,
      success: false,
    });
    return;
  }

  if (err instanceof HttpException) {
    res.status(err.status).json({
      errors: err.errors || true,
      message: err.message,
      success: false,
    });
    return;
  }

  res.status(500).json({
    errors: true,
    message: "Internal Server Error",
    success: false,
  });
};
