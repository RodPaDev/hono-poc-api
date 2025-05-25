import { Hono } from "hono";
import { logger } from "hono/logger";
import { GlobalErrorHandler } from "./lib/error.js";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";
import { cors } from "hono/cors";

import { auth, setUserSession } from "./lib/auth.js";
import { betterAuthRouter } from "./routes/auth.js";
import type { HonoContext } from "./lib/context.js";
import { v1Rotuer } from "./routes/v1/routes.js";

const app = new Hono<HonoContext>()
  .use(compress())
  .use(secureHeaders())
  .use(requestId())
  .use(logger())
  .onError(GlobalErrorHandler)
  .use(
    "*",
    cors({
      // TODO: adjust this for all environments
      origin: "http://localhost:5173",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      credentials: true,
    })
  )
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    console.log("Session:", session);
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  })
  .basePath("/api")
  .route("/auth", betterAuthRouter)
  .route("/v1", v1Rotuer);

export type AppType = typeof app;
export default app;
