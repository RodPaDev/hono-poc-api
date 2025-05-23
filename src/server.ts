import { Hono } from "hono";
import { meteoriteLandingRouter } from "./routes/meteorite-landing.router.js";
import { GlobalErrorHandler } from "./common/error.js";

const app = new Hono()
  .onError(GlobalErrorHandler)
  .route("/meteorite-landing", meteoriteLandingRouter);

export type AppType = typeof app;
export default app;
