import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createSchemaFactory } from "drizzle-zod";
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

const { createSelectSchema } = createSchemaFactory({
  zodInstance: z,
});

export const MeteoriteLandingSelectSchema = createSelectSchema(
  meteoriteLandingTable,
);

const select = z.object(MeteoriteLandingSelectSchema);
