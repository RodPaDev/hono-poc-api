import type { HonoContext } from "@/lib/context";
import { db } from "@/lib/db";
import { isPlatformAdmin } from "@/middlewares/authorization.middleware";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { OrganizationService } from "@/services/organization.service";
import { Hono } from "hono";

const organizationRepository = new OrganizationRepository(db);
const organizationService = new OrganizationService(organizationRepository);

export const organizationRouter = new Hono<HonoContext>()
  .use(isPlatformAdmin)
  .get("/", async (c) => {
    const orgs = await organizationService.getAll();

    return c.json(orgs);
  });
