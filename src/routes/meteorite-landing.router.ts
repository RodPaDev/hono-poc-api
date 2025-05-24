import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { MeteoriteService } from "../services/meteorite-landing.service.js";
import {
  MeteoriteLandingInsertSchema,
  MeteoriteLandingUpdateSchema,
} from "../models/meteorite-landing.model.js";
import { drizzleZodValidator } from "../middlewares/drizzleZodValidator.js";
import { ClientError } from "../lib/error.js";
import { MeteoriteLandingRepository } from "../repositories/meteorite-landing.repository.js";
import { db } from "../db.js";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { count } from "console";
import { type HonoContext } from "../lib/context.js";

const metoeriteRepository = new MeteoriteLandingRepository(db);
const meteoriteService = new MeteoriteService(metoeriteRepository);

const querySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  year: z.string().optional(),
  min_mass: z.string().optional(),
});

export const meteoriteLandingRouter = new Hono<HonoContext>()
  .get(
    "/",
    // Example of using OpenAPI with Hono and Zod
    describeRoute({
      summary: "List meteorite landings",
      description: "Get a list of meteorite landings with optional filters.",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: resolver(
                z.object({
                  // drizzle-zod is not compatible with this version of zod. not sure if we should use drizzle-zod as of now
                  data: z.array(z.any()),
                  total: z.number(),
                })
              ),
            },
          },
        },
      },
    }),
    zValidator("query", querySchema),
    async (c) => {
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
    }
  )
  .get("/years", async (c) => {
    const years = await meteoriteService.listYears();
    return c.json(years);
  })
  .get("/classes", async (c) => {
    const classes = await meteoriteService.listClasses();
    return c.json(classes);
  })
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().uuid() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const rec = await meteoriteService.getById(id);
      if (!rec) {
        throw ClientError.NotFound;
      }
      return c.json(rec);
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
      const result = await meteoriteService.delete(id);
      if (result.rowCount === 0) {
        throw ClientError.NotFound;
      }
      c.status(204);
      return c.text("ok");
    }
  );
