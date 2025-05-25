import { Hono } from "hono";
import { logger } from "hono/logger";
import { GlobalErrorHandler } from "./error.js";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";
import { cors } from "hono/cors";

import { setUserSession } from "@/lib/auth.js";
import { betterAuthRouter } from "@/routes/auth.js";
import type { HonoContext } from "@/lib/context.js";
import { v1Rotuer } from "@/routes/v1/routes.js";

const corsConfig = cors({
  // TODO: adjust this for all environments
  origin: "http://localhost:5173",
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
