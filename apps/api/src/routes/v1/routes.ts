import { AppConfig } from "@/config/app.config";
import { auth, type RolePermissions } from "@/lib/auth";
import type { HonoContext } from "@/lib/context";
import { AppError } from "@/lib/error";
import { openApi } from "@/lib/open-api";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono, type Context, type Next } from "hono";
import { meteoriteLandingRouter } from "./meteorite-landing.router";

function createRebac(
  permissions: RolePermissions,
  organizationId?: string,
): (c: Context, next: Next) => Promise<void> {
  return async function rebac(c: Context, next: Next) {
    // OpenAPI docs should have their own access control if needed
    // You can use Hono Basic Auth or any other method to protect the docs
    if (c.req.path.includes("/docs") || c.req.path.includes("/reference")) {
      return next();
    }

    try {
      await auth.api.hasPermission({
        headers: c.req.header(),
        body: {
          organizationId,
          permissions: permissions,
        },
      });
    } catch (_error) {
      throw new AppError.Unauthorized();
    }

    return next();
  };
}

const rebac = createRebac({
  "meteorite-landing": ["read", "create", "update", "delete"],
});

export const v1Rotuer = new Hono<HonoContext>()
  .use(rebac)
  .route("/meteorite-landing", meteoriteLandingRouter);

if (AppConfig.EXPOSE_OPEN_API) {
  v1Rotuer.get("/reference", openApi(v1Rotuer)).get(
    "/docs",
    Scalar({
      title: "Hono API v1",
      url: "/api/v1/reference",
    }),
  );
}
