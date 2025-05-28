import { env } from "@/env";
import * as schema from "@/models";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  schema,
  connection: env.DATABASE_URL,
});
