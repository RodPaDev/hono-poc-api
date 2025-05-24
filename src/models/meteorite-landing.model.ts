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
  nametype: z.string().nullable(),
  recclass: z.string().nullable(),
  mass: z.string().nullable(),
  fall: z.string().nullable(),
  year: z.string().nullable(),
  reclat: z.string().nullable(),
  reclong: z.string().nullable(),
  geolocation: z.string().nullable(),
}).strict();

export type MeteoriteLanding = z.infer<typeof MeteoriteLandingSchema>;