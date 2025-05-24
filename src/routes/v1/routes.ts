import { Hono } from "hono";
import type { HonoContext } from "../../lib/context";
import { meteoriteLandingRouter } from "./meteorite-landing.router";
import { openApi } from "../../lib/open-api";
import { Scalar } from "@scalar/hono-api-reference";

export const v1Rotuer = new Hono<HonoContext>()
.route(
  "/meteorite-landing",
  meteoriteLandingRouter
);

v1Rotuer.get("/reference", openApi(v1Rotuer)).get(
  "/docs",
  Scalar({
    title: "Hono API v1",
    url: "/api/v1/reference",
  })
);