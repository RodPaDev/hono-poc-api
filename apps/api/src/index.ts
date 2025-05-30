import { AppConfig } from "@/config/app.config";
import { Env } from "@/env";
import { logger } from "@/lib/logger";
import app from "@/lib/server";
import { serve } from "@hono/node-server";

serve(
  {
    fetch: app.fetch,
    port: Env.PORT,
  },
  (info) => {
    logger.info(`Listening on: ${`http://localhost:${info.port}`}`);
    if (AppConfig.EXPOSE_OPEN_API) {
      logger.info(
        `API Docs on: ${`http://localhost:${info.port}/api/v1/docs`}`,
      );
    }
    logger.debug(`DB Connection: ${Env.DATABASE_URL}`);
  },
);
