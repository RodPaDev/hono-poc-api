import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { GlobalErrorHandler } from "./error";

import { Env } from "@/env";
import { setUserSession } from "@/lib/auth";
import type { HonoContext } from "@/lib/context";
import { betterAuthRouter } from "@/routes/auth";
import { v1Rotuer } from "@/routes/v1/routes";

const corsConfig = cors({
  origin: Env.ALLOWED_ORIGINS,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  credentials: true,
});

const app = new Hono<HonoContext>()
  .use(compress())
  .use(secureHeaders())
  .use(requestId())
  .use(logger())
  .onError(GlobalErrorHandler)
  .use("*", corsConfig)
  .use("*", setUserSession)
  .basePath("/api")
  .route("/auth", betterAuthRouter)
  .route("/v1", v1Rotuer);

export type AppType = typeof app;
export default app;
