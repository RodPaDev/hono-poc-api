import { Hono, type Context, type Next } from "hono";

import { auth, type RolePermissions } from "@/lib/auth";
import type { HonoContext } from "@/lib/context";
import { ClientError } from "@/lib/error";
import { openApi } from "@/lib/open-api";
import { Scalar } from "@scalar/hono-api-reference";
import { meteoriteLandingRouter } from "./meteorite-landing.router";

function createRebac(
  permissions: RolePermissions,
  organizationId?: string,
): (c: Context, next: Next) => Promise<void> {
  return async function rebac(c: Context, next: Next) {
    try {
      await auth.api.hasPermission({
        headers: c.req.header(),
        body: {
          organizationId,
          permissions: permissions,
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Authorization error:", error);
      throw ClientError.Unauthorized;
    }

    return next();
  };
}

const rebac = createRebac({
  "meteorite-landing": ["delete"],
});

export const v1Rotuer = new Hono<HonoContext>()
  .use(rebac)
  .route("/meteorite-landing", meteoriteLandingRouter);

v1Rotuer.get("/reference", openApi(v1Rotuer)).get(
  "/docs",
  Scalar({
    title: "Hono API v1",
    url: "/api/v1/reference",
  }),
);
