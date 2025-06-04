import { AppConfig } from "@/config/app.config";
import type { HonoContext } from "@/lib/context";
import { openApi } from "@/lib/open-api";
import { rebacExample } from "@/middlewares/authorization.middleware";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { meteoriteLandingRouter } from "./meteorite-landing.router";
import { organizationRouter } from "./organization.router";

export const v1Rotuer = new Hono<HonoContext>()
  // .use(rebacExample)
  .route("/meteorite-landing", meteoriteLandingRouter)
  .route("/organizations", organizationRouter);

if (AppConfig.EXPOSE_OPEN_API) {
  v1Rotuer.get("/reference", openApi(v1Rotuer)).get(
    "/docs",
    Scalar({
      title: "Hono API v1",
      url: "/api/v1/reference",
    }),
  );
}
