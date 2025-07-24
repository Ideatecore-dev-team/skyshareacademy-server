import * as dotenv from "dotenv";
import { z } from "zod";
import { logger } from "./logger";

dotenv.config(); // Load .env file into process.env

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "staging", "production"]),
  PORT: z.coerce.number().min(1).max(65535),
  DATABASE_URL: z.string().url(),
  CORS_ORIGIN: z.string().nonempty(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  logger.error("Invalid environment variables:");
  logger.error(JSON.stringify(_env.error.format(), null, 2));

  process.exit(1);
}

export const env = _env.data;
