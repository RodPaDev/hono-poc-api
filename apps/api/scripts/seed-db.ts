import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import readline from "readline";
import { auth } from "../src/lib/auth";
import { logger } from "../src/lib/logger";

const dbClient = new Client({ connectionString: process.env.DATABASE_URL });

async function askToContinue(): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise<string>((resolve) => {
    rl.question(
      "[WARNING] This will clear your database. Do you want to proceed? (y/n): ",
      resolve,
    );
  });

  rl.close();

  return ["yes", "y"].includes(answer.toLowerCase());
}

async function clearAllTables() {
  logger.info("Dropping all tables...");

  // Drop only the public schema (preserves drizzle schema with migrations)
  await dbClient.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    DROP SCHEMA IF EXISTS drizzle CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO postgres;
    GRANT ALL ON SCHEMA public TO public;
  `);
  logger.info("All tables dropped successfully");
}

async function runMigrations(db: NodePgDatabase) {
  logger.info("Running migrations...");
  await migrate(db, { migrationsFolder: "./drizzle" });
  logger.info("Migrations complete");
}

async function main() {
  const shouldContinue = await askToContinue();
  if (!shouldContinue) {
    logger.info("Seed operation cancelled.");
    return;
  }

  logger.info("Starting seed...");
  await dbClient.connect();
  const db = drizzle(dbClient);
  await clearAllTables();
  await runMigrations(db);

  const { user: platformAdmin } = await auth.api.createUser({
    body: {
      email: "platform.admin@altar.io",
      password: "qqqqqQ1!",
      name: "Platform Admin",
      role: "admin",
    },
  });

  const { user: user1 } = await auth.api.createUser({
    body: {
      email: "user1@altar.io",
      password: "qqqqqQ1!",
      name: "User1",
      role: "user",
    },
  });

  const { user: user2 } = await auth.api.createUser({
    body: {
      email: "user2@altar.io",
      password: "qqqqqQ1!",
      name: "User2",
      role: "user",
    },
  });

  await auth.api.createOrganization({
    body: {
      name: "Organization 1",
      slug: "organization-1",
      userId: user1.id,
    },
  });

  await auth.api.createOrganization({
    body: {
      name: "Organization 2",
      slug: "organization-2",
      userId: user2.id,
    },
  });

  // await db.insert(meteoriteLandingTable).values({

  // });

  await dbClient.end();
  logger.info("Seed complete");
}

main()
  .catch((err) => {
    logger.error(err);
  })
  .finally(() => {
    process.exit(0);
  });
