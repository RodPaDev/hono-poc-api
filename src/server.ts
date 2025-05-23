import { Hono } from "hono";
import { createMeteoriteRouter } from "./routes/meteorite-landing.router.js";
import { MeteoriteService } from "./services/meteorite-landing.service.js";
import { MeteoriteLandingRepository } from "./repositories/meteorite-landing.repository.js";
import { db } from "./db.js";

const app = new Hono().route(
  "/api",
  createMeteoriteRouter(
    new MeteoriteService(new MeteoriteLandingRepository(db))
  )
);
export type AppType = typeof app;
export default app;
