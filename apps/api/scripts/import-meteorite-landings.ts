import { parse } from "csv-parse";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import fs from "fs";
import path from "path";
import { Client } from "pg";
import { logger } from "../src/lib/logger";
import { meteoriteLandingTable } from "../src/models/meteorite-landing.model";

async function main() {
  const csvPath = path.join(__dirname, "../meteorite-landings.csv");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const db = drizzle(client);

  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse({ columns: true, skip_empty_lines: true }));

  for await (const record of parser) {
    await db.insert(meteoriteLandingTable).values({
      datasetId: record.id,
      name: record.name,
      nametype: record.nametype,
      recclass: record.recclass,
      mass: record.mass,
      fall: record.fall,
      year: record.year,
      reclat: record.reclat,
      reclong: record.reclong,
      geolocation: record.GeoLocation,
    });
  }

  await client.end();
  logger.info("Import complete");
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
