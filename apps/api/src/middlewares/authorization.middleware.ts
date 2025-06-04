import type { OrganizationRolePermissions } from "@/config/permissions.config";
import { auth } from "@/lib/auth";
import { AppError } from "@/lib/error";
import { logger } from "@/lib/logger";
import type { Context, Next } from "hono";

function createRebac(
  permissions: OrganizationRolePermissions,
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
          organizationId: organizationId,
          permissions: permissions,
        },
      });
    } catch (_error) {
      throw new AppError.Unauthorized();
    }

    return next();
  };
}

export async function isPlatformAdmin(c: Context, next: Next): Promise<void> {
  try {
    const { success } = await auth.api.userHasPermission({
      headers: c.req.header(),
      body: {
        role: "admin",
        permission: {
          platform: ["read", "create", "update", "delete"],
        },
      },
    });
    if (!success) {
      throw new AppError.Unauthorized();
    }
  } catch (_error) {
    logger.error("Unauthorized access attempt to platform admin route");
    throw new AppError.Unauthorized();
  }
  return next();
}

export const rebacExample = createRebac({
  "meteorite-landing": ["read", "create", "update", "delete"],
});
