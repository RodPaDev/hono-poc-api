import { AppConfig } from "@/config/app.config";
import {
  ORGANIZATION_ROLES,
  organizationAC,
  USER_ROLES,
  userAC,
} from "@/config/permissions.config";
import { Env } from "@/env";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { logger } from "@/lib/logger";
import * as schema from "@/models";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as plugins from "better-auth/plugins";
import type { Context, Next } from "hono";

export const auth = betterAuth({
  trustedOrigins: Env.ALLOWED_ORIGINS,
  secret: Env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    plugins.openAPI({
      path: "/docs",
      disableDefaultReference: !AppConfig.EXPOSE_OPEN_API,
    }),
    plugins.admin({
      ac: userAC,
      roles: USER_ROLES,
    }),
    plugins.emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        switch (type) {
          case "forget-password":
            sendEmail(email, "ForgotPassword", {
              otp,
            });
            break;
          default:
            break;
        }
      },
    }),
    plugins.organization({
      ac: organizationAC,
      roles: ORGANIZATION_ROLES,
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
