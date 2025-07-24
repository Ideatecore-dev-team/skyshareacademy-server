import { app } from "./api/app";
import { env } from "./configs/env";
import { logger } from "./configs/logger";

app.listen(env.PORT, () => {
  logger.info(`server running in port ${env.PORT}`);
});
