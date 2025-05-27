import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const metoeriteResourceName = "meteorite_landing" as const;

export const meteoriteLandingTable = pgTable(metoeriteResourceName, {
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
