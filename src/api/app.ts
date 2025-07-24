import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { corsConfig } from "../configs/cors";
import { env } from "../configs/env";
import { rateLimiter } from "../configs/rateLimiter";
import { swaggerConfig } from "../configs/swagger";
import { NotFoundException } from "../errors/Errors";
import { ErrorMiddleware } from "../middlewares/error.middleware";
import { publicRouter } from "./public/public.router";
import { superAdminRouter } from "./superadmin/superadmin.router";

export const app = express();

app.disable("x-powered-by");
app.use(rateLimiter);
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === "development") {
  swaggerConfig(app);
  app.use(morgan("dev"));
}

app.get("/", (_req, res) => {
  res.status(200).json({
    data: null,
    message: "hello MSIM sekai",
    success: true,
  });
});

// List of router
app.use(publicRouter);
app.use("/superadmin", superAdminRouter);

app.use((req) => {
  const endpoint = req.originalUrl;

  throw new NotFoundException(`${endpoint} url not found!`);
});

app.use(ErrorMiddleware);
