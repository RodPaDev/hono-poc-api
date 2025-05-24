import { Hono } from "hono";
import { logger } from "hono/logger";;
import { GlobalErrorHandler } from "./lib/error";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";

import { setUserSession } from "./lib/auth";
import { betterAuthRouter } from "./routes/auth";
import type { HonoContext } from "./lib/context";
import { v1Rotuer } from "./routes/v1/routes";

const app = new Hono<HonoContext>()
  .use(compress())
  .use(secureHeaders())
  .use(requestId())
  .use(logger())
  .onError(GlobalErrorHandler)
  .use("*", setUserSession)
  .basePath("/api")
  .route("/auth", betterAuthRouter)
  .route("/v1", v1Rotuer)

export type AppType = typeof app;
export default app;
