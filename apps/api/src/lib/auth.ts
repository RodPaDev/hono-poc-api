import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI, organization } from "better-auth/plugins";
import type { Context, Next } from "hono";

import { db } from "@/lib/db.js";
import * as betterAuthSchema from "@/models/better-auth/auth.model.js";

export const auth = betterAuth({
  // TODO: adjust this for all environments
  trustedOrigins: ["http://localhost:5173"],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: betterAuthSchema,
  }),
  plugins: [
    openAPI({
      path: "/docs",
    }),
    organization({
       
    }),
  ],
  emailAndPassword: {
    enabled: true,
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
