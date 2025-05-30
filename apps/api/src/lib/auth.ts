import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, openAPI, organization } from "better-auth/plugins";
import type { Context, Next } from "hono";

import { Env } from "@/env";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import * as schema from "@/models";
import { createAccessControl } from "better-auth/plugins/access";
import { defaultRoles } from "better-auth/plugins/organization/access";

const permissions = {
  "meteorite-landing": ["read", "create", "update", "delete"],
  "meteorite-landing:year": ["read", "create", "update", "delete"],
} as const;

export type RolePermissions = {
  [K in keyof typeof permissions]?: Array<(typeof permissions)[K][number]>;
};

export const bussinessAc = createAccessControl(permissions);

const user = bussinessAc.newRole({
  "meteorite-landing": ["read", "create", "update", "delete"],
});

export const auth = betterAuth({
  trustedOrigins: Env.ALLOWED_ORIGINS,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    openAPI({
      path: "/docs",
    }),
    admin({}),
    organization({
      ac: bussinessAc,
      roles: {
        owner: defaultRoles.owner,
        user,
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          if (ctx?.path === "/sign-up/email") {
            try {
              await auth.api.createOrganization({
                body: {
                  name: "Default Organization",
                  userId: user.id,
                  slug: `default-org-${user.id}`,
                },
              });
            } catch (error) {
              logger.error(error, "Error creating organization");
            }
          }
        },
      },
    },
  },
});

export async function setUserSession(c: Context, next: Next) {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
}

export type AuthType = typeof auth;
