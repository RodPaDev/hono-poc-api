import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const meteoriteLandingTable = pgTable("meteorite_landing", {
  id: uuid("id").primaryKey().defaultRandom(),
  datasetId: integer().notNull(),
  name: text("name").notNull(),
  nametype: text("nametype"),
  recclass: text("recclass"),
  mass: text("mass"),
  fall: text("fall"),
  year: text("year"),
  reclat: text("reclat"),
  reclong: text("reclong"),
  geolocation: text("geolocation"),
});
