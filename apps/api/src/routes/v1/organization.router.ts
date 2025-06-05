import type { HonoContext } from "@/lib/context";
import { db } from "@/lib/db";
import { isPlatformAdmin } from "@/middlewares/authorization.middleware";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { OrganizationService } from "@/services/organization.service";
import { FilterOrganizationsSchema } from "@/types/organization.types";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const organizationRepository = new OrganizationRepository(db);
const organizationService = new OrganizationService(organizationRepository);

export const organizationRouter = new Hono<HonoContext>()
  .use(isPlatformAdmin)
  .get("/", zValidator("query", FilterOrganizationsSchema), async (c) => {
    const filters = c.req.valid("query");

    const orgs = await organizationService.getAll(filters);

    return c.json(orgs);
  });
