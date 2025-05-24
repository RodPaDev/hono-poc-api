import { Hono } from "hono";
import { logger } from "hono/logger";
import { Scalar } from "@scalar/hono-api-reference";
import { meteoriteLandingRouter } from "./routes/meteorite-landing.router.js";
import { GlobalErrorHandler } from "./lib/error.js";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";

import { openApi } from "./lib/open-api.js";
import { setUserSession } from "./lib/auth.js";
import { betterAuthRouter } from "./routes/auth.js";
import type { HonoContext } from "./lib/context.js";

const app = new Hono<HonoContext>({
  strict: false,
})
  .use(compress())
  .use(secureHeaders())
  .use(requestId())
  .use(logger())
  .onError(GlobalErrorHandler)
  .use("*", setUserSession)
  .basePath("/api")
  .route("/auth", betterAuthRouter)
  .route("/meteorite-landing", meteoriteLandingRouter);

app.get("/reference", openApi(app as any)).get(
  "/docs",
  Scalar({
    title: "Hono API Docs",
    url: "/api/reference",
    description: "Hono API Docs",
  })
);

export type AppType = typeof app;
export default app;
