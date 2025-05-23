import { Hono } from "hono";
import { logger } from "hono/logger";
import { meteoriteLandingRouter } from "./routes/meteorite-landing.router.js";
import { GlobalErrorHandler } from "./common/error.js";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { compress } from "hono/compress";
import { openAPISpecs } from "hono-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { openApi } from "./common/open-api.js";

const app = new Hono()
  .use(compress())
  .use(secureHeaders())
  .use(requestId())
  .use(logger())
  .onError(GlobalErrorHandler)
  .route("/meteorite-landing", meteoriteLandingRouter);

app.get("/openapi", openApi(app)).get(
  "/docs",
  swaggerUI({
    title: "Hono API Docs",
    url: "/openapi",
  })
);

export type AppType = typeof app;
export default app;
