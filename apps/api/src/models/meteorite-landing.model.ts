import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

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

export const MeteoriteLandingSelectSchema = createSelectSchema(
  meteoriteLandingTable,
);
