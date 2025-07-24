import path from "node:path";
import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

/**
 * Setup Swagger UI with OpenAPI YAML
 * @param app Express app instance
 */
export function swaggerConfig(app: Express): void {
  const swaggerPath = path.resolve(process.cwd(), "docs/openapi.yml");

  const swaggerDocument = YAML.load(swaggerPath);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
