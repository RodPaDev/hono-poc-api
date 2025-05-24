import { integer, uuid, varchar, pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";

export const meteoriteLandingTable = pgTable("meteorite_landing", {
  id: uuid("id").primaryKey().defaultRandom(),
  datasetId: integer().notNull(),
  name: varchar("name").notNull(),
  nametype: varchar("nametype"),
  recclass: varchar("recclass"),
  mass: varchar("mass"),
  fall: varchar("fall"),
  year: varchar("year"),
  reclat: varchar("reclat"),
  reclong: varchar("reclong"),
  geolocation: varchar("geolocation"),
});

export const MeteoriteLandingSchema = z.object({
  id: z.string().uuid(),
  datasetId: z.number().int(),
  name: z.string(),
  nametype: z.string().optional(),
  recclass: z.string().optional(),
  mass: z.string().optional(),
  fall: z.string().optional(),
  year: z.string().optional(),
  reclat: z.string().optional(),
  reclong: z.string().optional(),
  geolocation: z.string().optional(),
}).strict();

export type MeteoriteLanding = z.infer<typeof MeteoriteLandingSchema>;