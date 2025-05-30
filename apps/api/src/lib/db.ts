import { Env } from "@/env";
import { logger } from "@/lib/logger";
import * as schema from "@/models";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: Env.DATABASE_URL,
  connectionTimeoutMillis: 2000,
});

try {
  // Attempt to establish a database connection before proceeding.
  // This ensures the API only starts if the database is reachable.
  await pool.connect();
} catch (error) {
  logger.error(error, "Failed to connect to the database");
  process.exit(1);
}

export const db = drizzle(pool, { schema });
