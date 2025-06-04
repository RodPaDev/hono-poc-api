import type { HonoContext } from "@/lib/context";
import { db } from "@/lib/db";
import { isPlatformAdmin } from "@/middlewares/authorization.middleware";
import { organization } from "@/models";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

export const organizationRouter = new Hono<HonoContext>()
  .use(isPlatformAdmin)
  .get(
    "/",
    // zValidator("query", querySchema),
    async (c) => {
      const orgs = await db.select().from(organization);

      // console.log("Fetched organizations:", orgs);

      return c.json(orgs);
    },
  );
