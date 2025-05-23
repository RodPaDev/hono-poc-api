import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import type { MeteoriteService } from "../services/meteorite-landing.service.js";
import {
  MeteoriteLandingInsertSchema,
  MeteoriteLandingUpdateSchema,
} from "../models/meteorite-landing.model.js";
import { drizzleZodValidator } from "../middlewares/drizzleZodValidator.js";

const querySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  year: z.string().optional(),
  min_mass: z.string().optional(),
});

export function createMeteoriteRouter(meteoriteService: MeteoriteService) {
  return new Hono()
    .get("/", zValidator("query", querySchema), async (c) => {
      const {
        page = "1",
        pageSize = "10",
        year,
        min_mass,
      } = c.req.valid("query");
      const { data, total } = await meteoriteService.list({
        page: parseInt(page, 10),
        pageSize: parseInt(pageSize, 10),
        year,
        minMass: min_mass ? parseFloat(min_mass) : undefined,
      });
      return c.json({ data, total });
    })
    .get("/years", async (c) => {
      return c.json(await meteoriteService.listYears());
    })
    .get("/classes", async (c) => {
      return c.json(await meteoriteService.listClasses());
    })
    .get(
      "/:id",
      zValidator("param", z.object({ id: z.string().uuid() })),
      async (c) => {
        const { id } = c.req.valid("param");
        const rec = await meteoriteService.getById(id);
        return rec ? c.json(rec, 200) : c.json({ error: "Not Found" }, 404);
      }
    )
    .post(
      "/",
      drizzleZodValidator("json", MeteoriteLandingInsertSchema),
      async (c) => {
        const payload = c.req.valid("json");
        const created = await meteoriteService.create(payload);
        return c.json(created, 201);
      }
    )
    .put(
      "/:id",
      zValidator("param", z.object({ id: z.string().uuid() })),
      drizzleZodValidator("json", MeteoriteLandingUpdateSchema),
      async (c) => {
        const { id } = c.req.valid("param");
        const payload = c.req.valid("json");
        const updated = await meteoriteService.update(id, payload);
        return c.json(updated, 200);
      }
    )
    .delete(
      "/:id",
      zValidator("param", z.object({ id: z.string().uuid() })),
      async (c) => {
        const { id } = c.req.valid("param");
        await meteoriteService.delete(id);
        c.status(204);
        return c.text("");
      }
    );
}

// export type AppType = ReturnType<typeof createMeteoriteRouter>;
